---
title: Move data from Oracle to Fabric Lakehouse via pipeline and on-premises data gateway
description: Learn how to move data from Oracle to Fabric Lakehouse via pipeline and on-premises data gateway.
ms.reviewer: whhender
ms.author: lle
author: lrtoyou1223
ms.topic: tutorial
ms.custom: pipelines, sfi-image-nochange
ms.date: 05/17/2024
ms.search.form: Pipeline Tutorials
---

# Move data from Oracle to Fabric Lakehouse via Pipeline and On-premises Data Gateway

In this tutorial, you build a data pipeline to move data from an on-premises Oracle database to a Lakehouse destination.

## Prerequisites

To start, you must complete the following prerequisites:

- Install an on-premises data gateway in your local environment. You can get more details about how to install and configure an on-premises data gateway here: [Install an on-premises data gateway](/data-integration/gateway/service-gateway-install)

> [!NOTE] 
> Fabric pipeline activities can only be executed by a version of the on-premises data gateway that is 3000.222.5 or higher.

- Install 64-bit Oracle Client for Microsoft Tools (OCMT) on the computer running on-premises data gateway. You can download OCMT from the [Oracle Client for Microsoft Tools page](https://www.oracle.com/database/technologies/appdev/ocmt.html).

## Create a data pipeline

1. Navigate to [Power BI](https://app.powerbi.com/).
1. Select the Power BI icon in the bottom left of the screen, then select **Data factory** to open homepage of Data Factory.
1. Select **Data pipeline** and then input a pipeline name to create a new pipeline.

   :::image type="content" source="media/copy-data-activity/select-pipeline.png" alt-text="Screenshot showing the new data pipeline button in the newly created workspace.":::

   :::image type="content" source="media/copy-data-activity/new-pipeline.png" alt-text="Screenshot showing the name of creating a new pipeline.":::

## Copy data using data pipeline

In this session, you start to build your data pipeline by following below steps about copying data from on-premises Oracle database to Lakehouse.

### Add a copy activity

1. Open an existing data pipeline or create a new data pipeline.
1. Add a copy activity either by selecting **Add pipeline activity** > **Copy activity** or by selecting **Copy data** > **Add to canvas** under the **Activities** tab.

   :::image type="content" source="media/copy-data-activity/add-copy-activity-to-pipeline-canvas.png" alt-text="Screenshot showing two ways to add a copy activity." lightbox="media/copy-data-activity/add-copy-activity-to-pipeline-canvas.png":::

### Configure your source under the source tab

1. Create a new connection to your data source.

   :::image type="content" source="media/copy-data-activity/configure-source-connection-in-pipeline-new.png" alt-text="Screenshot showing where to create a connection.":::

   a. Choose the data source type from the pop-up window. Select **Oracle Database**, and then select **Continue**.
   
   :::image type="content" source="media/copy-data-activity/oracle-datasource.png" alt-text="Screenshot showing how to select the data source.":::

   b. It navigates to the connection creation page. Fill in the required connection information on the panel, and then select **Create**. For the details of connection creation for each type of data source, you can refer to each [connector article](connector-overview.md#supported-connectors-in-fabric).
   
      :::image type="content" source="media/copy-data-activity/configure-connection-details-new.png" alt-text="Screenshot showing New connection page.":::

    c. Specify a table to be copied. Select **Preview data** to preview your source table. You can also use **Query** and **Stored procedure** to read data from your source.

### Configure your destination under the destination tab

1. Choose your destination type. It could be either your internal first class data store from your workspace, such as Lakehouse, or your external data stores. You use Lakehouse as an example.

1. Choose to use **Lakehouse** in **Workspace data store type**. Select **+ New**, and it navigates you to the Lakehouse creation page. Specify your Lakehouse name and then select **Create**.

    :::image type="content" source="media/copy-data-activity/create-lakehouse-new.png" alt-text="Screenshot showing Lakehouse creation.":::

1. Specify a table or set up the file path to define the file or folder as the destination. Here select **Tables** and specify a table to write data.

## Run and schedule your data pipeline

After completing the configuration of your data pipeline, run the data pipeline to trigger the copy activity. You can also schedule your data pipeline run if needed.

1. Switch to the **Home** tab and select **Run**. A confirmation dialog is displayed. Then select **Save and run** to start the activity.

    :::image type="content" source="media/tutorial-move-data-lakehouse-pipeline/save-and-run.png" alt-text="Screenshot of saving and running activity." lightbox="media/tutorial-move-data-lakehouse-pipeline/save-and-run.png":::

1. You can monitor the running process and check the results on the **Output** tab below the data pipeline canvas. Select the run details button (with the glasses icon highlighted) to view the run details.

    :::image type="content" source="media/tutorial-move-data-lakehouse-pipeline/output.png" alt-text="Screenshot of the output of the data pipeline.":::


1. You can also schedule the data pipeline to run with a specific frequency as required. Below is an example scheduling the data pipeline to run every 15 minutes. You can also specify the **Start** time and **End** time for your schedule. If you don't specify a start time, the start time is the time your schedule applies. If you don't specify an end time, your data pipeline run keeps recurring every 15 minutes.

    :::image type="content" source="media/tutorial-move-data-lakehouse-pipeline/schedule.png" alt-text="Screenshot of scheduling the data pipeline.":::

## Related content

- [Connector overview](connector-overview.md)
- [How to monitor data pipeline runs](monitor-pipeline-runs.md)
