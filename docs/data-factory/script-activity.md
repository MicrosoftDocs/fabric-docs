---
title: How to use Script activity
description: Learn how to use Script activity.
ms.reviewer: xupzhou
ms.topic: how-to
ms.custom: pipelines
ms.date: 12/18/2024
---

# How to use Script activity

In this article, you learn how to add a new SQL Script activity, add a new connection, and configure script content. The Script activity can be used to execute both query and nonquery SQL scripts against data stores that support Data Manipulation Language (DML) and Data Definition Language (DDL).

You can use the Script activity to invoke a SQL script in one of the following data stores:
- [Fabric SQL database](/fabric/data-factory/connector-sql-database-overview)
- [Fabric Data Warehouse](/fabric/data-factory/connector-data-warehouse-overview)
- [Azure Database for PostgreSQL](/fabric/data-factory/connector-azure-database-for-postgresql-overview)
- [Azure SQL Database](/fabric/data-factory/connector-azure-sql-database-overview)
- [Azure SQL Managed Instance](/fabric/data-factory/connector-azure-sql-managed-instance-overview)
- [Azure Synapse Analytics](/fabric/data-factory/connector-azure-synapse-analytics-overview)
- [Oracle database](/fabric/data-factory/connector-oracle-database-overview)
- [SQL Server Database](/fabric/data-factory/connector-sql-server-database-overview)
- [Snowflake](/fabric/data-factory/connector-snowflake-overview)

## Prerequisites

To get started, you must complete the following prerequisites:  

- A tenant account with an active subscription. Create an account for free.
- A workspace is created.

## Add a Script activity to a Pipeline with UI

1. Open an existing pipeline or create a new pipeline.
1. Select on add a pipeline activity and search for **Script**.

    :::image type="content" source="media/script-activity/add-script-activity-canvas.png" alt-text="Screenshot showing where to select the Script activity in the canvas." lightbox="media/script-activity/add-script-activity-canvas.png":::

1. Alternately, you can search for **Script** Activity in the pipeline Activities ribbon at the top, and select it to add it to the pipeline canvas.

    :::image type="content" source="media/script-activity/add-script-activity-ribbon.png" alt-text="Screenshot showing where to select the Script activity in the ribbon." lightbox="media/script-activity/add-script-activity-ribbon.png":::

1. Select the new Script activity on the canvas if it isn’t already selected.

    :::image type="content" source="media/script-activity/script-activity-general.png" alt-text="Screenshot showing general tab of script activity." lightbox="media/script-activity/script-activity-general.png":::

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

## Configure the Script Activity

1. Select the **Settings** tab, and choose an existing connection from the dropdown, or create a new one.

1. After selecting your connection, you can choose either **Query** to get a data result or **NonQuery** for any catalog operations.

    :::image type="content" source="media/script-activity/script-activity-settings.png" alt-text="Screenshot showing settings tab of script activity." lightbox="media/script-activity/script-activity-settings.png":::

1. Then you can input content into the script expression box. We have multiple ways in which you can input script content into the expression box:
    1. You can add dynamic content by either clicking in the box or clicking on the "dynamic content" icon on the right-hand side. A flyout appears, as seen in the following screenshot, that showcases dynamic content and functions that you can seamlessly use to build your expressions. If you're familiar with Power Automate, the experience is similar.

        :::image type="content" source="media/script-activity/script-activity-flyout.png" alt-text="Screenshot showing dynamic flyout content in script activity." lightbox="media/script-activity/script-activity-flyout.png":::

    1. You can also directly edit your script code in the code editor by selecting the pencil icon on the right-hand side, as seen in the following screenshot. After you select it, a new dialog box will pop up so that you can seamlessly write and edit your code.

        :::image type="content" source="media/script-activity/script-activity-edit-code.png" alt-text="Screenshot showing edit code in script activity." lightbox="media/script-activity/script-activity-edit-code.png":::

    1. You can also use the expression builder that utilizes IntelliSense code completion for highlighting, syntax checking, and autocompleting to create expressions. Refer to the [**Expression Language** doc](expression-language.md) guidance to use the expression builder.

## Save and run or schedule the pipeline

After you configure any other activities required for your pipeline, switch to the **Home** tab at the top of the pipeline editor, and select the save button to save your pipeline. Select **Run** to run it directly, or **Schedule** to schedule it. You can also view the run history here or configure other settings.

:::image type="content" source="media/azure-databricks-activity/databricks-activity-save-and-run.png" alt-text="Screenshot showing how to save and run the pipeline.":::

## Related content

[How to monitor pipeline runs](monitor-pipeline-runs.md)
