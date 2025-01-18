import { AbilityFlagHelper } from "@/helpers/ability-flag-helper";
import { MapChangingLine } from "../../models/parser/map-changing-line.model";
import { NetworkStartCastingLine } from "../../models/parser/network-start-casting-line";
import { PlayerStatsLine } from "../../models/parser/player-stats-line.model";
import { AddCombatantLine } from "@/models/parser/add-combatant-line.model";

console.log(new AddCombatantLine("03|2024-12-28T14:28:11.7560000-07:00|1074603B|Genma Kuragi|1E|64|0000|35|Exodus|0|0|157167|157167|10000|10000|||100.68|116.07|0.00|-3.14|5077ed8974eb7b28".split('|')));
console.log(new PlayerStatsLine("12|2024-12-28T14:28:11.7560000-07:00|30|394|5107|5518|299|345|440|5107|1842|3173|299|345|2387|420|420|420|4000174ABDDD4C|97795e23a67dd530".split('|')));
console.log(new NetworkStartCastingLine("20|2024-12-28T14:28:12.3990000-07:00|1069EDE8|Ciel Phantasia|B9|Adloquium|10941B91|Serg Leal|1.990|99.66|114.27|0.00|-3.12|4572f9ee91ec1e14".split('|')));
console.log(new MapChangingLine("40|2024-12-28T14:28:11.7560000-07:00|77|Norvrandt|A Future Rewritten||64f1061941b99346".split('|')));

console.log(AbilityFlagHelper.bigDamageConversion(0x423F400F));