using System.Runtime.Serialization;

namespace FFXIVACTLogParser.Models.Report;

[DataContract]
public class GetReportResponse
{
    [DataMember]
    public Fight[]? Fights { get; set; }
}
