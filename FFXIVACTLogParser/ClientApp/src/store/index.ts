import { defineStore } from 'pinia';
import { ParseUploadState } from './state';
import { LogMessageType } from '@/models/log-message-type.enum';
import { ZoneChangedLine } from '@/models/parser/zone-changed-line.model';
import { RemoveCombatantLine } from '@/models/parser/remove-combatant-line.model';
import { AddCombatantLine } from '@/models/parser/add-combatant-line.model';
import { NetworkStartCastingLine } from '@/models/parser/network-start-casting-line';
import { NetworkAbilityLine } from '@/models/parser/network-ability-line.model';
import { NetworkCancelAbilityLine } from '@/models/parser/network-cancel-ability-line';
import { NetworkDoTLine } from '@/models/parser/network-dot-line.model';
import { NetworkDeathLine } from '@/models/parser/network-death-line.model';
import { NetworkBuffLine } from '@/models/parser/network-buff-line.model';
import { NetworkTargetIconLine } from '@/models/parser/network-target-icon-line.model';
import { NetworkTargetMarkerLine } from '@/models/parser/network-target-marker-line.model';
import { NetworkBuffRemoveLine } from '@/models/parser/network-buff-remove-line.model';
import { Network6DLine } from '@/models/parser/network-6d-line.model';
import { NetworkTetherLine } from '@/models/parser/network-tether-line.model';
import { NetworkLimitBreakLine } from '@/models/parser/network-limit-break-line.model';
import { NetworkUpdateHpLine } from '@/models/parser/network-update-hp-line.model';
import { NetworkStatusEffects } from '@/models/parser/network-status-effects-line.model';
import { NetworkActionSyncLine } from '@/models/parser/network-action-sync-line.model';
import { Encounter } from '@/models/encounter.model';
import { AbilityFlagConstants } from '@/models/constants/ability-flag-constants.model';
import { Combatant } from '@/models/combatant.model';
import { Duration } from '@models/duration.model';
import { FFXIVMapper } from '@/mappers/ffxiv.mapper';
import { ReportKey } from '@BFFAPI/bff';
import { AbilityFlagHelper } from '@/helpers/ability-flag-helper';

