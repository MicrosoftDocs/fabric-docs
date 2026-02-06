---
title: Unify data sources with OneLake shortcuts
description: OneLake shortcuts provide a way to connect to existing data without having to directly copy it. Learn how to use them.
ms.reviewer: eloldag
ms.author: kgremban
author: kgremban
ms.search.form: Shortcuts
ms.topic: concept-article
ms.custom:
ms.date: 01/08/2026
#customer intent: As a data engineer, I want to learn how to use OneLake shortcuts so that I can unify data sources and have OneLake manage the permissions.
---

# OneLake shortcuts

Shortcuts in Microsoft OneLake unify your data across domains, clouds, and accounts by making OneLake the single virtual data lake for your entire enterprise. Fabric experiences and analytical engines can connect to your existing data sources including Azure, Amazon Web Services (AWS), and OneLake through a unified namespace. OneLake manages all permissions and credentials, so you don't need to separately configure each Fabric workload to connect to each data source. Additionally, you can use shortcuts to eliminate edge copies of data and reduce process latency associated with data copies and staging.

## What are shortcuts?

Shortcuts are objects in OneLake that point to other storage locations. The location can be internal or external to OneLake. The location that a shortcut points to is the *target path* of the shortcut. The location where the shortcut appears is the *shortcut path*.

Shortcuts appear as folders in OneLake and any workload or service that has access to OneLake can use them. Shortcuts behave like symbolic links. They're an independent object from the target. If you delete a shortcut, the target remains unaffected. If you move, rename, or delete a target path, the shortcut can break.

:::image type="content" source="media\onelake-shortcuts\shortcut-connects-other-location.png" alt-text="Diagram showing how a shortcut connects files and folders stored in other locations." lightbox="media\onelake-shortcuts\shortcut-connects-other-location.png":::

## Where can I create shortcuts?

You can create shortcuts in lakehouses and Kusto Query Language (KQL) databases.

You can use the Fabric portal to create shortcuts interactively, and you can use the [REST API](/rest/api/fabric/core/onelake-shortcuts) to create shortcuts programmatically.

### Lakehouse

When creating shortcuts in a lakehouse, you must understand the folder structure of the item. Lakehouses have two top-level folders: the **Tables** folder and the **Files** folder. The tables folder is for structured datasets. The files folder is for unstructured or semi-structured data.

In the tables folder, you can create shortcuts only at the top level. OneLake doesn't support shortcuts in subdirectories of the tables folder. Shortcuts in the tables section typically point to internal sources within OneLake or link to other data assets that conform to the Delta table format. If the target of the shortcut contains data in the Delta Parquet format, the lakehouse automatically synchronizes the metadata and recognizes the folder as a table. Shortcuts in the tables section can link to either a single table or a schema, which is a parent folder for multiple tables.

> [!NOTE]
> The Delta format doesn't support tables with space characters in the name. OneLake doesn't recognize any shortcut containing a space in the name as a Delta table in the lakehouse.

In the files folder, there are no restrictions on where you can create shortcuts. You can create shortcuts at any level of the folder hierarchy. Table discovery doesn't happen in the files folder. Shortcuts here can point to either internal OneLake and external storage systems with data in any format.

:::image type="content" source="media\onelake-shortcuts\lake-view-table-view.png" alt-text="Diagram showing the Files view and the Tables view side by side.":::

### KQL Database

When you create a shortcut in a KQL database, it appears in the **Shortcuts** folder of the database. The KQL database treats shortcuts like external tables. To query the shortcut, use the `external_table` function of the Kusto Query Language.

:::image type="content" source="media\onelake-shortcuts\shortcut-kql-database.png" alt-text="Screenshot of shortcuts inside a KQL database.":::

## Where can I access shortcuts?

Any Fabric or non-Fabric service that can access data in OneLake can use shortcuts. Shortcuts are transparent to any service accessing data through the OneLake API. Shortcuts just appear as another folder in the lake. Apache Spark, SQL, Real-Time Intelligence, and Analysis Services can all use shortcuts when querying data.

### Apache Spark

Apache Spark notebooks and Apache Spark jobs can use shortcuts that you create in OneLake. Use relative file paths to read data directly from shortcuts. Additionally, if you create a shortcut in the **Tables** section of the lakehouse and it is in the Delta format, you can read it as a managed table using Apache Spark SQL syntax.

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

### Non-Fabric services

Applications and services outside of Fabric can also access shortcuts through the OneLake API. OneLake supports a subset of the ADLS Gen2 and Blob storage APIs. To learn more about the OneLake API, see [OneLake access with APIs](onelake-access-api.md).

```HTTP
https://onelake.dfs.fabric.microsoft.com/MyWorkspace/MyLakhouse/Tables/MyShortcut/MyFile.csv
```

## Types of shortcuts

OneLake shortcuts support multiple filesystem data sources. These sources include internal OneLake locations and external or non-Microsoft sources.

You can also [create shortcuts to on-premises or network-restricted locations](create-on-premises-shortcut.md) by using the Fabric on-premises data gateway (OPDG).

### Internal OneLake shortcuts

Use internal OneLake shortcuts to reference data within existing Fabric items, including:

* KQL databases
* Lakehouses
* Mirrored Azure Databricks Catalogs
* Mirrored Databases
* Semantic models
* SQL databases
* Warehouses

For instructions to create an internal shortcut, see [Create an internal OneLake shortcut](./create-onelake-shortcut.md).

The shortcut can point to a folder location within the same item, across items within the same workspace, or even across items in different workspaces. When you create a shortcut across items, the item types don't need to match. For example, you can create a shortcut in a lakehouse that points to data in a data warehouse.

