---
title: Write user data functions for business events
description: Learn how to write Fabric user data functions that publish single or batched business events.
ms.reviewer: sumuth
ms.topic: how-to
ms.custom: freshness-kr
ms.date: 09/24/2026
ms.search.form: Publish business events from user data functions
ai-usage: ai-assisted
---

# Write user data functions for business events

Use a Fabric user data function to publish business events when your function detects a meaningful business condition. For example, publish an event when an order changes status or when inventory falls below a threshold. Downstream Fabric items can subscribe to the event and react without polling the source data.

This article shows you how to:

- Connect a user data functions item to an event schema set.
- Publish one event from function inputs.
- Query a SQL database in Fabric and publish multiple events in a batch.

> [!IMPORTANT]
> This feature is in [preview](../../fundamentals/preview.md).

## Prerequisites

Before you begin, you need:

- A [Fabric workspace](../../fundamentals/create-workspaces.md) with an active capacity or trial capacity.
- A [user data functions item](./create-user-data-functions-portal.md).
- A business event and its event schema set. To create them, follow the steps in [Publish business events using a user data function](../../real-time-hub/business-events/tutorial-business-events-user-data-function-activation-email.md#create-a-new-business-event).
- Permission to access the event schema set.
- For the SQL example, a [SQL database in Fabric](../../database/sql/overview.md) that contains an inventory table.

## Connect to an event schema set

The `FabricBusinessEventsClient` uses a Fabric connection to authenticate and publish events. Add the connection to your user data functions item before you write the function:

1. Open your user data functions item in the Fabric portal.
1. On the **Home** ribbon, select **Manage connections**.
1. Select **Add connection**.
1. Find and select the event schema set that contains your business event, and then select **Connect**.
1. Note the connection alias. You use this value in the `@udf.connection` decorator.

For more information about connection aliases, see [Connect to data sources](./connect-to-data-sources.md).

## Publish one business event

Define a parameter of type `fn.FabricBusinessEventsClient`, and bind it to the event schema set connection with the `@udf.connection` decorator. Then call `PublishEvent` with the event type, payload, and schema version.

The following function publishes an `order.status_changed` event:

```python
import fabric.functions as fn

udf = fn.UserDataFunctions()

@udf.connection(argName="businessEventsClient", alias="<Event schema set alias>")
@udf.function()
def publishOrderStatus(
    businessEventsClient: fn.FabricBusinessEventsClient,
    orderId: str,
    status: str
) -> str:
    eventData = {
        "orderId": orderId,
        "status": status
    }

    businessEventsClient.PublishEvent(
        type="order.status_changed",
        event_data=eventData,
        data_version="V1"
    )

    return f"Published status change for order {orderId}."
```

Before you run the function, replace `<Event schema set alias>` with the alias from **Manage connections**. Also ensure the following values match the business event definition:

- `type` matches the event type name.
- The property names and value types in `event_data` match the event schema.
- `data_version` matches the schema version.

You don't need to add credentials or an event endpoint to your code. Fabric supplies the connected client when it invokes the function.

## Query data and publish events in a batch

A function can combine a business events connection with another Fabric connection. This pattern lets you query operational data, apply business logic, and publish events only for rows that meet your criteria.

For this example, create an `inventory.low_stock` event with the following properties:

| Property | Type |
|---|---|
| `productId` | String |
| `productName` | String |
| `currentStock` | Integer |
| `threshold` | Integer |
| `alertTimestamp` | String |

Create an `Inventory` table in your SQL database with `ProductId`, `ProductName`, and `StockLevel` columns. Then add the SQL database as a second connection to your user data functions item.

The following function queries products below the supplied threshold and publishes the results in one call:

```python
import datetime
import fabric.functions as fn

udf = fn.UserDataFunctions()

@udf.connection(argName="businessEventsClient", alias="<Event schema set alias>")
@udf.connection(argName="sqlDb", alias="<SQL database alias>")
@udf.function()
def publishLowStockEvents(
    businessEventsClient: fn.FabricBusinessEventsClient,
    sqlDb: fn.FabricSqlConnection,
    threshold: int = 10
) -> str:
    connection = sqlDb.connect()
    cursor = connection.cursor()

    try:
        query = """
            SELECT ProductId, ProductName, StockLevel
            FROM dbo.Inventory
            WHERE StockLevel < ?
        """
        cursor.execute(query, threshold)

        events = []
        for productId, productName, stockLevel in cursor:
            events.append({
                "productId": str(productId),
                "productName": productName,
                "currentStock": stockLevel,
                "threshold": threshold,
                "alertTimestamp": datetime.datetime.now(
                    datetime.timezone.utc
                ).isoformat()
            })

        if events:
            businessEventsClient.PublishEvent(
                type="inventory.low_stock",
                event_data=events,
                data_version="V1"
            )

        return (
            f"Published {len(events)} low-stock events for products "
            f"below the threshold of {threshold}."
        )
    finally:
        cursor.close()
        connection.close()
```

Replace both connection aliases before you run the function. This example uses a parameterized SQL query so that the `threshold` input isn't inserted directly into the query text.

For batch publishing, pass a list of payload objects to `event_data`. Each object must match the same event schema. The function skips `PublishEvent` when the query returns no rows.

## Test and verify the function

1. In the **Functions explorer**, point to the function, select the ellipsis (**...**), and then select **Test**.
1. Enter the function parameters, and then select **Test**.
1. Confirm that the function returns the expected message.
1. In Real-Time hub, open **Business events**, and select the event type.
1. On the **Publishers** tab, confirm that your user data functions item appears as a publisher.
1. On the **Data preview** tab, inspect the event payload.

If publishing fails, verify the event type, schema version, payload property names and types, connection aliases, and permissions for each connected item. To inspect runtime errors, see [View user data function logs](./view-function-logs.md).

## Related content

- [Use a user data function as a business events publisher](../../real-time-hub/business-events/business-events-user-data-function.md)
- [Publish business events using a user data function and send an email with Activator](../../real-time-hub/business-events/tutorial-business-events-user-data-function-activation-email.md)
- [Fabric user data function programming model](./python-programming-model.md)
- [Publish a custom business event sample](https://github.com/microsoft/fabric-user-data-functions-samples/blob/main/PYTHON/BusinessEvents/publish_event.py)
- [Query SQL and publish business events sample](https://github.com/microsoft/fabric-user-data-functions-samples/blob/main/PYTHON/BusinessEvents/query_sql_and_publish_event.py)
