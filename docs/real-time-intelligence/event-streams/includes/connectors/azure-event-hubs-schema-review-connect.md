---
title: Azure Event Hubs schema handling and review and connect
description: This file documents the schema handling and review and connect steps for the Azure Event Hubs connector extended features.
ms.topic: include
ms.custom: sfi-image-nochange
ms.date: 04/01/2026
---

### Schema handling page

1. On the **Schema handling** page, provide rules to handle events received from the selected event hub, so that the eventstream can apply them correctly. The mapping rules depend on how you model the events.

    If you have one schema that governs all of the events, select **Fixed schema**.

    If you have multiple schemas that represent the various incoming events, define matching rules to apply your schemas. To choose this mode, select **Dynamic schema via headers**. Then, specify the rules by using header/value pairs to select each schema. The header is a custom Kafka header property that's part of the event metadata. The value is the expected value for that property.

    :::image type="content" source="./media/azure-event-hubs-source-connector/extended-schema-handling-page.png" alt-text="Screenshot that shows the page for schema handling, with the option for extended features selected." lightbox="./media/azure-event-hubs-source-connector/extended-schema-handling-page.png":::

1. Choose schemas by selecting the **Add more schema(s)** dropdown menu and then choosing one or more existing schemas from the event schema registry. If you don't have schemas to choose from, you can create new schemas from this view. To learn how to define a new event schema, see [Create and manage event schemas in schema sets](../../../schema-sets/create-manage-event-schemas.md).

    :::image type="content" source="./media/azure-event-hubs-source-connector/extended-fixed-schema-option.png" alt-text="Screenshot that shows the area for adding schemas, with the fixed schema option selected." lightbox="./media/azure-event-hubs-source-connector/extended-fixed-schema-option.png":::

    If you selected the **Choose from event schema registry** option, the **Associate an event schema** pane appears. Select one or more schemas from the registry, depending on your schema matching mode, and then select **Choose** at the bottom of the pane.

    :::image type="content" source="./media/azure-event-hubs-source-connector/extended-associate-event-schema.png" alt-text="Screenshot that shows the pane for associating an event schema." lightbox="./media/azure-event-hubs-source-connector/extended-associate-event-schema.png":::

1. If you selected the **Fixed schema** option, you don't need to provide any more rules to match the schema. You can continue to the next step.

   If you selected the **Dynamic schema via headers** option, specify the Kafka header property and the expected value that maps to the schema. Add more schemas and specify different header properties and values to map to those schemas.

    > [!NOTE]
    > When you define the mapping rules, each value of the header *must* be unique. If you try to reuse a schema, you see a warning message indicating that you might break existing streams. As long as the mapping rules are the same, you can reuse a schema. If this limitation affects your use, reach out to your Microsoft representative to share your feedback. We're actively working on removing this limitation.

    :::image type="content" source="./media/azure-event-hubs-source-connector/extended-dynamic-schema-property-value.png" alt-text="Screenshot that shows a property and a value mapped to a schema." lightbox="./media/azure-event-hubs-source-connector/extended-dynamic-schema-property-value.png":::

1. After you map schemas for all expected events, select **Next** at the bottom of the **Schema handling** page.

    :::image type="content" source="./media/azure-event-hubs-source-connector/extended-schema-handling.png" alt-text="Screenshot that shows the Next button on the page for schema handling." lightbox="./media/azure-event-hubs-source-connector/extended-schema-handling.png":::

### Review and connect

1. On the **Review + connect** page, review the settings, and then select **Connect**.

    :::image type="content" source="./media/azure-event-hubs-source-connector/extended-review-create-page.png" alt-text="Screenshot that shows the page for reviewing settings and creating an Azure Event Hubs connector when the extended features are enabled." lightbox="./media/azure-event-hubs-source-connector/extended-review-create-page.png":::

1. On the **Review + connect** page, select **Add** (Eventstream) or **Connect** (Real-Time hub).

    :::image type="content" source="./media/azure-event-hubs-source-connector/extended-review-create-success.png" alt-text="Screenshot that shows the page for reviewing settings and creating a connector after the successful creation of resources." lightbox="./media/azure-event-hubs-source-connector/extended-review-create-page.png":::
