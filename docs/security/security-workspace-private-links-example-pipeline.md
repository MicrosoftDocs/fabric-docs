---
title: Access a notebook from a Pipeline to a Notebook in a Restricted Workspace
description: Learn how to securely run a pipeline from an open workspace to a notebook in a restricted workspace using a pipeline and workspace-level private links in Microsoft Fabric.
author: msmimart
ms.author: mimart
ms.reviewer: danzhang
ms.topic: how-to
ms.custom:
ms.date: 08/13/2025

#customer intent: As a workspace admin, I want to understand how to securely access Power BI in a restricted workspace from an open workspace using workspace-level private links, including setup steps and best practices.

---

# Use a pipeline to access a lakehouse in an inbound restricted workspace from an open workspace

A pipeline can be used to establish [cross-workspace communication](security-cross-workspace-communication.md) between an open workspace and a workspace that [restricts inbound public access](security-workspace-level-private-links-set-up.md#step-8-deny-public-access-to-the-workspace). For example, you can create a pipeline in an open workspace to access a lakehouse in an inbound restricted workspace. This setup allows the notebook in Workspace 1 to securely access the lakehouse and read Delta tables in Workspace 2 without exposing them to public access.

## Step 1: Create the workspaces

You need both an open workspace and a restricted workspace. In this article, the workspaces are referred to as follows:

* The source workspace is the *open* workspace without public access restriction and is where you create a pipeline.
* The target workspace is the *restricted* workspace with inbound public access restriction and is where you create the lakehouse.

To create the workspaces, follow these steps:

1. Create two workspaces in Fabric. For details, see [Create a workspace](/fabric/fundamentals/create-workspaces).
1. In the tenant settings, [enable workspace-level inbound access protection](security-workspace-enable-inbound-access-protection.md).
1. For the target workspace, [set up workspace-level private links](security-workspace-level-private-links-set-up.md).

## Step 2: Create a lakehouse in the restricted workspace

Create a lakehouse in the target (restricted) workspace by using the following Create Lakehouse API:

   `POST https://{workspaceid}.z{xy}.w.api.fabric.microsoft.com/workspaces/{workspaceID}/lakehouses`

   :::image type="content" source="./media/security-workspace-private-links-example-notebook/create-in-target-workspace.png" alt-text="Image showing creating a lakehouse." lightbox="./media/security-workspace-private-links-example-notebook/create-in-target-workspace.png":::

## Step 3: Create a managed private endpoint

Create a managed private endpoint (MPE) in the source (open) workspace. Use the Workspace setting in the portal or the following API:

```http
POST https://{workspaceFQDN}/v1/workspaces/{workspaceID}/managedPrivateEndpoints
```

Where `{workspaceFQDN}` is `{workspaceID}.z{xy}.w.api.fabric.microsoft.com`

For example: `POST https://aaaaaaaa000011112222bbbbbbbbbbbb.zaa.w.api.fabric.microsoft.com/v1/workspaces/aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb/managedPrivateEndpoints`

The `targetPrivateLinkResourceId` is the resource ID of the private link in the restricted workspace. To create a managed private endpoint to the target workspace, you need the private link service Resource ID of the target workspace. 

:::image type="content" source="./media/security-workspace-private-links-example-notebook/create-managed-private-endpoint-api.png" alt-text="Image showing the create MPE API":::

You can find this Resource ID in Azure by viewing the Resource JSON for the workspace. Ensure that the workspace ID in the JSON matches the intended target workspace.

:::image type="content" source="./media/security-cross-workspace-communication/resource-json.png" alt-text="Screenshot showing how to get the private link resource ID in the resource json file." :::

The private link service owner for Workspace 2 needs to approve the managed private endpoint request in **Azure private link center** > **Pending connections**. 

## Step 4: Upload a Delta table to the lakehouse

Use Azure Storage Explorer to upload your Delta table folder into the restricted lakehouse's managed storage.

1. Go to Azure Storage Explorer, select the connection icon in the left menu, and then select **ADLS Gen2 container or directory**.

      :::image type="content" source="./media/security-workspace-private-links-example-notebook/select-resource.png" alt-text="Image showing where to select a resource." lightbox="./media/security-workspace-private-links-example-notebook/select-resource.png":::

1. Sign in using OAuth. 
1. Enter a display name for the storage and enter the blob container URL in the following format:

      `https://{workspaceID}.z{xy}.onelake.fabric.microsoft.com/{workspaceID}/{lakehouseID}`

      Where: `workspaceID` is the workspace ID without dashes and `{xy}` is the first two characters of the workspace ID.

      :::image type="content" source="./media/security-workspace-private-links-example-notebook/enter-connection-info.png" alt-text="Image showing where to enter the connection info."lightbox="./media/security-workspace-private-links-example-notebook/enter-connection-info.png":::

1. Select **Connect**. The storage should now be displayed in the explorer view.

1. Under the **Tables** folder, upload the Delta table you want to use. This example uses the *customers* table.

      :::image type="content" source="./media/security-workspace-private-links-example-notebook/upload-folder.png" alt-text="Image showing where to use the upload folder option."lightbox="./media/security-workspace-private-links-example-notebook/upload-folder.png":::

## Step 5: Create a Notebook in the restricted workspace

Create a notebook that reads from the table and writes to a new table. To do so, create a notebook in an open workspace using UI. 

1. In the open workspace, create a lakehouse with the same table and a similar notebook using the UI.
 
   :::image type="content" source="./media/security-workspace-private-links-example-pipeline/load-file-new-table.png" alt-text="Screenshot showing the load file to new table page."lightbox="./media/security-workspace-private-links-example-pipeline/load-file-new-table.png":::

1. Connect the lakehouse in the notebook, and run the script for creating a new table.

   :::image type="content" source="./media/security-workspace-private-links-example-pipeline/run-script.png" alt-text="Screenshot showing running the script for creating a new table."lightbox="./media/security-workspace-private-links-example-pipeline/run-script.png":::

   ```
   df = spark("SELECT * FROM Lakehouse_Open.customers")
   display(df)
   df.write.mode("overwrite").saveAsTable("Lakehouse_Open.customersnew")
   ```   

1. Save the Notebook. 
1. Retrieve the Notebook Definition via API and get the location result 

   ```
   Get Notebook Definition API: GET https://{WorkspaceID w/o (-)}.zxy.w.dailyapi.fabric.microsoft.com/{WorkspaceID}/notebooks/getDefinition

   Get location API: GET {location}/result
   ```
 
1. Convert the **notebook-content.py** from Base64 to JSON, copy the converted content, and then convert it back from JSON to Base64 after updating the following values with values from the restricted lakehouse.  
 
1. Create a notebook with the definition using the updated request body.
  
```
   Create Notebook API: GET https://{WorkspaceID w/o (-)}.zxy.w.dailyapi.fabric.microsoft.com/{WorkspaceID}/notebooks

   Get location API: GET {location}/result
```

## Step 6: Create a pipeline in the Open Workspace 

1. In the open workspace, create a pipeline using the Fabric portal or API. 
1. Add a Notebook Activity.
1. In Settings, create a Connection.

   :::image type="content" source="./media/security-workspace-private-links-example-pipeline/connect-data-source.png" alt-text="Screenshot showing the connect data source page."lightbox="./media/security-workspace-private-links-example-pipeline/connect-data-source.png":::

1. Select the restricted workspace.

   :::image type="content" source="./media/security-workspace-private-links-example-pipeline/select-protected-workspace.png" alt-text="Screenshot showing selecting the restricted workspace."lightbox="./media/security-workspace-private-links-example-pipeline/select-protected-workspace.png":::

1. Add the Notebook ID as parameter.

   `@pipeline().parameters.notebookId` 

1. In the pipeline parameters, input the actual notebook ID from the restricted workspace.  

   :::image type="content" source="./media/security-workspace-private-links-example-pipeline/pipeline-parameters-notebook-id.png" alt-text="Screenshot showing where to add the notebook ID."lightbox="./media/security-workspace-private-links-example-pipeline/pipeline-parameters-notebook-id.png":::

1. Save the pipeline and copy the pipeline ID 

## Step 7: Run the pipeline via API

1. Trigger the pipeline using the API, for example using Bruno. 

   Format for the pipeline Run API Endpoint:

   `https://{openWsIdWithoutDashes}.zxy.w.api.fabric.microsoft.com/v1/workspaces/{openWsId}/items/{pipelineId}/jobs/instances?jobType=Pipeline`

   Get location API: GET {location}

1. Wait for the run status to complete. You can check the status in the Monitor page in the Microsoft Fabric portal.
 
   :::image type="content" source="./media/security-workspace-private-links-example-pipeline/monitor.png" alt-text="Screenshot showing the Monitor page."lightbox="./media/security-workspace-private-links-example-pipeline/monitor.png":::


## Step 8: Verify Table Creation

1. Open Azure Storage Explorer in the restricted workspace’s lakehouse.
1. Confirm that the new table was created.
1. Use the List Tables API to get the lakehouse tables:

   ```http
   List Tables API: GET https://{openWsIdWithoutDashes}.zxy.w.api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{lakehouseId}/tables
   ```
 
