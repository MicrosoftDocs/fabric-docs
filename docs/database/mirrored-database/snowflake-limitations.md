---
title: "Limitations for Microsoft Fabric mirrored databases from Snowflake (preview)"
description: Learn about the limitations of mirrored databases from Snowflake in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: imotiwala, maprycem
ms.service: fabric
ms.date: 03/15/2024
ms.topic: conceptual
ms.custom: references_regions
ms.search.form:
---

# Limitations in Microsoft Fabric mirrored databases from Snowflake (Preview)

Current limitations in the Microsoft Fabric mirrored databases from Snowflake are listed in this page. This page is subject to change.

## Database level limitations

- Any table names and column names with special characters `,;{}()\=` and spaces are not replicated.
- If there are no updates in a source table, the replicator engine starts to back off with an exponentially increasing duration for that table, up to an hour. The same can occur if there is a transient error, preventing data refresh. The replicator engine will automatically resume regular polling after updated data is detected.
- Only replicating native tables are supported. Currently, External, Transient, Temporary, Dynamic tables are not supported.
- The maximum number of tables that can be mirrored into Fabric is 500 tables. Any tables above the 500 limit currently cannot be replicated.
  - If you select **Mirror all data** when configuring Mirroring, the tables to be mirrored over will be determined by taking the first 500 tables when all tables are sorted alphabetically based on the schema name and then the table name. The latter set of tables that are at the bottom of the alphabetical list will not be mirrored over.
  - If you unselect **Mirror all data** and select individual tables, you are prevented from selecting more than 500 tables.
 
## Network and firewall

- Currently, Mirroring does not support Snowflake instances behind a virtual network or private networking. If your Snowflake instance is behind a private network, you cannot enable Snowflake mirroring.

## Security

- Snowflake authentication only via username/password is supported.
- Sharing recipients must be added to the workspace. To share a dataset or report, first add access to the workspace with a role of admin, member, reader, or contributor.

## Performance

- If you're changing most the data in a large table, it's more efficient to stop and restart Mirroring. Inserting or updating billions of records can take a long time.
- Some schema changes are not reflected immediately. Some schema changes need a data change (insert/update/delete) before schema changes are replicated to Fabric.

### Fabric regions that support Mirroring

The following are the Fabric regions that support Mirroring for Snowflake:

:::row:::
   :::column span="":::
    **Asia Pacific**:

    - Australia East
    - Australia Southeast
    - Central India
    - East Asia
    - Japan East
    - Korea Central
    - Southeast Asia
    - South India
   :::column-end:::
   :::column span="":::
   **Europe**

    - North Europe
    - West Europe
    - France Central
    - Germany West Central
    - Norway East
    - Sweden Central
    - Switzerland North
    - Switzerland West
    - UK South
    - UK West
   :::column-end:::
   :::column span="":::
    **Americas**:

    - Brazil South
    - Canada Central
    - Canada East
    - East US
    - East US2
    - North Central US
    - West US
    - West US2
   :::column-end:::
   :::column span="":::
    **Middle East and Africa**:

    - South Africa North
    - UAE North
   :::column-end:::
:::row-end:::

## Related content

- [What is Mirroring in Fabric?](overview.md)
- [Microsoft Fabric mirrored databases from Snowflake (Preview)](snowflake.md)
- [Tutorial: Configure Microsoft Fabric mirrored databases from Snowflake (Preview)](snowflake-tutorial.md)
