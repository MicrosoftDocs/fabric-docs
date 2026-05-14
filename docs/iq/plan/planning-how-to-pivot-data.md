---
title: Pivot Data in Planning Sheets
description: Learn how to use the Pivot feature in Fabric plan (preview) Planning sheets for flexible data analysis and customized views.
ms.date: 05/04/2026
ms.topic: how-to
#customer intent: As a user, I want to understand and use use the Pivot feature in Fabric Plan planning sheets effectively.
---
# Pivot data in Planning sheets

*Pivot data* lets you reorganize row dimensions to create alternate views of your data without changing the underlying dataset.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

Each pivot view represents a unique arrangement of dimensions, enabling flexible analysis and planning across different perspectives.

With the **Pivot** option in the Planning sheet, you can:

* Reorder row dimensions
* Show or hide specific dimensions
* Create aggregated views using different dimension combinations

**Pivot Explorer** saves all pivot views, allowing you to quickly switch between them during analysis.

## Prerequisite

You have access to a Planning sheet.

## Create and use pivot views

1. Open your Planning sheet.
1. Select **Pivot** from the toolbar.

    :::image type="content" source="media/planning-how-to-pivot-data/create-pivot.png" alt-text="Screenshot of creating pivot." lightbox="media/planning-how-to-pivot-data/create-pivot.png":::

1. Select **Add**
1. Enter a **Name** for the pivot view.
1. Select the required row dimensions from **Available Fields**.
1. Select **Save**.

    :::image type="content" source="media/planning-how-to-pivot-data/configure-pivot.png" alt-text="Screenshot of configuring a pivot." lightbox="media/planning-how-to-pivot-data/configure-pivot.png":::

The pivot view is created.

## Manage pivot views

Each pivot represents a unique combination of row dimensions.

Start by selecting your pivot view.

:::image type="content" source="media/planning-how-to-pivot-data/pivot-views.png" alt-text="Screenshot of  pivot views." lightbox="media/planning-how-to-pivot-data/pivot-views.png":::

You can manage pivot views by enabling the **Pivot Explorer**, which provides the following options:

* Edit an existing pivot by updating its name or fields.
* Select (**⋮**) to **Duplicate** or **Delete** pivots.

   :::image type="content" source="media/planning-how-to-pivot-data/manage-pivot.png" alt-text="Screenshot of managing pivot." lightbox="media/planning-how-to-pivot-data/manage-pivot.png":::
