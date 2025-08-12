---
title: Learn How to Use Variable Libraries
description: "Follow the steps for creating a variable library and using variable values in various stages of a deployment pipeline."
author: billmath
ms.author: billmath
ms.reviewer: Lee
ms.service: fabric
ms.subservice: cicd
ms.topic: tutorial
ms.date: 07/22/2025
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

> [!NOTE]
> The Fabric variable library item is currently in preview.

## Prerequisites

* A Fabric tenant account with an active subscription. [Create an account for free](../../get-started/fabric-trial.md).
* A [workspace](../../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
* The following [tenant switches](../../admin/about-tenant-settings.md) enabled from the admin portal:
  * [Users can create Fabric items](../../admin/fabric-switch.md)
  * **Users can create variable libraries**

  The tenant admin, capacity admin, or workspace admin can enable these switches, depending on your [organization's settings](../../admin/delegate-settings.md).

  :::image type="content" source="media/tutorial-variable-library/conceptual-variable-library-1.png" alt-text="Diagram of a workspace layout." lightbox="media/tutorial-variable-library/conceptual-variable-library-1.png":::

## Create the Stage LHs workspace, SourceLH_Stage lakehouse with sample data, and Pipeline_Stage pipeline

First, create a workspace and lakehouse that will be used as your initial staging data.

1. Go to [Power BI](https://app.powerbi.com/home).

2. On the sidebar, select **Workspace**.

3. [Create a workspace](../../fundamentals/create-workspaces.md). Call it **Sources LHs**.

   :::image type="content" source="media/tutorial-variable-library/new-workspace-1.png" alt-text="Screenshot of new workspace." lightbox="media/tutorial-variable-library/new-workspace-1.png":::

4. At the top of the workspace, select **New item**.

5. On the right, under **Store data**, select **Lakehouse**.

   :::image type="content" source="media/tutorial-variable-library/create-lakehouse-1.png" alt-text="Screenshot of new lakehouse creation." lightbox="media/tutorial-variable-library/create-lakehouse-1.png":::

6. Enter a name for the lakehouse (**SourceLH_Stage**) and select **Create**.

7. You should now be in the lakehouse, select **New data pipeline**.

   :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-1.png" alt-text="Screenshot of new pipeline creation." lightbox="media/tutorial-variable-library/create-new-pipeline-1.png":::

8. Enter the name **Pipeline_Stage** and select **Create**.

9. You should now see **Copy data into Lakehouse**, at the top select **Sample data**.

   :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-2.png" alt-text="Screenshot of Copy data into lakehouse." lightbox="media/tutorial-variable-library/create-new-pipeline-2.png":::

10. Select **Public Holidays**.

    :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-3.png" alt-text="Screenshot of using Public Holidays sample data." lightbox="media/tutorial-variable-library/create-new-pipeline-3.png":::

11. After it finishes loading, select **Next**.

12. On the **Connect to data destination** screen, select **Next**.

    :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-4.png" alt-text="Screenshot of pipeline destination." lightbox="media/tutorial-variable-library/create-new-pipeline-4.png":::

13. On the **Review + Save** screen, select **Save + Run**.

    :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-5.png" alt-text="Screenshot of pipeline save and run." lightbox="media/tutorial-variable-library/create-new-pipeline-5.png":::

## Create the Source LHs with Variables workspace

Now, Create the workspace that you'll be working out of and using with your variable library.

1. Go to [Power BI](https://app.powerbi.com/home).

2. On the sidebar, select **Workspace**.

3. [Create a workspace](../../fundamentals/create-workspaces.md). Call it **Source LHs with Variables**.

## Create the SourceLH_Dev, SourceLH_Test, and SourceLH_Prod lakehouses

Next, you create the three lakehouses that will be used with the variable library.

1. In the **Source LHs with Variables** workspace, at the top of the workspace, select **New item**.

2. On the right, under **Store data**, select **Lakehouse**.

3. Enter a name for the lakehouse (**SourceLH_Dev**) and select **Create**.

4. After it's created, on the sidebar, select the **Source LHs with variables** workspace.

5. At the top of the workspace, select **New item**.

6. On the right, under **Store data**, select **Lakehouse**.

7. Enter a name for the lakehouse (**SourceLH_Test**) and select **Create**.

8. After it's created, on the sidebar, select the **Source LHs with variables** workspace.

9. At the top of the workspace, select **New item**.

10. On the right, under **Store data**, select **Lakehouse**.

11. Enter a name for the lakehouse (**SourceLH_Prod**) and select **Create**.

12. After it's created, on the sidebar, select the **Source LHs with Variables** workspace.

13. The **Source LHs with variables** should look like the screenshot below.

## Get the workspace IDs and object IDs for lakehouses

In this step, you get the unique identifiers that will be used in our variable library.

1. In [Power BI](https://app.powerbi.com/home), on the sidebar select the **Stage LHs** workspace.

2. In the workspace, select the **SourceLH_Stage** lakehouse.

3. Copy the workspace ID and the lakehouse object ID in the URL.

   :::image type="content" source="media/tutorial-variable-library/get-guid-1.png" alt-text="Screenshot showing how to get the lakehouse guid." lightbox="media/tutorial-variable-library/get-guid-1.png":::

4. Repeat this for the **SourceLH_Dev** and **SourceLH_Test** lakehouses in the *Source LHs with variables* workspace.

5. These values will be used in our variable library.

## Create a variable library with variables

Now, create the variable library.

1. In the **Source LHs with Variables** workspace, add **New item**.

2. On the right, under **Develop data**, select **Variable Library (preview)**.

   :::image type="content" source="media/tutorial-variable-library/create-variable-library-1.png" alt-text="Screenshot showing how to create a variable library." lightbox="media/tutorial-variable-library/create-variable-library-1.png":::

3. Name the library **WS variables** and select **Create**.

4. At the top, select **New Variable**.

   :::image type="content" source="media/tutorial-variable-library/create-variable-library-2.png" alt-text="Screenshot showing how to select new variable." lightbox="media/tutorial-variable-library/create-variable-library-2.png":::

5. Create the following variables. Create variables for each item in the table.

   |Name|Type|Default value set|
   |-----|-----|-----|
   |Source_LH|string|&lt;guid of SourceLH_Stage lakehouse&gt;|
   |Source_WSID|string|&lt;guid of SourceLH_Stage workspace&gt;|
   |Destination_LH|string|&lt;guid of SourceLH_Dev lakehouse&gt;|
   |Destination_WSID|string|&lt;guid of SourceLH_Dev workspace&gt;|
   |SourceTable_Name|String|Processed|
   |DestinationTable_Name|String|DevCopiedData|

   :::image type="content" source="media/tutorial-variable-library/create-variable-library-3.png" alt-text="Screenshot the finished default set for the variable library." lightbox="media/tutorial-variable-library/create-variable-library-3.png":::

6. When you finish, select **Save**.

## Create alternate value sets

In this step, youadd the alternate value sets to our variable library.

1. In the **WS Variables** variable library, on the right, select **Add value set**.

2. Enter **Test VS** for the name and select **Create**.

3. Create variables for each item in the table.

4. When you finish, select **Save** and **Agree**.

    |Name|Type|Default value set|
    |-----|-----|-----|
    |Source_LH|string|&lt;guid of SourceLH_Dev lakehouse&gt;|
    |Source_WSID|string|&lt;guid of SourceLH_Dev workspace&gt;|
    |Destination_LH|string|&lt;guid of SourceLH_Test lakehouse&gt;|
    |Destination_WSID|string|&lt;guid of SourceLH_Test workspace&gt;|
    |SourceTable_Name|String|DevCopiedData|
    |DestinationTable_Name|String|TestCopiedData|

5. At the top, select **Add Value set**.

6. Enter **Prod VS** for the name and select **Create**.

7. Create variables for each item in the table.

8. When you finish, select **Save** and **Agree**.

    |Name|Type|Default value set|
    |-----|-----|-----|
    |Source_LH|string|&lt;guid of SourceLH_Test lakehouse&gt;|
    |Source_WSID|string|&lt;guid of SourceLH_Test workspace&gt;|
    |Destination_LH|string|&lt;guid of SourceLH_Prod lakehouse&gt;|
    |Destination_WSID|string|&lt;guid of SourceLH_Prod workspace&gt;|
    |SourceTable_Name|String|TestCopiedData|
    |DestinationTable_Name|String|ProdCopiedData|

    :::image type="content" source="media/tutorial-variable-library/create-variable-library-5.png" alt-text="Screenshot the finished alternate values in variable library." lightbox="media/tutorial-variable-library/create-variable-library-5.png":::

## Create the Pipeline_Deploy pipeline and declare variables

In this step, you create your pipeline and declare your variables.

1. In the **Source LHs with Variables** workspace, add **New item**.
2. On the right, under **Get data**, select **Data pipeline**.

   :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-6.png" alt-text="Screenshot of creating a new data pipeline." lightbox="media/tutorial-variable-library/create-new-pipeline-6.png":::

3. Enter the name **Pipeline_Deploy** and select **Create**.

4. At the top, select **Copy data** and select **Add to Canvas**.

   :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-7.png" alt-text="Screenshot of adding copy data to canvas." lightbox="media/tutorial-variable-library/create-new-pipeline-7.png":::

5. Click on the canvas so that the focus is off **Copy data**.

6. At the bottom, select **Library variables (preview)**.

   :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-10.png" alt-text="Screenshot of the variable library." lightbox="media/tutorial-variable-library/create-new-pipeline-10.png":::

7. Select **New** and add the variables that are in the table below.

   |Name|Library|Variable name|Type|
   |-----|-----|-----|-----|
   |SourceLH|WS variables|Source_LH|string|
   |SourceWSID|WS variables|Source_WSID|string|
   |DestinationLH|WS variables|Destination_LH|string|
   |DestinationWSID|WS variables|Destination_WSID|string|
   |SourceTableName|WS variables|SourceTable_Name|string|
   |DestinationTableName|WS variables|DestinationTable_Name|string|
  
   :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-11.png" alt-text="Screenshot of adding variables to pipeline." lightbox="media/tutorial-variable-library/create-new-pipeline-11.png":::

8. Select **Save**.

## Configure the source connection for the Pipeline_Deploy pipeline

In this step, you configure your source connection for your pipeline.

1. In the **Source LHs with Variables** workspace, on the **Pipeline_Depoy**.

2. On the canvas, select **Copy Data** so the focus is on **Copy Data**.

3. At the bottom select **Source**.

4. Under **Source > Connection**, select **Use dynamic content**.

5. On the right, select **...** and select **Library variables preview**.

6. Select **SourceLH**. It populates the box with `@pipeline().libraryVariables.SourceLH`. Select **Ok**.

   :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-12.png" alt-text="Screenshot of dynamic content for connection source." lightbox="media/tutorial-variable-library/create-new-pipeline-12.png":::

7. Under **Source > Workspace**, select **Use dynamic content**.

8. On the right, select **...** and select **Library variables preview**.

9. Select **SourceWSID**. It will populate the box with `@pipeline().libraryVariables.SourceWSID`. Select **Ok**.

   :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-14.png" alt-text="Screenshot of dynamic content for workspace source." lightbox="media/tutorial-variable-library/create-new-pipeline-14.png":::

10. Under **Source > Tables**, place a check in **Enter manually**, select the **table name** box and select **Use dynamic content**.

11. On the right, select **...** and select **Library variables preview**.

12. Select **SourceTableName**. It will populate the box with `@pipeline().libraryVariables.SourceTableName`. Select **Ok**.

    :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-15.png" alt-text="Screenshot of dynamic content for table name." lightbox="media/tutorial-variable-library/create-new-pipeline-15.png":::

13. Now that the source connection is set up, you can test it. Select **Preview data** and on the right, select **Okay** on the fly-out. After it populates, you can close the data preview.

    :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-16.png" alt-text="Screenshot of preview data for the source connection." lightbox="media/tutorial-variable-library/create-new-pipeline-16.png":::

## Configure the destination connection for the Pipeline_Deploy pipeline

In this step, you configure your destination connection for your pipeline.

1. In the **Source LHs with Variables** workspace, on the **Pipeline_Depoy**.

2. On the canvas, select **Copy Data** so the focus is on **Copy Data**.

3. At the bottom select **Destination**.

4. Under **Destination > Connection**, select **Use dynamic content**.

5. On the right, select **...** and select **Library variables preview**.

6. Select **SourceLH**. It will populate the box with `@pipeline().libraryVariables.DestinationLH`. Select **Ok**.

   :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-17.png" alt-text="Screenshot of dynamic content for connection destination." lightbox="media/tutorial-variable-library/create-new-pipeline-17.png":::

7. Under **Destination > Workspace**, select **Use dynamic content**.

8. On the right, select **...** and select **Library variables preview**.

9. Select **DestinationWSID**. It will populate the box with `@pipeline().libraryVariables.DestinationWSID`. Select **Ok**.

   :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-18.png" alt-text="Screenshot of dynamic content for workspace destination." lightbox="media/tutorial-variable-library/create-new-pipeline-18.png":::

10. Under **Destination > Tables**, place a check in **Enter manually**, select the **table name** box and select **Use dynamic content**.

11. On the right, select **...** and select **Library variables preview**.

12. Select **DestinationTableName**. It will populate the box with `@pipeline().libraryVariables.DestinationTableName`. Select **Ok**.

    :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-19.png" alt-text="Screenshot of dynamic content for destination table name." lightbox="media/tutorial-variable-library/create-new-pipeline-19.png":::

13. Now that the destination connection is set up, save the pipeline and select **Run** at the top. You should see it successfully run.

    :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-20.png" alt-text="Screenshot of pipeline run." lightbox="media/tutorial-variable-library/create-new-pipeline-20.png":::

## Create deployment pipeline

Now, create your deployment pipeline.

1. In the **Source LHs with Variables** workspace, at the top, select **create deployment pipeline**.

2. Name the pipeline **Deployment_Pipeline_Var** and select **Next**.

   :::image type="content" source="media/tutorial-variable-library/create-deployment-pipeline-2.png" alt-text="Screenshot of creating a naming the new deployment pipeline." lightbox="media/tutorial-variable-library/create-deployment-pipeline-2.png":::

3. On the deployment pipeline, select **Create and Continue**.

   :::image type="content" source="media/tutorial-variable-library/create-deployment-pipeline-3.png" alt-text="Screenshot of the deployment pipeline - create and continue." lightbox="media/tutorial-variable-library/create-deployment-pipeline-3.png":::

4. On the development stage, from the drop-down, select **Source LHs with Variables** for the workspace. Select the **Assign** check mark.

   :::image type="content" source="media/tutorial-variable-library/create-deployment-pipeline-4.png" alt-text="Screenshot of selecting the workspace for the new deployment pipeline." lightbox="media/tutorial-variable-library/create-deployment-pipeline-4.png":::

5. Select **Continue**. The stage should now be populated with the items from the workspace.

   :::image type="content" source="media/tutorial-variable-library/create-deployment-pipeline-5.png" alt-text="Screenshot of development part of the deployment pipeline." lightbox="media/tutorial-variable-library/create-deployment-pipeline-5.png":::

6. Select the **Test** stage, at the bottom, place a check at the top to select all items. Now *un-select* the **SourceLH_Dev** lakehouse. Select the **Deploy** button. Select **Deploy** again. The **Test** stage should now be populated.

   :::image type="content" source="media/tutorial-variable-library/create-deployment-pipeline-6.png" alt-text="Screenshot of test part of the new deployment pipeline." lightbox="media/tutorial-variable-library/create-deployment-pipeline-6.png":::

7. Select the **Production** stage, at the bottom, place a check at the top to select all items. Now *un-select* the **SourceLH_Test** lakehouse. Select the **Deploy** button. Select **Deploy** again. The **Production** stage should now be populated.

   :::image type="content" source="media/tutorial-variable-library/create-deployment-pipeline-7.png" alt-text="Screenshot of production part of the new deployment pipeline." lightbox="media/tutorial-variable-library/create-deployment-pipeline-7.png":::

## Set the variable library active set for each stage

In this step, you configure the active set for each stage in your deployment pipeline.

1. In the **Deployment_Pipeline_Var** select the **Test** stage.

   :::image type="content" source="media/tutorial-variable-library/set-active-set-1.png" alt-text="Screenshot of test stage." lightbox="media/tutorial-variable-library/set-active-set-1.png":::

2. On the bottom, select **WS Variables**.

   :::image type="content" source="media/tutorial-variable-library/set-active-set-2.png" alt-text="Screenshot of WS variables." lightbox="media/tutorial-variable-library/set-active-set-2.png":::

3. On the test stage, select the **...** and select **Set as active**. Select the **Set as Active** button.

   :::image type="content" source="media/tutorial-variable-library/set-active-set-3.png" alt-text="Screenshot of setting active set in deployment pipeline." lightbox="media/tutorial-variable-library/set-active-set-3.png":::

4. At the top, select **Save**. Select **Agree**.

5. On the sidebar, select the **Deployment_Pipeline_Var**.

6. Select the **Prod** stage.

7. On the bottom, select **WS Variables**.

8. On the test stage, select the **...** and select **Set as active**. Select the **Set as Active** button.

9. At the top, select **Save**. Select **Agree**.

## Verify and test the variable library

Now that you set up the variable library and set all of the active sets for each stage of the deployment pipeline, you can verify this.

1. In the **Source LHs with Variables** workspace, select the **SourceLHs_Dev** lakehouse.

2. At the top, change the connection from **Lakehouse** to **SQL analytics endpoint**.

3. In the explorer, expand **Schemas** > **dbo** > **Tables**.

4. You should see **DevCopiedData** Table.

   :::image type="content" source="media/tutorial-variable-library/verify-1.png" alt-text="Screenshot of DevCopiedData table." lightbox="media/tutorial-variable-library/verify-1.png":::

5. Now, switch to the **SourceLHs_Test** lakehouse.

6. Repeat the steps above. You shouldn't see the **TestCopiedData** because you haven't run the pipeline yet with the *Test VS* active set.

7. Now, switch to the **SourceLHs_Prod** lakehouse.

8. Repeat the steps above. You shouldn't see the **ProdCopiedData** because you haven't run the pipeline yet with the **Prod VS** active set.

9. Switch to the **Deployment_Pipeline_Var** select the **Test** stage.

10. At the bottom, select the **Pipeline_Deploy**.

11. At the top, select **Run**. This should complete successfully.

12. Now, switch to the **SourceLHs_Test** lakehouse.

13. At the top, change the connection from **Lakehouse** to **SQL analytics endpoint**.

14. In the explorer, expand **Schemas** > **dbo** > **Tables**.

15. You should see **TestCopiedData** Table.

    :::image type="content" source="media/tutorial-variable-library/verify-2.png" alt-text="Screenshot of TestCopiedData table." lightbox="media/tutorial-variable-library/verify-2.png":::

16. Switch to the **Deployment_Pipeline_Var** select the **Production** stage.

17. At the bottom, select the **Pipeline_Deploy**.

18. At the top, select **Run**. This should complete successfully.

19. Now, switch to the **SourceLHs_Prod** lakehouse.

20. At the top, change the connection from **Lakehouse** to **SQL analytics endpoint**.

21. In the explorer, expand **Schemas** > **dbo** > **Tables**.

22. You should see **ProdCopiedData** Table.

## Customize the variable values in Git (optional)

To see how the variable library is [represented in Git](./variable-library-cicd.md), or to edit the variables from a Git repository:

1. [Connect the workspace to a Git repository](../git-integration/git-get-started.md#connect-a-workspace-to-a-git-repo).

1. From the workspace, select **Source control** and [connect](../git-integration/git-get-started.md#connect-a-workspace-to-a-git-repo) the workspace to a Git repository.

1. From the [Source control](../git-integration/git-get-started.md#commit-changes-to-git) pane, select **Commit** to push the workspace content to the Git repository.

   The git repo has a folder for each item in the workspace. The variable library item is represented by a folder called **WS variables.VariableLibrary**. For more information about the contents of this folder, see [Variable libraries in Git](./variable-library-cicd.md).

1. Compare the ProdVS.json and the TestVS.json files in the valueSets folder and confirm that the variableOverrides are set to the different values. You can edit these values directly in the UI or by editing this file in Git and updating it to the workspace.

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

* [CI/CD tutorial](../cicd-tutorial.md)
* [Get started with variable libraries](./get-started-variable-libraries.md)
