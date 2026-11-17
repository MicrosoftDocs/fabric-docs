---
title: "Share analytical data from Fabric HorizonDB"
description: Share mirrored analytical results without assuming that item sharing grants PostgreSQL connection access.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: how-to
ms.search.form: Fabric HorizonDB share data, PostgreSQL data access
ai-usage: ai-assisted
---
# Share analytical data from Fabric HorizonDB

Use the mirrored analytical copy to share Fabric HorizonDB results through supported Fabric analytical experiences. Operational PostgreSQL access remains restricted to the database creator.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Only the Microsoft Entra identity that created the database can connect to PostgreSQL. Sharing the database item doesn't enable another user or principal to connect. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

## Prerequisites

- Healthy mirroring and the analytical item you intend to share.
- Permission to manage access to that SQL analytics endpoint, semantic model, or report.
- A clear list of the data and operations the recipient needs.

## Choose the analytical surface

1. Confirm that the initial mirroring copy has completed for the required tables.
1. Open the associated SQL analytics endpoint.
1. Choose whether the recipient needs endpoint access or only a semantic model or report.
1. Grant the minimum permissions supported by that analytical experience.
1. Review the resulting access list.

For the distinction between item permissions and PostgreSQL access, see [Item permissions and database access](share-manage-permissions.md).

## Validate analytical access

Have the recipient use their own identity to open the shared analytical item. For endpoint access, run a read-only query such as:

```sql
SELECT
    customer.customer_name,
    COUNT(order_row.order_id) AS order_count
FROM horizon_sample.customers AS customer
LEFT JOIN horizon_sample.orders AS order_row
  ON order_row.customer_id = customer.customer_id
GROUP BY customer.customer_id, customer.customer_name
ORDER BY customer.customer_name;
```

Use the schema name displayed by the SQL analytics endpoint if it differs from `horizon_sample`. For a report, validate the visible rows and totals against the intended audience. Mirroring is asynchronous, so communicate freshness.

Don't give the recipient the creator's credentials, and don't create PostgreSQL login roles to bypass the preview restriction.

## Revoke shared access

1. Remove access from the shared analytical item and any other permission path that grants the same access.
1. Have the recipient reopen the analytical experience.
1. Confirm that the intended analytical access is denied.

Review endpoint, semantic-model, report, and workspace permissions separately. Don't treat an analytical permission change as a PostgreSQL session-termination mechanism.

## Related content

- [Item permissions and database access](share-manage-permissions.md).
- [Validate PostgreSQL access](configure-postgresql-access-controls.md).
- [Authorization](authorization.md).
- [Security overview](security-overview.md).
