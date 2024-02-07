---
title: The Microsoft Fabric deployment pipelines process
description: Understand how deployment pipelines, the Fabric Application lifecycle management (ALM) tool, works.
author: mberdugo
ms.author: monaberdugo
ms.reviewer: Lee
ms.topic: conceptual
ms.custom:
ms.date: 01/28/2024
ms.search.form: Introduction to Deployment pipelines, Manage access in Deployment pipelines, Deployment pipelines operations
---

# The deployment pipelines process

The deployment process lets you clone content from one stage in the deployment pipeline to another, typically from development to test, and from test to production.

During deployment, Microsoft Fabric copies the content from the current stage, into the target one. The connections between the copied items are kept during the copy process. Fabric also applies the configured deployment rules to the updated content in the target stage. Deploying content might take a while, depending on the number of items being deployed. During this time, you can navigate to other pages in the portal, but you can't use the content in the target stage.

You can also deploy content programmatically, using the [deployment pipelines REST APIs](/rest/api/power-bi/pipelines). You can learn more about this process in [Automate your deployment pipeline using APIs and DevOps](pipeline-automation.md).

## Deploy content to an empty stage

When you deploy content to an empty stage, a new workspace is created on a capacity for the stage you deploy to. All the metadata in the reports, dashboards, and semantic models of the original workspace is copied to the new workspace in the stage you're deploying to.

