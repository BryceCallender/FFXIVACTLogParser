using Platform.Core.Models;
using System.Runtime.Serialization;
using System.Text.Json;

namespace FFXIVACTLogParser.Models.Report;

[DataContract]
[Serializable]
public class ReportEvent
{
    [DataMember]
    public LogMessageType Type { get; set; }

    [DataMember]
    public JsonElement? Content { get; set; }
}
