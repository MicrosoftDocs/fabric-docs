---
title: Understand dependency binding in cross-workspace deployment
description: Learn how Fabric items reference their dependencies using logical IDs or object IDs, and how this affects cross-workspace deployment with Git integration.
ms.reviewer: NimrodShalit
ms.topic: concept-article
ms.date: 05/14/2026
ms.search.form: cross-workspace deployment, logical ID, object ID, Git integration, dependency binding
---

# Understand dependency binding in cross-workspace deployment

When you deploy Microsoft Fabric items across workspaces (for example, from Development to Test to Production), dependencies between items can break. Some items store references to their dependencies as **object IDs** (workspace-specific GUIDs), while others use **logical IDs** (cross-workspace portable identifiers stored in the `.platform` file).

Items that use logical IDs in their definitions bind correctly to the corresponding item in the target workspace. Items that use object IDs remain pointed at the source workspace, which breaks the deployment.

This article maps which Fabric item types support dependency binding through logical IDs when you use [Git integration](./git-integration/intro-to-git-integration.md), and which don't. To learn more about logical IDs and how items are represented in source control, see [Logical ID in Fabric](./git-integration/source-code-format.md#platform-file).

## Key concepts

- **Logical ID**: An automatically generated cross-workspace identifier in the [`.platform` file](./git-integration/source-code-format.md#platform-file). Items with the same logical ID are treated as the same item across workspaces.
- **Object ID**: A workspace-specific GUID that identifies a particular instance. Object IDs don't survive cross-workspace deployment without manual intervention or parameterization.
- **Dependency binding (Git)**: When you sync a Git branch to a new workspace, Fabric resolves dependency references using logical IDs, automatically pointing to the correct item in the target workspace.
- **By name or by URI**: Some items reference dependencies by display name or URI rather than by ID. These references might or might not resolve correctly, depending on naming conventions across workspaces.

## How dependency binding works

Within a workspace, items reference their dependencies using object IDs. When Fabric exports an item to Git, it replaces some of these object IDs with logical IDs from the `.platform` file. When you sync the Git branch to a different workspace, Fabric resolves those logical IDs back to the correct object IDs in the target workspace. This is what makes dependency binding work.

However, not all dependency references are replaced with logical IDs during export. Items that keep object IDs in their Git representation still point to the original workspace after sync, and you need to update them manually or through parameterization.

> [!IMPORTANT]
> Dependency binding only applies to references between Fabric items within the **same workspace**. If an item references a Fabric item in a **different workspace**, that reference uses an object ID and doesn't bind automatically. References to **Connections** (data source connections, gateways) also don't auto-bind. Use [Variable Libraries](./variable-library/variable-library-overview.md) with environment-specific value sets to manage connection references across environments.

## Dependency binding compatibility

The following tables show whether each Fabric item type's dependencies bind correctly when you deploy across workspaces. Currently, this article covers [Git integration](./git-integration/intro-to-git-integration.md) behavior. Because binding is determined by how each item stores its dependency references in its definition, the same behavior applies to other deployment mechanisms that reuse those definitions, such as deployment pipelines and the import (bulk) APIs.

These tables assume the dependency is another item in the **same workspace** as the source item. A reference to an item in a **different workspace** never auto-binds. It stays pinned to the source object ID regardless of the value shown in the table.

The **Auto-bind in Git** column indicates:

- **Yes**: The item definition in Git stores the dependency reference as a logical ID. When you sync the branch to a new workspace, the reference binds automatically to the matching item in that workspace.
- **No**: The item definition in Git stores the dependency reference as an object ID (workspace-specific GUID). The reference continues to point to the source workspace after sync. You need to manually update or parameterize it for cross-workspace deployment.
- **Partial**: The item resolves the dependency by name or URI, which might work if naming is consistent across workspaces.

### Notebooks

| Dependency | Auto-bind in Git | Notes |
|---|---|---|
| Lakehouse | Yes | Requires enabling "Lakehouse Auto-Binding in Git" in the notebook settings. When enabled, the object ID is replaced with a logical ID in `notebook-settings.json`. This setting is off by default. For more information, see [Lakehouse auto-binding in Git](../data-engineering/notebook-source-control-deployment.md#lakehouse-auto-binding-in-git). |
| Environment | Yes | |
| Mirrored Database | No | |

> [!NOTE]
> Notebook to Lakehouse binding isn't enabled by default. You need to turn on the "Lakehouse Auto-Binding in Git" setting in each notebook's settings. For more information, see [Notebook source control and deployment](../data-engineering/notebook-source-control-deployment.md#lakehouse-auto-binding-in-git).

### Reports

| Dependency | Auto-bind in Git | Notes |
|---|---|---|
| Semantic Model (from Power BI report) | Partial | The report references the model through a relative `byPath` reference in `definition.pbir`, not an explicit logical ID. It resolves correctly when the model deploys to the same relative location in the target workspace, but doesn't bind through a logical ID. For more information, see [Power BI Desktop projects report folder](/power-bi/developer/projects/projects-report). |
| Semantic Model (from paginated report) | No | The report's connection string references the semantic model by a workspace-specific ID that isn't rewritten on deployment, so it stays pointed at the source model. You need to update this reference for cross-workspace deployment. (Reports authored in Report Builder that reference the model by name might instead resolve by display name, which is Partial.) |

### Pipeline

| Dependency | Auto-bind in Git | Notes |
|---|---|---|
| Pipeline | Yes | |
| Notebook | Yes | |
| Dataflow Gen2 | Yes | |
| SQL Database | Yes | |
| Spark Job Definition | No | The SparkJobDefinition activity references the Spark Job Definition by object ID, not logical ID, so it stays pointed at the source item after deployment. You need to parameterize this value for cross-workspace deployment. |
| Lakehouse | Yes | |
| Semantic Model | No | PBISemanticModelRefresh activity references the semantic model by item ID, not logical ID. You need to parameterize this value for cross-workspace deployment. |
| Warehouse | No | The Warehouse `artifactId` resolves through the logical ID and rebinds, but the `linkedService` also stores the source workspace's SQL `endpoint`, which isn't rewritten. Parameterize the `endpoint` for cross-workspace deployment. |

### Semantic models

| Dependency | Auto-bind in Git | Notes |
|---|---|---|
| Semantic Model | Partial | Chained or composite model references use connection strings by name. |
| SQL Endpoint Analytics (Lakehouse) | No | The Direct Lake connection string in TMDL `expressions.tmdl` contains a workspace-specific endpoint URL and database GUID. You need to replace these parameters for cross-workspace deployment. |
| KQL Database | No | The connection string with a cluster URI in TMDL expressions contains workspace-specific values. |
| SQL Database | No | The connection string in TMDL expressions contains workspace-specific values. |
| Warehouse | No | The connection to the Warehouse SQL endpoint uses a workspace-specific URL. |

### Lakehouses

| Dependency | Auto-bind in Git | Notes |
|---|---|---|
| Lakehouse (shortcut) | Yes | Internal OneLake shortcuts that point to another Fabric item, such as a lakehouse or warehouse, are stored as a logical ID and rebind to the target-workspace item. Shortcuts to external sources, such as Azure Data Lake Storage Gen2 or Amazon S3, point outside Fabric and carry a connection reference instead, so they aren't subject to logical-ID binding. For the full list of shortcut targets, see [OneLake shortcuts](../onelake/onelake-shortcuts.md). For deployment behavior, see [Lakehouse Git integration and deployment pipelines](../data-engineering/lakehouse-git-deployment-pipelines.md). |

### Dataflows (Gen2)

By default, Dataflow Gen2 creates absolute references to Fabric items: the query stores the source workspace ID and the item's object ID, which aren't rewritten on deployment. A **source** reference can instead use a [relative reference](../data-factory/dataflow-gen2-relative-references.md): when you select an item under the **!(Current Workspace)** node in a Fabric connector, the query stores the item by name (no GUIDs), and it resolves to the matching item in the target workspace on deployment. Output **destinations** always use absolute references and don't rebind. For destinations, and for any absolute source reference, parameterize the values for cross-workspace deployment. For more information, see [Relative references with Fabric connectors in Dataflow Gen2](../data-factory/dataflow-gen2-relative-references.md) and [Dataflow Gen2 with CI/CD and Git integration](../data-factory/dataflow-gen2-cicd-and-git-integration.md).

**Source references:**

| Dependency | Auto-bind in Git | Notes |
|---|---|---|
| Lakehouse | Partial | Rebinds only when authored as a relative reference (**!(Current Workspace)**); the default absolute reference doesn't rebind. |
| Warehouse | Partial | Rebinds only when authored as a relative reference (**!(Current Workspace)**); the default absolute reference doesn't rebind. |

**Destination references:**

| Dependency | Auto-bind in Git | Notes |
|---|---|---|
| Lakehouse | No | |
| Warehouse | No | |
| SQL Database | No | |

### Spark Job Definitions

| Dependency | Auto-bind in Git | Notes |
|---|---|---|
| Environment | Yes | |
| Lakehouse | No | The `defaultLakehouseArtifactId` uses an object ID. |

### Copy Jobs

| Dependency | Auto-bind in Git | Notes |
|---|---|---|
| Lakehouse | Yes | |
| Warehouse | No | The Warehouse `artifactId` resolves through the logical ID and rebinds, but the `linkedService` also stores the source workspace's SQL `endPoint`, which isn't rewritten. Parameterize the `endPoint` for cross-workspace deployment. |
| SQL Database | Yes | |

### GraphQL APIs

| Dependency | Auto-bind in Git | Notes |
|---|---|---|
| SQL Endpoint | Yes | |
| Warehouse | Yes | |
| SQL Database | Yes | |

For all GraphQL API data sources, you might need to reconfigure the connection and credentials after deployment.

### Eventstreams

| Dependency | Auto-bind in Git | Notes |
|---|---|---|
| Lakehouse | Yes | |
| Eventhouse | Yes | All destinations are fully supported for CI/CD when items are in the same workspace. For Eventhouse with Direct Ingestion mode, you might need to manually reconfigure the connection after deployment. For more information, see [Eventstream CI/CD](../real-time-intelligence/event-streams/eventstream-cicd.md). |
| Activator (Reflex) | Yes | All destinations are fully supported for CI/CD when items are in the same workspace. For more information, see [Eventstream CI/CD](../real-time-intelligence/event-streams/eventstream-cicd.md). |

### KQL items

| Dependency | Auto-bind in Git | Notes |
|---|---|---|
| KQL Database to Eventhouse | Yes | The `parentEventhouseItemId` in `DatabaseProperties.json` is a logical ID and binds to the target Eventhouse. A KQL database deploys as a child of its parent Eventhouse. |
| KQL Queryset to KQL Database | Partial | Resolves through `clusterUri` and `databaseName`, not the item ID. The definition includes a `databaseItemId`, but it's an object ID that doesn't rebind, so resolution depends on the URI across environments. |
| Real-Time Dashboard to KQL Database | Partial | Uses a `dataSources` array with cluster URIs. Same pattern as KQL Queryset. |

### Warehouses

| Dependency | Auto-bind in Git | Notes |
|---|---|---|
| Warehouse (cross-reference) | No | References to other warehouses use object IDs. |
| SQL Endpoint | No | SQL Endpoint references use workspace-specific identifiers. |

### Variable Libraries

| Dependency | Auto-bind in Git | Notes |
|---|---|---|
| Fabric items (ItemReference type) | No | The `ItemReference` variable type stores `workspaceId` and `itemId` as raw GUIDs. You must manually update or override these values through value sets per environment. |

### Items with no dependencies

The following items have no cross-workspace dependency binding concerns:

- Environment
- SQL Database
- Eventhouse (container item; KQL Databases reference it)
- Mirrored Database (external source configuration only)

## Summary

When you deploy Fabric items across workspaces, dependencies between items can break if the references are stored as workspace-specific object IDs instead of portable logical IDs. Not all item types support dependency binding through logical IDs. Before you set up cross-workspace deployment, review the compatibility tables in this article to identify which dependencies bind automatically and which require manual parameterization.

## Related content

- [CI/CD workflow options in Fabric](./manage-deployment.md)
- [Introduction to Git integration](./git-integration/intro-to-git-integration.md)
- [Git integration source code format](./git-integration/source-code-format.md)
- [Logical ID conflict resolution](./git-integration/logical-id-conflict-resolution.md)
