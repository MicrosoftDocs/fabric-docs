---
title: "Source Control, CI/CD, and ALM for Fabric Data Agent (preview)"
description: "Learn how to use source control, CI/CD and ALM with Microsoft Fabric data agent."
ms.author: amjafari
author: amjafari
ms.reviewer: amjafari
reviewer: amjafari
ms.topic: conceptual
ms.date: 08/8/2025
---

# Source Control, CI/CD, and ALM for Fabric Data Agent (preview)

This article describes how to manage Fabric data agents using Git integration and deployment pipelines as part of Microsoft Fabric’s Application Lifecycle Management (ALM) capabilities. You’ll learn how to connect a workspace to a Git repository, track and version data agent configurations, and promote updates across development, test, and production environments. Git integration and deployment pipelines enable continuous integration and continuous deployment (CI/CD) of data agent changes, allowing updates to be tested and promoted automatically as part of your ALM workflow. Source control for Fabric data agents is currently in preview.

You can use two complementary approaches to support ALM for Fabric data agents:

- [Git integration](#git-integration): Sync an entire workspace with a Git repository (either Azure DevOps or GitHub as a Git provider) to enable version control, collaboration through branches, and history tracking for individual items including Fabric data agents.
- [Deployment pipelines](#deployment-pipelines): Promote content between separate workspaces representing development, test, and production stages using built‑in pipelines.

These capabilities together provide end-to-end ALM support for Fabric data agents.

## Git integration

Microsoft Fabric Git integration synchronizes a Fabric workspace with a Git repository, allowing you to use your existing development processes, tools, and best practices directly in the Fabric platform. It supports Azure DevOps and GitHub and is available at the workspace level. When you commit changes from Fabric, including updates to the data agent configuration, those changes are saved as files in the connected Git repository. It's key capabilities include:

- Full backup and version control of workspace items
- The folder structure in Git mirrors the workspace structure
- Data agent configurations (schema selection, AI instructions, data source instructions, example queries) are stored in structured files in dedicated folders
- Ability to view differences, review history, and revert to prior states via history for different workspace items including data agents
- Branch-based collaboration (feature branches, main)

For more information on the Git integration process, you can refer to the following:

- [What is Microsoft Fabric Git integration?](https://learn.microsoft.com/en-us/fabric/cicd/git-integration/intro-to-git-integration?tabs=azure-devops)
- [Basic concepts in Git integration](https://learn.microsoft.com/en-us/fabric/cicd/git-integration/git-integration-process?tabs=Azure%2Cazure-devops)
- [Get started with Git integration](https://learn.microsoft.com/en-us/fabric/cicd/git-integration/git-get-started?tabs=azure-devops%2CAzure%2Ccommit-to-git)

### Set up a connection to source control

You can connect your Fabric workspace to a Git repository from the **Workspace settings** page. This lets you commit and sync changes directly from Fabric.

1. See [Get started with Git integration](ttps://learn.microsoft.com/en-us/fabric/cicd/git-integration/git-get-started?tabs=azure-devops%2CAzure%2Ccommit-to-git) for detailed steps to connect to a Git repository in Azure DevOps or GitHub.

2. After connecting to the Git repository, your workspace items, including Fabric data agents, appear in the Source control panel.

:::image type="content" source="./media/data-agent-cicd/source-control.png" alt-text="Screenshot showing the source control in general." lightbox="./media/data-agent-cicd/source-control.png":::

3. The linked Git repository displays a folder structure representing your workspace items including Fabric data agents and their configuration files. Each data agent is stored in its own folder, enabling you to review changes, track version history, and use Git workflows such as creating pull requests to merge updates into your main branch.

:::image type="content" source="./media/data-agent-cicd/git-repo.png" alt-text="Screenshot showing the git repository." lightbox="./media/data-agent-cicd/git-repo.png":::

4. When you make modifications to the Fabric data agent in a Git-connected workspace, the changes are detected and the data agent’s status in the Source control pane will change to Uncommitted changes. These modifications can include:

- Changing the schema selection.
- Updating AI instructions or data source instructions.
- Editing example queries.
- Publishing the data agent or updating its publishing description.

Any change—whether functional or descriptive—causes the data agent to become out of sync with the linked Git repository. The workspace items with changes will appear under the Changes tab in the Source control pane. You can review these changes, compare them to the committed version, and commit them back to the Git repository to synchronize.

:::image type="content" source="./media/data-agent-cicd/source-control-data-agent.png" alt-text="Screenshot showing the data agent in the source control." lightbox="./media/data-agent-cicd/source-control-data-agent.png":::

5. When updates are made directly in the linked Git repository (Azure DevOps or GitHub), for example, modifying AI instructions, changing example queries, or editing the publishing descriptions, those changes can be committed and pushed to the repository.

:::image type="content" source="./media/data-agent-cicd/git-commit.png" alt-text="Screenshot showing making changes in the Git repository." lightbox="./media/data-agent-cicd/git-commit.png":::

Once the updates are pushed and available in the repository, your Fabric workspace will detect them and display an Updates available notification in the Source control pane. The updated items such as data agent will appear under the Updates tab, where you can review and accept them. Accepting these updates applies the repository changes to your workspace items, ensuring the workspace reflects the latest committed version in Git.

:::image type="content" source="./media/data-agent-cicd/source-updates.png" alt-text="Screenshot showing the updates from Git in the source control." lightbox="./media/data-agent-cicd/source-control-updates.png":::

### Folder and file structure in the Git repository

In the following, you will review the structure of how a data agent’s configuration is stored in a Git repository. Understanding this structure is important for managing changes and following best practices.

#### Root structure

At the root, the data agent content is stored under the **files** folder. Inside **files**, you’ll find a **config** folder, which contains:

:::image type="content" source="./media/data-agent-cicd/git-branch-files.png" alt-text="Screenshot showing the root folder for data agent in git repo." lightbox="./media/data-agent-cicd/git-branch-files.png":::

:::image type="content" source="./media/data-agent-cicd/git-branch-config.png" alt-text="Screenshot showing the config for data agent." lightbox="./media/data-agent-cicd/git-branch-config.png":::

- **data_agent.json**: The main configuration file for the data agent.
- **publish_info.json**: Contains the publishing description for the data agent. This file can be updated to change the description that appears when the agent is published.

:::image type="content" source="./media/data-agent-cicd/git-config-publish-info.png" alt-text="Screenshot showing the publish file in git." lightbox="./media/data-agent-cicd/git-config-publish-infol.png":::

- **draft folder**: Contains the editable version of the data agent configuration.
- **published folder**: Contains the published version of the data agent configuration.

:::image type="content" source="./media/data-agent-cicd/git-branch-config-all.png" alt-text="Screenshot showing all the config for data agent." lightbox="./media/data-agent-cicd/git-branch-config-all.png":::

The draft folder contains:

- **Data source folders** where there is one folder for each data source used by the data agent.
- Lakehouse or warehouse data sources: Folder names start with lakehouse-tables- or warehouse-tables-, followed by the name of the lakehouse or warehouse.
- Semantic model data sources: Folder names start with semantic-model-, followed by the name of the semantic model.
- KQL database data sources: Folder names start with kusto-, followed by the name of KQL database.

:::image type="content" source="./media/data-agent-cicd/git-config-draft.png" alt-text="Screenshot showing the draft folder." lightbox="./media/data-agent-cicd/git-config-draft.png":::

- **stage_config.json** that contains `aiInstructions` which refers to the agent instructions.

:::image type="content" source="./media/data-agent-cicd/git-config-ai-instructions.png" alt-text="Screenshot showing the ai instructions." lightbox="./media/data-agent-cicd/git-config-ai-instructions.png":::

Each data source folder contains **datasource.json** and **fewshots.json**. However, if the data source is a semantic model, it does not support example queries, so so their folders only contain **datasource.json**.

:::image type="content" source="./media/data-agent-cicd/git-config-draft-lakehouse.png" alt-text="Screenshot showing the lakehouse data source folder." lightbox="./media/data-agent-cicd/git-config-draft-lakehouse.png":::

The **datasource.json** defines the configuration for that data source, including:

- dataSourceInstructions – Instructions provided for that data source.
- Schema map — A complete list of tables and columns from the data source.
  - Each table has an `is_selected` property. If `true`, the table is included and if `false`, it means the table is not selected and will not be used.
  - Column entries may also show `is_selected`, but column-level selection isn’t supported. If a table is selected, all of its columns are included regardless of the column `is_selected` value. If a table is not selected (`is_selected`: `false` at the table level), none of the columns are considered despite that `is_selected` is set to `true` at the column level.
- Type conventions:

  - If the type is a data source, it is simply the data source type (for example: "type": "lakehouse_tables").
  - If the type is a table, it ends with .table (for example: "type": "lakehouse_tables.table").
  - If the type is a column, it ends with .column (for example: "type": "lakehouse_tables.column").

:::image type="content" source="./media/data-agent-cicd/git-config-draft-lakehouse-config.png" alt-text="Screenshot showing the lakehouse config." lightbox="./media/data-agent-cicd/git-config-draft-lakehouse-config.png":::

The **fewshots.json** stores example queries for the data source. Each entry includes:
  - "id" – Unique identifier for the example query.
  - "question" – Natural language question.
  - "query" – The query text, which may be SQL or KQL depending on the data source type.

:::image type="content" source="./media/data-agent-cicd/git-config-lakehouse-fewshots.png" alt-text="Screenshot showing the few shots." lightbox="./media/data-agent-cicd/git-config-lakehouse-fewshots.png":::

The published folder mirrors the structure of the draft folder but represents the published version of the data agent. It is best practice to not modify files in the published folder directly. Changes should be made in the draft folder and then once data agent is published, those changes will be reflected in the published folder. This ensures that the published version is always generated from a controlled draft state.

:::image type="content" source="./media/data-agent-cicd/git-config-published.png" alt-text="Screenshot showing the published folder." lightbox="./media/data-agent-cicd/git-config-published.png":::

### Deployment pipelines for data agents

Deployment pipelines provide a controlled way to move data agents between workspaces mapped to different lifecycle stages. For example:

1. Develop a new data agent or update an existing one in the development workspace.
2. Promote the changes to the test workspace for validation.
3. Promote the tested changes to the production workspace where it will available to end users.

You can review a deployment plan before applying changes, ensuring that only intended updates are promoted. For more information, see [Get started with deployment pipelines](https://learn.microsoft.com/en-us/fabric/cicd/deployment-pipelines/get-started-with-deployment-pipelines?tabs=from-fabric%2Cnew-ui).

### Publishing a Fabric data agent for the deployment pipelines

Publishing a Fabric data agent makes it available for use across all different consumption channels, including Copilot for Power BI, Microsoft Copilot Studio, and Azure AI Foundry Services.

- To assess and consume the data agent across these channels, the data agent must be published; unpublished data agents are not accessible for consumption. In order to follow the best practices in accordance with deployment pipeline, note that: 

- Publishing from a development workspace should be limited to authorized users only who are working on data agent development and want to assess its performance across different consumption channels. Access to this workspace must be restricted so that unfinished or experimental data agents are not exposed to broader audiences.
- End users should access data agents that are published from the production workspace only, ensuring they interact with stable, approved versions of the data agent.

This approach supports both the functional requirement of enabling consumption and performance evaluation, and it ensures proper access control by keeping development and production environments separate.

### Best practices

- Use a dedicated branch for development work on data agents, and merge to main after code review. 
- Keep related resources (datasets, notebooks, pipelines) in the same workspace for easier promotion.
- Test data agent changes in the test workspace before promoting to production.
- Use descriptive commit messages to make history easier to understand.

### Limitations and considerations

- Only workspaces connected to a Git repository can use Git-based ALM features.
- Deployment pipelines require that the source and target workspaces are in the same tenant.
- Large numbers of frequent commits can impact repository size and performance.

## Related content

- [Get started with Git integration](../cicd/git-integration/git-get-started.md)
- [Basic concepts in Git integration](../cicd/git-integration/git-integration-process.md)
- [What is lifecycle management in Microsoft Fabric?](../cicd/cicd-overview.md)
- [Tutorial: Set up dbt for Fabric Data Warehouse](tutorial-setup-dbt.md)
