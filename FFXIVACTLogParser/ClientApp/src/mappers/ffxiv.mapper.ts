import { Combatant } from "@/models/combatant.model";
import { Encounter } from "@/models/encounter.model";
import { Fight } from "@/models/fight.model";
import { LogMessageType } from "@/models/log-message-type.enum";
import { ACTLine } from "@/models/parser/act-line.model";
import { Pet } from "@/models/pet.model";
import { Report } from "@/models/report.model";
import { Zone } from "@/models/zone.model";
import { 
    Zone as BFFZone, 
    AddEncounterRequest as BFFAddEncounterRequest,
    ReportEvent as BFFReportEvent,
    LogMessageType as BFFLogMessageType,
    Combatant as BFFCombatant,
    Pet as BFFPet,
    BossNPC as BFFBossNpc,
    Fight as BFFFight,
    GetReportResponse
} from "@BFFAPI/bff";

export class FFXIVMapper {
    public static toZones(zones: BFFZone[]): Record<number, Zone> {
        const zoneMap = {} as Record<number, Zone>;

        zones.forEach(z => {
            const mappedZone = this.toZone(z);
            zoneMap[mappedZone.id] = mappedZone;
        });

        return zoneMap;
    }

    public static toCreateEncounterRequest(reportKey: string, encounter: Encounter) : BFFAddEncounterRequest {
        return {
            encounterNumber: encounter.pullNumber,
            start: encounter.startTime,
            end: encounter.endTime,
            zoneId: encounter.zone?.id,
            reportKey: {
                key: reportKey
            },
            players: this.toPlayers(encounter.playerMap),
            pets: this.toPets(encounter.petMap, encounter.playerMap),
            events: this.toReportEvents(encounter.events)
        };
    }

    public static toReport(report: GetReportResponse): Report {
        return {
            name: report.reportName,
            created: new Date(report.created),
            fights: this.toReportFights(report.fights)
        }
    }

    private static toReportFights(fights: BFFFight[]): Fight[] {
        return fights?.map(this.toReportFight.bind(this)) ?? [];
    }

    private static toReportFight(fight: BFFFight): Fight {
        return {
            id: fight.fightNumber,
            zoneId: fight.zone,
            start: new Date(fight.start),
            end: new Date(fight.end),
            hpPercentageLeft: fight.hpPercentageLeft,
            clear: fight.clear
        }
    }

    private static toReportEvents(actLines: ACTLine[]) : BFFReportEvent[] {
        return actLines?.map(this.toReportEvent.bind(this)) ?? [];
    }

    private static toReportEvent(actLine: ACTLine) : BFFReportEvent {
        return ({
            type: this.toLogMessageType(actLine.messageType),
            content: actLine.minimal()
        });
    }

