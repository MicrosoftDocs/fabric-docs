---
title: Plan (preview) known issues and limitations
description: This article lists known issues and limitations present in plan (preview).
ms.topic: concept-article
ms.date: 04/09/2026
#customer intent: As a user, I want to know the limitation present in plan.
---

# Known issues and limitations in plan (preview)

Review the following known issues and limitations before you begin working with plan (preview).

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Private link support

Plan items aren’t supported in workspaces or tenants that use private links.

## Semantic model

* Users must have **Admin** or **Build** permission on the semantic model.
* Semantic models in Direct Lake mode require [additional configuration](planning-how-to-create-semantic-model-connection.md#connect-to-a-direct-lake-semantic-model).
* Only OAuth-based semantic model connections are supported. 
* Semantic models in **My workspace** aren't supported.

## Browser support

Some older browsers that support only HTTP/1.1 or earlier might cause errors when creating or using artifacts. Use a modern browser that supports HTTP/2.
