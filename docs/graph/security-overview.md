---
title: Security overview
description: Learn about security in Graph in Microsoft Fabric, including workspace roles and permissions.
ms.topic: concept-article
ms.date: 01/20/2026
author: lorihollasch
ms.author: loriwhip
ms.reviewer: wangwilliam
---

# Security overview for Graph in Microsoft Fabric

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

Graph in Microsoft Fabric conforms to the security requirements implemented in Microsoft Fabric's platform-wide security model. For comprehensive information about security across all Fabric workloads, see [Security in Microsoft Fabric](/fabric/security/security-overview).

## Workspace roles and permissions

Graph in Microsoft Fabric uses the same workspace roles as other Microsoft Fabric items.

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

- [Try Microsoft Fabric for free](/fabric/fundamentals/fabric-trial)
