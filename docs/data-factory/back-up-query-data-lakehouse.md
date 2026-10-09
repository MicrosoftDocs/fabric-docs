---
title: Back up query data to a Lakehouse with Dataflow Gen2 (preview)
description: Learn how to create a Backup action in Dataflow Gen2 that saves query results to a Fabric Lakehouse after each refresh.
author: mihirwagle
ms.author: mihirwagle
ms.service: fabric
ms.subservice: data-factory
ms.topic: how-to
ms.date: 09/23/2026
ai-usage: ai-assisted

#customer intent: As a Dataflow Gen2 author, I want to save query results after each refresh so that I can retain point-in-time copies in a Lakehouse.
---

# Back up query data to a Lakehouse with Dataflow Gen2 (preview)

> [!IMPORTANT]
> Backup is a preview feature. The preview supports Fabric Lakehouse table destinations.

In this article, we provide the steps to create a backup action for a query in Dataflow Gen2. The action saves query results to a new table in a Fabric Lakehouse when the dataflow refreshes.

Use a backup when you need point-in-time copies of query results.

> [!NOTE]
> A Lakehouse backup doesn't compare snapshots or identify changes between refreshes.

## Prerequisites

Before you begin, make sure you have:

- A [Fabric capacity](../enterprise/licenses.md) or Fabric trial capacity.
- A Dataflow Gen2 item that you can edit.
- A query that returns a table.
- Explicit, supported data types for the columns that you want to retain.
- A Fabric Lakehouse and permission to write to it.
- Access to every connection used by the dataflow.

