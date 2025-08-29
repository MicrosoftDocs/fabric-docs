---
title: Lakehouse tutorial - Ingest data into the lakehouse
description: In this tutorial, you ingest more dimensions and fact tables from the Wide World Importers (WWI) into the lakehouse.
ms.reviewer: sngun
ms.author: arali
author: ms-arali
ms.topic: tutorial
ms.custom: sfi-image-nochange
ms.date: 08/29/2025
---

# Lakehouse tutorial: Ingest data into the lakehouse

In this tutorial, you ingest more dimensional and [fact tables](../data-warehouse/dimensional-modeling-fact-tables.md) from the Wide World Importers (WWI) into the lakehouse.

## Prerequisites

- If you don't have a lakehouse, you must [create a lakehouse](tutorial-build-lakehouse.md).

## Ingest data

In this section, you use the **Copy data activity** of the Data Factory pipeline to ingest sample data from an Azure storage account to the **Files** section of the lakehouse you created earlier.

1. Select **Workspaces** in the left navigation pane, and then select your new workspace from the **Workspaces** menu. The items view of your workspace appears.

1. From the **New item** option in the workspace ribbon, select **Data pipeline**.

1. In the **New pipeline** dialog box, specify the name as **IngestDataFromSourceToLakehouse** and select **Create**.

1. From your newly created pipeline, select **Pipeline activity** to add an activity to the pipeline and select **Copy data**. This action adds copy data activity to the pipeline canvas.

   :::image type="content" source="media\tutorial-lakehouse-data-ingestion\pipeline-copy-data.png" alt-text="Screenshot showing where to select Pipeline activity and Copy data." lightbox="media\tutorial-lakehouse-data-ingestion\pipeline-copy-data.png":::

1. Select the newly added copy data activity from the canvas. Activity properties appear in a pane below the canvas (you might need to expand the pane upwards by dragging the top edge). From the **General** tab in the properties pane, type **Data Copy to Lakehouse** in the **Name** field. Leave remaining properties to their default values.

   :::image type="content" source="media\tutorial-lakehouse-data-ingestion\data-copy-to-lakehouse.png" alt-text="Screenshot showing where to add the copy activity name on the General tab." lightbox="media\tutorial-lakehouse-data-ingestion\data-copy-to-lakehouse.png":::

1. From the **Source** tab of the selected copy data activity, open the **Connection** field and select **Browse all**. Choose data source window pops up, search and select **Azure blobs**. For this tutorial, all the sample data is available in a public container of Azure blob storage. You connect to this container to copy data from it.

1. Enter the following details in the **Connection settings** window,  and select **Connect** to create the connection to the data source.

   | Property | Value |
   |--|--|
   | Account name or URL | `https://fabrictutorialdata.blob.core.windows.net/sampledata/` |
   | Connection | Create new connection |
   | Connection name | wwisampledata |
   | Authentication kind | Anonymous |

   :::image type="content" source="media\tutorial-lakehouse-data-ingestion\data-store-source-blob.png" alt-text="Screenshot showing where to select blob storage connection" lightbox="media\tutorial-lakehouse-data-ingestion\data-store-source-blob.png":::

1. Once the new connection is created, return to the **Source** tab of the copy data activity, and the newly created connection is selected by default. Specify the following properties before moving to the destination settings.

   | Property | Value |
   |--|--|
   | Connection | wwisampledata |
   | File path type | File path |
   | File path | Container name (first text box): sampledata<br>Directory name (second text box): WideWorldImportersDW/parquet |
   | Recursively | Checked |
   | File format | Binary |

   :::image type="content" source="media\tutorial-lakehouse-data-ingestion\blob-storage-connection-settings.png" alt-text="Screenshot showing the Blob Storage connection settings." lightbox="media\tutorial-lakehouse-data-ingestion\blob-storage-connection-settings.png":::

1. From the **Destination** tab of the selected copy data activity, specify the following properties:

   | Property | Value |
   |--|--|
   | Connection | wwilakehouse (choose your lakehouse if you named it differently) |
   | Root folder | Files |
   | File path | Directory name (first text box): wwi-raw-data |
   | File format | Binary |

   :::image type="content" source="media\tutorial-lakehouse-data-ingestion\destination-settings.png" alt-text="Screenshot of the destination tab, showing where to enter specific details." lightbox="media\tutorial-lakehouse-data-ingestion\destination-settings.png":::

