---
title: Manage admin access to workspace outbound access protection settings
description: "Learn how to enable the workspace outbound access protection feature on your tenant."
author: msmimart
ms.author: mimart
ms.service: fabric
ms.topic: how-to
ms.date: 09/24/2025

#customer intent: As a Fabric administrator, I want to enable workspace outbound access protection on my tenant so that workspace admins can securely manage outbound network connections from their workspaces.

---

# Manage admin access to workspace outbound access protection settings

Workspace outbound access protection is a network security feature that ensures that connections outside the workspace go through a secure connection between Fabric and a virtual network. It prevents the items from establishing unsecure connections to sources outside the workspace boundary unless allowed by the workspace admins.

The **Configure workspace-level outbound network rules** tenant setting in the Fabric admin center allows tenant admins to enable or disable the ability for workspace admins to configure outbound access protection for their workspaces. This setting is disabled by default. A Fabric administrator must enable this tenant setting as described in this article before a workspace admin can configure outbound access protection for their workspace.

## Prerequisites

* You must have the Fabric administrator role to enable the workspace outbound access protection feature on your tenant.

## Enable workspace outbound access protection on your tenant

1. [Open the admin portal and go to the tenant settings](/fabric/admin/about-tenant-settings#how-to-get-to-the-tenant-settings).

1. Find and expand the **Configure workspace-level outbound network rules** tenant setting.

1. Switch the toggle to **Enabled**.

   :::image type="content" source="media/workspace-outbound-access-protection-tenant-setting/enable-toggle-outbound-network-rules.png" alt-text="Screenshot showing the toggle enabled for workspace outbound network rules." lightbox="media/workspace-outbound-access-protection-tenant-setting/enable-toggle-outbound-network-rules.png":::

1. Select **Apply**.

## Related content

- [Workspace outbound access protection overview](./workspace-outbound-access-protection-overview.md)
- [Workspace outbound access protection - scenarios](./workspace-outbound-access-protection-scenarios.md)