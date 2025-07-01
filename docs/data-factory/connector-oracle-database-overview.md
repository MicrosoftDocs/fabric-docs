---
title: Oracle database connector overview
description: This article provides an overview of the supported capabilities of the Oracle database connector.
author: whhender
ms.author: whhender
ms.topic: how-to
ms.date: 06/16/2025
ms.custom:
  - template-how-to
  - connectors
---

# Oracle database connector overview

The Oracle database connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in data pipelines

The Oracle database connector supports the following capabilities in data pipelines:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/destination)** | On-premises | Basic |
| **Lookup activity** | On-premises | Basic |
| **Script activity** | On-premises | Basic |

To learn about how to connect to Oracle database in data pipelines, go to [Set up your Oracle database connection](connector-oracle-database.md).

To learn more about the copy activity configuration for Oracle database in data pipelines, go to [Configure in a data pipeline copy activity](connector-oracle-database-copy-activity.md).

> [!NOTE]
>To use Oracle connector in date pipelines, install [Oracle Client for Microsoft Tools (OCMT)](https://www.oracle.com/database/technologies/appdev/ocmt.html) on the computer running on-premises data gateway. For detailed steps, go to [Prerequisites](connector-oracle-database.md#prerequisites).
