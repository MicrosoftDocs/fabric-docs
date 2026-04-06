---
title: Get started with Planning sheets
description: Learn how to get started with your first Planning sheet in plan (preview). Discover how to create a Planning sheet, connect to your semantic model, and perform planning, budgeting, forecasting, and data analysis.
ms.date: 04/06/2026
ms.topic: how-to
---

# Create a Planning sheet

This article describes how to get started with your first Planning sheet in plan (preview).

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Prerequisites

Before you set up Planning sheets, make sure you have at least one of the following prerequisites:
* Data in a [Fabric SQL database](../../database/sql/overview.md), and a [connection to your database](planning-how-to-create-database-connection.md), OR
* Data in a [Power BI semantic model](../../data-warehouse/semantic-models.md), and a [connection to your semantic model](planning-how-to-create-semantic-connection.md).

> [!NOTE]
> The preview of plan in Fabric IQ is now accessible to organizations worldwide in Microsoft Fabric as part of the Microsoft Fabric SKU, and new meters have been created. Meters are currently available but are not currently billed.

## Create plan item

1. Start in your Fabric workspace.
1. Create a **New item > Plan (preview)**.

    :::image type="content" source="media/planning-how-to-get-started/new-plan-1.png" alt-text="Screenshot of creating a new plan (preview) item." lightbox="media/planning-how-to-get-started/new-plan-1.png":::

1. Name your plan and **Create** it.

    :::image type="content" source="media/planning-how-to-get-started/new-plan-2.png" alt-text="Screenshot of providing name and location details for a new Plan.":::

    >[!NOTE]
    >During planning item creation, a Fabric SQL database is automatically created in your workspace. This database stores your plan report's metadata.

## Create a Planning sheet

1. In your new plan item, you see options to get your data from the semantic model or Excel/CSV and create a Planning sheet from it, or to start with a Planning sheet and then connect it to data.

    :::image type="content" source="media/planning-how-to-get-started/new-plan-3.png" alt-text="Screenshot of the getting started options.":::

1. Select **Planning**, **Name** the new Planning sheet, and **Create** it.

    :::image type="content" source="media/planning-how-to-get-started/new-plan-creation-1.png" alt-text="Screenshot of naming a new planning sheet." lightbox="media/planning-how-to-get-started/new-plan-creation-1.png":::

## Connect Planning sheet to a dataset

1. In your new Planning sheet, select **Add** and **Connect** to your semantic model connection.

    :::image type="content" source="media/planning-how-to-get-started/new-plan-creation-2.png" alt-text="Screenshot of connecting to a semantic model." lightbox="media/planning-how-to-get-started/new-plan-creation-2.png":::

1. Select the semantic model and select **Add**.

    :::image type="content" source="media/planning-how-to-get-started/new-plan-4.png" alt-text="Screenshot of choosing a semantic model.":::

1. Add semantic model data into your fields. Now your first Planning sheet is created.
   
   :::image type="content" source="media/planning-how-to-get-started/planning-sheet.png" alt-text="Screenshot of the created planning sheet." lightbox="media/planning-how-to-get-started/planning-sheet.png":::
