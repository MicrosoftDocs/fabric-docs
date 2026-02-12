---
title: Fabric API for GraphQL Performance Best Practices
description: This article contains a list of performance best practices
author: eric-urban
ms.author: eur
ms.reviewer: edlima
ms.date: 01/21/2026
ms.topic: best-practice
ms.custom: freshness-kr
ms.search.form: Fabric API for GraphQL Performance Best Practices  # This value shouldn't change. If so, contact engineering.
---

# Fabric API for GraphQL performance best practices

Microsoft Fabric's API for GraphQL offers a powerful way to query data efficiently, but performance optimization is key to ensuring smooth and scalable performance. Whether you're handling complex queries or optimizing response times, the following best practices help you get the best performance out of your GraphQL implementation and maximize your API efficiency in Fabric.

## Who needs performance optimization

Performance optimization is crucial for:
- **Application developers** building high-traffic applications that query Fabric lakehouses and warehouses
- **Data engineers** optimizing Fabric data access patterns for large-scale analytics applications and ETL processes
- **Fabric workspace admins** managing capacity consumption and ensuring efficient resource utilization
- **BI developers** improving response times for custom analytics applications built on Fabric data
- **DevOps teams** troubleshooting latency issues in production applications consuming Fabric APIs

Use these best practices when your GraphQL API needs to handle production workloads efficiently or when you're experiencing performance issues.

## Region alignment

Cross-region API calls are a common cause of high latency. For optimal performance, ensure your client applications, Fabric tenant, capacity, and data sources are all in the same Azure region.

### Check your tenant region

To find your Fabric tenant's region:

1. Sign in to the Microsoft Fabric portal with an admin account
1. Select the Help icon (**?**) in the top right corner
1. At the bottom of the Help pane, select **About Fabric**
1. Note the region displayed in the tenant details

### Check your capacity region

Your API for GraphQL runs within a specific capacity. To find the capacity region:

1. Open the workspace hosting your API for GraphQL
1. Go to **Workspace settings** > **Workspace type**
1. Find the region under **License capacity**

   :::image type="content" source="./media/api-graphql-performance/capacity-region.png" alt-text="Screenshot showing how to get the capacity region for your workspace." lightbox="media/api-graphql-performance/capacity-region.png":::

### Check your data source region

The location of your data sources also impacts performance:

- **Fabric data sources** (Lakehouse, Data Warehouse, SQL Database): These use the same region as the workspace's capacity
- **External data sources** (Azure SQL Database, etc.): Check the resource location in the Azure portal

**Best practice**: Deploy client applications in the same region as your Fabric capacity and data sources to minimize network latency.

## Performance testing best practices

When evaluating your API's performance, follow these guidelines for reliable and consistent results.

### Use realistic test tools

Test with tools that closely match your production environment:

- **Scripts or applications**: Use Python, Node.js, or .NET scripts that simulate actual client behavior
- **HTTP connection pooling**: Reuse HTTP connections to reduce latency, especially important for cross-region scenarios
- **Session management**: Maintain sessions across requests to accurately reflect real-world usage

**Sample resources:**
- [Sample performance test script](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-engineering/GraphQL/benchmarking/graphql_performance_test_notebook.ipynb) (Python notebook)
- [HTTP session objects in Python](https://docs.python-requests.org/en/latest/user/advanced/#session-objects)
- [HttpClient guidelines for .NET](/dotnet/fundamentals/networking/http/httpclient-guidelines#recommended-use)

### Collect meaningful metrics

For accurate performance assessment:

1. **Automate testing**: Use scripts or performance testing tools to run tests consistently over a defined period
1. **Warm up the API**: Execute several test queries before measuring performance (see [Warm-up requirements](#warm-up-requirements))
1. **Analyze distributions**: Use percentile-based metrics (P50, P95, P99) rather than just averages to understand latency patterns
1. **Test under load**: Measure performance with realistic concurrent request volumes
1. **Document conditions**: Record the time of day, capacity utilization, and any concurrent workloads during testing

## Common performance issues

Understanding these common issues helps you diagnose and resolve performance problems effectively.

### Warm-up requirements

**Issue**: The first API request takes significantly longer than subsequent requests.

**Why this happens:**
- **API initialization**: When idle, the API environment needs to initialize during the first call, adding a few seconds of latency
- **Data source warm-up**: Many data sources (especially SQL Analytics Endpoints and data warehouses) undergo a warm-up phase when accessed after being idle
- **Combined initialization**: If both the API and data source are idle, initialization times compound

**Solution:**
- Execute 2-3 test queries before measuring performance
- For production applications, implement health check endpoints that keep the API warm
- Consider using scheduled queries or monitoring tools to maintain an active state during business hours

### Regional misalignment

**Issue**: Consistently high latency across all requests.

**Why this happens:**
Cross-region network calls add significant latency, especially when the client, API, and data sources are in different Azure regions.

**Solution:**
- Verify your client application, Fabric capacity, and data sources are in the same region
- If cross-region access is unavoidable, implement aggressive caching strategies
- Consider deploying regional API replicas for global applications

### Data source performance

**Issue**: API requests are slow even when the API is warmed up and regions are aligned.

**Why this happens:**
API for GraphQL acts as a query interface over your data sources. If the underlying data source has performance issues—such as missing indexes, complex queries, or resource constraints—the API inherits those limitations.

**Solution:**
1. **Test directly**: Query the data source directly (using SQL or other native tools) to establish a baseline performance
1. **Optimize the data source**:
   - Add appropriate indexes for frequently queried columns
   - Consider the right data store for your use case: [Fabric decision guide – choose a data store](../fundamentals/decision-guide-data-store.md)
   - Review query execution plans for optimization opportunities
1. **Right-size capacity**: Ensure your Fabric capacity SKU provides sufficient compute resources. See [Microsoft Fabric concepts](../enterprise/licenses.md#capacity) for guidance on selecting appropriate capacity.

### Query design

**Issue**: Some queries perform well while others are slow.

**Why this happens:**
- **Over-fetching**: Requesting more fields than necessary increases processing time
- **Deep nesting**: Queries with many levels of nested relationships require multiple resolver executions
- **Missing filters**: Queries without appropriate filters can return excessive data

**Solution:**
- Request only the fields you need in your GraphQL query
- Limit the depth of nested relationships where possible
- Use appropriate filters and pagination in your queries
- Consider breaking complex queries into multiple simpler queries when appropriate

## Related content

* [Fabric API for GraphQL overview](get-started-api-graphql.md)
* [Fabric API for GraphQL editor](api-graphql-editor.md)
