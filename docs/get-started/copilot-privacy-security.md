---
title: "Privacy, security, and responsible use of Copilot for data science and AI skill (preview)"
description: Learn about privacy, security, and responsible use for Copilot for data science in Microsoft Fabric.
author: maggiesMSFT
ms.author: maggies
ms.reviewer: 'guptamaya'
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
  - build-2024
ms.topic: conceptual
ms.date: 06/13/2024
no-loc: [Copilot]
ms.collection: ce-skilling-ai-copilot
---
# Privacy, security, and responsible use of Copilot for data science and AI skill (preview)

With Copilot for data science in Microsoft Fabric and other generative AI features such as the AI skill in preview, Fabric brings a new way to transform and analyze data, generate insights, and get answers from your data in natural language in data science and the other workloads.

In this article, learn how  and the AI skill item \keep your business data secure and adhere to privacy requirements, and how you and your organization can use these generative AI features responsibly. This article expands on the foundational information in Privacy, security, and responsible use for Copilot (preview). The AI skill uses the same general process and underlying Azure OpenAI service models as Copilot in Fabric.

For details, intended uses, and limitations of these features, read about Copilot for data science and the AI skill. 

## Data use in Copilot for data science

In notebooks, Copilot can only access data that is accessible to the user's current notebook, either in an attached lakehouse or directly loaded or imported into that notebook by the user. In notebooks, Copilot can't access any data that's not accessible to the notebook.

By default, Copilot has access to the following data types:

- Previous messages sent to and replies from Copilot for that user in that session.
- Contents of cells that the user has executed.
- Outputs of cells that the user has executed.
- Schemas of data sources in the notebook.
- Sample data from data sources in the notebook.
- Schemas from external data sources in an attached lakehouse.

## Data use in AI skills

The AI skill only has access to the data that you provide. It makes use of the schema (table name and column name), as well as the Notes for the model that you provide in the UI.

The AI skill only ever have access to data that the questioner has access to. If you use the AI skill, your credentials are used to access the underlying database. If you don't have access to the underlying data, the AI doesn't either. This limitation holds true when you publish the AI skill to other destinations, such as Copilot for Microsoft 365 or Microsoft Copilot Studio.

## Evaluation of Copilot for data science

The product team has tested Copilot to see how well the system performs within the context of notebooks, and whether AI responses are insightful and useful.

The team also invested in additional harms mitigations, including technological approaches to focusing Copilot's output on topics related to data science.

## Evaluation of the AI skill

The product team has tested the AI skill on a variety of public and private benchmarks for SQL tasks to ascertain the quality of SQL queries.

The team also invested in additional harms mitigations, including technological approaches to focusing the AI skill’s output on the context of the chosen data sources.

## Tips for working with Copilot for data science

- Copilot is best equipped to handle data science topics, so limit your questions to this area.
- Be explicit about the data you want Copilot to examine. If you describe the data asset, such as naming files, tables, or columns, Copilot is more likely to retrieve relevant data and generate useful outputs.
- If you want more granular responses, try loading data into the notebook as DataFrames or pinning the data in your lakehouse. This gives Copilot more context with which to perform analysis. If an asset is too large to load, pinning it is a helpful alternative.

## Tips for improving AI skill performance

- Make sure your column names are descriptive. Instead of using column names like "C1" or "ActCu," use "ActiveCustomer" or "IsCustomerActive." This is the most effective way to get more reliable queries out of the AI.
- Make use of the Notes for the model in the configuration panel in the UI. If the SQL queries that the AI skill generates are incorrect, you can provide instructions to the model in plain English to improve upon future queries. The system makes use of these instructions with every query. Short and direct instructions are best.

Before your business starts using Copilot in Fabric, you may have questions about how it works, how it keeps your business data secure and adheres to privacy requirements, and how to use generative AI responsibly.

This article provides answers to common questions related to business data security and privacy to help your organization get started with Copilot in Fabric. The article [Privacy, security, and responsible use for Copilot in Power BI (preview)](copilot-power-bi-privacy-security.md) provides an overview of Copilot in Power BI. Read on for details about Copilot for Fabric.

[!INCLUDE [copilot-note-include](../includes/copilot-note-include.md)]

## Overview

### Your business data is secure

