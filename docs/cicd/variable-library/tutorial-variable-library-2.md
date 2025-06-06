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