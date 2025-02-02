---
title: Learn how to use Variable libraries
description: "Learn how to use Microsoft Fabric Variable libraries to customize and share item configurations in a workspace."
author: mberdugo
ms.author: monaberdugo
ms.reviewer: Lee
ms.service: fabric
ms.subservice: cicd
ms.topic: tutorial
ms.date: 02/02/2025
ms.search.form: Variable library tutorial
#customer intent: As a developer, I want to learn how to use the Microsoft Fabric Variable library tool to customize and share item configurations in a workspace so that I can manage my content lifecycle..
---

# Tutorial: Use Variable libraries to customize and share item configurations

This tutorial shows you how to use dynamic content in data pipelines. create a Variable library item and add variables to it so that you can automate different values for different stages of your deployment pipeline. In this tutorial we copy data from one lakehouse to another, and use the Variable library to set the source and destination values for the copy activity.

In this tutorial, you:

> [!div class="checklist"]
>
> * Create a Variable library
> * Add variables to the library
> * Define value-sets for the variables
> * Set rules for the active value-set

## Prerequisites

* A Fabric tenant account with an active subscription. [Create an account for free](../../get-started/fabric-trial.md).
* A [workspace](../../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity)
* A workspace with datasources 

## Step 1: Prepare data sources (optional)

For the purposes of this tutorial, we will create a workspace called *Sources LHs* with some source data to use in the Variable library. If you already have a workspace with lakehouse items you want to use, you can skip this step.

1. [Create a workspace](../../fundamentals/create-workspaces.md) called *Sources LHs*.
1. [Create a lakehouse](../../onelake/create-lakehouse-onelake.md) item in the workspace, *called SourceLH_Dev*.
1. [Create a data pipeline with sample data from public holidays](../../data-factory/create-first-pipeline-with-sample-data.md) (steps 1-3). {10 minutes}
1. Create another workspace called *Copy with Variables WS* [Dev]
1. Create an empty lakehoue called This_WH_LH
1. Create two more lakehouses (*SourceLH_Test* and *SourceLH_Prod*) with sample data.

## Step 2: Create a workspace

Now that we have our sample data, create a new workspace that will contain the Variable library item. To create the workspace:

1. [Create a workspace](../../fundamentals/create-workspaces.md). We'll call it *Copy with Variables WS*. Make it a type string and set the value to the object id of Lakehouse.
1. Create an empty lakehouse in the workspace called *This_WH_LH*.

## Create a data pipeline

1. In the workspace, [create a new data pipeline](../../data-factory/create-first-pipeline-with-sample-data.md) (Steps 1-3){12 minutes}.
1. In the data pipeline, go to **Source > Connection** and select *SourceLH_Dev* as the source lakehouse. Wait for the lakehouse to load.
1. Go to **Destination > Connection** and select *This_WH_LH* as the destination lakehouse.

  > [!TIP]
  > The lakehouse object ID is the unique identifier of your lakehouse. You can find it in the URL of the lakehouse item in the workspace.
  > :::image type="content" source="./tutorial-variable-library/lakehouse-id.png" alt-text="Screenshot of URL of a lakehouse item. The lakehouse ID is after the word lakehouses.":::

## Create a variable library with variables

1. Create an empty Variable library item. Call it *WS variables*.
1. Open the Variable library and add a variable called *Source_LH*. Give it the type *string*, and the value of the object id of the source lakehouse.
1. Create a variable called WaitTime with type *integer*.
1. Create a variable called DestinationTableName with type *string*. Give it the value *DevCopiedData*. This is the name of the table where the data will be copied in the destination lakehouse (This_WS_LH).

:::image type="content" source="./tutorial-variable-library/default-value-set.png" alt-text="Screenshot of the Variable library item with a variables and the default value set.":::

## Add value-sets to the variables

1. Create a value-set called *Test VS* and one called *Prod VS*.
1. Set the values of *Source_LH* to the object ids of *SourceLH_Test* and *SourceLH_Prod* respectively.
1. Set the value of *DestinationTableName* to *TestCopiedData* and *ProdCopiedData* respectively.

:::image type="content" source="./tutorial-variable-library/variable-library-values.png" alt-text="Screenshot of the variable library with the default value set and two alternative value sets.":::

## Set rules for the active value-set

1. In the data pipeline, go to **Destination** and set the root folder to *Tables* and the Table to.

## Related content

* [Related article title](link.md)
* [Related article title](link.md)
* [Related article title](link.md)
