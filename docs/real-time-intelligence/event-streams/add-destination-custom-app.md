---
title: Add a custom app destination to an eventstream
description: Learn how to add a custom app or endpoint destination to an eventstream.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.date: 05/03/2024
ms.search.form: Source and Destination
---

# Add a custom app destination to an eventstream

This article shows you how to add a custom app destination to an eventstream in Microsoft Fabric event streams.

If you want to use enhanced capabilities that are in preview, see the content in the **Enhanced capabilities** tab. Otherwise, use the content in the **Standard capabilities** tab. For information about the enhanced capabilities that are in preview, see [Enhanced capabilities](new-capabilities.md).

# [Enhanced capabilities (Preview)](#tab/enhancedcapabilities)

## Prerequisites  
Before you start, you must complete the following prerequisites:  

- Get access to a premium workspace with Contributor or above permissions where your eventstream is located.  

## Add a custom endpoint as a destination  
If you want to route event data to your app, you can add a custom endpoint as your eventstream destination. Follow these steps to add a custom endpoint destination: 

1. If you are in the **live view**, switch to the edit mode by selecting **Edit** on the ribbon. 

    :::image type="content" source="./media/add-destination-custom-app-enhanced/switch-to-edit-mode.png" alt-text="Screenshot that shows the Edit button that lets you switch to the edit mode." lightbox="./media/add-destination-custom-app-enhanced/switch-to-edit-mode.png":::
1. In the edit mode, add a custom endpoint destination in one of the following ways: 
    - Select **Add destination** on the ribbon, then select **Custom endpoint**, and connect it to your default stream or derived stream.

        :::image type="content" source="./media/add-destination-custom-app-enhanced/add-destination-custom-endpoint-menu.png" alt-text="Screenshot that shows the selection of Custom endpoint menu on the ribbon." lightbox="./media/add-destination-custom-app-enhanced/add-destination-custom-endpoint-menu.png"::: 
    - In the editor, select **Transform events or add destination**, and then select **Custom endpoint**. 
    
        :::image type="content" source="./media/add-destination-custom-app-enhanced/transform-custom-endpoint-menu.png" alt-text="Screenshot that shows the selection of Custom endpoint menu in the editor." lightbox="./media/add-destination-custom-app-enhanced/transform-custom-endpoint-menu.png":::                
1. Enter a destination **name** for the custom endpoint, and select **Save**. 

    :::image type="content" source="./media/add-destination-custom-app-enhanced/custom-app-name.png" alt-text="Screenshot that shows the popup to enter the name for the custom endpoint." lightbox="./media/add-destination-custom-app-enhanced/custom-app-name.png":::    
1. Connect the default stream tile to the custom endpoint tile if there's no connection already.

    :::image type="content" source="./media/add-destination-custom-app-enhanced/connect.png" alt-text="Screenshot that shows the connection to the custom endpoint tile.":::                
1. To view the detailed information of your custom endpoint, select **Publish**. 

    :::image type="content" source="./media/add-destination-custom-app-enhanced/publish-button.png" alt-text="Screenshot that shows the selection of the Publish button." lightbox="./media/add-destination-custom-app-enhanced/publish-button.png":::                
1. In the live view, select the custom endpoint tile. Then, see the **Details** pane at the bottom of the page. For more information, see the next section. 

    :::image type="content" source="./media/add-destination-custom-app-enhanced/details-event-hub-tab.png" alt-text="Screenshot that shows the Details pane with three tabs - Event Hubs, AMQP, and Kafka." lightbox="./media/add-destination-custom-app-enhanced/details-event-hub-tab.png":::                

## Details pane
The **Details** pane has three protocol tabs: **Eventhub**, **AMQP**, and **Kafka**. Each protocol tab has three pages: **Basics**, **Keys**, and **Sample code**. 

### Basics
The **Basics** page shows the following information:

- **Name** - Name of the custom endpoint.
- **Type** - It's set to `CustomApp`.
- **Consumer group** - The Globally Unique Identifier (GUID) for a group of consumers. 
- **Status** - Status of the custom endpoint. 

### Keys 
The **Keys** page has the following common fields across the three protocols: Shared access key name, primary key, secondary key, connection string with the primary key, and connection string with the secondary key.

On the Event Hubs tab, you see the name of the event hub. On the AMQP tab, you see the entity name. On the **Kafka** tab, you see the following information: Bootstrap server, Security protocol, SASL mechanism, SASL JASS config, and topic name. 

### Sample code
Shows the sample code that you can use to receive events from the custom endpoint destination from your applications. 

