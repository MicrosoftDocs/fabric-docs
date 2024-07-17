---
title: Lakehouse tutorial - Ingest data into the lakehouse
description: In this tutorial, you ingest more dimensions and fact tables from the Wide World Importers (WWI) into the lakehouse.
ms.reviewer: sngun
ms.author: arali
author: ms-arali
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 07/16/2024
---

# Lakehouse tutorial: Ingest data into the lakehouse

In this tutorial, you ingest more dimensional and [fact tables](../data-warehouse/dimensional-modeling-fact-tables.md) from the Wide World Importers (WWI) into the lakehouse.

## Prerequisites

- If you don't have a lakehouse, you must [create a lakehouse](tutorial-build-lakehouse.md).

## Ingest data

In this section, you use the **Copy data activity** of the Data Factory pipeline to ingest sample data from an Azure storage account to the **Files** section of the lakehouse you created earlier.

1. Select **Workspaces** in the left navigation pane, and then select your new workspace from the **Workspaces** menu. The items view of your workspace appears.

1. From the **+New** menu item in the workspace ribbon, select **Data pipeline**.

   :::image type="content" source="media\tutorial-lakehouse-data-ingestion\create-data-pipeline.png" alt-text="Screenshot showing how to create a new data pipeline.":::

1. In the **New pipeline** dialog box, specify the name as **IngestDataFromSourceToLakehouse** and select **Create**. A new data factory pipeline is created and opened.

1. Next set up an HTTP connection to get sample world wide importers data into the Lakehouse. From the list of **New sources**, select **View more**. Search for **Http** and select it.

   :::image type="content" source="media\tutorial-lakehouse-data-ingestion\select-http-connection.png" alt-text="Screenshot showing where to select the HTTP source.":::

1. On the **Connect to data source** window, enter the details as shown in the following table and select **Next**.

   | Property | Value |
   |---|---|
   | URL | `https://assetsprod.microsoft.com/en-us/wwi-sample-dataset.zip` |
   |Connection | Create new connection |
   | Connection name | wwisampledata |
   | Data gateway | None|
   | Authentication kind | Anonymous |

 :::image type="content" source="media\tutorial-lakehouse-data-ingestion\configure-http-connection.png" alt-text="Screenshot showing the parameters to configure the Http connection.":::

1. In the next step, check the **Binary copy** field and set the **Compression type** to **ZipDeflate (.zip)** because the source is a .zip file. Leave other fields to their default values and select **Next**

 :::image type="content" source="media\tutorial-lakehouse-data-ingestion\select-compression-type.png" alt-text="Screenshot showing how to choose a compression type.":::

1. From the **Connect to data destination** window, set the **Root folder** to **Files** and select **Next**. The data is written to the *Files* section of the lakehouse.

 :::image type="content" source="media\tutorial-lakehouse-data-ingestion\configure-destination-connection.png" alt-text="Screenshot showing the destination connection settings of the lakehouse.":::

1. For destination, select the **File format** as **Binary**. Select **Next** and then **Save+Run**. You can also schedule pipelines to refresh data at defined intervals to meet your business requirements. For this tutorial, we run the pipeline only once. This action triggers data copy from the underlying data source to the specified lakehouse and it takes around 10-15 minutes to complete.

   :::image type="content" source="media\tutorial-lakehouse-data-ingestion\destination-file-format.png" alt-text="Screenshot showing the destination file format.":::

1. You can track the execution of the pipeline and its activity under the **Output** tab, which appears when you select anywhere on the canvas. Optionally, you can select the glasses icon, which appears when you hover over the name, to look at the details of the data transfer.

   :::image type="content" source="media\tutorial-lakehouse-data-ingestion\pipeline-status.png" alt-text="Screenshot showing the status of the copy pipeline activity.":::

1. After the pipeline runs successfully, navigate to your lakehouse (**wwilakehouse**) and launch the explorer to view the imported data.

   :::image type="content" source="media\tutorial-lakehouse-data-ingestion\item-view-select-lakehouse.png" alt-text="Screenshot showing how to navigate to the lakehouse.":::

1. Validate that a new folder **WideWorldImportersDW** appears in the **Explorer** view,  and data for all the tables is copied there.

   :::image type="content" source="media\tutorial-lakehouse-data-ingestion\validate-destination-files.png" alt-text="Screenshot showing the source data is copied into the Lakehouse explorer.":::

1. From the lakehouse explorer, rename the folder *WideWorldImportersDW* to *wwi-raw-data*.

To load incremental data into a lakehouse, see [Incrementally load data from a data warehouse to a lakehouse](../data-factory/tutorial-incremental-copy-data-warehouse-lakehouse.md).

## Next step

> [!div class="nextstepaction"]
> [Prepare and transform data](tutorial-lakehouse-data-preparation.md)
