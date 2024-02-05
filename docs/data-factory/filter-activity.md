---
title: Filter activity
description: Learn how to add a Filter activity to a pipeline and use it to filter data.
author: chez-charlie
ms.author: chez
ms.reviewer: jburchel
ms.topic: how-to
ms.custom:
  - ignite-2023
ms.date: 11/15/2023
---

# Use the Filter activity to filter items from an array

You can use a Filter activity in a pipeline to apply a filter expression to an input array.

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](../get-started/fabric-trial.md).
- A workspace is created.

## Add a Filter activity to a pipeline with UI

To use a Filter activity in a pipeline, complete the following steps:

### Creating the activity

1. Create a new pipeline in your workspace.
1. Select the **Variables** tab in the pipeline settings area, and then select **+ New** to add a new pipeline variable of Array type.

   :::image type="content" source="media/filter-activity/create-pipeline-variable.png" alt-text="Screenshot showing the creation of a new Array type pipeline variable called AnimalsArray with some animal names as its values.":::

1. Search for Filter in the pipeline **Activities** pane, and select it to add it to the pipeline canvas. You may need to expand the full list of activities by selecting the **+** button to the far right of the toolbar.

   :::image type="content" source="media/filter-activity/add-filter-activity-to-pipeline.png" alt-text="Screenshot of the Fabric UI with the Activities pane and Lookup activity highlighted.":::

1. Select the new Filter activity on the canvas if it isn't already selected.

   :::image type="content" source="media/filter-activity/filter-activity-general-settings.png" alt-text="Screenshot showing the General settings tab of the Filter activity.":::

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Filter settings

1. Select the **Settings** tab, where you can provide an array list of **Items** and a **Condition** to be applied to each item. Both settings support dynamic content.

   :::image type="content" source="media/filter-activity/filter-settings.png" alt-text="Screenshot showing the Lookup activity settings tab highlighting the tab, and where to choose a new connection.":::

1. This simple example filters the array to dog, but a real world use can be as complex as necessary, using any of the functions and values available in the dynamic expression builder. Select **Add dynamic content** for the **Items**, and then select the **Variables** tab in the **Pipeline expression builder**, and choose the previously created AnimalsArray. Then select **OK**.

   :::image type="content" source="media/filter-activity/items-setting.png" alt-text="Screenshot showing the Pipeline expression builder with the previously created AnimalsArray selected.":::

1. Select **Add dynamic content** again, this time for the **Condition** setting. The item() expression returns the value of the current item as the Filter activity iterates through the provided list of array items. Using the equals() function, we can compare it against the item to return true or false for each item. Only items that return true will be included in the output array of the Filter activity, which can then be used in any other activity.

   :::image type="content" source="media/filter-activity/condition-setting.png" alt-text="Screenshot showing the Condition setting value to select for a specific animal.":::

## Save and run or schedule the pipeline

After adding any additional necessary activities using the output array of the Filter activity, switch to the **Home** tab at the top of the pipeline editor, and select the save button to save your pipeline.  Select **Run** to run it directly, or **Schedule** to schedule it.  You can also view the run history here or configure other settings.

:::image type="content" source="media/lookup-activity/pipeline-home-tab.png" alt-text="Screenshot showing the Home tab in the pipeline editor with the tab name, Save, Run, and Schedule buttons highlighted.":::

## Related content

- [How to monitor pipeline runs](monitor-pipeline-runs.md)
