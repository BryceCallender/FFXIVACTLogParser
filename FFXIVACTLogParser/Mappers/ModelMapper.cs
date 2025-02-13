using ExternalModels = External.Supabase.Models;
using Platform.Core.DI;
using FFXIVACTLogParser.Models.Report;

namespace FFXIVACTLogParser.Mappers;

[AddScoped]
public class ModelMapper : IModelMapper
{
    public Zone[]? ToZones(ExternalModels.Zone[]? zones)
    {
        if (zones.IsEmpty())
            return default;

        return zones?.Select(ToZone)?.ToArray();
    }

    private Zone ToZone(ExternalModels.Zone? zone)
    {
        if (zone is null)
            return default;

        return new()
        {
            Id = zone.Id,
            Name = zone.Name,
            FileName = zone.Image
        };
    }
}
