---
title: Preview Business Event Data in Fabric Real-Time Hub
description: Learn how to use Data preview in Fabric Real-Time hub to inspect business event payloads, validate publishers and consumers, and troubleshoot event flow.
#customer intent: As a Fabric user, I want to preview business event data so that I can validate the payloads that publishers send and consumers receive.
ms.date: 08/17/2026
ms.topic: how-to
---

# Preview business event data in Fabric Real-Time hub

Use **Data preview** to inspect recent business event payloads as they move from publishers to consumers. The preview helps you confirm that a publisher sends the expected fields, verify what a consumer receives, compare payloads with the event schema, and investigate event flow without creating a separate query.

If you aren't familiar with business events, see [Business events overview](business-events-overview.md) and [Business events concepts and terminology](business-events-concepts.md).

## Prerequisites

Before you start, ensure that:

- A business event exists in Real-Time hub.
- At least one publisher or consumer is configured for the business event.
- You have **Publish** permission to preview data for a publisher or **Consume** permission to preview data for a consumer. For more information, see [Manage data access for business events](manage-business-events-data-access.md).
- The selected publisher or consumer processed an event within the last 24 hours.

## Open Data preview

1. Go to **Real-Time hub** in Microsoft Fabric.

1. Under **Subscribe to**, select **Business events**.

1. Select the business event that you want to inspect.

1. On the business event details page, select the **Data preview** tab.

    :::image type="content" source="./media/preview-business-event-data/data-preview.png" alt-text="Screenshot of the Data preview tab for a business event, showing publisher and consumer selectors, event payloads, refresh information, and the event schema." lightbox="./media/preview-business-event-data/data-preview.png":::

## Select the event flow to inspect

The left pane separates event data by publisher and consumer. Select one entry at a time:

- Under **Publishers**, select a publisher to inspect the events it sent. Use this view to validate event creation and the payload before downstream processing.
- Under **Consumers**, select a consumer to inspect the events delivered to it. Use this view to confirm delivery and validate the payload that the consumer receives.

Comparing a publisher preview with a consumer preview can help you determine where to investigate. If an event appears for the publisher but not for the expected consumer, review the consumer configuration, filters, and permissions.

## Understand the preview

The data preview includes the following information and controls:

| Area | What it shows | How to use it |
|---|---|---|
| Data Preview scope | Up to 30 recent events from the last 24 hours for the selected publisher or consumer. | Use the preview for recent validation and troubleshooting, not as a complete event history. |
| **Last refreshed** | The time when the preview last loaded data. | Use this timestamp to determine whether the table reflects your latest test. |
| **Last event time** | The event time of the most recent event in the current preview. | Compare this value with the time when you published or expected to consume an event. |
| Payload table | One event per row, with payload properties displayed as columns. | Check field names, values, missing values, and data types against your expected payload. |
| **Schema version** | The schema version associated with the previewed events. | Confirm that the publisher and consumer use the intended event contract. |
| **Refresh** | Reloads the latest available events. | Select **Refresh** after you publish a test event or expect a consumer to receive one. |

Data preview shows a maximum of 30 events for each publisher or consumer. Only events from the last 24 hours are available. If more than 30 events match, use the preview to inspect the most recent sample. For other service limits, see [Business Events limits](business-events-limits.md).

## Inspect event metadata

Select **Show metadata** in the left pane to add event metadata to the payload table. Metadata provides context such as the event time and source. Use it to correlate an event across the publisher and consumer views or to distinguish payloads with similar business data.

Keep metadata hidden when you only need to inspect business properties and want a more compact table.

## Compare the payload with the event schema

The **Event Schema** pane displays the contract for the selected business event:

- The version badge identifies the displayed schema version.
- The schema tree lists each field and its data type. For example, the screenshot shows `store_id` and `product_id` as strings, and `current_qty` and `threshold_qty` as integers.
- **Show metadata** adds metadata fields to the schema pane so that you can inspect both the event envelope and the business payload.
- The pane control hides or shows the schema to provide more room for the payload table.
- The settings control opens the event schema configuration.

Compare the table columns with the schema pane to find missing properties, unexpected names, incompatible data types, or an unintended schema version. To change the schema, see [Create and manage business events](create-business-events.md#manage-business-event-schema-in-real-time-hub).

## Validate a publisher

Use the publisher preview before you connect or troubleshoot downstream consumers:

1. Select the publisher under **Publishers**.

1. Publish a representative event.

1. Select **Refresh**.

1. Confirm that **Last event time** reflects the test and that a new row appears.

1. Compare the payload columns, values, and **Schema version** with the **Event Schema** pane.

1. Turn on **Show metadata** when you need to confirm the event source or correlate the event with another view.

This process confirms that the event reached Business Events and follows the expected contract. It doesn't confirm delivery to a consumer.

## Validate a consumer

Use the consumer preview to verify downstream delivery:

1. Select the consumer under **Consumers**.

1. Select **Refresh** after the publisher sends an event.

1. Confirm that the event appears and that **Last event time** reflects the expected delivery.

1. Compare the consumer payload with the publisher payload and the **Event Schema** pane.

1. Turn on **Show metadata** to correlate the publisher and consumer records when needed.

The consumer preview shows events delivered to the selected consumer. If a publisher record appears but the corresponding consumer record doesn't, review the consumer subscription, filters, and data access.

## Troubleshoot an empty or unexpected preview

If the preview doesn't show the event you expect, check the following conditions:

- **Time window**: Data preview only includes events from the last 24 hours.
- **Row limit**: The preview only displays the 30 most recent events for the selected publisher or consumer.
- **Selection**: Confirm that you selected the publisher that sent the event or the consumer that should receive it.
- **Refresh time**: Select **Refresh**, and then check **Last refreshed** and **Last event time**.
- **Permissions**: Confirm that your data access role includes **Publish** access for a publisher preview or **Consume** access for a consumer preview.
- **Schema**: Compare the payload with the displayed schema version and field types.
- **Consumer configuration**: If the publisher preview contains the event but the consumer preview doesn't, review the consumer subscription and filters.

## Related content

- [Explore business events in Fabric Real-Time hub](business-events-page.md)
- [Business event detail page in Fabric Real-Time hub](business-event-details-page.md)
- [Manage data access for business events](manage-business-events-data-access.md)
- [Business Events limits](business-events-limits.md)
