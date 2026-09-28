package com.weatherdash.dto;

public record LocationInfo(
    String name,
    String admin,
    String country,
    double lat,
    double lon
) {}
