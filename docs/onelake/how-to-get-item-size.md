---
title: Get the size of OneLake items
description: Use item-size reporting or Azure Storage PowerShell cmdlets to retrieve the size of an item, folder, or table in OneLake.
ms.reviewer: eloldag # Product team ms alias(es)
# author: Do not use - assigned by folder in docfx file
# ms.author: Do not use - assigned by folder in docfx file
ms.topic: how-to
ms.date: 05/18/2026

#CustomerIntent:
---

# Get the size of OneLake items

Tracking the size of your OneLake data helps you manage and plan storage costs. This article describes two methods to get the size of individual items in OneLake:

* Use the **OneLake storage report** in the Fabric portal to view per-item storage breakdowns without external tools.
* Use **Azure Storage PowerShell commands** to automate size queries and integrate them into scripts.

Alternatively, capacity admins can use the [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app-storage-page.md) to find the total size of OneLake data stored in a given capacity or workspace.

## Use the OneLake storage report

The OneLake storage report is built directly in the Fabric portal and calculates the amount of data stored in each of your items. Use this tool to investigate which items in your workspace are contributing the most to your OneLake storage bill, so you can make informed decisions about maintaining your data.  

Use the storage report to:

* View all items in your workspace
* Sort and search your items, including by data size
* Break down storage costs across visible, hidden, and soft-deleted data

### Open the storage report

The OneLake storage report is available in the OneLake section of any workspace's settings.

1. In the Fabric portal, go to the workspace that you want to review.
2. Open **Workspace settings** > **OneLake** > **Storage report**.
3. Select **Refresh** to load the storage data.

The duration of the refresh depends on the number of items and files in your workspace. For large workspaces (containing terabytes or petabytes of data), the refresh can take several hours or more than a day. While the report is refreshing, you can't initiate a new refresh.  

To help prevent escalating costs due to repeated refreshes, OneLake automatically caches the storage report for eight hours. During the cache window, you can't initiate a new refresh.

### Storage report format

The storage report contains the following fields:

| Name        | Description                                                                                                                                     |
|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Item name   | The friendly name of the item.                                                                                                                  |
| Type        | The type of the item (example: Lakehouse).                                          |
| Billing     | The billing status of the item. Non-billable items aren't charged for OneLake storage. Partially-billable items aren't charged up to a limit.   |
| Total       | The total amount of data stored in the item, including system and soft-deleted data.                                                            |
| Soft-delete | Deleted data within the seven day retention window. For more information, see [Recover deleted files in OneLake](soft-delete.md).                                              |
| System      | Workload data such as internal metadata, logs, and temporary files that aren't directly accessible but count toward storage usage.             |

You can generate a similar report programmatically by using tools like PowerShell. However, the OneLake storage report doesn't require external tools and scans all your data, including data you don't have access to, such as system data. System folders are used by workloads across Fabric for metadata, temporary files, or other use-cases.

### Storage report costs

When you refresh your storage report, OneLake calculates the amount of data stored in each of your items. You're charged for the iterative read operations required to scan your workspace.

The cost model uses the following values:

* **1,626 Fabric Capacity Units** (CUs) per 10,000 iterative read operations
* **5,000 files** scanned per iterative read operation

For example, a workspace containing 50,000,000 files requires 10,000 iterative read operations (50,000,000 ÷ 5,000) and consumes 1,626 CUs to refresh.

For more information about OneLake capacity consumption, see [OneLake consumption](onelake-consumption.md).

### Storage report limitations  

* The storage report doesn't currently include any OneLake diagnostic events stored within a lakehouse.

## Use PowerShell

You can also use tools like PowerShell with Azure Storage commands to explore and summarize your data in OneLake. Because OneLake is compatible with Azure Data Lake Storage (ADLS) tools, many of the commands work by just replacing the ADLS URL with a OneLake URL.

To automate the steps in this article, use REST API commands to get the workspace and item information instead of providing them manually. For more information, see [List workspaces](/rest/api/fabric/core/workspaces/list-workspaces) and [List items](/rest/api/fabric/core/items/list-items).

### PowerShell prerequisites

* Azure PowerShell. For more information, see [How to install Azure PowerShell](/powershell/azure/install-azure-powershell).

* The Azure Storage PowerShell module.

  ```powershell
  Install-Module Az.Storage -Repository PSGallery -Force
  ```

