---
title: Ingest Data into Your Warehouse Using Pipelines
description: Follow steps to ingest data into a Warehouse with a copy job in Data Factory pipelines in Microsoft Fabric.
ms.reviewer: procha
ms.date: 12/16/2025
ms.topic: how-to
ms.search.form: Ingesting data # This article's title should not change. If so, contact engineering.
ms.custom: sfi-image-nochange
---
# Ingest data into your warehouse by using pipelines

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

In this article, you learn how to use the Copy job activity in Data Factory pipelines.

- Pipelines offer an alternative to using the COPY command through a graphical user interface. 
- A pipeline is a logical grouping of activities that together perform a data ingestion task. 
- Pipelines allow you to manage all extract, transform, and load (ETL) activities in one place, instead of managing each one individually.

> [!NOTE]
> Some features from Azure Data Factory aren't available in [!INCLUDE [product-name](../includes/product-name.md)]. However, the concepts are interchangeable. You can learn more about Azure Data Factory and pipelines in [Pipelines and activities in Azure Data Factory and Azure Synapse Analytics](/azure/data-factory/concepts-pipelines-activities). For a quickstart, see [Quickstart: Create your first pipeline to copy data](../data-factory/create-first-pipeline-with-sample-data.md).

<a id="create-a-data-pipeline"></a>
<a id="create-a-pipeline"></a>

## Create a copy job

To create a new copy job, follow these steps.

1. In your workspace home screen, select the **+ New item** button. In the **Get data** section, select **Copy job**.
1. In the **New copy job** dialog, enter a name for your new pipeline and select **Create**. The new **Copy job** window opens.
1. Choose your data source from the **OneLake catalog**.
1. In the **Choose data** page, preview the selected dataset. After you review the data, select **Next**.
1. On the **Choose data destination** page, select your desired warehouse in the **OneLake catalog**.
1. The **Choose copy job mode** page allows you to configure how you want the data to be copied: a full copy, or incremental copies that perform only subsequent copies when the source data changes. 
   
   For now, select **Full copy**. For other data sources and scenarios, you can incrementally load data as the data source is updated.

1. You can adjust the **Destination** tables with the name of your desired destination schema and table name. Provide schema and table names that match your desired naming convention. When you're done making changes, select **Next**.

   :::image type="content" source="media/ingest-data-pipelines/copy-job-map-to-destination.png" alt-text="Screenshot of the Map to destination page of the Copy job window. The destination is dbo.NYC_taxi." lightbox="media/ingest-data-pipelines/copy-job-map-to-destination.png":::

1. Optionally, to modify the column mappings, select **Edit column mapping**. You can map source column names to new names, data types, or skip source column columns.

    :::image type="content" source="media/ingest-data-pipelines/copy-job-column-mapping.png" alt-text="Screenshot showing the options to load data to an existing table or to create a new one." lightbox="media/ingest-data-pipelines/copy-job-column-mapping.png":::

    When you're done reviewing column mappings, select **Next**.

1. The **Review + save** page is a summary of the new **Copy job**. 

   Review the summary and options, then select **Save + Run**.

1. You're directed to the pipeline canvas area, where a new Copy job activity with its **Source** and **Destination** is already configured for you. If you selected **Start data transfer immediately** on the previous page, the copy job starts as soon as it's ready to run.

1. You can monitor the status of your pipeline in the **Results** pane.

1. After a few seconds, your pipeline finishes successfully. When you navigate back to your warehouse, you can select your table to preview the data and confirm that the copy operation concluded.

## Next step

> [!div class="nextstepaction"]
> [Monitor a Copy job in Data Factory for Microsoft Fabric](../data-factory/monitor-copy-job.md)

## Data ingestion options

Other ways to ingest data into your warehouse include:

- [Ingest data using the COPY statement](ingest-data-copy.md)
- [Ingest data using Transact-SQL](ingest-data-tsql.md)
- [Ingest data using a dataflow](../data-factory/create-first-dataflow-gen2.md)

## Related content

- [Ingesting data into the Warehouse](ingest-data.md)
- [Copy job activity in Data Factory pipelines](../data-factory/copy-job-activity.md)