When a user accesses data from another OneLake location through a shortcut, OneLake uses the identity of the calling user to authorize access to the data. This user must have permissions in the target location to read the data.

> [!IMPORTANT]
> When users access shortcuts through Power BI semantic models using **DirectLake over SQL** or T-SQL engines in **Delegated identity mode**, the calling user's identity isn't passed through to the shortcut target. Instead, the calling item's owner's identity is passed, which delegates access to the calling user. To resolve this limitation, use Power BI semantic models in **DirectLake over OneLake** mode or T-SQL in **User identity mode**.

### External OneLake shortcuts

For detailed instructions to create a specific shortcut type, select an article from this list of supported external sources:

* [Amazon S3 shortcuts](./create-s3-shortcut.md)
* [Amazon S3 compatible shortcuts](./create-s3-compatible-shortcut.md)
* [Azure Data Lake Storage (ADLS) Gen 2 shortcuts](./create-adls-shortcut.md)
* [Azure Blob Storage shortcuts](./create-blob-shortcut.md)
* [Dataverse shortcuts](./create-dataverse-shortcut.md)
* [Google Cloud Storage shortcuts](./create-gcs-shortcut.md)
* [Iceberg shortcuts](./onelake-iceberg-tables.md)
* [OneDrive and SharePoint shortcuts](./create-onedrive-sharepoint-shortcut.md)

## Caching

Shortcut caching can reduce egress costs associated with cross-cloud data access. As OneLake reads files through an external shortcut, the service stores the files in a cache for the Fabric workspace. OneLake responds to subsequent read requests from the cache rather than the remote storage provider. You can set the retention period for cached files between 1-28 days. Each time you access the file, the retention period is reset. If the remote storage provide has a more recent version of the file than the cache's version, then OneLake serves the request from the remote storage provider and updates the file in the cache. If you don't access a file within the selected retention period, it's purged from the cache. Individual files greater than 1 GB in size aren't cached.

> [!NOTE]
> Shortcut caching currently supports Google Cloud Storage (GCS), S3, S3 compatible, and on-premises data gateway shortcuts.

To enable caching for shortcuts, open the **Workspace settings** panel. Choose the **OneLake** tab. Toggle the cache setting to **On** and select the **Retention Period**.

You can clear the cache at any time. From the same settings page, select the **Reset cache** button. This action removes all files from the shortcut cache in this workspace.

:::image type="content" source="media\onelake-shortcuts\shortcut-cache-settings.png" alt-text="Screenshot of workspace settings panel with OneLake tab selected." lightbox="media\onelake-shortcuts\shortcut-cache-settings.png":::

## How shortcuts use cloud connections

ADLS and S3 shortcuts delegate authorization by using cloud connections. When you create a new ADLS or S3 shortcut, you either create a new connection or select an existing connection for the data source. Setting a connection for a shortcut is a bind operation. Only users with permission on the connection can perform the bind operation. If you don't have permission on the connection, you can't create new shortcuts using that connection.

For more information about viewing and updating cloud connections, see [Manage connections for shortcuts](./manage-shortcut-connections.md).

## Shortcut security

Shortcuts require certain permissions to manage and use. [OneLake shortcut security](./onelake-shortcut-security.md) explains the permissions you need to create shortcuts and access data through them.

## How do shortcuts handle deletions?

Shortcuts don't support cascading deletes. When you delete a shortcut, you only delete the shortcut object. The data in the shortcut target stays unchanged. However, if you delete a file or folder within a shortcut, and you have permissions in the shortcut target to perform the delete operation, you also delete the file or folder in the target.

For example, consider a lakehouse with the following path in it: `MyLakehouse\Files\MyShortcut\Foo\Bar`. **MyShortcut** is a shortcut that points to an ADLS Gen2 account that contains the *Foo\Bar* directories.

If you delete `MyLakehouse\Files\MyShortcut`, you delete the **MyShortcut** shortcut from the lakehouse but the files and directories in the ADLS Gen2 account *Foo\Bar* stay unaffected.

If you delete `MyLakehouse\Files\MyShortcut\Foo\Bar`, and you have write permissions in the ADLS Gen2 account, you delete the **Bar** directory from the ADLS Gen2 account.

## Workspace lineage view

When you create shortcuts between multiple Fabric items within a workspace, you can visualize the shortcut relationships through the workspace lineage view. Select the **Lineage view** button (:::image type="icon" source="media\onelake-shortcuts\lineage-view-button.png":::) in the upper right corner of the Workspace explorer.

:::image type="content" source="media\onelake-shortcuts\lineage-view.png" alt-text="Screenshot of the lineage view screen to visualize shortcut relationship." lightbox="media\onelake-shortcuts\lineage-view.png":::

> [!NOTE]
> The lineage view is scoped to a single workspace. Shortcuts to locations outside the selected workspace don't appear.

## Limitations and considerations

* Each Fabric item supports up to 100,000 shortcuts. In this context, the term item refers to apps, lakehouses, warehouses, reports, and more.
* A single OneLake path supports up to 10 shortcuts.
* The maximum number of direct shortcuts to shortcut links is 5.
* OneLake shortcut names, parent paths, and target paths can't contain "%" or "+" characters.
* Shortcuts don't support non-Latin characters.
* Lineage for shortcuts to Data Warehouses and Semantic Models isn't currently available.
* A Fabric shortcut syncs with the source almost instantly, but propagation time might vary due to data source performance, cached views, or network connectivity issues.
* It might take up to a minute for the Table API to recognize new shortcuts.

## Related content

- [Create a OneLake shortcut](create-onelake-shortcut.md)
- [Use OneLake shortcuts REST APIs](/rest/api/fabric/core/onelake-shortcuts)
