---
title: Overview - Fabric User data functions
description: Learn about Fabric User data functions.
ms.author: eur
ms.reviewer: luisbosquez
author: eric-urban
ms.topic: overview
ms.date: 06/17/2025
ms.search.form: User data functions overview
---

# What is Fabric User data functions?

User data functions is a feature that allows you to host and run your own code on Fabric. This empowers data developers to write their business logic and embed it into their Fabric ecosystem. This feature supports the [Python 3.11.9 runtime](https://www.python.org/downloads/release/python-3119/) and allows you to use [public libraries from PyPI](https://pypi.org/), [Fabric data connections](./connect-to-data-sources.md) and much more.

:::image type="content" source="..\media\user-data-functions-overview\overview-user-data-functions.gif" alt-text="Animated GIF showing the interface of Fabric User Data Functions." lightbox="..\media\user-data-functions-overview\overview-user-data-functions.gif":::

**Ready to get started?** Follow this guide to [create a new user data functions item](./create-user-data-functions-portal.md) or [use the VS Code extension](./create-user-data-functions-vs-code.md).

## Why use Fabric User data functions?

Fabric User data functions provides a platform to host your custom logic and reference from different types of Fabric items and data sources. You can use this service to write your business logic, internal algorithms, and libraries. You can also integrate it into your Fabric architectures to customize the behavior of your solutions.

The following are some of the benefits for logic using user data functions:

- **Reusability**: Invoke your functions from other Fabric items and create libraries of standardized functionality that can be used in many solutions within your organization.
- **Customization**: Use Python and public libraries from PyPI to create powerful applications that are tailored to your needs.
- **Encapsulation**: Create functions that perform several tasks to build sophisticated workflows.
- **External connectivity**: Invoke your user data functions from external client applications using a REST endpoint, opening up possibilities for integrations with external systems.

## Fabric integrations
Fabric User Data Functions can seamlessly connect with other Fabric items to create rich end-to-end experiences. There are two kinds of integrations:
- [Fabric data sources](./connect-to-data-sources.md)
- Fabric items that invoke User Data Functions:
    - [Fabric Pipelines](./create-functions-activity-data-pipelines.md)
    - [Fabric Notebooks](../notebook-utilities.md)
- [Translytical app with Power BI](/power-bi/create-reports/translytical-task-flow-overview)


## Next steps

- [Create a Fabric User data functions item](./create-user-data-functions-portal.md) or [use the VS Code extension](./create-user-data-functions-vs-code.md)
- [Learn about the User data functions programming model](./python-programming-model.md)
