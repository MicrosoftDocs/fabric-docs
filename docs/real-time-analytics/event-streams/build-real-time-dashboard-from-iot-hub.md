---
title: Build a real-time dashboard by streaming events from Azure IoT Hub to Microsoft Fabric
description: This article provides instruction on how to build a real-time dashboard by streaming data from Azure IoT Hub to Eventstream in Microsoft Fabric. 
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: tutorial
ms.custom: build-2023
ms.date: 08/31/2023
ms.search.form: product-kusto
#CustomerIntent: As a developer, I want to stream real-time events from Azure IoT Hub to Microsoft Fabric and build a real-time dashboard to monitor the health my devices. 
---

# Build a real-time dashboard by streaming events from Azure IoT Hub to Microsoft Fabric

If you have IoT devices that are connected to your Azure IoT Hub, you can ingest and transform your IoT data using Eventstream in Microsoft Fabric. In this tutorial, we walk you through the process of setting up an eventstream to ingest real-time data from Azure IoT Hub to Kusto database. You learn to build a Power BI dashboard to monitor the health of your IoT devices in real time.

[!INCLUDE [preview-note](../../includes/preview-note.md)]

## Prerequisites

Before you begin, make sure you have:

- Access to a premium workspace with **Contributor** or above permissions where your Eventstream and KQL database are located.
- An Azure IoT hub with event data and the necessary permission to access the policy keys. The IoT hub must be publicly accessible and not behind a firewall or secured in a virtual network.

## Create a KQL database and an eventstream

Follow these steps to create a KQL database and an eventstream in your workspace:

1. Navigate to **My workspace**, and under the **New** drop-down menu, select **Show all**.

    :::image type="content" source="./media/add-iot-hub-source/my-workspace-show-all.png" alt-text="Screenshot that shows where to select my workspace and select show all to find eventstream.":::

2. Scroll down to the **Real-Time Analytics** section, select **KQL Database** or **Eventstream**.

    :::image type="content" source="./media/add-iot-hub-source/add-kusto-and-eventstream.png" alt-text="Screenshot that shows where to find the eventstream and KQL database.":::

3. Enter the name for the new KQL database or eventstream, and then select **Create**. The examples in this article use **my-kqldb** for the KQL database and **my-eventstream** for the eventstream. Confirm that these two items appear in your workspace.

    :::image type="content" source="./media/add-iot-hub-source/workspace-kql-and-eventstream.png" alt-text="Screenshot that shows where to find the eventstream and KQL database in the workspace.":::

## Add an IoT source to the eventstream

1. In the Eventstream editor, expand the **New source** drop-down menu within the node and choose **Azure IoT Hub**.

   :::image type="content" source="./media/add-iot-hub-source/add-iot-hub-source.png" alt-text="Screenshot that shows where to add an Azure IoT Hub source in the eventstream.":::

2. On the **Azure IoT Hub** configuration pane, enter the following details:

   :::image type="content" source="./media/add-iot-hub-source/iot-hub-configuration-pane.png" alt-text="Screenshot that shows where to configure Azure IoT Hub in the eventstream.":::

    1. **Source name**: Enter a name for your Azure IoT Hub, such as **iothub-source**.
    2. **Cloud connection**: Select an existing cloud connection that links your Azure IoT Hub to Microsoft Fabric. If you don't have one, proceed to step 3 to create a new cloud connection.
    3. **Data format**. Choose a data format (AVRO, JSON, or CSV) for streaming your IoT Hub data into the eventstream.
    4. **Consumer group**. Choose a consumer group from your Azure IoT Hub, or leave it as **$Default**. Then select **Add** to finish the Azure IoT Hub configuration.
    5. Once it's added successfully, you can see an Azure IoT Hub source added to your eventstream in the editor.

       :::image type="content" source="./media/add-iot-hub-source/successfully-added-iot-hub.png" alt-text="Screenshot that shows the Azure IoT Hub source in the Eventstream editor.":::

