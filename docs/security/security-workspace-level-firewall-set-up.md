---
title: Set up and use workspace IP firewall rules
description: Learn how to set up and use workspace-level IP firewall rules for secure access to a Fabric workspace.
author: msmimart
ms.author: mimart
ms.reviewer: karthikeyana
ms.topic: how-to
ms.custom:
ms.date: 01/27/2026

#customer intent: As a workspace admin, I want to configure workspace-level IP firewall rules on my workspace to restrict the IP addresses than can access my Fabric workspace.

---

# Set up workspace IP firewall rules (Preview)

Microsoft Fabric offers two options to restrict inbound access to a workspace. Workspace Private Link secures connectivity by routing traffic through Azure Private Link and private endpoints, ensuring all workspace access occurs over Microsoft's private network instead of the public internet. Workspace IP firewall rules provide an alternative by allowing access only from approved public IP addresses, offering a straightforward way to limit inbound connections when a workspace is exposed through public endpoints.

This article describes how to set up and manage workspace IP firewall rules in Fabric.

## Prerequisites

Before you configure workspace IP firewall rules, ensure the following requirements are met:

* **Tenant setting enabled**: A Fabric administrator must enable the **Configure workspace IP firewall rules** tenant setting. For details, see [Enable workspace inbound access protection for your tenant](security-workspace-enable-inbound-access-protection.md).

* **Workspace admin role**: You must be a workspace admin to configure IP firewall rules.

* **Workspace license assignment**: The workspace must be assigned to either a Fabric capacity or trial capacity. You can check assignment by going to the workspace settings and selecting **License info**.

* **Resource provider registration**: If this is the first time setting up workspace-level network features in your tenant, re-register the **Microsoft.Fabric** resource provider in Azure for subscriptions containing the workspace resources. In the Azure portal, go to **Subscriptions** > **Settings** > **Resource providers**, select **Microsoft.Fabric**, and then select **Re-register**.

## Configure workspace IP firewall rules

You can configure workspace IP firewall rules using either the Fabric portal or the REST API.

### [Fabric portal](#tab/fabric-portal-1)

1. Select the workspace where you want to configure IP firewall rules, or [create a workspace in Fabric](/fabric/fundamentals/create-workspaces). 

1. Select **Workspace settings**. 

1. Select **Inbound networking**.  

1. Under **Workspace connection settings**, select **Allow connections from selected networks and workspace level private links**.

   :::image type="content" source="media/security-workspace-level-firewall-set-up/workspace-connection-settings-allow-selected.png" alt-text="Screenshot showing the Allow connections from selected networks and workspace level private links option." lightbox="media/security-workspace-level-firewall-set-up/workspace-connection-settings-allow-selected.png":::

1. Under **Allow public addresses to access this workspace**, select **Edit**.

   :::image type="content" source="media/security-workspace-level-firewall-set-up/workspace-connection-settings-edit-addresses.png" alt-text="Screenshot showing the Edit option for allowing public addresses to access the workspace." lightbox="media/security-workspace-level-firewall-set-up/workspace-connection-settings-edit-addresses.png":::

1. On the addresses page, select **Add address** or **Add new IP address** to add IP firewall rules. 

   :::image type="content" source="media/security-workspace-level-firewall-set-up/add-addresses.png" alt-text="Screenshot showing the Add address buttons." lightbox="media/security-workspace-level-firewall-set-up/add-addresses.png":::

1. Enter a **Rule name**, choose the **Type** of IP address (**Single IP**, **IP range**, or **CIDR**), and enter the address in the **Address** box. Repeat this step to add multiple rules as needed.

   :::image type="content" source="media/security-workspace-level-firewall-set-up/rule-name-list.png" alt-text="Screenshot showing the Add IP address rule dialog." lightbox="media/security-workspace-level-firewall-set-up/rule-name-list.png":::

1. Select **Apply**.

After you save the configuration, only connections from the specified IP addresses can access the workspace. All other connections are automatically denied.

### [API](#tab/api-1)

With the tenant-level setting **Configure workspace-level IP firewall rules** enabled, you can retrieve and set workspace IP firewall rules programmatically using the Fabric REST API.

1. Using the public Fabric API endpoint (api.fabric.microsoft.com), call the **Get IP rules** API to retrieve configured IP rules on a workspace.

   **Request:**
   ```
   GET https://api.fabric.microsoft.com/v1/workspaces/<workspace-id>/networking/communicationpolicy/inbound/firewall
   ```

1. Call the **Set IP rules** API to configure IP rules for a workspace.

   **Request:**
   ```
   PUT https://api.fabric.microsoft.com/v1/workspaces/<workspace-id>/networking/communicationpolicy/inbound/firewall
   ```

   **Request Body:**
   ```json
   {
     "rules": [
       {
         "displayName": "corpip",
         "value": "xxx.xxx.xxx.xx"
       }
     ]
   }
   ```

1. Call the **Workspaces - Set Network Communication Policy** API to set the workspace public access rule.

   **Request:**
   ```
   PUT https://api.fabric.microsoft.com/v1/workspaces/{workspaceID}/networking/communicationPolicy
   ```

   **Request Body:**
   ```json
   {
     "inbound": {
       "publicAccessRules": {
         "defaultAction": "Deny"
       }
     }
   }
   ```
---

## Related content

- [Enable workspace inbound access protection for your tenant](security-workspace-enable-inbound-access-protection.md)
- [Security overview for Microsoft Fabric](security-overview.md)
- [Set up and use workspace-level private links](security-workspace-level-private-links-set-up.md)
