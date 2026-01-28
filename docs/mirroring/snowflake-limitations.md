---
title: "Limitations for Microsoft Fabric Mirrored Databases From Snowflake"
description: Learn about the limitations of mirrored databases from Snowflake in Microsoft Fabric.
author: whhender
ms.author: whhender
ms.reviewer: imotiwala, sbahadur
ms.date: 04/24/2025
ms.topic: limits-and-quotas
---

# Limitations in Microsoft Fabric mirrored databases from Snowflake

Current limitations in the Microsoft Fabric mirrored databases from Snowflake are listed in this page. This page is subject to change.

## Database level limitations

- If there are no updates in a source table, the replicator engine starts to back off with an exponentially increasing duration for that table, up to an hour. The same can occur if there's a transient error, preventing data refresh. The replicator engine will automatically resume regular polling after updated data is detected.
- Only replicating native tables are supported. Currently, External, Transient, Temporary, Dynamic tables aren't supported.
- Source schema hierarchy is replicated to the mirrored database. For mirrored databases created before this feature enabled, the source schema is flattened, and schema name is encoded into the table name. If you want to reorganize tables with schemas, recreate your mirrored database. Learn more from [Replicate source schema hierarchy](troubleshooting.md#replicate-source-schema-hierarchy).
- Mirroring supports replicating columns containing spaces or special characters in names (such as  `,` `;` `{` `}` `(` `)` `\n` `\t` `=`). For tables under replication before this feature enabled, you need to update the mirrored database settings or restart mirroring to include those columns. Learn more from [Delta column mapping support](troubleshooting.md#delta-column-mapping-support).
- The maximum number of tables that can be mirrored into Fabric is 500 tables. Any tables above the 500 limit currently can't be replicated.
  - If you select **Mirror all data** when configuring Mirroring, the tables to be mirrored over will be determined by taking the first 500 tables when all tables are sorted alphabetically based on the schema name and then the table name. The remaining set of tables at the bottom of the alphabetical list will not be mirrored over.
  - If you unselect **Mirror all data** and select individual tables, you're prevented from selecting more than 500 tables.

## Security

- Snowflake authentication via username/password and Entra (single sign on (SSO)) are supported.
- Sharing recipients must be added to the workspace. To share a dataset or report, first add access to the workspace with a role of admin, member, reader, or contributor.

## Performance

- If you're changing most the data in a large table, it's more efficient to stop and restart Mirroring. Inserting or updating billions of records can take a long time.
- Some schema changes aren't reflected immediately. Some schema changes need a data change (insert/update/delete) before schema changes are replicated to Fabric.
- When mirroring data from Snowflake to a customer's OneLake, we usually stage the data to improve performance. However, if data exfiltration from Snowflake through inline URL is disabled via [PREVENT_UNLOAD_TO_INLINE_URL](https://docs.snowflake.com/sql-reference/parameters#prevent-unload-to-inline-url), direct read from Snowflake could be required. This approach can lead to slower replication times and an increased risk of connection timeouts, particularly for large datasets.

## Supported regions

[!INCLUDE [fabric-mirroreddb-supported-regions](../mirroring/includes/fabric-mirroreddb-supported-regions.md)]

## Related content

- [What is Mirroring in Fabric?](../mirroring/overview.md)
- [Mirroring Snowflake](../mirroring/snowflake.md)
- [Tutorial: Configure Microsoft Fabric mirrored databases from Snowflake](../mirroring/snowflake-tutorial.md)
