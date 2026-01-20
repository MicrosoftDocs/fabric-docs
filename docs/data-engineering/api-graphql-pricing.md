---
title: Fabric API for GraphQL pricing
description: This article contains information about billing
author: eric-urban
ms.author: eur
ms.reviewer: edlima
ms.date: 01/21/2026
ms.topic: concept-article
ms.custom: freshness-kr
ms.search.form: Fabric API for GraphQL pricing  # This article's title shouldn't change. If so, contact engineering.
---

# Fabric API for GraphQL pricing

The usage for each API operation consisting of the time executing a GraphQL request/response is reported in Capacity Units (CUs) in seconds at the rate of 10 CUs per hour. You can find more information in the following sections.

## Who needs pricing information

Understanding GraphQL API pricing is important for:
- **Fabric capacity administrators** planning capacity requirements and managing costs for GraphQL workloads
- **Fabric workspace admins** monitoring and optimizing API consumption to stay within capacity budgets
- **Application architects** designing cost-effective solutions that optimize Fabric API usage patterns
- **Finance and procurement teams** budgeting for Fabric capacity based on GraphQL API consumption

Use this pricing information when planning GraphQL API implementations or optimizing existing applications for cost efficiency.

## Consumption rate

API for GraphQL usage is measured based on resolver execution time. Resolvers are the GraphQL components that retrieve and process data from your data sources—Fabric automatically generates these resolvers when you attach data sources or select objects to expose through your API.

**How consumption works:**

When a client application sends a GraphQL query or mutation (or when you execute a query in the [API editor](api-graphql-editor.md)), the resolvers execute to fetch and return the requested data. The total execution time for all resolvers in a request determines the capacity units consumed.

The following table defines the consumption rate for API for GraphQL operations:

| **Operation in Metrics App**    | **Description** | **Operation Unit of Measure** | **Consumption rate** |
| -------- | ------- | ------- | ------- |
| Query  | GraphQL read or write operation    | GraphQL resolver executions |10 CU's hour |

## Monitor the usage

The [Fabric Capacity Metrics app](../enterprise/metrics-app-compute-page.md) displays the total capacity usage for API for GraphQL operations under the name "Query". Additionally, API users are able to view a summary of their billing charges for API for GraphQL usage under the invoicing item "GraphQL".

:::image type="content" source="media/api-graphql-pricing/api-graphql-capacity-app.png" alt-text="Screenshot of GraphQL in Capacity app." lightbox="media/api-graphql-pricing/api-graphql-capacity-app.png":::

## Capacity utilization type

API for GraphQL requests are classified as **interactive jobs** because they're on-demand operations triggered by client applications or user interactions with the UI. This classification affects how Fabric manages capacity utilization and applies throttling policies.

**How Fabric smooths capacity usage:**

Fabric smooths (averages) the capacity unit usage for interactive jobs over a minimum of 5 minutes. This approach allows operations to burst and use more resources temporarily while maintaining overall capacity limits. According to the [Fabric throttling policy](../enterprise/throttling.md), throttling begins when a capacity unit consumed all available resources for the next 10 minutes.

**Query complexity impact:**

- **Complex queries**: Queries that return nested data from multiple data sources or perform extensive data processing take longer to execute, consuming more CU seconds
- **Simple queries**: Straightforward queries that return focused datasets execute faster, consuming fewer CU seconds

To optimize costs, design your GraphQL queries to request only the data you need and consider the complexity of nested relationships.

## Related content

- [Fabric Operations](../enterprise/fabric-operations.md)
- [Fabric Throttling Policy](../enterprise/throttling.md)
- [Fabric Capacity Metrics app](../enterprise/metrics-app-compute-page.md)
- [Fabric API for GraphQL query editor](api-graphql-editor.md)
