---
title: View browse item's recent runs
description: In Fabric, use Apache Spark to run notebooks, Spark job definitions, jobs, and other types of applications. Learn how to view recent runs.
ms.reviewer: snehagunda
ms.author: jejiang
author: jejiang
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 05/23/2023
ms.search.form: Browse artifacts recent runs
---

# Browse item's recent runs

With [!INCLUDE [product-name](../includes/product-name.md)], you can use Apache Spark to run notebooks, Apache Spark job definitions, jobs, and other types of applications in your workspace. This article explains how to view your running Apache Spark applications, making it easier to keep an eye on the latest running status.

## View the recent runs pane

We can open **Recent runs** pane with the following steps:

1. Open the [!INCLUDE [product-name](../includes/product-name.md)] homepage and select a workspace where you want to run the job.

2. Selecting **Spark job definition** \ **notebook item context** \ **pipeline item context** menu shows the recent run option.

3. Select **Recent runs**.

 - Open the recent run pane from the **Spark job definition** \ **notebook item context**.

    :::image type="content" source="media\spark-item-recent-runs\recent-runs-list.png" alt-text="Screenshot showing where to select Recent runs and the subsequent list of recent runs." lightbox="media\spark-item-recent-runs\recent-runs-list.png":::

 - Open the recent run pane from the **pipeline item context**.

    :::image type="content" source="media\spark-item-recent-runs\from-pipeline-open-the-recent-run.png" alt-text="Screenshot showing where to select Recent runs from pipeline." lightbox="media\spark-item-recent-runs\from-pipeline-open-the-recent-run.png":::

## All runs within a Notebook

We can open **Recent runs** pane within a notebook by following steps:

1. Open the [!INCLUDE [product-name](../includes/product-name.md)] homepage and select a workspace where you want to run the job.

2. Open a notebook in this workspace.

3. Selecting **Run** -> **All runs**

    :::image type="content" source="media\spark-item-recent-runs\all-runs-within-a-notebook.png" alt-text="Screenshot showing all runs within a notebook." lightbox="media\spark-item-recent-runs\all-runs-within-a-notebook.png":::

## Detail for recent run pane

If the notebook or Spark job definition doesn't have any run operations, the **Recent runs** page shows **No jobs found**.

:::image type="content" source="media\spark-item-recent-runs\no-jobs-found.png" alt-text="Screenshot showing an example of the no jobs found message." lightbox="media\spark-item-recent-runs\no-jobs-found.png":::

In the **Recent runs** pane, you can view a list of applications, including **Application name**, **Submitted** time, **Submitter**, **Status**, **Total duration**, **Run kind**, and **Livy Id**. You can filter applications by their status and submission time, which makes it easier for you to view applications.

:::image type="content" source="media\spark-item-recent-runs\applications-list.png" alt-text="Screenshot showing the list of applications." lightbox="media\spark-item-recent-runs\applications-list.png":::

Selecting the application name link navigates to spark application details where we can get to see the logs, data and skew details for the Spark run.

## Related content

The next step after viewing the list of running Apache Spark applications is to view the application details. You can refer to:

- [Apache Spark application detail monitoring](spark-detail-monitoring.md)
