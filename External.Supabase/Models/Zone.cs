using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace External.Supabase.Models;

[Table("Zone")]
public class Zone : BaseModel
{
    [PrimaryKey]
    public int Id { get; set; }

    [Column("name")]
    public string? Name { get; set; }

    [Column("image")]
    public string? Image { get; set; }

    [Column("zone_id")]
    public int ZoneId { get; set; }
}
