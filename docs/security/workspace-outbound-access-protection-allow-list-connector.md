---
title: Create an allowlist using data connection rules
description: "Learn how to create an allowlist using data connection rules on Microsoft Fabric workspaces."
author: msmimart
ms.author: mimart
ms.service: fabric
ms.topic: how-to
ms.date: 09/24/2025

#customer intent: As a data platform administrator, I want to set up outbound access protection and create an allowlist using data connection rules so that I can control and secure how my workspace resources connect to external networks.

---

# Create an allowlist using data connection rules

In Microsoft Fabric, [workspace outbound access protection](./workspace-outbound-access-protection-overview.md) enables administrators to control outbound data connections from workspace resources to external networks. By default, all outbound connections can be blocked, and administrators can then create an allowlist to permit only specific data connections as needed.

This article describes how to use data connection rules to allow cloud or gateway connections once you have [enabled outbound access protection](workspace-outbound-access-protection-set-up.md) for your workspace.

## Prerequisites

* Make sure you have an admin role in the workspace.

* Make sure the workspace where you want to set up outbound access protection must reside on a Fabric capacity (F SKUs). No other capacity types are supported. You can check assignment by going to the workspace settings and selecting **License info**, as described in Step 1 of [Reassign a workspace to a different capacity](/fabric/fundamentals/workspace-license-mode#reassign-a-workspace-to-a-different-capacity-1).

* The tenant setting **Configure workspace-level outbound network rules** must be enabled by a Fabric tenant administrator. See [Manage admin access to outbound access protection settings](workspace-outbound-access-protection-tenant-setting.md).

* The `Microsoft.Network` feature must be re-registered for the subscription. From the Azure portal home page, go to **Subscriptions** > **Settings** > **Resource providers**. Select **Microsoft.Network** and select **Re-register**.

* Outbound access protection must be enabled for the workspace. See [Enable workspace outbound access protection](workspace-outbound-access-protection-set-up.md).

## Allow data connection rules

When outbound access protection is enabled, connectors are blocked by default. You can add policies that allow or block data connections with external sources by using the Fabric portal or REST API.

### [Fabric portal](#tab/fabric-portal-2)

1. Sign in to the Fabric as a workspace admin.

1. Go to **Workspace** > **Workspace settings** > **Network security**.

1. Scroll to the **Data connection rules (preview)** section.

   :::image type="content" source="media/workspace-outbound-access-protection-data-factory/data-connection-rules.png" alt-text="Screenshot of data connection rules configuration listing allowed and blocked connection types.":::

1. Add the data connection rules to allow/block different types of sources that the workspace can connect to.

1. You can also use the **Gateway connection policies** settings to allow or block specific gateways.

### [API](#tab/api-2)

Call the following APIs to view/update the Data Connection rules (Cloud Connections).

Refer to the [Workspaces - Get Network Communication Policy](/rest/api/fabric/core/workspaces/get-network-communication-policy) and [Workspaces - Set Network Communication Policy](/rest/api/fabric/core/workspaces/set-network-communication-policy) APIs.

Call the following APIs to view/update the Data Connection rules (Gateways).

Refer to the [Workspaces - Get Gateway Connection Policy](/rest/api/fabric/core/workspaces/get-gateway-connection-policy) and [Workspaces - Set Gateway Connection Policy](/rest/api/fabric/core/workspaces/set-gateway-connection-policy) APIs.

---

## Related content

- [Workspace outbound access protection overview](./workspace-outbound-access-protection-overview.md)
- [Workspace outbound access protection - scenarios](./workspace-outbound-access-protection-scenarios.md)