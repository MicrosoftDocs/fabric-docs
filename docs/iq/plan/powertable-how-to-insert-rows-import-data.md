---
title: Insert, Import, Duplicate, and Delete Rows
description: Learn how to insert, import, copy, duplicate, and delete rows in PowerTable sheets.
ms.date: 06/26/2026
ms.topic: how-to
#customer intent: As a user, I want to insert, import, copy, duplicate, and delete rows in a PowerTable sheet so that I can efficiently manage table data.
---

# Insert, import, duplicate, and delete rows

In a PowerTable sheet, you can add, import, copy, duplicate, and delete rows by using multiple methods. You can insert rows manually, import data from external files, duplicate existing records, or remove records as needed.

PowerTable provides the following row management capabilities:

* Add one or more rows directly to the table.
* Import large data sets from Excel or CSV files.
* Insert rows through user forms.
* Duplicate existing records to reduce manual data entry.
* Copy records between PowerTable and other applications.
* Delete one or more rows directly from the table.

## Insert rows

Use the **Insert Row** option to manually add new rows to a table.

> [!NOTE]
> Use the [**Import**](#import-bulk-data) option to insert or update rows by using data from an external file.

### Insert a single row

To insert a single row:

1. Select **PowerTable** > **Insert Row**.

   :::image type="content" source="media/powertable-how-to-insert-import-rows/insert-row.png" alt-text="Screenshot of the Insert Row option.":::

1. The table adds a new blank row as the last row.

1. Select each cell, enter a value, and press **Enter**.

   :::image type="content" source="media/powertable-how-to-insert-import-rows/enter-value.png" alt-text="Screenshot of entering values in the inserted row." lightbox="media/powertable-how-to-insert-import-rows/enter-value.png":::

1. After inserting the required rows and entering the data, select **Save to Database** to save the changes.

To review the changes before saving, use **Preview Changes**. To remove the unsaved rows, use **Discard Changes**.

### Insert multiple rows

To insert multiple rows:

1. Select the dropdown next to **PowerTable** > **Insert Row**.
1. Select **Insert Multiple Rows**.

   :::image type="content" source="media/powertable-how-to-insert-import-rows/insert-multiple-rows.png" alt-text="Screenshot of the Insert Multiple Rows option.":::

1. Enter the **Number of Rows** to insert.
1. Select **Insert**.

   :::image type="content" source="media/powertable-how-to-insert-import-rows/number-of-rows.png" alt-text="Screenshot of the Insert Multiple Rows dialog box." lightbox="media/powertable-how-to-insert-import-rows/number-of-rows.png":::

    The specified number of rows is added to the table.

    :::image type="content" source="media/powertable-how-to-insert-import-rows/number-of-rows-added.png" alt-text="Screenshot of the number of rows added to the table." lightbox="media/powertable-how-to-insert-import-rows/number-of-rows-added.png":::

1. Select each cell, enter a value, and press **Enter**.
1. Alternatively, you can [copy multiple rows from a spreadsheet application](#copy-and-paste-rows) such as Excel and paste them into the table.
1. Select **Save to Database** to save the changes.

To review the changes before saving, use **Preview Changes**. To remove the unsaved rows, use **Discard Changes**.

> [!NOTE]
>
> * You can insert up to 1,000 rows at one time.
> * You can configure access controls to determine who can add rows to a table. For more information, see [Access control](./powertable-how-to-set-up-access-control.md).

### Insert using form interface

You can also configure the form interface as the default method for adding rows.

To set up the insert using a form interface:

1. Select the dropdown next to **PowerTable** > **Insert Row**.

1. Enable the **Insert Using Form By Default** toggle.

   :::image type="content" source="media/powertable-how-to-insert-import-rows/insert-using-form-default.png" alt-text="Screenshot of the Insert Using Form By Default toggle." :::

1. When you select **Insert Row**, a new row is inserted, and the **Form Editor** opens automatically.

    :::image type="content" source="media/powertable-how-to-insert-import-rows/form-editor.png" alt-text="Screenshot of the Form Editor." lightbox="media/powertable-how-to-insert-import-rows/form-editor.png":::

1. Enter the required values for the new row and select **Apply**.

    :::image type="content" source="media/powertable-how-to-insert-import-rows/form-editor-enter-values.png" alt-text="Screenshot of entering values in the Form Editor.":::

   > [!NOTE]
   > Use [**Customize Form**](./powertable-how-to-generate-forms.md#customize-form) to change the form fields and structure. The form configuration interface lets you add, edit, delete, and format form fields.

    The new row is inserted into the table.

    :::image type="content" source="media/powertable-how-to-insert-import-rows/new-row-inserted.png" alt-text="Screenshot of the inserted row." lightbox="media/powertable-how-to-insert-import-rows/new-row-inserted.png":::

1. After inserting the required rows, select **Save to Database** to save the changes.

## Insert rows by using forms

You can add new rows by using shareable PowerTable forms that you distribute through email or embed in websites. When users submit a form, the submitted values are inserted as new records in the table.

For information about creating and sharing forms, see [Create data entry forms](./powertable-how-to-generate-forms.md).

PowerTable forms support only the creation of new records. They don't support updating existing records.

## Import bulk data

You can also import bulk data from Excel or CSV files to add new rows or update existing rows.

When you import data, PowerTable compares the primary key values in the imported file with the existing records in the table.

* Records with matching primary keys are updated.
* Records with new primary keys are inserted as new rows.
* Records with mismatched or invalid data are flagged as errors and can be reviewed through the import error logs.

To import data:

1. Select **PowerTable** > **Import**.

   :::image type="content" source="media/powertable-how-to-insert-import-rows/import.png" alt-text="Screenshot of the Import option.":::

1. The **Import** dialog box appears. Select the **Excel** or **CSV option** to specify the format of the file and then select **Continue**.

   :::image type="content" source="media/powertable-how-to-insert-import-rows/excel-csv.png" alt-text="Screenshot of the Import dialog box." lightbox="media/powertable-how-to-insert-import-rows/excel-csv.png":::

1. Browse to or drop the file in the selected format, and then select **Upload**.

   :::image type="content" source="media/powertable-how-to-insert-import-rows/browse-file.png" alt-text="Screenshot of the excel file." lightbox="media/powertable-how-to-insert-import-rows/browse-file.png":::

   :::image type="content" source="media/powertable-how-to-insert-import-rows/import-file.png" alt-text="Screenshot of uploading the excel file." :::

1. Review the uploaded data and the count of rows marked for insert and update operations, and then select **Import**. Any import errors, such as data type mismatches, appear on the **Error** tab.

   :::image type="content" source="media/powertable-how-to-insert-import-rows/review-imported-data.png" alt-text="Screenshot of reviewing the imported data." lightbox="media/powertable-how-to-insert-import-rows/review-imported-data.png":::

The table is updated with the newly inserted rows and the modified values from the imported data.

:::image type="content" source="media/powertable-how-to-insert-import-rows/inserted-rows.png" alt-text="Screenshot of the updated table with new rows." lightbox="media/powertable-how-to-insert-import-rows/inserted-rows.png":::

> [!NOTE]
>
> * Ensure that the imported XLSX or CSV file contains the required primary key fields and any mandatory fields configured in the **Columns** section.
> * You can import up to 20,000 new rows at one time.

## Copy and paste rows

### Excel to PowerTable sheet

You can populate a PowerTable sheet by copying rows from external applications, such as Microsoft Excel, and pasting them directly into the table. This approach is useful when you only have a few rows to insert and don't need a full import.

1. Copy the rows you want to add from the spreadsheet.

    :::image type="content" source="media/powertable-how-to-insert-import-rows/copy-rows-spreadsheet.png" alt-text="Screenshot of copying rows from spreadsheet." lightbox="media/powertable-how-to-insert-import-rows/copy-rows-spreadsheet.png":::

1. Use [**Insert Row**](#insert-rows) to insert one or more rows.
1. Select the newly added rows, and then select the **Paste** option or press **Ctrl+V**.

    :::image type="content" source="media/powertable-how-to-insert-import-rows/paste.png" alt-text="Screenshot of pasting the copied rows from spreadsheet." lightbox="media/powertable-how-to-insert-import-rows/paste.png":::

The data is imported from Excel to the PowerTable sheet.

### PowerTable sheet to other applications

You can also copy data from a PowerTable sheet and paste it into external applications such as Microsoft Excel, Word, or Notepad for further analysis, reporting, or sharing.

To copy rows:

1. Select one or more rows.
1. Select the **Copy to Clipboard** icon on the toolbar, or press **Ctrl+C**.
1. Paste the data in the required applications.

   :::image type="content" source="media/powertable-how-to-insert-import-rows/copy-to-clipboard.png" alt-text="Screenshot of the Copy to Clipboard option." lightbox="media/powertable-how-to-insert-import-rows/copy-to-clipboard.png":::

## Duplicate rows

Duplicate existing records, and then modify only the required fields.

To duplicate rows:

1. Select one or more rows.
1. Select the **Duplicate** option on the toolbar.

   :::image type="content" source="media/powertable-how-to-insert-import-rows/duplicate.png" alt-text="Screenshot of the Duplicate option." lightbox="media/powertable-how-to-insert-import-rows/duplicate.png":::

The selected rows are duplicated. You can now update the required fields.

:::image type="content" source="media/powertable-how-to-insert-import-rows/duplicated-rows.png" alt-text="Screenshot of the duplicated rows." lightbox="media/powertable-how-to-insert-import-rows/duplicated-rows.png":::

> [!NOTE]
> Update unique primary key values after duplication because the original primary key values are copied to the new records.

## Delete rows

Delete one or more rows from a table.

To delete rows:

1. Select one or more rows.
1. Select **Delete** on the toolbar.

    :::image type="content" source="media/powertable-how-to-insert-import-rows/delete.png" alt-text="Screenshot of the Delete option." lightbox="media/powertable-how-to-insert-import-rows/delete.png":::

1. In the confirmation dialog box, select **Proceed**.

    :::image type="content" source="media/powertable-how-to-insert-import-rows/proceed.png" alt-text="Screenshot of the confirmation dialog box." lightbox="media/powertable-how-to-insert-import-rows/proceed.png":::

    The selected rows are deleted.

   > [!NOTE]
   > Depending on the delete-type configuration, rows are either soft-deleted or permanently deleted. To learn more, see **delete type** in the [delete](./powertable-how-to-set-up-access-control.md#configure-the-delete-type) section.

    :::image type="content" source="media/powertable-how-to-insert-import-rows/deleted-rows.png" alt-text="Screenshot of the deleted rows." lightbox="media/powertable-how-to-insert-import-rows/deleted-rows.png":::

1. After deleting the required rows, select **Save to Database** to save the changes, or **Discard Changes** to revert the deletion.

> [!NOTE]
> You can configure access controls to determine who can delete rows from a table. For more information, see [access control](./powertable-how-to-set-up-access-control.md#delete).
>
> If you configure an approval workflow, update and deletion requests go through the workflow before the records are updated or deleted. To learn more, see [Approval workflow](./powertable-how-to-configure-approval-workflow.md).
