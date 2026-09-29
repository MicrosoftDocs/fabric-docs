---
title: Pricing and capacity usage for Fabric Apps
description: Understand how Fabric Apps consumes Microsoft Fabric capacity units (CUs), including SQL database, GraphQL API, User Data Functions, and OneLake operations.
ms.topic: concept-article
ms.reviewer: mksuni
ms.date: 09/15/2026
ai-usage: ai-assisted
---

# Pricing and capacity usage for Fabric Apps

Learn how a Fabric app uses Fabric capacity and which platform features don't add separate charges. This article explains where capacity units (CUs) are used across the SQL database in Fabric, GraphQL API, User Data Functions, and OneLake operations.

## How billing works

Fabric apps run on Fabric capacity. Every operation that a Fabric app child service performs consumes CUs from the Fabric capacity assigned to your workspace.

Your workspace must have Fabric capacity assigned.
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
| **SQL Usage** | Compute for all SQL queries, modifications, and data processing - includes queries from your application's GraphQL API and any queries you run in the Fabric portal query editor. | SQL database in Fabric Capacity Usage CU | Interactive |
| **Allocated SQL Storage** | Dynamically allocated storage for tables, indexes, transaction logs, and metadata. Fully integrated with OneLake. | SQL Storage Data Stored | Background |

One Fabric CU equals 0.383 SQL database vCores.

### GraphQL API

Every GraphQL query (read) and mutation (write) made by your application's `RayfinClient` consumes CUs.
The consumption rate is ten CUs per hour of request and response processing time.

| Operation | What it covers | Billing meter | Type |
| --- | --- | --- | --- |
| **Query** | Compute for all GraphQL queries (reads) and mutations (writes) performed by API clients against your data models. | API for GraphQL Query Capacity Usage CU | Interactive |

For more details, see [Fabric API for GraphQL](/fabric/enterprise/fabric-operations#fabric-api-for-graphql) in the Fabric operations documentation.

### Fabric User Data Functions

You pay for [Fabric User Data Functions](https://aka.ms/ms-fabric-functions-docs) based on function execution, metadata storage in OneLake, and related OneLake operations.



| Operation | Description | Item | Azure billing meter | Type |
| --- | --- | --- | --- | --- |
| **User Data Functions Execution** | Compute for a function run requested by the Fabric portal, another Fabric item, or an external application. | User Data Functions | User Data Function Execution (CU/s) | Interactive |
| **User Data Functions Portal Test** | Compute for testing a function in develop mode. Test sessions have a minimum duration of 15 minutes. | User Data Functions | User Data Function Execution (CU/s) | Interactive |
| **User Data Functions Static Storage** | Storage of compressed internal function metadata in a service-managed OneLake account. This charge applies even if you don't use the item. | OneLake Storage | OneLake Storage | Background |
| **User Data Functions Static Storage Read** | Reads internal function metadata when a function runs after a period of inactivity. | OneLake Read Operations | OneLake Read Operations | Background |
| **User Data Functions Static Storage Write** | Writes or updates internal function metadata when the User Data Functions item is published. | OneLake Write Operations | OneLake Write Operations | Background |
| **User Data Functions Static Storage Iterative Read** | Reads internal function metadata when User Data Functions are listed. | OneLake Iterative Read Operations | OneLake Iterative Read Operations | Background |
| **User Data Functions Static Storage Other Operations** | Other operations on function metadata in a service-managed OneLake account. | OneLake Other Operations | OneLake Other Operations | Background |

### OneLake storage (static content)

When static hosting is enabled, your built frontend assets (HTML, CSS, JS) are stored in OneLake and served from a Fabric Apps hosting URL. The storage and read operations apply whether you configure protected or public asset access.
OneLake storage and the read/write operations to serve content consume CUs.

| Operation | What it covers | Billing meter | Type |
| --- | --- | --- | --- |
| **OneLake Read** | Read operations when serving static content to end users. | OneLake Read Operations Capacity Usage CU | Background |
| **OneLake Write** | Write operations when deploying or updating static content via `rayfin up`. | OneLake Write Operations Capacity Usage CU | Background |
| **OneLake Storage** | Storage of static content files in OneLake. | OneLake Storage | Background |

## What doesn't consume more capacity

The following Fabric app capabilities don't incur separate CU charges at this time:

- **Fabric App hosting service** — The application backend service that handles API routing and authentication.
- **Authentication** — Fabric brokered auth (Entra SSO) sign-in and session management.
- **Deployment operations** — Running `rayfin up` to deploy your application does not have its own CU charge beyond the SQL and OneLake operations it triggers.

## Related content

- [Fabric operations](../enterprise/fabric-operations.md)
- [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md)
- [Deploy a Fabric Apps project to Fabric](deploy-app.md)
