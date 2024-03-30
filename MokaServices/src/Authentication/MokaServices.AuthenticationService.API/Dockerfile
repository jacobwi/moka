FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/Authentication/MokaServices.AuthenticationService.API/MokaServices.AuthenticationService.API.csproj", "src/Authentication/MokaServices.AuthenticationService.API/"]
COPY ["src/MokaServices.Shared/MokaServices.Shared.csproj", "src/MokaServices.Shared/"]
COPY ["src/Authentication/MokaServices.AuthenticationService.Application/MokaServices.AuthenticationService.Application.csproj", "src/Authentication/MokaServices.AuthenticationService.Application/"]
COPY ["src/Authentication/MokaServices.AuthenticationService.Domain/MokaServices.AuthenticationService.Domain.csproj", "src/Authentication/MokaServices.AuthenticationService.Domain/"]
COPY ["src/Authentication/MokaServices.AuthenticationService.Infrastructure/MokaServices.AuthenticationService.Infrastructure.csproj", "src/Authentication/MokaServices.AuthenticationService.Infrastructure/"]
RUN dotnet restore "src/Authentication/MokaServices.AuthenticationService.API/MokaServices.AuthenticationService.API.csproj"
COPY . .
WORKDIR "/src/src/Authentication/MokaServices.AuthenticationService.API"
RUN dotnet build "MokaServices.AuthenticationService.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "MokaServices.AuthenticationService.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MokaServices.AuthenticationService.API.dll"]
