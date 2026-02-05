---
title: "Troubleshoot Fabric Mirrored Databases"
description: Troubleshooting scenarios, workarounds, and links for mirrored databases in Microsoft Fabric.
ms.reviewer: imotiwala, maprycem, cynotebo, wiassaf
ms.date: 11/27/2025
ms.topic: troubleshooting
ms.custom:
ms.search.form: Fabric Mirroring
---

# Troubleshoot Fabric mirrored databases

This article describes the common scenarios, resolutions, and workarounds for Microsoft Fabric mirrored databases. For each data source, also review the specific troubleshooting, frequently asked questions (FAQ), and limitations.

| Area | Reference |
|--------|----------|
| Troubleshooting | Mirroring for [Azure Cosmos DB](./azure-cosmos-db-troubleshooting.yml), [Azure Database for PostgreSQL](./azure-database-postgresql-troubleshoot.md), [Azure SQL Database](./azure-sql-database-troubleshoot.md), [Azure SQL Managed Instance](./azure-sql-managed-instance-troubleshoot.md), [Snowflake](snowflake-mirroring-faq.yml#troubleshoot-mirroring-snowflake-in-microsoft-fabric), [SQL Server](./sql-server-troubleshoot.md), [Fabric SQL database](../database/sql/mirroring-troubleshooting.md) |
| Limitations | Mirroring for [Azure Cosmos DB](./azure-cosmos-db-limitations.md), [Azure Database for PostgreSQL](./azure-database-postgresql-limitations.md), [Azure Databricks](./azure-databricks-limitations.md), [Azure SQL Database](./azure-sql-database-limitations.md), [Azure SQL Managed Instance](./azure-sql-managed-instance-limitations.md), [Snowflake](./snowflake-limitations.md), [Google BigQuery](./google-bigquery-limitations.md), [Oracle](./oracle-limitations.md), [SAP](./sap-limitations.md), [SQL Server](./sql-server-limitations.md), [Fabric SQL database](../database/sql/mirroring-limitations.md)|
| FAQ | Mirroring for [Azure Cosmos DB](./azure-cosmos-db-faq.yml), [Azure Database for PostgreSQL](./azure-database-postgresql-mirroring-faq.yml),  [Azure Databricks](./azure-databricks-faq.yml), [Azure SQL Database](./azure-sql-database-mirroring-faq.yml), [Azure SQL Managed Instance](./azure-sql-managed-instance-faq.yml), [Google BigQuery](./google-bigquery-faq.yml), [SQL Server](./sql-server-faq.yml), [Fabric SQL database](../database/sql/mirroring-faq.yml) |

## Changes to Fabric capacity

| Scenario                      | Description                                                  |
| ----------------------------- | ------------------------------------------------------------ |
| Fabric capacity paused        | Mirroring is stopped and you can't list or access the mirrored database item. Resume or reassign the capacity to your workspace. |
| Fabric capacity resumed       |When capacity is resumed from a paused state, the mirrored database status appears as **Paused**. As a result, changes made in the source aren't replicated to OneLake.<br>To resume mirroring, go to the mirrored database in the Fabric portal, select **Resume replication**. Mirroring continues from where it was paused. <br>Note if the capacity remains paused for a long time, mirroring may not resume from its stopping point and will reseed data from the beginning. This is because pausing mirroring for a long time can cause the source database transaction log usage to grow and hold up log truncation. To minimize impact to the database, if the log space used is close to being full, when mirroring is resumed a reseed of the database will be initiated to release the held up log space.|
| Fabric capacity scaling       | Mirroring continues. If you scale down the capacity, be aware that the OneLake storage for the mirrored data is free up to a limit based on the capacity size, thus scaling down the capacity may incur additional storage charge. Learn more from [Cost of mirroring](overview.md#cost-of-mirroring). |
| Fabric capacity throttled     | Wait until the overload state is over or update your capacity. Mirroring will continue once the capacity is restored. Learn more from [Actions you can take to recover from overload situations](../enterprise/throttling.md#how-to-stop-throttling-when-it-occurs). |
| Fabric trial capacity expired | Mirroring is stopped. To retain your mirrored database, purchase Fabric capacity. Learn more from [Fabric trial capacity expires](../fundamentals/fabric-trial.md#the-trial-expires). |

## Data doesn't appear to be replicating

If you observe a delay in the appearance of mirrored data, check the following:

- **Mirroring status:** In the [Fabric portal monitoring page](monitor.md#monitor-from-the-fabric-portal) of the mirrored database, check the status of mirrored database and specific tables, and the "**Last completed**" column that indicates the last time that Fabric refreshes the mirrored table from source. Empty means the table is not yet mirrored. 

  If you enable the workspace monitoring, you can check the mirroring execution latency in addition, by querying the `ReplicatorBatchLatency` value from the [mirrored database operation logs](../mirroring/monitor-logs.md).

  For source types like [Azure SQL Database](azure-sql-database-troubleshoot.md#t-sql-queries-for-troubleshooting), [Azure SQL Managed Instance](azure-sql-managed-instance-troubleshoot.md#t-sql-queries-for-troubleshooting) and [Azure Database for PostgreSQL](azure-database-postgresql-troubleshoot.md#sql-queries-for-troubleshooting), follow the specific instruction to also check the source database configuration and status.

- **Data in OneLake:** Mirroring continuously replicates your data into OneLake in Delta Lake table format. To validate if the data lands in OneLake properly, you can create a shortcut from the mirrored tables into a Lakehouse, then build notebooks with Spark queries to query the data. Learn more about [Explore with notebooks](../mirroring/explore-onelake-shortcut.md).

- **Data in SQL analytics endpoint:** You can query mirrored data through the SQL analytics endpoint of the mirrored database or a Lakehouse with a shortcut to the mirrored data. When you see a delay, validate the mirroring status and data in OneLake as mentioned above first. If the data shows up in OneLake but not in SQL analytics endpoint, it may be caused by a delay in [metadata sync](../data-warehouse/sql-analytics-endpoint-performance.md) in SQL analytics endpoint. 

  You can manually force a refresh of the automatic metadata scanning. On the page for the SQL analytics endpoint, select the **Refresh** button as shown in the following image. Wait for some time then query the data again to check.
  
  :::image type="content" source="media/troubleshoot/sql-endpoint-refresh-button.png" alt-text="Screenshot from the Fabric portal of how to force a refresh for SQL analytics endpoint metadata scanning." lightbox="media/troubleshoot/sql-endpoint-refresh-button.png":::

## Stop replication

When you select **Stop replication**, OneLake files remain as is, but incremental replication stops. You can restart the replication at any time by selecting **Start replication**. You might want to do stop/start replication when resetting the state of replication, after source database changes, or as a troubleshooting tool.  

## Replicate source schema hierarchy

When you mirror data from various types of source databases, your source schema hierarchy is preserved in the mirrored database. It ensures that your data remains consistently organized across different services, allowing you to consume it using the same logic in SQL analytics endpoint, Spark Notebooks, semantic models, and other references to the data.

For mirrored databases created before this feature enabled, you see the source schema is flattened in the mirrored database, and schema name is encoded into the table name. If you want to reorganize tables with schemas, recreate your mirrored database.

If you use API to create/update mirrored database, set value for property `defaultSchema`, which indicates whether to replicate the schema hierarchy from the source database. Refer to the definition samples in [Microsoft Fabric mirroring public REST API](../mirroring/mirrored-database-rest-api.md).

## Delta column mapping support

Mirroring supports replicating columns containing spaces or special characters in names (such as  `,` `;` `{` `}` `(` `)` `\n` `\t` `=`) from your source databases to the mirrored databases. Behind the scene, mirroring writes data into OneLake with Delta column mapping enabled.

For tables that are already under replication before this feature enabled, to include columns with special character in names, you need to update the mirrored database settings by removing and readding those tables, or stop and restart the mirrored database.

## Take ownership of a mirrored database

Currently, mirrored database doesn't support ownership change. If a mirrored database stops working because the item owner has left the organization or it's no longer valid, you need to recreate the mirrored database.

## Supported regions

[!INCLUDE [fabric-mirroreddb-supported-regions](../mirroring/includes/fabric-mirroreddb-supported-regions.md)]

## Troubleshoot

This section contains general Mirroring troubleshooting steps.

#### I can't connect to a source database

1. Check your connection details are correct, server name, database name, username, and password.
1. Check the server is not behind a firewall or private virtual network. Open the appropriate firewall ports.
    - Some mirrored sources support virtual network data gateway or on-premises data gateways, consult the source's documentation for support of this feature.

#### No views are replicated

Currently, views are not supported. Only replicating regular tables are supported.

#### No tables are being replicated

1. Check the monitoring status to check the status of the tables. For more information, see [Monitor Fabric mirrored database replication](../mirroring/monitor.md).
1. Select the **Configure replication** button. Check to see if the tables are present in the list of tables, or if any Alerts on each table detail are present.

#### Columns are missing from the destination table

1. Select the **Configure replication** button.
1. Select the Alert icon next to the table detail if any columns are not being replicated.

#### Some of the data in my column appears to be truncated

The SQL analytics endpoint supports **varchar(max)** up to 16 MB.

- The limit of 16 MB applies to tables created after November 18, 2025 in mirrored databases, but each mirrored item type can have a different and lower limit. For example, mirrored SQL Server supports up to 1 MB and Cosmos DB supports up to 2 MB. See the following table.
- Existing tables created before November 18, 2025 only support **varchar(8000)** and need to be recreated to adopt new data type and support data greater that 8 KB. 

| Mirrored platform item | **varchar(max)** limit |
|:--|:--|
| Mirrored SQL Server, Azure SQL Database, Azure SQL Managed Instance | 1 MB |
| SQL database in Fabric | 1 MB |
| Mirrored Azure Cosmos DB | 2 MB |
| Cosmos DB in Fabric | 2 MB | 

#### Mirrored table/schema is not deleted when it's dropped in the source database

Table level:

- When you choose to mirror a list of selective tables and the source table is dropped, the mirrored table stays and you see error "The source table does not exist" in monitoring. If you no longer want to replicate this table, update your mirrored database configuration and remove it, then the mirrored table will be deleted.
- When you choose to mirror all data and the source table is dropped, the mirrored table is deleted as well.

Schema level: When the schema is dropped in the source database, you still see the schema in the SQL Analytics Endpoint as an empty schema.

#### I can't change the source database

Changing the source database is not supported. Create a new mirrored database.

## Limits error messages

These common error messages have explanations and mitigations:

| **Error message** | **Reason** | **Mitigation** |
|:--|:--|:--|
| "The tables count may exceed the limit, there could be some tables missing."| There's a maximum of 500 tables. | In the source database, drop or filter tables. If the new table is the 500th table, no mitigation required. |
| "The replication is being throttled and expected to continue at YYYY-MM-DDTHH:MM:ss." | There's a maximum of 1 TB of change data captured per Mirrored database per day. | Wait for throttling to end. |

## Related content

- [What is Mirroring in Fabric?](../mirroring/overview.md)
- [Monitor Fabric mirrored database replication](../mirroring/monitor.md)
