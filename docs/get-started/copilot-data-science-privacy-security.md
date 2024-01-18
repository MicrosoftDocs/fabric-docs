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
ms.date: 01/16/2024
---

# Privacy, security, and responsible use of Copilot for Data Science (preview)

With Copilot for Data Science in Microsoft Fabric and other generative AI features in preview, Microsoft Fabric brings a new way to transform and analyze data, generate insights, and create visualizations and reports in Data Science and the other workloads.

Before your business can start using Copilot capabilities in Fabric, your administrator needs to [enable Copilot in Microsoft Fabric](copilot-fabric-overview.md#enable-copilot). You may have questions about how it works, how it keeps your business data secure and adheres to privacy requirements, and how to use generative AI responsibly.

The article [Privacy, security, and responsible use for Copilot (preview)](copilot-privacy-security.md) provides an overview of Copilot in Fabric. Read on for details about Copilot for Data Science.

[!INCLUDE [copilot-note-include](../includes/copilot-note-include.md)]


## Capabilities, intended uses, and limitations of Copilot for Data Science

- Copilot features in the Data Science experience are currently scoped to notebooks. These features include the Copilot chat pane, IPython magic commands that can be used within a code cell, and automatic code suggestions as you type in a code cell. Copilot can also read Power BI semantic models using an integration of semantic link.
- Copilot has two key intended uses.

  - One, you can ask Copilot to examine and analyze data in your notebook (for example, by first loading a DataFrame and then asking Copilot about data inside the DataFrame). 
  - Two, you can ask Copilot to generate a range of suggestions about your data analysis process, such as what predictive models might be relevant, code to perform different types of data analysis, and documentation for a completed notebook.

- Keep in mind that code generation with fast-moving or recently released libraries may include inaccuracies or fabrications.

## Data use of Copilot for Data Science

- In notebooks, Copilot can only access data that is accessible to the user’s current notebook, either in an attached lakehouse or directly loaded or imported into that notebook by the user. In notebooks, Copilot can't access any data that's not accessible to the notebook.

- By default, Copilot has access to the following data types:

  - Previous messages sent to and replies from Copilot for that user in that session.
  - Contents of cells that the user has executed.
  - Outputs of cells that the user has executed.
  - Schemas of data sources in the notebook.
  - Sample data from data sources in the notebook.
  - Schemas from external data sources in an attached lakehouse.

## Evaluation of Copilot for Data Science
 
- The product team has tested Copilot to see how well the system performs within the context of notebooks, and whether AI responses are insightful and useful.
- The team also invested in additional harms mitigations, including technological approaches to focusing Copilot’s output on topics related to data science.
 
## Tips for working with Copilot for Data Science

- Copilot is best equipped to handle data science topics, so limit your questions to this area.
- Be explicit about the data you want Copilot to examine. If you describe the data asset, such as naming files, tables, or columns, Copilot is more likely to retrieve relevant data and generate useful outputs.
- If you want more granular responses, try loading data into the notebook as DataFrames or pinning the data in your lakehouse. This gives Copilot more context with which to perform analysis. If an asset is too large to load, pinning it's a helpful alternative.

## Notes by release

Additional information for future releases or feature updates will appear here.

## Next steps

- [What is Microsoft Fabric?](microsoft-fabric-overview.md)
- [Copilot in Fabric: FAQ](copilot-faq-fabric.yml)
