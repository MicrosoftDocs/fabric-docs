---
title: Pricing for Fabric apps on capacity
description: Understand per-user Power BI Pro pricing and capacity usage for Fabric apps on F SKU, trial, or Premium P SKU capacity.
ms.topic: concept-article
ms.reviewer: mksuni
ms.date: 10/27/2026
ai-usage: ai-assisted
---

# Pricing for Fabric apps on capacity

Fabric app pricing depends on your license and the type of workspace where you deploy the app. Power BI Pro uses per-user pricing, and capacity-backed apps use the capacity assigned to their workspace.

The capacity usage details in this article apply to apps deployed to Fabric F SKU capacity, Fabric trial capacity, or Power BI Premium P SKU capacity with Fabric enabled. They don't describe billing for the Microsoft-managed Power BI Pro experience.

For license requirements, feature limits, and sharing rules, see [Choose a licensing option for Fabric Apps](licensing.md).

## Compare pricing models

Use the pricing model that corresponds to the workspace or billing configuration your app uses. This page focuses on capacity-backed deployments. For Pro pricing, use the public purchase information linked in the following table.

| Deployment option | How pricing is measured | What you need |
| --- | --- | --- |
| Power BI Pro experience | Per licensed user | [Power BI Pro pricing](https://www.microsoft.com/en-us/power-platform/products/power-bi/pricing) |
| Capacity-backed app | CUs consumed from the workspace's assigned F SKU, trial, or Premium P SKU capacity | A Fabric license and a workspace assigned to supported capacity |

## How capacity billing works

For capacity-backed Fabric apps, every operation that a Fabric app child service performs consumes CUs from the Fabric capacity assigned to your workspace.

For this deployment path, your workspace must have Fabric F SKU capacity, an active Fabric trial capacity, or Power BI Premium P SKU capacity with Fabric enabled assigned. A Fabric user license alone doesn't provide capacity. During a trial, usage is subject to trial limits; continued use after the trial requires assigning the workspace to paid capacity.

CU consumption is tracked in the [Microsoft Fabric Capacity Metrics app](/fabric/enterprise/metrics-app) where you can monitor usage per item and per operation.

## What consumes capacity

A Fabric app uses four Fabric services that consume CUs:

- [SQL Database](#sql-database)
- [GraphQL API](#graphql-api)
- [Fabric User Data Functions](#fabric-user-data-functions)
- [OneLake storage (static content)](#onelake-storage-static-content)

### SQL Database

The SQL Database child item consumes CUs for compute and storage.

| Operation | What it covers | Billing meter | Type |
| --- | --- | --- | --- |
| **SQL Usage** | Compute for all SQL queries, modifications, and data processing - includes queries from your application's GraphQL API and any queries you run in the Fabric portal query editor | SQL database in Fabric Capacity Usage CU | Interactive |
| **Allocated SQL Storage** | Dynamically allocated storage for tables, indexes, transaction logs, and metadata. Fully integrated with OneLake. | SQL Storage Data Stored | Background |

One Fabric CU equals 0.383 SQL database vCores.

### GraphQL API

Every GraphQL query (read) and mutation (write) made by your application's `RayfinClient` consumes CUs.
The consumption rate is ten CUs per hour of request and response processing time.

| Operation | What it covers | Billing meter | Type |
| --- | --- | --- | --- |
| **Query** | Compute for all GraphQL queries (reads) and mutations (writes) performed by API clients against your data models | API for GraphQL Query Capacity Usage CU | Interactive |

For more details, see [Fabric API for GraphQL](/fabric/enterprise/fabric-operations#fabric-api-for-graphql) in the Fabric operations documentation.

### Fabric User Data Functions

The [Functions feature in Fabric Apps](functions.md) uses the following [Fabric User Data Functions](https://aka.ms/ms-fabric-functions-docs) meters for capacity-backed deployments.

Operations are initiated by requests from the Fabric portal, other Fabric items, or client applications. Charges cover function execution, internal storage of function metadata in OneLake, and associated OneLake operations. Metadata storage charges apply even if you don't run a function.

| Operation | Description | Item | Azure billing meter | Type |
| --- | --- | --- | --- | --- |
| **User Data Functions Execution** | Compute charge for running a function in a User Data Functions item in response to a request from the Fabric portal, another Fabric item, or an external application | User Data Functions | User Data Function Execution (CU/s) | Interactive |
| **User Data Functions Portal Test** | Compute charge for testing a function in a User Data Functions item in **Develop mode**. Each test session has a minimum duration of 15 minutes. | User Data Functions | User Data Function Execution (CU/s) | Interactive |
| **User Data Functions Static Storage** | Storage of internal function metadata in a service-managed OneLake account, calculated from the compressed size of the User Data Functions item metadata. This charge applies when you create the item, even if you don't use it. | OneLake Storage | OneLake Storage | Background |
| **User Data Functions Static Storage Read** | Read of internal function metadata in a service-managed OneLake account each time a function runs after a period of inactivity | OneLake Read Operations | OneLake Read Operations | Background |
| **User Data Functions Static Storage Write** | Writes and updates of internal function metadata in a system-managed OneLake account each time the User Data Functions item is published | OneLake Write Operations | OneLake Write Operations | Background |
| **User Data Functions Static Storage Iterative Read** | Reads of internal function metadata in a service-managed OneLake account each time User Data Functions are listed | OneLake Iterative Read Operations | OneLake Iterative Read Operations | Background |
| **User Data Functions Static Storage Other Operations** | Other storage operations on function metadata in a service-managed OneLake account | OneLake Other Operations | OneLake Other Operations | Background |

### OneLake storage (static content)

When static hosting is enabled, your built frontend assets (HTML, CSS, JS) are stored in OneLake and served from a Fabric Apps hosting URL. The storage and read operations apply whether you configure protected or public asset access.
OneLake storage and the read/write operations to serve content consume CUs.

| Operation | What it covers | Billing meter | Type |
| --- | --- | --- | --- |
| **OneLake Read** | Read operations when serving static content to end users | OneLake Read Operations Capacity Usage CU | Background |
| **OneLake Write** | Write operations when deploying or updating static content via `rayfin up` | OneLake Write Operations Capacity Usage CU | Background |
| **OneLake Storage** | Storage of static content files in OneLake | OneLake Storage | Background |

## Related content

- [Choose a licensing option for Fabric Apps](licensing.md)
- [Fabric operations](../enterprise/fabric-operations.md)
- [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md)
- [Deploy a Fabric Apps project to Fabric](deploy-app.md)
