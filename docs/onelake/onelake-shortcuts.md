---
title: OneLake shortcuts
description: OneLake shortcuts provide a way to connect to existing data without having to directly copy it. Learn how to use them.
ms.reviewer: eloldag
ms.author: trolson
author: TrevorLOlson
ms.search.form: Shortcuts
ms.topic: conceptual
ms.custom: build-2023
ms.date: 05/23/2023
---

# OneLake shortcuts

Shortcuts in Microsoft OneLake allow you to unify your data across domains, clouds and accounts by creating a single virtualized data lake for your entire enterprise. All Fabric experiences and analytical engines can directly connect to your existing data sources such as Azure, AWS and OneLake through a unified namespace.  Permissions and credentials are all managed by OneLake, so each Fabric experience doesn't need to be separately configured to connect to each data source.  Additionally, you can use shortcuts to eliminate edge copies of data and reduce process latency associated with data copies and staging.

[!INCLUDE [preview-note](../includes/preview-note.md)]

## What are shortcuts?

Shortcuts are objects in OneLake that point to other storage locations.  The location can be internal or external to OneLake. The location that a shortcut points to is known as the "Target" path of the shortcut. The location that the shortcut appears is known as the "Shortcut" path. Shortcuts appear as folders in OneLake and can be used transparently by any experience or service that has access to OneLake.  Shortcuts behave similar to symbolic links.  They're an independent object from the target.  If a shortcut is deleted, the target remains unaffect.  If the target path is moved, renamed, or deleted the shortcut can break.

:::image type="content" source="media\onelake-shortcuts\shortcut-connects-other-location.png" alt-text="Diagram showing how a shortcut connects files and folders stored in other locations." lightbox="media\onelake-shortcuts\shortcut-connects-other-location.png":::

## Where can I create shortcuts?

Shortcuts can be created both in Lakehouses and KQL Databases.  Furthermore, the shortcuts created within these items can point to other OneLake locations, ADLS Gen2 or Amazon S3 storage accounts.

### Lakehouse

When creating shortcuts in a Lakehouse, it’s important to understand the folder structure of the item. Lakehouses are composed of two top level folders:  The “Tables” folder and the “Files” folder.  The “Tables” folder represents the managed portion of the Lakehouse while the “Files” folder is the unmanaged portion of the Lakehouse.
In the “Tables” folder, you can only create shortcuts at the top level.  Shortcuts aren't supported in other subdirectories of the "Tables" folder.  If the target of the shortcut contains data in the delta\parquet format, the Lakehouse will automatically synchronize the metadata and recognize the folder as a Table.
In the “Files” folder, there are no restrictions on where you can create shortcuts.  They can be created at any level of the folder hierarchy. Table discovery doesn't happen in the “Files” folder.

:::image type="content" source="media\onelake-shortcuts\lake-view-table-view.png" alt-text="Diagram showing the Lake view and the Table view side by side." lightbox="media\onelake-shortcuts\lake-view-table-view.png":::

### KQL Database

When you create a shortcut in a KQL database, it appears in the "Shortcuts" folder of the database.  The KQL database treats shortcuts like external tables.  To query the shortcut, use the "external_table" function of the Kusto Query Language.

:::image type="content" source="media\onelake-shortcuts\shortcut-kql-database.png" alt-text="Screenshot of shortcuts inside a KQL database." lightbox="media\onelake-shortcuts\shortcut-kql-database.png":::

## Where can I access shortcuts?

Any Fabric or non-Fabric service that can access data in OneLake can utilize shortcuts.  Shortcuts are transparent to any service accessing data through the OneLake API. Shortcuts just appear as another folder in the lake.  This allows Spark, SQL, Real-Time Analytics and Analysis Services to all utilize shortcuts when querying data.

### Spark

Spark notebooks and Spark jobs can utilize shortcuts that are created in OneLake.  Relative file paths can be used to directly read data from shortcuts.  Additionally, if a shortcut is created in the “Tables” section of the Lakehouse and is in the delta format, it can also be read as a managed tables using Spark SQL syntax.

```python
df = spark.read.format("delta").load("Tables/MyShortcut")
display(df)
```

```python
df = spark.sql("SELECT * FROM MyLakehouse.MyShortcut LIMIT 1000")
display(df)
```

> [!NOTE]
> The delta format doesn't support tables with space characters in the name.  Any shortcut containing a space in the name won't be discovered as a delta table in the lakehouse.

### SQL

Shortcuts in the tables section of the Lakehouse can also be read through the SQL endpoint for the Lakehouse.  This can be accessed through mode selector of the Lakehouse or through SQL Server Management Studio (SSMS).

```SQL
SELECT TOP (100) *
FROM [MyLakehouse].[dbo].[MyShortcut]
```

### Real-Time Analytics

Shortcuts in KQL DBs are recognized as external tables. To query the shortcut, use the "external_table" function of the Kusto Query Language.