3. To create a new cloud connection for your Azure IoT Hub, follow these steps:

   :::image type="content" source="./media/add-iot-hub-source/create-new-cloud-connection.png" alt-text="Screenshot that shows where to create a new cloud connection.":::

    1. Select **Create new connection** from the drop-down menu, fill in the **Connection settings** and **Connection credentials** of your Azure IoT Hub, and then select **Create**.

        :::image type="content" source="./media/add-iot-hub-source/add-new-cloud-connection.png" alt-text="Screenshot that shows where to configure a new cloud connection.":::

    2. **IoT Hub**. Enter the name of the IoT Hub in the Azure portal.
    3. **Connection name**. Enter a name for the new cloud connection, such as **iothub-connection**.
    4. **Shared access key name** and **Shared access key**. Enter the connection credentials for your Azure IoT Hub. You can find it under **Shared access policies** in the Azure portal. You must have appropriate permissions to access any of the IoT Hub endpoints.

       :::image type="content" source="./media/add-iot-hub-source/shared-access-key.png" alt-text="Screenshot that shows where to find the shared access key in the Azure portal.":::

    5. **General**. Keep **Organizational** as the Privacy level, and then select **Create** to create the new connection.
    6. Return to the Azure IoT Hub configuration pane and select **Refresh** to load the new cloud connection.

       :::image type="content" source="./media/add-iot-hub-source/refresh-iot-hub-connection.png" alt-text="Screenshot that shows where to refresh the cloud connection for Azure IoT Hub.":::

Once the Azure IoT Hub is added to your eventstream, select **Preview data** to verify successful configuration. You should be able to preview incoming data to your eventstream.

:::image type="content" source="./media/add-iot-hub-source/preview-iot-hub-data.png" alt-text="Screenshot that shows where to preview IoT Hub data.":::

## Add a Kusto destination to the eventstream

1. In the Eventstream editor, expand the **New destination** drop-down menu within the destination node and choose **KQL Database**.

   :::image type="content" source="./media/add-iot-hub-source/add-kusto-destination.png" alt-text="Screenshot that shows where to create an Azure IoT Hub destination.":::

2. On the **KQL Database** configuration pane, you can  choose between two ingestion modes: **Direct ingestion** and **Event processing before ingestion**:
   1. **Direct ingestion**
   This mode ingests your event data directly into the KQL database without any processing. This mode is suitable for scenarios where you have low data volume and high latency tolerance. You can use this mode if you want to ingest your event data as-is and perform any processing or transformation later using KQL queries.
      1. Select **Direct ingestion**, enter a destination name, select a workspace, choose a KQL database from the selected workspace, and then select **Add and configure**.

         :::image type="content" source="./media/event-streams-destination/eventstream-destinations-kql-database.png" alt-text="Screenshot of the KQL Database destination configuration screen.":::

         - **Destination name**: Enter a name for this new destination, such as **kusto-dest**.
         - **Workspace**: Select the workspace associated with your Kusto database.
         - **KQL Database**: Select your Kusto database from the drop-down menu, and then **Create and configure**.
      2. On the **Get data** page, navigate through the tabs to complete the configuration.
      3. **Configure**: Use an existing table of your KQL database or create a new one to route and ingest the data. Complete the required fields and select **Next**.

         :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-1.png" alt-text="Screenshot showing the Destination tab of the Ingest data screen for creating a KQL database destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-1.png" :::

      4. **Inspect**:Select a data format, and preview how the data is sent to your KQL database.

         :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-2.png" alt-text="Screenshot showing the data format of the Ingest data screen for creating a KQL database destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-2.png" :::

          You can also change the column name, data type, or update column by clicking the arrow in the table header. Complete the required fields and select **Finish**.

         :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-3.png" alt-text="Screenshot showing how to change the column of the Ingest data screen for creating a KQL database destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-3.png" :::
         :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-4.png" alt-text="Screenshot showing the change the column name, data type of the Ingest data screen for creating a KQL database destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-4.png" :::

      5. **Summary**: Review the status of your data ingestion, including the table created with the schema you defined, and connection between the eventstream and the KQL database.

          :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-5.png" alt-text="Screenshot showing the Summary tab of the Ingest data screen for creating a KQL database destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-5.png" :::

      6. After you configure everything and select **Close**, a KQL database destination appears on the canvas, connected to your eventstream.
      :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-kql-database.png" alt-text="Screenshot showing the new KQL database pull mode destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-kql-database.png" :::

   2. **Event processing before ingestion**
   This mode processes your event data before ingesting it into the KQL database. This mode is suitable for scenarios where you have high data volume and low latency tolerance. You can use this mode if you want to apply some processing or transformation to your event data before ingesting it, such as filtering, aggregating, or expanding. You can specify the processing logic using Azure Stream Analytics queries.

      1. Select **Event processing before ingestion**, complete the information about your KQL Database, and then select **Open event processor**.

         :::image type="content" source="./media/event-streams-destination/eventstream-destinations-kql-database-push-mode.png" alt-text="Screenshot of the KQL Database destination configuration screen.":::

      2. Design the event processing with event processor,and then select **Save**

         :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-editor-preview.png" alt-text="Screenshot of the push mode event processor screen.":::

      3. When you choose an existing Kusto table, for schema validation, if you don’t open event processor, we just show errors but don't provide detailed message.

         :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-error.png" alt-text="Screenshot of the push mode event processor error screen.":::

         When open the event processor, the detailed mismatch information is shown in Authoring error tab.

         :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-mismatch-information.png" alt-text="Screenshot of the push mode event processor mismatch information screen.":::

      4. After you configure everything and select **Save**, a KQL database destination appears on the canvas, connected to your eventstream, and the **Data Insights** and **Runtime Logs** will be shown.

         :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-kql-database-push-mode.png" alt-text="Screenshot showing the new KQL database push mode destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-kql-database-push-mode.png" :::

