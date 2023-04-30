---
title: "Synapse Real-Time Analytics tutorial part 6: Build a Power BI report"
description: Part 4 of the Real-Time Analytics tutorial in Microsoft Fabric
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.date: 05/23/2023
ms.search.form: product-kusto
---
# Real-Time Analytics tutorial part 6: Build a Power BI report

This tutorial is part of a series. For the previous section, see:

> [!div class="nextstepaction"]
> [Tutorial part 5: Explore your enriched data](tutorial-5-explore-enriched-data.md)

## Build Power BI report

A Power BI report is a multi-perspective view into a dataset, with
visuals that represent findings and insights from that dataset.

1.  Continuing the in same queryset, paste the following query. The
    output of this query will be used as the dataset for building the
    Power BI report.

>      //Find the total number of trips that started and ended at the same location
>
>     nyctaxitrips
>
>     | where PULocationID == DOLocationID
>
>     | lookup (locations) on $left.PULocationID==$right.LocationID
>
>     | summarize count() by Borough, Zone, Latitude, Longitude 

2.  Select the query and then select **Build Power BI report**.

-   ![](media/realtime-analytics-tutorial/image52.png)
- 
    > Power BI report editor will open with the result of the query
    > available as a table with the name Kusto Query Result.

    > Note:

    > \(a\) When you build a report, a dataset is created and saved in
    > your workspace. You can create multiple reports from a single
    > dataset. (b) Result of the query may not exactly match the
    > screenshot provided below as you are ingesting streaming data.

    > If you delete the dataset, your reports will also be removed.

3.  In the report editor, choose **Azure Maps** as the visual, drag
    **Latitude** field to Latitude, **Longitude** field to Longitude,
    **Borough** field to Legend, and **count\_** field to Size.

-   ![A screenshot of a computer Description automatically
    generated](media/realtime-analytics-tutorial/image53.png)

4.  Add a **Stacked Bar Chart** to the canvas. Drag **Borough** field to
    Y-Axis and **count\_** to the X-axis

> ![A screenshot of a computer Description automatically
> generated](media/realtime-analytics-tutorial/image54.png)

5.  Click File \> Save

6.  Under **Name your file in Power BI**, enter *nyc-taxi-maps-report*.

> ![](media/realtime-analytics-tutorial/image55.png)

7.  Select the workspace in which you want to save this report. The
    report can be saved in a different workspace than the one you
    started in.

8.  Select the sensitivity label to apply to the report. For more
    information, see [sensitivity
    labels](https://learn.microsoft.com/en-us/power-bi/enterprise/service-security-sensitivity-label-overview).

9.  Select **Continue**.

10. Select **Open the file in Power BI to view, edit, and get a
    shareable link** to view and edit your report.

-   ![](media/realtime-analytics-tutorial/image56.png)

## Next steps

> [!div class="nextstepaction"]
> [Synapse Real-Time Analytics tutorial part 7: Clean up resources](tutorial-7-clean-up-resources.md)