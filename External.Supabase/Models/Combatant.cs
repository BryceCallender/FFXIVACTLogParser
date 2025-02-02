using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace External.Supabase.Models;

[Table("Combatant")]
public class Combatant : BaseModel
{
    [PrimaryKey("id")]
    public long Id { get; set; }

    [Column("report_id")]
    public long ReportId { get; set; }

    [Column("source_id")]
    public long SourceId { get; set; }

    [Column("name")]
    public string? Name { get; set; }

    [Column("job_id")]
    public int? JobId { get; set; }

    [Column("fight")]
    public int Fight { get; set; }
}
