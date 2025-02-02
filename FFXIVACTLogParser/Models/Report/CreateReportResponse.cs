using System.Runtime.Serialization;

namespace FFXIVACTLogParser.Models.Report;

[DataContract]
[Serializable]
public class CreateReportResponse
{
    [DataMember]
    public ReportKey? ReportKey { get; set; }
}
