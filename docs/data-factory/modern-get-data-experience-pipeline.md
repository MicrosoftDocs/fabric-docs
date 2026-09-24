---
title: Get data experience for pipelines
description: Learn how to connect to source and destination data by using the get data experience in Microsoft Fabric pipelines.
ms.reviewer: xupzhou
ms.date: 07/27/2026
ms.topic: how-to
ms.custom:
  - pipelines
ai-usage: ai-assisted
---

# Connect to your data with the get data experience for pipelines

The get data experience for pipelines helps you connect to source and destination data by browsing connectors, recent items, recommended items, and Fabric items in the OneLake catalog. Use these connections to move data from a source to your preferred destination.

## Prerequisites

To get started, you need:

- A tenant account with an active subscription. [Create an account for free](../fundamentals/fabric-trial.md).
- A [workspace](../fundamentals/create-workspaces.md).

## Try the get data experience in a pipeline

1. Create a [new pipeline](create-first-pipeline-with-sample-data.md).
1. On the pipeline start page, select either the **Copy data assistant** card or **Use copy assistant** from the **Copy data** dropdown list on the **Activities** menu.

   :::image type="content" source="media/modern-get-data-experience-pipeline/use-copy-data-assistant.png" lightbox="media/modern-get-data-experience-pipeline/use-copy-data-assistant.png" alt-text="Screenshot that shows how to start the Copy data assistant from either the Copy data assistant card or the Use copy assistant menu option.":::

1. On the **Choose data source** page of the **Copy data assistant**, you see several tabs. The **Home** tab is selected by default, and you can [choose your data source](#choose-a-data-source-for-a-pipeline) from several options at the top of the choose data source window.

   :::image type="content" source="media/modern-get-data-experience-pipeline/copy-data-assistant-home-tab-recent.png" lightbox="media/modern-get-data-experience-pipeline/copy-data-assistant-home-tab-recent.png" alt-text="Screenshot that shows the recent items in the Copy data assistant Home tab.":::

1. Type part of your data source type or name in the filter at the top of the tab. This shows all the matching data source types and items in your OneLake catalog.

   :::image type="content" source="media/modern-get-data-experience-pipeline/copy-data-assistant-home-tab-azure-blob.png" lightbox="media/modern-get-data-experience-pipeline/copy-data-assistant-home-tab-azure-blob.png" alt-text="Screenshot that shows the Home tab of the Copy data assistant with the filter set to blob.":::

1. Select the **OneLake catalog** tab at the top to access and filter existing data connections in your OneLake catalog.

1. Select the **Sample data** tab to choose from several sample data connections with data of varying size and type. You can use sample data to test features or scenarios. For this demonstration, choose the **Diabetes** dataset.

1. You see a sample of the data on the **Connect to data source** page. Select **Next** to continue.

1. On the **Choose data destination** tab, create a new Fabric Lakehouse by selecting **Lakehouse** under the **New Fabric item** section on the **Home** tab.

   :::image type="content" source="media/modern-get-data-experience-pipeline/new-fabric-item.png" lightbox="media/modern-get-data-experience-pipeline/new-fabric-item.png" alt-text="Screenshot that shows the New Fabric item tab with the Lakehouse item type highlighted.":::

1. Provide a name for the new Lakehouse and select **Create and connect**.

1. On the **Connect to data destination** tab, leave the default selections and select **Next**.

1. Review the **Review + save** tab, then select **Save + Run** to save and run the pipeline.

## Use the get data experience from the pipeline editor

You can also access the get data experience directly from an existing Copy activity on a pipeline. While the activity is selected, on its **Source** properties tab, open the **Connection** dropdown list and select the **Browse all** option.

:::image type="content" source="media/modern-get-data-experience-pipeline/more-connection-option.png" alt-text="Screenshot that shows where to select the Browse all option on the Connection dropdown for a Copy activity's data source.":::

When you select this option, you can use the full get data experience to find or create your data.

:::image type="content" source="media/modern-get-data-experience-pipeline/modern-get-data-experience-from-pipeline-editor.png" lightbox="media/modern-get-data-experience-pipeline/modern-get-data-experience-from-pipeline-editor.png" alt-text="Screenshot that shows the get data experience from the pipeline editor.":::

## Choose a data source for a pipeline

To get data for a pipeline, the experience offers several source and destination selection options. Depending on what you're looking for, select the option from the top of the get data experience:

- **Home**:

   [!INCLUDE [Home module](~/../powerquery-repo/powerquery-docs/includes/get-data-home-module.md)]

- **New**:

   [!INCLUDE [New data source module](~/../powerquery-repo/powerquery-docs/includes/get-data-new-source-module.md)]

- **OneLake catalog**:

   [!INCLUDE [OneLake catalog module](~/../powerquery-repo/powerquery-docs/includes/get-data-onelake-catalog-module.md)]

- **Azure**:

   [!INCLUDE [Azure data sources module](~/../powerquery-repo/powerquery-docs/includes/get-data-azure-sources-module.md)]

- **Sample data**:

   [!INCLUDE [Sample data module](includes/get-data-sample-data-module.md)]

- **New Fabric item**:

   [!INCLUDE [New Fabric item module](~/../powerquery-repo/powerquery-docs/includes/get-data-new-fabric-item-module.md)]

## Related content

- [Monitor pipeline runs in Fabric Data Factory](monitor-pipeline-runs.md)
