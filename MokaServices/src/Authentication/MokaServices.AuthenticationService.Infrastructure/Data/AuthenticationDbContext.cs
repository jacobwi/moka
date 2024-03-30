#region

using Microsoft.EntityFrameworkCore;
using MokaServices.AuthenticationService.Domain.Entities;

#endregion

namespace MokaServices.AuthenticationService.Infrastructure.Data;

public class AuthenticationDbContext(DbContextOptions<AuthenticationDbContext> options) : DbContext(options)
{
    public DbSet<BaseUser> Users { get; set; }
    public DbSet<BaseRole> Roles { get; set; }
    public DbSet<BasePermission> Permissions { get; set; }
}