# Project Reference Mapping for MokaServices.AuthenticationService

## Source Projects

- `MokaServices.AuthenticationService.Domain`
    - No references to other projects (most isolated layer)

- `MokaServices.AuthenticationService.Application`
    - References:
        - `MokaServices.AuthenticationService.Domain`

- `MokaServices.AuthenticationService.Infrastructure`
    - References:
        - `MokaServices.AuthenticationService.Application`

- `MokaServices.AuthenticationService.API`
    - References:
        - `MokaServices.AuthenticationService.Application`
        - `MokaServices.AuthenticationService.Infrastructure` (for DI configuration only)

## Test Projects

- `MokaServices.AuthenticationService.Domain.UnitTests`
    - References:
        - `MokaServices.AuthenticationService.Domain`

- `MokaServices.AuthenticationService.Application.UnitTests`
    - References:
        - `MokaServices.AuthenticationService.Application`
        - `MokaServices.AuthenticationService.Domain`

- `MokaServices.AuthenticationService.API.IntegrationTests`
    - References:
        - `MokaServices.AuthenticationService.API`
        - `MokaServices.AuthenticationService.Application` (if needed for mocking/application service usage in tests)
