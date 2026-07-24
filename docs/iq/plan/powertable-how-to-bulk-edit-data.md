---
title: Edit and Bulk Edit Data
description: Learn how to edit individual records, perform bulk updates, and track data changes in PowerTable sheets.
ms.date: 06/25/2026
ms.topic: how-to
#customer intent: As a user, I want to edit individual records and perform bulk updates in PowerTable sheets so that I can efficiently maintain and manage my data.
---

# Edit and bulk edit data

Use the PowerTable sheet to edit and update data directly in the database without writing code. Before saving, preview your changes to verify them. When you save the changes, they sync with the source in real time to keep the data up to date.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

PowerTable provides the following editing capabilities:

* Update records directly from the table or through the form interface.
* Bulk edit or delete multiple records to maintain data consistency and save time.
* Preview all changes in a separate window before saving them to the database.
* View, search, filter, and export the history of saved changes.

In this article, you learn how to edit individual records and perform bulk edits in PowerTable sheets.

## Edit data in a table

To edit data directly in a table:

1. Double-click the cell that you want to modify, edit the existing value, and then press **Enter**.

    :::image type="content" source="media/powertable-how-to-bulk-edit-data/edit-data-cell.png" alt-text="Screenshot of editing data directly in a cell.":::

1. PowerTable highlights changed cells and makes the **Save to Database**, **Preview Changes**, and **Discard Changes** options available.

    :::image type="content" source="media/powertable-how-to-bulk-edit-data/save-to-database-options-available.png" alt-text="Screenshot of the options available after editing the data." lightbox="media/powertable-how-to-bulk-edit-data/save-to-database-options-available.png":::

1. Choose how you want to proceed with the edited value:
   * Select **Save to Database** to save the changes to the source database.
   * Select **Discard Changes** to revert any unsaved changes.
   * Select **Preview Changes** to review the modified records and compare the old and new values before saving.

