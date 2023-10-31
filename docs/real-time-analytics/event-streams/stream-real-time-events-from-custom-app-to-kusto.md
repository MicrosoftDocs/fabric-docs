---
title: Stream real-time events from a custom app to a Microsoft Fabric KQL database
description: Learn how to stream real-time events from a custom app to a Microsoft Fabric KQL database and build a real-time Power BI report.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: tutorial
ms.custom: build-2023
ms.date: 06/16/2023
ms.search.form: Event streams
#CustomerIntent: As a developer, I want to stream real-time events from my app to a Microsoft Fabric KQL database by using Fabric event streams, and then build reports for business users.
---

# Stream real-time events from a custom app to a Microsoft Fabric KQL database

In this tutorial, you learn how to use the Microsoft Fabric event streams feature to stream real-time events from your custom application into a KQL database. You also discover how to create a near-real-time Power BI report to effectively monitor your business data.

[!INCLUDE [preview-note](../../includes/preview-note.md)]

In this tutorial, you learn how to:

> [!div class="checklist"]
>
> - Create a KQL database and an eventstream in Microsoft Fabric.
> - Configure a source (custom app) and a destination (KQL database) for the eventstream.
> - Send events to the eventstream by using the custom app.
> - Build a near-real-time Power BI report on data in the KQL database.

## Prerequisites

Before you start, you must complete the following prerequisites:

