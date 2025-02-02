using System.Runtime.Serialization;

namespace Platform.Core.Models;

[DataContract]
[Serializable]
public class CombatantEvent : BaseEvent
{
    [DataMember]
    public int SourceId { get; set; }

    [DataMember]
    public int CurrentHp { get; set; }

    [DataMember]
    public int MaxHp { get; set; }

    [DataMember]
    public int CurrentMp { get; set; }

    [DataMember]
    public int MaxMp { get; set; }

    [DataMember]
    public float PositionX { get; set; }

    [DataMember]
    public float PositionY { get; set; }

    [DataMember]
    public float PositionZ { get; set; }

    [DataMember]
    public float Facing { get; set; }
}
