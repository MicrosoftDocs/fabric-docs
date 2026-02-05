---
title: Digital twin builder (preview) in Real-Time Intelligence tutorial introduction
description: Get started with a sample scenario that uses digital twin builder (preview) with Real-Time Intelligence features.
author: baanders
ms.author: baanders
ms.date: 11/10/2025
ms.topic: tutorial
---

# Digital twin builder (preview) in Real-Time Intelligence tutorial: Introduction

Digital twin builder (preview) is an item in the [Real-Time Intelligence](../overview.md) workload in [Microsoft Fabric](../../fundamentals/microsoft-fabric-overview.md). It creates digital representations of real-world environments to optimize physical operations using data.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

In this tutorial, you learn how to set up a digital twin builder item and use it to build an ontology that contextualizes sample data streamed from an eventstream. After building the ontology in digital twin builder, you use shortcuts to expose the data in an eventhouse, and query it using KQL (Kusto Query Language) queries. Then, you visualize these query results in a Real-Time Dashboard.

<!--## Prerequisites (title in include)-->
[!INCLUDE [Prerequisites for digital twin builder](../includes/digital-twin-builder-prerequisites.md)]

## Tutorial scenario

The sample scenario used in this tutorial is a set of bus data, containing information about bus movements and locations. By using digital twin builder (preview) to contextualize and model the data, you can analyze and estimate bus behavior.

This analysis includes estimating whether a bus will be late at the next stop, while also using borough-level location data to analyze delay patterns. The analysis can be used to estimate delays at individual stops and identify geographic trends, like which stops and boroughs experience more frequent delays.

## Tutorial data summary

In this tutorial, you combine data from two data sources: real-time bus movement and timing details (fact data), and precise geographic and contextual bus stop data (dimensional data). Contextualizing the bus data in digital twin builder (preview) enables dynamic analysis and operational insights. Incorporating static bus stop data establishes a foundation for localized analysis and identifying delay patterns. Additionally, the borough ownership and locality data from the stop data enables understanding of broader geographical trends and overall transit efficiency.

The following tables summarize the data included with each data source. 

### Bus data

This data set is real-time data that provides information about bus movements. It's streamed through Real-Time Intelligence.

| Field | Description |
| --- | --- |
| `Timestamp`| The time the data snapshot was taken (real-time system time). |
| `TripId` | The unique identifier for each trip instance, like a specific bus run on a route. Useful for tracking individual bus journeys. |
| `BusLine` | The route number, like 110 or 99. Useful for grouping trips and stops for pattern detection on specific lines. |
| `StationNumber` | The stop sequence within a trip (1 being the first stop). Useful for tracking how a bus progresses along a route. |
| `ScheduleTime` | The scheduled time at which the bus should reach the next station on its route. Useful for calculating delays. |
| `Properties` | A JSON field that contains two values: `BusState` that can be `InMotion` or `Arrived` (indicates movement status), and `TimeToNextStation`, which is the estimated time remaining to reach the next stop. This JSON field column needs to be separated for use in digital twin builder (preview). |

### Bus stop data

This data set is dimensional data about bus stops. It provides (simulated) contextual information about where the stops are located. This data is uploaded as a static file to the tutorial lakehouse.

| Field | Description |
| --- | --- |
| `Stop_Code` | The unique identifier for the bus stop. |
| `Stop_Name` | The name of the bus stop, like *Abbey Wood Road*. |
| `Latitude` | The latitude of the bus stop. Useful for map visualizations or calculating distances between stops. |
| `Longitude` | The longitude of the bus stop. Useful for map visualizations or calculating distances between stops. |
| `Road_Name` | The road where the stop is located. Useful for identifying road-specific trends. |
| `Borough` | The borough where the stop is located, like *Greenwich*. Useful for aggregation and geographical analysis. |
| `Borough_ID` | A numerical ID for the borough. Could potentially be used for joining with borough-level datasets. |
| `Suggested_Locality` | The neighborhood or local area the stop belongs to, like *Abbey Wood*. More granular than borough and helpful for local analysis. |
| `Locality_ID` | A numerical identifier for the locality. |

## Tutorial steps

In this tutorial, you complete the following steps to build out the bus data scenario:

> [!div class="checklist"]
>
> * Set up your environment and upload static, contextual sample data into a lakehouse
> * Process streaming data and get it into the lakehouse
> * Build an ontology in digital twin builder (preview)
> * Project the ontology data to Eventhouse by using a Fabric notebook
> * Create KQL queries and a Real-Time Dashboard to explore and visualize the data

## Next step

> [!div class="nextstepaction"]
> [Tutorial part 1: Upload contextual data](tutorial-rti-1-upload-contextual-data.md)