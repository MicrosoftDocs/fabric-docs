---
title: Create Power BI Reports Using Cosmos DB Database
description: Create reports and a semantic model within Power BI using data from your Cosmos DB database in Microsoft Fabric.
author: seesharprun
ms.author: sidandrews
ms.topic: how-to
ms.date: 07/22/2025
---

# Create Power BI reports using Cosmos DB in Microsoft Fabric

With Cosmos DB in Microsoft Fabric, you can build interactive Power BI reports using your NoSQL data. This guide covers two approaches for connecting Power BI to your Cosmos DB in Fabric database:

- **SQL analytics endpoint (via OneLake)**: Leverage mirrored data through the SQL analytics endpoint with DirectLake mode for optimal performance and no RU consumption
- **Azure Cosmos DB v2 connector**: Connect directly to your database using the Power BI connector with DirectQuery or Import mode

Each approach offers distinct advantages. The SQL analytics endpoint is recommended for most production scenarios, while the v2 connector provides flexibility for real-time reporting and direct database access.

## Prerequisites

[!INCLUDE[Prerequisites - Existing database](includes/prerequisite-existing-database.md)]

[!INCLUDE[Prerequisites - Existing container](includes/prerequisite-existing-container.md)]

- **Power BI Desktop** (optional): Download and install the [latest version of Power BI Desktop](https://powerbi.microsoft.com/desktop) if you prefer to build reports locally. The Azure Cosmos DB v2 connector is available in both Power BI Desktop and the Power BI service.

> [!IMPORTANT]
> For this guide, the existing Cosmos DB database has the [sample data set](.\sample-data.md) already loaded. The remaining examples assume you're using the same data set.

## Choose your reporting approach

Select the approach that best fits your requirements:

| Use case | Recommended approach |
|----------|---------------------|
| Complex data types (arrays, objects, nested structures) | SQL analytics endpoint |
| No database resource consumption (RUs) | SQL analytics endpoint |
| Dynamic schema evolution | SQL analytics endpoint |
| Real-time data with direct database queries | v2 connector (DirectQuery) |
| Existing Power BI connector workflows | v2 connector |

Both approaches support Power BI Desktop and the Power BI service.

## Approach 1: Build reports using the SQL analytics endpoint

The SQL analytics endpoint provides access to mirrored data in OneLake, enabling you to build Power BI reports with DirectLake mode. This approach offers optimal performance without consuming database RUs and supports complex data types including arrays, objects, and hierarchical structures.

### Verify mirroring replication

Before building reports, ensure that mirroring has completed successfully at least once:

1. In the Fabric portal (<https://app.fabric.microsoft.com>), navigate to your Cosmos DB database.

1. In the database view, locate the **Replication** tab and select **Monitor replication**.

1. Verify that the replication status shows as **Running** or **Completed** and that data has been successfully replicated to OneLake.

> [!IMPORTANT]
> If mirroring hasn't completed at least once, the SQL analytics endpoint won't have data available for reporting. Check the replication monitoring panel for any errors or pending operations.

### Configure your semantic model

Once mirroring has completed successfully, configure your semantic model:

1. In the menu bar, select the **Cosmos DB** list and then select **SQL Endpoint** to switch to the SQL analytics endpoint.

    :::image type="content" source="media/how-to-create-reports/endpoint-selection.png" lightbox="media/how-to-create-reports/endpoint-selection.png" alt-text="Screenshot of the endpoint selection option in the menu bar for a database in Cosmos DB in Fabric.":::

1. Select the **Reporting** tab.

1. In the ribbon, select **New semantic model**.

1. Select the tables you want to include in your report.

1. Select **Save**.

> [!NOTE]
> By default, semantic models are empty. If you skip this step, any attempt to create a Power BI report results in an error due to an empty semantic model.

### Create and design your report

Once your semantic model is configured, create your Power BI report:

1. In the **Reporting** tab, select **New Report**.

1. Select **Continue** to open Power BI with your configured semantic model.

1. In the Power BI editor, drag fields from the **Data** pane to the report canvas.

1. Select visualizations from the **Visualizations** pane to create charts, tables, and other report elements.

1. Optionally, use **Copilot** to generate report suggestions:
   - Select **Copilot** in the menu
   - Select **Suggest content** for a new report page
   - Review suggestions and select **Create** to add them

> [!TIP]
> You can also create reports by selecting **Pick a published semantic model** from the **Create** tab in the Fabric portal, or by accessing the **OneLake catalog** in Power BI Desktop.

## Approach 2: Build reports using the Azure Cosmos DB v2 connector

The Azure Cosmos DB v2 Power BI connector enables direct connection to your Cosmos DB in Fabric database from both Power BI Desktop and the Power BI service. This approach supports DirectQuery for real-time reporting and Import mode for scheduled data loads.

> [!IMPORTANT]
> The v2 connector consumes request units (RUs) from your database. DirectQuery mode generates queries with each report interaction, while Import mode consumes RUs during data refresh. Review the [known limitations](#known-limitations-and-considerations) before using this connector.

### Connect to your database

# [Power BI service](#tab/Service)

1. In the Fabric portal (<https://app.fabric.microsoft.com>), navigate to your workspace.

1. Select the **Create** tab on the left toolbar, and then select **Get data**.

1. Search for and select **Azure Cosmos DB v2**.

1. Enter your Cosmos DB in Fabric database endpoint URL (available from your database settings).

1. When prompted to authenticate, select **Organizational account**, sign in, and select **Next**.

   > [!NOTE]
   > Account key authentication isn't supported for Cosmos DB in Fabric. Connection mode selection (Import or DirectQuery) isn't available during initial setup in the Power BI service—Import mode is used by default.

1. In the **Navigator** pane, select the database and container that contain the necessary data for your report.

    The **Preview** pane shows a list of **Record** items. Each document is represented as a **Record** type in Power BI. Nested JSON blocks within documents also appear as **Record** types.

1. Expand the record columns to view document properties, then select **Load** or **Transform Data**.

# [Power BI Desktop](#tab/Desktop)

1. Open **Power BI Desktop**.

1. In the **Home** ribbon, select **Get Data**.

1. Select **Azure** > **Azure Cosmos DB v2** > **Connect**.

    :::image type="content" source="media/how-to-create-reports/pbi-desktop-connector-selection.png" lightbox="media/how-to-create-reports/pbi-desktop-connector-selection-full.png" alt-text="Screenshot of the Get Data window in Power BI Desktop showing Azure Cosmos DB v2 connector selection.":::

1. In the **Azure Cosmos DB v2** window, enter your Cosmos DB in Fabric database endpoint URL(available from your database settings in the Fabric portal), select **OK**.

1. When prompted to authenticate, select **Organizational account**, sign in, and select **Connect**.

   > [!NOTE]
   > Account key authentication isn't supported for Cosmos DB in Fabric.

1. Choose your connection mode:

   - **Import**: Select **Import** to load a copy of the data into Power BI Desktop. This mode is ideal for large datasets and provides faster report performance after initial data load.

   - **DirectQuery**: Select **DirectQuery** to query your database in real-time. This mode ensures your reports always show the latest data without manual refresh, but report performance depends on your database query performance.

1. In the **Navigator** pane, select the database and container that contain the necessary data for your report.

    The **Preview** pane shows a list of **Record** items. Each document is represented as a **Record** type in Power BI. Nested JSON blocks within documents also appear as **Record** types.

1. Expand the record columns to view document properties, then select **Load** or **Transform Data**.

---

> [!TIP]
> In Power BI Desktop, choose DirectQuery mode when you need real-time data access and your queries are optimized for performance. Choose Import mode when you need faster report interactions and can work with scheduled data refreshes.

### Create visualizations

After loading your data:

1. In the **Report** view, drag fields from the **Data** pane to the report canvas.

1. Select visualizations from the **Visualizations** pane to create charts, tables, and other report elements.

1. Configure filters, slicers, and other interactive elements to enhance your report.

1. Optionally, use **Copilot** for AI-assisted report creation.

### Understand connection modes and data refresh

The Azure Cosmos DB v2 connector supports two connection modes with different refresh behaviors:

**Import mode:**
- Loads data into Power BI memory for fast query performance
- Requires manual or scheduled refresh to update data
- Ideal for large datasets where query speed is prioritized

**DirectQuery mode:**
- Queries the database in real-time with each report interaction
- Always displays current data without requiring refresh
- Performance depends on database optimization and partition key usage to minimize RU consumption

For more information about data refresh in Power BI, see [Data refresh in Power BI](https://learn.microsoft.com/power-bi/connect-data/refresh-data).

> [!TIP]
> Use Import mode for faster visualizations with scheduled data updates. Use DirectQuery mode for real-time data requirements with optimized queries and partition key filters to minimize RU consumption.

## Azure Cosmos DB v2 connector limitations and considerations

### Query performance and optimization

- **Partitioned containers with aggregate functions**: For partitioned Cosmos DB in Fabric containers, SQL queries with aggregate functions are passed to Cosmos DB in Fabric only if the query includes a filter (`WHERE` clause) on the partition key. Without a partition key filter, the connector performs the aggregation locally in Power BI.

- **TOP or LIMIT with aggregates**: The connector doesn't pass aggregate functions to Cosmos DB in Fabric when they follow `TOP` or `LIMIT` operations. Cosmos DB in Fabric processes the `TOP` operation at the end of query processing. For example:
  
  ```sql
  SELECT COUNT(1) FROM (SELECT TOP 4 * FROM MyContainer) C
  ```
  
  In this query, `TOP` is applied in the subquery, and the aggregate function is applied to that result set.

- **DISTINCT in aggregate functions**: If `DISTINCT` is included in an aggregate function, the connector doesn't pass the aggregate function to Cosmos DB in Fabric. Cosmos DB in Fabric doesn't support `DISTINCT` within aggregate functions.

### Aggregate function behavior

- **SUM with non-numeric values**: Cosmos DB in Fabric returns `undefined` if any arguments in a `SUM` function are string, boolean, or null. When null values are present, the connector passes the query to Cosmos DB in Fabric with null values replaced by zero during the SUM calculation.

- **AVG with non-numeric values**: Cosmos DB in Fabric returns `undefined` if any arguments in an `AVG` function are string, boolean, or null. The connector provides a connection property to disable passing the `AVG` aggregate function to Cosmos DB in Fabric. When `AVG` passdown is disabled, the connector performs the averaging operation locally. To configure this option, go to **Advanced options** > **Enable AVERAGE function Pass down** in the connector settings.

- **Large partition keys**: Cosmos DB in Fabric containers with large partition keys aren't supported in the connector.

### Query limitations

- Aggregation passdown is disabled in these scenarios due to server limitations:

  - The query doesn't filter on a partition key, or the partition key filter uses the `OR` operator with another predicate at the top level in the `WHERE` clause.

  - One or more partition keys appear in an `IS NOT NULL` clause in the `WHERE` clause.

  - Filter passdown is disabled when queries containing one or more aggregate columns are referenced in the `WHERE` clause.

### Data type and schema limitations

- **Complex data types**: The v2 connector doesn't support complex data types such as arrays, objects, and hierarchical structures. For scenarios requiring these data types, use the SQL analytics endpoint approach with mirrored data in OneLake.

- **Schema inference**: The connector samples the first 1,000 documents to infer the schema. This approach isn't recommended for schema evolution scenarios where only some documents are updated. For example, a newly added property in one document within a container of thousands of documents might not be included in the inferred schema. For dynamic schema scenarios, consider using the SQL analytics endpoint approach.

- **Nonstring object properties**: The connector doesn't support nonstring values in object properties.

- **Column size limitation**: The Cosmos DB ODBC driver has a 255-byte limit on column values. If a document property exceeds this limit, you might encounter an error: "Cannot store value in temporary table without truncation. (Column metadata implied a maximum of 255 bytes, while provided value is [size] bytes)". To resolve this issue, consider the following options:

  - **Option 1 - Remove the column**: If you don't need the field in your visuals, open Power Query (**Transform Data**), select **Remove Columns** > **Choose Columns**, and deselect the column. Or add a step in Power Query:
    
    ```powerquery
    #"Removed Columns" = Table.RemoveColumns(#"PreviousStep", {"myLongTextColumn"})
    ```

  - **Option 2 - Truncate the text**: If you need part of the data, add a custom column in Power Query to keep the first 250 characters:
    
    ```powerquery
    #"Added Truncated Column" = Table.AddColumn(#"PreviousStep", "myShorterTextColumn", each Text.Start([myLongTextColumn], 250))
    ```
    
    Then remove the original column and use the truncated version in your visuals.

  - **Option 3 - Use SQL analytics endpoint**: If you need to analyze the full text without truncation, use the SQL analytics endpoint approach instead of the Azure Cosmos DB v2 connector. The SQL analytics endpoint accesses mirrored data in OneLake and doesn't have the 255-byte column limitation.

### Comparison: SQL analytics endpoint vs. Azure Cosmos DB v2 connector

| Feature | SQL analytics endpoint | Azure Cosmos DB v2 connector |
|---------|----------------------|----------------------------|
| **Data access** | Mirrored data via OneLake | Direct database connection |
| **Connection mode** | DirectLake (can fall back to DirectQuery) | DirectQuery or Import |
| **RU consumption** | None | Yes (especially DirectQuery) |
| **Data freshness** | Near real-time (mirroring latency) | Real-time (DirectQuery) or scheduled (Import) |
| **Complex data types** | Supported (arrays, objects, nested) | Not supported |
| **Schema evolution** | Handles dynamic schemas | Limited (first 1,000 docs) |
| **Available in** | Fabric portal, Power BI Desktop, Power BI service | Fabric portal, Power BI Desktop, Power BI service |
| **Best for** | Production BI, complex data, no RU impact | Real-time queries, direct access, simple schemas |

> [!TIP]
> For most production BI scenarios with Cosmos DB in Fabric, the SQL analytics endpoint approach is recommended. It provides better support for complex data types, doesn't consume database RUs, and handles schema evolution more effectively. Use the Azure Cosmos DB v2 connector with DirectQuery mode when you need real-time data access and have optimized queries, or use Import mode for scenarios requiring direct database connectivity outside the Fabric mirroring workflow.

## Related content

- [Get started with Power BI](https://powerbi.microsoft.com/documentation/powerbi-service-get-started/)
- [Power BI data refresh](https://learn.microsoft.com/power-bi/connect-data/refresh-data)
- [Edit tables for Direct Lake semantic models](https://learn.microsoft.com/fabric/fundamentals/direct-lake-edit-tables)
- [Access data from Lakehouse](.\how-to-access-data-lakehouse.md)