---
title: End-to-end sample solution in real-time
description: Use the sample gallery to create an end-to-end real-time solution that shows how to stream, analyze, and visualize real-time data in a real-world context.
ms.reviewer: sharmaanshul
ms.author: shsagir
author: shsagir
ms.topic: how-to
ms.custom:
ms.date: 02/11/2025
#customer intent: As a data analyst, I want to create an end-to-end real-time solution so that I can understand how Real-Time Intelligence components work together.
---

# End-to-end sample solution

In this article, you learn how to use the End-to-end sample solution to automatically create a collection of sample items. It allows you to explore the main features of Real-Time Intelligence with sample data. It provides a comprehensive end-to-end solution, demonstrating how Real-Time Intelligence components work together to stream, analyze, and visualize real-time data in a real-world context.

> [!Tip]
> To implement this solution with your own data, follow the [end-to-end tutorial](tutorial-introduction.md).

The sample data sets are designed to help you understand how to use Real-Time Intelligence components. The sample data sets include:

* **Bike rental data**: Contains London-based bike movements, monitor station occupancies, and track user patterns.
* **Stock ticker data**: Contains 40 years of sample S&P 500 stock ticker data.

## Components of the sample solution

The sample end-to-end solution includes the following components:

* **Eventstream**: An Eventstream is the engine for data ingestion and processing of your real-time data into Microsoft Fabric. You can transform your data and route it via filters to various destinations. Read more about [event streams](event-streams/overview.md).

* **Eventhouse**: An Eventhouse is where data is stored and analyzed. An Eventhouse is designed to handle real-time data streams efficiently. An Eventhouse can hold one or more KQL databases. They're tailored to large volumes of time-based, streaming events with structured, semi structured, and unstructured data. Read more about [Eventhouse](eventhouse.md).

* **KQL Database**: A KQL Database is where data is stored and managed. It allows you to query data in real-time, providing a powerful tool for data exploration and analysis. The KQL database supports various data policies and transformations. Read more about [KQL databases](create-database.md).

* **KQL Queryset**: A KQL Queryset is used to run queries, view, and customize query results on data from a [KQL queryset](create-query-set.md).

* **Real-Time Dashboard**: A Real-Time Dashboard provides an up-to-the-second snapshot of various goals and data points in a collection of tiles. Each tile has an underlying query and a visual representation. It allows you to visualize data in real-time, providing insights and enabling data exploration. Read more about [Real-Time dashboards](dashboard-real-time-create.md).

* **Power BI**: is used to create real-time reports that display data from Eventstreams and KQL Databases managed by Real-Time Intelligence.

## Create a sample solution with bike rental data

This example uses the bike rental sample data:

1. Select **Workloads** from the left navigation bar and then **Real-Time Intelligence**.

1. On the **Real-Time Intelligence samples** tile, select **Get started**.

1. In the **Create samples** window, select **Get started** with Bike rental data.

      :::image type="content" source="media/get-data-e2e-sample/get-data-create-e2e-samples.png" alt-text="Screenshot of the Create samples window showing the Bike rental data and Get started button.":::

1. Select the sample items to create. By default, all items are selected.

    > [!NOTE]
    > Real-time Dashboard, Report, and Queryset are optional and can be cleared. However, we recommend creating the entire component set for the best experience.

    :::image type="content" source="media/get-data-e2e-sample/get-data-configure-bike-e2e-sample.png" alt-text="Screenshot of the Configure samples window showing the selected items and the Destination Location." lightbox="media/get-data-e2e-sample/get-data-configure-bike-e2e-sample.png":::

1. Set the **Destination Location** for the sample components. By default, the items are created in the current workspace. You can select a different workspace from the dropdown list.

1. Select **Create** to create the sample components. The progress window shows the status of the creation process.

    :::image type="content" source="media/get-data-e2e-sample/get-data-create-e2e-samples-progress.png" alt-text="Screenshot of the progress with a status next to each component" lightbox="media/get-data-e2e-sample/get-data-create-e2e-samples-progress.png":::

1. Once the items are created, open the folder to see all the sample components. Explore the solution by selecting components such as the eventhouse.

    :::image type="content" source="media/get-data-e2e-sample/get-data-e2e-sample-folder.png" alt-text="Screenshot of the Bike_sample folder in the workspace containing the Eventhouse, Eventstream, Queryset, and Dashboard.":::

## Related content

* [What is Real-Time Intelligence?](overview.md)
* [Sample Gallery](sample-gallery.md)