```Kusto
external_table('MyShortcut')
| take 100
```

> [!NOTE]
> KQL databases don't currently support data in the delta format.  Tables in a KQL database are only exported to OneLake as parquet files.  Shortcuts in KQL databases that contain delta formatted data in the target aren't recognized as tables.

### Analysis Services

Power BI datasets can be created for Lakehouses containing shortcuts in the tables section of the Lakehouse.  When the dataset runs in direct-lake mode, Analysis Services can read data directly from the shortcut.

### Non-Fabric
Applications and services outside of Fabric can also access shortcuts through the OneLake API.  OneLake supports a subset of the ADLS Gen2 and Blob storage APIs.  To learn more about the OneLake API, see [OneLake access with APIs](onelake-access-api.md).

```HTTP
https://onelake.dfs.fabric.microsoft.com/MyWorkspace/MyLakhouse/Tables/MyShortcut/MyFile.csv
```

## Types of shortcuts

OneLake shortcuts support multiple filesystem data sources.  These include internal OneLake locations, Azure Data Lake Storage Gen2 and Amazon S3.

### Internal OneLake shortcuts

Internal OneLake shortcuts allow you to reference data within existing Fabric items.  These items include Lakehouses, KQL Databases and Data Warehouses.  The shortcut can point to a folder location within the same item, across items within the same workspace or even across items in different workspaces.  When you create a shortcut across items, the item types don't need to match.  For instance, you can create a shortcut in a Lakehouse that points to data in a Data Warehouse.

When accessing data through a shortcut to another OneLake location, the identity of the calling user will be utilized to authorize access to the data in the target path of the shortcut*. This user must have permissions in the target location to read the data.

> [!IMPORTANT]
> When accessing shortcuts through Power BI Datasets or T-SQL, **the calling user’s identity is not passed through to the shortcut target.** The calling item owner’s identity is passed instead, delegating access to the calling user.  

### ADLS shortcuts

Shortcuts can also be created to ADLS Gen2 storage accounts.  When you create shortcuts to ADLS, the target path can point to any folder within the hierarchical namespace.  At a minimum, the target path must include a container name.

*Access:*

ADLS shortcuts must point to the DFS endpoint for the storage account.  
Example: `https://accountname.dfs.core.windows.net/`

> [!NOTE]
> Access to storage account endpoint can't be blocked by storage firewall or VNET.

*Authorization:*

ADLS shortcuts utilize a delegated authorization model.  In this model, the shortcut creator specifies a credential for the ADLS shortcut and all access to that shortcut will be authorized using that credential.  The supported delegated types are Account Key, SAS Token, OAuth and Service Principal.

- **SAS Token** - must include at least the following permissions: Read, List, Execute

- **OAuth identity** - must have Storage Blob Data Reader, Storage Blob Data Contributor or Storage Blob Data Owner role on storage account.

- **Service Principal** - must have Storage Blob Data Reader, Storage Blob Data Contributor or Storage Blob Data Owner role on storage account.

### S3 shortcuts

Shortcuts can also be created to Amazon S3 accounts.  When you create shortcuts to Amazon S3, the target path must contain a bucket name at a minimum.  S3 doesn’t natively support hierarchical namespaces but you can utilize prefixes to mimic a directory structure.  You can include prefixes in the shortcut path to further narrow the scope of data accessible through the shortcut.  When accessing data through an S3 shortcut prefixes will be represented as folders.

*Access:*

S3 shortcuts must point to the https endpoint for the S3 bucket.
Example: `https://bucketname.s3.region.amazonaws.com/`

> [!NOTE]
> Access to storage account endpoint can't be blocked by storage firewall or VPC.

*Authorization:*

S3 shortcuts utilize a delegated authorization model.  In this model, the shortcut creator specifies a credential for the S3 shortcut and all access to that shortcut will be authorized using that credential.  The supported delegated credential is a Key and Secret for an IAM user.

The IAM user must have the following permissions on the bucket that the shortcut is pointing to.

- `S3:GetObject`
- `S3:GetBucketLocation`
- `S3:ListBucket`

> [!NOTE]
> S3 shortcuts are read-only. They don't support write operations regardless of the permissions for the IAM user.

### Dataverse shortcuts (preview)

