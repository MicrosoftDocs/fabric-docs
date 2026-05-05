---
title: Troubleshoot the Azure Data Lake Storage connector
description: Learn how to troubleshoot issues with the Azure Data Lake Storage connector in Data Factory in Microsoft Fabric.
ms.reviewer: xupzhou
ms.topic: troubleshooting
ms.date: 10/23/2024
ms.custom: connectors
---

# Troubleshoot the Azure Data Lake Storage connector in Data Factory in Microsoft Fabric

This article provides suggestions to troubleshoot common problems with the Azure Data Lake Storage connector in Data Factory in Microsoft Fabric.

## Error message: The underlying connection was closed: Couldn't establish trust relationship for the SSL/TLS secure channel.

- **Symptoms**: Copy activity fails with the following error:

    `Message: ErrorCode = UserErrorFailedFileOperation, Error Message = The underlying connection was closed: Could not establish trust relationship for the SSL/TLS secure channel.`

- **Cause**: The certificate validation failed during the TLS handshake.

- **Resolution**: As a workaround, use the staged copy to skip the Transport Layer Security (TLS) validation for Azure Data Lake Storage Gen1. You need to reproduce this issue and gather the network monitor (netmon) trace, and then engage your network team to check the local network configuration.

    :::image type="content" source="/azure/data-factory/media/connector-troubleshoot-guide/adls-troubleshoot.png" alt-text="Diagram of Azure Data Lake Storage Gen1 connections for troubleshooting issues.":::

## Error message: The remote server returned an error: (403) Forbidden

- **Symptoms**: Copy activity fail with the following error: 

   `Message: The remote server returned an error: (403) Forbidden.   
    Response details: {"RemoteException":{"exception":"AccessControlException""message":"CREATE failed with error 0x83090aa2 (Forbidden. ACL verification failed. Either the resource does not exist or the user is not authorized to perform the requested operation.)....`

- **Cause**: One possible cause is that the service principal or managed identity you use doesn't have permission to access certain folders or files.

