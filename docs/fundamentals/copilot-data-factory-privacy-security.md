---
title: "Copilot Data Factory Privacy"
description: Learn how Copilot for Data Factory in Microsoft Fabric keeps your data secure, adheres to privacy requirements, and supports responsible AI use.
author: snehagunda
ms.author: sngun
ms.reviewer: guptamaya
ms.topic: concept-article
ms.date: 05/22/2026
ms.update-cycle: 180-days
ai-usage: ai-assisted
no-loc: [Copilot]
ms.collection: ce-skilling-ai-copilot

#customer intent: As a Fabric administrator or data engineer, I want to understand how Copilot for Data Factory handles my data so that I can ensure compliance with my organization's privacy and security requirements.
---

# Privacy, security, and responsible use of Copilot for Data Factory

This article describes how [Copilot for Data Factory](../data-factory/copilot-fabric-data-factory.md) handles your business data, adheres to privacy requirements, and supports responsible use of generative AI. For an overview of these topics for Copilot in Fabric, see [Privacy, security, and responsible use for Copilot](copilot-privacy-security.md).

For considerations and limitations, see [Limitations of Copilot for Data Factory](../data-factory/copilot-fabric-data-factory.md#limitations).

## Data that Copilot for Data Factory can access

Copilot for Data Factory can only access data that meets both of the following conditions:

- The data is accessible to your current Dataflow Gen2 session.
- The data is configured and imported into the Power Query data preview grid.

Copilot doesn't access data outside your active Dataflow Gen2 session or data that hasn't been loaded into the preview grid.

## How Copilot for Data Factory is evaluated

- The product team tested Copilot for Data Factory to validate the accuracy and usefulness of AI-generated responses within Dataflow Gen2.
- The team applied harms mitigations, including content filters that focus Copilot output on data integration topics and reduce off-topic or harmful responses.

## Tips for working with Copilot for Data Factory

- **Limit prompts to data integration topics.** Copilot for Data Factory is optimized for data integration tasks in Dataflow Gen2 and produces the best results in that area.
- **Include specific data details in your prompts.** Provide query names, column names, and data values so Copilot can generate more accurate and relevant outputs.
- **Break complex requests into smaller tasks.** Splitting a complex transformation into individual steps helps Copilot better understand your requirements and produce more accurate results.

## Related content

- [Copilot for Data Factory overview](../data-factory/copilot-fabric-data-factory.md)
- [Copilot in Fabric: FAQ](copilot-faq-fabric.yml)
