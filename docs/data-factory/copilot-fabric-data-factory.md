---
title: Microsoft Copilot in Fabric in the Data Factory Workload Overview
description: Learn how Microsoft Copilot in Fabric in the Data Factory workload uses natural language to help you build and troubleshoot data integration solutions.
ms.reviewer: maghan, sngun
ms.date: 10/19/2026
ms.topic: overview
ms.collection:
  - ce-skilling-ai-copilot
ms.update-cycle: 180-days
ms.devlang: copilot-prompt
ai-usage: ai-assisted
---

# What is Copilot in Fabric in the Data Factory workload?

This article provides an overview of Copilot in the Data Factory workload, including its features and benefits. Microsoft Copilot in the Data Factory workload is an AI-enhanced toolset that empowers customers to use natural language to articulate their requirements for creating data integration solutions using [Dataflow Gen2](../data-factory/dataflows-gen2-overview.md). The Copilot in the Data Factory workload operates like a subject-matter expert (SME) collaborating with you to design your data flows, supporting both citizen and professional data wranglers in streamlining their workflows.

Before your business can start using Copilot capabilities in Fabric, your administrator must enable Copilot in Fabric. For more information, see [Copilot Fabric Overview](../fundamentals/copilot-fabric-overview.md#enable-copilot).

[!INCLUDE [copilot-note-include](../includes/copilot-note-include.md)]

## How Copilot works in the Data Factory workload

Copilot in the Data Factory workload enhances productivity, unlocks profound insights, and facilitates the creation of custom AI experiences tailored to your data. As a component of the Copilot in the Fabric experience, it provides intelligent [Mashup](/powerquery-m/m-spec-introduction) code generation to transform data using natural language input. It generates code explanations to help you better understand the complex queries and tasks that were previously generated.

The new Copilot experience in Dataflow Gen2 (preview) helps you prepare, understand, analyze, and troubleshoot data through a conversation alongside the Power Query editor. Copilot can inspect results and take several actions to complete a request, including making changes directly to your queries. You can review the resulting Power Query M code and applied steps in the standard editor.

> [!NOTE]
> **The new Copilot experience is in preview and is specific to Dataflow Gen2.** The Dataflow Gen2 capabilities and approval controls in this article describe this preview, not pipeline Copilot or the legacy Copilot experience. Available actions can differ depending on your environment. To switch back to the legacy experience, use the toggle in the top-right corner of the Copilot pane when no response is active.

The Copilot pane opens alongside your queries, data preview, and applied steps. Starter prompts help you begin, and the **New experience (Preview)** toggle identifies which experience you're using.

:::image type="content" source="media/copilot-fabric-data-factory-get-started/dataflow-gen2-new-copilot-pane.png" alt-text="Copilot pane with New experience (Preview) on and starter prompts to add Northwind Orders or Customers, or build a Northwind sales model." lightbox="media/copilot-fabric-data-factory-get-started/dataflow-gen2-new-copilot-pane.png":::

## Features of Copilot in the Data Factory workload

Copilot in the Data Factory workload offers different capabilities depending on the component you're working with:

**With Dataflow Gen2, you can:**

- [Find relevant data and use existing connections](copilot-fabric-data-factory-get-started.md#get-started-with-copilot-for-dataflow-gen2) that you have permission to access.
- [Create and reshape queries](copilot-fabric-data-factory-get-started.md#use-ai-to-generate-data-transformation-queries), including adding, changing, or removing transformation steps.
- [Explain queries and applied steps](dataflow-gen2-copilot-explain.md), validate Power Query M code, and inspect data previews.
- Ask questions about query results and explore answers through table previews and charts.
- Investigate query errors, query folding, performance, and available refresh history and diagnostics.
- Configure query properties and [data destinations](dataflow-gen2-data-destinations-and-managed-settings.md).
- [Save and run the current dataflow with your approval](copilot-fabric-data-factory-get-started.md#save-and-run-your-dataflow), where supported.

Copilot supports follow-up requests and can ask you for more information when needed. For the full list of available actions, see [Supported tools and capabilities in Dataflow Gen2 (preview)](#supported-tools-and-capabilities-in-dataflow-gen2-preview). For details about which changes require approval, see [Review and approve changes](copilot-fabric-data-factory-get-started.md#review-and-approve-changes).

**With pipelines, you can:**

- **[Pipeline Generation](copilot-fabric-data-factory-get-started.md#generate-a-pipeline-with-copilot)**: Using natural language, you can describe your desired pipeline, and Copilot understands the intent and generates the necessary pipeline activities
- **[Error message assistant](copilot-fabric-data-factory-get-started.md#troubleshoot-pipeline-errors-with-copilot)**: Troubleshoot pipeline issues with clear error explanation capability and actionable troubleshooting guidance
- **[Summarize Pipeline](copilot-fabric-data-factory-get-started.md#summarize-a-pipeline-with-copilot)**: Explain your complex pipeline with a summary of content and relations of activities within the Pipeline
- **[Build expressions](copilot-fabric-data-factory-get-started.md#use-copilot-in-expression-builder-to-generate-and-explain-pipeline-expressions)**: Generate and explain pipeline expressions using Copilot's intuitive chat interface.

## Supported tools and capabilities in Dataflow Gen2 (preview)

The following table lists the actions available to **the new Copilot experience in Dataflow Gen2 (preview) only**. It doesn't describe pipeline Copilot or the legacy Dataflow Gen2 experience. Describe your goal in natural language; you don't need to name or invoke a tool. Copilot can combine several actions to complete your request.

The table uses customer-facing action names rather than internal tool names. In the approval column:

- **No additional approval** means Copilot doesn't ask for a separate action confirmation. Your existing permissions and standard authentication, privacy, and data-source prompts still apply.
- **Required by default** means Copilot asks before proceeding unless you approved that action type for the session.
- **Required every time** means you must approve each request, even if you approved other actions for the session.

| Supported action | What Copilot can do | Approval |
|---|---|---|
| List queries | Identify the queries in your current dataflow. | No additional approval |
| Inspect a query | Read a query's current M code and applied steps. | No additional approval |
| Inspect query properties | Read the properties configured for a query. | No additional approval |
| Identify data-source types | Identify the types of data sources available for a request. | No additional approval |
| Inspect a data-source reference | Retrieve the Power Query M code associated with a data-source reference. | No additional approval |
| Find connectors | Find connectors relevant to the data you want to use. | No additional approval |
| Find connection context | Search connection information relevant to your request. | No additional approval |
| List existing connections | Discover existing connections available to you. | No additional approval |
| Inspect a connection | Look up details of a specific existing connection. | No additional approval |
| Find connections for the current context | Identify connections available in the current editing context. | No additional approval |
| Inspect connected sources | Identify connections already associated with the editing session. | No additional approval |
| Find sources that need a connection | Identify data sources that aren't associated with a connection. | No additional approval |
| Associate an existing connection | Bind an existing connection to a data source in the editing session. | No additional approval |
| Remove a connection association | Unbind a connection from the editing session without deleting the stored connection. | No additional approval |
| Create a query | Add a query, including one that references an existing query. | No additional approval |
| Rename a query | Change a query's name. | No additional approval |
| Add a transformation step | Insert a new step into a query. | No additional approval |
| Edit an existing step | Replace an existing step's M expression. | Required by default |
| Delete a step | Remove an applied step from a query. | Required by default |
| Delete a query | Remove a query from the dataflow. | Required by default |
| Replace a query's M code | Replace the complete M script for a query. | Required by default |
| Change query properties | Update query properties, such as load and visibility settings. | No additional approval |
| Change a query's shared attribute | Change whether a query is declared as shared in its M definition. | No additional approval |
| Configure a data destination | Set or update a query's output-destination configuration. | No additional approval |
| Remove a data destination | Remove a query's output-destination configuration. | Required by default |
| Validate M code | Check a Power Query M script for validity. | No additional approval |
| Preview a query | Evaluate a query and inspect a preview of its results. | No additional approval |
| Evaluate an M expression | Evaluate an expression and inspect its results without replacing the query's script. | No additional approval |
| Analyze a query | Inspect query analysis information to investigate behavior or performance. | No additional approval |
| Create a chart | Visualize query results in the conversation. | No additional approval |
| Inspect refresh history | Retrieve available refresh history for the dataflow. | No additional approval |
| Inspect refresh details | Retrieve available information about a dataflow refresh. | No additional approval |
| Inspect refresh logs | Retrieve accessible diagnostic logs for a dataflow refresh. | No additional approval |
| Explore data | Use specialized exploratory assistance to investigate a data question. | No additional approval |
| Investigate query folding | Use specialized assistance to analyze which transformations can run at the data source. | No additional approval |
| Investigate refresh diagnostics | Use specialized assistance to analyze refresh problems using available diagnostic evidence. | No additional approval |
| Use product guidance | Consult task-specific product guidance to help complete your request. | No additional approval |
| Save and run the dataflow | Save the current dataflow and start a refresh, where supported. Refresh can write data to configured destinations. | Required every time |

Specialized query-folding and refresh-diagnostics investigations are read-only. Specialized exploratory assistance can create, change, and remove its own temporary queries without an additional approval prompt, but doesn't modify your existing queries.

> [!IMPORTANT]
> **No additional approval** doesn't mean read-only or risk-free. Some actions change the editing session or affect later refreshes. Evaluating queries and expressions can contact data sources and consume resources. Review the results and configuration before saving or running your dataflow.

For details, see [Review and approve changes](copilot-fabric-data-factory-get-started.md#review-and-approve-changes) and [Save and run your dataflow](copilot-fabric-data-factory-get-started.md#save-and-run-your-dataflow). You can return to the legacy Copilot experience by using the toggle in the top-right corner of the Copilot pane when no response is active.

## Best practices for using Copilot in the Data Factory workload

To get the most out of Copilot in the Data Factory workload:

- Be specific and clear in your natural language requests
- Start with simple transformations and build complexity gradually
- Use the ["Explain my current query"](copilot-fabric-data-factory-get-started.md#get-started-with-copilot-for-dataflow-gen2) feature to understand the generated code
- Review approval requests carefully, especially before replacing or removing existing content.
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
- Show total sales by month as a chart
- Investigate why the latest refresh failed
- Check whether the filters in this query fold to the data source
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

Keep these limitations in mind when you use the new Copilot experience in Dataflow Gen2 (preview):

- AI-generated queries, explanations, and charts can be inaccurate. Review the generated code, transformations, and results before relying on them.
- Previews show only a sample of data. A successful preview doesn't establish correctness or performance for the full dataset.
- Copilot can make some changes without an approval prompt, including creating or renaming queries, inserting steps, changing connection bindings or query properties, and setting a data destination.
- Stopping a response or clearing the chat doesn't undo completed changes. A save or refresh that's already started might continue after you stop the response.
- Copilot uses your existing permissions. You still need to resolve authentication, privacy, and other data-source permission prompts in the standard interface.
- Available actions depend on the experience and environment. The legacy Copilot experience doesn't provide the same conversational capabilities or approval controls. To switch back to it, use the toggle in the top-right corner of the Copilot pane when no response is active.

## Related content

- [Get started with Copilot in Fabric in the Data Factory workload](copilot-fabric-data-factory-get-started.md)
- [Copilot pipeline expressions builder](expression-language.md#build-pipeline-expressions-with-copilot)
- [Privacy, security, and responsible use of Copilot in Fabric in the Data Factory workload](../fundamentals/copilot-data-factory-privacy-security.md)
