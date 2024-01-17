---
title: Overview of Copilot in Fabric and Power BI(preview)
description: Learn about Copilot in Fabric and Power BI, which brings a new way to transform and analyze data, generate insights, and create visualizations and reports.
author: maggiesMSFT
ms.author: maggies
ms.reviewer: 'guptamaya'
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.topic: conceptual
ms.date: 01/16/2024
---

# Overview of Copilot in Fabric and Power BI (preview)

With Copilot and other generative AI features in preview, Microsoft Fabric brings a new way to transform and analyze data, generate insights, and create visualizations and reports.

We're enabling Copilot in stages. Everyone will have access by March 2024.

## Enable Copilot

Before your business can start using Copilot capabilities in Microsoft Fabric:

- Your administrator needs to enable the tenant switch before you start using Copilot. Administrators can read the article [Copilot tenant settings (preview)](../admin/service-admin-portal-copilot.md) for details. 
- Your F64 or P1 capacity needs to be in one of the regions listed in this article, [Fabric region availability](../admin/region-availability.md).
- Copilot in Microsoft Fabric isn't supported on trial SKUs. Only paid SKUs (F64 or higher, or P1 or higher) are supported.

The preview of Copilot in Microsoft Fabric is rolling out in stages with the goal that all customers with a paid Fabric capacity (F64 or higher) or Power BI Premium capacity (P1 or higher) have access to the Copilot preview. It becomes available to you automatically as a new setting in the Fabric admin portal when it's rolled out to your tenant. When charging begins for the Copilot in Fabric experiences, you can count Copilot usage against your existing Fabric or Power BI Premium capacity.

Read on for answers to your questions about how it works in the different workloads, how it keeps your business data secure and adheres to privacy requirements, and how to use generative AI responsibly. 

## Copilot for Data Science and Data Engineering

Copilot for Data Engineering and Data Science is an AI-enhanced toolset tailored to support data professionals in their workflow. It provides intelligent code completion, automates routine tasks, and supplies industry-standard code templates to facilitate building robust data pipelines and crafting complex analytical models. Utilizing advanced machine learning algorithms, Copilot offers contextual code suggestions that adapt to the specific task at hand, helping you code more effectively and with greater ease. From data preparation to insight generation, Microsoft Fabric Copilot acts as an interactive aide, lightening the load on engineers and scientists and expediting the journey from raw data to meaningful conclusions.

## Copilot for Data Factory

Copilot for Data Factory is an AI-enhanced toolset that supports both citizen and professional data wranglers in streamlining their workflow. It provides intelligent code generation to transform data with ease and generates code explanations to help you better understand complex tasks.

## Copilot for Power BI

Power BI has introduced generative AI that allows you to create reports automatically by selecting the topic for a report or by prompting Copilot for Power BI on a particular topic. You can use Copilot for Power BI to generate a summary for the report page that you just created, and generate synonyms for better Q&A capabilities. See the article [Overview of Copilot for Power BI](/power-bi/create-reports/copilot-introduction) for details of the features and how to use Copilot for Power BI.

## How do I use Copilot responsibly?

Microsoft is committed to ensuring that our AI systems are guided by our [AI principles](https://www.microsoft.com/ai/principles-and-approach/) and [Responsible AI Standard](https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE5cmFl). These principles include empowering our customers to use these systems effectively and in line with their intended uses. Our approach to responsible AI is continually evolving to proactively address emerging issues. Copilot sends your customer data to generate summaries to Azure OAI, where it's stored for 30 days. See the [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms) for details.

The article [Privacy, security, and responsible use for Copilot (preview)](copilot-privacy-security.md) offers guidance on responsible use.

Copilot features in Fabric are built to meet the Responsible AI Standard, which means that they're reviewed by multidisciplinary teams for potential harms, and then refined to include mitigations for those harms.  

Before you use Copilot, your admin needs to enable Copilot in Fabric. See the article [Overview of Copilot in Fabric (preview)](copilot-fabric-overview.md) for details. Also, keep in mind the limitations of Copilot:

- Copilot responses can include inaccurate or low-quality content, so make sure to review outputs before using them in your work.
- Reviews of outputs should be done by people who are able to meaningfully evaluate the content's accuracy and appropriateness.
- Today, Copilot features work best in the English language. Other languages may not perform as well.

## Available regions

For the list of Azure regions where prebuilt AI services in Fabric are now available, see the [Available regions](../data-science/ai-services/ai-services-overview.md#available-regions) section of the article "AI services in Fabric (preview)."

## Next steps

- [What is Microsoft Fabric?](microsoft-fabric-overview.md)
- [Copilot in Fabric: FAQ](copilot-faq-fabric.yml)
- [AI services in Fabric (preview)](../data-science/ai-services/ai-services-overview.md)
