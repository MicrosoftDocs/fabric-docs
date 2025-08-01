---
title: Get started using deployment pipelines, the Fabric Application lifecycle management (ALM) tool
description: Learn how to use deployment pipelines, the Fabric Application lifecycle management (ALM) tool.
author: billmath
ms.author: billmath
ms.service: fabric
ms.subservice: cicd
ms.topic: how-to
ms.custom:
  - intro-get-started
ms.date: 11/14/2024
ms.search.form: Create deployment pipeline, Create a deployment pipeline, Introduction to Deployment pipelines
# customer intent: As a developer, I want to know how to use deployment pipelines, the Fabric Application lifecycle management (ALM) tool, so that I can manage my content more efficiently.
---

# Get started with deployment pipelines

This article walks you through the basic settings required for using deployment pipelines in Microsoft Fabric. We recommend reading the [deployment pipelines introduction](intro-to-deployment-pipelines.md) and understanding [which items can be deployed](./intro-to-deployment-pipelines.md#supported-items) before you proceed.

> [!NOTE]
>
> * The new Deployment pipeline user interface is currently in **preview**. To turn on or use the new UI, see [Begin using the new UI](./deployment-pipelines-new-ui.md#begin-using-the-new-ui).
> * Some of the items for deployment pipelines are in preview. For more information, see the list of [supported items](./intro-to-deployment-pipelines.md#supported-items).

You can also complete the [Create and manage a Fabric deployment pipeline](/training/modules/power-bi-deployment-pipelines) training module, which shows you step by step how to create a deployment pipeline.

## Prerequisites

In a deployment pipeline, one Premium workspace is assigned to each stage. Before you start working with your pipeline in production, review the [capacity requirements](../faq.yml#what-type-of-capacity-do-i-need) for the pipeline's workspaces.

To access the deployment pipelines feature, you must meet the following conditions:

* You have a [Microsoft Fabric subscription](../../enterprise/licenses.md)

* You're an admin of a Fabric [workspace](../../fundamentals/create-workspaces.md)

>[!NOTE]
> You can also see the deployment pipelines button if you previously created a pipeline or if a pipeline was shared with you.

## Step 1 - Create a deployment pipeline

When you create a pipeline, you define how many stages it should have and what they should be called. The number of stages are permanent and can't be changed after the pipeline is created.

You can create a pipeline from the deployment pipelines entry point in Fabric (at the bottom of the workspace list), or from a specific workspace. If you create a pipeline from a workspace, the workspace is automatically assigned to the pipeline.

### [Create a pipeline from the deployment pipelines button in Fabric](#tab/from-fabric)

To create a pipeline from anywhere in Fabric:

1. From the Workspaces flyout, select **Deployment pipelines**.

   :::image type="content" source="media/get-started-with-deployment-pipelines/creating-pipeline.png" alt-text="A screenshot of the deployment pipelines entry point.":::

1. Select **Create pipeline**, or **+ New pipeline**.

### [Create a pipeline from a workspace](#tab/from-workspace)

From Power BI, you also have the option of creating a pipeline from inside an existing workspace, if you're the admin of that [workspace](../../fundamentals/create-workspaces.md).

From the workspace, select **Create deployment pipeline**.

:::image type="content" source="media/get-started-with-deployment-pipelines/create-pipeline.png" alt-text="Screenshot of the button for creating a pipeline in a workspace.":::

---

## Step 2 - Name the pipeline and assign stages

1. In the *Create deployment pipeline* dialog box, enter a name and description for the pipeline, and select **Next**.

1. Set your deployment pipeline’s structure by defining the required stages for your deployment pipeline. By default, the pipeline has three stages named **Development**, **Test**, and **Production**. You can accept these default stages or change the number of stages and their names. You can have anywhere between 2-10 stages in a pipeline. You can add another stage, delete stages, or rename them by typing a new name in the box. Select **Create** (or **Create and continue**) when you're done.

### [Customize the pipeline: new UI](#tab/new-ui)

:::image type="content" source="media/get-started-with-deployment-pipelines/customize-pipeline-new.png" alt-text="Screenshot of the customize pipeline dialog. The Add and delete options are outlined, as is the name of the development stage.":::

To navigate between stages, zoom in and out with your mouse wheel or use the buttons in the top right. You can also drag the pipeline with your mouse to move it around.

:::image type="content" source="media/get-started-with-deployment-pipelines/navigate-stages-new.png" alt-text="Screenshot of deployment pipelines home screen for navigating between stages." lightbox="media/get-started-with-deployment-pipelines/navigate-stages-new.png":::

### [Customize the pipeline: original UI](#tab/old-ui)

   :::image type="content" source="media/get-started-with-deployment-pipelines/customize-pipeline.png" alt-text="Screenshot of the customize pipeline dialog. The Add and delete options are outlined, as is the name of the development stage.":::

   >[!NOTE]
   >In Power BI, if the workspace isn't assigned to your organization's capacity, or to your PPU capacity, you'll get a notification to [assign it to a capacity](/power-bi/enterprise/service-admin-premium-manage#assign-a-workspace-to-a-capacity).

For pipelines with more than three stages, use the arrows on the top-right corner to navigate between stages.

:::image type="content" source="media/get-started-with-deployment-pipelines/navigate-stages.png" alt-text="Screenshot of arrows in the top right corner of the deployment pipelines home screen for navigating between stages." lightbox="media/get-started-with-deployment-pipelines/navigate-stages.png":::

---

After the pipeline is created, you can share it with other users, edit, or delete it. When you share a pipeline with others, they receive access to the pipeline and become [pipeline admins](understand-the-deployment-process.md#permissions). Pipeline access enables users to view, share, edit, and delete the pipeline.

## Step 3 - Assign a workspace

>[!NOTE]
>If you're creating a pipeline directly from a workspace, you can skip this stage as the workspace is already selected.

After creating a pipeline, you need to add the content you want to manage to the pipeline. Adding content to the pipeline is done by assigning a workspace to the pipeline stage. You can assign a workspace to any stage.

Follow the instructions in the link to [assign a workspace to a pipeline](assign-pipeline.md#assign-a-workspace-to-any-vacant-pipeline-stage).

## Step 4 - Make a stage public (optional)

By default, the final stage of the pipeline is made public. A consumer of a public stage without access to the pipeline sees it as a regular workspace, without the stage name and deployment pipeline icon on the workspace page next to the workspace name.

You can have as many public stages as you want, or none at all. To change the public status of a stage at any time, go to the pipeline stage settings and check or uncheck the **Make this stage public** box.

#### [Stage settings: new UI](#tab/new-ui)

:::image type="content" source="media/get-started-with-deployment-pipelines/stage-settings-new.png" alt-text="Screenshot showing the stage settings icon next to the name of the stage on the deployment pipelines page.":::

#### [Stage settings: original UI](#tab/old-ui)

:::image type="content" source="media/get-started-with-deployment-pipelines/stage-settings.png" alt-text="Screenshot showing the stage settings icon next to the name of the stage on the deployment pipelines page.":::

---

Set the **Make this stage public** box, and then save.

:::image type="content" source="media/get-started-with-deployment-pipelines/make-stage-public-new.png" alt-text="Screenshot of the stage settings with the make this stage public toggle set to yes.":::

## Step 5 - Deploy to an empty stage

When you finished working with content in one pipeline stage, you can deploy it to the next stage. Deploying content to another stage is often done after you performed some actions in the pipeline. For example, made development changes to your content in the development stage, or tested your content in the test stage. A typical workflow for moving content from stage to stage, is development to test, and then test to production, but you can deploy in any direction. You can learn more about this process, in the [deploy content to an existing workspace](understand-the-deployment-process.md#deploy-content-from-one-stage-to-another) section.

Deployment pipelines offer three options for deploying your content:

* [Full deployment](deploy-content.md#deploy-all-content) - Deploy all your content to the target stage.

* [Selective deployment](deploy-content.md#selective-deployment) - Select which content to deploy to the target stage.

* Backward deployment - Deploy content from a later stage to an earlier stage in the pipeline. Currently, backward deployment is only possible when the target stage is empty (has no workspace assigned to it).

After you choose how to deploy your content, you can [Review your deployment and leave a note](deploy-content.md#review-your-deployment-and-leave-a-note).

## Step 6 - Deploy content from one stage to another

Once you have content in a pipeline stage, you can deploy it to the next stage, even if the next stage workspace has content. [Paired items](./assign-pipeline.md#item-pairing) are overwritten. You can learn more about this process, in the [deploy content to an existing workspace](understand-the-deployment-process.md#deploy-content-from-one-stage-to-another) section.

You can review the deployment history to see the last time content was deployed to each stage.

Deployment history is useful for establishing when a stage was last updated. It can also be helpful if you want to track time between deployments.

To examine the differences between the two pipelines before you deploy, see [compare content in different deployment stages](./compare-pipeline-content.md).

## Step 7 - Create deployment rules (optional)

When you're working in a deployment pipeline, different stages can have different configurations. For example, each stage can have different databases or different query parameters. The development stage might query sample data from the database, while the test and production stages query the entire database.

When you deploy content between pipeline stages, configuring deployment rules enables you to allow changes to content while keeping some settings intact. For example, you can define a rule for a semantic model in a production stage to point to a production database. Define the rule in the production stage under the appropriate semantic model. Once a rule is defined or changed, redeploy the content. The deployed content inherits the value defined in the deployment rule, and always applies as long as the rule is unchanged and valid.

[Read about how to define deployment rules.](create-rules.md)

## Related content

* [Assign a workspace to a pipeline stage](assign-pipeline.md)
* [Troubleshooting deployment pipelines](../troubleshoot-cicd.md#deployment-pipelines)
