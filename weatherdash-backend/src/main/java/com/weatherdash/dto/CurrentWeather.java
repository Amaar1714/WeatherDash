package com.weatherdash.dto;

public record CurrentWeather(
    double tempC,
    double feelsLikeC,
    int humidity,
    double windKmh,
    int weatherCode,
    String condition,
    String icon
) {}
