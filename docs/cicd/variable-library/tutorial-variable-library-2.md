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
4. At the top of the workspace, select **New item**
5. On the right, under **Store data**, select **Lakehouse**.
6. Enter a name for the Lakehouse - *SourceLH_Dev* and click **Create**.
7. You should now be in the Lakehouse, select **New data pipeline**.
8. Enter a name for the pipeline and click **Create**.
9. You should now see **Copy data into Lakehouse**, at the top select **Sample data**.
10. Select **Public Holidays*.
11. Once it has finished loading, click **Next**.