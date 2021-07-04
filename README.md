# Crimson

Crimson started out as a scratchpad project to try out SignalR and React then morphed into a collection of useful tools.

It's a C# ASP.NET Core backend with SignalR and a TypeScript React frontend.

## Build

Clone the solution then restore dependancies required for the frontend...

```bash
cd .\Crimson\ClientApp
npm install
```

Then build and run the application....

```bash
cd .\Crimson
dotnet restore
dotnet run
```

## Docker

The application can also be run in a docker container...

```bash
cd .\Crimson
docker build . -t crimson:latest
docker run -p5000:80 crimson
```
