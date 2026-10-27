---
title: CI/CD for Fabric Planning with Git and Deployment Pipelines
description: Streamline CI/CD for Fabric planning items. Connect workspaces to GitHub or Azure DevOps, commit changes, and deploy plans across environments. Get started now.
#customer intent: As a Fabric developer, I want to connect my planning workspace to a Git repository so that I can version and track changes to planning items.
ms.date: 10/26/2026
ms.topic: how-to
---

# CI/CD for planning in Fabric

Use CI/CD (Continuous Integration and Continuous Deployment) to streamline the development and deployment of planning content across environments. Integrate planning artifacts into source control, validate changes, and deploy updates consistently from development to production while reducing manual effort and deployment errors.

Planning supports two key CI/CD capabilities: Git integration and deployment pipelines. These tools help manage planning items across development, test, and production environments by allowing individual items to be deployed, or multiple items to be deployed at once.

In addition, Planning supports using variables to dynamically manage semantic models, writeback destinations, and writeback connections across environments.

## Configure Git integration

Planning integrates with source control at the workspace level. You can commit all planning items in a workspace to a Git branch and version multiple planning items through a single process. The workspace structure, including folders, is preserved in the Git repository. Fabric supports source control through GitHub and Azure DevOps. For more information, see [Fabric Git Integration](/fabric/cicd/git-integration/git-get-started?tabs=azure-devops%2CAzure%2Ccommit-to-git).

1. Open the Fabric workspace to integrate with a Git repository.
1. Go to **Workspace Settings** and select **Git integration**.
1. Select your source control provider: **Azure DevOps** or **GitHub**.

    :::image type="content" source="../media/resources/cicd-planning/select-git-provider.png" alt-text="Screenshot of Fabric workspace Git integration settings showing Azure DevOps and GitHub as source control provider options." lightbox="../media/resources/cicd-planning/select-git-provider.png":::

1. Enter the Azure DevOps or GitHub account and repository details. In this example, you choose GitHub.
1. Select **Connect**.
1. In the **Connect Git repository and branch** section, select an existing branch or create a new branch.

    :::image type="content" source="../media/resources/cicd-planning/select-git-branch-connect.png" alt-text="Screenshot of selecting the branch and connecting to the repository." lightbox="../media/resources/cicd-planning/select-git-branch-connect.png":::

1. Select **Connect and Sync**.
1. Fabric displays the branch, sync status for each item, and the time of the last sync.

    :::image type="content" source="../media/resources/cicd-planning/git-status-branch-commit.png" alt-text="Screenshot of a Fabric workspace showing the connected Git branch, sync status for each item, and last sync time." lightbox="../media/resources/cicd-planning/git-status-branch-commit.png":::

## Commit changes to the Git repository

When you make changes to an existing plan, delete a plan, or create a new plan, you must commit those changes to the Git repository linked to the workspace. The status of modified items changes to *Uncommitted*.

1. Select the **Source control** option.

    :::image type="content" source="../media/resources/cicd-planning/source-control.png" alt-text="Screenshot of source control highlighted." lightbox="../media/resources/cicd-planning/source-control.png":::

1. Select the **Changes** tab from the **Source control** side pane. This tab displays all the items you changed, with an icon indicating the status: **New**, **Modified**, **Conflict**, or **Deleted**.

1. Select the items to commit to the Git repository and add an optional commit message. Select **Commit**.

    :::image type="content" source="../media/resources/cicd-planning/commit-selected-plans-github.png" alt-text="Screenshot of selecting changed plans in the Changes tab and selecting Commit to push them to the GitHub repository." lightbox="../media/resources/cicd-planning/commit-selected-plans-github.png":::

1. After the selected items are committed to the Git repository, Fabric removes them from the list. The item status changes to *Synced,* and the status bar displays the latest commit.

    :::image type="content" source="../media/resources/cicd-planning/committed-items-status-change-workspace.png" alt-text="Screenshot of status changing to synced for committed items in the workspace." lightbox="../media/resources/cicd-planning/committed-items-status-change-workspace.png":::

## Deploy planning items to other workspaces

Create a deployment pipeline to promote plan items from development to test and production workspaces. To learn more about deployment pipelines in Fabric, see [Introduction to deployment pipelines](/fabric/cicd/deployment-pipelines/intro-to-deployment-pipelines?tabs=new-ui).

Fabric's lineage view helps you track item dependencies. When the plan and semantic model reside in the same workspace and deployment pipeline, deploy the semantic model to the target workspace at least once, either before or together with the plan. This step establishes the connection to the semantic model in the target workspace. For semantic models in other workspaces, follow the stand-alone or separate-pipeline scenarios in the next section.

