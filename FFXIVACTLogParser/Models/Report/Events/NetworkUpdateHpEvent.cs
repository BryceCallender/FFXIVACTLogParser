namespace Platform.Core.Models;

public class NetworkUpdateHpEvent : BaseEvent
{
    public int SourceId { get; set; }

    public int CurrentHp { get; set; }

    public int MaxHp { get; set; }

    public int CurrentMp { get; set; }

    public int MaxMp { get; set; }

    public float PositionX { get; set; }

    public float PositionY { get; set; }

    public float PositionZ { get; set; }

    public float Facing { get; set; }
}
