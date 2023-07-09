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
* Admin rights to an Azure git repo (If you're not an admin, you can get an admin to connect the workspace for you.)
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

To connect the workspace to your Azure Repo, follow these steps:

1. Select the ellipsis (three dots) the then workspace settings.

   :::image type="content" source="./media/cicd-tutorial/workspace-settings-link.png" alt-text="Screenshot of workspace with workspace settings link displayed.":::

1. Select **Git integration**. You’re automatically signed into the Azure Repos account registered to the Azure AD user signed into the workspace.

    :::image type="content" source="./media/cicd-tutorial/workspace-settings.png" alt-text="Screenshot of workspace settings window with git integration selected.":::

1. From the dropdown menu, specify the following details about the branch you want to connect to:

    * [Organization](/azure/devops/user-guide/plan-your-azure-devops-org-structure)
    * [Project](/azure/devops/user-guide/plan-your-azure-devops-org-structure#how-many-projects-do-you-need)
    * [Git repository](/azure/devops/user-guide/plan-your-azure-devops-org-structure#structure-repos-and-version-control-within-a-project)
    * Select **+ New Branch** to create a new branch.
    * Name the new branch *MyFoods*, create it from *main* (or *master*) and Select **Create**.

    :::image type="content" source="./media/cicd-tutorial/git-create-branch.png" alt-text="Screenshot of workspace settings window with create new branch.":::

1. Select **Connect and sync**.

After you connect, the Workspace displays information about source control that allows you to view the connected branch, the status of each item in the branch and the time of the last sync. The Source control icon shows `0` because the items in the workspace git repo are identical.

:::image type="content" source="./media/cicd-tutorial/git-sync-information.png" alt-text="Screenshot of source control icon and other git information.":::

Now the workspace is connected to git and anyone with access to the repo can view and/or edit it, depending on their permissions.

For more information about connecting to git, see [Connect to git](git-integration/git-get-started.md#connect-to-git).

## Step 6: Edit workspace

Make changes to the workspace. This can be creating deleting an item, or editing an item. For this tutorial, we'll edit the dataset.
From Azure Devops, go to the *MyFoods* branch and edit the dataset. For example, go to file MyFoodsIncome.Dataset/model.bim and change the value on line 142 from "true" to "FALSE".

:::image type="content" source="media/cicd-tutorial/edit-workspace.png" alt-text="Screenshot of workspace edit in DevOps.":::

Commit the changes to the *MyFoods* branch.

:::image type="content" source="media/cicd-tutorial/commit-changes.png" alt-text="Screenshot of commit changes in DevOps.":::

## Step 7: Create PR and merge

Create a pull request to merge the *MyFoods* branch with the *main* branch.

## Step 8: Update workspace

## Step 9: Compare stages in deployment pipeline

## Step 10: Deploy to test stage

## Step 11: Deploy to production
