---
title: Default Power BI datasets
description: Learn more about default Power BI datasets in Microsoft Fabric.
author: chuckles22
ms.author: chweb
ms.reviewer: wiassaf, salilkanade
ms.date: 06/04/2023
ms.topic: conceptual
ms.custom: build-2023
ms.search.form: Default dataset overview # This article's title should not change. If so, contact engineering.
---
# Default Power BI datasets in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

In [!INCLUDE [product-name](../includes/product-name.md)], Power BI datasets are a semantic model with metrics; a logical description of an analytical domain, with business friendly terminology and representation, to enable deeper analysis. This semantic model is typically a star schema with facts that represent a domain, and dimensions that allow you to analyze, or slice and dice the domain to drill down, filter, and calculate different analyses. With the default dataset, the dataset is created automatically for you, and the aforementioned business logic gets inherited from the parent lakehouse or [!INCLUDE [fabric-dw](includes/fabric-dw.md)] respectively, jump-starting the downstream analytics experience for business intelligence and analysis with an item in [!INCLUDE [product-name](../includes/product-name.md)] that is managed, optimized, and kept in sync with no user intervention. 

Visualizations and analyses in **Power BI reports** can now be built completely in the web - or in just a few steps in Power BI desktop - saving users time, resources, and by default, providing a seamless consumption experience for end-users. The default Power BI dataset follows the naming convention of the Lakehouse.

**Power BI datasets** represent a source of data ready for reporting, visualization, discovery, and consumption. Power BI datasets provide:

- The ability to expand warehousing constructs to include hierarchies, descriptions, relationships. This allows deeper semantic understanding of a domain.
- The ability to catalog, search, and find Power BI dataset information in the Data Hub.
- The ability to set bespoke permissions for workload isolation and security.
- The ability to create measures, standardized metrics for repeatable analysis.
- The ability to create Power BI reports for visual analysis.
- The ability discover and consume data in Excel.
- The ability for third party tools like Tableau to connect and analyze data.

For more on Power BI, see [Power BI guidance](/power-bi/guidance/).

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Direct Lake Mode
[Direct Lake](https://learn.microsoft.com/en-us/power-bi/enterprise/directlake-overview) mode is a groundbreaking new engine capability to analyze very large datasets in Power BI. The technology is based on the idea of loading parquet-formatted files directly from a data lake without having to query a data warehouse or lakehouse endpoint, and without having to import or duplicate data into a Power BI dataset. This native integration brings a unique mode, called Direct Lake, of accessing the data from the Lakehouse or Warehouse to provide the most performant query and reporting experience. Direct Lake is a fast path to load the data from the data lake straight into the Power BI engine, ready for analysis.

In traditional DirectQuery mode, the Power BI engine directly queries the data from the source for each query execution, and the query performance depends on the data retrieval speed. DirectQuery eliminates the need to copy data, ensuring that any changes in the source are immediately reflected in query results. On the other hand, in the import mode, the performance is much better because the data is readily available in memory without having to query the data from the source for each query execution, however the Power BI engine must first copy the data into the memory at data refresh time. Any changes to the underlying data source are picked up during the next data refresh(in scheduled as well as on-demand refresh).

Direct Lake mode now eliminates this import requirement by loading the data files directly into memory. Because there's no explicit import process, it's possible to pick up any changes at the source as they occur, thus combining the advantages of DirectQuery and import mode while avoiding their disadvantages. Direct Lake mode is therefore the ideal choice for analyzing very large datasets and datasets with frequent updates at the source.

Direct Lake mode is the default connection type for Datasets that use a Lakehouse or Warehouse as a data source.

## Understand what's in the default Power BI dataset

When you create a [Lakehouse](../data-engineering/lakehouse-overview.md) or Warehouse, a default Power BI dataset is created with the [!INCLUDE [fabric-se](includes/fabric-se.md)]. The default dataset is represented with the *(default)* suffix. For more information, see [Default datasets](datasets.md).

The default dataset is queried via the [!INCLUDE [fabric-se](includes/fabric-se.md)] and updated via changes to the Lakehouse or Warehouse. You can also query the default dataset via [cross-database queries](query-warehouse.md#write-a-cross-database-query) from a [[!INCLUDE [fabric-dw](includes/fabric-dw.md)]](data-warehousing.md#synapse-data-warehouse).

By default, all tables and views in the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] are automatically added to the default Power BI dataset. Users can also manually select tables or views from the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] they want included in the model for more flexibility. Objects that are in the default Power BI dataset are created as a layout in the model view.

