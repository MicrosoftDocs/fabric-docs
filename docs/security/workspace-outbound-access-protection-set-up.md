---
title: Set up workspace outbound access protection
description: "Learn how to set up workspace outbound access protection on Microsoft Fabric workspaces."
author: msmimart
ms.author: mimart
ms.service: fabric
ms.topic: how-to
ms.date: 09/24/2025

#customer intent: As a data platform administrator, I want to set up outbound access protection for my workspace so that I can control and secure how my workspace resources connect to external networks.

---

# Enable workspace outbound access protection

Workspace outbound access protection in Microsoft Fabric lets admins secure the outbound data connections from items in their workspaces to external resources. With this feature, admins can block all outbound connections, and then allow only approved connections to external resources through secure links between Fabric and virtual networks. [Learn more](./workspace-outbound-access-protection-overview.md).

This article explains how to configure outbound access protection for your Fabric workspaces to block all outbound connections by default. Then it describes how to enable outbound access through managed private endpoints or approved connections.

## Prerequisites

* Make sure you have an admin role in the workspace.

* Make sure the workspace where you want to set up outbound access protection resides on a Fabric capacity (F SKUs). No other capacity types are supported. You can check assignment by going to the workspace settings and selecting **License info**, as described in Step 1 of [Reassign a workspace to a different capacity](/fabric/fundamentals/workspace-license-mode#reassign-a-workspace-to-a-different-capacity-1).

* The tenant setting **Configure workspace-level outbound network rules** must be enabled by a Fabric tenant administrator. See [Manage admin access to outbound access protection settings](workspace-outbound-access-protection-tenant-setting.md).

* The `Microsoft.Network` feature must be re-registered for the subscription. From the Azure portal home page, go to **Subscriptions** > **Settings** > **Resource providers**. Select **Microsoft.Network** and select **Re-register**.

## Enable workspace outbound access protection 

To enable outbound access protection for a workspace, you can use the Fabric portal or REST API.

### [Fabric portal](#tab/fabric-portal-1)

1. Sign in to Fabric with an account that has the Admin role in the workspace where you want to set up outbound access protection.

1. In the workspace where you want to set up outbound access protection, go to **Workspace settings** -> **Network Security**. Under **Outbound access protection**, turn on **Block outbound public access**.
 
   :::image type="content" source="media/workspace-outbound-access-protection-set-up/network-security-settings.png" alt-text="Screenshot showing outbound access protection settings." lightbox="media/workspace-outbound-access-protection-set-up/network-security-settings.png":::

1. If you want to allow Git integration, turn the **Allow Git integration** toggle to **On**. Git integration is blocked by default when **Block outbound public access** is enabled, but you can enable Git integration for the workspace so its content (like notebooks, dataflows, Power BI reports, etc.) can sync with an external Git repository (GitHub or Azure DevOps). [Learn more](https://review.learn.microsoft.com/fabric/cicd/cicd-security?branch=pr-en-us-10624)

### [API](#tab/api-1)

Use the [Workspaces Set Network Communication Policy](/rest/api/fabric/core/workspaces/set-network-communication-policy) in the Fabric REST API:

`PUT https://api.fabric.microsoft.com/v1/workspaces/{workspace-id}/networking/communicationPolicy`

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

## Next steps

- [Create an allowlist with data connection rules](./workspace-outbound-access-protection-allow-list-connector.md)
- [Create an allowlist with managed private endpoints](./workspace-outbound-access-protection-allow-list-endpoint.md)