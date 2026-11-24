---
title: "Create reports from Microsoft Fabric HorizonDB data"
description: Build a Power BI semantic model and report from the SQL analytics endpoint for mirrored Fabric HorizonDB data.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: how-to
ai-usage: ai-assisted
---
# Create reports from Microsoft Fabric HorizonDB data

Fabric HorizonDB mirrors eligible operational tables to OneLake. Build Power BI reports from the read-only SQL analytics endpoint so that analytical queries don't compete with application queries on the PostgreSQL endpoint.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

Mirroring is asynchronous. Design reports to communicate data freshness when users require current operational values.

## Prerequisites

- A HorizonDB database with healthy mirroring.
- Eligible source tables with data.
- Read access to the SQL analytics endpoint and mirrored tables.
- Permission to create a semantic model and report in the workspace.

If you're using the sample articles, create the [sample schema and data](create-table.md) first.

Run PostgreSQL setup as the database creator, the only identity that can connect in the current preview. Report consumers use separately authorized analytical access; sharing a report doesn't enable PostgreSQL connections.

## Validate mirrored data

Before you create a semantic model:

1. Open the SQL analytics endpoint associated with the HorizonDB database.
1. Confirm that required tables appear.
1. Check mirroring status for the initial copy, lag, or reseed state.
1. Run a count and latest-timestamp query against the endpoint.
1. Compare the result with a stable PostgreSQL source query when freshness matters.

For a complete procedure, see [Query the SQL analytics endpoint](query-sql-analytics-endpoint.md).

## Create a semantic model

1. Open the SQL analytics endpoint.
1. Start the action to create a new Power BI semantic model.
1. Select only the mirrored tables required by the report.
1. Enter a descriptive model name.
1. Create the semantic model.
1. Review relationships, data types, and summarization behavior.
1. Rename technical columns only in the model so that the source contract remains stable.

When the experience offers Direct Lake for the selected source, it queries the OneLake analytical representation rather than the Fabric HorizonDB PostgreSQL endpoint.

## Define relationships and measures

For the `horizon_sample` data, relate customers to orders by `customer_id`. Create measures that match the report's business definitions.

For example:

```dax
Order count = COUNTROWS('orders')
```

```dax
Order total = SUM('orders'[total])
```

```dax
Latest source timestamp = MAX('orders'[created_at])
```

Display the latest source timestamp on freshness-sensitive report pages. It shows the newest source timestamp present in the model; it doesn't guarantee that mirroring has no lag.

## Create the report

1. From the semantic model, create a blank report.
1. Add a card for **Order total**.
1. Add a card for **Latest source timestamp**.
1. Add a chart that groups **Order total** by status.
1. Add a table with order reference, customer, date, status, and total.
1. Add filters appropriate for the business scenario.
1. Validate totals against a query on the SQL analytics endpoint.
1. Save the report in the workspace.

## Secure report data

Permissions on Fabric HorizonDB and permissions on the mirrored analytical copy are separate. Grant users only the semantic model, report, endpoint, and source permissions required by the chosen Power BI access pattern.

Don't assume PostgreSQL row or column grants are reproduced automatically on the analytical surface. Apply and test the required security in the semantic model or SQL analytics endpoint according to the released Fabric security features.

For more information, see [Secure mirrored Fabric HorizonDB data](mirroring-secure.md).

## Handle freshness and integration failures

- Show a source timestamp or batch timestamp when stale data could affect decisions.
- Define what the report displays when mirroring is delayed or a table is reseeding.
- Don't send reporting queries to PostgreSQL merely because mirroring is delayed.
- Investigate mirroring health separately from database health.
- Refresh model metadata deliberately after source schema changes.

## Next step

> [!div class="nextstepaction"]
> [Share analytical data](share-data.md)

## Related content

- [What is the SQL analytics endpoint?](sql-analytics-endpoint.md).
- [Monitor Fabric HorizonDB mirroring](mirroring-monitor.md).
- [Power BI semantic models](/power-bi/connect-data/service-datasets-understand).
- [Build reports in Power BI](/power-bi/create-reports/).
