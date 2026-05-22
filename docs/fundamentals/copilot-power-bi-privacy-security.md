---
title: "Copilot for Power BI Privacy and Security"
description: Learn how Copilot for Power BI handles data privacy, security, and responsible AI use, including what data Copilot accesses in semantic models.
author: snehagunda
ms.author: sngun
ms.reviewer: guptamaya
ms.topic: concept-article
ms.date: 05/22/2026
ms.update-cycle: 180-days
no-loc: [Copilot]
ms.collection:
  - ce-skilling-ai-copilot
ai-usage: ai-assisted

#customer intent: As a Power BI user, I want to understand how Copilot in Power BI handles my data, privacy, and security so that I can use generative AI features responsibly.
---

# Privacy, security, and responsible use for Copilot in Power BI

[Microsoft Copilot for Power BI](/power-bi/create-reports/copilot-introduction) uses generative AI to help you transform and analyze data, generate insights, and create visualizations and reports. This article explains what data Copilot for Power BI accesses, how it keeps your business data secure, and how to use these generative AI features responsibly.

For the overall Copilot in Microsoft Fabric privacy and data security model, see [Privacy, security, and responsible use for Copilot in Microsoft Fabric](copilot-privacy-security.md).

For considerations and limitations with Copilot for Power BI, see [Considerations and limitations](/power-bi/create-reports/copilot-introduction#considerations-and-limitations).

## Data use in Copilot for Power BI

- Copilot uses the data in a semantic model that you provide, combined with the prompts you enter, to create visuals. Learn more about [semantic models](/power-bi/connect-data/service-datasets-understand).
- To answer data questions from the semantic model, Copilot requires that Q&A be enabled in the semantic model's dataset settings. For more information, see [Update your data model to work well with Copilot for Power BI](/power-bi/create-reports/copilot-evaluate-data).
- To create measure descriptions in a semantic model, Copilot uses the DAX formula and table name of the selected measure. DAX comments and text in double-quotes of the DAX formula are not used. For more information, see [Use Copilot to create measure descriptions](/power-bi/transform-model/desktop-measure-copilot-descriptions).
- To create DAX queries, explain DAX queries, or explain DAX topics, Copilot uses the semantic model metadata, such as table and column names and properties, with any DAX query selected in the DAX query editor combined with the request you enter, to respond. For more information, see [Use Copilot to create DAX queries](/dax/dax-copilot).
- When you add a copilot summary to an email subscription, the copilot summary generated is the same as that generated when you add a narrative visual to a report. For more information, see [Copilot summaries in email subscriptions](/power-bi/create-reports/copilot-summaries-in-subscriptions).

## Tips for working with Copilot for Power BI

For tips on writing effective prompts, understanding Copilot responses, and getting the best results from generative AI in Power BI, review [FAQ for Copilot for Power BI](copilot-faq-fabric.yml).

## Evaluation of Copilot for Power BI

The product team invested in harm mitigation, including technological approaches to focusing Copilot's output on topics related to Power BI reporting and data analysis.

## Related content

- [Microsoft Copilot for Power BI](/power-bi/create-reports/copilot-introduction)
- [Enable Fabric Copilot for Power BI](/power-bi/create-reports/copilot-enable-power-bi)
- [Copilot in Fabric and Power BI: FAQ](copilot-faq-fabric.yml)
