---
title: Plan known issues and limitations
description: Known issues and limitations present in fabric-plan
ms.topic: overview
#customer intent: As a user, I want to know the limitation present in fabric-plan
---
# Known issues and limitations in plan

Review the following known issues and limitations before you begin.

## Private link support

Plan items aren’t supported in workspaces or tenants that use private links.

## Semantic model

* You must have **Admin** or **Build** permission on the semantic model.
* Semantic models in Direct Lake mode require additional configuration [mentioned here.](planning-how-to-create-semantic-model-connection.md#connect-to-a-direct-lake-semantic-model)
* Semantic models in **My workspace** aren’t supported.

## Browser support

Some older browsers that support only HTTP/1.1 or earlier might cause errors when creating or using artifacts. Use a modern browser that supports HTTP/2.
