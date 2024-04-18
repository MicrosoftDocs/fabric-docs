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

# Enable external data sharing in a Fabric tenant

This article is intended for Fabric administrators who want to enable external data sharing in their Fabric tenant.

External data sharing involves two tenants - a providing tenant where the data to be shared is located, and the consuming tenant, where the shared data is consumed. For external data sharing to work, it must be enabled on both tenants as described in this article.

Sharing data via external data sharing has important security considerations. For more information, see [Security considerations](./external-data-sharing-overview.md#security-considerations).

For more information about external data sharing, see the [External data sharing overview](./external-data-sharing-overview.md).

## Prerequisites

* You must have the Fabric administrator role to enable external data sharing.

## Enable external data sharing in the providing tenant

To enable external data sharing in the providing tenant so that users can create external data shares:

1. [Go to the tenant settings](../admin/about-tenant-settings.md#how-to-get-to-the-tenant-settings) in the providing tenant and turn on the **External data sharing (preview)** tenant setting in the Export and sharing settings section.

1. Specify who in the tenant can create external data shares.

## Enable external data sharing in the consuming tenant

To enable external data sharing in the consuming tenant so that users in the tenant can accept external data shares:

1. [Go to the tenant settings](../admin/about-tenant-settings.md#how-to-get-to-the-tenant-settings) in the consuming tenant and turn on the **Users can accept external data shares (preview)** tenant setting in the Export and sharing settings section.

1. Specify who in the tenant can create external data shares.

## Related content

* [External data sharing overview](./external-data-sharing-overview.md)
* [Create and manage external data shares](./external-data-sharing-create.md)
* [Accept an external data share](./external-data-sharing-accept.md)