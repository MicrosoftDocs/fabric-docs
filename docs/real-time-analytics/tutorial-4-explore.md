---
title: "Synapse Real-Time Analytics tutorial part 4: Explore your data with KQL and SQL"
description: Part 3 of the Real-Time Analytics tutorial in Microsoft Fabric
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.date: 05/23/2023
ms.search.form: product-kusto
---
# Real-Time Analytics tutorial part 4: Explore your data with KQL and SQL

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Tutorial part 3: Get historical data](tutorial-3-get-historical-data.md)


## Create a KQL queryset

In the following step, you'll use the advanced data analysis
capabilities of Kusto Query Language to query the two tables you have ingested in the database. 

1.  Select **New related item** > **KQL Queryset**

    :::image type="content" source="media/realtime-analytics-tutorial/new-kql-queryset.png" alt-text="Screenshot to create a new related KQL queryset.":::

1. Enter the following KQL Queryset name: *nyctaxiqs*.
1. Select **Create**. A query window opens with several autopopulated sample queries.
1. 
## Explore data

1.  Navigate to your Fabric workspace homepage, and select the **NycTaxiDB** KQL database.
    
    :::image type="content" source="media/realtime-analytics-tutorial/go-to-database.png" alt-text="Screenshot of selecting NYC taxi database in Real-Time Analytics in Microsoft Fabric.":::

1.  In the object tree, select the table **nytaxitrips**
1.  In the top right corner, select **Check your data**.
    
    :::image type="content" source="media/realtime-analytics-tutorial/check-your-data.png" alt-text="Screenshot of object tree with table selected and check your data."  lightbox="media/realtime-analytics-tutorial/check-your-data.png":::

1.  Paste the following query in the query editor and select **Run**.

    ```kusto 
    nyctaxitrips
    | summarize avg(fare_amount) by HourOfDay = hourofday(tpep_dropoff_datetime)
    ```


## Next steps

> [!div class="nextstepaction"]
> [Real-Time Analytics tutorial part 5: Use advanced KQL queries](tutorial-5-advanced-kql-query.md)