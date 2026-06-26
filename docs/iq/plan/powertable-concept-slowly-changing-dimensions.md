---
title: Slowly Changing Dimensions
description: Learn how to configure slowly changing dimensions in PowerTable.
ms.date: 06/15/2026
ms.topic: concept-article
ai-usage: ai-assisted
---

# Slowly changing dimensions

*Slowly changing dimensions (SCDs)* are used in data warehouses to capture changes in dimensional attributes. Dimensions such as products and customers can change over time. To ensure accurate historical reporting, the data warehouse must capture and maintain these changes.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Type 2 SCDs

A Type 2 slowly changing dimension (SCD) creates a new record when dimensional data changes and marks the existing record as inactive. This approach preserves historical data by maintaining multiple versions of the same dimension record.

Type 2 slowly changing dimensions (SCD) maintain a history of dimension changes using the following attributes:

* **Surrogate key**: A unique, sequential identifier assigned to each record. For example, a customer can change their residential address multiple times while retaining the same customer ID. When a customer changes their address, a new record with a new surrogate key is inserted while the customer ID remains unchanged, preserving the historical record.
* **Effective dates**: Start and end dates define the timeframe during which a specific version of the record was active. Effective dates enable point-in-time historical reporting. Old records are closed out by updating their end date.
* **Active flag**: A boolean (true/false) column to quickly identify the latest record without requiring date filters.

### How Type 2 SCDs work

Consider a Type 2 product dimension that captures price fluctuations. The original data is shown.

:::image type="content" source="media/powertable-concept-slowly-changing-dimensions/type-two-dimension-original-data.png" alt-text="Screenshot of a data table containing four product rows with price columns, start and end dates, and an ActiveFlag column showing active products.":::

When the product price changes, a new row is inserted to capture the updated price. The original row is then marked as inactive by setting an end date and updating the active flag.

:::image type="content" source="media/powertable-concept-slowly-changing-dimensions/type-two-dimension-changed-data.png" alt-text="Screenshot of the data with a new row containing a new price for Product 1. The original row is marked inactive and its end date has been updated. ":::

## Type 3 SCDs

Type 3 slowly changing dimensions maintain historical changes by keeping both the old and new values of an attribute within the same row. The latest value is updated in the primary column, and the previous value is moved to another column that is used to track changes. Since each change is stored in a new column, Type 3 slowly changing dimensions (SCDs) can maintain only a limited amount of historical data.

### How Type 3 SCDs work

Consider a Type 3 product dimension that captures price fluctuations. The original data is shown.

:::image type="content" source="media/powertable-concept-slowly-changing-dimensions/type-three-dimension-original-data.png" alt-text="Screenshot of a data table containing four product rows with columns for Price and PreviousPrice (currently empty for all rows).":::

When the price changes, the new value is captured in the *Price* column and original value is moved to the *PreviousPrice* column.

:::image type="content" source="media/powertable-concept-slowly-changing-dimensions/type-three-dimension-changed-data.png" alt-text="Screenshot of the data with an updated row for Product 1. The Price column has a new value and the PreviousPrice column now shows the old price.":::

## Related content

* [Create slowly changing dimensions](powertable-how-to-create-slowly-changing-dimension.md)
