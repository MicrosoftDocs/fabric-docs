---
title: "SQL analytics endpoint for Microsoft Fabric HorizonDB"
description: Learn about the read-only SQL analytics endpoint over mirrored Fabric HorizonDB data in Microsoft Fabric.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: concept-article
ai-usage: ai-assisted
---
# SQL analytics endpoint for Microsoft Fabric HorizonDB

Fabric HorizonDB uses mirroring to publish an analytical copy of eligible operational tables to OneLake. The **SQL analytics endpoint** is the read-only SQL query surface over that mirrored data.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

Use the SQL analytics endpoint for reporting, semantic models, and analytical queries that shouldn't run against the operational PostgreSQL workload. Use the PostgreSQL endpoint for application reads and writes, PostgreSQL administration, and transactions.

## How data becomes available

Mirroring has two stages:

1. An initial copy creates the analytical representation for eligible tables.
1. After the initial copy, committed changes are applied asynchronously.

The SQL analytics endpoint can be available while some tables are still initializing, behind the operational database, suspended, or being reseeded. Its availability and freshness are independent from HorizonDB database health.

## Read-only behavior

The SQL analytics endpoint doesn't write to Fabric HorizonDB. Use it to:

- Query mirrored tables.
- Build Power BI semantic models and reports.
- Combine mirrored data with supported Fabric analytical data.
- Give analytical users access without granting them application-write privileges.

Don't use the endpoint for PostgreSQL DDL, transactions, application writes, extension management, or operational freshness checks.

## Endpoint comparison

| Characteristic | PostgreSQL endpoint | SQL analytics endpoint |
|---|---|---|
| Primary workload | Operational applications | Analytics and reporting |
| Protocol and semantics | PostgreSQL | Fabric analytical SQL surface |
| Writes | Supported for customer-owned objects through the creator's PostgreSQL connection | Read-only for mirrored data |
| Data | Current operational database state | Asynchronous mirrored analytical copy |
| Availability | Fabric HorizonDB lifecycle and compute state | Mirroring and analytical endpoint state |
| Typical consumers | Applications, PostgreSQL clients, federation, Copy job destination | Power BI, SQL analytics tools, reports |

Connection strings, drivers, and SQL dialect expectations aren't interchangeable between the endpoints.

## Access and authorization

Access to Fabric HorizonDB and access to mirrored data are separate authorization boundaries. Grant only the Fabric item and data permissions required by each analytical consumer.

Only the database creator can connect to PostgreSQL in the current preview. That access doesn't establish permission to read the mirrored copy, and access to the SQL analytics endpoint doesn't enable an additional PostgreSQL identity.

For more information, see [Secure mirrored Fabric HorizonDB data](mirroring-secure.md).

## Freshness expectations

Mirroring is asynchronous. Don't describe the SQL analytics endpoint as synchronous, transactionally current, or guaranteed real time.

For freshness-sensitive reports:

- Display a source timestamp from the data.
- Check mirroring status before investigating the PostgreSQL database.
- Compare stable counts or high-water marks between the source and analytical copy.
- Define how the report behaves when data is stale or a table is reseeding.

## Unsupported or changing source objects

Mirroring eligibility depends on supported keys, data types, DDL, and limits. An ineligible table or column might not appear in the endpoint. A schema change might require metadata processing or a table reseed.

Check [mirroring limitations](mirroring-limitations.md) and [mirroring status](mirroring-monitor.md) before treating a missing analytical object as a database failure.

## Related content

- [Query the SQL analytics endpoint](query-sql-analytics-endpoint.md).
- [Mirroring overview](mirroring-overview.md).
- [Create reports from mirrored Fabric HorizonDB data](create-reports.md).
- [Query Fabric data from Fabric HorizonDB](query-fabric-data.md).
