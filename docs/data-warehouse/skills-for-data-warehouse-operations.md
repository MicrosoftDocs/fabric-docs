---
title: Data Warehouse operations skill for Fabric
description: Learn how to use the Data Warehouse operations capability of sqldw-cli to diagnose warehouse health, query performance, capacity spikes, and cluster-key candidates.
ms.reviewer: mariyaali
ms.date: 09/29/2026
ms.topic: concept-article
ms.search.form: skills, AI, agents, monitoring, query performance
ai-usage: ai-assisted
---
# Warehouse operations skill sqldw-cli

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

The Fabric Data Warehouse operations capability of the `sqldw-cli` skill is part of Skills for Fabric. For installation, supported tools, and general usage, see [Skills for Fabric overview](../fundamentals/skills-for-fabric-overview.md). Use the skill from a compatible AI coding tool to investigate a warehouse or lakehouse SQL analytics endpoint with bounded, read-only diagnostics.

To get started using `sqldw-cli`, describe the problem in natural language. The operations capability selects the relevant diagnostics, runs them with your existing Fabric permissions, and returns evidence-based recommendations without changing data, schema, or configuration. The separate `sqldw-cli` authoring capability can make changes when you request them.

## Prerequisites

- [Install Skills for Fabric](../fundamentals/skills-for-fabric-install.md).
- Register the Fabric SQL endpoint MCP server if your installation doesn't configure it.
- You need to be a member of the Contributor workspace role or higher to read Query Insights and view complete query text.
- Provide the workspace and warehouse or SQL analytics endpoint name.
- Install the [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md#install-the-app) for capacity investigations.
- Use `VIEW DEFINITION` on a lakehouse SQL analytics endpoint for table-health analysis.

## Supported diagnostics

| Diagnostic | What it helps you do |
|---|---|
| `failure-analysis` | Separate failures from cancellations, identify affected workloads, and resolve failed engine codes. |
| `resource-consumers` | Find expensive query patterns across successful requests, distinguish higher execution volume from increased per-run cost, and report distributed execution separately. |
| `capacity-metrics-correlation` | Identify a costly warehouse or SQL analytics endpoint, then analyze Query Insights requests in the same time window. |
| `pool-pressure` | Correlate SQL pool pressure intervals with overlapping requests and workload costs. |
| `cluster-key-assessment` | Assess cluster-key candidates from recurring high-scan `WHERE` filters, column cardinality, and data types. Existing Data Clustering remains unverified unless you provide table DDL or a warehouse project definition. |
| `lakehouse-health` | Check lakehouse tables for file-count, deleted-row, and checkpoint issues. |
| `query-reference` | Select the supported system views and procedures for the requested analysis. |
| `scenarios` | Combine diagnostics for broad warehouse health questions, slowdowns, regressions, and capacity spikes. |

The skill reruns diagnostics for each request, treats zero rows as valid evidence, and identifies the source of reported measurements.

## Use the operations skill

1. Open a terminal in your project or working folder.
1. Type `Copilot` and select `Enter`. GitHub Copilot launches.
1. To authenticate with the Microsoft identity that has access to the target Fabric workspace, type `az login` and follow the steps.

## Example prompts

Include the time range in UTC when possible.

```copilot-prompt
Tell me what's wrong with <workspace>/<warehouse>. Check the last
24 hours and rank the supported findings by impact.
```

```copilot-prompt
Analyze failed and canceled queries in <workspace>/<warehouse> 
during the last 24 hours. Identify affected users, applications, and query patterns.
```

```copilot-prompt
Use the Fabric Capacity Metrics app to investigate the capacity 
spike from 14:00 to 15:00 UTC. If a warehouse caused it, identify 
the expensive users, applications, and query patterns.
```

```copilot-prompt
Assess whether recurring workloads in <warehouse> are candidates for custom
SQL pools based on the last 30 days. Use read-only diagnostics.
```

```copilot-prompt
Identify cluster-key candidates for <workspace>/<warehouse> based on recurring
high-scan query patterns and WHERE filters from the last 30 days.
```

## Understand the response

The skill organizes results into five sections:

| Section | What it contains |
|---|---|
| **Diagnosis** | The conclusion supported by the diagnostics. |
| **Evidence** | Measurements and their source views or procedures. |
| **Ruled out** | Tested explanations that the evidence doesn't support. |
| **Recommendations** | Actions tied to the observed evidence. |
| **Follow-ups** | What to do next and what to measure again. |

An overlap between a pressure interval and a request supports correlation, not causation. The skill compares CPU, elapsed time, and storage scans before it identifies a likely workload contributor.

The operations capability doesn't perform lakehouse maintenance, configure custom SQL pools, or implement cluster keys. It can identify a stable application classifier and recommend a custom pool pilot when historical requests show repeated contention. It can also recommend up to four cluster-key columns when recurring query filters, remote scans, column metadata, and cardinality support the change. Existing Data Clustering remains unverified unless you provide table DDL or a warehouse project definition.

## Correlate capacity and SQL activity

Capacity Metrics models can expose timestamped data, fixed windows, or broader totals. The skill reports the timeframe supported by the installed model. It doesn't present a fixed-window result as an exact arbitrary interval.

When the model identifies a costly warehouse or SQL analytics endpoint, the skill analyzes Query Insights requests that overlap the same time window.

For an identified warehouse, you can request a separate cluster-key assessment based on a broader historical interval. The skill reports that interval separately and doesn't use historical tuning evidence to claim what caused the capacity incident. Cluster-key assessment doesn't require a custom SQL pool assessment.

> [!IMPORTANT]
> A Capacity Metrics operation identifier isn't the same as Query Insights `distributed_statement_id`. The skill doesn't join these fields. It correlates the resolved warehouse or SQL analytics endpoint and the overlapping time range.

Capacity unit seconds and Query Insights CPU milliseconds are different measurements. The skill doesn't convert one into the other or derive a custom SQL pool percentage from either value.

## Limitations

- Query Insights retains 30 days of history and can lag by up to 15 minutes.
- Capacity Metrics might expose a fixed window instead of arbitrary timestamps.
- Capacity Metrics timestamps aren't necessarily documented as UTC.
- SQL pool event logging can pause while a warehouse is inactive.
- The usable correlation period is the overlap between Capacity Metrics and Query Insights history.
- Cluster-key assessment applies to warehouses, not lakehouse SQL analytics endpoints.

The skill reports data gaps and timeframe constraints as evidence instead of turning them into unsupported conclusions.

## Related content

- [Skills for Fabric overview](../fundamentals/skills-for-fabric-overview.md)
- [Install Skills for Fabric](../fundamentals/skills-for-fabric-install.md)
- [Monitor Fabric Data Warehouse](monitoring-overview.md)
- [Query Insights in Fabric Data Warehouse](query-insights.md)
- [Custom SQL pools](custom-sql-pools.md)
- [`sqldw-cli` operations reference on GitHub](https://github.com/microsoft/skills-for-fabric/blob/main/skills/sqldw-cli/references/operations.md)
