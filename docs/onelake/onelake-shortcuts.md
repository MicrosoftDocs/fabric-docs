---
title: Unify data sources with OneLake shortcuts
description: OneLake shortcuts provide a way to connect to existing data without having to directly copy it. Learn how to use them.
ms.reviewer: eloldag
ms.author: trolson
author: TrevorLOlson
ms.search.form: Shortcuts
ms.topic: concept-article
ms.custom:
ms.date: 12/31/2024
#customer intent: As a data engineer, I want to learn how to use OneLake shortcuts so that I can unify data sources and have OneLake manage the permissions.
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

When creating shortcuts in a lakehouse, you must understand the folder structure of the item. Lakehouses are composed of two top-level folders: the **Tables** folder and the **Files** folder. The **Tables** folder represents the managed portion of the lakehouse for structured datasets. While the **Files** folder is the unmanaged portion of the lakehouse for unstructured or semi-structured data.

In the **Tables** folder, you can only create shortcuts at the top level. Shortcuts aren't supported in subdirectories of the **Tables** folder. Shortcuts in the tables section typically point to internal sources within OneLake or link to other data assets that conform to the Delta table format. If the target of the shortcut contains data in the Delta\Parquet format, the lakehouse automatically synchronizes the metadata and recognizes the folder as a table. Shortcuts in the tables section can link to either a single table or a schema, which is a parent folder for multiple tables.

> [!NOTE]
> The Delta format doesn't support tables with space characters in the name. Any shortcut containing a space in the name won't be discovered as a Delta table in the lakehouse.

In the **Files** folder, there are no restrictions on where you can create shortcuts. You can create them at any level of the folder hierarchy. Table discovery doesn't happen in the **Files** folder. Shortcuts here can point to both internal (OneLake) and external storage systems with data in any format.

:::image type="content" source="media\onelake-shortcuts\lake-view-table-view.png" alt-text="Diagram showing the Lake view and the Table view side by side.":::

### KQL database

When you create a shortcut in a KQL database, it appears in the **Shortcuts** folder of the database. The KQL database treats shortcuts like external tables. To query the shortcut, use the `external_table` function of the Kusto Query Language.

:::image type="content" source="media\onelake-shortcuts\shortcut-kql-database.png" alt-text="Screenshot of shortcuts inside a KQL database.":::

## Where can I access shortcuts?

Any Fabric or non-Fabric service that can access data in OneLake can use shortcuts. Shortcuts are transparent to any service accessing data through the OneLake API. Shortcuts just appear as another folder in the lake. Apache Spark, SQL, Real-Time Intelligence, and Analysis Services can all use shortcuts when querying data.

### Apache Spark

Apache Spark notebooks and Apache Spark jobs can use shortcuts that you create in OneLake. Relative file paths can be used to directly read data from shortcuts. Additionally, if you create a shortcut in the **Tables** section of the lakehouse and it is in the Delta format, you can read it as a managed table using Apache Spark SQL syntax.

```python
df = spark.read.format("delta").load("Tables/MyShortcut")
display(df)
```

```python
df = spark.sql("SELECT * FROM MyLakehouse.MyShortcut LIMIT 1000")
display(df)
```

### SQL

You can read shortcuts in the **Tables** section of a lakehouse through the SQL analytics endpoint for the lakehouse. You can access the SQL analytics endpoint through the mode selector of the lakehouse or through SQL Server Management Studio (SSMS).

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

OneLake shortcuts support multiple filesystem data sources. These include internal OneLake locations, Azure Data Lake Storage (ADLS) Gen2, Amazon S3, S3 Compatible, Google Cloud Storage(GCS) and Dataverse.

### Internal OneLake shortcuts

Internal OneLake shortcuts allow you to reference data within existing Fabric items, including:

* KQL databases
* Lakehouses
* Mirrored Azure Databricks Catalogs
* Mirrored Databases
* Semantic models
* SQL databases
* Warehouses

The shortcut can point to a folder location within the same item, across items within the same workspace, or even across items in different workspaces. When you create a shortcut across items, the item types don't need to match. For instance, you can create a shortcut in a lakehouse that points to data in a data warehouse.

When a user accesses data through a shortcut to another OneLake location, OneLake uses the identity of the calling user to authorize access to the data in the target path of the shortcut. This user must have permissions in the target location to read the data.

> [!IMPORTANT]
> When users access shortcuts through Power BI semantic models or T-SQL, the calling user’s identity is not passed through to the shortcut target. The calling item owner’s identity is passed instead, delegating access to the calling user.

