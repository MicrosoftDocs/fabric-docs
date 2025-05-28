---
title: "Monitoring Fabric materialized lake views"
description: Learn how to monitor Fabric materialized lake views.
author: yeturis
ms.author: sairamyeturi
ms.reviewer: nijelsf
ms.topic: tutorial
ms.date: 05/28/2025
---

# Monitoring Materialized Lake Views

The Monitor pane serves as a centralized portal for browsing Materialized lake view (MLV) runs in your Lakehouse. You can view status of the Materialized lake view runs. You can also search, and filter the runs based on different criteria. Additionally, you can cancel your in-progress run and drill down to view more execution details of any Materialized lake view run.

## Access the Monitor pane

You can access the Monitor pane to view various Materialized lake view runs in your workspace by selecting Monitor from the navigation bar.
  
## Sort, search, filter and column options

For better usability and discoverability, you can sort the Materialized lake view runs by selecting different columns in the UI. You can also filter the using the Job Type, Item Type, Job Instance ID and search for specific runs. You can also adjust the display and sort order of the columns independently through the column options.

The Job Type for MLV runs is MaterializedLakeViews

:::image type="content" source="./media/monitor-materialized-views/sort-filter-column-options.png" alt-text="Screenshot showing job type for materialized lake view." border="true" lightbox="./media/monitor-materialized-views/sort-filter-column-options.png":::

### Sort options

To sort Materialized lake view runs, you can select on each column header, such as **Name, Status, Job Instance ID,  Job Type, Start Time, Location**, and so on.
 
### Filter options
You can filter Materialized lake view runs by Status, Item Type, Start Time, Submitter, and Location using the Filter pane in the upper-right corner.

In case of the Materialized lake view runs, your Item Type will be a Lakehouse, and the Job Instance ID corresponds to the scheduled run.
 
### Search options

To search for Materialized lake view runs, you can enter certain keywords in the search box located in the upper-right corner.

Materialized lake view runs on the Monitoring page appear with the syntax of MLV_LakehouseName_JobInstanceID
 
## Manage a Materialized lake view run

When you hover over a Materialized lake view run row, you can see various row-level actions that enable you to manage a particular run.

#### View detail

:::image type="content" source="./media/monitor-materialized-views/view-detail-mlv-option.png" alt-text="Screenshot showing job type for materialized lake view." border="true" lightbox="./media/monitor-materialized-views/view-detail-mlv-option.png":::

You can hover over a MLV run row and click the **View details** icon to open the **Detail** pane and view more details.

When you click an activity name, you can navigate to the ongoing run or completed run lineage view.
 
## Cancel a Materialized lake view run

If you need to cancel an in-progress MLV run, hover over its row and click the `Cancel` icon.

:::image type="content" source="./media/monitor-materialized-views/cancel-mlv-option.png" alt-text="Screenshot showing job type for materialized lake view." border="true" lightbox="./media/monitor-materialized-views/cancel-mlv-option.png":::
 
## Navigate to Materialized lake view run

If you need more information about Materialized lake view runs and the Materialized view statistics, access Apache Spark logs for individual Materialized lake views, or check input and output data, you can click on the name of any Materialized lake view run  to navigate to its corresponding scheduled run, and individual Materialized lake views in the lineage will direct you to the detailed log view.

## Next steps

[Refresh a materialized view](./refresh-materialized-view.md)
  
