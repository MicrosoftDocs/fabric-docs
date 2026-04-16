---
title: Get the size of OneLake items
description: Use item-size reporting or Azure Storage PowerShell cmdlets to retrieve the size of an item, folder, or table in OneLake.
ms.reviewer: eloldag # Product team ms alias(es)
# author: Do not use - assigned by folder in docfx file
# ms.author: Do not use - assigned by folder in docfx file
ms.topic: how-to
ms.date: 04/16/2026

#CustomerIntent:
---

# Get the size of OneLake items

Learn how to get the size of your OneLake data to manage and plan storage costs. Capacity admins can use the [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app-storage-page.md) to find the total size of OneLake data stored in a given capacity or workspace. But to investigate further and track usage per-item, you can use the OneLake storage report or other tools.

This article describes how to use the new OneLake storage report and Azure Storage PowerShell commands to investigate how much data is stored across OneLake.

## Investigating item sizes with the OneLake storage report

The OneLake storage report is a new feature built directly in the Fabric portal that calculates the amount of data stored in each of your items. Use this tool to easily investigate which items in your workspace are contributing the most to your OneLake storage bill, so you can make informed decisions about maintaining your data.  

By refreshing the storage report in your workspace's settings, you can:

- View all items in your workspace (which store data in OneLake)
- Sort and search your items, including by data size
- Break down storage costs across visible, hidden, and soft-deleted data

The duration of the refresh depends on the number of items and files in your workspace. For large workspaces (containing terabytes or petabytes of data), the refresh can take multiple hours or over a day. During this time, you can't initiate a new refresh, although the most recent report is still available.  

To help prevent escalating costs due to repeated refreshes, OneLake automatically caches the storage report for 8 hours. Subsequent refreshes during the cache window are blocked. The most recently cached result is still accessible.  

## Storage report format

The storage report contains the following fields:

| Name        | Description                                                                                                                                     |
|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Item name   | The friendly name of the item.                                                                                                                  |
| Type        | The type of the item (ex: Lakehouse).                                          |
| Billing     | The billing status of the item. Non-billable items aren't charged for OneLake storage. Partially-billable items aren't charged up to a limit.   |
| Total       | The total amount of data stored in the item, including system and soft-deleted data.                                                            |
| Soft-delete | Deleted data that is within the seven day retention window. [Learn more](soft-delete.md).                                              |
| System      | Workload data such as internal metadata, logs, and temporary files that aren't directly accessible but count toward storage usage.             |

You can generate a similar report programatically using tools like PowerShell  However, the OneLake storage report doesn't require external tools and scans all your data, including data you don't have access to, such as system data.  

### Storage report costs

When you refresh your storage report, OneLake calculates the amount of data stored in each of your items automatically  You're charged for the iterative read operations required to scan your workspace. OneLake charges 1,626 Fabric Capacity Units (CUs) per 10,000 iterative read operations, and each iterative read operation can scan up to 5,000 files  Therefore, you can estimate that refreshing your report for a workspace containing 50,000,000 files consumes 1,626 CUs.

For more information about OneLake capacity consumption, see [OneLake consumption](onelake-consumption.md).

### Storage report limitations  

- The storage report doesn't  include any OneLake diagnostic events routed to a lakehouse.
- Refreshing the storage report might fail when called from a region different than the workspace region.  

## Getting the size of OneLake items with PowerShell

You can also use tools like PowerShell with Azure Storage commands to explore and summarize your data in OneLake. Because OneLake is compatible with Azure Data Lake Storage (ADLS) tools, many of the commands work by just replacing the ADLS URL with a OneLake URL.

To automate the steps in this article, use REST API commands to get the workspace and item information instead of providing them manually. For more information, see [List workspaces](/rest/api/fabric/core/workspaces/list-workspaces) and [List items](/rest/api/fabric/core/items/list-items).

### Prerequisites

* Azure PowerShell. For more information, see [How to install Azure PowerShell](/powershell/azure/install-azure-powershell)

* The Azure Storage PowerShell module.

  ```powershell
  Install-Module Az.Storage -Repository PSGallery -Force
  ```

* Sign in to PowerShell with your Azure account.

   ```powershell
   Connect-AzAccount
   ```

### Create a context object for OneLake

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