:::image type="content" source="../media/resources/cicd-planning/source-workspace-plan-item-lineage.png" alt-text="Screenshot of lineage view showing the plan connected to the semantic model in the source workspace." lightbox="../media/resources/cicd-planning/source-workspace-plan-item-lineage.png":::

The following steps describe how to deploy a plan when the plan and semantic model reside in the same workspace and are part of the same deployment pipeline.

1. Commit your plan and semantic model to the Azure DevOps or GitHub repository connected to the workspace.
1. Create a new deployment pipeline, define the pipeline stages, and assign the designated workspaces to each stage.
1. Select the target stage, such as Test or Production, to deploy your planning item. **Deploy from** is automatically set to the previous stage in the pipeline (For example, Development when deploying to Test). Select the plan, the Fabric SQL app DB, and the related semantic model to deploy to the next stage.

    > [!NOTE]
    > * The __fabric_plan_sys SQL database stores metadata for data inputs, comments, writeback destinations, user access, and more. Deploy it once during your first deployment. It doesn't need to be redeployed in subsequent updates.
    > * To deploy your plan, the semantic model used in the plan must already exist in the target stage or be selected for deployment along with the planning item.

    :::image type="content" source="../media/resources/cicd-planning/select-plan-database-model-deploy.png" alt-text="Screenshot of selecting the plan, semantic model, and database for deployment." lightbox="../media/resources/cicd-planning/select-plan-database-model-deploy.png":::

1. Select **Deploy** and verify the source and target stages and the items selected for deployment. Verify that the deployment is successful from the **Deployment history** pane.

    :::image type="content" source="../media/resources/cicd-planning/deployment-pipeline-verify-source-target-stages-items.png" alt-text="Screenshot of verifying the source and target stages and selected items before deploying the plan." lightbox="../media/resources/cicd-planning/deployment-pipeline-verify-source-target-stages-items.png":::

1. Open the target workspace and refresh the semantic model.

    :::image type="content" source="../media/resources/cicd-planning/refresh-semantic-model-target-workspace.png" alt-text="Screenshot of refreshing the semantic model in the target workspace." lightbox="../media/resources/cicd-planning/refresh-semantic-model-target-workspace.png":::

1. Open the plan in the target workspace. Fabric automatically retains the semantic model connection and loads the data.

    :::image type="content" source="../media/resources/cicd-planning/plan-semantic-model-connection-data-loaded.png" alt-text="Screenshot of plan connecting to semantic model from the target workspace." lightbox="../media/resources/cicd-planning/plan-semantic-model-connection-data-loaded.png":::

## Deploy planning items with stand-alone semantic models

If your semantic model resides in a separate workspace outside any deployment pipeline, you only need to deploy the plan from your source workspace to the target workspace. Fabric automatically preserves the connection to the stand-alone semantic model in the target workspace.

:::image type="content" source="../media/resources/cicd-planning/item-lineage-stand-alone-semantic-model.png" alt-text="Screenshot of plan item lineage showing its connection to a semantic model in a separate stand-alone workspace." lightbox="../media/resources/cicd-planning/item-lineage-stand-alone-semantic-model.png":::

1. Commit your plan to the Azure DevOps or GitHub repository connected to the workspace.
1. Open the deployment pipeline connected to the workspace. Select the plan and deploy it to the target workspace.

    :::image type="content" source="../media/resources/cicd-planning/standalone-deploy-plan.png" alt-text="Screenshot of deploying the plan item to the target workspace." lightbox="../media/resources/cicd-planning/standalone-deploy-plan.png":::

1. Once you deploy the plan to the target workspace, Fabric automatically connects it to the semantic model in the stand-alone workspace and loads the data.

    :::image type="content" source="../media/resources/cicd-planning/standalone-plan-connected-semantic-model.png" alt-text="Screenshot of the deployed plan connected to the semantic model in the stand-alone workspace." lightbox="../media/resources/cicd-planning/standalone-plan-connected-semantic-model.png":::

## Deploy planning items by using models from a different deployment pipeline

If your semantic model and plan are part of different pipelines, deploy them individually. For automatic binding, both pipelines must have the same number of stages, and the source plan and semantic model must occupy stages at the same numeric position; matching stage names alone isn't sufficient. First deploy the semantic model to the corresponding target stage in its own deployment pipeline, then deploy the plan. For more information, see [Autobinding across workspaces](../../../cicd/deployment-pipelines/understand-the-deployment-process.md#autobinding-across-workspaces).

