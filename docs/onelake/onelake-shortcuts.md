---
title: OneLake shortcuts
description: OneLake shortcuts provide a way to connect to existing data without having to directly copy it. Learn how to use them.
ms.reviewer: eloldag
ms.author: trolson
author: TrevorLOlson
ms.topic: conceptual
ms.date: 05/23/2023
---

# OneLake shortcuts

[!INCLUDE [preview-note](../includes/preview-note.md)]

OneLake Shortcuts allows you to unify your data across domains, clouds and accounts to create a single virtualized data lake for your entire enterprise. All Fabric workloads can directly connect to your existing data sources such as Azure, AWS and OneLake through this single virtualized data lake.  Permissions and credentials are all managed at the OneLake layer, so each Fabric workload doesn't need to be separately configured to connect to each data source.  Additionally, you can use shortcuts to eliminate edge copies of data and reduce process latency associated with data copies and staging.
Shortcuts behave like symbolic links within the OneLake filesystem but have the ability to connect to external data sources in addition to OneLake locations.  These shortcuts can be created within the file structure of a Fabric artifact and can be used by Fabric workloads just like any other folder in the file system.  

:::image type="content" source="media\onelake-shortcuts\shortcut-connects-other-location-v2.png" alt-text="Diagram showing how a shortcut connects files and folders stored in other locations." lightbox="media\onelake-shortcuts\shortcut-connects-other-location.png":::

## Where can I create shortcuts?

Shortcuts can be created both in Lakehouse artifacts and Kusto DB artifacts.  Furthermore, the shortcuts created within these artifacts can point to other OneLake locations, ADLS Gen 2 or Amazon S3 storage accounts.

**Lakehouse:**

When creating shortcuts in a Lakehouse artifact, it’s important to understand the artifact folder structure. Lakehouses are composed of two top level folders.  The “Tables” folder and the “Files” folder.  The “Tables” folder represents the managed portion of the Lakehouse while the “Files” folder is the unmanaged portion of the Lakehouse.
In the “Tables” folder, you can only create shortcuts at the top level.  If the source of the shortcut contains data in the Delta\Parquet format, the Lakehouse will automatically synchronize the metadata and recognize the folder as a Table.
In the “Files” folder, there are no restrictions on where you can create shortcuts.  They can be created at any level of the folder hierarchy. Table discovery doesn't happen in the “Files” folder.

:::image type="content" source="media\onelake-shortcuts\lake-view-table-view.png" alt-text="Diagram showing the Lake view and the Table view side by side." lightbox="media\onelake-shortcuts\lake-view-table-view.png":::

## What workloads can access shortcuts?

Any workload (1p or 3p) that can access data in OneLake can utilize shortcuts.  Through the OneLake API, shortcuts just appear as another folder in the lake.  This allows Spark, SQL, Kusto and Analysis Services to all utilize shortcuts when querying data.

**Spark:**

Spark notebooks and Spark jobs can utilize shortcuts that are created in OneLake.  Relative file paths can be used to directly read data from shortcuts.  Additionally, if a shortcut is created in the “Tables” section of the Lakehouse and is in the delta format, it can also be read as a managed tables using Spark SQL syntax.

**SQL:**

Shortcuts in the tables section of the Lakehouse can also be read through the SQL endpoint for the Lakehouse.  This can be accessed through “Warehouse Mode” for the Lakehouse or through SQL Management Studio.

**Kusto:**

Shortcuts in Kusto are recognized as external tables and can be queries using KQL.

**Analysis Services:**

Datasets can be created for Lakehouses containing shortcuts in the tables section of the Lakehouse.  When the dataset runs in direct-lake mode, Analysis Services can read data directly from the shortcut.

## Types of Shortcuts

OneLake shortcuts support multiple filesystem data sources.  These include internal OneLake locations, Azure Data Lake Storage Gen 2 and Amazon S3.

**Internal OneLake Shortcuts:**

Internal OneLake Shortcuts allow you to reference data within existing Fabric artifacts.  These artifacts include Lakehouses, Kusto DBs and Data Warehouses.  The shortcut can point to a folder location within the same artifact, across artifacts within the same workspace or even across artifacts in different workspaces.  When you create a shortcut across artifacts, the artifact types don't need to match.  For instance, you can create a shortcut in a Lakehouse artifact that points to data in Kusto DB artifact.

When accessing data through a shortcut to another OneLake location, the identity of the calling user will be utilized to authorize access to the data source of the shortcut*. This user must have “readAll” permissions on the source data.

> [!IMPORTANT]
> When accessing shortcuts through Power BI Datasets or T-SQL, **the calling user’s identity is not passed through to the shortcut source.** The calling artifact owner’s identity is passed instead, delegating access to the calling user.  

**ADLS Shortcuts:**

Shortcuts can also be created to ADLS Gen 2 storage accounts.  When you create shortcuts to ADLS, the shortcut path can point to any folder within the hierarchical namespace.  At a minimum, the shortcut path must include a container name.

*Access:*

ADLS shortcuts must point to the DFS endpoint for the storage account.  
Example: `https://accountname.dfs.core.windows.net/`
The storage account endpoint must also be publicly reachable.  This means it can't be restricted by the storage firewall or a VNET.

*Authorization:*

ADLS shortcuts utilize a delegated authorization model.  In this model, the shortcut creator specifies a credential for the ADLS shortcut and all access to that shortcut will be authorized using that credential.  The supported delegated types are Account Key, SAS Token, OAuth and Service Principal.

- **SAS Token** - must include at least the following permissions: Read, List, Execute

