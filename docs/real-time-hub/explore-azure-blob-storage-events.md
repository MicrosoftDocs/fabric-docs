---
title: Explore Azure blob storage events in Fabric Real-Time hub
description: This article shows how to explore Azure blob storage events in Fabric Real-Time hub. 
author: ajetasin
ms.author: ajetasi
ms.topic: how-to
ms.date: 05/21/2024
---

# Explore Azure blob storage events in Fabric Real-Time hub
Real-Time hub expands Fabric with event-driven capabilities to support real-time data processing and analysis. This feature enables event-driven scenarios for various system events, including Fabric workspace item events and Azure blob storage events. By using System events in Fabric, you can gain access to real-time data streams that enable them to monitor and react to changes and events as they occur. 

This article shows how to explore Azure blob storage events in Fabric Real-Time hub. Azure blob storage events allow you to receive notifications when certain actions occur on your blobs. For example, you can receive a notification when a new blob is created, or an existing blob is modified. These events can be used to set alert on other actions or workflows, such as updating a database or sending a notification. This article provides the properties and schema for Azure blob storage events.  

[!INCLUDE [preview-note](./includes/preview-note.md)]

## View Azure blob storage events detail page

1. In **Real-Time hub**, switch to the **Fabric events** tab. 
1. Select **Azure blob storage events** in the list. 

    :::image type="content" source="./media/explore-azure-blob-storage-events/select-from-list.png" alt-text="Screenshot that shows the selection of Azure blob storage events in the Fabric events tab." :::
1. You should see the Azure blob storage events detail page. 

    :::image type="content" source="./media/explore-azure-blob-storage-events/detail-page.png" alt-text="Screenshot that shows the Azure blob storage events detail page." lightbox="./media/explore-azure-blob-storage-events/detail-page.png":::

## Actions
At the top of the Azure blob storage events detail page, you see the following two actions.

- **Create eventstream** - lets you create an eventstream based on events from the selected Azure blob storage. 
- **Set alert** - lets you set an alert when an operation is done on an Azure blob storage artifact. For example, you can set an alert when a blob is created or deleted. 

    :::image type="content" source="./media/explore-azure-blob-storage-events/actions.png" alt-text="Screenshot that shows the Actions section of the Azure blob storage events detail page." :::


## See what's using this category

This section shows subscriptions using the event category. Here are the columns and their descriptions shown in the list. 

| Column | Description |
| ------ | ------------ | 
| Name | Name of the artifact/subscriber that subscribes to the event type group. |
| Type | Artifact type – Reflex or eventstream |
| Workspace | Workspace where the artifact lives. |
| Source | Name of the source (Azure blob storage account) that the user subscribed to. |

:::image type="content" source="./media/explore-azure-blob-storage-events/see-what-is-using.png" alt-text="Screenshot that shows the See what is using the section of the Azure blob storage events detail page." :::

## Azure blob storage events profile

:::image type="content" source="./media/explore-azure-blob-storage-events/profile.png" alt-text="Screenshot that shows the events profile section of the Azure blob storage events detail page." :::


### Event types

| Event type name |  Description |
| -------------------- | ----------- | 
| Microsoft.Storage.BlobCreated |  This event is activated when a new blob is added or when an existing blob is updated. The event is triggered by clients who use the `CreateFile` and `FlushWithClose` operations, which can be found in the Azure Data Lake Storage Gen2 REST API. |
| Microsoft.Storage.BlobDeleted |  This event is activated when a blob is removed. It's triggered when clients use the `DeleteFile` operation that can be found in the Azure Data Lake Storage Gen2 REST API. |
| Microsoft.Storage.BlobRenamed |  This event is activated when a blob undergoes a name change, particularly when users employ the `RenameFile` function found in the Azure Data Lake Storage Gen2 REST API. |
| Microsoft.Storage.BlobTierChanged  | This event is activated when the blob access tier is modified through the `SetBlobTier` operation in the Blob REST API, and is triggered once the change is fully processed. |
| Microsoft.Storage.AsyncOperationInitiated | This event occurs when data is moved or copied from the archive to the hot or cool tiers. It happens when clients use the `SetBlobTier` API to move a blob from archive to hot or cool tiers, or when clients use the `CopyBlob` API to copy data from an archive tier blob to a hot or cool tier blob. |
| Microsoft.Storage.DirectoryCreated |  This event is activated when a new directory is created, or a client utilizes the `CreateDirectory` operation provided in the Azure Data Lake Storage Gen2 REST API to form a new directory. |
| Microsoft.Storage.DirectoryRenamed |  This event is activated when a directory undergoes a name change, particularly when clients utilize the RenameDirectory feature in the Azure Data Lake Storage Gen2 REST API. |
| Microsoft.Storage.DirectoryDeleted |  This event is activated when a directory is removed, when customers utilize the `DeleteDirectory` feature present in the Azure Data Lake Storage Gen2 REST API. |
| Microsoft.Storage.BlobInventoryPolicyCompleted | This event is activated when the inventory run finishes for a policy that is specified as an inventory policy. It's also activated if the inventory run fails due to a user error before it commences, such as an erroneous policy or an absent destination container. |
| Microsoft.Storage.LifecyclePolicyCompleted | This event refers to the activation of a lifecycle management policy when its defined actions are executed. |

