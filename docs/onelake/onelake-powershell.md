---
title: Manage OneLake with Powershell
description: Microsoft OneLake integrates with the Azure Powershell module for data reading, writing, and management.
ms.reviewer: eloldag
ms.author: mabasile
author: mabasile-MSFT
ms.topic: how-to
ms.date: 05/23/2023
---

# Manage OneLake with Powershell

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Connecting to OneLake with Azure Powershell

Connect to OneLake from Powershell by following these steps:

1. Install the Az.Storage PowerShell module

```python
Install-Module Az.Storage -Repository PSGallery -Force
```

1. Sign in to your Azure account.

```python
Connect-AzAccount
```

1. Create the storage account context.
   1. Storage account name is 'onelake'.
   1. Set 'UseConnectedAccount' to passthrough your AAD identity.
   1. Set '-endpoint' as 'fabric.microsoft.com'.  

1. Run the same commands used for ADLS Gen2.

## Example: Get size of an item or directory

```python
Install-Module Az.Storage -Repository PSGallery -Force
Connect-AzAccount
$ctx = New-AzStorageContext -StorageAccountName 'onelake' -UseConnectedEndpoint -endpoint 'fabric.microsoft.com' 

# This example uses the workspace and item name. If the workspace name does not meet Azure Storage naming criteria (lowercase letters and no special characters), you can use GUIDs instead.
$workspaceName = 'myWorkspace'
$itemPath = 'myLakehouse.lakehouse/Files'

# Recursively get the length of all files within your lakehouse, sum, and convert to GB.
$colitems = Get-AzDataLakeGen2ChildItem -Context $ctx -FileSystem $workspaceName -Path $itemPath -Recurse -FetchProperty | Measure-Object -property Length -sum
"Total file size: " + ($colitems.sum / 1GB) + " GB"    
```
