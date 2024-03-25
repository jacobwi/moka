namespace Authentication.Service.Infrastructure;

public class UserRepository : IUserRepository
{
    public Task<User> GetUserByUsernameAsync(string username)
    {
        throw new NotImplementedException();
    }
}