---
title: Share measures between sheets
description: Learn how to create bridges and connect Planning sheets to share data inputs and forecasts between sheets.
ms.date: 03/11/2026
ms.topic: how-to
#customer intent: As a user, I want to create financial reports in Fabric
---

# Import measures between Planning sheets with InfoBridge

With InfoBridge in plan (preview), you can consolidate measures from different data sources like files and Planning sheets into a target Planning sheet (for example, integrating multiple regional forecasts into a single global forecast).

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

In this article, you learn how to import a measure from one Planning sheet into another.

## Prerequisites

Create two Planning sheets with identical row and column dimensions. The row and column dimensions must match in both sheets to import measures successfully.

Sample reports used in this article:

* A COGS Planning sheet that is used for forecasting and contains a *COGS Projections* data input measure.

    :::image type="content" source="media/infobridge-how-to-share-measures/sample-cogs.png" alt-text="Screenshot of a sample COGS report with the described input measure." lightbox="media/infobridge-how-to-share-measures/sample-cogs.png":::

* A sales Planning sheet

    :::image type="content" source="media/infobridge-how-to-share-measures/sample-sales.png" alt-text="Screenshot of a sample quarterly sales Planning sheet." lightbox="media/infobridge-how-to-share-measures/sample-sales.png":::

In this article, you use InfoBridge to bring COGS projections into the Sales report.

## Create a bridge

1. Go to **Data** > **Queries** > **Add** and select **Planning sheet**.
1. Select **COGS Report** from the **Sheet** dialog.
1. Select the **COGS Projections** measure to be uploaded to the bridge. Select **Add**.

    :::image type="content" source="media/infobridge-how-to-share-measures/add-bridge.png" alt-text="Screenshot of adding a COGS projection measure to the report." lightbox="media/infobridge-how-to-share-measures/add-bridge.png":::

1. A new bridge is created with the COGS Projections measure. The scope of this article is limited to importing a measure without any transformations. Validate the data and select **Close**.

    :::image type="content" source="media/infobridge-how-to-share-measures/new-bridge.png" alt-text="Screenshot of the newly created bridge with the imported measure." lightbox="media/infobridge-how-to-share-measures/new-bridge.png":::

>[!NOTE]
>InfoBridge can be used to transform, cleanse, and change the structure of the data.

## Import a measure

1. Open the target Planning sheet, *Quarterly Sales Report*.
1. The bridge created in the previous step appears under the **Queries** section. To import COGS projections, add it to the **Values** field.

    :::image type="content" source="media/infobridge-how-to-share-measures/imported-measure.png" alt-text="Screenshot of the imported bridge in the target Planning sheet." lightbox="media/infobridge-how-to-share-measures/imported-measure.png":::

Measures from InfoBridge act like regular data source measures and can be used for calculations or included in other reports and visualizations.