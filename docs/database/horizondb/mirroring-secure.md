---
title: "Secure mirrored Microsoft Fabric HorizonDB data"
description: Apply least-privilege access to Fabric HorizonDB mirrored data, the SQL analytics endpoint, semantic models, and reports.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: how-to
ai-usage: ai-assisted
---
# Secure mirrored Microsoft Fabric HorizonDB data

Fabric HorizonDB uses Microsoft Entra identity and Fabric authorization for mirroring and analytical access. The operational PostgreSQL database and its mirrored analytical copy are separate security boundaries.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

HorizonDB database claims don't automatically define access through the SQL analytics endpoint. Configure and test security for each surface that exposes the data.

## Identify the access surfaces

Review access to:

- The HorizonDB database.
- The PostgreSQL endpoint and effective database access.
- The mirroring relationship and status.
- The SQL analytics endpoint.
- OneLake data exposed by the integration.
- Power BI semantic models and reports.

Sharing one item doesn't grant PostgreSQL superuser access and must not silently switch an integration to another identity.

## Apply least privilege

1. Identify the tables and columns required by each analytical workload.
1. Remove or transform sensitive fields before mirroring when the released eligibility and analytical design allow it.
1. Grant read access only to the SQL analytics endpoint objects required by the consumer.
1. Use groups or roles instead of repeated individual assignments.
1. Restrict semantic-model and report sharing to intended audiences.
1. Test access with representative users, not only workspace administrators.
1. Revalidate access after schema, item, or workspace-role changes.

## Separate PostgreSQL and analytical authorization

Only the Microsoft Entra identity that created the database can connect to PostgreSQL in the current preview. Sharing the item doesn't enable additional operational users, service principals, or managed identities.

That restriction doesn't configure the SQL analytics endpoint. Apply and validate Fabric analytical permissions separately. Don't assume that PostgreSQL access controls are reproduced automatically on the analytical surface.

## Protect sensitive data

Before analytical publication:

- Classify sensitive columns.
- Confirm whether the table and column should be mirrored.
- Minimize data exposed to semantic models, reports, and exports.
- Avoid embedding secrets, tokens, or credentials in source rows or metadata.
- Validate that downstream exports and sharing match organizational policy.

Don't assume a multiuser PostgreSQL row-filter or column-grant model is available. Apply analytical security independently on the SQL analytics endpoint, semantic model, and report.

## Handle identity failures

Integration identity has desired configuration and last successfully applied state. If authorization expires or is removed:

- Mirroring can fail while PostgreSQL remains healthy.
- The integration must not fall back to an unrelated identity.
- Existing downstream items can remain present but stale or disconnected.

Check mirroring and downstream item status after permission changes.

## Delete safely

Before deleting a database, identify dependent analytical copies, semantic models, reports, foreign-table metadata, and Copy jobs. Customer-owned downstream items can require separate cleanup and authorization.

## Related content

- [Security overview](security-overview.md).
- [Authentication](authentication.md).
- [Authorization](authorization.md).
- [Item permissions and database access](share-manage-permissions.md).
- [Mirroring overview](mirroring-overview.md).
