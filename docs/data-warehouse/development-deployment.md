---
title: Development and Deployment Overview
description: Learn about development and deployment workflows available to developers working with Fabric Data Warehouse.
ms.reviewer: pvenkat, randolphwest
ms.date: 07/30/2026
ms.topic: concept-article
---
# Development and deployment overview

**Applies to**: [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

This article provides a high-level overview of the development and deployment workflows available to developers working with Fabric Data Warehouse. Whether you're building in the Fabric web editor, working locally in an integrated development environment (IDE), deploying through Fabric's native deployment pipelines, or integrating with CI/CD pipelines in Azure DevOps Services or GitHub, this article can help you understand your options.

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

:::image type="content" source="media/development-deployment/development-deployment.svg" alt-text="Diagram of deployment landscape for Fabric Data Warehouse." lightbox="media/development-deployment/development-deployment.png":::

Fabric Data Warehouse offers flexible development and deployment options tailored to different developer preferences:

| Mode | Tools and features |
| --- | --- |
| [Fabric web (no Git)](#development-in-the-fabric-portal) | Live development, no version control |
| [Fabric web (with Git)](#development-in-the-fabric-portal) | Live development, version control, and continuous integration with workspace branching |
| [IDE / local development](#ide-based-development-client-tools) | Visual Studio Code with DacFx for schema management and scripting, SSMS for interactive development |
| [Fabric deployment pipelines](#fabric-deployment-pipelines) | Automated deployment, deployment tracking, stage promotion |
| [External CI/CD](#cicd-with-azure-devops-or-github) | Azure DevOps, GitHub, REST APIs for automation |

## Development in the Fabric portal

The Fabric portal offers a rich, integrated experience for developing warehouses directly in the browser. Developers can choose between two modes:

- **Without Git integration**

   - Changes you make in the warehouse are live and immediately reflected, but not version controlled, so the system doesn't track changes.
   - This mode is appropriate for individual development scenarios without collaboration with a team, version history, or pre-production development environments.
    
- **With Git integration**

   - Connect your workspace to a Git repository (Azure DevOps Services or GitHub).
        - Enables version control, branching, and collaboration.
   - Key capabilities:
      - Commit workspace changes to Git.
      - Sync updates from Git into the workspace.
      - Revert to previous commits.
      - Branch out to feature workspaces for isolated development.
   - Git integration is workspace-level and supports bi-directional sync.
   - Developers can automate Git workflows by using Fabric REST APIs, including commit, sync, and branch operations.
    
For more information on the Git integration process, see:
    
- [What is Microsoft Fabric Git integration?](../cicd/git-integration/intro-to-git-integration.md)
- [Basic concepts in Git integration](../cicd/git-integration/git-integration-process.md)
    
## IDE-based development (client tools)

You can develop Fabric Data Warehouse solutions by using client tools such as:

- [Visual Studio Code](https://code.visualstudio.com/)
- [SQL Server Management Studio](https://aka.ms/ssms)

**Visual Studio Code** supports modern database development for Fabric Data Warehouse through database project-based workflows, version control integration, schema comparison, and continuous integration. By using the [MSSQL extension for VS Code](/sql/tools/visual-studio-code-extensions/mssql/mssql-extension-visual-studio-code?view=fabric&preserve-view=true), developers can create SDK-style database projects that streamline development and automation. It offers a lightweight yet powerful environment tailored for iterative and DevOps-friendly workflows.  

Database projects in [SQL Database Projects extension for Visual Studio Code](/sql/tools/visual-studio-code-extensions/sql-database-projects/sql-database-projects-extension?view=fabric&preserve-view=true) use the [DacFx (Data-Tier Application Framework) package](/sql/tools/sqlpackage/sqlpackage)  to build and publish database projects, compare schemas, script changes, and extract or deploy `.dacpac` files. For more information, see [Data-tier applications (DAC) overview](/sql/tools/sql-database-projects/concepts/data-tier-applications/overview).

To get started developing a warehouse project in the SQL Database Projects extension for Visual Studio Code, see [Develop warehouse projects in Visual Studio Code](develop-warehouse-project.md).

**SQL Server Management Studio (SSMS)** also supports development on Fabric Data Warehouse. SSMS provides a robust, full-featured environment that is familiar to database administrators and developers. SSMS enables advanced querying, performance tuning, security management, and object exploration. It's especially well-suited for tasks such as monitoring query plans, executing complex scripts, and managing security roles within the warehouse. SSMS is an essential tool for both development and administrative workflows.

## Deployment workflows

To deploy to a warehouse, use [Fabric deployment pipelines](../cicd/deployment-pipelines/intro-to-deployment-pipelines.md) or [Fabric's built-in continuous integration/continuous development (CI/CD)](../cicd/cicd-overview.md).

### Fabric deployment pipelines

- Fabric deployment pipelines support workspace branching and promotion across environments (for example, dev → test → prod).
- You can map Git-connected workspaces to branches, which enables structured CI/CD.
- You can trigger pipelines manually or through automation by using Fabric APIs.
- To get started, see [Get started with deployment pipelines](../cicd/deployment-pipelines/get-started-with-deployment-pipelines.md).

### CI/CD with Azure DevOps or GitHub

- Developers can use external CI/CD systems to automate build and deployment.
- Supported via DacFx tasks, SQLPackage CLI, and REST APIs.
- [Git integration for Fabric Data Warehouse](git-integration.md) enables seamless collaboration and versioning across teams.
- To get started, see [Get started with Git integration](../cicd/git-integration/git-get-started.md).

## Next step

> [!div class="nextstepaction"]
> [Develop warehouse projects in Visual Studio Code](develop-warehouse-project.md)

## Related content 

- [How to use Git integration for warehouse development and deployment](how-to-git-integration.md)