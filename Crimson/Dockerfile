FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM node:14-alpine as build-client
WORKDIR /client
COPY "ClientApp/package.json" .
COPY "ClientApp/package-lock.json" .
RUN npm install
COPY "ClientApp/" .
RUN npm run build

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY "Crimson.csproj" .
RUN dotnet restore
COPY . .
RUN dotnet publish "Crimson.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=build /app .
COPY --from=build-client /client/build ./ClientApp/build
ENTRYPOINT ["dotnet", "Crimson.dll"]