---
title: Azure Event Hubs connector for Fabric eventstreams
description: This include file has the common content for configuring an Azure Event Hubs connector for Fabric eventstreams and real-time hub.
ms.reviewer: xujiang1
ms.topic: include
ms.custom: sfi-image-nochange
ms.date: 11/18/2024
---

::: zone pivot="basic-features"  

1. On the **Configure connection settings** page, confirm that **Basic** is selected for the feature level, and then select **New connection**.

    :::image type="content" source="./media/azure-event-hubs-source-connector/new-connection-button.png" alt-text="Screenshot that shows the page for configuring a connection setting, with the link for a new connection highlighted." lightbox="./media/azure-event-hubs-source-connector/new-connection-button.png":::

    If there's an existing connection to your event hub, select that existing connection. Then, move on to configuring the data format in the following steps.

    :::image type="content" source="./media/azure-event-hubs-source-connector/existing-connection.png" alt-text="Screenshot that shows the Connect page with an existing connection to an Azure event hub." lightbox="./media/azure-event-hubs-source-connector/existing-connection.png":::

1. In the **Connection settings** section, follow these steps:

    1. Enter the name of the Event Hubs namespace.
    1. Enter the name of the event hub.

    :::image type="content" source="./media/azure-event-hubs-source-connector/select-namespace-event-hub.png" alt-text="Screenshot that shows the connection settings with Event Hubs namespace and the event hub specified." lightbox="./media/azure-event-hubs-source-connector/select-namespace-event-hub.png":::