To demonstrate this scenario, consider a planning item named *Plan_2* created in the *Plan Docs* workspace.

* *Plan_2* connects to the *Enterprise - Sales Transactions* semantic model in the *Org Semantic Models* workspace.
* *Plan_2* is part of the *DP_Fabric_Planning* deployment pipeline.
* The *Org Semantic Models* workspace is part of a different deployment pipeline - *semantic_model_pipeline*.

:::image type="content" source="../media/resources/cicd-planning/plan-semantic-model-different-workspaces-pipelines.png" alt-text="Screenshot of plan and semantic models in different workspaces." lightbox="../media/resources/cicd-planning/plan-semantic-model-different-workspaces-pipelines.png":::

1. Commit the semantic model and plan to the Git repository connected to their respective workspaces.
1. As the semantic model is in a different workspace and pipeline, use its own deployment pipeline to deploy it to the target stage.

    :::image type="content" source="../media/resources/cicd-planning/semantic-model-pipeline-deploy-target-stage.png" alt-text="Screenshot of deploying the semantic model to the target stage using its own deployment pipeline." lightbox="../media/resources/cicd-planning/semantic-model-pipeline-deploy-target-stage.png":::

1. After the semantic model is successfully deployed, open the target workspace and refresh the semantic model.

    :::image type="content" source="../media/resources/cicd-planning/semantic-model-refresh-target-workspace.png" alt-text="Screenshot of refreshing the semantic model after deploying to the target environment." lightbox="../media/resources/cicd-planning/semantic-model-refresh-target-workspace.png":::

1. Promote the plan to the next stage by using its dedicated deployment pipeline.

    :::image type="content" source="../media/resources/cicd-planning/semantic-model-different-pipeline-promote-plan.png" alt-text="Screenshot of deploying the plan using the DP_Fabric_Planning pipeline." lightbox="../media/resources/cicd-planning/semantic-model-different-pipeline-promote-plan.png":::

1. Open the plan in the target workspace. Although the semantic model is in a different workspace, the plan seamlessly connects to the semantic model and loads data.

    :::image type="content" source="../media/resources/cicd-planning/semantic-model-diff-pipeline-target-workspace-plan.png" alt-text="Screenshot of a plan in the target workspace connecting to and loading data from a semantic model in a different workspace." lightbox="../media/resources/cicd-planning/semantic-model-diff-pipeline-target-workspace-plan.png":::

## Use variable libraries to connect to semantic models

Create variables to dynamically assign the semantic model the plan uses across different environments. To learn more about variable libraries, see [Variable library overview](/fabric/cicd/variable-library/variable-library-overview).

For demonstration purposes, consider a deployment pipeline with three stages. In the dev and test stages, the plan connects to the same semantic model. In the prod workspace, the plan connects to another semantic model.

:::image type="content" source="../media/resources/cicd-planning/deployment-pipeline-stages.png" alt-text="Screenshot of a deployment pipeline with Development, Test, and Production stages." lightbox="../media/resources/cicd-planning/deployment-pipeline-stages.png":::

1. Create a variable library in the workspace assigned to the first stage of the deployment pipeline. In this example, the *Plan Docs* workspace.
1. Add a new variable and set the type to **Item reference**. Select the semantic model from the development (first pipeline stage) workspace as the **Default value set.**

    :::image type="content" source="../media/resources/cicd-planning/create-variable-dev-semantic-model.png" alt-text="Screenshot of creating an item reference variable for the semantic model." lightbox="../media/resources/cicd-planning/create-variable-dev-semantic-model.png":::

1. Select **Add value set**, then select the semantic model for the target stage (for example, UAT or production). In this example, you assign the *Enterprise - Txn - PROD* semantic model to the production environment. Repeat this step to configure different semantic models for additional stages as needed.

    :::image type="content" source="../media/resources/cicd-planning/variable-library-alternate-value-set-production.png" alt-text="Screenshot of configuring an alternate value set to hold the semantic model for production." lightbox="../media/resources/cicd-planning/variable-library-alternate-value-set-production.png":::

1. Create a new plan item and select the **Variable Library** option when you connect to the semantic model. Select the variable you configured in steps 2 and 3.

    :::image type="content" source="../media/resources/cicd-planning/select-variable-option-semantic-model.png" alt-text="Screenshot of selecting the variable option to connect to a semantic model." lightbox="../media/resources/cicd-planning/select-variable-option-semantic-model.png":::

