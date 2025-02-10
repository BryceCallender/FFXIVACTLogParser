using FFXIVACTLogParser.Models.Identifiers;
using System.Runtime.Serialization;

namespace FFXIVACTLogParser.Models.Report;

[DataContract]
[Serializable]
public class AddEncounterRequest
{
    [DataMember]
    public int EncounterNumber { get; set; }

    [DataMember]
    public DateTimeOffset? Start { get; set; }

    [DataMember]
    public DateTimeOffset? End { get; set; }

    [DataMember]
    public int ZoneId { get; set; }

    [DataMember]
    public ReportKey? ReportKey { get; set; }

    [DataMember]
    public Combatant[]? Players { get; set; }

    [DataMember]
    public Pet[]? Pets { get; set; }

    [DataMember]
    public BossNPC[]? BossNpcs { get; set; }

    [DataMember]
    public ReportEvent[]? Events { get; set; }
}
