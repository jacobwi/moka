#region

using MokaServices.AuthenticationService.Domain.Entities;

#endregion

namespace AuthenticationService.Domain.UnitTests.Entites;

public class BasePermissionsTests
{
    [Fact]
    public void BasePermission_SetProperties_ValuesAssignedCorrectly()
    {
        // Arrange
        var permissionName = "ManageUsers";
        var description = "Allows managing user accounts";

        // Act
        var permission = new BasePermission
        {
            Name = permissionName,
            Description = description
        };

        // Assert
        Assert.Equal(permissionName, permission.Name);
        Assert.Equal(description, permission.Description);
    }

    [Fact]
    public void BasePermission_EqualityCheck()
    {
        // Arrange
        var permissionName = "ManageUsers";
        var permission1 = new BasePermission { Name = permissionName };
        var permission2 = new BasePermission { Name = permissionName };

        // Act & Assert
        Assert.Equal(permission1,
            permission2);
    }
}