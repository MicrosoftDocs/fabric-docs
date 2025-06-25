---
title: "Monitoring Fabric Materialized Lake Views"
description: Learn how to monitor Fabric materialized lake views.
author: yeturis
ms.author: sairamyeturi
ms.reviewer: nijelsf
ms.topic: how-to
ms.date: 06/06/2025
# customer intent: As a data engineer, I want to monitor materialized lake views in Microsoft Fabric so that I can track their status and manage their runs.
---

# Monitor materialized lake views

The Monitor hub serves as a centralized portal to browse materialized lake view (MLV) runs in your lakehouse. You can view the status of the MLV runs. You can also search and filter the runs based on different criteria. Additionally, you can cancel your in-progress run and drill down to view more run execution details of any MLV run.

## Access the Monitor pane

You can access the Monitor hub to view various MLV runs in your workspace by selecting Monitor from the navigation bar.
  
## Sort, search, filter and column options

For better usability and discoverability, you can sort the MLV runs by selecting different columns in the UI. You can also filter the using the Job Type, Location, Job Instance ID and search for specific runs. You can also adjust the display and sort order of the columns independently through the column options.

The Job Type for MLV runs is MaterializedLakeViews

:::image type="content" source="./media/monitor-materialized-lake-views/sort-filter-column-options.png" alt-text="Screenshot showing job type for materialized lake view." border="true" lightbox="./media/monitor-materialized-lake-views/sort-filter-column-options.png":::

### Sort options

To sort MLV runs, you can select on each column header, such as **Name, Status, Job Instance ID,  Job Type, Start Time, Location**, and so on.

### Filter options

You can filter MLV runs by Status, Item Type, Start Time, Submitter, and Location using the Filter pane in the upper-right corner.

In case of the MLV runs, your Item Type will be a Lakehouse, and the Job Instance ID corresponds to the scheduled run.

### Search options

To search for MLV runs, you can enter certain keywords in the search box located in the upper-right corner.

MLV runs on the Monitoring page appear with the activity name of MLV_LakehouseName_JobInstanceID

## Manage a materialized lake view run

When you hover over an MLV run row, you can see various row-level actions that enable you to manage a particular run.

#### View detail

:::image type="content" source="./media/monitor-materialized-lake-views/view-detail-option.png" alt-text="Screenshot showing view detail for materialized lake view." border="true" lightbox="./media/monitor-materialized-lake-views/view-detail-option.png":::

You can hover over an MLV run row and click the **View details** icon to open the **Detail** pane and view more details.

When you click an activity name, you can navigate to the ongoing run or completed run lineage view.

## Cancel a materialized lake view run

If you need to cancel an in-progress MLV run, hover over its row and click the `Cancel` icon.

:::image type="content" source="./media/monitor-materialized-lake-views/cancel-option.png" alt-text="Screenshot showing cancel option for materialized lake view." border="true" lightbox="./media/monitor-materialized-lake-views/cancel-option.png":::

## Navigate to a materialized lake view run

If you need more information about MLV runs and the MLV statistics, access Apache Spark logs for individual MLVs, or check input and output data. You can click on the name of any MLV run to navigate to its corresponding scheduled run, and individual MLVs in the lineage will direct you to the detailed log view.

## Related articles

* [Create materialized lake views in a lakehouse](./create-materialized-lake-view.md)
* [Manage materialized lake views lineage](./view-lineage.md)