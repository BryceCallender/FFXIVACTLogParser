using System.Runtime.Serialization;

namespace FFXIVACTLogParser.Models.Report;

[DataContract]
[Serializable]
public class BossNPC
{
    [DataMember]
    public int SourceId { get; set; }

    [DataMember]
    public string? Name { get; set; }

    [DataMember]
    public int MainInstanceId { get; set; }

    [DataMember]
    public int InstanceNumber { get; set; }
}
