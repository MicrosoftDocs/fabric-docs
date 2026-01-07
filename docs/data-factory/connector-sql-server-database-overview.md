---
title: SQL Server database connector overview
description: This article provides an overview of the supported capabilities of the SQL Server database connector.
author: whhender
ms.author: whhender
ms.topic: how-to
ms.date: 07/09/2025
ms.custom:
  - template-how-to
  - connectors
---

# SQL Server database connector overview

The SQL Server database connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities                                                                 | Gateway                        | Authentication   |
|----------------------------------------------------------------------------------------|--------------------------------|------------------|
| **Dataflow Gen2** (source/-)                                                 | None<br> On-premises<br> Virtual network | Basic<br> Organizational account<br> Service principal<br>Workspace identity <br>Windows (Only for on-premises gateway) |
| **Pipeline** <br>- [Copy activity](connector-sql-server-copy-activity.md) (source/-)<br>- Lookup activity<br>- Get Metadata activity<br>- Script activity<br>- Stored procedure activity | None<br> On-premises<br> Virtual network | Basic<br> Organizational account<br> Service principal <br>Windows (Only for on-premises gateway) |
| **Copy job** (source/destination)  <br>- Full load<br>- CDC<br>- Incremental load<br>- Append<br>- Override <br>- Upsert <br>- CDC Merge | None<br> On-premises<br> Virtual network |  Basic<br> Organizational account<br> Service principal <br>Windows (Only for on-premises gateway)|

> [!NOTE]
> The Service principal authentication only applies to [SQL Server on Azure VMs](/azure/azure-sql/virtual-machines).

## Related content

To learn about how to connect to SQL Server database, go to [Set up your SQL Server database connection](connector-sql-server-database.md).

To learn more about the copy activity configuration for SQL Server database in a pipeline, go to [Configure in a pipeline copy activity](connector-sql-server-copy-activity.md).
