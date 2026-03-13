---
title: Security Overview for graph in Microsoft Fabric
description: Learn about security in graph in Microsoft Fabric, including workspace roles, permissions, and how to manage access control for your graph data.
ms.topic: concept-article
ms.date: 03/12/2026
ms.reviewer: wangwilliam
---

# Security overview for graph in Microsoft Fabric

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

graph in Microsoft Fabric conforms to the security requirements of Microsoft Fabric's platform-wide security model. For comprehensive information about security across all Microsoft Fabric workloads, see [Security in Microsoft Fabric](../security/security-overview.md).

## Workspace roles and permissions

graph uses the same workspace roles as other Microsoft Fabric items.

The following table summarizes the permissions associated with each Microsoft Fabric workspace role's capability on graph models.

| Capability                           | Admin | Member | Contributor | Viewer |
|--------------------------------------|-------|--------|-------------|--------|
| Create or modify graph model         | ✔     | ✔      | ✔           | ✖      |
| Delete graph model                   | ✔     | ✔      | ✔           | ✖      |
| View and read content of graph model | ✔     | ✔      | ✔           | ✔      |
| Share graph model                    | ✔     | ✔      | ✖           | ✖      |
| Create or modify graph queries       | ✔     | ✔      | ✔           | ✖      |
| Create or modify graph QuerySet item | ✔     | ✔      | ✔           | ✖      |

The following table summarizes the permissions associated with each Microsoft Fabric workspace role's capability on graph QuerySets.

| Capability                             | Admin | Member | Contributor | Viewer |
|----------------------------------------|-------|--------|-------------|--------|
| Create or modify graph QuerySet item   | ✔     | ✔      | ✔           | ✖      |
| Delete QuerySet item                   | ✔     | ✔      | ✔           | ✖      |
| View and read content of QuerySet item | ✔     | ✔      | ✔           | ✔      |
| Connect to graph instance              | ✔     | ✔      | ✔           | ✖      |
| Share QuerySet                         | ✔     | ✔      | ✖           | ✖      |

> [!NOTE]
> All users need read access to the underlying graph instance item to execute queries against the referenced graph instance from the graph QuerySet item.
> Only read, write, and reshare permissions are supported for QuerySet item.

## Related content

- [Try Microsoft Fabric for free](../fundamentals/fabric-trial.md)