There are several ways to deploy content from one stage to another. You can deploy all the content, or you can [select which items to deploy](deploy-content.md#selective-deployment).

You can also deploy content backwards, from a later stage in the deployment pipeline, to an earlier one.

After the deployment is complete, refresh the semantic models so that you can use the newly copied content. The semantic model refresh is required because data isn't copied from one stage to another. To understand which item properties are copied during the deployment process, and which item properties aren't copied, review the [item properties copied during deployment](#item-properties-copied-during-deployment) section.

### Create a workspace

The first time you deploy content, deployment pipelines checks if you have permissions.  

If you have permissions, the content of the workspace is copied to the stage you're deploying to, and a new workspace for that stage is created on the capacity.

If you don't have permissions, the workspace is created but the content isn’t copied. You can ask a capacity admin to add your workspace to a capacity, or ask for assignment permissions for the capacity. Later, when the workspace is assigned to a capacity, you can deploy content to this workspace.

If you're using [Premium Per User (PPU)](/power-bi/enterprise/service-premium-per-user-faq), your workspace is automatically associated with your PPU. In such cases, permissions aren't required. However, if you create a workspace with a PPU, only other PPU users can access it. In addition, only PPU users can consume content created in such workspaces.

The deploying user automatically becomes the owner of the cloned semantic models, and the only admin of the new workspace.

## Deploy content to an existing workspace

Deploying content from a working production pipeline to a stage that has an existing workspace, includes the following steps:

* Deploying new content as an addition to the content already there.

* Deploying updated content to replace some of the content already there.

### Deployment process

When content from the current stage is copied to the target stage, Fabric identifies existing content in the target stage and overwrites it. To identify which content item needs to be overwritten, deployment pipelines uses the connection between the parent item and its clones. This connection is kept when new content is created. The overwrite operation only overwrites the content of the item. The item's ID, URL, and permissions remain unchanged.

In the target stage, [item properties that aren't copied](understand-the-deployment-process.md#item-properties-that-are-not-copied), remain as they were before deployment. New content and new items are copied from the current stage to the target stage.

### Auto-binding

In Fabric, when items are connected, one of the items depends on the other. For example, a report always depends on the semantic model it's connected to. A semantic model can depend on another semantic model, and can also be connected to several reports that depend on it. If there's a connection between two items, deployment pipelines always tries to maintain this connection.

During deployment, deployment pipelines checks for dependencies. The deployment either succeeds or fails, depending on the location of the item that provides the data that the deployed item depends on.

* **Linked item exists in the target stage** - Deployment pipelines automatically connect (autobind) the deployed item to the item it depends on in the deployed stage. For example, if you deploy a paginated report from development to test, and it's connected to a semantic model that was previously deployed to the test stage, it automatically connects to that semantic model.

* **Linked item doesn't exist in the target stage** - Deployment pipelines fail a deployment if an item has a dependency on another item, and the item providing the data isn't deployed and doesn't reside in the target stage. For example, if you deploy a report from development to test, and the test stage doesn't contain its semantic model, the deployment will fail. To avoid failed deployments due to dependent items not being deployed, use the *Select related* button. *Select related* automatically selects all the related items that provide dependencies to the items you're about to deploy.

Auto-binding works only with items that are supported by deployment pipelines and reside within Fabric. To view the dependencies of an item, from the item's *More options* menu, select *View lineage*.

:::image type="content" source="media/understand-the-deployment-process/view-lineage.png" alt-text="A screenshot of the view lineage option, in an item's more options menu.":::

#### Auto-binding across pipelines

Deployment pipelines automatically binds items that are connected across pipelines, if they're in the same pipeline stage. When you deploy such items, deployment pipelines attempts to establish a new connection between the deployed item and the item it's connected to in the other pipeline. For example, if you have a report in the test stage of pipeline A that's connected to a semantic model in the test stage of pipeline B, deployment pipelines recognizes this connection.

Here's an example with illustrations that to help demonstrate how autobinding across pipelines works:

1. You have a semantic model in the development stage of pipeline A.

2. You also have a report in the development stage of pipeline B.

3. Your report in pipeline B is connected to your semantic model in pipeline A. Your report depends on this semantic model.

4. You deploy the report in pipeline B from the development stage to the test stage.

5. The deployment succeeds or fails, depending on whether or not you have a copy of the semantic model it depends on in the test stage of pipeline A:

    * *If you have a copy of the semantic model the report depends on in the test stage of pipeline A*:

        The deployment succeeds, and deployment pipelines connects (auto-bind) the report in the test stage of pipeline B, to the semantic model in the test stage of pipeline A.

        :::image type="content" source="media/understand-the-deployment-process/successful-deployment.png" alt-text="A diagram showing a deployment of a report from the development stage to the test stage in pipeline B. The report is connected to a dataset in pipeline A. The deployment is successful because there's a copy of the dataset the report depends on in the test stage of pipeline A. After the deployment the report in the test stage on pipeline B, autobinds with the dataset in the test stage of pipeline A.":::

    * *If you don't have a copy of the semantic model the report depends on in the test stage of pipeline A*:

        The deployment fails because deployment pipelines can't connect (auto-bind) the report in the test stage in pipeline B, to the semantic model it depends on in the test stage of pipeline A.

        :::image type="content" source="media/understand-the-deployment-process/failed-deployment.png" alt-text="A diagram showing a deployment of a report from the development stage to the test stage in pipeline B. The report is connected to a dataset in pipeline A. The deployment fails because there isn't a copy of the dataset the report depends on in the test stage of pipeline A.":::

#### Avoid using auto-binding

In some cases, you might not want to use auto-binding. For example, if you have one pipeline for developing organizational semantic models, and another for creating reports. In this case, you might want all the reports to always be connected to semantic models in the production stage of the pipeline they belong to. To accomplish this, avoid using the auto-binding feature.

:::image type="content" source="media/understand-the-deployment-process/no-auto-binding.png" alt-text="A diagram showing two pipelines. Pipeline A has a semantic model in every stage and pipeline B has a report in every stage. All the reports from pipeline B are connected to the semantic model in the production stage of pipeline A.":::

There are three methods you can use to avoid using auto-binding:

* Don't connect the item to corresponding stages. When the items aren't connected in the same stage, deployment pipelines keeps the original connection. For example, if you have a report in the development stage of pipeline B that's connected to a semantic model in the production stage of pipeline A. When you deploy the report to the test stage of pipeline B, it remains connected to the semantic model in the production stage of pipeline A.

* Define a parameter rule. This option isn't available for reports. You can only use it with semantic models and dataflows.

* Connect your reports, dashboards, and tiles to a proxy semantic model or dataflow that isn't connected to a pipeline.

#### Auto-binding and parameters

Parameters can be used to control the connections between semantic models or dataflows and the items that they depend on. When a parameter controls the connection, autobinding after deployment won't take place, even when the connection includes a parameter that applies to the semantic model’s or dataflow's ID, or the workspace ID. In such cases, you'll need to rebind the items after the deployment by changing the parameter value, or by using [parameter rules](create-rules.md).

>[!NOTE]
>If you're using parameter rules to rebind items, the parameters must be of type `Text`.  

### Refreshing data

Data in the target item, such as a semantic model or dataflow, is kept when possible. If there are no changes to an item that holds the data, the data is kept as it was before the deployment.

In many cases, when you have a small change such as adding or removing a table, Fabric keeps the original data. For breaking schema changes, or changes in the data source connection, a full refresh is required.

### Requirements for deploying to a stage with an existing workspace

Any [licensed user](../../enterprise/licenses.md#per-user-licenses) who's a member of both the target and source deployment workspaces, can deploy content that resides on a [capacity](../../enterprise/licenses.md#capacity-license) to a stage with an existing workspace. For more information, review the [permissions](#permissions) section.

## Folders in deployment pipelines (preview)

[Folders]() in a workspace enable users to efficiently organize and manage workspace items in a familiar way.
When you deploy content that contains folders to a different stage, the folder hierarchy of the applied items is automatically applied.

### Folders representation

Since a deployment is of items only, workspace content is shown in Deployment pipelines as a flat list of items. An item’s full path is shown when hovering over its name on the list.
In Deployment pipelines, folders are considered part of an item’s name (an item name includes its full path). When an item is deployed, after its path was changed (moved from folder A to folder B, for example), then Deployment pipelines applies this change to its paired item during deployment - the paired item will be moved as well to folder B. If folder B doesn't exist in the stage we're deploying to, it will be created in its workspace first. Folders can be seen and managed only on the workspace page.

:::image type="content" source="media/understand-the-deployment-process/folder-path.png" alt-text="Screenshot showing the ful pathname of an item inside a folder. The name includes the name of the folder.":::

### Identify items that were moved to different folders

Since folders are considered part of the item’s name, items moved into a different folder in the workspace, are identified on Deployment pipelines page as *Different* in *Compare* mode. Moreover, unless there is also a schema change, the option next to the label to open a *Change review* window which presents the schema changes, is disabled. Hovering over it shows a note saying the change is a *settings* change (like *rename*). This is because compared to their paired items on the source stage, the change is not yet deployed.

:::image type="content" source="media/understand-the-deployment-process/moved-folder-item.png" alt-text="Screenshot showing the compare changes screen of with an item in one stage that was moved to a different folder.":::

* Individual folders can't be deployed manually in deployment pipelines. Their deployment is triggered automatically when at least one of their items is deployed.

* The folder hierarchy of paired items is updated only during deployment. During assignment, after the pairing process, the hierarchy of paired items isn't updated yet.

* Since a folder is deployed only if one of its items is deployed, an empty folder can't be deployed.

* Deploying one item out of several in a folder also updates the structure of the items which aren't deployed in the target stage even though the items themselves aren't be deployed.

## Supported items

When you deploy content from one pipeline stage to another, the copied content can contain the following items:

* Dataflows Gen1
* Datamarts
* [Lakehouse](../../data-engineering/lakehouse-git-deployment-pipelines.md)
* [Notebooks](../../data-engineering/notebook-source-control-deployment.md#notebook-in-deployment-pipelines)
* Paginated reports
* Reports (based on supported semantic models)
* Semantic models (except for Direct Lake semantic models)
* [Warehouses](../../data-warehouse/data-warehousing.md)

### Unsupported items

Deployment pipelines doesn't support the following items:

* Dataflows Gen2
* Data pipelines
* Datasets that don't originate from a *.pbix*
* Direct Lake semantic model
* PUSH datasets
* Streaming dataflows
* Reports based on unsupported semantic models
* [Template app workspaces](/power-bi/connect-data/service-template-apps-create#create-the-template-workspace)
* Workbooks
* Metrics

## Item properties copied during deployment

During deployment, the following item properties are copied and overwrite the item properties at the target stage:

* Data sources ([deployment rules](create-rules.md) are supported)

* Parameters​ ([deployment rules](create-rules.md) are supported)

* Report visuals​

* Report pages​

* Dashboard tiles​

* Model metadata​

* Item relationships

[Sensitivity labels](/power-bi/enterprise/service-security-sensitivity-label-overview) are copied *only* when one of the following conditions is met. If these conditions aren't met, sensitivity labels *are not* copied during deployment.

* A new item is deployed, or an existing item is deployed to an empty stage.

    >[!NOTE]
    > In cases where default labeling is enabled on the tenant, and the default label is valid, if the item being deployed is a semantic model or dataflow, the label will be copied from the source item **only** if the label has protection. If the label is not protected, the default label will be applied to the newly created target semantic model or dataflow.

* The source item has a label with protection and the target item doesn't. In such cases, a pop-up window asking for consent to override the target sensitivity label appears.

### Item properties that are not copied

The following item properties aren't copied during deployment:

* Data - Data isn't copied. Only metadata is copied

* URL

* ID

* Permissions - For a workspace or a specific item

* Workspace settings - Each stage has its own workspace

* App content and settings - To update your apps, see [Update content to Power BI apps](#update-content-to-power-bi-apps)

* [Personal bookmarks](/power-bi/consumer/end-user-bookmarks#create-personal-bookmarks-in-the-power-bi-service)

The following semantic model properties are also not copied during deployment:

* Role assignment

* Refresh schedule

* Data source credentials

* Query caching settings (can be inherited from the capacity)

* Endorsement settings

## Supported semantic model features

Deployment pipelines supports many semantic model features. This section lists two semantic model features that can enhance your deployment pipelines experience:

* [Incremental refresh](#incremental-refresh)

* [Composite models](#composite-models)

### Incremental refresh

Deployment pipelines supports [incremental refresh](/power-bi/connect-data/incremental-refresh-overview), a feature that allows large semantic models faster and more reliable refreshes, with lower consumption.

With deployment pipelines, you can make updates to a semantic model with incremental refresh while retaining both data and partitions. When you deploy the semantic model, the policy is copied along.

To understand how incremental refresh behaves with dataflows, see [why do I see two data sources connected to my dataflow after using dataflow rules?](/power-bi/create-reports/deployment-pipelines-troubleshooting#why-do-i-see-two-data-sources-connected-to-my-dataflow-after-using-dataflow-rules-)

#### Activating incremental refresh in a pipeline

To enable incremental refresh, [configure it in Power BI Desktop](/power-bi/connect-data/incremental-refresh-overview), and then publish your semantic model. After you publish, the incremental refresh policy is similar across the pipeline, and can be authored only in Power BI Desktop.

Once your pipeline is configured with incremental refresh, we recommend that you use the following flow:

1. Make changes to your *.pbix* file in Power BI Desktop. To avoid long waiting times, you can make changes using a sample of your data.

2. Upload your *.pbix* file to the first (usually *development*) stage.

3. Deploy your content to the next stage. After deployment, the changes you made will apply to the entire semantic model you're using.

4. Review the changes you made in each stage, and after you verify them, deploy to the next stage until you get to the final stage.

#### Usage examples

The following are a few examples of how you may integrate incremental refresh with deployment pipelines.

* [Create a new pipeline](get-started-with-deployment-pipelines.md#step-1---create-a-deployment-pipeline) and connect it to a workspace with a semantic model that has incremental refresh enabled.

* Enable incremental refresh in a semantic model that's already in a *development* workspace.  

* Create a pipeline from a production workspace that has a semantic model that uses incremental refresh. For example, assign the workspace to a new pipeline's *production* stage, and use backwards deployment to deploy to the *test* stage, and then to the *development* stage.

* Publish a semantic model that uses incremental refresh to a workspace that's part of an existing pipeline.

#### Incremental refresh limitations

For incremental refresh, deployment pipelines only supports semantic models that use [enhanced semantic model metadata](/power-bi/connect-data/desktop-enhanced-dataset-metadata). All semantic models created or modified with Power BI Desktop automatically implement enhanced semantic model metadata.

When republishing a semantic model to an active pipeline with incremental refresh enabled, the following changes result in deployment failure due to data loss potential:

* Republishing a semantic model that doesn't use incremental refresh, to replace a semantic model that has incremental refresh enabled.

* Renaming a table that has incremental refresh enabled.

* Renaming noncalculated columns in a table with incremental refresh enabled.

Other changes such as adding a column, removing a column, and renaming a calculated column, are permitted. However, if the changes affect the display, you need to refresh before the change is visible.

### Composite models

Using [composite models](/power-bi/transform-model/desktop-composite-models) you can set up a report with multiple data connections.

You can use the composite models functionality to connect a Fabric semantic model to an external semantic models such as Azure Analysis Services. For more information, see [Using DirectQuery for Fabric semantic models and Azure Analysis Services](/power-bi/connect-data/desktop-directquery-datasets-azure-analysis-services).

In a deployment pipeline, you can use composite models to connect a semantic model to another Fabric semantic model external to the pipeline.

### Automatic aggregations

[Automatic aggregations](/power-bi/enterprise/aggregations-auto) are built on top of user defined aggregations and use machine learning to continuously optimize DirectQuery semantic models for maximum report query performance.

Each semantic model keeps its automatic aggregations after deployment. Deployment pipelines doesn't change a semantic model's automatic aggregation. This means that if you deploy a semantic model with an automatic aggregation, the automatic aggregation in the target stage remains as is, and isn't overwritten by the automatic aggregation deployed from the source stage.

To enable automatic aggregations, follow the instructions in [configure the automatic aggregation](/power-bi/enterprise/aggregations-auto-configure).

### Hybrid tables

Hybrid tables are tables with [incremental refresh](/power-bi/connect-data/incremental-refresh-overview) that can have both import and direct query partitions. During a clean deployment, both the refresh policy and the hybrid table partitions are copied. When you're deploying to a pipeline stage that already has hybrid table partitions, only the refresh policy is copied. To update the partitions, refresh the table.

## Update content to Power BI apps

[Power BI apps](/power-bi/consumer/end-user-apps) are the recommended way of distributing content to free Fabric consumers. You can update the content of your Power BI apps using a deployment pipeline, giving you more control and flexibility when it comes to your app's lifecycle.

Create an app for each deployment pipeline stage, so that you can test each update from an end user's point of view. Use the **publish** or **view** button in the workspace card to publish or view the app in a specific pipeline stage.

:::image type="content" source="media/understand-the-deployment-process/publish.png" alt-text="A screenshot highlighting the publish app button, at the bottom right of the production stage." lightbox="media/understand-the-deployment-process/publish.png":::

In the production stage, the main action button on the bottom-right corner opens the update app page in Fabric, so that any content updates become available to app users.

:::image type="content" source="media/understand-the-deployment-process/update-app.png" alt-text="A screenshot highlighting the update app button, at the bottom right of the production stage." lightbox="media/understand-the-deployment-process/update-app.png":::

>[!IMPORTANT]
>The deployment process does not include updating the app content or settings. To apply changes to content or settings, you need to manually update the app in the required pipeline stage.

## Permissions

Permissions are required for the pipeline, and for the workspaces that are assigned to it. Pipeline permissions and workspace permissions are granted and managed separately.

* Pipelines only have one permission, *Admin*, which is required for sharing, editing and deleting a pipeline.

* Workspaces have different permissions, also called [roles](../../get-started/roles-workspaces.md). Workspace roles determine the level of access to a workspace in a pipeline.

* Deployment pipelines do not support [Microsoft 365 groups](/microsoft-365/admin/create-groups/compare-groups#microsoft-365-groups) as pipeline admins.

To deploy from one stage to another in the pipeline, you must be a pipeline admin, and either a member or an admin of the workspaces assigned to the stages involved. For example, a pipeline admin that isn't assigned a workspace role, will be able to view the pipeline and share it with others. However, this user won't be able to view the content of the workspace in the pipeline, or in the service, and won't be able to perform deployments.

### Permissions table

This section describes the deployment pipeline permissions. The permissions listed in this section may have different applications in other Fabric features.

The lowest deployment pipeline permission is *pipeline admin*, and it's required for all deployment pipeline operations.

|User                          |Pipeline permissions |Comments |
|------------------------------|---------------------|---------|
|**Pipeline admin** |<ul><li>View the pipeline​</li><li>Share the pipeline with others</li><li>Edit and delete the pipeline</li><li>Unassign a workspace from a stage</li><li>Can see workspaces that are tagged as assigned to the pipeline in Power BI service</li></ul> |Pipeline access doesn't grant permissions to view or take actions on the workspace content. |
|**Workspace viewer**<br>(and pipeline admin) |<ul><li>Consume content</li><li>Unassign a workspace from a stage</li></ul> |Workspace members assigned the Viewer role without *build* permissions, can't access the semantic model or edit workspace content. |
|**Workspace contributor**<br>(and pipeline admin) |<ul><li>Consume content​</li><li>Compare stages</li><li>View semantic models</li><li>Unassign a workspace from a stage</li></ul> |   |
|**Workspace member**<br>(and pipeline admin) |<ul><li>View workspace content​</li><li>Compare stages</li><li>Deploy items (must be a member or admin of both source and target workspaces)</li><li>Update semantic models</li><li>Unassign a workspace from a stage</li><li>Configure semantic model rules (you must be the semantic model owner)</li></ul> |If the *block republish and disable package refresh* setting located in the tenant *semantic model security* section is enabled, only semantic model owners are able to update semantic models. |
|**Workspace admin**<br>(and pipeline admin) |<ul><li>View workspace content​</li><li>Compare stages</li><li>Deploy items</li><li>Assign workspaces to a stage</li><li>Update semantic models</li><li>Unassign a workspace from a stage</li><li>Configure semantic model rules (you must be the semantic model owner)</li></ul> |   |

### Granted permissions

When you're deploying Power BI items, the ownership of the deployed item may change. Review the following table to understand who can deploy each item and how the deployment affects the item's ownership.

|Fabric Item    |Required permission to deploy an existing item |Item ownership after a first time deployment |Item ownership after deployment to a stage with the item|
|-----------------|---|---|---|
|Semantic model   |Workspace member |The user who made the deployment becomes the owner |Unchanged |
|Dataflow         |Dataflow owner   |The user who made the deployment becomes the owner |Unchanged |
|Datamart         |Datamart owner   |The user who made the deployment becomes the owner |Unchanged |
|Paginated report |Workspace member |The user who made the deployment becomes the owner |The user who made the deployment becomes the owner |

### Required permissions for popular actions

The following table lists required permissions for popular deployment pipeline actions. Unless specified otherwise, for each action you need all the listed permissions.

|Action  |Required permissions  |
|--------|----------------------|
|View the list of pipelines in your organization |No license required  (free user)         |
|Create a pipeline     |A user with one of the following licenses:<ul><li>Pro</li><li>PPU</li><li>Premium</li></ul>         |
|Delete a pipeline     |Pipeline admin         |
|Add or remove a pipeline user     |Pipeline admin         |
|Assign a workspace to a stage     |<ul><li>Pipeline admin</li><li>Workspace admin (of the workspace to be assigned)</li></ul>         |
|Unassign a workspace to a stage     |One of the following:<ul><li>Pipeline admin</li><li>Workspace admin (using the [Pipelines - Unassign Workspace](/rest/api/power-bi/pipelines/unassign-workspace) API)</li></ul>         |
|Deploy to an empty stage     |<ul><li>Pipeline admin</li><li>Source workspace member or admin</li></ul>         |
|Deploy items to the next stage    |<ul><li>Pipeline admin</li><li>Workspace member or admin of both the source and target stages</li><li>To deploy datamarts or dataflows, you must be the owner of the deployed item</li><li>If the semantic model tenant admin switch is turned on and you're deploying a semantic model, you need to be the owner of the semantic model</li></ul>         |
|View or set a rule     |<ul><li>Pipeline admin</li><li>Target workspace contributor, member, or admin</li><li>Owner of the item you're setting a rule for</li></ul>         |
|Manage pipeline settings     |Pipeline admin         |
|View a pipeline stage     |<ul><li>Pipeline admin</li><li>Workspace reader, contributor, member, or admin. You'll see the items that your workspace permissions grant access to.</li></ul>         |
|View the list of items in a stage     |Pipeline admin         |
|Compare two stages     |<ul><li>Pipeline admin</li><li>Workspace contributor, member, or admin for both stages</li></ul>         |
|View deployment history     |Pipeline admin         |

## Considerations and limitations

This section lists most of the limitations in deployment pipelines.

* The workspace must reside on a [Fabric capacity](../../enterprise/licenses.md#capacity).

* The maximum number of items that can be deployed in a single deployment is 300.

* Downloading a *.pbix* file after deployment isn't supported.

* [Microsoft 365 groups](/microsoft-365/admin/create-groups/compare-groups#microsoft-365-groups) aren't supported as pipeline admins.

* When you're deploying a Power BI item for the first time, if another item in the target stage is similar in type (for example, if both files are reports) and has the same name, the deployment fails.

* For a list of workspace limitations, see the [workspace assignment limitations](assign-pipeline.md#considerations-and-limitations).

* For a list of unsupported items, see [unsupported items](#unsupported-items).

* The deployment fails if any of the items have circular or self dependencies (for example, item A references item B and item B references item A).

### Semantic model limitations

* Datasets that use real-time data connectivity can't be deployed.

* A semantic model with DirectQuery or Composite connectivity mode that uses variation or [auto date/time](/power-bi/transform-model/desktop-auto-date-time) tables, isn’t supported. For more information, see [What can I do if I have a dataset with DirectQuery or Composite connectivity mode, that uses variation or calendar tables?](../faq.md#what-can-i-do-if-i-have-a-dataset-with-directquery-or-composite-connectivity-mode-that-uses-variation-or-auto-datetime-tables).

* During deployment, if the target semantic model is using a [live connection](/power-bi/connect-data/desktop-report-lifecycle-datasets), the source semantic model must use this connection mode too.

* After deployment, downloading a semantic model (from the stage it's been deployed to) isn't supported.

* For a list of deployment rule limitations, see [deployment rules limitations](create-rules.md#considerations-and-limitations).

* Deployment is **not** supported on a semantic model that uses Native query and DirectQuery together and auto binding is engaged on the DirectQuery data source.

### Dataflow limitations

* When you're deploying a dataflow to an empty stage, deployment pipelines creates a new workspace and sets the dataflow storage to a Fabric blob storage. Blob storage is used even if the source workspace is configured to use Azure data lake storage Gen2 (ADLS Gen2).

* Service principal isn't supported for dataflows.

* Deploying common data model (CDM) isn't supported.

* For deployment pipeline rule limitations that affect dataflows, see [Deployment rules limitations](create-rules.md#considerations-and-limitations).

* If a dataflow is being refreshed during deployment, the deployment fails.

* When comparing stages during dataflow refresh, the results are unpredictable.

### Datamart limitations

* You can't deploy a datamart with sensitivity labels.

* To deploy a datamart, you need to be the datamart owner.

## Related content

[Get started with deployment pipelines](get-started-with-deployment-pipelines.md)
