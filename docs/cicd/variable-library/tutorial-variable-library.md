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

## Before you begin: Prepare data sources (optional)

For the purposes of this tutorial, we need to create some sample data to use in the Variable library. If you already have a workspace with lakehouse items you want to use, you can skip this step.

Create a workspace called *Sources LHs* with some lakehouses to use as source data in the Variable library

1. [Create a workspace](../../fundamentals/create-workspaces.md) called *Sources LHs*.
1. [Create a lakehouse](../../onelake/create-lakehouse-onelake.md) item in the workspace, called *SourceLH_Dev*.
1. [Create a data pipeline with sample data from public holidays](../../data-factory/create-first-pipeline-with-sample-data.md) (steps 1-3). {10 minutes}
1. Create another workspace called *Copy with Variables WS* [Dev]
1. Create an empty lakehouse called This_WH_LH
1. Create two more lakehouses (*SourceLH_Test* and *SourceLH_Prod*) with sample data.

## Step 1: Create a workspace

Now that we have our sample data, create a new workspace that contains the Variable library item. To create the workspace:

1. [Create a workspace](../../fundamentals/create-workspaces.md). Call it *Copy with Variables WS*. Make it a type string and set the value to the object ID of Lakehouse.
1. Create an empty lakehouse in the workspace called *This_WH_LH*.

## Step 2: Create a data pipeline

1. In the workspace, [create a new data pipeline](../../data-factory/create-first-pipeline-with-sample-data.md) (Steps 1-3){12 minutes}.
1. In the data pipeline, go to **Source > Connection** and select *SourceLH_Dev* as the source lakehouse. Wait for the lakehouse to load.
1. Go to **Destination > Connection** and select *This_WH_LH* as the destination lakehouse.

  > [!TIP]
  > The lakehouse object ID is the unique identifier of your lakehouse. You can find it in the URL of the lakehouse item in the workspace.
  > :::image type="content" source="./media/tutorial-variable-library/lakehouse-id.png" alt-text="Screenshot of URL of a lakehouse item. The lakehouse ID is after the word lakehouses.":::

## Step 3: Create a variable library with variables

1. Create an empty Variable library item. Call it *WS variables*.
1. Open the Variable library and add a variable called *SourceLH*. Give it the type *string*, and the value of the object ID of the source lakehouse.
1. Create a variable called DestinationTableName with type *string*. Give it the value *DevCopiedData*. This is the name of the table where the data will be copied in the destination lakehouse (This_WS_LH).

:::image type="content" source="./media/tutorial-variable-library/default-value-set.png" alt-text="Screenshot of the Variable library item with a variables and the default value set.":::

### Add value-sets to the variables

1. Create a value-set called *Test VS* and one called *Prod VS*.
1. Set the values of *SourceLH* to the object IDs of *SourceLH_Test* and *SourceLH_Prod* respectively.
1. Set the value of *DestinationTableName* to *TestCopiedData* and *ProdCopiedData* respectively.

:::image type="content" source="./media/tutorial-variable-library/variable-library-values.png" alt-text="Screenshot of the variable library with the default value set and two alternative value sets.":::

### Declare the variables

