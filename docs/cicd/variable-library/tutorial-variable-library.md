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
1. In the workspace, [create a new data pipeline](../../data-factory/create-first-pipeline-with-sample-data.md) (Steps 1-3){12 minutes}.
1. Create an empty lakehouse in the workspace called *This_WH_LH*.
1. Create an empty Variable library item. Call it *WS variables*.
1. In the data pipeline, go to **Source > Connection** and select *SourceLH_Dev* as the source lakehouse. Wait for the lakehouse to load.
1. Go to **Destination > Connection** and select *This_WH_LH* as the destination lakehouse.
1. Open the Variable library and add a variable called *Source_LH_*.

## Create a data pipeline

1. [Create a data pipeline](../../fundamentals/)
Add activity - copy data
## Create a variable library

## Add variables to the library

[Introduce a task and its role in completing the process.]

<!-- Required: Tasks to complete in the process - H2

In one or more H2 sections, describe tasks that 
the user completes in the process the tutorial describes.

-->

1. Procedure step
1. Procedure step
1. Procedure step

## Add value-sets to the variables

[Introduce a task and its role in completing the process.]

<!-- Required: Tasks to complete in the process - H2

In one or more H2 sections, describe tasks that 
the user completes in the process the tutorial describes.

-->

1. Procedure step
1. Procedure step
1. Procedure step

## Set a default value-set

[Introduce a task and its role in completing the process.]

<!-- Required: Tasks to complete in the process - H2

In one or more H2 sections, describe tasks that 
the user completes in the process the tutorial describes.

-->

1. Procedure step
1. Procedure step
1. Procedure step

## Related content

* [Related article title](link.md)
* [Related article title](link.md)
* [Related article title](link.md)
