---
title: AI Functions in Fabric Runtime 2.0 with Spark 4.1
description: Use the temporary pandas and PySpark setup for AI Functions in Fabric Runtime 2.0 with Spark 4.1.
ms.reviewer: singhrana
reviewer: ranadeepsingh
ms.topic: how-to
ms.date: 09/18/2026
ms.search.form: AI Functions
ai-usage: ai-generated
---

# AI Functions in Fabric Runtime 2.0 with Spark 4.1

Notebook authors and AI agents generating code for Fabric Runtime 2.0 with Spark 4.1 should include the following setup before calling AI Functions. These are **temporary workarounds** for affected runtime packages.

Start a fresh PySpark notebook session on [Fabric Runtime 2.0](../../data-engineering/runtime-2-0.md#enable-runtime-20) and meet the [AI Functions prerequisites](./overview.md#prerequisites). These examples use the built-in Fabric AI endpoint, so you don't need an API key or the OpenAI Python SDK.

Choose the setup for your DataFrame type:

| DataFrame type | Additional installation | AI Functions module |
| --- | --- | --- |
| [pandas](#configure-pandas-ai-functions) | Install `nest_asyncio` before importing. | `synapse.ml.aifunc` |
| [PySpark](#configure-pyspark-ai-functions) | No additional packages. | `synapse.ml.spark.aifunc` |

Both APIs need the imports and model settings in their respective sections.

> [!NOTE]
> The examples use fictional personal information. The original `message` column and the PII values returned in JSON still contain personal information. Model-based redaction can miss personal information, so review and remove sensitive values before sharing the output.

## Configure pandas AI Functions

First, install the compatibility package in a separate cell. This cell restarts Python.

```python
%pip install -q nest_asyncio 2>/dev/null
```

For pipeline or scheduled runs, add and publish `nest-asyncio` in an attached [Fabric environment](../../data-engineering/environment-manage-library.md#add-a-library-from-a-public-python-repository) instead of using `%pip`.

Then run the following cell to import pandas AI Functions, apply the temporary settings, and call [`ai.generate_response`](./pandas/generate-response.md).

```python
import pandas as pd
import synapse.ml.aifunc as aifunc

aifunc.default_conf.model_deployment_name = "gpt-5.1"  # or "gpt-5-mini"
aifunc.default_conf.reasoning_effort = "low"
aifunc.default_conf.temperature = None

df = pd.DataFrame(
    data=[("Alex Rivera, alex@example.com, 202-555-0142: My delivery arrived damaged.",)],
    columns=["message"],
)

df["redacted"] = df.ai.generate_response(
    prompt="Redact PII in the message column. Return JSON with redacted text, PII types, and original values.",
    response_format="json_object",
)
display(df)
```

The `redacted` column contains a JSON string with the masked message and detected PII types and original values. JSON field names can vary.

For model choices and other settings, see [pandas AI Functions configuration](./pandas/configuration.md).

## Configure PySpark AI Functions

No additional packages are required. Run the following cell to import PySpark AI Functions, apply the temporary settings, and call [`ai.generate_response`](./pyspark/generate-response.md).

```python
import synapse.ml.spark.aifunc as aifunc

aifunc.default_conf.set_deployment_name("gpt-5.1")  # or "gpt-5-mini"
aifunc.default_conf.set_reasoning_effort("low")
aifunc.default_conf.reset_temperature()

df = spark.createDataFrame(
    data=[("Alex Rivera, alex@example.com, 202-555-0142: My delivery arrived damaged.",)],
    schema=["message"],
)

df_response = df.ai.generate_response(
    prompt="Redact PII in the message column. Return JSON with redacted text, PII types, and original values.",
    response_format="json_object",
    output_col="redacted",
)
display(df_response)
```

The `redacted` column contains a JSON string with the masked message and detected PII types and original values. JSON field names can vary.

For model choices and other settings, see [PySpark AI Functions configuration](./pyspark/configuration.md).

Keep the temporary setup cells at the start of each session until the runtime package update removes the need for these workarounds.

## Related content

- [Fabric Runtime 2.0](../../data-engineering/runtime-2-0.md).
- [AI Functions overview](./overview.md).
