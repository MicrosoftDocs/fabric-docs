---
title: Overview of Fabric deployment pipelines
description: An introduction to deployment pipelines in the Fabric Application lifecycle management (ALM) tool. Learn which items can be deployed, the structure of a pipeline, and how to pair items.
author: billmath
ms.author: billmath
ms.service: fabric
ms.subservice: cicd
ms.topic: overview
ms.custom:
ms.date: 02/13/2025
ms.search.form: Create deployment pipeline, View deployment pipeline, Introduction to Deployment pipelines
#customer intent: As a developer, I want to learn about deployment pipelines in the Fabric service so that I can manage my development process efficiently.
---

# Introduction to deployment pipelines

> [!NOTE]
> The articles in this section describe how to deploy content to your app. For version control, see the [Git integration](../git-integration/intro-to-git-integration.md) documentation.

Microsoft Fabric's deployment pipelines tool provides content creators with a production environment where they can collaborate with others to manage the lifecycle of organizational content. Deployment pipelines enable creators to develop and test content in the service before it reaches the users. See the full list of [Supported item types](#supported-items) that you can deploy.

> [!NOTE]
>
> * The new Deployment pipeline user interface is currently in **preview**. To turn on or use the new UI, see [Begin using the new UI](./deployment-pipelines-new-ui.md#begin-using-the-new-ui).
> * Some of the items for deployment pipelines are in preview. For more information, see the list of [supported items](#supported-items).

## Learn to use deployment pipelines

You can learn how to use the deployment pipelines tool by following these links.

* [Create and manage a deployment pipeline](/training/modules/power-bi-deployment-pipelines) - A Learn module that walks you through the entire process of creating a deployment pipeline.

* [Get started with deployment pipelines](./get-started-with-deployment-pipelines.md) - An article that explains how to create a pipeline and perform key functions such as deployment, comparing content in different stages, and creating deployment rules.

## Supported items

When you deploy content from one pipeline stage to another, the copied content can contain the following items:

* Data Engineering items:

  * [Environment](../../data-engineering/environment-git-and-deployment-pipeline.md#set-up-a-deployment-pipeline-for-an-environment)
  * [GraphQL](../../data-engineering/graphql-source-control-and-deployment.md#api-for-graphql-in-deployment-pipeline) *(preview)*
  * [Lakehouse](../../data-engineering/lakehouse-git-deployment-pipelines.md#lakehouse-in-deployment-pipelines) *(preview)*
  * [Notebook](../../data-engineering/notebook-source-control-deployment.md#notebook-in-deployment-pipelines)
  * Spark Job Definitions *(preview)*
  * User Data Functions *(preview)*

* Data Factory items:

  * [Copy Job](../../data-factory/cicd-copy-job.md#deployment-pipelines-for-git) *(preview)*
  * [Dataflows gen2](../../data-factory/dataflow-gen2-cicd-and-git-integration.md)
  * [Data pipeline](../../data-factory/cicd-pipelines.md)
  * [Mirrored database](../../mirroring/mirrored-database-cicd.md#mirrored-database-in-deployment-pipelines)
  * Mount ADF *(preview)*
  * [Variable library](../variable-library/variable-library-cicd.md#variable-libraries-and-deployment-pipelines) *(preview)*

* Real-time Intelligence items:

  * [Activator](../../real-time-intelligence/git-deployment-pipelines.md) *(preview)*
  * [Digital twin builder](../../real-time-intelligence/digital-twin-builder/overview.md) *(preview)*
  * [Eventhouse](../../real-time-intelligence/git-deployment-pipelines.md)
  * [EventStream](../../real-time-intelligence/event-streams/eventstream-cicd.md#deploy-eventstream-items-from-one-stage-to-another)
  * [KQL database](../../real-time-intelligence/git-deployment-pipelines.md)
  * [KQL Queryset](../../real-time-intelligence/git-deployment-pipelines.md)
  * [Real-time Dashboard](../../real-time-intelligence/git-deployment-pipelines.md)

* Data Warehouse items:

  * [Warehouse](../../data-warehouse/source-control.md#deployment-pipelines) *(preview)*
  * Mirrored Azure Databricks Catalog *(preview)*


* Power BI items:

  * Dashboard *(preview)*
  * Dataflow *(preview)*
  * Datamart *(preview)*
  * [Org app](/power-bi/consumer/org-app-items/org-app-cicd) *(preview)*
  * Paginated report *(preview)*
  * Report (based on supported semantic models) *(preview)*
  * Semantic model (that originates from a .pbix file and isn't a PUSH dataset) *(preview)*

* Database items:

  * [SQL database](../../database/sql/deployment-pipelines.md) *(preview)*

* Industry solutions:

  * [Healthcare](/industry/healthcare/healthcare-data-solutions/application-lifecycle-management) *(preview)*
  * HealthCare Cohort *(preview)*

## Pipeline structure

You decide how many stages you want in your deployment pipeline. There can be anywhere from two to 10 stages. When you create a pipeline, the default three typical stages are given as a starting point, but you can add, delete, or rename the stages to suit your needs. Regardless of how many stages there are, the general concepts are the same:

* **<a name="development"></a>Development**

    The first stage in deployment is where you upload new content with your fellow creators. You can design build, and develop here, or in a different stage.

* **<a name="test"></a>Test**

    After you make all the needed changes to your content, you're ready to enter the test stage. Upload the modified content so it can be moved to this test stage. Here are three examples of what can be done in the test environment:

  * Share content with testers and reviewers

  * Load and run tests with larger volumes of data

  * Test your app to see how it looks for your end users

* **<a name="production"></a>Production**

    After testing the content, use the production stage to share the final version of your content with business users across the organization.

### [New pipeline design](#tab/new-ui)

:::image type="content" source="media/intro-to-deployment-pipelines/full-pipeline-new.gif" alt-text="A screenshot of a working deployment pipeline with all three stages, development, test, and production, populated.":::

### [Original pipeline design](#tab/old-ui)

:::image type="content" source="media/intro-to-deployment-pipelines/full-pipeline-old.gif" alt-text="A screenshot the original working deployment pipeline design with all three stages, development, test, and production, populated.":::

---

## Item pairing

Pairing is the process by which an item (such as a report, dashboard, or semantic model) in one stage of the deployment pipeline is associated with the same item in the adjacent stage. Pairing occurs when you assign a workspace to a deployment stage or when you deploy new unpaired content from one stage to another (a clean deploy).

A good understanding of pairing is crucial to help you understand when items are copied, when they're overwritten, and when a deployment fails.

If items aren't paired, even if they appear to be the same (have the same name, type, and folder), they don't overwrite on a deployment. Instead, a duplicate copy is created and paired with the item in the previous stage.

Paired items appear on the same line in the pipeline content list. Items that aren't paired, appear on a line by themselves:

### [New pairing design](#tab/new-ui)

:::image type="content" source="./media/intro-to-deployment-pipelines/paired-items-new.png" alt-text="Screenshot showing adjacent stages with paired items listed on the same line in the new UI.":::

### [Original pairing design](#tab/old-ui)

:::image type="content" source="./media/intro-to-deployment-pipelines/paired-items.png" alt-text="Screenshot showing adjacent stages with paired items listed on the same line and one item in the second stage that's not in the first stage.":::

---

* Items that are paired remain paired even if you change their names. Therefore, paired items can have different names.
* Items added after the workspace is assigned to a pipeline aren't automatically paired. Therefore, you can have identical items in adjacent workspaces that aren't paired.

For a detailed explanation of which items are paired and how pairing works, see [Item pairing](./assign-pipeline.md#item-pairing).

## Deployment method
Deployment pipelines provide content creators with a production environment where they can collaborate with others to manage the lifecycle of organizational content. 

The deployment pipeline is composed of stages.  You decide how many stages you want in your deployment pipeline. There can be anywhere from two to 10 stages. The default is 3.

The deployment process lets you clone content from one stage in the deployment pipeline to another, typically from development to test, and from test to production. During deployment, Microsoft Fabric copies the content from the source stage to the target stage.

Folders enable users to efficiently organize and manage workspace items in a familiar way. When you deploy content that contains folders to a different stage, the folder hierarchy of the applied items is automatically applied.

With the current view of the folders hierarchy, you can select for deployment, only items in the same folder level. You cannot select items across folders.
 
Flat list view of deployment pipelines allows you to select items regardless of its location. With the flat list view, you can select items across folders, regarding their location in the workspace. For more information, see [flat list view](deploy-content.md#flat-list-view).

To deploy content to another stage, at least one item must be selected. When you deploy content from one stage to another, the items being copied from the source stage overwrite the paired item in the stage you're in according to the [pairing rules](./assign-pipeline.md#item-pairing). Items that don't exist in the source stage remain as is.

After you select **Deploy**, you get a confirmation message.

:::image type="content" source="media/intro-to-deployment-pipelines/confirm-deploy.png" alt-text="A screenshot of the replaced content warning displayed when a deployment is about to cause changes to items in the stage you're deploying to.":::

Learn more about [which item properties are copied to the next stage](understand-the-deployment-process.md#item-properties-copied-during-deployment), and which properties aren't copied, in [Understand the deployment process](understand-the-deployment-process.md#item-properties-that-are-not-copied).

## Automation

You can also deploy content programmatically, using the [deployment pipelines REST APIs](/rest/api/power-bi/pipelines). Learn more about the automation process in [Automate your deployment pipeline using APIs and DevOps](pipeline-automation.md).

## Related content

* [Understand the deployment pipelines process](understand-the-deployment-process.md)
* [Get started with deployment pipelines](get-started-with-deployment-pipelines.md)
