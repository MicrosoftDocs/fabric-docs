---
title: Spark application detail monitoring
description: Learn how to view detailed monitoring of an application.
ms.reviewer: snehagunda
ms.author: jejiang
author: jejiang
ms.topic: how-to
ms.date: 02/24/2023
---

# Spark application detail monitoring

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

With [!INCLUDE [product-name](../includes/product-name.md)], you can use Apache Spark to run notebooks, jobs, and other kinds of applications on in your workspace. This article explains how to monitor your Apache Spark application, allowing you to keep an eye on the recent run status, issues, and progress of your jobs.

## View Apache Spark applications

You can view all Apache Spark applications from **SJD**, **or notebook artifact context menu shows the recent run option** -> **Recent runs**.

:::image type="content" source="media\spark-detail-monitoring\recent-run.png" alt-text="Screenshot showing Recent runs list and details." lightbox="media\spark-detail-monitoring\recent-run.png":::

You can click the name of the application you want to view in the application list, in the application details page you can view the application details.

## View a successful application

Open the notebook or SJD's recent runs, then select Apache Spark applications whose status is Success. To view the details about the Apache Spark applications that are **Success**.

:::image type="content" source="media\spark-detail-monitoring\job-succeeded.png" alt-text="Screenshot showing where Succeeded status appears." lightbox="media\spark-detail-monitoring\job-succeeded.png":::

1. Refresh the application.
2. When the status of the application is Success, the cancel button is disabled.
3. Open Apache history server link by clicking Spark history server.
4. You can view the details for this application in Details.
5. The job runs list is displayed in the Job tab, you can view the details of each job here, including job ID, Description, Status, Stages, Tasks, Duration and Code snippet.
    - Clicking on Job ID can expand/collapse the job.
    - Click on the job description, you can jump to job or stage page in spark UI.
    - Click on the job Code snippet, you can check code related to this job.
6. For the Logs tab, you can view the full log of Livy, Prelaunch, Driver log with different options selected in the left panel. And you can directly retrieve the required log information by searching keywords and view the logs by filtering the log status. Click Download Log to download the log information to the local.
7. For the Data tab, you can copy the data list on clipboard, download the data list and single data, and check the properties for each data.
8. Check the diagnostics in the Diagnostic tab.

## View a queued application

Click on the name of an application whose status is queued in recent runs, and the application's detail page is opened.

:::image type="content" source="media\spark-detail-monitoring\job-queued.png" alt-text="Screenshot showing where Queued status appears." lightbox="media\spark-detail-monitoring\job-queued.png":::

1. Refresh the application.
2. Cancel the application.
3. For Spark UI, you can open the Spark Job page.
4. The application that is being queued displays No jobs available in the job tab.
5. For the Logs tab, you can view Livy's full log and the driver log with different options selected in the left panel. And you can directly retrieve the required log information by searching keywords and view the logs by filtering the log status. Click Download Log to download the log information to the local.
6. For the Data tab, you can copy the data list on clipboard, download the data list and single data, and check the properties for each data.

    :::image type="content" source="media\spark-detail-monitoring\queued-details.png" alt-text="Screenshot showing the details screen." lightbox="media\spark-detail-monitoring\queued-details.png":::

## View a stopped application

Open the notebook or SJD's recent runs, then select Apache Spark applications whose status is Stopped. To view the details about the Apache Spark applications that are stopped.

:::image type="content" source="media\spark-detail-monitoring\job-stopped.png" alt-text="Screenshot showing Stopped status." lightbox="media\spark-detail-monitoring\job-stopped.png":::

1. **Refresh** the application.
2. When the status of the application is stopped, the **cancel** button is disabled.
3. Open Apache history server link by clicking **Spark history server**.
4. You can view the details for this application in **Details**.
5. The job runs list is displayed in the Job tab, you can view the details of each job here, including job ID, Description, Status, Stages, Tasks, Duration and Code snippet.
    - Clicking on Job ID can expand/collapse the job.
    - Click on the job description, you can jump to job or stage page in spark UI.
    - Click on the job Code snippet, you can check code related to this job.
6. For the **Logs** tab, you can view the full log of Livy, Prelaunch, Driver log with different options selected in the left panel. And you can directly retrieve the required log information by searching keywords and view the logs by filtering the log status. Click Download Log to download the log information to the local.
7. For the **Data** tab, you can copy the data list on clipboard, download the data list and single data, and check the properties for each data.

    :::image type="content" source="media\spark-detail-monitoring\stopped-details.png" alt-text="Screenshot showing the details screen for a stopped job." lightbox="media\spark-detail-monitoring\stopped-details.png":::

## View a cancelled application

Open the notebook or SJD's recent runs, then select Apache Spark applications whose status is Cancelled. To view the details about the Apache Spark applications that are cancelled.

:::image type="content" source="media\spark-detail-monitoring\job-canceled.png" alt-text="Screenshot showing the details screen for a stopped job." lightbox="media\spark-detail-monitoring\job-canceled.png":::

1. **Refresh** the application.
2. When the status of the application is cancelled, the **cancel** button is disabled.
3. Open Apache history server link by clicking **Spark history server**.
4. You can view the details for this application in **Details**.
5. The job runs list is displayed in the **Job** tab, you can view the details of each job here, including job id, Description, Status, Stages, Tasks, Duration and Code snippet.
    - Clicking on Job ID can expand/collapse the job.
    - Click on the job description, you can jump to job or stage page in spark UI.
    - Click on the job Code snippet, you can check code related to this job.
6. For the **Logs** tab, you can view the full log of Livy, Prelaunch, Driver log with different options selected in the left panel. And you can directly retrieve the required log information by searching keywords and view the logs by filtering the log status. Click Download Log to download the log information to the local.
7. For the **Data** tab, you can copy the data list on clipboard, download the data list and single data, and check the properties for each data.
8. Check the diagnostics in the **Diagnostic** tab.

## View a failed application

Open the notebook or SJD's recent runs, then select Apache Spark applications whose status is Failed. To view the details about the Apache Spark applications that are **Failed**.

:::image type="content" source="media\spark-detail-monitoring\job-failed.png" alt-text="Screenshot showing the details screen for a stopped job." lightbox="media\spark-detail-monitoring\job-failed.png":::

1. **Refresh** the application.
2. When the status of the application is **Failed**, the cancel button is disabled.
3. The **Spark history server** button is disabled.
4. You can view the details for this application in **Details**.
5. Application ID is null show in **Jobs tab** when the status of the application is Failed.
6. In the Logs tab, you can see the reason for this application failed.
7. Application ID is null show in **Data tab** when the status of the application is Failed.
8. Check the diagnostics in the Diagnostic tab.

## Next steps

The next step after viewing the details of an Apache Spark application is to view Spark job progress below the Notebook cell. You can refer to:

- [Notebook contextual monitoring and debugging](spark-monitor-debug.md)
