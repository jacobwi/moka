#region

using MokaServices.AuthenticationService.Domain.Entities;

#endregion

namespace AuthenticationService.Domain.UnitTests.Entites;

public class BaseRoleTests
{
    [Fact]
    public void BaseRole_SetProperties_ValuesAssignedCorrectly()
    {
        // Arrange
        var roleName = "Admin";
        var permission = new BasePermission { Name = "ManageUsers", Description = "Can manage users" };

        // Act
        var role = new BaseRole
        {
            Name = roleName,
            Permissions = new List<BasePermission> { permission }
        };

        // Assert
        Assert.Equal(roleName, role.Name);
        Assert.Single(role.Permissions);
        Assert.Contains(permission, role.Permissions);
    }

    [Fact]
    public void AddPermission_ToRole_PermissionAdded()
    {
        // Arrange
        var role = new BaseRole { Name = "Editor" };
        var permission = new BasePermission { Name = "EditContent", Description = "Can edit content" };

        // Act
        role.Permissions.Add(permission);

        // Assert
        Assert.Contains(permission, role.Permissions);
    }


    [Fact]
    public void RemovePermission_FromRole_PermissionRemoved()
    {
        // Arrange
        var permission = new BasePermission { Name = "EditContent", Description = "Can edit content" };
        var role = new BaseRole
        {
            Name = "Editor",
            Permissions = new List<BasePermission> { permission }
        };

        // Act
        role.Permissions.Remove(permission);

        // Assert
        Assert.DoesNotContain(permission, role.Permissions);
    }

    [Fact]
    public void AddPermission_Duplicate_NotAdded()
    {
        // Arrange
        var role = new BaseRole { Name = "Editor" };
        var permission = new BasePermission { Name = "EditContent", Description = "Can edit content" };
        role.Permissions.Add(permission);

        // Act
        role.Permissions.Add(permission); // Attempt to add the same permission again

        // Assert
        Assert.Single(role.Permissions); // Expect only one permission, not two
    }

    [Fact]
    public void Roles_WithSameName_AreEqual()
    {
        // Arrange
        var role1 = new BaseRole { Name = "Editor" };
        var role2 = new BaseRole { Name = "Editor" };

        // Act & Assert
        Assert.Equal(role1, role2);
    }
}