---
title: Audit Logs in PowerTable
description: Learn how to view, search, filter, export, and revert audit logs, monitor writeback transactions, and track record updates in PowerTable.
ms.date: 07/13/2026
ms.topic: how-to
#customer intent: As a user, I want to track data changes, monitor writeback activities, and review audit history so that I can audit and manage changes in PowerTable.
---

# Audit logs in PowerTable

Audit logs provide a comprehensive record of changes to a table. In PowerTable, the audit log helps you track changes to data, user access activities, and configuration settings.

By using the audit log, you can:

* Track data, access, and configuration changes.
* Review who made a change and when they made it.
* Search and filter logs to locate specific records.
* Export audit logs for auditing, reporting, and compliance purposes.

In this article, you learn how to view, search, filter, and export audit logs.

## View audit logs and track changes

To view audit logs:

1. Select **PowerTable** > **Audit**. The audit log window opens and shows recent changes to the table.

    :::image type="content" source="media/powertable-how-to-view-audit-logs/audit.png" alt-text="Screenshot of the Audit option on the toolbar.":::

1. Select the appropriate tab to review a specific type of change:

    * **Data**: Shows data modifications to records.
    * **Access**: Shows changes to row and column access permissions.
    * **Table**: Shows changes to table settings and configurations.

    :::image type="content" source="media/powertable-how-to-view-audit-logs/data-access-table.png" alt-text="Screenshot of the Data, Access and Table options." lightbox="media/powertable-how-to-view-audit-logs/data-access-table.png":::

### Data

The **Data** tab provides a chronological record of transactions and actions on the source table.

The audit log includes the following information:

* Row ID of the modified record.
* Type of modification.
* Transaction ID for the change.
* Source type.
* Modified columns.
* Previous and new values.
* User who made the change.
* Date and time of the change.
* Approver details, such as approver names and date and time of approval: if approval flow is enabled.

:::image type="content" source="media/powertable-how-to-view-audit-logs/data.png" alt-text="Screenshot of the Data tab." lightbox="media/powertable-how-to-view-audit-logs/data.png":::

The audit log captures significant actions such as **Insert**, **Update**, **Delete**, and **Soft Delete**.

### Access

The **Access** tab tracks changes to row and column access permissions, including who made each change and when.

:::image type="content" source="media/powertable-how-to-view-audit-logs/access.png" alt-text="Screenshot of the Access tab." lightbox="media/powertable-how-to-view-audit-logs/access.png":::

### Table

The **Table** tab records changes to table settings and column configurations, including the addition of new columns and updates to existing column settings.

:::image type="content" source="media/powertable-how-to-view-audit-logs/table.png" alt-text="Screenshot of the Table tab." lightbox="media/powertable-how-to-view-audit-logs/table.png":::

> [!IMPORTANT]
> PowerTable sheet doesn't support audit log when type 2 SCDs are enabled.

## Search and filter audit logs

Use the **Search** and **Filter** options to locate specific changes and records.

### Search log

Enter a **Row ID**, **Modified Column**, **Action**, or **Source Type** to search for specific audit log entries. The logs update dynamically to show the entries that match your search criteria.

:::image type="content" source="media/powertable-how-to-view-audit-logs/search-log.png" alt-text="Screenshot of searching a log.." lightbox="media/powertable-how-to-view-audit-logs/search-log.png":::

### Filter by user

To view the changes a specific user made, select the user from the **All Users** dropdown.

:::image type="content" source="media/powertable-how-to-view-audit-logs/all-users.png" alt-text="Screenshot of filtering the logs by user." :::

### Filter by time period

Filter logs by a predefined time period or a custom date range. The default is **Last 24 Hours**.

:::image type="content" source="media/powertable-how-to-view-audit-logs/last-24-hours.png" alt-text="Screenshot of filtering the logs by time period." lightbox="media/powertable-how-to-view-audit-logs/last-24-hours.png":::

### Advanced filters

Select **Filter** to filter the logs based on the following options:

* **Action**: Filter logs by action type, such as Insert, Update, Delete, or Soft Delete.
* **Approved By**: Filter logs by the user who approved the changes.
* **Modified Column**: Filter logs by the modified columns.
* **Transaction ID**: Filter logs by specific transaction IDs.
* **Reset All**: Clear all applied filters.

:::image type="content" source="media/powertable-how-to-view-audit-logs/filter.png" alt-text="Screenshot of the filtering options in Filter pane." lightbox="media/powertable-how-to-view-audit-logs/filter.png":::

## Export audit logs

