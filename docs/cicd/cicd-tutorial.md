---
title: Lifecycle management tutorial
description: Understand the workflow of using git integration with deployment pipelines to manage the lifecycle of your apps.
author: mberdugo
ms.author: monaberdugo
ms.reviewer: NimrodShalit
ms.topic: tutorial 
ms.date: 07/03/2023
---

# Tutorial: Application lifecycle management in Fabric

This tutorial will take you through the whole process of loading data into your workspace, editing it etc.
If you already have a workspace with data, you can skip to [step 3](#step-3-create-pipeline).

Let’s get started!

> [!div class="checklist"]
>
> * Prepare and load data into a lakehouse
> * Build a dimensional model in a lakehouse
> * Automatically create a report with quick create

## Prerequisites

Before you start, make sure of the following:

* If you haven't enabled Fabric yet, ask your admin to [enable Fabric for your organization](../admin/fabric-switch.md)
* If you aren't signed up yet, [sign up for a free trial](../get-started/fabric-trial.md).
* Azure git repo
* Download the [MyFoodsIncome.pbix](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/developer/MyFoodsIncome.pbix) file that contains sample data for this tutorial. You can also use your own data, if you prefer.

## Step 1: Create a workspace

To create a new workspace and assign it a license:

1. From the left navigation bar, select **Workspaces > + New workspace**.

   :::image type="content" source="media/cicd-tutorial/create-workspace.png" alt-text="Screenshot of Create workspace.":::

1. Name the workspace **MyFoodsWS**.
1. (Optional) Add a description.

   :::image type="content" source="media/cicd-tutorial/name-workspace.png" alt-text="Screenshot of new workspace with name.":::

1. Expand the **Advanced** section to reveal **License mode**.
1. Select either **Trial** or **Premium capacity**.

   :::image type="content" source="media/cicd-tutorial/license-mode.png" alt-text="Screenshot of new workspace with license mode.":::

1. Select **Apply**.

For more on creating a workspace see [Create a workspace](/power-bi/collaborate-share/service-create-the-new-workspaces).

## Step 2: Load data

Now we need to load data into the workspace. You can upload data from OneDrive, SharePoint, or a local file. In this tutorial we'll load data from a file.

1. From the top menu bar, select **Upload > Browse**.

   :::image type="content" source="media/cicd-tutorial/upload-data.png" alt-text="Screenshot of Upload menu.":::

1. Browse to the location of the **MyFoodsIncome.pbix** file you [downloaded earlier](#prerequisites), or load your own sample *.pbix* file.

### Edit credentials

Before you create a deployment pipeline you need to set the credentials. This step only needs to be done once. After your credentials are set, you won't have to set them again.

1. Go to **Settings > Power BI settings**.

  :::image type="content" source="media/cicd-tutorial/settings.png" alt-text="Screenshot of Settings menu.":::

1. Select **Datasets > Data source credentials > Edit credentials**.

   :::image type="content" source="media/cicd-tutorial/edit-credentials.png" alt-text="Screenshot of Data source credentials menu.":::

1. Set the **Authentication** method to *Anonymous*, the **Privacy level** to *Public*, and uncheck the **Skip test connection** box.

   :::image type="content" source="media/cicd-tutorial/set-credentials.png" alt-text="Screenshot of dataset credentials.":::

1. Select **Sign in**. The connection is tested and credentials set. You won't have to to so this again for this dataset.

You can now create a deployment pipeline.

## Step 3: Create a deployment pipeline

In this step we create a deployment pipeline and assign the workspace to the development stage.

1. From the workspace home page, select **Create deployment pipeline**.

   :::image type="content" source="media/cicd-tutorial/create-pipeline.png" alt-text="Screenshot of Create deployment pipeline.":::

1. Name your pipeline *MyFoodsDP*, give it a description (optional) and select **Create**.

   :::image type="content" source="media/cicd-tutorial/name-pipeline.png" alt-text="Screenshot of new pipeline with name.":::

1. Assign the MyFoodsWS workspace to the Development stage.

   :::image type="content" source="media/cicd-tutorial/assign-workspace.png" alt-text="Screenshot of Assign workspace.":::

The development stage of the deployment pipeline shows one dataset, one report, and one dashboard. The other stages are empty.

   :::image type="content" source="media/cicd-tutorial/development-stage.png" alt-text="Screenshot of Development stage.":::

You can read more about creating deployment pipelines in [Deployment pipelines overview](./deployment-pipelines/assign-pipeline.md).

## Step 4: Deploy to test stage

Now, we'll deploy some content to the test stage.

1. From the development stage of the deployment content view, select **Show more**.

   :::image type="content" source="media/cicd-tutorial/development-view.png" alt-text="Screenshot of Show more button of the development stage of the deployment pipeline.":::

1. Check all three items to deploy to the test stage. Then select **Deploy to test**.

   :::image type="content" source="media/cicd-tutorial/deploy-to-test.png" alt-text="Screenshot of Deploy to test stage.":::

## Step 5: Connect to git

## Step 6: Branch to new workspace

## Step 7: Edit workspace

Make changes to the workpace. This can be creating a new report, adding a new dataset, etc.

## Step 8: Create PR and merge

## Step 9: Update workspace

## Step 10: Compare stages in deployment pipeline

## Step 11: Deploy to test stage

## Step 12: Deploy to production

