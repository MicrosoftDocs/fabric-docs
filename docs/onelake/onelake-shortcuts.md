---
title: OneLake shortcuts
description: OneLake shortcuts provide a way to connect to existing data without having to directly copy it. Learn how to use them.
ms.reviewer: eloldag
ms.author: trolson
author: TrevorLOlson
ms.search.form: Shortcuts
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
  - ignite-2023-fabric
  - build-2024
ms.date: 05/09/2024
---

# OneLake shortcuts

Shortcuts in Microsoft OneLake allow you to unify your data across domains, clouds, and accounts by creating a single virtual data lake for your entire enterprise. All Fabric experiences and analytical engines can directly connect to your existing data sources such as Azure, Amazon Web Services (AWS), and OneLake through a unified namespace. OneLake manages all permissions and credentials, so you don't need to separately configure each Fabric workload to connect to each data source. Additionally, you can use shortcuts to eliminate edge copies of data and reduce process latency associated with data copies and staging.

## What are shortcuts?

Shortcuts are objects in OneLake that point to other storage locations. The location can be internal or external to OneLake. The location that a shortcut points to is known as the target path of the shortcut. The location where the shortcut appears is known as the shortcut path. Shortcuts appear as folders in OneLake and any workload or service that has access to OneLake can use them. Shortcuts behave like symbolic links. They're an independent object from the target. If you delete a shortcut, the target remains unaffected. If you move, rename, or delete a target path, the shortcut can break.

:::image type="content" source="media\onelake-shortcuts\shortcut-connects-other-location.png" alt-text="Diagram showing how a shortcut connects files and folders stored in other locations." lightbox="media\onelake-shortcuts\shortcut-connects-other-location.png":::

## Where can I create shortcuts?

You can create shortcuts in lakehouses and Kusto Query Language (KQL) databases. Furthermore, the shortcuts you create within these items can point to other OneLake locations, Azure Data Lake Storage (ADLS) Gen2, Amazon S3 storage accounts, or Dataverse. You can even [create shortcuts to on-premises or network-restricted locations](create-on-premises-shortcut.md) with the use of the Fabric on-premises data gateway (OPDG).

You can use the Fabric UI to create shortcuts interactively, and you can use the [REST API](onelake-shortcuts-rest-api.md) to create shortcuts programmatically.

### Lakehouse

When creating shortcuts in a lakehouse, you must understand the folder structure of the item. Lakehouses are composed of two top level folders: the **Tables** folder and the **Files** folder. The **Tables** folder represents the managed portion of the lakehouse, while the **Files** folder is the unmanaged portion of the lakehouse.
In the **Tables** folder, you can only create shortcuts at the top level. Shortcuts aren't supported in other subdirectories of the **Tables** folder. If the target of the shortcut contains data in the Delta\Parquet format, the lakehouse automatically synchronizes the metadata and recognizes the folder as a table.
In the **Files** folder, there are no restrictions on where you can create shortcuts. You can create them at any level of the folder hierarchy. Table discovery doesn't happen in the **Files** folder.

:::image type="content" source="media\onelake-shortcuts\lake-view-table-view.png" alt-text="Diagram showing the Lake view and the Table view side by side.":::

### KQL database

When you create a shortcut in a KQL database, it appears in the **Shortcuts** folder of the database. The KQL database treats shortcuts like external tables. To query the shortcut, use the `external_table` function of the Kusto Query Language.

:::image type="content" source="media\onelake-shortcuts\shortcut-kql-database.png" alt-text="Screenshot of shortcuts inside a KQL database.":::

## Where can I access shortcuts?

Any Fabric or non-Fabric service that can access data in OneLake can use shortcuts. Shortcuts are transparent to any service accessing data through the OneLake API. Shortcuts just appear as another folder in the lake. Spark, SQL, Real-Time Intelligence, and Analysis Services can all use shortcuts when querying data.

### Spark

Spark notebooks and Spark jobs can use shortcuts that you create in OneLake. Relative file paths can be used to directly read data from shortcuts. Additionally, if you create a shortcut in the **Tables** section of the lakehouse and it is in the Delta format, you can read it as a managed table using Spark SQL syntax.

```python
df = spark.read.format("delta").load("Tables/MyShortcut")
display(df)
```

```python
df = spark.sql("SELECT * FROM MyLakehouse.MyShortcut LIMIT 1000")
display(df)
```

> [!NOTE]
> The Delta format doesn't support tables with space characters in the name. Any shortcut containing a space in the name won't be discovered as a Delta table in the lakehouse.

### SQL

You can also read shortcuts in the **Tables** section of a lakehouse through the SQL analytics endpoint for the lakehouse. You can access the SQL analytics endpoint through the mode selector of the lakehouse or through SQL Server Management Studio (SSMS).

