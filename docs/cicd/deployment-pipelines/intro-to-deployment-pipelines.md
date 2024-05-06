---
title: Overview of Fabric deployment pipelines
description: An introduction to deployment pipelines the Fabric Application lifecycle management (ALM) tool
author: mberdugo
ms.author: monaberdugo
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 09/28/2023
ms.search.form: Create deployment pipeline, View deployment pipeline, Introduction to Deployment pipelines
---

# Introduction to deployment pipelines

> [!NOTE]
> This articles in this section describe how to deploy content to your app. For version control, see the [Git integration](../git-integration/intro-to-git-integration.md) documentation.

In today’s world, analytics is a vital part of decision making in almost every organization. Fabric's deployment pipelines tool provides content creators with a production environment where they can collaborate to manage the lifecycle of organizational content. Deployment pipelines enable creators to develop and test content in the service before it reaches the users. See the full list of [Supported item types](#supported-items) that you can deploy.

## Learn to use deployment pipelines

You can learn how to use the deployment pipelines tool by following these links.

* [Create and manage a deployment pipeline](/training/modules/power-bi-deployment-pipelines) - A Learn module that walks you through creating a deployment pipeline.

* [Get started with deployment pipelines](get-started-with-deployment-pipelines.md) - An article that explains how to create a pipeline and key functions such as backward deployment and deployment rules.

## Supported items

When you deploy content from one pipeline stage to another, the copied content can contain the following items:

* [Data pipelines](../../data-factory/git-integration-deployment-pipelines.md)
* Dataflows Gen1
* Datamarts
* [Lakehouse](../../data-engineering/lakehouse-git-deployment-pipelines.md)
* [Notebooks](../../data-engineering/notebook-source-control-deployment.md#notebook-in-deployment-pipelines)
* [Paginated reports](/power-bi/paginated-reports/paginated-reports-report-builder-power-bi)
* Reports (based on supported semantic models)
* Semantic models (except for Direct Lake semantic models)
* [Warehouses](../../data-warehouse/data-warehousing.md)

## Pipeline structure

You can decide how many stages you want in your deployment pipeline. There can be anywhere between two and ten stages. When you create a pipeline, the default three typical stages are given as a starting point, but you can add, delete, or rename the stages to suit your needs. Regardless of how many stages there are, the general concepts are the same:

* **<a name="development"></a>Development**

    The first stage in deployment pipelines where you upload new content with your fellow creators. You can design build, and develop here, or in a different stage.

* **<a name="test"></a>Test**

    After you've made all the needed changes to your content, you're ready to enter the test stage. Upload the modified content so it can be moved to this test stage. Here are three examples of what can be done in the test environment:

  * Share content with testers and reviewers

  * Load and run tests with larger volumes of data

  * Test your app to see how it will look for your end users

* **<a name="production"></a>Production**

    After testing the content, use the production stage to share the final version of your content with business users across the organization.

:::image type="content" source="media/intro-to-deployment-pipelines/full-pipeline.gif" alt-text="A screenshot of a working deployment pipeline with all three stages, development, test, and production, populated.":::

## Item pairing

Pairing is the process by which an item (such as reports, dashboards, and semantic models) in one stage of the deployment pipeline is associated with the same item in the adjacent stage. Pairing occurs when you assign a workspace to a deployment stage or when you deploy content from one stage to another. Pairing is vital for correct deployments. If items aren't paired, even if they appear to be the same, they won't overwrite on a subsequent deployment.

* Items in the same folder with the same name and type are automatically paired when the workspace is assigned or items are deployed.
* Paired items remain paired even if you change their names. Therefore, you can have paired items with different names.
* Items added after the workspace is assigned to a pipeline are not automatically paired. Therefore, you can have identical items in adjacent workspaces that aren't paired.

For more information about items pairing and how it works, see [Item pairing](./assign-pipeline.md#item-pairing).

## Deployment method

When you deploy content from the source stage to a target stage, paired items are overwritten. Content in the target stage that doesn't exist in the source stage remains in the target stage as is. After you select *deploy*, you'll get a warning message listing the items that will be overwritten.

:::image type="content" source="media/intro-to-deployment-pipelines/replaced-content.png" alt-text="A screenshot of the replaced content warning displayed when a deployment is about to cause changes to items in the stage you're deploying to.":::

You can learn more about [which item properties are copied to the next stage](understand-the-deployment-process.md#item-properties-copied-during-deployment), and which properties are not copied, in [Understand the deployment process](understand-the-deployment-process.md#item-properties-that-are-not-copied).

## Automation

You can also deploy content programmatically, using the [deployment pipelines REST APIs](/rest/api/power-bi/pipelines). Learn more about the automation process in [Automate your deployment pipeline using APIs and DevOps](pipeline-automation.md).

## Related content

* [Understand the deployment pipelines process](understand-the-deployment-process.md)
* [Get started with deployment pipelines](get-started-with-deployment-pipelines.md)
