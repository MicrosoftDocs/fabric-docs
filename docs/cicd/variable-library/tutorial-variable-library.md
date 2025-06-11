---
title: Learn how to use Variable libraries
description: "Go through all the steps of creating a variable library and using different variable values in different stages of a deployment pipeline."
author: billmath
ms.author: billmath
ms.reviewer: Lee
ms.service: fabric
ms.subservice: cicd
ms.topic: tutorial
ms.date: 03/04/2025
ms.search.form: Variable library tutorial
#customer intent: As a developer, I want to learn how to use the Microsoft Fabric Variable library tool to customize and share item configurations in a workspace so that I can manage my content lifecycle..
---

# Tutorial: Use Variable libraries to customize and share item configurations (preview)

This tutorial shows you how to use dynamic content in data pipelines. Create a Variable library item and add variables to it so that you can automate different values for different stages of your deployment pipeline. In this tutorial, we copy data from one lakehouse to another, and use the Variable library to set the source and destination values for the copy activity.

In this tutorial, you:

> [!div class="checklist"]
>
> * Create a Variable library
> * Add variables to the library
> * Define additional value-sets for the variables
> * Consume the variables in another item in the workspace (data pipeline)
> * Edit the variables in a Git repository
> * Create a deployment pipeline and deploy the variable library
> * Change the active value set in the target stage of the deployment pipeline
> * Show that the value of the variable complies with the active value set in each stage

## Prerequisites

