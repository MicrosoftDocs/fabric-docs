---
title: Add a Custom Endpoint or Custom App Source to an Eventstream
description: Learn how to add a custom endpoint or custom app source to an eventstream for sending real-time events with multiple protocols, like the Apache Kafka protocol.
ms.reviewer: zhenxilin
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 04/11/2025
ms.search.form: Source and Destination
zone_pivot_group_filename: real-time-intelligence/event-streams/zone-pivot-groups.json
zone_pivot_groups: event-hubs-capabilities
---

# Add a custom endpoint or custom app source to an eventstream

If you want to connect your own application with an eventstream, you can add a custom endpoint or a custom app as a source. Then you can send real-time events to the eventstream from your own application with the connection endpoint exposed on the custom endpoint or custom app. Also, with the Apache Kafka protocol available as an option for custom endpoints or custom apps, you can send real-time events by using the Apache Kafka protocol.

This article shows you how to add a custom endpoint source or a custom app source to an eventstream in Microsoft Fabric.

## Prerequisites

- Access to the workspace where your eventstream is located. The workspace must be in Fabric capacity or trial mode.

- Contributor or higher permissions to edit the eventstream and add a custom endpoint as a source.

### Permissions for Microsoft Entra authentication

If you want to use Microsoft Entra authentication to connect your application, you need Member or higher permissions.

You also need to make sure that the managed identity of the custom endpoint has the required permissions. Configure the settings in the admin portal:

1. In the upper-right corner, select **Settings** (gear icon).

1. Under **Governance and insights**, select **Admin portal**.

    :::image type="content" source="./media/add-source-azure-event-grid/admin-portal-link.png" alt-text="Screenshot that shows the Admin portal link in the section for governance and insights within settings." lightbox="./media/add-source-azure-event-grid/admin-portal-link.png":::

1. Activate the following tenant setting to grant the service principal access to Fabric APIs for creating workspaces, connections, or deployment pipelines:

    1. On the **Tenant settings** page, in the **Developer settings** section, expand the **Service principals can use Fabric APIs** option.
    1. Set the toggle to **Enabled**.
    1. For **Apply to**, select **The entire organization**.
    1. Select **Apply**.

    :::image type="content" source="./media/add-source-azure-event-grid/developer-settings.png" alt-text="Screenshot that shows developer settings." lightbox="./media/add-source-azure-event-grid/developer-settings.png":::

1. Enable this option to access all other APIs (enabled by default for new tenants):

    1. Still on the **Tenant settings** page, expand the **Allow Service principals to create and use profiles** option.
    1. Set the toggle to **Enabled**.
    1. For **Apply to**, select **The entire organization**.
    1. Select **Apply**.
  
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

## Add custom endpoint data as a source

1. To add a custom endpoint source, on the get-started page, select **Use custom endpoint**. Or, if you already have a published eventstream and you want to add custom endpoint data as a source, switch to edit mode. On the ribbon, select **Add source** > **Custom endpoint**.

   :::image type="content" border="true" source="media\add-source-custom-app-enhanced\select-custom-endpoint.png" alt-text="Screenshot that shows the option to use a custom endpoint.":::

1. On the **Add source** page, select **Activate** for **Schema association**, and then select **Add**.

    :::image type="content" source="media\add-source-custom-app-enhanced\enable-schema-custom-endpoint.png" alt-text="Screenshot of a custom endpoint source with an option to associate schemas." lightbox="media\add-source-custom-app-enhanced\enable-schema-custom-endpoint.png":::

1. In the editor, to associate with a new schema or an existing schema from a schema registry, select **Associate event schema** on the ribbon.

    :::image type="content" source="media\add-source-custom-app-enhanced\associate-event-schema-button.png" alt-text="Screenshot of the eventstream editor with the button for associating an event schema selected on the ribbon." lightbox="media\add-source-custom-app-enhanced\associate-event-schema-button.png":::

1. To use an existing schema, select **Choose from event schema registry**, and then follow these steps:

    1. In the **Associate an event schema** dialog, select a schema from the schema registry. The event data schema appears on the right pane.

    1. Select **Choose** to associate the event schema with the custom endpoint.

        :::image type="content" source="media\add-source-custom-app-enhanced\associate-event-schema-custom-endpoint.png" alt-text="Screenshot of the dialog for associating an event schema with a schema selected from the schema registry." lightbox="media\add-source-custom-app-enhanced\associate-event-schema-custom-endpoint.png":::

    1. In the eventstream editor, select the **eventstream** tile. On the bottom pane, switch to the **Associated schema** tab. Confirm that the schema is associated with the eventstream.

        :::image type="content" source="media\add-source-custom-app-enhanced\confirm-schema-association-custom-endpoint.png" alt-text="Screenshot of the eventstream editor with an eventstream selected and the tab for an associated schema highlighted." lightbox="media\add-source-custom-app-enhanced\confirm-schema-association-custom-endpoint.png":::

