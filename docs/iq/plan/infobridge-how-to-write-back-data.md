---
title: Write back InfoBridge data
description: Learn how to integrate and transform plans, budgets, and forecasts from multiple data sources and write data back easily to a unified data integration platform.
ms.date: 03/11/2026
ms.topic: how-to
#customer intent: As a user, I want to know how to write back transformed data from InfoBridge to a Fabric SQL destination.
---

# Write back transformed data from InfoBridge

InfoBridge in plan (preview) not only transforms and integrates data from multiple sources but also enables direct write-back to a Microsoft Fabric SQL database. This process allows the transformed dataset produced in a bridge to become a governed dataset stored in the enterprise data platform.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

This section explains how to write back the output of a bridge to a Fabric SQL database destination.

## Write-back overview

In the following example, a sample bridge is created using **InfoBridge** that merges two data sources:

* **Query 1**: A Planning sheet containing actual revenue from 2026
* **Query 2**: An external Excel file containing forecast and projected revenue

Through the **Merge Query** operation, measures from both queries are combined to produce a unified dataset that integrates actual and forecasted values.

Once the transformation is complete, the merged dataset can be written back to a **Fabric SQL database**. This write-back allows the combined data to be used by downstream applications such as analytics, planning models, and operational reporting systems.

Here's an example of transformed data:

:::image type="content" source="media/infobridge-how-to-write-back-data/transformed-data.png" alt-text="Screenshot of the data that InfoBridge transformed." lightbox="media/infobridge-how-to-write-back-data/transformed-data.png":::

## Add new destination

1. Select **Add new destination** to add a write-back destination.

1. Enter the Fabric SQL connection information, including the connection name, database name for write-back, schema, write-back table name, decimal precision, and text length.

    :::image type="content" source="media/infobridge-how-to-write-back-data/create-destination.png" alt-text="Screenshot of the Create destination configuration.":::

1. The write-back destination is configured.

    :::image type="content" source="media/infobridge-how-to-write-back-data/configured-destination.png" alt-text="Screenshot of the data in its newly configured destination." lightbox="media/infobridge-how-to-write-back-data/configured-destination.png":::

## Write back data

1. Select **Writeback** from the **Writeback** tab. This instruction writes back the merged query to the chosen destination.

    :::image type="content" source="media/infobridge-how-to-write-back-data/write-back.png" alt-text="Screenshot of the Writeback tab and the merged query." lightbox="media/infobridge-how-to-write-back-data/write-back.png":::

1. The data that is written back to the Fabric SQL database is shown in the following image.

    :::image type="content" source="media/infobridge-how-to-write-back-data/data-sql.png" alt-text="Screenshot of the data after being written back to the Fabric SQL database." lightbox="media/infobridge-how-to-write-back-data/data-sql.png":::