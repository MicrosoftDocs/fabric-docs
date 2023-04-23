---
title: Overview of Fabric git integration 
description: An introduction to git integration the Fabric Application lifecycle management (ALM) tool
author: mberdugo
ms.author: monaberdugo
ms.topic: conceptual
ms.service: powerbi
ms.subservice: pbi-git-integration
ms.custom: contperf-fy21q1
ms.date: 04/02/2023
ms.search.form: 
---

# Introduction to git integration

Git integration in Microsoft Fabric enables Pro developers to integrate their development processes, tools, and best practices straight into the Fabric platform. It allows developers who are developing in Fabric to:

* Backup and version their work
* Revert to previous stages as needed
* Collaborate with others or work alone using Git branches
* Leverage the capabilities of familiar source control tools to manage Fabric items.

The integration with source control is on a workspace level. Developers can version items they develop within a workspace in a single process, with full visibility to all their items. Currently, in Preview, only a few items are supported, but the list of [supported items](#supported-items) is growing.

Read up on [version control](/devops/develop/git/what-is-version-control) and [Git](/devops/develop/git/what-is-git)) to make sure you’re familiar with basic git concepts.

## Supported Items

The following items are currently supported, with more items to be added soon:

* Reports (except paginated reports)
* Datasets (except push datasets, live connections, and model v1)

If the folder has unsupported items, it can still be connected, but the unsupported items are ignored. They aren’t saved or synced, but they’re not deleted either.

## Permissions

The actions you can take on a workspace depend on the permissions you have in both the workspace and Azure DevOps. For a detailed explanation of permissions needed for git integration, see [Basic concepts](./git-integration-process.md#permissions).

## Workflow

A typical workflow for a developer using Fabric git integration may look like this:

1. [Connect](./git-get-started.md#connect-a-workspace-to-an-azure-repo) the IT developer workspace to a Git branch​
1. [Edit and commit](./git-get-started.md#commit-changes-to-git) changes​
1. Start a pull request and merge changes to ‘main’ branch​
1. [Update](./git-get-started.md#update-workspace-from-git) the IT developer workspace

## Considerations and limitations

* Currently, only [Git in Azure Repos](/en-us/azure/devops/user-guide/code-with-git) is supported. Other platforms will be supported in the future.

## Next steps

* Understand the git integration process
* Get started with git integration
