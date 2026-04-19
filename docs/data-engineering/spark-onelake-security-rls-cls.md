---
title: Spark support for OneLake security row-level and column-level security
description: Learn how Fabric Spark enforces OneLake security row-level (RLS) and column-level (CLS) policies and prepares filtered data for users in notebooks and Spark jobs.
ms.reviewer: tvilutis
ms.topic: concept-article
ms.custom:
  - best-spark-on-azure
ms.date: 04/18/2026
ms.search.form: Spark OneLake Security RLS CLS
---

# Spark support for OneLake security (RLS and CLS)

Fabric Spark integrates with [OneLake security (preview)](../onelake/security/get-started-onelake-security.md) so that row-level security (RLS) and column-level security (CLS) policies defined once in OneLake are consistently enforced when users read lakehouse Delta tables from Spark notebooks and Spark job definitions. Users continue to write standard Spark SQL or DataFrame queries; Spark transparently filters the result so each user sees only the rows and columns they're authorized to access.

This article explains *how* Spark works with OneLake security, including the enforcement architecture, the data preparation flow, the user experience, and the supported scenarios and limits.

> [!NOTE]
> OneLake security RLS and CLS are in preview. For policy authoring and the cross-engine model, see [Row-level security in OneLake](../onelake/security/row-level-security.md) and [Column-level security in OneLake](../onelake/security/column-level-security.md).

## Concepts at a glance

* **Single source of truth.** RLS predicates and CLS column lists are defined once on the lakehouse via OneLake security roles. Spark doesn't store or duplicate the policy.
* **Engine-agnostic effective access.** OneLake returns the precomputed *effective access* (allowed columns and the row predicate) for the requesting user. Spark consumes that effective access at query time.
* **Delta-only filtering.** RLS and CLS rules are filtered for Delta parquet tables. Non-Delta objects with rules applied are blocked rather than filtered.
* **Privileged roles bypass.** Workspace **Admin**, **Member**, and **Contributor** roles aren't restricted by RLS or CLS. Filtering applies to **Viewer** and to users granted access through OneLake security roles.

:::image type="content" source="./media/spark-onelake-security-rls-cls/onelake-security-overview.png" alt-text="Diagram placeholder: OneLake security as a shared policy layer enforced by Fabric Spark, SQL analytics endpoint, and authorized third-party engines.":::

<!-- TODO illustration: OneLake security overview - policy authored once, enforced across engines. -->

## How Spark enforces OneLake security

When a user submits a query that touches a secured lakehouse table, Spark prepares an execution plan that combines the user's query with the OneLake security effective access for that user. Enforcement happens *during* execution, not as a post-filter step in user code, so it can't be bypassed by alternate APIs or path-based reads.

### Two-context execution model

Fabric Spark uses two execution contexts to keep policy evaluation isolated from user code:

* **User context.** Runs the user's notebook or Spark job definition with the user's identity. This context plans the query and consumes the filtered output, but it never has direct, unfiltered access to secured tables.
* **System (security) context.** A privileged, Microsoft-managed context that resolves the user's effective access against OneLake, reads the underlying Delta files, applies RLS predicates and CLS projections, and returns only the rows and columns the user is allowed to see.

The system context shows up in the **Monitoring hub** as `SparkSecurityControl` jobs that run alongside the user's notebook session. These jobs are expected and indicate that OneLake security enforcement is active.

:::image type="content" source="./media/spark-onelake-security-rls-cls/spark-rls-cls-architecture.png" alt-text="Diagram placeholder: Spark user context and system security context cooperating to enforce OneLake RLS and CLS policies on Delta tables.":::

<!-- TODO illustration: Two-context architecture (user context, system security context, OneLake policy store, Delta storage). -->

### Query flow for a secured table

1. The user runs a query in a Spark notebook, for example `SELECT * FROM lakehouse.sales`.
2. Spark resolves the table through the lakehouse catalog and detects that OneLake security is enabled.
3. Spark requests the **effective access** for the current user from OneLake. The response includes the allowed column list (CLS) and the row predicate (RLS).
4. The system security context reads the Delta files, projects only the allowed columns, and applies the RLS `WHERE` predicate.
5. The filtered result is handed back to the user context, which completes the rest of the user's query (joins, aggregations, writes to non-secured targets, and so on) over the already-filtered data.

:::image type="content" source="./media/spark-onelake-security-rls-cls/spark-query-flow.png" alt-text="Sequence diagram placeholder: Spark query flow showing effective access lookup, system-context filtering, and result delivery to the user context.":::

<!-- TODO illustration: Sequence diagram of query flow, including effective access call to OneLake. -->

### What happens for each policy type

| Policy | What Spark returns | Notes |
|---|---|---|
| **RLS only** | All columns, but only the rows allowed by the predicate. | The predicate is enforced server-side; users can't observe the filter logic. |
| **CLS only** | Only the allowed columns; all rows. | `SELECT *` succeeds and returns the allowed columns instead of erroring. |
| **RLS + CLS in same role** | Allowed rows projected to allowed columns. | Supported as long as both rules belong to the *same* role. |
| **RLS in role A, CLS in role B (same user)** | Query fails. | A user that is a member of two roles where one defines RLS and the other defines CLS isn't supported. See [Row-level security](../onelake/security/row-level-security.md) and [Column-level security](../onelake/security/column-level-security.md). |
| **Non-Delta object** | Access blocked. | RLS/CLS can be filtered only for Delta parquet tables; other objects in a secured role are blocked. |