1. Commit the variable library and plan item to the configured Git repository.
1. Deploy the variable library to the next stage (test) in the pipeline.
1. In this example, you use the same semantic model in the test stage, so you don't need to update the variable library after migrating to test - it uses the same active set as development. Deploy the plan item after the variable library is successfully deployed.
1. Deploy the variable library to the target stage (for example, production). If that stage requires a different semantic model, open the variable library in the target workspace (for example, *Plan Docs [PROD]*), set the target value set that contains the required values as active, and save your changes. In this example, you set the *PROD* value set to active.

    :::image type="content" source="../media/resources/cicd-planning/variable-library-set-prod-value-set-active.png" alt-text="Screenshot of setting the alternate value set for PROD as the active set." lightbox="../media/resources/cicd-planning/variable-library-set-prod-value-set-active.png":::

1. Migrate the plan to the target environment.
1. Open the plan in the target (*Plan Docs [PROD]*) workspace. It automatically connects to the semantic model designated as the active set in the variable library.

    :::image type="content" source="../media/resources/cicd-planning/plan-target-workspace-semantic-model.png" alt-text="Screenshot of the plan in the production workspace automatically connecting to the semantic model set active in the variable library." lightbox="../media/resources/cicd-planning/plan-target-workspace-semantic-model.png":::

## Migrate writeback destinations

To migrate the Fabric SQL writeback destination database, see [SQL database source control integration in Microsoft Fabric](/fabric/database/sql/source-control).

The deployment preserves the writeback destination configuration, but the generated target table name initially appears as a system-generated ID. You can manually rename the table and execute writeback.

:::image type="content" source="../media/resources/cicd-planning/writeback-deployment-table-id.png" alt-text="Screenshot of the writeback destination showing a system-generated ID as the target table name after deployment." lightbox="../media/resources/cicd-planning/writeback-deployment-table-id.png":::

* **Writeback logs**: Execution logs from the source workspace don't transfer to the target workspace. Any writeback activity in the target workspace logs as a new, independent event.
* **Auto-Writeback and baselining**: If Auto-Writeback is enabled, the initial writeback attempt in the target workspace fails when you update cell values. This failure occurs because baseline data isn't established. To resolve this problem, perform a manual writeback in the target workspace first. Subsequent Auto-Writeback operations function normally.

## Use variables for writeback destinations and connections

Using variables for writeback connections and SQL destinations simplifies environment management across CI/CD stages like Dev, Test, and Prod. Instead of manually reconfiguring database settings in each workspace after deployment, variables dynamically route data to the correct database based on the active set in the variable library.

1. In the variable library, create two variables:

    * An **Item Reference** variable to store the writeback destination database.
    * A **Connection Reference** variable to store the database connection.

    :::image type="content" source="../media/resources/cicd-planning/writeback-cicd-variable-library.png" alt-text="Screenshot of creating an item variable and connection reference for writeback." lightbox="../media/resources/cicd-planning/writeback-cicd-variable-library.png":::

1. For each target stage, configure a value set with the writeback database item reference and connection reference for that environment.

1. Open your planning or sheet or matrix visual in an intelligence sheet and configure the writeback destination. In the connection dropdown, select **Use Variable** and select the connection reference variable created in the variable library.

    :::image type="content" source="../media/resources/cicd-planning/writeback-cicd-select-connection-variable.png" alt-text="Screenshot of selecting Use Variable and the connection reference variable in the writeback destination connection dropdown." lightbox="../media/resources/cicd-planning/writeback-cicd-select-connection-variable.png":::

1. Set **Select Database From** to **Variable Library**, then select the database item reference variable created in the variable library.

    :::image type="content" source="../media/resources/cicd-planning/writeback-cicd-select-database-variable.png" alt-text="Screenshot of selecting the item reference variable that holds the writeback database name." lightbox="../media/resources/cicd-planning/writeback-cicd-select-database-variable.png":::

1. Deploy the variable library to the target stage. In the target workspace, select the required value set as active and save the library.
   
 1. Deploy the plan to the target stage. Before executing writeback, verify that the active value set references the intended target database and connection. When you deploy the plan to other stages in the deployment pipeline, the writeback configuration automatically fetches from the active set for that stage in the variable library.

## Related content

* Get started with [CI/CD in Fabric](/fabric/cicd/cicd-overview).

* Create [variable libraries](/fabric/cicd/variable-library/variable-library-overview).

* Introduction to [writeback in planning](/fabric/iq/plan/planning-writeback/planning-how-to-persist-data).
