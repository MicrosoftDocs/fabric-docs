---
title: The modern get data experience in pipelines
description: Learn how to easily connect to your data with the new modern get data experience for pipelines.
ms.reviewer: whhender
ms.author: xupzhou
author: PennyZhou-MSFT
ms.topic: how-to
ms.date: 05/21/2024
ms.custom: pipelines
---

# Easily connect to your data with the new modern get data experience for pipelines

The new modern get data experience for pipelines simplifies connecting to data by intuitively browsing different Fabric items through the OneLake data hub. This feature lets you get to your data in the quickest way possible. This new experience empowers you to more easily move your data from various sources to your preferred destinations.

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](../fundamentals/fabric-trial.md).
- A workspace is created.

## Try the modern get data experience in a pipeline

1. First, create a new pipeline.
1. On the new pipeline start page, try out the modern get data experience by selecting either the **Copy data assistant** card on the main area of the page, or **Use copy assistant** from the **Copy data** dropdown on the **Activities** menu for the pipeline.

   :::image type="content" source="media/modern-get-data-experience-pipeline/use-copy-data-assistant.png" lightbox="media/modern-get-data-experience-pipeline/use-copy-data-assistant.png" alt-text="Screenshot showing how to start the Copy data assistant from either the Copy data assistant card or the Use copy assistant menu option.":::

1. On the **Choose data source** page of the **Copy data assistant**, there are several tabs, and you initially find the **Home** tab selected. The interface is designed to let users intuitively discover their data and connect to it easily for any supported data source. Recent documents from your OneLake data hub are presented directly.

   :::image type="content" source="media/modern-get-data-experience-pipeline/copy-data-assistant-home-tab-recent.png" lightbox="media/modern-get-data-experience-pipeline/copy-data-assistant-home-tab-recent.png" alt-text="Screenshot showing the recent items in the Copy data assistant Home tab.":::

1. You can also type part of your data source type or name in the filter at the top of the tab. This quickly shows all the matching data source types and items in your OneLake data hub.

   :::image type="content" source="media/modern-get-data-experience-pipeline/copy-data-assistant-home-tab-azure-blob.png" lightbox="media/modern-get-data-experience-pipeline/copy-data-assistant-home-tab-azure-blob.png" alt-text="Screenshot showing the Home tab of the Copy data assistant with the filter set to blob.":::

1. Choose **OneLake data hub** tab at the top, and you find more ways to access and further filter existing data connections in your OneLake data hub.

1. Choose the **Sample data** tab to choose from several sample data connections to data of varying size and type. You can use sample data to easily test out features or scenarios. For the purposes of this demonstration, you can choose the smallest **Diabetes** dataset. 

1. You see a sample of the data on the **Connect to data source** page next. Select **Next**, to move on.

1. On the **Choose data-destination** tab, create a new Fabric Lakehouse by selecting **Lakehouse** under the **New Fabric item** section on the **Home** tab.
   
   :::image type="content" source="media/modern-get-data-experience-pipeline/new-fabric-item.png" lightbox="media/modern-get-data-experience-pipeline/new-fabric-item.png" alt-text="Screenshot showing the New Fabric item tab highlighting the Lakehouse item type.":::

1. Then just provide a name for the new Lakehouse and select **Create and connect**.

   :::image type="content" source="media/modern-get-data-experience-pipeline/name-lakehouse.png" lightbox="media/modern-get-data-experience-pipeline/name-lakehouse.png" alt-text="Screenshot showing where to name the new Lakehouse.":::

1. On the **Connect to data destination** tab, you can leave the default selections and just select **Next**.

1. Finally, review the **Review + save** tab, select **Save + Run** to save and run the pipeline.

## Use the modern get data experience from the pipeline editor

You can also invoke the modern get data experience directly from an existing Copy activity on a pipeline. While the activity is selected, on its **Source** properties tab, when you open the **Connection** dropdown, you find a **More** option.

:::image type="content" source="media/modern-get-data-experience-pipeline/more-connection-option.png" alt-text="Screenshot showing where to choose the More option on the Connection dropdown for a Copy activity's data source.":::

When you choose this option, you can use the full modern get data experience to find or create your data.

:::image type="content" source="media/modern-get-data-experience-pipeline/modern-get-data-experience-from-pipeline-editor.png" lightbox="media/modern-get-data-experience-pipeline/modern-get-data-experience-from-pipeline-editor.png" alt-text="Screenshot showing the modern get data experience from the pipeline editor.":::

## Related content

[Monitor pipeline runs](monitor-pipeline-runs.md)
