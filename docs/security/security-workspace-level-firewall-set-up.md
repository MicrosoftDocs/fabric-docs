---
title: Set up and use workspace IP firewall rules
description: Learn how to set up and use workspace-level IP firewall rules for secure access to a Fabric workspace.
author: msmimart
ms.author: mimart
ms.reviewer: karthikeyana
ms.topic: how-to
ms.custom:
ms.date: 11/20/2025

#customer intent: As a workspace admin, I want to configure workspace-level IP firewall rules on my workspace to restrict the IP addresses than can access my Fabric workspace.

---

# Set up workspace IP firewall rules

Workspace IP firewall rules restrict inbound access to Fabric workspaces by allowing connections only from specified IP addresses. As a workspace admin, you can permit access from known IP addresses (such as users, machines, or VPNs), while all other IP addresses are automatically blocked. This approach provides straightforward, workspace-level inbound network protection.

This article provides instructions for setting up and managing workspace IP firewall rules in Fabric.

## Prerequisites

Before you configure workspace IP firewall rules, ensure the following requirements are met:

* **Fabric capacity**: The workspace must be assigned to a Fabric capacity (F SKUs). Premium (P SKU) and trial capacities aren't supported. To check capacity assignment, go to workspace settings and select **License info**, as described in [Reassign a workspace to a different capacity](../fundamentals/workspace-license-mode.md#reassign-a-workspace-to-a-different-capacity-1).

* **Tenant setting enabled**: A Fabric administrator must enable the **Configure workspace-level IP firewall** tenant setting. For details, see [Enable workspace inbound access protection for your tenant](security-workspace-enable-inbound-access-protection.md).

* **Workspace admin role**: You must be a workspace admin to configure IP firewall rules.

* **Workspace ID**: Locate the workspace ID in the URL after `groups/`. For example: `https://app.fabric.microsoft.com/groups/{workspace-id}/...`

* **Tenant ID**: Find your tenant ID by selecting the question mark (?) in the upper right corner of the Fabric portal, then selecting **About Power BI**. The tenant ID is the **ctid** value in the **Tenant URL**.

* **Resource provider registration**: If this is the first time setting up workspace-level network features in your tenant, re-register the **Microsoft.Fabric** resource provider in Azure for subscriptions containing the workspace resources. In the Azure portal, go to **Subscriptions** > **Settings** > **Resource providers**, select **Microsoft.Fabric**, and then select **Re-register**.

## Configure workspace IP firewall rules

You can configure workspace IP firewall rules using either the Fabric portal or the REST API.

### Use the Fabric portal

1. In the Fabric portal, navigate to your workspace.

1. Select **Workspace settings** from the workspace menu.

1. In the left navigation, select **Network security**.

1. Under **Inbound access protection**, select **IP firewall rules**.

1. Select **+ Add IP address range** to add a new IP address or range to the allowlist.

1. In the **Add IP address range** dialog:
   - **Name**: Enter a descriptive name for this IP address rule (for example, "Corporate VPN" or "Admin workstations").
   - **IP address range**: Enter a single IP address or an IP address range in CIDR notation (for example, `203.0.113.0/24`).

1. Select **Add** to save the rule.

1. Repeat steps 5-7 to add additional IP addresses or ranges as needed.

1. Select **Save** to apply the IP firewall rules to your workspace.

After you save the configuration, only connections from the specified IP addresses can access the workspace. All other connections are automatically denied.

### Use the REST API

You can also configure workspace IP firewall rules programmatically using the Fabric REST API.

#### Get current IP firewall configuration

To view the current IP firewall rules for a workspace, use the following GET request:

```http
GET https://api.fabric.microsoft.com/v1/workspaces/{workspace-id}/networking/ipFirewall
```

**Parameters:**
- `{workspace-id}`: Replace with your workspace ID

**Authentication:** Include a Bearer token (Fabric access token) in the Authorization header.

#### Add or update IP firewall rules

To add or update IP firewall rules, use the following PUT request:

```http
PUT https://api.fabric.microsoft.com/v1/workspaces/{workspace-id}/networking/ipFirewall
```

**Request body:**

```json
{
  "allowedIpRanges": [
    {
      "name": "Corporate VPN",
      "ipAddressRange": "203.0.113.0/24"
    },
    {
      "name": "Admin workstation",
      "ipAddressRange": "198.51.100.50"
    }
  ]
}
```

**Parameters:**
- `name`: A descriptive name for the IP address rule
- `ipAddressRange`: A single IP address or IP address range in CIDR notation

**Authentication:** Include a Bearer token (Fabric access token) in the Authorization header.

**Note:** Only workspace admins can call these APIs. The PUT request replaces all existing IP firewall rules with the rules specified in the request body.

## Verify IP firewall configuration

After configuring IP firewall rules, verify that the rules are working as expected:

1. **Test from an allowed IP address**: Access the workspace from a connection with an IP address in your allowlist. Access should be granted without issues.

1. **Test from a blocked IP address**: Attempt to access the workspace from a connection with an IP address not in your allowlist. Access should be denied, and you should receive an error indicating the connection is blocked by the firewall policy.

1. **Review firewall logs**: Monitor access attempts and denied connections through the Fabric admin portal or audit logs to ensure rules are enforced correctly.

## Modify or remove IP firewall rules

### Modify existing rules

To modify existing IP firewall rules:

1. In the Fabric portal, go to **Workspace settings** > **Network security** > **IP firewall rules**.

1. Select the rule you want to modify.

1. Update the **Name** or **IP address range** as needed.

1. Select **Save** to apply the changes.

Alternatively, use the REST API PUT request with the updated rule configuration.

### Remove IP firewall rules

To remove IP firewall rules:

1. In the Fabric portal, go to **Workspace settings** > **Network security** > **IP firewall rules**.

1. Select the checkbox next to the rule you want to remove.

1. Select **Delete**.

1. Confirm the deletion when prompted.

1. Select **Save** to apply the changes.

To remove all IP firewall rules using the REST API, send a PUT request with an empty `allowedIpRanges` array:

```json
{
  "allowedIpRanges": []
}
```

## Related content

- [Enable workspace inbound access protection for your tenant](security-workspace-enable-inbound-access-protection.md)
- [Security overview for Microsoft Fabric](security-overview.md)
- [Set up and use workspace-level private links](security-workspace-level-private-links-set-up.md)