---
title: Run an Apache Spark job definition
description: Learn how to run or schedule a Spark job definition, and where to find the job definition status and details.
ms.reviewer: snehagunda
ms.author: qixwang
author: qixwang
ms.topic: how-to
ms.date: 02/24/2023
ms.search.form: spark_job_definition
---

# Schedule and run an Apache Spark job definition

[!INCLUDE [preview-note](../includes/preview-note.md)]

In this tutorial, learn how to run a [!INCLUDE [product-name](../includes/product-name.md)] Spark job definition item and monitor the job.

## Prerequisites

To get started, you must have the following prerequisites:

- A Microsoft Fabric tenant account with an active subscription. [Create an account for free](../placeholder.md).
- Access to the Data Engineering Workload. [Onboard onto the data engineering workload](../placeholder.md).
- Understand the Spark job definition: [What is an Apache Spark job definition?](spark-job-definition.md).
- Create a Spark job definition: [How to create an Apache Spark job definition](create-spark-job-definition.md).

## How to run a Spark job definition

There are two ways a user could run a Spark job definition:

- Run a Spark job definition item manually by clicking the **Run** button on the Spark job definition item.

  :::image type="content" source="media\run-spark-job-definition\select-run.png" alt-text="Screenshot showing where to select Run." lightbox="media\run-spark-job-definition\select-run.png":::

- Schedule a Spark job definition item by setting up the schedule plan under the **Settings** tab.  Select **Settings** on the toolbar, then select the **Schedule** tab.

  :::image type="content" source="media\run-spark-job-definition\schedule-spark-job-definition.png" alt-text="Screenshot where to select Schedule on the Settings tab." lightbox="media\run-spark-job-definition\schedule-spark-job-definition.png":::

> [!IMPORTANT]
> To run a Spark job definition, it must have the main definition file and the default lakehouse context.

> [!TIP]
>  For the run triggered by the "Run" button, the account of current login user will be used to submit the job
>  For the run triggered by the schedule plan, the account of the user who setup the schedule plan will be used to submit the job


Once you've submitted the run, after three to five seconds, a new row appears under the **Runs** tab. The row shows details about your new run. The **Status** column shows the near real-time status of the job and the **Run Kind** column shows if the job is manual or scheduled.

:::image type="content" source="media\run-spark-job-definition\runs-tab-details.png" alt-text="Screenshot of Runs list details." lightbox="media\run-spark-job-definition\runs-tab-details.png":::

For the detail of how to monitor the job, see [Monitor a Spark job](monitor-spark-job-definitions.md).

## How to cancel a running job

Once the job is submitted, you can cancel the job by clicking the **Cancel** button on the Spark job definition item from the job list

:::image type="content" source="media\run-spark-job-definition\cancelJob.png" alt-text="Screenshot of cancel job." lightbox="media\run-spark-job-definition\cancelJob.png":::

## Next steps

- [Advanced capabilities: Microsoft Apache Spark utilities](microsoft-spark-utilities.md)
