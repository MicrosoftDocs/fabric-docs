---
title: Publishing Delta Lake Logs in Synapse Data Warehouse in Microsoft Fabric
description: Learn how Synapse Data Warehouse in Microsoft Fabric publishes Delta Lake Logs
ms.reviewer: wiassaf
ms.author: kecona
author: KevinConanMSFT
ms.topic: conceptual
ms.date: 04/05/2023
---

# Synapse Data Warehouse in Microsoft Fabric Delta Lake Log Publishing

[!INCLUDE [preview-note](../includes/preview-note.md)]

**Applies to:** Warehouse

## What to expect

Synapse Data Warehouse in Microsoft Fabric is built up open file formats.  This file format means that user tables are stored in Parquet File Format.  With the new file format, we're able to publish Delta Lake Logs for all user tables.  

The Delta Lake Logs opens up direct access the Synapse Data Warehouse's user tables for any engine that can read Delta Lake Tables.  This access is limited to read-only to ensure the user data remains ACID transaction compliance.  All inserts, updates and deletes to the data in the tables, needs to come through the Synapse Data Warehouse.

Once a transaction is committed, a system background process is initiated to publish the updated Delta Lake Log for the affected tables.

## Limitations

- Tables with inserts only are supported at this time
- Delta Lake Log Checkpoint and Vacuum are unavailable at this time

## Next steps

- [Query a warehouse using SSMS](query-warehouse-sql-server-management-studio.md)