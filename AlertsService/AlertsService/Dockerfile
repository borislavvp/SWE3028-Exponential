#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["AlertsService/AlertsService.csproj", "AlertsService/"]
RUN dotnet restore "AlertsService/AlertsService.csproj"
COPY . .
WORKDIR "/src/AlertsService"
RUN dotnet build "AlertsService.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "AlertsService.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AlertsService.dll"]