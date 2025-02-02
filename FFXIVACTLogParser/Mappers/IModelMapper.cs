using FFXIVACTLogParser.Models.Report;
using Platform.Core.Models;
using ExternalModels = External.Supabase.Models;

namespace FFXIVACTLogParser.Mappers;

public interface IModelMapper
{
    Zone[]? ToZones(ExternalModels.Zone[]? zones);
}
