---
title: Create a Bridge
description: Learn how to create bridges and add planning sheets.
ms.date: 05/07/2026
ms.topic: how-to
---

# Create a bridge to integrate and transform plans

A bridge provides a unified workspace for integrating data sources such as planning sheets, PowerTable sheets, or file-based sources. Use the bridge editor to transform and prepare data for planning. Bridges support data consolidation, real-time planning, and collaboration.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Create a bridge

Consolidate planning sheets across dimensions with varying granularities using bridges.

1. To create a bridge, in the **Infobridge** ribbon, select **Create Query**.
1. Select the measures to consolidate in the bridge, then select **Create**.

    :::image type="content" source="media/infobridge-how-to-create-bridge/create-query.png" alt-text="Screenshot of selecting measures to create a query from a planning sheet in Infobridge." lightbox="media/infobridge-how-to-create-bridge/create-query.png" :::

1. Creating a query automatically opens Infobridge, where you can join, append, merge, pivot, and transform data. Select **Close** to return to the planning sheet.

    :::image type="content" source="media/infobridge-how-to-create-bridge/bridge-created.png" alt-text="Screenshot of planning sheet data preview in a bridge." lightbox="media/infobridge-how-to-create-bridge/bridge-created.png":::

1. To access the bridge from a planning sheet, from the **Data** pane, expand **Queries**. Select **More options (…)** > **Edit** to open Infobridge. You can also delete or rename the query.

    :::image type="content" source="media/infobridge-how-to-create-bridge/access-bridge.png" alt-text="Screenshot of accessing the bridge from a planning sheet." lightbox="media/infobridge-how-to-create-bridge/access-bridge.png":::

1. Repeat the same process to add measures from other planning sheets to the bridge.

    :::image type="content" source="media/infobridge-how-to-create-bridge/create-second-query.png" alt-text="Screenshot of adding a second planning sheet to the bridge." lightbox="media/infobridge-how-to-create-bridge/create-second-query.png":::

    This example consolidates the bonus component across roles and departments in the bridge.

    :::image type="content" source="media/infobridge-how-to-create-bridge/second-query-added-bridge.png" alt-text="Consolidating multi-dimensional planning data in a bridge." lightbox="media/infobridge-how-to-create-bridge/second-query-added-bridge.png":::

1. Within Infobridge, hover over the query name and select **More options (…)** to edit, delete, duplicate, rerun the job, or copy the query ID.

    :::image type="content" source="media/infobridge-how-to-create-bridge/bridge-query-options.png" alt-text="Screenshot of options to edit, delete, refresh, and duplicate queries." lightbox="media/infobridge-how-to-create-bridge/bridge-query-options.png":::

## Import data into a bridge

Infobridge supports data integration to centralize data for analysis and reporting. Import and consolidate data from planning sheets, PowerTable sheets, and CSV, Excel, JSON, and Parquet files into a unified planning model.

1. Select **Add Source** and choose the source type.

    :::image type="content" source="media/infobridge-how-to-create-bridge/import-source.png" alt-text="Screenshot of options to import sources like Excel, Parquet, CSV files, planning or powertable sheets." lightbox="media/infobridge-how-to-create-bridge/import-source.png":::  

1. For file-based sources, select and upload the file.

    :::image type="content" source="media/infobridge-how-to-create-bridge/upload-files.png" alt-text="Screenshot of uploading a file source to infobridge." lightbox="media/infobridge-how-to-create-bridge/upload-files.png":::

1. Infobridge adds a new query that holds the source data to the bridge.

    :::image type="content" source="media/infobridge-how-to-create-bridge/query-created.png" alt-text="Screenshot of data imported into a bridge and stored in a query." lightbox="media/infobridge-how-to-create-bridge/query-created.png" :::

To use data from the query in a planning sheet, import dimensions and measures from the **Queries** section of the **Data** pane.