1. Use one of the following options to create a schema:

    - If you have a schema JSON file, select **Upload** to upload the file. For a sample file, see [Download an event schema](../schema-sets/create-manage-event-schemas.md#download-an-event-schema).

        :::image type="content" source="../schema-sets/media/create-manage-event-schemas/upload-button.png" alt-text="Screenshot that shows the upload option to create a schema." lightbox="../schema-sets/media/create-manage-event-schemas/upload-button.png" :::

    - Start building a schema manually by selecting **Add row**. For each row, select the field type, select the field name, and optionally enter a description.

        :::image type="content" source="../schema-sets/media/create-manage-event-schemas/build-schema.png" alt-text="Screenshot that shows the manual way of building a schema." lightbox="../schema-sets/media/create-manage-event-schemas/build-schema.png":::

    - To build a schema by entering JSON code, select the **Code editor** option. If the message **If you choose to use the code editor to create your schema, note that you won't be able to switch back to the UI builder** appears, select **Edit**.

        :::image type="content" source="../schema-sets/media/create-manage-event-schemas/code-editor-schema.png" alt-text="Screenshot that shows the code editor to build a schema." lightbox="../schema-sets/media/create-manage-event-schemas/code-editor-schema.png":::

        Enter the JSON code into the editor.

        :::image type="content" source="../schema-sets/media/create-manage-event-schemas/code-editor-schema-json.png" alt-text="Screenshot that shows JSON code in the code editor to build a schema." lightbox="../schema-sets/media/create-manage-event-schemas/code-editor-schema-json.png":::

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]

::: zone-end

## Get endpoint details on the Details pane

After you create a custom endpoint source, its data is available for visualization in the live view.

:::image type="content" border="true" source="media\add-source-custom-app-enhanced\live-view.png" alt-text="Screenshot that shows the eventstream in the live view.":::

The **Details** pane has three protocol tabs: **Event Hub**, **AMQP**, and **Kafka**. Each protocol tab has two pages that offer the endpoint details with the corresponding protocol for connecting:

- **Basic** shows the name, type, and status of your custom endpoint.

  :::image type="content" source="media\add-source-custom-app-enhanced\details-event-basic.png" alt-text="Screenshot that shows basic information on the Details pane of the eventstream live view." lightbox="media\add-source-custom-app-enhanced\details-event-basic.png":::

- **SAS Key Authentication** provides information about connection keys. It also provides a link to the sample code, with the corresponding keys embedded, that you can use to stream the events to your eventstream. The information on this page varies by protocol.

### Event hub

The **SAS Key Authentication** tab for the **Event Hub** protocol contains information related to an event hub's connection string. The information includes **Event hub name**, **Shared access key name**, **Primary key**, **Secondary key**, **Connection string-primary key**, and **Connection string-secondary key**.

:::image type="content" source="media\add-source-custom-app-enhanced\details-event-keys.png" alt-text="Screenshot that shows key information on the Details pane of the eventstream.":::

The event hub format is the default for the connection string, and it works with the Azure Event Hubs SDK. This format allows you to connect to your eventstream via the Event Hubs protocol.

The following example shows what the connection string looks like in event hub format:

> *Endpoint=sb://eventstream-xxxxxxxx.servicebus.windows.net/;SharedAccessKeyName=key_xxxxxxxx;SharedAccessKey=xxxxxxxx;EntityPath=es_xxxxxxx*

If you select the **Show sample code** button, you see the ready-to-use Java code that includes the required information about connection keys in the event hub. Copy and paste it into your application for use.

:::image type="content" source="media\add-source-custom-app-enhanced\details-event-sample.png" alt-text="Screenshot that shows the button for showing sample code on the Details pane of the eventstream live view.":::

### AMQP

The Advanced Message Queuing Protocol (AMQP) format is compatible with AMQP 1.0, which is a standard messaging protocol that supports interoperability between various platforms and languages. You can use this format to connect to your eventstream by using the AMQP protocol.

:::image type="content" source="media\add-source-custom-app-enhanced\details-amqp-keys.png" alt-text="Screenshot that shows AMQP keys on the Details pane of the eventstream live view.":::

When you select the **Show sample code** button, you see the ready-to-use Java code with connection key information in AMQP format.

:::image type="content" source="media\add-source-custom-app-enhanced\details-amqp-sample-code.png" alt-text="Screenshot that shows the button for showing AMQP sample code on the Details pane of the eventstream live view.":::

<a name="kafka-enhanced-capabilities"></a>

### Kafka

The Kafka format is compatible with the Apache Kafka protocol, which is a popular distributed streaming platform that supports high-throughput and low-latency data processing. You can use the **SAS Key Authentication** information for the Kafka protocol format to connect to your eventstream and stream the events.

:::image type="content" source="media\add-source-custom-app-enhanced\details-kafka-keys.png" alt-text="Screenshot that shows Kafka keys on the Details pane of the eventstream live view.":::

When you select the **Show sample code** button, you see the ready-to-use Java code, including the necessary connection keys in Kafka format. Copy it for your use.

:::image type="content" source="media\add-source-custom-app-enhanced\details-kafka-sample-code.png" alt-text="Screenshot that shows the button for Kafka sample code on the Details pane of the eventstream live view.":::

For a clear guide on using the custom endpoint with the Kafka protocol, refer to [this tutorial](stream-consume-events-use-kafka-endpoint.md). It provides detailed steps for streaming and consuming events.

> [!NOTE]
>
> - You can choose the protocol format that suits your application needs and preferences, and then copy and paste the connection string into your application. You can also refer to or copy the sample code, which shows how to send or receive events by using various protocols.
> - To close the sample code view, select **Hide sample code**.

::: zone pivot="basic-features"

::: zone-end

::: zone pivot="extended-features"

[!INCLUDE [configure-destintions-schema-enabled-sources](./includes/configure-destinations-schema-enabled-sources.md)]

::: zone-end

## Related content

- For a list of supported sources, see [Add and manage an event source in an eventstream](add-manage-eventstream-sources.md).


