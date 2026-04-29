---
title: Write back data
description: Learn how to write back data from a Planning sheet to your database or data platform. Configure destinations and save planning inputs securely. 
ms.date: 04/27/2026
ms.topic: how-to
#customer intent: As a user, I want to understand and use writeback effectively.
---

# Persist data with Writeback

Plan supports exporting planning data to multiple destination types, including file-based destinations, data warehouses, and data lake storage. Write back budgets, forecasts, adjustments, and scenarios to the Writeback table in the data platform to keep planning data synchronized with enterprise systems. Unlike conventional BI and planning tools that require predefined database schemas and IT-managed writeback infrastructure, Plan supports dynamic database configuration and runtime table creation.

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

>[!TIP]
>On-premises database servers must be directly reachable from the internet for writeback. They must have a public IP address with port forwarding.

1. Go to **Writeback > Add Destination**.
1. Select a database connection.
1. Select the target database-browse and select the required database from the OneLake catalog.
1. Enter a **Table Name**.
1. Enter the **Decimal Precision** to specify the number of digits after the decimal point for numeric columns.
1. Use **Text Length** to define the maximum length for string columns(for example, length of all string columns = 512) or choose **Custom**.
1. Select **Add** to create the writeback destination.

:::image type="content" source="../media/planning-writeback/planning-how-to-persist-data/create-writeback-destination.png" alt-text="Screenshot of creating a writeback destination.":::

>[!NOTE]
>Data writeback capabilities are subject to specific row limits depending on the file source or destination used.  

* Local file formats such as Excel and CSV support a significant volume of up to 200,000 rows
  
* Cloud-based integrations via OneDrive and SharePoint are restricted to a much smaller capacity of only 250 rows.
  
## Manage destinations

To view, update, or reuse configured destinations, go to **Writeback > Manage**.

:::image type="content" source="../media/planning-writeback/planning-how-to-persist-data/manage-destination.png" alt-text="Screenshot of writeback destinations configured in the Planning sheet." lightbox="../media/planning-writeback/planning-how-to-persist-data/manage-destination.png":::

## Set the Writeback type

Control how data is structured in the Writeback table. Go to **Writeback > Settings > Writeback Type**, and select one of the following:

* Select **Long** to store measures as key-value pairs a row-based format.
* Select **Wide** to store measures in a column-based format.
* Select **Long with Changes**. It's the same as long format, but tracks only the changed values written back from the Planning sheet.
* Select **Wide with Changes**. It's the same as wide format, but tracks only the changed values written back from the Planning sheet.

:::image type="content" source="../media/planning-writeback/planning-how-to-persist-data/select-writeback-type.jpg" alt-text="Screenshot of selecting the writeback type." lightbox="../media/planning-writeback/planning-how-to-persist-data/select-writeback-type.jpg":::

## Configure writeback settings

Use writeback settings to configure how data entered in a Planning sheet is saved back to the underlying data source. It ensures that planning data entered by users is stored correctly, consistently, and in a format that aligns with the organization's data model. Define the structure, filtering behavior, and data format used when writing planning values to the destination.

Configure settings from **Writeback > Settings**.

* **General**: Defines the core settings for the writeback operation.
* **Data**: Used to select and configure the measures and dimensions that participate in the writeback process.
* **Destinations**: Defines where the planning data is written back, such as a database table or storage location.
* **Advanced**: Provides more configuration options for controlling writeback behavior and system-level settings.

:::image type="content" source="../media/planning-writeback/planning-how-to-persist-data/writeback-settings.jpg" alt-text="Screenshot of writeback settings." lightbox="../media/planning-writeback/planning-how-to-persist-data/writeback-settings.jpg":::

## Perform writeback

* Write back scenarios, forecasts, data inputs, and comments to the designated data platform.
Select **Writeback > Writeback** to trigger a writeback. After completion, a confirmation message is displayed.

    :::image type="content" source="../media/planning-writeback/planning-how-to-persist-data/writeback-status.jpg" alt-text="Screenshot of writeback completion notification." lightbox="../media/planning-writeback/planning-how-to-persist-data/writeback-status.jpg":::

* Open the destination database to view the writeback data.

    :::image type="content" source="../media/planning-writeback/planning-how-to-persist-data/writeback-destination-data.png" alt-text="Screenshot of data written back to a Fabric SQL destination.":::

* After the initial writeback, add or remove row or column dimensions as you build your planning sheet. If the destination structure must change because of these updates, drop and recreate the table with the updated structure before the next writeback.

    :::image type="content" source="../media/planning-writeback/planning-how-to-persist-data/writeback-table-mismatch.png" alt-text="Screenshot of destination structure mismatch.":::

* Writeback logs include milestones, payload size, and writeback duration. Select **Writeback > Logs** to view the writeback logs.

    :::image type="content" source="../media/planning-writeback/planning-how-to-persist-data/writeback-logs.jpg" alt-text="Screenshot of writeback logs." lightbox="../media/planning-writeback/planning-how-to-persist-data/writeback-logs.jpg":::

Select a writeback ID to view detailed information about a specific writeback instance.

:::image type="content" source="../media/planning-writeback/planning-how-to-persist-data/writeback-detailed-logs.png" alt-text="Screenshot of writeback logs with  payload size, milestones,a dn duration.":::

