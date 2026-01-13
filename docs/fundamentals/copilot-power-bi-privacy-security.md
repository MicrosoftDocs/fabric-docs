---
title: "Privacy, security, and responsible use for Copilot in Power BI"
description: Learn about privacy, security, and responsible use for Copilot for Power BI in Microsoft Fabric.
author: snehagunda
ms.author: sngun
ms.reviewer: 'guptamaya'
ms.custom:
ms.topic: concept-article
ms.date: 08/21/2025
ms.update-cycle: 180-days
no-loc: [Copilot]
ms.collection: ce-skilling-ai-copilot
---

# Privacy, security, and responsible use for Copilot in Power BI

In this article, learn how [Microsoft Copilot for Power BI](/power-bi/create-reports/copilot-introduction) works, how it keeps your business data secure and adheres to privacy requirements, and how to use generative AI responsibly.  With Copilot and other generative AI features in preview, Power BI brings a new way to transform and analyze data, generate insights, and create visualizations and reports in Power BI and the other workloads.

For more information privacy and data security in Copilot, see [Privacy, security, and responsible use for Copilot in Microsoft Fabric (preview)](copilot-privacy-security.md).

For considerations and limitations with Copilot for Power BI, see [Considerations and Limitations](/power-bi/create-reports/copilot-introduction#considerations-and-limitations).

## Data use in Copilot for Power BI

- Copilot uses the data in a semantic model that you provide, combined with the prompts you enter, to create visuals. Learn more about [semantic models](/power-bi/connect-data/service-datasets-understand).
- To answer data questions from the semantic model, Copilot requires that Q&A be enabled in the semantic model's dataset settings. For more information, see [Update your data model to work well with Copilot for Power BI](/power-bi/create-reports/copilot-evaluate-data).
- To create measure descriptions in a semantic model, Copilot uses the DAX formula and table name of the selected measure. DAX comments and text in double-quotes of the DAX formula are not used. For more information, see [Use Copilot to create measure descriptions](/power-bi/transform-model/desktop-measure-copilot-descriptions).
- To create DAX queries, explain DAX queries, or explain DAX topics, Copilot uses the semantic model metadata, such as table and column names and properties, with any DAX query selected in the DAX query editor combined with the request you enter, to respond. For more information, see [Use Copilot to create DAX queries](/dax/dax-copilot).
- When you add a copilot summary to an email subscription, the copilot summary generated is the same as that generated when you add a narrative visual to a report. Fore more information, see [Copilot summaries in email subscriptions](/power-bi/create-reports/copilot-summaries-in-subscriptions).

## Tips for working with Copilot for Power BI

Review [FAQ for Copilot for Power BI](copilot-faq-fabric.yml) for tips and suggestions to help you work with Copilot in this experience.

## Evaluation of Copilot for Data Warehouse

The product team invested in harm mitigation, including technological approaches to focusing Copilot's output on topics related to reporting and data warehousing.

## Related content

- [Microsoft Copilot for Power BI](/power-bi/create-reports/copilot-introduction)
- [Enable Fabric Copilot for Power BI](/power-bi/create-reports/copilot-enable-power-bi)
- [Copilot in Fabric and Power BI: FAQ](copilot-faq-fabric.yml)
