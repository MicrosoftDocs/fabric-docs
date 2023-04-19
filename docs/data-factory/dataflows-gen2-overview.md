---
title: Dataflows Gen2 overview
description: An overview of the new generation of dataflows.
author: luitwieler
ms.topic: overview
ms.date: 03/28/2023
ms.author: jeluitwi
---

# Dataflows Gen2

Dataflows Gen2 is the new generation of dataflows. The new generation of dataflows replaces the current Dataflow Gen1 (Power BI Dataflows) and brings new features and other improvements. The following section provides an overview of all the new features that are introduced in Gen2.

## Feature overview

| Feature |   Dataflows Gen2 |  Dataflows Gen1 |
|--------|---|---|
| Same authoring experience | X | X |
| Background query validation during publishing | X |  |
| Output destinations  | X  |   |
| Improved monitoring and refresh history       |  X |   |
| Integration with data pipelines     | X  |   |
| Save as draft       | X  |   |
| Fast copy       | X  |   |
| High scale compute using lakehouse     |  X |   |
| Enhanced compute using Premium SQL engine |  |  X|
| Incremental refresh       | *Coming soon  | X  |
| AI Insights support | *Coming soon | X |
| Dataflow Gen1 to Gen2 migration | *Coming soon |  |

### Authoring experience

Working with Dataflows Gen2 feels like coming home. We kept the full experience you're used to in Power BI dataflows. When you enter the experience, you're guided step-by-step for getting the data into your dataflow. We also added a few new features to make your experience even better.

:::image type="content" source="./media/dataflows-gen2-overview/authoring-experience.png" alt-text="Screenshot of the overall authoring experience in dataflows." lightbox="./media/dataflows-gen2-overview/authoring-experience.png":::

### Background query validation during publishing

With Dataflows Gen2, we added a new feature that validates your queries in the background. This feature allows you to save your dataflow without having to wait for the validation to finish. This feature saves you valuable time and makes your experience even better. When you publish your dataflow, we validate your queries and show you an error message if there are any errors. This feature allows you to fix the errors after you published your dataflow, and then republish it.

### Output destinations

Dataflows Gen2 allows your data destination to be more flexible, and you can choose your own destination. Using this feature, you can now do a full separation between your ETL logic and storage. This feature benefits you in many ways. For example, you can now use a dataflow to load data into a lakehouse and then use a notebook to analyze the data. Or you can use a dataflow to load data into an SQL database and then use a data pipeline to load the data into a data warehouse.

In Dataflows Gen2, we added support for the following destinations and many more are coming soon:

- Fabric Lakehouse
- Azure Data Explorer (Kusto)
- Azure Synapse Analytics (SQL DW)
- Azure SQL Database

Learn more about this feature [here](../placeholder.md).

:::image type="content" source="./media/dataflows-gen2-overview/output-destinations-overview.png" alt-text="Screenshot with the supported output destinations displayed.":::

### Improved refresh history and monitoring

With Dataflows Gen2, we introduce a new way for you to monitor your dataflow refreshes. We integrated support for [Monitor Hub](../placeholder.md) and give our [Refresh History](./dataflows-gen2-monitor.md) experience a major upgrade.

:::image type="content" source="./media/dataflows-gen2-monitor/refresh-details.png" alt-text="Screenshot showing the details of a refresh status.":::

### Integration with data pipelines

Data pipelines allow you to group activities that together perform a task. An activity is a unit of work that can be executed. For example, an activity can copy data from one location to another, run a SQL query, execute a stored procedure, or run a Python notebook.

A pipeline can contain one or more activities that are connected by dependencies. For example, you can use a pipeline to ingest and clean data from an Azure blob, and then kick off a Dataflow Gen2 to analyze the log data. You can also use a pipeline to copy data from an Azure blob to an Azure SQL database, and then run a stored procedure on the database.

:::image type="content" source="./media/dataflows-gen2-overview/data-pipelines-integration.png" alt-text="Screenshot showing the integration with data pipelines.":::

### Save as draft

With Dataflows Gen2, we introduce a worry free experience by removing the need for publishing to save your changes. With save as draft functionality, we store a draft version of your dataflow every time you make a change. Did you lose internet connectivity? Did you accidentally close your browser? No worries; we got your back. Once you return to your dataflow, your recent changes will still be there and you can continue where you left off. This is a seamless experience and doesn't require any input from you. This allows you to work on your dataflow without having to worry about losing your changes or having to fix all the query errors before you can save your changes. Learn more about this feature [here](./dataflows-gen2-savedraft.md).

### Fast copy

Fast copy allows you to apply the speed and agility of pipeline copy activity with the simple use of dataflows. We automatically detect if the data size is significant enough to use a data pipeline copy activity. Learn more about this feature [here](../placeholder.md).

### High scale compute

With Dataflows Gen2, we introduce a new feature that uses Lakehouse compute to improve performance for all your dataflows. The following section shows an architecture overview how this works. Learn more about this feature [here](../placeholder.md).

## Architecture changes from Gen1 to Gen2

The architecture of Dataflows Gen2 is different from Gen1. Below we provide you with an overview of the architecture changes. These benefits provide you with a better experience and more flexibility.

A simplified version of the core architecture of Power BI dataflows exists in the following components:

- Dataflow engine (mashup engine)
- Storage
  - Power BI managed storage
  - SQL endpoint for premium dataflows

The following image shows how these components interact with each other during the execution of a dataflow.

:::image type="content" source="./media/dataflows-gen2-overview/architecture-gen1.png" alt-text="Screenshot showing the PBI dataflow architecture.":::

The Gen2 architecture is different from Gen1. The new architecture uses Lakehouse compute to improve performance for all your dataflows. The following image is an architecture overview how this works.

:::image type="content" source="./media/dataflows-gen2-overview/architecture-gen2.png" alt-text="Screenshot showing the gen2 dataflow architecture.":::

## Migration from Gen1 to Gen2

You probably have many dataflows in Gen1 and you're wondering how you can migrate them to Gen2. We have a few options for you to migrate your dataflows to Gen2. The following sections provide you with an overview of all the options.

### Copy past your PowerQuery in the browser

If you have a dataflow in Power BI or Power Apps, you can copy your queries and paste them in the editor of your dataflow Gen2. This functionality allows you to migrate your dataflow to Gen2 without having to rewrite your queries.
