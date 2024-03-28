using Microsoft.EntityFrameworkCore;
using MokaServices.AuthenticationService.Domain.Entities;

namespace MokaServices.AuthenticationService.Infrastructure.Data;

public class AuthenticationDbContext : DbContext
{
    public DbSet<BaseUser> Users { get; set; }
    public DbSet<BaseRole> Roles { get; set; }
    public DbSet<BasePermission> Permissions { get; set; }

    public AuthenticationDbContext(DbContextOptions<AuthenticationDbContext> options)
        : base(options) { }
}
