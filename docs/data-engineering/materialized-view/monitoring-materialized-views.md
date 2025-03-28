---
title: "Monitoring Fabric materialized views"
description: Learn how to Monitoring Fabric materialized views.
author: yeturis
ms.author: sairamyeturi
ms.reviewer: nijelsf
ms.topic: tutorial
ms.date: 03/28/2025
---

# Monitoring Fabric materialized views

The Monitor pane serves as a centralized portal for browsing Materialized views in your Lakehouse. You can view status of the Directed Acyclic Graph (DAG) runs. You can also search, and filter DAG runs based on different criteria. Additionally, you can cancel your in-progress DAG and drill down to view more execution details of any Materialized view in your DAG.

## Access the Monitor pane

You can access the Monitor pane to view various DAG runs in your workspace by selecting Monitor from the navigation bar.
  
## Sort, search, filter and column options

For better usability and discoverability, you can sort the DAG runs by selecting different columns in the UI. You can also filter the using the Job Type, Item Type, Job Instance ID and search for specific runs. You can also adjust the display and sort order of the columns independently through the column options.

### Sort options

To sort DAG runs, you can select on each column header, such as **Name, Status, Job Instance ID,  Job Type, Start Time, Location**, and so on.
 
### Filter options
You can filter Apache Spark applications by Status, Item Type, Start Time, Submitter, and Location using the Filter pane in the upper-right corner.

In case of the DAG runs, your Item Type will be a Lakehouse.
 
### Search options

To search for DAG Runs, you can enter certain keywords in the search box located in the upper-right corner.
 
## Manage a DAG run

When you hover over an DAG run row, you can see various row-level actions that enable you to manage a particular run.
View the detail pane

You can hover over an DAG run row and click the **View details** icon to open the **Detail** pane and view more details.
 
## Cancel a DAG run

If you need to cancel an in-progress DAG run, hover over its row and click the **Cancel** icon.
 
## Navigate to DAG detail view

If you need more information about DAG run and the Materialized view statistics, access Apache Spark logs, or check input and output data, you can click on the name of any DAG activity run to navigate to its corresponding DAG run.

## Next steps

[Refresh a Fabric materialized view](./refresh-fabric-materialzed-view.md)
  
