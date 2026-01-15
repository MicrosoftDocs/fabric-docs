---
title: Fabric API for GraphQL pricing
description: This article contains information about billing
author: eric-urban
ms.author: eur
ms.reviewer: edlima
ms.date: 05/16/2025
ms.topic: concept-article
ms.custom:
ms.search.form: Fabric API for GraphQL pricing  # This article's title shouldn't change. If so, contact engineering.
---

# Fabric API for GraphQL pricing

The usage for each API operation consisting of the time executing a GraphQL request/response is reported in Capacity Units (CUs) in seconds at the rate of 10 CUs per hour. You can find more information in the following sections.

## Consumption rate

A GraphQL resolver is executed when a client application sends an API request, or a query is executed in the [API editor](api-graphql-editor.md). Resolvers are GraphQL components that provide the business logic to "resolve" fields in the API and perform operations with data residing in the data sources. Fabric automatically generates resolvers whenever you attach a new Fabric data source or select new objects to be exposed from an existing data source.

Resolver executions triggered by requests to API for GraphQL consume Fabric Capacity Units. The following table defines how many capacity units (CU) are consumed when API for GraphQL is used:

| **Operation in Metrics App**    | **Description** | **Operation Unit of Measure** | **Consumption rate** |
| -------- | ------- | ------- | ------- |
| Query  | GraphQL read or write operation    | GraphQL resolver executions |10 CU's hour |

## Monitor the usage

The [Fabric Capacity Metrics app](../enterprise/metrics-app-compute-page.md) displays the total capacity usage for API for GraphQL operations under the name "Query". Additionally, API users are able to view a summary of their billing charges for API for GraphQL usage under the invoicing item "GraphQL".

:::image type="content" source="media/api-graphql-pricing/api-graphql-capacity-app.png" alt-text="Screenshot of GraphQL in Capacity app." lightbox="media/api-graphql-pricing/api-graphql-capacity-app.png":::

## Capacity utilization type

Fabric API for GraphQL requests is classified as "interactive job" as they're on-demand requests and operations that can be triggered by application clients or user interactions with the UI.

Fabric is designed to provide lightning-fast performance by allowing operations to access more CU (Capacity Units) resources than are allocated to capacity. Fabric smooths or averages the CU usage of an "interactive job" over a minimum of 5 minutes, "background job" over a 24-hour period. According to the [Fabric throttling policy](../enterprise/throttling.md), the first phase of throttling begins when a capacity consumed all its available CU resources for the next 10 minutes.

A complex GraphQL query returning nested data from multiple data sources might take longer to execute thus consuming more CU seconds. Alternatively, a simpler query processed in less time consumes fewer CU seconds.

## Related content

- [Fabric Operations](../enterprise/fabric-operations.md)
- [Fabric Throttling Policy](../enterprise/throttling.md)
- [Fabric Capacity Metrics app](../enterprise/metrics-app-compute-page.md)
- [Fabric API for GraphQL query editor](api-graphql-editor.md)