<a id="adls-shortcuts"></a>
### Azure Data Lake Storage shortcuts

When you create shortcuts to Azure Data Lake Storage (ADLS) Gen2 storage accounts, the target path can point to any folder within the hierarchical namespace. At a minimum, the target path must include a container name.

> [!NOTE]
> You must have hierarchical namespaces enabled on your ADLS Gen 2 storage account.

#### Access

ADLS shortcuts must point to the DFS endpoint for the storage account.

Example: `https://accountname.dfs.core.windows.net/`

If your storage account is protected by a storage firewall, you can configure trusted service access. For more information, see [Trusted workspace access](..\security\security-trusted-workspace-access.md)

#### Authorization

ADLS shortcuts use a delegated authorization model. In this model, the shortcut creator specifies a credential for the ADLS shortcut and all access to that shortcut is authorized using that credential. ADLS shortcuts support the following delegated authorization types:

- **Organizational account** - must have Storage Blob Data Reader, Storage Blob Data Contributor, or Storage Blob Data Owner role on the storage account; or Delegator role on the storage account plus file or directory access granted within the storage account.
- **Service principal** - must have Storage Blob Data Reader, Storage Blob Data Contributor, or Storage Blob Data Owner role on the storage account; or Delegator role on the storage account plus file or directory access granted within the storage account.
- **Workspace identity** - must have Storage Blob Data Reader, Storage Blob Data Contributor, or Storage Blob Data Owner role on the storage account; or Delegator role on the storage account plus file or directory access granted within the storage account.
- **Shared Access Signature (SAS)** - must include at least the following permissions: Read, List, and Execute.

Microsoft Entra ID delegated authorization types (organizational account, service principal, or workspace identity) require the **Generate a user delegation key** action at the storage account level. This action is included as part of the Storage Blob Data Reader, Storage Blob Data Contributor, Storage Blob Data Owner, and Delegator roles. If you don't want to give a user reader, contributor, or owner permissions for the whole storage account, assign them the Delegator role instead. Then, define detailed data access rights using [Access control lists (ACLs) in Azure Data Lake Storage](/azure/storage/blobs/data-lake-storage-access-control).

>[!IMPORTANT]
>The **Generate a user delegation key** requirement is not currently enforced when a workspace identity is configured for the workspace and the ADLS shortcut auth type is Organizational Account, Service Principal or Workspace Identity. However, this behavior will be restricted in the future. We recommend making sure that all delegated identities have the **Generate a user delegation key** action to ensure that your users' access isn't affected when this behavior changes.

### Azure Blob Storage shortcuts

#### Access

Azure Blob Storage shortcut can point to the account name or URL for the Storage account.

Example: `accountname` or `https://accountname.blob.core.windows.net/`

#### Authorization

Blob storage shortcuts use a delegated authorization model. In this model, the shortcut creator specifies a credential for the shortcut and all access to that shortcut is authorized using that credential. Blob shortcuts support the following delegated authorization types:

- **Organizational account** - must have Storage Blob Data Reader, Storage Blob Data Contributor, or Storage Blob Data Owner role on the storage account; or Delegator role on the storage account plus file or directory access granted within the storage account.
- **Service principal** - must have Storage Blob Data Reader, Storage Blob Data Contributor, or Storage Blob Data Owner role on the storage account; or Delegator role on the storage account plus file or directory access granted within the storage account.
- **Workspace identity** - must have Storage Blob Data Reader, Storage Blob Data Contributor, or Storage Blob Data Owner role on the storage account; or Delegator role on the storage account plus file or directory access granted within the storage account.
- **Shared Access Signature (SAS)** - must include at least the following permissions: Read, List, and Execute.

### S3 shortcuts

When you create shortcuts to Amazon S3 accounts, the target path must contain a bucket name at a minimum. S3 doesn't natively support hierarchical namespaces but you can use prefixes to mimic a directory structure. You can include prefixes in the shortcut path to further narrow the scope of data accessible through the shortcut. When you access data through an S3 shortcut, prefixes are represented as folders.

> [!NOTE]
> S3 shortcuts are read-only. They don't support write operations regardless of the user's permissions.

#### Access

S3 shortcuts must point to the https endpoint for the S3 bucket.

Example: `https://bucketname.s3.region.amazonaws.com/`

> [!NOTE]
> You don't need to disable the S3 Block Public Access setting for your S3 account for the S3 shortcut to function.
>
> Access to the S3 endpoint must not be blocked by a storage firewall or Virtual Private Cloud.

