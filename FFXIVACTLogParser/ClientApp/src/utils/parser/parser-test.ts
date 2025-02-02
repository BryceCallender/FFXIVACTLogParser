import { AbilityFlagHelper } from "@/helpers/ability-flag-helper";
import { MapChangingLine } from "../../models/parser/map-changing-line.model";
import { NetworkStartCastingLine } from "../../models/parser/network-start-casting-line";
import { PlayerStatsLine } from "../../models/parser/player-stats-line.model";
import { AddCombatantLine } from "@/models/parser/add-combatant-line.model";
import { NetworkAbilityLine } from "@/models/parser/network-ability-line.model";

console.log(new AddCombatantLine("03|2024-12-28T14:28:11.7560000-07:00|1074603B|Genma Kuragi|1E|64|0000|35|Exodus|0|0|157167|157167|10000|10000|||100.68|116.07|0.00|-3.14|5077ed8974eb7b28".split('|')));
console.log(new PlayerStatsLine("12|2024-12-28T14:28:11.7560000-07:00|30|394|5107|5518|299|345|440|5107|1842|3173|299|345|2387|420|420|420|4000174ABDDD4C|97795e23a67dd530".split('|')));
console.log(new NetworkStartCastingLine("20|2024-12-28T14:28:12.3990000-07:00|1069EDE8|Ciel Phantasia|B9|Adloquium|10941B91|Serg Leal|1.990|99.66|114.27|0.00|-3.12|4572f9ee91ec1e14".split('|')));
console.log(new MapChangingLine("40|2024-12-28T14:28:11.7560000-07:00|77|Norvrandt|A Future Rewritten||64f1061941b99346".split('|')));
console.log(new NetworkAbilityLine("21|2024-12-28T14:28:18.3630000-07:00|107EAAB8|Sumia Flor|1CE1|The Blackest Night|10941B91|Serg Leal|32010E|49A0000|0|0|0|0|0|0|0|0|0|0|0|0|0|0|248839|248839|10000|10000|||100.33|110.67|-0.02|-3.14|226018|226018|10000|10000|||99.96|107.00|0.00|-3.14|0000318A|0|1|00||01|1CE1|1CE1|0.600|8311|ad7585b8aebfe6e9".split('|')));
console.log(new NetworkAbilityLine("21|2024-12-28T14:28:27.4600000-07:00|109044F3|Eri Yaxin|9066|Tendo Setsugekka|40000AAD|Fatebreaker|712003|5D694002|13E|FF8000|F|107A8000|0|0|0|0|0|0|0|0|0|0|21207805|22289071|10000|10000|||100.02|98.89|0.00|-3.11|157268|157268|10000|10000|||95.32|104.72|0.00|2.47|000031E0|0|1|00||01|9066|9066|0.100|E479|bd30a087099e43d0".split('|')));
console.log(`Max damage test: ${AbilityFlagHelper.bigDamageConversion(0x423F400F)}`);
console.log(AbilityFlagHelper.getValueFromAbilityFlag(0x00724003, 0x3C880000));