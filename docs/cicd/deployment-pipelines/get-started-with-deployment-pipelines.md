---
title: Get started using deployment pipelines, the Fabric Application lifecycle management (ALM) tool
description: Learn how to use deployment pipelines, the Fabric Application lifecycle management (ALM) tool
author: mberdugo
ms.author: monaberdugo
ms.topic: how-to
ms.service: powerbi
ms.subservice: pbi-deployment-pipeline
ms.custom: contperf-fy21q1, intro-get-started
ms.date: 04/02/2023
ms.search.form: Get started using Deployment pipelines, Create a deployment pipeline, Introduction to Deployment pipelines
---

# Get started with deployment pipelines

This article walks you through the basic settings required for using deployment pipelines in Microsoft Fabric. It's recommended to read the [deployment pipelines introduction](intro-to-deployment-pipelines.md), before you proceed.

You can also complete the [Create and manage a Fabric deployment pipeline](/training/modules/power-bi-deployment-pipelines) Learn module, which shows how to create a deployment pipeline.

>[!NOTE]
>In a deployment pipeline, one Premium workspace is assigned to each stage. Before you start working with your pipeline in production, review the [capacity requirements](../troubleshoot-cicd.yml#what-type-of-capacity-can-i-assign-to-a-workspace-in-a-pipeline-) for the pipeline's workspaces.

## Prerequisites

You'll be able to access the deployment pipelines feature, if the following conditions are met:

* You have one of the following Premium licenses:

  * You're a [Pro user](/power-bi/enterprise/service-admin-purchasing-power-bi-pro.md), and you belong to an organization that has Premium capacity.

  * [Premium Per User (PPU)](/power-bi/enterprise/service-premium-per-user-faq.yml).

* You're an admin of a Premium [workspace](/power-bi/collaborate-share/service-create-the-new-workspaces.md).

>[!NOTE]
> You'll also be able to see the deployment pipelines button, if you previously created a pipeline, or if a pipeline was shared with you.

:::image type="content" source="media/get-started-with-deployment-pipelines/creating-pipeline.png" alt-text="A screenshot of the deployment pipelines landing page.":::

## Step 1 - Create a deployment pipeline

You can create a pipeline from the deployment pipelines tab, or from a workspace.

After the pipeline is created, you can share it with other users, edit, or delete it. When you share a pipeline with others, those will be given access to the pipeline and will become [pipeline admins](understand-the-deployment-process.md#permissions). Pipeline access enables users to view, share, edit, and delete the pipeline.

### Create a pipeline from the deployment pipelines tab

To create a pipeline from the deployment pipelines tab, do the following:

1. From the navigation pane, select **Deployment pipelines** and then select **Create pipeline**.

2. In the *Create a deployment pipeline* dialog box, enter a name and description for the pipeline, and select **Create**.

### Create a pipeline from a workspace

You can create a pipeline from an existing workspace, providing you're the admin of a [workspace](/power-bi/collaborate-share/service-create-the-new-workspaces.md).

1. From the workspace, select **Create a pipeline**.

    :::image type="content" source="media/get-started-with-deployment-pipelines/workspace-deploy.png" alt-text="A screenshot of the create a pipeline button in a workspace.":::

2. In the *Create a deployment pipeline* dialog box, enter a name and description for the pipeline, and select **Create**.

>[!NOTE]
>If the workspace isn't assigned to your organization's Premium capacity, or to your PPU capacity, you'll get a notification to [assign it to a capacity](/power-bi/enterprise/service-admin-premium-manage.md#assign-a-workspace-to-a-capacity).  

## Step 2 - Assign a workspace

After creating a pipeline, you need to add the content you want to manage to the pipeline. Adding content to the pipeline is done by assigning a workspace to the pipeline stage. You can assign a workspace to any stage.

Follow the instructions in the link to [assign a workspace to a pipeline](assign-pipeline.md#assign-a-workspace-to-any-vacant-pipeline-stage).

>[!NOTE]
>If you're creating a pipeline from a workspace, you can skip this stage as the workspace is already selected.

## Step 3 - Deploy to an empty stage

When you finished working with content in a pipeline stage, you can deploy it to the next stage. Deploying content to another stage is usually done after you've performed some actions in the pipeline. For example, made development changes to your content in the development stage, or tested your content in the test stage. A typical workflow for moving content from stage to stage, is development to test, and then test to production, but you can deploy in any direction. You can learn more about this process, in the [deploy content to an existing workspace](understand-the-deployment-process.md#deploy-content-to-an-existing-workspace) section.

Deployment pipelines offer three options when it comes to deploying your content:

* [Deploying all content](deploy-content.md#deploy-all-content) - Deploy all your content to the target stage.

* [Selective deployment](deploy-content.md#selective-deployment) - Select which content to deploy to the target stage.

* [Backwards deployment](deploy-content.md#backwards-deployment) - Deploy your content to a previous stage in the pipeline.

After you choose how to deploy your content, you can [Review your deployment and leave a note](deploy-content.md#review-your-deployment-and-leave-a-note).

## Step 4 - Deploy content from one stage to another

Once you have content in a pipeline stage, you can deploy it to the next stage. Deploying content to another stage is usually done after you've performed some actions in the pipeline. For example, made development changes to your content in the development stage, or tested your content in the test stage. A typical workflow for moving content from stage to stage, is development to test, and then test to production. You can learn more about this process, in the [deploy content to an existing workspace](understand-the-deployment-process.md#deploy-content-to-an-existing-workspace) section.

To deploy content to the next stage in the deployment pipeline, select the deploy button at the bottom of the stage.

When reviewing the test and production stage cards, you can see the last deployment time. This indicates the last time content was deployed to the stage.

Deployment time is useful for establishing when a stage was last updated. It can also be helpful if you want to track time between test and production deployments.

To examine the differences between the two pipelines before you deploy, see [compare content in different deployment stages](./compare-pipeline-content.md).

## Step 5 - Create deployment rules (optional)

When you're working in a deployment pipeline, different stages may have different configurations. For example, each stage can have different databases or different query parameters. The development stage might query sample data from the database, while the test and production stages query the entire database.

When you deploy content between pipeline stages, configuring deployment rules enables you to allow changes to content, while keeping some settings intact. For example, if you want a dataset in a production stage to point to a production database, you can define a rule for this. The rule is defined in the production stage, under the appropriate dataset. Once the rule is defined, content deployed from test to production, will inherit the value as defined in the deployment rule, and will always apply as long as the rule is unchanged and valid.

[Read about how to define deployment rules.](create-rules.md)

## Next steps

[Assign a workspace to a pipeline stage](assign-pipeline.md)