## Build a Power BI dashboard

1. In the Eventstream editor, select the **KQL Database** you've added, then choose **Open item**. This action directs you to the Kusto database within Fabric.

   :::image type="content" source="./media/add-iot-hub-source/open-kusto-destination.png" alt-text="Screenshot that shows where to open Kusto destination in Eventstream.":::

2. In the Kusto database interface, find the **iothub-stream** table, select **Query table**, and then choose **Records ingested in the last 24 hour**. This action opens the query editor with the results at the bottom.

   :::image type="content" source="./media/add-iot-hub-source/kusto-query-table.png" alt-text="Screenshot that shows where to select query table and records in the last 24 hours.":::

   :::image type="content" source="./media/add-iot-hub-source/open-kusto-query-editor.png" alt-text="Screenshot that shows where to open the query editor in the Kusto database.":::

   Select **Build Power BI report** in the top right corner of the editor to start building a dashboard for your IoTHub data stream.

3. Select the **Line chart** for your dashboard and drag the schema of the IoTHub table onto the X and Y axes. In this example, the dashboard shows the temperature data of IoT devices. Any anomalies detected in the dashboard enable you to make timely decisions.

   :::image type="content" source="./media/add-iot-hub-source/setup-powerbi-dashboard.png" alt-text="Screenshot that shows where to set up a Power BI dashboard.":::

4. To enable data refreshes for real-time monitoring, select **Format page**, and turn-on **Page refresh**. Change the refresh interval to 1 second. With these settings in place, you're able to monitor the temperature of your IoT device in real-time.

    :::image type="content" source="./media/add-iot-hub-source/powerbi-refresh-every-second.png" alt-text="Screenshot that shows where to enable data refresh in every second.":::

   > [!NOTE]
   > You may need to change the Power BI settings to adjust the minimum refresh interval.

   After you finish building the report, select **File > Save** to save this report to your workspace.

Congratulations! You've successfully learned how to build a real-time dashboard by using Eventstream to ingest and monitor your IoTHub data stream. Additionally, Eventstream offers the capability to process your data before it's sent to your database.

## Next steps

If you want to learn more about ingesting and processing real-time using Eventstream, check out the following resources:

- [Introduction to Microsoft Fabric Eventstream](./overview.md)
- [Ingest, filter, and transform real-time events and send them to a Microsoft Fabric lakehouse](./transform-and-stream-real-time-events-to-lakehouse.md)
- [Stream real-time events from a custom app to a Microsoft Fabric KQL database](./stream-real-time-events-from-custom-app-to-kusto.md)
