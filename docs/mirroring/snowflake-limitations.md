---
title: "Limitations for Microsoft Fabric Mirrored Databases From Snowflake"
description: Learn about the limitations of mirrored databases from Snowflake in Microsoft Fabric.
ms.reviewer: sbahadur, sbahadur
ms.date: 02/26/2026
ms.topic: limits-and-quotas
---

# Limitations in Microsoft Fabric mirrored databases from Snowflake

Current limitations in the Microsoft Fabric mirrored databases from Snowflake are listed in this page. This page is subject to change.

## Connection and authentication limitations 

- The following table lists which authentication methods are supported for mirroring for Snowflake:

| Authentication method | Supported | Notes |
|---|---|---|
| Username and password | Yes | Snowflake native authentication |
| Microsoft Entra ID (SSO) | Yes | Single sign-on via Entra ID |
| Key pair authentication | Yes | RSA key pair for service account scenarios |
| Workspace identity | No | Not currently supported for Snowflake |

- Workspace identity isn't currently supported for Snowflake mirroring. It's available for select sources such as SharePoint.
- Private Link connectivity between a Fabric workspace and Snowflake isn't yet available. Use a virtual network data gateway or on-premises data gateway for private connectivity in the interim.

- You must add sharing recipients to the workspace. To share a dataset or report, first add access to the workspace with a role of admin, member, reader, or contributor.
- Case sensitivity: All Snowflake identifiers - including warehouse name, database name, schema name, table names, and view names - are case sensitive when configuring mirroring connections and when using the mirroring REST API. The casing you enter in Fabric must match exactly what is configured in Snowflake. Mismatched casing can cause connection failures or tables not appearing for replication, often with no descriptive error message. For example, if your Snowflake warehouse is named ANALYTICS_WH, you must enter ANALYTICS_WH in the Fabric connection, not analytics_wh.

## Supported object types
- The following table lists which Snowflake object types are supported for mirroring:

| Object type | Supported | Notes |
|---|---|---|
| Managed tables | Yes | Fully supported for replication |
| Iceberg tables | Yes | Requires a storage connection to the underlying Iceberg table storage. Only Iceberg tables reachable through the same storage connection can be mirrored together. |
| Views | Yes | Supported with syncs every 12 hours |
| Materialized Views | Yes | Supported with syncs every 12 hours |
| External tables | No | Not supported |
| Transient tables | No | Not supported |
| Temporary tables | No | Not supported |
| Dynamic tables | No | Not supported |

