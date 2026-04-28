---
title: Configure writeback
description: Learn how to write back data from a Planning sheet to your database or data platform. Configure destinations and save planning inputs securely. 
ms.date: 04/27/2026
ms.topic: how-to
#customer intent: As a user, I want to understand and use writeback effectively.
---

# Persist data with writeback

Writeback saves data from a Planning sheet to external data destinations such as databases, cloud data warehouses, file systems, or data lake storage. It supports multiple destination types and enables you to save data without predefined database schemas or complex setup. Write back budgets, forecasts, adjustments, and scenarios to the writeback table in the data platform to keep planning data synchronized with enterprise systems.

[!INCLUDE [Fabric feature-preview-note](../../../includes/feature-preview-note.md)]

## Writeback use cases

Maintain planning and analytics data in a single governed environment instead of exporting data manually.

Common scenarios include:

* Save budget and forecast inputs directly to the  data platform.
* Store scenario planning results for further analysis.
* Capture manual adjustments made in Planning sheets.
* Synchronize planning data with enterprise data warehouses.

## Prerequisites

Before you begin, make sure that you have the following prerequisites in place:

* The Planning sheet contains at least one row or column dimension.
* Required permissions are assigned to users who perform writeback.

## Create a writeback destination

To save data using writeback, first configure a destination.

1. Go to **Writeback > Add Destination**.
1. Select a Database connection.
1. Enter a **Database Name**.
1. Enter a **Table Name**.
1. Select the **Decimal Precision**.
1. Select **Add** to create the writeback destination.

:::image type="content" source="../media/planning-writeback/planning-how-to-persist-data/create-writeback-destination.png" alt-text="Screenshot of creating a writeback destination.":::

### Manage destinations

To view, update, or reuse configured destinations, go to **Writeback > Manage**.

:::image type="content" source="../media/planning-writeback/planning-how-to-persist-data/manage-destination.png" alt-text="Screenshot of writeback destinations configured in the Planning sheet." lightbox="../media/planning-writeback/planning-how-to-persist-data/manage-destination.png":::

## Configure writeback settings

Use writeback settings to configure how data entered in a Planning sheet is saved back to the underlying data source. It ensures that planning data entered by users is stored correctly, consistently, and in a format that aligns with the organization's data model. Define the structure, filtering behavior, and data format used when writing planning values to the destination.

Configure settings from **Writeback > Settings**.

* **General**: Defines the core settings for the writeback operation.
* **Data**: Used to select and configure the measures and dimensions that participate in the writeback process.
* **Destinations**: Defines where the planning data is written back, such as a database table or storage location.
* **Advanced**: Provides more configuration options for controlling writeback behavior and system-level settings.

:::image type="content" source="../media/planning-writeback/planning-how-to-persist-data/writeback-settings.jpg" alt-text="Screenshot of writeback settings." lightbox="../media/planning-writeback/planning-how-to-persist-data/writeback-settings.jpg":::


### Set the writeback type

Control how data is structured in the writeback table. Go to **Writeback > Settings > Writeback Type**, and select one of the following:

* **Long** stores measures as key-value pairs a row-based format.
* **Wide** stores measures in a column-based format.
* **Long with Changes** is the same as long format, but tracks only the changed values written back from the Planning sheet.
* **Wide with Changes** is the same as wide format, but tracks only the changed values written back from the Planning sheet.

:::image type="content" source="../media/planning-writeback/planning-how-to-persist-data/select-writeback-type.jpg" alt-text="Screenshot of selecting the writeback type." lightbox="../media/planning-writeback/planning-how-to-persist-data/select-writeback-type.jpg":::

## Perform writeback

You can write back scenarios, forecasts, data inputs, and comments to the designated data platform.
Select **Writeback > Writeback** to trigger a writeback. After the operation completes, a notification confirms the status.

:::image type="content" source="../media/planning-writeback/planning-how-to-persist-data/writeback-status.jpg" alt-text="Screenshot of writeback completion notification." lightbox="../media/planning-writeback/planning-how-to-persist-data/writeback-status.jpg":::

Select **Writeback > Logs** to view the writeback logs.

:::image type="content" source="../media/planning-writeback/planning-how-to-persist-data/writeback-logs.jpg" alt-text="Screenshot of writeback logs." lightbox="../media/planning-writeback/planning-how-to-persist-data/writeback-logs.jpg":::
