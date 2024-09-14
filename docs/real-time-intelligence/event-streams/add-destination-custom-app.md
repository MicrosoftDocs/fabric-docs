---
title: Add an custom endpoint destination to an eventstream
description: Learn how to add a custom app or endpoint destination to an eventstream for consuming real-time events with multiple protocols, like the popular Apache Kafka protocol.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.custom:
  - build-2024
ms.date: 05/21/2024
ms.search.form: Source and Destination
zone_pivot_group_filename: real-time-intelligence/event-streams/zone-pivot-groups.json
zone_pivot_groups: event-streams-standard-enhanced
---

# Add a custom endpoint destination to an eventstream

If you want to connect your own application with an eventstream, you can add a custom endpoint (i.e., Custom App in standard capability) destination. Then you can consume real-time events from the eventstream to your own application with the connection endpoint exposed on the custom endpoint (i.e., Custom App in standard capability). Furthermore, with the Apache Kafka protocol available as an option for custom endpoints (i.e., Custom App in standard capability), you can consume real-time events using the Apache Kafka protocol. This article shows you how to add a custom endpoint (i.e., Custom App in standard capability) destination to an eventstream in Microsoft Fabric event streams.

[!INCLUDE [select-view](./includes/select-view.md)]

::: zone pivot="enhanced-capabilities"  

## Prerequisites  
Before you start, you must complete the following prerequisites:  

- Get access to a premium workspace with Contributor or above permissions where your eventstream is located.

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]

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

## Get endpoint details in Details pane to consume events

The **Details** pane has three protocol tabs: **Event Hub**, **AMQP**, and **Kafka**. Each protocol tab has three pages: **Basics**, **Keys**, and **Sample code** which offer the endpoint details with the corresponding protocol for connecting.

**Basic** shows the name, description, type, and status of your custom endpoint.

<img src="media\add-destination-custom-app-enhanced\details-basic.png" alt="[A screenshot showing the basic tab in the Details pane of the eventstream Live view.]" width="900" />


**Keys** and **Sample code** pages provide you with the connection keys information and the sample code with the corresponding keys embedded that you can use to stream the events to your eventstream. The Keys and Sample code information varies by protocol.

### Event hub

The **Keys** in the Event hub protocol format contain information related to an event hub connection string, including the **Event hub name**, **Shared access key name**, **Primary key**, and **Connection string-primary key**. The Event hub format is the default for the connection string and works with Azure Event Hubs SDK. This format allows you to connect to your eventstream via the Event Hubs protocol.
The following example shows what the connection string looks like in **Event hub** format:

*Endpoint=sb://eventstream-xxxxxxxx.servicebus.windows.net/;SharedAccessKeyName=key_xxxxxxxx;SharedAccessKey=xxxxxxxx;EntityPath=es_xxxxxxx*

<img src="media\add-destination-custom-app-enhanced\eventhub-keys.png" alt="[A screenshot showing the Event Hub keys in the Details pane of the eventstream Live view.]" width="900" />

The **Sample code** page in Event Hub tab offers ready-to-use code with the required connection keys information in Event hub included. Simply copy and paste it into your application for use.

<img src="media\add-destination-custom-app-enhanced\eventhub-sample-code.png" alt="[A screenshot showing the Event Hub Sample code in the Details pane of the eventstream Live view.]" width="900" />

### Kafka

The Kafka format is compatible with the Apache Kafka protocol, which is a popular distributed streaming platform that supports high-throughput and low-latency data processing. You can use the **Keys** and **Sample code** in Kafka protocol format to connect to eventstream and consume the events.

<img src="media\add-destination-custom-app-enhanced\kafka-keys.png" alt="[A screenshot showing the Kafka keys in the Details pane of the eventstream Live view.]" width="900" />

The **Sample code** page in Kafka tab provides you with ready-made code, including the necessary connection keys in Kafka format. Simply copy it for your use.

<img src="media\add-destination-custom-app-enhanced\kafka-sample-code.png" alt="[A screenshot showing the Kafka Sample code in the Details pane of the eventstream Live view.]" width="900" />

### AMQP

The **AMQP** format is compatible with the AMQP 1.0 protocol, which is a standard messaging protocol that supports interoperability between different platforms and languages. You can use this format to connect to your eventstream using the AMQP protocol.

<img src="media\add-destination-custom-app-enhanced\amqp-keys.png" alt="[A screenshot showing the AMQP keys in the Details pane of the eventstream Live view.]" width="900" />

The **Sample code** page in AMQP tab also provides you with the ready-to-use code with connection keys information in AMQP format.

<img src="media\add-destination-custom-app-enhanced\amqp-sample-code.png" alt="[A screenshot showing the AMQP Sample code in the Details pane of the eventstream Live view.]" width="900" />

