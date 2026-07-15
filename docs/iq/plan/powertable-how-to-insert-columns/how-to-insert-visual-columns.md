---
title: Insert Visual Columns in PowerTable
description: Know about the different types of visual columns you can insert in a PowerTable sheet and their use cases so you insert the right column based on your need.
ms.date: 07/10/2026
ms.topic: how-to
#customer intent: As a PowerTable user, I want to understand the six visual column types so that I can choose the right one for my data and add it.
---

# Insert visual columns in PowerTable

The visual column type includes multiselect relationship columns, reference columns, relation columns, roll up, button, and attachment columns. Visual columns exist only within the PowerTable sheet. PowerTable doesn't add them to the source database.

## Add a visual column

To add a visual column, select **Insert Column** > **Visual Column** and then choose the required column type.

:::image type="content" source="../media/powertable-how-to-insert-columns/add-visual-columns/add-visual-column-menu.png" alt-text="Screenshot of PowerTable Insert Column menu showing Visual Column options like Add Reference, Relation, and Rollup Column." lightbox="../media/powertable-how-to-insert-columns/add-visual-columns/add-visual-column-menu.png":::

## Visual column types

PowerTable provides six column types.

| Column type | Description | Typical use case |
| --- | --- | --- |
| **Multiselect Relationship** | Multiselect column that selects values from a lookup table for each record in the primary table, based on the relationship table. You can also select values from the displayed list that comes from the lookup table. | Assign multiple sales representatives to a product, multiple skills to an employee, or multiple tags to a task. |
| **Reference** | References and shows read-only values from another table based on matching keys. | Show a customer's region, department name, or manager name without duplicating data. For more information, see [Insert reference columns in PowerTable](how-to-insert-reference-columns.md). |
| **Relation** | Each record provides a navigation link to related child records in another table (master-detail relationship). | Open all order records for a selected customer or view all tasks related to a project. |
| **Rollup** | Aggregates values from related records and shows a summarized result, such as a sum, count, average, minimum, or maximum value. | Show total project cost, total hours worked, or the number of open tickets for a customer. |
| **Button** | Adds an action button that opens a URL or triggers an automation. | Open a URL, launch an automation, or start a workflow. For more information, see [Insert button columns in PowerTable](how-to-insert-button-columns.md). |
| **Attachment** | Stores and manages files associated with a record. | Attach contracts, invoices, images, or supporting documents. For more information, see [Insert attachment columns in PowerTable](how-to-insert-attachment-columns.md). |
