import { defineStore } from 'pinia';
import { ParseUploadState } from './state';
import { LogMessageType } from '@/models/log-message-type.enum';
import { ZoneChangedLine } from '@/models/parser/zone-changed-line.model';
import { RemoveCombatantLine } from '@/models/parser/remove-combatant-line.model';
import { AddCombatantLine } from '@/models/parser/add-combatant-line.model';
import { PartyListLine } from '@/models/parser/party-list-line.model';
import { PlayerStatsLine } from '@/models/parser/player-stats-line.model';
import { NetworkStartCastingLine } from '@/models/parser/network-start-casting-line';
import { NetworkAbilityLine } from '@/models/parser/network-ability-line.model';
import { NetworkAOEAbilityLine } from '@/models/parser/network-aoe-ability-line.model';
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
import { Zone } from '@/models/zone.model';
import contentFinderConditionCsv from '@assets/csv/ContentFinderCondition.csv';
import Papa from 'papaparse';
import { Encounter } from '@/models/encounter.model';
import { AbilityFlagConstants } from '@/models/constants/ability-flag-constants.model';
import { Combatant } from '@/models/combatant.model';

export const useParserUploadStore = defineStore('parser', {
    state: (): ParseUploadState => ({
        zones: {},
        encounters: []
    }),
    getters: {

    },
    actions: {
        async initalize(): Promise<void> {
            return new Promise<void>((resolve, reject) => {
                Papa.parse(contentFinderConditionCsv, {
                    download: true,
                    delimiter: ',',
                    header: true,
                    step: (row) => {
                        const zone = row.data as Zone;
                        this.zones[zone.id] = zone;
                    },
                    complete: () => {
                        resolve();
                    },
                    error: () => {
                        reject();
                    }
                });
            });
        },
        parseLog(lines: string[]): void {
            let encounter: Encounter = {
                players: [],
                npcs: [],
            };

            lines.forEach(l => {
                const splitLines = l.split('|');
                const messageType = parseInt(splitLines[0]) as LogMessageType;
                switch (messageType) {
                    case LogMessageType.ChangeZone:
                        const zoneChangedLine = new ZoneChangedLine(splitLines);
                        break;
                    case LogMessageType.AddCombatant:
                        const addCombatantLine = new AddCombatantLine(splitLines);

                        if (addCombatantLine.id.hasFlag(AbilityFlagConstants.PLAYER_ID)) {
                            encounter.players.push(new Combatant(addCombatantLine));
                        } else {
                            encounter.npcs.push(new Combatant(addCombatantLine));
                        }

                        break;
                    case LogMessageType.RemoveCombatant:
                        const removeCombatantLine = new RemoveCombatantLine(splitLines);
                        break;
                    case LogMessageType.PartyList:
                        const partyListLine = new PartyListLine(splitLines);
                        break;
                    case LogMessageType.PlayerStats:
                        const playerStatsLine = new PlayerStatsLine(splitLines);
                        break;
                    case LogMessageType.NetworkStartsCasting:
                        const networkCastingLine = new NetworkStartCastingLine(splitLines);
                        break;
                    case LogMessageType.NetworkAbility:
                        const networkAbilityLine = new NetworkAbilityLine(splitLines);
                        break;
                    case LogMessageType.NetworkAOEAbility:
                        const networkAOEAbilityLine = new NetworkAOEAbilityLine(splitLines);
                        break;
                    case LogMessageType.NetworkCancelAbility:
                        const networkCancelLine = new NetworkCancelAbilityLine(splitLines);
                        break;
                    case LogMessageType.NetworkDoT:
                        const networkDotLine = new NetworkDoTLine(splitLines);
                        break;
                    case LogMessageType.NetworkDeath:
                       const networkDeathLine = new NetworkDeathLine(splitLines);
                        break;
                    case LogMessageType.NetworkBuff:
                        const networkBuffLine = new NetworkBuffLine(splitLines);
                        break;
                    case LogMessageType.NetworkTargetIcon:
                        const networkTargetIconLine = new NetworkTargetIconLine(splitLines);
                        break;
                    case LogMessageType.NetworkTargetMarker:
                        const networkTargetMarkerLine = new NetworkTargetMarkerLine(splitLines);
                        break;
                    case LogMessageType.NetworkBuffRemove:
                        const networkBuffRemoveLine = new NetworkBuffRemoveLine(splitLines);
                        break;
                    case LogMessageType.Network6D:
                        const network6D = new Network6DLine(splitLines);

                        if (network6D.command.hasFlag(AbilityFlagConstants.WIPE)) {
                            encounter.endTime = network6D.timestamp;
                            this.encounters.push(encounter);
                            encounter = {
                                players: [],
                                npcs: [],
                            };

                            console.log('Detected wipe...');
                        }

                        break;
                    case LogMessageType.NetworkTether:
                        const networkTetherLine = new NetworkTetherLine(splitLines);
                        break;
                    case LogMessageType.NetworkLimitBreak:
                        const networkLimitBreakLine = new NetworkLimitBreakLine(splitLines);
                        break;
                    case LogMessageType.NetworkEffectResult:
                        const networkActionSycnLine = new NetworkActionSyncLine(splitLines);
                        break;
                    case LogMessageType.NetworkStatusList:
                        const networkStatusEffectsLine = new NetworkStatusEffects(splitLines);
                        break;
                    case LogMessageType.NetworkUpdateHp:
                        const networkUpdateHpLine = new NetworkUpdateHpLine(splitLines);
                        break;
                }
            });
        }
    },
});