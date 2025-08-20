---
title: Set Up VNet gateway to Access Lakehouse From Power BI
description: Learn how to configure a virtual network (VNet) gateway to securely connect Power BI to a lakehouse using Azure Data Lake Storage Gen2.
author: msmimart
ms.author: mimart
ms.reviewer: danzhang
ms.topic: how-to
ms.custom:
ms.date: 08/13/2025

#customer intent: As a workspace admin, I want to learn how to set up and use a virtual network (VNet) gateway to securely access a lakehouse from a Power BI semantic model.

---

# Access inbound restricted lakehouse data from Power BI using a VNet gateway

A Virtual Network (VNet) gateway can be used to establish cross-workspace communication between an open workspace and a workspace that [restricts inbound public access](security-workspace-level-private-links-set-up.md#step-8-deny-public-access-to-the-workspace). For example, if you want to access a lakehouse in an inbound restricted workspace from Power BI reports and semantic models in an open workspace, you can set up a VNet gateway. A VNet gateway is deployed within an Azure virtual network and acts as a secure bridge between your data resources and Fabric cloud services.

:::image type="content" source="media/security-workspace-private-links-example-power-bi-virtual-network/virtual-network-data-gateway.png" alt-text="Diagram illustrating a connection using an on-premises data gateway." border="false":::  

In this diagram, the open workspace (Workspace 1) contains Power BI reports and a semantic model that is bound to a VNet gateway. The VNet gateway enables the connection to the lakehouse in the inbound restricted workspace. This setup allows Power BI reports and semantic models in Workspace 1 to securely access the lakehouse in Workspace 2 without exposing it to public access.

This article explains how to connect an open workspace to data in a restricted workspace using a VNet gateway for Power BI semantic models.

## Step 1: Create the workspaces

You need both an open workspace and a restricted workspace. In this article, the workspaces are referred to as follows:

* The source workspace is the *open* workspace without public access restriction and is where you create the reports and semantic models.
* The target workspace is the *restricted* workspace with public access restriction and is where you create the lakehouse.

To create the workspaces, follow these steps:

1. Create two workspaces in Fabric. For details, see [Create a workspace](/fabric/fundamentals/create-workspaces).
1. In the tenant settings, [enable workspace-level inbound access protection](security-workspace-enable-inbound-access-protection.md).
1. For the target workspace, [set up workspace-level private links](security-workspace-level-private-links-set-up.md).

> [!NOTE]
> This article refers to the *workspaceFQDN*, which is the fully qualified domain name (FQDN) of the workspace. The format is:
>
>`https://{workspaceID}.z{xy}.w.api.fabric.microsoft.com`
>
> Or
>
>`https://{workspaceID}.z{xy}.onelake.fabric.microsoft.com`
>
>Where the `{workspaceID}` is the workspace ID without dashes, and `{xy}` is the first two letters of the workspace object ID (see also [Connecting to workspaces](./security-workspace-level-private-links-overview.md#connecting-to-workspaces)).
>
>You can find a workspace ID by opening the workspace page in the Fabric portal and noting the ID after "groups/" in the URL. You can also find a workspace FQDN using *List workspace* or *Get workspace* in the API.

## Step 2: Create a lakehouse in the target (restricted) workspace

Create a lakehouse in the target workspace and upload a Delta table to it by following these steps.

1. Create a lakehouse in the target workspace using the API. Use the format:

   ```http
   POST https://{workspaceFQDN}/v1/workspaces/{workspaceID}/lakehouses
   ```
   where `{workspaceFQDN}` is `{workspaceID}.z{xy}.w.api.fabric.microsoft.com`

   For example: `POST https://aaaaaaaa000011112222bbbbbbbbbbbb.zaa.w.api.fabric.microsoft.com/v1/workspaces/aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb/lakehouses`

1. Add data to the lakehouse by using Azure Storage Explorer to upload your Delta table folder into the lakehouse. In Azure Storage Explorer, select **ADLS Gen2 container or directory**.  

   :::image type="content" source="media/security-workspace-private-links-example-power-bi-virtual-network/select-resource.png" alt-text="Screenshot of selecting the resource." lightbox="media/security-workspace-private-links-example-power-bi-virtual-network/select-resource.png":::

1. Sign in. In the **Enter Connection Info** page, enter a display name for the storage and enter the blob container URL in the following format:

   `https://{workspaceFQDN}/{workspaceID}/{lakehouseID}`

    where `{workspaceFQDN}` is `{workspaceID}.z{xy}.onelake.fabric.microsoft.com`

   For example: `POST https://aaaaaaaa000011112222bbbbbbbbbbbb.zaa.w.api.fabric.microsoft.com/v1/workspaces/aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb/bbbbbbbb-1111-2222-3333-cccccccccccc`

1. Select **Connect**. The storage should now be displayed in the explorer view. 

1. Under the **Tables** folder, upload the Delta table you want to use (for example, the `customers` table).
   
   :::image type="content" source="media/security-workspace-private-links-example-power-bi-virtual-network/upload-folder.png" alt-text="Screenshot of the upload folder pane." lightbox="media/security-workspace-private-links-example-power-bi-virtual-network/upload-folder.png":::

## Step 3: Create a semantic model in the open workspace

Now that you have a lakehouse in the restricted workspace, you can create a semantic model in the open workspace that references this lakehouse.    

1. In the open workspace, create a semantic model using a definition with the same table schema as in the restricted lakehouse. Use the following API:

   ```http
   POST https://{workspaceFQDN}/v1/workspaces/{workspaceID}/semanticModels
   ```

   where `{workspaceFQDN}` is `{workspaceID}.z{xy}.w.api.fabric.microsoft.com`

1. Before executing the semantic model creation, edit the data source to reference the restricted lakehouse’s connection string and lakehouse ID. Convert the file (for example, `definition/tables/customers.tmdl`) from the semantic model definition from Base64 to JSON and copy the output.

   :::image type="content" source="media/security-workspace-private-links-example-power-bi-virtual-network/convert-json-copy.png" alt-text="Screenshot of converting from Base64 to JSON." lightbox="media/security-workspace-private-links-example-power-bi-virtual-network/convert-json-copy.png":::

1. Update the source with the restricted lakehouse’s connection string and database ID. Then convert the JSON back to Base64 and use it in your semantic model creation request.

   :::image type="content" source="media/security-workspace-private-links-example-power-bi-virtual-network/convert-back.png" alt-text="Screenshot of converting JSON back to Base64." lightbox="media/security-workspace-private-links-example-power-bi-virtual-network/convert-back.png":::

1. Use the Get Lakehouse API to retrieve the connection string and lakehouse ID:

   ```http
   GET https://{workspaceFQDN}/v1/workspaces/{workspaceID}/lakehouses
   ```

   where `{workspaceFQDN}` is `{workspaceID}.z{xy}.w.api.fabric.microsoft.com`

## Step 4: Enable a gateway connection in the semantic model settings

To enable the semantic model to connect to the lakehouse in the restricted workspace, you need to set up a VNet gateway and bind it to the semantic model.

1. In the Power BI semantic model settings, turn on the toggle under **Gateway Connections**.

   :::image type="content" source="media/security-workspace-private-links-example-power-bi-virtual-network/gateway-connections.png" alt-text="Screenshot of enabling gateway connections." lightbox="media/security-workspace-private-links-example-power-bi-virtual-network/gateway-connections.png" :::

1. In the Fabric portal settings, go to **Manage Connections and Gateways**. Create a VNet gateway using the **Virtual Network** and **Subnet** created in the resource group you're using.

   :::image type="content" source="media/security-workspace-private-links-example-power-bi-virtual-network/create-gateway.png" alt-text="Screenshot of creating a VNet gateway." lightbox="media/security-workspace-private-links-example-power-bi-virtual-network/create-gateway.png":::

   > [!NOTE]
   > For the **Subnet**, make sure the **Microsoft.PowerPlatform/vnetaccesslinks** delegation is attached: In the **Virtual Network** settings, select the subnet, and under **Subnet Delegation**, choose **Microsoft.PowerPlatform/vnetaccesslinks**.

1. Use the API to retrieve the Gateway ID for the installed gateway instance:  

   `https://api.fabric.microsoft.com/v1/gateways`

1. In Power BI, create the VNet gateway SQL Server connection. Use the lakehouse server name and lakehouse ID as the database, authenticate using OAuth2, and copy the resulting Connection ID.

   :::image type="content" source="media/security-workspace-private-links-example-power-bi-virtual-network/gateway-connection-settings.png" alt-text="Screenshot of settings connection name." lightbox="media/security-workspace-private-links-example-power-bi-virtual-network/gateway-connection-settings.png":::

1. Use the Bind Gateway API to bind the semantic model to the gateway ID and connection ID:

      `https://{WorkspaceID w/o (-)}.zxy.w.dailyapi.fabric.microsoft.com/{WorkspaceID}/datasets/{Semantic Model ID}/Default.BindToGateway`

   where `{workspaceFQDN}` is `{workspaceID}.z{xy}.w.dailyapi.fabric.microsoft.com`

1. Verify the gateway binding: In the semantic model settings, refresh the page. The VNet gateway should now be shown as the active gateway.

      :::image type="content" source="media/security-workspace-private-links-example-power-bi-virtual-network/verify-gateway-binding.png" alt-text="Screenshot of verify gateway binding." lightbox="media/security-workspace-private-links-example-power-bi-virtual-network/verify-gateway-binding.png":::

1. Refresh the dataset.

   :::image type="content" source="media/security-workspace-private-links-example-power-bi-virtual-network/refresh-dataset.png" alt-text="Screenshot of refresh dataset." lightbox="media/security-workspace-private-links-example-power-bi-virtual-network/refresh-dataset.png":::

1. Build a report using the semantic model. The report should now be able to access the lakehouse data in the restricted workspace through the VNet gateway.

   :::image type="content" source="media/security-workspace-private-links-example-power-bi-virtual-network/run-report.png" alt-text="Screenshot of building a report." lightbox="media/security-workspace-private-links-example-power-bi-virtual-network/run-report.png":::
