---
title: Modern Evaluator for Dataflow Gen2 with CI/CD (Preview)
description: Boost Dataflow Gen2 with CI/CD performance with the Modern Evaluator—faster query execution, scalable workflows, and support for top connectors.
author: ptyx507x
ms.author: miescobar
ms.reviewer: whhender
ms.topic: conceptual
ms.date: 09/15/2025
ms.custom: dataflows
---
# Modern Evaluator for Dataflow Gen2 with CI/CD (Preview)

>[!NOTE]
>Modern evaluator for Dataflow Gen2 with CI/CD is currently in preview.

The Modern Query Evaluation Engine (also known as the "Modern Evaluator") is a new preview feature for Dataflow Gen2 (with CI/CD support) in Microsoft Fabric. It provides a more powerful query execution engine that can significantly improve the performance of dataflow refreshes. Enabling this feature allows your data transformation workflows to run faster and scale more reliably, resulting in quicker data refresh times and a better overall experience when handling large datasets. 

Some of the key benefits are:

* **Faster dataflow execution**: The modern engine can substantially reduce query evaluation time. Many dataflows will run noticeably faster (often up to 40–50% quicker in internal tests), enabling you to refresh data more frequently or meet tight refresh windows.
* **More efficient processing**: The engine is optimized for efficiency, using improved algorithms and a modern runtime. This means it can handle complex transformations with less overhead, which helps maintain performance as your data volume grows.
* **Scalability and reliability**: By speeding up execution and reducing bottlenecks, the Modern Evaluator helps dataflows scale to larger volumes with greater stability. Customers can expect more consistent refresh durations and fewer timeout issues on very large dataflows when using the new engine.

## How to enable the Modern Evaluator

Follow these steps to turn on the Modern Query Evaluation Engine for a dataflow:

1. **Open your dataflow for editing**: In Fabric Data Factory, navigate to your Dataflow Gen2 (CI/CD) item and open it in the Power Query editor.
2. **Go to Options (Scale settings)**: In the dataflow editor, select the Options menu. In the Options dialog, click on the Scale tab.
3. **Enable the Modern Evaluator**: Find the setting for Modern query evaluation engine (Preview). Turn this option On (check or toggle it).
4. **Save and run**: Save the dataflow settings. The next time you run the dataflow, it will use the Modern Evaluator for supported connectors.

>[!NOTE]
>The Modern Evaluator can be enabled on both new and existing Dataflow Gen2 (CI/CD) items. You might consider testing it on a non-production workspace first, as it is a preview feature.
>If you encounter any issues, you can disable the option to fall back to the standard evaluation engine.

## Supported connectors

The Modern Query Evaluation Engine supports a limited set of data connectors. Ensure your dataflow’s data sources are among the supported types to take advantage of the new engine. Currently supported connectors include::

* [Azure Blob Storage](connector-azure-blob-storage-overview.md) 
* [Azure Data Lake Storage Gen2](connector-azure-data-lake-storage-gen2-overview.md) 
* [Fabric Lakehouse](connector-lakehouse-overview.md)
* [Fabric Warehouse](connector-data-warehouse-overview.md)
* [OData](connector-odata-overview.md)
* [Power Platform Dataflows](connector-dataflows-overview.md) 
* [SharePoint Online List](connector-sharepoint-online-list-overview.md)
* [SharePoint folder](connector-sharepoint-folder-overview.md)
* Web

If a dataflow uses connectors not in this list, those queries will continue to run with the standard (legacy) engine. Support for additional connectors will expand over time as the feature moves toward general availability.

## Performance considerations

By switching to the modern evaluation engine, you should observe faster refresh times especially for data-intensive flows. For example, data transformations that previously took an hour might complete in roughly half the time with the Modern Evaluator enabled (actual results will vary based on your scenarios). This performance boost helps in scenarios such as:

* **Large data volumes**: When dealing with millions of rows or very large files, the new engine’s optimizations can shorten processing time and reduce memory usage.
* **Complex transformations**: Dataflows with many transformation steps or heavy operations (like joins across big tables) benefit from the engine’s improved execution plan, leading to smoother and faster completion.
* **Frequent run schedules**: If your dataflows run multiple times a day, the time savings per refresh accumulate, allowing you to deliver up-to-date data to users more quickly.

>[!NOTE]
>Keep in mind that the Modern Evaluator is still in preview. While it brings performance improvements, you should monitor your dataflows after enabling it. 
>In rare cases, certain transformations or connectors might not yet be fully optimized under the new engine. Always validate the results to ensure your data output remains correct.