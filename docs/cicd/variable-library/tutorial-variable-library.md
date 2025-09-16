---
title: Learn How to Use Variable Libraries
description: "Follow the steps for creating a variable library and using variable values in various stages of a deployment pipeline."
author: billmath
ms.author: billmath
ms.reviewer: Lee
ms.service: fabric
ms.subservice: cicd
ms.topic: tutorial
ms.date: 08/21/2025
ms.search.form: Variable library tutorial
#customer intent: As a developer, I want to learn how to use a Microsoft Fabric variable library to customize and share item configurations in a workspace, so that I can manage my content lifecycle.
---

# Tutorial: Use variable libraries to customize and share item configurations (preview)

This tutorial shows you how to use dynamic content in Microsoft Fabric data pipelines. When you create a variable library item and add variables to it, you can automate values for various stages of your deployment pipeline. In this tutorial, you copy data from one lakehouse to another. Then you use the variable library to set the source and destination values for the copy activity.

In this tutorial, you:

> [!div class="checklist"]
>
> * Create a variable library.
> * Add variables to the library.
> * Define additional value sets for the variables.
> * Consume the variables in another item in the workspace (a data pipeline).
> * Edit the variables in a Git repository.
> * Create a deployment pipeline and deploy the variable library.
> * Change the active value set in the target stage of the deployment pipeline.
> * Show that the value of the variable complies with the active value set in each stage.

The following diagram shows the workspace layout for this tutorial.

:::image type="content" source="media/tutorial-variable-library/conceptual-variable-library-1.png" alt-text="Diagram of a workspace layout." lightbox="media/tutorial-variable-library/conceptual-variable-library-1.png":::

> [!NOTE]
> The Fabric variable library item is currently in preview.

## Prerequisites

