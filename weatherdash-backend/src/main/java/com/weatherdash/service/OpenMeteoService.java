package com.weatherdash.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.weatherdash.dto.*;
import com.weatherdash.util.WeatherCodeMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
public class OpenMeteoService {
    
    private final RestClient restClient;
    private final ObjectMapper objectMapper;
    
    @Value("${openmeteo.geocoding.url}")
    private String geocodingUrl;
    
    @Value("${openmeteo.forecast.url}")
    private String forecastUrl;
    
    public OpenMeteoService(RestClient.Builder restClientBuilder, ObjectMapper objectMapper) {
        this.restClient = restClientBuilder.build();
        this.objectMapper = objectMapper;
    }
    
    public List<GeocodingResult> geocode(String query) {
        String url = geocodingUrl + "?name=" + query + "&count=10&language=en&format=json";
        
        String response = restClient.get()
                .uri(url)
                .retrieve()
                .body(String.class);
        
        List<GeocodingResult> results = new ArrayList<>();
        
        try {
            JsonNode root = objectMapper.readTree(response);
            JsonNode resultsNode = root.get("results");
            
            if (resultsNode != null && resultsNode.isArray()) {
                for (JsonNode node : resultsNode) {
                    results.add(new GeocodingResult(
                        node.get("name").asText(),
                        node.has("admin1") ? node.get("admin1").asText() : "",
                        node.has("country") ? node.get("country").asText() : "",
                        node.has("country_code") ? node.get("country_code").asText() : "",
                        node.get("latitude").asDouble(),
                        node.get("longitude").asDouble()
                    ));
                }
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse geocoding response", e);
        }
        
        return results;
    }
    
    public WeatherResponse getWeather(double lat, double lon, String name, String admin, String country) {
        String url = String.format(
            "%s?latitude=%.4f&longitude=%.4f&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m" +
            "&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto",
            forecastUrl, lat, lon
        );
        
        String response = restClient.get()
                .uri(url)
                .retrieve()
                .body(String.class);
        
        try {
            JsonNode root = objectMapper.readTree(response);
            
            // Parse timezone
            String timezone = root.get("timezone").asText();
            
            // Current weather
            JsonNode current = root.get("current");
            int currentCode = current.get("weather_code").asInt();
            CurrentWeather currentWeather = new CurrentWeather(
                current.get("temperature_2m").asDouble(),
                current.get("apparent_temperature").asDouble(),
                current.get("relative_humidity_2m").asInt(),
                current.get("wind_speed_10m").asDouble(),
                currentCode,
                WeatherCodeMapper.getCondition(currentCode),
                WeatherCodeMapper.getIcon(currentCode)
            );
            
            // Hourly (filter for now until midnight)
            List<HourlyPoint> hourly = parseHourlyData(root.get("hourly"), timezone);
            
            // Daily
            List<DailyPoint> daily = parseDailyData(root.get("daily"));
            
            LocationInfo location = new LocationInfo(
                name != null && !name.isEmpty() ? name : "Location",
                admin != null ? admin : "",
                country != null ? country : "",
                lat,
                lon
            );
            
            return new WeatherResponse(location, currentWeather, hourly, daily);
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse weather response", e);
        }
    }
    
    private List<HourlyPoint> parseHourlyData(JsonNode hourly, String timezone) {
        List<HourlyPoint> points = new ArrayList<>();
        JsonNode times = hourly.get("time");
        JsonNode temps = hourly.get("temperature_2m");
        JsonNode codes = hourly.get("weather_code");

        ZoneId zone;
        try {
            zone = ZoneId.of(timezone);
        } catch (Exception e) {
            zone = ZoneId.systemDefault();
        }

        // Open-Meteo returns local times without an offset, so compare in the location's zone
        LocalDateTime currentHour = LocalDateTime.now(zone).truncatedTo(ChronoUnit.HOURS);
        LocalDateTime midnight = currentHour.toLocalDate().plusDays(1).atStartOfDay();

        for (int i = 0; i < times.size(); i++) {
            String timeStr = times.get(i).asText();
            LocalDateTime hourTime = LocalDateTime.parse(timeStr);

            if (!hourTime.isBefore(currentHour) && hourTime.isBefore(midnight)) {
                int code = codes.get(i).asInt();
                points.add(new HourlyPoint(
                    timeStr,
                    temps.get(i).asDouble(),
                    code,
                    WeatherCodeMapper.getCondition(code),
                    WeatherCodeMapper.getIcon(code)
                ));
            }
        }
        
        return points;
    }
    
    private List<DailyPoint> parseDailyData(JsonNode daily) {
        List<DailyPoint> points = new ArrayList<>();
        JsonNode dates = daily.get("time");
        JsonNode maxTemps = daily.get("temperature_2m_max");
        JsonNode minTemps = daily.get("temperature_2m_min");
        JsonNode codes = daily.get("weather_code");
        
        int limit = Math.min(7, dates.size());
        for (int i = 0; i < limit; i++) {
            int code = codes.get(i).asInt();
            points.add(new DailyPoint(
                dates.get(i).asText(),
                maxTemps.get(i).asDouble(),
                minTemps.get(i).asDouble(),
                code,
                WeatherCodeMapper.getCondition(code),
                WeatherCodeMapper.getIcon(code)
            ));
        }
        
        return points;
    }
}
