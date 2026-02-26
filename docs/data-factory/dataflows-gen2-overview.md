---
title: Differences between Dataflow Gen1 and Dataflow Gen2
description: Compare differences between Dataflow Gen1 and Gen2 in Data Factory for Microsoft Fabric.
ms.topic: overview
ms.date: 11/19/2025
ms.reviewer: jeluitwi
ms.search.form: DataflowGen2 Overview
ms.custom: dataflows
ai-usage: ai-assisted
---

# What is Dataflow Gen2?

Dataflows are a cloud-based tool that helps you prepare and transform data without writing code. They provide a low-code interface for ingesting data from hundreds of data sources, transforming your data using 300+ data transformations, and loading the resulting data into multiple destinations. Think of them as your personal data assistant that can connect to hundreds of different data sources, clean up messy data, and deliver it exactly where you need it. Whether you're a citizen or professional developer, dataflows empower you with a modern data integration experience to ingest, prepare and transform data from a rich set of data sources including databases, data warehouse, Lakehouse, real-time data, and more.

Dataflow Gen2 is the newer, more powerful version that works alongside the original Power BI Dataflow (now called Gen1). Built using the familiar [Power Query](/power-query/power-query-what-is-power-query) experience that's available across several Microsoft products and services such as Excel, Power BI, Power Platform, and Dynamics 365, Dataflow Gen2 provides enhanced features, better performance, and fast copy capabilities to quickly ingest and transform data. If you're starting fresh, we recommend Dataflow Gen2 for its enhanced features and better performance.

## What can you do with dataflows?

With dataflows, you can:

- **Connect to your data**: Pull information from databases, files, web services, and more.
- **Transform your data**: Clean, filter, combine, and reshape your data using a visual interface.
- **Load data anywhere**: Send your transformed data to databases, data warehouses, or cloud storage.
- **Automate the process**: Set up schedules so your data stays fresh and up-to-date.

## Dataflow features

Here's the features that are available between Dataflow Gen2 and Gen1:

| Feature |   Dataflow Gen2 |  Dataflow Gen1 |
|--------|---|---|
| Create dataflows with Power Query  | ✓ | ✓ |
| Simpler creation process | ✓ |  |
| AutoSave and background publishing | ✓ |  |
| Multiple output destinations  | ✓  |   |
| Better monitoring and refresh tracking       | ✓ |   |
| Works with pipelines     | ✓  |   |
| High-performance computing     | ✓ |   |
| Connect via the dataflow connector | ✓ | ✓ |
| Direct Query via the dataflow connector |  | ✓ |
| Refresh only changed data       | ✓ | ✓ |
| AI-powered insights | ✓ | ✓ |

## Upgrades to Dataflow Gen2

In the next sections are some of the key improvements in Dataflow Gen2 compared to Gen1 to make your data preparation tasks easier and more efficient.

### Gen2 is easier to create and use

Dataflow Gen2 feels familiar if you've used Power Query before. We have streamlined the process to get you up and running faster. You'll be guided step-by-step when getting data into your dataflow, and we've reduced the number of steps needed to create your dataflows.

:::image type="content" source="./media/dataflows-gen2-overview/authoring-experience.png" alt-text="Screenshot of the overall authoring experience in dataflows." lightbox="./media/dataflows-gen2-overview/authoring-experience.png":::

### AutoSave keeps your work safe

Dataflow Gen2 automatically saves your changes as you work. You can step away from your computer, close your browser, or lose internet connection without worrying about losing your progress. When you come back, everything's right where you left it.

Once you're done building your dataflow, you can publish your changes. Publishing saves your work and runs background validations, so you don't have to wait around for everything to check out before moving on to your next task.

To learn more about how saving works, check out [Save a draft of your dataflow](dataflows-gen2-save-draft.md).

### Send data wherever you need it

While Dataflow Gen1 stores transformed data in its own internal storage (which you can access through the Dataflow connector), Dataflow Gen2 gives you the flexibility to use that storage or send your data to different destinations.

This flexibility opens up new possibilities. For example, you can:

- Use a dataflow to load data into a lakehouse, then analyze it with a notebook
- Load data into an Azure SQL database, then use a pipeline to move it to a data warehouse

Dataflow Gen2 currently supports these destinations:

[!INCLUDE [dataflow-gen2-data-destinations](includes/dataflow-gen2-data-destinations.md)]

:::image type="content" source="./media/dataflows-gen2-overview/output-destinations-overview.png" alt-text="Screenshot with the supported data destinations displayed.":::

For more information about the available data destinations, see [Dataflow Gen2 data destinations and managed settings](dataflow-gen2-data-destinations-and-managed-settings.md).

