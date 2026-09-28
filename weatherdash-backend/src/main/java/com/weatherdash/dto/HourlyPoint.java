package com.weatherdash.dto;

public record HourlyPoint(
    String time,
    double tempC,
    int weatherCode,
    String condition,
    String icon
) {}
