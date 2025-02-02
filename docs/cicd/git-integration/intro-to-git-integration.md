---
title: Overview of Fabric Git integration
description: An introduction to integrating Git version control with the Fabric Application lifecycle management (ALM) tool
author: mberdugo
ms.author: monaberdugo
ms.reviewer: NimrodShalit
ms.service: fabric
ms.subservice: cicd
ms.custom:
  - ignite-2024
ms.topic: overview
ms.date: 12/26/2024
ms.search.form: Git integration supported items, Introduction to Git integration
#customer intent: As a developer I want to learn about the Git integration feature in Fabric so that my team can collaborate more effectively.
---

# What is Microsoft Fabric Git integration?

This article explains to developers how to integrate Git version control with the Microsoft Fabric Application lifecycle management (ALM) tool.

> [!NOTE]
> Some of the items for Git integration are in preview. For more information, see the list of [supported items](#supported-items).

Git integration in Microsoft Fabric enables developers to integrate their development processes, tools, and best practices straight into the Fabric platform. It allows developers who are developing in Fabric to:

* Backup and version their work
* Revert to previous stages as needed
* Collaborate with others or work alone using Git branches
* Apply the capabilities of familiar source control tools to manage Fabric items

The integration with source control is on a workspace level. Developers can version items they develop within a workspace in a single process, with full visibility to all their items. Only a few items are currently supported, but the list of [supported items](#supported-items) is growing.

* Read up on basic [Git](/devops/develop/git/what-is-git) and [version control](/devops/develop/git/what-is-version-control) concepts.  

* Read more about the [Git integration process](./git-integration-process.md).

* Read about the best way to manage your [Git branches](./manage-branches.md).

## Privacy information

Before you enable Git integration, make sure you review the following privacy statements:

* <a href="https://go.microsoft.com/fwlink/?LinkId=521839" target="_blank">Microsoft privacy statement</a>
* [Azure DevOps Services Data protection overview](/azure/devops/organizations/security/data-protection)
* <a href="https://github.com/customer-terms/github-data-protection-agreement" target="_blank">GitHub Data protection agreement</a>

## Supported Git providers

The following Git providers are supported:

* [Git in Azure Repos](/en-us/azure/devops/user-guide/code-with-git) with the *same tenant* as the Fabric tenant
* [GitHub](https://github.com/) (cloud versions only)
* [GitHub Enterprise](https://github.com/enterprise)

## Supported items

The following items are currently supported:

* [Data pipelines](../../data-factory/git-integration-deployment-pipelines.md) *(preview)*
* [Dataflows gen2](../../data-factory/dataflow-gen2-cicd-and-git-integration.md) *(preview)*
* [Eventhouse and KQL database](../../real-time-intelligence//eventhouse-git-deployment-pipelines.md) *(preview)*
* [EventStream](../../real-time-intelligence/event-streams/eventstream-cicd.md) *(preview)*
* [Lakehouse](../../data-engineering/lakehouse-git-deployment-pipelines.md) *(preview)*
* [Mirrored database](../../database/mirrored-database/mirrored-database-cicd.md) *(preview)*
* [Notebooks](../../data-engineering/notebook-source-control-deployment.md#notebook-git-integration)
* [Paginated reports](/power-bi/paginated-reports/paginated-github-integration) *(preview)*
* Reflex *(preview)*
* [Reports](./source-code-format.md#report-files) (except reports connected to semantic models hosted in [Azure Analysis Services](/azure/analysis-services/analysis-services-overview), [SQL Server Analysis Services](/analysis-services/analysis-services-overview), or reports exported by Power BI Desktop that depend on semantic models hosted in [MyWorkspace](../../admin/portal-workspaces.md#govern-my-workspaces)) *(preview)*
* [Semantic models](./source-code-format.md#semantic-model-files) (except push datasets, live connections to Analysis Services, model v1) *(preview)*
* [Spark Job Definitions](../../data-engineering/spark-job-definition-source-control.md) *(preview)*
* [Spark environment](../../data-engineering/environment-git-and-deployment-pipeline.md) *(preview)*
* [SQL database](../../database/sql/source-control.md) *(preview)*
* [Warehouses](../../data-warehouse/data-warehousing.md) *(preview)*

If the workspace or Git directory has unsupported items, it can still be connected, but the unsupported items are ignored. They aren't saved or synced, but they're not deleted either. They appear in the source control panel but you can't commit or update them.

## Considerations and limitations

[!INCLUDE [limitations](../../includes/git-limitations.md)]

## Related content

* [Get started with Git integration](./git-get-started.md)
* [Understand the Git integration process](./git-integration-process.md)
