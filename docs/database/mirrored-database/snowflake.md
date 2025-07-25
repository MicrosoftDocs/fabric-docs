---
title: "Microsoft Fabric Mirrored Databases From Snowflake"
description: Learn about the mirrored databases from Snowflake in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: imotiwala, maprycem, sbahadur 
ms.date: 04/24/2025
ms.topic: conceptual
ms.custom:
ms.search.form: Fabric Mirroring
no-loc: [Copilot]
---

# Mirroring Snowflake in Microsoft Fabric

[Mirroring in Fabric](overview.md) provides an easy experience to avoid complex ETL (Extract Transform Load) and integrate your existing Snowflake warehouse data with the rest of your data in Microsoft Fabric. You can continuously replicate your existing Snowflake data directly into Fabric's OneLake. Inside Fabric, you can unlock powerful business intelligence, artificial intelligence, Data Engineering, Data Science, and data sharing scenarios.

For a tutorial on configuring your Snowflake database for Mirroring in Fabric, see [Tutorial: Configure Microsoft Fabric mirrored databases from Snowflake](snowflake-tutorial.md).

## Why use Mirroring in Fabric?

With Mirroring in Fabric, you don't need to piece together different services from multiple vendors. Instead, you can enjoy a highly integrated, end-to-end, and easy-to-use product that is designed to simplify your analytics needs, and built for openness and collaboration between Microsoft, Snowflake, and the 1000s of technology solutions that can read the open-source Delta Lake table format.

## What analytics experiences are built in?

Mirrored databases are an item in **Fabric Data Warehousing** distinct from the **Warehouse** and **SQL analytics endpoint**.

:::image type="content" source="media/snowflake/fabric-mirroring-snowflake.svg" alt-text="Diagram of Fabric database mirroring for Snowflake.":::

Mirroring creates these items in your Fabric workspace:

- The mirrored database item. Mirroring manages the replication of data into [OneLake](../../onelake/onelake-overview.md) and conversion to Parquet, in an analytics-ready format. This enables downstream scenarios like data engineering, data science, and more.
- A [SQL analytics endpoint](../../data-warehouse/get-started-lakehouse-sql-analytics-endpoint.md)

Each mirrored database has an autogenerated **SQL analytics endpoint** that provides a rich analytical experience on top of the Delta Tables created by the mirroring process. Users have access to familiar T-SQL commands that can define and query data objects but not manipulate the data from the SQL analytics endpoint, as it's a read-only copy. You can perform the following actions in the SQL analytics endpoint:

- Explore the tables that reference data in your Delta Lake tables from Snowflake.
- Create no code queries and views and explore data visually without writing a line of code.
- Develop SQL views, inline TVFs (Table-valued Functions), and stored procedures to encapsulate your semantics and business logic in T-SQL.
- Manage permissions on the objects.
- Query data in other Warehouses and Lakehouses in the same workspace.

In addition to the [SQL query editor](../../data-warehouse/sql-query-editor.md), there's a broad ecosystem of tooling that can query the SQL analytics endpoint, including [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms), [the mssql extension with Visual Studio Code](/sql/tools/visual-studio-code/mssql-extensions?view=fabric&preserve-view=true), and even GitHub Copilot. 

## Security considerations

To enable Fabric mirroring, you will need user permissions for your Snowflake database that contains the following permissions:

  - `CREATE STREAM`
  - `SELECT table`
  - `SHOW tables`
  - `DESCRIBE tables`

For more information, see Snowflake documentation on [Access Control Privileges for Streaming tables](https://docs.snowflake.com/user-guide/security-access-control-privileges#stream-privileges) and [Required Permissions for Streams](https://docs.snowflake.com/user-guide/streams-intro#required-access-privileges).

> [!IMPORTANT]
> Any granular security established in the source Snowflake warehouse must be re-configured in the mirrored database in Microsoft Fabric.
> For more information, see [SQL granular permissions in Microsoft Fabric](../../data-warehouse/sql-granular-permissions.md).

## Mirroring Snowflake behind firewall (preview)

Check the networking requirements to access your Snowflake data source. If your Snowflake data source is not publicly accessible and is within a private network, [create a virtual network data gateway](/data-integration/vnet/create-data-gateways) or [install an on-premises data gateway](/data-integration/gateway/service-gateway-install) to mirror the data. The Azure Virtual Network or the gateway machine's network must connect to the Snowflake instance via a private endpoint or be allowed by the firewall rule. To get started, see [Tutorial: Configure Microsoft Fabric mirrored databases from Snowflake](snowflake-tutorial.md).

## Mirrored Snowflake cost considerations

Fabric compute used to replicate your data into Fabric OneLake is free. The Mirroring storage cost is free up to a limit based on capacity. For more information, see [Cost of mirroring](overview.md#cost-of-mirroring) and [Microsoft Fabric Pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/). The compute for querying data using SQL, Power BI, or Spark is charged at regular rates.

Fabric doesn't charge for network data ingress fees into OneLake for Mirroring.

There are Snowflake compute and cloud query costs when data is being mirrored: virtual warehouse compute and cloud services compute.

- Snowflake virtual warehouse compute charges:
  - Compute charges will be charged on the Snowflake side if there are data changes that are being read in Snowflake, and in turn are being mirrored into Fabric.
  - Any metadata queries run behind the scenes to check for data changes are not charged for any Snowflake compute; however, queries that do produce data such as a `SELECT *` will wake up the Snowflake warehouse and compute will be charged.
- Snowflake services compute charges:
  - Although there aren't any compute charges for behind the scenes tasks such as authoring, metadata queries, access control, showing data changes, and even DDL queries, there are cloud costs associated with these queries.
  - Depending on what type of Snowflake edition you have, you will be charged for the corresponding credits for any cloud services costs.

In the following screenshot, you can see the virtual warehouse compute and cloud services compute costs for the associated Snowflake database that is being mirrored into Fabric. In this scenario, majority of the cloud services compute costs (in yellow) are coming from data change queries based on the points mentioned previously. The virtual warehouse compute charges (in blue) are coming strictly from the data changes are being read from Snowflake and mirrored into Fabric.

  :::image type="content" source="media/snowflake/snowflake-costs-graph.png" alt-text="Screenshot of Snowflake costs graph." lightbox="media/snowflake/snowflake-costs-graph.png":::

For more information of Snowflake specific cloud query costs, see [Snowflake docs: Understanding overall cost](https://docs.snowflake.com/user-guide/cost-understanding-overall).

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Configure Microsoft Fabric mirrored databases from Snowflake](snowflake-tutorial.md)

## Related content

- [How to: Secure data Microsoft Fabric mirrored databases from Snowflake](snowflake-how-to-data-security.md)
- [Monitor Fabric mirrored database replication](monitor.md)
