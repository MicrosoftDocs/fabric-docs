---
title: Copy sample data into Lakehouse and transform with dataflow
description: This tutorial shows you how to first load data into a Lakehouse with a pipeline and then transform it using a dataflow with Data Factory in [!INCLUDE [product-name](../includes/product-name.md)].
ms.reviewer: jburchel
ms.author: pennyzhou-msft
author: xupzhou
ms.topic: conceptual 
ms.date: 04/13/2023
---

# Copy sample data into Lakehouse and transform with a dataflow with Data Factory in [!INCLUDE [product-name](../includes/product-name.md)]

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here. Refer to [Azure Data Factory documentation](/azure/data-factory/) for the service in Azure.

In this tutorial, we will provide an end-to-end step to common scenario that use the pipeline to load source data into Lakehouse at high performance copy and then transform the data by dataflow to make users can easily load and transform data.

## Create a data pipeline

1. Sign in to [Power BI](https://app.powerbi.com) using your admin account credentials.
1. Choose your existing workspace with premium capacity enabled or create a new workspace enabling Premium capacity.
   :::image type="content" source="media/tutorial-load-data-to-lakehouse-and-transform/create-premium-capacity-workspace.png" alt-text="Screenshot showing the Create a workspace dialog with a premium capacity selection highlighted.":::
1. Switch to the **Data Factory** workload.
   :::image type="content" source="media/tutorial-load-data-to-lakehouse-and-transform/switch-to-data-factory-workload.png" alt-text="Screenshot showing the selection of the Data Factory workload.":::
1. Click **New** and select **Data pipeline**, then input a name for your pipeline.
   :::image type="content" source="media/tutorial-load-data-to-lakehouse-and-transform/new-data-pipeline.png" alt-text="Screenshot showing the new Data pipeline button.":::
   :::image type="content" source="media/tutorial-load-data-to-lakehouse-and-transform/pipeline-name.png" alt-text="Screenshot showing the pipeline name dialog.":::

## Use a pipeline to load sample data into Lakehouse

Use the following steps to load sample data into Lakehouse.

### Step 1: Start with the Copy assistant

Select **Copy Data** on the canvase, to open the **Copy assistant** tool to get started.