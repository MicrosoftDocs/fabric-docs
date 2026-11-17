---
title: "Federated Analytics in Microsoft Fabric HorizonDB"
description: Learn how Federated Analytics connects operational and analytical data through database mirroring, federated queries, and data delivery.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: concept-article
ai-usage: ai-assisted
---
# Federated Analytics in Microsoft Fabric HorizonDB

Federated Analytics in Fabric HorizonDB connects your operational PostgreSQL data with analytical data in Microsoft Fabric. It includes three complementary capabilities:

- **Database mirroring** makes eligible HorizonDB database tables available for asynchronous analytics in OneLake and through a SQL analytics endpoint.
- **Federated queries** read supported Fabric data through read-only foreign tables provided by `pg_fabric_fdw`.
- **Data delivery** loads bounded Fabric results into HorizonDB database tables through Copy jobs and a PostgreSQL staging-and-publish pattern. Use this capability for reverse ETL scenarios.

Choose a capability based on data direction, freshness, query latency, and whether your application needs a local PostgreSQL copy. Each capability has a dedicated article with its requirements, limitations, and operational guidance.

Federated Analytics is the collective name for these capabilities, not a separate product. Use the short task labels **Mirroring**, **Query Fabric data**, and **Load Fabric data** when choosing a path.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. Database health and integration health are independent. A healthy HorizonDB database doesn't mean that mirroring is current, a federated source is reachable, or a Copy job succeeded. Monitor each path separately. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

## Compare the capabilities

| Capability | Data direction | Data location at query time | Best for | Freshness boundary |
|---|---|---|---|---|
| [Database mirroring](mirroring-overview.md) | HorizonDB database to Fabric | Mirrored analytical copy in OneLake | Reporting, semantic models, notebooks, and analytics that shouldn't run against the operational database | Asynchronous after an initial copy |
| [Federated queries](query-fabric-data.md) | Fabric to a query running in a HorizonDB database | Rows remain in the Fabric source | Selective joins between operational rows and supported Fabric SQL-compatible data | Read at query time, subject to remote availability |
| [Data delivery](load-fabric-data-copy-job.md) | Fabric to a HorizonDB database | Rows are loaded into PostgreSQL tables | Reusable scores, recommendations, summaries, and other operational state | Determined by the last successful load and publish step |

The paths can work together. For example, mirror orders to Fabric, calculate customer risk in a Fabric analytical workload, and load the bounded result back into Fabric HorizonDB for an application to use.

## Database mirroring

Mirroring performs an initial copy of eligible tables and then asynchronously applies committed changes. The mirrored representation is available in OneLake and through a read-only SQL analytics endpoint.

Use mirroring when:

- Analytical consumers need Fabric HorizonDB data without sending reporting queries to the PostgreSQL endpoint.
- You want to combine operational data with other Fabric data.
- Power BI or another analytical workload can tolerate asynchronous freshness.

Mirroring eligibility depends on supported keys, data types, schema changes, and item limits. A primary key is an important preparation step, but it doesn't by itself guarantee eligibility.

For details, see [Mirroring overview](mirroring-overview.md), [mirroring limitations](mirroring-limitations.md), and [monitor mirroring](mirroring-monitor.md).

## Federated queries

The service-managed `pg_fabric_fdw` extension exposes supported warehouses and SQL analytics endpoints as read-only PostgreSQL foreign tables. Applications stay connected to the PostgreSQL endpoint and use PostgreSQL SQL. The wrapper translates eligible operations into T-SQL and sends them to Fabric over a native Tabular Data Stream (TDS) connection.

Fabric can run filters, joins between eligible foreign tables, aggregates, sorting, and limits, returning only the results. PostgreSQL completes operations that stay local. Run `EXPLAIN (VERBOSE)` and inspect the `Fabric SQL` line to see what the wrapper plans to send to Fabric.

Use federation when:

- The query needs the data currently available at a supported Fabric source.
- The result is selective and doesn't need to be stored in Fabric HorizonDB.
- The application can tolerate a runtime dependency on the remote source.

`IMPORT FOREIGN SCHEMA` reads column names and type mappings from the remote catalog. It creates local metadata, not a local copy of remote rows. The default `fabric_dw` server targets the database's own mirrored SQL analytics endpoint. Register a separate warehouse with a customer-owned foreign server using its SQL connection details. Don't replace `fabric_dw`. The `database_name` option selects another reachable database; it doesn't discover arbitrary workspaces.

Keep queries bounded, and validate cross-engine behavior. Pushed operations use Fabric rules, which can differ for text collation, UUID ordering, integer averages, and other expressions. A planning guardrail can reject scans with excessive estimated transfers, but it doesn't replace selective queries.

For setup and examples, see [Query Fabric data from a HorizonDB database](query-fabric-data.md). For mappings, supported operations, and settings, see [Federated query reference](federated-query-reference.md).

## Data delivery

Data delivery uses a Copy job to load a bounded result from a supported Fabric source into a PostgreSQL target table. For operational state, load into a staging table, validate the batch, and publish it to an application-facing table with an idempotent PostgreSQL statement. This reverse ETL pattern makes analytical results available to operational applications.

The current preview uses the **Azure Database for PostgreSQL** destination connector with **Organizational account** authentication as the database creator, the HorizonDB PostgreSQL host, database `postgres`, and the **Full copy** read method. The destination is insert-oriented; perform upserts separately in PostgreSQL.

Use a Copy job when:

- Applications repeatedly read the same analytical result.
- Local PostgreSQL constraints, indexes, transactions, or predictable query latency are important.
- A batch freshness boundary is acceptable.

Public preview doesn't promise source change data capture, conflict resolution, source-delete propagation, automatic schema evolution, checkpoints, or replay for this path. Record batch metadata so that you can diagnose and safely rerun a load.

For a complete pattern, see [Deliver Fabric data to a HorizonDB database with a Copy job](load-fabric-data-copy-job.md).

## Choose an endpoint

Fabric HorizonDB has two distinct query surfaces:

- Use the **PostgreSQL endpoint** for application reads and writes, PostgreSQL administration, federated queries, and staging or publish operations.
- Use the **SQL analytics endpoint** for read-only queries over the mirrored analytical copy.

Don't direct application writes to the SQL analytics endpoint, and don't use analytical freshness as evidence of PostgreSQL database health.

## Design for independent failures

Plan for these conditions:

- Mirroring can lag or require a table reseed while PostgreSQL remains available.
- A federated query can fail because of remote permissions, capacity, schema, or connectivity while local queries succeed.
- A Copy job can fail or load partial staging data without affecting the serving table.
- The database can pause and later resume independently of the last known integration status.

Keep an integration timestamp or batch identifier with data that applications consume. Apply bounded retry only to safe operations, and don't automatically replay a PostgreSQL transaction after a connection interruption.

## Related content

- [What is the SQL analytics endpoint?](sql-analytics-endpoint.md).
- [Create reports from mirrored Fabric HorizonDB data](create-reports.md).
- [Use Fabric HorizonDB for translytical applications](use-case-translytical-applications.md).
- [Use Fabric HorizonDB for reverse ETL](use-case-reverse-etl.md).
