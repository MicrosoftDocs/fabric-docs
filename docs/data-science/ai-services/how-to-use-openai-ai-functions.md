---
title: Use Azure OpenAI with AI Functions
description: Learn when to use AI functions with Azure OpenAI in Fabric and where to find complete guidance.
ms.author: lagayhar
author: lgayhardt
ms.reviewer: vimeland
reviewer: virginiaroman
ms.topic: how-to
ms.custom:
ms.date: 01/16/2026
ms.update-cycle: 180-days
ms.search.form: AI functions
ai-usage: ai-assisted
---

# Use Azure OpenAI in Fabric with AI Functions (preview)

Use AI functions when you want the fastest way to apply Azure OpenAI to large tabular datasets in Fabric. AI functions are optimized for scale, with a default concurrency of 200 and configurable concurrency settings so you can process rows in parallel for higher throughput.

Another key advantage is prebuilt LLM-based transformations exposed as DataFrame methods, including sentiment analysis, classification, extraction, summarization, translation, embeddings, similarity scoring, and custom response generation. You can use these functions in pandas and PySpark with minimal code while Fabric handles core tasks such as authentication and request orchestration.

For setup steps, supported functions, model and provider options, and end-to-end examples, see [Transform and enrich data with AI functions](../ai-functions/overview.md), which is the main AI functions reference in Fabric. If you need low-level API control or custom orchestration beyond built-in AI functions, use [Use Azure OpenAI with Python SDK](how-to-use-openai-python-sdk.md) or [Use Azure OpenAI with SynapseML](how-to-use-openai-synapse-ml.md).

## Related content

### Fabric documentation

- [Transform and enrich data with AI functions](../ai-functions/overview.md) for setup, supported functions, and end-to-end examples
- [Use Azure OpenAI with Python SDK](how-to-use-openai-python-sdk.md) for fine-grained control over single API calls
- [Use Azure OpenAI with SynapseML](how-to-use-openai-synapse-ml.md) for distributed processing with Spark DataFrames
- [Use Azure OpenAI with REST API](how-to-use-openai-via-rest-api.md) for direct REST API calls to the LLM endpoint