* Sign in to PowerShell with your Azure account.

  ```powershell
  Connect-AzAccount
  ```

### Create a context object for OneLake

Each time you run an Azure Storage command against OneLake, include the `-Context` parameter with an Azure Storage context object. To create a context object that points to OneLake, run the [New-AzStorageContext](/powershell/module/az.storage/new-azstoragecontext) command with the following values:

| Parameter | Value |
| --------- | ----- |
| `-StorageAccountName` | `'onelake'` |
| `-UseConnectedAccount` | None; instructs the cmdlet to use your Azure account. |
| `-Endpoint` | `'fabric.microsoft.com'` |

For ease of reuse, create this context as a local variable:

```powershell
$ctx = New-AzStorageContext -StorageAccountName 'onelake' -UseConnectedAccount -endpoint 'fabric.microsoft.com'
```

### Get the size of an item or folder

To get an item size, use the [Get-AzDataLakeGen2ChildItem](/powershell/module/az.storage/get-azdatalakegen2childitem) command with the following values:

| Parameter | Value |
| --------- | ----- |
| `-Context` | An Azure Storage context object. For more information, see [Create a context object for OneLake](#create-a-context-object-for-onelake). |
| `-FileSystem` | Fabric workspace name or GUID. |
| `-Path` | Local path to the item or folder inside the workspace. |
| `-Recurse` | None; instructs the cmdlet to recursively get the child item. |
| `-FetchProperty` | None; instructs the cmdlet to fetch the item properties. |

>[!TIP]
>Azure Storage [naming criteria for containers](/rest/api/storageservices/naming-and-referencing-containers--blobs--and-metadata#container-names) only supports lowercase letters, numbers, and hyphens. If you have any other characters in your workspace name or resources in the file path, use the equivalent GUID instead.

Use a pipeline to pass the output of the `Get-AzDataLakeGen2ChildItem` command to the [Measure-object](/powershell/module/microsoft.powershell.utility/measure-object) command with the following values:

| Parameter | Value |
| --------- | ----- |
| `-Property` | `Length` |
| `-Sum` | None; indicates that the cmdlet displays the sum of the values of the specified property. |

Combined, the full command looks like the following example:

```powershell
Get-AzDataLakeGen2ChildItem -Context <CONTEXT_OBJECT> -FileSystem <WORKSPACE_NAME> -Path <ITEM_PATH> -Recurse -FetchProperty | Measure-Object -property Length -sum
```

### Examples

* Get the size of an item

  ```powershell
  $ctx = New-AzStorageContext -StorageAccountName 'onelake' -UseConnectedAccount -endpoint 'fabric.microsoft.com'
  $workspaceName = 'myworkspace'
  $itemPath = 'mylakehouse.lakehouse'
  $colitems = Get-AzDataLakeGen2ChildItem -Context $ctx -FileSystem $workspaceName -Path $itemPath -Recurse -FetchProperty | Measure-Object -property Length -sum
  "Total file size: " + ($colitems.sum / 1GB) + " GB"
  ```

* Get the size of a folder

  ```powershell
  $ctx = New-AzStorageContext -StorageAccountName 'onelake' -UseConnectedAccount -endpoint 'fabric.microsoft.com'
  $workspaceName = 'myworkspace'
  $itemPath = 'mylakehouse.lakehouse/Files/folder1'
  $colitems = Get-AzDataLakeGen2ChildItem -Context $ctx -FileSystem $workspaceName -Path $itemPath -Recurse -FetchProperty | Measure-Object -property Length -sum
  "Total file size: " + ($colitems.sum / 1GB) + " GB"
  ```

* Get the size of a table with GUIDs

  ```powershell
  $ctx = New-AzStorageContext -StorageAccountName 'onelake' -UseConnectedAccount -endpoint 'fabric.microsoft.com'
  $workspaceName = 'aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb'
  $itemPath = 'bbbbbbbb-1111-2222-3333-cccccccccccc/Tables/table1'
  $colitems = Get-AzDataLakeGen2ChildItem -Context $ctx -FileSystem $workspaceName -Path $itemPath -Recurse -FetchProperty | Measure-Object -property Length -sum
  "Total file size: " + ($colitems.sum / 1GB) + " GB"
  ```

### PowerShell limitations

These PowerShell commands don't work on shortcuts that point directly to ADLS containers. Instead, create ADLS shortcuts to directories that are at least one level below a container.
