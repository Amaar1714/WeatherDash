package com.weatherdash.dto;

import java.util.List;

public record WeatherResponse(
    LocationInfo location,
    CurrentWeather current,
    List<HourlyPoint> hourly,
    List<DailyPoint> daily
) {}
