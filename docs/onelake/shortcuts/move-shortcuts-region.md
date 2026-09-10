---
title: Move shortcuts to a new region
description: Learn how to relocate OneLake shortcuts to another region by recreating the shortcut definitions in a Fabric workspace in the destination region.
ms.reviewer: eloldag
ms.search.form: Shortcuts
ms.topic: how-to
ms.date: 08/06/2026
ai-usage: ai-assisted
#customer intent: As a data engineer, I want to move my OneLake shortcuts to a new region so that my analytics workloads run in the destination region without losing access to the underlying data.
---

# Move shortcuts to a new region

A shortcut in OneLake is in the same region as the workspace that contains it, so you can't move it to another region on its own. To relocate shortcuts, you need to recreate the shortcut definitions in a Fabric workspace in the destination region. Because shortcuts are logical references to data rather than copies of it, this process moves the references without moving the underlying data.

The location where a shortcut appears is the *shortcut path*. The data location that the shortcut points to is the *target path*. This article uses *destination* for the region and workspace where you recreate the shortcut paths.

In Fabric, [workspaces](../../fundamentals/workspaces.md) reside within a [capacity](../../enterprise/licenses.md#capacity), and each capacity is located in a single region. The capacity you assign a workspace to therefore determines its region. Although you can move some workspaces to another region by reassigning them to a capacity in that region, you must first remove any items that don't support reassignment. For more information, see [Capacity reassignment restrictions and common issues](../../admin/portal-workspace-capacity-reassignment.md).

OneLake shortcuts are objects that live inside a lakehouse or KQL database. Because these items don't support workspace reassignment, moving the existing workspace would require you to remove them and their shortcuts first. This article instead uses a separate destination workspace so that you can keep the original resources available until you validate the recreated shortcuts and downstream consumers.

This article describes how to plan the relocation, recreate your shortcuts in the destination region, update downstream consumers, and validate the result.

## Prerequisites

Before you begin, make sure that:

- A Fabric workspace is provisioned in the destination region.
- Fabric capacity is assigned to the destination workspace.
- You have permissions for Fabric workspace administration and access to the data at the shortcut target paths.
- The shortcut target paths are accessible from the destination region.

## Plan for downtime

This process requires no Fabric platform downtime. However, users might experience temporary data unavailability during the migration window until you recreate the shortcuts and update the connections.

## Prepare

Before you relocate your shortcuts, document the existing configuration and identify downstream dependencies.

### Review the shortcut configuration

1. Identify all shortcuts in the original workspace. To list shortcuts programmatically, call the [List Shortcuts REST API](/rest/api/fabric/core/onelake-shortcuts/list-shortcuts) for each lakehouse or KQL database. To discover those items across the workspace, use the [OneLake catalog and Fabric REST APIs](/rest/api/fabric/articles/onelakecatalog/overview).
1. Document the details of each shortcut, including:
   - Shortcut path in the lakehouse or KQL database.
   - Target type and path.
   - Authentication or credential references.
1. Validate that the data at each target path is accessible.

### Identify downstream dependencies

Identify the workloads that consume shortcut data, such as:

- Power BI semantic models.
- Fabric data agents.
- Fabric notebooks.
- Pipelines.
- SQL analytics endpoints.

To see how items in the workspace consume shortcut data, use the [workspace lineage view](../onelake-shortcuts.md#workspace-lineage-view).

To avoid configuration drift, freeze changes to the shortcut configuration during the migration window.

## Prepare the destination workspace

1. Provision a Fabric workspace in the destination region.
1. Create each destination lakehouse or KQL database that will contain the recreated shortcuts. Recreate any folders needed so that you can use the documented shortcut paths.
1. Configure the required roles to create shortcuts in each destination item. For details, see [Create and delete shortcuts](../onelake-shortcut-security.md#create-and-delete-shortcuts).

## Recreate shortcuts between Fabric workspaces

Recreate the internal OneLake shortcuts in the destination workspace by using the Fabric portal or the REST API.

To recreate a shortcut in the Fabric portal, follow the steps in the create article for that source, such as [Create an internal OneLake shortcut](create-onelake-shortcut.md), [Create an Azure Data Lake Storage Gen2 shortcut](../create-adls-shortcut.md), or [Create an Amazon S3 shortcut](../create-s3-shortcut.md). For the full list of supported external sources, see [Types of shortcuts](../onelake-shortcuts.md#types-of-shortcuts).

For workspaces with many shortcuts, which is common in cross-region relocation, use the [OneLake shortcuts REST API](/rest/api/fabric/core/onelake-shortcuts) instead of the portal. The REST API supports programmatic creation and is more efficient to automate at scale.

### Recreate shortcuts to external storage

External storage connections, such as Azure Data Lake Storage (ADLS) Gen2 and Amazon S3, are tenant-scoped and aren't bound to a specific Fabric region. Reuse the connections you created in the original workspace when you recreate shortcuts in the destination workspace. You don't need to recreate credentials or connection objects because of the cross-region relocation, as long as the underlying storage account or bucket doesn't change.

If the external storage account is in a different region from the destination Fabric capacity, every query pulls data across the region boundary at cross-region latency and egress pricing. Where possible, align the storage account region with the destination Fabric capacity region to avoid these costs.

## Update downstream consumers

The recreated shortcuts and their containing items are new resources, even when their names, shortcut paths, and target paths match the original resources. Before validation, update downstream items so that they use the destination workspace and items.

1. Update data source bindings for downstream items, including semantic models and Fabric data agents, so that they use the destination items and recreated shortcuts.
1. Update hard-coded references, such as workspace IDs, item IDs, lakehouse names, and folder paths, in notebooks, pipelines, and semantic models.
1. Refresh cached metadata or schemas in downstream items so that they discover the recreated shortcuts.
1. Configure the required permissions needed to access the new shortcuts. Consumers need Read access to the shortcut path. The target paths don't move, so those existing permissions don't need to be recreated. For details, see [Shortcut authentication models](../onelake-shortcut-security.md#shortcut-auth-models).

Keep the original workspace and shortcuts available during validation. If you encounter issues, point consumers back to the original workspace.

## Validate

After you update downstream dependencies, validate the recreated shortcuts and the consumers that now reference them. Keep the original workspace intact until you complete validation and confirm that the destination environment is healthy.

### Validate the shortcuts

- Confirm that the shortcuts resolve successfully.
- Validate schema and metadata visibility.
- For shortcuts in a lakehouse, confirm that you can query the data through the lakehouse, SQL analytics endpoint, or Apache Spark.
- For shortcuts in a KQL database, confirm that you can query the data by using the [`external_table()` function](/kusto/query/external-table-function).
- Confirm that you recreated every shortcut by comparing the shortcut count in the destination workspace against your original inventory with the [List Shortcuts REST API](/rest/api/fabric/core/onelake-shortcuts/list-shortcuts).

### Validate downstream consumers

- Validate Power BI queries, and refresh the semantic models that depend on the shortcut data. Confirm that each semantic model uses the recreated shortcut. For refresh options, see [Data refresh in Power BI](/power-bi/connect-data/refresh-data).
- Validate Fabric data agent responses against each rebound data source.
- Validate the notebooks and pipelines that consume shortcut data.
- Validate the end-to-end analytics workflows.
- Review data access through the recreated shortcuts with [OneLake Diagnostics](../onelake-diagnostics-overview.md) or the Fabric [audit log](../../admin/track-user-activities.md).

> [!NOTE]
> Review the region requirements and behavior of Direct Lake semantic models before you update their data source bindings. Depending on your configuration, you might need to rebind or recreate a semantic model that depends on a destination lakehouse. For more information, see [Direct Lake overview](../../fundamentals/direct-lake-overview.md).

## Clean up the original resources

Get functional and business sign-off before you clean up the original resources.

After a successful migration and validation:

1. Remove the shortcuts from the original workspace. To delete shortcuts programmatically, use the [Delete Shortcut REST API](/rest/api/fabric/core/onelake-shortcuts/delete-shortcut). For the portal steps, see [Edit or delete a shortcut](edit-delete-shortcut.md).
1. Archive the shortcut configuration documentation.
1. Update your architecture diagrams and standard operating procedures.

> [!IMPORTANT]
> Remove the original shortcuts only after validation and business approval.

## Limitations

- OneLake shortcuts don't support direct cross-region relocation. You must recreate the shortcut definitions in the destination workspace.
- Shortcut metadata history isn't preserved after relocation.
- Write support varies by shortcut type. OneLake and ADLS Gen2 shortcuts support both read and write operations, including writing to Delta tables and files. Amazon S3 and Google Cloud Storage shortcuts are read-only.
- In the lakehouse **Tables** folder, you can create shortcuts only at the top level. Shortcuts in subdirectories of the **Tables** folder aren't supported.
- Shortcuts are symbolic links that are independent of their targets. A shortcut breaks if the target path is moved, renamed, or deleted.
- Deleting a shortcut removes only the shortcut object. The data at the target location isn't affected.
- Shortcuts aren't a disaster recovery or failover solution. Cross-region access to external data sources might introduce latency and data egress costs, depending on the storage location.

## Related content

- [OneLake shortcuts](../onelake-shortcuts.md)
- [Edit or delete a shortcut](edit-delete-shortcut.md)
- [OneLake shortcut security](../onelake-shortcut-security.md)
- [Manage connections for shortcuts](../manage-shortcut-connections.md)
