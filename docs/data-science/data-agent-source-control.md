---
title: "Source Control, CI/CD, and ALM for Fabric Data Agent (Preview)"
description: "Learn how to use source control, CI/CD, and ALM with Microsoft Fabric data agent."
ms.author: amjafari
author: amjafari
ms.reviewer: amjafari
reviewer: amjafari
ms.topic: concept-article
ms.date: 08/8/2025
---

# Source Control, CI/CD, and ALM for Fabric data agent (preview)

This article describes how to manage Fabric data agents using Git integration and deployment pipelines as part of Microsoft Fabric’s Application Lifecycle Management (ALM) capabilities. You learn how to connect a workspace to a Git repository. You’ll also learn how to track and version data agent configurations. Finally, you’ll learn how to promote updates across development, test, and production environments. Git integration and deployment pipelines enable continuous integration and continuous deployment (CI/CD) of data agent changes, allowing updates to be tested and promoted automatically as part of your ALM workflow. Source control for Fabric data agents is currently in preview.

You can use two complementary approaches to support ALM for Fabric data agents:

- Git integration: Sync an entire workspace with a Git repository (either Azure DevOps or GitHub as a Git provider) to enable version control, collaboration through branches, and history tracking for individual items including Fabric data agents.
- Deployment pipelines: Promote content between separate workspaces representing development, test, and production stages using built‑in pipelines.

These capabilities together provide end-to-end ALM support for Fabric data agents.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

[!INCLUDE [data-agent-prerequisites](./includes/data-agent-prerequisites.md)]

## Git integration

Microsoft Fabric Git integration synchronizes a Fabric workspace with a Git repository, allowing you to use your existing development processes, tools, and best practices directly in the Fabric platform. It supports Azure DevOps and GitHub and is available at the workspace level. When you commit changes from Fabric, including updates to the data agent configuration, those changes are saved as files in the connected Git repository. Its key capabilities include:

- Full backup and version control of workspace items
- The folder structure in Git mirrors the workspace structure
- Data agent configurations (schema selection, AI instructions, data source instructions, example queries) are stored in structured files in dedicated folders
- Ability to view differences, review history, and revert to prior states via history for different workspace items including data agents
- Branch-based collaboration (feature branches, main)

For more information on the Git integration process, you can refer to the following resources.

- [What is Microsoft Fabric Git integration?](../cicd/git-integration/intro-to-git-integration.md?tabs=azure-devops)
- [Basic concepts in Git integration](../cicd/git-integration/git-integration-process.md?tabs=Azure%2Cazure-devops)
- [Get started with Git integration](../cicd/git-integration/git-get-started.md?tabs=azure-devops%2CAzure%2Ccommit-to-git)

### Set up a connection to source control

You can connect your Fabric workspace to a Git repository from the **Workspace settings** page. This connection lets you commit and sync changes directly from Fabric.

1. See [Get started with Git integration](../cicd/git-integration/git-get-started.md?tabs=azure-devops%2CAzure%2Ccommit-to-git) for detailed steps to connect to a Git repository in Azure DevOps or GitHub.

2. After connecting to the Git repository, your workspace items, including Fabric data agents, appear in the Source control panel. In the status bar at the bottom left, you can see the name of the connected branch, the time of the last sync, and the Git commit ID.

:::image type="content" source="./media/data-agent-cicd/data-agent-git-source-control.png" alt-text="Screenshot showing the source control in general." lightbox="./media/data-agent-cicd/data-agent-git-source-control.png":::

3. The linked Git repository displays a folder structure representing your workspace items including Fabric data agents and their configuration files. Each data agent is stored in its own folder, enabling you to review changes, track version history, and use Git workflows such as creating pull requests to merge updates into your main branch.

:::image type="content" source="./media/data-agent-cicd/git-repo.png" alt-text="Screenshot showing the git repository." lightbox="./media/data-agent-cicd/git-repo.png":::

4. When you make modifications to the Fabric data agent in a Git-connected workspace, the changes are detected and the data agent’s status in the Source control pane changes to Uncommitted changes. These modifications can include:

    - Changing the schema selection.
    - Updating AI instructions or data source instructions.
    - Editing example queries.
    - Publishing the data agent or updating its publishing description.

Any change—whether functional or descriptive—causes the data agent to become out of sync with the linked Git repository. The workspace items with changes will appear under the Changes tab in the Source control pane. You can review these changes, compare them to the committed version, and commit them back to the Git repository to synchronize.

:::image type="content" source="./media/data-agent-cicd/source-control-data-agent.png" alt-text="Screenshot showing the data agent in the source control." lightbox="./media/data-agent-cicd/source-control-data-agent.png":::

