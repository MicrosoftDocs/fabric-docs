---
title: Microsoft Copilot in Fabric in the Data Factory Workload Overview
description: Learn how Microsoft Copilot in Fabric
ms.reviewer: maghan, sngun
ms.date: 09/02/2025
ms.service: fabric
ms.subservice: data-factory
ms.topic: overview
ms.collection:
  - ce-skilling-ai-copilot
ms.update-cycle: 180-days
ms.devlang: copilot-prompt
ai-usage: ai-assisted
---

# What is Copilot in Fabric in the Data Factory workload?

This article provides an overview of Copilot in the Data Factory workload, including its features and benefits. Microsoft Copilot in the Data Factory workload is an AI-enhanced toolset that empowers customers to use natural language to articulate their requirements for creating data integration solutions using [Dataflow Gen2](../data-factory/dataflows-gen2-overview.md). The Copilot in the Data Factory workload operates like a subject-matter expert (SME) collaborating with you to design your data flows, supporting both citizen and professional data wranglers in streamlining their workflows.

Before your business can start using Copilot capabilities in Fabric, your administrator must enable Copilot in Microsoft Fabric (see [Copilot Fabric Overview](../fundamentals/copilot-fabric-overview.md#enable-copilot).

[!INCLUDE [copilot-note-include](../includes/copilot-note-include.md)]

## How Copilot works in the Data Factory workload

Copilot in the Data Factory workload enhances productivity, unlocks profound insights, and facilitates the creation of custom AI experiences tailored to your data. As a component of the Copilot in the Fabric experience, it provides intelligent [Mashup](/powerquery-m/m-spec-introduction) code generation to transform data using natural language input. It generates code explanations to help you better understand the complex queries and tasks that were previously generated.

## Features of Copilot in the Data Factory workload

Copilot in the Data Factory workload offers different capabilities depending on the component you're working with:

**With Dataflow Gen2, you can:**

- Generate new transformation steps for an existing query
- Provide a summary of the query and the applied steps
- Generate a new query that might include sample data or a reference to an existing query

**With pipelines, you can:**

- **Pipeline Generation**: Using natural language, you can describe your desired pipeline, and Copilot understands the intent and generates the necessary pipeline activities
- **Error message assistant**: Troubleshoot pipeline issues with clear error explanation capability and actionable troubleshooting guidance
- **Summarize Pipeline**: Explain your complex pipeline with a summary of content and relations of activities within the Pipeline
- **Build expressions**: Generate and explain pipeline expressions using Copilot's intuitive chat interface.

## Best practices for using Copilot in the Data Factory workload

To get the most out of Copilot in the Data Factory workload:

- Be specific and clear in your natural language requests
- Start with simple transformations and build complexity gradually
- Use the "Explain my current query" feature to understand the generated code
- Use the undo functionality to revert changes when needed
- Review the generated steps in the Applied steps list for accuracy
- Use starter prompts to get familiar with Copilot's capabilities

## Example prompts

Here are some example prompts you can use with Copilot in the Data Factory workload:

### Dataflow Gen2 prompts

```copilot-prompt
- Only keep European customers
- Count the total number of employees by City
- Only keep orders whose quantities are above the median value
- Create a new query with sample data that lists all the Microsoft OS versions and the year they were released
- Explain my current query
```

### Pipeline prompts

```copilot-prompt
- Create a pipeline to copy data from SQL Server to Azure Data Lake
- Ingest data from this source to that destination
- Summarize this pipeline
- Explain what this pipeline does
```

> [!NOTE]  
> AI powers Copilot, so surprises and mistakes are possible.

## Responsible AI use of Copilot

Microsoft is committed to ensuring that our AI systems are guided by our [AI principles](https://www.microsoft.com/ai/principles-and-approach/) and [Responsible AI Standard](https://www.microsoft.com/ai/responsible-ai). These principles include empowering our customers to use these systems effectively and in line with their intended uses. Our approach to responsible AI is continually evolving to address emerging issues proactively.

For specific guidelines on responsible AI use in Data Factory, see [Privacy, security, and responsible use of Copilot in Fabric in the Data Factory workload](../fundamentals/copilot-data-factory-privacy-security.md).

## Limitations

Here are the current limitations of Copilot in the Data Factory workload:

- Copilot can't perform transformations or explanations across multiple queries in a single input. For instance, you can't ask Copilot to "Capitalize all the column headers for each query in my dataflow."
- Copilot doesn't understand previous inputs and can't undo changes after a user commits a change when authoring, either via the user interface or the chat pane. For example, you can't ask Copilot to "Undo my last five inputs." However, users can still use the existing user interface options to delete unwanted steps or queries.
- Copilot can't make layout changes to queries in your session. For example, if you tell Copilot to create a new group for queries in the editor, it doesn't work.
- Copilot might produce inaccurate results when the intent is to evaluate data that isn't present within the sampled results imported into the session's data.
- Copilot doesn't produce a message for the skills that it doesn't support. For example, if you ask Copilot to "Perform statistical analysis and write a summary over the contents of this query", it doesn't complete the instruction successfully as mentioned previously. Unfortunately, it doesn't give an error message either.

## Related content

- [Get started with Copilot in Fabric in the Data Factory workload](copilot-fabric-data-factory-get-started.md)
- [Copilot pipeline expressions builder](copilot-pipeline-expression-builder.md)
- [Privacy, security, and responsible use of Copilot in Fabric in the Data Factory workload](../fundamentals/copilot-data-factory-privacy-security.md)
