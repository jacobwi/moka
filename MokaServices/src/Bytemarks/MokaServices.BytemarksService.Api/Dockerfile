FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/Bytemarks/MokaServices.BytemarksService.Api/MokaServices.BytemarksService.Api.csproj", "src/Bytemarks/MokaServices.BytemarksService.Api/"]
COPY ["src/Bytemarks/MokaServices.BytemarksService.Application/MokaServices.BytemarksService.Application.csproj", "src/Bytemarks/MokaServices.BytemarksService.Application/"]
COPY ["src/Bytemarks/MokaServices.BytemarksService.Domain/MokaServices.BytemarksService.Domain.csproj", "src/Bytemarks/MokaServices.BytemarksService.Domain/"]
COPY ["src/MokaServices.Shared/MokaServices.Shared.csproj", "src/MokaServices.Shared/"]
COPY ["src/Bytemarks/MokaServices.BytemarksService.Infrastructure/MokaServices.BytemarksService.Infrastructure.csproj", "src/Bytemarks/MokaServices.BytemarksService.Infrastructure/"]
RUN dotnet restore "src/Bytemarks/MokaServices.BytemarksService.Api/MokaServices.BytemarksService.Api.csproj"
COPY . .
WORKDIR "/src/src/Bytemarks/MokaServices.BytemarksService.Api"
RUN dotnet build "MokaServices.BytemarksService.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "MokaServices.BytemarksService.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MokaServices.BytemarksService.Api.dll"]
