---
title: Add a custom endpoint or custom app destination to an eventstream
description: Learn how to add a custom endpoint or custom app destination to an eventstream for consuming real-time events with multiple protocols, like the Apache Kafka protocol.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 11/18/2024
ms.search.form: Source and Destination
---

# Add a custom endpoint or custom app destination to an eventstream

If you want to connect your own application with an eventstream, you can add a custom endpoint or a custom app as a destination. Then you can consume real-time events from the eventstream to your own application with the connection endpoint exposed on the custom endpoint or custom app. Also, with the Apache Kafka protocol available as an option for custom endpoints or custom apps, you can consume real-time events by using the Apache Kafka protocol.

This article shows you how to add a custom endpoint destination or a custom app destination to an eventstream in Microsoft Fabric event streams.

[!INCLUDE [select-view](./includes/select-view.md)]

## Prerequisites

Before you start, make sure you have access to the workspace where your eventstream is located. The workspace must have a **Fabric** capacity or **Fabric Trial** workspace type.

- **Contributor** or higher permissions are required to edit the eventstream to add a **Custom endpoint** destination.
- If you want to use **Entra ID authentication** to connect your application, you need **Member** or higher permissions.

If you're using **Entra ID authentication**, you also need to make sure the managed identity of the custom endpoint has the required permissions. Configure the necessary settings in the **Admin portal**:

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

## Add a custom endpoint as a destination

If you want to route event data to your app, you can add a custom endpoint as your eventstream destination:

1. If you're in the live view, switch to edit mode by selecting **Edit** on the ribbon.

    :::image type="content" source="./media/add-destination-custom-app-enhanced/switch-to-edit-mode.png" alt-text="Screenshot that shows the Edit button that lets you switch to edit mode." lightbox="./media/add-destination-custom-app-enhanced/switch-to-edit-mode.png":::

1. In edit mode, add a custom endpoint destination in one of the following ways:

    - Select **Add destination** on the ribbon, select **Custom endpoint**, and then connect the endpoint to your default stream or derived stream.

      :::image type="content" source="./media/add-destination-custom-app-enhanced/add-destination-custom-endpoint-menu.png" alt-text="Screenshot that shows the selection of a custom endpoint as a destination on the ribbon." lightbox="./media/add-destination-custom-app-enhanced/add-destination-custom-endpoint-menu.png":::

    - In the editor, select **Transform events or add destination**, and then select **Custom endpoint**.

      :::image type="content" source="./media/add-destination-custom-app-enhanced/transform-custom-endpoint-menu.png" alt-text="Screenshot that shows the selection of a custom endpoint in the editor." lightbox="./media/add-destination-custom-app-enhanced/transform-custom-endpoint-menu.png":::

1. For **Destination name**, enter a name for the custom endpoint. Then select **Save**.

    :::image type="content" source="./media/add-destination-custom-app-enhanced/custom-app-name.png" alt-text="Screenshot that shows the pane for entering a name for a custom endpoint." lightbox="./media/add-destination-custom-app-enhanced/custom-app-name.png":::

    If you're using schemas at the source, for **Input schema**, select the schema for events. This field is the extra field you fill when you enable the schema support for an eventstream. 

    :::image type="content" source="./includes/media/configure-destinations-schema-enabled-sources/extended-custom-endpoint-schema.png" alt-text="Screenshot that shows the Custom endpoint configuration page." lightbox="./includes/media/configure-destinations-schema-enabled-sources/extended-custom-endpoint-schema.png":::

1. Connect the default stream tile to the custom endpoint tile if there's no existing connection.

    :::image type="content" source="./media/add-destination-custom-app-enhanced/connect.png" alt-text="Screenshot that shows the connection to a custom endpoint tile.":::  

1. To view the detailed information of your custom endpoint, select **Publish**.

    :::image type="content" source="./media/add-destination-custom-app-enhanced/publish-button.png" alt-text="Screenshot that shows the Publish button." lightbox="./media/add-destination-custom-app-enhanced/publish-button.png":::

## Get endpoint details on the Details pane to consume events

In the **Live view**, select the custom endpoint tile. The **Details** pane that appears includes three protocol tabs: **Event Hub**, **AMQP**, and **Kafka**.

:::image type="content" source="./media/add-destination-custom-app-enhanced/details-event-hub-tab.png" alt-text="Screenshot that shows the Details pane for a custom endpoint." lightbox="./media/add-destination-custom-app-enhanced/details-event-hub-tab.png":::

