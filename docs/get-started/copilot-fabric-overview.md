---
title: Overview of Copilot in Fabric and Power BI (preview)
description: Learn about Copilot in Fabric and Power BI, which brings a new way to transform and analyze data, generate insights, and create visualizations and reports.
author: maggiesMSFT
ms.author: maggies
ms.reviewer: 'guptamaya'
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.topic: conceptual
ms.date: 02/07/2024
no-loc: [Copilot]
---

# Overview of Copilot in Fabric and Power BI (preview)

Copilot and other generative AI features in preview bring new ways to transform and analyze data, generate insights, and create visualizations and reports in Microsoft Fabric and Power BI.

## Enable Copilot

Before your business can start using Copilot capabilities in Microsoft Fabric, you need to [enable Copilot](copilot-enable-fabric.md).

Read on for answers to your questions about how it works in the different workloads, how it keeps your business data secure and adheres to privacy requirements, and how to use generative AI responsibly. 

## Copilot for Data Science and Data Engineering

Copilot for Data Engineering and Data Science is an AI-enhanced toolset tailored to support data professionals in their workflow. It provides intelligent code completion, automates routine tasks, and supplies industry-standard code templates to facilitate building robust data pipelines and crafting complex analytical models. Utilizing advanced machine learning algorithms, Copilot offers contextual code suggestions that adapt to the specific task at hand, helping you code more effectively and with greater ease. From data preparation to insight generation, Microsoft Fabric Copilot acts as an interactive aide, lightening the load on engineers and scientists and expediting the journey from raw data to meaningful conclusions.

## Copilot for Data Factory

Copilot for Data Factory is an AI-enhanced toolset that supports both citizen and professional data wranglers in streamlining their workflow. It provides intelligent code generation to transform data with ease and generates code explanations to help you better understand complex tasks.

## Copilot for Power BI

Power BI has introduced generative AI that allows you to create reports automatically by selecting the topic for a report or by prompting Copilot for Power BI on a particular topic. You can use Copilot for Power BI to generate a summary for the report page that you just created, and generate synonyms for better Q&A capabilities. 

See the article [Overview of Copilot for Power BI](/power-bi/create-reports/copilot-introduction) for details of the features and how to use Copilot for Power BI.

## Copilot for Real-Time Analytics

Copilot for Real-Time Analytics is an advanced AI tool designed to help you explore your data and extract valuable insights. You can input questions about your data, which are then automatically translated into Kusto Query Language (KQL) queries. Copilot streamlines the process of analyzing data for both experienced KQL users and citizen data scientists. 

For more information, see [Copilot for Real-Time Analytics overview](copilot-real-time-analytics.md).

## How do I use Copilot responsibly?

Microsoft is committed to ensuring that our AI systems are guided by our [AI principles](https://www.microsoft.com/ai/principles-and-approach/) and [Responsible AI Standard](https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE5cmFl). These principles include empowering our customers to use these systems effectively and in line with their intended uses. Our approach to responsible AI is continually evolving to proactively address emerging issues.

The article [Privacy, security, and responsible use for Copilot (preview)](copilot-privacy-security.md) offers guidance on responsible use.

Copilot features in Fabric are built to meet the Responsible AI Standard, which means that they're reviewed by multidisciplinary teams for potential harms, and then refined to include mitigations for those harms.  

Before you use Copilot, your admin needs to enable Copilot in Fabric. See the article [Overview of Copilot in Fabric (preview)](copilot-fabric-overview.md) for details. Also, keep in mind the limitations of Copilot:

- Copilot responses can include inaccurate or low-quality content, so make sure to review outputs before using them in your work.
- Reviews of outputs should be done by people who are able to meaningfully evaluate the content's accuracy and appropriateness.
- Today, Copilot features work best in the English language. Other languages may not perform as well.

## Available regions

### Available regions for Azure OpenAI service 

To access the prebuilt [Azure OpenAI Service](https://azure.microsoft.com/products/ai-services/openai-service/), including the [Copilot in Fabric](copilot-fabric-overview.md), you must have a paid SKU (F64 or higher, or P1 or higher) with capacity available in the following [Fabric regions](../admin/region-availability.md). The Azure OpenAI Service isn't available on trial SKUs.

[Azure OpenAI Service](https://azure.microsoft.com/products/ai-services/openai-service/) is powered by large language models that are currently only deployed to US datacenters (East US, East US2, South Central US, and West US) and EU datacenter (France Central). If your data is outside the US or EU, the feature is disabled by default unless your tenant admin enables **Data sent to Azure OpenAI can be processed outside your capacity's geographic region, compliance boundary, or national cloud instance** tenant setting. To learn how to get to the tenant settings, see [About tenant settings](../admin/service-admin-portal-copilot.md).

### Data processing across geographic areas

The prebuilt [Azure OpenAI Service](https://azure.microsoft.com/products/ai-services/openai-service/) and [Copilot in Fabric](copilot-fabric-overview.md) may process your prompts and results (input and output when using Copilot) outside your capacity’s geographic region, depending on where the Azure OpenAI service is hosted. The table below shows the mapping of where data is processed across geographic areas for Copilot in Fabric and Azure OpenAI features.  

> [!NOTE]
> The data processed for Copilot interactions can include user prompts, meta prompts, structure of data (schema) and conversation history. No data, such as content in tables is sent to Azure OpenAI for processing unless it is included in the user prompts. 

|Geographic area where your Fabric Capacity is located |Geographic area where Azure OpenAI Service is hosted |Data processing outside your capacity’s geographic region? |Actions required to use Fabric Copilot |
|-|-|-|-|
|US |US |No |Turn-on Copilot |
|EU Data Boundary |EU Data Boundary |No |Turn-on Copilot |
|UK |EU Data Boundary |Yes |Turn-on Copilot<br>Enable cross-geo data processing |
|Australia<br>Brazil<br>Canada<br>India<br>Asia<br>Japan<br>Korea<br>South Africa<br>Southeast Asia<br>United Arab Emirates |US |Yes |Turn-on Copilot<br>Enable cross-geo data processing |


## Related content

- [What is Microsoft Fabric?](microsoft-fabric-overview.md)
- [Copilot in Fabric: FAQ](copilot-faq-fabric.yml)
- [AI services in Fabric (preview)](../data-science/ai-services/ai-services-overview.md)
- [Copilot tenant settings](../admin/service-admin-portal-copilot.md)
