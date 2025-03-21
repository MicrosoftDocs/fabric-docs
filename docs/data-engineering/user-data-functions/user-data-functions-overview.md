---
title: Overview - Fabric User Data Functions (preview)
description: Learn about Fabric User Data Functions.
ms.author: luisbosquez
author: luisbosquez
ms.topic: overview
ms.date: 03/27/2025
ms.search.form: User Data Functions overview
---

# What is Fabric User Data Functions (Preview)?

Fabric User Data Functions is a platform that allows you to host and run applications on Fabric. This empowers data developers to write custom logic and embed it into their Fabric ecosystem. This feature supports the [Python 3.11 runtime](https://www.python.org/downloads/release/python-3110/) and allows you to use [public libraries from PyPI](https://pypi.org/).

:::image type="content" source="..\media\user-data-functions-overview\user-data-functions-overview.gif" alt-text="Animated GIF showing the interface of Fabric User Data Functions." lightbox="..\media\user-data-functions-overview\user-data-functions-overview.gif":::

You can use the native Fabric integrations to connect to your Fabric data sources, such as Fabric Warehouse, Fabric Lakehouse or Fabric SQL Databases, or invoke your functions from Fabric notebooks, Power BI reports, or data pipelines. You can edit your functions directly in the Fabric portal using the in-browser tooling, or with the dedicated Visual Studio (VS) Code extension.

**Ready to get started?** Follow this guide to [create a new User data functions item](./create-user-data-functions-portal.md) or [use the VS Code extension](./create-user-data-functions-vs-code.md).

## Why use Fabric User Data Functions?

Fabric User Data Functions provides a platform to host your custom logic and reference from different types of Fabric items and data sources. You can use this service to write your business logic, internal algorithms, and libraries. You can also integrate it into your Fabric architectures to customize the behavior of your solutions.

The following are some of the benefits for logic using Fabric User Data Functions:

- **Reusability**: Invoke your functions from other Fabric items and create libraries of standardized functionality that can be used in many solutions within your organization.
- **Customization**: Use Python and public libraries from PyPI to create powerful applications that are tailored to your needs.
- **Encapsulation**: Create functions that perform several tasks to build sophisticated workflows.
- **External connectivity**: Invoke your User Data Functions from external client applications using a REST endpoint, opening up possibilities for integrations with external systems.

## Next steps

- [Create a new User data functions item](./create-user-data-functions-portal.md) or [use the VS Code extension](./create-user-data-functions-vs-code.md).
- [Learn about the User data functions programming model](./python-programming-model.md)
