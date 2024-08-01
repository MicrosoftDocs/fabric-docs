---
title: Lookup activity
description: Learn how to add a lookup activity to a pipeline and use it to look up data from a data source.
ms.reviewer: xupxhou
ms.author: jburchel
author: jonburchel
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
---

# Use the Lookup activity to look up data from a data source

The Fabric Lookup activity can retrieve a dataset from any of the data sources supported by [!INCLUDE [product-name](../includes/product-name.md)]. You can use it to dynamically determine which objects to operate on in a subsequent activity, instead of hard coding the object name. Some object examples are files and tables.

Lookup activity reads and returns the content of a configuration file or table. It also returns the result of executing a query or stored procedure. The output can be a singleton value or an array of attributes, which can be consumed in a subsequent copy, transformation, or control flow activities like ForEach activity.

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](../get-started/fabric-trial.md).
- A workspace is created.

## Add a lookup activity to a pipeline with UI

To use a Lookup activity in a pipeline, complete the following steps:

### Creating the activity

1. Create a new pipeline in your workspace.
1. Search for Lookup in the pipeline **Activities** pane, and select it to add it to the pipeline canvas.

   :::image type="content" source="media/lookup-activity/add-lookup-activity-to-pipeline.png" alt-text="Screenshot of the Fabric UI with the Activities pane and Lookup activity highlighted.":::

1. Select the new Lookup activity on the canvas if it isn't already selected.

   :::image type="content" source="media/lookup-activity/lookup-activity-general-settings.png" alt-text="Screenshot showing the General settings tab of the Lookup activity.":::

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Lookup settings

Select the **Settings** tab, select an existing connection from the **Connection** dropdown, or use the **+ New** button to create a new connection, and specify its configuration details.

:::image type="content" source="media/lookup-activity/choose-lookup-source-and-configure.png" alt-text="Screenshot showing the Lookup activity settings tab highlighting the tab, and where to choose a new connection.":::

The example in the previous image shows a blob storage connection, but each connection type has its own configuration details specific to the data source selected.

## Supported capabilities

- The Lookup activity can return up to 5000 rows; if the result set contains more records, the first 5000 rows are returned.
- The Lookup activity output supports up to 4 MB in size; activity fails if the size exceeds the limit.
- The longest duration for Lookup activity before timeout is 24 hours.

> [!NOTE]
> When you use query or stored procedure to look up data, make sure to return one and exact one result set. Otherwise, Lookup activity fails.

Fabric supports the data stores listed in the [Connector overview](connector-overview.md) article. Data from any source can be used.

## Save and run or schedule the pipeline

Switch to the **Home** tab at the top of the pipeline editor, and select the save button to save your pipeline.  Select **Run** to run it directly, or **Schedule** to schedule it.  You can also view the run history here or configure other settings.

:::image type="content" source="media/lookup-activity/pipeline-home-tab.png" alt-text="Screenshot showing the Home tab in the pipeline editor with the tab name, Save, Run, and Schedule buttons highlighted.":::

## Related content

- [How to monitor pipeline runs](monitor-pipeline-runs.md)
