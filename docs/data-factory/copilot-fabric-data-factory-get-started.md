---
title: How to Get Started with Microsoft Copilot in Fabric in the Data Factory Workload
description: Learn how to get started with Microsoft Copilot in Fabric in the Data Factory workload to use natural language for creating data integration solutions.
ms.reviewer: maghan, sngun
ms.date: 10/19/2026
ms.topic: how-to
ms.collection:
  - ce-skilling-ai-copilot
ms.update-cycle: 180-days
ms.custom:
  - copilot-scenario-highlight
ms.devlang: copilot-prompt
ai-usage: ai-assisted
---

# Get started with Copilot in Fabric in the Data Factory workload

This article shows you how to get started with Microsoft Copilot in Fabric in the Data Factory workload. You can use Copilot to create data integration solutions using natural language prompts in both dataflow Gen2 and pipelines, and troubleshoot your pipelines with error summaries and recommendations.

> [!TIP]  
> To learn more about Copilot features and capabilities, see [What is Copilot in Fabric in the Data Factory workload?](copilot-fabric-data-factory.md)

Before your business can start using Copilot capabilities in Fabric, your administrator needs to [enable Copilot in Fabric](../fundamentals/copilot-fabric-overview.md#enable-copilot).

[!INCLUDE [copilot-note-include](../includes/copilot-note-include.md)]

## Prerequisites

To use Copilot in the Data Factory workload, you need:

- A paid Fabric capacity (F2 or higher, or P1 or higher). Copilot isn't supported on trial SKUs.
- A workspace assigned to that Fabric capacity.
- Copilot enabled by your Fabric administrator. For more information, see [Enable Copilot in Fabric](../fundamentals/copilot-fabric-overview.md#enable-copilot).
- If your tenant or capacity is outside the US or EU, your administrator must also enable the tenant setting that allows data to be processed outside your capacity's geographic region.

## Get started with Copilot for dataflow Gen2

The new Copilot experience in Dataflow Gen2 (preview) helps you work through data preparation tasks in a conversation alongside the Power Query editor. It can inspect queries and results, make changes, and ask follow-up questions.

> [!NOTE]
> **These instructions are specific to the new Copilot experience in Dataflow Gen2, which is in preview.** They don't apply to pipeline Copilot or the legacy Dataflow Gen2 experience. Available actions can differ depending on your environment. To switch back to the legacy experience, use the toggle in the top-right corner of the Copilot pane when no response is active.

For the full action list and approval requirements, see [Supported tools and capabilities in Dataflow Gen2 (preview)](copilot-fabric-data-factory.md#supported-tools-and-capabilities-in-dataflow-gen2-preview).

1. Create a new [Dataflow Gen2](tutorial-end-to-end-dataflow.md) or open an existing dataflow in the Power Query editor.

1. On the **Home** tab, select **Copilot**.

   The pane opens alongside the Power Query editor. The **New experience (Preview)** toggle is in the top-right corner of the pane.

   :::image type="content" source="media/copilot-fabric-data-factory-get-started/dataflow-gen2-new-copilot-pane.png" alt-text="Copilot pane with the New experience (Preview) toggle on at the top right, Northwind starter prompts, and an Ask about your data Message box." lightbox="media/copilot-fabric-data-factory-get-started/dataflow-gen2-new-copilot-pane.png":::

1. Describe the data you need or the task you want to complete. For example, ask Copilot to find an existing connection that you have permission to use. Complete any connection or authentication prompts in the standard interface.

   To follow the remaining steps in this walkthrough, use **Get data** to select the **OData** connector and enter this URL:

   ```http
   https://services.odata.org/V4/Northwind/Northwind.svc/
   ```

   From the navigator, select **Orders**, select **Select related tables**, and then select **Create** to bring the tables into the editor.

1. Select the **Customers** query and enter a specific request in the Copilot pane:

   ```copilot-prompt
   Keep only customers where the `Country` column contains France, Germany, or Spain.
   ```

1. Review Copilot's progress and respond to any clarification or approval requests. After the changes are applied, inspect **Applied steps**, the formula bar, and the data preview.

1. Continue the conversation with a follow-up request:

   ```copilot-prompt
   Explain the filter you added and show the number of remaining customers by country/region.
   ```

Copilot can use the selected query, step, or columns as context for requests such as "Explain this step." Name the query and columns when your request could be ambiguous.

### Add context and attach files

Use `@` to reference queries or `/` to add data from the Copilot message box. Where supported, you can also select files through the available import experience.

To select a file, open the **+** menu beside the message box, select **Upload**, and then choose **Upload file** for a local file or **Attach cloud file** for a cloud file.

:::image type="content" source="media/copilot-fabric-data-factory-get-started/dataflow-gen2-copilot-file-attachments.png" alt-text="Upload submenu beside the Copilot message box, with Upload file and Attach cloud file options.":::

Selecting a file doesn't give Copilot general access to your files. Complete any import or connection prompts in the standard interface.

### Review and approve changes

Copilot can change the editing session directly. By default, it asks for approval before replacing an existing step's expression, deleting a step or query, replacing a query's complete Power Query M script, or removing a data destination.

Review the requested action and target. Where applicable, the approval request shows a comparison of the current and proposed code.

| Choice | What happens |
|---|---|
| Approve | Allows the requested action to run. |
| Deny | Prevents that action from running. |
| Approve or deny all remaining actions | Applies your decision to the undecided actions in the current group of requests. |
| Always approve this action for the session | Allows that type of action now and for subsequent requests in the session, including actions on other queries. |

After you decide on all pending requests, Copilot continues automatically. Approval allows an action to be attempted; it doesn't guarantee success. Review the reported result.

Session approvals apply to an action type, not just the selected query. Previously denied actions remain denied. Clearing the chat resets session approvals. Sending a new message while decisions are pending cancels those pending requests, but doesn't undo earlier changes or reset approvals you've already granted for the session.

> [!IMPORTANT]
> Not every change requires approval. Copilot can create and rename queries, insert steps, bind or unbind existing connections, change query properties, and set data destinations without an additional approval prompt. Review these changes in the editor before saving or running your dataflow.

Copilot doesn't replace standard data-source controls. Complete authentication, privacy, native-query permission, and other connection prompts in the standard interface. A session approval doesn't approve these prompts.

### Save and run your dataflow

Where supported, you can ask Copilot to save and run the current dataflow. Review your queries, connection bindings, and data destinations first.

Copilot asks you to approve or deny each save-and-run request. Session approvals for query changes don't bypass this confirmation, and there's no **Always approve** option for this action.

> [!IMPORTANT]
> Running a dataflow can write data to its configured destinations. This action isn't a data preview.

### Stop a response or clear the chat

You can stop an active Copilot response. Stopping requests cancellation, but it doesn't roll back completed edits. Some actions might already have completed, and a save or refresh that's already started might continue.

Clear the chat to reset the conversation and session approvals, not to discard query changes.

### Switch back to the legacy Copilot experience

The new Copilot experience in Dataflow Gen2 is in preview. You can return to the legacy experience by using the toggle in the top-right corner of the Copilot pane. Wait for the current response to finish, or stop it, before switching. You can use the same toggle to return to the new experience.

## Use AI to generate data transformation queries

You can use AI tools, such as Copilot, to generate custom transformation queries for your specific data scenarios. Instead of manually writing complex Power Query M expressions, you can describe your transformation needs in natural language.

```copilot-prompt
Create a query that references Customers, keeps customers in France, Germany, or Spain, and counts customers by country/region using the `Country` column.
```

Review any requested approvals and inspect the resulting query in the editor. You can continue with a request to explain the transformations or visualize the result:

```copilot-prompt
Show the customer count by country/region as a chart.
```

### Inspect activity and data previews

Copilot shows progress and results in the conversation as it works through a request. Expand the activity summary to review actions such as inspecting a query, validating M code, adding a query, and preparing a chart.

The following screenshots illustrate a sample query named **OrdersSample**. Your query names, data, and results can differ from these examples and the preceding tutorial.

:::image type="content" source="media/copilot-fabric-data-factory-get-started/dataflow-gen2-copilot-activity-results.png" alt-text="Expanded Used 6 tools summary for an OrdersSample chart request, showing query inspection, two previews, script validation, OrdersSample_Statistics added, and Chart ready." lightbox="media/copilot-fabric-data-factory-get-started/dataflow-gen2-copilot-activity-results.png":::

Expand a **Preview ready** result to inspect the data in a table directly in the Copilot pane. Use it to check the columns and sample values associated with the response without leaving the conversation.

:::image type="content" source="media/copilot-fabric-data-factory-get-started/dataflow-gen2-copilot-data-preview.png" alt-text="Expanded Preview ready for OrdersSample table with OrderId, OrderedAtUtc, Customer, Region, Category, and Units columns; some Customer and Region values are null." lightbox="media/copilot-fabric-data-factory-get-started/dataflow-gen2-copilot-data-preview.png":::

### Visualize query results

Ask Copilot to create a chart to help explore your query results. For example, if your dataflow contains a query named **OrdersSample**, you can ask:

```copilot-prompt
Give me a chart that displays a statistics summary of my table query named OrdersSample.
```

Copilot can create a supporting query, display a chart in the pane, and explain the results. Review any supporting query in the editor alongside the visualization.

:::image type="content" source="media/copilot-fabric-data-factory-get-started/dataflow-gen2-copilot-chart.png" alt-text="OrdersSample statistics summary with bar charts titled Order and data-quality counts and Sales summary (USD), with Count and USD axis labels." lightbox="media/copilot-fabric-data-factory-get-started/dataflow-gen2-copilot-chart.png":::

AI-generated charts and explanations can be incorrect. Check the underlying values, axis labels, scales, and aggregations before relying on or sharing a visualization.

### Troubleshoot a query or refresh

Ask Copilot to investigate errors or performance problems by using the query and refresh information available to you. For example:

```copilot-prompt
Check whether the filters in my Orders query fold to the data source, and explain any performance concerns.
```

```copilot-prompt
Investigate the latest failed refresh of this dataflow and suggest what I should check next.
```

Review the evidence and recommendations before making changes. Evaluating a query or generating a preview can contact a data source and consume resources. A preview doesn't show how the query performs on the full dataset.

For authoring or explaining dynamic expressions within pipeline activities, see [Use Copilot in Expression Builder to generate and explain pipeline expressions](#use-copilot-in-expression-builder-to-generate-and-explain-pipeline-expressions).

> [!NOTE]  
> AI powers Copilot, so surprises and mistakes are possible.

## Generate a pipeline with Copilot

You can use AI tools, such as Copilot, to generate complete pipeline workflows from natural language descriptions. Instead of manually creating and configuring pipeline activities, describe your data integration needs and let Copilot generate the pipeline structure.

```copilot-prompt
Create a pipeline that copies data from a SQL Server database table called "Orders" to an Azure Data Lake Storage Gen2 container, with error handling and logging enabled.
```

Or you can use these steps to generate a new pipeline alongside Copilot for Data Factory:

1. Create a new [pipeline](../data-factory/tutorial-end-to-end-pipeline.md).
1. On the **Home** tab of the pipeline editor, select the **Copilot** button.

1. Then you can get started with Copilot to build your pipeline with the **Ingest data** option.

1. Copilot generates a **Copy activity**, and you can interact with Copilot to complete the whole flow. You can type `/` to select the source and destination connection, and then add all the required content according to the prefilled started prompt context.

1. After everything is set up, select **Run this pipeline** to execute the new pipeline and ingest the data.

1. If you're already familiar with pipelines, you can complete everything with one prompt command, too.

> [!NOTE]  
> AI powers Copilot, so surprises and mistakes are possible.

### Use Copilot in expression builder to generate and explain pipeline expressions

Within any pipeline activity or system setting that supports dynamic content, the expression builder includes Copilot. With Copilot, you can:

- Write natural language prompts to generate valid pipeline expressions
- Insert the generated expression directly into your pipeline
- Select existing expressions and ask Copilot to explain them

To use Copilot in expression builder:

1. Open a pipeline and select an activity setting that supports expressions (for example, a query or parameter).

1. Choose **Add dynamic content** to open the expression builder.

1. Use the Copilot pane to enter a natural language prompt to generate an expression. Review the suggested expression and select **Accept** to apply it.

    Example prompts for common pipeline expression scenarios:

    ```copilot-prompt
    Create an expression that formats today's date as yyyy-MM-dd
    ```

    ```copilot-prompt
    Return the first non-empty value between pipeline parameter p1 and variable v2
    ```

1. To understand existing logic, open the expression builder and ask Copilot to explain with a prompt like "Explain this expression" or "What is this expression doing?"

> [!NOTE]  
> AI powers Copilot, so surprises and mistakes are possible.

## Summarize a pipeline with Copilot

Use these steps to summarize a pipeline with Copilot for Data Factory:

1. Open an existing pipeline.

1. On the **Home** tab of the pipeline editor window, select the **Copilot** button.

1. Then you can get started with Copilot to summarize the content of the pipeline.

1. Select **Summarize this pipeline**, and Copilot generates a summary.

## Troubleshoot pipeline errors with Copilot

Copilot empowers you to troubleshoot any pipeline with error messages on the Fabric Monitor page or the pipeline authoring page. When your pipeline fails, instead of manually analyzing error logs, Copilot can explain the error and provide troubleshooting recommendations.

Here's how to access the pipeline Copilot to troubleshoot your pipeline from the Fabric Monitor page; however, you can also use these steps from the pipeline authoring page.

1. Go to the Fabric Monitor page and select filters to show pipelines with failures.

1. Select the Copilot icon beside the failed pipeline.

1. Copilot provides a clear error message summary and actionable recommendations to fix it. In the recommendations, troubleshooting links are provided to help you investigate further efficiently.

Optionally, you can use a prompt like this one with the Copilot agent:

```copilot-prompt
Explain this pipeline error and provide troubleshooting steps: "The pipeline failed with a timeout error when connecting to the SQL Server database. Connection string: Server=myserver;Database=mydb;Integrated Security=true"
```

> [!NOTE]  
> AI powers Copilot, so surprises and mistakes are possible.

## Related content

- [What is Copilot in the Data Factory workload?](copilot-fabric-data-factory.md)
- [Build pipeline expressions with Copilot](expression-language.md#build-pipeline-expressions-with-copilot)
- [Expressions and functions for Data Factory](expression-language.md)
- [Tutorial: Create an end-to-end pipeline](../data-factory/tutorial-end-to-end-pipeline.md)
- [Tutorial: Create an end-to-end dataflow](../data-factory/tutorial-end-to-end-dataflow.md)
