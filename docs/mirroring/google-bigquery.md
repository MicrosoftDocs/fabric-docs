---
title: "Microsoft Fabric Mirrored Databases From Google BigQuery (Preview)"
description: Learn about the mirrored databases from Google BigQuery in Microsoft Fabric.
ms.reviewer: misaacs
ms.date: 09/09/2025
ms.topic: concept-article
ms.custom:
ms.search.form: Fabric Mirroring
no-loc: [Copilot]
---

# Mirroring Google BigQuery in Microsoft Fabric (Preview)

[Mirroring in Fabric](overview.md) offers a simple way to avoid complex ETL (Extract, Transform, Load) processes and seamlessly integrate your existing Google BigQuery warehouse data with the rest of your data in Fabric. You can continuously replicate your Google BigQuery data directly into Fabric’s OneLake. Once in Fabric, you can take advantage of powerful capabilities for business intelligence, AI, data engineering, data science, and data sharing.

For a tutorial on configuring your Google BigQuery database for Mirroring in Fabric, see [Tutorial: Configure Microsoft Fabric mirrored databases from Google BigQuery](google-bigquery-tutorial.md).

> [!IMPORTANT]
> Mirroring for Google BigQuery is now in [preview](../fundamentals/preview.md). Production workloads aren't supported during preview.

## Why use mirroring in Fabric?

Mirroring in Microsoft Fabric removes the complexity of stitching together tools from different providers. No need to migrate your data. Connect to your Google BigQuery data in near real-time to use Fabric's array of analytics tools. Fabric also works seamlessly with Microsoft products, Google BigQuery, and a wide range of technologies that support the open-source Delta Lake table format.

## What analytics experiences are built in?

Mirroring creates two items in your Fabric workspace:

- The mirrored database item. Mirroring manages the replication of data into [OneLake](../onelake/onelake-overview.md) and conversion to Parquet, in an analytics-ready format. Mirroring enables downstream scenarios like data engineering, data science, and more. Mirrored databases are distinct from warehouse and SQL analytics endpoint items.
- A [SQL analytics endpoint](../data-warehouse/get-started-lakehouse-sql-analytics-endpoint.md)

:::image type="content" source="media/google-bigquery/google-bigquery.png" alt-text="Diagram of Fabric database mirroring for Google BigQuery.":::

From each Mirrored database, a **SQL analytics endpoint** delivers a read-only analytical experience on top of the Delta tables created during mirroring. This endpoint supports T-SQL syntax for defining and querying data objects, but it doesn’t allow direct data changes since the data is read-only.  

With the SQL analytics endpoint, you can:  

- Browse tables that reference your Delta Lake data mirrored from BigQuery.  
- Build no-code queries and views, and explore data visually—no SQL required.  
- Create SQL views, inline table-valued functions (TVFs), and stored procedures to layer in business logic with T-SQL.  
- Set and manage permissions on objects.  
- Query data in other Warehouses and Lakehouses within the same workspace.  

In addition to the [SQL query editor](../data-warehouse/sql-query-editor.md), there's a broad ecosystem of tooling that can query the SQL analytics endpoint, including [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms), [the mssql extension with Visual Studio Code](/sql/tools/visual-studio-code/mssql-extensions?view=fabric&preserve-view=true), and even GitHub Copilot. 

## Security considerations

There are specific [user permission requirements](google-bigquery-security.md#security-considerations) to enable Fabric Mirroring.

Fabric also provides data protection features to manage access within Microsoft Fabric. For more information, see our [data protection features documentation](google-bigquery-security.md#data-protection-features).

## Mirrored BigQuery cost considerations

The Fabric compute used to replicate your data into Fabric OneLake is free. The Mirroring storage cost is free up to a limit based on capacity. The compute for querying data using SQL, Power BI, or Spark is charged at regular rates.

Fabric doesn't charge for network data ingress fees into OneLake for Mirroring.

There are Google BigQuery compute and cloud query costs when data is being mirrored: BigQuery Change Data Capture (CDC) utilizes BigQuery compute for row modification, Storage Write API for data ingestion, BigQuery storage for data storage that all incurs costs.

For more information on costs for mirroring Google BigQuery, see [the pricing explained](google-bigquery-cost.md).

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Configure Microsoft Fabric mirrored databases from Google BigQuery](google-bigquery-tutorial.md)
