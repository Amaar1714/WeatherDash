package com.weatherdash.dto;

public record DailyPoint(
    String date,
    double highC,
    double lowC,
    int weatherCode,
    String condition,
    String icon
) {}
