---
title: Add a custom endpoint or custom app source to an eventstream
description: Learn how to add a custom endpoint or custom app source to an eventstream for sending real-time events with multiple protocols, like the Apache Kafka protocol.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 04/11/2025
ms.search.form: Source and Destination
zone_pivot_group_filename: real-time-intelligence/event-streams/zone-pivot-groups.json
zone_pivot_groups: event-hubs-capabilities
---

# Add a custom endpoint or custom app source to an eventstream

If you want to connect your own application with an eventstream, you can add a custom endpoint or a custom app as a source. Then you can send real-time events to the eventstream from your own application with the connection endpoint exposed on the custom endpoint or custom app. Also, with the Apache Kafka protocol available as an option for custom endpoints or custom apps, you can send real-time events by using the Apache Kafka protocol.

This article shows you how to add a custom endpoint source or a custom app source to an eventstream in Microsoft Fabric event streams.

## Prerequisites

Before you start, make sure you have access to the workspace where your eventstream is located. The workspace must be in **Fabric capacity** or **Trial** mode.

- **Contributor** or higher permissions are required to edit the eventstream to add a **Custom endpoint** source.
- If you want to use **Entra ID authentication** to connect your application, you need **Member** or higher permissions.

If you're using **Entra ID authentication**, you also need to make sure the managed identity of the custom endpoint has the required permissions. To do this, configure the necessary settings in the **Admin portal**:

1. Select **Settings** (gear icon) in the top-right corner.
1. Select **Admin portal** under the **Governance and insights** section.

    :::image type="content" source="./media/add-source-azure-event-grid/admin-portal-link.png" alt-text="Screenshot that shows the selection of Admin portal link in the Governance and insights section." lightbox="./media/add-source-azure-event-grid/admin-portal-link.png":::        

1. Activate the following tenant setting to grant the service principal access to Fabric APIs for creating workspaces, connections, or deployment pipelines:
    - On the **Tenant settings** page, in the **Developer settings** section, expand the **Service principal can use Fabric API** option.
    - Toggle to **Enabled**.
    - Apply to **the entire organization**.
    - Select **Apply**.

    :::image type="content" source="./media/add-source-azure-event-grid/developer-settings.png" alt-text="Screenshot that shows the developer settings." lightbox="./media/add-source-azure-event-grid/developer-settings.png":::              

1. Enable this option to access all other APIs (enabled by default for new tenants):
    - Still on the **Tenant settings** page, expand the **Allow Service principals to create and use profiles** option.
    - Toggle to **Enabled**.
    - Apply to **the entire organization**.
    - Select **Apply**.
  
[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]

::: zone pivot="basic-features"  

## Add custom endpoint data as a source
1. To add a custom endpoint source, on the get-started page, select **Use custom endpoint**. Or, if you already have a published eventstream and you want to add custom endpoint data as a source, switch to edit mode. On the ribbon, select **Add source** > **Custom endpoint**.   

   :::image type="content" border="true" source="media\add-source-custom-app-enhanced\select-custom-endpoint.png" alt-text="Screenshot of the option to use a custom endpoint.":::
1. In the **Custom endpoint** dialog, enter a name for the custom source under **Source name**, and then select **Add**.

   :::image type="content" border="true" source="media\add-source-custom-app-enhanced\add.png" alt-text="Screenshot of the dialog for adding a custom endpoint.":::
1. After you create the custom endpoint source, it's added to your eventstream on the canvas in edit mode. To implement the newly added data from the custom app source, select **Publish**.

   :::image type="content" border="true" source="media\add-source-custom-app-enhanced\edit-mode.png" alt-text="Screenshot that shows the eventstream in edit mode, with the Publish button highlighted.":::


[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]


::: zone-end

::: zone pivot="extended-features"