- **OAuth identity** - must have Storage Blob Data Reader, Storage Blob Data Contributor or Storage Blob Data Owner role on storage account.

- **Service Principal** - must have Storage Blob Data Reader, Storage Blob Data Contributor or Storage Blob Data Owner role on storage account.

**S3 Shortcuts:**

Shortcuts can also be created to Amazon S3 accounts.  When you create shortcuts to Amazon S3, the shortcut path must contain a bucket name at a minimum.  S3 doesn’t natively support hierarchical namespaces but you can utilize prefixes to mimic a directory structure.  You can include prefixes in the shortcut path to further narrow the scope of data accessible through the shortcuts.  When accessing data through an S3 shortcut prefixes will be represented as folders.

*Access:*

S3 shortcuts must point to the https endpoint for the account.
Example: `https://bucketname.s3.region.amazonaws.com/`

> [!NOTE]
> S3 shortcuts don't support private endpoints so any account behind a Virtual Private Cloud won't be reachable.

*Authorization:*

S3 shortcuts utilize a delegated authorization model.  In this model, the shortcut creator specifies a credential for the S3 shortcut and all access to that shortcut will be authorized using that credential.  The supported delegated credential is a Key and Secret for an IAM user.

The IAM must have at least read only (Get, List) permissions on the bucket that the shortcut is pointing to.

> [!NOTE]
> S3 shortcuts are read-only. They don't support write operations regardless of the permissions for the IAM user.

## Shortcut Delegation

Delegation is handled through the use of Shared Cloud Connections.  When creating a new ADLS or S3 shortcut a user either creates a new connection or selects an existing connection for the data source.  When a connection is set for a shortcut, this is considered a “bind” operation.  Only users with permission on the connection can perform the bind operation.  If a user doesn't have permissions on the connection, they can't create new shortcuts using that connection.

## Permissions

Permissions for shortcuts are governed by a combination of artifact permissions and shortcut source permissions. When a user accesses a shortcut, the most restrictive permission of the two sources is applied.  Therefore, a user that has read/write permissions in the Lakehouse but only read permissions in the shortcut source won't be allowed to write to the shortcut’s source.  Likewise, a user that only has read permissions in the Lakehouse but read/write in the shortcut source will also not be allowed to write to the shortcut source.

## Workspace roles

The following table shows the shortcut-related permissions for each workspace role. For more information, see [Workspace roles](..\data-warehouse\workspace-roles.md).

| **Capability** | **Admin** | **Member** | **Contributor** | **Viewer** |
|---|---|---|---|---|
| **Create a shortcut** | Yes | Yes | Yes | - |
| **Read file/folder content of shortcut** | Yes | Yes | Yes | - |
| **Write to shortcut location** | Yes* | Yes* | Yes* | - |
| **Read data from shortcuts in table section of the** **Lakehouse via TDS endpoint** | Yes | Yes | Yes | Yes |

\* Users must also have write permission in the shortcut source.

## How do shortcuts handle deletions?

Shortcuts don't perform cascading deletes. When you perform a delete operation on a shortcut, you only delete the shortcut object; the data in the shortcut source remains unchanged. However, if you perform a delete operation on a file or folder within a shortcut, and you have permissions in the shortcut source to perform the delete operation, the files and/or folders are deleted in the source. The following example illustrates this point.

### Delete example

User A has a lakehouse with the following path in it:  
> MyLakehouse\Files\\*MyShortcut*\Foo\Bar  

**MyShortcut** is a shortcut that points to an ADLS Gen 2 account that contains the *Foo\Bar* directories.

#### Scenario one

User A performs a delete operation on the following path:  
> MyLakehouse\Files\\***MyShortcut***

In this case, **MyShortcut** is deleted from the lakehouse. Shortcuts don't perform cascading deletes, therefore the file and directories in the ADLS Gen 2 account *Foo\Bar* remain untouched.

#### Scenario two

User A performs a delete operation on the following path:  
> MyLakehouse\Files\\*MyShortcut*\Foo\\**Bar**  

In this case, if User A has write permissions in the ADLS Gen 2 account, the **Bar** directory is deleted from the ADLS Gen 2 account.

## Workspace lineage view

When creating shortcuts between multiple lakehouses within a workspace, you can visualize the shortcut relationships through the workspace lineage view. Select the **Lineage view** button (:::image type="icon" source="media\onelake-shortcuts\lineage-view-button.png":::) in the upper right corner of the Workspace explorer.

:::image type="content" source="media\onelake-shortcuts\lineage-view.png" alt-text="Screenshot of the lineage view screen." lightbox="media\onelake-shortcuts\lineage-view.png":::

> [!NOTE]
> The lineage view is scoped to a single workspace. Shortcuts to locations outside the selected workspace don’t appear.

## Known issues and limitations

- Private Endpoints aren't currently supported for shortcuts to ADLS Gen 2.
- ADLS Gen 2 Shortcuts must point to DFS endpoint. Blob endpoints aren't currently supported.
- Private Endpoints aren't currently supported for shortcuts to S3.
- S3 shortcuts are read only.
- The maximum depth of nested shortcuts is 10.
- Shortcuts to Kusto tables aren't discovered as tables in Lakehouse.
- Spaces in shortcut names won't be discovered as Delta tables.
- Shortcut paths can't contain “%” characters.
- Copy function doesn't work on shortcuts that directly point to ADLS containers. It's recommended to create ADLS shortcuts be created to a directory that is at least one level below a container.

## Next steps

- [Creating shortcuts](create-onelake-shortcut.md)