    private static toLogMessageType(type: number): BFFLogMessageType {
        const logType = type as LogMessageType;
        switch (logType) {
            case LogMessageType.AddBuff: return BFFLogMessageType.AddBuff;
            case LogMessageType.LogLine: return BFFLogMessageType.LogLine;
            case LogMessageType.ChangeZone: return BFFLogMessageType.ChangeZone;
            case LogMessageType.ChangePrimaryPlayer: return BFFLogMessageType.ChangePrimaryPlayer;
            case LogMessageType.AddCombatant: return BFFLogMessageType.AddCombatant;
            case LogMessageType.RemoveCombatant: return BFFLogMessageType.RemoveCombatant;
            case LogMessageType.AddBuff: return BFFLogMessageType.AddBuff;
            case LogMessageType.RemoveBuff: return BFFLogMessageType.RemoveBuff;
            case LogMessageType.FlyingText: return BFFLogMessageType.FlyingText;
            case LogMessageType.OutgoingAbility: return BFFLogMessageType.OutgoingAbility;
            case LogMessageType.IncomingAbility: return BFFLogMessageType.IncomingAbility;
            case LogMessageType.PartyList: return BFFLogMessageType.PartyList;
            case LogMessageType.PlayerStats: return BFFLogMessageType.PlayerStats;
            case LogMessageType.CombatantHP: return BFFLogMessageType.CombatantHP;
            case LogMessageType.ParsedPartyMember: return BFFLogMessageType.ParsedPartyMember;
            case LogMessageType.NetworkStartsCasting: return BFFLogMessageType.NetworkStartsCasting;
            case LogMessageType.NetworkAbility: return BFFLogMessageType.NetworkAbility;
            case LogMessageType.NetworkAOEAbility: return BFFLogMessageType.NetworkAOEAbility;
            case LogMessageType.NetworkCancelAbility: return BFFLogMessageType.NetworkCancelAbility;
            case LogMessageType.NetworkDoT: return BFFLogMessageType.NetworkDoT;
            case LogMessageType.NetworkDeath: return BFFLogMessageType.NetworkDeath;
            case LogMessageType.NetworkBuff: return BFFLogMessageType.NetworkBuff;
            case LogMessageType.NetworkTargetIcon: return BFFLogMessageType.NetworkTargetIcon;
            case LogMessageType.NetworkTargetMarker: return BFFLogMessageType.NetworkTargetMarker;
            case LogMessageType.NetworkBuffRemove: return BFFLogMessageType.NetworkBuffRemove;
            case LogMessageType.NetworkGauge: return BFFLogMessageType.NetworkGauge;
            case LogMessageType.NetworkWorld: return BFFLogMessageType.NetworkWorld;
            case LogMessageType.Network6D: return BFFLogMessageType.Network6D;
            case LogMessageType.NetworkNameToggle: return BFFLogMessageType.NetworkNameToggle;
            case LogMessageType.NetworkTether: return BFFLogMessageType.NetworkTether;
            case LogMessageType.NetworkLimitBreak: return BFFLogMessageType.NetworkLimitBreak;
            case LogMessageType.NetworkEffectResult: return BFFLogMessageType.NetworkEffectResult;
            case LogMessageType.NetworkStatusList: return BFFLogMessageType.NetworkStatusList;
            case LogMessageType.NetworkUpdateHp: return BFFLogMessageType.NetworkUpdateHp;
            case LogMessageType.Settings: return BFFLogMessageType.Settings;
            case LogMessageType.Process: return BFFLogMessageType.Process;
            case LogMessageType.Debug: return BFFLogMessageType.Debug;
            case LogMessageType.PacketDump: return BFFLogMessageType.PacketDump;
            case LogMessageType.Version: return BFFLogMessageType.Version;
            case LogMessageType.Error: return BFFLogMessageType.Error;
            case LogMessageType.Timer: return BFFLogMessageType.Timer;
        }
    }

    private static toZone(zone: BFFZone): Zone {
        return {
            id: zone.id,
            image: zone.fileName,
            name: zone.name
        };
    }

    private static toPlayers(playerMap: Record<number, Combatant>): BFFCombatant[] {
        const combatants: BFFCombatant[] = [];
        for (const playerId in playerMap) {
            const player = playerMap[playerId];
            combatants.push(this.toPlayer(parseInt(playerId), player));
        }

        return combatants;
    }

    private static toPlayer(sourceId: number, combatant: Combatant): BFFCombatant {
        return {
            sourceId,
            name: combatant.name,
            jobId: combatant.jobId
        };
    }

    private static toPets(petMap: Record<number, Pet>, playerMap: Record<number, Combatant>): BFFPet[] {
        const pets: BFFPet[] = [];
        for (const petId in petMap) {
            const pet = petMap[petId];
            const player = playerMap[pet.ownerId];
            pets.push(this.toPet(parseInt(petId), pet, player));
        }

        return pets;
    }

    private static toPet(sourceId: number, pet: Combatant, player?: Combatant): BFFPet {
        return {
            sourceId,
            name: pet.name,
            ownerId: player.id,
        };
    }

}