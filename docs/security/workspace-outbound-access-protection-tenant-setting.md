---
title: Manage admin access to workspace outbound access protection settings
description: "Learn how to enable the workspace outbound access protection feature on your tenant."
author: msmimart
ms.author: mimart
ms.service: fabric
ms.topic: how-to
ms.date: 08/13/2025

#customer intent: As a Fabric administrator, I want to enable workspace outbound access protection on my tenant so that workspace admins can securely manage outbound network connections from their workspaces.

---

# Manage admin access to workspace outbound access protection settings

Workspace outbound access protection is a network security feature that ensures that connections outside the workspace go through a secure connection between Fabric and a virtual network. It prevents the items from establishing unsecure connections to sources outside the workspace boundary unless allowed by the workspace admins.

Before workspace admins can configure this feature on their workspaces, a Fabric administrator must enable the feature's tenant setting as described in this article.

## Prerequisites

* You must have the Fabric administrator role to enable the workspace outbound access protection feature on your tenant.

## Enable workspace outbound access protection on your tenant

1. [Open the admin portal and go to the tenant settings](/fabric/admin/about-tenant-settings#how-to-get-to-the-tenant-settings).

1. Find and expand the **Configure workspace-level outbound network rules** tenant setting.

1. Switch the toggle to **Enabled**.

## Related content

- [Workspace outbound access protection overview](./workspace-outbound-access-protection-overview.md)
- [Workspace outbound access protection - scenarios](./workspace-outbound-access-protection-scenarios.md)