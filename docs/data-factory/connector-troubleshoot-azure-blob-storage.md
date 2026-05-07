---
title: Troubleshoot the Azure Blob Storage connector
description: Learn how to troubleshoot issues with the Azure Blob Storage connector in Data Factory in Microsoft Fabric.
ms.reviewer: xupzhou
ms.topic: troubleshooting
ms.date: 10/23/2024
ms.custom: connectors
---

# Troubleshoot the Azure Blob Storage connector in Data Factory in Microsoft Fabric

This article provides suggestions to troubleshoot common problems with the Azure Blob Storage connector in Data Factory in Microsoft Fabric.

## Error code: AzureBlobOperationFailed

- **Message**: `Blob operation Failed. ContainerName: %containerName;, path: %path;.`

- **Cause**: A problem with the Blob Storage operation.

- **Recommendation**: To check the error details, see [Blob Storage error codes](/rest/api/storageservices/blob-service-error-codes). For further help, contact the Blob Storage team.

## Invalid property during copy activity

- **Message**: `Copy activity \<Activity Name> has an invalid "source" property. The source type is not compatible with the data \<data Name> and its connection \<connection Name>. Please verify your input against.`

- **Cause**: The type defined in the data is inconsistent with the source or destination type that's defined in the copy activity.

- **Resolution**: Edit the data or pipeline JSON definition to make the types consistent, and then rerun the deployment.

## Error code: FIPSModeIsNotSupport

- **Message**: `Fail to read data form Azure Blob Storage for Azure Blob connector needs MD5 algorithm which can't co-work with FIPS mode. Please change diawp.exe.config in self-hosted integration runtime install directory to disable FIPS policy following https://learn.microsoft.com/dotnet/framework/configure-apps/file-schema/runtime/enforcefipspolicy-element.`

- **Cause**: Then FIPS policy is enabled on the VM where the self-hosted integration runtime was installed.

- **Recommendation**: Disable the FIPS mode on the VM where the self-hosted integration runtime was installed. Windows doesn't recommend the FIPS mode.

## Error code: AzureBlobInvalidBlockSize

- **Message**: `Block size should between %minSize; MB and 100 MB.`

- **Cause**: The block size is over the blob limitation.

## Error code: AzureStorageOperationFailedConcurrentWrite

- **Message**: `Error occurred when trying to upload a file. It's possible because you have multiple concurrent copy activities runs writing to the same file '%name;'. Check your Data Factory configuration.`

- **Cause**: You have multiple concurrent copy activity runs or applications writing to the same file.

## Error code: AzureAppendBlobConcurrentWriteConflict

- **Message**: `Detected concurrent write to the same append blob file, it's possible because you have multiple concurrent copy activities runs or applications writing to the same file '%name;'. Please check your Data Factory configuration and retry.`

- **Cause**: Multiple concurrent writing requests occur, which causes conflicts on file content.

## Error code: AzureBlobFailedToCreateContainer

- **Message**: `Unable to create Azure Blob container. Endpoint: '%endpoint;', Container Name: '%containerName;'.`

- **Cause**: This error happens when copying data with Azure Blob Storage account public access.

- **Recommendation**: For more information about connection errors in the public endpoint, see [Connection error in public endpoint](/azure/data-factory/security-and-access-control-troubleshoot-guide#connection-error-in-public-endpoint).

## Related content

For more troubleshooting help, try these resources:

- [Data Factory blog](https://blog.fabric.microsoft.com/blog/category/data-factory)
- [Data Factory community](https://community.fabric.microsoft.com/t5/Data-Factory-preview-Community/ct-p/datafactory)
- [Data Factory feature requests ideas](https://ideas.fabric.microsoft.com/)
