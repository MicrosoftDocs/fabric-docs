---
title: Limitations and known issues
description: This article contains a list of current limitations and known issues in Microsoft Fabric.
author: joanpo
ms.author: joannapea
ms.reviewer: wiassaf
ms.date: 05/23/2023
ms.topic: conceptual
ms.search.form: SQL Endpoint overview, Warehouse overview # This article's title should not change. If so, contact engineering.
---
# Limitations and known issues in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-se-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]



This article details the current limitations and known issues in [!INCLUDE [product-name](../includes/product-name.md)].

## Limitations

Data Warehousing in Microsoft Fabric is currently in preview. The focus of this preview is on providing a rich set of SaaS features and functionality tailored to all skill levels and delivers on the promise of providing a "no knobs" experience through an open data format over a single copy of data. This release is not focused on performance, concurrency and scale. Functionality which will deliver upon a world class, industry leading performance and concurrency story will land incrementally as we progress towards General Availability of Data Warehousing in Microsoft Fabric. 

General product limitations for Data Warehousing in Microsoft Fabric are listed below, with feature level limitations called out in the corresponding feature article. SQL Endpoint specific limitations can be found [here](#limitations-of-the-sql-endpoint). 

- At this time, there's limited T-SQL functionality. See [T-SQL surface area](tsql-surface-area.md) for a list of T-SQL commands that are currently not available.
- Warehouse Recovery capabilities are not available during Preview.

For more limitations information in specific areas, see:

- [Data types in Microsoft Fabric](data-types.md)
- [Datasets](datasets.md#limitations)
- [Delta lake logs](query-delta-lake-logs.md#limitations)
- [Statistics](statistics.md#limitations)
- [Transactions](transactions.md#limitations)
- [The Visual Query editor](visual-query-editor.md#limitations-with-visual-query-editor)
- [Connectivity](connectivity.md#considerations-and-limitations)

## Limitations of the SQL Endpoint

The following limitations apply to [!INCLUDE [fabric-se](includes/fabric-se.md)] automatic schema generation and metadata discovery.

- Data should be in Delta Parquet format to be auto-discovered in the SQL Endpoint. [Delta Lake is an open-source storage framework](https://delta.io/) that enables building Lakehouse architecture. 

- Tables with renamed columns aren't supported in the [!INCLUDE [fabric-se](includes/fabric-se.md)]. 

- Delta tables created outside of the `/tables` folder aren't available in the [!INCLUDE [fabric-se](includes/fabric-se.md)].

   If you don't see a Lakehouse table in the warehouse, check the location of the table. Only the tables that are referencing data in the `/tables` folder are available in the warehouse. The tables that reference data in the `/files` folder in the lake aren't exposed in the [!INCLUDE [fabric-se](includes/fabric-se.md)]. As a workaround, move your data to the `/tables` folder.

- Some columns that exist in the Spark Delta tables might not be available in the tables in the [!INCLUDE [fabric-se](includes/fabric-se.md)]. Refer to the [Data types](data-types.md) for a full list of supported data types. 

## Next steps

- [Get Started with Synapse Data Warehouse](create-warehouse.md)