5. When updates are made directly in the linked Git repository (Azure DevOps or GitHub), they can include actions such as modifying AI instructions, changing example queries, or editing publishing descriptions. You can then commit and push those changes to the repository. Once the updates are pushed and available in the repository, your Fabric workspace detects them and displays an Updates available notification in the Source control pane. The updated items such as data agent appear under the Updates tab, where you can review and accept them. Accepting these updates applies the repository changes to your workspace items, ensuring the workspace reflects the latest committed version in Git.

:::image type="content" source="./media/data-agent-cicd/source-control-updates.png" alt-text="Screenshot showing the updates from Git in the source control." lightbox="./media/data-agent-cicd/source-control-updates.png":::

### Folder and file structure in the Git repository

In the following, you review the structure of how a data agent’s configuration is stored in a Git repository. Understanding this structure is important for managing changes and following best practices.

#### Root structure

At the root, the data agent content is stored under the **files** folder. Inside **files**, you find a **config** folder, which contains **data_agent.json**, **publish_info.json**, **draft folder**, and **published folder**.

:::image type="content" source="./media/data-agent-cicd/git-branch-files.png" alt-text="Screenshot showing the root folder for data agent in git repo." lightbox="./media/data-agent-cicd/git-branch-files.png":::

:::image type="content" source="./media/data-agent-cicd/git-branch-config.png" alt-text="Screenshot showing the config for data agent." lightbox="./media/data-agent-cicd/git-branch-config.png":::

:::image type="content" source="./media/data-agent-cicd/git-branch-config-all.png" alt-text="Screenshot showing all the config for data agent." lightbox="./media/data-agent-cicd/git-branch-config-all.png":::

Inside the **config** folder, the **publish_info.json** contains the publishing description for the data agent. This file can be updated to change the description that appears when the data agent is published.

:::image type="content" source="./media/data-agent-cicd/git-config-publish-info.png" alt-text="Screenshot showing the publish file in git." lightbox="./media/data-agent-cicd/git-config-publish-info.png":::

The **draft folder** contains the configuration files corresponding to the draft version of the data agent and the **published folder** contains the configuration files for the published version of the data agent. The **draft folder** contains:

- **Data source folders** where there's one folder for each data source used by the data agent.
  - **Lakehouse or warehouse data sources**: Folder names start with `lakehouse-tables-` or `warehouse-tables-`, followed by the name of the lakehouse or warehouse.
  - **Semantic model data sources**: Folder names start with `semantic-model-`, followed by the name of the semantic model.
  - **KQL database data sources**: Folder names start with `kusto-`, followed by the name of KQL database.
  - **Ontology data sources**: Folder names start with `ontology-`, followed by the name of the ontology.

:::image type="content" source="./media/data-agent-cicd/git-config-draft.png" alt-text="Screenshot showing the draft folder." lightbox="./media/data-agent-cicd/git-config-draft.png":::

- **stage_config.json** that contains `aiInstructions`, which refers to the agent instructions.

:::image type="content" source="./media/data-agent-cicd/git-config-ai-instructions.png" alt-text="Screenshot showing the ai instructions." lightbox="./media/data-agent-cicd/git-config-ai-instructions.png":::

Each data source folder contains **datasource.json** and **fewshots.json**. However, if the data source is a semantic model, it doesn't support example queries, so its folder only contains **datasource.json**.

:::image type="content" source="./media/data-agent-cicd/git-config-draft-lakehouse.png" alt-text="Screenshot showing the lakehouse data source folder." lightbox="./media/data-agent-cicd/git-config-draft-lakehouse.png":::

The **datasource.json** defines the configuration for that data source, including:

- `dataSourceInstructions`, which represents the instructions provided for that data source.
- `displayName`, which shows the name of the data source.
- `elements`, which refers to the schema map and includes a complete list of tables and columns from the data source.
  - Each table has an `is_selected` property. If `true`, the table is included and if `false`, it means the table isn't selected and won't be used by the data agent.
  - Column entries also show `is_selected`, but column-level selection isn’t currently supported. If a table is selected, all of its columns are included regardless of the column `is_selected` value. If a table isn't selected (`is_selected`: `false` at the table level), none of the columns are considered despite that `is_selected` is set to `true` at the column level.
- Type conventions:

  - If the type is a data source, it's simply the data source type (for example: `"type": "lakehouse_tables"`).
  - If the type is a table, it ends with `.table` (for example: `"type": "lakehouse_tables.table"`).
  - If the type is a column, it ends with `.column` (for example: `"type": "lakehouse_tables.column"`).

:::image type="content" source="./media/data-agent-cicd/git-config-draft-lakehouse-config.png" alt-text="Screenshot showing the lakehouse config." lightbox="./media/data-agent-cicd/git-config-draft-lakehouse-config.png":::

