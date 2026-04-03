---
title: Monitor Graph Performance
description: Monitor graph performance in Microsoft Fabric. Learn what factors affect refresh and query speed, how to identify bottlenecks, and what actions to take.
#customer intent: As a Fabric user, I want to understand graph performance characteristics so that I can identify bottlenecks and keep my graph workloads running efficiently.
ms.topic: how-to
ms.date: 03/31/2026
ms.reviewer: wangwilliam
ai-usage: ai-assisted
---

# Monitor graph performance in Microsoft Fabric

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

Graph performance in Microsoft Fabric depends on graph size, model complexity, query patterns, and capacity availability. Learn what to monitor, how to identify bottlenecks, and what actions to take when refresh jobs are slow or queries don't return results as expected.

For basic refresh job status tracking, see [Monitor graph workloads](monitoring-overview.md). For GQL query optimization techniques, see [Optimize GQL query performance](gql-query-performance.md).

## Prerequisites

Before you start, verify that you:

- Have a workspace with at least one saved graph model. For more information, see [Manage data in graph](manage-data.md).
- Have permission to view the graph items you want to monitor. For more information, see [Security overview for graph](security-overview.md).

## Factors that affect graph performance

Several interconnected factors affect graph performance. Diagnose slow refreshes and sluggish queries by understanding what drives them.

### Graph size and complexity

- Graphs with more than 500 million nodes and edges result in unstable performance. For the full list of limits, see [Current limitations](limitations.md).
- Each additional node type, edge type, and property adds to the data that graph loads during a refresh. Removing unused node types, edge types, and properties from your model reduces refresh time.
- Dense graphs (many edges per node) increase traversal cost. If most nodes connect to thousands of other nodes, queries that traverse multiple hops become expensive.

### Source data characteristics

- Graph reads directly from lakehouse tables in OneLake. Large source tables with many columns take longer to ingest.
- If your source tables include columns you don't need in the graph, remove those properties during graph modeling. Each property adds to the data read during refresh and the memory footprint of the queryable graph.

### Query patterns

- Queries that traverse many hops, return full nodes (`RETURN *`), or produce unbounded result sets consume more resources and take longer to run.
- Pattern-level filters, narrow projections, and `LIMIT` clauses reduce the work the query engine performs. For specific techniques, see [Optimize GQL query performance](gql-query-performance.md).

### Capacity and concurrency

- Graph refresh jobs and queries consume pooled Fabric capacity units (CUs). Other workloads in the same capacity compete for these resources.
- If refresh jobs are consistently slow, check whether other high-consumption workloads are running at the same time by using the [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app-install.md).

## Monitor refresh performance

Use the [Monitoring hub](../admin/monitoring-hub.md) to track how long graph refreshes take and whether they succeed or fail. For step-by-step instructions on accessing the Monitoring hub, see [Monitor graph workloads](monitoring-overview.md).

### Identify slow refreshes

Compare refresh durations over time to establish a baseline for your graph. A refresh that takes significantly longer than usual can indicate:

- **Source data growth**: The underlying lakehouse tables grew, adding more data for graph to ingest.
- **Model complexity increase**: New node types, edge types, or properties were added to the model.
- **Capacity pressure**: Other workloads are consuming a larger share of the available capacity.

### Respond to refresh failures

Graph refresh jobs can fail when they exceed the 20-minute timeout. For large graphs, this timeout can cause a failure up to once a week. If a refresh fails:

1. Open the Monitoring hub and locate the failed refresh job.
1. Select the job to view error details and timing information.
1. If the failure was a timeout, try again - the next refresh typically succeeds. If timeouts happen repeatedly, reduce the graph size by removing unused node types, edge types, or properties.
1. If the failure was caused by a configuration error, open your graph model and verify that node and edge type mappings, ID columns, and foreign key columns are correct.

For more troubleshooting information, see [Troubleshooting and FAQ](troubleshooting-and-faq.md).

## Monitor query performance

During preview, individual GQL query metrics aren't available in the Monitoring hub. Instead, use these approaches to understand and improve query performance.

### Observe query behavior in the Code Editor

When you run a GQL query in the **Code Editor**, observe:

- **Response time**: How long the query takes to return results. Slow queries typically involve deep traversals, unbounded matches, or large result sets.
- **Result size**: Large result sets (approaching the 64-MB truncation limit) indicate that the query needs tighter bounds or filtering. If results are truncated, add `LIMIT`, `FILTER`, or `WHERE` clauses to narrow the output.
- **Empty results after a successful refresh**: This situation usually means the graph model configuration doesn't match the underlying data. Verify that your node type mappings point to the correct source tables and columns.

### Common query performance issues and actions

| Symptom | Likely cause | Action |
| --- | --- | --- |
| Query takes more than a few seconds | Deep traversal (high hop count) or missing filters | Add pattern-level `WHERE` clauses, reduce hop range, and apply `LIMIT`. |
| Query returns no results | Node or edge type misconfiguration, or empty source tables | Verify model mappings and confirm source data exists. |
| Query results are truncated | Result set exceeds 64 MB | Narrow projections with specific properties instead of `RETURN *`, and add `LIMIT`. |
| Aggregations are slow or unstable | Result set exceeds 128 MB before aggregation | Add filters to reduce intermediate results before `GROUP BY`. |
| Query times out (20-minute limit) | Unbounded multihop traversal on a dense graph | Use `TRAIL` to prevent edge revisits, tighten hop bounds, and add `LIMIT`. |

For detailed query optimization strategies, see [Optimize GQL query performance](gql-query-performance.md).

## Track capacity usage

Use the **Microsoft Fabric Capacity Metrics app** to understand how graph workloads affect your overall capacity consumption. The app helps you:

- Compare capacity usage between graph refresh jobs and other Fabric workloads.
- Identify time periods when capacity pressure might slow graph refreshes.
- Decide when to scale your capacity up or down based on usage trends.

For more information, see [Install the Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app-install.md).

## Performance best practices summary

- **Right-size your model**: Remove node types, edge types, and properties you don't need. Smaller models refresh faster and consume less memory.
- **Filter early, project narrowly**: Use pattern-level `WHERE` clauses and return only the properties you need. Avoid `RETURN *`.
- **Bound your results**: Apply `LIMIT` to high-cardinality queries. Keep results well under the 64-MB truncation threshold.
- **Keep traversals shallow**: Use the tightest hop range your scenario allows. Use `TRAIL` to prevent redundant paths in dense graphs.
- **Monitor refresh trends**: Establish a baseline refresh duration and investigate when refreshes deviate significantly.
- **Check capacity during slowdowns**: Use the **Capacity Metrics app** to determine whether capacity pressure is the cause.

## Related content

- [Monitor graph workloads](monitoring-overview.md)
- [Optimize GQL query performance](gql-query-performance.md)
- [Current limitations](limitations.md)
- [Troubleshooting and FAQ](troubleshooting-and-faq.md)
- [Monitoring hub](../admin/monitoring-hub.md)
- [Install the Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app-install.md)
