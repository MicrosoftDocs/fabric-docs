---
title: Use the Monitoring hub to manage Apache Spark applications
description: Learn how to access the monitoring hub and use it to sort, search, filter, manage, and cancel Apache Spark applications.
author: jejiang
ms.author: jejiang
ms.topic: overview
ms.date: 05/23/2023
ms.custom:
  - template-howto
  - build-2023
  - ignite-2023
ms.search.form: Browse Spark applications in Monitoring hub
---

# Browse the Apache Spark applications in the Fabric monitoring hub

The Monitoring hub serves as a centralized portal for browsing Apache Spark activities across items. When you are in the Data Engineering or Data Science experience, you can view in-progress Apache Spark applications triggered from Notebooks, Apache Spark job definitions, and Pipelines. You can also search and filter Apache Spark applications based on different criteria. Additionally, you can cancel your in-progress Apache Spark applications and drill down to view more execution details of an Apache Spark application.

## Access the monitoring hub

You can access the Monitoring hub to view various Apache Spark activities by selecting **Monitoring hub** in the left-side navigation links.

:::image type="content" source="media\browse-spark-applications-in-monitoring-hub\monitoring-hub-in-the-left-side-navigation-bar.png" alt-text="Screenshot showing the monitoring hub in the left side navigation bar." lightbox="media\browse-spark-applications-in-monitoring-hub\monitoring-hub-in-the-left-side-navigation-bar.png":::

## Sort, search, filter and column options Apache Spark applications

For better usability and discoverability, you can sort the Apache Spark applications by selecting different columns in the UI. You can also filter the applications based on different columns and search for specific applications. You can also adjust the display and sort order of the columns independently through the column options.

### Sort Apache Spark applications

To sort Apache Spark applications, you can select on each column header, such as **Name**, **Status**, **Item Type**, **Start Time**, **Location**, and so on.

:::image type="content" source="media\browse-spark-applications-in-monitoring-hub\sort-spark-applications.png" alt-text="Screenshot showing the sort spark application." lightbox="media\browse-spark-applications-in-monitoring-hub\sort-spark-applications.png":::

### Filter Apache Spark applications

You can filter Apache Spark applications by **Status**, **Item Type**, **Start Time**, **Submitter**, and **Location** using the Filter pane in the upper-right corner.

:::image type="content" source="media\browse-spark-applications-in-monitoring-hub\filter-spark-applications.png" alt-text="Screenshot showing the filter spark applications." lightbox="media\browse-spark-applications-in-monitoring-hub\filter-spark-applications.png":::

### Search Apache Spark applications

To search for specific Apache Spark applications, you can enter certain keywords in the search box located in the upper-right corner.

:::image type="content" source="media\browse-spark-applications-in-monitoring-hub\search-spark-applications.png" alt-text="Screenshot showing the search spark application." lightbox="media\browse-spark-applications-in-monitoring-hub\search-spark-applications.png":::

### Column options Apache Spark applications

You can change the order in which the lists are displayed by selecting the list you want to display and then dragging the list options.

:::image type="content" source="media\browse-spark-applications-in-monitoring-hub\draggable-column-options.png" alt-text="Screenshot showing the draggable column options." lightbox="media\browse-spark-applications-in-monitoring-hub\draggable-column-options.png":::

## Enable upstream view for related Pipelines

 If you have scheduled notebook and spark job definitions to run in pipelines, you can view the spark activities from these notebooks and spark job definitions in the monitoring hub. Additionally, you can also see the corresponding parent pipeline and all its activities in the monitoring Hub.

 1. Select the **Upstream run** column option.

  :::image type="content" source="media\browse-spark-applications-in-monitoring-hub\upstream-run-column.png" alt-text="Screenshot showing the upstream run column options." lightbox="media\browse-spark-applications-in-monitoring-hub\upstream-run-column.png":::

 2. View the related parent pipeline run in the **Upstream run** column, and click the pipeline run to view all its activities.
  
  :::image type="content" source="media\browse-spark-applications-in-monitoring-hub\upstream-run-in-list.png" alt-text="Screenshot showing the upstream run button in list." lightbox="media\browse-spark-applications-in-monitoring-hub\upstream-run-in-list.png":::

## Manage an Apache Spark application

When you hover over an Apache Spark application row, you can see various row-level actions that enable you to manage a particular Apache Spark application.

### View Apache Spark application detail pane

You can hover over an Apache Spark application row and click the **View details** icon to open the **Detail** pane and view more details about an Apache Spark application.

:::image type="content" source="media\browse-spark-applications-in-monitoring-hub\view-spark-application-detail-pane.png" alt-text="Screenshot showing the view spark application detail pane." lightbox="media\browse-spark-applications-in-monitoring-hub\view-spark-application-detail-pane.png":::

### Cancel an Apache Spark application

If you need to cancel an in-progress Apache Spark application, hover over its row and click the **Cancel** icon.

:::image type="content" source="media\browse-spark-applications-in-monitoring-hub\cancel-a-spark-application.png" alt-text="Screenshot showing the cancel a spark application." lightbox="media\browse-spark-applications-in-monitoring-hub\cancel-a-spark-application.png":::

## Navigate to Apache Spark application detail view

If you need more information about Apache Spark execution statistics, access Apache Spark logs, or check input and output data, you can click on the name of an Apache Spark application to navigate to its corresponding Apache Spark application detail page.

## Related content

- [Apache Spark monitoring overview](spark-monitoring-overview.md)
- [Browse item's recent runs](spark-item-recent-runs.md)
- [Monitor Apache Spark jobs within notebooks](spark-monitor-debug.md)
- [Monitor Apache Spark job definition](monitor-spark-job-definitions.md)
- [Monitor Apache Spark application details](spark-detail-monitoring.md)
