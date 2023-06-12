---
title: Stream real-time events from Custom Application to Microsoft Fabric KQL Database
description: This tutorial provides an end-to-end demonstration of how to use event streams feature to stream real-time events to Microsoft Fabric KQL Database from Custom Application, and then build the Power BI report.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: tutorial
ms.custom: build-2023
ms.date: 06/10/2023
ms.search.form: product-kusto
---

# Stream real-time events from Custom Application to Microsoft Fabric KQL Database

In this tutorial, you learn how to utilize Microsoft Fabric event streams to stream real-time events from your Custom Application into Microsoft Fabric KQL Database. You also discover how to create a near real-time Power BI report to effectively monitor your business data.

[!INCLUDE [preview-note](../../includes/preview-note.md)]

In this tutorial, you learn how to:

> [!div class="checklist"]
> * Create Eventstream and KQL Database items in Microsoft Fabric
> * Add an Custom Application source to the eventstream
> * Create an application to send events to the eventstream
> * Add a KQL Database destination to the eventstream
> * Verify data in the KQL database
> * Build near real-time Power BI report with the events data ingested in the KQL database

## Prerequisites

To get started, you must complete the following prerequisites:

* Get access to a **premium workspace** with **Contributor** or above permissions where your eventstream and KQL database item are located in.
* Download and install **Node.js LTS**. The latest [long-term support (LTS) version](https://nodejs.org).
* [Visual Studio Code](https://code.visualstudio.com) (recommended) or any other integrated development environment (IDE).

## Create an Eventstream and a KQL Database in Microsoft Fabric

You can create an Eventstream item (eventstream) or a KQL Database item (KQL database) on the **Workspace** page or the **Create hub** page. Here are the steps:

1. Select your Fabric experience to **Real-time Analytics** and select **Eventstream** and **KQL Database** to create them in workspace or create hub.

   * In **Workspace**, select **New** and then **Eventstream**, **KQL Database**:

       :::image type="content" source="./media/stream-real-time-events-from-customapp-to-kusto/two-items-creation-in-workspace.png" alt-text="Screenshot showing the eventstream and lakehouse creation in workspace." lightbox="./media/stream-real-time-events-from-customapp-to-kusto/two-items-creation-in-workspace.png" :::

   * In **Create hub**, select **Eventstream** and **KQL Database**:

       :::image type="content" source="./media/stream-real-time-events-from-customapp-to-kusto/kqldb-eventstream-creation-in-hub.png" alt-text="Screenshot showing the eventstream and KQL db item creation in create hub." lightbox="./media/stream-real-time-events-from-customapp-to-kusto/kqldb-eventstream-creation-in-hub.png" :::

2. Give the name for the new Eventstream and KQL Database items, and select **Create**. For example, **citytempdata-es** for the eventstream and **citytempdb** for the KQL database.

   :::image type="content" source="./media/stream-real-time-events-from-customapp-to-kusto/creating-dialog.png" alt-text="Screenshot showing the eventstream item creation dialog." lightbox="./media/stream-real-time-events-from-customapp-to-kusto/creating-dialog.png" :::

3. After they're created successfully, two items are added into your workspace:
   * **citytempdata-es**: an Eventstream item
   * **citytempdb**: a KQL Database item.

       :::image type="content" source="./media/stream-real-time-events-from-customapp-to-kusto/two-items-list.png" alt-text="Screenshot showing the two items list." lightbox="./media/stream-real-time-events-from-customapp-to-kusto/two-items-list.png" :::

## Add a Custom Application source to the eventstream

By utilizing the custom application source, you can seamlessly connect your own application and effortlessly transmit event data to your eventstream. The connection endpoint is readily available and exposed within the custom application source, making the process simple and streamlined.

Once the eventstream has been created, follow these steps to add a custom application as the source of your eventstream.

1. Select **New source** on the ribbon or "**+**" in the main editor canvas and then **Custom App**.

2. Enter a source name for the new source and select **Add**.

   :::image type="content" source="./media/stream-real-time-events-from-customapp-to-kusto/custom-app-source.png" alt-text="Screenshot showing the custom-app-source." lightbox="./media/stream-real-time-events-from-customapp-to-kusto/custom-app-source.png" :::

3. Upon successful creation of the custom application source, you notice a new source node displayed on the canvas. Select this node to reveal key information about the source in the **Information** tab located at the bottom pane.

   :::image type="content" source="./media/stream-real-time-events-from-customapp-to-kusto/custom-app-information.png" alt-text="Screenshot showing the custom app information." lightbox="./media/stream-real-time-events-from-customapp-to-kusto/custom-app-information.png" :::

The connection string displayed in the information tab is an **event hub compatible connection string** that can be utilized in your application to effortlessly send events to your eventstream. An example of what the connection string looks like is provided as below:

*`Endpoint=sb://eventstream-xxxxxxxx.servicebus.windows.net/;SharedAccessKeyName=key_xxxxxxxx;SharedAccessKey=xxxxxxxx;EntityPath=es_xxxxxxxx`*

## Create an application to send events to eventstream


With the **event hub compatible connection string** readily available in the Custom App source, you can proceed to create an application that sends events to your eventstream. In this specific example, the application simulates 10 sensor devices transmitting temperature and humidity data nearly every second.

1. Open your coding editor, such as [Visual Studio Code](https://code.visualstudio.com)
2. Create a file called ***sendtoes.js***, and past the following code into it:

   In the code, replace the following placeholders with the real values in the **Connection string-primary key** or **Connection string-secondary key**:

   For example:
   *`Endpoint=sb://eventstream-xxxxxxxx.servicebus.windows.net/;SharedAccessKeyName=key_xxxxxxxx;SharedAccessKey=xxxxxxxx;EntityPath=es_xxxxxxxx`*

   :::image type="content" source="./media/stream-real-time-events-from-customapp-to-kusto/connection-string-example.png" alt-text="Screenshot showing the connection string example." lightbox="./media/stream-real-time-events-from-customapp-to-kusto/connection-string-example.png" :::

   * `CONNECTION STRING`: the string highlighted in yellow in above example, which is
      "*`Endpoint=sb://eventstream-xxxxxxxx.servicebus.windows.net/;SharedAccessKeyName=key_xxxxx;SharedAccessKey=xxxxxxxx`*"
   * `ENTITY NAME`: the string highlighted in blue after "EntityPath=" in above example, which is "*`es_xxxxxxxx`*"

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
        const producer = new EventHubProducerClient(connectionString, eventHubName);
        
        // There are 10 devices. They are sending events every second nearly. So, there are 10 events within one batch.
        // The event counts per batch. For this case, it is the sensor device count.
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

3. To run this script, you need to install the required packages. Open your PowerShell command prompt, navigate to the same folder as ***sendtoes.js*** and execute the following commands:

   ```Powershell
   npm install @azure/event-hubs
   npm install moment
   ```

4. Run `node sendtoes.js` in a PowerShell command prompt to execute this file. The window should display messages about sending events.

    ```Powershell
    C:\wa>node sendtoes.js
    2023/06/12 20:35:39 [Send events to Fabric Eventstream]: batch#0 (10 events) has been sent to eventstream
    2023/06/12 20:35:41 [Send events to Fabric Eventstream]: batch#1 (10 events) has been sent to eventstream
    2023/06/12 20:35:42 [Send events to Fabric Eventstream]: batch#2 (10 events) has been sent to eventstream
    2023/06/12 20:35:44 [Send events to Fabric Eventstream]: batch#3 (10 events) has been sent to eventstream
    2023/06/12 20:35:45 [Send events to Fabric Eventstream]: batch#4 (10 events) has been sent to eventstream
    2023/06/12 20:35:47 [Send events to Fabric Eventstream]: All 5 batches have been sent to eventstream
    ```

5. Go to your eventstream main editor, and select your eventstream in the middle and then **Data preview** tab in the bottom pane to view the data streamed into your eventstream.

   :::image type="content" source="./media/stream-real-time-events-from-customapp-to-kusto/eventstream-data-preview.png" alt-text="Screenshot showing the eventstream data preview." lightbox="./media/stream-real-time-events-from-customapp-to-kusto/eventstream-data-preview.png" :::

   You can also view the data metrics to confirm if the data has been streamed into this eventstream by selecting **Data insights** tab.

   :::image type="content" source="./media/stream-real-time-events-from-customapp-to-kusto/eventstream-data-insights.png" alt-text="Screenshot showing the eventstream data insights." lightbox="./media/stream-real-time-events-from-customapp-to-kusto/eventstream-data-insights.png" :::


## Add a KQL Database destination to the eventstream

While the custom application is streaming events into your eventstream, you can add and configure the **KQL Database** destination to receive the events from your eventstream. Follow the following steps to add the **KQL Database** destination.

1. Select **New destination** on the ribbon or "**+**" in the main editor canvas and then select **KQL Database**.  

2. Enter a name for the eventstream destination, fill in the information about your KQL database.

   :::image type="content" source="./media/stream-real-time-events-from-customapp-to-kusto/kql-database-destination-adding.png" alt-text="Screenshot showing the kql-database destination configuration." lightbox="./media/stream-real-time-events-from-customapp-to-kusto/kql-database-destination-adding.png" :::

3. Select **Add and configure** to bring out the configuration wizard to land the data into KQL database. Give the KQL table a name and select **Next: Source**:

   :::image type="content" source="./media/stream-real-time-events-from-customapp-to-kusto/kql-wizard-tbl-name.png" alt-text="Screenshot showing the kql wizard table name configuration." lightbox="./media/stream-real-time-events-from-customapp-to-kusto/kql-wizard-tbl-name.png" :::

4. Check the source that should be your eventstream, then select **Next: Schema**:

   :::image type="content" source="./media/stream-real-time-events-from-customapp-to-kusto/kql-wizard-source.png" alt-text="Screenshot showing the kql wizard source configuration." lightbox="./media/stream-real-time-events-from-customapp-to-kusto/kql-wizard-source.png" :::

5. On the schema page, Select **JSON** as the data format, and you're able to preview the data on the right side. If the data type doesn't meet your expectations, you can modify it by clicking the arrow in the table header. Additionally, you have the flexibility to add or remove columns based on your requirements.

   :::image type="content" source="./media/stream-real-time-events-from-customapp-to-kusto/kql-wizard-tbl-schema.png" alt-text="Screenshot showing the kql wizard table schema configuration." lightbox="./media/stream-real-time-events-from-customapp-to-kusto/kql-wizard-tbl-schema.png" :::

6. Select **Next: Summary** to proceed to the next page, where you can review the configuration and status summary. If everything appears to be in order, select **Done** to finalize the configuration, and the event data start flowing into your KQL database.

## Verify data in the KQL database

To verify the event data in KQL database, open **citytempdb** KQL database by selecting **Open item** in the Information tab of KQL database destination, then select table **tempdatatbl** -> **Query table** -> **Show any 100 records** to view its data.

:::image type="content" source="./media/stream-real-time-events-from-customapp-to-kusto/kql-table-top100-menu.png" alt-text="Screenshot showing the kql table top100 menu." lightbox="./media/stream-real-time-events-from-customapp-to-kusto/kql-table-top100-menu.png" :::

You find the data listed in the bottom section.

:::image type="content" source="./media/stream-real-time-events-from-customapp-to-kusto/kql-table-top100.png" alt-text="Screenshot showing the kql table top100." lightbox="./media/stream-real-time-events-from-customapp-to-kusto/kql-table-top100.png" :::

## Build near real-time Power BI report with the events data ingested in the KQL database

Once the data is ingested into your KQL database, you can analyze it according to your specific needs. For example, if you want to track the temperature and humidity trends over the last 2 hours in near real-time, you can start by writing a KQL query to retrieve this data. Afterwards, you can visualize the results in a Power BI report with autorefresh enabled.

1. In KQL query windows when showing any 100 records, modify the query as follows:

   ```kusto
   // Use 'take' to view a sample number of records in the table and check the data.
   tempdatatbl
   | where entryTime > now(-2h)
   | summarize ptemperature = avg(temperature), phumidity = avg(humidity) by bin(entryTime, 1s)
   ```

   > [!NOTE]
   > Using *avg* operator due to ten sensor devices emitting data every seconds.


2. Select **Build Power BI report** to create your report. Select the ***temperature***, ***humidity*** and ***entryTime*** to monitor these data. After the report configuration is done, select **File** -> **Save** to save this report to your workspace.

   :::image type="content" source="./media/stream-real-time-events-from-customapp-to-kusto/kql-query-pbi-report.png" alt-text="Screenshot showing the Power BI report creation from kql." lightbox="./media/stream-real-time-events-from-customapp-to-kusto/kql-query-pbi-report.png" :::

3. To get the data autorefreshed, select **Edit** button in the Power BI report. Then navigate to **Format page** under **Visualizations**, select **Page refresh** to set the refresh interval.

   > [!NOTE]
   > The minimal refresh interval is controlled by admin interval.

   :::image type="content" source="./media/stream-real-time-events-from-customapp-to-kusto/power-bi-report-auto-refresh.png" alt-text="Screenshot showing how to enable auto refresh." lightbox="./media/stream-real-time-events-from-customapp-to-kusto/power-bi-report-auto-refresh.png" :::


## Next steps

In this tutorial, you have learned how to stream real-time events from your own application to Microsoft Fabric KQL Database and use the KQL query dataset to create the near real-time Power BI report, enabling you to visualize business insights from your event data. If you're interested in discovering more advanced functionalities for working with Fabric event streams, you may find the following resources helpful.

* [Introduction to Microsoft Fabric event streams](./overview.md)
* [Create and manage an eventstream in Microsoft Fabric](./create-manage-an-eventstream.md)
* [Add and manage eventstream sources](./add-manage-eventstream-sources.md)
* [Add and manage eventstream destinations](./add-manage-eventstream-destinations.md)
* [Process event data with event processor editor](./process-events-using-event-processor-editor.md)
* [Ingest, filter, and transform real-time events and send them in Delta Lake format to Microsoft Fabric Lakehouse](./transform-and-stream-real-time-events-to-lakehouse.md)
