---
title: Create an allowlist using managed private endpoints
description: "Learn how to create an allowlist using managed private endpoints on Microsoft Fabric workspaces."
author: msmimart
ms.author: mimart
ms.service: fabric
ms.topic: how-to
ms.date: 09/24/2025

#customer intent: As a data platform administrator, I want to set up outbound access protection for my workspace and create an allowlist using managed private endpoints so that I can control and secure how my workspace resources connect to external networks.

---
# Create an allowlist using managed private endpoints

The workspace outbound access protection setting blocks all outbound connections from a workspace. After [enabling this setting](./workspace-outbound-access-protection-set-up.md), a workspace admin can permit specific outbound connections to resources in other workspaces or external destinations. You can allow outbound access by creating an allowlist using [managed private endpoints](security-managed-private-endpoints-overview.md) with or without the Private Link service:

- Use managed private endpoints for connections to external sources.
- For connections to other workspaces, use managed private endpoints together with the Private Link service.

This article explains how to create managed private endpoints for both of these scenarios. Managed private endpoints apply to Data Engineering and OneLake workloads. For Data Factory, use [data connection rules](./workspace-outbound-access-protection-allow-list-connector.md) to allow outbound access.

## Prerequisites

[Enable outbound access protection](workspace-outbound-access-protection-set-up.md) for the workspace.

## Allow outbound access to an external source 

To enable outbound access to external data sources that support managed private endpoints, create a managed private endpoint in your workspace with outbound access protection enabled. The diagram below illustrates Workspace 1, which has outbound access protection turned on, connecting securely to an external data source through a managed private endpoint.

:::image type="content" source="media/workspace-outbound-access-protection-allow-list-endpoint/connect-workspace-data-source-diagram.png" alt-text="Diagram showing a connection from a workspace to a data source." lightbox="media/workspace-outbound-access-protection-allow-list-endpoint/connect-workspace-data-source-diagram.png" border="false":::

To enable this scenario:

1. Sign in to Fabric as a workspace admin.

1. Create a managed private endpoint from the source workspace by going to **Workspace settings** > **Network Security** > **Managed Private Endpoints** > **Create**.

1. Once the managed private endpoint is created and approved on the target, artifacts in the outbound access protected workspace can connect to the data source.

For detailed steps, see [Create a managed private endpoint](security-managed-private-endpoints-create.md).

## Allow outbound access to another workspace

To connect to another workspace, use managed private endpoints and the Private Link service to enable secure outbound connections. As described in this section, you create a Private Link service for the target workspace (Workspace 2 in the diagram) by deploying an ARM template, and then you create a managed private endpoint in the outbound access protected workspace (Workspace 1) to connect to the target workspace.

:::image type="content" source="media/workspace-outbound-access-protection-allow-list-endpoint/private-link-service-diagram.png" alt-text="Diagram showing workspaces connected by managed private links and private links service." lightbox="media/workspace-outbound-access-protection-allow-list-endpoint/private-link-service-diagram.png" border="false":::

### Create the Private Link service for the target workspace

1. In a web browser, go to the [Azure portal](https://portal.azure.com/) and sign in.

1. From the Azure portal search bar, search for **deploy a custom template** and then select it from the available options.

1. On the **Custom deployment** page, select **Build your own template in the editor**.

1. In the editor, create a Fabric resource using the following ARM template, where:

    * `<resource-name>` is the name you choose for the Fabric resource.
    * `<tenant-object-id>` is your Microsoft Entra tenant ID. See [How to find your Microsoft Entra tenant ID](/entra/fundamentals/how-to-find-tenant).
    * `<workspace-id>` is the workspace ID for the target workspace. Find it in the workspace URL after `group`.

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

   :::image type="content" source="media/workspace-outbound-access-protection-allow-list-endpoint/create-managed-private-endpoint-button.png" alt-text="Screenshot showing the button for creating a managed private endpoint." lightbox="media/workspace-outbound-access-protection-allow-list-endpoint/create-managed-private-endpoint-button.png":::

1. Enter a name for the managed private endpoint.

1. Under **Resource identifier**, paste the resource ID of the Private Link service created in the previous section. You can also find the resource ID in the Azure portal by opening the Private Link service in Resource Manager and selecting **JSON View** to open the resource JSON.

   :::image type="content" source="media/workspace-outbound-access-protection-allow-list-endpoint/copy-paste-resource-id.png" alt-text="Screenshot showing the resource JSON with the resource ID." lightbox="media/workspace-outbound-access-protection-allow-list-endpoint/copy-paste-resource-id.png":::
    
1. Under **Target sub-resource**, select **Workspace**. Then select **Create**.

   :::image type="content" source="media/workspace-outbound-access-protection-allow-list-endpoint/create-managed-private-endpoint.png" alt-text="Screenshot showing the page for creating a managed private endpoint." lightbox="media/workspace-outbound-access-protection-allow-list-endpoint/create-managed-private-endpoint.png":::

> [!IMPORTANT]
> The activation status displays *Provisioning* and the approval status is blank, meaning the managed private endpoint request is pending approval. A tenant admin must approve the request as described in the next section.

## Tenant admin: Approve the managed private endpoint connection

A tenant admin must approve the managed private endpoint connection by completing the following steps. 

1. In the Azure portal, search for and select **Private Link Services**.

   :::image type="content" source="media/workspace-outbound-access-protection-allow-list-endpoint/private-link-services-list.png" alt-text="Screenshot showing where to select Private Link services." lightbox="media/workspace-outbound-access-protection-allow-list-endpoint/private-link-services-list.png" :::

1. Under **Pending connections**, locate the pending connection with the name specified in the template.

   :::image type="content" source="media/workspace-outbound-access-protection-allow-list-endpoint/private-link-center-pending-connections.png" alt-text="Screenshot showing the private link center." lightbox="media/workspace-outbound-access-protection-allow-list-endpoint/private-link-center-pending-connections.png":::

1. Select the connection and approve it.

   :::image type="content" source="media/workspace-outbound-access-protection-allow-list-endpoint/approve-connection.png" alt-text="Screenshot of the button for approving the connection." lightbox="media/workspace-outbound-access-protection-allow-list-endpoint/approve-connection.png":::

1. After about 15 minutes, check the status of the managed private endpoint: In the Fabric portal, open the outbound access protected workspace and go to **Workspace settings** > **Outbound networking**. On the Network Security page, verify the activation status is **Succeeded** and the approval status is **Approved**.

   :::image type="content" source="media/workspace-outbound-access-protection-allow-list-endpoint/activation-succeeded.png" alt-text="Screenshot showing the activated and approved connection." lightbox="media/workspace-outbound-access-protection-allow-list-endpoint/activation-succeeded.png":::

The cross-workspace managed private endpoint is now set up between the outbound access protected workspace and the target workspace. Workspace admins and contributors can now connect to artifacts in the target workspace from the outbound access protected workspace.

## Related content

- [Workspace outbound access protection overview](./workspace-outbound-access-protection-overview.md)
