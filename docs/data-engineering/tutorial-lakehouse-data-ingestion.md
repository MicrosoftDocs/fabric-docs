---
title: Lakehouse tutorial - Ingest data into the lakehouse
description: In this tutorial, you ingest more dimensions and fact tables from the Wide World Importers (WWI) into the lakehouse.
ms.reviewer: arali
ms.author: eur
author: eric-urban
ms.topic: tutorial
ms.custom: sfi-image-nochange
ms.date: 02/14/2026
ai-usage: ai-assisted
---

# Lakehouse tutorial: Ingest data into the lakehouse

In this tutorial, you ingest more dimensional and [fact tables](../data-warehouse/dimensional-modeling-fact-tables.md) from the Wide World Importers (WWI) into the lakehouse. Pipelines enable you to ingest data at scale with the option to schedule data workflows.

## Prerequisites

- If you don't have a lakehouse, you must [create a lakehouse](tutorial-build-lakehouse.md).

## Ingest data

In this section, you use the **Copy data activity** of the Data Factory pipeline to ingest sample data from an Azure storage account to the **Files** section of the [lakehouse you created in the previous tutorial](tutorial-build-lakehouse.md).

1. In the workspace you created in the previous tutorial, select **New item**.

1. Search for **Pipeline** in the search bar and select the **Pipeline** tile.

1. In the **New pipeline** dialog box, specify the name as **IngestDataFromSourceToLakehouse** and select **Create**.

1. From your new pipeline's **Home** tab, select **Pipeline activity** > **Copy data**. 

   :::image type="content" source="media\tutorial-lakehouse-data-ingestion\pipeline-copy-data.png" alt-text="Screenshot showing where to select Pipeline activity and Copy data." lightbox="media\tutorial-lakehouse-data-ingestion\pipeline-copy-data.png":::

1. Select the new **Copy data** activity from the canvas. Activity properties appear in a pane below the canvas, organized across tabs including **General**, **Source**, **Destination**, **Mapping**, and **Settings**. You might need to expand the pane upwards by dragging the top edge.

1. On the **General** tab, enter **Data Copy to Lakehouse** in the **Name** field. Leave the other fields with their default values.

   :::image type="content" source="media\tutorial-lakehouse-data-ingestion\data-copy-to-lakehouse.png" alt-text="Screenshot showing where to add the copy activity name on the General tab." lightbox="media\tutorial-lakehouse-data-ingestion\data-copy-to-lakehouse.png":::

1. On the **Source** tab, select the **Connection** dropdown and then select **Browse all**.

1. In the **Choose a data source to get started** page, search for and select **Azure blobs**. 

1. Enter the following details in the **Connect data source** page. Then select **Connect** to create the connection to the data source. For this tutorial, all the sample data is available in a public container of Azure blob storage. You connect to this container to copy data from it.

   | Property | Value |
   |--|--|
   | Account name or URL | `https://fabrictutorialdata.blob.core.windows.net/sampledata/` |
   | Connection | Create new connection |
   | Connection name | wwisampledata |
   | Authentication kind | Anonymous |

   :::image type="content" source="media\tutorial-lakehouse-data-ingestion\data-store-source-blob.png" alt-text="Screenshot showing where to select blob storage connection." lightbox="media\tutorial-lakehouse-data-ingestion\data-store-source-blob.png":::

1. On the **Source** tab, the newly created connection is selected by default. Specify the following properties before moving to the destination settings.

   | Property | Value |
   |--|--|
   | Connection | wwisampledata |
   | File path type | File path |
   | File path | Container name (first text box): sampledata<br>Directory name (second text box): WideWorldImportersDW/parquet |
   | Recursively | Checked |
   | File format | Binary |

   :::image type="content" source="media\tutorial-lakehouse-data-ingestion\blob-storage-connection-settings.png" alt-text="Screenshot showing the Blob Storage connection settings." lightbox="media\tutorial-lakehouse-data-ingestion\blob-storage-connection-settings.png":::

1. On the **Destination** tab, specify the following properties:

   | Property | Value |
   |--|--|
   | Connection | wwilakehouse (choose your lakehouse if you named it differently) |
   | Root folder | Files |
   | File path | Directory name (first text box): wwi-raw-data |
   | File format | Binary |

   :::image type="content" source="media\tutorial-lakehouse-data-ingestion\destination-settings.png" alt-text="Screenshot of the destination tab, showing where to enter specific details." lightbox="media\tutorial-lakehouse-data-ingestion\destination-settings.png":::

1. You have configured the copy data activity. Select the **Save** icon on the top ribbon (below Home) to save your changes, and select **Run** to execute your pipeline and its activity. You can also schedule pipelines to refresh data at defined intervals to meet your business requirements. For this tutorial, we run the pipeline only once by selecting **Run**.

