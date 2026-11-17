---
title: "Use Microsoft Fabric HorizonDB for reverse ETL"
description: Operationalize bounded Microsoft Fabric analytical results in Fabric HorizonDB with Copy jobs, staging, validation, and PostgreSQL upserts.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: solution-overview
ai-usage: ai-assisted
---
# Use Microsoft Fabric HorizonDB for reverse ETL

Use the [data delivery](load-fabric-data-copy-job.md) capability of Federated Analytics in Fabric HorizonDB to receive bounded analytical results from Microsoft Fabric through a Copy job. This reverse ETL pattern makes selected scores, recommendations, classifications, summaries, or priorities available to applications as indexed PostgreSQL data.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

The analytical source remains the system that calculates the result. Fabric HorizonDB becomes the operational serving store for the published state.

## Good reverse ETL candidates

- Customer risk, propensity, or health scores.
- Product and content recommendations.
- Inventory and replenishment priorities.
- Fraud or anomaly classifications.
- Account summaries.
- Compact feature tables reused by application requests.

Avoid copying broad analytical history into Fabric HorizonDB when a selective federated query or the SQL analytics endpoint meets the requirement.

## Reference flow

1. Fabric produces a bounded result with stable business keys and calculation timestamps.
1. A Copy job inserts the result into a Fabric HorizonDB staging table.
1. PostgreSQL validation checks completeness and data quality.
1. A publish transaction upserts the latest valid row per key into a serving table.
1. Applications read the local serving table.
1. Mirroring can publish the operationalized result back to Fabric for analysis.

Copy job health, publish health, mirroring health, and database health are separate.

In the current preview, select **Azure Database for PostgreSQL** as the Copy job destination, use the HorizonDB host and database `postgres`, and choose **Organizational account** authentication as the database creator. Select **Full copy** for a bounded snapshot. The insert-oriented destination doesn't perform the PostgreSQL publish upsert.

Use a separate warehouse for a writable analytical source table; the mirrored SQL analytics endpoint is read-only. Only the creator can connect to the PostgreSQL destination in the current preview.

## Design the source contract

Every row should include:

- A stable business key.
- A calculation or source-update timestamp.
- A source batch identifier.
- The derived value and its units or scale.
- Model or rule version when applicable.
- An explicit deletion or expiration signal if the business process needs one.

Define whether a later timestamp always wins and how ties are resolved.

## Use staging and serving schemas

Create a staging table that accepts the Copy job's insert-oriented output. Keep application constraints and indexes on the serving table.

For example:

```sql
CREATE SCHEMA IF NOT EXISTS reverse_etl;

CREATE TABLE IF NOT EXISTS reverse_etl.recommendation_stage (
    customer_id bigint NOT NULL,
    product_code text NOT NULL,
    score numeric(9, 6) NOT NULL,
    calculated_at timestamptz NOT NULL,
    source_batch_id text NOT NULL,
    loaded_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reverse_etl.recommendation (
    customer_id bigint NOT NULL,
    product_code text NOT NULL,
    score numeric(9, 6) NOT NULL,
    calculated_at timestamptz NOT NULL,
    source_batch_id text NOT NULL,
    loaded_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (customer_id, product_code)
);
```

## Validate before publishing

Check:

- Expected and actual row counts.
- Duplicate business keys.
- Null required values.
- Valid ranges.
- Source timestamp bounds.
- Referential integrity to operational entities.
- One expected batch identifier.

Quarantine or reject invalid rows. Don't partially update application-facing tables unless the business contract explicitly supports partial publication.

## Publish idempotently

Use `INSERT ... ON CONFLICT` so that a batch can be safely retried:

```sql
INSERT INTO reverse_etl.recommendation (
    customer_id,
    product_code,
    score,
    calculated_at,
    source_batch_id,
    loaded_at
)
SELECT DISTINCT ON (
    stage.customer_id,
    stage.product_code
)
    stage.customer_id,
    stage.product_code,
    stage.score,
    stage.calculated_at,
    stage.source_batch_id,
    now()
FROM reverse_etl.recommendation_stage AS stage
WHERE stage.source_batch_id = '<batch-id>'
ORDER BY
    stage.customer_id,
    stage.product_code,
    stage.calculated_at DESC,
    stage.loaded_at DESC
ON CONFLICT (customer_id, product_code) DO UPDATE
SET
    score = EXCLUDED.score,
    calculated_at = EXCLUDED.calculated_at,
    source_batch_id = EXCLUDED.source_batch_id,
    loaded_at = EXCLUDED.loaded_at
WHERE reverse_etl.recommendation.calculated_at <= EXCLUDED.calculated_at;
```

Run the publish step in a transaction with any related validation or control-table update.

## Define deletion and expiration

Public preview doesn't promise source-delete propagation. Choose an explicit policy:

- Keep the last known value.
- Expire values after a defined business interval.
- Publish a deletion marker.
- Reconcile against a complete authoritative snapshot in a separately reviewed transaction.

Don't delete serving rows merely because they are absent from an incremental source result.

## Serve applications

Applications query local PostgreSQL tables without a remote dependency at request time. Add indexes for measured access patterns and expose narrow views or APIs.

Compared with [`pg_fabric_fdw` federation](query-fabric-data.md), this pattern provides local transactional behavior and predictable query locality, but freshness depends on the last successful Copy job and publish step.

## Operate the process

- Record Copy job run ID, source batch, rows read, rows written, validation outcome, and publish time.
- Make retries bounded and idempotent.
- Keep staging evidence until the batch is accepted.
- Coordinate schema changes across source, mapping, staging, serving, and consumers.
- Alert on stale published timestamps, not only failed Copy job runs.

For implementation steps, see [Load Fabric data into Fabric HorizonDB with a Copy job](load-fabric-data-copy-job.md).

## Related content

- [Use Fabric HorizonDB as an operational data store](use-case-operational-data-store.md).
- [Use Fabric HorizonDB for translytical applications](use-case-translytical-applications.md).
- [Federated Analytics overview](federated-analytics-overview.md).
