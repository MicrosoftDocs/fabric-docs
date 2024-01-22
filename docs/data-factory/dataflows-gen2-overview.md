---
title: Differences between Dataflow Gen1 and Dataflow Gen2
description: Compare differences between Dataflow Gen1 and Gen2 in Data Factory for Microsoft Fabric.
author: luitwieler
ms.topic: overview
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
ms.author: jeluitwi
ms.search.form: DataflowGen2 Overview
---

# Getting from Dataflow Generation 1 to Dataflow Generation 2

Dataflow Gen2 is the new generation of dataflows. The new generation of dataflows resides alongside the Power BI Dataflow (Gen1) and brings new features and improved experiences. The following section provides a comparison between Dataflow Gen1 and Dataflow Gen2.

## Feature overview

| Feature |   Dataflow Gen2 |  Dataflow Gen1 |
|--------|---|---|
| Author dataflows with Power Query  | ✓ | ✓ |
| Shorter authoring flow | ✓ |  |
| Auto-Save and background publishing | ✓ |  |
| Data destinations  | ✓  |   |
| Improved monitoring and refresh history       | ✓ |   |
| Integration with data pipelines     | ✓  |   |
| High-scale compute     | ✓ |   |
| Get Data via Dataflows connector | ✓ | ✓ |
| Direct Query via Dataflows connector |  | ✓ |
| Incremental refresh       |   | ✓ |
| AI Insights support |  | ✓ |

### Shorter authoring experience

Working with Dataflow Gen2 feels like coming home. We kept the full Power Query experience you're used to in Power BI dataflows. When you enter the experience, you're guided step-by-step for getting the data into your dataflow. We also shorten the authoring experience to reduce the number of steps required to create dataflows, and added a few new features to make your experience even better.

:::image type="content" source="./media/dataflows-gen2-overview/authoring-experience.png" alt-text="Screenshot of the overall authoring experience in dataflows." lightbox="./media/dataflows-gen2-overview/authoring-experience.png":::

### New dataflow save experience

With Dataflow Gen2, we changed how saving a dataflow works. Any changes made to a dataflow are autosaved to the cloud. So you can exit the authoring experience at any point and continue from where you left off at a later time. Once you're done authoring your dataflow, you publish your changes and those changes are used when the dataflow refreshes. In addition, publishing the dataflow saves your changes and runs validations that must be performed in the background.  This feature lets you save your dataflow without having to wait for validation to finish.

To learn more about the new save experience, go to [Save a draft of your dataflow](dataflows-gen2-save-draft.md).

### Data destinations

Similar to Dataflow Gen1, Dataflow Gen2 allows you to transform your data into dataflow's internal/staging storage where it can be accessed using the Dataflow connector. Dataflow Gen2 also allows you to specify a data destination for your data. Using this feature, you can now separate your ETL logic and destination storage. This feature benefits you in many ways. For example, you can now use a dataflow to load data into a lakehouse and then use a notebook to analyze the data. Or you can use a dataflow to load data into an Azure SQL database and then use a data pipeline to load the data into a data warehouse.

In Dataflow Gen2, we added support for the following destinations and many more are coming soon:

- Fabric Lakehouse
- Azure Data Explorer (Kusto)
- Azure Synapse Analytics (SQL DW)
- Azure SQL Database

>[!NOTE]
>To load your data to the Fabric Warehouse, you can use the Azure Synapse Analytics (SQL DW) connector by retrieving the SQL connection string. More information: [Connectivity to data warehousing in Microsoft Fabric](../data-warehouse/connectivity.md)

:::image type="content" source="./media/dataflows-gen2-overview/output-destinations-overview.png" alt-text="Screenshot with the supported data destinations displayed.":::

### New refresh history and monitoring

With Dataflow Gen2, we introduce a new way for you to monitor your dataflow refreshes. We integrate support for [Monitoring Hub](monitoring-hub-pipeline-runs.md) and give our [Refresh History](dataflows-gen2-monitor.md#refresh-history) experience a major upgrade.

:::image type="content" source="./media/dataflows-gen2-monitor/refresh-details.png" alt-text="Screenshot showing the details of a refresh status.":::

### Integration with data pipelines

Data pipelines allow you to group activities that together perform a task. An activity is a unit of work that can be executed. For example, an activity can copy data from one location to another, run a SQL query, execute a stored procedure, or run a Python notebook.

A pipeline can contain one or more activities that are connected by dependencies. For example, you can use a pipeline to ingest and clean data from an Azure blob, and then kick off a Dataflow Gen2 to analyze the log data. You can also use a pipeline to copy data from an Azure blob to an Azure SQL database, and then run a stored procedure on the database.

:::image type="content" source="./media/dataflows-gen2-overview/data-pipelines-integration.png" alt-text="Screenshot showing the integration with data pipelines.":::

### Save as draft

With Dataflow Gen2, we introduce a worry free experience by removing the need for publishing to save your changes. With save as draft functionality, we store a draft version of your dataflow every time you make a change. Did you lose internet connectivity? Did you accidentally close your browser? No worries; we got your back. Once you return to your dataflow, your recent changes are still there and you can continue where you left off. This is a seamless experience and doesn't require any input from you. This allows you to work on your dataflow without having to worry about losing your changes or having to fix all the query errors before you can save your changes. To learn more about this feature, go to [Save a draft of your dataflow](./dataflows-gen2-save-draft.md).

### High scale compute

Similar to Dataflow Gen1, Dataflow Gen2 also features an enhanced compute engine to improve performance of both transformations of referenced queries and get data scenarios. To achieve this, Dataflow Gen2 creates both Lakehouse and Warehouse items in your workspace, and uses them to store and access data to improve performance for all your dataflows.

## Licensing Dataflow Gen1 vs Gen2

Dataflow Gen2 is the new generation of dataflows that resides alongside the Power BI dataflow (Gen1) and brings new features and improved experiences. To understand better how licening works for dataflows you can read the following article: [Microsoft Fabric concepts and licenses](/fabric/enterprise/licenses)

## Try out Dataflow Gen2 by reusing your queries from Dataflow Gen1

You probably have many Dataflow Gen1 queries and you're wondering how you can try them out in Dataflow Gen2. We have a few options for you to recreate your Gen1 dataflows as Dataflow Gen2.

- Export your Dataflow Gen1 queries and import them into Dataflow Gen2

  You can now export queries in both the Dataflow Gen1 and Gen2 authoring experiences and save them to a PQT file you can then import into Dataflow Gen2. For more information, go to [Use the export template feature](move-dataflow-gen1-to-dataflow-gen2.md#use-the-export-template-feature).

- Copy and paste in Power Query

  If you have a dataflow in Power BI or Power Apps, you can copy your queries and paste them in the editor of your Dataflow Gen2. This functionality allows you to migrate your dataflow to Gen2 without having to rewrite your queries. For more information, go to [Copy and paste existing Dataflow Gen1 queries](move-dataflow-gen1-to-dataflow-gen2.md#copy-and-paste-existing-dataflow-gen1-queries).

## Related content

- [Dataflows refresh history and monitoring](dataflows-gen2-monitor.md)
- [Dataflows save as draft](dataflows-gen2-save-draft.md)
- [Move queries from Dataflow Gen1 to Dataflow Gen2](move-dataflow-gen1-to-dataflow-gen2.md)
