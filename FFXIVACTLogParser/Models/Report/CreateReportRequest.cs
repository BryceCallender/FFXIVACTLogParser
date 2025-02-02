using System.Runtime.Serialization;

namespace FFXIVACTLogParser.Models.Report;

[DataContract]
[Serializable]
public class CreateReportRequest
{
    [DataMember]
    public string? ReportName { get; set; }
}
