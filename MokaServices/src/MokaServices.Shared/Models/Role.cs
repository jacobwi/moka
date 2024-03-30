namespace MokaServices.Shared.Models;

public class Role
{
    public string Name { get; set; }
    public string Description { get; set; }
    public List<string> Permissions { get; set; }
}