> [!NOTE]
> For supported column types, see [Supported data source types per destination](dataflow-gen2-data-destinations-and-managed-settings.md#supported-data-source-types-per-destination). **Any** isn't supported for Lakehouse output. Assign a concrete type, such as **Whole number**, before you run a backup.

## Sample walkthrough

The example in this article uses a Dataflow Gen2 named `Backup_Lakehouse_Docs`, a Lakehouse named `BackupDocsLakehouse` with schemas enabled, and a query named `SampleSales`. To create this sample for yourself:

1. Create a Dataflow Gen2 and open it in Power Query.
1. Select **Home** > **Enter data** and create a table named `SampleSales`.
1. Use 100 synthetic rows with `OrderId`, `Product`, `Quantity`, and `Amount` columns.
   The sample order IDs are 1001 through 1100.
1. Set `OrderId`, `Quantity`, and `Amount` to **Whole number**, and `Product` to **Text**.
   Review the final query step, because a later transformation can change a column's type.

You don't need to configure a normal data destination for the source query to follow this walkthrough.

## What a backup creates

When you configure a backup, Dataflow Gen2 adds a generated backup query to the **Queries** pane. The generated query contains the selected Lakehouse destination settings. A backup runs with the existing dataflow refresh. You don't need to configure a separate schedule for the backup action.

Each of the three successful runs in this example created a separate table in the selected schema. The observed names combined the dataflow name, source query name, and a timestamp, for example: `Backup_Lakehouse_Docs_SampleSales_20260913_234410`.

The output included `DataflowRefreshId` and `DataflowRefreshTS`. The latter contained a Coordinated Universal Time (UTC) timestamp, such as `2026-09-13T23:44:10.457Z`. Treat the example table names as an observed name, not a guaranteed naming convention.

## Create a backup action

1. Open your Dataflow Gen2 item in the Power Query editor.

1. In the **Queries** pane, select the query that you want to back up.

1. On the **Home** tab, expand **Other actions**, and then select **Back up to Lakehouse**.

   :::image type="content" source="./media/back-up-query-data-lakehouse/01-backup-action-menu.png" alt-text="Screenshot of the Power Query editor with the Other actions menu open and Backup to Lakehouse available.":::

1. On the **Connect to backup destination** page, select or create the Lakehouse connection that you want to use. Then select **Next**.

   :::image type="content" source="./media/back-up-query-data-lakehouse/02-backup-connection.png" alt-text="Screenshot of the Backup dialog showing the Lakehouse connection settings. The existing connection name is redacted.":::

1. Expand the workspace and Lakehouse that contain the destination schema. Select the schema, and then select **Finish**.

   For the sample, select `BackupDocsLakehouse > dbo`. Select the schema, not only the Lakehouse. The wizard then enables **Finish**.

   The navigator's search only covers already expanded items. Expand the workspace and Lakehouse first. The screenshot filters for `dbo` to limit unrelated results.

   :::image type="content" source="./media/back-up-query-data-lakehouse/03-backup-destination.png" alt-text="Screenshot of the Backup destination navigator with dbo selected under BackupDocsLakehouse. An unrelated result is redacted.":::

1. Review the generated `SampleSales_Backup` query and its destination summary.
   Confirm the Lakehouse, schema, and **Auto mapping and allow for schema change**.

   The ordinary **Data destination** pane can still say **No data destination**.
   For this action, use the Backup summary to confirm the target.

   :::image type="content" source="./media/back-up-query-data-lakehouse/04-generated-backup-query.png" alt-text="Screenshot of the generated SampleSales_Backup query with BackupDocsLakehouse and dbo in the Backup destination summary.":::

1. Select **Save & run** to save and execute the dataflow.

## Run and verify the backup

1. Select **Recent runs** and confirm that the run succeeds. Refresh the history display if it still shows **In progress**.
1. Open `BackupDocsLakehouse` and refresh its Explorer.
1. Expand **Tables > dbo**, then open the newly created backup table.
1. Confirm the row count, source columns, and refresh metadata to ensure that every expected column was retained.

   :::image type="content" source="./media/back-up-query-data-lakehouse/05-first-backup-table.png" alt-text="Screenshot of the first backup table with 100 rows, four source columns, and two refresh metadata columns.":::

1. To test retained snapshots, change one source value while preserving its data type. Run the dataflow again and open both the old and new backup tables.

In the sample, the first table retained `Amount = 12` for `OrderId = 1001`. After the value was changed to `99` and the column explicitly typed as **Whole number**, the third run created another 100-row table with `Amount = 99`. The first table still contained `12` when reopened. Both tables had the four source columns and two metadata columns.

   :::image type="content" source="./media/back-up-query-data-lakehouse/11-typed-backup-table.png" alt-text="Screenshot of a later backup table with Amount 99 for OrderId 1001 and the earlier backup tables retained in Explorer.":::

Three runs are shown because the intermediate run exposed a column-type issue, described in [A column is missing from the backup](#a-column-is-missing-from-the-backup). All three reported **Succeeded**.

   :::image type="content" source="./media/back-up-query-data-lakehouse/10-refresh-history.png" alt-text="Screenshot of the recent runs showing three successful on-demand refreshes.":::

## Preview limitations

The following restrictions apply in preview:

- Only Fabric Lakehouse table destinations are supported.
- Lakehouse Files and SharePoint file destinations aren't supported.
- A source query can have only one Backup action.
- The source query must return a table.
- The source query can't be another action query.
- The generated Backup query can't have staging enabled.
- Backup doesn't calculate row-level or cell-level differences between snapshots.
- Backup doesn't include change visualization, anomaly analysis, or agent experiences.

## Troubleshoot the backup

### A column is missing from the backup

Check the column's data type at the final source-query step. A column can contain numbers in the preview while its declared type is **Any**. Assign a supported type and run the dataflow again.

A row-dependent replacement changed the sample's `Amount` column to **Any**. That run succeeded but produced a table without `Amount`. Explicitly restoring **Whole number** produced the column in the next backup. It didn't repair the table created by the earlier run. The warning and validation behavior needs separate review.

### The backup isn't available

Confirm that you're editing a Dataflow Gen2 item and have permission to edit it. If **Backup to Lakehouse** doesn't appear under **Other actions**, the preview might not be enabled for your tenant or region.

### The source query for the backup isn't valid

Backup requires a table-valued source query. If validation reports that the source query isn't a table, update the query so that it returns a table, save the dataflow, and validate again.

Backup also reports an error when:

- Backup is already enabled for the source query.
- The source query no longer exists.
- The source query is another action query.
- The query uses reserved Backup parameter or column names.

### The Lakehouse destination for the backup isn't valid

Confirm that:

- The Lakehouse still exists.
- The connection is valid.
- The connection identity can write to the Lakehouse.
- The selected destination is a Lakehouse schema.

### The dataflow refresh for the backup fails

Open the dataflow refresh history and review the failed activity. Record the dataflow ID, refresh ID, request ID, timestamp, and error code before contacting support.

For more information, see [View refresh history and monitor your dataflows](dataflows-gen2-monitor.md#refresh-history).

## Related content

- [What is Dataflow Gen2?](dataflows-gen2-overview.md)
- [Dataflow Gen2 data destinations and managed settings](dataflow-gen2-data-destinations-and-managed-settings.md)
- [Refresh a dataflow](dataflow-gen2-refresh.md)
