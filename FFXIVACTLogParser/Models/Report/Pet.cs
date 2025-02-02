using System.Runtime.Serialization;

namespace FFXIVACTLogParser.Models.Report;

[DataContract]
[Serializable]
public class Pet
{
    [DataMember]
    public int SourceId { get; set; }

    [DataMember]
    public string? Name { get; set; }

    [DataMember]
    public int OwnerId { get; set; }
}
