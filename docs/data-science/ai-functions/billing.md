---
title: Billing for AI Functions
description: Learn how billing, capacity usage, and consumption rates work for AI Functions in Microsoft Fabric.
ms.reviewer: singhrana
reviewer: ranadeepsingh
ms.topic: concept-article
ms.date: 06/10/2026
ms.search.form: AI Functions
ai-usage: ai-assisted
---

# Billing for AI Functions

AI Functions use the built-in Fabric-hosted large language model (LLM) endpoint to transform and enrich your data without separate endpoint setup. This article explains the billing meter, consumption rates, and usage monitoring options for that built-in endpoint.

> [!IMPORTANT]
> This article applies to AI Functions that use the built-in Fabric LLM endpoint. You can configure a custom Azure OpenAI, Microsoft Foundry, or OpenAI-compatible endpoint for pandas and PySpark AI Functions. When you do, billing is governed by that endpoint and your configuration. For setup details, see [Customize AI Functions with pandas](./pandas/configuration.md) and [Customize AI Functions with PySpark](./pyspark/configuration.md).

## Billing meter

AI function calls through the built-in Fabric LLM endpoint are billed to your Fabric capacity under the **Copilot and AI** meter. In the [Microsoft Fabric Capacity Metrics app](../../enterprise/metrics-app.md), usage appears as the **AI Functions** operation.

| Usage | Billing meter or operation |
|---|---|
| AI function model calls | Copilot and AI meter, reported as **AI Functions**. |
| Spark compute that runs a notebook or Spark job | Spark billing meter. |
| Dataflow Gen2 compute that runs transformations | Dataflow Gen2 usage. |
| Warehouse or SQL analytics endpoint query compute | Data Warehouse or SQL analytics endpoint usage. |

## View costs and spending

Use the Capacity Metrics app to monitor AI Functions spending and capacity impact:

1. Open the [Microsoft Fabric Capacity Metrics app](../../enterprise/metrics-app.md).
1. Filter to the capacity, workspace, and time range that ran your AI Functions workload.
1. In operation-level views, look for **AI Functions** under the **Copilot and AI** meter.
1. Compare the **AI Functions** operation with Spark, Dataflow Gen2, or warehouse operations to separate model-call consumption from the compute that orchestrated the workload.

## Monitor runtime usage

During development, use runtime usage statistics to estimate and validate consumption before you scale a pipeline.

In pandas and PySpark notebooks, access `ai.stats` on AI function results to view execution and token usage details, including:

- `num_successful`, `num_exceptions`, `num_unevaluated`, and `num_harmful`.
- `cached_tokens`, `input_tokens`, `output_tokens`, and `reasoning_tokens`.
- `client_type`, `input_types`, and `model`.

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes.

df["summary"] = df["text"].ai.summarize()
display(df["summary"].ai.stats)
display(df.ai.stats)
```

# [PySpark](#tab/pyspark)

```python
# This code uses AI. Always review output for mistakes.

results = df.ai.summarize(input_col="text", output_col="summary")
display(results.ai.stats)
```

---

The output might look like this table:

| num_successful | num_exceptions | num_unevaluated | num_harmful | cached_tokens | input_tokens | output_tokens | reasoning_tokens | client_type | input_types | model |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2 | 0 | 0 | 0 | 0 | 555 | 4 | 0 | fabric_llm_endpoint | `{"text": 2}` | gpt-5-mini |

In pandas notebooks, set `progress_bar_mode="stats"` to show real-time token and capacity unit estimates while the function runs:

```python
import synapse.ml.aifunc as aifunc

aifunc.default_conf.progress_bar_mode = "stats"
```

The progress bar shows live and projected cached input, input, output, and capacity unit estimates, then shows final values when the operation completes. See [Progress bar modes](./pandas/configuration.md#progress-bar-modes) and [Customize AI Functions with PySpark](./pyspark/configuration.md).

## Consumption rates

Unless you configure a different model, Python AI Functions for pandas and PySpark default to `gpt-5-mini` with `reasoning_effort` set to `low`. Consumption is based on token usage. Input, cached input, and output tokens can have different rates.

### Language models

| **Model** | **Deployment Name** | **Context Window (Tokens)** | **Input (Per 1,000 Tokens)** | **Cached Input (Per 1,000 Tokens)** | **Output (Per 1,000 Tokens)** | **Retirement Date** |
| --- | --- | --- | --- | --- | --- | --- |
| gpt-5.1-2025-11-13 | `gpt-5.1` | 400,000<br>Max output: 128,000 | 42.02 CU seconds | 4.20 CU seconds | 336.13 CU seconds | |
| gpt-5-mini-2025-08-07 | `gpt-5-mini` | 400,000<br>Max output: 128,000 | 8.40 CU seconds | 0.84 CU seconds | 67.23 CU seconds | |
| gpt-4.1-mini-2025-04-14 | `gpt-4.1-mini` | 128,000<br>Max output: 32,768 | 13.45 CU seconds | 3.36 CU seconds | 53.78 CU seconds | June 30, 2026 |
| gpt-5-2025-08-07 | `gpt-5` | 400,000<br>Max output: 128,000 | 42.02 CU seconds | 4.20 CU seconds | 336.13 CU seconds | June 11, 2026 |
| gpt-4.1-2025-04-14 | `gpt-4.1` | 128,000<br>Max output: 32,768 | 67.23 CU seconds | 16.81 CU seconds | 268.91 CU seconds | June 11, 2026 |

### Embedding models

| **Model** | **Deployment name** | **Context window (tokens)** | **Input (per 1,000 tokens)** |
| --- | --- | --- | --- |
| Ada | `text-embedding-ada-002` | 8,192 | 3.36 CU seconds |

Consumption rates are subject to change. For the full consumption rate list and rate-change policy, see [Consumption rate](../ai-services/ai-services-overview.md#consumption-rate) in Foundry Tools in Fabric.

## Model migration guidance

The older GPT-4.1 model series is being retired. If you have pinned Python AI Functions pipelines to `gpt-4.1`, migrate them to `gpt-5.1`. If you pinned pipelines to `gpt-4.1-mini`, migrate them to `gpt-5-mini`.

For more sophisticated transformations, you can configure `gpt-5.1` or tune `reasoning_effort` to use more compute for higher-quality results. For setup details, see [Customize AI Functions with pandas](./pandas/configuration.md) and [Customize AI Functions with PySpark](./pyspark/configuration.md).

## Related content

- [Transform and enrich data with AI Functions](./overview.md).
- [Use multimodal input with AI Functions](./multimodal-overview.md).
- [Customize AI Functions with pandas](./pandas/configuration.md).
- [Customize AI Functions with PySpark](./pyspark/configuration.md).
- [Foundry Tools in Fabric](../ai-services/ai-services-overview.md).