The **fewshots.json** stores example queries for the data source. Each entry includes:
  - `id` as the unique identifier for the example query.
  - `question`, which refers t the natural language question.
  - `query` shows the query text, which may be SQL or KQL depending on the data source type.

:::image type="content" source="./media/data-agent-cicd/git-configure-lakehouse-few-shots.png" alt-text="Screenshot showing the few shots." lightbox="./media/data-agent-cicd/git-configure-lakehouse-few-shots.png":::

The **published folder** mirrors the structure of the draft folder, but represents the published version of the data agent. It's best practice to not modify files in the published folder directly. Changes should be made in the draft folder. Once the data agent is published, those changes are reflected in the published folder. This ensures that the published version is always generated from a controlled draft state.

:::image type="content" source="./media/data-agent-cicd/git-config-published.png" alt-text="Screenshot showing the published folder." lightbox="./media/data-agent-cicd/git-config-published.png":::

### Deployment pipelines for data agents

Deployment pipelines provide a controlled way to move data agents between workspaces mapped to different lifecycle stages. For example:

1. Develop a new data agent or update an existing one in the development workspace.
2. Promote the changes to the test workspace for validation.
3. Promote the tested changes to the production workspace where it is available to end users.

:::image type="content" source="./media/data-agent-cicd/select-deployment-pipeline.png" alt-text="Screenshot showing the deployment pipeline setup." lightbox="./media/data-agent-cicd/select-deployment-pipeline.png":::

Before deploying, you need to assign a workspace to each stage in the deployment pipeline: development, test, and production. If you don’t assign a workspace to the test or production stage, the workspaces are automatically created. The automatically created workspaces are named after the development workspace, with [test] or [prod] appended.

:::image type="content" source="./media/data-agent-cicd/test-workspace.png" alt-text="Screenshot showing the dev to test." lightbox="./media/data-agent-cicd/test-workspace.png":::

To deploy changes:
- In the pipeline, go to the stage you want to deploy from (for example, development).
- Select the items in the workspace that you want to deploy.
- Select Deploy to promote them to the next stage.

:::image type="content" source="./media/data-agent-cicd/deployment-test.png" alt-text="Screenshot showing the deployment from dev to test was successful." lightbox="./media/data-agent-cicd/deployment-test.png":::

You can review a deployment plan before applying changes, ensuring that only intended updates are promoted. For more information, see [Get started with deployment pipelines](../cicd/deployment-pipelines/get-started-with-deployment-pipelines.md?tabs=from-fabric%2Cnew-ui).

> [!NOTE]
> Service principals are supported in the Fabric data agent **only** as part of ALM scenarios. This support is limited to enabling ALM operations (such as Git integration and deployment pipelines) and doesn't extend to other Fabric data agent features. If you need to interact with a data agent outside of ALM workflows, service principal isn't supported.

### Publish a Fabric data agent for the deployment pipelines

Publishing a Fabric data agent makes it available for use across all different consumption channels, including Copilot for Power BI, Microsoft Copilot Studio, and Azure AI Foundry Services. To assess and consume the data agent across these channels, the data agent must be published; unpublished data agents are not accessible for consumption even if they are in production workspace. In order to follow the best practices in accordance with deployment pipeline, note that: 

- Publishing from a development workspace should be limited to authorized users only who are working on data agent development and want to assess its performance across different consumption channels. Access to this workspace must be restricted so that unfinished or experimental data agents aren't exposed to broader audiences.
- End users should access data agents that are published from the production workspace only, ensuring they interact with stable, approved versions of the data agent.

This approach supports both the functional requirement of enabling consumption and performance evaluation, and it ensures proper access control by keeping development and production environments separate.

### Best practices

- Use a dedicated branch for development work on data agents, and merge to main after code review. 
- Keep related resources (data sources, data agents, notebooks, pipelines) in the same workspace for easier promotion.
- Test data agent changes in the test workspace before promoting to production.
- Use descriptive commit messages to make history easier to understand.
- Don't directly make changes to the published folder in the Git repository.

### Limitations and considerations

- Only workspaces connected to a Git repository can use Git-based ALM features.
- Service principals are supported in the Fabric data agent only as part of ALM scenarios. If you need to interact with a data agent outside of ALM workflows, service principal isn't supported.
- Deployment pipelines require that the source and target workspaces are in the same tenant.
- Large numbers of frequent commits can impact repository size and performance.

## Related content

- [Get started with Git integration](../cicd/git-integration/git-get-started.md?tabs=azure-devops%2CAzure%2Ccommit-to-git)
- [Basic concepts in Git integration](../cicd/git-integration/git-integration-process.md?tabs=Azure%2Cazure-devops)
- [What is lifecycle management in Microsoft Fabric?](../cicd/cicd-overview.md)