### Event hub
The connection string is an Event Hubs compatible connection string, and you can use it in your application to receive events from your eventstream. The following example shows what the connection string looks like in event hub format: `Endpoint=sb://eventstream-xxxxxxxx.servicebus.windows.net/;SharedAccessKeyName=key_xxxxxxxx;SharedAccessKey=xxxxxxxx;EntityPath=es_xxxxxxxx`. 

The **Event hub** format is the default format for the connection string, and it's compatible with the Azure Event Hubs SDK. You can use this format to connect to eventstream using the Event Hubs protocol.

### AMQP

The **AMQP** format is compatible with the AMQP 1.0 protocol, which is a standard messaging protocol that supports interoperability between different platforms and languages. You can use this format to connect to eventstream using the AMQP protocol.

### Kafka
The **Kafka** format is compatible with the Apache Kafka protocol, which is a popular distributed streaming platform that supports high-throughput and low-latency data processing. You can use this format to connect to eventstream using the Kafka protocol.

You can choose the protocol format that suits your application needs and preferences, and copy and paste the connection string into your application. You can also refer to or copy the sample code that we provide in the Sample code tab, which shows how to send or receive events using different protocols.    


# [Standard capabilities](#tab/standardcapabilities)

## Prerequisites
Before you start, you must complete the following prerequisites:

- Get access to a **premium workspace** with **Contributor** or above permissions where your eventstream is located.

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]

## Add a custom app as a destination

If you want to route event data to your application, you can add a custom app as your eventstream destination. Follow these steps to add a custom app destination:

1. Select **New destination** on the ribbon or "**+**" in the main editor canvas and then select **Custom App**. The **Custom App** destination configuration screen appears.

1. Enter a destination name for the custom app and select **Add**.

   :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-custom-app-configuration.png" alt-text="Screenshot of the Custom App destination configuration screen." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-custom-app-configuration.png":::

1. After you have successfully created the custom application destination, you can switch and view the following information in the **Details** tab in the lower pane:

   :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-custom-app.png" alt-text="Screenshot showing the custom app destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-custom-app.png":::

   - **Basic**: Shows the name, description, type and status of your custom app.
   - **Keys**: Shows the connection string for your custom app, which you can copy and paste into your application.
   - **Sample code**: Shows sample code, which you can refer to or copy to push the event data to this eventstream or pull the event data from this eventstream.

   For each tab (**Basic** / **Keys** / **Sample code**), you can also switch three protocol tabs: **Eventhub**, **AMQP, and **Kafka** to access diverse protocol formats information:

   The connection string is an event hub compatible connection string, and you can use it in your application to receive events from your eventstream. The connection string has multiple protocol formats, which you can switch and select in the Keys tab. The following example shows what the connection string looks like in event hub format:

   *`Endpoint=sb://eventstream-xxxxxxxx.servicebus.windows.net/;SharedAccessKeyName=key_xxxxxxxx;SharedAccessKey=xxxxxxxx;EntityPath=es_xxxxxxxx`*

      The **Event hub** format is the default format for the connection string, and it's compatible with the Azure Event Hubs SDK. You can use this format to connect to eventstream using the Event Hubs protocol.

      :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-custom-app-detail.png" alt-text="Screenshot showing the custom app details." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-custom-app-detail.png":::

      The other two protocol formats are **AMQP** and **Kafka**, which you can select by clicking on the corresponding tabs in the Keys tab.

      The **AMQP** format is compatible with the AMQP 1.0 protocol, which is a standard messaging protocol that supports interoperability between different platforms and languages. You can use this format to connect to eventstream using the AMQP protocol.

      The **Kafka** format is compatible with the Apache Kafka protocol, which is a popular distributed streaming platform that supports high-throughput and low-latency data processing. You can use this format to connect to eventstream using the Kafka protocol.

You can choose the protocol format that suits your application needs and preferences, and copy and paste the connection string into your application. You can also refer to or copy the sample code that we provide in the Sample code tab, which shows how to send or receive events using different protocols.

## Manage a destination

**Edit/remove**: You can edit or remove an eventstream destination either through the navigation pane or canvas.

When you select **Edit**, the edit pane opens in the right side of the main editor. You can modify the configuration as you wish, including the event transformation logic through the event processor editor.

:::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-edit-deletion.png" alt-text="Screenshot showing where to select the modify and delete options for destinations on the canvas." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-edit-deletion.png" :::

---

## Related content
To learn how to add other destinations to an eventstream, see the following articles:     

- [Derived stream](add-destination-derived-stream.md)    
- [KQL Database](add-destination-kql-database-enhanced.md)   
- [Lakehouse](add-destination-lakehouse-enhanced.md)
- [Reflex](add-destination-reflex.md)

To add a destination to the eventstream, see the following articles:     

- [Route events to destinations (preview)](add-manage-eventstream-destinations-enhanced.md)     
- [Create an eventstream (preview)](create-manage-an-eventstream.md)      
