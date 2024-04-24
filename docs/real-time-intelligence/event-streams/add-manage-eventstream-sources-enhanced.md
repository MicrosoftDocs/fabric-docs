---
title: External eventstream sources (preview)
description: Learn about external event sources in an eventstream with enhanced capabilities that are in preview.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 04/23/2024
ms.search.form: Source and Destination
---

# External event sources in an eventstream (preview)

This article describes enhanced external event sources that are in preview for Microsoft Fabric event streams.

Fabric event streams not only lets you stream data from Microsoft sources but also supports ingestion from third-party platforms like Google Cloud and Amazon Kinesis with new messaging connectors. This expanded capability offers seamless integration of external data streams into Fabric, providing greater flexibility and enabling real-time insights from multiple sources. The following list shows supported Fabric event streams sources:

- Confluent Cloud Kafka
- Amazon Kinesis Data Streams
- Azure SQL DB (CDC)
- PostgreSQL DB (CDC)
- Azure Cosmos DB (CDC) coming soon
- MySQL DB (CDC) coming soon
- Google Cloud Pub/Sub coming soon

> [!NOTE]
> 
> - MySQL and Google Cloud Pub/Sub aren't yet available for preview.
> - Data preview on source nodes isn't supported yet.
> - A temporary warning might appear immediately after you add a source. This false alarm will last about 30 seconds and then disappear. You can select **Refresh** on the ribbon to dismiss the warning.

## Related content

- [Create and manage an eventstream](create-manage-an-eventstream.md)
- [Add and manage a destination in an eventstream](add-manage-eventstream-destinations.md)
