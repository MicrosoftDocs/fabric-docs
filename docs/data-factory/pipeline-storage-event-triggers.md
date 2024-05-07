---
title: Data pipelines storage event triggers in Data Factory
description: This article describes how data pipelines storage event triggers work in Data Factory for Microsoft Fabric.
author: kromerm
ms.author: makromer
ms.topic: concept-article
ms.date: 05/06/2024
---

# Data pipelines storage event triggers in Data Factory

## Introduction

A common use case for invoking Data Factory data pipelines is to trigger a pipeline upon file events like file arrival and file delete. For customers moving from Azure Data Factory (ADF) to Microsoft Fabric, using ADLS/Blog storage events is common. New Fabric users not previously familiar with ADF might generally use file events from OneLake. Triggers in Fabric Data Factory use Fabric platform capabilities including event streams and Reflex triggers. Inside of the Fabric Data Factory pipeline design canvas, there's a Trigger button to create a Reflex trigger for your pipeline, or you can create the trigger directly from the Data Activator experience.

## How to set storage event triggers on a pipeline

1. Select the **Trigger (preview)** button on the **Home** ribbon at the top of the pipeline canvas editor window

   :::image type="content" source="media/pipeline-storage-event-triggers/set-trigger-button.png" alt-text="Screenshot showing the Trigger button on the Home ribbon of the pipeline canvas editor window.":::

1. The **Set alert** panel opens where you can select Azure Blob storage source events.

   :::image type="content" source="media/pipeline-storage-event-triggers/set-alert-panel.png" alt-text="Screenshot showing the Set Alert panel.":::

1. Select **Source** and then **Select events** to select the storage events you wish to listen to in the trigger.

   :::image type="content" source="media/pipeline-storage-event-triggers/connect-azure-blob-storage-events.png" lightbox="media/pipeline-storage-event-triggers/connect-azure-blob-storage-events.png" alt-text="Screenshot showing where to connect to Azure Blob Storage events for a Blob Storage account.":::

1. Choose your Azure subscription and Blob Storage account.
1. A new event stream object is created in your Fabric workspace, so be sure to select the correct workspace under **Stream details**.
1. Select **Next**.
1. Choose event types. You can see there are many more event options you can choose other than file created and file deleted.

   :::image type="content" source="media/pipeline-storage-event-triggers/configure-event-types.png" alt-text="Screenshot showing the Configure events type and source page of the trigger configuration dialog.":::

1. You can filter events to matching files and folders by specifying folder name, file name, file type, and container, using the **Subject** field.

   An event has the following top-level data:

   | Property | Type   | Description                                                                                                 | Example                                                                                                                             |
   |----------|--------|-------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
   | source   | string | Full resource path to the event source. This field isn't writeable. Event Grid provides this value.        | /subscriptions/{subscription-id}/resourceGroups/Storage/providers/Microsoft.Storage/storageAccounts/my-storage-account             |
   | subject  | string | Publisher-defined path to the event subject.                                                               | /blobServices/default/containers/my-file-system/blobs/new-file.txt                                                                 |
   | type     | string | One of the registered event types for this event source.                                                  | Microsoft.Storage.BlobCreated                                                                                                      |
   | time     | string | The time the event is generated based on the provider's UTC time.                                         | 2017-06-26T18:41:00.9584103Z                                                                                                       |
   | id       | string | Unique identifier for the event.                                                                            | 00000000-0000-0000-0000-000000000000                                                                                                |
   | data     | object | Blob storage event data.                                                                                   | {{Data object}}                                                                                                                     |
   | specversion | string | CloudEvents schema specification version.                                                                  | 1.0                                                                                                                                 |

   :::image type="content" source="media/pipeline-storage-event-triggers/set-event-filters.png" alt-text="Screenshot showing the filter configuration page.":::

   > [!NOTE]
   > File name and folder name will be part of the **Subject** field.

1. Back on the trigger configuration panel, choose the workspace to store the trigger items, pipeline name, pipeline action, and name of your trigger as a Reflex item using _item name_.

1. Select **Create** to create the trigger. The trigger is now active on your pipeline and reacts to the storage events that you defined for it.

   :::image type="content" source="media/pipeline-storage-event-triggers/alert-created.png" alt-text="Screenshot showing the Alert created notification.":::

1. To view the trigger, navigate to your workspace list view and find the Reflex object by name from your Fabric browser.
1. The type of the object is **Reflex**.
1. Select the trigger to open the Reflex object for viewing and editing.

   :::image type="content" source="media/pipeline-storage-event-triggers/view-reflex-object.png" alt-text="Screenshot showing the details of the Reflex object.":::

## Setting expression values with the trigger file name and folder name

Inside of your pipeline, you can utilize the name of the file and folder path from the storage event using built-in trigger parameters. Data Factory sets these parameters when it receives the storage event. Blob path and file name parameters are set by the trigger activation. Select the trigger parameters tab on the expression builder inside of your pipeline and Data Factory automatically parses the file name and folder names for you, allowing you to dynamically add them to your pipeline expression.

:::image type="content" source="media/pipeline-storage-event-triggers/add-dynamic-content.png" alt-text="Screenshot showing the Add dynamic content dialog.":::

These built-in parameters are set from the **Subject** and **Topic** fields of the arriving file event and are automatically created for you to use in your pipeline logic. 

```@pipeline()?.TriggerEvent?.FileName```

You might notice the use of a _?_ after the _pipeline()_ object reference, which is a method used in the pipeline expression language to handle _NULL_ values. You need this syntax when testing a pipeline that uses the trigger parameters because during manual testing, file and folder name parameters are not set, returning a NULL value. But when you trigger the pipeline from a file event, you see the file name and folder name filled out in those fields.

## Related content

- [Create a Reflex trigger](../data-activator/data-activator-get-started.md#create-a-reflex-item)
- [Microsoft Fabric event streams](../real-time-analytics/event-streams/overview.md)