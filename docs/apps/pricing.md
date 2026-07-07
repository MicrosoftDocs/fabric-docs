---
title: Pricing and capacity usage for Fabric Apps
description: Understand how Fabric Apps consumes Microsoft Fabric capacity units (CUs), including SQL database, GraphQL API, and OneLake operations.
ms.topic: concept-article
ms.reviewer: mksuni
ms.date: 06/02/2026
ai-usage: ai-assisted
---

# Pricing and capacity usage for Fabric Apps

Understand how a Fabric app consumes Fabric capacity and which platform features don't add separate charges. This article explains where capacity units (CUs) are used across the SQL database in Fabric, GraphQL API, and OneLake operations.

## How billing works

Fabric apps run on Fabric capacity. Every operation that a Fabric app child service performs consumes CUs from the Fabric capacity assigned to your workspace.

Your workspace must have Fabric capacity assigned.
CU consumption is tracked in the [Microsoft Fabric Capacity Metrics app](/fabric/enterprise/metrics-app) where you can monitor usage per item and per operation.

## What consumes capacity

A Fabric app uses three Fabric services that consume CUs:

- [SQL Database](#sql-database)
- [GraphQL API](#graphql-api)
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

### OneLake storage (static content)

When static hosting is enabled, your built frontend assets (HTML, CSS, JS) are stored in OneLake and served from a public URL.
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
