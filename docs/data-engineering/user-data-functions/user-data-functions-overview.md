---
title: Overview - Fabric User data functions
description: Learn about Fabric User data functions.
ms.author: eur
ms.reviewer: luisbosquez
author: eric-urban
ms.topic: overview
ms.custom: freshness-kr
ms.date: 01/21/2026
ms.search.form: User data functions overview
---

# What is Fabric User data functions?

User Data Functions enable you to create reusable Python functions that can be invoked across Microsoft Fabric and from external applications. Write your business logic once and call it from Pipelines, Notebooks, Activator rules, Power BI translytical apps, or any external system via REST endpoints.

User Data Functions provide a serverless compute environment where you can host and run custom Python code directly in Fabric. Whether you need to standardize product categories, apply complex business rules, or integrate with external APIs, you can write functions that are immediately available across your entire data platform. The service supports [Python 3.11.9 runtime](https://www.python.org/downloads/release/python-3119/), [public libraries from PyPI](https://pypi.org/), and [Fabric data connections](./connect-to-data-sources.md).

:::image type="content" source="..\media\user-data-functions-overview\overview-user-data-functions.gif" alt-text="Animated GIF showing the interface of Fabric User Data Functions." lightbox="..\media\user-data-functions-overview\overview-user-data-functions.gif":::

**Ready to get started?** Follow this guide to [create a new user data functions item](./create-user-data-functions-portal.md) or [use the VS Code extension](./create-user-data-functions-vs-code.md).

## Why use Fabric User Data Functions?

Fabric User Data Functions provides a serverless platform to host your custom logic and invoke it from different types of Fabric items and data sources. You can use this service to write business logic, internal algorithms, and reusable functions that integrate into your Fabric solutions.

The following are key benefits:

- **Reusability**: Write your business logic once as a User Data Function and invoke it from multiple Fabric items—Pipelines, Notebooks, Activator rules, and Power BI translytical apps. When business rules change, update the function once rather than modifying code in multiple places.
- **Serverless hosting**: Deploy Python functions without managing infrastructure. User Data Functions provide a serverless compute environment with built-in authentication, eliminating the need to set up and maintain separate API services or containers.
- **External connectivity**: Each function automatically exposes its own unique REST endpoint, enabling integration with external applications, web services, and custom clients. Call your functions from any system that supports HTTP requests.

## Key capabilities

- **Write once, run anywhere**: Create functions that work identically whether invoked from Pipelines, Notebooks, Activator rules, Power BI, or external REST calls
- **Rich Python ecosystem**: Use any package from PyPI to build sophisticated logic—pandas for data manipulation, requests for API calls, or specialized libraries for your domain
- **Secure data access**: Connect to Fabric data sources (SQL databases, Warehouses, Lakehouses, Mirrored databases) with built-in authentication and security
- **Develop and publish workflow**: Test functions before publishing them, ensuring changes are validated before becoming available for invocation

## Integration capabilities

User Data Functions integrate seamlessly with Microsoft Fabric workloads and external systems, enabling you to build comprehensive data solutions.

### Invoke from Fabric items

Call your functions from any Fabric workload to centralize business logic and maintain consistency:

- **[Data Pipelines](./create-functions-activity-data-pipelines.md)** - Execute functions as pipeline activities for data transformations, validations, or orchestration logic
- **[Notebooks](../notebook-utilities.md)** - Invoke functions from PySpark or Python notebooks for data science workflows and exploratory analysis
- **[Activator rules](../../real-time-intelligence/data-activator/activator-rules-overview.md)** - Trigger functions in response to real-time events and streaming data
- **[Power BI translytical apps](/power-bi/create-reports/translytical-task-flow-overview)** - Call functions directly from Power BI reports for interactive data experiences

### Connect to Fabric data sources

Your functions can securely access data from across the Fabric platform:

- **[SQL databases](../../database/sql/overview.md)** - Read and write operations on Fabric SQL databases
- **[Warehouses](../../data-warehouse/create-warehouse.md)** - Read and write operations for structured data
- **[Lakehouses](../lakehouse-overview.md)** - Read and write Lakehouse files; read-only access to SQL endpoints
- **[Mirrored databases](../../mirroring/overview.md)** - Read-only access to mirrored database data

Learn more about [connecting to Fabric data sources](./connect-to-data-sources.md).

### Call from external applications

Each User Data Function automatically exposes its own unique REST endpoint for integration with systems outside Fabric:

- **Web applications** - Invoke functions from web apps, mobile apps, or single-page applications
- **External services** - Integrate with external systems, microservices, or legacy applications
- **API workflows** - Chain functions with other APIs to build complex integration scenarios
- **Custom clients** - Call from any programming language or platform that supports HTTP requests

REST endpoints for User Data Functions support Microsoft Entra ID authentication, ensuring secure access from external systems. Learn how to [invoke User Data Functions from a Python application](./tutorial-invoke-from-python-app.md).

## Get started

Ready to create your first User Data Function? Choose your preferred development environment:

- **[Create functions in the Fabric portal](./create-user-data-functions-portal.md)** - Quick start guide with browser-based development and testing
- **[Develop with Visual Studio Code](./create-user-data-functions-vs-code.md)** - Full IDE experience with local debugging and Git integration

## Related content

- **[User Data Functions programming model](./python-programming-model.md)** - Deep dive into the Python SDK, decorators, and advanced features
- **[Invoke functions from a Python application](./tutorial-invoke-from-python-app.md)** - Learn to call your functions via REST endpoints from external systems
