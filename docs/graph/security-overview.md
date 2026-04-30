---
title: Graph Security Overview
description: Manage security for graph in Microsoft Fabric. Understand workspace roles, permissions, and access control for graph models and QuerySets.
#customer intent: As a Fabric user, I want to understand the security model for graph in Microsoft Fabric so that I can manage access control for my graph data.
ms.topic: concept-article
ms.date: 03/31/2026
ms.reviewer: wangwilliam
---

# Security overview for graph in Microsoft Fabric

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

Security for graph in Microsoft Fabric is a set of platform-wide controls that manage who can create, modify, view, and share graph models and QuerySets. Graph follows the security requirements of Microsoft Fabric's platform-wide security model.

## Workspace roles and permissions for graph

Graph uses the same workspace roles as other Microsoft Fabric items. A *graph model* defines the labeled property graph structure (nodes, edges, and table mappings) that lets you query connected data. A *graph QuerySet* is an item that stores saved queries to run against a graph model.

The following table summarizes the permissions associated with each Microsoft Fabric workspace role's capability on graph models.

| Capability                           | Admin | Member | Contributor | Viewer |
|--------------------------------------|-------|--------|-------------|--------|
| Create or modify graph model         | Yes   | Yes    | Yes         | No     |
| Delete graph model                   | Yes   | Yes    | Yes         | No     |
| View and read content of graph model | Yes   | Yes    | Yes         | Yes    |
| Share graph model                    | Yes   | Yes    | No          | No     |
| Create or modify graph queries       | Yes   | Yes    | Yes         | No     |
| Create or modify graph QuerySet item | Yes   | Yes    | Yes         | No     |

The following table summarizes the permissions associated with each Microsoft Fabric workspace role's capability on graph QuerySets.

| Capability                               | Admin | Member | Contributor | Viewer |
|------------------------------------------|-------|--------|-------------|--------|
| Create or modify graph QuerySet          | Yes   | Yes    | Yes         | No     |
| Delete graph QuerySet                    | Yes   | Yes    | Yes         | No     |
| View and read content of graph QuerySet  | Yes   | Yes    | Yes         | Yes    |
| Connect to a graph model from a QuerySet | Yes   | Yes    | Yes         | No     |
| Share graph QuerySet                     | Yes   | Yes    | No          | No     |

> [!NOTE]
> All users need read access to the underlying graph model to run queries through a graph QuerySet.
>
> Only read, write, and reshare permissions are supported for graph QuerySets.

## Share a graph item

Besides assigning workspace roles, you can share graph models and QuerySets with users who don't have a role in the workspace. Sharing grants item-level permissions for downstream consumption without giving access to other workspace items.

For step-by-step instructions, see [Share a graph and manage permissions](share-graph-manage-permissions.md).

## Related content

- [Share a graph and manage permissions](share-graph-manage-permissions.md)
- [Share items in Microsoft Fabric](../fundamentals/share-items.md)
- [Permission model in Microsoft Fabric](../security/permission-model.md)
- [Security in Microsoft Fabric](../security/security-overview.md)
