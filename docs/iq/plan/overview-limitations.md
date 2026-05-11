---
title: Known limitations in plan (preview)
description: This article lists known issues and limitations present in plan (preview).
ms.topic: concept-article
ms.date: 05/6/2026
#customer intent: As a user, I want to know the limitation present in plan.
---

# Known limitations in plan (preview)

Review the following known issues and limitations before you begin working with plan (preview).

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## B2B user support

Plan doesn't support Microsoft Entra B2B IDs.

## Private link support

Plan items aren’t supported in workspaces or tenants that use private links.

## Semantic model

* You must have **Admin** or **Build** permission on the semantic model.
* Semantic models in Direct Lake mode require [additional configuration](planning-how-to-create-semantic-model-connection.md#connect-to-a-direct-lake-semantic-model).
* Only OAuth-based semantic model connections are supported. 
* Semantic models in **My workspace** aren't supported.