- Get access to a premium workspace with Contributor or higher permissions where your eventstream and KQL database are located.
- Download and install the latest [long-term support (LTS) version of Node.js](https://nodejs.org).
- Download and install [Visual Studio Code](https://code.visualstudio.com) (recommended) or any other integrated development environment (IDE).

## Create a KQL database and an eventstream in Microsoft Fabric

You can create a KQL database and an eventstream from the **Workspace** page or the **Create hub** page. Follow these steps to create the database, and then again to create an eventstream:

1. Change your Fabric experience to **Real-time Analytics**, and select **KQL Database** or **Eventstream** to create these items in your workspace or hub. (For best results, create the KQL database first and the eventstream second.)

   - On the **Workspace** page, select **New**, and then select **KQL Database** or **Eventstream**.

     :::image type="content" source="./media/stream-real-time-events-from-custom-app-to-kusto/two-items-creation-in-workspace.png" alt-text="Screenshot that shows where to select Eventstream and Lakehouse from the New menu in the workspace.":::

   - On the **Create hub** page, select **KQL Database** or **Eventstream**.

     :::image type="content" source="./media/stream-real-time-events-from-custom-app-to-kusto/kql-database-eventstream-create-in-hub.png" alt-text="Screenshot that shows where to select the Eventstream and KQL Database tiles in the Create hub." lightbox="./media/stream-real-time-events-from-custom-app-to-kusto/kql-database-eventstream-create-in-hub.png" :::

1. Enter the name for the new KQL database or eventstream, and then select **Create**. The examples in this article use **citytempdb** for the KQL database and **citytempdata-es** for the eventstream.

   :::image type="content" source="./media/stream-real-time-events-from-custom-app-to-kusto/create-dialog.png" alt-text="Screenshot of the New Eventstream dialog.":::

1. Confirm that **citytempdb** and **citytempdata-es** appear in your workspace.

   :::image type="content" source="./media/stream-real-time-events-from-custom-app-to-kusto/two-items-list.png" alt-text="Screenshot that shows the two-item list in a workspace." lightbox="./media/stream-real-time-events-from-custom-app-to-kusto/two-items-list.png" :::

## Add a custom application source to the eventstream

With a custom application source, you can seamlessly connect your own application and transmit event data to your eventstream. The connection endpoint is readily available and exposed within the custom application source, so the process is streamlined.

Follow these steps to add a custom application source to your eventstream:

1. Select **New source** on the ribbon or the plus sign (**+**) in the main editor canvas, and then select **Custom App**. The **Custom App** configuration dialog appears.

1. Enter a **Source name** value for the custom app, and then select **Add**.

   :::image type="content" source="./media/stream-real-time-events-from-custom-app-to-kusto/custom-app-source.png" alt-text="Screenshot of the Custom App dialog.":::

1. After you have successfully created the custom application source, you can switch and view the following information in the **Details** tab in the lower pane:

   :::image type="content" source="./media/stream-real-time-events-from-custom-app-to-kusto/custom-app-information.png" alt-text="Screenshot showing the custom app information." lightbox="./media/add-manage-eventstream-sources/custom-app-source-detail.png":::

   - **Basic**: Shows the name, description, type and status of your custom app.
   - **Keys**: Shows the connection string for your custom app, which you can copy and paste into your application.
   - **Sample code**: Shows sample code, which you can refer to or copy to push the event data to this eventstream or pull the event data from this eventstram.

   For each tab (**Basic** / **Keys** / **Sample code**), you can also switch three protocol tabs: Eventhub, AMQP and Kafka to access diverse protocol formats information:

   The connection string is an event hub compatible connection string, and you can use it in your application to receive events from your eventstream. The connection string has multiple protocol formats, which you can switch and select in the Keys tab. The following example shows what the connection string looks like in Eventhub format:

   *`Endpoint=sb://eventstream-xxxxxxxx.servicebus.windows.net/;SharedAccessKeyName=key_xxxxxxxx;SharedAccessKey=xxxxxxxx;EntityPath=es_xxxxxxxx`*

      The EventHub format is the default format for the connection string, and it is compatible with the Azure Event Hubs SDK. You can use this format to connect to eventstream using the Event Hubs protocol.

      :::image type="content" source="./media/stream-real-time-events-from-custom-app-to-kusto/custom-app-source-detail.png" alt-text="Screenshot showing the custom app details tab." lightbox="./media/add-manage-eventstream-sources/custom-app-source-detail.png":::

      he other two protocol formats are AMQP and Kafka, which you can select by clicking on the corresponding tabs in the Keys tab.

   AMQP format:

   *`amqps://key_xxxxxxxx:xxxxxxxx@eventstream-xxxxxxxx:5671/es_xxxxxxxx`*

      The AMQP format is compatible with the AMQP 1.0 protocol, which is a standard messaging protocol that supports interoperability between different platforms and languages. You can use this format to connect to eventstream using the AMQP protocol.

   Kafka format:

   *`kafka://key_xxxxxxxx:xxxxxxxx@eventstream-xxxxxxxx:9093/es_xxxxxxxx`*

      The Kafka format is compatible with the Apache Kafka protocol, which is a popular distributed streaming platform that supports high-throughput and low-latency data processing. You can use this format to connect to eventstream using the Kafka protocol.

   You can choose the protocol format that suits your application needs and preferences, and copy and paste the connection string into your application. You can also refer to or copy the sample code that we provide in the Sample code tab, which shows how to send or receive events using different protocols.

## Create an application to send events to the eventstream

With a connection string to an event hub readily available in the custom app source, you can create an application that sends events to your eventstream. In the following example, the application simulates 10 sensor devices that transmit temperature and humidity data nearly every second.

1. Open your code editor, such as [Visual Studio Code](https://code.visualstudio.com).

1. Create a file called *sendtoes.js*, and paste the following code into it. Replace the placeholders with the real values in **Connection string-primary key** or **Connection string-secondary key**.

   For example:

   `Endpoint=sb://eventstream-xxxxxxxx.servicebus.windows.net/;SharedAccessKeyName=key_xxxxxxxx;SharedAccessKey=xxxxxxxx;EntityPath=es_xxxxxxxx`

   :::image type="content" source="./media/stream-real-time-events-from-custom-app-to-kusto/connection-string-example.png" alt-text="Screenshot of the connection string example, with the connection string highlighted yellow and the entity name highlighted blue." lightbox="./media/stream-real-time-events-from-custom-app-to-kusto/connection-string-example.png" :::

   In this example, the connection string is `Endpoint=sb://eventstream-xxxxxxxx.servicebus.windows.net/;SharedAccessKeyName=key_xxxxx;SharedAccessKey=xxxxxxxx`. The entity name is the string after `EntityPath=`, which is `es_xxxxxxxx`.

    ```javascript
    const { EventHubProducerClient } = require("@azure/event-hubs");
    var moment = require('moment');
    
    const connectionString = "CONNECTION STRING";
    const entityName = "ENTITY NAME";
    
    //Generate event data
    function getRowData(id) {
        const time = moment().toISOString();
        const deviceID = id + 100;
        const humidity = Math.round(Math.random()*(65-35) + 35);
        const temperature = Math.round(Math.random()*(37-20) + 20);
    
        return {"entryTime":time, "messageId":id, "temperature":temperature, "humidity":humidity, "deviceID":deviceID};
      }

    function sleep(ms) {  
        return new Promise(resolve => setTimeout(resolve, ms));  
      } 

    async function main() {
        // Create a producer client to send messages to the eventstream.
        const producer = new EventHubProducerClient(connectionString, entityName);
        
        // There are 10 devices. They're sending events nearly every second. So, there are 10 events in one batch.
        // The event counts per batch. For this case, it's the sensor device count.
        const batchSize = 10;
        // The event batch count. If you want to send events indefinitely, you can increase this number to any desired value.
        const batchCount = 5;

        // Generating and sending events...
        for (let j = 0; j < batchCount; ++j) {
            const eventDataBatch = await producer.createBatch();
            for (let k = 0; k < batchSize; ++k) {
                eventDataBatch.tryAdd({ body: getRowData(k) });
            }  
            // Send the batch to the eventstream.
            await producer.sendBatch(eventDataBatch);
            console.log(moment().format('YYYY/MM/DD HH:mm:ss'), `[Send events to Fabric Eventstream]: batch#${j} (${batchSize} events) has been sent to eventstream`);
            // sleep for 1 second.
            await sleep(1000); 
        }
        // Close the producer client.
        await producer.close();
        console.log(moment().format('YYYY/MM/DD HH:mm:ss'), `[Send events to Fabric Eventstream]: All ${batchCount} batches have been sent to eventstream`);
    }

    main().catch((err) => {
        console.log("Error occurred: ", err);
    });
    ```

1. To run this script, you need to install the required packages. Open your PowerShell command prompt, go to the same folder as *sendtoes.js*, and run the following commands:

   ```Powershell
   npm install @azure/event-hubs
   npm install moment
   ```

1. Run `node sendtoes.js` in a PowerShell command prompt to execute the file. The window should display messages about sending events.

    ```Powershell
    C:\wa>node sendtoes.js
    2023/06/12 20:35:39 [Send events to Fabric Eventstream]: batch#0 (10 events) has been sent to eventstream
    2023/06/12 20:35:41 [Send events to Fabric Eventstream]: batch#1 (10 events) has been sent to eventstream
    2023/06/12 20:35:42 [Send events to Fabric Eventstream]: batch#2 (10 events) has been sent to eventstream
    2023/06/12 20:35:44 [Send events to Fabric Eventstream]: batch#3 (10 events) has been sent to eventstream
    2023/06/12 20:35:45 [Send events to Fabric Eventstream]: batch#4 (10 events) has been sent to eventstream
    2023/06/12 20:35:47 [Send events to Fabric Eventstream]: All 5 batches have been sent to eventstream
    ```

1. Go to your eventstream's main editor canvas and select your eventstream node. Then select the **Data preview** tab on the lower pane.

   :::image type="content" source="./media/stream-real-time-events-from-custom-app-to-kusto/eventstream-data-preview.png" alt-text="Screenshot that shows where to find the eventstream node and the eventstream Data preview tab." lightbox="./media/stream-real-time-events-from-custom-app-to-kusto/eventstream-data-preview.png" :::

   You can also view the data metrics to confirm that the data streamed into your eventstream by selecting the **Data insights** tab.

   :::image type="content" source="./media/stream-real-time-events-from-custom-app-to-kusto/eventstream-data-insights.png" alt-text="Screenshot that shows where to select the eventstream node and find the eventstream Data insights tab." lightbox="./media/stream-real-time-events-from-custom-app-to-kusto/eventstream-data-insights.png" :::

## Add a KQL Database destination to the eventstream

While the custom application is streaming events into your eventstream, you can add and configure the KQL Database destination to receive the events from your eventstream. To add a KQL database as a destination, you need to have a KQL database created in the workspace, and choose between two ingestion modes: **Direct ingestion** and **Event processing before ingestion**.

1. **Direct ingestion**
   This mode ingests your event data directly into the KQL database without any processing. You can use this mode if you want to ingest your event data as-is and perform any processing or transformation later in KQL database using KQL queries.
   1. Select **New destination** on the ribbon or "**+**" in the main editor canvas and then select **KQL Database**. The **KQL Database** destination configuration screen appears.

   2. Select **Direct ingestion**, enter a destination name, select a workspace, choose a KQL database from the selected workspace, and then select **Add and configure**.

      :::image type="content" source="./media/event-streams-destination/eventstream-destinations-kql-database.png" alt-text="Screenshot of the KQL Database pull mode destination configuration screen." lightbox="./media/event-streams-destination/eventstream-destinations-kql-database.png" :::

   3. On the **Get data** page, navigate through the tabs to complete the configuration:
      1. **Configure**: Use an existing table of your KQL database or create a new one to route and ingest the data. Complete the required fields and select **Next**.

         :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-1.png" alt-text="Screenshot showing the Destination tab of the Ingest data screen for creating a KQL database destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-1.png" :::

      2. **Inspet**:Select a data format, and preview how the data is sent to your KQL database.

         :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-2.png" alt-text="Screenshot showing the data format of the Ingest data screen for creating a KQL database destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-2.png" :::

         You can also change the column name, data type, or update column by clicking the arrow in the table header. Complete the required fields and select **Finish**.

         :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-3.png" alt-text="Screenshot showing how to change the colum of the Ingest data screen for creating a KQL database destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-3.png":::

         :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-4.png" alt-text="Screenshot showing the change the column name, data type of the Ingest data screen for creating a KQL database destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-4.png" :::

      3. **Summary**: Review the status of your data ingestion, including the table created with the schema you defined, and connection between the eventstream and the KQL database.

          :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-5.png" alt-text="Screenshot showing the Summary tab of the Ingest data screen for creating a KQL database destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-5.png" :::

   4. After you configure everything and select **Close**, a KQL database destination appears on the canvas, connected to your eventstream.

2. **Event processing before ingestion**
   This mode processes your event data before ingesting it into the KQL database. You can use this mode if you want to apply some processing or transformation to your event data before ingesting it, such as filtering, aggregating, or expanding. You can design the processing logic using event processor.
   1. Select **Event processing before ingestion**, complete the information about your KQL Database, and then select **Open event processor**.

      :::image type="content" source="./media/event-streams-destination/eventstream-destinations-kql-database-push-mode.png" alt-text="Screenshot of the KQL Database push mode destination configuration screen." lightbox="./media/event-streams-destination/eventstream-destinations-kql-database-push-mode.png":::

   2. Design the event processing with event processor,and then select **Save**

      :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-editor-preview.png" alt-text="Screenshot of the push mode event processor screen." lightbox="./media/process-events-using-event-processor-editor/event-processor-editor-preview.png":::

   3. When you choose an existing Kusto table, schema validation between the current schema in this eventstream and the target KQL table will be performed. If the two schemas are not matched, an error message is shown and reminds you to open event processor to adjust the schema in this eventstream accordingly.

      :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-error.png" alt-text="Screenshot of the push mode event processor error screen." lightbox="./media/process-events-using-event-processor-editor/event-processor-error.png":::

      When open the event processor, the detailed mismatch information will be shown in Authoring error tab.

      :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-mismatch-information.png" alt-text="Screenshot of the push mode event processor mismatch information screen." lightbox="./media/process-events-using-event-processor-editor/event-processor-mismatch-information.png":::

   4. After you configure everything and select **Save**, a KQL database destination appears on the canvas, connected to your eventstream, and you can check the metrics in the **Data insights** and logs in **Runtime logs**.

## Verify data in the KQL database

To verify the event data in your new KQL database:

1. On the canvas, select the KQL database destination node. Then select the **Information** tab on the lower pane.

   :::image type="content" source="./media/stream-real-time-events-from-custom-app-to-kusto/open-kql-database-from-eventstream.png" alt-text="Screenshot that shows where to select the KQL destination node and view the Information tab." lightbox="./media/stream-real-time-events-from-custom-app-to-kusto/open-kql-database-from-eventstream.png" :::

1. On the **Information** tab, select **Open item** next to **citytempdb**.

1. In the **citytempdb** KQL database, select the **tempdatatbl** table. Then select **Query table** > **Show any 100 records** to view the data.

   :::image type="content" source="./media/stream-real-time-events-from-custom-app-to-kusto/kql-table-top-100-menu.png" alt-text="Screenshot that shows selections for displaying 100 records for a query table." lightbox="./media/stream-real-time-events-from-custom-app-to-kusto/kql-table-top-100-menu.png" :::

1. Confirm that the data appears in the lower section of the **Explore your data** panel.

   :::image type="content" source="./media/stream-real-time-events-from-custom-app-to-kusto/kql-table-top-100.png" alt-text="Screenshot that shows the top 100 records in a KQL table." lightbox="./media/stream-real-time-events-from-custom-app-to-kusto/kql-table-top-100.png" :::

## Build a near-real-time Power BI report with the event data ingested in the KQL database

After the data is ingested into your KQL database, you can analyze it according to your specific needs. For example, if you want to track the temperature and humidity trends over the last two hours in near real time, you can write a KQL query to retrieve that data. Then you can enable automatic refresh and visualize the results in a Power BI report.

1. In a KQL query window that shows any 100 records, modify the query as follows:

   ```kusto
   // Use 'take' to view a sample number of records in the table and check the data.
   tempdatatbl
   | where entryTime > now(-2h)
   | summarize ptemperature = avg(temperature), phumidity = avg(humidity) by bin(entryTime, 1s)
   ```

   > [!NOTE]
   > You use the `avg` operator because 10 sensor devices emit data every second.

1. Select **Build Power BI report** to create your report. In the **Power BI** report dialog, add two line charts into the report. Select **temperature**, **humidity** and **entryTime** data for both charts to monitor the data. You can also add a card to the report to display the latest **entryTime** data, so you can monitor the most recent event time.

   After you complete the report configuration, select **File** > **Save** to save this report to your workspace.

   :::image type="content" source="./media/stream-real-time-events-from-custom-app-to-kusto/kql-query-power-bi-report.png" alt-text="Screenshot that shows the Power BI report creation from KQL." lightbox="./media/stream-real-time-events-from-custom-app-to-kusto/kql-query-power-bi-report.png" :::

1. For automatic data refreshes, select **Edit** in the Power BI report. Go to the **Format page** under **Visualizations**, select **Page refresh**, and set the refresh interval.

   > [!NOTE]
   > The admin interval controls the minimum refresh interval.

   :::image type="content" source="./media/stream-real-time-events-from-custom-app-to-kusto/power-bi-report-auto-refresh.png" alt-text="Screenshot that shows how to enable automatic refreshes." lightbox="./media/stream-real-time-events-from-custom-app-to-kusto/power-bi-report-auto-refresh.png" :::

## Next steps

In this tutorial, you learned how to stream real-time events from your own application to a KQL database. Then you used the KQL query dataset to create a near-real-time Power BI report, which enables you to visualize business insights from your event data.

If you want to discover more advanced functionalities for working with Fabric eventstreams, you might find the following resources helpful:

- [Introduction to Microsoft Fabric event streams](./overview.md)
- [Create and manage an eventstream in Microsoft Fabric](./create-manage-an-eventstream.md)
- [Add and manage eventstream sources](./add-manage-eventstream-sources.md)
- [Add and manage eventstream destinations](./add-manage-eventstream-destinations.md)
- [Ingest, filter, and transform real-time events and send them to a Microsoft Fabric lakehouse](./transform-and-stream-real-time-events-to-lakehouse.md)
