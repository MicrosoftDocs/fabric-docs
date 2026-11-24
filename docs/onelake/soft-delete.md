---
title: Recover deleted files
description: Learn how to use OneLake soft delete to recover accidentally deleted files and protect your data in Microsoft Fabric.
ms.reviewer: eloldag # Product team ms alias(es)
# author: Do not use - assigned by folder in docfx file
# ms.author: Do not use - assigned by folder in docfx file
ms.topic: how-to
ms.custom:
ms.date: 08/21/2026
ai-usage: ai-assisted
#customer intent: As a OneLake user, I want to recover files that were accidentally deleted so that I can restore my data without losing work.
---

# Recover deleted files in OneLake

OneLake soft delete protects your data by retaining deleted files before permanent removal. Soft delete is turned on for each workspace by default with a seven-day retention period. Workspace admins can [configure file-level soft delete](configure-soft-delete.md) or turn it off.

You can restore a soft-deleted file during the retention period that was active when the file was deleted. After that period ends, the file is permanently removed and can't be recovered. You pay for soft-deleted data at the same rate as active data.

## Restore soft-deleted files

You can restore soft-deleted files by using Azure Storage Explorer, Azure PowerShell, or Azure Storage REST APIs. You need write access to the files to restore them.

### Restore files by using Azure Storage Explorer

Azure Storage Explorer provides a visual interface to browse and restore soft-deleted files.

To restore files by using Azure Storage Explorer, make sure you have:

- [Azure Storage Explorer](https://azure.microsoft.com/products/storage/storage-explorer/) installed on your computer
- A connection to your OneLake workspace. For instructions, see [Use Azure Storage Explorer with OneLake](onelake-azure-storage-explorer.md).

Use the following steps to restore files:

1. Open Azure Storage Explorer and connect to your OneLake workspace.

1. Go to the lakehouse or data item that contained the deleted files.

1. Select the dropdown button next to the path bar, and then select **Active and soft deleted blobs** instead of the default **Active blobs**.

1. Browse to the folder that contained the deleted file.

1. Right-click the soft-deleted file, and then select **Undelete**.

1. The file is restored to its original location and is immediately available.

### Restore files by using PowerShell

Use Azure PowerShell to list and restore soft-deleted files programmatically.

To restore files by using PowerShell, make sure you have:

- [Azure PowerShell Az.Storage module](/powershell/azure/install-azure-powershell) installed
- Authentication to OneLake. For instructions, see [Connect to OneLake with PowerShell](onelake-powershell.md#connect-to-onelake-with-azure-powershell).

Use the following script to list soft-deleted files in a specific path:

```powershell
# Connect to OneLake
$ctx = New-AzStorageContext -StorageAccountName "onelake" -UseConnectedAccount -endpoint "fabric.microsoft.com"

# List soft-deleted blobs in a container (workspace)
$workspaceName = "your-workspace-name"
$path = "your-lakehouse.Lakehouse/Files/"

Get-AzStorageBlob -Container $workspaceName -Context $ctx -Prefix $path -IncludeDeleted | 
    Where-Object { $_.IsDeleted } |
    Select-Object Name, DeletedTime, RemainingDaysBeforePermanentDelete
```

Use the following script to restore a soft-deleted file:

```powershell
# Connect to OneLake
$ctx = New-AzStorageContext -StorageAccountName "onelake" -UseConnectedAccount -endpoint "fabric.microsoft.com"

# Restore a specific blob
$workspaceName = "your-workspace-name"
$blobPath = "your-lakehouse.Lakehouse/Files/deleted-file.parquet"

$deletedItems = Get-AzDataLakeGen2DeletedItem -Context $ctx -FileSystem $workspaceName -Path $blobPath
$deletedItems | Restore-AzDataLakeGen2DeletedItem
```

For more PowerShell examples, see [Restore soft-deleted blobs and directories by using PowerShell](/azure/storage/blobs/soft-delete-blob-manage#restore-soft-deleted-blobs-and-directories-by-using-powershell).

### Restore files by using REST APIs

You can also restore soft-deleted files by using Azure Blob Storage REST APIs and SDKs. The Undelete Blob operation restores the contents and metadata of a soft-deleted blob.

For more information, see [Undelete Blob REST API](/rest/api/storageservices/undelete-blob).

## Related content

- [Configure file-level soft delete in OneLake](configure-soft-delete.md)
- [Use Azure Storage Explorer with OneLake](onelake-azure-storage-explorer.md)
- [Connect to OneLake with PowerShell](onelake-powershell.md)
- [Plan for disaster recovery and data protection](onelake-disaster-recovery.md)
- [OneLake compute and storage consumption](onelake-consumption.md)
