---
title: Use Azure AI services in Fabric
description: Overview of using Azure AI services in Fabric.
ms.author: lagayhar
author: lgayhardt
ms.reviewer: ruxu
reviewer: ruixinxu
ms.topic: overview
ms.custom: 
  - references_regions
ms.date: 12/23/2025
ms.update-cycle: 180-days
ms.search.form: 
no-loc: [Copilot]
ms.collection: ce-skilling-ai-copilot
---

# AI services in Fabric (preview)

[!INCLUDE [feature-preview](../../includes/feature-preview-note.md)]

[Azure AI services](/azure/ai-services/what-are-ai-services) help developers and organizations rapidly create intelligent, cutting-edge, market-ready, and responsible applications with prebuilt and customizable APIs and models. Formerly named **Azure Cognitive Services**, Azure AI services empower developers even when they don't have direct AI or data science skills or knowledge. The goal of Azure AI services is to help developers create applications that can see, hear, speak, understand, and even begin to reason.

Fabric provides two options to use Azure AI services:

- **Pre-built AI models in Fabric (preview)**

    Fabric seamlessly integrates with Azure AI services, allowing you to enrich your data with prebuilt AI models without any prerequisite. We recommend this option because you can use your Fabric authentication to access AI services, and all usages are billed against your Fabric capacity. This option is currently in public preview, with limited AI services available.

    Fabric offers [Azure OpenAI Service](https://azure.microsoft.com/products/ai-services/openai-service/), [Text Analytics](https://azure.microsoft.com/products/ai-services/text-analytics/), and [Azure AI Translator](https://azure.microsoft.com/products/ai-services/translator/) by default, with support for both SynapseML and the RESTful API. You can also use the [OpenAI Python Library](https://platform.openai.com/docs/api-reference?lang=python) to access Azure OpenAI service in Fabric. For more information about available models, visit [prebuilt AI models in Fabric](./ai-services-overview.md#prebuilt-ai-models-in-fabric-preview).

- **Bring your own key (BYOK)**

    You can provision your AI services on Azure, and bring your own key to use them from Fabric. If the prebuilt AI models don't yet support the desired AI services, you can still use BYOK (Bring your own key).

    To learn more about how to use Azure AI services with BYOK, visit [Azure AI services in SynapseML with bring your own key](./ai-services-in-synapseml-bring-your-own-key.md).

## Prebuilt AI models in Fabric (preview)

### [Azure OpenAI Service](https://azure.microsoft.com/products/ai-services/openai-service/)

[REST API](how-to-use-openai-via-rest-api.md), [Python SDK](how-to-use-openai-sdk-synapse.md), [SynapseML](how-to-use-openai-sdk-synapse.md)

- Language Models: `gpt-5`, `gpt-4.1`, and `gpt-4.1-mini` are hosted. [See table for details](#consumption-rate-for-openai-language-models)
- Text Embedding Model: `text-embedding-ada-002` is hosted. [See table for details](#consumption-rate-for-openai-embedding-models)

### [Text Analytics](https://azure.microsoft.com/products/ai-services/text-analytics/) 
[REST API](how-to-use-text-analytics.md), [SynapseML](how-to-use-text-analytics.md)
- Language detection: detects language of the input text
- Sentiment analysis: returns a score between 0 and 1, to indicate the sentiment in the input text
- Key phrase extraction: identifies the key talking points in the input text
- Personally Identifiable Information(PII) entity recognition: identify, categorize, and redact sensitive information in the input text
- Named entity recognition: identifies known entities and general named entities in the input text
- Entity linking: identifies and disambiguates the identity of entities found in text

### [Azure AI Translator](https://azure.microsoft.com/products/ai-services/translator/) 
[REST API](how-to-use-text-translator.md), [SynapseML](how-to-use-text-translator.md)
- Translate: Translates text
- Transliterate: Converts text in one language, in one script, to another script.

## Available regions

### Available regions for Azure OpenAI Service

For the list of Azure regions where prebuilt AI services in Fabric are now available, visit the [Available regions](../../fundamentals/copilot-fabric-overview.md#available-regions) section of the **Overview of Copilot in Fabric and Power BI (preview)** article.

### Available regions for Text Analytics and Azure AI Translator 
Prebuilt [Text Analytics](https://azure.microsoft.com/products/ai-services/text-analytics/) and the [Azure AI Translator](https://azure.microsoft.com/products/ai-services/translator/) in Fabric are now available for public preview in the Azure regions listed in this article. If you don't find your Microsoft Fabric home region in this article, you can still create a Microsoft Fabric capacity in a supported region. For more information, visit [Buy a Microsoft Fabric subscription](../../enterprise/buy-subscription.md).
To determine your Fabric home region, visit [Find your Fabric home region](../../admin/find-fabric-home-region.md).

| Asia Pacific | Europe | Americas | Middle East and Africa |
| -------- | ------- | ------- | ------- |
| Australia East | North Europe | Brazil South | South Africa North |
| Australia Southeast | West Europe | Canada Central | UAE North |
|  Central Indian | France Central | Canada East |  |
| East Asia | Norway East |  East US | |
| Japan East | Switzerland North | East US 2 |  |
|  Korea Central | Switzerland West | North Central US |  |
| Southeast Asia | UK South | South Central US |  |
|  South India | UK West | West US |  |
| |  | West US 2 |  |
|   |  | West US 3 |  |

## Consumption rate

### Consumption rate for OpenAI language models

| **Model** | **Deployment Name** | **Context Window (Tokens)** | **Input (Per 1,000 Tokens)** | **Cached Input (Per 1,000 Tokens)**  | **Output (Per 1,000 Tokens)** | **Retirement Date** |
|---|---|---|---|---|---|---|
| gpt-5-2025-08-07 | `gpt-5` | 400,000<br> Max output: 128,000 |  42.02 CU seconds | 4.20 CU seconds | 336.13 CU seconds | TBD |
| gpt-4.1-2025-04-14 | `gpt-4.1` | 128,000<br>Max output: 32,768 | 67.23 CU seconds | 16.81 CU seconds | 268.91 CU seconds | TBD |
| gpt-4.1-mini-2025-04-14 | `gpt-4.1-mini` | 128,000<br>Max output: 32,768 | 13.45 CU seconds | 3.36 CU seconds | 53.78 CU seconds | TBD |

### Consumption rate for OpenAI embedding models

| **Models** | **Deployment Name** | **Context (Tokens)** | **Input (Per 1,000 Tokens)** |
|---|---|---|---|
| Ada | `text-embedding-ada-002` | 8192 | 3.36 CU seconds |

### Consumption rate for Text Analytics

| **Operation** | **Operation Unit of Measure** | **Consumption rate** |
|---|---|---|
|Language Detection | 1,000 text records | 33,613.45 CU seconds|
|Sentiment Analysis | 1,000 text records | 33,613.45 CU seconds|
|Key Phrase Extraction | 1,000 text records | 33,613.45 CU seconds|
|Personally Identifying Information Entity Recognition | 1,000 text records| 33,613.45 CU seconds|
|Named Entity Recognition | 1,000 text records | 33,613.45 CU seconds|
|Entity Linking | 1,000 text records | 33,613.45 CU seconds|
|Summarization | 1,000 text records | 67,226.89 CU seconds|

### Consumption rate for Text Translator

| **Operation** | **Operation Unit of Measure** | **Consumption rate** |
|---|---|---|
|Translate | 1M Characters | 336,134.45 CU seconds|
|Transliterate | 1M Characters | 336,134.45 CU seconds|

## Changes to AI services in Fabric consumption rate

Consumption rates are subject to change at any time. Microsoft uses reasonable efforts to provide notice via email or through in-product notification. Changes shall be effective on the date stated in the Microsoft Release Notes or the Microsoft Fabric Blog. If any change to an AI service in Fabric Consumption Rate materially increases the Capacity Units (CU) required to use, customers can use the cancellation options available for the chosen payment method.

## Monitor the Usage

The workload meter associated with the task determines the charges for prebuilt AI services in Fabric. For example, if AI service usage is derived from a Spark workload, the AI usage is grouped together and billed under the Spark billing meter on [Fabric Capacity Metrics app](../../enterprise/metrics-app-compute-page.md).

> [!NOTE]
> The billing for prebuilt AI services does not support the [Autoscale Spark billing](../../data-engineering/autoscale-billing-for-spark-overview.md).

### Example

An online shop owner uses SynapseML and Spark to categorize millions of products into relevant categories. Currently, the shop owner applies hard-coded logic to clean and map the raw "product type" to categories. However, the owner plans to switch to use of the new native Fabric OpenAI LLM (Large Language Model) endpoints. This iteratively processes the data against an LLM for each row, and then categorizes the products based on their "product name," "description," "technical details," and so on.

The expected cost for Spark usage is 1000 CUs. The expected cost for OpenAI usage is about 300 CUs.

To test the new logic, first iterate it in a Spark notebook interactive run. For the operation name of the run, use "Notebook Run." The owner expects to see an all-up usage of 1300 CUs under "Notebook Run," with the Spark billing meter accounting for the entire usage.​

Once the shop owner validates the logic, the owner sets up the regular run and expects to see an all-up usage of 1300 CUs under the operation name "Spark Job Scheduled Run," with the Spark billing meter accounting for the entire usage.​

According to [Spark compute usage reporting](../../data-engineering/billing-capacity-management-for-spark.md#spark-compute-usage-reporting), all Spark related operations are classified as [background operations](../../enterprise/fabric-operations.md#background-operations).

## Related content
- [Use prebuilt Azure OpenAI in Fabric](how-to-use-openai-sdk-synapse.md)
