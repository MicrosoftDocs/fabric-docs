---
title: Copilot in Fabric glossary and terms
description: Learn the definitions of terms and key concepts related to Copilot functionality in Microsoft Fabric.
author: denglishbi
ms.author: daengli
ms.reviewer: sngun
ms.topic: conceptual
ms.collection: ce-skilling-ai-copilot
ms.date: 04/02/2025
---

# Copilot in Fabric glossary and terms

This article provides an overview of selected key terms and their definitions in the context of Copilot in Fabric. Refer to these terms when you read articles on Copilot in Fabric, or when you use Copilot and need a reminder about what a term or name means.

| **Term** | **Definition (in context of Copilot in Fabric)** |
|---|---|
| [*Azure AI Search*](/azure/search/search-what-is-azure-search)<br>([*formerly Azure Cognitive Search*](/azure/search/whats-new#new-service-name)) | A search and retrieval system with a comprehensive set of advanced search technologies, built for high-performance applications at any scale. Azure AI Search is the primary recommended retrieval system when building RAG-based applications on Azure, with native LLM integrations between Azure OpenAI Service and Azure Machine Learning.<br>,<br>You use Azure AI Search to create your own copilots. |
| [*Azure OpenAI Service*](/azure/ai-services/openai/overview)<br>*(Azure OpenAI)* | Provides REST API access to OpenAI's language models. Azure OpenAI Service is a Microsoft-managed service which doesn't use the public OpenAI services or resources. Copilot sends the preprocessed input to Azure OpenAI so that the input can be processed. After processing, Azure OpenAI returns an LLM response to Copilot for postprocessing.<br><br>You can't view, access, or modify Azure OpenAI Services used for Copilot in Fabric. |
| *Capacity units (CUs)* | How you measure capacity usage by using the [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md). The number of CUs you have depends on your Fabric capacity SKU; higher SKUs have a higher number of available CUs. When you use 100% of your available CUs, you can enter a state of throttling, which might result in degraded performance and errors.<br><br>Copilot in Fabric consumes from your available Fabric CUs. |
| *Capacity usage* | The compute impact of all your capacity operations.<br><br>Copilot in Fabric is a background operation that results in capacity usage. |
| *Consumption (of Fabric CUs)* | The use of Fabric CUs. Synonymous with capacity usage.<br><br>Using Copilot in Fabric results in consumption of your Fabric CUs. |
| *Copilot* | A generative AI assistant that aims to enhance the data analytics experience in the Fabric platform. There are different Copilots in each workload, and different Copilot experiences depending on what item and UI you're working with. |
| *Embedding (in the context of LLMs)* | The process of turning tokens into dense vectors of real numbers. Embeddings provide LLMs with the semantic meaning of a given token based on other tokens around it in a sentence or paragraph. |
| *Experience* | A functional module for Copilot, such as the DAX query experience, which generates DAX code, and the report page generation experience, which generates visuals for a Power BI report page.<br><br>When you use Copilot in Fabric, you use different Copilot experiences. Each workload and item can have multiple experiences. |
| *Foundation model* | The base models made available by vendors such OpenAI (for the GPT models) or Anthropic (for Claude models). Each model has its own training data and works differently, such as using different ways to tokenize and process input to produce a response.<br><br>Copilot in Fabric uses the GPT foundation models from OpenAI, hosted by Microsoft in the Azure OpenAI Service. You can't change or fine-tune these models yourself. |
| *Generative AI* | A form of artificial intelligence in which models are trained to generate new original content based on natural language input.<br><br>Copilot in Fabric is a tool that leverages generative AI technology, which attempts to enhance the data analytics experience in the Fabric platform. |
| *Grounding* | A preprocessing technique where additional contextual information is retrieved and used to enhance the specificity and usefulness of the LLM response. Grounding data is always specific to a user and respects the permissions to items and any enforced data security.<br><br>Copilot in Fabric performs grounding during preprocessing of the input prompt, which might involve retrieving information from the current active Copilot session, item metadata, or specific data points. |
| *Input* | The prompt or interaction given to Copilot which starts the Copilot process.<br><br>Copilot in Fabric uses different inputs; mainly, a written, natural language input from the user, or a generated natural language input from the user interacting with a button or similar UI element. |
| *Large language model (LLM)*| Deep learning models trained using large text corpora to generate text. LLMs are based on the idea of auto-regressive models, where they have been trained to predict the next word (or the most probable ones) given the previous ones. LLMs can be used to process large amounts of text and learn the structure and syntax of human language.<br><br>Copilot in Fabric leverages the GPT series of LLMs from OpenAI, which are hosted in the Azure OpenAI Service. |
| *Meta-prompt* | A prompt that isn't provided by the user. Meta-prompts are provided by Copilot and configured by Microsoft. Each Copilot experience uses their own meta-prompts to improve the specificity and usefulness of Copilot outputs. For instance, the DAX Query Copilot experience uses a meta-prompt that contains multiple examples of DAX queries and expressions. |
| *Natural language* | A naturally occurring or conversational language.<br><br>Copilot in Fabric can receive user input from a natural language prompt. |
| [*Operation (of Fabric)*](/fabric/enterprise/fabric-operations) | Activities that occur in Fabric and result in capacity usage.<br><br>On-demand requests and operations that can be triggered by user interactions with the UI, such as data model queries generated by report visuals, are classified as *interactive* operations. Longer running operations such as semantic model or dataflow refreshes are classified as *background* operations.<br><br>Copilot in Fabric is a background operation. |
| *Orchestrator* | A task during Copilot preprocessing that determines what skill or tool Copilot should use. The orchestrator determines this by using system information from a meta-prompt provided during the input. |
| *Output* | What Copilot returns to a user after postprocessing. Outputs can consist of low quality and inaccurate content, so users should critically evaluate each output before further use or decision-making.<br><br>Copilot in Fabric can return different outputs depending on the experience that an individual is using. |
| *Preprocessing* | Activities by Copilot where the user input is taken and enhanced, or additional information is retrieved, in order to try to produce a more specific and useful output. |
| *Postprocessing* | Activities by Copilot where the LLM response is taken, filtered, and handled to produce the final output. Postprocessing activities vary greatly depending on the specific Copilot experience that an individual is using. |
| *Prompt* | An input for Copilot written in natural language by a user or generated by Copilot in response to user interaction. |
| [*Q&A*](/power-bi/natural-language/power-bi-tutorial-q-and-a) *(Power BI feature)* | A feature in Power BI that lets you ask questions of your data using natural data and get a response. Q&A uses natural language processing, but not generative AI.<br><br>Copilot in Fabric can be used to enhance the Q&A experience; for instance, it can generate synonyms for linguistic modeling. |
| *Response (of an LLM)* | The result of a processed input. An LLM response is always text, but that text can be either natural language, code, or metadata. |
| *Responsible AI (RAI)* | A set of guiding principles and practices that, in theory, should mitigate risks and improve ethical use of AI if they're followed. |
| *Retrieval augmented generation (RAG)* | An architecture that augments the capabilities of an LLM by adding an information retrieval system that provides grounding data.<br><br>Copilot in Fabric uses RAG during preprocessing. |
| *Skill* | A specific task within a Copilot experience. For instance, filtering a report page is a skill of the Copilot report page summary experience. |
| [*Stock-keeping unit (SKU)*](../enterprise/licenses.md#capacity) | The size of your Fabric capacity. A SKU is indicated by the letter *F* followed by a number, such as F2 or F8. Larger numbers correspond to larger SKUs.<br><br>Copilot in Fabric is only available for SKUs of F2 or higher.<br><br>Copilot and AI features are currently not supported on trial capacity.|
| *Smoothing* | A process in Fabric where capacity usage of a background operation is spread over a 24-hour window, starting from when the operation begins to exactly 24 hours later. Smoothing operations reduce the impact peak concurrent usage on your Fabric capacity.<br><br>All Copilot in Fabric capacity usage is smoothed, because it's a background operation. |
| *Token* | The smallest unit of information that an LLM uses. A token comprises one or more characters of frequently co-occurring text. Each token has a corresponding unique integer for a given LLM, known as a *Token ID*. Tokens are necessary to convert natural language into a numerical representation, which is what an LLM uses to process input and return a response. |
| *Tokenization* | The process of converting natural language inputs to tokens. Tokenization is done by an LLM, and different LLMs tokenize inputs in different ways. |
| *Workload* | The different functional areas of Fabric, like Data Engineering, Data Science, or Power BI. Different workloads in Fabric use different Copilots. There are different Copilot experiences in each workload. |

## Related content

- [What is Microsoft Fabric?](../fundamentals/microsoft-fabric-overview.md)
- [Copilot in Fabric: FAQ](../fundamentals/copilot-faq-fabric.yml)