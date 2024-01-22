---
title: Migrate to Data Factory
description: This article provides details on how customers of Azure Data Factory (ADF) and Power BI can migrate their existing solutions to Data Factory in Microsoft Fabric.
ms.reviewer: jonburchel
ms.author: weetok
author: dcstwh
ms.topic: conceptual
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.date: 11/15/2023
---

# Migrate to Data Factory in Microsoft Fabric

Data Factory in Microsoft Fabric brings Power Query and Azure Data Factory together into a modern trusted data integration experience that empowers data and business professionals to extract, load, and transform data for their organization. In addition, powerful data orchestration capabilities enable you to build simple to complex data workflows that orchestrate the steps needed for your data integration needs.

## Key concepts in Data Factory in Microsoft Fabric

- **Get data and transformation** - Dataflow Gen2 is an evolution of dataflows in Power BI. Dataflow Gen2 is rearchitected to use Fabric compute engines for data processing and transformation. This enables them to ingest and transform data at any scale.
- **Data orchestration** - Using data pipelines already familiar to users of Azure Data Factory (ADF), Microsoft Fabric enables the same orchestration capabilities offered in ADF. As part of the GA release of Fabric, data pipelines support most of the activities available in ADF.
  
  Refer to [this list of activities](activity-overview.md) that are a part of data pipelines in Fabric. The SSIS activity will be added to data pipelines by Q2 CY2024.
- **Enterprise-ready data movement** - Whether it's small data movement or petabyte-scale, Data Factory provides a serverless and intelligent data movement platform that enables you to move data between diverse data sources and data destinations reliably. With support for 170+ connectors, Data Factory in Microsoft Fabric enables you to move data between multiclouds, data sources on-premises, and within virtual networks (VNet). Intelligent throughput optimization enables the data movement platform to automatically detect the size of the compute needed for data movement.

## Migrate from Azure Data Factory (ADF)

To enable customers to upgrade to Microsoft Fabric from Azure Data Factory (ADF), we support the following features: 

- **Data pipeline activities** - We support most of the activities that you already use in ADF to Data Factory in Fabric. In addition, we have added new activities for notifications, for example, the Teams and Outlook activities. Refer to [this list of activities](activity-overview.md) that are available in Data Factory in Fabric. 
- **OneLake/Lakehouse connector in Azure Data Factory** - For many ADF customers, you can now integrate with Microsoft Fabric, and [bring data into the Fabric OneLake](https://aka.ms/datafactoryfabric/docs/adfconnectLakehouse).
- **Azure Data Factory Mapping Dataflow to Fabric** - We provide this [guide for ADF customers](guide-to-dataflows-for-mapping-data-flow-users.md) considering building new data transformations in Fabric.

  In addition, for customers considering migrating their ADF mapping dataflows to Fabric, you can apply sample code from the Fabric Customer Advisory Team (Fabric CAT) to convert mapping dataflows to Spark code. Find out more at [Mapping dataflows to Microsoft Fabric](https://github.com/sethiaarun/mapping-data-flow-to-spark).

As part of the Data Factory in Microsoft Fabric roadmap, we are working towards the preview of the following by Q2 CY2024:

- **Mounting of ADF in Fabric** - This feature will enable customers to mount their existing ADF in Microsoft Fabric. All ADF pipelines will work as-is, and continue running on Azure, while enabling you to explore Fabric and work out a more comprehensive upgrade plan.
- **Upgrade from ADF pipelines to Fabric** - We are working with customers and the community to learn how we can best support upgrades of data pipelines from ADF to Fabric. As part of this, we will deliver an upgrade experience that empowers you to test your existing data pipelines in Fabric using mounting and upgrading the data pipelines.

## Migrate Power BI Dataflow Gen1 to Dataflow Gen2 in Fabric

Dataflow Gen2 in Fabric provides many advantages and new capabilities compared to dataflows (Gen1) in Power BI: 

- High-Scale Get Data ("Fast Copy")
- High-Scale Data Transformations (using Fabric Lakehouse SQL engine)
- More Output Destinations: Azure SQL DB, Lakehouse, Warehouse, SharePoint, KQL Databases, and more
- Enhanced Refresh History & Monitoring experience
- Enhanced Authoring and Publish experiences. 

We encourage customers to start trying out Dataflow Gen2, either to recreate existing Dataflow Gen1 scenarios or to try out new ones. Early feedback on Dataflow Gen2 will help us evolve and mature product capabilities.

We have a few options for customers to recreate your Gen1 dataflows as Dataflow Gen2: 

- Export Dataflow Gen1 queries and import them into Dataflow Gen2: You can now export queries in both the Dataflows and Dataflow Gen2 authoring experiences and save them to PQT files that you can then import into Dataflow Gen2. For more information, see [Use the export template feature](move-dataflow-gen1-to-dataflow-gen2.md#use-the-export-template-feature).
- Copy and paste in Power Query: If you have a dataflow in Power BI or Power Apps, you can copy your queries and paste them in the editing experience of your Dataflow Gen2 artifact. This functionality allows you to migrate your dataflow to Gen2 without having to rewrite your queries. For more information, see[Copy and paste existing dataflows (Gen1) queries](move-dataflow-gen1-to-dataflow-gen2.md#copy-and-paste-existing-dataflow-gen1-queries). 

Also refer to the following article for further considerations: [Differences between Dataflow Gen1 and Gen2](dataflows-gen2-overview.md)

## Related content

- [Pipeline activities supported in Microsoft Fabric](activity-overview.md)
- [Guide to Dataflow Gen2 for ADF mapping dataflow users](guide-to-dataflows-for-mapping-data-flow-users.md)
