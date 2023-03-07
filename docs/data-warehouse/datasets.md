---
title: Datasets
description: Learn more about default datasets.
ms.reviewer: WilliamDAssafMSFT
ms.author: chweb
author: chuckles22
ms.topic: conceptual
ms.date: 03/15/2023
---

# Default datasets

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

In [!INCLUDE [product-name](../includes/product-name.md)], Datasets are a semantic model with metrics; a logical description of an analytical domain, with business friendly terminology and representation, to enable deeper analysis. This semantic model is typically a star schema with facts that represent a domain, and dimensions that allow you to analyze, or slice and dice the domain to drill down, filter, and calculate different analyses. With the default dataset, the Dataset is created automatically for you, and the aforementioned business logic gets inherited from the parent Lakehouse or warehouse respectively, jump-starting the downstream analytics experience for business intelligence and analysis with an artifact in [!INCLUDE [product-name](../includes/product-name.md)] that is managed, optimized, and kept in sync with no user intervention. Visualizations and analyses in **Power BI reports** can now be built completely in the web - or in just a few clicks in Power BI desktop - saving users time, resources, and by default, providing a seamless consumption experience for end-users. **Power BI datasets** represent a source of data ready for reporting, visualization, discovery and consumption including:

- The ability to expand warehousing constructs to include hierarchies, descriptions, relationships and allows deeper semantic understanding of a domain.
- The ability to catalog, search and find dataset information in the Data Hub.
- The ability to set bespoke permissions for workload isolation and security.
- The ability to create measures, standardized metrics for repeatable analysis.
- The ability to create Power BI reports for visual analysis.
- The ability discover and consume data in Excel.
- The ability for third party tools like Tableau to connect and analyze data.

For more on Power BI, see [Power BI guidance documentation - Power BI | Microsoft Learn](/power-bi/guidance/).

## Understanding what’s in the default dataset

Currently, tables in the lake house are automatically added to the default dataset. Users can also manually select tables or views from the warehouse they want included in the model for more flexibility. Objects that are in the default dataset are created as a layout in the model view.

The background sync that includes objects (tables and views) waits for the downstream dataset to not be in use to update the dataset, honoring bounded staleness. Users can always go and manually pick tables they want or no want in the dataset.

### Auto-detect by default

Once there are objects in the default dataset, there are two ways to validate or visually inspect the tables:

1. Select the **Manually update** dataset button in the ribbon

1. Review the default layout for the default dataset objects

The default layout for BI enabled tables persists in the user session and is generated whenever a user navigates to the model view. It's called **Default dataset objects** as depicted here:

:::image type="content" source="media\datasets\default-dataset-objects.png" alt-text="Screenshot of the reporting tab showing default dataset objects." lightbox="media\datasets\default-dataset-objects.png":::

This layout isn't currently saved past the user’s session.

Default Datasets follow the current limitations for datasets in Power BI. Learn more:

- [Azure Analysis Services resource and object limits | Microsoft Learn](/azure/analysis-services/analysis-services-capacity-limits)
- [Data types in Power BI Desktop - Power BI | Microsoft Learn](/power-bi/connect-data/desktop-data-types)

If the parquet, Apache Spark, or SQL data types can't be mapped to one of the above types, they are dropped as part of the sync process. This is in line with current Power BI behavior. For these columns, we recommend that you add explicit type conversions in their ETL processes to convert it to a type that is supported. If there are data types that are needed upstream, users can optionally specify a view in SQL with the explicit type conversion desired. This will then be picked up by the sync or can be added manually as previously indicated.

## Next steps

- [Data modeling and defining relationships](data-modeling-defining-relationships.md)