1. To add a custom endpoint source, on the get-started page, select **Use custom endpoint**. Or, if you already have a published eventstream and you want to add custom endpoint data as a source, switch to edit mode. On the ribbon, select **Add source** > **Custom endpoint**.   

   :::image type="content" border="true" source="media\add-source-custom-app-enhanced\select-custom-endpoint.png" alt-text="Screenshot of the option to use a custom endpoint.":::
1. When adding a custom endpoint source to an eventstream, enable schema association.

    :::image type="content" source="../schema-sets/media/use-event-schemas/enable-schema-custom-endpoint.png" alt-text="Screenshot of Custom endpoint source with an option to associate schemas." lightbox="../schema-sets/media/use-event-schemas/enable-schema-custom-endpoint.png":::

1. To associate with a new schema or an existing schema from a schema registry, select **Associate event schema** on the ribbon.

    :::image type="content" source="../schema-sets/media/use-event-schemas/associate-event-schema-button.png" alt-text="Screenshot of eventstream editor with Associate event schema button on the ribbon selected." lightbox="../schema-sets/media/use-event-schemas/associate-event-schema-button.png":::
1. To use an existing schema, select **Choose from event schema registry**, and follow these steps:
    1. On the **Associate an event schema** window, select a schema from the schema registry. You see the event data schema in the right pane. 
    1. Select **Choose** to associate the event schema with the custom endpoint. 
    
        :::image type="content" source="../schema-sets/media/use-event-schemas/associate-event-schema-custom-endpoint.png" alt-text="Screenshot of the Associate event schema window with a schema selected from the schema registry." lightbox="../schema-sets/media/use-event-schemas/associate-event-schema-custom-endpoint.png":::
    1. In the Eventstream editor, select the **eventstream** tile. In the bottom pane, switch to the **Associate schema** tab. Confirm that you see the schema associated with the eventstream.
    
        :::image type="content" source="../schema-sets/media/use-event-schemas/confirm-schema-association-custom-endpoint.png" alt-text="Screenshot of the Eventstream editor with eventstream selected and the Associated schema tab highlighted." lightbox="../schema-sets/media/use-event-schemas/confirm-schema-association-custom-endpoint.png":::        
