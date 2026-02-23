---
title: The modern get data experience in pipelines
description: Learn how to easily connect to your data with the new modern get data experience for pipelines.
ms.reviewer: xupzhou
ms.topic: how-to
ms.date: 11/19/2025
ms.custom: pipelines
ai-usage: ai-assisted
---

# Connect to your data with the get data experience for pipelines

The modern get data experience for pipelines helps you connect to data by browsing Fabric items through the OneLake data hub. You can move data from various sources to your preferred destinations.

## Prerequisites

To get started, you need:

- A tenant account with an active subscription. [Create an account for free](../fundamentals/fabric-trial.md).
- A [workspace](/fabric/fundamentals/create-workspaces).

## Try the get data experience in a pipeline

1. Create a [new pipeline](create-first-pipeline-with-sample-data.md).
1. On the pipeline start page, select either the **Copy data assistant** card or **Use copy assistant** from the **Copy data** dropdown on the **Activities** menu.

   :::image type="content" source="media/modern-get-data-experience-pipeline/use-copy-data-assistant.png" lightbox="media/modern-get-data-experience-pipeline/use-copy-data-assistant.png" alt-text="Screenshot that shows how to start the Copy data assistant from either the Copy data assistant card or the Use copy assistant menu option.":::

1. On the **Choose data source** page of the **Copy data assistant**, you'll see several tabs. The **Home** tab is selected by default. The interface helps you discover your data and connect to it for any supported data source. Recent and recommended documents from your OneLake data hub appear here.

   :::image type="content" source="media/modern-get-data-experience-pipeline/copy-data-assistant-home-tab-recent.png" lightbox="media/modern-get-data-experience-pipeline/copy-data-assistant-home-tab-recent.png" alt-text="Screenshot that shows the recent items in the Copy data assistant Home tab.":::

1. Type part of your data source type or name in the filter at the top of the tab. This shows all the matching data source types and items in your OneLake data hub.

   :::image type="content" source="media/modern-get-data-experience-pipeline/copy-data-assistant-home-tab-azure-blob.png" lightbox="media/modern-get-data-experience-pipeline/copy-data-assistant-home-tab-azure-blob.png" alt-text="Screenshot that shows the Home tab of the Copy data assistant with the filter set to blob.":::

1. Select the **OneLake data hub** tab at the top to access and filter existing data connections in your OneLake data hub.

1. Select the **Sample data** tab to choose from several sample data connections with data of varying size and type. You can use sample data to test features or scenarios. For this demonstration, choose the **Diabetes** dataset.

1. You see a sample of the data on the **Connect to data source** page. Select **Next** to continue.

1. On the **Choose data destination** tab, create a new Fabric Lakehouse by selecting **Lakehouse** under the **New Fabric item** section on the **Home** tab.

   :::image type="content" source="media/modern-get-data-experience-pipeline/new-fabric-item.png" lightbox="media/modern-get-data-experience-pipeline/new-fabric-item.png" alt-text="Screenshot that shows the New Fabric item tab with the Lakehouse item type highlighted.":::

1. Provide a name for the new Lakehouse and select **Create and connect**.

1. On the **Connect to data destination** tab, leave the default selections and select **Next**.

1. Review the **Review + save** tab, then select **Save + Run** to save and run the pipeline.

## Use the get data experience from the pipeline editor

You can also access the get data experience directly from an existing Copy activity on a pipeline. While the activity is selected, on its **Source** properties tab, open the **Connection** dropdown and select the **Browse all** option.

:::image type="content" source="media/modern-get-data-experience-pipeline/more-connection-option.png" alt-text="Screenshot that shows where to select the Browse all option on the Connection dropdown for a Copy activity's data source.":::

When you select this option, you can use the full get data experience to find or create your data.

:::image type="content" source="media/modern-get-data-experience-pipeline/modern-get-data-experience-from-pipeline-editor.png" lightbox="media/modern-get-data-experience-pipeline/modern-get-data-experience-from-pipeline-editor.png" alt-text="Screenshot that shows the modern get data experience from the pipeline editor.":::

## Related content

[Monitor pipeline runs](monitor-pipeline-runs.md)
