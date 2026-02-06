---
title: Access a Notebook from a Pipeline to a Notebook in a Restricted Workspace
description: Learn how to securely run a pipeline from an open workspace to a notebook in a restricted workspace by using a pipeline and workspace-level private links in Microsoft Fabric.
author: msmimart
ms.author: mimart
ms.reviewer: karthikeyana
ms.topic: how-to
ms.custom:
ms.date: 08/13/2025

#customer intent: As a workspace admin, I want to understand how to securely access Power BI in a restricted workspace from an open workspace by using workspace-level private links, including setup steps and best practices.

---

# Use a pipeline to access a lakehouse in an inbound restricted workspace from an open workspace

You can use a pipeline to establish [cross-workspace communication](security-cross-workspace-communication.md) between an open workspace and a workspace that [restricts inbound public access](security-workspace-level-private-links-set-up.md#step-8-deny-public-access-to-the-workspace). For example, you can create a pipeline in an open workspace to access a lakehouse in an inbound restricted workspace. This setup allows the notebook in Workspace 1 to securely access the lakehouse and read Delta Lake tables in Workspace 2 without exposing them to public access.

## Step 1: Create the workspaces

You need both an open workspace and a restricted workspace. This article refers to the workspaces as follows:

* The source workspace is the *open* workspace without public access restriction. It's where you create a pipeline.
* The target workspace is the *restricted* workspace with inbound public access restriction. It's where you create the lakehouse.

To create the workspaces, follow these steps:

1. Create two workspaces in Microsoft Fabric. For details, see [Create a workspace](/fabric/fundamentals/create-workspaces).

1. In the tenant settings, [enable workspace-level inbound access protection](security-workspace-enable-inbound-access-protection.md).

1. For the target workspace, [set up workspace-level private links](security-workspace-level-private-links-set-up.md).

## Step 2: Create a lakehouse in the restricted workspace

Create a lakehouse in the target (restricted) workspace by using the following Create Lakehouse API:

   `POST https://{workspaceid}.z{xy}.w.api.fabric.microsoft.com/workspaces/{workspaceID}/lakehouses`

   :::image type="content" source="media/security-workspace-private-links-example-pipeline/create-in-target-workspace.png" alt-text="Screenshot that shows creating a lakehouse." lightbox="media/security-workspace-private-links-example-pipeline/create-in-target-workspace.png":::

## Step 3: Create a managed private endpoint

Create a managed private endpoint in the source (open) workspace. Use the **Workspace** setting in the portal or the following API:

```http
POST https://{workspaceFQDN}/v1/workspaces/{workspaceID}/managedPrivateEndpoints
```

In that code, `{workspaceFQDN}` is `{workspaceID}.z{xy}.w.api.fabric.microsoft.com`.

For example: `POST https://aaaaaaaa000011112222bbbbbbbbbbbb.zaa.w.api.fabric.microsoft.com/v1/workspaces/aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb/managedPrivateEndpoints`.

The `targetPrivateLinkResourceId` parameter is the resource ID of the Azure Private Link service in the restricted workspace. To create a managed private endpoint to the target workspace, you need this resource ID.

:::image type="content" source="media/security-workspace-private-links-example-pipeline/create-managed-private-endpoint-api.png" alt-text="Screenshot that shows the API for creating a managed private endpoint." lightbox="media/security-workspace-private-links-example-pipeline/create-managed-private-endpoint-api.png":::

You can find this resource ID in Azure by viewing the resource JSON for the workspace. Ensure that the workspace ID in the JSON matches the intended target workspace.

:::image type="content" source="media/security-workspace-private-links-example-pipeline/resource-json.png" alt-text="Screenshot that shows how to get the Private Link resource ID in a resource JSON file." lightbox="media/security-workspace-private-links-example-pipeline/resource-json.png":::

The Private Link service owner for Workspace 2 needs to approve the request for a managed private endpoint in **Azure private link center** > **Pending connections**.

## Step 4: Upload a Delta Lake table to the lakehouse

Use Azure Storage Explorer to upload the folder for your Delta Lake table into the restricted lakehouse's managed storage:

1. Go to Storage Explorer, select the connection icon on the left menu, and then select **ADLS Gen2 container or directory**.

1. Sign in by using OAuth.

1. Enter a display name for the storage, and enter the blob container URL in the following format:

      `https://{workspaceID}.z{xy}.onelake.fabric.microsoft.com/{workspaceID}/{lakehouseID}`

      In that code, `workspaceID` is the workspace ID without dashes, and `{xy}` is the first two characters of the workspace ID.

      :::image type="content" source="media/security-workspace-private-links-example-pipeline/enter-connection-info.png" alt-text="Screenshot that shows entering connection information." lightbox="media/security-workspace-private-links-example-pipeline/enter-connection-info.png":::

1. Select **Connect**. The storage should now appear in the explorer view.

1. Under the **Tables** folder, upload the Delta Lake table that you want to use. This example uses the **customers** table.

      :::image type="content" source="media/security-workspace-private-links-example-pipeline/upload-folder.png" alt-text="Screenshot that shows the option to upload a folder." lightbox="media/security-workspace-private-links-example-pipeline/upload-folder.png":::

## Step 5: Create a notebook in the restricted workspace

Create a notebook that reads from the table and writes to a new table. To do so, create a notebook in an open workspace by using the UI:

1. In the open workspace, create a lakehouse with the same table and a similar notebook by using the UI.

   :::image type="content" source="media/security-workspace-private-links-example-pipeline/load-file-new-table.png" alt-text="Screenshot that shows the page for loading a file to a new table." lightbox="media/security-workspace-private-links-example-pipeline/load-file-new-table.png":::

1. Connect the lakehouse in the notebook, and run the script for creating a new table:

   ```
   df = spark("SELECT * FROM Lakehouse_Open.customers")
   display(df)
   df.write.mode("overwrite").saveAsTable("Lakehouse_Open.customersnew")
   ```

   :::image type="content" source="media/security-workspace-private-links-example-pipeline/run-script.png" alt-text="Screenshot that shows running the script for creating a new table." lightbox="media/security-workspace-private-links-example-pipeline/run-script.png":::

1. Save the notebook.

1. Retrieve the notebook definition via API and get the location result:

   ```
   Get Notebook Definition API: GET https://{WorkspaceID w/o (-)}.zxy.w.api.fabric.microsoft.com/{WorkspaceID}/notebooks/getDefinition

   Get location API: GET {location}/result
   ```

1. Convert `notebook-content.py` from Base64 to JSON, copy the converted content, and then convert the content back from JSON to Base64 after you update the following values with values from the restricted lakehouse.  

1. Create a notebook with the definition by using the updated request body:
  
   ```
   Create Notebook API: GET https://{WorkspaceID w/o (-)}.zxy.w.api.fabric.microsoft.com/{WorkspaceID}/notebooks

   Get location API: GET {location}/result
   ```

## Step 6: Create a pipeline in the open workspace

1. In the open workspace, create a pipeline by using the Fabric portal or API.

1. Add a notebook activity.

1. In **Settings**, create a connection.

   :::image type="content" source="media/security-workspace-private-links-example-pipeline/connect-data-source.png" alt-text="Screenshot that shows the pane for connecting a data source." lightbox="media/security-workspace-private-links-example-pipeline/connect-data-source.png":::

1. Select the restricted workspace.

   :::image type="content" source="media/security-workspace-private-links-example-pipeline/select-protected-workspace.png" alt-text="Screenshot that shows selecting a restricted workspace." lightbox="media/security-workspace-private-links-example-pipeline/select-protected-workspace.png":::

1. Add the notebook ID as a parameter:

   `@pipeline().parameters.notebookId`

1. In the pipeline parameters, enter the actual notebook ID from the restricted workspace.  

   :::image type="content" source="media/security-workspace-private-links-example-pipeline/pipeline-parameters-notebook-id.png" alt-text="Screenshot that shows where to add a notebook ID." lightbox="media/security-workspace-private-links-example-pipeline/pipeline-parameters-notebook-id.png":::

1. Save the pipeline and copy the pipeline ID.

## Step 7: Run the pipeline via API

1. Trigger the pipeline by using the API. For example, use Bruno.

   Here's the format of the API endpoint for the pipeline run:

   ```
   https://{openWsIdWithoutDashes}.zxy.w.api.fabric.microsoft.com/v1/workspaces/{openWsId}/items/{pipelineId}/jobs/instances?jobType=Pipeline`

   Get location API: GET {location}
   ```

1. Wait for the run status to finish. You can check the status on the **Monitor** page in the Fabric portal.

   :::image type="content" source="media/security-workspace-private-links-example-pipeline/monitor.png" alt-text="Screenshot that shows the Monitor page." lightbox="media/security-workspace-private-links-example-pipeline/monitor.png":::

## Step 8: Verify table creation

1. Open Storage Explorer in the restricted workspace's lakehouse.

1. Confirm that the new table was created.

1. Use the List Tables API to get the lakehouse tables:

   ```http
   List Tables API: GET https://{openWsIdWithoutDashes}.zxy.w.api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{lakehouseId}/tables
   ```
