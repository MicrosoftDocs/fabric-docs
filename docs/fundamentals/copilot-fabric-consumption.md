---
title: Copilot consumption, usage, and billing in Fabric
description: Learn how Copilot in Microsoft Fabric consumes capacity units (CUs), including token-based billing rates, usage monitoring, and cross-region processing.
author: SnehaGunda
ms.author: sngun
ms.topic: concept-article
ms.date: 05/22/2026
ms.update-cycle: 180-days
no-loc: [Copilot]
ms.collection: ce-skilling-ai-copilot
ai-usage: ai-assisted

#customer intent: As a Fabric capacity administrator, I want to understand how Copilot consumes capacity units so that I can plan and monitor my organization's Copilot usage.
---

# Consumption rates and billing for Copilot in Fabric

Copilot consumption is the billing model that measures how Copilot requests use Fabric Capacity Units (CUs). Each Copilot interaction is metered by the number of tokens processed—approximately 1,000 tokens equal 750 words. Input and output tokens are consumed at different rates, and prices are calculated per 1,000 tokens.

## Copilot consumption rate per token

Requests to Copilot in Fabric consume Fabric capacity units (CUs). The following table defines how many CUs are consumed per 1,000 tokens for input prompts and output completions. These rates apply across all Copilot experiences, including [Copilot for Power BI](/power-bi/create-reports/copilot-introduction), [Copilot for Data Factory](../fundamentals/copilot-fabric-data-factory.md), and [Copilot for Data Engineering and Data Science](../data-engineering/copilot-notebooks-overview.md).

| Operation in Metrics App | Description | Operation Unit of Measure | Consumption rate |
|---|---|---|---|
| Copilot in Fabric | The input prompt | Per 1,000 Tokens | 100 CU seconds |
| Copilot in Fabric | The output completion | Per 1,000 Tokens | 400 CU seconds |

## Monitor Copilot usage

The [Fabric Capacity Metrics app](../enterprise/metrics-app-compute-page.md) displays the total capacity usage for Copilot operations under the operation name **Copilot in Fabric**. Copilot users can also view a summary of their billing charges under the invoicing item **Copilot in Fabric**.

:::image type="content" border="true" source="./media/copilot-consumption/capacity-metrics-app.png" alt-text="Screenshot of the Fabric Capacity Metrics app showing Copilot in Fabric usage.":::

## Background job classification and throttling

Copilot operations in Fabric are classified as **background jobs**, which allows Fabric to handle a higher volume of Copilot requests during peak hours.

Fabric allows operations to access more CU resources than are allocated to a capacity. Fabric smooths CU usage of an interactive job over a minimum of 5 minutes and a background job over a 24-hour period. According to the [Fabric throttling policy](../enterprise/throttling.md), the first phase of throttling begins when a capacity has consumed all its available CU resources for the next 10 minutes.

For example, assume each Copilot request has 2,000 input tokens and 500 output tokens. The price for one Copilot request is calculated as follows: (2,000 × 100 + 500 × 400) / 1,000 = 400.00 CU seconds = 6.67 CU minutes.

Since Copilot operations in Fabric are background jobs, each request (~6.67 CU minute job) consumes only one CU minute of each hour of a capacity. For example, a customer on an F64 SKU has 64 × 24 = 1,536 CU hours in a day. Each Copilot request consumes 6.67 / 60 = 0.11 CU hours, so customers can run over 13,824 Copilot requests per day before they exhaust the capacity. Once the capacity is exhausted, all operations will shut down.

## Cross-region data processing for Copilot in Fabric

Copilot in Fabric is powered by Azure OpenAI large language models that are deployed to [limited data centers](../data-science/ai-services/ai-services-overview.md#available-regions). Customers can [enable cross-geo processing in tenant settings](../admin/service-admin-portal-copilot.md) to use Copilot to process data in another region where Azure OpenAI Service is available. This region could be outside the user's geographic region, compliance boundary, or national cloud instance. Region mapping prioritizes data residency and attempts to map to a region within the same geographic area whenever feasible.

The cost of Fabric capacity units can vary by region. Regardless of the consumption region where GPU capacity is used, customers are billed based on the capacity unit pricing in their billing region. For example, if a customer's requests are mapped from `region 1`(billing region) to `region 2`(consumption region), the customer is charged based on the pricing in `region 1` (the billing region).

## Changes to Copilot in Fabric consumption rate

Consumption rates are subject to change at any time. Microsoft uses reasonable efforts to provide notice via email or through in-product notification. Changes are effective on the date stated in Microsoft's Release Notes or the Microsoft Fabric Blog. If any change to Copilot consumption rates in Fabric materially increases the capacity units (CU) required to use Copilot in Fabric, customers can use the cancellation options available for the chosen payment method.

## Related content

- [Overview of Copilot in Fabric](copilot-fabric-overview.md)
- [Copilot in Fabric: FAQ](copilot-faq-fabric.yml)
- [Foundry Tools in Fabric (preview)](../data-science/ai-services/ai-services-overview.md)
