using System.Runtime.Serialization;

namespace FFXIVACTLogParser.Models.Report;

[DataContract]
[Serializable]
public class ZoneResponse
{
    [DataMember]
    public Zone[]? Zones { get; set; }
}