The background sync that includes objects (tables and views) waits for the downstream dataset to not be in use to update the dataset, honoring bounded staleness. Users can always go and manually pick tables they want or no want in the dataset.

### Manually update the default Power BI dataset

Once there are objects in the default Power BI dataset, there are two ways to validate or visually inspect the tables:

1. Select the **Manually update** dataset button in the ribbon.

1. Review the default layout for the default dataset objects.

The default layout for BI enabled tables persists in the user session and is generated whenever a user navigates to the model view. Look for the **Default dataset objects** tab.

   :::image type="content" source="media\datasets\default-dataset-objects.png" alt-text="Screenshot of the reporting tab showing default dataset objects." lightbox="media\datasets\default-dataset-objects.png":::

## Access the default Power BI dataset

To access default Power BI datasets, go to your workspace, and find the dataset that matches the name of the desired Lakehouse. The default Power BI dataset follows the naming convention of the Lakehouse.

   :::image type="content" source="media\datasets\find-dataset.png" alt-text="Screenshot showing where to find a dataset." lightbox="media\datasets\find-dataset.png":::

To load the dataset, select the name of the dataset.

   :::image type="content" source="media\datasets\load-dataset.png" alt-text="Screenshot showing the load dataset details." lightbox="media\datasets\load-dataset.png":::

## Create a new Power BI dataset

There are some situations where your organization may need to create additional Power BI datasets based off [!INCLUDE [fabric-se](includes/fabric-se.md)] or [!INCLUDE [fabric-dw](includes/fabric-dw.md)] data.

The **New Power BI dataset** button inherits the default dataset's configuration and allows for further customization. The default dataset acts as a starter template, helping to ensure a single version of the truth. For example, if you use the default dataset and define new relationships, and then use the **New Power BI dataset** button, the new dataset will inherit those relationships if the tables selected include those new relationships.

To create a Power BI dataset from a [!INCLUDE [fabric-dw](includes/fabric-dw.md)], follow these steps:

1. Open the [!INCLUDE [fabric-dw](includes/fabric-dw.md)], and then switch to the **Reporting** ribbon.

1. In the **Reporting** ribbon, select **New Power BI dataset**, and then in the **New dataset** dialog, select tables to be included, and then select **Confirm**.

   :::image type="content" source="media\datasets\new-power-bi-dataset.png" alt-text="Screenshot showing the new Power BI dataset." lightbox="media\datasets\new-power-bi-dataset.png":::

1. Power BI automatically saves the dataset in the workspace based on the name of your [!INCLUDE [fabric-dw](includes/fabric-dw.md)], and then opens the dataset in Power BI.

1. Select **Open data model** to open the Power BI Web modeling experience where you can add table relationships and DAX measures.

To learn more on how to edit data models in the Power BI service, see [Edit Data Models](/power-bi/transform-model/service-edit-data-models).

## Limitations

Default Power BI datasets follow the current limitations for datasets in Power BI. Learn more:

- [Azure Analysis Services resource and object limits | Microsoft Learn](/azure/analysis-services/analysis-services-capacity-limits)
- [Data types in Power BI Desktop - Power BI | Microsoft Learn](/power-bi/connect-data/desktop-data-types)

If the parquet, Apache Spark, or SQL data types can't be mapped to one of the above types, they are dropped as part of the sync process. This is in line with current Power BI behavior. For these columns, we recommend that you add explicit type conversions in their ETL processes to convert it to a type that is supported. If there are data types that are needed upstream, users can optionally specify a view in SQL with the explicit type conversion desired. This will be picked up by the sync or can be added manually as previously indicated.

## Next steps

- [Define relationships in data models](data-modeling-defining-relationships.md)
- [Data modeling in the default Power BI dataset](model-default-power-bi-dataset.md)
