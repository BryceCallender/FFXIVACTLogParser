namespace Platform.Core.Models;

public class ZoneChangedEvent : BaseEvent
{
    public int Id { get; set; }

    public string? Name { get; set; }
}
