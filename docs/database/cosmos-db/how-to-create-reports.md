---
title: Create Power BI Reports Using Cosmos DB Database
description: Create reports and a semantic model within Power BI using data from your Cosmos DB database in Microsoft Fabric.
ms.topic: how-to
ms.date: 07/22/2025
---

# Create Power BI reports using Cosmos DB in Microsoft Fabric

With Cosmos DB in Microsoft Fabric, you can build interactive Power BI reports using your NoSQL data. This guide covers two approaches for connecting Power BI to your Cosmos DB in Fabric database:

- **SQL analytics endpoint (via OneLake)**: Leverage mirrored data through the SQL analytics endpoint with DirectLake mode for optimal performance and no RU consumption
- **Azure Cosmos DB v2 connector**: Connect directly to your database using the Power BI connector with DirectQuery or Import mode

Each approach offers distinct advantages. The SQL analytics endpoint is recommended for most production scenarios, while the Azure Cosmos DB v2 connector provides flexibility for real-time reporting and direct database access.

## Prerequisites

[!INCLUDE[Prerequisites - Existing database](includes/prerequisite-existing-database.md)]

[!INCLUDE[Prerequisites - Existing container](includes/prerequisite-existing-container.md)]

> [!IMPORTANT]
> For this guide, the existing Cosmos DB database has the [sample data set](.\sample-data.md) already loaded. The remaining examples assume you're using the same data set.

## Choose your reporting approach

Select the approach that best fits your requirements:

| Use case | Recommended approach |
|----------|---------------------|
| Complex data types (arrays, objects, nested structures) | SQL analytics endpoint |
| No database resource consumption (RUs) | SQL analytics endpoint |
| Dynamic schema evolution | SQL analytics endpoint |
| Real-time data with direct database queries | Azure Cosmos DB v2 connector (DirectQuery) |
| Existing Power BI connector workflows | Azure Cosmos DB v2 connector |

## Approach 1: Build reports using the SQL analytics endpoint

The SQL analytics endpoint provides access to mirrored data in OneLake, enabling you to build Power BI reports with DirectLake mode. This approach offers optimal performance without consuming database RUs and supports complex data types including arrays, objects, and hierarchical structures.

For more information about semantic model modes in Power BI, see [Semantic model modes in the Power BI service](/power-bi/connect-data/service-dataset-modes-understand).

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

For more information about semantic models in Power BI, see [Semantic models in the Power BI service](/power-bi/connect-data/service-datasets-understand).

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
> You can also create reports by selecting **Pick a published semantic model** from the **Create** tab in the Fabric portal, or by selecting **Power BI semantic models** in Power BI Desktop.

For more information about creating reports in Power BI, see [Get started creating in the Power BI service](/power-bi/fundamentals/service-get-started).

## Approach 2: Build reports using the Azure Cosmos DB v2 connector

The Azure Cosmos DB v2 Power BI connector enables direct connection to your Cosmos DB in Fabric database from the Power BI service. This approach supports DirectQuery for real-time reporting and Import mode for scheduled data loads.

> [!IMPORTANT]
> The Azure Cosmos DB v2 connector consumes request units (RUs) from your database. DirectQuery mode generates queries with each report interaction, while Import mode consumes RUs during data refresh. For more information, see [Azure Cosmos DB v2 connector limitations](cosmos-db-v2-connector-limitations.md).

### Connect to your database

1. In the Fabric portal (<https://app.fabric.microsoft.com>), navigate to your workspace.

1. Select the **Create** tab on the left toolbar, and then select **Get data**.

1. Search for and select **Azure Cosmos DB v2**.

1. Enter your Cosmos DB in Fabric database endpoint URL (available from your database settings).

1. When prompted to authenticate, select **Organizational account**, sign in, and select **Next**.

   > [!NOTE]
   > Account key authentication isn't supported for Cosmos DB in Fabric. 

1. In the **Navigator** pane, select the database and container that contain the necessary data for your report.

    The **Preview** pane shows a list of **Record** items. Each document is represented as a **Record** type in Power BI. Nested JSON blocks within documents also appear as **Record** types.

1. Expand the record columns to view document properties, then select **Create a report**. Optionally you can select **Create a semantic model only** or **Transform Data**.

### Create visualizations

After loading your data:

1. In the new **Report** artifact, drag fields from the **Data** pane to the report canvas.

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

For more information about data refresh in Power BI, see [Data refresh in Power BI](/power-bi/connect-data/refresh-data).

> [!TIP]
> Use Import mode for faster visualizations with scheduled data updates. Use DirectQuery mode for real-time data requirements with optimized queries and partition key filters to minimize RU consumption.

For more information about limitations when using the Azure Cosmos DB v2 connector, see [Azure Cosmos DB v2 connector limitations](cosmos-db-v2-connector-limitations.md).

### Comparison: SQL analytics endpoint vs. Azure Cosmos DB v2 connector

| Feature | SQL analytics endpoint | Azure Cosmos DB v2 connector |
|---------|----------------------|----------------------------|
| **Data access** | Mirrored data via OneLake | Direct database connection |
| **Connection mode** | DirectLake (can fall back to DirectQuery) | DirectQuery or Import |
| **RU consumption** | None | Yes (especially DirectQuery) |
| **Data freshness** | Near real-time (mirroring latency) | Real-time (DirectQuery) or scheduled (Import) |
| **Complex data types** | Supported (arrays, objects, nested) | Not supported |
| **Schema evolution** | Handles dynamic schemas | Limited (first 1,000 docs) |
| **Available in** | Power BI service, Power BI Desktop| Power BI service, Power BI Desktop |
| **Best for** | Production BI, complex data, no RU impact | Real-time queries, direct access, simple schemas |

> [!TIP]
> For most production BI scenarios with Cosmos DB in Fabric, the SQL analytics endpoint approach is recommended. It provides better support for complex data types, doesn't consume database RUs, and handles schema evolution more effectively. Use the Azure Cosmos DB v2 connector with DirectQuery mode when you need real-time data access and have optimized queries, or use Import mode for scenarios requiring direct database connectivity outside the Fabric mirroring workflow.

## Related content

- [Get started with Power BI](/power-bi/fundamentals/service-get-started)
- [Power BI data refresh](/power-bi/connect-data/refresh-data)
- [Edit tables for Direct Lake semantic models](../../fundamentals/direct-lake-edit-tables.md)
- [Access data from Lakehouse](how-to-access-data-lakehouse.md)