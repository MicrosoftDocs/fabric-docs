---
title: Shortcuts in a lakehouse
description: Learn how to use shortcuts in a Fabric lakehouse to reference data from internal and external sources without copying it.
ms.reviewer: tvilutis
ms.topic: concept-article
ms.date: 02/24/2026
ms.update-cycle: 180-days
ms.search.form: Lakehouse shortcuts
#customer intent: As a data engineer, I want to create and manage shortcuts in a Fabric lakehouse to reference data from various sources without copying it.
---

# Shortcuts in a lakehouse

Shortcuts let you reference data in a lakehouse without copying it. Instead of ingesting data from another source, you create a pointer that makes the data appear as a local folder or table. This approach is useful when you want to:

- Query data from other lakehouses, warehouses, or workspaces without duplication.
- Access external storage (for example, ADLS Gen2 or Amazon S3) directly from your lakehouse.
- Combine data from multiple sources into a single lakehouse view without moving it.
- Reduce storage costs and avoid data staleness from redundant copies.

For a full conceptual overview of shortcuts, including caching, security, and limitations, see [OneLake shortcuts](../onelake/onelake-shortcuts.md).

## Where to place shortcuts in a lakehouse

A lakehouse has two top-level folders — **Tables** and **Files** — and shortcuts behave differently in each:

- **Tables** — Shortcuts must be created at the top level (no subdirectories). If the shortcut target contains Delta-formatted data, the lakehouse automatically recognizes it as a table. You can then query it through both Spark and the SQL analytics endpoint.
- **Files** — Shortcuts can be created at any level of the folder hierarchy. Data in the Files section isn't automatically registered as a table, but Spark can read it directly for data science or transformation workloads.

> [!TIP]
> Use the **Tables** section for structured data you want to query with SQL. Use the **Files** section for raw or semi-structured data you plan to process with Spark.

| Location | Menu option | What it creates |
|---|---|---|
| **Tables** section | **New table shortcut** | A shortcut to a single Delta table, automatically registered as a table in the lakehouse. |
| **Tables** section | **New schema shortcut** | A shortcut to a folder containing multiple Delta tables, which appear as a new schema in the lakehouse. For more information, see [Lakehouse schemas](lakehouse-schemas.md#bring-multiple-tables-with-schema-shortcut). |
| **Files** section | **New shortcut** | A shortcut to any folder, in any format. Data isn't automatically registered as a table. |

## Supported shortcut sources

You can create shortcuts to both internal Fabric items and external storage systems.

**Internal sources** (use the calling user's identity for authorization):

- Lakehouses
- Warehouses
- KQL databases
- Mirrored databases
- Mirrored Azure Databricks Catalogs
- SQL databases
- Semantic models

**External sources** (use a cloud connection with stored credentials):

- [Azure Data Lake Storage Gen2](../onelake/create-adls-shortcut.md)
- [Azure Blob Storage](../onelake/create-blob-shortcut.md)
- [Amazon S3](../onelake/create-s3-shortcut.md)
- [Amazon S3 compatible storage](../onelake/create-s3-compatible-shortcut.md)
- [Google Cloud Storage](../onelake/create-gcs-shortcut.md)
- [Dataverse](../onelake/create-dataverse-shortcut.md)
- [OneDrive and SharePoint](../onelake/create-onedrive-sharepoint-shortcut.md)
- [On-premises or network-restricted locations](../onelake/create-on-premises-shortcut.md) (through the on-premises data gateway)
- [Iceberg tables](../onelake/onelake-iceberg-tables.md)

## Create a shortcut

To create a shortcut, open a lakehouse and go to the **Explorer** view. Select the ellipsis (**...**) next to **Tables** or **Files**. The menu label depends on where you create the shortcut:

The following example shows creating a shortcut in the **Files** section. 

:::image type="content" source="media\lakehouse-shortcuts\create-lakehouse-shortcut.png" alt-text="Screenshot showing the New shortcut option in the Files section of the lakehouse explorer." lightbox="media\lakehouse-shortcuts\create-lakehouse-shortcut.png":::

For detailed step-by-step instructions for each source type, see [Create an internal OneLake shortcut](../onelake/create-onelake-shortcut.md) or select one of the external source links in the [Supported shortcut sources](#supported-shortcut-sources) section.

> [!NOTE]
> External Delta tables created with Spark code aren't automatically visible in the SQL analytics endpoint. Create a shortcut in the **Tables** section to make external Delta tables available for SQL queries. For more information, see [OneLake shortcuts](../onelake/onelake-shortcuts.md).

## When to use shortcuts vs. copying data

| **Scenario** | **Recommended approach** |
|---|---|
| Data is already in Fabric (another lakehouse, warehouse, or workspace) | Shortcut — avoids duplication and keeps data in sync |
| Data is in external cloud storage and you need near-real-time access | Shortcut — no ingestion pipeline to maintain |
| Data needs complex transformations before use | Copy — use pipelines, dataflows, or notebooks to transform and load |
| Compliance or security requires data to reside in a specific region | Copy — shortcuts don't move data, so the data stays in its source region |
| You need full control over schema evolution and table maintenance | Copy — Delta table maintenance operations only work on local tables |

For other ways to bring data into a lakehouse, see [Options to get data into the Lakehouse](load-data-lakehouse.md).

## Access control

- **Internal shortcuts** use the calling user's identity. The user must have read permissions on the shortcut target to access the data.
- **External shortcuts** use the cloud connection credentials specified when the shortcut is created. Any user with access to the lakehouse can read data through the shortcut using those stored credentials.

For full details on shortcut permissions, see [OneLake shortcut security](../onelake/onelake-shortcut-security.md).

## Related content

- [OneLake shortcuts](../onelake/onelake-shortcuts.md)
- [Create an internal OneLake shortcut](../onelake/create-onelake-shortcut.md)
- [Options to get data into the Lakehouse](load-data-lakehouse.md)
- [Eventhouse OneLake availability](../real-time-intelligence/event-house-onelake-availability.md)
