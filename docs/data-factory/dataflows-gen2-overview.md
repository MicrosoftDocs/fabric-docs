---
title: Dataflows Gen1 versus Gen2
description: Compare differences between dataflows gen1 and gen2 in Data Factory for Microsoft Fabric.
author: luitwieler
ms.topic: overview
ms.date: 05/23/2023
ms.author: jeluitwi
---

# Compare differences between Dataflow Gen1 and Gen2 in Data Factory for Microsoft Fabric

Dataflow Gen2 is the new generation of dataflows. The new generation of dataflows resides alongside the Power BI Dataflow (Gen1) and brings new features and improved experiences. The following section provides a comparison between Dataflows Gen1 and Dataflows Gen2.

[!INCLUDE [df-preview-warning](includes/data-factory-preview-warning.md)]

## Feature overview

| Feature |   Dataflow Gen2 |  Dataflow Gen1 |
|--------|---|---|
| Author dataflows with Power Query  | ✓ | ✓ |
| Shorter E2E authoring flow | ✓ |  |
| Auto-Save and Async Publishing dataflows | ✓ |  |
| Output destinations  | ✓  |   |
| Improved monitoring and refresh history       | ✓ |   |
| Integration with data pipelines     | ✓  |   |
| Save as draft       | ✓ |   |
| Fast copy       | ✓  |   |
| High-scale compute     | ✓ |   |
| Get Data via Dataflows Connector | ✓ | ✓ |
| Direct Query via Dataflows Connector |  | ✓ |
| Incremental refresh       |   | ✓ |
| AI Insights support |  | ✓ |

### Shorter authoring experience

Working with Dataflow Gen2 feels like coming home. We kept the full Power Query experience you're used to in Power BI dataflows. When you enter the experience, you're guided step-by-step for getting the data into your dataflow. We also shorten the authoring experience to reduce the number of steps required to create dataflows, and added a few new features to make your experience even better.

:::image type="content" source="./media/dataflows-gen2-overview/authoring-experience.png" alt-text="Screenshot of the overall authoring experience in dataflows." lightbox="./media/dataflows-gen2-overview/authoring-experience.png":::

### New dataflow save experience

With Dataflow Gen2, we changed how saving a dataflow works. Any changes made to a dataflow are auto-saved to the cloud so you can exit the authoring experience at any point and continue from where you left off at a later time. Once you're done authoring your dataflow you publish your changes and those changes will be used when the dataflow refreshes. In addition, publishing the dataflow will save your changes and run validations that must be performed in the background.  This lets you save your dataflow without having to wait for validation to finish. 

Learn more about [Dataflows save as draft](dataflows-gen2-save-draft.md)

### Output destinations

Similar to Dataflows Gen1, Dataflow Gen2 allow you to transform your data into dataflow's internal/staging storage where it can be accessed via the Dataflow connector. Dataflow Gen2 also allow you to specify an output destination for your data. Using this feature, you can now separate your ETL logic and destination storage. This feature benefits you in many ways. For example, you can now use a dataflow to load data into a lakehouse and then use a notebook to analyze the data. Or you can use a dataflow to load data into an Azure SQL database and then use a data pipeline to load the data into a data warehouse.

In Dataflow Gen2, we added support for the following destinations and many more are coming soon:

- Fabric Lakehouse
- Azure Data Explorer (Kusto)
- Azure Synapse Analytics (SQL DW)
- Azure SQL Database

Learn more about this feature [here](dataflows-gen2-overview.md).

:::image type="content" source="./media/dataflows-gen2-overview/output-destinations-overview.png" alt-text="Screenshot with the supported output destinations displayed.":::

### New refresh history and monitoring

With Dataflow Gen2, we introduce a new way for you to monitor your dataflow refreshes. We integrated support for [Monitor Hub](../placeholder.md) and give our [Refresh History](./dataflows-gen2-monitor.md) experience a major upgrade.

:::image type="content" source="./media/dataflows-gen2-monitor/refresh-details.png" alt-text="Screenshot showing the details of a refresh status.":::

### Integration with data pipelines

Data pipelines allow you to group activities that together perform a task. An activity is a unit of work that can be executed. For example, an activity can copy data from one location to another, run a SQL query, execute a stored procedure, or run a Python notebook.

A pipeline can contain one or more activities that are connected by dependencies. For example, you can use a pipeline to ingest and clean data from an Azure blob, and then kick off a Dataflow Gen2 to analyze the log data. You can also use a pipeline to copy data from an Azure blob to an Azure SQL database, and then run a stored procedure on the database.

:::image type="content" source="./media/dataflows-gen2-overview/data-pipelines-integration.png" alt-text="Screenshot showing the integration with data pipelines.":::

### High scale compute

Similar to Dataflows Gen1, Dataflow Gen2 also features enhanced compute engine to improve performance of both transformations of referenced queries and get data scenarios. To achieve this, Dataflows Gen2 create both Lakehouse and Warehouse artifacts in your workspace, and leverage them to store and access data to improve performance for all your dataflows.

## Try out Gen2 Dataflows by re-using your queries from Dataflows Gen1

You probably have many Dataflows Gen1 and you're wondering how you can try them out in Dataflows Gen2. We have a few options for you recreate your dataflows Gen1 as Dataflow Gen2. The following sections provide you with an overview of all the options.

### Copy paste your PowerQuery in the browser

If you have a dataflow in Power BI or Power Apps, you can copy your queries and paste them in the editor of your Dataflow Gen2. This functionality allows you to migrate your dataflow to Gen2 without having to rewrite your queries.

### Export your Dataflows Gen1 queries and Import them into a Dataflows Gen2 

You can now export queries in both Dataflows Gen1 and Gen2 authoring experience and save them to a PQT file you can then import into a Gen2 dataflows. For more information please refer to [Export and Import Power Query Templates](./dataflows-gen2-monitor.md).

## Next steps

- [Dataflows refresh history and monitoring](dataflows-gen2-monitor.md)
- [Dataflows save as draft](dataflows-gen2-save-draft.md)
