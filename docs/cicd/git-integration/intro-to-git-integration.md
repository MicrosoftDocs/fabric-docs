---
title: Overview of Fabric Git integration
description: An introduction to Git integration the Fabric Application lifecycle management (ALM) tool
author: mberdugo
ms.author: monaberdugo
ms.reviewer: NimrodShalit
ms.topic: conceptual
ms.custom:
  - contperf-fy21q1
  - build-2023
  - ignite-2023
ms.date: 12/17/2023
ms.search.form:
---

# Introduction to Git integration (preview)

[!INCLUDE [preview-note](../../includes/feature-preview-note.md)]

> [!NOTE]
> This articles in this section are about version control using Git integration. To manage deployment of your app, see the [deployment pipelines](../deployment-pipelines/intro-to-deployment-pipelines.md) documentation.

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
* [Microsoft privacy statement](https://go.microsoft.com/fwlink/?LinkId=521839)
<!--- * [Microsoft services agreement](https://www.microsoft.com/servicesagreement/default.aspx) -->

## Supported items

The following items are currently supported:

<!--- * [Data pipelines](../../data-factory/data-factory-overview.md#data-pipelines) --->

* [Lakehouse](../../data-engineering/lakehouse-git-deployment-pipelines.md)
* [Notebooks](../../data-engineering/notebook-source-control-deployment.md#notebook-git-integration)
* [Paginated reports](/power-bi/paginated-reports/paginated-reports-report-builder-power-bi)
* Reports (except reports connected to semantic models hosted in [Azure Analysis Services](/azure/analysis-services/analysis-services-overview), [SQL Server Analysis Services](/analysis-services/analysis-services-overview) or reports exported by Power BI Desktop that depend on semantic models hosted in [MyWorkspace](../../admin/portal-workspaces.md#govern-my-workspaces))
* Semantic models (except push datasets, live connections, model v1, and semantic models [created from the Data warehouse/lakehouse](../../data-warehouse/semantic-models.md#create-a-new-power-bi-semantic-model).)

If the workspace or Git directory has unsupported items, it can still be connected, but the unsupported items are ignored. They aren’t saved or synced, but they’re not deleted either. They appear in the source control pane but you can't commit or update them.

## Considerations and limitations

* Currently, only [Git in Azure Repos](/en-us/azure/devops/user-guide/code-with-git) is supported.  
* If the workspace and Git repo are in two different geographical regions, the tenant admin must enable [cross-geo exports](../../admin/git-integration-admin-settings.md#users-can-export-items-to-git-repositories-in-other-geographical-locations-preview).  
* Azure DevOps **on-prem** isn't supported.
* Sovereign clouds aren't supported.

## Related content

* [Get started with Git integration](./git-get-started.md)
* [Understand the Git integration process](./git-integration-process.md)
