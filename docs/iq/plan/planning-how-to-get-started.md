---
title: Get Started with Planning Sheets
description: Learn how to get started with your first planning sheet. The article covers how to create a planning sheet, connect to your semantic model, and perform several tasks.
ms.date: 04/29/2026
ms.topic: how-to
ms.search.form: Getting Started with Planning Sheets
---

# Create a planning sheet

This article describes how to get started with your first planning sheet in plan.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Prerequisites

Before you set up planning sheets, make sure you have the following prerequisites:

* Data in a [Power BI semantic model](../../data-warehouse/semantic-models.md), and a [connection to your semantic model](planning-how-to-create-semantic-model-connection.md).

> [!NOTE]
> You can find the required tenant and capacity settings, as well as all other prerequisites, here: [Prerequisites for plan (preview)](overview-prerequisites.md).
> [!NOTE]
> The preview of plan in Fabric IQ is now accessible to organizations worldwide in Microsoft Fabric as part of the Microsoft Fabric SKU, and new meters have been created. Meters are currently available but are not currently billed.

## Create plan item

1. From your Fabric workspace, select **New item** > **Plan (preview)**.

    :::image type="content" source="media/planning-how-to-get-started/new-plan-1.png" alt-text="Screenshot of creating a new plan (preview) item." lightbox="media/planning-how-to-get-started/new-plan-1.png":::

1. On **New Plan**, enter a name for your plan, and then select **Create**.

    :::image type="content" source="media/planning-how-to-get-started/new-plan-2.png" alt-text="Screenshot of providing name and location details for a new plan.":::

    > [!NOTE]
    > When you create a planning item, you also automatically create a Fabric SQL database in your workspace. This database stores your plan report's metadata.

## Create your planning sheet

1. In your new plan item, you see options to get your data from the semantic model or from Excel, and to create a planning sheet from it. Alternatively, start with a planning sheet and then connect it to data.

     :::image type="content" source="media/planning-how-to-get-started/create-sheet.png" alt-text="Screenshot showing the options to create a new planning sheet." lightbox="media/planning-how-to-get-started/create-sheet.png":::
  
1. Select **Planning**, enter a name for the new planning sheet, and then select **Create**.

    :::image type="content" source="media/planning-how-to-get-started/new-plan-creation-1.png" alt-text="Screenshot of naming a new planning sheet." lightbox="media/planning-how-to-get-started/new-plan-creation-1.png":::

## Add the semantic model connection

In this section, you add the semantic model connection that you created earlier (see the [Prerequisites](#prerequisites) section). The result of this step is that your planning sheet has access to data in the semantic model.

1. In your new planning sheet, select **Add**.

1. Under **Select a Connection**, connect to your semantic model connection.

    :::image type="content" source="media/planning-how-to-get-started/semantic-model-connection.png" alt-text="Screenshot of connecting to a semantic model." lightbox="media/planning-how-to-get-started/semantic-model-connection.png":::

1. Select the semantic model, and then select **Add**.

    :::image type="content" source="media/planning-how-to-get-started/new-plan-4.png" alt-text="Screenshot of choosing a semantic model." lightbox="media/planning-how-to-get-started/new-plan-4.png":::

1. Add semantic model data into your fields. Now you have your first planning sheet.
  
   :::image type="content" source="media/planning-how-to-get-started/planning-sheet.png" alt-text="Screenshot of the created planning sheet." lightbox="media/planning-how-to-get-started/planning-sheet.png":::

## Optional: Connect to a database for collaboration

If you want to collaborate with others on this planning sheet, create a database connection for your plan item to store comments and other collaboration details. For more information, see [Create a database connection for collaboration](planning-how-to-create-database-connection.md).
