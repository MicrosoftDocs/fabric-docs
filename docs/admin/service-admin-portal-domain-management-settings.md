---
title: Domain management tenant settings
description: Learn how to configure domain management tenant settings in Fabric.
author: paulinbar
ms.author: painbar
ms.reviewer: ''
ms.custom:
  - tenant-setting
ms.topic: how-to
ms.date: 01/18/2024
---

# Domain management tenant settings

Domain management tenant settings are configured in the tenant settings section of the Admin portal. For information about how to get to and use tenant settings, see [About tenant settings](tenant-settings-index.md).

## Allow tenant and domain admins to override workspace assignments (preview)

This setting controls whether tenant and domain admins can override existing workspace domain assignments. When disabled, tenant and domain admins cannot reassign a domain that is already assigned to a domain to another domain. When enabled, they can override such assignments. The setting is enabled by default. The [domain REST APIs](/rest/api/fabric/admin/domains) respect this setting.

To enable/disable the setting, go to **Admin portal** > **Tenant settings** > **Domain management settings**, expand **Allow tenant and domain admins to override workspace assignments (preview)** and set the toggle as desired.

## Related content

* [Fabric domains](../governance/domains.md)
* [About tenant settings](tenant-settings-index.md)
