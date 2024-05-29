---
title: Configure Azure AI Search in copy activity
description: This article explains how to copy data using Azure AI Search.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 04/24/2024
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Configure Azure AI Search in copy activity

This article outlines how to use the copy activity in Data pipeline to copy data to Azure AI Search.

## Supported configuration

For the configuration of each tab under copy activity, go to the following sections respectively.

- [General](#general)  
- [Destination](#destination)
- [Mapping](#mapping)
- [Settings](#settings)

### General

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Destination

The following properties are supported for Azure AI Search under the **Destination** tab of a copy activity.

:::image type="content" source="./media/connector-azure-search/destination.png" alt-text="Screenshot showing Destination tab." lightbox="./media/connector-azure-search/destination.png":::

The following properties are **required**:

- **Data store type**: Select **External**.
- **Connection**:  Select an Azure AI Search connection from the connection list. If the connection doesn't exist, then create a new Azure AI Search connection by selecting **New**.
- **Index name**: Select the name of the search index. The service does not create the index. The index must exist in Azure AI Search.

Under **Advanced**, you can specify the following fields:

- **Index action**: Specify whether to merge or replace when a document already exists in the index. You can choose **Merge** or **Upload**.

    :::image type="content" source="./media/connector-azure-search/index-action.png" alt-text="Screenshot showing index action tab.":::

  - **Merge**: Combine all the columns in the new document with the existing one. If there is no existing document, the new document will be uploaded as a new one to the index.

  - **Upload**: The new document replaces the existing one. If there is no existing document, the new document will be uploaded as a new one to the index.

- **Write batch size**: Data is uploaded into the search index when the buffer size reaches the specified write batch size. Allowed values are: integer 1 to 1,000, and the default value is 1000. <br>
Azure AI Search service supports writing documents as a batch. A batch can contain 1 to 1,000 Actions. An action handles one document to perform the upload/merge operation.

- **Max concurrent connections**: Specify the upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.

### Mapping

For **Mapping** tab configuration, see [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab).

### Settings

For **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

The following tables contain more information about the copy activity in Azure AI Search.

### Destination information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.|**External**|Yes|/|
|**Connection** |Your connection to the destination data store.|\< your Azure AI Search connection >|Yes|connection|
|**Index name**|The name of the search index. The service does not create the index. The index must exist in Azure AI Search.| \< your search index name > |Yes |indexName|
|**Index action**|Specify whether to merge or replace when a document already exists in the index. <br>Allowed values are: **Merge** (default), and **Upload**.|• Merge<br>• Upload|Yes|indexAction:<br>• merge<br>• upload |
|**Write batch size**|Data is uploaded into the search index when the buffer size reaches the specified write batch size.|Integer 1 to 1,000<br> Default is 1000|Yes|writeBatchSize|
|**Max concurrent connections**|The upper limit of concurrent connections established to the data store during the activity run.|\<upper limit of concurrent connections><br>(integer)|No |maxConcurrentConnections|

## Related content

- [Azure AI Search overview](connector-azure-search-overview.md)
