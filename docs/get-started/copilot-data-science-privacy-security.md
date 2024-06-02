---
title: "Privacy, security, and responsible use of Copilot for Data Science (preview)"
description: Learn about privacy, security, and responsible use of Copilot for Data Science in Microsoft Fabric.
author: maggiesMSFT
ms.author: maggies
ms.reviewer: 'guptamaya'
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.topic: conceptual
ms.date: 06/02/2024
no-loc: [Copilot]
---

# Privacy, security, and responsible use of Copilot for Data Science (preview)

In this article, learn how [Microsoft Copilot for Data Science](copilot-notebooks-overview.md) works, how it keeps your business data secure and adheres to privacy requirements, and how to use generative AI responsibly. For an overview of these topics for Copilot in Fabric, see [Privacy, security, and responsible use for Copilot (preview)](copilot-privacy-security.md).

With Copilot for Data Science in Microsoft Fabric and other generative AI features in preview, Microsoft Fabric brings a new way to transform and analyze data, generate insights, and create visualizations and reports in Data Science and the other workloads.

For considerations and limitations, see [Limitations](copilot-notebooks-overview.md#limitations).

## Data use of Copilot for Data Science

- In notebooks, Copilot can only access data that is accessible to the user's current notebook, either in an attached lakehouse or directly loaded or imported into that notebook by the user. In notebooks, Copilot can't access any data that's not accessible to the notebook.

- By default, Copilot has access to the following data types:

  - Previous messages sent to and replies from Copilot for that user in that session.
  - Contents of cells that the user has executed.
  - Outputs of cells that the user has executed.
  - Schemas of data sources in the notebook.
  - Sample data from data sources in the notebook.
  - Schemas from external data sources in an attached lakehouse.

## Evaluation of Copilot for Data Science
 
- The product team has tested Copilot to see how well the system performs within the context of notebooks, and whether AI responses are insightful and useful.
- The team also invested in additional harms mitigations, including technological approaches to focusing Copilot's output on topics related to data science.
 
## Tips for working with Copilot for Data Science

- Copilot is best equipped to handle data science topics, so limit your questions to this area.
- Be explicit about the data you want Copilot to examine. If you describe the data asset, such as naming files, tables, or columns, Copilot is more likely to retrieve relevant data and generate useful outputs.
- If you want more granular responses, try loading data into the notebook as DataFrames or pinning the data in your lakehouse. This gives Copilot more context with which to perform analysis. If an asset is too large to load, pinning it's a helpful alternative.

## Related content

- [Privacy, security, and responsible use of Copilot for Data Factory (preview)](copilot-data-factory-privacy-security.md)
- [Overview of Copilot for Data Science and Data Engineering (preview)](copilot-notebooks-overview.md)
- [Copilot for Data Factory overview](copilot-fabric-data-factory.md)
- [Copilot in Fabric: FAQ](copilot-faq-fabric.yml)
