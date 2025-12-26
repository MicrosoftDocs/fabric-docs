---
title: End-to-end sample in real-time
description: Use the sample gallery to create an end-to-end real-time solution that shows how to stream, analyze, and visualize real-time data in a real-world context.
ms.reviewer: sharmaanshul
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 09/07/2025
#customer intent: As a data analyst, I want to create an end-to-end real-time solution so that I can understand how Real-Time Intelligence components work together.
---

# End-to-end sample

This article explains how to use the End-to-end Real-Time Intelligence sample solution to automatically create a collection of sample RTI components. It lets you explore the main features of Real-Time Intelligence using sample data. It provides a comprehensive end-to-end solution, demonstrating how Real-Time Intelligence components work together to stream, analyze, visualize, and alert real-time data in a real-world context.

> [!Tip]
> To implement this solution with your data, follow the [end-to-end tutorial](tutorial-introduction.md).

The sample data sets help you understand how to use Real-Time Intelligence components. The sample data sets include:

* **Bike rental data**: Contains London-based bike movements, occupancies, and tracks user patterns.
* **Stock ticker data**: Contains sample S&P 500 stock ticker data.
* **Workspace monitoring**: Contains sample data for monitoring workspace performance and usage.

> [!IMPORTANT]
> The Eventhouse generated through the Workspace Monitoring sample is a standard Eventhouse populated with sample monitoring data. This sample is intended solely for exploration and learning. It differs from a production Workspace Monitoring Eventhouse in the following ways:
> - It is not read-only.
> - It is not an exact representation of a real monitoring database.
> - It does not include full raw log tables or update policies.
> - Some data is static and represents a one-time snapshot, only Semantic Model Logs are streamed continuously.
> See [Workspace Monitoring](../fundamentals/sample-gallery-workspace-monitoring.md) for more information.

## Components of the end-to-end sample

The sample end-to-end solution includes these RTI components:

* **Eventstream**: An Eventstream is the engine for data ingestion and processing of your real-time data into Microsoft Fabric. You can transform your data and route it via filters to various destinations. Read more about [event streams](event-streams/overview.md).

* **Eventhouse**: An Eventhouse is where data is stored and analyzed. An Eventhouse is designed to handle real-time data streams efficiently. An Eventhouse can hold one or more KQL databases. They're tailored to large volumes of time-based, streaming events with structured, semi structured, and unstructured data. Read more about [Eventhouse](eventhouse.md).

* **KQL Database**: A KQL Database is where data is stored and managed. It allows you to query data in real-time, providing a powerful tool for data exploration and analysis. The KQL database supports various data policies and transformations. Read more about [KQL databases](create-database.md).

* **KQL Queryset**: A KQL Queryset is used to run queries, view, and customize query results on data from a [KQL queryset](create-query-set.md).

* **Real-Time Dashboard**: A Real-Time Dashboard provides an up-to-the-second snapshot of various goals and data points in a collection of tiles. Each tile has an underlying query and a visual representation. It allows you to visualize data in real-time, providing insights and enabling data exploration. Read more about [Real-Time dashboards](dashboard-real-time-create.md).

* **Power BI**: Use Power BI to create real-time reports that display data from Eventstreams and KQL Databases managed by Real-Time Intelligence.

* **Activator**: is a no-code experience in Microsoft Fabric for automatically taking actions when patterns or conditions are detected in changing data.

## Create an end-to-end sample

These steps show how to create an end-to-end sample using the bike rental sample data.

1. Select **Workloads** from the left navigation bar, and then **Real-Time Intelligence**.

1. On the **Real-Time Intelligence samples** tile, select **Get started** to open the end to end experience.

    :::image type="content" source="media/sample-end-to-end-solution/get-started-end-to-end-samples-sml.png" alt-text="Screenshot of the RTI workload page with the Sample end to end experience tile highlighted." lightbox="media/sample-end-to-end-solution/get-started-end-to-end-samples-lrg.png":::

1. In the **Create samples** window, select **Get started** with bike rental data.

    :::image type="content" source="media/sample-end-to-end-solution/create-end-to-end-samples.png" alt-text="Screenshot of the Create samples window showing the bike rental data and Get started button.":::

1. Select the sample items to create. By default, all items are selected.

    > [!NOTE]
    > Real-Time Dashboard, Report, Queryset, and Activator are optional and can be cleared. However, we recommend creating the entire component set for the best experience.

    :::image type="content" source="media/sample-end-to-end-solution/configure-bike-end-to-end-sample.png" alt-text="Screenshot of the Configure samples window showing the selected items and the Destination Location." lightbox="media/sample-end-to-end-solution/configure-bike-end-to-end-sample.png":::

1. Set the **Destination Location** for the sample components. By default, the items are created in the current workspace. Select a different workspace from the dropdown list if needed.

1. Select **Create** to create the sample components. The progress window shows the status of the creation process.

    :::image type="content" source="media/sample-end-to-end-solution/create-end-to-end-samples-progress.png" alt-text="Screenshot of the progress with a status next to each component." lightbox="media/sample-end-to-end-solution/create-end-to-end-samples-progress.png":::

1. When the sample data is ready, start exploring by selecting **Open Eventhouse** or **Open Folder**.

    :::image type="content" source="media/sample-end-to-end-solution/end-to-end-sample-navigate.png" alt-text="Screenshot of the interface with Open Eventhouse and Open Folder buttons.":::

1. To explore the sample data at any time, open the workspace and browse to the **Bike_sample** folder.

    :::image type="content" source="media/sample-end-to-end-solution/end-to-end-sample-folder.png" alt-text="Screenshot of the Bike_sample folder in the workspace containing the Eventhouse, Eventstream, Queryset, and Dashboard.":::

1. Select **Bike_Eventhouse**, **Bike_Eventstream**, **Bike_Queryset**, **Bike_Activator**, or **Bike_Dashboard** and explore the sample data. After you open each item for the first time, it appears in the left navigation bar for easy access.

    :::image type="content" source="media/sample-end-to-end-solution/end-to-end-sample-bike-db.png" alt-text="Screenshot of sample bike database and left navigation bar." lightbox="media/sample-end-to-end-solution/end-to-end-sample-bike-db.png":::

## Related content

* [What is Real-Time Intelligence?](overview.md)
* [Sample Gallery](sample-gallery.md)
