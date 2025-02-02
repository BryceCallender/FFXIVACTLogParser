using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace External.Supabase.Models;

[Table("LogEvent")]
public class LogEvent : BaseModel
{
    [PrimaryKey("id")]
    public int Id { get; set; }

    [Column("report_id")]
    public long ReportId { get; set; }

    [Column("fight")]
    public int Fight { get; set; }

    [Column("type")]
    public int EventType { get; set; }

    [Column("value")]
    public string? EventValue { get; set; }
}
