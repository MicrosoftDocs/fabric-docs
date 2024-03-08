---
title: Git integration and deployment for data pipelines in Data Factory for Microsoft Fabric
description: This article describes how to use continuous integration and deployment (CI/CD) with Git integration for data pipelines in Microsoft Fabric.
author: kromerm
ms.author: makromer
ms.topic: conceptual
ms.date: 03/26/2024
---

# Git integration and deployment for data pipelines in Data Factory for Microsoft Fabric

> [!IMPORTANT]
> Git integration and deployment for data pipelines in Data Factory for Microsoft Fabric are currently in preview. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

In Fabric, continuous integration and development (CI/CD) features with Git Integration & deployment pipelines allow users to import/export workspace resources with individual updates, deviating from the Azure Data Factory model where whole factory updates using ARM template export methodology is preferred. This change in methodology allows customers to selectively choose which pipelines to update without pausing the whole factory. Both Git integration (bring-your-own Git) as well as deployment pipelines (built-in CI/CD) use the concept of associated a single workspace with a single environment. You need to map out different workspaces to your different environments such as dev, test, and production.

## Create a new branch

From the Fabric UI, go to New Branch and create a new development branch for your work. (See screenshots below for “Branch” property)