- Copilot features use [Azure OpenAI Service](/azure/ai-services/openai/overview), which is fully controlled by Microsoft. Your data isn't used to train models and isn't available to other customers.
- You retain control over where your data is processed. Data processed by Copilot in Fabric stays within your tenant's geographic region, unless you explicitly allow data to be processed outside your region—for example, to let your users use Copilot when Azure OpenAI isn't available in your region or availability is limited due to high demand. Learn more about [admin settings for Copilot](../admin/service-admin-portal-copilot.md).

### Check Copilot outputs before you use them

- Copilot responses can include inaccurate or low-quality content, so make sure to review outputs before you use them in your work.
- People who can meaningfully evaluate the content's accuracy and appropriateness should reviews the outputs.
- Today, Copilot features work best in the English language. Other languages may not perform as well.

> [!IMPORTANT]
> Review the [supplemental preview terms for Fabric](https://azure.microsoft.com/support/legal/preview-supplemental-terms/), which includes terms of use for Microsoft Generative AI Service Previews.

## How Copilot works

In this article, *Copilot* refers to a range of generative AI features and capabilities in Fabric that are powered by Azure OpenAI Service.

In general, these features are designed to generate natural language, code, or other content based on:

(a) [inputs you provide](#prompt-or-input), and,

(b) [grounding data](#grounding) that the feature has access to.

For example, Power BI, Data Factory, and data science offer Copilot chats where you can ask questions and get responses that are contextualized on your data. Copilot for Power BI can also create reports and other visualizations. Copilot for Data Factory can transform your data and explain what steps it has applied. data science offers Copilot features outside of the chat pane, such as custom IPython magic commands in notebooks. Copilot chats may be added to other experiences in Fabric, along with other features that are powered by Azure OpenAI under the hood.

This information is sent to Azure OpenAI Service, where it's processed and an output is generated. Therefore, data processed by Azure OpenAI can include:  

- The user's [prompt or input](#prompt-or-input).
- [Grounding data](#grounding).
- The [AI response or output](#response-or-output).

Grounding data may include a combination of dataset schema, specific data points, and other information relevant to the user's current task. Review each experience section for details on what data is accessible to Copilot features in that scenario.  

Interactions with Copilot are specific to each user. This means that Copilot can only access data that the current user has permission to access, and its outputs are only visible to that user unless that user shares the output with others, such as sharing a generated Power BI report or generated code. Copilot doesn't use data from other users in the same tenant or other tenants.

Copilot uses Azure OpenAI—not the publicly available OpenAI services—to process all data, including user inputs, grounding data, and Copilot outputs.  Copilot currently uses a combination of GPT models, including GPT 3.5. Microsoft hosts the OpenAI models in the Microsoft Azure environment, and the Service doesn't interact with any services by OpenAI, such as ChatGPT or the OpenAI API. Your data isn't used to train models and isn't available to other customers. Learn more about [Azure OpenAI](/azure/ai-services/openai/overview).

## The Copilot process

These features follow the same general process:

1. **Copilot [receives a prompt](#prompt-or-input) from a user**. This prompt could be in the form of a question that a user types into a chat pane, or in the form of an action such as selecting a button that says "Create a report."  
1. **Copilot preprocesses the prompt through an [approach called grounding](#grounding)**. Depending on the scenario, this might include retrieving relevant data such as dataset schema or chat history from the user's current session with Copilot. Grounding improves the specificity of the prompt, so the user gets responses that are relevant and actionable to their specific task. Data retrieval is scoped to data that is accessible to the authenticated user based on their permissions. See the section [What data does Copilot use and how is it processed?](#what-data-does-copilot-use-and-how-is-it-processed) in this article for more information.
1. **Copilot takes the response from Azure OpenAI and postprocesses it**. Depending on the scenario, this postprocessing might include responsible AI checks, filtering with Azure content moderation, or additional business-specific constraints.
1. **Copilot [returns a response](#response-or-output) to the user in the form of natural language, code, or other content**. For example, a response might be in the form of a chat message or generated code, or it might be a contextually appropriate form such as a Power BI report or a Synapse notebook cell.
1. **The user reviews the response before using it**. Copilot responses can include inaccurate or low-quality content, so it's important for subject matter experts to check outputs before using or sharing them.

Just as each experience in Fabric is built for certain scenarios and personas—from data engineers to data analysts—each Copilot feature in Fabric has also been built with unique scenarios and users in mind. For capabilities, intended uses, and limitations of each feature, review the section for the experience you're working in.

## Definitions 

### Prompt or input

The text or action submitted to Copilot by a user. This could be in the form of a question that a user types into a chat pane, or in the form of an action such as selecting a button that says "Create a report."  

### Grounding

A preprocessing technique where Copilot retrieves additional data that's contextual to the user's prompt, and then sends that data along with the user's prompt to Azure OpenAI in order to generate a more relevant and actionable response.

### Response or output

The content that Copilot returns to a user. For example, a response might be in the form of a chat message or generated code, or it might be contextually appropriate content such as a Power BI report or a Synapse notebook cell.

## What data does Copilot use and how is it processed?

To generate a response, Copilot uses:

- The user's prompt or input and, when appropriate, 
- Additional data that is retrieved through the grounding process. 

This information is sent to Azure OpenAI Service, where it's processed and an output is generated. Therefore, data processed by Azure OpenAI can include:  

- The user's prompt or input.
- Grounding data.
- The AI response or output.

Grounding data may include a combination of dataset schema, specific data points, and other information relevant to the user's current task. Review each experience section for details on what data is accessible to Copilot features in that scenario.  

Interactions with Copilot are specific to each user. This means that Copilot can only access data that the current user has permission to access, and its outputs are only visible to that user unless that user shares the output with others, such as sharing a generated Power BI report or generated code. Copilot doesn't use data from other users in the same tenant or other tenants.

Copilot uses Azure OpenAI—not OpenAI's publicly available services—to process all data, including user inputs, grounding data, and Copilot outputs.  Copilot currently uses a combination of GPT models, including GPT 3.5. Microsoft hosts the OpenAI models in Microsoft's Azure environment and the Service doesn't interact with any services by OpenAI (for example, ChatGPT or the OpenAI API). Your data isn't used to train models and isn't available to other customers. Learn more about [Azure OpenAI](/azure/ai-services/openai/overview).

### Data residency and compliance

*You retain control over where your data is processed.* Data processed by Copilot in Fabric stays within your tenant's geographic region, unless you explicitly allow data to be processed outside your region—for example, to let your users use Copilot when Azure OpenAI isn't available in your region or availability is limited due to high demand. (See [where Azure OpenAI is currently available.](/azure/ai-services/openai/concepts/models#model-summary-table-and-region-availability))

To allow data to be processed elsewhere, your admin can turn on the setting **Data sent to Azure OpenAI can be processed outside your tenant's geographic region, compliance boundary, or national cloud instance**. Learn more about [admin settings for Copilot](../admin/service-admin-portal-copilot.md).

## What should I know to use Copilot responsibly?

Microsoft is committed to ensuring that our AI systems are guided by our [AI principles](https://www.microsoft.com/ai/principles-and-approach/) and [Responsible AI Standard](https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE5cmFl). These principles include empowering our customers to use these systems effectively and in line with their intended uses. Our approach to responsible AI is continually evolving to proactively address emerging issues.

Copilot features in Fabric are built to meet the Responsible AI Standard, which means that they're reviewed by multidisciplinary teams for potential harms, and then refined to include mitigations for those harms.  

Before you use Copilot, keep in mind the limitations of Copilot:

- Copilot responses can include inaccurate or low-quality content, so make sure to review outputs before using them in your work.
- People who are able to meaningfully evaluate the content's accuracy and appropriateness should review the outputs.
- Currently, Copilot features work best in the English language. Other languages may not perform as well.

## Copilot for Fabric workloads

Privacy, security, and responsible use for:

- [Copilot for Data Factory (preview)](copilot-data-factory-privacy-security.md)
- [Copilot for data science (preview)](copilot-data-science-privacy-security.md)
- [Copilot for Data Warehouse (preview)](copilot-data-warehouse-privacy-security.md)
- [Copilot for Power BI (preview)](copilot-power-bi-privacy-security.md)
- [Copilot for Real-Time Intelligence (preview)](copilot-real-time-intelligence-privacy-security.md)

## Related content

- [What is Microsoft Fabric?](microsoft-fabric-overview.md)
- [Copilot in Fabric and Power BI: FAQ](copilot-faq-fabric.yml)
