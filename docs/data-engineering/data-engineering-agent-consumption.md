---
title: Fabric data engineering agent (Project Osmos) capacity consumption (preview)
description: Understand how Fabric data engineering agent (Project Osmos) reports language model token usage and converts that usage into Fabric capacity units (CUs) for autonomous data engineering tasks.
author: vsarad
ms.author: vijaykris
ms.date: 09/08/2026
ms.topic: concept-article
ms.service: fabric
ms.subservice: data-engineering
ai-usage: ai-generated
#customer intent: As a Fabric capacity administrator, I want to understand Fabric data engineering agent consumption rates so that I can monitor the capacity used by autonomous data engineering tasks.
---

# Fabric data engineering agent (Project Osmos) capacity consumption - preview

[Fabric data engineering agent (Project Osmos)](data-engineering-agent-overview.md) uses language model input and output tokens during autonomous data engineering tasks. The consumption rate converts reported token usage into Fabric capacity units (CUs).

> [!IMPORTANT]
> The data engineering agent (Project Osmos) is in preview. Preview features are released with limited capabilities and are subject to separate [supplemental preview terms](https://go.microsoft.com/fwlink/?linkid=2240967). They're not intended for production use, aren't subject to service-level agreements, and might be available only in selected regions. For more information, see [Microsoft Fabric preview information](/fabric/fundamentals/preview).

## Monitor usage

In the [Fabric Capacity Metrics app](../enterprise/metrics-app.md), language model usage appears under the **Project Osmos** operation for the task's lakehouse. This **Background** operation uses the **Copilot and AI** Azure billing meter.

For other Fabric operations that a task uses, see [Fabric operations](../enterprise/fabric-operations.md).

## Consumption rates

The following rates are **CU seconds per 1,000 tokens**. The applicable billing profile depends on the model the request uses. These profiles describe consumption rates, not a list of model options available in every Fabric data engineering agent client.

| Billing profile | Uncached input | Cached input | Output |
| --- | ---: | ---: | ---: |
| Generic | 100 | 10 | 400 |
| GPT-5.1 | 34.95762712 | 3.495762712 | 279.6610169 |
| GPT-5-mini | 6.991525424 | 0.699152542 | 55.93220339 |
| GPT-5.4, short context | 69.91525424 | 6.991525424 | 419.4915254 |
| GPT-5.4, long context | 139.8305085 | 13.98305085 | 629.2372881 |
| GPT-5.4-mini | 20.97457627 | 2.097457627 | 125.8474576 |
| GPT-5.4-nano | 5.593220339 | 0.559322034 | 34.95762712 |
| GPT-5.4-pro, short context | 838.9830508 | Not separately priced | 5033.898305 |
| GPT-5.4-pro, long context | 1677.966102 | Not separately priced | 7550.847458 |
| GPT-5.5, short context | 139.8305085 | 13.98305085 | 838.9830508 |
| GPT-5.5, long context | 279.6610169 | 27.96610169 | 1258.474576 |
| GPT-5.5-pro, short context | 838.9830508 | Not separately priced | 5033.898305 |
| GPT-5.5-pro, long context | 1677.966102 | Not separately priced | 7550.847458 |

### Context length

For profiles with short-context and long-context rates, a request uses the long-context profile when its total prompt-token count is **greater than 272,000**. A request with exactly 272,000 prompt tokens uses the short-context profile.

The total prompt-token count determines the context tier before input usage is split into uncached and cached tokens.

### Cached input

A cached-input rate applies when cached tokens are reported separately under that billing profile. Don't assume that every request reports a separate cached-input quantity. **Not separately priced** doesn't mean that cached input is free.

## Calculate consumption

When input usage is reported with separately priced uncached and cached quantities, calculate consumption as follows:

```text
CU seconds = (uncached input tokens * input rate
              + cached input tokens * cached rate
              + output tokens * output rate) / 1,000
```

Use the rates for the request's billing profile and context tier.

## Related content

- [Fabric data engineering agent (Project Osmos) overview](data-engineering-agent-overview.md)
- [Get started with data engineering agent (Project Osmos)](data-engineering-agent-get-started.md)
- [Fabric operations](../enterprise/fabric-operations.md)
