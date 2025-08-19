---
title: Set up workspace outbound access protection
description: "Learn how to set up workspace outbound access protection on Microsoft Fabric workspaces."
author: msmimart
ms.author: mimart
ms.service: fabric
ms.topic: how-to
ms.date: 08/18/2025

#customer intent: As a data platform administrator, I want to set up outbound access protection for my workspace so that I can control and secure how my workspace resources connect to external networks.

---

# Set up workspace outbound access protection (preview)

Workspace outbound access protection in Microsoft Fabric enables you to control and secure how your workspace resources connect to external networks. With this feature, you can restrict or allow outbound connections based on your organization's security policies. [Learn more](./workspace-outbound-access-protection-overview.md).

This article explains how to set up outbound access protection for your Fabric workspaces, including instructions for enabling or disabling the feature using both the user interface and API.

## Prerequisites

* The workspace where you want to set up outbound access protection must reside on a Fabric capacity. No other capacity types are supported.

* You must have an Admin role in the workspace.

* A Fabric tenant administrator must enable the tenant setting **Configure workspace-level outbound network rules**. See [Manage admin access to outbound access protection settings](workspace-outbound-access-protection-tenant-setting.md).

* Re-register the `Microsoft.Network` feature for the subscription. From the Azure portal home page, go to **Subscriptions** > **Settings** > **Resource providers**. Select **Microsoft.Fabric** and select **Re-register**.

## Enable workspace outbound access protection 

 ### Using the Fabric portal

1. Sign in to Fabric with an account that has the Admin role in the workspace where you want to set up outbound access protection.

1. In the workspace where you want to set up outbound access protection, go to **Workspace settings** -> **Network Security**. Under **Outbound access protection (preview)**, turn on **Block outbound public access**.
 
   :::image type="content" source="media/workspace-outbound-access-protection-set-up/network-security-settings.png" alt-text="Screenshot showing outbound access protection settings." lightbox="media/workspace-outbound-access-protection-set-up/network-security-settings.png":::

### Using the API

To enable or disable workspace outbound access protection using the API, use the [Workspaces Set Network Communication Policy](/rest/api/fabric/core/workspaces/set-network-communication-policy) in the Fabric REST API. In the request body, set `outbound` to `Deny` or `Allow`, whichever is appropriate for your scenario.

## Connect an OAP-enabled workspace to another workspace within the tenant

To connect artifacts (for example, Notebook) in a workspace enabled with outbound access protection (OAP) to artifacts (for example, a Lakehouse) in another target workspace, you need to set up a cross-workspace managed private endpoint from the source to the target workspace. A private link service (PLS) must be set up on the target workspace first.

:::image type="content" source="media/workspace-outbound-access-protection-set-up/private-link-service-diagram.png" alt-text="Diagram showing a connection from an outbound access protection enabled workspace to another workspace." lightbox="media/workspace-outbound-access-protection-set-up/private-link-service-diagram.png" border="false":::

This section describes how to create a target workspace if one isn't created yet. Then it describes how to create a private link service (PLS) in the target workspace and a managed private endpoint from the OAP-enabled workspace to the target workspace.

### Create a workspace in Fabric

[Create a workspace in Fabric](/fabric/fundamentals/create-workspaces). Make sure the workspace is assigned to a Fabric capacity. You can check assignment by going to the workspace settings and selecting **License info**, as described in Step 1 of [Reassign a workspace to a different capacity](/fabric/fundamentals/workspace-license-mode#reassign-a-workspace-to-a-different-capacity-1).

### Create the private link service in Azure

Create a private link service by deploying an ARM template.

1. In a web browser, go to the [Azure portal](https://portal.azure.com/) and sign in.

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

Copy the resource ID of the PLS from the output JSON file. You'll use this resource ID in the next step to create a managed private endpoint from the OAP-enabled workspace to the target workspace.

### Set up a managed private endpoint from the OAP-enabled workspace (source) to the target workspace

This section describes how to establish connectivity between an outbound access protected (OAP) workspace and another workspace within your tenant using managed private endpoints (MPE) and private link services (PLS).

1. Open the protected (OAP-enabled) workspace in the Fabric portal from which you want to create an MPE to the target workspace.

1. Go to **Workspace settings** > **Network Security** > **Managed Private Endpoints** > **Create**.

1. Enter a name for the MPE.

1. In the resource identifier, paste the resource ID of the PLS created in step 2.2.1. You can find the Private Link Service (PLS) resource ID in Azure.

   :::image type="content" source="media/workspace-outbound-access-protection-set-up/copy-paste-resource-id.png" alt-text="Screenshot showing the resource JSON with the resource ID." lightbox="media/workspace-outbound-access-protection-set-up/copy-paste-resource-id.png":::
	
1. In the target subresource, select **Workspace** and select **Create**.

   :::image type="content" source="media/workspace-outbound-access-protection-set-up/create-managed-private-endpoint.png" alt-text="Screenshot showing the page for creating a managed private endpoint." lightbox="media/workspace-outbound-access-protection-set-up/create-managed-private-endpoint.png":::

> [!IMPORTANT]
> The activation status shows as *Provisioning* and approval as blank. A tenant admin must approve this request as described in the following section.

### Tenant admin: Approve the managed private endpoint connection

A tenant admin must approve the managed private endpoint connection by completing the following steps. 

1. Go to the Azure portal, search for **Private Link Services**, and open the **Private Link Center**.

   :::image type="content" source="media/workspace-outbound-access-protection-set-up/private-link-services-list.png" alt-text="Screenshot showing where to select private link services." lightbox="media/workspace-outbound-access-protection-set-up/private-link-services-list.png" :::

1. Under **Pending connections**, locate the pending connection with the name specified in the template.

   :::image type="content" source="media/workspace-outbound-access-protection-set-up/private-link-center-pending-connections.png" alt-text="Screenshot showing the private link center." lightbox="media/workspace-outbound-access-protection-set-up/private-link-center-pending-connections.png":::

1. Select the connection and approve it.

   :::image type="content" source="media/workspace-outbound-access-protection-set-up/approve-connection.png" alt-text="Screenshot of the button for approving the connection." lightbox="media/workspace-outbound-access-protection-set-up/approve-connection.png":::

1. After about 15 minutes, go to the OAP-enabled workspace's **Settings** > **Network Security** and verify that both the status and approval status of the MPE are successful.

   :::image type="content" source="media/workspace-outbound-access-protection-set-up/activation-succeeded.png" alt-text="Screenshot showing the activated and approved connection." lightbox="media/workspace-outbound-access-protection-set-up/activation-succeeded.png":::

The cross-workspace MPE is now set up between the OAP-enabled workspace and the target workspace. Workspace admins and contributors can now connect to artifacts in the target workspace from the OAP-enabled workspace.

## Connect the OAP-enabled workspace to other data sources

You can connect the outbound access protected (OAP) workspace to external data sources that support managed private endpoints (MPE).

:::image type="content" source="media/workspace-outbound-access-protection-set-up/connect-workspace-data-source-diagram.png" alt-text="Diagram showing a connection from a workspace to a data source." lightbox="media/workspace-outbound-access-protection-set-up/connect-workspace-data-source-diagram.png" border="false":::

1. Create an MPE from the source workspace by going to **Workspace settings** > **Network Security** > **Managed Private Endpoints** > **Create**.

1. Once the MPE is created and approved on the target, artifacts in the OAP-enabled workspace can connect to the data source.

## Related content

- [Workspace outbound access protection overview](./workspace-outbound-access-protection-overview.md)
- [Workspace outbound access protection - scenarios](./workspace-outbound-access-protection-scenarios.md)