1. In the **Connection credentials** section, follow these steps:

    1. For **Connection name**, enter a name for the connection to the event hub.
    1. For **Authentication kind**, confirm that **Shared Access Key** is selected.
    1. For **Shared Access Key Name**, enter the name of the shared access key. For instructions on getting an access key, see [Get an Azure Event Hubs connection string](/azure/event-hubs/event-hubs-get-connection-string#azure-portal).
    1. For **Shared Access Key**, enter the value of the shared access key.
    1. Select **Connect**.

    :::image type="content" source="./media/azure-event-hubs-source-connector/connect-page-1.png" alt-text="Screenshot that shows entered credentials for an Azure Event Hubs connector." lightbox="./media/azure-event-hubs-source-connector/connect-page-1.png":::

1. For **Consumer group**, enter the name of the consumer group. The default consumer group for the event hub is **$Default**.

1. For **Data format**, select a data format for the incoming real-time events that you want to get from your Azure event hub. You can select from JSON, Avro, and CSV (with header) data formats.  

    :::image type="content" source="./media/azure-event-hubs-source-connector/consumer-group.png" alt-text="Screenshot that shows the area for entering a consumer group and data format." lightbox="./media/azure-event-hubs-source-connector/consumer-group.png":::

1. On the **Source details** pane to the right, select the pencil icon next to the source name, and then enter a name for the source. This step is optional.

    :::image type="content" source="./media/azure-event-hubs-source-connector/source-name.png" alt-text="Screenshot that shows the pencil icon for the source name on the pane for source details." lightbox="./media/azure-event-hubs-source-connector/source-name.png":::

1. Select **Next** at the bottom of the page.

    :::image type="content" source="./media/azure-event-hubs-source-connector/connect-page-2.png" alt-text="Screenshot that shows the Next button on the page for configuring connection settings." lightbox="./media/azure-event-hubs-source-connector/connect-page-2.png":::

1. On the **Review + connect** page, review the settings, and then select **Add**.

    :::image type="content" source="./media/azure-event-hubs-source-connector/review-create-page.png" alt-text="Screenshot that shows the page for reviewing settings and creating an Azure Event Hubs connector." lightbox="./media/azure-event-hubs-source-connector/review-create-page.png":::

::: zone-end

::: zone pivot="extended-features"

1. On the **Configure connection settings** page, for **Choose feature level**, select **Extended features**.

    :::image type="content" source="./media/azure-event-hubs-source-connector/extended-connect.png" alt-text="Screenshot that shows the page for configuring connection settings, with the option for extended features selected." lightbox="./media/azure-event-hubs-source-connector/extended-connect.png":::

    If there's an existing connection to your event hub, select that existing connection. Then, move on to configuring the data format in the following steps.

1. In the **Connection settings** section, follow these steps:

    1. Enter the name of the Event Hubs namespace.
    1. Enter the name of the event hub.

        :::image type="content" source="./media/azure-event-hubs-source-connector/select-namespace-event-hub.png" alt-text="Screenshot that shows the connection settings with the Event Hubs namespace and the event hub specified." lightbox="./media/azure-event-hubs-source-connector/select-namespace-event-hub.png":::

1. In the **Connection credentials** section, follow these steps:

    1. For **Connection name**, enter a name for the connection to the event hub.
    1. For **Authentication kind**, confirm that **Shared Access Key** is selected.
    1. For **Shared Access Key Name**, enter the name of the shared access key. For instructions on getting an access key, see [Get an Azure Event Hubs connection string](/azure/event-hubs/event-hubs-get-connection-string#azure-portal).
    1. For **Shared Access Key**, enter the value of the shared access key.
    1. Select **Connect**.

        :::image type="content" source="./media/azure-event-hubs-source-connector/connect-page-1.png" alt-text="Screenshot that shows entered credentials for an Event Hubs connector." lightbox="./media/azure-event-hubs-source-connector/connect-page-1.png":::

1. For **Consumer group**, enter the name of the consumer group. The default consumer group for the event hub is **$Default**.

    :::image type="content" source="./media/azure-event-hubs-source-connector/extended-consumer-group.png" alt-text="Screenshot that shows the area for entering a consumer group for extended features." lightbox="./media/azure-event-hubs-source-connector/extended-consumer-group.png":::

1. On the **Source details** pane to the right, select the pencil icon next to the source name, and then enter a name for the source. This step is optional.

    :::image type="content" source="./media/azure-event-hubs-source-connector/extended-source-name.png" alt-text="Screenshot that shows the pencil icon for the source name on the pane for source details, with the option for extended features selected." lightbox="./media/azure-event-hubs-source-connector/extended-source-name.png":::

1. Select **Next** at the bottom of the page.

1. On the **Schema handling** page, you must provide rules to handle events received from the selected event hub, so that the eventstream can apply them correctly. The mapping rules depend on how you model the events.

    If you have one schema that governs all of the events, select **Fixed schema**.

    If you have multiple schemas that represent the various incoming events, you can define matching rules to apply your schemas. To choose this mode, select **Dynamic schema via headers** option. Then, specify the rules by using header/value pairs to select each schema. The header is a custom Kafka header property that's part of the event metadata. The value is the expected value for that property.

    :::image type="content" source="./media/azure-event-hubs-source-connector/extended-schema-handling-page.png" alt-text="Screenshot that shows the page for schema handling, with the option for extended features selected." lightbox="./media/azure-event-hubs-source-connector/extended-schema-handling-page.png":::

1. Choose schemas by selecting the **Add more schema(s)** dropdown menu and then choosing one or more existing schemas from the event schema registry. If you don't have schemas to choose from, you can create new schemas from this view. To learn how to define a new event schema, see [Create and manage event schemas in schema sets](../../schema-sets/create-manage-event-schemas.md).

    :::image type="content" source="./media/azure-event-hubs-source-connector/extended-fixed-schema-option.png" alt-text="Screenshot that shows the area for adding schemas, with the fixed schema option selected." lightbox="./media/azure-event-hubs-source-connector/extended-fixed-schema-option.png":::

    If you selected the **Choose from event schema registry** option, the **Associate an event schema** pane appears. Select one or more schemas from the registry, depending on your schema matching mode, and then select **Choose** at the bottom of the pane.

    :::image type="content" source="./media/azure-event-hubs-source-connector/extended-associate-event-schema.png" alt-text="Screenshot that shows the pane for associating an event schema." lightbox="./media/azure-event-hubs-source-connector/extended-associate-event-schema.png":::

1. If you selected the **Fixed schema** option, you don't need to provide any more rules to match the schema. You can continue to the next step.

   If you selected the **Dynamic schema via headers** option, specify the Kafka header property and the expected value that maps to the schema. Add more schemas and specify different header properties and/or different values to map to those schemas.

    > [!NOTE]
    > When you define the mapping rules, each value of the header *must* be unique. If you try to reuse a schema, you see a warning message indicating that you might break existing streams. As long as the mapping rules are the same, you can reuse a schema. If this limitation affects your use, reach out to your Microsoft representative to share your feedback. We're actively working on removing this limitation.

    :::image type="content" source="./media/azure-event-hubs-source-connector/extended-dynamic-schema-property-value.png" alt-text="Screenshot that shows a property and a value mapped to a schema." lightbox="./media/azure-event-hubs-source-connector/extended-dynamic-schema-property-value.png":::

1. After schemas for all expected events are mapped, select **Next** at the bottom of the **Schema handling** page.

    :::image type="content" source="./media/azure-event-hubs-source-connector/extended-schema-handling.png" alt-text="Screenshot that shows the Next button on the page for schema handling." lightbox="./media/azure-event-hubs-source-connector/extended-schema-handling.png":::

1. On the **Review + connect** page, review the settings, and then select **Connect**.

    :::image type="content" source="./media/azure-event-hubs-source-connector/extended-review-create-page.png" alt-text="Screenshot that shows the page for reviewing settings and creating an Azure Event Hubs connector when the extended features are enabled." lightbox="./media/azure-event-hubs-source-connector/extended-review-create-page.png":::

1. On the **Review + connect** page, select **Add**.

    :::image type="content" source="./media/azure-event-hubs-source-connector/extended-review-create-success.png" alt-text="Screenshot that shows the page for reviewing settings and creating a connector after the successful creation of resources." lightbox="./media/azure-event-hubs-source-connector/extended-review-create-page.png":::
::: zone-end

