---
title: Configure Dimension ID Mapping in Fabric Planning
description: Dimension ID mapping links notes, formatting, and planning inputs to stable IDs so renamed rows keep their data. Learn how to configure it in your planning sheets.
ms.date: 10/04/2026
ms.topic: how-to
---

# Maintain data integrity with dimension ID mapping

In planning, forecasting, and enterprise reporting, report structures are rarely static. Category names evolve, product hierarchies get relabeled, and organizational units are frequently renamed (for example, updating a cost center name).

In dynamic reporting tools, visual annotations, custom formatting, cell comments, writeback, and manual data inputs (such as budget overrides or forecast updates) are attached to specific row dimensions. By using *Dimension ID Mapping,* you can link custom visual elements and planning inputs to a constant, non-changing identifier (such as a unique Product ID or Cost Center Code) rather than a volatile descriptive label (such as Product Name).

## Why do you need dimension ID mapping in Planning?

When row labels in your underlying data model change (for example, renaming a product), standard reporting visuals lose track of which row the custom notes, cell highlights, or data inputs belong to.

The following screenshot shows a note added, approval status set to completed, and custom formatting applied to the *Ergonomic Executive Backpacks* row.

:::image type="content" source="../../media/resources/best-practices/how-to-create-dimension-id-mapping/formatting-status-note-applied-to-row.png" alt-text="Screenshot of custom formatting, completed approval status, and a note applied to the Ergonomic Executive Backpacks row." lightbox="../../media/resources/best-practices/how-to-create-dimension-id-mapping/formatting-status-note-applied-to-row.png":::

If you change the row label, in this example, change *Ergonomic Executive Backpack* to *Standard Laptop Backpack*, you lose the custom formatting, data inputs, and annotations tied to the label.

:::image type="content" source="../../media/resources/best-practices/how-to-create-dimension-id-mapping/formatting-lost-label-change.png" alt-text="Screenshot of formatting, data inputs, and notes removed on changing the row label." lightbox="../../media/resources/best-practices/how-to-create-dimension-id-mapping/formatting-lost-label-change.png":::

Planning and forecasting workflows also require writing data back to database tables or data warehouses. If writeback relies on descriptive labels that change over time, it creates orphan records or breaks audit trails.

## Configure dimension ID mapping

By default, notes, comments, and formatting tie directly to volatile dimension labels. Configure dimension ID mapping to link these inputs to persistent, unique identifiers, such as a product ID or cost center code.

> [!IMPORTANT]
> Set up dimension ID mapping before making changes such as creating data input fields, adding notes, or applying formatting to the planning sheet.

1. Open the **Data** side pane and select the settings icon. Open the **Dimension ID Mapping** tab.

    :::image type="content" source="../../media/resources/best-practices/how-to-create-dimension-id-mapping/default-label-dimension-id-mapping.png" alt-text="Screenshot of the Dimension ID Mapping tab in the Data pane settings showing dimensions mapped to labels by default." lightbox="../../media/resources/best-practices/how-to-create-dimension-id-mapping/default-label-dimension-id-mapping.png":::

1. Select the **ID Column** option to assign an ID column instead of using the dimension category value. Choose the column from **Select Mapping Field** and select **Apply**. The following screenshot shows how to change the dimension ID mapping for the *SalesRepName* dimension to *SalesRepID*.

    :::image type="content" source="../../media/resources/best-practices/how-to-create-dimension-id-mapping/change-dimension-id-mapping.png" alt-text="Screenshot of the Dimension ID Mapping tab with the ID Column option mapping the SalesRepName dimension to SalesRepID." lightbox="../../media/resources/best-practices/how-to-create-dimension-id-mapping/change-dimension-id-mapping.png":::

1. When you update the sales rep in the *Central* region from *Nicole Wagner* to *Andzelika Juskaite*, the entered budget values, approval status, notes, and formatting are retained.

    :::image type="content" source="../../media/resources/best-practices/how-to-create-dimension-id-mapping/update-sales-rep-name-preserve-formatting.gif" alt-text="Animation showing that updating the sales representative name retains budget values, approval status, notes, and formatting." lightbox="../../media/resources/best-practices/how-to-create-dimension-id-mapping/update-sales-rep-name-preserve-formatting.gif":::

## Configure dimension ID mapping for writeback

Mapping a dimension label to a unique column ID prevents unnecessary row creation during writeback. When you enable this feature, updating a dimension label updates the existing record rather than creating a new row in the writeback table. Without dimension ID mapping, label changes are treated as new entries, generating duplicate rows.

