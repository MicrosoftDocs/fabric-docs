---
title: Navigate the Fabric Lakehouse explorer
description: The lakehouse explorer consists of the object explorer, main view, and ribbon. Use it to load data into your lakehouse, and then browse and preview your data.
ms.reviewer: snehagunda
ms.author: avinandac
author: avinandaMS
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
ms.search.form: Lakehouse Explorer
---

# Navigate the Fabric Lakehouse explorer

The Lakehouse Explorer page serves as the central hub for all your interactions within the Lakehouse environment. It's built into the Fabric portal. It's your gateway to seamlessly load data into your Lakehouse, navigate through your data, preview content, and perform various data-related tasks. This page is divided into three main sections: the Lakehouse Explorer, the Main View, and the Ribbon.

:::image type="content" source="media\lakehouse-overview\lakehouse-overview.gif" alt-text="Gif of overall lakehouse experience." lightbox="media\lakehouse-overview\lakehouse-overview.gif":::

## Lakehouse explorer

The Lakehouse Explorer offers a unified, graphical representation of your entire Lakehouse, providing users with an intuitive interface for data navigation, access, and management.

- The **Table Section** is a user-friendly representation of the managed area within your Lakehouse. This area is typically organized and governed to facilitate efficient data processing and analysis. Here, you find all your tables, whether they were automatically generated or explicitly created and registered in the metastore. You can select a table to preview, inspect the table schema, access underlying files, and execute various other actions related to your data.

- The **Unidentified Area** is a unique space within the managed area of your Lakehouse. It displays any folders or files present in the managed area that lack associated tables in SyMS. For instance, if a user uploads unsupported files like images or audio files to the managed area, they won't be automatically detected and linked to tables. Instead, they appear in this unidentified area. The primary purpose of this section is to prompt users to either remove these files from the managed area or transfer them to the File Section for further processing.

- The **File Section** represents the unmanaged area of your Lakehouse and can be considered a "landing zone" for raw data ingested from various sources. Before this data can be used for analysis, it often requires additional processing. In this section, you can navigate through directories, select a directory to preview, load a folder into a table, and perform various other actions. It's worth noting that **the File Section displays folder-level objects exclusively**. To view file-level objects, you need to utilize the Main View area.

## Main view area

The main view area of the Lakehouse page is the space where most of the data interaction occurs. The view changes depending on what you select. Since the object explorer only displays a folder level hierarchy of the lake, the main view area is what you use to navigate your files, preview files & tables, and various other tasks.

### Table preview

Our table preview datagrid is equipped it with a suite of powerful features that elevate your data interactions to make working with your data even more seamless. Here's are some key features:

- Sort columns in ascending or descending order with a simple click. This feature provides you with full control over your data's organization while working with large semantic models or when you need to quickly identify trends.

- Filter data by substring or by selecting from a list of available values in your table.

- Resize columns to tailor your data view to suit your preferences. This feature helps you prioritize essential data or expand your field of view to encompass a broader range of information.

### File preview

Previewing data files in a Lakehouse offers a range of benefits that enhance data quality, understanding, and overall data management efficiency. It empowers data professionals to make informed decisions, optimize resource allocation, and ensure that their analysis is based on reliable and valuable data.

Preview is available for the following file types:
**bmp, css, csv, gif, html, jpeg, jpg, js, json, md, mjs, png, ps1, py, svg, ts, tsx, txt, xml,yaml**

## Ribbon

The Lakehouse ribbon is your quick-access action bar, offering a convenient way to perform essential tasks within your Lakehouse. From here, you can refresh your Lakehouse, update settings, load data, or create new custom semantic models with ease.

### Different ways to load data into a Lakehouse

There are several ways to load data into your Lakehouse from the explorer page:

- **Local file/folder upload:** Easily upload data from your local machine directly to the File Section of your Lakehouse. Learn more [here](lakehouse-notebook-load-data.md)**.

- **Notebook code:** Utilize available Spark libraries to connect to data sources and load data into dataframes, then save it in your Lakehouse. Find additional information [here](lakehouse-notebook-load-data.md)**.

- **Copy tool in pipelines:** Connect to various data sources and land the data in its original format or convert it into a Delta table. Learn more [here](..\data-factory\copy-data-activity.md)**.

- **Dataflows Gen 2:** Create dataflows to import data, transform it, and publish it into your Lakehouse. Find out more [here](../data-factory/create-first-dataflow-gen2.md)**.

- **Shortcut** Creating shortcuts to connect to existing data into your Lakehouse without having to directly copy it. Find additional information [here](lakehouse-shortcuts.md)**.

- **Samples:** Quickly ingest sample data to jump-start your exploration of semantic models and tables.

Discover different use cases to understand the best way to [load data in your lakehouse](load-data-lakehouse.md).

### Accessing Lakehouse' SQL analytics endpoint

The [SQL analytics endpoint](lakehouse-sql-analytics-endpoint.md) can be accessed directly from the Lakehouse experience by using the dropdown in top-right area of the ribbon. Using this quick access method, you immediately land in the t-sql mode, which will allow you to work directly on top of your Delta tables in the lake to help you prepare them for reporting.

## Related content

We hope this guide helps you make the most of the Lakehouse Explorer and its diverse functionalities. Feel free to explore, experiment, and make your data management tasks more efficient.

- [Get data experience for Lakehouse](load-data-lakehouse.md).

- [Explore the data in your Lakehouse with a notebook](lakehouse-notebook-explore.md)

- [How to use a notebook to load data into your Lakehouse](lakehouse-notebook-load-data.md).

- [How to copy data using copy activity](..\data-factory\copy-data-activity.md).

- [Create your first dataflow to get and transform data](../data-factory/create-first-dataflow-gen2.md).

- [Create a OneLake shortcut](../real-time-analytics/onelake-shortcuts.md?tab=onelake-shortcut)