You can export audit logs in Excel (.xlsx) format for offline analysis and reporting.

1. To export, select **Download Logs**.

    :::image type="content" source="media/powertable-how-to-view-audit-logs/download-logs.png" alt-text="Screenshot of the Download Logs option." lightbox="media/powertable-how-to-view-audit-logs/download-logs.png":::

1. Specify the time period for the exported logs by using the **Include Data For** dropdown.

    :::image type="content" source="media/powertable-how-to-view-audit-logs/include-data-for.png" alt-text="Screenshot of the Export Audit Logs window." lightbox="media/powertable-how-to-view-audit-logs/include-data-for.png":::

1. By default, *Last 30 Days* is selected. To export logs for a certain time period, select **Custom Date Range** and enter the relevant dates.
1. Select **Export**.
1. After the file link appears, select and hold (or right-click) the link and save the file to your local system.

## Refresh logs

Use **Refresh** to retrieve the latest logs.

## Revert changes

Use **Revert Changes** to revert previously written-back updates, so you can safely restore records to an earlier state. If you make incorrect changes, you can undo them by using this option.  

You can only revert **UPDATE** actions.  

1. Select one or more records from the audit log that contain updated values.
1. Select **Revert Changes**.

    :::image type="content" source="media/powertable-how-to-view-audit-logs/revert-changes.png" alt-text="Screenshot of the Revert Changes option." lightbox="media/powertable-how-to-view-audit-logs/revert-changes.png":::

1. Confirm the changes and select **Revert**.

    :::image type="content" source="media/powertable-how-to-view-audit-logs/revert.png" alt-text="Screenshot of the Revert Changes dialog box." lightbox="media/powertable-how-to-view-audit-logs/revert.png":::

PowerTable rolls back the updates to their previous state.

:::image type="content" source="media/powertable-how-to-view-audit-logs/rolled-back-updates.png" alt-text="Screenshot of the rolled back updates." lightbox="media/powertable-how-to-view-audit-logs/rolled-back-updates.png":::

PowerTable logs the revert actions, as shown in the following screenshot, along with the action type, user information, and reverted timestamp. PowerTable also keeps the old entries intact for complete traceability.  

:::image type="content" source="media/powertable-how-to-view-audit-logs/logged-revert-actions.png" alt-text="Screenshot of the logged revert actions." lightbox="media/powertable-how-to-view-audit-logs/logged-revert-actions.png":::

PowerTable doesn't support **Revert Changes** for Type 3 SCD records.  

:::image type="content" source="media/powertable-how-to-view-audit-logs/revert-not-supported-type3-scd.png" alt-text="Screenshot of the revert changes not supported for Type 3 SCD records notification." lightbox="media/powertable-how-to-view-audit-logs/revert-not-supported-type3-scd.png":::

### Reversion in case of multiple updates in a row

If you update a record multiple times, PowerTable uses the earliest modification before the selected items for reversion.

For example, in the following image, the product color changes three times. *NA* > *Pink* > *Red* > *Black*.

You select the change from *Pink* to *Red* for reversion.

:::image type="content" source="media/powertable-how-to-view-audit-logs/reversion-multiple-updates.png" alt-text="Screenshot of the Revert Changes for multiple updates." lightbox="media/powertable-how-to-view-audit-logs/reversion-multiple-updates.png":::

PowerTable performs the reversion in the following way:
1. PowerTable undoes any changes made after the selected modification. PowerTable undoes both changes—from *Pink* to *Red* and the subsequent change from *Red* to *Black*.
1. The record reverts to the last modification made (*NA* > ***Pink***) before the chosen change.

    :::image type="content" source="media/powertable-how-to-view-audit-logs/revert-multiple-updates.png" alt-text="Screenshot of reverting multiple updates." lightbox="media/powertable-how-to-view-audit-logs/revert-multiple-updates.png":::

1. When you select **Revert**, the reverted state becomes the current version.

### Error log

If you delete a record after an update, you can't revert that update because the record no longer exists. PowerTable displays these records on the **Error** tab in the confirmation preview so that you can review them before proceeding.

Consider the following example, where you select all changes for reversion. The confirmation preview shows the old and new values for records that you can revert. For row ID *611*, PowerTable displays an error because you deleted the record after updating it.

:::image type="content" source="media/powertable-how-to-view-audit-logs/error.png" alt-text="Screenshot of the Error tab in Revert Changes dialog box." lightbox="media/powertable-how-to-view-audit-logs/error.png":::

To exclude the deleted rows and proceed with reverting the remaining records, select **Exclude errors and Revert**.