Each protocol tab contains three pages: **Basic**, **SAS Key Authentication**, and **Entra ID Authentication**. These pages provide endpoint information specific to the selected protocol.

- The **Basic** page shows the name, type, and status of your custom endpoint.

    :::image type="content" source="./media/add-destination-custom-app-enhanced/details-basic.png" alt-text="Screenshot that shows basic details for a custom endpoint in the eventstream live view.":::

- **SAS Key Authentication** and **Entra ID Authentication** are two supported authentication methods for connecting to your application:
  - **SAS Key Authentication** provides the information needed to produce and consume Eventstream data using Shared Access Signature (SAS) keys.
  - **Entra ID Authentication** enables a security principal (such as a user or service principal) to consume Eventstream data using Microsoft Entra ID authentication.

For steps to use **Entra ID Authentication**, see [Enable Entra ID Authentication for an Application in Eventstream](custom-endpoint-entra-id-auth.md).  
The following section describes how to connect to a custom endpoint destination using **SAS Key Authentication**.

### Event hub

The **Keys** page on the **Event Hub** tab contains information related to an event hub's connection string. The information includes **Event hub name**, **Shared access key name**, **Primary key**, and **Connection string-primary key**.

:::image type="content" source="./media/add-destination-custom-app-enhanced/event-hub-keys.png" alt-text="Screenshot that shows event hub keys on the Details pane of the eventstream live view.":::

The event hub format is the default for the connection string, and it works with the Azure Event Hubs SDK. This format allows you to connect to your eventstream via the Event Hubs protocol.

The following example shows what the connection string looks like in event hub format:

> *Endpoint=sb://eventstream-xxxxxxxx.servicebus.windows.net/;SharedAccessKeyName=key_xxxxxxxx;SharedAccessKey=xxxxxxxx;EntityPath=es_xxxxxxx*

Select **Show sample code** button on the **Event Hub** page to get ready-to-use code that includes the required information about connection keys in the event hub. Simply copy and paste it into your application for use.

:::image type="content" source="./media/add-destination-custom-app-enhanced/event-hub-sample-code.png" alt-text="Screenshot that shows event hub sample code on the Details pane of the eventstream live view.":::

### Kafka

The Kafka format is compatible with the Apache Kafka protocol, which is a popular distributed streaming platform that supports high-throughput and low-latency data processing. You can use the **Keys** and **Sample code** information for the Kafka protocol format to connect to the eventstream and consume the events.

:::image type="content" source="./media/add-destination-custom-app-enhanced/kafka-keys.png" alt-text="Screenshot that shows Kafka keys on the Details pane of the eventstream live view.":::

Select **Show sample code** button on the **Kafka** page to get ready-made code, including the necessary connection keys in Kafka format. Simply copy it for your use.

:::image type="content" source="./media/add-destination-custom-app-enhanced/kafka-sample-code.png" alt-text="Screenshot that shows Kafka sample code on the Details pane of the eventstream live view.":::

For a clear guide on using the custom endpoint with the Kafka protocol, refer to [this tutorial](stream-consume-events-use-kafka-endpoint.md). It provides detailed steps for streaming and consuming events using the custom endpoint with the Kafka protocol.

### AMQP

The AMQP format is compatible with the AMQP 1.0 protocol, which is a standard messaging protocol that supports interoperability between various platforms and languages. You can use this format to connect to your eventstream by using the AMQP protocol.

:::image type="content" source="./media/add-destination-custom-app-enhanced/amqp-keys.png" alt-text="Screenshot that shows AMQP keys on the Details pane of the eventstream live view.":::

Select **Show sample code** button on the **AMQP** page to get provides ready-to-use code with connection key information in AMQP format.

:::image type="content" source="./media/add-destination-custom-app-enhanced/amqp-sample-code.png" alt-text="Screenshot that shows AMQP sample code on the Details pane of the eventstream live view.":::

You can choose the protocol format that suits your application needs and preferences, and then copy and paste the connection string into your application. You can also refer to or copy the sample code on the **Sample code** page, which shows how to send or receive events by using various protocols.

## Related content

To learn how to add other destinations to an eventstream, see the following articles:

- [Derived stream](add-destination-derived-stream.md)
- [KQL Database](add-destination-kql-database.md)
- [Lakehouse](add-destination-lakehouse.md)
- [Fabric [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]](add-destination-activator.md)

