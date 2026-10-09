---
title: Fields for Real-Time weather source
description: The include file provides fields for the Real-Time weather source.
ms.reviewer: zhenxilin
ms.topic: include
ms.date: 04/01/2026
---

## Weather data fields

The Weather connector retrieves a structured set of fields for each weather update. Here's a description of the key fields:

|Name             |Type                |Description      |
|-----------------|--------------------|-----------------|
|dateTime         | string (date-time) | Date and time of the current observation displayed in ISO 8601 format, for example, 2019-10-27T19:39:57-08:00.|
|description      | string             | Phrase description of the current weather condition. Displayed in specified language.|
|iconCode         | IconCode (int32)   | Numeric value representing an image that displays the iconPhrase. |
|hasPrecipitation | boolean            | Indicates the presence or absence of precipitation. True indicates the presence of precipitation; false indicates the absence of precipitation.|
|temperature                     | WeatherUnit        | Temperature being returned.|
|realFeelTemperature             | WeatherUnit        | RealFeel™ Temperature being returned.|
|realFeelTemperatureShade        | WeatherUnit        | RealFeel™ Temperature being returned. Describes what the temperature really feels like in the shade.|
|relativeHumidity                | integer (int32)    | Relative humidity is the amount of water vapor present in air expressed as a percentage of the amount needed for saturation at the same temperature.|
|dewPoint                        | WeatherUnit        | The dewpoint temperature in specified unit. The dewpoint temperature is the temperature that the air must be cooled to in order to reach saturation.|
|wind                            | WindDetails        | Wind details being returned including speed and direction.|
|windGust                        | WindDetails        | Wind gust. Wind gust is a sudden, brief increase in speed of the wind.|
|uvIndex                         | integer (int32)    | Measure of the strength of the ultraviolet radiation from the sun. |
|uvIndexDescription              | WeatherUnit        | Description of the strength of the ultraviolet radiation from the sun. |
|visibility                      | WeatherUnit        | Visibility in specified unit. A measure of the distance at which an object or light can be clearly discerned.|
|obstructionsToVisibility        | string             | Cause of limited visibility.|
|cloudCover                      | integer (int32)    | Percent representing cloud cover.|
|cloudCeiling                    | WeatherUnit        | Cloud ceiling in specified unit. The ceiling is a measurement of the height of the base of the lowest clouds.|
|pressure                        | WeatherUnit        | Atmospheric pressure in specified unit.|
|pressureTendency                | PressureTendency        | Atmospheric pressure change.|
|pastTwentyFourHourTemperatureDeparture| WeatherUnit        | Departure from the temperature observed 24 hours ago in specified unit.|
|apparentTemperature             | WeatherUnit        | Perceived outdoor temperature caused by the combination of air temperature, relative humidity, and wind speed in specified unit.|
|windChillTemperature            | WeatherUnit        | Perceived air temperature on exposed skin due to wind.|
|wetBulbTemperature              | WeatherUnit        | Measures the temperature air can reach when water evaporates into it at constant pressure until it reaches saturation.|
|precipitationSummary            | PrecipitationSummary | Summary of precipitation amounts over the past 24 hours.|
|temperatureSummary              | TemperatureSummary   | Summary of temperature fluctuations over the past 6, 12, and 24 hours.|
|daytime                         | boolean        | Indicates the time of the day. True indicates 'day,' false indicates 'night.'|

To learn more about weather data fields and concepts, check out:

- [Weather - Get Current Conditions](/rest/api/maps/weather/get-current-conditions)
- [Weather service concepts](/azure/azure-maps/weather-services-concepts)

