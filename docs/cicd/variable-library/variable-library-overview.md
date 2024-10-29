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

Variable libraries are supported in CI/CD. They can be integrated with Git, be deployed in deployment pipelines, and automated using the public APIs.

## Customized configurations

The variable value can be configured based on the release pipeline stage. The user configures the variable library one time for each stage of the pipeline, and the correct value is automatically used based on the pipeline stage. The user can configure values for semantic models, data pipelines, shortcuts for Lakehouses, etc.

## Share configurations

Variable libraries provide a centralized way to manage configurations across the workspace items. For example, Lakehouses using the same shortcut can share the configuration across the workspace.

## Variable library use cases

Here are some examples of things you can do with variable libraries:

* *Change based on environment* (stage) in a release pipeline. For example, with variable libraries, you can:

  * Change the connection between items in a new or existing workspace.

  * Change the connection to data sources or cloud connection, based on the stage (*dev*/*test*/ *prod* etc.).  

  * Change the amount of data used in a query, based on the stage.

* *System variables*: Use dynamic values to decide what data to run in an ingestion process. For example, use the timestamp of the latest ingestion to decide on what data to run the process.

* *Unit testing*: Run tests separately from the actual ingestion process and manage it using variables.

* *Flexible parameterization*: Customers don’t know in advance what they want to parameterize. Use variable libraries to create a process where they can eventually parameterize anything.

* *Control generic item definitions in Git*, and manage the values for each stage separately, in the same way.  

<!--- * *Secrets*: customers want to manage credentials and secrets in a similar way, just with additional guardrails. --->

## Related content

* [Related article title](link.md)
* [Related article title](link.md)
* [Related article title](link.md)
