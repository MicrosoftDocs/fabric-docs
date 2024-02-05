---
title: Use Azure AI services in Fabric
description: Overview of using Azure AI services in Fabric.
ms.reviewer: ssalgado
author: ruixinxu
ms.author: ruxu
ms.topic: overview
ms.custom:
  - references_regions
  - ignite-2023
  - ignite-2023-fabric
ms.date: 11/15/2023
ms.search.form:
---

# AI services in Fabric (preview)

[!INCLUDE [feature-preview](../../includes/feature-preview-note.md)]

[Azure AI services](/azure/ai-services/what-are-ai-services), formerly known as Azure Cognitive Services, help developers and organizations rapidly create intelligent, cutting-edge, market-ready, and responsible applications with prebuilt and customizable APIs and models. AI services empower developers even when they don't have direct AI or data science skills or knowledge. The goal of Azure AI services is to help developers create applications that can see, hear, speak, understand, and even begin to reason. 

Fabric provides two options for utilizing Azure AI services:

- **Pre-built AI models in Fabric (preview)**. 

    Fabric seamlessly integrates with Azure AI services, allowing you to enrich your data with prebuilt AI models without any prerequisite. We recommend using this option as you can utilize your Fabric authentication to access AI services, and all usage are billed against your Fabric capacity. This option is currently in public preview with limited AI services available. 

    [Azure OpenAI Service](https://azure.microsoft.com/products/ai-services/openai-service/), [Text Analytics](https://azure.microsoft.com/products/ai-services/text-analytics/), [Azure AI Translator](https://azure.microsoft.com/products/ai-services/translator/) are available out of the box in Fabric, with support for both RESTful API and SynapseML. You can also use the [OpenAI Python Library](https://platform.openai.com/docs/api-reference?lang=python) to access Azure OpenAI service in Fabric. For more information on available models, see [prebuilt AI models in Fabric](./ai-services-overview.md#prebuilt-ai-models-in-fabric-preview).

- **Bring your own key (BYOK)**. 

    You can provision your AI services on Azure and bring your own key to use them from Fabric. If the desired AI services aren't yet supported in the prebuilt AI models, you can still use BYOK. 

    To learn more about how to use Azure AI services with BYOK, visit [Azure AI services in SynapseML with bring your own key](./ai-services-in-synapseml-bring-your-own-key.md).

## Prebuilt AI models in Fabric (preview)

### [Azure OpenAI Service](https://azure.microsoft.com/products/ai-services/openai-service/) 

[REST API](how-to-use-openai-via-rest-api.md), [Python SDK](how-to-use-openai-sdk-synapse.md). [SynapseML](how-to-use-openai-sdk-synapse.md)

- GPT-35-turbo: GPT-3.5 models can understand and generate natural language or code. The most capable and cost effective model in the GPT-3.5 family is GPT-3.5 Turbo, which has been optimized for chat and works well for traditional completions tasks as well. The `gpt-35-turbo` model supports 4096 max input tokens and the `gpt-35-turbo-16k` model supports up to 16,384 tokens.
- text-embedding-ada-002 (version 2), embedding model that can be used with embedding API requests. The maximum accepted request token is 8,191, and the returned vector has dimensions of 1,536.
- text-davinci-003, a legacy model that can do any language task with better quality, longer output, and consistent instruction.
- code-cushman-002, a legacy model that is optimized for code-completion tasks.

### [Text Analytics](https://azure.microsoft.com/products/ai-services/text-analytics/) 
[REST API](how-to-use-text-analytics.md), [SynapseML](how-to-use-text-analytics.md)
- Language detection: detects language of the input text.
- Sentiment analysis: returns a score between 0 and 1 indicating the sentiment in the input text.
- Key phrase extraction: identifies the key talking points in the input text. 
- Personally Identifiable Information(PII) entity recognition: identify, categorize, and redact sensitive information in the input text.
- Named entity recognition: identifies known entities and general named entities in the input text.
- Entity linking: identifies and disambiguates the identity of entities found in text.

### [Azure AI Translator](https://azure.microsoft.com/products/ai-services/translator/) 
[REST API](how-to-use-text-translator.md), [SynapseML](how-to-use-text-translator.md)
- Translate: Translates text.
- Transliterate: Converts text in one language from one script to another script.
- Detect: Identifies the language of a piece of text. 
- BreakSentence: Identifies the positioning of sentence boundaries in a piece of text. 
- Dictionary Lookup: Provides alternative translations for a word and a few idiomatic phrases.
- Dictionary Examples: Provides examples that show how terms in the dictionary are used in context. 


## Available regions

### Available regions for Azure OpenAI Service

To access the prebuilt [Azure OpenAI Service](https://azure.microsoft.com/products/ai-services/openai-service/), including the [Copilot in Fabric](../../get-started/copilot-fabric-overview.md), you must have a paid SKU (F64 or higher, or P1 or higher) with capacity available in the following [Fabric regions](../../admin/region-availability.md). The Azure OpenAI Service isn't available on trial SKUs.

[Azure OpenAI Service](https://azure.microsoft.com/products/ai-services/openai-service/) is powered by large language models that are currently only deployed to US datacenters (East US, East US2, South Central US, and West US) and France datacenter (France Central). If your data is outside the US or France, the feature is disabled by default unless your tenant admin enables **Data sent to Azure OpenAI can be processed outside your tenant's geographic region, compliance boundary, or national cloud instance** tenant setting. To learn how to get to the tenant settings, see [About tenant settings](../../admin/tenant-settings-index.md).

### Available regions for Text Analytics and Azure AI Translator 
Prebuilt [Text Analytics](https://azure.microsoft.com/products/ai-services/text-analytics/), [Azure AI Translator](https://azure.microsoft.com/products/ai-services/translator/)  in Fabric are now available for public preview in the Azure regions listed in this article. If your Microsoft Fabric home region isn't listed, you can still create a Microsoft Fabric capacity in a region that is supported. For more information, see [Buy a Microsoft Fabric subscription](../../enterprise/buy-subscription.md).
To find out what your Fabric home region is, see [Find your Fabric home region](../../admin/find-fabric-home-region.md).


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




## Related content
- [Use prebuilt Azure OpenAI in Fabric](how-to-use-openai-sdk-synapse.md)
- [Use prebuilt Text Analytics in Fabric](how-to-use-text-analytics.md)
- [Use prebuilt Azure AI Translator in Fabric](how-to-use-text-translator.md)
