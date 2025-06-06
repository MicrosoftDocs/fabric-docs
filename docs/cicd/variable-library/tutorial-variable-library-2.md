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

### Create the *Sources LHS* workspace and *SourceLH_Dev* lakehouse with sample data

1. Navigate to [Power BI](https://app.powerbi.com/home)
2. On the left, select **Workspace**.
3. [Create a workspace](../../fundamentals/create-workspaces.md). Call it *Sources LHs*. 
 
 :::image type="content" source="media/tutorial-variable-library/new-workspace-1.png" alt-text="Screenshot of new workspace." lightbox="media/tutorial-variable-library/new-workspace-1.png":::

4. At the top of the workspace, select **New item**
5. On the right, under **Store data**, select **Lakehouse**.

 :::image type="content" source="media/tutorial-variable-library/create-lakehouse-1.png" alt-text="Screenshot of new lakehouse creation." lightbox="media/tutorial-variable-library/create-lakehouse-1.png":::

6. Enter a name for the Lakehouse - *SourceLH_Dev* and click **Create**.
7. You should now be in the Lakehouse, select **New data pipeline**. 

 :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-1.png" alt-text="Screenshot of new pipeline creation." lightbox="media/tutorial-variable-library/create-new-pipeline-1.png":::

8. Enter the name *Pipeline_Dev* and click **Create**.
9. You should now see **Copy data into Lakehouse**, at the top select **Sample data**.

 :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-2.png" alt-text="Screenshot of Copy data into lakehouse." lightbox="media/tutorial-variable-library/create-new-pipeline-2.png":::

10. Select **Public Holidays*.

 :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-3.png" alt-text="Screenshot of using Public Holidays sample data." lightbox="media/tutorial-variable-library/create-new-pipeline-3.png":::

11. Once it has finished loading, click **Next**.
12. On the **Connect to data destinantion** screen, click **Next**.

 :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-4.png" alt-text="Screenshot of pipeline destination." lightbox="media/tutorial-variable-library/create-new-pipeline-4.png":::

 13. On the **Review + Save** screen, click **Save + Run**.
  
  :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-5.png" alt-text="Screenshot of pipeline save and run." lightbox="media/tutorial-variable-library/create-new-pipeline-5.png":::


### Create the *Copy with Variables WS* workspace and *This_WH_LH* lakehouse with sample data

1. Navigate to [Power BI](https://app.powerbi.com/home)
2. On the left, select **Workspace**.
3. [Create a workspace](../../fundamentals/create-workspaces.md). Call it *Copy with Variables WS*. 
4. At the top of the workspace, select **New item**
5. On the right, under **Store data**, select **Lakehouse**.
6. Enter a name for the Lakehouse - *This_WH_LH* and click **Create**.
7. Leave this Lakehouse empty. On the right click the **Copy with Variables WS*. 

 :::image type="content" source="media/tutorial-variable-library/create-lakehouse-2.png" alt-text="Screenshot showing the workspace." lightbox="media/tutorial-variable-library/create-lakehouse-2.png":::

### Create the *SourceLH_Test* and *SourceLH_Prod* lakehouse with sample data

1. In the *Copy with Variables WS* workspace, at the top of the workspace, select **New item**
2. On the right, under **Store data**, select **Lakehouse**.
3. Enter a name for the Lakehouse - *SourceLH_Test*  and click **Create**.
4. Once it is created, select **Start with sample data**.

 :::image type="content" source="media/tutorial-variable-library/create-lakehouse-3.png" alt-text="Screenshot showing start with sample data." lightbox="media/tutorial-variable-library/create-lakehouse-3.png":::

5. Select **Public holidays**.

 :::image type="content" source="media/tutorial-variable-library/create-lakehouse-3.png" alt-text="Screenshot showing start with public holidays." lightbox="media/tutorial-variable-library/create-lakehouse-4.png":::

6. Repeat these steps and create a Lakehouse in the same workspace named *SourceLH_Prod*.

### Get the GUIDs of the Lakehouses

1. In P[Power BI](https://app.powerbi.com/home), on the left select the Sources LHs workspace.
2. In the workspace, at the bottom, click on the SourceLH_Dev Lakehouse.
3. Copy the guid in the URL that comes after /lakeshoues/ and before the ?.

 :::image type="content" source="media/tutorial-variable-library/get-guid-1.png" alt-text="Screenshot showing how to get the Lakehouse guid." lightbox="media/tutorial-variable-library/get-guid-1.png":::

4. Repeat this for the *SourceLH_Test* and *SourceLH_Prod* Lakehouses in the *Copy with Variables WS* workspace.
5. These will be used in the upcoming steps.


### Create a variable library with variables

1. In the **Copy with Variables WS** workspace, add **New item**
2. On the right, under **Develop data**, select **Variable Library (preview)**.

 :::image type="content" source="media/tutorial-variable-library/create-variable-library-1.png" alt-text="Screenshot showing how to create a variable library." lightbox="media/tutorial-variable-library/create-variable-library-1.png":::

3. Name the library *WS variables* and click **Create**.
4. At the top, click **New Variable**.

 :::image type="content" source="media/tutorial-variable-library/create-variable-library-2.png" alt-text="Screenshot showing how to click new variable." lightbox="media/tutorial-variable-library/create-variable-library-2.png":::

5.  Create the following variables.  Use the GUID of the SourceLH_Dev Lakehouse as the default value for the SourceLH string.  Create variables for each item in the table.

|Name|Type|Default value set|
|-----|-----|-----|
|Source_LH|string|&lt;guid of SourceLH_Dev lakeshoue&gt;|
|DestinationTableName|String|DevCopiedData|

 :::image type="content" source="media/tutorial-variable-library/create-variable-library-3.png" alt-text="Screenshot the finished default set for the variable library." lightbox="media/tutorial-variable-library/create-variable-library-3.png":::


### Create Alternate value sets


1. In the **WS Variables* variable libary, on the right, click **Add value set**.

 :::image type="content" source="media/tutorial-variable-library/create-variable-library-4.png" alt-text="Screenshot showing how to add a value set." lightbox="media/tutorial-variable-library/create-variable-library-4.png":::

2. Enter *Test VS* for the name and click **Create**.
3. On the right, for the value of *Source_LH* change the GUID to the GUID for the *SourceLH_Test* Lakehouse.
4. On the right, for the value *DestinationTable* change the value to *TestCopiedData

 |Name|Type|Test VS|
 |-----|-----|-----|
 |Source_LH|string|&lt;guid of SourceLH_Test lakeshoue&gt;|
 |DestinationTableName|String|TestCopiedData|


5. At the top, click **Add Value set**
6. Enter *Prod VS* for the name and click **Create**.
7. On the right, for the value of *SourceLH* change the GUID to the GUID for the *SourceLH_Prod* Lakehouse.
8. On the right, for the value *DestinationTable* change the value to *ProdCopiedData

 |Name|Type|TestProd VS|
 |-----|-----|-----|
 |Source_LH|string|&lt;guid of SourceLH_Prod lakeshoue&gt;|
 |DestinationTableName|String|ProdCopiedData|
 
 :::image type="content" source="media/tutorial-variable-library/create-variable-library-5.png" alt-text="Screenshot the finished alternate values in variable library." lightbox="media/tutorial-variable-library/create-variable-library-5.png":::

9. Click **Save** and **Agree**.

### Create the *Pipeline_Var* pipeline and declare variables

1. In the *Copy with Variables WS* workspace, at the top of the workspace, select **New item**
2. On the right, under **Get data**, select **Data pipeline**.

  :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-6.png" alt-text="Screenshot of creating a new data pipeline." lightbox="media/tutorial-variable-library/create-new-pipeline-6.png":::

3. Enter the name *Pipeline_Var* and click **Create**.
4. At the top, select **Copy data** and select **Add to Canvas**.

  :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-7.png" alt-text="Screenshot of adding copy data to canvas." lightbox="media/tutorial-variable-library/create-new-pipeline-7.png":::

5. Click on the canvas so that the focus is off of **Copy data**.
6. At the bottom, select **Library variables (preview)**.

  :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-10.png" alt-text="Screenshot of adding copy data to canvas." lightbox="media/tutorial-variable-library/create-new-pipeline-10.png":::

7. Click **New** and add the variables that are in the table below.

 |Name|Library|Variable Name|Type|
 |-----|-----|-----|-----|
 |SourceLH|WS Variables|Source_LH|string|
 |DestTableName|WS Variables|DestinationTableName|

 :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-11.png" alt-text="Screenshot of adding variables to pipeline." lightbox="media/tutorial-variable-library/create-new-pipeline-11.png":::

8. Click **Save**
9. Back on the canvas, select **Copy Data** so the focus is on **Copy Data**.
10. At the bottom click on **Source**.
11. Under **Source > Connection**, select **Use dynamic content**.
12. On the right, click **...** and select **Library variables preview**
13. Select **SourcLH**. It will populate the box with `@pipeline().libraryVariables.SourceLH`. Click **Ok**

  :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-12.png" alt-text="Screenshot of dynamic content for connection source." lightbox="media/tutorial-variable-library/create-new-pipeline-12.png":::

14. Under **Source**, make sure that the **Root folders** is set to **Tables**.
15. Under **Tables**, select **Enter manually** and enter **publicholidays** for the table name.

7. Under **Destination > Connection**, select *This_WH_LH**

  :::image type="content" source="media/tutorial-variable-library/create-new-pipeline-9.png" alt-text="Screenshot of adding This_WH_LH as connection destination." lightbox="media/tutorial-variable-library/create-new-pipeline-9.png":::