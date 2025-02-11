---
title: End to end experiences in real-time
description: Use the sample gallery to create an end-to-end real-time solution
ms.reviewer: 
ms.author: ktalmor
author: ktalmor
ms.topic: how-to
ms.custom:
ms.date: 02/11/2025
ms.search.form: RTI end-to-end sample gallery
# Customer intent: Learn how to use the sample gallery to create an end-to-end real-time solution.
---

# Create a sample end-to-end solution

With just one click, this flow creates a group of sample items. You'll have an end-to-end solution that demonstrates how Real-Time Intelligence components work together, enabling you to stream, analyze, and visualize real-time data in a real-world context.

The sample end-to-end solution includes the following components for you to explore:

* Eventstream
* Eventhouse
* KQL Database
* KQL Queryset
* Real-Time Dashboard
* Power BI report

## Components of the Sample Real-Time Intelligence solution

The components of the Real-Time Intelligence sample experience are:

* **Eventstream**: An eventstream is the engine for data ingestion and processing of your real-time data into Microsoft Fabric. You can transform your data and route it via filters to various destinations. Read more about event streams.

* **Eventhouse**: An eventhouse is where data is stored and analyzed. An eventhouse is designed to handle real-time data streams efficiently. An eventhouse can hold one or more KQL databases. They're tailored to large volumes of time-based, streaming events with structured, semi structured, and unstructured data.

* **KQL Database**: A KQL database is where data is stored and managed. It allows you to query data in real-time, providing a powerful tool for data exploration and analysis. The KQL database supports various data policies and transformations.

* **KQL Queryset**: A KQL queryset is used to run queries, view, and customize query results on data from a KQL database.

* **Real-Time Dashboard**: A Real-Time dashboard provides an up-to-the-second snapshot of various goals and data points in a collection of tiles. Each tile has an underlying query and a visual representation. It allows you to visualize data in real-time, providing insights and enabling data exploration.

* **Power BI**: is used to create real-time reports that display data from eventstreams and KQL databases managed by Real-Time Intelligence.

## Create a sample end-to-end solution

1. Select **Workloads** from the left navigation bar and then **Real-Time Intelligence**.
1. On the **Real-Time Intelligence samples** tile, select **Get started**.
1. In the **Create samples** window, select **Get started** with Bike rental data or with Stock ticker data.

- The sample **Bike rental data** includes sample bike movements, monitor station occupancies, and track user patterns, in London.
- The sample **Stock ticker data** includes 40 years of sample S&P 500 stock ticker data.

:::image type="content" source="media/get-data-e2e-sample/get-data-create-e2e-samples.png" alt-text="Screenshot of the Create samples window showing the Bike rental data and Get started button." lightbox="media/get-data-e2e-sample/get-data-create-e2e-samples.png":::

1. Configure the sample items to create. By default, all items are selected. It's recommended to create the entire set. Eventstream and Eventhouse are required. You can deselect Real-time dashboard, Report, or Queryset if you do not want to create them.

1. Set the Destination Location for the sample items. By default, the items are created in the current workspace. You can select a different workspace from the dropdown list.

:::image type="content" source="media/get-data-e2e-sample/get-data-configure-bike-e2e-sample.png" alt-text="Screenshot of the Configure samples window showing the selected items and the Destination Location." lightbox="media/get-data-e2e-sample/get-data-configure-bike-e2e-sample.png":::

1. Click **Create** to create the sample items. The progress window shows the status of the creation process.

1. Once the items are created, you can start exploring the Evenhouse and other components in the Real-Time Intelligence workspace.

:::image type="content" source="media/get-data-e2e-sample/get-data-create-e2e-samples-progress.png" alt-text="Screenshot of the progress with a status next to each component" lightbox="media/get-data-e2e-sample/get-data-create-e2e-samples-progress.png":::

1. Open the folder to see all the sample items.

:::image type="content" source="media/get-data-e2e-sample/get-data-create-e2e-sample-folder.png" alt-text="Screenshot of the Bike_sample folder in the workspace containing the Eventhouse, Eventstream, Queryset, and Dashboard." lightbox="media/get-data-e2e-sample/get-data-create-e2e-sample-folder.png":::

To implement this solution with your own data, follow the Real-Time Intelligence tutorial.

## Related Topics

- [Real-Time Intelligence tutorials](https:///tutorial-introduction)