The [**Preview Changes**](#preview-changes-before-saving) window displays all pending changes, including added, updated, and deleted records.

:::image type="content" source="media/powertable-how-to-bulk-edit-data/preview-changes-opened.png" alt-text="Screenshot of the preview changes window." lightbox="media/powertable-how-to-bulk-edit-data/preview-changes-opened.png":::

## Edit by using a form interface

You can also edit a row by using the form interface.

1. Select the row to edit, and then go to **Manage Record**.

    :::image type="content" source="media/powertable-how-to-bulk-edit-data/manage-record.png" alt-text="Screenshot of the available manage record option after selecting one or more rows." lightbox="media/powertable-how-to-bulk-edit-data/manage-record.png":::

1. A side panel opens with the **Form Editor**, where you can modify the required fields for the selected row.

    :::image type="content" source="media/powertable-how-to-bulk-edit-data/form-editor-side-panel.png" alt-text="Screenshot of the Record Details side panel with Form Editor." lightbox="media/powertable-how-to-bulk-edit-data/form-editor-side-panel.png":::

1. Optionally, select **Customize Form** to [customize](./PowerTable-how-to-generate-forms.md#customize-form) the form as needed.
1. After making the changes, select **Apply** to save them.
1. PowerTable highlights changed cells. Select **Save to Database** to save the changes, **Preview Changes** to review the modified records, or **Discard Changes** to revert them.

   :::image type="content" source="media/powertable-how-to-bulk-edit-data/save-options-using-form.png" alt-text="Screenshot of the options available after editing the data by using a form.":::

## Bulk edit data

Use the bulk edit feature in PowerTable sheet to edit or delete common attributes across multiple records at the same time.

To edit multiple cells:

1. Select the rows you want to edit. To select all rows in the table or clear the selection, select the row selector in the table header.
1. Select the **Bulk Edit** option that appears after you select more than one row.

   :::image type="content" source="media/powertable-how-to-bulk-edit-data/bulk-edit.png" alt-text="Screenshot of the Bulk Edit option on the toolbar.":::

1. In the **Bulk Edit** side panel, select the field you want to edit and the type of action to perform.

    Under **Action**,

    * Select **Clear cell contents** to remove the existing value.
    * Select **Set cell value** to update the existing value or enter a new value.

       :::image type="content" source="media/powertable-how-to-bulk-edit-data/actions.png" alt-text="Screenshot of the Actions in the Bulk Edit side panel." lightbox="media/powertable-how-to-bulk-edit-data/actions.png":::

    * For text fields, select **Append Value** to add text before or after the existing value by using **Prefix** or **Suffix**.

        :::image type="content" source="media/powertable-how-to-bulk-edit-data/action-append-value.png" alt-text="Screenshot of the Actions with Append Value action.":::

    The following example appends the specified suffix to the *ProductSKU* field.

    :::image type="content" source="media/powertable-how-to-bulk-edit-data/appended-field.png" alt-text="Screenshot of the appended field with suffix." lightbox="media/powertable-how-to-bulk-edit-data/appended-field.png":::

    * For number fields, select **Offset Value** to increase, decrease, multiply, or divide the existing numeric value by a specified offset.

      :::image type="content" source="media/powertable-how-to-bulk-edit-data/action-offset-value.png" alt-text="Screenshot of the Actions with Offset Value action.":::

    This example multiplies the *ProductPrice* field by two for the selected rows.

      :::image type="content" source="media/powertable-how-to-bulk-edit-data/offset-value-output.png" alt-text="Screenshot of the field multiplied by the offset value 2." lightbox="media/powertable-how-to-bulk-edit-data/offset-value-output.png":::

1. Select **Add Action** to configure additional field updates, and then select **Apply** after configuring all required actions.

   :::image type="content" source="media/powertable-how-to-bulk-edit-data/add-action.png" alt-text="Screenshot of the Bulk Edit side panel with Add Action option." :::

1. Select **Save to Database** to save the changes.

    :::image type="content" source="media/powertable-how-to-bulk-edit-data/save-options-bulk-edit.png" alt-text="Screenshot of the options available after editing the data by using the Bulk Edit side panel." lightbox="media/powertable-how-to-bulk-edit-data/save-options-bulk-edit.png":::

## Bulk edit by using the form interface

You can also bulk edit data by using the form interface, which updates multiple fields across the selected rows at the same time.

> [!TIP]
> Forms let you quickly edit multiple field attributes at once. In [Bulk Edit](#bulk-edit-data), you must select **Add Action** for each field to change.

To perform a bulk edit by using the form interface:

1. Select the required rows, and then select **Manage Record**.
1. In the **Form Editor** side panel that opens, modify the required fields.
1. Select **Apply** to update the selected rows.

   :::image type="content" source="media/powertable-how-to-bulk-edit-data/bulk-edit-form.png" alt-text="Screenshot of bulk editing by using a form." lightbox="media/powertable-how-to-bulk-edit-data/bulk-edit-form.png":::

The *ModelName* field now shows *Racing Socks*, and the *ProductColor* field now shows *Yellow*.

:::image type="content" source="media/powertable-how-to-bulk-edit-data/bulk-edited-form.png" alt-text="Screenshot of the bulk edited values by using a form." lightbox="media/powertable-how-to-bulk-edit-data/bulk-edited-form.png":::

## Find and replace data

Use **Find and Replace** to locate specific values in a table and replace them with new values. This feature helps you update recurring values across multiple records.

To find and replace values:

1. Select the **Find and Replace** option above the table.

   :::image type="content" source="media/powertable-how-to-bulk-edit-data/find-and-replace.png" alt-text="Screenshot of the Find and Replace option." lightbox="media/powertable-how-to-bulk-edit-data/find-and-replace.png":::

   The **Find and Replace** window opens, as shown in the following image.

   :::image type="content" source="media/powertable-how-to-bulk-edit-data/find-and-replace-window.png" alt-text="Screenshot of the Find and Replace window." lightbox="media/powertable-how-to-bulk-edit-data/find-and-replace-window.png":::

1. In the **Find** box, enter the value to search for.
1. Optionally, select a specific column from the **Column** dropdown. To search across all columns, keep the default selection, **All**.

   :::image type="content" source="media/powertable-how-to-bulk-edit-data/find-column-options.png" alt-text="Screenshot of the Find text box and Column dropdown in the Find and Replace window." lightbox="media/powertable-how-to-bulk-edit-data/find-column-options.png":::

1. Select a match type:

   * **Match Case** to perform a case-sensitive search.
   * **Match entire cell contents** to match only cells whose contents exactly match the search value.

   :::image type="content" source="media/powertable-how-to-bulk-edit-data/match-case-entire-cell.png" alt-text="Screenshot of the Match Case and Match entire cell contents options." lightbox="media/powertable-how-to-bulk-edit-data/match-case-entire-cell.png":::

1. In the **Replace With** box, enter the replacement value.

   :::image type="content" source="media/powertable-how-to-bulk-edit-data/replace-with.png" alt-text="Screenshot of the Replace With text box in Find and Replace window." lightbox="media/powertable-how-to-bulk-edit-data/replace-with.png":::

1. Select **Find All** to view all matching results.

   :::image type="content" source="media/powertable-how-to-bulk-edit-data/find-all.png" alt-text="Screenshot of the Find All option in the Find and Replace window." lightbox="media/powertable-how-to-bulk-edit-data/find-all.png":::

1. Use **Find Next** or **Find Previous** to navigate through the matching records.

   :::image type="content" source="media/powertable-how-to-bulk-edit-data/find-next-previous.png" alt-text="Screenshot of the Find Next and Find Previous options." lightbox="media/powertable-how-to-bulk-edit-data/find-next-previous.png":::

1. Select **Replace** to replace the currently selected match, or **Replace All** to replace all matching values.

   :::image type="content" source="media/powertable-how-to-bulk-edit-data/replace-replace-all.png" alt-text="Screenshot of the Replace and Replace All options." lightbox="media/powertable-how-to-bulk-edit-data/replace-replace-all.png":::

After the replacement completes, the modified cells appear highlighted. Select **Save to Database** to save the changes, **Preview Changes** to review them, or **Discard Changes** to revert them.

:::image type="content" source="media/powertable-how-to-bulk-edit-data/save-preview-discard.png" alt-text="Screenshot of bulk editing by using find and replace." lightbox="media/powertable-how-to-bulk-edit-data/save-preview-discard.png":::

> [!TIP]
> Use the **Column** dropdown to limit the search to a specific column and reduce the number of matching results.

## Preview changes before saving

When a table contains multiple modifications, it can be difficult to review and verify all changes before saving them to the database. PowerTable sheet lets you preview all pending changes in one place, and then save or discard them as needed.

> [!NOTE]
> **Preview Changes** displays only pending changes that you didn't save to the database yet. To view the history of saved changes, use **Audit Log**.

<!--add audit hyperlink-->

1. After you perform insert, update, or delete operations, the **Preview Changes** option becomes available along with the count of rows containing pending changes in the table.

    :::image type="content" source="media/powertable-how-to-bulk-edit-data/preview-changes.png" alt-text="Screenshot of the Preview Changes option." lightbox="media/powertable-how-to-bulk-edit-data/preview-changes.png":::

1. Select **Preview Changes** to view all pending changes along with their change types. Select **All** to view every change, or select the appropriate tab to view records for a specific change type.

    :::image type="content" source="media/powertable-how-to-bulk-edit-data/preview-changes-window.png" alt-text="Screenshot of the Preview Changes window." lightbox="media/powertable-how-to-bulk-edit-data/preview-changes-window.png":::

1. Select **Save to Database** to save the pending changes to the database.

    :::image type="content" source="media/powertable-how-to-bulk-edit-data/save-to-database.png" alt-text="Screenshot of the Save to Database option in the preview changes window." lightbox="media/powertable-how-to-bulk-edit-data/save-to-database.png":::

1. To discard specific changes, select the row that you want to revert and then select **Reset**.

    :::image type="content" source="media/powertable-how-to-bulk-edit-data/reset.png" alt-text="Screenshot of the Reset option in the preview changes window." lightbox="media/powertable-how-to-bulk-edit-data/reset.png":::

## View change history

Select the **History** tab in the form editor panel to view the history of changes to the selected records. The history includes the type of change, the row and column names that changed, who made the change, when they made it, and which values they modified.

:::image type="content" source="media/powertable-how-to-bulk-edit-data/history.png" alt-text="Screenshot of the Record Details side panel with History option." lightbox="media/powertable-how-to-bulk-edit-data/history.png":::

* Use **Search** to search for a specific log.
* Use **Filter** to filter the log history by action type (Insert, Update, or Delete), who made the change, when the change occurred, or who approved the change (if approvals are enabled).

You can also find this information in **Audit Logs**, which provide more detailed tracking information for all changes.
Select **Audit Logs** to view additional history details.<!--add audit hyperlink-->

   :::image type="content" source="media/powertable-how-to-bulk-edit-data/audit-log-features.png" alt-text="Screenshot of the key features available in the Audit Logs window." lightbox="media/powertable-how-to-bulk-edit-data/audit-log-features.png":::

## Export history

In addition to viewing and tracking the history of changes, you can export the history by using the **Export** option. The export process creates an Excel (.xlsx) file with the audit logs.

To export the change history for the selected rows:

1. Select **History** > **Export**.

   :::image type="content" source="media/powertable-how-to-bulk-edit-data/export.png" alt-text="Screenshot of the Record Details side panel with Export option." lightbox="media/powertable-how-to-bulk-edit-data/export.png":::

1. The **Export Audit Logs** panel opens, where you can configure the export settings.

   :::image type="content" source="media/powertable-how-to-bulk-edit-data/export-audit-logs.png" alt-text="Screenshot of the Export Audit Logs panel." lightbox="media/powertable-how-to-bulk-edit-data/export-audit-logs.png":::

1. Choose the log time period to export. **Last 30 Days** is the default. You can also select **Custom Date Range** from the dropdown list and specify the required start and end dates.

   :::image type="content" source="media/powertable-how-to-bulk-edit-data/include-data-for.png" alt-text="Screenshot of the Include data for option in Export Audit Logs panel.":::

1. **Download File** is the default option. Select **Export** to generate the audit log file.
1. After the link appears, right-click it and save it to your local system.

   :::image type="content" source="media/powertable-how-to-bulk-edit-data/file-generated.png" alt-text="Screenshot of the generated file link to save." lightbox="media/powertable-how-to-bulk-edit-data/file-generated.png":::
