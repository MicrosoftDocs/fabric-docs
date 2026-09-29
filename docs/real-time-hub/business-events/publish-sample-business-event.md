---
title: Publish a Sample Business Event in Fabric Real-Time Hub
description: Learn how to publish a sample business event in Fabric Real-Time hub to validate an event schema, publishers, consumers, and event flow.
#customer intent: As a Fabric user, I want to publish a sample business event so that I can validate my event schema and event flow before configuring a full publisher integration.
ms.date: 08/17/2026
ms.topic: how-to
---

# Publish a sample business event in Fabric Real-Time hub

Use **Publish sample event** to send a test payload without configuring a Notebook, Eventstream, Activator, or User Data Function publisher. A sample event is a lightweight way to validate the event schema, inspect data in **Data preview**, and test delivery to configured consumers.

Use sample events for development, testing, and troubleshooting. For production workloads, configure a supported publisher that generates events from your business logic or data.

## Prerequisites

Before you start, ensure that:

- A business event exists in Real-Time hub. To create one, see [Create and manage business events](create-business-events.md).
- You have **Publish** permission for the business event. For more information, see [Manage data access for business events](manage-business-events-data-access.md).
- You know which business values you want to test. The payload must follow the current event schema.

## Open the sample event publisher

You can start from the business events list or from the details page for a specific event.

### From the business events list

1. Go to **Real-Time hub** in Microsoft Fabric.

1. Under **Subscribe to**, select **Business events**.

1. Select the business event that you want to test.

1. On the ribbon, select **Publish** > **Publish sample event**.

    :::image type="content" source="./media/publish-sample-business-event/select-publish-sample-event.png" alt-text="Screenshot of a selected business event in Real-Time hub with Publish sample event selected from the Publish menu." lightbox="./media/publish-sample-business-event/select-publish-sample-event.png":::

### From the business event details page

1. On the **Business events** page, select the name of the event that you want to test.

1. On the business event details page, select **Publish** > **Publish sample event**.

    :::image type="content" source="./media/publish-sample-business-event/publish-sample-event-details.png" alt-text="Screenshot of a business event details page with Publish sample event selected from the Publish menu." lightbox="./media/publish-sample-business-event/publish-sample-event-details.png":::

The **Add publisher** pane opens with **Sample event** selected. The event payload editor generates a JSON template from the current schema.

## Prepare the event payload

Replace the generated placeholder values with representative test data. Keep the following requirements in mind:

- Use the property names defined in the event schema.
- Provide values that match each property's data type.
- Keep required properties in the payload.
- Use valid JSON.

For example, an inventory threshold event might use the following payload:

```json
[
  {
    "store_id": "STR-727",
    "product_id": "SKU-5272",
    "current_qty": 3,
    "threshold_qty": 8
  }
]
```

You can edit the payload directly or select **Upload JSON file** to load it from a local `.json` file. Review uploaded content before publishing it.

:::image type="content" source="./media/publish-sample-business-event/sample-event-payload.png" alt-text="Screenshot of the Sample event publisher pane with a JSON payload generated from the business event schema." lightbox="./media/publish-sample-business-event/sample-event-payload.png":::

> [!IMPORTANT]
> Don't use confidential, personal, or production data in sample payloads. Use synthetic values that represent the shape and data types of a real event.

## Publish and validate the sample event

1. In the **Add publisher** pane, select **Publish**.

1. Open the business event details page.

1. Select **Data preview**.

1. Under **Publishers**, select the sample event publisher.

1. Select **Refresh**.

1. Confirm that the payload values, **Last event time**, and **Schema version** match your test.

The sample event follows the configured event flow. If consumers subscribe to the business event, use the consumer view in **Data preview** to confirm what each consumer received. For detailed guidance, see [Preview business event data](preview-business-event-data.md).

## Troubleshoot sample publishing

If you can't publish or find the sample event, check the following conditions:

- **Payload syntax**: Confirm that the payload is valid JSON.
- **Schema compatibility**: Match property names, required properties, and data types with the current event schema.
- **Schema version**: Confirm that you're testing the version shown in the event details page.
- **Permissions**: Confirm that your data access role includes **Publish** permission.
- **Preview selection**: Select the sample publisher in **Data preview**, and then select **Refresh**.
- **Consumer delivery**: If the publisher preview contains the event but a consumer preview doesn't, review the consumer subscription and filters.

## Related content

- [Tutorial: Publish and validate a sample business event](tutorial-publish-sample-business-event.md)
- [Preview business event data](preview-business-event-data.md)
- [Business Events limits](business-events-limits.md)
- [Business events concepts and terminology](business-events-concepts.md)
