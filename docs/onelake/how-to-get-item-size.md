---
title: Get the size of OneLake items
description: Use Azure Storage PowerShell cmdlets to retrieve the size of an item, folder, or table in OneLake.
author: kgremban
ms.author: kgremban
ms.reviewer: eloldag
ms.topic: how-to
ms.date: 05/08/2025

#CustomerIntent:
---

# Get the size of OneLake items

Learn how to get the size of your OneLake data to manage and plan storage costs. Capacity admins can use the [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app-storage-page.md) to find the total size of OneLake data stored in a given capacity or workspace. But you might want a way to measure size at a more granular level.

This article describes Azure Storage PowerShell commands that you can use to understand the size of data in a specific item or folder. Because OneLake is compatible with Azure Data Lake Storage (ADLS) tools, many of the commands work by just replacing the ADLS Gen2 URL with a OneLake URL.

To automate the steps in this article, use REST API commands to get the workspace and item information instead of providing them manually. For more information, see [List workspaces](/rest/api/fabric/core/workspaces/list-workspaces) and [List items](/rest/api/fabric/core/items/list-items).

## Prerequisites

* Azure PowerShell. For more information, see [How to install Azure PowerShell](/powershell/azure/install-azure-powershell)

* The Azure Storage PowerShell module.

  ```powershell
  Install-Module Az.Storage -Repository PSGallery -Force
  ```

* Sign in to PowerShell with your Azure account.

   ```powershell
   Connect-AzAccount
   ```

## Create a context object for OneLake

Each time you run an Azure Storage command against OneLake, you need to include the `-Context` parameter with an Azure Storage context object. To create a context object that points to OneLake, run the [New-AzStorageContext](/powershell/module/az.storage/new-azstoragecontext) command with the following values:

| Parameter | Value |
| --------- | ----- |
| `-StorageAccountName` | `'onelake'` |
| `-UseConnectedAccount` | None; instructs the cmdlet to use your Azure account. |
| `-Endpoint` | `'fabric.microsoft.com'` |

For ease of reuse, create this context as a local variable:

```powershell
$ctx = New-AzStorageContext -StorageAccountName 'onelake' -UseConnectedAccount -endpoint 'fabric.microsoft.com'
```

## Get the size of an item or folder

To get an item size, use the [Get-AzDataLakeGen2ChildItem](/powershell/module/az.storage/get-azdatalakegen2childitem) command with the following values:

| Parameter | Value |
| --------- | ----- |
| `-Context` | An Azure Storage context object. For more information, see [Create a context object for OneLake](#create-a-context-object-for-onelake). |
| `-FileSystem` | Fabric workspace name or GUID. Azure Storage [naming criteria for containers](/rest/api/storageservices/naming-and-referencing-containers--blobs--and-metadata#container-names) only supports lowercase letters, numbers, and hyphens. If you have any other characters in your workspace name, use its GUID instead. |
| `-Path` | Local path to the item or folder inside the workspace. Azure Storage [naming criteria for containers](/rest/api/storageservices/naming-and-referencing-containers--blobs--and-metadata#container-names) only supports lowercase letters, numbers, and hyphens. If you have any other characters in any resources in your item path, use the equivalent GUID instead. |
| `-Recurse` | None; instructs the cmdlet to recursively get the child item. |
| `-FetchProperty` | None; instructs the cmdlet to fetch the item properties. |

Use a pipeline to pass the output of the `Get-AzDataLakeGen2ChildItem` command to the [Measure-object](/powershell/module/microsoft.powershell.utility/measure-object) command with the following values:

| Parameter | Value |
| --------- | ----- |
| `-Property` | `Length` |
| `-Sum` | None; indicates that the cmdlet displays the sum of the values of the specified property. |

Combined, the full command looks like the following example:

```powershell
Get-AzDataLakeGen2ChildItem -Context <CONTEXT_OBJECT> -FileSystem <WORKSPACE_NAME> -Path <ITEM_PATH> -Recurse -FetchProperty | Measure-Object -property Length -sum
```

### Example: Get the size of an item

```powershell
$ctx = New-AzStorageContext -StorageAccountName 'onelake' -UseConnectedAccount -endpoint 'fabric.microsoft.com'
$workspaceName = 'myworkspace'
$itemPath = 'mylakehouse.lakehouse'
$colitems = Get-AzDataLakeGen2ChildItem -Context $ctx -FileSystem $workspaceName -Path $itemPath -Recurse -FetchProperty | Measure-Object -property Length -sum
"Total file size: " + ($colitems.sum / 1GB) + " GB"
```

### Example: Get the size of a folder

```powershell
$ctx = New-AzStorageContext -StorageAccountName 'onelake' -UseConnectedAccount -endpoint 'fabric.microsoft.com'
$workspaceName = 'myworkspace'
$itemPath = 'mylakehouse.lakehouse/Files/folder1'
$colitems = Get-AzDataLakeGen2ChildItem -Context $ctx -FileSystem $workspaceName -Path $itemPath -Recurse -FetchProperty | Measure-Object -property Length -sum
"Total file size: " + ($colitems.sum / 1GB) + " GB"
```

### Example: Get the size of a table with GUIDs

```powershell
$ctx = New-AzStorageContext -StorageAccountName 'onelake' -UseConnectedAccount -endpoint 'fabric.microsoft.com'
$workspaceName = 'aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb'
$itemPath = 'bbbbbbbb-1111-2222-3333-cccccccccccc/Tables/table1'
$colitems = Get-AzDataLakeGen2ChildItem -Context $ctx -FileSystem $workspaceName -Path $itemPath -Recurse -FetchProperty | Measure-Object -property Length -sum
"Total file size: " + ($colitems.sum / 1GB) + " GB"
```

## Limitations

These PowerShell commands don’t work on shortcuts that point to ADLS containers directly. Instead, we recommended that you create ADLS shortcuts to directories that are at least one level below a container.