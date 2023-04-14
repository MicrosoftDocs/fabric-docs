---
title: Navigate the Fabric Lakehouse explorer
description: The lakehouse explorer consists of the object explorer, main view, and ribbon. Use it to load data into your lakehouse, and then browse and preview your data.
ms.reviewer: snehagunda
ms.author: avinandac
author: avinandaMS
ms.topic: conceptual
ms.date: 02/24/2023
ms.search.form: Lakehouse Explorer
---

# Navigate the Fabric Lakehouse explorer

[!INCLUDE [preview-note](../includes/preview-note.md)]

The Lakehouse explorer page is the main Lakehouse interaction page; you can use it to load data into your Lakehouse, browse through the data, preview them, and many other things. The page is divided into three sections: the Lakehouse explorer, the main view, and the ribbon.

   :::image type="content" source="media\lakehouse-overview\lakehouse-overview.gif" alt-text="Lakehouse experience overview gif" lightbox="media\lakehouse-overview\lakehouse-overview.gif":::


## Lakehouse explorer

The Lakehouse explorer provides a unified graphical representation of the whole Lakehouse for users to navigate, access, and update their data.

-The **Table Section** is a UI representation of the managed area of your lake which is typically organized and governed to facilitate efficient data processing and analysis. All tables, whether automatically or explicitly created and registered in SyMS, are displayed here. You can preview table data, view the table schema, access underlying files of selected table, and perform various other actions.

-The **Unidentified Area** is a part of the managed area of your lake which displays any folders or files in the managed area with no associated tables in SyMS. For example, if a user were to drop an unsupported folder/file in the managed area, eg: a directory full of pictures or audio, this would not get picked up by our auto-detection process and hence not have an associated table. In this case, this folder would be found in this unidentified area. The main purpose of this new section is to promote either deleting these files from the managed area or moving them to the file section for further processing.

-The **File Section** is the UI representation of the unidentified area of your lake, it can be seen as a "landing zone" for raw data that is ingested from various sources and requires additional processing before it can be used for analysis. You can navigate through directories, preview files, load a file into a table and perform various other actions.


## Main view area

The main view area of the Lakehouse page is the space where most of the data interaction occurs. The view changes depending on what you select. Since the object explorer only displays a folder level hierarchy of the lake, the main view area is what you use to navigate your files, preview files, and various other tasks.


## Ribbon

The Lakehouse ribbon is a quick go-to action bar for you to refresh the Lakehouse, update settings, load data or create a new dataset.


### Different ways to load data into a Lakehouse

There are several ways to load data into your Lakehouse from the explorer page:

1. **Local file/folder upload:** Uploading data directly from your local machine to the File section of your Lakehouse. 

1. **Notebook code:** Using available spark libraries to connect to a data source directly and then loading data to dataframe and saving it in your Lakehouse.

1. **Copy tool in pipelines:** Connect to different data sources and land the data either in original format or convert it to a delta table.

1. **Dataflows Gen 2:** Creating a dataflow to get data in, then transform and publish it into your Lakehouse.

1. **Shortcuts:** Creating shortcuts to connect to existing data into your Lakehouse without having to directly copy it.


## Next steps

- Learn more about the different use cases to understand the best way to load your data:, see [Get data experience for Lakehouse](load-data-lakehouse.md).

- [Explore the data in your Lakehouse with a notebook](lakehouse-notebook-explore.md)

- [How to use a notebook to load data into your Lakehouse](lakehouse-notebook-load-data.md).

- To get started with Pipelines copy activity, see [How to copy data using copy activity](..\data-factory\copy-data-activity.md).

- [Create your first dataflow to get and transform data](../data-factory/create-first-dataflow-gen2.md).

- [Create a OneLake shortcut](../real-time-analytics/onelake-shortcut.md).

