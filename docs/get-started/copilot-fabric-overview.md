---
title: Overview of Copilot for Fabric (preview)
description: Learn about Copilot for Fabric, which brings a new way to transform and analyze data, generate insights, and create visualizations and reports.
author: maggiesMSFT
ms.author: maggies
ms.reviewer: 'guptamaya'
ms.service: security
ms.subservice: 
ms.custom: 
ms.topic: conceptual
ms.date: 10/30/2023
---

# Overview of Copilot for Fabric (preview)

With Copilot and other generative AI features in preview, Microsoft Fabric brings a new way to transform and analyze data, generate insights, and create visualizations and reports.

Before your business starts using Copilot capabilities in Fabric, you may have questions about how it works, how it keeps your business data secure and adheres to privacy requirements, and how to use generative AI responsibly. Read on for answers to these and other questions.

## How do I use Copilot responsibly?

Microsoft is committed to ensuring that our AI systems are guided by our [AI principles](https://www.microsoft.com/ai/principles-and-approach/) and [Responsible AI Standard](https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE5cmFl). These principles include empowering our customers to use these systems effectively and in line with their intended uses. Our approach to responsible AI is continually evolving to proactively address emerging issues. Copilot sends your customer data to generate summaries to Azure OAI, where it's stored for 30 days. See the [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms) for details.

Copilot features in Fabric are built to meet the Responsible AI Standard, which means that they're reviewed by multidisciplinary teams for potential harms, and then refined to include mitigations for those harms.  

Before you use Copilot, your admin needs to enable Copilot in Fabric. See the article [Enable Copilot in Fabric (preview)](copilot-fabric-enable.md) for details. Also, keep in mind the limitations of Copilot:

- Copilot responses can include inaccurate or low-quality content, so make sure to review outputs before using them in your work.
- Reviews of outputs should be done by people who are able to meaningfully evaluate the content's accuracy and appropriateness.
- Today, Copilot features work best in the English language. Other languages may not perform as well.

## Copilot for Data Factory

## Copilot for Real-time Analytics

## Copilot for OneLake

## Copilot for Data Warehouse

## Copilot for Data Engineering

## Copilot for Data Activator

## Copilot for Power BI

### Capabilities, intended uses, and limitations

- By using Power BI Copilot, you can quickly create reports with just a few clicks. Copilot can save you hours of effort building your report pages.
- Copilot provides a summary of your dataset and an outline of suggested pages for your report. Then it generates those pages for the report. After you open a blank report with a semantic model, Copilot can generate:

  - A summary of the dataset.
  - Suggested topics.
  - A report outline: for example, what each page in the report will be about, and how many pages it will create.
  - The visuals for the individual pages.
  - A summary of the current page.

Here are the current limitations of Copilot for Power BI:

- Copilot can’t modify the visuals after it has generated them.
- Copilot can’t add filters or set slicers if you specify them in the prompts. For example, if you say, “Create a sales report for the last 30 days,” Copilot can't interpret 30 days as a date filter.
- Copilot can’t make layout changes. For example, if you tell Copilot to resize the visuals, or to align all the visuals perfectly, it won't work.
- Copilot can’t understand complex intent. For example, suppose you frame a prompt like this: “Generate a report to show incidents by team, incident type, owner of the incident, and do this for only 30 days.” This prompt is complex, and Copilot will probably generate irrelevant visuals.
- Copilot doesn’t produce a message for the skills that it doesn’t support. For example, if you ask Copilot to edit or add a slicer, it won’t complete the instruction successfully as mentioned above. Unfortunately, it won’t give an error message either.

### Data use

- Copilot uses the data in a semantic model that you provide, combined with the prompts you enter, to create visuals. Learn more about [semantic models](/power-bi/connect-data/service-datasets-understand).

## Copilot for Data Science

### Capabilities, intended uses, and limitations

- Copilot features in Data Science are currently scoped to notebooks. These features include the Copilot chat pane, IPython magic commands that can be used within a code cell, and automatic code suggestions as you type in a code cell. Copilot can also read Power BI semantic models using an integration of semantic link.
- Copilot has two key intended uses. 

  - One, you can ask Copilot to examine and analyze data in your notebook (for example, by first loading a DataFrame and then asking Copilot about data inside the DataFrame). 
  - Two, you can ask Copilot to generate a range of suggestions about your data analysis process, such as what predictive models might be relevant, code to perform different types of data analysis, and documentation for a completed notebook.

- Keep in mind that code generation with fast-moving or recently released libraries may include inaccuracies or fabrications.

### Data use

In notebooks, Copilot can only access data that is accessible to the user’s current notebook, either in an attached lakehouse or directly loaded or imported into that notebook by the user. In notebooks, Copilot can't access any data that's not accessible to the notebook.

By default, Copilot has access to the following data types:

- Previous messages sent to and replies from Copilot for that user in that session.
- Contents of cells that the user has executed.
- Outputs of cells that the user has executed.
- Schemas of data sources in the notebook.
- Sample data from data sources in the notebook.
- Schemas from external data sources in an attached lakehouse.

### Evaluation
 
- The product team has tested Copilot to see how well the system performs within the context of notebooks, and whether AI responses are insightful and useful.
- The team also invested in additional harms mitigations, including technological approaches to focusing Copilot’s output on topics related to data science.
 
### Tips for working with Copilot for Data Science

- Copilot is best equipped to handle data science topics, so limit your questions to this area.
- Be explicit about the data you want Copilot to examine. If you describe the data asset (such as naming files, tables, or columns), Copilot is more likely to retrieve relevant data and generate useful outputs.
- If you want more granular responses, try loading data into the notebook as DataFrames or pinning the data in your lakehouse. This gives Copilot more context with which to perform analysis. If an asset is too large to load, pinning it's a helpful alternative.

## Notes by release

Additional information for future releases or feature updates will appear here.

## Next steps

- [What is Microsoft Fabric?](microsoft-fabric-overview.md)
- [Copilot for Fabric: FAQ](copilot-faq-fabric.yml)
