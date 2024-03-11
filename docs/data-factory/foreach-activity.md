---
title: ForEach activity
description: Learn how to add a ForEach activity to a pipeline and use it to iterate through a list of items.
ms.reviewer: xupxhou
ms.author: jburchel
author: jonburchel
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
---

# Transform data with a ForEach activity

The ForEach Activity defines a repeating control flow in a [!INCLUDE [product-name](../includes/product-name.md)] pipeline. This activity is used to iterate over a collection and executes specified activities in a loop. The loop implementation of this activity is similar to a ForEach looping structure in programming languages.

## Add a ForEach activity to a pipeline

This section describes how to use a ForEach activity in a pipeline.

### Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](../get-started/fabric-trial.md).
- A workspace is created.

### Creating the activity

1. Create a new pipeline in your workspace.
1. Search for **ForEach** in the pipeline **Activities** pane, and select it to add it to the pipeline canvas. If you can't see it initially, use the arrow on the right side of the activities toolbar to scroll to the right to find it.

   :::image type="content" source="media/foreach-activity/add-foreach-activity-to-pipeline.png" alt-text="Screenshot of the Fabric UI with the Activities pane and ForEach activity highlighted.":::

1. Select the new ForEach activity on the canvas if it isn't already selected.

   :::image type="content" source="media/foreach-activity/foreach-general-settings.png" alt-text="Screenshot showing the General settings tab of the ForEach activity.":::

1. In the **General** tab at the bottom of the canvas, enter a name for the activity in the Name property.
1. (Optional) You can also enter a description.

### ForEach settings

Select the **Settings** tab, where you can specify whether processing of the items in the batch should be **Sequential** (or otherwise in parallel). You can also specify a maximum number of items to process at the same time with **Batch count**. Finally, you must specify a list of comma delimited **Items**, which can be parameterized or include dynamic content. Add a few items to the **Items** list as shown in the example.

:::image type="content" source="media/foreach-activity/foreach-settings.png" alt-text="Screenshot showing the ForEach settings tab with several items added to the Items list.":::

### ForEach activities

You'll also define an activity or activities to be performed on each of the items in the list, in the ForEach **Activities** pane.

:::image type="content" source="media/foreach-activity/foreach-activities-pane.png" alt-text="Screenshot showing the ForEach activities pane.":::

Select the **+** button to add a new activity to the pane. You'll see a list of activities to choose. You can add multiple activities to the ForEach activity, and each is run on each of the items in the **Items** list.  Whether the **Sequential** option is selected in the ForEach settings or not, each of the child activities in the ForEach activities pane are processed sequentially to one another for each item. However, if **Sequential** isn't selected, multiple items are processed in parallel, each of them running sequentially through the list of child activities specified.

:::image type="content" source="media/foreach-activity/foreach-child-activities.png" alt-text="Screenshot showing a ForEach activity with multiple child activities specified, and the + button highlighted showing a list of child activities to choose from when adding new activities to the pane.":::

### Referencing an item within an activity

Select one of the child activities in the ForEach **Activities** pane, and switch to its **Settings** tab.  In this example, a **Stored Procedure** activity was selected.  Populate the settings for the activity as you normally would select a connection and stored procedure.  You can use the **@item()** iterator to refer to the current item being processed anywhere within an activity that supports dynamic content.  Here the **@item()** was used as the value for the FruitName parameter that is passed to a stored procedure.

:::image type="content" source="media/foreach-activity/foreach-child-activity-configuration.png" alt-text="Screenshot showing a stored procedure child activity with a parameter using the current @item() from the ForEach items list for its value.":::

## Related content

- [How to monitor pipeline runs](monitor-pipeline-runs.md)
