---
title: How to Get Started with Microsoft Copilot in Fabric in the Data Factory Workload
description: Learn how to get started with Microsoft Copilot in Fabric in the Data Factory workload to use natural language for creating data integration solutions.
ms.reviewer: maghan, sngun
ms.date: 09/02/2025
ms.service: fabric
ms.subservice: data-factory
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

This article shows you how to get started with Microsoft Copilot in Fabric in the Data Factory workload. You can use Copilot to create data integration solutions using natural language prompts in both Dataflow Gen2 and pipelines, and troubleshoot your pipelines with error summaries and recommendations.

> [!TIP]  
> To learn more about Copilot features and capabilities, see [What is Copilot in Fabric in the Data Factory workload?](copilot-fabric-data-factory.md)

Before your business can start using Copilot capabilities in Fabric, your administrator needs to [enable Copilot in Microsoft Fabric](../fundamentals/copilot-fabric-overview.md#enable-copilot).

[!INCLUDE [copilot-note-include](../includes/copilot-note-include.md)]

## Prerequisites

To use Copilot in the Data Factory workload, you need:

- A Microsoft Fabric license
- A workspace with a Fabric capacity
- Copilot enabled in your tenant

## Get started with Copilot for Dataflow Gen2

Use the following steps to get started with Copilot for Dataflow Gen2:

1. Create a new [Dataflow Gen2](../data-factory/tutorial-end-to-end-dataflow.md).

1. On the Home tab in Dataflow Gen2, select the **Copilot** button.

1. In the bottom left of the Copilot pane, select the starter prompt icon, then the **Get data from** option.

1. In the **Get data** window, search for OData and select the **OData** connector.

1. In the Connect to data source for the OData connector, input the following text into the URL field:

   ```http
   https://services.odata.org/V4/Northwind/Northwind.svc/
   ```

1. From the navigator, select the Orders table and then **Select related tables**. Then select **Create** to bring multiple tables into the Power Query editor.

1. Select the Customers query, and in the Copilot pane type this text: `Only keep European customers`, then press Enter or select the **Send message** icon.

   Your input is now visible in the Copilot pane along with a returned response card. You can validate the step by referencing the corresponding step title in the **Applied steps** list and reviewing the formula bar or the data window for the accuracy of your results.

1. Select the Employees query, and in the Copilot pane type this text: `Count the total number of employees by City`, then press Enter or select the **Send message** icon. Your input is now visible in the Copilot pane along with a returned response card and an **Undo** button.

1. Select the column header for the Total Employees column and choose the option **Sort descending**. The **Undo** button disappears because you modified the query.

1. Select the Order_Details query, and in the Copilot pane type this text: `Only keep orders whose quantities are above the median value`, then press Enter or select the **Send message** icon. Your input is now visible in the Copilot pane along with a returned response card.

1. Either select the **Undo** button or type the text `Undo` (any text case) and press **Enter** in the Copilot pane to remove the step.

1. To use the power of Azure OpenAI when creating or transforming your data, ask Copilot to create sample data by typing this text:

   `Create a new query with sample data that lists all the Microsoft OS versions and the year they were released`

   Copilot adds a new query to the Queries pane list, containing the results of your input. At this point, you can either transform data in the user interface, continue to edit with Copilot text input, or ask Copilot to explain the query with an input such as `Explain my current query`.

## Use AI to generate data transformation queries

You can use AI tools, such as Copilot, to generate custom transformation queries for your specific data scenarios. Instead of manually writing complex Power Query M expressions, you can describe your transformation needs in natural language.

```copilot-prompt
Take my current data and create a transformation that filters for customers in Europe, groups employees by city with counts, and removes orders below the median quantity value.
```

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
- [Build pipeline expressions with Copilot](copilot-pipeline-expression-builder.md)
- [Expressions and functions for Data Factory](expression-language.md)
- [Tutorial: Create an end-to-end pipeline](../data-factory/tutorial-end-to-end-pipeline.md)
- [Tutorial: Create an end-to-end dataflow](../data-factory/tutorial-end-to-end-dataflow.md)
