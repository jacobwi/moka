.PHONY: build-ts serve-auth-service serve-authorization-service serve-bytebookmarks serve-lockpulse serve-gateway clean

# Build TypeScript projects
build-ts:
	cd moka-frontend-brew && pnpm install && pnpm build

# Run Authentication Service
serve-auth-service:
	cd MokaMicroservices/Authentication.Service && dotnet run

# Run Authorization Service
serve-authorization-service:
	cd MokaMicroservices/Authorization.Service && dotnet run

# Run ByteBookmarks Backend
serve-bytebookmarks:
	cd MokaMicroservices/Bytemark.Backend/ByteBookmarks.Server && dotnet run

# Run Lockpulse Backend
serve-lockpulse:
	cd MokaMicroservices/Lockpulse.Backend && dotnet run

# Run Gateway API
serve-gateway:
	cd MokaMicroservices/Gateway.API && dotnet run

# Clean build artifacts for all projects
clean:
	cd moka-frontend-brew && rm -rf dist
	cd MokaMicroservices/Authentication.Service && dotnet clean
	cd MokaMicroservices/Authorization.Service && dotnet clean
	cd MokaMicroservices/Bytemark.Backend/ByteBookmarks.Server && dotnet clean
	cd MokaMicroservices/Lockpulse.Backend && dotnet clean
	cd MokaMicroservices/Gateway.API && dotnet clean
