---
title: Monitor Cosmos DB Database (Preview)
titleSuffix: Microsoft Fabric
description: Find out how to monitor your Cosmos DB database in Microsoft Fabric during the preview, including available metrics and monitoring tools.
author: seesharprun
ms.author: sidandrews
ms.topic: how-to
ms.date: 07/17/2025
ms.search.form: Deploy and monitor Cosmos DB
appliesto:
- ✅ Cosmos DB in Fabric
---

# Monitor Cosmos DB in Microsoft Fabric (preview)

[!INCLUDE[Feature preview note](../../includes/feature-preview-note.md)]

Monitoring is key to understanding how your Cosmos DB in Fabric workloads is performing and scaling over time. The summary metrics are a useful tool for quickly assessing the health of your workload as they're updated regularly. In this guide, you use the **Metrics Summary** dialog to review a quick snapshot of key usage indicators.

> [!NOTE]
> There could be small delays of a few minutes for the summary metrics to be available after creating a new database.

## Prerequisites

[!INCLUDE[Prerequisites - Existing database](includes/prerequisite-existing-database.md)]

## Review aggregate monitoring data

Use the **Metrics Summary** dialog to review high-level sums and averages (aggregations) for your metrics.

1. Open the Fabric portal (<https://app.fabric.microsoft.com>).

1. Navigate to your existing Cosmos DB database.

1. Select the **Metrics Summary** option in the menu bar for the database.

1. Observe the values in the **Metrics Summary** dialog. Specifically, observe the values of aggregate metrics including:

    | | Description |
    | --- | --- |
    | **`Total Requests (Sum)`** | The total number of operations performed against the database over time, including reads, writes, deletes, and queries. This metric reflects overall workload activity and helps you understand usage patterns and database load. |
    | **`Data Usage (Avg)`** | The average amount of data stored in the database, including both user documents and system metadata. This metric helps monitor storage growth and can inform scaling or data management strategies. |
    | **`Index Usage (Avg)`** | The average storage size consumed by index data in the database. This metric is useful for understanding the storage overhead introduced by indexing, particularly in write-heavy or large-schema workloads. |
    | **`Document Count (Avg)`** | The average number of documents stored in the database. This metric helps estimate data volume, track growth trends, and anticipate changes in storage or performance needs. |

    :::image type="content" source="media/how-to-monitor/metrics-summary.png" lightbox="media/how-to-monitor/metrics-summary-full.png" alt-text="Screenshot of the 'Metrics summary' dialog for a database in the Fabric portal.":::

## Review detailed metrics

Use the Microsoft Fabric capacity metrics app for more detailed metrics and capacity planning. This app provides broader insights across your Fabric environment.

For more information, see [install Microsoft Fabric capacity metrics app](../../enterprise/metrics-app-install.md).

## Related content

- [Learn about Cosmos DB in Microsoft Fabric](overview.md)
- [Frequently asked questions about Cosmos DB in Microsoft Fabric](faq.yml)