1. This action triggers data copy from the underlying data source to the specified lakehouse and might take up to a minute to complete. You can monitor the execution of the pipeline and its activity under the **Output** tab. The activity status changes from **Queued** > **In progress** > **Succeeded**.

   :::image type="content" source="media\tutorial-lakehouse-data-ingestion\save-run-output-tab.png" alt-text="Screenshot showing where to select Save and Run the pipeline." lightbox="media\tutorial-lakehouse-data-ingestion\save-run-output-tab.png":::

   > [!TIP]
   > Select **View Run details** to see more information about the run.

1. After the copy activity is successful, open your lakehouse (wwilakehouse) to view the data. Refresh the **Files** section to see the ingested data. A new folder **wwi-raw-data** appears in the files section, and data from Azure Blob tables is copied there.

   :::image type="content" source="media\tutorial-lakehouse-data-ingestion\validate-data-lakehouse.png" alt-text="Screenshot showing blob data copied into destination lakehouse." lightbox="media\tutorial-lakehouse-data-ingestion\validate-data-lakehouse.png":::


To load incremental data into a lakehouse, see [Incrementally load data from a data warehouse to a lakehouse](../data-factory/tutorial-incremental-copy-data-warehouse-lakehouse.md).

<!-- 
## Alternative data ingestion using HTTP connection

This section shows how to use an HTTP connection to load data, as an alternative if the Azure Blob storage link is not accessible.

NOTE: This section is commented out because the HTTP URL (https://assetsprod.microsoft.com/en-us/wwi-sample-dataset.zip) is currently broken and returns an HTML page instead of the zip file. Do not uncomment until a working URL is available.

This approach requires two copy activities because HTTP sources don't support decompressing zip files directly during copy. HTTP only allows sequential reading (streaming bytes from start to finish), but decompressing a zip file requires random access to jump around within the file. The first activity downloads the zip file to the lakehouse, and the second activity extracts its contents.

### Create the first copy activity (download the zip file)

1. On the **Source** tab, select the **Connection** dropdown and then select **Browse all**.

1. In the **Choose a data source to get started** page, search for and select **HTTP**.

1. In the **Connect data source** page, enter the following details and select **Connect**.

   | Property | Value |
   |---|---|
   | URL | `https://assetsprod.microsoft.com/en-us/wwi-sample-dataset.zip` |
   | Connection | Create a new connection |
   | Connection name | wwisaborce |
   | Data gateway | None |
   | Authentication kind | Anonymous |

1. On the **Source** tab, leave the **File format** set to **Binary**. Don't configure compression settings for this activity.

1. On the **Destination** tab, select the **Connection** dropdown and then select your lakehouse. Select the **Files** radio button for the **Root folder**. In the **File path** field, enter **wwi-staging** as the directory name and **wwi-sample-dataset.zip** as the file name. Leave the file format set to **Binary**.

1. On the **General** tab, rename the activity to **Download zip file**.

### Create the second copy activity (extract the zip file)

1. From the **Home** tab, select **Pipeline activity** > **Copy data** to add a second copy activity to the canvas.

1. Select the new copy activity. On the **General** tab, rename the activity to **Extract zip file**.

1. On the **Source** tab, select the **Connection** dropdown and then select your lakehouse. Select the **Files** radio button for the **Root folder**. In the **File path** field, enter **wwi-staging** as the directory name and **wwi-sample-dataset.zip** as the file name.

1. On the **Source** tab, select **Binary** from the **File format** dropdown, then select the **Settings** button next to the dropdown.

1. In the **File format settings** dialog, select the **Compression type** dropdown and choose **ZipDeflate (.zip)**. Then select **OK**.

1. On the **Destination** tab, select the **Connection** dropdown and then select your lakehouse. Select the **Files** radio button for the **Root folder**. In the **File path** field, enter **wwi-raw-data** as the directory name. Leave the file format set to **Binary**.

### Connect and run the activities

1. On the canvas, drag the **On success** connector (green checkmark) from the first activity (**Download zip file**) to the second activity (**Extract zip file**). This ensures the second activity runs only after the first completes successfully.

1. Select **Run** from the **Home** tab to run the pipeline. If you have unsaved changes, you're prompted to save and run.

   > [!TIP]
   > Select **View Run details** to see more information about the run.

1. You can monitor the pipeline execution and activity in the **Output** tab. The data copy process takes approximately 10-15 minutes to complete.


1. After the successful execution of the pipeline, go to your lakehouse and open the explorer to see the imported data. Verify that the folder **wwi-raw-data** is present in the **Files** section and contains data for all tables.
-->


## Next step

> [!div class="nextstepaction"]
> [Prepare and transform data](tutorial-lakehouse-data-preparation.md)