Now that the value-sets are defined, we [declare the variables](../../data-factory/activity-overview.md#adding-activities-to-a-pipeline-with-the--ui) in the pipeline so that we can use them in the pipeline stages.

1. In the data pipeline, select the canvass to open the pipeline settings.
1. Select the **Library variables** tab.
1. Enter a name for each variable, and enter its library, variable name, and type.

:::image type="content" source="./media/tutorial-variable-library/declare-variable-library.png" alt-text="Screenshot of the data pipeline settings.":::

## Step 4: Set the source and destination in the lakehouse

Now that the value-sets are defined, set the rules for the active value-set. For each stage, we want to use the relevant lakehouse.

1. In the data pipeline, go to **Source > Connection** and delete the current connection (*SourceLH_Dev*).
1. From the dropdown menu, select *Use dynamic content*.

   :::image type="content" source="./media/tutorial-variable-library/dynamic-content.png" alt-text="Screenshot of Destination tab with the table unselected.":::

1. From the Add dynamic content pane, select *Library variables* and then *SourceLH*. This sets the value of the source lakehouse to the value of SourceLH in the active value set.

   :::image type="content" source="./media/tutorial-variable-library/dynamic-source.png" alt-text="Screenshot of the pipeline expression builder with showing the dynamic source of the variable.":::

1. Select **OK** to save the dynamic value as the source connection. The connection type is automatically set to *Lakehouse* and the Workspace ID is set.
1. Set the Root folder to *Tables*.
1. To set the table name, check the box that says Enter manually, and type *PublicHolidays*.

   :::image type="content" source="./media/tutorial-variable-library/source-table-name.png" alt-text="Screenshot of the data pipeline source connection.":::

1. Select **Save** to save the source connection.

### Set the destination table

Now that the value-sets are defined, set the rules for the active value-set. For each stage, we want to use the relevant lakehouse, and we want the relevant name of the destination table.

1. In the data pipeline, go to **Destination** and set the root folder to *Tables*.
1. To set the value of the table name to the relevant table, select *Add dynamic content*.

   :::image type="content" source="./media/tutorial-variable-library/dynamic-content.png" alt-text="Screenshot of data pipeline source connection.":::

1. From the pipeline expression builder, Go to Library variables and select DestTableName. This sets the value of the destination table to the value of DestinationTableName in the active value set.

   :::image type="content" source="./media/tutorial-variable-library/table-name.png" alt-text="Screenshot of the pipeline expression builder with the variable library variable selected.":::

1. Select **OK** to save the dynamic value as the Table name.
1. Save.

Notice, also, that the *artifactId* of the lakehouse is set to the value of the *SourceLH* variable in the *pipeline-content.json* file.

:::image type="content" source="./media/tutorial-variable-library/item-id-git.png" alt-text="Screenshot of file containing a line showing that the artifact ID is set to  a dynamic variable source lakehouse.":::

## Step 5: Customize the variable values in Git (optional)

To see how the variable library is [represented in Git](./variable-library-cicd.md), or to edit the variables from a Git repository, connect the workspace to a Git repository.

1. [Connect the workspace to a Git repository](../git-integration/git-get-started.md#connect-a-workspace-to-a-git-repo).
1. From the workspace, select **Source control** and [connect](../git-integration/git-get-started.md#connect-a-workspace-to-a-git-repo) the workspace to a Git repository.
1. From the [Source control](../git-integration/git-get-started.md#commit-changes-to-git) pane, select **Commit** to push the workspace content to the Git repository.

The git repo has a folder for each item in the workspace. The Variable library item is represented by a folder called *WS variables.VariableLibrary*. For more information about the contents of this folder, see [Variable libraries in Git](./variable-library-cicd.md).

:::image type="content" source="./media/tutorial-variable-library/git-contents.png" alt-text="Screenshot of Git folder containing the content of the workspace.":::

Compare the ProdVS.jason and the TestVS.json files in the valueSets folder and confirm that the variableOverrides are set to the different values. You can edit these values directly in the UI or by editing this file in Git and updating it to the workspace.

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/VariablesLibrary/definition/valueSets/1.0.0/schema.json",
  "valueSetName": "Test VS",
  "overrides": [
    {
      "name": "Source_LH",
      "value": "e4b2b710-a3fd-4845a262-df815dbec6d0"
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
      "value": "e4b2b710-a3fd-4845a262-df815dbec6d0"
    },
    {
      "name": "DestinationTableName",
      "value": "ProdCopiedData"
    }
  ]
}
```

You can edit these values in the Git repository and update them to the workspace.

## Step 6: Create deployment pipeline

Now that the data pipeline is set up, create a deployment pipeline to deploy the data pipeline to different environments.

1. From the *Copy with Variables WS* workspace, [create a new deployment pipeline](../deployment-pipelines/get-started-with-deployment-pipelines.md#step-1---create-a-deployment-pipeline). The workspace is automatically assigned to the deployment pipeline. (If you create the deployment pipeline from outside workspace, you need to assign the workspace to the deployment pipeline manually).
1. [Deploy](../deployment-pipelines/get-started-with-deployment-pipelines.md#step-5---deploy-to-an-empty-stage) the content of the workspace to the *Test* and *Production* stages of the deployment pipeline.
1. From the Test stage, [set the active value-set](./get-started-variable-libraries.md#edit-a-value-set) in the *WS Variables* library to *Test VS*. From the *Production* stage, set the active value-set in the *WS Variables* library to *Prod VS*.

   :::image type="content" source="./media/tutorial-variable-library/test-active.png" alt-text="Screenshot of the variable library with the test value set as active.":::

   :::image type="content" source="./media/tutorial-variable-library/prod-active.png" alt-text="Screenshot of the variable library with the prod value set as active.":::

1. Run the pipeline from different stages to see the values it has in each stage. (Close the pipeline and open it again from each stage to see the values reload). Check the input value to see the value of each variable in that stage.

## Considerations and limitations

 [!INCLUDE [limitations](../includes/variable-library-limitations.md)]

## Related content

* [CI/CD tutorial](../cicd-tutorial.md)
* [Get started with Variable libraries](./get-started-variable-libraries.md)