1. Use one of the following options to create a schema. 
    - If you have a schema JSON file, select **Upload** to upload the file. For a sample file, see the [Sample schema file](create-manage-event-schemas.md#download-an-event-schema) section. 

        :::image type="content" source="./media/create-manage-event-schemas/upload-button.png" alt-text="Screenshot that shows the upload option to create a schema." lightbox="./media/create-manage-event-schemas/upload-button.png" :::
    - Start building a schema manually by selecting **Add row**. For each row, select the **field type**, **field name**, and optionally enter a **description**. 
    
        :::image type="content" source="./media/create-manage-event-schemas/build-schema.png" alt-text="Screenshot that shows the manual way of building a schema." lightbox="./media/create-manage-event-schemas/build-schema.png":::            
    
    - To build a schema by entering JSON code, select **Code editor** option as shown in the following image. If you see the message: **If you choose to use the code editor to create your schema, note that you won’t be able to switch back to the UI builder**, select **Edit**. 

        :::image type="content" source="./media/create-manage-event-schemas/code-editor-schema.png" alt-text="Screenshot that shows the code editor to build a schema." lightbox="./media/create-manage-event-schemas/code-editor-schema.png":::   

        Enter the JSON code into the editor. 

        :::image type="content" source="./media/create-manage-event-schemas/code-editor-schema-json.png" alt-text="Screenshot that shows the JSON code in the code editor to build a schema." lightbox="./media/create-manage-event-schemas/code-editor-schema-json.png":::                  


::: zone-end

## Get endpoint details on the Details pane

After you create a custom endpoint source, its data is available for visualization in the live view.

:::image type="content" border="true" source="media\add-source-custom-app-enhanced\live-view.png" alt-text="Screenshot that shows the eventstream in the live view.":::

The **Details** pane has three protocol tabs: **Event Hub**, **AMQP**, and **Kafka**. Each protocol tab has three pages: **Basic** and **SAS Key Authentication**. These pages offer the endpoint details with the corresponding protocol for connecting. 

**Basic** shows the name, type, and status of your custom endpoint.

:::image type="content" source="media\add-source-custom-app-enhanced\details-event-basic.png" alt-text="Screenshot that shows basic information on the Details pane of the eventstream live view." lightbox="media\add-source-custom-app-enhanced\details-event-basic.png":::

**SAS Key Authentication** page provides information about connection keys and also a link to the **sample code**, with the corresponding keys embedded, that you can use to stream the events to your eventstream. The information on the Keys page varies by protocol.

### Event hub

The **SAS Key Authentication** page on the **Event Hub** tab contains information related to an event hub's connection string. The information includes **Event hub name**, **Shared access key name**, **Primary key**, **Secondary key**, **Connection string-primary key**, **Connection string-secondary key**.

:::image type="content" source="media\add-source-custom-app-enhanced\details-event-keys.png" alt-text="Screenshot that shows key information on the Details pane of the eventstream.":::

The event hub format is the default for the connection string, and it works with the Azure Event Hubs SDK. This format allows you to connect to your eventstream via the Event Hubs protocol.

The following example shows what the connection string looks like in event hub format:

> *Endpoint=sb://eventstream-xxxxxxxx.servicebus.windows.net/;SharedAccessKeyName=key_xxxxxxxx;SharedAccessKey=xxxxxxxx;EntityPath=es_xxxxxxx*

If you select the **Show sample code** button, you see the ready-to-use **Java** code that includes the required information about connection keys in the event hub. Copy and paste it into your application for use.

:::image type="content" source="media\add-source-custom-app-enhanced\details-event-sample.png" alt-text="Screenshot that shows sample code on the Details pane of the eventstream live view.":::

### Advanced Message Queuing Protocol (AMQP)

The AMQP format is compatible with the AMQP 1.0 protocol, which is a standard messaging protocol that supports interoperability between various platforms and languages. You can use this format to connect to your eventstream by using the AMQP protocol.

:::image type="content" source="media\add-source-custom-app-enhanced\details-amqp-keys.png" alt-text="Screenshot that shows AMQP keys on the Details pane of the eventstream live view.":::

When you select **Show sample code** button, you see the ready-to-use Java code with connection key information in AMQP format.

:::image type="content" source="media\add-source-custom-app-enhanced\details-amqp-sample-code.png" alt-text="Screenshot that shows AMQP sample code on the Details pane of the eventstream live view.":::

<a name="kafka-enhanced-capabilities"></a>

### Kafka

The Kafka format is compatible with the Apache Kafka protocol, which is a popular distributed streaming platform that supports high-throughput and low-latency data processing. You can use the **SAS Key Authentication** information for the Kafka protocol format to connect to your eventstream and stream the events.

:::image type="content" source="media\add-source-custom-app-enhanced\details-kafka-keys.png" alt-text="Screenshot that shows Kafka keys on the Details pane of the eventstream live view.":::

When you select the **Show sample code** button, you see the ready-to-use Java code, including the necessary connection keys in Kafka format. Copy it for your use.

:::image type="content" source="media\add-source-custom-app-enhanced\details-kafka-sample-code.png" alt-text="Screenshot that shows Kafka sample code on the Details pane of the eventstream live view.":::

For a clear guide on using the custom endpoint with the Kafka protocol, refer to [this tutorial](stream-consume-events-use-kafka-endpoint.md). It provides detailed steps for streaming and consuming events using the custom endpoint with the Kafka protocol.

> [!NOTE]
> - You can choose the protocol format that suits your application needs and preferences, and then copy and paste the connection string into your application. You can also refer to or copy the **sample code**, which shows how to send or receive events by using various protocols. 
- To exit out of the sample code view, select **Hide sample code**. 


## Related content
For a list of supported sources, see [Add an event source in an eventstream](add-manage-eventstream-sources.md)
