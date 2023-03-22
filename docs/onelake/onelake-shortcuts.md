---
title: OneLake shortcuts
description: Learn about OneLake shortcuts and how they work.
ms.reviewer: eloldag
ms.author: trolson
author: TrevorLOlson
ms.topic: conceptual
ms.date: 03/24/2023
---

# OneLake shortcuts

[!INCLUDE [preview-note](../includes/preview-note.md)]

OneLake shortcuts provide a way to connect to existing data without having to directly copy it. Shortcuts eliminate the need to set up and monitor data movement jobs and keep data in sync across sources.

## What are OneLake shortcuts?

Shortcuts are embedded references within OneLake that point to other file store locations. The embedded reference makes it appear as though the files and folders are stored locally when they actually exist in another storage location.

:::image type="content" source="media\onelake-shortcuts\shortcut-connects-other-location.png" alt-text="Diagram showing how a shortcut connects files and folders stored in other locations." lightbox="media\onelake-shortcuts\shortcut-connects-other-location.png":::

## Where can I use shortcuts?

From within a lakehouse, you can create shortcuts to multiple locations. You can create shortcuts that point to other lakehouses, which allows multiple lakehouses to derive data from the same source and always be in sync. You can also create shortcuts that point to external storage accounts, such as Azure Data Lake Storage (ADLS) Gen 2 accounts, which allows you to quickly source your existing cloud data without having to copy it.

> [!NOTE]
> When creating a shortcut to an ADLS Gen 2 account, you must use the Distributed File System (DFS) endpoint.

> [!NOTE]
> Fabric doesn't currently support connections to private endpoints.

## Supported shortcut sources

Microsoft Fabric currently supports these sources:

- Internal OneLake shortcuts
- ADLS Gen 2

## Lakehouse structure

Lakehouses are composed of two top level folders: the **Tables** folder and the **Files** folder. The **Tables** folder represents the managed portion of the lakehouse and the **Files** folder is the unmanaged portion of the lakehouse.

- In the **Tables** folder, you can only create shortcuts at the top level. If the source of the shortcut contains data in the Delta\Parquet format, the lakehouse automatically synchronizes the metadata and recognizes the folder as a table.

- The **Files** folder has no restrictions on where you can create shortcuts; you can create them at any level of the folder hierarchy.

:::image type="content" source="media\onelake-shortcuts\lake-view-table-view.png" alt-text="Diagram showing the Lake view and the Table view side by side." lightbox="media\onelake-shortcuts\lake-view-table-view.png":::

> [!NOTE]
> The maximum depth of one shortcut to other shortcuts is ten.

## Permissions

Permissions for shortcuts are governed by a combination of the user’s workspace role and the user’s permission in the shortcut’s source. When you access a shortcut, the most restrictive permission of the two sources is applied. For example, if you have read/write permissions in the lakehouse but only read permissions in the shortcut source, you aren't allowed to write to the shortcut’s source. Likewise, if you only have read permissions in the lakehouse but read/write in the shortcut source, you also aren't allowed to write to the shortcut source.

| **Source permission** | **Target** **permission** | **Access** |
|---|---|---|
| **Read** | Read | No access to shortcut data |
| **ReadAll** | Read | Can see the shortcut folder but not access it |
| **ReadWrite** | Read | Can see and edit the shortcut but not access it |
| **Read** | ReadAll | No access to shortcut data |
| **ReadAll** | ReadAll | Can read data from the shortcut |
| **ReadWrite** | ReadAll | Can edit the shortcut and read data from it |
| **Read** | ReadWrite | No access to shortcut data |
| **ReadAll** | ReadWrite | Can see the shortcut and read and write data from it |
| **ReadWrite** | ReadWrite | Can edit the shortcut and read and write data from it |

## Workspace roles

The following table shows the shortcut-related permissions for each workspace role. For more information, see [Workspace roles](..\data-warehouse\workspace-roles.md).

| **Capability** | **Admin** | **Member** | **Contributor** | **Viewer** |
|---|---|---|---|---|
| **Create a shortcut** | Yes | Yes | Yes | - |
| **Read file/folder content of shortcut** | Yes | Yes | Yes | - |
| **Write to shortcut location** | Yes* | Yes* | Yes* | - |
| **Read data from shortcuts in table section of the** **Lakehouse via TDS endpoint** | Yes | Yes | Yes | Yes |

