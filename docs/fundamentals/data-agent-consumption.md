---
title: Data agent consumption
description: Information on how Fabric Data agent usage affects your CU consumption.
ms.author: midesa
author: midesa
ms.topic: how-to
ms.date: 03/20/2025
---

# Data agent in Fabric consumption

This page contains information on how the Fabric Data agent usage is billed and reported. Data agent usage is measured by the number of tokens processed. When you query Data agent using natural language, Fabric generates tokens that represent the number of words in the query. For every 750 words, approximately 1,000 tokens are generated.

## Consumption rate
The table below defines consumption in Capacity Units (CUs), when Data agent leverages Azure OpenAI models to process and generate responses.

| **Metrics App Operation Name** | **Description** | **Operation Unit of Measure** | **Consumption rate** |
|---|---|---|---|
|AI Query |The input prompt |Per 1,000 Tokens |100 CU seconds|
|AI Query |The output completion |Per 1,000 Tokens|400 CU seconds|

In addition to token consumption, the Data agent might generate and execute queries as part of answering user requests. The execution of these queries is billed separately to the corresponding query engine item. For example, if a query is generated for a Data Warehouse, its execution is billed through the SQL Query operation.

## Monitor the usage  
The [Fabric Capacity Metrics app](../enterprise/metrics-app-compute-page.md) displays the total capacity usage for Data agent operations under the name *AI Query* Additionally, Data agent users are able to view a summary of their billing charges for the Data agent usage under the *LlmPlugin* item kind.

## Capacity utilization type 

The AI related activity within the Data agent is classified as *background jobs* to handle a higher volume of Data agent requests during peak hours.

For example, assume each Data agent request has 2,000 input tokens and 500 output tokens. The price for one Data agent request is calculated as follows: (2,000 × 100 + 500 × 400) / 1,000 = 400.00 CU seconds = 6.67 CU minutes. The cost of executing the AI-generated queries is billed through the corresponding query engine running the query.

Since Data agent is a background job, each Data agent request (~6.67 CU minute job) consumes only one CU minute of each hour of a capacity. If you're using an F64 SKU that has 64 * 24 = 1,536 CU hours a day, and each Data agent job consumes 6.67 CU mins / 60 mins = 0.11 CU hours, you can run over 13,824 requests before they exhaust the capacity. However, once the capacity is exhausted, all operations will shut down.

## Region mapping 

The Data agent is powered by Azure OpenAI large language models, which are deployed to [a select set of data centers](../data-science/ai-services/ai-services-overview.md#available-regions). Customers can [enable cross-geo processing in the tenant settings](../admin/service-admin-portal-copilot.md) to use Copilot and the Data agent. This setting allows data to be processed in a region where the Azure OpenAI Service is available. This region could be outside of the user's geographic region, compliance boundary, or national cloud instance. During region mapping, data residency is treated as the primary constraint. Regions are mapped within the same geographic area whenever possible.

The cost of Fabric CUs can vary depending on the region. Regardless of the consumption region where GPU capacity is utilized, customers are billed based on the Fabric pricing in their billing region. For example, if a customer's requests are mapped from `region 1` to `region 2`, with `region 1` being the billing region and `region 2` being the consumption region, the customer is charged based on the pricing in `region 1`.

## Changes to Data agent in Fabric consumption rate

Consumption rates are subject to change at any time. Microsoft uses reasonable efforts to provide notice by email or through in-product notification. Changes become effective on the date stated in Microsoft’s Release Notes or Microsoft Fabric Blog. If any change to a Data agent in Fabric Consumption Rate materially increases the Capacity Units (CU) required to use Data agent in Fabric, customers can use the cancellation options available for the chosen payment method.

## Related content

- [Overview of the Data agent in Fabric](../data-science/concept-data-agent.md)
- [Background jobs in Fabric](../enterprise/fabric-operations.md)