* A Fabric tenant account with an active subscription. [Create an account for free](../../get-started/fabric-trial.md).
* A [workspace](../../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity)
* The following [tenant switches](../../admin/about-tenant-settings.md) must be enabled from the Admin portal:
  * [Users can create Fabric items](../../admin/fabric-switch.md)
  * Users can create variable libraries

  These switches can be enabled by the tenant admin, capacity admin, or workspace admin, depending on your [organization's settings](../../admin/delegate-settings.md).

 :::image type="content" source="media/tutorial-variable-library/conceptual-variable-library-1.png" alt-text="Diagram of tutorial workspace layout." lightbox="media/tutorial-variable-library/conceptual-variable-library-1.png":::

### Create the *Stage LHs* workspace, *SourceLH_Stage* lakehouse with sample data, and *Pipeline_Stage* pipeline

1. Navigate to [Power BI](https://app.powerbi.com/home)
2. On the left, select **Workspace**.
3. [Create a workspace](../../fundamentals/create-workspaces.md). Call it *Sources LHs*. 
 
 :::image type="content" source="media/tutorial-variable-library/new-workspace-1.png" alt-text="Screenshot of new workspace." lightbox="media/tutorial-variable-library/new-workspace-1.png":::

4. At the top of the workspace, select **New item**
5. On the right, under **Store data**, select **Lakehouse**.

 :::image type="content" source="media/tutorial-variable-library/create-lakehouse-1.png" alt-text="Screenshot of new lakehouse creation." lightbox="media/tutorial-variable-library/create-lakehouse-1.png":::

6. Enter a name for the Lakehouse - *SourceLH_Stage* and click **Create**.
7. You should now be in the Lakehouse, select **New data pipeline**. 

 :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-1.png" alt-text="Screenshot of new pipeline creation." lightbox="media/tutorial-variable-library/create-new-pipeline-1.png":::

8. Enter the name *Pipeline_Stage* and click **Create**.
9. You should now see **Copy data into Lakehouse**, at the top select **Sample data**.

 :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-2.png" alt-text="Screenshot of Copy data into lakehouse." lightbox="media/tutorial-variable-library/create-new-pipeline-2.png":::

10. Select **Public Holidays*.

 :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-3.png" alt-text="Screenshot of using Public Holidays sample data." lightbox="media/tutorial-variable-library/create-new-pipeline-3.png":::

11. Once it has finished loading, click **Next**.
12. On the **Connect to data destinantion** screen, click **Next**.

 :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-4.png" alt-text="Screenshot of pipeline destination." lightbox="media/tutorial-variable-library/create-new-pipeline-4.png":::

13. On the **Review + Save** screen, click **Save + Run**.
  
  :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-5.png" alt-text="Screenshot of pipeline save and run." lightbox="media/tutorial-variable-library/create-new-pipeline-5.png":::


### Create the *Source LHs with Variables* workspace

1. Navigate to [Power BI](https://app.powerbi.com/home)
2. On the left, select **Workspace**.
3. [Create a workspace](../../fundamentals/create-workspaces.md). Call it *Source LHs with Variables*. 

### Create the *SourceLH_Dev*, *SourceLH_Test* and *SourceLH_Prod* lakehouses.

1. In the *Source LHs with Variables* workspace, at the top of the workspace, select **New item**
2. On the right, under **Store data**, select **Lakehouse**.
3. Enter a name for the Lakehouse - *SourceLH_Dev*  and click **Create**.
4. Once it is created, on the left, click on the *Source LHs with variables* workspace.
5. At the top of the workspace, select **New item**
6. On the right, under **Store data**, select **Lakehouse**.
7. Enter a name for the Lakehouse - *SourceLH_Test*  and click **Create**.
8. Once it is created, on the left, click on the *Source LHs with variables* workspace.
9. At the top of the workspace, select **New item**
10. On the right, under **Store data**, select **Lakehouse**.
11. Enter a name for the Lakehouse - *SourceLH_Prod*  and click **Create**.
12. Once it is created, on the left, click on the *Source LHs with Variables* workspace.
13. The *Source LHs with variables* should look like the screenshot below.

  :::image type="content" source="media/tutorial-variable-library/create-workspace-1.png" alt-text="Screenshot of how the workspace should look." lightbox="media/tutorial-variable-library/create-workspace-1.png":::

### Get the Workspace IDs and Object IDs for Lakehouses

1. In [Power BI](https://app.powerbi.com/home), on the left select the *Stage LHs* workspace.
2. In the workspace, click on the *SourceLH_Stage* Lakehouse.
3. Copy the workspace ID and the Lakehouse object ID in the URL.

 :::image type="content" source="media/tutorial-variable-library/get-guid-1.png" alt-text="Screenshot showing how to get the Lakehouse guid." lightbox="media/tutorial-variable-library/get-guid-1.png":::

4. Repeat this for the *SourceLH_Dev* and *SourceLH_Test* Lakehouses in the *Source LHs with variables* workspace.
5. These values will be used in our variable library.


### Create a variable library with variables

1. In the *Source LHs with Variables* workspace, add **New item**
2. On the right, under **Develop data**, select **Variable Library (preview)**.

 :::image type="content" source="media/tutorial-variable-library/create-variable-library-1.png" alt-text="Screenshot showing how to create a variable library." lightbox="media/tutorial-variable-library/create-variable-library-1.png":::

3. Name the library *WS variables* and click **Create**.
4. At the top, click **New Variable**.

 :::image type="content" source="media/tutorial-variable-library/create-variable-library-2.png" alt-text="Screenshot showing how to click new variable." lightbox="media/tutorial-variable-library/create-variable-library-2.png":::

5.  Create the following variables. Create variables for each item in the table.

|Name|Type|Default value set|
|-----|-----|-----|
|Source_LH|string|&lt;guid of SourceLH_Stage lakeshoue&gt;|
|Source_WSID|string|&lt;guid of SourceLH_Stage workspace&gt;|
|Destination_LH|string|&lt;guid of SourceLH_Dev lakeshoue&gt;|
|Destination_WSID|string|&lt;guid of SourceLH_Dev workspace&gt;|
|SourceTable_Name|String|Processed|
|DestinationTable_Name|String|DevCopiedData|


 :::image type="content" source="media/tutorial-variable-library/create-variable-library-3.png" alt-text="Screenshot the finished default set for the variable library." lightbox="media/tutorial-variable-library/create-variable-library-3.png":::

6. Once you are done, click **Save**

### Create Alternate value sets


1. In the **WS Variables* variable libary, on the right, click **Add value set**.
2. Enter *Test VS* for the name and click **Create**.
3. Create variables for each item in the table.
4. Once you are done, click **Save** and **Agree**.

|Name|Type|Default value set|
|-----|-----|-----|
|Source_LH|string|&lt;guid of SourceLH_Dev lakeshoue&gt;|
|Source_WSID|string|&lt;guid of SourceLH_Dev workspace&gt;|
|Destination_LH|string|&lt;guid of SourceLH_Test lakeshoue&gt;|
|Destination_WSID|string|&lt;guid of SourceLH_Test workspace&gt;|
|SourceTable_Name|String|DevCopiedData|
|DestinationTable_Name|String|TestCopiedData|


5. At the top, click **Add Value set**
6. Enter *Prod VS* for the name and click **Create**.
7. Create variables for each item in the table.
8. Once you are done, click **Save** and **Agree**.

|Name|Type|Default value set|
|-----|-----|-----|
|Source_LH|string|&lt;guid of SourceLH_Test lakeshoue&gt;|
|Source_WSID|string|&lt;guid of SourceLH_Test workspace&gt;|
|Destination_LH|string|&lt;guid of SourceLH_Prod lakeshoue&gt;|
|Destination_WSID|string|&lt;guid of SourceLH_Prod workspace&gt;|
|SourceTable_Name|String|TestCopiedData|
|DestinationTable_Name|String|ProdCopiedData|

 
 :::image type="content" source="media/tutorial-variable-library/create-variable-library-5.png" alt-text="Screenshot the finished alternate values in variable library." lightbox="media/tutorial-variable-library/create-variable-library-5.png":::


### Create the *Pipeline_Deploy* pipeline and declare variables

1. In the *Source LHs with Variables* workspace, add **New item**
2. On the right, under **Get data**, select **Data pipeline**.

  :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-6.png" alt-text="Screenshot of creating a new data pipeline." lightbox="media/tutorial-variable-library/create-new-pipeline-6.png":::

3. Enter the name *Pipeline_Deploy* and click **Create**.
4. At the top, select **Copy data** and select **Add to Canvas**.

  :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-7.png" alt-text="Screenshot of adding copy data to canvas." lightbox="media/tutorial-variable-library/create-new-pipeline-7.png":::

5. Click on the canvas so that the focus is off of **Copy data**.
6. At the bottom, select **Library variables (preview)**.

  :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-10.png" alt-text="Screenshot of adding copy data to canvas." lightbox="media/tutorial-variable-library/create-new-pipeline-10.png":::

7. Click **New** and add the variables that are in the table below.

 |Name|Library|Variable Name|Type|
 |-----|-----|-----|-----|
 |SourceLH|WS Variables|Source_LH|string|
 |SourceWSID|WS Variables|Source_WSID|string|
 |DestinationLH|WS Variables|Destination_LH|string|
 |DestinationWSID|WS Variables|Destination_WSID|string|
 |SourceTableName|WS Variables|SourceTable_Name|string|
 |DestinationTableName|WS Variables|DestinationTable_Name|string|

 :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-11.png" alt-text="Screenshot of adding variables to pipeline." lightbox="media/tutorial-variable-library/create-new-pipeline-11.png":::

8. Click **Save**

### Configure the source connection for the *Pipeline_Deploy* pipeline

1. In the *Source LHs with Variables* workspace, on the *Pipeline_Depoy*.
1. On the canvas, select **Copy Data** so the focus is on **Copy Data**.
2. At the bottom click on **Source**.
3. Under **Source > Connection**, select **Use dynamic content**.
4. On the right, click **...** and select **Library variables preview**
5. Select **SourceLH**. It will populate the box with `@pipeline().libraryVariables.SourceLH`. Click **Ok**

  :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-12.png" alt-text="Screenshot of dynamic content for connection source." lightbox="media/tutorial-variable-library/create-new-pipeline-12.png":::

6. Under **Source > Workspace**, select **Use dynamic content**.
7. On the right, click **...** and select **Library variables preview**
8. Select **SourceWSID**. It will populate the box with `@pipeline().libraryVariables.SourceWSID`. Click **Ok**

  :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-14.png" alt-text="Screenshot of dynamic content for workspace source." lightbox="media/tutorial-variable-library/create-new-pipeline-14.png":::

9. Under **Source > Tables**, place a check in **Enter manually**, click on the **table name** box and select **Use dynamic content**.
10. On the right, click **...** and select **Library variables preview**
11. Select **SourceTableName**. It will populate the box with `@pipeline().libraryVariables.SourceTableName`. Click **Ok**

  :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-15.png" alt-text="Screenshot of dynamic content for table name." lightbox="media/tutorial-variable-library/create-new-pipeline-15.png":::

12. Now that the source connection is setup we can test it.  Click **Preview data** and on the right, click **Okay** on the fly-out.  Once it populates, you can close the data preview.

  :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-16.png" alt-text="Screenshot of preview data for the source connection." lightbox="media/tutorial-variable-library/create-new-pipeline-16.png":::

  ### Configure the destination connection for the *Pipeline_Deploy* pipeline

1. In the *Source LHs with Variables* workspace, on the *Pipeline_Depoy*.
1. On the canvas, select **Copy Data** so the focus is on **Copy Data**.
2. At the bottom click on **Destination**.
3. Under **Destination > Connection**, select **Use dynamic content**.
4. On the right, click **...** and select **Library variables preview**
5. Select **SourceLH**. It will populate the box with `@pipeline().libraryVariables.DestinationLH`. Click **Ok**

  :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-17.png" alt-text="Screenshot of dynamic content for connection destination." lightbox="media/tutorial-variable-library/create-new-pipeline-17.png":::

6. Under **Destination > Workspace**, select **Use dynamic content**.
7. On the right, click **...** and select **Library variables preview**
8. Select **DestinationWSID**. It will populate the box with `@pipeline().libraryVariables.DestinationWSID`. Click **Ok**

  :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-18.png" alt-text="Screenshot of dynamic content for workspace destination." lightbox="media/tutorial-variable-library/create-new-pipeline-18.png":::

9. Under **Destination > Tables**, place a check in **Enter manually**, click on the **table name** box and select **Use dynamic content**.
10. On the right, click **...** and select **Library variables preview**
11. Select **DestinationTableName**. It will populate the box with `@pipeline().libraryVariables.DestinationTableName`. Click **Ok**

  :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-19.png" alt-text="Screenshot of dynamic content for destination table name." lightbox="media/tutorial-variable-library/create-new-pipeline-19.png":::

12. Now that the destination connection is setup, save the pipeline and click **Run** at the top.  You should see it successfully run.

  :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-20.png" alt-text="Screenshot of pipeline run." lightbox="media/tutorial-variable-library/create-new-pipeline-20.png":::