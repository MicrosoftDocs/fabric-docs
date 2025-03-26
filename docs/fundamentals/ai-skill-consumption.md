---
title: AI Skill consumption
description: Information on how Fabric AI Skill usage affects your CU consumption.
ms.author: midesa
author: midesa
ms.topic: how-to
ms.date: 03/20/2025
---

# AI Skill in Fabric consumption

This page contains information on how the Fabric AI Skill usage is billed and reported. AI Skill usage is measured by the number of tokens processed. When you query AI Skill using natural language, Fabric generates tokens that represent the number of words in the query. For every 750 words, approximately 1,000 tokens are generated.

## Consumption rate
The table below defines consumption in Capacity Units (CUs), when AI Skill leverages Azure OpenAI models to process and generate responses.

| **Metrics App Operation Name** | **Description** | **Operation Unit of Measure** | **Consumption rate** |
|---|---|---|---|
|AI Query |The input prompt |Per 1,000 Tokens |100 CU seconds|
|AI Query |The output completion |Per 1,000 Tokens|400 CU seconds|

In addition to token consumption, the AI Skill may generate and execute queries as part of answering user requests. The execution of these queries is billed separately to the corresponding query engine artifact. For example, if a query is generated for a Data Warehouse, its execution is billed through the SQL Query operation.

## Monitor the usage  
The [Fabric Capacity Metrics app](../enterprise/metrics-app-compute-page.md) displays the total capacity usage for AI Skill operations under the name *AI Query* Additionally, AI Skill users are able to view a summary of their billing charges for the AI skill usage under the "LlmPlugin" item kind.

## Capacity utilization type 

The AI-related activity within the AI skill is classified as *background jobs* to handle a higher volume of AI skill requests during peak hours.

For example, assume each AI Skill request has 2,000 input tokens and 500 output tokens. The price for one AI Skill request is calculated as follows: (2,000 × 100 + 500 × 400) / 1,000 = 400.00 CU seconds = 6.67 CU minutes. The cost of executing the AI-generated queries is billed through the corresponding query engine running the query.

Since AI Skill is a background job, each AI Skill request (~6.67 CU minute job) consumes only one CU minute of each hour of a capacity. For a customer on F64 who has 64 * 24 CU Hours (1,536) in a day, and each AI Skill job consumes (6.67 CU mins / 60 mins) = 0.11 CU Hours, customers can run over 13,824 requests before they exhaust the capacity. However, once the capacity is exhausted, all operations will shut down.

## Region mapping 

The AI Skill is powered by Azure OpenAI large language models that are deployed to [limited data centers](../data-science/ai-services/ai-services-overview.md#available-regions). However, customers can [enable cross-geo process tenant settings](../admin/service-admin-portal-copilot.md) to use Copilot and the AI Skill. This setting enables customer data to be processed in another region where the Azure OpenAI Service is available. This region could be outside of the user's geographic region, compliance boundary, or national cloud instance. While performing region mapping, we prioritize data residency as the foremost consideration and attempt to map to a region within the same geographic area whenever feasible. 

The cost of Fabric Capacity Units can vary depending on the region. Regardless of the consumption region where GPU capacity is utilized, customers are billed based on the Fabric Capacity Units pricing in their billing region. For example, if a customer's requests are mapped from `region 1` to `region 2`, with `region 1` being the billing region and `region 2` being the consumption region, the customer is charged based on the pricing in `region 1`.

## Changes to AI Skill in Fabric consumption rate

Consumption rates are subject to change at any time. Microsoft uses reasonable efforts to provide notice via email or through in-product notification. Changes shall be effective on the date stated in Microsoft’s Release Notes or Microsoft Fabric Blog. If any change to a AI Skill in Fabric Consumption Rate materially increases the Capacity Units (CU) required to use AI Skill in Fabric, customers can use the cancellation options available for the chosen payment method.

## Related content

- [Overview of the AI Skill in Fabric](../data-science/concept-ai-skill.md)
- [Background jobs in Fabric](../enterprise/fabric-operations.md)
