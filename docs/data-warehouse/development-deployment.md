---
title: Development and Deployment Workflows
description: Learn about development and deployment workflows available to developers working with Fabric Data Warehouse.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: pvenkat, randolphwest
ms.date: 11/05/2025
ms.topic: concept-article
---
# Development and deployment workflows

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

This article provides a high-level overview of the development and deployment workflows available to developers working with Fabric Data Warehouse, whether you're building in the Fabric web editor, working locally in an integrated development environment (IDE), deploying through Fabric's native deployment pipelines, or integrating with CI/CD pipelines in Azure DevOps Services or GitHub.

:::image type="content" source="media/development-deployment/development-deployment.svg" alt-text="Diagram of deployment landscape for Fabric Data Warehouse." lightbox="media/development-deployment/development-deployment.png":::

Fabric Data Warehouse offers flexible development and deployment options tailored to different developer preferences:

| Mode | Tools and features |
| --- | --- |
| [Fabric web (no Git)](#development-in-the-fabric-portal) | Live development, no version control |
| [Fabric web (with Git)](#development-in-the-fabric-portal) | Live development + version control + continuous integration with workspace branching |
| [IDE / local development](#ide-based-development-client-tools) | Visual Studio Code with DacFx for schema management and scripting, SSMS for interactive development |
| [Fabric deployment pipelines](#fabric-deployment-pipelines) | Automated deployment, Deployment tracking, Stage promotion |
| [External CI/CD](#cicd-with-azure-devops-or-github) | Azure DevOps, GitHub, REST APIs for automation |

## Development in the Fabric portal

The Fabric portal offers a rich, integrated experience for developing warehouses directly in the browser. Developers can choose between two modes:

- **Without Git integration**

    - Changes made in the warehouse are live and immediately reflected, but not version controlled, meaning changes aren't tracked automatically.
    - Ideal for scenarios for individual development.

- **With Git integration**

    - Connect your workspace to a Git repository (Azure DevOps Services or GitHub).
        - Enables version control, branching, and collaboration.
    - Key capabilities:
      - Commit workspace changes to Git.
      - Sync updates from Git into the workspace.
      - Revert to previous commits.
      - Branch out to feature workspaces for isolated development.
    - Git integration is workspace-level and supports bi-directional sync.
    - Developers can automate Git workflows using Fabric REST APIs, including commit, sync, and branch operations.
    
   To get started with source control in your warehouse, see [Source control with Warehouse](source-control.md).
    
## IDE-based development (client tools)

Fabric Data Warehouse development is also supported through client tools like:

- [Visual Studio Code](https://code.visualstudio.com/)
- [SQL Server Management Studio](https://aka.ms/ssms)

**Visual Studio Code** supports modern database development for Fabric Data Warehouse through database project-based workflows, version control integration, schema comparison, and continuous integration. With the [MSSQL extension for VS Code](/sql/tools/visual-studio-code-extensions/mssql/mssql-extension-visual-studio-code?view=fabric&preserve-view=true), developers can create SDK-style database projects that streamline development and automation, offering a lightweight yet powerful environment tailored for iterative and DevOps-friendly workflows. 

Database projects in [SQL Database Projects extension for Visual Studio Code](/sql/tools/visual-studio-code-extensions/sql-database-projects/sql-database-projects-extension?view=fabric&preserve-view=true) use the [DacFx (Data-Tier Application Framework) package](/sql/tools/sqlpackage/sqlpackage) to enable advanced capabilities such as building and publishing warehouse projects, comparing schemas, scripting changes, and extracting or deploying `.dacpac` files. For more information, see [Data-tier applications (DAC) overview](/sql/tools/sql-database-projects/concepts/data-tier-applications/overview).

To get started developing a warehouse project in the SQL Database Projects extension for Visual Studio Code, see [Develop warehouse projects in Visual Studio Code](develop-warehouse-project.md).

**SQL Server Management Studio (SSMS)** also supports development on Fabric Data Warehouse, providing a robust, full-featured environment for database administrators and developers. SSMS enables advanced querying, performance tuning, security management, and object exploration. It's especially well-suited for tasks such as monitoring query plans, executing complex scripts, and managing security roles within the warehouse. SSMS is an essential tool for both development and administrative workflows.

## Deployment workflows

You can use [Fabric deployment pipelines](../cicd/deployment-pipelines/intro-to-deployment-pipelines.md) or [Fabric's built-in continuous integration/continuous development (CI/CD)](../cicd/cicd-overview.md) to deploy to a warehouse.

Learn more about [Source control](source-control.md) for Fabric Data Warehouse. 

### Fabric deployment pipelines

- Fabric deployment pipelines support workspace branching and promotion across environments (for example, dev → test → prod).
- Git-connected workspaces can be mapped to branches, enabling structured CI/CD.
- Pipelines can be triggered manually or via automation using Fabric APIs.
- To get started, see [Get started with deployment pipelines](../cicd/deployment-pipelines/get-started-with-deployment-pipelines.md)

### CI/CD with Azure DevOps or GitHub

- Developers can use external CI/CD systems to automate build and deployment.
- Supported via DacFx tasks, SQLPackage CLI, and REST APIs.
- Git integration enables seamless collaboration and versioning across teams.
- To get started, see [Get started with Git integration](../cicd/git-integration/git-get-started.md)

## Next step

> [!div class="nextstepaction"]
> [Develop warehouse projects in Visual Studio Code](develop-warehouse-project.md)