```SQL
SELECT TOP (100) *
FROM [MyLakehouse].[dbo].[MyShortcut]
```

### Real-Time Intelligence

Shortcuts in KQL databases are recognized as external tables. To query the shortcut, use the `external_table` function of the Kusto Query Language.

```Kusto
external_table('MyShortcut')
| take 100
```

### Analysis Services

You can create semantic models for lakehouses containing shortcuts in the **Tables** section of the lakehouse. When the semantic model runs in Direct Lake mode, Analysis Services can read data directly from the shortcut.

### Non-Fabric

Applications and services outside of Fabric can also access shortcuts through the OneLake API. OneLake supports a subset of the ADLS Gen2 and Blob storage APIs. To learn more about the OneLake API, see [OneLake access with APIs](onelake-access-api.md).

```HTTP
https://onelake.dfs.fabric.microsoft.com/MyWorkspace/MyLakhouse/Tables/MyShortcut/MyFile.csv
```

## Types of shortcuts

OneLake shortcuts support multiple filesystem data sources. These include internal OneLake locations, Azure Data Lake Storage (ADLS) Gen2, Amazon S3, and Dataverse.

### Internal OneLake shortcuts

Internal OneLake shortcuts allow you to reference data within existing Fabric items. These items include lakehouses, KQL databases and data warehouses. The shortcut can point to a folder location within the same item, across items within the same workspace or even across items in different workspaces. When you create a shortcut across items, the item types don't need to match. For instance, you can create a shortcut in a lakehouse that points to data in a data warehouse.

When a user accesses data through a shortcut to another OneLake location, the identity of the calling user is used to authorize access to the data in the target path of the shortcut*. This user must have permissions in the target location to read the data.

> [!IMPORTANT]
> When accessing shortcuts through Power BI semantic models or T-SQL, **the calling user’s identity is not passed through to the shortcut target.** The calling item owner’s identity is passed instead, delegating access to the calling user.

### ADLS shortcuts

Shortcuts can also be created to ADLS Gen2 storage accounts. When you create shortcuts to ADLS, the target path can point to any folder within the hierarchical namespace. At a minimum, the target path must include a container name.

#### Access

ADLS shortcuts must point to the DFS endpoint for the storage account.
Example: `https://accountname.dfs.core.windows.net/`

If your storage account is protected by a storage firewall, you can configure trusted service access.  See [Trusted Workspace Access](..\security\security-trusted-workspace-access.md)

#### Authorization

ADLS shortcuts use a delegated authorization model. In this model, the shortcut creator specifies a credential for the ADLS shortcut and all access to that shortcut is authorized using that credential. The supported delegated types are Organizational account, Account Key, Shared Access Signature (SAS), and Service Principal.

- **Organizational account** - must have Storage Blob Data Reader, Storage Blob Data Contributor, or Storage Blob Data Owner role on storage account
- **Shared Access Signature (SAS)** - must include at least the following permissions: Read, List, and Execute
- **Service Principal** - must have Storage Blob Data Reader, Storage Blob Data Contributor, or Storage Blob Data Owner role on storage account

> [!NOTE]
> You must have Hierarchical Namespaces enabled on your ADLS Gen 2 storage account.

### S3 shortcuts

You can also create shortcuts to Amazon S3 accounts. When you create shortcuts to Amazon S3, the target path must contain a bucket name at a minimum. S3 doesn't natively support hierarchical namespaces but you can use prefixes to mimic a directory structure. You can include prefixes in the shortcut path to further narrow the scope of data accessible through the shortcut. When you access data through an S3 shortcut, prefixes are represented as folders.

#### Access

S3 shortcuts must point to the https endpoint for the S3 bucket.

Example: `https://bucketname.s3.region.amazonaws.com/`

> [!NOTE]
> You do not need to disable the S3 Block Public Access setting for your S3 account for the S3 shortcut to function.
> 
> Access to the S3 endpoint must not be blocked by a storage firewall or Virtual Private Cloud.

#### Authorization

S3 shortcuts use a delegated authorization model. In this model, the shortcut creator specifies a credential for the S3 shortcut and all access to that shortcut is authorized using that credential. The supported delegated credential is a Key and Secret for an IAM user.

The IAM user must have the following permissions on the bucket that the shortcut is pointing to.

- `S3:GetObject`
- `S3:GetBucketLocation`
- `S3:ListBucket`

> [!NOTE]
> S3 shortcuts are read-only. They don't support write operations regardless of the permissions for the IAM user.

### Google Cloud Storage shortcuts (Preview)

Shortcuts can be created to Google Cloud Storage(GCS) using the XML API for GCS.  When you create shortcuts to Google Cloud Storage, the target path must contain a bucket name at a minimum.  You can also restrict the scope of the shortcut by further specifying the prefix/folder you want to point to within the storage hierarchy. 

