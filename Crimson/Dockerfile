FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM node:14-alpine as build-node
WORKDIR /client
COPY "ClientApp/package.json" .
COPY "ClientApp/package-lock.json" .
RUN npm install
COPY "ClientApp/" .
RUN npm run build

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
#ENV BuildingDocker true
WORKDIR /src
COPY . .
RUN dotnet restore "Crimson.csproj"
RUN dotnet build "Crimson.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "Crimson.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
COPY --from=build-node /client/build ./ClientApp/build
ENTRYPOINT ["dotnet", "Crimson.dll"]