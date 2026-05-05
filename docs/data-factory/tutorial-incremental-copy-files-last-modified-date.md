---
title: Incrementally copy new and changed files based on the last modified date
description: Learn steps to incrementally copy new and changed files based on the last modified date.
ms.reviewer: jianleishen
ms.topic: tutorial
ms.custom: pipelines
ms.date: 11/20/2025
ms.search.form: Pipeline tutorials
---

# Incrementally copy new and changed files based on the last modified date

In this tutorial, you'll create a pipeline that incrementally copies new and changed files only, from Lakehouse to Lakehouse. It uses **Filter by last modified** to determine which files to copy.

After you complete the steps here, Data Factory will scan all the files in the source store, apply the file filter by **Filter by last modified**, and copy to the destination store only files that are new or have been updated since last time.

## Prerequisites

- **Lakehouse**: You use the Lakehouse as the destination data store. If you don't have it, see [Create a Lakehouse](../data-engineering/create-lakehouse.md) for steps to create one. Create a folder named *source* and a folder named *destination*.

## Create a pipeline

1. Navigate to [Power BI](https://app.powerbi.com/).
1. Select the Power BI icon in the bottom left of the screen, then select **Fabric** to open the Fabric home page.

1. Navigate to your Microsoft Fabric workspace.

1. Select  **+ New item**.

1. Search for and select **Pipeline** and then input a pipeline name to create a new pipeline.

   :::image type="content" source="media/tutorial-incremental-copy-files-last-modified-date/select-pipeline.png" alt-text="Screenshot showing the new pipeline button in the newly created workspace.":::

## Configure a copy activity for incremental copy

1. Add a copy activity to the canvas.

1. In **Source** tab, select your Lakehouse as the connection, and select **Files** as the **Root folder**. In **File path**, select *source* as the folder. Specify **Binary** as your **File format**.

   :::image type="content" source="media/tutorial-incremental-copy-files-last-modified-date/configure-source.png" alt-text="Screenshot showing the configuration of source.":::

1. In **Destination** tab, select your Lakehouse as the connection, and select **Files** as the **Root folder**. In **File path**, select *destination* as the folder. Specify **Binary** as your **File format**.

   :::image type="content" source="media/tutorial-incremental-copy-files-last-modified-date/configure-destination.png" alt-text="Screenshot showing the configuration of destination.":::

## Set the time interval for incremental copy

Assume that you want to incrementally copy new or changed files in your source folder every five minutes:

1. Select the **Schedule** button on the top menu.

   :::image type="content" source="media/tutorial-incremental-copy-files-last-modified-date/select-schedule.png" alt-text="Screenshot showing the schedule button.":::

1. Select **+ Add schedule**

1. Select **By the minute** in **Repeat** and set the interval to **5** minutes. Then specify the **Start date and time** and **End date and time** to confirm the time span that you want this schedule to be executed. Then select **Save**.

   :::image type="content" source="media/tutorial-incremental-copy-files-last-modified-date/configure-schedule.png" alt-text="Screenshot showing the configuration of schedule.":::

1. Go to your copy activity source. In **Filter by last modified** under **Advanced**, specify the **Start time** using **Add dynamic content**. Enter `@formatDateTime(addMinutes(pipeline().TriggerTime, -5), 'yyyy-MM-dd HH:mm:ss')` in the opened pipeline expression builder.

   :::image type="content" source="media/tutorial-incremental-copy-files-last-modified-date/start-time.png" alt-text="Screenshot showing the Start time under Filter by last modified.":::

1. Select **Run**. Now your copy activity can copy the new added or changed files in your source in every next five minutes to your destination folder until the specified end time.

1. When you select different **Repeat**, the following table shows different dynamic content that you need to specify in **Start time**. When choose Daily and Weekly, you can only set a single time for the use of the corresponding dynamic content.

    | Repeat | Dynamic content |
    |:---|:---|
    | By the minute | `@formatDateTime(addMinutes(pipeline().TriggerTime, -<your set repeat minute>), 'yyyy-MM-dd HH:mm:ss')`  |
    | Hourly | `@formatDateTime(addHours(pipeline().TriggerTime, -<your set repeat hour>), 'yyyy-MM-ddTHH:mm:ss')` |
    | Daily  | `@formatDateTime(addDays(pipeline().TriggerTime, -1), 'yyyy-MM-ddTHH:mm:ss')`  |
    | Weekly | `@formatDateTime(addDays(pipeline().TriggerTime, -7), 'yyyy-MM-ddTHH:mm:ss')`  |

## Related content

Next, advance to learn more about how to incrementally load data from Data Warehouse to Lakehouse.

> [!div class="nextstepaction"]
> [Incrementally load data from Data Warehouse to Lakehouse](tutorial-incremental-copy-data-warehouse-lakehouse.md)