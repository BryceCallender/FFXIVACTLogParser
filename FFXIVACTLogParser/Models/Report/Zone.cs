using System.Runtime.Serialization;

namespace FFXIVACTLogParser.Models.Report;

[DataContract]
[Serializable]
public class Zone
{
    [DataMember]
    public int Id { get; set; }

    [DataMember]
    public string? Name { get; set; }

    [DataMember]
    public string? FileName { get; set; }
}
