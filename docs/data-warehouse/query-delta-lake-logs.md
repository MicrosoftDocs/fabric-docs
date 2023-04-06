---
title: Delta Lake logs in Synapse Data Warehouse in Microsoft Fabric
description: Learn how Synapse Data Warehouse in Microsoft Fabric publishes Delta Lake logs
ms.reviewer: wiassaf
ms.author: kecona
author: KevinConanMSFT
ms.topic: conceptual
ms.date: 04/05/2023
---

# Delta Lake logs in Synapse Data Warehouse in Microsoft Fabric 

**Applies to:** [!INCLUDE[fabric-dw](includes/applies-to-version/fabric-dw.md)]

Synapse Data Warehouse in Microsoft Fabric is built up open file formats. User tables are stored in parquet file format, and Delta Lake logs are published for all user tables.  

The Delta Lake logs opens up direct access to the warehouse's user tables for any engine that can read Delta Lake tables. This access is limited to read-only to ensure the user data maintains ACID transaction compliance. All inserts, updates, and deletes to the data in the tables must be executed through the Synapse Data Warehouse. Once a transaction is committed, a system background process is initiated to publish the updated Delta Lake log for the affected tables.

## Limitations

- Tables with inserts only are supported at this time
- Delta Lake log checkpoint and vacuum functions are unavailable at this time

## Examples

## Next steps

- [Query the Synapse Data Warehouse](query-warehouse.md)