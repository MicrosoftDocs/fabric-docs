---
title: Use a dataflow in a pipeline
description: This article describes how to use a dataflow in a pipeline.
author: luitwieler

ms.topic: tutorial
ms.date: 05/23/2023
ms.author: jeluitwi

---

# Quickstart: Use a dataflow in a pipeline

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

In this tutorial, you build a data pipeline to move OData from a Northwind source to a lakehouse destination and send an email notification when the pipeline is completed.

## Prerequisites

To get started, you must complete the following prerequisites:

- Make sure you have a [[!INCLUDE [product-name](../includes/product-name.md)] enabled Workspace](../create-workspaces.md) that isn’t the default My Workspace.

## Create a lakehouse

To start, you first need to create a lakehouse. A lakehouse is a data lake that is optimized for analytics. In this tutorial, you create a lakehouse that's used as a destination for the dataflow.

1. Switch to the **Data Engineering** experience.

   :::image type="content" source="media/tutorial-dataflows-gen2-pipeline-activity/experience-switcher-data-engineering.png" alt-text="Screenshot of the Data Engineering experience.":::

1. Go to your Fabric enabled workspace.

   :::image type="content" source="media/tutorial-dataflows-gen2-pipeline-activity/go-to-workspace.png" alt-text="Screenshot of the Fabric enabled workspace emphasized.":::

1. Select **Lakehouse** in the create menu.

   :::image type="content" source="media/tutorial-dataflows-gen2-pipeline-activity/create-lakehouse.png" alt-text="Screenshot of the create menu with Create Lakehouse emphasized.":::

1. Enter a **Name** for the lakehouse.
1. Select **Create**.

Now you've created a lakehouse and you can now set up the dataflow.

## Create a Dataflow Gen2

A Dataflow Gen2 is a reusable data transformation that can be used in a pipeline. In this tutorial, you create a dataflow that gets data from an OData source and writes the data to a lakehouse destination.  

1. Switch to the **Data Factory** experience.

   :::image type="content" source="media/tutorial-dataflows-gen2-pipeline-activity/experience-switcher.png" alt-text="Screenshot of the Data Factory experience.":::

1. Go to your Fabric enabled workspace.

   :::image type="content" source="media/tutorial-dataflows-gen2-pipeline-activity/go-to-workspace.png" alt-text="Screenshot of the Fabric enabled workspace.":::

1. Select **Dataflow Gen2** in the create menu.

   :::image type="content" source="media/tutorial-dataflows-gen2-pipeline-activity/create-dataflow-gen2.png" alt-text="Screenshot of the Dataflow Gen2 selection under the new menu.":::

1. Ingest the data from the OData source.

    1. Select **Get data**.
    1. Select **OData**.
    
       :::image type="content" source="media/tutorial-dataflows-gen2-pipeline-activity/get-odata.png" alt-text="Screenshot of the Get data menu with OData emphasized":::
       
    1. Enter the **URL** of the OData source. For this tutorial, use the [OData sample service](https://services.odata.org/V4/Northwind/Northwind.svc/).
    1. Select **Next**.
    1. Select the **Entity** that you want to ingest. In this tutorial, use the **Orders** entity.
    
       :::image type="content" source="media/tutorial-dataflows-gen2-pipeline-activity/odata-preview.png" alt-text="Screenshot of the OData preview." lightbox="media/tutorial-dataflows-gen2-pipeline-activity/odata-preview.png":::
       
    1. Select **Create**.

Now that you've ingested the data from the OData source, you can set up the lakehouse destination.

To ingest the data to the lakehouse destination:

1. Select **Add data destination**.
1. Select **Lakehouse**.

   :::image type="content" source="media/tutorial-dataflows-gen2-pipeline-activity/add-output-destination.png" alt-text="Screenshot of the Add output destination menu with lakehouse emphasized.":::
   
1. Configure the connection you want to use to connect to the lakehouse. The default settings are fine.
1. Select **Next**.
1. Navigate to the workspace where you created the lakehouse.
1. Select the lakehouse that you created in the previous steps.

   :::image type="content" source="media/tutorial-dataflows-gen2-pipeline-activity/select-lakehouse.png" alt-text="Screenshot of the selected lakehouse.":::
   
1. Confirm the table name.
1. Select **Next**.
1. Confirm the update method and select **Save settings**.

   :::image type="content" source="media/tutorial-dataflows-gen2-pipeline-activity/update-method.png" alt-text="Screenshot of the update methods, with replace selected.":::
   
1. Publish the dataflow.

Now that you've ingested the data to the lakehouse destination, you can set up your data pipeline.

## Create a data pipeline

A data pipeline is a workflow that can be used to automate data processing. In this tutorial, you create a data pipeline that runs the Dataflow Gen2 that you created in the previous procedure.

1. Navigate back to the workspace overview page and select **Data Pipelines** in the create menu.

   :::image type="content" source="media/tutorial-dataflows-gen2-pipeline-activity/create-pipeline.png" alt-text="Screenshot of the Data Pipeline selection.":::
   
1. Provide a **Name** for the data pipeline.
1. Select the **Dataflow** activity.

   :::image type="content" source="media/tutorial-dataflows-gen2-pipeline-activity/dataflow-pipeline-activity.png" alt-text="Screenshot of the dataflow activity emphasized.":::

1. Select the **Dataflow** that you created in the previous procedure in the **Dataflow** dropdown list under **Settings**.

   :::image type="content" source="media/tutorial-dataflows-gen2-pipeline-activity/select-dataflow.png" alt-text="Screenshot of the dataflow dropdown list.":::
   
1. Add an **Email notification** activity.

   :::image type="content" source="media/tutorial-dataflows-gen2-pipeline-activity/add-office365-activity.png" alt-text="Screenshot emphasizing how to select an Email notification activity.":::
   
1. Configure the **Email notification** activity.

    1. Authenticate with your Office 365 account.
    1. Select the **Email address** that you want to send the notification to.
    1. Enter a **Subject** for the email.
    1. Enter a **Body** for the email.
    
       :::image type="content" source="media/tutorial-dataflows-gen2-pipeline-activity/settings-email-activity.png" alt-text="Screenshot showing the Email notification activity settings.":::

## Run and schedule the data pipeline

In this section, you run and schedule the data pipeline. This schedule allows you to run the data pipeline on a schedule.

1. Go to your workspace.
1. Open the dropdown menu of the data pipeline that you created in the previous procedure, and then select **Schedule**.

   :::image type="content" source="media/tutorial-dataflows-gen2-pipeline-activity/schedule-dropdown.png" alt-text="Screenshot of the pipeline menu with schedule emphasized.":::
   
1. In **Scheduled run**, select **On**.

   :::image type="content" source="media/tutorial-dataflows-gen2-pipeline-activity/setting-schedule.png" alt-text="Screenshot of scheduled run set to On.":::

1. Provide the schedule you want to use to run the data pipeline.

    1. Repeat, for example, every **Day** or every **Minute**.
    1. When selected Daily, you can also select the **Time**.
    1. Start **On** a specific **Date**.
    1. End **On** a specific **Date**.
    1. Select the **Timezone**.
    
1. Select **Apply** to apply the changes.

You've now created a data pipeline that runs on a schedule, refreshes the data in the lakehouse, and sends you an email notification. You can check the status of the data pipeline by going to the **Monitor Hub**. You can also check the status of the data pipeline by going to **Data Pipeline** and selecting the **Run history** tab in the dropdown menu.
