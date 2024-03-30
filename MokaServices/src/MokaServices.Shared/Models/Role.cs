namespace MokaServices.Shared.Models;

public class Role
{
    public string Name { get; set; }
    public string Description { get; set; }
    public List<Permission> Permissions { get; set; }
}

public class Permission
{
    public string Name { get; set; }
    public string Description { get; set; }
    public List<Action> Actions { get; set; }
}

public class Action
{
    public string Name { get; set; }
    public string Description { get; set; }
}