### Better monitoring and refresh tracking

Dataflow Gen2 gives you a clearer picture of what's happening with your data refreshes. We've integrated with [Monitoring Hub](monitoring-hub-pipeline-runs.md) and improved the [Refresh History](dataflows-gen2-monitor.md#refresh-history) experience, so you can track the status and performance of your dataflows.

:::image type="content" source="./media/dataflows-gen2-monitor/refresh-details.png" alt-text="Screenshot showing the details of a refresh status.":::

### Works seamlessly with pipelines

Pipelines let you group activities together to complete larger tasks. Think of them as workflows that can copy data, run SQL queries, execute stored procedures, or run Python notebooks.

You can connect multiple activities in a pipeline, and set it to run on a schedule. For example, every Monday you might use a pipeline to pull data from an Azure blob and clean it up, then trigger a Dataflow Gen2 to analyze the log data. Or at the end of the month, you could copy data from an Azure blob to an Azure SQL database, then run a stored procedure on that database.

:::image type="content" source="./media/dataflows-gen2-overview/data-pipelines-integration.png" alt-text="Screenshot showing the integration with pipelines.":::

To learn more about connecting dataflows with pipelines, see [dataflow activities](dataflow-activity.md).

### High-performance computing

Dataflow Gen2 uses advanced compute Fabric SQL Compute engines to handle large amounts of data efficiently. To make this work, Dataflow Gen2 creates both Lakehouse and Warehouse items in your workspace and uses them to store and access data, improving performance for all your dataflows.

## Copilot for Dataflow Gen2

Dataflow Gen2 integrates with Microsoft Copilot in Fabric to provide AI-powered assistance for creating data integration solutions using natural language prompts. Copilot helps you streamline your dataflow development process by allowing you to use conversational language to perform data transformations and operations.

- **Get data from sources**: Use the "Get data from" starter prompt to connect to various data sources like OData, databases, and files
- **Transform data with natural language**: Apply transformations using conversational prompts such as:
  - "Only keep European customers"
  - "Count the total number of employees by City"
  - "Only keep orders whose quantities are above the median value"
- **Create sample data**: Use Azure OpenAI to generate sample data for testing and development
- **Undo operations**: Type or select "Undo" to remove the last applied step
- **Validate and review**: Each Copilot action appears as a response card with corresponding steps in the Applied steps list

For more information, see [Copilot for Dataflow Gen2](copilot-fabric-data-factory-get-started.md#get-started-with-copilot-for-dataflow-gen2).

## What do you need to use dataflows?

Dataflow Gen2 requires a Fabric capacity, a Fabric trial capacity, or a Power BI Premium capacity. To understand how licensing works for dataflows, check out [Microsoft Fabric concepts and licenses](../enterprise/licenses.md).

## Moving from Dataflow Gen1 to Gen2

If you already have dataflows built with Gen1, don't worry – you can easily migrate them to Gen2. We've got several options to help you make the switch:

- [Export and import your queries](#export-and-import-your-queries)
- [Copy and paste in Power Query](#copy-and-paste-in-power-query)
- [Use the Save As feature](#use-the-save-as-feature)

### Export and import your queries

You can export your Dataflow Gen1 queries and save them to a PQT file, then import them into Dataflow Gen2. For step-by-step instructions, see [Use the export template feature](move-dataflow-gen1-to-dataflow-gen2.md#use-the-export-template-feature).

### Copy and paste in Power Query

If you have a dataflow in Power BI or Power Apps, you can copy your queries and paste them in the Dataflow Gen2 editor. This approach lets you migrate without having to rebuild your queries from scratch. Learn more: [Copy and paste existing Dataflow Gen1 queries](move-dataflow-gen1-to-dataflow-gen2.md#copy-and-paste-existing-dataflow-gen1-queries).

### Use the Save As feature

If you already have any type of dataflow (Gen1, Gen2, or Gen2 CI/CD), Data Factory now includes a Save As feature. This lets you save any existing dataflow as a new Dataflow Gen2 (CI/CD) item with just one action. More details: [Migrate to Dataflow Gen2 (CI/CD) using Save As](migrate-to-dataflow-gen2-using-save-as.md).

## Related content

Ready to learn more? Check out these helpful resources:

- [Monitor your dataflows](dataflows-gen2-monitor.md) - Track refresh history and performance
- [Save drafts as you work](dataflows-gen2-save-draft.md) - Learn about the autosave feature
- [Migrate from Gen1 to Gen2](move-dataflow-gen1-to-dataflow-gen2.md) - Step-by-step migration guide
