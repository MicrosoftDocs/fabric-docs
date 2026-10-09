---
title: Get Started with Planning Sheets
description: Learn how to get started with your first planning sheet. The article covers how to create a planning sheet, connect to your semantic model, and perform several tasks.
ms.date: 09/23/2026
ms.topic: how-to
ms.search.form: Getting Started with Planning Sheets
---

# Create a planning sheet

This article describes how to get started with your first planning sheet inside planning in Fabric.

> [!NOTE]
> Planning in Fabric IQ is now available to organizations worldwide as part of the Microsoft Fabric SKU. New billing meters are also introduced and are now available for billing.

## Prerequisites

Before you set up planning sheets, make sure you have the following prerequisites:

* The overall [prerequisites for planning in Fabric](overview-prerequisites.md), including the required tenant and capacity settings.

* Data in a [Power BI semantic model](../../data-warehouse/semantic-models.md).

> [!IMPORTANT]
>
> * The connection-based flow for semantic models is deprecated. You can now connect to a semantic model directly by using your signed-in identity without configuring a shared cloud connection.
> * Existing artifacts built by using the shared cloud connections auto-switch, and rows appear on the sheet based on the RLS evaluated against the signed-in user.
> * Cloud connection owners can delete the old connections.


## Create plan item

1. From your Fabric workspace, select **New item** > **Plan**.

    :::image type="content" source="media/planning-how-to-get-started/new-plan-1.png" alt-text="Screenshot of creating a new plan item." lightbox="media/planning-how-to-get-started/new-plan-1.png":::

1. On **New Plan**, enter a name for your plan, and then select **Create**.

    :::image type="content" source="media/planning-how-to-get-started/new-plan-2.png" alt-text="Screenshot of providing name and location details for a new plan.":::

    > [!NOTE]
    > When you create a plan item, you also automatically create a Fabric SQL database in your workspace. This database stores your plan report's metadata.

## Create your planning sheet

1. In your new plan item, you see options to get your data from the semantic model or from Excel, and to create a planning sheet from it. Alternatively, start with a planning sheet and then connect it to data.

     :::image type="content" source="media/planning-how-to-get-started/create-sheet.png" alt-text="Screenshot showing the options to create a new planning sheet." lightbox="media/planning-how-to-get-started/create-sheet.png":::
  
1. Select **Planning**, enter a name for the new planning sheet, and then select **Create**.

    :::image type="content" source="media/planning-how-to-get-started/new-plan-creation-1.png" alt-text="Screenshot of naming a new planning sheet." lightbox="media/planning-how-to-get-started/new-plan-creation-1.png":::

You created a new planning sheet.

:::image type="content" source="media/planning-how-to-get-started/new-planning-sheet.png" alt-text="Screenshot of a new planning sheet." lightbox="media/planning-how-to-get-started/new-planning-sheet.png":::

## Add the semantic model

Connect your plan item to a semantic model that contains your data, so you can start planning. The result of this step is that your planning sheet has access to data in the semantic model.

> [!IMPORTANT]
> The connection-based flow for semantic models is deprecated. You can now connect to a semantic model directly using your signed-in identity without configuring a shared cloud connection.

1. In your new planning sheet, in the **Data** pane, select **Add**.

1. In the **Select Semantic Model** popup, select the textbox to connect to your semantic model.

    :::image type="content" source="media/planning-how-to-get-started/semantic-model-connection.png" alt-text="Screenshot of connecting to a semantic model." lightbox="media/planning-how-to-get-started/semantic-model-connection.png":::

1. Select the semantic model, and then select **Add**.

    :::image type="content" source="media/planning-how-to-get-started/new-plan-4.png" alt-text="Screenshot of choosing a semantic model." lightbox="media/planning-how-to-get-started/new-plan-4.png":::

1. Select **Connect** to connect to the selected semantic model.

    :::image type="content" source="media/planning-how-to-get-started/connect-semantic-model.png" alt-text="Screenshot of selecting connect to connect to the semantic model." lightbox="media/planning-how-to-get-started/connect-semantic-model.png":::

1. The semantic model is connected to your planning sheet. The **Data** pane displays all your loaded data tables, columns, hierarchies, and measures.

    :::image type="content" source="media/planning-how-to-get-started/connected-semantic-model.png" alt-text="Screenshot of connected semantic model and data in data pane." lightbox="media/planning-how-to-get-started/connected-semantic-model.png":::

1. Assign the data you want to **Rows**, **Columns**, and **Values** fields. Now you have your first planning sheet.
  
   :::image type="content" source="media/planning-how-to-get-started/planning-sheet.png" alt-text="Screenshot of the created planning sheet." lightbox="media/planning-how-to-get-started/planning-sheet.png":::

> [!NOTE]
> Each **Plan** item is associated with a single semantic model. To connect to a different semantic model, [create a new plan item](#create-plan-item).
> 
> You can create multiple plan items within the same billing session. All items you create use the same active billing session, regardless of the number of items or use cases. For more information, see [Billing and usage for Fabric Planning](resources/billing-fabric-plan.md#faqs).


## Optional: Connect to a database for collaboration

If you want to collaborate with others on this planning sheet, create a database connection for your plan item to store comments and other collaboration details. For more information, see [Create a database connection for collaboration](planning-how-to-create-database-connection.md).
