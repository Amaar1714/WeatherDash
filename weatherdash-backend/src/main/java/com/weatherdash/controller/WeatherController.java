package com.weatherdash.controller;

import com.weatherdash.dto.GeocodingResult;
import com.weatherdash.dto.WeatherResponse;
import com.weatherdash.service.OpenMeteoService;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class WeatherController {
    
    private final OpenMeteoService openMeteoService;
    
    public WeatherController(OpenMeteoService openMeteoService) {
        this.openMeteoService = openMeteoService;
    }
    
    @GetMapping("/geocode")
    public ResponseEntity<List<GeocodingResult>> geocode(@RequestParam("q") @NotBlank String query) {
        if (query.trim().length() < 2) {
            return ResponseEntity.badRequest().build();
        }
        
        List<GeocodingResult> results = openMeteoService.geocode(query.trim());
        return ResponseEntity.ok(results);
    }
    
    @GetMapping("/weather")
    public ResponseEntity<WeatherResponse> getWeather(
            @RequestParam("lat") double lat,
            @RequestParam("lon") double lon,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "admin", required = false) String admin,
            @RequestParam(value = "country", required = false) String country
    ) {
        WeatherResponse response = openMeteoService.getWeather(lat, lon, name, admin, country);
        return ResponseEntity.ok(response);
    }
}
