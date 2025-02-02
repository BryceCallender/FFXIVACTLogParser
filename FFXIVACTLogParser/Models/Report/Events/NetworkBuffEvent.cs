using System.Runtime.Serialization;

namespace Platform.Core.Models;

[DataContract]
[Serializable]
public class NetworkBuffEvent : BaseEvent
{
    [DataMember]
    public int SourceId { get; set; }

    [DataMember]
    public int TargetId { get; set; }

    [DataMember]
    public float Duration { get; set; }
}
