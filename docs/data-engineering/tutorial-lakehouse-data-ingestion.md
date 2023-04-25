---
title: Lakehouse tutorial - data ingestion
description: In this module, you build on the work you completed in the previous module and ingest additional tables (dimensions and fact) of a dimensional model.
ms.reviewer: sngun
ms.author: arali
author: ms-arali
ms.topic: tutorial
ms.date: 4/28/2023
---

# Lakehouse tutorial: Data ingestion in Microsoft Fabric

In this module, you build on the work you completed in the previous module and ingest additional tables (dimensions and fact) of the dimensional model of Wide World Importers (WWI).

## Ingest data

In this section, you use the **Copy data activity** of a **Data Factory pipeline** to ingest sample data from a source (Azure storage account) to the **Files** section of the lakehouse you created earlier.

1. On the bottom left of the screen, select the workload switcher, and then select **Data Factory**.

   IMAGE

1. Select **Data pipeline** under **New** to create a new data pipeline.

   IMAGE

1. For the **New pipeline**, specify the name as **IngestDataFromSourceToLakehouse** and select **Create**. A new data factory pipeline is created and opens.

   IMAGE

1. On your newly created data factory pipeline, select **Add pipeline activity** to add an activity to the pipeline and select **Copy data**. This adds copy data activity to the pipeline canvas.

   IMAGE

1. Select the newly added copy data activity to the canvas, which shows activity properties at the bottom. Under **General** tab, specify the name for the copy data activity **Data Copy to Lakehouse**.

   IMAGE

1. Under **Source** tab of the selected copy data activity, select **External** as **Data store type** and then select **+ New** to create a new connection to data source.

   IMAGE

1. For this tutorial, all the sample data is available in a public container of Azure blob storage. You connect to this container to copy data from it. On the **New connection** wizard, select **Azure Blob Storage** and then select **Continue**.

   IMAGE

1. On the next screen of the **New connection** wizard, specify the following details and select **Create** to create the connection to the data source.

   | Property | Value |
   |---|---|
   | Account name or URI | `https://azuresynapsestorage.blob.core.windows.net/sampledata` |
   |Connection | Create new connection |
   | Connection name | wwisampledata |
   | Authentication kind | Anonymous |

   IMAGE

1. Once the new connection is created, you return to **Source tab of the copy data activity, and the newly created connection is selected by default. Specify the following properties before moving to the destination settings.

   | Property | Value |
   |---|---|
   | Data store type | External |
   | Connection | wwisampledata |
   | File path type | File path |
   | File path | Container name (first text box): sampledata<br>Directory name (second text box): WideWorldImportersDW/parquet |
   | Recursively | Checked |
   | File Format | Binary |

   IMAGE

1. Under **Destination** tab of the selected copy data activity, specify the following properties:

   | Property | Value |
   |---|---|
   | Data store type | Workspace |
   | Workspace data store type | Lakehouse |
   | Lakehouse | wwilakehouse |
   | Root Folder | Files |
   | File path | Directory name (first text box): wwi-raw-data |
   | File Format | Binary |

   IMAGE

1. At this time, you have completed configuring copy data activity. Select the **Save** button under **Home** to save all these details and select **Run** to kick off execution of this pipeline and its activity. You can also schedule pipelines to refresh data at defined intervals to meet your business requirements, however for this module, we'll run the pipeline once by clicking on **Run** button. This triggers data copy from the underlying data source to the specified lakehouse and might take up to a minute to complete. You can monitor the execution of the pipeline and its activity under **Output** tab, which appears when you click anywhere on the canvas. Optionally, you can select the glasses icon to look at the details of data transfer.

   IMAGE

1. Once the data copy is completed, you can go to the items view of the workspace and select **wwilakehouse** to launch the **Lakehouse explorer** for this selected lakehouse.

   IMAGE

1. In the **Lakehouse explorer** view, a new folder **wwi-raw-data** has been created and data for all the tables have been copied here.

   IMAGE

## Next steps

- Lakehouse tutorial: Data preparation in Microsoft Fabric
