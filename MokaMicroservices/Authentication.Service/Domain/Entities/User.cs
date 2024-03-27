using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SharedLibrary.Attributes;

namespace Authentication.Service;

public class User
{
    [NanoId]
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public string UserId { get; set; }
    public int Id { get; set; }
    public string Username { get; set; }
    public string PasswordHash { get; set; }
}