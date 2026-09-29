---
title: Tutorial - Publish and Validate a Sample Business Event
description: Create an inventory business event, publish a sample JSON payload, and validate the event flow in Fabric Real-Time hub.
#customer intent: As a Fabric user, I want to publish and validate a sample business event so that I can test an event flow before connecting a production publisher.
ms.date: 08/17/2026
ms.topic: tutorial
---

# Tutorial: Publish and validate a sample business event

In this tutorial, you create an inventory event, publish a sample payload, and confirm that the event appears in **Data preview**. You can complete the workflow without creating a Notebook, Eventstream, Activator, or User Data Function publisher.

In this tutorial, you:

1. Create a business event and its schema.
1. Publish a representative sample event.
1. Validate the publisher payload and schema.
1. Optionally confirm delivery to an existing consumer.

## Prerequisites

You need:

- Access to a Microsoft Fabric workspace.
- Permission to create a business event in the workspace.
- **Publish** permission for the event schema set. The creator receives this permission through the default data access role.

## Create the inventory business event

Create a business event that represents inventory falling below its reorder threshold:

1. Go to **Real-Time hub** in Microsoft Fabric.

1. Under **Subscribe to**, select **Business events**.

1. Select **+ New business event** > **Create new schema**.

1. For the business event name, enter `Retail.Inventory.LowStockThreshold`.

1. Create an event schema set named `Inventory`.

1. Add the following properties:

    | Property | Type | Purpose |
    |---|---|---|
    | `store_id` | string | Identifies the store where stock is low. |
    | `product_id` | string | Identifies the affected product. |
    | `current_qty` | int | Contains the current inventory quantity. |
    | `threshold_qty` | int | Contains the quantity that triggers replenishment. |

1. Select **Next**, review the configuration, and then select **Create**.

For more information about schema creation and supported options, see [Create and manage business events](create-business-events.md).

## Open the sample event publisher

1. On the **Business events** page, search for `Retail.Inventory.LowStockThreshold`.

1. Select the event.

1. Select **Publish** > **Publish sample event**.

    :::image type="content" source="./media/publish-sample-business-event/select-publish-sample-event.png" alt-text="Screenshot of the Retail.Inventory.LowStockThreshold business event selected with Publish sample event selected from the Publish menu." lightbox="./media/publish-sample-business-event/select-publish-sample-event.png":::

You can also publish from within the business event:

1. Select the name `Retail.Inventory.LowStockThreshold` to open its details page.

1. Select **Publish** > **Publish sample event**.

    :::image type="content" source="./media/publish-sample-business-event/publish-sample-event-details.png" alt-text="Screenshot of the Retail.Inventory.LowStockThreshold details page with Publish sample event selected from the Publish menu." lightbox="./media/publish-sample-business-event/publish-sample-event-details.png":::

The **Add publisher** pane creates a payload template from the schema. The generated properties and placeholder values help you build a compatible test event.

## Add the sample payload

Replace the generated payload with the following JSON:

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

This payload represents a store with three units in stock when the replenishment threshold is eight.

You can paste the JSON into the editor or save it in a `.json` file and select **Upload JSON file**.

:::image type="content" source="./media/publish-sample-business-event/sample-event-payload.png" alt-text="Screenshot of the Sample event publisher pane showing the generated inventory event payload and the Publish button." lightbox="./media/publish-sample-business-event/sample-event-payload.png":::

Select **Publish** to send the sample event.

## Validate the published event

1. Open `Retail.Inventory.LowStockThreshold` from the **Business events** page.

1. Select **Data preview**.

1. Under **Publishers**, select the sample event publisher.

1. Select **Refresh**.

1. Confirm that the preview contains a row with the following values:

    | Property | Expected value |
    |---|---|
    | `store_id` | `STR-727` |
    | `product_id` | `SKU-5272` |
    | `current_qty` | `3` |
    | `threshold_qty` | `8` |

1. Confirm that **Schema version** shows `v1` and that the **Event Schema** pane displays two string fields and two integer fields.

1. Turn on **Show metadata** if you want to inspect event context such as the event time and source.

Data preview shows up to 30 recent events from the last 24 hours for each publisher or consumer. For more information about its controls and limits, see [Preview business event data](preview-business-event-data.md).

## Validate consumer delivery

If you already have a consumer for this business event:

1. In **Data preview**, select the consumer under **Consumers**.

1. Select **Refresh**.

1. Confirm that the consumer view contains the sample values.

If the event appears for the publisher but not for the consumer, review the consumer subscription, filters, and **Consume** permission.

## Clean up resources

If you created the business event only for this tutorial, return to the **Business events** page, open the ellipsis (**...**) menu for `Retail.Inventory.LowStockThreshold`, and select **Delete**. Deleting a business event is irreversible.

## Related content

- [Publish a sample business event](publish-sample-business-event.md)
- [Preview business event data](preview-business-event-data.md)
- [Manage data access for business events](manage-business-events-data-access.md)
- [Publish business events using Notebook](business-events-notebook.md)
