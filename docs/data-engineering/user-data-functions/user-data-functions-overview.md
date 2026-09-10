---
title: Overview - Fabric user data functions
description: Learn about Fabric user data functions.
ms.reviewer: luisbosquez
ms.topic: overview
ms.custom: freshness-kr
ms.date: 01/21/2026
ms.search.form: User data functions overview
ai-usage: ai-assisted
---

# What are Fabric user data functions?

User data functions enable you to create reusable Python functions that you can call from across Fabric and from external applications. Write your business logic once and call it from pipelines, notebooks, activator rules, Power BI translytical task flows, or any external system via REST endpoints.

User data functions provide a serverless compute environment where you can host and run custom Python code directly in Fabric. Whether you need to standardize product categories, apply complex business rules, or integrate with external APIs, you can write functions that are immediately available across your entire data platform. The service supports [Python 3.11.9 runtime](https://www.python.org/downloads/release/python-3119/), [public libraries from PyPI](https://pypi.org/), and [Fabric data connections](./connect-to-data-sources.md).

:::image type="content" source="..\media\user-data-functions-overview\overview-user-data-functions.gif" alt-text="Animated GIF showing the interface of Fabric user data functions." lightbox="..\media\user-data-functions-overview\overview-user-data-functions.gif":::

**Ready to get started?** Follow this guide to [create a new user data functions item](./create-user-data-functions-portal.md) or [use the VS Code extension](./create-user-data-functions-vs-code.md).

## Why use Fabric user data functions?

Fabric user data functions provides a serverless platform to host your custom logic and invoke it from different types of Fabric items and data sources. Use this service to write business logic, internal algorithms, and reusable functions that integrate into your Fabric solutions.

The following are key benefits:

- **Reusability**: Write your business logic once as a user data function and invoke it from multiple Fabric items - pipelines, notebooks, activator rules, and Power BI translytical task flows. When business rules change, update the function once rather than modifying code in multiple places.
- **Serverless hosting**: Deploy Python functions without managing infrastructure. User data functions provide a serverless compute environment with built-in authentication, so you don't need to set up and maintain separate API services or containers.
- **External connectivity**: Each function automatically exposes its own unique REST endpoint, enabling integration with external applications, web services, and custom clients. Call your functions from any system that supports HTTP requests.

## Key capabilities

- **Write once, run anywhere**: Create functions that work identically whether invoked from pipelines, notebooks, activator rules, Power BI, or external REST calls
- **Rich Python ecosystem**: Use any package from PyPI to build sophisticated logic—pandas for data manipulation, requests for API calls, or specialized libraries for your domain
- **Secure data access**: Connect to Fabric data sources (SQL databases, warehouses, lakehouses, mirrored databases) with built-in authentication and security
- **Develop and publish workflow**: Test functions before publishing them, ensuring changes are validated before becoming available for invocation

## Integration capabilities

User data functions integrate seamlessly with Fabric workloads and external systems, enabling you to build comprehensive data solutions.

### Invoke from Fabric items

Call your functions from any Fabric workload to centralize business logic and maintain consistency:

- **[Data pipelines](./create-functions-activity-data-pipelines.md)** - Execute functions as pipeline activities for data transformations, validations, or orchestration logic
- **[Notebooks](../notebook-utilities.md)** - Invoke functions from PySpark or Python notebooks for data science workflows and exploratory analysis
- **[Activator rules](../../real-time-intelligence/data-activator/activator-rules-overview.md)** - Trigger functions in response to real-time events and streaming data
- **[Power BI translytical task flows](/power-bi/create-reports/translytical-task-flow-overview)** - Call functions directly from Power BI reports for interactive data experiences. User data functions can receive report context - such as the current filter and selection context - in the request payload, enabling action execution and write-back scenarios from within a report. After a write-back completes, data visibility in the report depends on the report's storage mode and refresh semantics: updated values appear immediately for Direct Lake or DirectQuery reports, or after an automatic refresh triggered by the task flow for import-mode reports.

### Connect to Fabric data sources

Your functions can securely access data from across the Fabric platform:

- **[SQL databases](../../database/sql/overview.md)** - Read and write operations on SQL databases in Fabric
- **[Warehouses](../../data-warehouse/create-warehouse.md)** - Read and write operations for structured data
- **[Lakehouses](../lakehouse-overview.md)** - Read and write Lakehouse files; read-only access to SQL analytics endpoints
- **[Mirrored databases](../../mirroring/overview.md)** - Read-only access to mirrored database data
- **[Variable library](../../cicd/variable-library/variable-library-overview.md)** - Access centralized configuration settings as variables in your functions.
- **[Cosmos DB in Fabric](../../database/cosmos-db/overview.md)** - Connect to Cosmos DB in Fabric containers for NoSQL data operations.
- **Business events** - Detect changes in operational data and publish business events for downstream applications.

In addition to managed connections, user data functions support generic connections that you can use to connect to Fabric items or Azure resources by using the item owner's identity. Generic connections generate a Microsoft Entra ID token with the owner's identity for a specified audience type, providing a flexible way to authenticate with services like Azure Cosmos DB or Azure Key Vault without configuring individual managed connections. For more information, see [Generic connections for Fabric items or Azure resources](./python-programming-model.md#generic-connections-for-fabric-items-or-azure-resources).

Write-back from Power BI translytical task flows is natively supported when invoking user data functions. User data functions can perform add, update, and delete operations against SQL databases in Fabric, warehouses, and lakehouse files, making them the ideal integration point for task-flow-driven write-back scenarios.

Learn more about [connecting to Fabric data sources](./connect-to-data-sources.md).

### Call from external applications

Each user data functions automatically exposes its own unique REST endpoint for integration with systems outside Fabric:

- **Web applications** - Invoke functions from web apps, mobile apps, or single-page applications
- **External services** - Integrate with external systems, microservices, or legacy applications—for example, post messages or updates to Microsoft Teams, or call external REST APIs as part of task-flow-driven actions
- **API workflows** - Chain functions with other APIs to build complex integration scenarios
- **Custom clients** - Call from any programming language or platform that supports HTTP requests

REST endpoints for user data functions support Microsoft Entra ID authentication, ensuring secure access from external systems. Learn how to [invoke user data functions from a Python application](./tutorial-invoke-from-python-app.md).

## Get started

Ready to create your first user data functions? Choose your preferred development environment:

- **[Create functions in the Fabric portal](./create-user-data-functions-portal.md)** - Quick start guide with browser-based development and testing
- **[Develop with Visual Studio Code](./create-user-data-functions-vs-code.md)** - Full IDE experience with local debugging and Git integration

## Related content

- **[User data functions programming model](./python-programming-model.md)** - Deep dive into the Python SDK, decorators, and advanced features
- **[Invoke functions from a Python application](./tutorial-invoke-from-python-app.md)** - Learn to call your functions via REST endpoints from external systems