* A Fabric tenant account with an active subscription. [Create an account for free](../../get-started/fabric-trial.md).
* The following [tenant switches](../../admin/about-tenant-settings.md) enabled from the admin portal:
  * [Users can create Fabric items](../../admin/fabric-switch.md)
  * **Users can create variable libraries**

  The tenant admin, capacity admin, or workspace admin can enable these switches, depending on your [organization's settings](../../admin/delegate-settings.md).

## Create the Stage LHs workspace, SourceLH_Stage lakehouse with sample data, and Pipeline_Stage pipeline

First, create a workspace and lakehouse to use as your initial staging data:

1. Go to [Power BI](https://app.powerbi.com/home).

1. On the sidebar, select **Workspace**.

1. [Create a workspace](../../fundamentals/create-workspaces.md). Call it **Stage LHs**.

   :::image type="content" source="media/tutorial-variable-library/new-workspace-1.png" alt-text="Screenshot of the button for creating a new workspace." lightbox="media/tutorial-variable-library/new-workspace-1.png":::

1. Create a lakehouse:

   1. At the top of the workspace, select **New item**.

   1. Under **Store data**, select **Lakehouse**.

      :::image type="content" source="media/tutorial-variable-library/create-lakehouse-1.png" alt-text="Screenshot of the tile for selecting a lakehouse as a new item." lightbox="media/tutorial-variable-library/create-lakehouse-1.png":::

   1. Enter the name **SourceLH_Stage**, and then select **Create**.

1. Create a pipeline:

   1. In the lakehouse, select **New data pipeline**.

      :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-1.png" alt-text="Screenshot of the tile for creating a new data pipeline." lightbox="media/tutorial-variable-library/create-new-pipeline-1.png":::

   1. Enter the name **Pipeline_Stage**, and then select **Create**.

   1. In the **Copy data into Lakehouse** wizard, on the **Choose data source** page, select **Sample data**.

      :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-2.png" alt-text="Screenshot of the page for choosing a data source for copying data into a lakehouse." lightbox="media/tutorial-variable-library/create-new-pipeline-2.png":::

   1. Select **Public Holidays**.

      :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-3.png" alt-text="Screenshot of selecting Public Holidays sample data." lightbox="media/tutorial-variable-library/create-new-pipeline-3.png":::

   1. After the sample data finishes loading, select **Next**.

   1. On the **Connect to data destination** page, select **Next**.

      :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-4.png" alt-text="Screenshot of details for a pipeline destination." lightbox="media/tutorial-variable-library/create-new-pipeline-4.png":::

   1. On the **Review + save** page, select **Save + Run**.

      :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-5.png" alt-text="Screenshot of the page for saving and running a pipeline." lightbox="media/tutorial-variable-library/create-new-pipeline-5.png":::

## Create the Source LHs with Variables workspace

Now, create the workspace that you'll work out of and use with your variable library:

1. Go to [Power BI](https://app.powerbi.com/home).

1. On the sidebar, select **Workspace**.

1. [Create a workspace](../../fundamentals/create-workspaces.md). Call it **Source LHs with Variables**.

## Create the SourceLH_Dev, SourceLH_Test, and SourceLH_Prod lakehouses

Next, create the three lakehouses to use with the variable library:

1. Create the first lakehouse:

   1. On the sidebar, select the **Source LHs with Variables** workspace.

   1. Select **New item**.

   1. Under **Store data**, select **Lakehouse**.

   1. Enter the name **SourceLH_Dev**, and then select **Create**.

1. Create the second lakehouse by following the preceding steps. Name it **SourceLH_Test**.

1. Create the third lakehouse by following the preceding steps. Name it **SourceLH_Prod**.

1. On the sidebar, select the **Source LHs with Variables** workspace and make sure that it contains all the newly created lakehouses.

## Get the workspace IDs and object IDs for lakehouses

In these steps, you get the unique identifiers to use in your variable library:

1. In [Power BI](https://app.powerbi.com/home), on the sidebar, select the **Stage LHs** workspace.

1. In the workspace, select the **SourceLH_Stage** lakehouse.

1. Copy the workspace ID and the lakehouse object ID in the URL.

   :::image type="content" source="media/tutorial-variable-library/get-guid-1.png" alt-text="Screenshot that shows how to get the workspace identifier and the lakehouse object identifier." lightbox="media/tutorial-variable-library/get-guid-1.png":::

1. Repeat the preceding steps for the **SourceLH_Dev** and **SourceLH_Test** lakehouses in the **Source LHs with Variables** workspace.

## Create a variable library with variables

Now, create the variable library:

1. In the **Source LHs with Variables** workspace, select **New item**.

1. Under **Develop data**, select **Variable library (preview)**.

   :::image type="content" source="media/tutorial-variable-library/create-variable-library-1.png" alt-text="Screenshot that shows the tile for creating a variable library." lightbox="media/tutorial-variable-library/create-variable-library-1.png":::

1. Name the library **WS variables**, and then select **Create**.

1. Select **New variable**.

   :::image type="content" source="media/tutorial-variable-library/create-variable-library-2.png" alt-text="Screenshot that shows the button for selecting a new variable." lightbox="media/tutorial-variable-library/create-variable-library-2.png":::

1. Create the following variables:

   |Name|Type|Default value set|
   |-----|-----|-----|
   |`Source_LH`|String|&lt;GUID of SourceLH_Stage lakehouse&gt;|
   |`Source_WSID`|String|&lt;GUID of SourceLH_Stage workspace&gt;|
   |`Destination_LH`|String|&lt;GUID of SourceLH_Dev lakehouse&gt;|
   |`Destination_WSID`|String|&lt;GUID of SourceLH_Dev workspace&gt;|
   |`SourceTable_Name`|String|`Processed`|
   |`DestinationTable_Name`|String|`DevCopiedData`|

   :::image type="content" source="media/tutorial-variable-library/create-variable-library-3.png" alt-text="Screenshot of the finished default set for the variable library." lightbox="media/tutorial-variable-library/create-variable-library-3.png":::

1. Select **Save**.

## Create alternate value sets

In these steps, you add the alternate value sets to your variable library:

1. Create the first value set:

   1. In the **WS Variables** variable library, select **Add value set**.

   1. Enter **Test VS** for the name, and then select **Create**.

   1. Create the following variables:

      |Name|Type|Default value set|
      |-----|-----|-----|
      |`Source_LH`|String|&lt;GUID of SourceLH_Dev lakehouse&gt;|
      |`Source_WSID`|String|&lt;GUID of SourceLH_Dev workspace&gt;|
      |`Destination_LH`|String|&lt;GUID of SourceLH_Test lakehouse&gt;|
      |`Destination_WSID`|String|&lt;GUID of SourceLH_Test workspace&gt;|
      |`SourceTable_Name`|String|`DevCopiedData`|
      |`DestinationTable_Name`|String|`TestCopiedData`|

   1. Select **Save** > **Agree**.

1. Create the second value set:

   1. Select **Add value set**.

   1. Enter **Prod VS** for the name, and then select **Create**.

   1. Create the following variables:

      |Name|Type|Default value set|
      |-----|-----|-----|
      |`Source_LH`|String|&lt;GUID of SourceLH_Test lakehouse&gt;|
      |`Source_WSID`|String|&lt;GUID of SourceLH_Test workspace&gt;|
      |`Destination_LH`|String|&lt;GUID of SourceLH_Prod lakehouse&gt;|
      |`Destination_WSID`|String|&lt;GUID of SourceLH_Prod workspace&gt;|
      |`SourceTable_Name`|String|`TestCopiedData`|
      |`DestinationTable_Name`|String|`ProdCopiedData`|

      :::image type="content" source="media/tutorial-variable-library/create-variable-library-5.png" alt-text="Screenshot of the finished alternate values in a variable library." lightbox="media/tutorial-variable-library/create-variable-library-5.png":::

   1. Select **Save** > **Agree**.

## Create the Pipeline_Deploy pipeline and declare variables

In these steps, you create your pipeline and declare your variables:

1. In the **Source LHs with Variables** workspace, select **New item**.

1. Under **Get data**, select **Data pipeline**.

   :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-6.png" alt-text="Screenshot of the tile for a data pipeline." lightbox="media/tutorial-variable-library/create-new-pipeline-6.png":::

1. Enter the name **Pipeline_Deploy**, and then select **Create**.

1. Select **Copy data** > **Add to canvas**.

   :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-7.png" alt-text="Screenshot of menu selections for adding copy data to a canvas." lightbox="media/tutorial-variable-library/create-new-pipeline-7.png":::

1. Select the canvas so that the focus is off **Copy data**.

1. Select **Library variables (preview)**.

   :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-10.png" alt-text="Screenshot of the tab for library variables." lightbox="media/tutorial-variable-library/create-new-pipeline-10.png":::

1. Select **New**, and then add the following variables:

   |Name|Library|Variable name|Type|
   |-----|-----|-----|-----|
   |`SourceLH`|WS Variables|`Source_LH`|String|
   |`SourceWSID`|WS Variables|`Source_WSID`|String|
   |`DestinationLH`|WS Variables|`Destination_LH`|String|
   |`DestinationWSID`|WS Variables|`Destination_WSID`|String|
   |`SourceTableName`|WS Variables|`SourceTable_Name`|String|
   |`DestinationTableName`|WS Variables|`DestinationTable_Name`|String|
  
   :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-11.png" alt-text="Screenshot of adding variables to a pipeline." lightbox="media/tutorial-variable-library/create-new-pipeline-11.png":::

1. Select **Save**.

## Configure the source connection for the Pipeline_Deploy pipeline

In these steps, you configure the source connection for your pipeline:

1. In the **Source LHs with Variables** workspace, go to **Pipeline_Deploy**.

1. On the canvas, select **Copy data** so that the focus is on **Copy data**.

1. Select **Source**.

1. Configure **SourceLH**:

   1. Under **Source** > **Connection**, select **Add dynamic content**.

   1. Select the ellipsis (**...**), and then select **Library variables (preview)**.

   1. Select **SourceLH**. It populates the box with `@pipeline().libraryVariables.SourceLH`. Select **OK**.

      :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-12.png" alt-text="Screenshot of the pane for adding dynamic content for a connection source." lightbox="media/tutorial-variable-library/create-new-pipeline-12.png":::

1. Configure **SourceWSID**:

   1. Under **Source** > **Workspace ID**, select **Add dynamic content**.

   1. Select the ellipsis (**...**), and then select **Library variables (preview)**.

   1. Select **SourceWSID**. It populates the box with `@pipeline().libraryVariables.SourceWSID`. Select **OK**.

      :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-14.png" alt-text="Screenshot of the pane for adding dynamic content for a workspace source." lightbox="media/tutorial-variable-library/create-new-pipeline-14.png":::

1. Configure **SourceTableName**:

   1. Under **Source** > **Table**, select **Enter manually**, select **Table name**, and then select **Add dynamic content**.

   1. Select the ellipsis (**...**), and then select **Library variables (preview)**.

   1. Select **SourceTableName**. It populates the box with `@pipeline().libraryVariables.SourceTableName`. Select **OK**.

      :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-15.png" alt-text="Screenshot of the pane for adding dynamic content for a table name." lightbox="media/tutorial-variable-library/create-new-pipeline-15.png":::

1. Now that the source connection is set up, you can test it. Select **Preview data**, and then select **OK** on the flyout. After the data is populated, you can close the data preview.

   :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-16.png" alt-text="Screenshot of the data preview for a source connection." lightbox="media/tutorial-variable-library/create-new-pipeline-16.png":::

## Configure the destination connection for the Pipeline_Deploy pipeline

In these steps, you configure the destination connection for your pipeline:

1. In the **Source LHs with Variables** workspace, go to **Pipeline_Deploy**.

1. On the canvas, select **Copy data** so that the focus is on **Copy data**.

1. Select **Destination**.

1. Configure **SourceLH**:

   1. Under **Destination** > **Connection**, select **Add dynamic content**.

   1. Select the ellipsis (**...**), and then select **Library variables (preview)**.

   1. Select **SourceLH**. It populates the box with `@pipeline().libraryVariables.DestinationLH`. Select **OK**.

      :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-17.png" alt-text="Screenshot of the pane for adding dynamic content for a connection destination." lightbox="media/tutorial-variable-library/create-new-pipeline-17.png":::

1. Configure **DestinationWSID**:

   1. Under **Destination** > **Workspace ID**, select **Add dynamic content**.

   1. Select the ellipsis (**...**), and then select **Library variables (preview)**.

   1. Select **DestinationWSID**. It populates the box with `@pipeline().libraryVariables.DestinationWSID`. Select **OK**.

      :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-18.png" alt-text="Screenshot of the pane for adding dynamic content for a workspace destination." lightbox="media/tutorial-variable-library/create-new-pipeline-18.png":::

1. Configure **DestinationTableName**:

   1. Under **Destination** > **Table**, select **Enter manually**, select **Table name**, and then select **Add dynamic content**.

   1. Select the ellipsis (**...**), and then select **Library variables (preview)**.

   1. Select **DestinationTableName**. It populates the box with `@pipeline().libraryVariables.DestinationTableName`. Select **OK**.

      :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-19.png" alt-text="Screenshot of the pane for adding dynamic content for a destination table name." lightbox="media/tutorial-variable-library/create-new-pipeline-19.png":::

1. Now that the destination connection is set up, save the pipeline and select **Run**. Confirm that it successfully runs.

    :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-20.png" alt-text="Screenshot of a pipeline run." lightbox="media/tutorial-variable-library/create-new-pipeline-20.png":::

## Create the deployment pipeline

Now, create your deployment pipeline:

1. In the **Source LHs with Variables** workspace, select **Create deployment pipeline**.

1. Name the pipeline **Deployment_Pipeline_Var**, and then select **Next**.

   :::image type="content" source="media/tutorial-variable-library/create-deployment-pipeline-2.png" alt-text="Screenshot of the pane for naming a new deployment pipeline." lightbox="media/tutorial-variable-library/create-deployment-pipeline-2.png":::

1. In the deployment pipeline, select **Create and continue**.

   :::image type="content" source="media/tutorial-variable-library/create-deployment-pipeline-3.png" alt-text="Screenshot that shows the button for creating a deployment pipeline." lightbox="media/tutorial-variable-library/create-deployment-pipeline-3.png":::

1. For the **Development** stage:

   1. In the dropdown list, select **Source LHs with Variables** for the workspace. Then select the **Assign** check mark.

      :::image type="content" source="media/tutorial-variable-library/create-deployment-pipeline-4.png" alt-text="Screenshot of selecting the workspace for a new deployment pipeline." lightbox="media/tutorial-variable-library/create-deployment-pipeline-4.png":::

   1. Select **Continue**. The stage should now be populated with the items from the workspace.

      :::image type="content" source="media/tutorial-variable-library/create-deployment-pipeline-5.png" alt-text="Screenshot of the development part of a deployment pipeline." lightbox="media/tutorial-variable-library/create-deployment-pipeline-5.png":::

1. For the **Test** stage:

   1. Select the checkbox at the top to select all items. Then clear the checkbox for the **SourceLH_Dev** lakehouse.

   1. Select the **Deploy** button. Select **Deploy** again. The **Test** stage should now be populated.

      :::image type="content" source="media/tutorial-variable-library/create-deployment-pipeline-6.png" alt-text="Screenshot of the test part of a new deployment pipeline." lightbox="media/tutorial-variable-library/create-deployment-pipeline-6.png":::

1. For the **Production** stage:

   1. Select the checkbox at the top to select all items. Then clear the checkbox for the **SourceLH_Test** lakehouse.

   1. Select the **Deploy** button. Select **Deploy** again. The **Production** stage should now be populated.

      :::image type="content" source="media/tutorial-variable-library/create-deployment-pipeline-7.png" alt-text="Screenshot of the production part of a new deployment pipeline." lightbox="media/tutorial-variable-library/create-deployment-pipeline-7.png":::

## Set the variable library's active set for each stage

In these steps, you configure the active set for each stage in your deployment pipeline:

1. Configure the active set for the **Test** stage:

   1. On the sidebar, select the **Deployment_Pipeline_Var** pipeline.

   1. Select the **Test** stage.

      :::image type="content" source="media/tutorial-variable-library/set-active-set-1.png" alt-text="Screenshot of the test stage." lightbox="media/tutorial-variable-library/set-active-set-1.png":::

   1. Select **WS Variables**.

   1. Select the ellipsis (**...**), and then select **Set as active**. Select the **Set as Active** button.

      :::image type="content" source="media/tutorial-variable-library/set-active-set-2.png" alt-text="Screenshot of a variable library, with selections for setting the test stage as active." lightbox="media/tutorial-variable-library/set-active-set-2.png":::

      The active set is now configured.

      :::image type="content" source="media/tutorial-variable-library/set-active-set-3.png" alt-text="Screenshot of a configured active set in a deployment pipeline." lightbox="media/tutorial-variable-library/set-active-set-3.png":::

   1. Select **Save** > **Agree**.

1. Configure the active set for the **Prod** stage:

   1. On the sidebar, select the **Deployment_Pipeline_Var** pipeline.

   1. Select the **Prod** stage.

   1. Select **WS Variables**.

   1. Select the ellipsis (**...**), and then select **Set as active**. Select the **Set as Active** button.

   1. Select **Save** > **Agree**.

## Verify and test the variable library

Now that you set up the variable library and configured all of the active sets for each stage of the deployment pipeline, you can verify them:

1. Check the **SourceLHs_Dev** lakehouse:

   1. In the **Source LHs with Variables** workspace, select the **SourceLHs_Dev** lakehouse.

   1. Change the connection from **Lakehouse** to **SQL analytics endpoint**.

   1. In the explorer, expand **Schemas** > **dbo** > **Tables**.

   1. Confirm that the **DevCopiedData** table appears.

      :::image type="content" source="media/tutorial-variable-library/verify-1.png" alt-text="Screenshot of the area for tables in the explorer." lightbox="media/tutorial-variable-library/verify-1.png":::

1. Switch to the **SourceLHs_Test** lakehouse and repeat the preceding steps.

   The **TestCopiedData** table shouldn't appear because you haven't run the pipeline yet with the **Test VS** active set.

1. Switch to the **SourceLHs_Prod** lakehouse and repeat the preceding steps.

   The **ProdCopiedData** table shouldn't appear because you haven't run the pipeline yet with the **Prod VS** active set.

1. Check the **Test** stage of the **Deployment_Pipeline_Var** pipeline:

   1. Switch to the **Deployment_Pipeline_Var** pipeline and select the **Test** stage.

   1. Select the **Pipeline_Deploy** pipeline.

   1. Select **Run**. This process should finish successfully.

1. Check the **SourceLHs_Test** lakehouse again:

   1. Switch to the **SourceLHs_Test** lakehouse.

   1. Change the connection from **Lakehouse** to **SQL analytics endpoint**.

   1. In the explorer, expand **Schemas** > **dbo** > **Tables**.

   1. Confirm that the **TestCopiedData** table appears.

      :::image type="content" source="media/tutorial-variable-library/verify-2.png" alt-text="Screenshot of the area for tables and a data preview in the explorer." lightbox="media/tutorial-variable-library/verify-2.png":::

1. Check the **Production** stage of the **Deployment_Pipeline_Var** pipeline:

   1. Switch to the **Deployment_Pipeline_Var** pipeline and select the **Production** stage.

   1. Select the **Pipeline_Deploy** pipeline.

   1. Select **Run**. This process should finish successfully.

1. Check the **SourceLHs_Prod** lakehouse again:

   1. Switch to the **SourceLHs_Prod** lakehouse.

   1. Change the connection from **Lakehouse** to **SQL analytics endpoint**.

   1. In the explorer, expand **Schemas** > **dbo** > **Tables**.

   1. Confirm that the **ProdCopiedData** table appears.

## Customize the variable values in Git (optional)

To see how the variable library is [represented in Git](./variable-library-cicd.md), or to edit the variables from a Git repository:

1. In the workspace, select **Source control** and [connect the workspace to a Git repository](../git-integration/git-get-started.md#connect-a-workspace-to-a-git-repo).

1. On the [Source control](../git-integration/git-get-started.md#commit-changes-to-git) pane, select **Commit** to push the workspace content to the Git repository.

   The Git repo has a folder for each item in the workspace. A folder called **WS variables.VariableLibrary** represents the variable library item. For more information about the contents of this folder, see [Variable library CI/CD](./variable-library-cicd.md).

1. Compare the **ProdVS.json** and **TestVS.json** files in the **valueSets** folder. Confirm that the `overrides` variable is set to the different values. You can edit these values directly in the UI or by editing this file in Git and updating it to the workspace.

    ```json
    {
     "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/VariablesLibrary/definition/valueSets/1.0.0/schema.json",
     "valueSetName": "Test VS",
     "overrides": [
      {
       "name": "Source_LH",
       "value": "4fe228d3-a363-4b7f-a5d4-fae9d2abca43"
      },
      {
       "name": "DestinationTableName",
       "value": "TestCopiedData"
      }
     ]
    }
    ```

    ```json
    {
     "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/VariablesLibrary/definition/valueSets/1.0.0/schema.json",
     "valueSetName": "Prod VS",
     "overrides": [
      {
       "name": "Source_LH",
       "value": "c0f13027-9bf4-4e8c-8f57-ec5c18c8656b"
      },
      {
       "name": "DestinationTableName",
       "value": "ProdCopiedData"
      }
     ]
    }
    ```

## Related content

* [Tutorial: Lifecycle management in Fabric](../cicd-tutorial.md)
* [Create and manage variable libraries](./get-started-variable-libraries.md)
