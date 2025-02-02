using System.Runtime.Serialization;

namespace FFXIVACTLogParser.Models.Report;

[DataContract]
[Serializable]
public class Combatant
{
    [DataMember]
    public string? Name { get; set; }

    [DataMember]
    public int SourceId { get; set; }

    [DataMember]
    public int JobId { get; set; }
}
