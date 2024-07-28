---
title: Enable external data sharing in a Fabric tenant
description: Learn how to enable external data sharing in a Fabric tenant.
author: paulinbar
ms.author: painbar
ms.service: fabric
ms.topic: how-to
ms.date: 04/18/2024

#customer intent: As a Fabric administrator, I want to enable external data sharing in my Fabric tenant.

---

# Enable external data sharing in a Fabric tenant (preview)

This article is intended for Fabric administrators who want to enable external data sharing in their Fabric tenant.

External data sharing involves two tenants - a providing tenant where the data to be shared is located, and the consuming tenant, where the shared data is consumed. For external data sharing to work, it must be enabled on both tenants as described in this article.

Sharing data via external data sharing has important security considerations. For more information, see [Security considerations](./external-data-sharing-overview.md#security-considerations).

For more information about external data sharing, see the [External data sharing overview](./external-data-sharing-overview.md).

## Enable external data sharing in the providing tenant

You must have the Fabric administrator role in the providing tenant to perform these steps.

1. [Go to the tenant settings](../admin/about-tenant-settings.md#how-to-get-to-the-tenant-settings) in the providing tenant.
1. Find the **External data sharing (preview)** tenant setting (under export and sharing settings), enable the toggle, and specify who in the tenant can create external data shares.

## Enable external data sharing in the consuming tenant

You must have the Fabric administrator role in the consuming tenant to perform these steps.

1. [Go to the tenant settings](../admin/about-tenant-settings.md#how-to-get-to-the-tenant-settings) in the consuming tenant.
1. Find the **Users can accept external data shares (preview)** tenant setting (under export and sharing settings), enable the toggle, and specify who in the tenant can create external data shares.

## Related content

* [External data sharing overview](./external-data-sharing-overview.md)
* [Create an external data share](./external-data-sharing-create.md)
* [Accept an external data share](./external-data-sharing-accept.md)
* [Manage external data shares](./external-data-sharing-manage.md)