---
title: Enable workspace inbound access protection
description: Learn how to enable and manage inbound access protection for your Fabric workspace to secure network connections.
author: msmimart
ms.author: mimart
ms.reviewer: danzhang
ms.topic: overview
ms.custom:
ms.date: 08/13/2025

#customer intent: As a Fabric administrator, I want to enable and manage inbound access protection for my organization's workspaces to ensure secure network connections and control access at the tenant level.

---

# Manage admin access to workspace inbound access protection settings

Workspace inbound access protection is a network security feature that ensures that connections to a workspace are from secure and approved networks. It prevents the items from establishing unsecure connections to sources outside the workspace boundary unless allowed by the workspace admin.

The **Configure workspace-level inbound network rules** tenant setting in the Fabric admin center allows tenant admins to enable or disable the ability for workspace admins to restrict inbound public access to their workspaces. This setting is disabled by default, meaning workspace admins can't restrict inbound public access to their workspaces. However, if permitted in Azure, workspace admins can still set up workspace-level private links in Azure.

If the tenant admin chooses to enable this setting, workspace admins can configure restricted inbound public access for their workspaces. 

## Prerequisites

* You must have the Fabric administrator role to enable the workspace inbound access protection feature on your tenant.

## Enable workspace inbound access protection on your tenant

1. Open the admin portal and go to the tenant settings.

1. Find and expand the **Configure workspace-level inbound network rules** tenant setting.

1. Switch the toggle to **Enabled**.

   :::image type="content" source="./media/security-workspace-enable-inbound-access-protection/enable-toggle-inbound-network-rules.png" alt-text="Screenshot showing the toggle enabled for inbound network rules." :::

1. Select **Apply**. It could take up to 15 minutes to take effect. 

## Restrict inbound public access to a workspace

Once the tenant setting is enabled, workspace admins can restrict inbound public access for individual workspaces:

1. In the Fabric portal, navigate to your workspace.
2. Select **Settings** from the workspace menu.
3. Go to the **Network** tab.
4. Under **Inbound access protection**, switch the toggle to **Restrict public access**.
5. Review the warning and confirm your selection.
6. Select **Save** to apply the changes.

> [!NOTE]
> After restricting public access, only approved private endpoints or networks can connect to the workspace. Public internet access is blocked unless explicitly allowed.