Dataverse direct integration with Microsoft Fabric enables organizations to extend their Dynamics 365 enterprise applications and business processes into Fabric. The **View in Microsoft Fabric** feature built into the PowerApps maker portal, makes all your Dynamics 365 data available for analysis in Microsoft Fabric. For more information, see [Dataverse direct integration with Microsoft Fabric](https://go.microsoft.com/fwlink/?linkid=2245037).

> [!NOTE]
> Dataverse shortcuts can't be created through the Fabric UX.  They must be created through the PowerApps maker portal.

*Authorization:*

Dataverse shortcuts utilize a delegated authorization model. In this model, the shortcut creator specifies a credential for the Dataverse shortcut and all access to that shortcut will be authorized using that credential. The supported delegated credential type is Organizational account(OAuth2).  The organizational account must have permissions to access data in Dataverse Managed Lake
> [!NOTE]
> Service Principals are currently not supported for Dataverse shortcut authorization.

## How shortcuts utilize cloud connections

ADLS and S3 shortcut authorization is delegated through the use of cloud connections.  When creating a new ADLS or S3 shortcut, a user either creates a new connection or selects an existing connection for the data source.  When a connection is set for a shortcut, this is considered a “bind” operation.  Only users with permission on the connection can perform the bind operation.  If a user doesn't have permissions on the connection, they can't create new shortcuts using that connection.

## Permissions

Permissions for shortcuts are governed by a combination of the permissions in the shortcut path and the target path. When a user accesses a shortcut, the most restrictive permission of the two locations is applied.  Therefore, a user that has read/write permissions in the Lakehouse but only read permissions in the shortcut target won't be allowed to write to the shortcut target path.  Likewise, a user that only has read permissions in the Lakehouse but read/write in the shortcut target will also not be allowed to write to the shortcut target path.

## Workspace roles

The following table shows the shortcut-related permissions for each workspace role. For more information, see [Workspace roles](..\get-started\roles-workspaces.md).

| **Capability** | **Admin** | **Member** | **Contributor** | **Viewer** |
|---|---|---|---|---|
| **Create a shortcut** | Yes<sup>1</sup> | Yes<sup>1</sup> | Yes<sup>1</sup> | - |
| **Read file/folder content of shortcut**  | Yes<sup>2</sup> | Yes<sup>2</sup> | Yes<sup>2</sup> | - |
| **Write to shortcut target location** | Yes<sup>3</sup> | Yes<sup>3</sup> | Yes<sup>3</sup> | - |
| **Read data from shortcuts in table section of the** **Lakehouse via TDS endpoint** | Yes | Yes | Yes | Yes |

<sup>1</sup> User must have a role that provides write permission the shortcut location and at least read permission target location

<sup>2</sup> User must have a role that provides read permission both in the shortcut location and target location

<sup>3</sup> User must have a role that provides write permission both in the shortcut location and the target location

## How do shortcuts handle deletions?

Shortcuts don't perform cascading deletes. When you perform a delete operation on a shortcut, you only delete the shortcut object. The data in the shortcut target remains unchanged. However, if you perform a delete operation on a file or folder within a shortcut, and you have permissions in the shortcut target to perform the delete operation, the files and/or folders are deleted in the target. The following example illustrates this point.

### Delete example

User A has a lakehouse with the following path in it:  
> MyLakehouse\Files\\*MyShortcut*\Foo\Bar

**MyShortcut** is a shortcut that points to an ADLS Gen2 account that contains the *Foo\Bar* directories.

#### Deleting a shortcut object

User A performs a delete operation on the following path:  
> MyLakehouse\Files\\***MyShortcut***

In this case, **MyShortcut** is deleted from the Lakehouse. Shortcuts don't perform cascading deletes, therefore the files and directories in the ADLS Gen2 account *Foo\Bar* remain unaffected.

#### Deleting content referenced by a shortcut

User A performs a delete operation on the following path:  
> MyLakehouse\Files\\*MyShortcut*\Foo\\**Bar**  

In this case, if User A has write permissions in the ADLS Gen2 account, the **Bar** directory is deleted from the ADLS Gen2 account.

## Workspace lineage view

When creating shortcuts between multiple Fabric items within a workspace, you can visualize the shortcut relationships through the workspace lineage view. Select the **Lineage view** button (:::image type="icon" source="media\onelake-shortcuts\lineage-view-button.png":::) in the upper right corner of the Workspace explorer.

:::image type="content" source="media\onelake-shortcuts\lineage-view.png" alt-text="Screenshot of the lineage view screen." lightbox="media\onelake-shortcuts\lineage-view.png":::

> [!NOTE]
> The lineage view is scoped to a single workspace. Shortcuts to locations outside the selected workspace won't appear.

## Limitations and Considerations

- The maximum number of shortcuts per Fabric item is 10,000.
- The maximum number of shortcuts in a single OneLake path is 10.
- The maximum number of direct shortcut to shortcut links is 5.
- ADLS and S3 shortcut target paths can't contain any reserved characters from RCF 3986 section 2.2.
- OneLake shortcut target paths can’t contain “%” characters.
- Shortcuts don't support nonlatin characters.
- Copy Blob api not supported for ADLS or S3 shortcuts.
- Copy function doesn't work on shortcuts that directly point to ADLS containers. It's recommended to create ADLS shortcuts to a directory that is at least one level below a container.
- OneLake shortcuts pointing to ADLS or S3 shortcuts isn't supported.
- Additional shortcuts can't be created inside ADLS or S3 shortcuts.

## Next steps

- [Creating shortcuts](create-onelake-shortcut.md)
