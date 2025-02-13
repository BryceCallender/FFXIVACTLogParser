using System.Runtime.Serialization;

namespace FFXIVACTLogParser.Models.Report;

[DataContract]
public class GetReportResponse
{
    [DataMember]
    public string? ReportName { get; set; }

    [DataMember]
    public DateTimeOffset? Created { get; set; }

    [DataMember]
    public Fight[]? Fights { get; set; }
}
