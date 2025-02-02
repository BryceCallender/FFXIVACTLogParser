namespace Platform.Core.Models;

public class NetworkRaidMarkerEvent
{
    public string? Operation { get; set; }

    public string? Waymark { get; set; }

    public float PositionX { get; set; }

    public float PositionY { get; set; }

    public float PositionZ { get; set; }
}
