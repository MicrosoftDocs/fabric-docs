---
title: Write back data
description: Learn how to write back data from a Planning sheet to your database or data platform. Configure destinations and save planning inputs securely. 
ms.date: 03/11/2026
ms.topic: how-to
#customer intent: As a user, I want to understand and use writeback effectively.
---

# Persist planning data using writeback

Data writeback in Planning sheets allows you to save planning inputs and updates from a Planning sheet to a supported external data destination such as databases, cloud data warehouses, data lake, and other storage systems. Saving planning data enables you to persist user inputs such as budgets, forecasts, adjustments, and scenario data directly to your data platform. This process ensures that planning data remains synchronized with your enterprise data platform.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Why use data writeback?

Data writeback enables organizations to keep planning and analytics data in a single governed environment, rather than exporting data manually.

Common scenarios include:

* Saving **budget and forecast inputs**
* Storing **scenario planning results**
* Capturing **manual adjustments**
* Synchronizing planning data with enterprise data warehouses

## Prerequisites

Before you begin, make sure that you have the following prerequisites in place:

* You have an active **Plan Writeback** subscription.
* The report visual contains at least one **row or column dimension**.
* A valid **writeback destination** is configured.
* Required permissions are assigned to users who perform writeback.

## Configure writeback settings

The steps in this section show you how to configure writeback settings.

### Create a writeback destination

1. Go to **Writeback > Add Destination**.
1. Select a **Database connection**.
1. Enter a **Database Name**.
1. Enter **a Table Name**.
1. Select the **Decimal Precision**.
1. Select **Add** to create the writeback destination.

:::image type="content" source="media/planning-how-to-write-back-data/create-destination.png" alt-text="Screenshot of the Create Destination configuration options." lightbox="media/planning-how-to-write-back-data/create-destination.png":::

### Manage destination

Select **Writeback > Manage Destination** to manage your destinations.

:::image type="content" source="media/planning-how-to-write-back-data/manage-destination.png" alt-text="Screenshot of the Manage Destination button in the Writeback tab.":::

### writeback type

Set the writeback table structure from **Writeback > WB Type**.

* Select **Long** to store measures as key-value pairs a **row-based format**.
* Select **Wide** to store measures in a **column-based format**.
* Select **Long with Changes**. This is the same as long format, but it **tracks only the changed values** written back from the Planning sheet.
* Select **Wide with Changes**. This is the same as wide format, but it **tracks only the changed values** written back from the Planning sheet.

:::image type="content" source="media/planning-how-to-write-back-data/write-back-type.png" alt-text="Screenshot of the writeback type options.":::

### General settings

Manage other writeback settings from **Writeback > General Settings**.

The writeback settings are used to configure how data entered in a Planning sheet is saved back to the underlying data source. It ensures that planning data entered by users is stored correctly, consistently, and in a format that aligns with the organization’s data model. It defines the structure, filtering behavior, and data format used when writing planning values to the destination.

* **General**: Defines the core settings for the writeback operation.
* **Data**: Used to select and configure the measures and dimensions that participate in the writeback process.
* **Destinations**: Defines where the planning data is written back, such as a database table or storage location.
* **Advanced**: Provides more configuration options for controlling writeback behavior and system-level settings.

:::image type="content" source="media/planning-how-to-write-back-data/general-settings.png" alt-text="Screenshot of the General write-back settings." lightbox="media/planning-how-to-write-back-data/general-settings.png":::

## Perform a writeback

You can do a writeback of Scenarios, Forecasts, Data Input values, Comments, Annotation, Allocations Results. Create the required artifact and follow these steps to perform the writeback.

Here, you perform a writeback of the inserted Data Input Number column *Discount*.

1. Select **Writeback > Writeback**.
1. Writeback is completed.

    :::image type="content" source="media/planning-how-to-write-back-data/write-back-completed.png" alt-text="Screenshot of a Planning sheet after the writeback is completed." lightbox="media/planning-how-to-write-back-data/write-back-completed.png":::

1. Select **Writeback > Logs** to view the writeback logs.

    :::image type="content" source="media/planning-how-to-write-back-data/logs.png" alt-text="Screenshot of the writeback logs showing a history of two writebacks." lightbox="media/planning-how-to-write-back-data/logs.png":::