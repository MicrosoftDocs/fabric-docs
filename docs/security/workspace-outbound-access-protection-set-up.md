---
title: Enable workspace outbound access protection
description: "Learn how to set up workspace outbound access protection on Microsoft Fabric workspaces."
author: msmimart
ms.author: mimart
ms.service: fabric
ms.topic: how-to
ms.date: 11/06/2025

#customer intent: As a data platform administrator, I want to set up outbound access protection for my workspace so that I can control and secure how my workspace resources connect to external networks.

---

# Enable workspace outbound access protection

Workspace outbound access protection in Microsoft Fabric lets admins secure the outbound data connections from items in their workspaces to external resources. Admins can block all outbound connections, and then allow only approved connections to external resources through secure links between Fabric and virtual networks. [Learn more](./workspace-outbound-access-protection-overview.md).

This article explains how to configure outbound access protection for your Fabric workspaces to block all outbound connections by default, and then enable outbound access through managed private endpoints.

## Prerequisites

* Make sure you have an admin role in the workspace.

* Make sure the workspace where you want to set up outbound access protection resides on a Fabric capacity (F SKUs). No other capacity types are supported. You can check assignment by going to the workspace settings and selecting **License info**.

* The tenant setting **Configure workspace-level outbound network rules** must be enabled by a Fabric tenant administrator. See [Manage admin access to outbound access protection settings](workspace-outbound-access-protection-tenant-setting.md).

* The `Microsoft.Network` feature must be re-registered for the subscription. From the Azure portal home page, go to **Subscriptions** > **Settings** > **Resource providers**. Select **Microsoft.Network** and select **Re-register**.

## Enable workspace outbound access protection 

> [!NOTE]
> The workspace-level setting to block outbound public access can take up to 15 mins to take effect.

 ### [Fabric portal](#tab/fabric-portal-1)

To enable workspace outbound access protection by using the Fabric portal, follow these steps:

1. Sign in to Fabric with an account that has the Admin role in the workspace where you want to set up outbound access protection.

1. In the workspace where you want to set up outbound access protection, go to **Workspace settings** -> **Network Security**. Under **Outbound access protection**, turn on **Block outbound public access**.
 
   :::image type="content" source="media/workspace-outbound-access-protection-set-up/network-security-settings.png" alt-text="Screenshot showing outbound access protection settings." lightbox="media/workspace-outbound-access-protection-set-up/network-security-settings.png":::

1. If you want to allow Git integration, turn the **Allow Git integration** toggle to **On**. Git integration is blocked by default when **Block outbound public access** is enabled, but you can enable Git integration for the workspace so its content (like notebooks, dataflows, Power BI reports, etc.) can sync with an external Git repository (GitHub or Azure DevOps). [Learn more](/fabric/cicd/cicd-security)

### [API](#tab/api-1)

To enable workspace outbound access protection with the Fabric REST API, use the [Workspaces Set Network Communication Policy](/rest/api/fabric/core/workspaces/set-network-communication-policy):

`PUT https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/networking/communicationPolicy`

Where `{workspaceId}` is the ID of the workspace where you want to enable outbound access protection.

In the request body, set `outbound` to `Deny`. Also specify the `inbound` value if needed so it isn't overwritten by the default value (Allow).

```json
{
  "inbound": {
    "publicAccessRules": {
      "defaultAction": "Allow"
    }
  },
  "outbound": {
    "publicAccessRules": {
      "defaultAction": "Deny"
    }
  }
}
```

---

Now that outbound public access is blocked, you can create an allowlist of approved connections to external resources using managed private endpoints.

## Next steps

- [Create an allowlist with managed private endpoints](./workspace-outbound-access-protection-allow-list-endpoint.md)
