---
title: Use a dataflow in a pipeline
description: This article describes how to use a dataflow in a pipeline.
author: luitwieler

ms.topic: tutorial
ms.date: 03/28/2023
ms.author: jeluitwi

---

# Quickstart: Use a dataflow in a pipeline

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

In this tutorial, you'll build a data pipeline to move a CSV file from an input folder of an Azure Blob Storage source to a Lakehouse destination and sent an email notification when the pipeline is completed.

## Prerequisites

To get started, you must complete the following prerequisites:

- Make sure you have a [!INCLUDE [product-name](../includes/product-name.md)] enabled Workspace: [Create a [!INCLUDE [product-name](../includes/product-name.md)] enabled Workspace](../placeholder.md) that isn’t the default My Workspace.

## Create a Lakehouse

To start you first need to create a Lakehouse. A Lakehouse is a data lake that is optimized for analytics. In this tutorial you will create a Lakehouse that will be used as a destination for the dataflow.

1. Switch to the **Data Engineering** experience.
    :::image type="content" source="media/tutorial-dataflowgen2-pipeline-activity/experience-switcher-dataengineering.png" alt-text="Data Engineering experience":::

1. Go to your Fabric enabled worksace:
    :::image type="content" source="media/tutorial-dataflowgen2-pipeline-activity/goto-workspace.png" alt-text="Fabric enabled workspace":::

1. Click on **Lakehouse** in the create menu.
    :::image type="content" source="media/tutorial-dataflowgen2-pipeline-activity/create-lakehouse.png" alt-text="Create Lakehouse":::

1. Enter a **Name** for the Lakehouse.
1. Click on **Create**.

Now you have created a Lakehouse and we can set up the Dataflow Gen2.

## Create a Dataflow Gen2

A Dataflow Gen2 is a reusable data transformation that can be used in a pipeline. In this tutorial you will create a Dataflow Gen2 that will read a CSV file from an Azure Blob Storage source and write the data to a Lakehouse destination.  

1. Switch to the **Data Factory** experience.
    :::image type="content" source="media/tutorial-dataflowgen2-pipeline-activity/experience-switcher.png" alt-text="Data Factory experience":::

1. Go to your Fabric enabled worksace:
    :::image type="content" source="media/tutorial-dataflowgen2-pipeline-activity/goto-workspace.png" alt-text="Fabric enabled workspace":::

1. Click on **Dataflows Gen2** in the create menu.
    :::image type="content" source="media/tutorial-dataflowgen2-pipeline-activity/create-dataflowgen2.png" alt-text="Create Dataflow Gen2":::

1. Ingest the data from the OData source.
    1. Click on **Get data**.
        :::image type="content" source="media/tutorial-dataflowgen2-pipeline-activity/get-odata.png" alt-text="Get OData":::
    1. Select **OData**.
    1. Enter the **URL** of the OData source. In this tutorial we will use the [OData sample service](https://services.odata.org/V4/Northwind/Northwind.svc/).
    1. Click on **Next**.
    1. Select the **Entity** that you want to ingest. In this tutorial we will use the **Orders** entity.
        :::image type="content" source="media/tutorial-dataflowgen2-pipeline-activity/odata-preview.png" alt-text="OData preview":::
    1. Click on **Create**.

Now you have ingested the data from the OData source and we can set up the Lakehouse destination.

1. Ingest the data to the Lakehouse destination.
    1. Click on **Add data destination**.
        :::image type="content" source="media/tutorial-dataflowgen2-pipeline-activity/add-output-destination.png" alt-text="Add output destination":::
    1. Click on **Lakehouse**.
    1. Configure the connection you want to use to connect to the Lakehouse. Default settings are fine.
    1. Click on **Next**.
    1. Navigate to the workspace in which you created the Lakehouse.
    1. Select the Lakehouse that you created in the previous step.
        :::image type="content" source="media/tutorial-dataflowgen2-pipeline-activity/select-lakehouse.png" alt-text="Select Lakehouse":::
    1. Confirm the table name.
    1. Click on **Next**.
    1. Confirm the update method and click on **Save settings**.
        :::image type="content" source="media/tutorial-dataflowgen2-pipeline-activity/update-method.png" alt-text="Update method":::
1. Publish the Dataflow Gen2.

Now you have ingested the data to the Lakehouse destination and we can set up our Data Pipeline.

## Create a Data Pipeline

A Data Pipeline is a workflow that can be used to automate data processing. In this tutorial you will create a Data Pipeline that will run the Dataflow Gen2 that you created in the previous step.

1. Navigate back to the workspace overview page and click on **Data Pipelines** in the create menu.
    :::image type="content" source="media/tutorial-dataflowgen2-pipeline-activity/create-pipeline.png" alt-text="Create Data Pipeline":::
1. Provide a **Name** for the Data Pipeline.
1. Click on the **Dataflow** activity.
    :::image type="content" source="media/tutorial-dataflowgen2-pipeline-activity/dataflow-pipeline-activity.png" alt-text="Dataflow activity":::
1. Select the **Dataflow** that you created in the previous step in the **Dataflow** dropdown under settings of the activity.
    :::image type="content" source="media/tutorial-dataflowgen2-pipeline-activity/select-dataflow.png" alt-text="Select Dataflow":::
1. Add an **Email notification** activity.
    :::image type="content" source="media/tutorial-dataflowgen2-pipeline-activity/add-office365-activity.png" alt-text="Email notification activity":::
1. Configure the **Email notification** activity.
    1. Authenticate with your Office 365 account.
    1. Select the **Email address** that you want to send the notification to.
    1. Enter a **Subject** for the email.
    1. Enter a **Body** for the email.
        :::image type="content" source="media/tutorial-dataflowgen2-pipeline-activity/settings-email-activity.png" alt-text="Email notification activity settings":::

## Run and Schedule the Data Pipeline

In this section you will run and schedule the Data Pipeline. This will allow you to run the Data Pipeline on a schedule.

1. Go to your workspace.
1. Open the dropdown menu of the Data Pipeline that you created in the previous step.
    :::image type="content" source="media/tutorial-dataflowgen2-pipeline-activity/schedule-dropdown.png" alt-text="Schedule dropdown":::
1. Turn **On** the **Scheduled run** toggle.
    :::image type="content" source="media/tutorial-dataflowgen2-pipeline-activity/setting-schedule.png" alt-text="Schedule settings":::
1. Provide the schedule you want to use to run the Data Pipeline.
    1. Repeat, for example, every **Day** or every **Minute**.
    1. When selected Daily, you can also select the **Time**.
    1. Start **On** a specific **Date**.
    1. End **On** a specific **Date**.
    1. Select the **Timezone**.
1. Apply the changes by clicking on **Apply**.

You have now created a Data Pipeline that will run on a schedule, refresh the data in the Lakehouse and send you an email notification. You can check the status of the Data Pipeline by going to the **Monitor Hub**. You can also check the status of the Data Pipeline by going to the **Data Pipeline** and clicking on the **Run history** tab in the dropdown menu.