You can choose the protocol format that suits your application needs and preferences and copy and paste the connection string into your application. You can also refer to or copy the sample code that we provide in the Sample code tab, which shows how to send or receive events using different protocols.

## Related content
To learn how to add other destinations to an eventstream, see the following articles:     

- [Derived stream](add-destination-derived-stream.md)    
- [KQL Database](add-destination-kql-database.md)   
- [Lakehouse](add-destination-lakehouse.md)
- [Reflex](add-destination-reflex.md)

::: zone-end

::: zone pivot="standard-capabilities"

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

## Get endpoint details in Details pane to consume events

The **Details** pane has three protocol tabs: **Event Hub**, **AMQP**, and **Kafka**. Each protocol tab has three pages: **Basics**, **Keys**, and **Sample code** which offer the endpoint details with the corresponding protocol for connecting.

**Basic** shows the name, description, type, and status of your custom app.

<img src="media\add-destination-custom-app-enhanced\customapp-details-basic.png" alt="[A screenshot showing the customapp basic tab in the Details pane of the eventstream.]" width="900" />


**Keys** and **Sample code** pages provide you with the connection keys information and the sample code with the corresponding keys embedded that you can use to stream the events to your eventstream. The Keys and Sample code information varies by protocol.

### Event hub

The **Keys** in the Event hub protocol format contain information related to an event hub connection string, including the **Event hub name**, **Shared access key name**, **Primary key**, and **Connection string-primary key**. The Event hub format is the default for the connection string and works with Azure Event Hubs SDK. This format allows you to connect to your eventstream via the Event Hubs protocol.
The following example shows what the connection string looks like in **Event hub** format:

*Endpoint=sb://eventstream-xxxxxxxx.servicebus.windows.net/;SharedAccessKeyName=key_xxxxxxxx;SharedAccessKey=xxxxxxxx;EntityPath=es_xxxxxxx*

<img src="media\add-destination-custom-app-enhanced\eventhub-keys.png" alt="[A screenshot showing the Event Hub keys in the Details pane of the eventstream.]" width="900" />

The **Sample code** page in Event Hub tab offers ready-to-use code with the required connection keys information in Event hub included. Simply copy and paste it into your application for use.

<img src="media\add-destination-custom-app-enhanced\eventhub-sample-code.png" alt="[A screenshot showing the Event Hub Sample code in the Details pane of the eventstream.]" width="900" />

### Kafka

The Kafka format is compatible with the Apache Kafka protocol, which is a popular distributed streaming platform that supports high-throughput and low-latency data processing. You can use the **Keys** and **Sample code** in Kafka protocol format to connect to eventstream and consume the events.

<img src="media\add-destination-custom-app-enhanced\kafka-keys.png" alt="[A screenshot showing the Kafka keys in the Details pane of the eventstream.]" width="900" />

The **Sample code** page in Kafka tab provides you with ready-made code, including the necessary connection keys in Kafka format. Simply copy it for your use.

<img src="media\add-destination-custom-app-enhanced\kafka-sample-code.png" alt="[A screenshot showing the Kafka Sample code in the Details pane of the eventstream.]" width="900" />

### AMQP

The **AMQP** format is compatible with the AMQP 1.0 protocol, which is a standard messaging protocol that supports interoperability between different platforms and languages. You can use this format to connect to your eventstream using the AMQP protocol.

<img src="media\add-destination-custom-app-enhanced\amqp-keys.png" alt="[A screenshot showing the AMQP keys in the Details pane of the eventstream.]" width="900" />

The **Sample code** page in AMQP tab also provides you with the ready-to-use code with connection keys information in AMQP format.

<img src="media\add-destination-custom-app-enhanced\amqp-sample-code.png" alt="[A screenshot showing the AMQP Sample code in the Details pane of the eventstream.]" width="900" />

You can choose the protocol format that suits your application needs and preferences and copy and paste the connection string into your application. You can also refer to or copy the sample code that we provide in the Sample code tab, which shows how to send or receive events using different protocols.

## Manage a destination

**Edit/remove**: You can edit or remove an eventstream destination either through the navigation pane or canvas.

When you select **Edit**, the edit pane opens in the right side of the main editor. You can modify the configuration as you wish, including the event transformation logic through the event processor editor.

:::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-edit-deletion.png" alt-text="Screenshot showing where to select the modify and delete options for destinations on the canvas." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-edit-deletion.png" :::


## Related content
To learn how to add other destinations to an eventstream, see the following articles:     

- [KQL Database](add-destination-kql-database.md)   
- [Lakehouse](add-destination-lakehouse.md)
- [Reflex](add-destination-reflex.md)

::: zone-end
