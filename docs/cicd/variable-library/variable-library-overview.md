---
title: Fabric Application lifecycle management variable library
description: Learn how to use the Fabric Application lifecycle management (ALM) variable library tool to customize your stages.
author: mberdugo
ms.author: monaberdugo
ms.service: fabric
ms.subservice: cicd
ms.topic: overview
ms.date: 08/15/2024
#customer intent: As a developer, I want to learn how to deploy content to an empty or nonempty stage using the Fabric Application lifecycle management (ALM) deployment pipeline tool so that I can manage my content lifecycle.
---

# What is a variable library?

A variable library is a Microsoft Fabric item that stores other items and their configurations. It provides a unified way for customers to manage item configurations in a workspace in a scalable way and across lifecycle stages.

Variable libraries enable customers to:

* [Customize configurations](#customized-configurations)
* [Share configurations](#share-configurations) 

Variable libraries are supported in CI/CD. They and can be integrated to git, be deployed in deployment pipelines, and automated using the public APIs.

## Customized configurations

The variable value can be configured based on the release pipeline stage. The user configures the variable library one time for each stage of the pipeline, and the correct value is automatically used based on the pipeline stage. The user can configure values for semantic models, data pipelines, shortcuts for Lakehouses, etc.

## Share configurations

Variable libraries provide a centralized way to manage configurations across the workspace items. For example, Lakehouses using the same shortcut can share the configuration across the workspace.

## Related content

* [Related article title](link.md)
* [Related article title](link.md)
* [Related article title](link.md)