### Schemas
An event has the following top-level data:

| Property | Type | Description | Example | 
| -------- | ---- | ----------- | ------- |
| `source` | string | Full resource path to the event source. This field isn't writeable. Event Grid provides this value. | `/subscriptions/{subscription-id}/resourceGroups/Storage/providers/Microsoft.Storage/storageAccounts/my-storage-account`|
| `subject` | string | Publisher-defined path to the event subject. | `/blobServices/default/containers/my-file-system/blobs/new-file.txt` |
| `type` | string | One of the registered event types for this event source. | `Microsoft.Storage.BlobCreated` |
| `time` | string | The time the event is generated based on the provider's UTC time. | `2017-06-26T18:41:00.9584103Z` |
| `id` | string | Unique identifier for the event. | `00000000-0000-0000-0000-000000000000` |
| `data` | object | Blob storage event data. | `{{Data object}}` |
| `specversion` | string | CloudEvents schema specification version. | `1.0` |

The `data` object has the following properties: 

| Property | Type | Description | Example | 
| -------- | ---- | ----------- | ------- |
| `api` | string | The operation that triggered the event. | `CreateFile` |
| `clientRequestId` | string | A client-provided request ID for the storage API operation. This ID can be used to correlate to Azure Storage diagnostic logs using the "client-request-id" field in the logs, and can be provided in client requests using the "x-ms-client-request-id" header. See [Log Format](/rest/api/storageservices/storage-analytics-log-format). | `00000000-0000-0000-0000-000000000000 ` |
| `requestId` | string | Service-generated request ID for the storage API operation. Can be used to correlate to Azure Storage diagnostic logs using the "request-id-header" field in the logs and is returned from initiating API call in the 'x-ms-request-id' header. See [Log Format](/rest/api/storageservices/storage-analytics-log-format). | `00000000-0000-0000-0000-000000000000` |
| `eTag` | string | The value that you can use to run operations conditionally. | `\"0x8D4BCC2E4835CD0\"` |
| `contentType` | string | The content type specified for the blob. | `text/plain` |
| `contentLength` | integer | The size of the blob in bytes. | `0` |
| `blobType` | string | The type of blob. Valid values are either `BlockBlob` or `PageBlob`. | `BlockBlob` | 
| `contentOffset` | number | The offset in bytes of a write operation taken at the point where the event-triggering application completed writing to the file. <p>Appears only for events triggered on blob storage accounts that have a hierarchical namespace.</p> | `0` |
| `destinationUrl` | string | The url of the file that will exist after the operation completes. For example, if a file is renamed, the destinationUrl property contains the url of the new file name. <p> Appears only for events triggered on blob storage accounts that have a hierarchical namespace. </p>| `https://my-storage-account.dfs.core.windows.net/my-file-system/new-file.txt` | 
| `sourceUrl` | string | The url of the file that exists before the operation is done. For example, if a file is renamed, the sourceUrl contains the url of the original file name before the rename operation. <p> Appears only for events triggered on blob storage accounts that have a hierarchical namespace. </p> | `https://my-storage-account.dfs.core.windows.net/my-file-system/my-original-directory` |
| `url` | string | The path to the blob. <p>If the client uses a Blob REST API, then the url has this structure: `<storage-account-name>.blob.core.windows.net\<container-name>\<file-name>`. If the client uses a Data Lake Storage REST API, then the url has this structure: `<storage-account-name>.dfs.core.windows.net/<file-system-name>/<file-name>`.  | `https://myaccount.blob.core.windows.net/container01/file.txt` |
| `recursive` | string | True to run the operation on all child directories; otherwise False. <p>Appears only for events triggered on blob storage accounts that have a hierarchical namespace. </p> | `true` |
| `sequencer` | string | An opaque string value representing the logical sequence of events for any particular blob name. Users can use standard string comparison to understand the relative sequence of two events on the same blob name. | `00000000000004420000000000028963` | 
| `identity` | string | A string value representing the identity associated with the event. For SFTP, the value is the local user name. | `localuser` | 
| `storageDiagnostics` | object | Diagnostic data occasionally included by the Azure Storage service. When present, event consumers should ignore it. | `{{Storage diagnostic object}}` |


## Related content

- [Explore Fabric workspace item events](explore-fabric-workspace-item-events.md)


