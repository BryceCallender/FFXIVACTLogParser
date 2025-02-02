using System.Runtime.Serialization;

namespace Platform.Core.Models;

[DataContract]
[Serializable]
public class NetworkAbilityEvent : BaseEvent
{
    [DataMember]
    public int SourceId { get; set; }

    [DataMember]
    public int TargetId { get; set; }

    [DataMember]
    public string? Ability { get; set; }

    [DataMember]
    public int? OwnerId { get; set; }
}