- **Resolution**: Grant appropriate permissions to all the folders and subfolders you need to copy. For more information, see [Copy data to or from Azure Data Lake Storage Gen1](/azure/data-factory/connector-azure-data-lake-store#linked-service-properties).

## Error message: Failed to get access token by using service principal. ADAL Error: service_unavailable

- **Symptoms**: Copy activity fails with the following error:

    `Failed to get access token by using service principal.  
    ADAL Error: service_unavailable, The remote server returned an error: (503) Server Unavailable.`

- **Cause**: When the Service Token Server (STS) that's owned by Microsoft Entra ID isn't available, that means it's too busy to handle requests, and it returns HTTP error 503. 

- **Resolution**: Rerun the copy activity after several minutes.

## Error code: ADLSGen2OperationFailed

- **Message**: `ADLS Gen2 operation failed for: %adlsGen2Message;.%exceptionData;.`

- **Causes and recommendations**: Different causes may lead to this error. Check below list for possible cause analysis and related recommendation.

  | Cause analysis                                               | Recommendation                                               |
  | :----------------------------------------------------------- | :----------------------------------------------------------- |
  | If Azure Data Lake Storage Gen2 throws error indicating some operation failed.| Check the detailed error message thrown by Azure Data Lake Storage Gen2. If the error is a transient failure, retry the operation. For further help, contact Azure Storage support, and provide the request ID in error message. |
  | If the error message contains the string "Forbidden", the service principal or managed identity you use might not have sufficient permission to access Azure Data Lake Storage Gen2. | To troubleshoot this error, see [Copy and transform data in Azure Data Lake Storage Gen2](/azure/data-factory/connector-azure-data-lake-storage#service-principal-authentication). |
  | If the error message contains the string "InternalServerError", the error is returned by Azure Data Lake Storage Gen2. | The error might be caused by a transient failure. If so, retry the operation. If the issue persists, contact Azure Storage support and provide the request ID from the error message. |
  | If the error message is `Unable to read data from the transport connection: An existing connection was forcibly closed by the remote host`, your Data Factory runtime has a network issue in connecting to Azure Data Lake Storage Gen2. | In the firewall rule setting of Azure Data Lake Storage Gen2, make sure Azure Data Factory IP addresses are in the allowed list. For more information, see [Configure Azure Storage firewalls and virtual networks](/azure/storage/common/storage-network-security). |
  | If the error message is `This endpoint does not support BlobStorageEvents or SoftDelete`, you're using an Azure Data Lake Storage Gen2 connection to connect to an Azure Blob Storage account that enables Blob storage events or soft delete. | Try the following options：<br>1. If you still want to use an Azure Data Lake Storage Gen2 connection, upgrade your Azure Blob Storage to Azure Data Lake Storage Gen2. For more information, see [Upgrade Azure Blob Storage with Azure Data Lake Storage Gen2 capabilities](/azure/storage/blobs/upgrade-to-data-lake-storage-gen2-how-to).<br>2. Switch your connection to Azure Blob Storage.<br>3. Disable Blob storage events or soft delete in your Azure Blob Storage account. |

## Request to Azure Data Lake Storage Gen2 account caused a time-ut error

- **Message**: 
  * Error Code = `UserErrorFailedBlobFSOperation`
  * Error Message = `BlobFS operation failed for: A task was canceled.`

- **Cause**: The issue is caused by the Azure Data Lake Storage Gen2 destination time-out error, which usually occurs on the Self-hosted Integration Runtime (IR) machine.

- **Recommendation**: 

  - Place your Self-hosted IR machine and target Azure Data Lake Storage Gen2 account in the same region, if possible. This can help avoid a random time-out error and produce better performance.

  - Check whether there's a special network setting, such as ExpressRoute, and ensure that the network has enough bandwidth. We suggest that you lower the Self-hosted IR concurrent jobs setting when the overall bandwidth is low. Doing so can help avoid network resource competition across multiple concurrent jobs.

  - If the file size is moderate or small, use a smaller block size for nonbinary copy to mitigate such a time-out error. For more information, see [Blob Storage Put Block](/rest/api/storageservices/put-block).

    To specify the custom block size, edit the property in your JSON file editor as shown here:

    ```json
    "sink": {
        "type": "DelimitedTextSink",
        "storeSettings": {
            "type": "AzureBlobFSWriteSettings",
            "blockSizeInMB": 8
        }
    }
    ```

## The copy activity isn't able to pick files from Azure Data Lake Storage Gen2

- **Symptoms**: The copy activity isn't able to pick files from Azure Data Lake Storage Gen2 when the file name is "Asset_Metadata". The issue only occurs in the Parquet type data. Other types of data with the same file name work correctly.

- **Cause**: For the backward compatibility, `_metadata` is treated as a reserved substring in the file name. 

- **Recommendation**: Change the file name to avoid the reserved list for Parquet below: 
    1. The file name contains `_metadata`.
    2. The file name starts with `.` (dot).

## Error code: ADLSGen2ForbiddenError

- **Message**: `ADLS Gen2 failed for forbidden: Storage operation % on % get failed with 'Operation returned an invalid status code 'Forbidden'.`

- **Cause**: There are two possible causes:

    1. The Data Factory runtime is blocked by network access in Azure storage account firewall settings.
    2. The service principal or managed identity doesn’t have enough permission to access the data.

- **Recommendation**:

    1. Check your Azure storage account network settings to see whether the public network access is disabled. If disabled, use a managed virtual network Data Factory runtime  and create a private endpoint  to access. For more information, see [Managed virtual network](/azure/data-factory/managed-virtual-network-private-endpoint) and [Build a copy pipeline using managed virtual network and private endpoints](/azure/data-factory/tutorial-copy-data-portal-private).

    1. If you have enabled selected virtual networks and IP addresses in your Azure storage account network setting:

        1. It's possible because some IP address ranges of your Data Factory runtime aren't allowed by your storage account firewall settings. Add the Data Factory runtime IP addresses or the self-hosted integration runtime IP address to your storage account firewall. For Data Factory runtime IP addresses, see  [Data Factory runtime IP addresses](/azure/data-factory/azure-integration-runtime-ip-addresses), and to learn how to add IP ranges in the storage account firewall,   see [Managing IP network rules](/azure/storage/common/storage-network-security#managing-ip-network-rules).

        1. If you allow trusted Azure services to access this storage account in the firewall, you must use [managed identity authentication](/azure/data-factory/connector-azure-data-lake-storage#managed-identity) in copy activity.

         For more information about the Azure storage account firewalls settings, see [Configure Azure Storage firewalls and virtual networks](/azure/storage/common/storage-network-security).

    1. If you use service principal or managed identity authentication, grant service principal or managed identity appropriate permissions to do copy. For source, at least the **Storage Blob Data Reader** role. For destination, at least the **Storage Blob Data Contributor** role. For more information, see [Copy and transform data in Azure Data Lake Storage Gen2](/azure/data-factory/connector-azure-data-lake-storage#service-principal-authentication).

## Related content

For more troubleshooting help, try these resources:

- [Data Factory blog](https://blog.fabric.microsoft.com/blog/category/data-factory)
- [Data Factory community](https://community.fabric.microsoft.com/t5/Data-Factory-preview-Community/ct-p/datafactory)
- [Data Factory feature requests ideas](https://ideas.fabric.microsoft.com/)
