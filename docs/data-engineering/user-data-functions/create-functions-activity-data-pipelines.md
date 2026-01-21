---
title: User data functions activity in pipelines
description: Learn how to add user data functions activity to a pipeline and run it in Fabric.
ms.author: eur
ms.reviewer: sumuth
author: eric-urban
ms.topic: how-to
ms.custom: freshness-kr
ms.date: 01/21/2026
---

# Create and run user data functions activity in pipelines

Run your custom Python functions as part of automated data workflows by adding a user data functions activity to a Fabric pipeline. This integration lets you centralize business logic in functions and call them during scheduled ETL processes, eliminating the need to duplicate code across notebooks and scripts.

## When to use functions in pipelines

Add a user data functions activity to your pipeline when you need to:

- **Apply business rules during data movement**: Validate, cleanse, or transform data as it flows through your pipeline. For example, standardize product categories or apply pricing rules before loading to a warehouse.
- **Schedule reusable logic**: Run the same business logic on a schedule without maintaining separate infrastructure.

## Prerequisites

To get started, you must complete the following prerequisites:

- A [Fabric workspace](../../get-started/create-workspaces.md) with an active capacity or trial capacity.
- A [user data functions item](./create-user-data-functions-portal.md) with at least one function.

## Add the Functions activity to a pipeline

Fabric pipelines provide a visual way to orchestrate data movement and transformation activities. In this section, you create a pipeline and add a Functions activity to it. In a later section, you configure the activity specifically for user data functions.

To create a pipeline with a Functions activity:

1. In your workspace, select **+ New item**.
1. In the **New item** dialog, search for **Pipeline** and select it.
1. In the **New pipeline** dialog, enter a name for the pipeline and select **Create**.
1. On the pipeline home page, select the **Activities** tab.
1. In the Activities ribbon, select the **...** (ellipsis) icon to see more activities.
1. Search for **Functions** in the list of activities under **Orchestrate**, then select it to add the functions activity to the pipeline canvas.

   :::image type="content" source="..\media\user-data-functions-activity-in-pipelines\add-function-activity-in-pipelines.png" alt-text="Screenshot showing how to find functions activity." lightbox="..\media\user-data-functions-activity-in-pipelines\add-function-activity-in-pipelines.png":::

## Configure the activity for user data functions

After you add the functions activity to the canvas, configure it to call your user data function.

### Configure general settings

1. Select the functions activity on the canvas.
1. Select the **General** tab.
1. Enter a **Name** for the activity.

    :::image type="content" source="..\media\user-data-functions-activity-in-pipelines\activity-general-settings.png" alt-text="Screenshot showing general settings for functions activity." lightbox="..\media\user-data-functions-activity-in-pipelines\activity-general-settings.png":::

1. Optionally, configure retry settings and specify whether you're passing secure input or output.


### Configure function settings

1. Select the **Settings** tab.
1. Select **Fabric user data functions** as the **Type**.
1. In the **Connection** dropdown, select a connection that you want to use. If you don't see the connection you want, select **Browse all**.
1. In the **Choose a data source to get started** dialog, search for **User Data Functions** and select it. You should see it listed under **New sources**.
1. In the **Connect to data source** dialog, you can keep the default connection name and credentials. Make sure you're signed in, then select **Connect**.

    :::image type="content" source="..\media\user-data-functions-activity-in-pipelines\add-function-connection-in-pipelines.png" alt-text="Screenshot of selecting User Data Functions in the connection pane." lightbox="..\media\user-data-functions-activity-in-pipelines\add-function-connection-in-pipelines.png":::

   > [!NOTE]
   > If you already have a connection, it might be preselected in the dialog. You can keep the existing connection or select **Create new connection** from the dropdown to create a new one.

1. Back on the activity settings, select **UserDataFunctions** from the **Connection** dropdown. This is the connection you just created.

    :::image type="content" source="..\media\user-data-functions-activity-in-pipelines\user-data-functions-activity-settings-connection.png" alt-text="Screenshot of selecting the UserDataFunctions connection." lightbox="..\media\user-data-functions-activity-in-pipelines\user-data-functions-activity-settings-connection.png":::

1. Select the **Workspace** containing your user data functions item.
1. Select the **User data functions** item name.
1. Select the **Function** that you want to invoke.
1. Provide input parameters for your selected function. You can use static values or dynamic content from pipeline expressions.

    :::image type="content" source="..\media\user-data-functions-activity-in-pipelines\user-data-functions-activity-settings.png" alt-text="Screenshot showing settings for functions activity." lightbox="..\media\user-data-functions-activity-in-pipelines\user-data-functions-activity-settings.png":::

    > [!NOTE]
    > To enter dynamic content, select the field you want to populate, then press **Alt+Shift+D** to open the expression builder. 

### Pass dynamic parameters

To pass values from other pipeline activities or variables to your function:

1. Select a field that supports dynamic content, such as the **Value** field for the `name` parameter shown previously.
1. Press **Alt+Shift+D** to open the expression builder.
1. Use pipeline expressions to reference variables, parameters, or output from previous activities. For example, use `@pipeline().parameters.PipelineName` to pass a pipeline parameter to your function.

    :::image type="content" source="..\media\user-data-functions-activity-in-pipelines\activity-function-expression-builder.png" alt-text="Screenshot showing the expression builder." lightbox="..\media\user-data-functions-activity-in-pipelines\activity-function-expression-builder.png":::

For more information about pipeline expressions, see [Expressions and functions](../../data-factory/expression-language.md).

## Use function output in downstream activities

Your function's return value is available in the activity output. To reference the output in subsequent activities:

1. Add another activity to your pipeline after the Functions activity.
1. Select the Functions activity and drag its **On success** output (the green checkmark on the right side of the activity) to the new activity. This creates a dependency so the new activity runs after the function completes successfully.
1. Select the new activity and find a field that supports dynamic content.
1. Press **Alt+Shift+D** to open the expression builder.
1. Use the expression `@activity('YourFunctionActivityName').output` to reference the function's return value. For example, the name of the function activity is `Functions1`, you can use `@activity('Functions1').output` to reference its output.

    :::image type="content" source="..\media\user-data-functions-activity-in-pipelines\activity-function-expression-builder-downstream.png" alt-text="Screenshot showing the expression builder for downstream activities." lightbox="..\media\user-data-functions-activity-in-pipelines\activity-function-expression-builder-downstream.png":::

The exact structure of the output depends on what your function returns. For example, if your function returns a dictionary, you can access specific properties like `@activity('YourFunctionActivityName').output.propertyName`.

## Save and run the pipeline

After you configure the Functions activity and any other activities for your pipeline:

1. Select the **Home** tab at the top of the pipeline editor.
1. Select **Save** to save your pipeline.
1. Select **Run** to run the pipeline immediately, or select **Schedule** to set up a recurring schedule.

After running, you can monitor the pipeline execution and view run history from the **Output** tab below the canvas. For more information, see [Monitor pipeline runs](../../data-factory/monitor-pipeline-runs.md).

## Related content

- [Learn about the User data functions programming model](./python-programming-model.md)
- [Use parameters in pipelines for Data Factory in Fabric](../../data-factory/parameters.md)
- [Understand the pipeline run concept](../../data-factory/pipeline-runs.md)
- [How to monitor pipeline runs in Microsoft Fabric](../../data-factory/monitor-pipeline-runs.md)