1. You have configured the copy data activity. Select the **Save** icon on the top ribbon (below Home) to save your changes, and select **Run** to execute your pipeline and its activity. You can also schedule pipelines to refresh data at defined intervals to meet your business requirements. For this tutorial, we run the pipeline only once by selecting **Run**.

1. This action triggers data copy from the underlying data source to the specified lakehouse and might take up to a minute to complete. You can monitor the execution of the pipeline and its activity under the **Output** tab. The activity status changes from **Queued** > **In progress** > **Succeeded**.

   :::image type="content" source="media\tutorial-lakehouse-data-ingestion\save-run-output-tab.png" alt-text="Screenshot showing where to select Save and Run, and where to find the run details and glasses icon on the Output tab.":::

1. After the copy activity is successful, open your lakehouse (wwilakehouse) to view the data. Refresh the **Files** section to see the ingested data. A new folder **wwi-raw-data** appears in the files section, and data from Azure Blob tables is copied there.

   :::image type="content" source="media\tutorial-lakehouse-data-ingestion\validate-data-lakehouse.png" alt-text="Screenshot showing blob data copied into destination lakehouse.":::


<!-- Don't delete this section, it shows HTTP connection to load data, used as an alternative incase the blob link is not accessible.

1. Next, set up an HTTP connection to import the sample World Wide Importers data into the Lakehouse. From the list of **New sources**, select **View more**, search for **Http** and select it.

   :::image type="content" source="media\tutorial-lakehouse-data-ingestion\select-http-connection.png" alt-text="Screenshot showing where to select the HTTP source.":::

1. In the **Connect to data source** window, enter the details from the table below and select **Next**.

   | Property | Value |
   |---|---|
   | URL | `https://assetsprod.microsoft.com/en-us/wwi-sample-dataset.zip` |
   |Connection | Create a new connection |
   | Connection name | wwisampledata |
   | Data gateway | None|
   | Authentication kind | Anonymous |

   :::image type="content" source="media\tutorial-lakehouse-data-ingestion\configure-http-connection.png" alt-text="Screenshot showing the parameters to configure the Http connection.":::

1. In the next step, enable the **Binary copy** and choose **ZipDeflate (.zip)** as the **Compression type** since the source is a .zip file. Keep the other fields at their default values and select **Next**.

    :::image type="content" source="media\tutorial-lakehouse-data-ingestion\select-compression-type.png" alt-text="Screenshot showing how to choose a compression type.":::

1. In the **Connect to data destination** window, specify the **Root folder** as **Files** and select **Next**. This will write the data to the *Files* section of the lakehouse.

   :::image type="content" source="media\tutorial-lakehouse-data-ingestion\configure-destination-connection.png" alt-text="Screenshot showing the destination connection settings of the lakehouse.":::

1. Select **Next**, the destination file format is automatically set to **Binary**. Next select **Save+Run**. You can schedule pipelines to refresh data periodically. In this tutorial, we only run the pipeline once. The data copy process takes approximately 10-15 minutes to complete.

   :::image type="content" source="media\tutorial-lakehouse-data-ingestion\copy-activity-summary.png" alt-text="Screenshot showing the copy activity summary.":::

1. You can monitor the pipeline execution and activity in the **Output** tab. You can also view detailed data transfer information by selecting the glasses icon next to the pipeline name, which appears when you hover over the name.

   :::image type="content" source="media\tutorial-lakehouse-data-ingestion\pipeline-status.png" alt-text="Screenshot showing the status of the copy pipeline activity.":::

1. After the successful execution of the pipeline, go to your lakehouse (**wwilakehouse**) and open the explorer to see the imported data.

   :::image type="content" source="media\tutorial-lakehouse-data-ingestion\item-view-select-lakehouse.png" alt-text="Screenshot showing how to navigate to the lakehouse." lightbox="media\tutorial-lakehouse-data-ingestion\item-view-select-lakehouse.png":::

1. Verify that the folder **WideWorldImportersDW** is present in the **Explorer** view and contains data for all tables.

   :::image type="content" source="media\tutorial-lakehouse-data-ingestion\validate-destination-files.png" alt-text="Screenshot showing the source data is copied into the Lakehouse explorer.":::

1. The data is created under the **Files** section of the lakehouse explorer. A new folder with GUID contains all the needed data. Rename the GUID to **wwi-raw-data**

To load incremental data into a lakehouse, see [Incrementally load data from a data warehouse to a lakehouse](../data-factory/tutorial-incremental-copy-data-warehouse-lakehouse.md).

-->

## Next step

> [!div class="nextstepaction"]
> [Prepare and transform data](tutorial-lakehouse-data-preparation.md)
