---
title: Set up workspace outbound access protection
description: "Learn how to set up workspace outbound access protection on Microsoft Fabric workspaces."
author: msmimart
ms.author: mimart
ms.service: fabric
ms.topic: how-to
ms.date: 11/06/2025

#customer intent: As a data platform administrator, I want to set up outbound access protection for my workspace so that I can control and secure how my workspace resources connect to external networks.

---

# Set up workspace outbound access protection

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

Now that outbound access is blocked, you can permit specific outbound connections to external data sources or other workspaces as described in the following sections.

## Allow outbound access to another workspace in the tenant

To connect to another workspace, use managed private endpoints and the Private Link service to enable secure outbound connections. As described in this section, create a Private Link service for the target workspace (Workspace 2 in the diagram) by deploying an ARM template, and then create a managed private endpoint in the outbound access protected workspace (Workspace 1) to connect to the target workspace.

:::image type="content" source="media/workspace-outbound-access-protection-set-up/private-link-service-diagram.png" alt-text="Diagram showing a connection from an outbound access protection enabled workspace to another workspace." lightbox="media/workspace-outbound-access-protection-set-up/private-link-service-diagram.png" border="false":::

### Create the Private Link Service for the target workspace

1. Sign in to the [Azure portal](https://portal.azure.com/).

1. From the Azure portal search bar, search for **deploy a custom template** and then select it from the available options.

1. On the **Custom deployment** page, select **Build your own template in the editor**.

1. In the editor, create a Fabric resource using the following ARM template, where:

    * `<resource-name>` is the name you choose for the Fabric resource.
    * `<tenant-object-id>` is your Microsoft Entra tenant ID. See [How to find your Microsoft Entra tenant ID](/entra/fundamentals/how-to-find-tenant).
    * `<workspace-id>` is the workspace ID you noted as part of the prerequisites.

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
   > After deployment, you can find the Private Link service details in the output JSON file. You can also find the Private Link service resource in the resource group, but you need to select **Show hidden resources**.

Copy the resource ID of the Private Link Service from the output JSON file. You'll use this resource ID in the next step to create a managed private endpoint from the outbound access protected workspace to the target workspace.

### Create a managed private endpoint in the protected workspace

Create a managed private endpoint in the outbound access protected workspace (Workspace 1) to allow access to the target workspace (Workspace 2).

1. In the Fabric portal, open the workspace that has outbound access protection enabled.

1. Select **Workspace settings** > **Outbound networking**.

1. On the **Network Security** page, under **Managed Private Endpoints**, select **Create**.

1. Enter a name for the managed private endpoint.

1. Under **Resource identifier**, paste the resource ID of the Private Link service created in the previous section. You can also find the resource ID in the Azure portal by opening the Private Link service in Resource Manager and selecting **JSON View** to open the resource JSON.

   :::image type="content" source="media/workspace-outbound-access-protection-set-up/copy-paste-resource-id.png" alt-text="Screenshot showing the resource JSON with the resource ID." lightbox="media/workspace-outbound-access-protection-set-up/copy-paste-resource-id.png":::
	
1. Under **Target sub-resource**, select **Workspace**. Then select **Create**.

   :::image type="content" source="media/workspace-outbound-access-protection-set-up/create-managed-private-endpoint.png" alt-text="Screenshot showing the page for creating a managed private endpoint." lightbox="media/workspace-outbound-access-protection-set-up/create-managed-private-endpoint.png":::

> [!IMPORTANT]
> The activation status displays *Provisioning* and the approval status is blank, meaning the managed private endpoint request is pending approval. A tenant admin must approve the request as described in the next section.

### Approve the managed private endpoint connection

A tenant admin must approve the pending managed private endpoint request by completing the following steps. 

1. Sign in to the [Azure portal](https://portal.azure.com).

1. Search for and select **Private Link Services**.

1. Select **Pending connections**. 

1. Select the connection with the name specified in the template, and then select **Approve**.

   :::image type="content" source="media/workspace-outbound-access-protection-set-up/approve-connection.png" alt-text="Screenshot of the button for approving the connection." lightbox="media/workspace-outbound-access-protection-set-up/approve-connection.png":::

1. After about 15 minutes, check the status of the managed private endpoint: In the Fabric portal, open the outbound access protected workspace and go to **Workspace settings** > **Outbound networking**. On the Network Security page, verify the activation status is **Succeeded** and the approval status is **Approved**.

   :::image type="content" source="media/workspace-outbound-access-protection-set-up/activation-succeeded.png" alt-text="Screenshot showing the activated and approved connection." lightbox="media/workspace-outbound-access-protection-set-up/activation-succeeded.png":::

The cross-workspace managed private endpoint is now set up between the outbound access protected workspace and the target workspace. Workspace admins and contributors can now connect to artifacts in the target workspace from the outbound access protected workspace.


## Allow outbound access to an external data source

To enable outbound access to external data sources that support managed private endpoints, create a managed private endpoint in your workspace with outbound access protection enabled. The diagram below illustrates Workspace 1, which has outbound access protection turned on, connecting securely to an external data source through a managed private endpoint.

:::image type="content" source="media/workspace-outbound-access-protection-set-up/connect-workspace-data-source-diagram.png" alt-text="Diagram showing a connection from a workspace to a data source." lightbox="media/workspace-outbound-access-protection-set-up/connect-workspace-data-source-diagram.png" border="false":::

To enable this scenario, follow these steps:

1. Make sure outbound access protection is enabled for the workspace.

1. Sign in to Fabric as a workspace admin and create a managed private endpoint by going to **Workspace settings** > **Network Security** > **Managed Private Endpoints** > **Create**. For detailed steps, see [Create a managed private endpoint](security-managed-private-endpoints-create.md).

Once the managed private endpoint is created and approved on the external data source, artifacts in the outbound access protected workspace can connect to the data source.

## Related content

- [Workspace outbound access protection overview](./workspace-outbound-access-protection-overview.md)
- [Workspace outbound access protection - scenarios](./workspace-outbound-access-protection-scenarios.md)
