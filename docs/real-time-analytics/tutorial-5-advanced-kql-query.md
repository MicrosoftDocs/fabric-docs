---
title: "Synapse Real-Time Analytics tutorial part 5: Use advanced KQL queries"
description: Part 5 of the Real-Time Analytics tutorial in Microsoft Fabric
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.date: 05/23/2023
ms.search.form: product-kusto
---
# Real-Time Analytics tutorial part 5: Use advanced KQL queries

[!INCLUDE [preview-note](../includes/preview-note.md)]

> [!NOTE]
> This tutorial is part of a series. For the previous section, see:   [Tutorial part 4: Enrich your data](tutorial-4-enrich-data.md)

In this module, you'll write queries using [Kusto Query Language](/azure/data-explorer/kusto/query/) to explore the NYC Taxi data and the location data. Kusto Query Language is a powerful tool to explore your data and discover patterns, identify anomalies and outliers, create statistical modeling, and more. The query uses schema entities that are organized in a hierarchy similar to SQLs: databases, tables, and columns. A KQL query is a read-only request to process data and return results. The request is stated in plain text, using a data-flow model that is easy to read, author, and automate. 
## Query data

The first step in data analysis is often to take a look at a subset of the data itself.

1. Paste the following query in the query editor to take 10 arbitrary records from the specified table.

    ```kusto
    nyctaxitrips
    | take 10
    ```

1. Select **Run** or press **Shift + Enter**.

    :::image type="content" source="media/realtime-analytics-tutorial/results-take-10.png" alt-text="Screenshot of take 10 results in Real-Time Analytics in Microsoft Fabric.":::

    The specific lines returned in your query may vary. 

1.  The following query returns the top 10 pickup locations in New York City for Yellow Taxis.

    ```kusto
    nyctaxitrips
    | summarize Count=count() by PULocationID
    | top 10 by Count 
    ```

    :::image type="content" source="media/realtime-analytics-tutorial/top-10-by-count.png" alt-text="Screenshot of query result in Real-Time Analytics in Microsoft Fabric.":::

1. This query adds a step to the previous query by looking up the corresponding zones of the top 10 pickup locations using the *Locations* table.

    ```kusto
    nyctaxitrips
    | lookup (Locations) on $left.PULocationID == $right.LocationID
    | summarize Count=count() by Zone
    | top 10 by Count
    | render columnchart
    ```

    :::image type="content" source="media/realtime-analytics-tutorial/top-10-locations.png" alt-text="Screenshot of top 10 location results in Real-Time Analytics in Microsoft Fabric.":::

1.  Let's check anomalies in the tips that have been given by the customers in the Manhattan borough. Hover over the red dots to see the values.

    ```kusto
    nyctaxitrips
    | lookup (Locations) on $left.PULocationID==$right.LocationID
    | where Borough == "Manhattan"
    | make-series s1 = avg(tip_amount) on tpep_pickup_datetime from datetime(2022-06-01) to datetime(2022-06-04) step 1h
    | extend anomalies = series_decompose_anomalies(s1)
    | render anomalychart with (anomalycolumns=anomalies)
    ```

    :::image type="content" source="media/realtime-analytics-tutorial/anomaly-chart.png" alt-text="Screenshot of anomaly chart result in Real-Time Analytics in Microsoft Fabric.":::

1.  To ensure that the sufficient taxis are working in the Manhattan borough, forecast the number of taxis needed per hour.

    ```kusto
    nyctaxitrips
    | lookup (Locations) on $left.PULocationID==$right.LocationID
    | where Borough == "Manhattan"
    | make-series s1 = count() on tpep_pickup_datetime from datetime(2022-06-01) to datetime(2022-06-08)+3d step 1h by PULocationID
    | extend forecast = series_decompose_forecast(s1, 24*3)
    | render timechart
    ```
    :::image type="content" source="media/realtime-analytics-tutorial/forecast-results.png" alt-text="Screenshot of forecast results in Real-Time Analytics in Microsoft Fabric.":::

## Next steps

> [!div class="nextstepaction"]
> [Tutorial part 6: Build a Power BI report](tutorial-6-build-report.md)