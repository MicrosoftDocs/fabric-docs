---
title: Add a Spark Notebook destination to an eventstream
description: Learn how to add a Spark Notebook destination to an eventstream.
ms.reviewer: spelluru
ms.author: arindamc
author: arindamc
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 12/21/2025
ms.search.form: Source and Destination
---

# Add a Fabric Spark Notebook destination to an Eventstream (preview)

> [!NOTE]
> This feature is currently in **preview** and might change before general availability.

You can now route data from a Fabric Eventstream directly into a Spark Notebook. This feature enables real-time data processing and advanced analytics using Spark Structured Streaming within Microsoft Fabric.

## Prerequisites

Before you begin, make sure that you have:

- You have access to a Fabric workspace.
- A Spark Notebook already exists in the target workspace.
- You have appropriate permissions to modify Eventstreams and access the Notebook.

## Add a Spark notebook as a destination

Follow these steps to configure a Spark notebook as a destination for your Eventstream:

### Step 1: Select the Spark notebook destination

1. In your Eventstream, select the **Edit** option in the ribbon.

   :::image type="content" source="media/add-destination-notebook/edit-event-stream.png" alt-text="A screenshot with the Edit button for an eventstream selected." lightbox="media/add-destination-notebook/edit-event-stream.png":::
1. Select **Notebook** from the list of available destinations.

   :::image type="content" source="media/add-destination-notebook/add-destination-notebook.png" alt-text="A screenshot of the Add destination dropdown list with Notebook highlighted." lightbox="media/add-destination-notebook/add-destination-notebook.png":::

### Step 2: Select an existing notebook

1. In the destination configuration pane, type in the **Destination name** if you wish to change the default.
2. Select the **Notebook** dropdown and select an existing notebook.

   :::image type="content" source="media/add-destination-notebook/configure-notebook-destination.png" alt-text="A screenshot of the Notebook destination configuration pane with the destination name and Notebook dropdown list highlighted." lightbox="media/add-destination-notebook/configure-notebook-destination.png":::

3. Once the selected notebook is validated, a `Validated. View parameters and values.` message appears under the text box. Select the link to view the details or skip ahead and Save.

   :::image type="content" source="media/add-destination-notebook/select-validate-notebook.png" alt-text="A screenshot of the Notebook destination configuration pane parameter validate link and dialog box highlighted." lightbox="media/add-destination-notebook/select-validate-notebook.png":::

### Step 3: Save and publish

- Select **Save** and then **Publish** changes to the Eventstream. This action updates the Eventstream and initiates the Spark Structured Streaming job.

   :::image type="content" source="media/add-destination-notebook/save-notebook-destination.png" alt-text="A screenshot of the Notebook destination configuration with the Save button highlighted." lightbox="media/add-destination-notebook/save-notebook-destination.png":::

### Step 4: Review the notebook

- From the Eventstream view, select the **Notebook** destination. From the **Details** pane, select the **Open Item** link to open the configured Notebook item.

   :::image type="content" source="media/add-destination-notebook/details-view-notebook-destination.png" alt-text="A screenshot of the Notebook destination with the Details pane highlighted." lightbox="media/add-destination-notebook/details-view-notebook-destination.png":::

## Related Content

- [Route events to destinations](add-manage-eventstream-destinations.md)

- [Process and Transform Events using no-code Editor](process-events-using-event-processor-editor.md)
- [Process and Transform Events using SQL](process-events-using-sql-code-editor.md)

- [Create an eventstream](create-manage-an-eventstream.md)

- [Apache Spark in Microsoft Fabric](../../data-engineering/spark-compute.md)
- [How to use Microsoft Fabric Notebooks](../../data-engineering/how-to-use-notebook.md)