## Replication and data limitations 
- If there are no updates in a source table, the replicator engine starts to back off with an exponentially increasing duration for that table, up to an hour. The same can occur if there's a transient error, preventing data refresh. The replicator engine will automatically resume regular polling after updated data is detected.
- Source schema hierarchy is replicated to the mirrored database. For mirrored databases created before this feature enabled, the source schema is flattened, and schema name is encoded into the table name. If you want to reorganize tables with schemas, recreate your mirrored database. Learn more from [Replicate source schema hierarchy](troubleshooting.md#replicate-source-schema-hierarchy).
- Mirroring supports replicating columns containing spaces or special characters in names (such as  `,` `;` `{` `}` `(` `)` `\n` `\t` `=`). For tables under replication before this feature enabled, you need to update the mirrored database settings or restart mirroring to include those columns. Learn more from [Delta column mapping support](troubleshooting.md#delta-column-mapping-support).
- The maximum number of tables that can be mirrored into Fabric is 1,000 tables. Any tables above the 1000 limit currently can't be replicated.
  - If you select **Mirror all data** when configuring Mirroring, the tables to be mirrored over will be determined by taking the first 1,000 tables when all tables are sorted alphabetically based on the schema name and then the table name. The remaining set of tables at the bottom of the alphabetical list won't be mirrored over.
  - If you unselect **Mirror all data** and select individual tables, you're prevented from selecting more than 1,000 tables.
- Calculated columns and calculated tables: Mirrored databases are read-only. You can't create calculated columns or calculated tables directly on a mirrored database. To add calculated columns, create a Lakehouse and use shortcuts to reference the mirrored data, then create your calculated columns in the Lakehouse using notebooks or SQL.

## Performance limitations
- If you're changing most of the data in a large table, it's more efficient to stop and restart Mirroring. Inserting or updating billions of records can take a long time.
- Some schema changes aren't reflected immediately. Some schema changes need a data change (insert, update, or delete) before schema changes are replicated to Fabric.
- Cross-region considerations: If your Snowflake instance and Fabric capacity are in different cloud regions, you might experience higher replication latency and data egress charges. For optimal performance and to avoid cross-region egress costs, deploy your Fabric capacity in the same cloud region as your Snowflake instance. If cross-region deployment is unavoidable, factor in the additional egress fees from Snowflake and/or Azure. See [Snowflake egress documentation](https://docs.snowflake.com/en/user-guide/cost-understanding-data-transfer) for details. 
- When mirroring data from Snowflake to a customer's OneLake, the process normally stages data via an inline URL to improve performance. If the Snowflake account-level parameter [PREVENT_UNLOAD_TO_INLINE_URL](https://docs.snowflake.com/sql-reference/parameters#prevent-unload-to-inline-url) is set to true, the following behavior applies:

| Connectivity method | Impact when PREVENT_UNLOAD_TO_INLINE_URL = true |
|---|---|
| Direct (public endpoint) | Mirroring falls back to direct read from Snowflake. This fallback results in slower replication times and an increased risk of connection timeouts, particularly for large datasets. |
| Virtual Network (VNet) data gateway | Mirroring is completely blocked. VNet gateway scenarios can't use direct read and require the inline URL staging path. |
| On-premises data gateway (OPDG) | Mirroring is completely blocked. OPDG scenarios can't use direct read and require the inline URL staging path. |

Planned resolution: Storage integration support is in development and will provide an alternative staging path that works when PREVENT_UNLOAD_TO_INLINE_URL is set to true. This solution unblocks VNet and OPDG scenarios. Check this page for updates on availability. 

- **Reseeding behavior:** A reseed is a full data reload of an entire table. Unlike incremental sync (which only processes changed rows), a reseed re-reads and re-writes all data in the table. Reseeds can incur significant Snowflake compute cost, especially for large tables. 
  - What triggers a reseed:

| Trigger | Description |
|---|---|
| DDL changes | Any DDL change that modifies the DDL timestamp of a table triggers a reseed. This trigger includes ALTER TABLE statements that add, drop, or rename columns, change data types, or modify table properties. |
| Schema modification tools (for example, DBT) | If a tool such as DBT modifies table definitions on a recurring schedule (for example, via dbt run which drops and recreates tables), each modification triggers a reseed. Running these tools frequently (for example, every few minutes) can cause continuous reseeding loops. |
| Stopping and restarting mirroring | Each time you stop and restart mirroring, the entire table is fetched again from scratch. |
| Extended capacity pause | If a Fabric capacity is paused for an extended period, mirroring might reseed from the beginning when resumed. See Changes to Fabric capacity. 

  - Best practices to avoid unnecessary reseeds:
    - Schedule schema changes outside of active mirroring. If you use DBT or other schema management tools, schedule them during maintenance windows or pause mirroring before running schema changes.
    - Avoid frequent DDL modifications. Consolidate schema changes into fewer, larger batches rather than making incremental changes throughout the day.
    - Monitor for unexpected reseeds. On the [Mirroring Status page](../mirroring/monitor.md), watch for tables that repeatedly show initial-copy behavior. If a large table is reseeding every few minutes, check for upstream DDL changes.
    - Be aware of the cost impact. A reseed of a 226 million-row table (~26.5 GB) takes significant compute time. Multiply this cost by the frequency of schema changes to estimate cost impact.

## Security limitations
- Fabric doesn't replicate Snowflake Row-Level Security (RLS) and Column-Level Security (CLS) policies. You must manually reconfigure equivalent security policies in Fabric.
- Sharing recipients must be added to the workspace. To share a dataset or report, first add access to the workspace with a role of admin, member, reader, or contributor.

## Cost and billing considerations
To minimize Snowflake compute costs from mirroring, consider the following best practices:

- Reuse an existing warehouse. Instead of creating a dedicated warehouse for mirroring, configure mirroring to use the same warehouse that your applications already use to update the source tables. This approach avoids unnecessary warehouse wake-up and auto-suspend cycles. When your application updates a table, the mirroring replicator picks up changes almost immediately while the warehouse is still active, eliminating the need to wake a separate warehouse. Some organizations might prefer a dedicated warehouse for budget isolation. This choice is a trade-off between cost savings and budgeting granularity.
- Mirror only the tables you need. Mirroring an entire database can cause unexpectedly high Snowflake consumption and Fabric capacity spikes. Start by selecting only the tables required for your analytics scenarios. You can add tables later as needed.
- Monitor for unexpected reseeds. A reseed (full data reload) processes the entire table and incurs compute cost proportional to the table size. Schema changes - including those triggered by tools such as DBT - can cause continuous reseeds. [Monitor the Mirroring Status](../mirroring/monitor.md) page for tables that show repeated initial-copy behavior, and review the Reseeding section for triggers and troubleshooting guidance.
- Be aware that mirroring runs continuously. Mirroring doesn't currently support scheduling or replication windows. The replicator continuously polls for changes, which generates ongoing Snowflake compute usage. Plan your Snowflake budgets accordingly. 

## Supported regions

[!INCLUDE [fabric-mirroreddb-supported-regions](../mirroring/includes/fabric-mirroreddb-supported-regions.md)]

## Related content

- [What is Mirroring in Fabric?](../mirroring/overview.md)
- [Mirroring Snowflake](../mirroring/snowflake.md)
- [Tutorial: Configure Microsoft Fabric mirrored databases from Snowflake](../mirroring/snowflake-tutorial.md)