#### Authorization

S3 shortcuts use a delegated authorization model. In this model, the shortcut creator specifies a credential for the S3 shortcut and all access to that shortcut is authorized using that credential. The supported delegated credential is a key and secret for an IAM user.

The IAM user must have the following permissions on the bucket that the shortcut is pointing to:

- `S3:GetObject`
- `S3:GetBucketLocation`
- `S3:ListBucket`

S3 shortcuts support S3 buckets that use S3 Bucket Keys for SSE-KMS encryption. To access data encrypted with SSE-KMS encryption, the user must have encrypt/decrypt permissions for the bucket key, otherwise they receive a **"Forbidden" error (403)**. For more information, see [Configuring your bucket to use an S3 Bucket Key with SSE-KMS for new objects](https://docs.aws.amazon.com/AmazonS3/latest/userguide/configuring-bucket-key.html).

### Google Cloud Storage shortcuts

Shortcuts can be created to Google Cloud Storage(GCS) using the XML API for GCS. When you create shortcuts to Google Cloud Storage, the target path must contain a bucket name at a minimum. You can also restrict the scope of the shortcut by further specifying the prefix/folder you want to point to within the storage hierarchy. 

> [!NOTE]
> GCS shortcuts are read-only. They don't support write operations regardless of the user's permissions.

#### Access

When configuring the connection for a GCS shortcut, you can either specify the global endpoint for the storage service or use a bucket-specific endpoint.

- Global endpoint example: `https://storage.googleapis.com`
- Bucket-specific endpoint example: `https://<BucketName>.storage.googleapis.com`

#### Authorization

GCS shortcuts use a delegated authorization model. In this model, the shortcut creator specifies a credential for the GCS shortcut and all access to that shortcut is authorized using that credential. The supported delegated credential is an HMAC key and secret for a Service account or User account.

The account must have permission to access the data within the GCS bucket. If the bucket-specific endpoint was used in the connection for the shortcut, the account must have the following permissions:

- `storage.objects.get`
- `stoage.objects.list`

If the global endpoint was used in the connection for the shortcut, the account must also have the following permission:

- `storage.buckets.list`

### Dataverse shortcuts

Dataverse direct integration with Microsoft Fabric enables organizations to extend their Dynamics 365 enterprise applications and business processes into Fabric. This integration is accomplished through shortcuts, which can be created in two ways: through the PowerApps maker portal, or through Fabric directly.

> [!NOTE]
> Dataverse shortcuts are read-only. They don't support write operations regardless of the user's permissions.

#### Creating shortcuts through PowerApps maker portal

Authorized PowerApps users can access the PowerApps maker portal and use the **Link to Microsoft Fabric** feature. From this single action, a lakehouse is created in Fabric and shortcuts are automatically generated for each table in the Dataverse environment. 

For more information, see [Dataverse direct integration with Microsoft Fabric](https://go.microsoft.com/fwlink/?linkid=2245037).

#### Creating shortcuts through Fabric

Fabric users can also create shortcuts to Dataverse. When users create shortcuts, they can select **Dataverse**, supply their environment URL, and browse the available tables. This experience allows users to choose which tables to bring into Fabric rather than bringing in all tables.

> [!NOTE]
> Dataverse tables must first be available in the Dataverse Managed Lake before they're visible in the Fabric create shortcuts UX. If your tables aren't visible from Fabric, use the **Link to Microsoft Fabric** feature from the PowerApps maker portal.

#### Authorization

Dataverse shortcuts use a delegated authorization model. In this model, the shortcut creator specifies a credential for the Dataverse shortcut, and all access to that shortcut is authorized using that credential. The supported delegated credential type is organizational account (OAuth2). The organizational account must have the system administrator permission to access data in Dataverse Managed Lake.

> [!NOTE]
> Dataverse shortcuts don't currently support Service Principals as an authenticaion type.

## Caching

Shortcut caching can reduce egress costs associated with cross-cloud data access. As files are read through an external shortcut, the files are stored in a cache for the Fabric workspace. Subsequent read requests are served from cache rather than the remote storage provider. The retention period for cached files can be set from 1-28 days. Each time the file is accessed, the retention period is reset. If the file in remote storage provider is more recent than the file in the cache, the request is served from remote storage provider and the updated file will then be stored in cache. If a file hasn’t been accessed for more than the selected retention period, it's purged from the cache. Individual files greater than 1 GB in size aren't cached.

> [!NOTE]
> Shortcut caching is currently supported for GCS, S3, S3 compatible, and on-premises data gateway shortcuts.

To enable caching for shortcuts, open the **Workspace settings** panel. Choose the **OneLake** tab. Toggle the cache setting to **On** and select the **Retention Period**.

The cache can also be cleared at any time. From the same settings page, select the **Reset cache** button. This action removes all files from the shortcut cache in this workspace.

:::image type="content" source="media\onelake-shortcuts\shortcut-cache-settings.png" alt-text="Screenshot of workspace settings panel with OneLake tab selected." lightbox="media\onelake-shortcuts\shortcut-cache-settings.png":::

## How shortcuts utilize cloud connections

ADLS and S3 shortcut authorization is delegated by using cloud connections. When you create a new ADLS or S3 shortcut, you either create a new connection or select an existing connection for the data source. Setting a connection for a shortcut is a bind operation. Only users with permission on the connection can perform the bind operation. If you don't have permissions on the connection, you can't create new shortcuts using that connection.

## Shortcut security

Shortcuts require certain permissions to manage and use. [OneLake shortcut security](./onelake-shortcut-security.md) looks at the permissions required to create shortcuts and access data using them.

## How do shortcuts handle deletions?

Shortcuts don't perform cascading deletes. When you delete a shortcut, you only delete the shortcut object. The data in the shortcut target remains unchanged. However, if you delete a file or folder within a shortcut, and you have permissions in the shortcut target to perform the delete operation, the files or folders are deleted in the target.

For example, consider a lakehouse with the following path in it: `MyLakehouse\Files\MyShortcut\Foo\Bar`. **MyShortcut** is a shortcut that points to an ADLS Gen2 account that contains the *Foo\Bar* directories.

You can perform a delete operation on the following path: `MyLakehouse\Files\MyShortcut`. In this case, the **MyShortcut** shortcut is deleted from the lakehouse but the files and directories in the ADLS Gen2 account *Foo\Bar* remain unaffected.

You can also perform a delete operation on the following path: `MyLakehouse\Files\MyShortcut\Foo\Bar`. In this case, if you write permissions in the ADLS Gen2 account, the **Bar** directory is deleted from the ADLS Gen2 account.

## Workspace lineage view

When creating shortcuts between multiple Fabric items within a workspace, you can visualize the shortcut relationships through the workspace lineage view. Select the **Lineage view** button (:::image type="icon" source="media\onelake-shortcuts\lineage-view-button.png":::) in the upper right corner of the Workspace explorer.

:::image type="content" source="media\onelake-shortcuts\lineage-view.png" alt-text="Screenshot of the lineage view screen to visualize shortcut relationship." lightbox="media\onelake-shortcuts\lineage-view.png":::

> [!NOTE]
> The lineage view is scoped to a single workspace. Shortcuts to locations outside the selected workspace don't appear.

## Limitations and considerations

- The maximum number of shortcuts per Fabric item is 100,000. In this context, the term item refers to: apps, lakehouses, warehouses, reports, and more.
- The maximum number of shortcuts in a single OneLake path is 10.
- The maximum number of direct shortcuts to shortcut links is 5.
- ADLS and S3 shortcut target paths can't contain any reserved characters from [RFC 3986 section 2.2](https://www.rfc-editor.org/rfc/rfc3986#section-2.2). For allowed characters, see [RFC 3968 section 2.3](https://www.rfc-editor.org/rfc/rfc3986#section-2.3).
- OneLake shortcut names, parent paths, and target paths can't contain "%" or "+" characters.
- Shortcuts don't support non-Latin characters.
- Copy Blob API isn't supported for ADLS or S3 shortcuts.
- Copy function doesn't work on shortcuts that directly point to ADLS containers. It's recommended to create ADLS shortcuts to a directory that is at least one level below a container.
- More shortcuts can't be created inside ADLS or S3 shortcuts.
- Lineage for shortcuts to Data Warehouses and Semantic Models isn't currently available.
- A Fabric shortcut syncs with the source almost instantly, but propagation time might vary due to data source performance, cached views, or network connectivity issues.
- It might take up to a minute for the Table API to recognize new shortcuts.
- OneLake shortcuts don't support connections to ADLS Gen2 storage accounts that use managed private endpoints. For more information, see [managed private endpoints for Fabric.](../security/security-managed-private-endpoints-overview.md#limitations-and-considerations)

## Related content

- [Create a OneLake shortcut](create-onelake-shortcut.md)
- [Use OneLake shortcuts REST APIs](onelake-shortcuts-rest-api.md)
