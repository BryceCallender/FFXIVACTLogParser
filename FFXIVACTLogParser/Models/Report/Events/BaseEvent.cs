using System.Runtime.Serialization;

namespace Platform.Core.Models;

[DataContract]
[Serializable]
public class BaseEvent
{
    [DataMember]
    public LogMessageType Type { get; set; }

    [DataMember]
    public DateTimeOffset Timestamp { get; set; }
}
