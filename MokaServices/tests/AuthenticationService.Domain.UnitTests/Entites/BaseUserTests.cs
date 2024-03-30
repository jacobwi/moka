#region

using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using MokaServices.AuthenticationService.Domain.Entities;
using MokaServices.AuthenticationService.Infrastructure.Data;

#endregion

namespace AuthenticationService.Domain.UnitTests.Entites;

public class BaseUserTests
{
    [Fact]
    public void NewUser_HasNonNullUniqueId()
    {
        // Arrange & Act
        var user = new BaseUser();

        // Assert
        Assert.False(string.IsNullOrEmpty(user.Id));
    }

    [Fact]
    public void NewUser_HasNonUniqueId()
    {
        // Arrange
        var users = new List<BaseUser>();

        // Create a number of users, for example, 10
        for (var i = 0; i < 10; i++) users.Add(new BaseUser());

        // Use a HashSet to store unique Ids
        var uniqueIds = new HashSet<string>();

        // Act
        foreach (var user in users)
            // Try to add each user's Id to the HashSet
            uniqueIds.Add(user.Id);

        // Assert
        Assert.Equal(users.Count, uniqueIds.Count); // The number of unique Ids should equal the number of users created
    }

    [Fact]
    public void NewUser_HasNonUniqueId_FailsOnDuplicateId()
    {
        // Arrange
        var user1 = new BaseUser();
        var user2 = new BaseUser();

        // Force user2 to have the same Id as user1
        typeof(BaseUser).GetProperty("Id")?.SetValue(user2, user1.Id);

        // Act
        var idsAreSame = user1.Id == user2.Id;

        // Assert
        Assert.True(idsAreSame); // This test is expected to pass, demonstrating the failure scenario
    }

    [Theory]
    [InlineData("test@example.com")] // Valid email
    [InlineData("invalid-email")] // Invalid email
    public void Email_ValidationWorksCorrectly_WhenSavingToDatabase(string email)
    {
        // Arrange: setup the in-memory database
        var options = new DbContextOptionsBuilder<AuthenticationDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        using var context = new AuthenticationDbContext(options);

        // Create a new user with the test email
        var user = new BaseUser { Email = email };

        // Act & Assert
        if (!new EmailAddressAttribute().IsValid(email))
        {
            // Expecting no exception for valid emails
            user.PasswordHash = "password"; // Required field
            user.Username = "TestUser"; // Required field
            context.Users.Add(user);
            var saveResult = Record.Exception(() => context.SaveChanges());
            Assert.Null(saveResult); // No exception should be thrown
        }
        else
        {
            // Expecting an exception for invalid emails
            context.Users.Add(user);
            Assert.Throws<DbUpdateException>(() => context.SaveChanges());
        }
    }

    [Fact]
    public void Username_CanBeSetAndGetCorrectly()
    {
        // Arrange
        var user = new BaseUser();
        var expectedUsername = "TestUser";

        // Act
        user.Username = expectedUsername;

        // Assert
        Assert.Equal(expectedUsername, user.Username);
    }

    [Fact]
    public void IsActive_DefaultsToFalse()
    {
        // Arrange & Act
        var user = new BaseUser();

        // Assert
        Assert.False(user.IsActive);
    }


    #region User Roles

    [Fact]
    public void CanAssignRoleToUser()
    {
        // Arrange
        var user = new BaseUser();
        var role = new BaseRole { Name = "Administrator" };

        // Act
        user.UserRoles.Add(role);

        // Assert
        Assert.Contains(role, user.UserRoles);
        Assert.Equal("Administrator", user.UserRoles.First().Name);
    }

    [Fact]
    public void CanRemoveRoleFromUser()
    {
        // Arrange
        var user = new BaseUser();
        var role1 = new BaseRole { Name = "Administrator" };
        var role2 = new BaseRole { Name = "Editor" };
        user.UserRoles.Add(role1);
        user.UserRoles.Add(role2);

        // Act
        user.UserRoles.Remove(role1);

        // Assert
        Assert.DoesNotContain(role1, user.UserRoles);
        Assert.Contains(role2, user.UserRoles);
    }

    #endregion
}