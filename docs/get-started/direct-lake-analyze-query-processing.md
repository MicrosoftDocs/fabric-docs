---
title: Learn how to analyze query processing for Direct Lake semantic models
description: Describes how to analyze query processing for Direct Lake semantic models.
author: kfollis
ms.author: kfollis
ms.reviewer: ''
ms.service: powerbi
ms.subservice: powerbi-premium
ms.topic: conceptual
ms.date: 04/24/2024
LocalizationGroup: Admin
---
# Analyze query processing for Direct Lake semantic models

Power BI semantic models in [*Direct Lake*](direct-lake-overview.md) mode read Delta tables directly from OneLake — unless they have to fall back to *DirectQuery* mode. Typical fallback reasons include memory pressures that can prevent loading of columns required to process a DAX query, and certain features at the data source might not support Direct Lake mode, like SQL views in a Warehouse and Lakehouse. In general, Direct Lake mode provides the best DAX query performance unless a fallback to DirectQuery mode is necessary. Because fallback to DirectQuery mode can impact DAX query performance, it's important to analyze query processing for a Direct Lake semantic model to identify if and how often fallbacks occur.

## Analyze by using Performance analyzer

Performance analyzer can provide a quick and easy look into how a visual queries a data source, and how much time it takes to render a result.

1. Start Power BI Desktop. On the startup screen, select **New** > **Report**.

1. Select **Get Data** from the ribbon, then select **Power BI semantic models**.

1. In the **OneLake data hub** page, select the Direct Lake semantic model you want to connect to, and then select **Connect**.

1. Place a card visual on the report canvas, select a data column to create a basic report, and then on the **View** menu, select **Performance analyzer**.

    :::image type="content" source="media/direct-lake-analyze-query-processing/viewing-performance-analyzer.png" alt-text="Screenshot of Performance analyzer pane.":::

1. In the **Performance analyzer** pane, select **Start recording**.

    :::image type="content" source="media/direct-lake-analyze-query-processing/start-recording.png" alt-text="Screenshot of the command to start recording in Performance analyzer.":::

1. In the **Performance analyzer** pane, select **Refresh visuals**, and then expand the Card visual. The card visual doesn't cause any DirectQuery processing, which indicates the semantic model was able to process the visual’s DAX queries in Direct Lake mode.

    If the semantic model falls back to DirectQuery mode to process the visual’s DAX query, you see a **Direct query** performance metric, as shown in the following image:

    :::image type="content" source="media/direct-lake-analyze-query-processing/fallback-based-on-view.png" alt-text="Screenshot of Direct query performance metric.":::

## Analyze by using SQL Server Profiler

SQL Server Profiler can provide more details about query performance by tracing query events. It's installed with [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms). Before starting, make sure you have the latest version of SSMS installed.

1. Start SQL Server Profiler from the Windows menu.

1. In SQL Server Profiler, select **File** > **New Trace**.

1. In **Connect to Server** > **Server type**, select **Analysis Services**, then in **Server name**, enter the URL to your workspace, then select an authentication method, and then enter a username to sign in to the workspace.

    :::image type="content" source="media/direct-lake-analyze-query-processing/sql-profiler-connect-server.png" alt-text="Screenshot of Connect to server dialog in SQL Server Profiler.":::

1. Select **Options**. In **Connect to database**, enter the name of your semantic model and then select **Connect**. Sign in to Microsoft Entra ID.

    :::image type="content" source="media/direct-lake-analyze-query-processing/sql-profiler-connect-enter-dataset.png" alt-text="Screenshot of database name specified in Connect to database field.":::

1. In **Trace Properties** > **Events Selection**, select the **Show all events** checkbox.

    :::image type="content" source="media/direct-lake-analyze-query-processing/sql-profiler-show-all-events.png" alt-text="Screenshot of Events selection - Show all events checkbox.":::

1. Scroll to **Query Processing**, and then select checkboxes for the following events:

    |Event  |Description  |
    |---------|---------|
    |**DirectQuery_Begin**</BR>**DirectQuery_End**     |   If DirectQuery Begin/End events appear in the trace, the semantic model might have fallen back to DirectQuery mode. However, note that the presence of EngineEdition queries and possibly queries to check Object-Level Security (OLS) do not represent a fallback because the engine always uses DirectQuery mode for these non-query processing related checks.        |
    |**VertiPaq_SE_Query_Begin**</BR> **VertiPaq_SE_Query_Cache_Match**</BR> **VertiPaq_SE_Query_Cache_Miss**</BR> **VertiPaq_SE_Query_End**     |  VertiPaq storage engine (SE) events in Direct Lake mode are the same as for import mode.      |

    It should look like this:

    :::image type="content" source="media/direct-lake-analyze-query-processing/sql-profiler-select-events.png" alt-text="Screenshot showing selected query processing events in SQL Server Profiler.":::

1. Select **Run**. In Power BI Desktop, create a new report or interact with an existing report to generate query events. Review the SQL Server Profiler trace report for query processing events.

    The following image shows an example of query processing events for a DAX query. In this trace, the VertiPaq storage engine (SE) events indicate that the query was processed in Direct Lake mode.
    :::image type="content" source="media/direct-lake-analyze-query-processing/sql-profiler-query-processing-events.png" alt-text="Screenshot of query processing events in SQL Server Profiler.":::

## Related content

- [Create a lakehouse for Direct Lake](direct-lake-create-lakehouse.md)  
- [Direct Lake overview](direct-lake-overview.md)