1. In the **Data** pane, open **Dimension ID Mapping** settings. Use the steps in the [Configure Dimension ID Mapping](#configure-dimension-id-mapping) section to select the IDs corresponding to the dimension labels.
  
    :::image type="content" source="../../media/resources/best-practices/how-to-create-dimension-id-mapping/dimension-id-mapping-region-sales-representative.png" alt-text="Screenshot of setting the dimension ID mapping for region and sales representative." lightbox="../../media/resources/best-practices/how-to-create-dimension-id-mapping/dimension-id-mapping-region-sales-representative.png":::

1. In the **Writeback** ribbon, go to **Writeback Settings** > **Data**. Under **Exclude Dimensions for Writeback**, select the dimension labels mapped in the previous step (for example, *RegionName* and *SalesRepName*). Since these fields are already linked to dimension IDs, they don't need to be written back.

    > [!NOTE]
    > * The **Exclude Dimensions for Writeback** option is enabled only if dimension ID mapping is configured.
    > * If your source data includes housekeeping fields (such as *LastUpdatedAt*) assigned to rows or columns in a planning sheet, writeback might create unwanted duplicate records. To prevent this problem, disable the **In Key** toggle for that dimension under **Dimension ID Mapping** and add it to **Exclude Dimensions for Writeback**. Writeback automatically captures the timestamp and username, so housekeeping columns from the source aren't required.

    :::image type="content" source="../../media/resources/best-practices/how-to-create-dimension-id-mapping/exclude-dimensions-writeback-option.png" alt-text="Screenshot of writeback settings with the sales representative and region fields excluded." lightbox="../../media/resources/best-practices/how-to-create-dimension-id-mapping/exclude-dimensions-writeback-option.png":::

1. Trigger writeback. For demonstration purposes, consider the sales rep highlighted in the planning sheet:

    :::image type="content" source="../../media/resources/best-practices/how-to-create-dimension-id-mapping/sample-data-highlighted-planning-sheet.png" alt-text="Screenshot of a planning sheet with a sales representative record highlighted." lightbox="../../media/resources/best-practices/how-to-create-dimension-id-mapping/sample-data-highlighted-planning-sheet.png":::

    Open the destination SQL database. Notice how the RegionID and SalesRepID are written back to the destination table even though you didn't add them to the planning sheet.

    :::image type="content" source="../../media/resources/best-practices/how-to-create-dimension-id-mapping/sales-representative-id-written-back.png" alt-text="Screenshot of RegionID and SalesRepID fields written back to the SQL destination table.":::

    The following screenshot shows the writeback table data if you don't exclude the label columns in writeback settings (Step 2).

    :::image type="content" source="../../media/resources/best-practices/how-to-create-dimension-id-mapping/sales-representative-label-written-back-sql-table.png" alt-text="Screenshot of the SQL writeback table showing sales representative name label columns written back when not excluded." lightbox="../../media/resources/best-practices/how-to-create-dimension-id-mapping/sales-representative-label-written-back-sql-table.png":::

1. Update the dimension label in the semantic model. In this example, the sales representative name changed from *Andzelika Juskaite* to *Nicole Wagner*. Refresh your planning sheet to see the updated data.

    :::image type="content" source="../../media/resources/best-practices/how-to-create-dimension-id-mapping/sales-representative-name-updated-planning-sheet.png" alt-text="Screenshot of the sales representative name updated to Nicole Wagner in the planning sheet." lightbox="../../media/resources/best-practices/how-to-create-dimension-id-mapping/sales-representative-name-updated-planning-sheet.png":::

1. Change a data input entry and trigger writeback again. In this example, we changed the **Approval Status** to *Completed* for the *Enterprise Multifunction Printers* row.

    :::image type="content" source="../../media/resources/best-practices/how-to-create-dimension-id-mapping/approval-status-changed-completed.png" alt-text="Screenshot of updating the approval status to completed." lightbox="../../media/resources/best-practices/how-to-create-dimension-id-mapping/approval-status-changed-completed.png":::

1. Verify the data in the destination SQL table. Even though the sales representative's name changed, the writeback updated the existing record rather than inserting a duplicate row.

   :::image type="content" source="../../media/resources/best-practices/how-to-create-dimension-id-mapping/writeback-sql-table-record-updated-no-duplicate.png" alt-text="Screenshot of the destination SQL table showing the existing record updated with Completed approval status and no duplicate row." lightbox="../../media/resources/best-practices/how-to-create-dimension-id-mapping/writeback-sql-table-record-updated-no-duplicate.png":::

## Related content

* [Use Writeback to save planning data to a Fabric SQL database](/fabric/iq/plan/planning-writeback/planning-how-to-persist-data.md).
