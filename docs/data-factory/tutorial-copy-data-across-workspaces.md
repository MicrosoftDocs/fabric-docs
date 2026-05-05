---
title: Copy data across workspaces
description: Learn steps to copy data across workspaces
ms.reviewer: jianleishen
ms.topic: tutorial
ms.custom: pipelines
ms.date: 09/26/2025
ms.search.form: Pipeline Tutorials
---

# Copy data across workspaces

In this tutorial, you learn how to copy data across workspaces. This experience shows you a quick demo about copying data from a Lakehouse in one workspace to a Lakehouse in another workspace using a pipeline. 

## Prerequisites

- Microsoft Fabric enabled workspaces. If you don't already have them, refer to the article [Create a workspace](../fundamentals/create-workspaces.md).
- **Lakehouse**. You use the Lakehouse in different workspaces as the source and destination data stores. If you don't have them, see [Create a Lakehouse](../data-engineering/create-lakehouse.md) for instructions on how to set one up in different workspaces.

## Create a pipeline 

1. Switch to the **Data Factory** experience.

1. Select **New** and then **Pipeline**, and then input a name for your pipeline.

   :::image type="content" source="media/create-first-pipeline/select-pipeline.png" alt-text="Screenshot showing the new pipeline button.":::

   :::image type="content" source="media/tutorial-load-data-lakehouse-transform/pipeline-name.png" alt-text="Screenshot showing the pipeline name dialog.":::

## Copy data across workspaces using a pipeline

You can copy data across workspaces either directly through the UI or by using parameters in a pipeline. This section focuses on how to connect to the destination Lakehouse located in different workspaces. For details on how to use copy activity in a pipeline and how to configure Lakehouse in a copy activity, go to [Add a copy activity directly](copy-data-activity.md#add-a-copy-activity-directly) and [Configure Lakehouse in a copy activity](connector-lakehouse-copy-activity.md). 

### Option 1: Through UI

1. In the source configuration for the copy activity in your pipeline, select your source Lakehouse and the data that you want to copy, and configure the source properties.
1. In the destination configuration, go to the connection drop-down list to browse to all connections. 
    
    :::image type="content" source="./media/tutorial-copy-data-across-workspaces/browse-all-connection.png" alt-text="Screenshot showing browse all connection.":::

1. On the **OneLake catalog** tab, select **Explorer** and choose the workspace where your destination Lakehouse is located. Then select the Lakehouse. 

    :::image type="content" source="./media/tutorial-copy-data-across-workspaces/onelake-catalog-explorer.png" alt-text="Screenshot showing the Explorer tab.":::
    
    :::image type="content" source="./media/tutorial-copy-data-across-workspaces/select-destination-lakehouse.png" alt-text="Screenshot showing select destination Lakehouse.":::

    In the Connect to data source page, select an existing connection or create a new Lakehouse connection from the drop-down list.

    :::image type="content" source="./media/tutorial-copy-data-across-workspaces/connect-to-lakehouse.png" alt-text="Screenshot showing connect to Lakehouse.":::

    > [!TIP]
    > If you use copy assistant, on choose data source/destination page, you can also utilize this step to connect to your Lakehouse.

1. Configure other destination properties and run your pipeline.


### Option 2: Using parameters

1. In the source configuration for your copy activity in the pipeline, select your source Lakehouse and the data you want to copy, and configure the source properties.

1. In the destination configuration, follow [Configure parameters in a copy activity](copy-data-activity.md#configure-parameters-in-a-copy-activity) to add parameter for your destination Lakehouse connection. If you need to create a new connection, follow the step 3 in this [section](#option-1-through-ui).
1. Specify the destination workspace ID and Lakehouse ID after specifying the expression.

    :::image type="content" source="./media/tutorial-copy-data-across-workspaces/parameter-workspace-lakehouse-id.png" alt-text="Screenshot showing specify the destination workspace ID and Lakehouse ID.":::

1. Configure other destination properties and run your pipeline.

## Related content

- [Copy data activity](copy-data-activity.md)
- [Configure Lakehouse in a copy activity](connector-lakehouse-copy-activity.md)