export const useParserUploadStore = defineStore('parser', {
    state: (): ParseUploadState => ({
        zones: {},
        encounters: [],
        progress: null,
        session: null,
        uploadReportKey: 'UkLWZg9D'
    }),
    getters: {

    },
    actions: {
        async initalize(): Promise<void> {
            await this.fetchZones();
        },
        async fetchZones(): Promise<void> {
            const { ReportClient } = await import('@BFFAPI/bff');

            const client = new ReportClient();
            client.setAuthToken(this.session.access_token);
            await client.zones().then(resp => {
                this.zones = FFXIVMapper.toZones(resp.zones);
            });
        },
        async createReport(reportName?: string): Promise<void> {
            const { ReportClient } = await import('@BFFAPI/bff');

            const client = new ReportClient();
            await client.create({reportName}).then(resp => {
                this.uploadReportKey = resp.reportKey?.key;
            });
        },
        clearUpload(): void {
            this.uploadReportKey = null;
        },
        async parseLogAsync(lines: string[]): Promise<void> {
            return new Promise<void>(async (resolve) => {
                let encounter: Encounter = {
                    playerMap: {},
                    petMap: {},
                    bossNpcMap: {},
                    allCombatantMap: {},
                    events: [],
                    pullNumber: 1
                };

                let lineIndex = 0;
                this.progress = 0;
                for (const line of lines) {
                    this.progress = (lineIndex++ / lines.length) * 100;
                    const splitLines = line.split('|');
                    const messageType = parseInt(splitLines[0]) as LogMessageType;
                    switch (messageType) {
                        case LogMessageType.ChangeZone: {
                            const zoneChangedLine = new ZoneChangedLine(splitLines);
                            encounter.events.push(zoneChangedLine);

                            // check if its a valid party finder zone area and then assign to encounter
                            if (this.zones[zoneChangedLine.zoneId]) {
                                encounter.zone = this.zones[zoneChangedLine.zoneId];
                            } else {
                                encounter.playerMap = {};
                                encounter.petMap = {};
                                encounter.bossNpcMap = {};
                                encounter.zone = null;
                                encounter.startTime = null;
                                encounter.endTime = null;
                            }

                            break;
                        }
                        case LogMessageType.AddCombatant: {
                            const addCombatantLine = new AddCombatantLine(splitLines);
                            encounter.events.push(addCombatantLine);

                            if (!encounter.zone) {
                                break;
                            }

                            const combatant = new Combatant(addCombatantLine);
                            if (addCombatantLine.id.hasFlag(AbilityFlagConstants.PLAYER_ID)) {
                                encounter.playerMap[addCombatantLine.id] = combatant;
                            } else if (addCombatantLine.id.hasFlag(AbilityFlagConstants.PET_ID) && addCombatantLine.ownerId > 0) {
                                encounter.petMap[addCombatantLine.id] = combatant;
                            } else {
                                encounter.bossNpcMap[addCombatantLine.id] = combatant;
                            }

                            encounter.allCombatantMap[addCombatantLine.id] = combatant;

                            break;
                        }
                        case LogMessageType.RemoveCombatant: {
                            const removeCombatantLine = new RemoveCombatantLine(splitLines);
                            encounter.events.push(removeCombatantLine);

                            if (removeCombatantLine.id.hasFlag(AbilityFlagConstants.PLAYER_ID)) {
                                delete encounter.playerMap[removeCombatantLine.id];
                            } else if (removeCombatantLine.id.hasFlag(AbilityFlagConstants.PET_ID)) {
                                delete encounter.petMap[removeCombatantLine.id];
                            } else {
                                delete encounter.bossNpcMap[removeCombatantLine.id];
                            }

                            delete encounter.allCombatantMap[removeCombatantLine.id];

                            break;
                        }
                        case LogMessageType.NetworkStartsCasting: {
                            const networkCastingLine = new NetworkStartCastingLine(splitLines);
                            break;
                        }
                        case LogMessageType.NetworkAbility:
                        case LogMessageType.NetworkAOEAbility: {
                            const networkAbilityLine = new NetworkAbilityLine(splitLines);

                            // Dont care about abilities not actually in a pf zone
                            if (!encounter.zone) {
                                break;
                            }

                            encounter.events.push(networkAbilityLine);

                            if (!encounter.startTime && encounter.bossNpcMap[networkAbilityLine.targetId]) {
                                encounter.startTime = networkAbilityLine.timestamp;
                            }

                            const value = AbilityFlagHelper.getValueFromAbilityFlag(networkAbilityLine.flag, networkAbilityLine.value);
                            console.log(`${networkAbilityLine.source} used ${networkAbilityLine.ability} for ${value} damage`);

                            break;
                        }
                        case LogMessageType.NetworkCancelAbility: {
                            const networkCancelLine = new NetworkCancelAbilityLine(splitLines);
                            break;
                        }
                        case LogMessageType.NetworkDoT: {
                            const networkDotLine = new NetworkDoTLine(splitLines);
                            break;
                        }
                        case LogMessageType.NetworkDeath: {
                            const networkDeathLine = new NetworkDeathLine(splitLines);
                            break;
                        }
                        case LogMessageType.NetworkBuff: {
                            const networkBuffLine = new NetworkBuffLine(splitLines);
                            break;
                        }
                        case LogMessageType.NetworkTargetIcon: {
                            const networkTargetIconLine = new NetworkTargetIconLine(splitLines);
                            break;
                        }
                        case LogMessageType.NetworkTargetMarker: {
                            const networkTargetMarkerLine = new NetworkTargetMarkerLine(splitLines);
                            break;
                        }
                        case LogMessageType.NetworkBuffRemove: {
                            const networkBuffRemoveLine = new NetworkBuffRemoveLine(splitLines);
                            break;
                        }
                        case LogMessageType.Network6D: {
                            const network6D = new Network6DLine(splitLines);
                            encounter.events.push(network6D);

                            if (network6D.command.hasFlag(AbilityFlagConstants.WIPE)) {
                                encounter.endTime = network6D.timestamp;
                                const newEncounter = JSON.parse(JSON.stringify(encounter));
                                await this.createEncounter(this.uploadReportKey, newEncounter);
                                this.encounters.push(newEncounter);
                                encounter.startTime = null;
                                encounter.events = [];
                                encounter.pullNumber++;
                                console.log('Detected wipe...');
                            }

                            if (network6D.command === AbilityFlagConstants.VICTORY) {
                                encounter.endTime = network6D.timestamp;
                                const newEncounter = JSON.parse(JSON.stringify(encounter));
                                await this.createEncounter(this.uploadReportKey, newEncounter);
                                this.encounters.push(newEncounter);
                                encounter.startTime = null;
                                encounter.events = [];
                                encounter.pullNumber++;
                                console.log('Detected Victory...');
                            }

                            break;
                        }
                        case LogMessageType.NetworkTether: {
                            const networkTetherLine = new NetworkTetherLine(splitLines);
                            break;
                        }
                        case LogMessageType.NetworkLimitBreak: {
                            const networkLimitBreakLine = new NetworkLimitBreakLine(splitLines);
                            break;
                        }
                        case LogMessageType.NetworkEffectResult: {
                            const networkActionSyncLine = new NetworkActionSyncLine(splitLines);
                            break;
                        }
                        case LogMessageType.NetworkStatusList: {
                            const networkStatusEffectsLine = new NetworkStatusEffects(splitLines);
                            break;
                        }
                        case LogMessageType.NetworkUpdateHp: {
                            const networkUpdateHpLine = new NetworkUpdateHpLine(splitLines);
                            encounter.events.push(networkUpdateHpLine);

                            var combatant = encounter.allCombatantMap[networkUpdateHpLine.id];
                            if (combatant) {
                                combatant.hitPoints.current -= networkUpdateHpLine.currentHp;
                            }

                            break;
                        }
                    }
                }

                this.progress = 100;
                console.log('Log parsing finished...');
                resolve();
            });
        },
        async createEncounter(reportKey: string, encounter: Encounter): Promise<void> {
            const { ReportClient } = await import('@BFFAPI/bff');

            const client = new ReportClient();

            const request = FFXIVMapper.toCreateEncounterRequest(reportKey, encounter);
            console.log(request);
            await client.encounter(request).then(resp => {

            });
        },
        getTimeDifference(date1: Date, date2?: Date): Duration {
            if (!date2) {
                return null;
            }

            // Parse the dates
            const startDate = new Date(date1);
            const endDate = new Date(date2);

            // Calculate the difference in milliseconds
            const differenceInMs = endDate.getTime() - startDate.getTime();

            // Calculate hours, minutes, and seconds
            const seconds = Math.floor((differenceInMs / 1000) % 60);
            const minutes = Math.floor((differenceInMs / (1000 * 60)) % 60);

            return {
                minutes,
                seconds,
                milliseconds: differenceInMs
            };
        },
        getTImeDifferenceFormatted (date1: Date, date2: Date): string {
            const duration = this.getTimeDifference(date1, date2);

            return `${duration.minutes}:${duration.seconds}:${duration.milliseconds}`;
        }
    },
});