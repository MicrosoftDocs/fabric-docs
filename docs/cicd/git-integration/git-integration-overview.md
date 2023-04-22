---
title: Overview of git integration in Microsoft Fabric
description: Introduction to git integration in Microsoft Fabric. Learn how it works and why to use it.
author: mberdugo
ms.author: monaberdugo
ms.topic: how-to
ms.date: 05/23/2023
ms.custom: 
---

# Overview of git integration in Microsoft Fabric (Preview)

Git integration in Microsoft Fabric enables Pro developers to integrate their development processes, tools, and best practices straight into the Fabric platform. It allows developers who are developing in Fabric to:

* Backup and version their work
* Rollback as needed
* Collaborate or work in isolation using Git branches
* Leverage the capabilities of familiar source control tools to manage Fabric items.

The integration with source control is on a workspace level. Developers can version items they develop within a workspace in a single process, with full visibility to all their items. Currently, in Preview, only a few items are supported, but the list of [supported items](#supported-items) is growing.

Read up on [version control](/devops/develop/git/what-is-version-control) and [Git](/devops/develop/git/what-is-git) to make sure you're familiar with basic git concepts.

## Supported items

Fabric’s git integration supports he following items:

## Considerations and limitations

Currently, only [Git in Azure Repos](/azure/devops/repos/get-started/what-is-repos#git) is supported.

## Next steps

* Understand the [git integration process](./git-integration-process.md)
* [Get started with git integration](./git-get-started.md)