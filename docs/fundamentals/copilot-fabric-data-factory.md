---
title: Copilot for Data Factory overview
description: "Learn how Copilot in Data Factory empowers customers to use natural language to articulate their requirements for creating data integration solutions."
author: snehagunda
ms.author: sngun
ms.reviewer: alpowers
ms.topic: conceptual
ms.date: 06/02/2024
ms.custom:
  - ignite-2024
no-loc: [Copilot]
ms.collection: ce-skilling-ai-copilot
---
# Copilot for Data Factory overview

> [!IMPORTANT]
> Copilot for Data Factory is generally available now, but its new Data pipeline capabilities are still in [preview](../fundamentals/preview.md).

Copilot in Fabric enhances productivity, unlocks profound insights, and facilitates the creation of custom AI experiences tailored to your data. As a component of the Copilot in Fabric experience, Copilot in Data Factory empowers customers to use natural language to articulate their requirements for creating data integration solutions using [Dataflow Gen2](../data-factory/data-factory-overview.md#dataflows).  Essentially, Copilot in Data Factory operates like a subject-matter expert (SME) collaborating with you to design your dataflows.

Copilot for Data Factory is an AI-enhanced toolset that supports both citizen and professional data wranglers in streamlining their workflow. It provides intelligent [Mashup](/powerquery-m/m-spec-introduction) code generation to transform data using natural language input and generates code explanations to help you better understand earlier generated complex queries and tasks.

Before your business can start using Copilot capabilities in Fabric, your administrator needs to [enable Copilot in Microsoft Fabric](../fundamentals/copilot-fabric-overview.md#enable-copilot).

[!INCLUDE [copilot-note-include](../includes/copilot-note-include.md)]

## Supported capabilities

With Dataflow Gen2, you can:

- Generate new transformation steps for an existing query.
- Provide a summary of the query and the applied steps.
- Generate a new query that may include sample data or a reference to an existing query.

With Data pipelines, you can:

- **Pipeline Generation**: Using natural language, you can describe your desired pipeline, and Copilot will understand the intent and generate the necessary Data pipeline activities.
- **Error message assistant**: troubleshoot Data pipeline issues with clear error explanation capability and actionable troubleshooting guidance.
- **Summarize Pipeline**: Explain your complex pipeline with the summary of content and relations of activities within the Pipeline.

## Get started

Data Factory Copilot is available in both Dataflow Gen2, and Data pipelines.

### Get started with Copilot for Dataflow Gen2

Use the following steps to get started with Copilot for Dataflow Gen2:

1. Create a new [Dataflows Gen2](../data-factory/tutorial-end-to-end-dataflow.md).
1. On the Home tab in Dataflows Gen2, select the **Copilot** button.

    :::image type="content" source="media/copilot-fabric-data-factory/copilot-home-tab.png" alt-text="Screenshot showing Copilot icon on the Home tab.":::

1. In the bottom left of the Copilot pane, select the starter prompt icon, then the **Get data from** option.

    :::image type="content" source="media/copilot-fabric-data-factory/get-data-from-starter-prompt.png" alt-text="Screenshot showing Get data from the starter prompt.":::

1. In the **Get data** window, search for OData and select the **OData** connector.

    :::image type="content" source="media/copilot-fabric-data-factory/search-odata-connector.png" alt-text="Screenshot showing Select the OData connector.":::

1. In the Connect to data source for the OData connector, input the following text into the URL field:

    ```
    https://services.odata.org/V4/Northwind/Northwind.svc/
    ```

    :::image type="content" source="media/copilot-fabric-data-factory/connect-data-source.png" alt-text="Screenshot showing Connect to the data source.":::

1. From the navigator, select the Orders table and then **Select related tables**. Then select **Create** to bring multiple tables into the Power Query editor.
 
    :::image type="content" source="media/copilot-fabric-data-factory/choose-data-orders-related-tables.png" alt-text="Screenshot showing Choose the data orders table and related tables." lightbox="media/copilot-fabric-data-factory/choose-data-orders-related-tables.png":::

1. Select the Customers query, and in the Copilot pane type this text: ```Only keep European customers```, then press <kbd>Enter</kbd> or select the **Send message** icon. 

    Your input is now visible in the Copilot pane along with a returned response card. You can validate the step with the corresponding step title in the **Applied steps** list and review the formula bar or the data preview window for accuracy of your results.
 
    :::image type="content" source="media/copilot-fabric-data-factory/copilot-filter-rows.png" alt-text="Screenshot showing Filter rows." lightbox="media/copilot-fabric-data-factory/copilot-filter-rows.png":::

1. Select the Employees query, and in the Copilot pane type this text: ```Count the total number of employees by City```, then press <kbd>Enter</kbd> or select the **Send message** icon. Your input is now visible in the Copilot pane along with a returned response card and an **Undo** button.
1. Select the column header for the Total Employees column and choose the option **Sort descending**. The **Undo** button disappears because you modified the query.

    :::image type="content" source="media/copilot-fabric-data-factory/copilot-group-by.png" alt-text="Screenshot showing the Copilot pane and Power Query Online user interface." lightbox="media/copilot-fabric-data-factory/copilot-group-by.png":::
 
1. Select the Order_Details query, and in the Copilot pane type this text: ```Only keep orders whose quantities are above the median value```, then press <kbd>Enter</kbd> or select the **Send message** icon. Your input is now visible in the Copilot pane along with a returned response card. 
1. Either select the **Undo** button or type the text ```Undo``` (any text case) and press **Enter** in the Copilot pane to remove the step.

    :::image type="content" source="media/copilot-fabric-data-factory/copilot-undo-action.png" alt-text="Screenshot showing the undo button." lightbox="media/copilot-fabric-data-factory/copilot-undo-action.png":::
 
1. To leverage the power of Azure OpenAI when creating or transforming your data, ask Copilot to create sample data by typing this text:

    ```Create a new query with sample data that lists all the Microsoft OS versions and the year they were released```

    Copilot adds a new query to the Queries pane list, containing the results of your input. At this point, you can either transform data in the user interface, continue to edit with Copilot text input, or delete the query with an input such as ```Delete my current query```.

    :::image type="content" source="media/copilot-fabric-data-factory/copilot-create-new-query.png" alt-text="Screenshot showing a new query being created." lightbox="media/copilot-fabric-data-factory/copilot-create-new-query.png":::

### Get started with Copilot for Data pipelines

You can use Copilot to generate, summarize, or even troubleshoot your Data pipelines.

#### Generate a Data pipeline with Copilot

Use these steps to generate a new pipeline with Copilot for Data Factory:

1. Create a new [Data pipeline](../data-factory/tutorial-end-to-end-pipeline.md).
1. On the **Home** tab of the Data pipeline editor, select the **Copilot** button.

   :::image type="content" source="media/copilot-fabric-data-factory/copilot-button.png" alt-text="Screenshot of the Copilot button on the Data Factory pipeline home tab.":::

1. Then you can get started with Copilot to build your pipeline with the **Ingest data** option.

   :::image type="content" source="media/copilot-fabric-data-factory/ingest-data.png" alt-text="Screenshot showing the Data Factory Copilot, highlighting the Ingest data option.":::

1. Copilot generates a **Copy activity** and you can interact with Copilot to complete the whole flow. You can type _/_ to select the source and destination connection, and then add all the required content according to the prefilled started prompt context.

   :::image type="content" source="media/copilot-fabric-data-factory/copilot-copy-activity-details.png" alt-text="Screenshot showing the Copilot requesting additional details in the chat to complete the generated Copy activity.":::

1. After everything is setup, simply select **Run this pipeline** to execute the new pipeline and ingest the data.

   :::image type="content" source="media/copilot-fabric-data-factory/run-this-pipeline.png" alt-text="Screenshot showing the Copilot window with the Run this pipeline button highlighted.":::

   :::image type="content" source="media/copilot-fabric-data-factory/pipeline-summary.png" alt-text="Screenshot showing the Copilot window with the pipeline completed and summarized.":::

1. If you are already familiar with Data pipelines, you can complete everything with one prompt command, too.

   :::image type="content" source="media/copilot-fabric-data-factory/single-prompt-pipeline.png" alt-text="Screenshot showing how to create a pipeline with a single prompt.":::

#### Summarize a Data pipeline with Copilot

Use these steps to summarize a pipeline with Copilot for Data Factory:

1. Open an existing Data pipeline.
1. On the **Home** tab of the pipeline editor window, select the **Copilot** button.

   :::image type="content" source="media/copilot-fabric-data-factory/copilot-button.png" alt-text="Screenshot of the Copilot button on the Data Factory pipeline home tab.":::

1. Then you can get started with Copilot to summarize the content of the pipeline.

   :::image type="content" source="media/copilot-fabric-data-factory/summarize-pipeline.png" alt-text="Screenshot showing the Summarize this pipeline button in the Copilot window.":::

1. Select **Summarize this pipeline** and Copilot generates a summary.

   :::image type="content" source="media/copilot-fabric-data-factory/summarize-pipeline-results.png" alt-text="Screenshot showing Copilots summarization of the pipeline details.":::

#### Troubleshoot pipeline errors with Copilot

Copilot empowers you to troubleshoot any pipeline with error messages. You can either use Copilot for pipeline error messages assistant in the Fabric Monitor page, or in pipeline authoring page. The steps below show you how to access the pipeline Copilot to troubleshoot your pipeline from the Fabric Monitor page, but you can use the same steps from the pipeline authoring page.

1. Go to Fabric Monitor page and select filters to show pipelines with failures, as shown below:

   :::image type="content" source="media/copilot-fabric-data-factory/pipeline-failures.png" alt-text="Screenshot showing the Fabric Monitor page, filtered for Data pipelines with failures.":::

1. Select the Copilot icon beside the failed pipeline.

   :::image type="content" source="media/copilot-fabric-data-factory/monitor-copilot-icon.png" alt-text="Screenshot of the Copilot icon beside a failed Data pipeline run.":::

1. Copilot provides a clear error message summary and actionable recommendations to fix it. In the recommendations, troubleshooting links are provided for you to efficiently investigate further.

   :::image type="content" source="media/copilot-fabric-data-factory/troubleshooting-recommendations.png" alt-text="Screenshot showing the Copilot recommendations for troubleshooting a failed Data pipeline.":::

## Limitations of Copilot for Data Factory

Here are the current limitations of Copilot for Data Factory:

- Copilot can't perform transformations or explanations across multiple queries in a single input. For instance, you can't ask Copilot to "Capitalize all the column headers for each query in my dataflow."
- Copilot doesn't understand previous inputs and can't undo changes after a user commits a change when authoring, either via user interface or the chat pane. For example, you can't ask Copilot to "Undo my last 5 inputs." However, users can still use the existing user interface options to delete unwanted steps or queries.
- Copilot can't make layout changes to queries in your session. For example, if you tell Copilot to create a new group for queries in the editor, it doesn't work.
- Copilot may produce inaccurate results when the intent is to evaluate data that isn't present within the sampled results imported into the sessions data preview.
- Copilot doesn't produce a message for the skills that it doesn't support. For example, if you ask Copilot to "Perform statistical analysis and write a summary over the contents of this query", it doesn't complete the instruction successfully as mentioned previously. Unfortunately, it doesn't give an error message either.

## Related content

- [Privacy, security, and responsible use of Copilot for Data Factory (preview)](copilot-data-factory-privacy-security.md)