\* Users must also have write permission in the shortcut source.

## Authorization

Authorization for shortcuts to OneLake locations is different from shortcuts to Azure Data Lake Storage (ADLS) locations.

### Shortcuts to other OneLake locations

When a user accesses data through a shortcut to another OneLake location, the identity of the calling user is used to authorize access to the data source of the shortcut. This user must have “readAll” permissions on the source data.

> [!IMPORTANT]
> When accessing shortcuts through Power BI Datasets or T-SQL, **the calling user’s identity is not passed through to the shortcut source.** The calling artifact owner’s identity is passed instead, delegating access to the calling user.

### Shortcuts to ADLS locations

ADLS shortcuts utilize a delegated authorization model. In this model, the shortcut creator specifies a credential for the ADLS shortcut and all access to that shortcut will be authorized using that credential. Fabric supports these delegated types: Account Key, SAS Token, OAuth. and Service Principal.

- A **SAS Token** must include at least the following permissions: Read, List, and Execute.

- An **OAuth** identity must have a Storage Blob Data Reader, Storage Blob Data Contributor, or Storage Blob Data Owner role on the storage account.

- A **Service Principal** must have a Storage Blob Data Reader, Storage Blob Data Contributor, or Storage Blob Data Owner role on the storage account.

Fabric handles delegation using Shared Cloud Connections. When creating a new ADLS shortcut, you either create a new connection or select an existing connection for the data source. When you set a connection for a shortcut, it’s considered a “bind” operation. You must have permission on the connection to perform the bind operation. If you don’t, you can’t create new shortcuts using that connection. Once you have bound a connection to a shortcut in an artifact, the artifact permissions determine if you can access the data through the shortcut.

**IMPORTANT:** Support for ADLS SSO shortcuts has been deprecated. Learn How to create new ADLS delegated shortcuts. (LINK)

## How do shortcuts handle deletions?

Shortcuts don't perform cascading deletes. When you perform a delete operation on a shortcut, you only delete the shortcut object; the data in the shortcut source remains unchanged. However, if you perform a delete operation on a file or folder within a shortcut, and you have permissions in the shortcut source to perform the delete operation, the files and/or folders are deleted in the source. The following example illustrates this point.

### Delete example

User A has a lakehouse with the following path in it: *MyLakehouse\Files\\**MyShortcut**\Foo\Bar*. **MyShortcut** is a shortcut that points to an ADLS Gen 2 account that contains the *Foo\Bar* directories.

#### Scenario one

User A performs a delete operation on the following path: *MyLakehouse\Files\\**MyShortcut**.

In this case, **MyShortcut** is deleted from the lakehouse. Shortcuts don't perform cascading deletes, therefore the file and directories in the ADLS Gen 2 account *Foo\Bar* remain untouched.

#### Scenario 2

User A performs a delete operation on the following path: *MyLakehouse\Files\\**MyShortcut**\Foo\Bar*.

In this case, if User A has write permissions in the ADLS Gen 2 account, the **Bar** directory is deleted from the ADLS Gen 2 account.

## Workspace lineage view

When creating shortcuts between multiple lakehouses within a workspace, you can visualize the shortcut relationships through the workspace lineage view. Select the **Lineage view** button (:::image type="icon" source="media\onelake-shortcuts\lineage-view-button.png":::) in the upper right corner of the Workspace explorer.

:::image type="content" source="media\onelake-shortcuts\lineage-view.png" alt-text="Screenshot of the lineage view screen." lightbox="media\onelake-shortcuts\lineage-view.png":::

> [!NOTE]
> The lineage view is scoped to a single workspace. Shortcuts to locations outside the selected workspace don’t appear.

## Known issues and limitations

- Datasets don’t support shortcuts.
- Data Warehouse and Lakehouse TDS endpoint don’t currently support shortcuts.
- Shortcuts to ADLS Gen 2 don’t currently support private endpoints.
- ADLS Gen 2 Shortcuts must point to DFS endpoint.
- Spark Notebook doesn't currently support:
  - Accessing shortcuts through Pandas.
  - Accessing shortcuts directly through Python.

## Next steps

- [Creating shortcuts](create-onelake-shortcut.md)
