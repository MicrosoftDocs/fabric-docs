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

# Set up workspace outbound access protection

Workspace outbound access protection in Microsoft Fabric lets admins secure the outbound data connections from items in their workspaces to external resources. With this feature, admins can block all outbound connections, and then allow only approved connections to external resources through secure links between Fabric and virtual networks. [Learn more](./workspace-outbound-access-protection-overview.md).

This article explains how to configure outbound access protection for your Fabric workspaces to block all outbound connections by default. Then it describes how to enable outbound access through managed private endpoints or approved connections.

## Prerequisites

* The workspace where you want to set up outbound access protection must reside on a Fabric capacity. No other capacity types are supported. <!--TODO - SHOULD WE USE THE SAME PREREQ AS WS PL: * "The workspace must be assigned to a Fabric capacity (F SKUs). Other capacities, such as premium (P SKU) and trial capacities, aren't supported." --> You can check assignment by going to the workspace settings and selecting **License info**, as described in Step 1 of [Reassign a workspace to a different capacity](/fabric/fundamentals/workspace-license-mode#reassign-a-workspace-to-a-different-capacity-1).

* You must have an Admin role in the workspace.

* A Fabric tenant administrator must enable the tenant setting **Configure workspace-level outbound network rules**. See [Manage admin access to outbound access protection settings](workspace-outbound-access-protection-tenant-setting.md).

* Re-register the `Microsoft.Network` feature for the subscription. From the Azure portal home page, go to **Subscriptions** > **Settings** > **Resource providers**. Select **Microsoft.Network** and select **Re-register**.

## Enable workspace outbound access protection 

To enable outbound access protection for a workspace, you can use the Fabric portal or REST API.

### [Fabric portal](#tab/fabric-portal-1)

1. Sign in to Fabric with an account that has the Admin role in the workspace where you want to set up outbound access protection.

1. In the workspace where you want to set up outbound access protection, go to **Workspace settings** -> **Network Security**. Under **Outbound access protection**, turn on **Block outbound public access**.
 
   :::image type="content" source="media/workspace-outbound-access-protection-set-up/network-security-settings1.png" alt-text="Screenshot showing outbound access protection settings." lightbox="media/workspace-outbound-access-protection-set-up/network-security-settings.png":::

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

## Allow Git integration with outbound access protection

*TODO - ADD OR LINK TO CONTENT ABOUT GIT INTEGRATION*
When outbound access protection is enabled, Git integration is blocked by default. To allow Git integration, you must add an allow rule for the Git service in the workspace settings.

## Set up managed private endpoints to allow outbound access

In a workspace with outbound access protection enabled, admins can allow access to resources outside the workspace by setting up managed private endpoints. First, create a Private Link service in the target workspace. Then, establish a managed private endpoint from the protected workspace to the target workspace. This enables secure, cross-workspace connections through a virtual network. 

:::image type="content" source="media/workspace-outbound-access-protection-set-up/private-link-service-diagram.png" alt-text="Diagram showing a connection from an outbound access protection enabled workspace to another workspace." lightbox="media/workspace-outbound-access-protection-set-up/private-link-service-diagram.png" border="false":::

> [!NOTE]
> If a target workspace doesn't already exist, you can [create a workspace in Fabric](/fabric/fundamentals/create-workspaces) and assign it to a Fabric capacity. 

### Create the Private Link service for the target workspace

In Azure, create a Private Link service for the target workspace (Workspace 2 in the diagram) by deploying an ARM template.

1. In a web browser, go to the [Azure portal](https://portal.azure.com/) and sign in.

1. From the Azure portal search bar, search for **deploy a custom template** and then select it from the available options.

1. On the **Custom deployment** page, select **Build your own template in the editor**.

1. In the editor, create a Fabric resource using the following ARM template, where:

    * `<resource-name>` is the name you choose for the Fabric resource.
    * `<tenant-object-id>` is your Microsoft Entra tenant ID. See [How to find your Microsoft Entra tenant ID](/entra/fundamentals/how-to-find-tenant).
    * `<workspace-id>` is the workspace ID for the target workspace. Find it in the workspace URL after `group`.<!--(TODO - CONFIRM THIS DESCRIPTION OF THE WORKSPACE ID IN THE ARM TEMPLATE)-->

    ```json
    {
      "$schema": "http://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
      "contentVersion": "1.0.0.0",
      "parameters": {},
      "resources": [
        {
          "type": "Microsoft.Fabric/privateLinkServicesForFabric",
          "apiVersion": "2024-06-01",
          "name": "<resource-name>",
          "location": "global",
          "properties": {
            "tenantId": "<tenant-id>",
            "workspaceId": "<workspace-id>"
          }
        }
      ]
    }
    ```

   > [!NOTE]
   > After deployment, you can find the Private Link service details in the output JSON file. Copy the resource ID of the Private Link service for use in the next step. You can also find the Private Link service resource in the resource group, but you need to select **Show hidden resources**.

### Create a managed private endpoint in the protected workspace

Create a managed private endpoint in the outbound access protected workspace (Workspace 1) to allow access to the target workspace (Workspace 2).

1. In the Fabric portal, open the workspace that has outbound access enabled.

1. Select **Workspace settings** > **Outbound networking**.

1. On the **Network Security** page, under **Managed Private Endpoints**, select **Create**.

   :::image type="content" source="media/workspace-outbound-access-protection-set-up/create-managed-private-endpoint-button.png" alt-text="Screenshot showing the button for creating a managed private endpoint." lightbox="media/workspace-outbound-access-protection-set-up/create-managed-private-endpoint-button.png":::

1. Enter a name for the managed private endpoint.

1. Under **Resource identifier**, paste the resource ID of the Private Link service created in the previous section. You can also find the resource ID in the Azure portal by opening the Private Link service in Resource Manager and selecting **JSON View** to open the resource JSON.

   :::image type="content" source="media/workspace-outbound-access-protection-set-up/copy-paste-resource-id.png" alt-text="Screenshot showing the resource JSON with the resource ID." lightbox="media/workspace-outbound-access-protection-set-up/copy-paste-resource-id.png":::
	
1. Under **Target sub-resource**, select **Workspace**. Then select **Create**.

   :::image type="content" source="media/workspace-outbound-access-protection-set-up/create-managed-private-endpoint.png" alt-text="Screenshot showing the page for creating a managed private endpoint." lightbox="media/workspace-outbound-access-protection-set-up/create-managed-private-endpoint.png":::

> [!IMPORTANT]
> The activation status displays *Provisioning* and the approval status is blank, meaning the managed private endpoint request is pending approval. A tenant admin must approve the request as described in the next section.

### Tenant admin: Approve the managed private endpoint connection

A tenant admin must approve the managed private endpoint connection by completing the following steps. 

1. In the Azure portal, search for and select **Private Link Services**.

   :::image type="content" source="media/workspace-outbound-access-protection-set-up/private-link-services-list.png" alt-text="Screenshot showing where to select Private Link services." lightbox="media/workspace-outbound-access-protection-set-up/private-link-services-list.png" :::

1. Under **Pending connections**, locate the pending connection with the name specified in the template.

   :::image type="content" source="media/workspace-outbound-access-protection-set-up/private-link-center-pending-connections.png" alt-text="Screenshot showing the private link center." lightbox="media/workspace-outbound-access-protection-set-up/private-link-center-pending-connections.png":::

1. Select the connection and approve it.

   :::image type="content" source="media/workspace-outbound-access-protection-set-up/approve-connection.png" alt-text="Screenshot of the button for approving the connection." lightbox="media/workspace-outbound-access-protection-set-up/approve-connection.png":::

1. After about 15 minutes, check the status of the managed private endpoint: In the Fabric portal, open the outbound access protected workspace and go to **Workspace settings** > **Outbound networking**. On the Network Security page, verify the activation status is **Succeeded** and the approval status is **Approved**.

   :::image type="content" source="media/workspace-outbound-access-protection-set-up/activation-succeeded.png" alt-text="Screenshot showing the activated and approved connection." lightbox="media/workspace-outbound-access-protection-set-up/activation-succeeded.png":::

The cross-workspace managed private endpoint is now set up between the outbound access protected workspace and the target workspace. Workspace admins and contributors can now connect to artifacts in the target workspace from the outbound access protected workspace.

## Add data connection rules to allow outbound access

*TODO - REVIEW AND UPDATE CONTENT*
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

**TODO - ADD API DETAILS FOR CLOUD CONNECTIONS**

Call the following APIs to view/update the Data Connection rules (Gateways).

**TODO - ADD API DETAILS FOR GATEWAY CONNECTIONS**

---

## Connect the outbound access protected workspace to other data sources

You can connect the outbound access protected workspace to external data sources that support managed private endpoints.

:::image type="content" source="media/workspace-outbound-access-protection-set-up/connect-workspace-data-source-diagram.png" alt-text="Diagram showing a connection from a workspace to a data source." lightbox="media/workspace-outbound-access-protection-set-up/connect-workspace-data-source-diagram.png" border="false":::

1. Create a managed private endpoint from the source workspace by going to **Workspace settings** > **Network Security** > **Managed Private Endpoints** > **Create**.

1. Once the managed private endpoint is created and approved on the target, artifacts in the outbound access protected workspace can connect to the data source.

## Related content

- [Workspace outbound access protection overview](./workspace-outbound-access-protection-overview.md)
- [Workspace outbound access protection - scenarios](./workspace-outbound-access-protection-scenarios.md)