package com.weatherdash.util;

import java.util.Map;

public class WeatherCodeMapper {
    
    private record WeatherInfo(String condition, String icon) {}
    
    private static final Map<Integer, WeatherInfo> WMO_CODE_MAP = Map.ofEntries(
        Map.entry(0, new WeatherInfo("Clear sky", "sun")),
        Map.entry(1, new WeatherInfo("Mainly clear", "sun")),
        Map.entry(2, new WeatherInfo("Partly cloudy", "cloud-sun")),
        Map.entry(3, new WeatherInfo("Overcast", "cloud")),
        Map.entry(45, new WeatherInfo("Fog", "cloud-fog")),
        Map.entry(48, new WeatherInfo("Depositing rime fog", "cloud-fog")),
        Map.entry(51, new WeatherInfo("Light drizzle", "cloud-rain")),
        Map.entry(53, new WeatherInfo("Moderate drizzle", "cloud-rain")),
        Map.entry(55, new WeatherInfo("Dense drizzle", "cloud-rain")),
        Map.entry(56, new WeatherInfo("Light freezing drizzle", "cloud-rain")),
        Map.entry(57, new WeatherInfo("Dense freezing drizzle", "cloud-rain")),
        Map.entry(61, new WeatherInfo("Slight rain", "cloud-rain")),
        Map.entry(63, new WeatherInfo("Moderate rain", "cloud-rain")),
        Map.entry(65, new WeatherInfo("Heavy rain", "cloud-rain")),
        Map.entry(66, new WeatherInfo("Light freezing rain", "cloud-rain")),
        Map.entry(67, new WeatherInfo("Heavy freezing rain", "cloud-rain")),
        Map.entry(71, new WeatherInfo("Slight snow", "cloud-snow")),
        Map.entry(73, new WeatherInfo("Moderate snow", "cloud-snow")),
        Map.entry(75, new WeatherInfo("Heavy snow", "cloud-snow")),
        Map.entry(77, new WeatherInfo("Snow grains", "cloud-snow")),
        Map.entry(80, new WeatherInfo("Slight rain showers", "cloud-rain")),
        Map.entry(81, new WeatherInfo("Moderate rain showers", "cloud-rain")),
        Map.entry(82, new WeatherInfo("Violent rain showers", "cloud-rain")),
        Map.entry(85, new WeatherInfo("Slight snow showers", "cloud-snow")),
        Map.entry(86, new WeatherInfo("Heavy snow showers", "cloud-snow")),
        Map.entry(95, new WeatherInfo("Thunderstorm", "cloud-lightning")),
        Map.entry(96, new WeatherInfo("Thunderstorm with slight hail", "cloud-lightning")),
        Map.entry(99, new WeatherInfo("Thunderstorm with heavy hail", "cloud-lightning"))
    );
    
    public static String getCondition(int wmoCode) {
        return WMO_CODE_MAP.getOrDefault(wmoCode, new WeatherInfo("Unknown", "cloud")).condition();
    }
    
    public static String getIcon(int wmoCode) {
        return WMO_CODE_MAP.getOrDefault(wmoCode, new WeatherInfo("Unknown", "cloud")).icon();
    }
}
