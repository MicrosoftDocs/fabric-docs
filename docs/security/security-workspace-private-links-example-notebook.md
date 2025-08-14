---
title: Access a lakehouse from a notebook
description: Learn how to configure and use workspace-level Private Link access for Lakehouse resources.
author: msmimart
ms.author: mimart
ms.reviewer: danzhang
ms.topic: how-to
ms.custom:
ms.date: 08/13/2025

#customer intent: As a workspace admin, I want to understand how to securely access a lakehouse in a workspace with public access restriction from an open workspace without public access restriction, including setup steps and best practices.

---

# Access a lakehouse in an inbound restricted workspace from a notebook in an open workspace 

A managed private endpoint can be used to establish [cross-workspace communication](security-cross-workspace-communication.md) between an open workspace and a workspace that [restricts inbound public access](security-workspace-level-private-links-set-up.md#step-8-deny-public-access-to-the-workspace). For example, if you want to access a lakehouse in an inbound restricted workspace from a notebook in an open workspace, you can set up a managed private endpoint (MPE) to establish a secure connection between the two workspaces.

:::image type="content" source="media/security-workspace-private-links-example-notebook/access-via-managed-private-endpoint.png" alt-text="Diagram illustrating how managed private endpoints can establish connection to a workspace set to deny public access." lightbox="media/security-workspace-private-links-example-notebook/access-via-managed-private-endpoint.png" border="false":::

In this diagram, the open workspace (Workspace 1) has a managed private endpoint that connects to the restricted workspace (Workspace 2). This setup allows the notebook in Workspace 1 to securely access the lakehouse and read Delta tables in Workspace 2 without exposing them to public access.

This article explains how to create a managed private endpoint via the workspace settings in the Fabric portal or API.

## Step 1: Create the workspaces

[Create workspaces in Fabric](/fabric/fundamentals/create-workspaces). This setup involves both an open workspace and a restricted workspace. In this article, the workspaces are referred to as follows:

* The source workspace is the open workspace without public access restriction.
* The target workspace is the workspace that restricts inbound public access.

<!-- Q: Add links to how to create an open and a restricted workspace? -->

> [!NOTE]
> This article refers to the workspace fully qualified domain name (FQDN). The format is:
>
>`https://{workspaceID}.z{xy}.w.api.fabric.microsoft.com`
>
>Where the `{workspaceID}` is the workspace ID without dashes, and `{xy}` is the first two letters of the workspace object ID (see also [Connecting to workspaces](./security-workspace-level-private-links-overview.md#connecting-to-workspaces)).
>
>You can find a workspace ID by opening the workspace page in the Fabric portal and noting the ID after "groups/" in the URL. You can also find a workspace FQDN using *List workspace* or *Get workspace* in the API.

## Step 2: Create a managed private endpoint

Create a managed private endpoint (MPE) in the source (open) workspace. Use the Workspace setting in the portal or the following API:

```http
POST https://{workspaceFQDN}/v1/workspaces/{workspaceID}/managedPrivateEndpoints
```

Where `{workspaceFQDN}` is `{workspaceID}.z{xy}.w.api.fabric.microsoft.com`

For example: `POST https://aaaaaaaa000011112222bbbbbbbbbbbb.zaa.w.api.fabric.microsoft.com/v1/workspaces/aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb/managedPrivateEndpoints`

The `targetPrivateLinkResourceId` is the resource ID of the private link in the restricted workspace. To create a managed private endpoint to the target workspace, you need the private link service Resource ID of the target workspace. 

:::image type="content" source="media/security-workspace-private-links-example-notebook/create-managed-private-endpoint-api.png" alt-text="Image showing the create MPE API" lightbox="media/security-workspace-private-links-example-notebook/create-managed-private-endpoint-api.png":::

You can find this Resource ID in Azure by viewing the Resource JSON for the workspace. Ensure that the workspace ID in the JSON matches the intended target workspace.

:::image type="content" source="media/security-workspace-private-links-example-notebook/resource-json.png" alt-text="Screenshot showing how to get the private link resource ID in the resource json file." lightbox="media/security-workspace-private-links-example-notebook/resource-json.png":::

The private link service owner for Workspace 2 needs to approve the managed private endpoint request in **Azure private link center** > **Pending connections**. 

## Step 3: Create a lakehouse in the restricted workspace

Create a lakehouse in the target (restricted) workspace by using the following Create Lakehouse API:

   ```http
   POST https://{workspaceFQDN}/v1/workspaces/{workspaceID}/lakehouses
   ```
   Where `{workspaceFQDN}` is `{workspaceID}.z{xy}.w.api.fabric.microsoft.com`

   For example: `POST https://aaaaaaaa000011112222bbbbbbbbbbbb.zaa.w.api.fabric.microsoft.com/v1/workspaces/aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb/lakehouses`

   :::image type="content" source="media/security-workspace-private-links-example-notebook/create-in-target-workspace.png" alt-text="Image showing creating a lakehouse in the target workspace" lightbox="media/security-workspace-private-links-example-notebook/create-in-target-workspace.png":::

## Step 4: Upload a Delta Table to the lakehouse

Use Azure Storage Explorer to upload your Delta Table folder into the restricted lakehouse's managed storage.

1. Go to Azure Storage Explorer, select the connection icon in the left menu, and then select **ADLS Gen2 container or directory**.

      :::image type="content" source="media/security-workspace-private-links-example-notebook/select-resource.png" alt-text="Image showing selecting the resource." lightbox="media/security-workspace-private-links-example-notebook/select-resource.png":::

1. Sign in using OAuth. 

1. Enter a display name for the storage and enter the blob container URL in the following format:

   `https://{workspaceFQDN}/{workspaceID}/{lakehouseID}`

    where `{workspaceFQDN}` is `{workspaceID}.z{xy}.onelake.fabric.microsoft.com`

   For example: `POST https://aaaaaaaa000011112222bbbbbbbbbbbb.zaa.w.api.fabric.microsoft.com/v1/workspaces/aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb/bbbbbbbb-1111-2222-3333-cccccccccccc`

   :::image type="content" source="media/security-workspace-private-links-example-notebook/enter-connection-info.png" alt-text="Image showing entering the connection info." lightbox="media/security-workspace-private-links-example-notebook/enter-connection-info.png":::

1. Select **Connect**. The storage should now be displayed in the explorer view. 

1. Under the **Tables** folder, upload the Delta table you want to use. This example uses the *customers* table.

   :::image type="content" source="media/security-workspace-private-links-example-notebook/upload-folder.png" alt-text="Image showing the upload folder option." lightbox="media/security-workspace-private-links-example-notebook/upload-folder.png":::

## Step 5: Create a notebook in the source workspace

Create a notebook and connect it to the restricted lakehouse as follows:

1. In the source workspace, go to **Notebooks**.
 
1. Select **+ New Notebook**.  

1. Select the **Spark runtime**.  

1. Connect to the target workspace in the Explorer pane.
1. Paste the following code:

   ```python
   from pyspark.sql import SparkSession
   # Read Delta table from the restricted lakehouse using Workspace DNS-based ABFSS URI
   df = spark.read.format("delta").load(
      "abfss://{LakehouseName}@{WorkspaceFQDN}/{LakehouseID}/Tables/customers"
   )
   ```

   Make sure that:

   * The ABFSS path matches your lakehouse's DNS and table location.
   * Network access between the open and restricted workspaces is correctly established via the private endpoint.

1. Run the Notebook. If the private endpoint and permissions are correctly set up, the notebook connects and displays the contents of the Delta table from the restricted lakehouse.

## Related content

* [About private links](./security-private-links-overview.md)
* [Set up and use workspace-level private links](./security-workspace-level-private-links-set-up.md)
* [Microsoft Fabric multi-workspace APIs](./security-fabric-multi-workspace-api-overview.md)