## View writeback logs

Writeback logs provide a high-level view of writeback operations performed on a table. Use writeback logs to monitor the status of transactions, track import and update activities, and review execution details for each writeback operation.

To view writeback logs, select **PowerTable**, select the dropdown arrow next to **Audit**, and then select **Writeback Logs**.

:::image type="content" source="media/powertable-how-to-view-audit-logs/writeback-logs.png" alt-text="Screenshot of Writeback logs option on the toolbar.":::

The **Writeback Logs** page opens and shows all writeback transactions for the selected table.

:::image type="content" source="media/powertable-how-to-view-audit-logs/writeback-logs-page.png" alt-text="Screenshot of the Writeback Logs page." lightbox="media/powertable-how-to-view-audit-logs/writeback-logs-page.png":::

The writeback logs page includes the following information:

* **ID**: Unique identifier for the writeback transaction.
* **Database**: Name of the database associated with the transaction.
* **Source**: Source system where the transaction ran.
* **Transaction**: Type of writeback operation performed.
* **Row Count**: Number of rows affected by the transaction.
* **Duration**: Time to complete the transaction.
* **Status**: Current status of the transaction.
* **Started At**: Date and time when the transaction started.
* **Started By**: User who performed the transaction.

### Search and filter writeback logs

Use the search and filter options to find specific writeback transactions.

The following filters are available:

* **ID**: Search for a specific writeback transaction by its ID.

  :::image type="content" source="media/powertable-how-to-view-audit-logs/id.png" alt-text="Screenshot of the ID search box." lightbox="media/powertable-how-to-view-audit-logs/id.png":::

* **Transaction**: Filter transactions by operation type, such as **Insert**, **Update**, **Delete**, **SCD Update**, or **Bulk Import**.

  :::image type="content" source="media/powertable-how-to-view-audit-logs/transaction.png" alt-text="Screenshot of the Transaction dropdown." lightbox="media/powertable-how-to-view-audit-logs/transaction.png":::

* **Started By**: Filter transactions by the user who initiated the writeback operation.

  :::image type="content" source="media/powertable-how-to-view-audit-logs/started-by.png" alt-text="Screenshot of the Started By dropdown." lightbox="media/powertable-how-to-view-audit-logs/started-by.png":::

* **Status**: Filter transactions by status, such as **Success**, **Partial Success**, **Failed**, **Running**, or **Queued**.

  :::image type="content" source="media/powertable-how-to-view-audit-logs/status.png" alt-text="Screenshot of the Status dropdown." lightbox="media/powertable-how-to-view-audit-logs/status.png":::

* **Job Type**: Filter transactions by execution type, such as **Direct** or **Approvals**.

  :::image type="content" source="media/powertable-how-to-view-audit-logs/job-type.png" alt-text="Screenshot of the Job Type dropdown." lightbox="media/powertable-how-to-view-audit-logs/job-type.png":::

* **Started At**: Filter transactions by time period, including **Within the Last 24 Hours**, **Last 7 Days**, **Last 30 Days**, or a custom date range by using **Between**.

  :::image type="content" source="media/powertable-how-to-view-audit-logs/started-at.png" alt-text="Screenshot of the Started At dropdown." lightbox="media/powertable-how-to-view-audit-logs/started-at.png":::

* **Reset Filter**: Clear all applied filters and restore the default view. This option becomes available when you apply one or more filters.

  :::image type="content" source="media/powertable-how-to-view-audit-logs/reset-filter.png" alt-text="Screenshot of the Reset Filter option." lightbox="media/powertable-how-to-view-audit-logs/reset-filter.png":::

## View last updated details

Use the **Last Updated Details** columns to view the most recent update information for each record directly in the PowerTable sheet.

To insert these columns:

1. Select **PowerTable**, and then select the dropdown arrow next to **Audit**.
1. Turn on the **Last Updated Details** toggle.

   :::image type="content" source="media/powertable-how-to-view-audit-logs/last-updated-details.png" alt-text="Screenshot of the Last Updated Details toggle.":::

The table includes two extra columns:

* **Last Edited At**: Shows the date and time when the record was last modified.
* **Last Edited By**: Shows the user who last modified the record.

  :::image type="content" source="media/powertable-how-to-view-audit-logs/last-edited-at-by.png" alt-text="Screenshot of the Last Edited At and Last Edited By columns." lightbox="media/powertable-how-to-view-audit-logs/last-edited-at-by.png":::

Disable the **Last Updated Details** toggle to hide these columns from the table.
