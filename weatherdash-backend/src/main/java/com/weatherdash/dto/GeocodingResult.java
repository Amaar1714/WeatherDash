package com.weatherdash.dto;

public record GeocodingResult(
    String name,
    String admin,
    String country,
    String countryCode,
    double lat,
    double lon
) {}
