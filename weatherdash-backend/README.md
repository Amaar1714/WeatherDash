# WeatherDash Backend

Spring Boot REST API proxy for Open-Meteo weather service.

## Run

Requires Java 21 or higher.

```bash
./mvnw spring-boot:run
```

Or on Windows:

```bash
mvnw.cmd spring-boot:run
```

Starts on **http://localhost:8080**

## Endpoints

### Geocoding
```
GET /api/geocode?q=london
```

### Weather
```
GET /api/weather?lat=51.5074&lon=-0.1278&name=London&admin=England&country=United%20Kingdom
```
