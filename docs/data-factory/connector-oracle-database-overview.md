---
title: Oracle database connector overview
description: This article provides an overview of the supported capabilities of the Oracle database connector.
ms.topic: how-to
ms.date: 07/09/2025
ms.custom:
  - template-how-to
  - connectors
---

# Oracle database connector overview

The Oracle database connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities                                                                 | Gateway                        | Authentication   |
|----------------------------------------------------------------------------------------|--------------------------------|------------------|
| **Dataflow Gen2** (source/-)                                                 | On-premises | Basic           |
| **Pipeline** <br>- [Copy activity](connector-oracle-database-copy-activity.md) (source/destination)<br>- Lookup activity<br>- Script activity| On-premises | Basic           |
| **Copy job** (source/destination) <br>- Full load<br>- Append | On-premises | Basic           |

> [!NOTE]
>To use Oracle connector in pipelines, install [Oracle Client for Microsoft Tools (OCMT)](https://www.oracle.com/database/technologies/appdev/ocmt.html) on the computer running on-premises data gateway. For detailed steps, go to [Prerequisites](connector-oracle-database.md#prerequisites).

## Related content

To learn about how to connect to Oracle database, go to [Set up your Oracle database connection](connector-oracle-database.md).

To learn more about the copy activity configuration for Oracle database in pipelines, go to [Configure in a pipeline copy activity](connector-oracle-database-copy-activity.md).