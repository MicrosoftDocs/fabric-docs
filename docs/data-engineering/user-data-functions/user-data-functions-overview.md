---
title: Overview - Fabric User Data Functions (preview)
description: Learn about Fabric User Data Functions
ms.author: luisbosquez
author: luisbosquez
ms.topic: overview
ms.date: 03/27/2025
ms.search.form: User Data Functions overview
---

# What is Fabric User Data Functions (Preview)?

Fabric User Data Functions is an platform that allows you to host and run applications on Fabric. This empowers data developers to write custom logic and embed it into their Fabric ecosystem. This feature supports the [Python 3.11 runtime](https://www.python.org/downloads/release/python-3110/) and allows you use [public libraries from PyPI](https://pypi.org/). 

:::image type="content" source="..\media\user-data-functions-overview\user_data_functions_overview.gif" alt-text="Animated GIF showing the interface of Fabric User Data Functions." lightbox="..\media\user-data-functions-overview\user_data_functions_overview.gif":::

You can leverage the native Fabric integrations to connect to your Fabric data sources, such as Fabric Warehouse, Fabric Lakehouse or Fabric SQL Databases, or invoke your functions from Fabric Notebooks, PowerBI reports or Data Pipelines. You can edit your functions directly in the Fabric portal using the in-browser tooling, or with the dedicated VSCode extension.

**Ready to get started?** Follow this guide to [create a new User Data Functions item from the Fabric portal](./create-user-data-functions-portal.md) or by using [the VSCode extension](./create-user-data-functions-vs-code.md).

## Why use Fabric User Data Functions?
Fabric User Data Functions provides a platform to host your custom logic and reference from different types of Fabric items and data sources. You can use this to write your business logic, internal algorithms and libraries, and integrate it into your Fabric architectures to customize the behavior of your solutions to your needs. 

The following are some of the benefits for logic using Fabric User Data Functions:
- **Reusability**: You can invoke your functions from other Fabric items, allowing you to create libraries of standardized functionality that can be used in many solutions within your organization.
- **Customization**: By using Python, along with public libraries from PyPI, you can create powerful applications that are tailored to your needs.
- **Encapsulation**: You can create functions that perform several tasks, creating sophisticated workflows.
-**External connectivity**: You can invoke your User Data Functions from external client applications using a REST endpoint, opening up the possibilities for integrations with external systems.

## Next steps
- [Create a new User Data Functions item from the Fabric portal](./create-user-data-functions-portal.md) or by using [the VSCode extension](./create-user-data-functions-vs-code.md).
- [Learn about User data functions programming model](./python-programming-model.md)



