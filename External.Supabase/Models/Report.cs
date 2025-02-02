using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace External.Supabase.Models;

[Table("Report")]
public class Report : BaseModel
{
    [PrimaryKey("id")]
    public long Id { get; set; }

    [Column("name")]
    public string? Name { get; set; }

    [Column("owner")]
    public Guid Owner { get; set; }

    [Column("created_at")]
    public DateTimeOffset? CreatedDate { get; set; }
}
