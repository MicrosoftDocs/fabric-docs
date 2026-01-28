---
title: Manage admin access to workspace outbound access protection settings
description: "Learn how to enable the workspace outbound access protection feature on your tenant."
author: msmimart
ms.author: mimart
ms.service: fabric
ms.topic: how-to
ms.date: 12/01/2025

#customer intent: As a Fabric administrator, I want to enable workspace outbound access protection on my tenant so that workspace admins can securely manage outbound network connections from their workspaces.

---

# Manage admin access to workspace outbound access protection settings

Workspace outbound access protection in Microsoft Fabric lets admins secure the outbound data connections from items in their workspaces to external resources. With this feature, admins can block all outbound connections, and then allow only approved connections to external resources through secure connections. [Learn more](./workspace-outbound-access-protection-overview.md).

Before workspace admins can manage outbound access protection, a Fabric administrator must enable the **Configure workspace-level outbound network rules** tenant setting. By default, this setting is turned off and must be enabled to allow workspace admins to configure outbound access protection.

## Prerequisites

* You must have the Fabric administrator role to enable the workspace outbound access protection feature on your tenant.

## Enable workspace outbound access protection on your tenant

1. Sign in to [Fabric](https://app.fabric.microsoft.com) using your admin account credentials.

1. Select the **Settings** (gear) icon, and then select **Admin portal**.

1. In the **Tenant settings**, find and expand the **Configure workspace-level outbound network rules** tenant setting.

1. Switch the toggle to **Enabled**.

   :::image type="content" source="media/workspace-outbound-access-protection-tenant-setting/enable-toggle-outbound-network-rules.png" alt-text="Screenshot showing the toggle enabled for workspace outbound network rules." lightbox="media/workspace-outbound-access-protection-tenant-setting/enable-toggle-outbound-network-rules.png":::

1. Select **Apply**.

## Next steps

- [Enable workspace outbound access protection](./workspace-outbound-access-protection-set-up.md)
