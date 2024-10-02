---
title: Dataflow Gen2 with CICD and Git integration
description: Describes how to use Dataflow Gen2 with CICD and Git integration in Fabric data factory.
ms.reviewer: DougKlopfenstein
ms.author: jeluitwi
author: luitwieler
ms.topic: how-to
ms.date: 10/02/2024
---

# Dataflow Gen2 with CICD and Git integration support (Preview)

Dataflow Gen2 now supports CICD and Git integration. This feature allows you to create, edit, and manage dataflows in a Git repository that is connected to your fabric workspace. Additionally, you can use the Deployment pipelines feature to automate the deployment of dataflows from your workspace to other workspaces. This article goes deeper into how to use Dataflow Gen2 with CICD and Git integration in Fabric data factory.

## Prerequisites

To get started, you must complete the following prerequisites:

- A Microsoft Fabric tenant account with an active subscription. Create an account for free.
- Make sure you have a Microsoft Fabric enabled Workspace.
- Git integration is enabled for your workspace. Learn more about enabling Git integration [here](/fabric/cicd/git-integration/git-get-started).

## Create a dataflow gen2 with CI/CD and Git support

To create a dataflow gen2 with CI/CD and Git support, follow these steps:

- In the fabric workspace, click on create new item and select Dataflow Gen2 (CI/CD, preview).
- Give your dataflow a name and click on create.
- The dataflow will be created and you will be redirected to the dataflow authoring canvas.
- You can now start creating your dataflow.
- When you are done, click on publish
- After publishing, you will notice that the dataflow has the status of uncommitted.
- To commit the dataflow to the Git repository, click on the source control icon in the top right corner.
- Select all the changes you want to commit and click on commit.
- 