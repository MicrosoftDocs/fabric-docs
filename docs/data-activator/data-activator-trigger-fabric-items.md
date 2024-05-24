---
title: Trigger Fabric items
description: Understand how to trigger Fabric items with Data Activator.
author: davidiseminger
ms.author: davidi
ms.topic: concept
ms.custom: 
ms.date: 05/21/2024
---

# Trigger Fabric items

> [!IMPORTANT]
> Data Activator is currently in preview.

Fabric data pipelines and notebooks can be used to load or transform data in Microsoft Fabric. Data Activator triggers can take an action that starts jobs on other Fabric items, which can be used for scenarios such as the following:

* Start data pipelines when new files are loaded to Azure storage accounts, to load files into OneLake.
* Start Fabric notebooks when issues with data quality are found using Power BI reports.


## Add an execute Fabric item action

In the **Act** card for the trigger that's monitoring your chosen condition, you can select **Fabric item** from the list of actions, as shown in the following image.

:::image type="content" source="media/data-activator-trigger-fabric-items/data-activator-trigger-fabric-items-01.png" alt-text="Screenshot showing Fabric item from list of triggers.":::

Once you select **Fabric item** the **Act** card allows you to choose a workspace and an item to execute, as shown in the following image:

:::image type="content" source="media/data-activator-trigger-fabric-items/data-activator-trigger-fabric-items-02.png" alt-text="Screenshot showing Act card to choose a workspace and item.":::

Once selected, when you start the trigger and the conditions are met, the corresponding item is executed. You can currently choose from *pipelines* or *notebooks*.


### Pipeline parameters

To support scenarios where Azure Storage events can be used to start data pipelines, certain parameters are passed to the pipeline when Data Activator starts a job. The *Subject* field in the event contains the path of the file that caused the event, which is passed to the pipeline. You can then use that value in the pipeline to get the contents of the file.

You can also learn more about [Azure Storage events](/azure/storage/blobs/storage-blob-event-overview).


## Related content

* [What is Data Activator?](data-activator-introduction.md)
* [Get started with Data Activator](data-activator-get-started.md)
* [Get data for Data Activator from Power BI](data-activator-get-data-power-bi.md)
* [Get data for Data Activator from Eventstreams](data-activator-get-data-eventstreams.md)
* [Assign data to objects in Data Activator](data-activator-assign-data-objects.md)
* [Create Data Activator triggers in design mode](data-activator-create-triggers-design-mode.md)
* [Data Activator tutorial using sample data](data-activator-tutorial.md)
* [Get data for Data Activator from Real-Time Hub](data-activator-get-data-real-time-hub.md)

You can also learn more about Microsoft Fabric:

* [What is Microsoft Fabric?](../get-started/microsoft-fabric-overview.md)
