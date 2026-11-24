---
title: "Use Microsoft Fabric HorizonDB as an operational data store"
description: Design a managed PostgreSQL operational data store with Fabric HorizonDB and Microsoft Fabric analytics integration.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: solution-overview
ai-usage: ai-assisted
---
# Use Microsoft Fabric HorizonDB as an operational data store

Fabric HorizonDB can serve as an operational data store (ODS) for integrated, current business data that applications, APIs, and operational processes query through PostgreSQL.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

An ODS is usually a lightly curated relational layer between source systems and analytical stores. It isn't a replacement for every source transaction system or for a dimensional warehouse.

## Why use Fabric HorizonDB

Fabric HorizonDB provides:

- A stable PostgreSQL endpoint and service-managed PostgreSQL.
- Microsoft Entra authentication.
- Relational constraints, transactions, and indexes.
- Platform-managed autoscaling that responds to workload demand.
- Durable service-managed storage separated from compute.
- Automatic idle pause where scale to zero is enabled for your preview.
- Mirroring to OneLake and a SQL analytics endpoint.
- Read-only federation to supported Fabric SQL-compatible data.
- Bounded Copy job loading from Fabric into PostgreSQL.

These capabilities let you keep operational serving concerns in PostgreSQL while moving reporting and broad analytics to Fabric.

Use a dedicated test workspace and synthetic data for preview evaluation. Only the database creator's Microsoft Entra identity can connect to PostgreSQL; additional users, service principals, and managed identities can't connect in the current preview.

## Reference architecture

Use four logical layers:

1. **Landing** receives bounded source batches.
1. **Validation** checks keys, nulls, ranges, duplicates, and source timestamps.
1. **Serving** exposes normalized application-facing tables and views.
1. **Analytics** consumes mirrored serving data through the SQL analytics endpoint.

For analytical results that need to become operational state, use a Copy job into landing or staging and an idempotent PostgreSQL publish transaction.

## Model the serving layer

- Use stable natural or surrogate keys.
- Enforce referential integrity with foreign keys where appropriate.
- Use `NOT NULL`, `CHECK`, and unique constraints for critical rules.
- Keep source identifiers and source update timestamps.
- Record batch or event provenance.
- Index measured application query patterns.
- Keep analytical history in Fabric when it isn't needed for operational serving.

## Ingest data safely

During public preview, use the [data delivery](load-fabric-data-copy-job.md) capability of Federated Analytics to load Fabric data into a HorizonDB database.

1. Load a bounded dataset into staging.
1. Record a batch identifier and source timestamp.
1. Validate the batch.
1. Publish in a short PostgreSQL transaction.
1. Make the publish step idempotent.
1. Define explicit deletion semantics.
1. Preserve enough evidence to diagnose or replay a failed batch.

Don't promise automatic source change data capture, delete propagation, conflict handling, or schema evolution for this path.

## Separate operational and analytical work

Mirror eligible ODS tables to Fabric and direct Power BI, semantic models, and broad analytical queries to the SQL analytics endpoint.

The mirrored copy is asynchronous. Applications that require current transactional state must use the PostgreSQL endpoint. Reports should display a source timestamp when freshness matters.

## Design for pause and reconnect

An idle HorizonDB database can pause. The first authorized, otherwise eligible connection resumes it through the same logical endpoint.

Applications should:

- Use connection pooling with health checks.
- Reconnect with bounded retry.
- Keep transactions short.
- Avoid automatically replaying an uncertain write transaction.
- Treat temporary tables, sessions, and volatile cache state as non-durable.

## Security

- Connect as the database creator, and authorize each Fabric source separately.
- Don't use SQL login roles or item sharing to bypass the creator-only restriction.
- Use application-facing views to organize queries, not to promise multiuser isolation.
- Apply analytical security separately to mirrored data.
- Don't place credentials in ODS tables or batch metadata.

## Monitor independent components

Track:

- Fabric HorizonDB readiness, scaling, pause, and resume.
- PostgreSQL sessions, locks, and query behavior.
- Copy job runs and staging validation.
- Mirroring initial copy, lag, suspended state, and reseed.
- SQL analytics endpoint, semantic model, report, and application health.

A failure in one integration shouldn't cause the database to be reported as unhealthy when operational queries continue to succeed.

## Related content

- [Use Fabric HorizonDB for reverse ETL](use-case-reverse-etl.md).
- [Use Fabric HorizonDB for translytical applications](use-case-translytical-applications.md).
- [Use Fabric HorizonDB in AI applications](use-case-ai-application.md).
- [Monitor Fabric HorizonDB](monitor.md).
