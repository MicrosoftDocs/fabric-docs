---
title: Relative references with Fabric connectors in Dataflow Gen2
description: Understand how relative references work with Fabric connectors in Dataflow Gen2 and how they help create CI/CD-ready solutions across workspaces.
author: ptyx507x
ms.author: miescobar
ms.service: fabric
ms.topic: conceptual
ms.date: 02/23/2026
ai-usage: ai-assisted
---

# Relative references with Fabric connectors in Dataflow Gen2

>[!NOTE]
>The contents of this article applies to [Dataflow Gen2 with CI/CD support](dataflow-gen2-cicd-and-git-integration.md).

Dataflow Gen2 is designed to support solutions that can be developed, validated, and deployed across environments without requiring manual script changes. To support this goal, Fabric connectors in Dataflow Gen2 use **relative references** to resolve workspace artifacts at runtime.

Relative references allow Dataflow queries to bind to Fabric items based on their **names within the current workspace**, rather than relying on environment-specific identifiers such as workspace IDs or item IDs.

## Fabric connectors and workspace context

Fabric connectors, such as [Lakehouse](connector-lakehouse.md), [Warehouse](connector-data-warehouse.md), and [SQL Database](connector-sql-database.md), expose a navigation experience that allows users to browse and select items they have access to. When a Dataflow Gen2 is authored, it always runs within the context of a specific workspace.

Relative references take advantage of this workspace context by resolving artifact paths relative to the workspace where the Dataflow is located.

In the connector navigation dialog, this context is represented by a **!(Current Workspace)** node. Selecting items under this node indicates that the Dataflow should resolve those items from the workspace in which it is executed.

![Screenshot of !(Current Workspace) node in the Lakehouse connector](media/connector-lakehouse/lakehouse-relative-reference-current-workspace.png)

## How relative references are represented in queries

When a Fabric connector uses relative references, the generated Power Query (M) script does not include absolute identifiers such as:

- Workspace IDs
- Lakehouse IDs
- Warehouse IDs

Instead, the script references artifacts by their **item names**, which are unique within a workspace.

As a result, the query logic describes *what* item to access rather than *where* that item exists in a specific environment.

## Behavior across environments

Because relative references are resolved at runtime using the current workspace context, the same Dataflow Gen2 definition can be used across multiple environments, such as:

- Development
- Test
- Production

As long as the target workspace contains items with matching names, the Dataflow continues to function without modification. No changes to the Power Query script are required when deploying through Fabric deployment pipelines.

This behavior makes relative references suitable for enterprise ALM and CI/CD workflows.

## Relationship to other CI/CD capabilities

Relative references complement existing Dataflow Gen2 capabilities that support environment-independent solutions, including:

- [**Public parameters**](dataflow-parameters.md), which allow values to be supplied or overridden per environment
- [**Fabric variable libraries**](dataflow-gen2-variable-library-integration.md), which provide centralized, workspace-scoped configuration values

Together, these features enable Dataflow Gen2 solutions to remain portable, predictable, and aligned with deployment pipeline practices.

## When to use relative references

Relative references are appropriate when:

- A Dataflow is expected to move across multiple workspaces
- Fabric items (such as Lakehouses or Warehouses) are recreated per environment
- Script-level changes during deployment should be avoided

If a Dataflow must target a specific artifact in a fixed workspace, absolute references may still be used. The choice depends on the intended lifecycle and deployment model of the solution.

## Summary

Relative references provide a way for Fabric connectors in Dataflow Gen2 to resolve workspace artifacts based on context rather than fixed identifiers. By relying on item names within the current workspace, Dataflows can be deployed across environments without script changes, supporting consistent and maintainable CI/CD workflows.