---
title: Overview of Fabric Git integration
description: An introduction to integrating Git version control with the Fabric Application lifecycle management (ALM) tool
author: mberdugo
ms.author: monaberdugo
ms.reviewer: NimrodShalit
ms.service: fabric
ms.subservice: cicd
ms.topic: concept-article
ms.date: 06/18/2024
ms.search.form: Git integration supported items, Introduction to Git integration
#customer intent: As a developer I want to learn about the Git integration feature in Fabric so that my team can collaborate more effectively.
---

# Introduction to Git integration (preview)

This article explains to developers how to integrate Git version control with the Fabric Application lifecycle management (ALM) tool.

[!INCLUDE [preview-note](../../includes/feature-preview-note.md)]

Git integration in Microsoft Fabric enables developers to integrate their development processes, tools, and best practices straight into the Fabric platform. It allows developers who are developing in Fabric to:

* Backup and version their work
* Revert to previous stages as needed
* Collaborate with others or work alone using Git branches
* Apply the capabilities of familiar source control tools to manage Fabric items

:::image type="content" source="./media/intro-to-git-integration/git-flow.png" alt-text="Flowchart showing the connection between the remote Git repo and the Fabric workspace.":::

The integration with source control is on a workspace level. Developers can version items they develop within a workspace in a single process, with full visibility to all their items. Currently, in Preview, only a few items are supported, but the list of [supported items](#supported-items) is growing.

* Read up on [version control](/devops/develop/git/what-is-version-control) and [Git](/devops/develop/git/what-is-git) to make sure you’re familiar with basic Git concepts.  

* Read more about the [Git integration process](./git-integration-process.md).

* Read about the best way to manage your [Git branches](./manage-branches.md).

## Privacy concerns

Before you enable Git integration, make sure you understand the following possible privacy concerns:

* [Azure DevOps Services Data protection overview](/azure/devops/organizations/security/data-protection)
* <a href="https://github.com/customer-terms/github-data-protection-agreement" target="_blank">GitHub Data protection agreement</a>
* <a href="https://go.microsoft.com/fwlink/?LinkId=521839" target="_blank">Microsoft privacy statement</a>
<!--- * [Microsoft services agreement](https://www.microsoft.com/servicesagreement/default.aspx) -->
## Supported Git providers

The following Git providers are supported:

* [Git in Azure Repos](/en-us/azure/devops/user-guide/code-with-git) with the *same tenant* as the Fabric tenant are supported.
* [GitHub](https://github.com/)
* [GitHub Enterprise](https://github.com/enterprise)

## Supported items

The following items are currently supported:

* [Data pipelines](../../data-factory/git-integration-deployment-pipelines.md)
* [Lakehouse](../../data-engineering/lakehouse-git-deployment-pipelines.md)
* [Notebooks](../../data-engineering/notebook-source-control-deployment.md#notebook-git-integration)
* [Paginated reports](/power-bi/paginated-reports/paginated-reports-report-builder-power-bi)
* Reports (except reports connected to semantic models hosted in [Azure Analysis Services](/azure/analysis-services/analysis-services-overview), [SQL Server Analysis Services](/analysis-services/analysis-services-overview) or reports exported by Power BI Desktop that depend on semantic models hosted in [MyWorkspace](../../admin/portal-workspaces.md#govern-my-workspaces))
* Semantic models (except push datasets, live connections to Analysis Services, model v1).
* [Spark Job Definitions](../../data-engineering/spark-job-definition-source-control.md)
* [Spark environment](../../data-engineering/environment-git-and-deployment-pipeline.md)
* [Warehouses](../../data-warehouse/data-warehousing.md)

If the workspace or Git directory has unsupported items, it can still be connected, but the unsupported items are ignored. They aren’t saved or synced, but they’re not deleted either. They appear in the source control panel but you can't commit or update them.

## Considerations and limitations

* Sovereign clouds aren't supported.

### [Azure DevOps limitations](#tab/azure-devops)

* The Azure repo must use the *same tenant* as the Fabric tenant.
* If the workspace and Git repo are in two different geographical regions, the tenant admin must enable [cross-geo exports](../../admin/git-integration-admin-settings.md#users-can-export-items-to-git-repositories-in-other-geographical-locations-preview).
* The commit size is limited to 125 MB.

### [GitHub limitations](#tab/github)

* GitHub can't enforce [cross-geo validations](../../admin/git-integration-admin-settings.md#users-can-export-items-to-git-repositories-in-other-geographical-locations-preview).
* The commit size is limited to 100 MB.

---

## Related content

* [Get started with Git integration](./git-get-started.md)
* [Understand the Git integration process](./git-integration-process.md)
