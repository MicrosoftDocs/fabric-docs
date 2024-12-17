---
title: "Limitations for Microsoft Fabric Mirrored Databases From Snowflake"
description: Learn about the limitations of mirrored databases from Snowflake in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: imotiwala, maprycem
ms.date: 12/06/2024
ms.topic: conceptual
---

# Limitations in Microsoft Fabric mirrored databases from Snowflake

Current limitations in the Microsoft Fabric mirrored databases from Snowflake are listed in this page. This page is subject to change.

## Database level limitations

- Any table names and column names with special characters `,;{}()\=` and spaces aren't replicated.
- If there are no updates in a source table, the replicator engine starts to back off with an exponentially increasing duration for that table, up to an hour. The same can occur if there's a transient error, preventing data refresh. The replicator engine will automatically resume regular polling after updated data is detected.
- Only replicating native tables are supported. Currently, External, Transient, Temporary, Dynamic tables aren't supported.
- The maximum number of tables that can be mirrored into Fabric is 500 tables. Any tables above the 500 limit currently can't be replicated.
  - If you select **Mirror all data** when configuring Mirroring, the tables to be mirrored over will be determined by taking the first 500 tables when all tables are sorted alphabetically based on the schema name and then the table name. The remaining set of tables at the bottom of the alphabetical list will not be mirrored over.
  - If you unselect **Mirror all data** and select individual tables, you're prevented from selecting more than 500 tables.
 
## Network and firewall

- Currently, Mirroring does not support Snowflake instances behind a virtual network or private networking. If your Snowflake instance is behind a private network, you can't enable Snowflake mirroring.

## Security

- Snowflake authentication via username/password and Entra (single sign on (SSO)) are supported.
- Sharing recipients must be added to the workspace. To share a dataset or report, first add access to the workspace with a role of admin, member, reader, or contributor.

## Performance

- If you're changing most the data in a large table, it's more efficient to stop and restart Mirroring. Inserting or updating billions of records can take a long time.
- Some schema changes aren't reflected immediately. Some schema changes need a data change (insert/update/delete) before schema changes are replicated to Fabric.

## Supported regions

[!INCLUDE [fabric-mirroreddb-supported-regions](../includes/fabric-mirroreddb-supported-regions.md)]

## Related content

- [What is Mirroring in Fabric?](overview.md)
- [Mirroring Snowflake](snowflake.md)
- [Tutorial: Configure Microsoft Fabric mirrored databases from Snowflake](snowflake-tutorial.md)
