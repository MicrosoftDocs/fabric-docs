---
title: Privacy, security, and responsible use for Copilot in Power BI
description: Learn how Copilot in Power BI handles data privacy, security, and responsible AI use, including what data Copilot accesses in semantic models.
author: SnehaGunda
ms.author: sngun
ms.reviewer: guptamaya
ms.topic: concept-article
ms.date: 05/26/2026
ms.update-cycle: 180-days
no-loc: [Copilot]
ms.collection:
  - ce-skilling-ai-copilot
ai-usage: ai-assisted

#customer intent: As a Power BI user, I want to understand how Copilot in Power BI handles my data, privacy, and security so that I can use generative AI features responsibly.
---

# Privacy, security, and responsible use for Copilot in Power BI

[Microsoft Copilot in Power BI](/power-bi/create-reports/copilot-introduction) uses generative AI to help you analyze data and create reports. Before you start using Copilot, you might have questions about how it handles your business data, what information it accesses in your semantic models, and how to use generative AI responsibly.

This article explains what data is accessed by Copilot in Power BI, how your data stays secure, and how to evaluate Copilot outputs for accuracy and responsible use. For the overall Fabric privacy and security model, see [Privacy, security, and responsible use for Copilot in Microsoft Fabric](copilot-privacy-security.md). For considerations and limitations with Copilot in Power BI, see [Considerations and limitations](/power-bi/create-reports/copilot-introduction#considerations-and-limitations).

## Data use in Copilot in Power BI

- Copilot uses the data in a semantic model that you provide, combined with the prompts you enter, to create visuals. Learn more about [semantic models](/power-bi/connect-data/service-datasets-understand).
- To answer data questions from the semantic model, Copilot requires that the Q&A natural language feature be enabled in the semantic model's dataset settings. For more information, see [Update your data model to work well with Copilot in Power BI](/power-bi/create-reports/copilot-evaluate-data).
- To create measure descriptions in a semantic model, Copilot uses the DAX formula and table name of the selected measure. Copilot doesn't use DAX comments or text in double-quotes within the DAX formula. For more information, see [Use Copilot to create measure descriptions](/power-bi/transform-model/desktop-measure-copilot-descriptions).
- To create DAX queries, explain DAX queries, or explain DAX topics, Copilot uses the semantic model metadata, such as table and column names and properties, with any DAX query selected in the DAX query editor combined with the request you enter, to respond. For more information, see [Use Copilot to create DAX queries](/dax/dax-copilot).
- When you add a copilot summary to an email subscription, the copilot summary generated is the same as that generated when you add a narrative visual to a report. For more information, see [Copilot summaries in email subscriptions](/power-bi/create-reports/copilot-summaries-in-subscriptions).

## Tips for working with Copilot in Power BI

- Be specific in your prompts. Instead of "show me sales data," try "create a bar chart of quarterly sales by region for 2025"
- Review Copilot-generated DAX queries before you apply them to your model.
- Provide context by referencing table and column names that exist in your semantic model.

For more tips, see [FAQ for Copilot in Power BI](copilot-faq-fabric.yml).

## Data privacy and security for Copilot in Power BI

- Copilot doesn't store your prompts or responses after your session ends.
- Your data stays within your organization's tenant boundary and isn't used to train foundation models.
- Tenant administrators can enable or disable Copilot through the admin portal.

For the full Copilot privacy and security model, see [Privacy, security, and responsible use for Copilot in Microsoft Fabric](copilot-privacy-security.md).

## Responsible AI evaluation of Copilot in Power BI

Copilot in Power BI is evaluated against Microsoft's responsible AI principles. Harm mitigation measures include Content filtering, Grounded responses, and Human oversight.

## Related content

- [Microsoft Copilot in Power BI](/power-bi/create-reports/copilot-introduction)
- [Enable Fabric Copilot in Power BI](/power-bi/create-reports/copilot-enable-power-bi)
- [Update your data model to work well with Copilot](/power-bi/create-reports/copilot-evaluate-data)
- [Considerations and limitations](/power-bi/create-reports/copilot-introduction#considerations-and-limitations)
- [Copilot in Fabric and Power BI: FAQ](copilot-faq-fabric.yml)
