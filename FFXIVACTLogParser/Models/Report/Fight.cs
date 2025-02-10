using FFXIVACTLogParser.Models.Identifiers;
using System.Runtime.Serialization;

namespace FFXIVACTLogParser.Models.Report;

[DataContract]
[Serializable]
public class Fight
{
    [DataMember]
    public int? FightNumber { get; set; }

    [DataMember]
    public int? Zone { get; set; }

    [DataMember]
    public bool? Clear { get; set; }

    [DataMember]
    public double? HpPercentageLeft { get; set; }

    [DataMember]
    public DateTimeOffset? Start { get; set; }

    [DataMember]
    public DateTimeOffset? End { get; set; }
}
