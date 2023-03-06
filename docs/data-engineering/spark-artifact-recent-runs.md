---
title: Workspace artifact recent runs
description: Learn how to view artifact recent runs.
ms.reviewer: snehagunda
ms.author: jejiang
author: jejiang
ms.subservice: data-engineering
ms.topic: how-to
ms.date: 02/24/2023
---

# Workspace artifact recent runs

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

With [!INCLUDE [product-name](../includes/product-name.md)], you can use Apache Spark to run notebooks, Apache Spark job definitions, jobs, and other types of applications in your workspace. This article explains how to view your running Apache Spark applications, making it easier to keep an eye on the latest running status.

## View the recent runs pane

We can open **Recent runs** pane with the following steps:

1. Open the [!INCLUDE [product-name](../includes/product-name.md)] homepage and select a workspace where you want to run the job.

1. Selecting **Spark job definition** or **notebook artifact context** menu shows the recent run option.

1. Select **Recent runs**.

    :::image type="content" source="media\spark-artifact-recent-runs\recent-runs-list.png" alt-text="Screenshot showing where to select Recent runs and the subsequent list of recent runs." lightbox="media\spark-artifact-recent-runs\recent-runs-list.png":::

## Detail for recent run pane

If the notebook or Spark job definition doesn't have any run operations, the **Recent runs** page shows **No jobs found**.

:::image type="content" source="media\spark-artifact-recent-runs\no-jobs-found.png" alt-text="Screenshot showing an example of the no jobs found message." lightbox="media\spark-artifact-recent-runs\no-jobs-found.png":::

In the **Recent runs** pane, you can view a list of applications, including **Application name**, **Submitted** time, **Submitter**, **Status**, **Total duration**, **Run kind**, and **Livy Id**. You can filter applications by their status and submission time, which makes it easier for you to view applications.

:::image type="content" source="media\spark-artifact-recent-runs\applications-list.png" alt-text="Screenshot showing the list of applications." lightbox="media\spark-artifact-recent-runs\applications-list.png":::

Selecting the application name link navigates to spark application details where we can get to see the logs, data and skew details for the Spark run.

## Next steps

The next step after viewing the list of running Apache Spark applications is to view the application details. You can refer to:

- [Apache Spark application detail monitoring](spark-detail-monitoring.md)
