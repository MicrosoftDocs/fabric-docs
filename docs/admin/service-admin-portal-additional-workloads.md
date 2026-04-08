---
title: Tenant settings for additional workloads
description: Learn how to configure additional workloads tenant settings in Fabric.
author: msmimart
ms.author: mimart
ms.custom:
  - tenant-setting
ms.topic: concept-article
ms.date: 04/08/2026
---

# Tenant settings for additional workloads

These settings are configured in the tenant settings section of the [Admin portal](./about-tenant-settings.md#how-to-get-to-the-tenant-settings). For information about how to get to and use tenant settings, see [About tenant settings](./about-tenant-settings.md).

Additional workloads let organizations extend Fabric with partner and custom workloads. Tenant admins can control who can add, develop, and use those workloads.

## Workspace admins can add and remove additional workloads (preview)

Turn on this setting to allow workspace admins to add and remove workloads in their workspaces.

If you turn this setting off, existing workloads remain in place and items created with those workloads continue to work normally.

When users interact with a workload, their data and access tokens, including name and email, are sent to the publisher. Sensitivity labels and protection settings, including encryption, aren't applied to items created with workloads.

For more information, see [Workload Development Kit](/fabric/workload-development-kit/environment-setup).

## Capacity admins and contributors can add and remove additional workloads

Turn on this setting to allow capacity admins and users with Contributor permission in capacity settings to add and remove additional workloads in capacities.

If you turn this setting off, existing workloads remain in place and items created with those workloads continue to work normally.

When users interact with a workload, their data and access tokens, including name and email, are sent to the publisher. Sensitivity labels and protection settings, including encryption, aren't applied to items created with workloads.

For more information, see [Enable the development tenant setting](../workload-development-kit/environment-setup.md#enable-the-development-tenant-setting).

## Workspace admins can develop partner workloads

Turn on this setting to allow workspace admins to develop partner workloads by using a local machine development environment.

If you turn this setting off, developers can no longer upload partner workloads to that workspace.

For more information, see [Enable the development tenant setting](/fabric/workload-development-kit/environment-setup#enable-the-development-tenant-setting).

## Users can see and work with additional workloads not validated by Microsoft

Turn on this setting to allow users to see and work with additional workloads that Microsoft hasn't validated.

Before you enable this setting, make sure that you trust the publishers of any workloads you add and that those workloads meet your organization's policies.

For more information, see [Partner workload publishing requirements](../workload-development-kit/publish-workload-requirements.md).

## Related content

- [About tenant settings](tenant-settings-index.md)
- [Workload Development Kit overview](/fabric/workload-development-kit/environment-setup)
