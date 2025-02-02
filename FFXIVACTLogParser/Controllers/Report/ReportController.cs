using FFXIVACTLogParser.Mappers;
using FFXIVACTLogParser.Models.Report;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Platform.Core.Encryption;
using Supabase.Postgrest;
using static Supabase.Postgrest.QueryOptions;
using ExternalModels = External.Supabase.Models;

namespace FFXIVACTLogParser.Controllers.Report;

[ApiController]
[Route("api/[controller]")]
public class ReportController : ControllerBase
{
    private readonly IEncryption _encryption;
    private readonly IModelMapper _mapper;
    private readonly Supabase.Client _supabaseClient;

    public ReportController(
        IEncryption encryption,
        IModelMapper mapper,
        Supabase.Client supabaseClient)
    {
        _encryption = encryption;
        _mapper = mapper;
        _supabaseClient = supabaseClient;
    }

    [HttpPost("create")]
    public async Task<ActionResult<CreateReportResponse>> CreateAsync(CreateReportRequest request, CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();

        var report = new ExternalModels.Report
        {
            Name = request.ReportName,
        };

        var response = await _supabaseClient.From<ExternalModels.Report>()
            .Insert(report, new QueryOptions { Returning = ReturnType.Representation });

        if (response.Model is null)
            throw new InvalidOperationException("Response has no Report data");

        var reportKey = _encryption.Encrypt(response.Model.Id);

        return new CreateReportResponse
        {
            ReportKey = new ReportKey(reportKey)
        };
    }

    [HttpPost("encounter")]
    public async Task<ActionResult<AddEncounterResponse>> CreateEncounterAsync(AddEncounterRequest request, CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();

        //var reportId = _encryption.Decrypt(request.ReportKey.Key);

        //await _supabaseClient.From<ExternalModels.LogEvent>()
        //    .Insert(request.Events.Select(e => new ExternalModels.LogEvent
        //    {
        //        ReportId = reportId,
        //        Fight = request.EncounterNumber,
        //        EventType = (int)e.Type,
        //        EventValue = e.Content.ToString()
        //    }).ToArray());

        return Ok();
    }

    [HttpGet("{reportKey}")] // UkLWZg9D
    [Authorize]
    public async Task<ActionResult> ReportAsync(string reportKey, ReportType? type, ReportView? view, CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();

        if (string.IsNullOrEmpty(reportKey))
            return BadRequest("Report Key is required.");

        var reportId = new ReportId(_encryption.Decrypt(reportKey));

        if (reportId.Id <= 0)
            return BadRequest("Report Key is invalid.");

        // Get data
        var report = await _supabaseClient.From<ExternalModels.Report>().Get();

        return Ok();
    }

    [HttpGet("zones")]
    [Authorize]
    public async Task<ActionResult<ZoneResponse>> GetZonesAsync(CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();

        var zones = await _supabaseClient.From<ExternalModels.Zone>().Get();

        var mappedZones = _mapper.ToZones(zones.Models.ToArray());

        return new ZoneResponse
        {
            Zones = mappedZones
        };
    }
}
