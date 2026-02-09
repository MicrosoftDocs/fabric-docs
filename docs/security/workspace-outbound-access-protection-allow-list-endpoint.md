---
title: Create an allow list using managed private endpoints
description: "Learn how to create an allow list using managed private endpoints on Microsoft Fabric workspaces."
author: msmimart
ms.author: mimart
ms.service: fabric
ms.topic: how-to
ms.date: 12/01/2025

#customer intent: As a data platform administrator, I want to set up outbound access protection for my workspace and create an allow list using managed private endpoints so that I can control and secure how my workspace resources connect to external networks.

---
# Create an allow list using managed private endpoints

When outbound access protection is enabled for a workspace, all outbound connections are blocked by default. For Data Engineering and OneLake workloads, you can then permit access to external data sources or other workspaces by configuring [managed private endpoints](security-managed-private-endpoints-overview.md):

- For connections to external data sources, use managed private endpoints.
- For connections to other workspaces, use managed private endpoints together with the Private Link service.

This article explains how to create managed private endpoints for both of these scenarios. Managed private endpoints apply to Data Engineering and OneLake workloads. For Data Factory, use [data connection rules](./workspace-outbound-access-protection-allow-list-connector.md) to allow outbound access.

> [!NOTE]
> Before creating managed private endpoints, make sure you have completed the steps to [enable outbound access protection](./workspace-outbound-access-protection-set-up.md) for your workspace.

## Allow outbound access to an external source 

To enable outbound access to external data sources that support managed private endpoints, create a managed private endpoint in your workspace with outbound access protection enabled. The diagram below illustrates Workspace 1, which has outbound access protection turned on, connecting securely to an external data source through a managed private endpoint.

:::image type="content" source="media/workspace-outbound-access-protection-allow-list-endpoint/connect-workspace-data-source-diagram.png" alt-text="Diagram showing a connection from a workspace to a data source." lightbox="media/workspace-outbound-access-protection-allow-list-endpoint/connect-workspace-data-source-diagram.png" border="false":::

To enable this scenario, follow these steps:

1. Make sure [outbound access protection is enabled](workspace-outbound-access-protection-set-up.md) for the workspace.

1. Sign in to Fabric as a workspace admin and create a managed private endpoint by going to **Workspace settings** > **Network Security** > **Managed Private Endpoints** > **Create**. For detailed steps, see [Create a managed private endpoint](security-managed-private-endpoints-create.md).

After the managed private endpoint is created and approved on the external data source, artifacts in the outbound access protected workspace can connect to the data source.

## Allow outbound access to another workspace in the tenant

To connect to another workspace in the tenant, use managed private endpoints and the Private Link service to enable secure outbound connections. As described in this section, create a Private Link service for the target workspace (Workspace 2 in the diagram) by deploying an ARM template, and then create a managed private endpoint in the outbound access protected workspace (Workspace 1) to connect to the target workspace.

:::image type="content" source="media/workspace-outbound-access-protection-allow-list-endpoint/private-link-service-diagram.png" alt-text="Diagram showing a connection from an outbound access protection enabled workspace to another workspace." lightbox="media/workspace-outbound-access-protection-allow-list-endpoint/private-link-service-diagram.png" border="false":::

### Create the Private Link service for the target workspace

1. Sign in to the [Azure portal](https://portal.azure.com/).

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

1. In the Fabric portal, open the workspace that has [outbound access protection enabled](workspace-outbound-access-protection-set-up.md).

1. Select **Workspace settings** > **Outbound networking**.

1. On the **Network Security** page, under **Managed Private Endpoints**, select **Create**.

1. Enter a name for the managed private endpoint.

1. Under **Resource identifier**, paste the resource ID of the Private Link service created in the previous section. You can also find the resource ID in the Azure portal by opening the Private Link service in Resource Manager and selecting **JSON View** to open the resource JSON.

   :::image type="content" source="media/workspace-outbound-access-protection-allow-list-endpoint/copy-paste-resource-id.png" alt-text="Screenshot showing the resource JSON with the resource ID." lightbox="media/workspace-outbound-access-protection-allow-list-endpoint/copy-paste-resource-id.png":::
    
1. Under **Target sub-resource**, select **Workspace**. Then select **Create**.

   :::image type="content" source="media/workspace-outbound-access-protection-allow-list-endpoint/create-managed-private-endpoint.png" alt-text="Screenshot showing the page for creating a managed private endpoint." lightbox="media/workspace-outbound-access-protection-allow-list-endpoint/create-managed-private-endpoint.png":::

> [!IMPORTANT]
> The activation status displays *Provisioning* and the approval status is blank, meaning the managed private endpoint request is pending approval. A tenant admin must approve the request as described in the next section.

### Approve the managed private endpoint connection

A tenant admin must approve the pending managed private endpoint request by completing the following steps. 

1. Sign in to the [Azure portal](https://portal.azure.com).

1. Search for and select **Private Link Services**.

1. Select **Pending connections**. 

1. Select the connection with the name specified in the template, and then select **Approve**.

   :::image type="content" source="media/workspace-outbound-access-protection-allow-list-endpoint/approve-connection.png" alt-text="Screenshot of the button for approving the connection." lightbox="media/workspace-outbound-access-protection-allow-list-endpoint/approve-connection.png":::

1. After about 15 minutes, check the status of the managed private endpoint: In the Fabric portal, open the outbound access protected workspace and go to **Workspace settings** > **Outbound networking**. On the Network Security page, verify the activation status is **Succeeded** and the approval status is **Approved**.

   :::image type="content" source="media/workspace-outbound-access-protection-allow-list-endpoint/activation-succeeded.png" alt-text="Screenshot showing the activated and approved connection." lightbox="media/workspace-outbound-access-protection-allow-list-endpoint/activation-succeeded.png":::

The cross-workspace managed private endpoint is now set up between the outbound access protected workspace and the target workspace. Workspace admins and contributors can now connect to artifacts in the target workspace from the outbound access protected workspace.

## Related content

- [Workspace outbound access protection overview](./workspace-outbound-access-protection-overview.md)