#### Access

When configuring the connection for a GCS shortcut you can either specify the global endpoint for the storage service or use a bucket specific endpoint.

- Global Endpoint example: `https://storage.googleapis.com`
- Bucket Specific Endpoint example: ` https://<BucketName>.storage.googleapis.com`

#### Authorization

GCS shortcuts use a delegated authorization model. In this model, the shortcut creator specifies a credential for the GCS shortcut and all access to that shortcut is authorized using that credential. The supported delegated credential is an HMAC key and secret for a Service account or User account.

The account must have permission to access the data within the GCS bucket. If the bucket specific endpoint was used in the connection for the shortcut, the account must have the following permissions:

- `storage.objects.get`
- `stoage.objects.list`

If the global endpoint was used in the connection for the shortcut, the account must also have the following permission:
- `storage.buckets.list`

> [!NOTE]
> GCS shortcuts are read-only. They don't support write operations regardless of the permissions for the account used.

### Dataverse shortcuts

Dataverse direct integration with Microsoft Fabric enables organizations to extend their Dynamics 365 enterprise applications and business processes into Fabric. This integration is accomplished through shortcuts, which can be created in two ways: through the PowerApps maker portal or through Fabric directly.

#### Creating Shortcuts through PowerApps Maker Portal 
Authorized PowerApps users can access the PowerApps maker portal and use the **Link to Microsoft Fabric** feature. From this single action, a Lakehouse is created in Fabric and shortcuts are automatically generated for each table in the Dataverse environment. 
 For more information, see [Dataverse direct integration with Microsoft Fabric](https://go.microsoft.com/fwlink/?linkid=2245037).

#### Creating Shortcuts through Fabric 
Fabric users can also create shortcuts to Dataverse. From the create shortcuts UX, users can select Dataverse, supply their environment URL, and browse the available tables. This experience allows users to selectively choose which tables to bring into Fabric rather than bringing in all tables.

> [!NOTE]
> Dataverse tables must first be available in the Dataverse Managed Lake before they are visible in the Fabric create shortcuts UX. If your tables are not visible from Fabric, use the **Link to Microsoft Fabric** feature from the PowerApps maker portal.

#### Authorization

Dataverse shortcuts use a delegated authorization model. In this model, the shortcut creator specifies a credential for the Dataverse shortcut, and all access to that shortcut is authorized using that credential. The supported delegated credential type is Organizational account (OAuth2). The organizational account must have the system administrator permission to access data in Dataverse Managed Lake.

> [!NOTE]
> Service Principals are currently not supported for Dataverse shortcut authorization.

## Caching
Shortcut caching can be used to reduce egress costs associated with cross-cloud data access. As files are read through an external shortcut, the files are stored in a cache for the Fabric workspace.  Subsequent read requests are served from cache rather than the remote storage provider.  Cached files have a retention period of 24 hours.  Each time the file is accessed the retention period is reset.  If the file in remote storage provider is more recent than the file in the cache, the request is served from remote storage provider and the updated file will be stored in cache.  If a file hasn’t been accessed for more than 24hrs it is purged from the cache. Individual files greater than 1GB in size are not cached.
> [!NOTE]
> Shortcut caching is currently only supported for GCS, S3 and S3 compatible shortcuts.

To enable caching for shortcuts, open the **Workspace settings** panel. Choose the **OneLake** tab. Toggle the cache setting to **On** and click **Save**.

:::image type="content" source="media\onelake-shortcuts\shortcut-cache-settings.png" alt-text="Screenshot of workspace settings panel with OneLake tab selected." lightbox="media\onelake-shortcuts\shortcut-cache-settings.png":::


## How shortcuts utilize cloud connections

ADLS and S3 shortcut authorization is delegated by using cloud connections. When you create a new ADLS or S3 shortcut, you either create a new connection or select an existing connection for the data source. Setting a connection for a shortcut is a bind operation. Only users with permission on the connection can perform the bind operation. If you don't have permissions on the connection, you can't create new shortcuts using that connection.

## Permissions

A combination of the permissions in the shortcut path and the target path governs the permissions for shortcuts. When a user accesses a shortcut, the most restrictive permission of the two locations is applied. Therefore, a user that has read/write permissions in the lakehouse but only read permissions in the shortcut target can't write to the shortcut target path. Likewise, a user that only has read permissions in the lakehouse but read/write in the shortcut target also can't write to the shortcut target path.

## Workspace roles

The following table shows the shortcut-related permissions for each workspace role. For more information, see [Workspace roles](..\get-started\roles-workspaces.md).

| **Capability** | **Admin** | **Member** | **Contributor** | **Viewer** |
|---|---|---|---|---|
| **Create a shortcut** | Yes<sup>1</sup> | Yes<sup>1</sup> | Yes<sup>1</sup> | - |
| **Read file/folder content of shortcut** | Yes<sup>2</sup> | Yes<sup>2</sup> | Yes<sup>2</sup> | - |
| **Write to shortcut target location** | Yes<sup>3</sup> | Yes<sup>3</sup> | Yes<sup>3</sup> | - |
| **Read data from shortcuts in table section of the lakehouse via TDS endpoint** | Yes | Yes | Yes | Yes |

<sup>1</sup> Users must have a role that provides write permission the shortcut location and at least read permission in the target location.

<sup>2</sup> Users must have a role that provides read permission both in the shortcut location and the target location.

<sup>3</sup> Users must have a role that provides write permission both in the shortcut location and the target location.

## OneLake data access roles (preview)

[OneLake data access roles](./security/get-started-data-access-roles.md) is a new feature that enables you to apply role-based access control (RBAC) to your data stored in OneLake. You can define security roles that grant read access to specific folders within a Fabric item, and assign them to users or groups. The access permissions determine what folders users see when accessing the lake view of the data, either through the lakehouse UX, notebooks, or OneLake APIs. For items with the preview feature enabled, OneLake data access roles also determine a user's access to a shortcut.

Users in the Admin, Member, and Contributor roles have full access to read data from a shortcut regardless of the OneLake data access roles defined. However they still need access on both the source and target of the shortcut as mentioned in [Workspace roles](./security/get-started-security.md#workspace-permissions).

Users in the Viewer role or that had a lakehouse shared with them directly have access restricted based on if the user has access through a OneLake data access role. For more information on the access control model with shortcuts, see [Data Access Control Model in OneLake.](./security/data-access-control-model.md#shortcuts)

## How do shortcuts handle deletions?

Shortcuts don't perform cascading deletes. When you perform a delete operation on a shortcut, you only delete the shortcut object. The data in the shortcut target remains unchanged. However, if you perform a delete operation on a file or folder within a shortcut, and you have permissions in the shortcut target to perform the delete operation, the files and/or folders are deleted in the target. The following example illustrates this point.

### Delete example

User A has a lakehouse with the following path in it:
> MyLakehouse\Files\\*MyShortcut*\Foo\Bar

**MyShortcut** is a shortcut that points to an ADLS Gen2 account that contains the *Foo\Bar* directories.

#### Deleting a shortcut object

User A performs a delete operation on the following path:
> MyLakehouse\Files\\***MyShortcut***

In this case, **MyShortcut** is deleted from the lakehouse. Shortcuts don't perform cascading deletes, therefore the files and directories in the ADLS Gen2 account *Foo\Bar* remain unaffected.

#### Deleting content referenced by a shortcut

User A performs a delete operation on the following path:
> MyLakehouse\Files\\*MyShortcut*\Foo\\**Bar**

In this case, if User A has write permissions in the ADLS Gen2 account, the **Bar** directory is deleted from the ADLS Gen2 account.

## Workspace lineage view

When creating shortcuts between multiple Fabric items within a workspace, you can visualize the shortcut relationships through the workspace lineage view. Select the **Lineage view** button (:::image type="icon" source="media\onelake-shortcuts\lineage-view-button.png":::) in the upper right corner of the Workspace explorer.

:::image type="content" source="media\onelake-shortcuts\lineage-view.png" alt-text="Screenshot of the lineage view screen." lightbox="media\onelake-shortcuts\lineage-view.png":::

> [!NOTE]
> The lineage view is scoped to a single workspace. Shortcuts to locations outside the selected workspace won't appear.

## Limitations and considerations

- The maximum number of shortcuts per Fabric item is 100,000. In this context, the term item refers to: apps, lakehouses, warehouses, reports, and more.
- The maximum number of shortcuts in a single OneLake path is 10.
- The maximum number of direct shortcuts to shortcut links is 5.
- ADLS and S3 shortcut target paths can't contain any reserved characters from [RFC 3986 section 2.2](https://www.rfc-editor.org/rfc/rfc3986#section-2.2). For allowed characters, see [RFC 3968 section 2.3](https://www.rfc-editor.org/rfc/rfc3986#section-2.3).
- OneLake shortcut names, parent paths, and target paths can't contain "%" or "+" characters.
- Shortcuts don't support non-Latin characters.
- Copy Blob API not supported for ADLS or S3 shortcuts.
- Copy function doesn't work on shortcuts that directly point to ADLS containers. It's recommended to create ADLS shortcuts to a directory that is at least one level below a container.
- Additional shortcuts can't be created inside ADLS or S3 shortcuts.
- Lineage for shortcuts to Data Warehouses and Semantic Models is not currently available.

## Related content

- [Create a OneLake shortcut](create-onelake-shortcut.md)
- [Use OneLake shortcuts REST APIs](onelake-shortcuts-rest-api.md)
