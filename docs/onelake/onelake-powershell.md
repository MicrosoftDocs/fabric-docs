---
title: Manage OneLake with PowerShell
description: Microsoft OneLake integrates with the Azure PowerShell module for data reading, writing, and management.
ms.reviewer: eloldag
ms.author: mabasile
author: mabasile-MSFT
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 09/27/2023
---

# Manage OneLake with PowerShell

Microsoft Fabric OneLake integrates with the Azure PowerShell module for data reading, writing, and management.

## Connect to OneLake with Azure PowerShell

Connect to OneLake from PowerShell by following these steps:

1. Install the Azure Storage PowerShell module.

    ```powershell
    Install-Module Az.Storage -Repository PSGallery -Force
    ```

1. Sign in to your Azure account.

    ```powershell
    Connect-AzAccount
    ```

1. Create the storage account context.
   - Storage account name is **one lake**.
   - Set `-UseConnectedAccount` to passthrough your Azure credentials.
   - Set `-endpoint` as `fabric.microsoft.com`.

1. Run the same commands used for Azure Data Lake Storage (ADLS) Gen2. For more information about ADLS Gen2 and the Azure Storage PowerShell module, see [Use PowerShell to manage ADLS Gen2](/azure/storage/blobs/data-lake-storage-directory-file-acl-powershell).

## Example: Get the size of an item or directory

```powershell
Install-Module Az.Storage -Repository PSGallery -Force
Connect-AzAccount
$ctx = New-AzStorageContext -StorageAccountName 'onelake' -UseConnectedAccount -endpoint 'fabric.microsoft.com' 

# This example uses the workspace and item name. If the workspace name does not meet Azure Storage naming criteria (no special characters), you can use GUIDs instead.
$workspaceName = 'myworkspace'
$itemPath = 'mylakehouse.lakehouse/Files'

# Recursively get the length of all files within your lakehouse, sum, and convert to GB.
$colitems = Get-AzDataLakeGen2ChildItem -Context $ctx -FileSystem $workspaceName -Path $itemPath -Recurse -FetchProperty | Measure-Object -property Length -sum
"Total file size: " + ($colitems.sum / 1GB) + " GB"
```

## Related content

- [Integrate OneLake with Azure Synapse Analytics](onelake-azure-synapse-analytics.md)
