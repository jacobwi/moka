# Bookmarking Application Login and Initial Bookmark Retrieval Workflow

1. **User Login:**
    - The user logs into the Bookmarking application, providing credentials (username and password).

2. **Request to API Gateway (Ocelot):**
    - The login request is sent to Ocelot, the API Gateway, which routes the request to the AuthenticationService.

```plaintext
User -> [Login Request] -> Ocelot API Gateway -> AuthenticationService
```

3. **AuthenticationService Processing:**
    - AuthenticationService validates the user credentials.
    - A `BaseUserDto` is constructed with basic user information (username, email, roles).
    - AuthenticationService generates an authentication token (e.g., JWT) and sends it back, along with the `BaseUserDto`.

```csharp
public class BaseUserDto
{
    public string Username { get; set; }
    public string Email { get; set; }
    // Other fields...
}
```

4. **Request for Initial Bookmarks:**
    - Once logged in, the application automatically requests the user's initial bookmarks.
    - This request, with the authentication token, is sent to Ocelot, which routes it to the Bookmarking Service.

```plaintext
User -> [Request for Bookmarks with Token] -> Ocelot API Gateway -> Bookmarking Service
```

5. **Bookmarking Service Interaction:**
    - Bookmarking Service validates the authentication token.
    - It retrieves the user entity, now needing bookmark information. An `ExtendedUserDto` is used, which includes bookmark details.

```csharp
public class ExtendedUserDto : BaseUserDto  // Inherits BaseUserDto
{
    public List<BookmarkDto> Bookmarks { get; set; }
    // Additional bookmark-specific fields...
}
```

6. **Retrieving Bookmarks:**
    - Bookmarking Service fetches the initial set of bookmarks for the user from the database.
    - These bookmarks are mapped to a list of `BookmarkDto` and included in the `ExtendedUserDto`.

```csharp
public class BookmarkDto
{
    public string URL { get; set; }
    public string Title { get; set; }
    // Other bookmark details...
}
```

7. **Response to User:**
    - The `ExtendedUserDto`, now containing the user's initial bookmarks, is sent back through Ocelot to the user.

```plaintext
Bookmarking Service -> [ExtendedUserDto with Bookmarks] -> Ocelot API Gateway -> User
```

8. **Displaying Bookmarks:**
    - The Bookmarking application displays the initial set of bookmarks to the user, completing the login and initial data retrieval process.