For the canonical authoring rules and predicate syntax, see the [row-level security](../onelake/security/row-level-security.md#define-row-level-security-rules) and [column-level security](../onelake/security/column-level-security.md#define-column-level-security-rules) articles.

## How Spark prepares data for users

OneLake security is designed to be transparent to the data consumer. Users continue to use the APIs they already know, and Spark handles policy resolution and filtering on their behalf.

### Spark SQL

```sql
-- Returns only rows and columns the current user is authorized to see.
SELECT product_category, SUM(amount) AS total
FROM sales.transactions
GROUP BY product_category;
```

### PySpark DataFrame

```python
df = spark.read.table("sales.transactions")
df.filter("region = 'EMEA'").groupBy("product_category").sum("amount").show()
```

In both examples, the `transactions` table data that's loaded into the DataFrame is already filtered by OneLake security. Subsequent transformations operate over the filtered data only.

### Lakehouse explorer preview

The lakehouse explorer preview also honors OneLake security and shows the filtered view of secured tables when previewing data through Spark. Users see only the rows and columns granted to them by their OneLake security role.

:::image type="content" source="./media/spark-onelake-security-rls-cls/notebook-filtered-result.png" alt-text="Screenshot placeholder: Spark notebook output showing filtered rows and a reduced column set for a user assigned an RLS+CLS role.":::

<!-- TODO illustration: Notebook screenshot showing filtered output for a non-privileged user. -->

### Direct file access is blocked

Spark APIs that bypass the lakehouse catalog and read Delta files directly by storage path can't enforce OneLake security. When OneLake security is enabled on a table, the following patterns are **blocked** for non-privileged users:

* `spark.read.format("delta").load("abfss://...")`
* `DeltaTable.forPath(spark, "abfss://...")`
* OneLake REST/SDK reads against the `Tables/<table>` folder of a secured table.

Users must access secured tables through the lakehouse table name (for example `spark.read.table("lakehouse.table")` or Spark SQL) so that Spark can resolve and apply the effective access.

## User experience

* **Transparent filtering.** No query rewriting or special syntax is required. The same notebook works for users with different roles and returns role-specific data.
* **Consistent results across engines.** The same RLS predicate and CLS projection that's applied in Spark is also applied in the SQL analytics endpoint, semantic models built on Direct Lake, and authorized third-party engines. See [OneLake security integrations overview](../onelake/security/onelake-security-integrations-overview.md).
* **Privileged roles see everything.** Workspace **Admin**, **Member**, and **Contributor** users continue to see unfiltered data, which is useful for pipeline development, table maintenance (`OPTIMIZE`, `VACUUM`), and troubleshooting.
* **Monitoring.** The `SparkSecurityControl` jobs that show up in the Monitoring hub correspond to the system context that performs policy enforcement. They're part of normal operation.

:::image type="content" source="./media/spark-onelake-security-rls-cls/monitoring-hub-security-control.png" alt-text="Screenshot placeholder: Monitoring hub showing a SparkSecurityControl job alongside the user's notebook session.":::

<!-- TODO illustration: Monitoring hub showing SparkSecurityControl job. -->

## Performance considerations

* **Predicate pushdown.** RLS predicates are pushed into the scan and, where supported, into the Native Execution Engine so that filtering happens close to the data, minimizing the rows that materialize in the user context.
* **Column pruning.** CLS column lists are combined with the user's projection. Only the intersection is read from Delta storage.
* **Effective access caching.** Spark caches the per-user effective access for the lifetime of the session. Policy changes are picked up on subsequent sessions; long-running sessions might need to be restarted to observe updates.
* **Partition and statistics use.** Standard Delta partition pruning and data skipping continue to apply on top of the RLS predicate, so queries against partitioned tables remain efficient.

## Supported scenarios

* Reading lakehouse Delta tables in Spark notebooks and Spark job definitions through the lakehouse catalog (`<lakehouse>.<table>`).
* Spark SQL and PySpark/Scala DataFrame APIs against secured tables.
* Joins, aggregations, and downstream transformations on secured tables. Output tables that are written outside the secured lakehouse contain only the data the writing user was allowed to read.
* Cross-workspace lakehouse access through shortcuts, where the source lakehouse has OneLake security enabled.

## Limitations

OneLake security RLS and CLS in Spark inherit the [overall OneLake security limitations](../onelake/security/get-started-onelake-security.md). Notable Spark-specific behaviors:

* RLS and CLS rules are filtered only for **Delta parquet** tables. Non-Delta objects in a secured role are blocked.
* Direct path reads (`abfss://`, `DeltaTable.forPath`) against secured tables are blocked for non-privileged users.
* A user that's a member of two roles where one defines RLS and the other defines CLS can't query the affected tables.
* Workspace **Admin**, **Member**, and **Contributor** roles bypass RLS and CLS.
* Writes (INSERT/UPDATE/DELETE/MERGE) to a table that has RLS or CLS applied to the writing user aren't supported. Use a privileged identity for ETL writes into secured tables.

## Related content

* [Get started with OneLake security](../onelake/security/get-started-onelake-security.md)
* [Row-level security in OneLake](../onelake/security/row-level-security.md)
* [Column-level security in OneLake](../onelake/security/column-level-security.md)
* [OneLake security integrations overview](../onelake/security/onelake-security-integrations-overview.md)
* [Workspace roles for lakehouse](workspace-roles-lakehouse.md)
* [Lakehouse sharing and permission management](lakehouse-sharing.md)
* [Fabric Spark security](spark-best-practices-security.md)
