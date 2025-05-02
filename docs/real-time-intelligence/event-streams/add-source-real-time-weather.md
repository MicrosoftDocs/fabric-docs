---
title: Add a real-time weather source to an eventstream
description: Learn how to add a real-time weather source to an eventstream.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.custom:
ms.date: 4/24/2025
ms.search.form: Source and Destination
---

# Add a real-time weather source to an eventstream (preview)

[!INCLUDE [real-time-weather-source-description-prerequisites](./includes/real-time-weather-source-description-prerequisites.md)] 

- [Create an eventstream](create-manage-an-eventstream.md) if you don't have one already.

## Add a real-time weather as a source

[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for and select **Connect** on the **real-time weather** tile.

:::image type="content" source="./media/add-source-real-time-weather/select-real-time-weather.png" alt-text="Screenshot that shows the selection of real-time weather as the source type in the Select a data source wizard." lightbox="./media/add-source-real-time-weather/select-real-time-weather.png":::

## Configure real-time weather

[!INCLUDE [real-time-weather](./includes/real-time-weather.md)]

## View updated eventstream

1. You see the real-time weather source added to your eventstream in **Edit mode**. Select **Publish** to publish the changes and begin streaming real-time weather data to the eventstream.

    :::image type="content" source="media/add-source-real-time-weather/edit-mode.png" alt-text="A screenshot of the added real-time weather source in Edit mode with the Publish button highlighted." lightbox="./media/add-source-real-time-weather/edit-mode.png":::
1. After you complete these steps, the source is available for visualization in the **Live view**. Select the **real-time weather** tile in the diagram to see the page similar to the following one.

    :::image type="content" source="media/add-source-real-time-weather/live-view.png" alt-text="A screenshot of the published eventstream with real-time weather source in Live View." lightbox="./media/add-source-real-time-weather/live-view.png":::

[!INCLUDE [sources-do-not-support-data-preview](./includes/sources-do-not-support-data-preview.md)]

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