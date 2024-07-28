---
title: Connector overview
description: Learn about data connectors.
ms.reviewer: DougKlopfenstein
ms.author: jianleishen
author: jianleishen
ms.topic: overview
ms.custom:
  - build-2023
  - ignite-2023
  - ignite-2023-fabric
ms.date: 11/15/2023
ms.search.form: product-data-factory
---

# Connector overview

Data Factory in [!INCLUDE [product-name](../includes/product-name.md)] offers a rich set of connectors that allow you to connect to different types of data stores. You can take advantage of those connectors to transform data in dataflows or move a PB-level of dataset with high-scale in a data pipeline.

## Prerequisites

Before you can set up a connection in Dataflow Gen2 or a data pipeline, the following prerequisites are required:

- A Microsoft Fabric tenant account with an active subscription. [Create an account for free](../get-started/fabric-trial.md).

- A Microsoft Fabric enabled Workspace. [Create a workspace](../get-started/create-workspaces.md).

## Supported data connectors in dataflows

Dataflow Gen2 provide data ingestion and transformation capabilities over a wide range of data sources. These data sources include various types of files, databases, online, cloud, and on-premises data sources. There are greater than 145 different data connectors, which are accessible from the dataflows authoring experience within the get data experience.

:::image type="content" source="media/connector-overview/choose-data-source.png" alt-text="Screenshot of the Choose data source screen." lightbox="media/connector-overview/choose-data-source.png":::

For a comprehensive list of all currently supported data connectors, go to [Dataflow Gen2 connectors in Microsoft Fabric](dataflow-support.md).

The following connectors are currently available for output destinations in Dataflow Gen2:

- Azure Data Explorer
- Azure SQL
- Data Warehouse
- Lakehouse

## Supported data stores in data pipeline

Data Factory in [!INCLUDE [product-name](../includes/product-name.md)] supports data stores in a data pipeline through the Copy, Lookup, Get Metadata, Delete, Script, and Stored Procedure activities. For a list of all currently supported data connectors, go to [Data pipeline connectors in Microsoft Fabric](pipeline-support.md).

> [!NOTE]
> Currently, a pipeline on managed VNet and on-premises data access with a gateway aren't supported in Data Factory for Microsoft Fabric.

## Related content

- [How to copy data using copy activity](copy-data-activity.md)
- [Data source management](data-source-management.md)
