---
title: Read data secured with OneLake security
description: Learn which engines can read data secured with OneLake security and the requirements for accessing tables that use row-level and column-level security.
ms.reviewer: aamerril
ms.topic: how-to
ms.date: 08/28/2026
ai-usage: ai-assisted
#customer intent: As a data consumer, I want to understand how to read tables secured with OneLake security so that I can query the data I'm allowed to see.
---

# Read data secured with OneLake security

When you apply [row-level security (RLS)](./table-column-row-security.md#row-level-security) or [column-level security (CLS)](./table-column-row-security.md#column-level-security) to a table in OneLake, whether and how you can read the data depends on the engine you use to query it. This article describes which engines can read secured data, the requirements for each engine, and the enforcement behavior you can expect as a data consumer.

To learn how to define security rules, see [Create and manage OneLake security roles](./create-manage-roles.md). For the underlying concepts, see [Table, column, and row-level security in OneLake](./table-column-row-security.md).

## Engines that can read secured data

Fabric engines can read tables that have RLS or CLS rules applied. Data access to OneLake happens in one of two ways:

* **Through a query engine:** Fabric engines and [authorized third-party engines](./onelake-security-integrations-overview.md) apply RLS and CLS filtering, so you see only the rows and columns you're allowed to see.
* **Through user access:** Queries from nonauthorized external engines are treated as user access. If you aren't permitted to see all the rows or columns in a table, the query is blocked.

The following table lists which engines support RLS and CLS filtering:

| Engine | RLS/CLS filtering | Status |
| --- | --- | --- |
| Eventhouse | RLS only | Public preview |
| Graph in Fabric | Yes | GA |
| Lakehouse | Yes | GA |
| [Semantic models using Direct Lake on OneLake mode](../../fundamentals/direct-lake-develop.md) | Yes | GA |
| [Spark notebooks](../../data-engineering/spark-onelake-security.md) | Yes | GA |
| [SQL analytics endpoint in **user's identity access mode**](./sql-analytics-endpoint-onelake-security.md#change-the-onelake-access-mode) | Yes | GA |
| [Authorized third-party engines](./onelake-security-integrations-overview.md) | Yes (when the engine implements it) | Public preview |

## Engine-specific requirements

Some engines require extra configuration before they can read secured data:

* **SQL analytics endpoint:** [Change the SQL analytics endpoint to user's identity access mode](./sql-analytics-endpoint-onelake-security.md#change-the-onelake-access-mode) so it can read secured data.
* **Semantic models:** The semantic model must use [Direct Lake on OneLake](../../fundamentals/direct-lake-develop.md).
* **Authorized third-party engines:** The engine must be configured as an [authorized engine](./onelake-security-integrations-overview.md) to enforce OneLake security at query time.

## Access data from authorized third-party engines

Authorized third-party engines retrieve effective access for a user from OneLake by using the [authorized engine APIs](./onelake-security-integrations-overview.md) and enforce RLS and CLS at query time. OneLake returns engine-agnostic, precomputed effective access for the requesting user, and the engine enforces the policies in its own compute layer. OneLake remains the single source of truth, so security definitions authored in OneLake are applied consistently across Fabric engines and authorized external engines.

For more information, see [Integrate a third-party engine with OneLake security](./onelake-security-integrations-external-engines.md).

## Related content

* [Table, column, and row-level security in OneLake](./table-column-row-security.md)
* [Create and manage OneLake security roles](./create-manage-roles.md)
* [How OneLake security controls data access](./data-access-control-model.md)
* [OneLake security integrations overview](./onelake-security-integrations-overview.md)
