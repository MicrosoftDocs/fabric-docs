---
title: "PostgreSQL extensions in Microsoft Fabric HorizonDB"
description: Learn about the curated PostgreSQL extension model and service-managed extensions in Fabric HorizonDB.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: reference
ai-usage: ai-assisted
---
# PostgreSQL extensions in Microsoft Fabric HorizonDB

Fabric HorizonDB provides a curated PostgreSQL extension catalog. The service controls package versions, native libraries, startup preloading, and lifecycle compatibility. You can't install arbitrary operating-system packages or native libraries, and you don't receive PostgreSQL superuser access.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

The available extension set can vary by preview environment. Inspect your database before designing an extension dependency; package visibility doesn't establish customer activation support.

## Service-managed extensions

The preview can include these application and analytics extensions:

| Extension | Purpose |
|---|---|
| `azure_ai` | Service integration point for approved AI operations. Its presence doesn't guarantee a model, provider, endpoint, region, quota, or billing option. |
| `vector` | Vector data types and similarity operations in the released catalog. |
| `pg_diskann` | DiskANN vector indexing in the released catalog. |
| `pg_textsearch` | Enhanced text-search capabilities. |
| `pg_fabric_fdw` | Read supported Fabric data from Fabric HorizonDB. |

Don't create, drop, replace, update, or alter service-owned extension objects. If an expected extension is missing, treat the condition as a provisioning or service-health problem.

## List installed extensions

Run this query on the PostgreSQL endpoint:

```sql
SELECT
    extension.extname AS extension_name,
    extension.extversion AS installed_version,
    namespace.nspname AS schema_name
FROM pg_catalog.pg_extension AS extension
JOIN pg_catalog.pg_namespace AS namespace
  ON namespace.oid = extension.extnamespace
ORDER BY extension.extname;
```

For Federated Analytics, verify that `pg_fabric_fdw` and the default `fabric_dw` foreign server are present. If either is missing, treat it as a provisioning or preview-enablement issue. Don't run `CREATE EXTENSION` or recreate the reserved server to repair it. Save sanitized query output and correlation information for your preview contact.

## Discover packaged SQL extensions

PostgreSQL exposes extension control files through `pg_available_extensions`:

```sql
SELECT
    name AS extension_name,
    default_version,
    installed_version,
    comment
FROM pg_catalog.pg_available_extensions
ORDER BY name;
```

This result is discovery information, not an authorization list. Before you activate a customer-managed extension, confirm the released Fabric HorizonDB catalog for:

- The exact extension and package version.
- PostgreSQL compatibility.
- Your database profile, region, and milestone.
- The supported activation method.
- Required privileges and dependencies.
- Startup-preload behavior.
- Networking, identity, and data-access restrictions.
- Pause, resume, maintenance, and upgrade behavior.

Don't infer support from a package inventory or another managed PostgreSQL service's extension list.

## Activate a customer-managed extension

Only use `CREATE EXTENSION` when the released catalog identifies the component as a customer-activatable SQL extension and your role has the required permission. For example, the general PostgreSQL form is:

```sql
CREATE EXTENSION IF NOT EXISTS extension_name;
```

Replace `extension_name` only with an approved catalog entry. Some packaged components are modules, output plugins, or background workers rather than SQL extensions, so `CREATE EXTENSION` isn't a valid activation method for them.

If activation is rejected, don't attempt to change `shared_preload_libraries`, load an arbitrary library, or work around the service policy. Record the complete PostgreSQL error and verify the released catalog.

## Lifecycle behavior

Confirm supported activation and lifecycle behavior for each extension with your preview contact. Don't remove or replace service-managed extensions. You remain responsible for application compatibility, customer-owned objects, and query cost.

## Security guidance

- Connect as the database creator. Don't create custom login roles or memberships to bypass the current preview's identity restriction.
- Review whether an extension sends data to another service or opens an external connection.
- Don't place credentials in SQL definitions, query text, or support evidence.
- Treat AI integration availability separately from the presence of `azure_ai`.
- Treat foreign-data access separately from the presence of `pg_fabric_fdw`; the remote source still requires an approved identity and authorization.

## Related content

- [Query Fabric data from Fabric HorizonDB](query-fabric-data.md).
- [Use Fabric HorizonDB in AI applications](use-case-ai-application.md).
- [Security overview](security-overview.md).
