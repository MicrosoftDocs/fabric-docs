---
title: Real-Time Intelligence tutorial part 5- Use advanced KQL queries
description: Learn how to query your data in a KQL queryset in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 04/21/2024
ms.search.form: Get started
---
# Real-Time Intelligence tutorial part 5: Use advanced KQL queries

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Tutorial part 4: Explore your data with KQL and SQL](tutorial-4-explore.md).

## Create a KQL queryset

In the following step, you use the advanced data analysis capabilities of Kusto Query Language to query the two tables you ingested into the database.

1. Browse to your KQL database named *NycTaxiDB*.
1. Select **New related item** > **KQL Queryset**

    :::image type="content" source="media/real-time-intelligence-tutorial/new-kql-queryset.png" alt-text="Screenshot of the New related item dropdown showing the option to create a new related KQL queryset."  lightbox="media/real-time-intelligence-tutorial/new-kql-queryset.png":::

1. Enter *nyctaxiqs* as the KQL queryset name.
1. Select **Create**. The KQL queryset opens with several autopopulated example queries.

## Query data

This section walks you through some of the query and visualization capabilities of the KQL queryset. Copy and paste the queries in your own query editor to run and visualize the results.

1. Run following query to return the top 10 pickup locations in New York City for Yellow Taxis.

    ```kusto
    nyctaxitrips
    | summarize Count=count() by PULocationID
    | top 10 by Count
    ```

    :::image type="content" source="media/real-time-intelligence-tutorial/top-10-by-count.png" alt-text="Screenshot of query result in Real-Time Intelligence in Microsoft Fabric.":::

1. This query adds a step to the previous query. Run the query to look up the corresponding zones of the top 10 pickup locations using the *Locations* table. The [lookup operator](/azure/data-explorer/kusto/query/lookupoperator?context=/fabric/context/context&pivots=fabric) extends the columns of a fact table with values looked-up in a dimension table.

    ```kusto
    nyctaxitrips
    | lookup (Locations) on $left.PULocationID == $right.LocationID
    | summarize Count=count() by Zone
    | top 10 by Count
    | render columnchart
    ```

    :::image type="content" source="media/real-time-intelligence-tutorial/top-10-locations.png" alt-text="Screenshot of top 10 location results in Real-Time Intelligence in Microsoft Fabric." lightbox="media/real-time-intelligence-tutorial/top-10-locations.png":::

1. KQL also provides machine learning functions to detect anomalies. Run the following query to check anomalies in the tips given by the customers in the Manhattan borough. This query uses the [series_decompose_anomalies function](/azure/data-explorer/kusto/query/series-decompose-anomaliesfunction?context=/fabric/context/context&pivots=fabric).

    ```kusto
    nyctaxitrips
    | lookup (Locations) on $left.PULocationID==$right.LocationID
    | where Borough == "Manhattan"
    | make-series s1 = avg(tip_amount) on tpep_pickup_datetime from datetime(2022-06-01) to datetime(2022-06-04) step 1h
    | extend anomalies = series_decompose_anomalies(s1)
    | render anomalychart with (anomalycolumns=anomalies)
    ```

    :::image type="content" source="media/real-time-intelligence-tutorial/anomaly-chart.png" alt-text="Screenshot of anomaly chart result in Real-Time Intelligence in Microsoft Fabric." lightbox="media/real-time-intelligence-tutorial/anomaly-chart.png":::

    Hover over the red dots to see the values of the anomalies.

1. You can also use the predictive power of the [series_decompose_forecast function](/azure/data-explorer/kusto/query/series-decompose-forecastfunction?context=/fabric/context/context&pivots=fabric). Run the following query to ensure that the sufficient taxis are working in the Manhattan borough and forecast the number of taxis needed per hour.

    ```kusto
    nyctaxitrips
    | lookup (Locations) on $left.PULocationID==$right.LocationID
    | where Borough == "Manhattan"
    | make-series s1 = count() on tpep_pickup_datetime from datetime(2022-06-01) to datetime(2022-06-08)+3d step 1h by PULocationID
    | extend forecast = series_decompose_forecast(s1, 24*3)
    | render timechart
    ```

    :::image type="content" source="media/real-time-intelligence-tutorial/forecast-results.png" alt-text="Screenshot of forecast results in Real-Time Intelligence in Microsoft Fabric." lightbox="media/real-time-intelligence-tutorial/forecast-results.png":::

## Related content

For more information about tasks performed in this tutorial, see:

* [Create a KQL queryset](create-query-set.md)
* [Write a query](kusto-query-set.md#write-a-query)
* [render operator](/azure/data-explorer/kusto/query/renderoperator?pivots=azuredataexplorer?context=/fabric/context/context&pivots=fabric)

## Next step

> [!div class="nextstepaction"]
> [Tutorial part 6: Build a Power BI report](tutorial-6-build-report.md)
