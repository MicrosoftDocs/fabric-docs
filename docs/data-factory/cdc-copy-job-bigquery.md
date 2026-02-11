---
title: Change data capture from Google BigQuery using Copy job
description: This tutorial guides you through how to use CDC in copy job to move data from Google BigQuery.
ms.reviewer: yexu
ms.topic: tutorial
ms.date: 02/10/2026
ms.search.form: copy-job-tutorials
ms.custom: copy-job
ai-usage: ai-generated
---

# Change data capture from Google BigQuery using Copy job (Preview)

This tutorial describes how to use change data capture (CDC) in Copy job to efficiently replicate data changes from Google BigQuery to a destination. This ensures your destination data stays up to date automatically.

## Prerequisites

Before you begin, ensure you have the following:

**Google BigQuery requirements:**
- A Google Cloud Platform (GCP) account with a BigQuery project.
- **To enable change history:** The `bigquery.tables.update` permission on the tables where you want to enable change history.
- **To access change history data:** The `bigquery.tables.getData` permission on the tables. This permission is included in the following predefined IAM roles:
  - `roles/bigquery.dataViewer`
  - `roles/bigquery.dataEditor`
  - `roles/bigquery.dataOwner`
  - `roles/bigquery.admin`
- If tables have row-level access policies, you need the `bigquery.rowAccessPolicies.overrideTimeTravelRestrictions` permission (included in the `roles/bigquery.admin` role) to access historical data.
- Tables must have change history enabled (`enable_change_history = TRUE`).
- Change history is limited to the table's time travel period (configurable between 2 and 7 days, with 7 days as the default).

For more information about BigQuery permissions and change history, see [BigQuery IAM roles and permissions](https://cloud.google.com/bigquery/docs/access-control) and [Work with change history](https://cloud.google.com/bigquery/docs/change-history).

**Fabric requirements:**
- A Fabric workspace with the necessary permissions to create a Copy job.
- A destination data store supported by Copy job for CDC replication.

> [!TIP]
> Assign BigQuery IAM roles at the appropriate resource level (project, dataset, or table) following the principle of least privilege.

### Enable change data capture in Google BigQuery

Google BigQuery uses change history to enable change data capture. When you enable change history on a table, BigQuery tracks all changes (INSERT, UPDATE, and DELETE operations) that you can query using the `CHANGES` function. Follow these steps to enable change history on your BigQuery tables:

1. Sign in to the [Google Cloud Console](https://console.cloud.google.com/).

1. Navigate to BigQuery in the Google Cloud Console.

1. Enable change history on a table using one of the following methods:

   **Using SQL (DDL):**
   
   For a new table, create it with change history enabled:

   ```sql
   CREATE TABLE `project_id.dataset_id.table_name` (
     column1 STRING,
     column2 INT64,
     column3 TIMESTAMP
   )
   OPTIONS (
     enable_change_history = TRUE
   );
   ```

   For an existing table, alter it to enable change history:

   ```sql
   ALTER TABLE `project_id.dataset_id.table_name`
   SET OPTIONS (
     enable_change_history = TRUE
   );
   ```

   Replace `project_id`, `dataset_id`, and `table_name` with your actual project, dataset, and table names.

   Example:

   ```sql
   ALTER TABLE `my-project.sales.customers`
   SET OPTIONS (
     enable_change_history = TRUE
   );
   ```

   **Using the BigQuery Console:**
   
   1. In the BigQuery Console, navigate to your dataset and select the table.
   1. Select **Schema** > **Edit schema**.
   1. Select **Advanced options**.
   1. Check the box for **Enable change history**.
   1. Select **Save**.

1. Verify that change history is enabled. Run the following query:

   ```sql
   SELECT
     table_catalog,
     table_schema,
     table_name,
     option_name,
     option_value
   FROM
     `project_id.dataset_id.INFORMATION_SCHEMA.TABLE_OPTIONS`
   WHERE
     table_name = 'table_name'
     AND option_name = 'enable_change_history';
   ```

   Replace `project_id`, `dataset_id`, and `table_name` with your values. The query should return `TRUE` for the `option_value` if change history is enabled.

1. (Optional) Test the change history by querying changes:

   ```sql
   SELECT *
   FROM CHANGES(
     TABLE `project_id.dataset_id.table_name`,
     TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 HOUR),
     CURRENT_TIMESTAMP()
   );
   ```

   This query retrieves all changes made to the table in the past hour.

> [!NOTE]
> - BigQuery change history tracks INSERT, UPDATE, and DELETE operations using the `CHANGES` table-valued function.
> - Change history is limited to the table's time travel period (default 7 days). You can't query changes within the last 10 minutes due to transactional consistency requirements.
> - Enabling change history might incur additional storage costs for metadata.
> - You need the `bigquery.tables.update` permission to enable change history on tables.
> - The `_CHANGE_TYPE` column in the `CHANGES` function output indicates the type of change: `INSERT`, `UPDATE`, or `DELETE`.

For more information about BigQuery change history, see the official [Google Cloud Documentation - Work with change history](https://cloud.google.com/bigquery/docs/change-history).

## Create a Copy job with Google BigQuery CDC

> [!NOTE]
> -  The following steps are very similar to what you have done in [Use Copy job to ingest data from Azure SQL DB via CDC to another Azure SQL DB](cdc-copy-job.md#how-to-get-started)

Complete the following steps to create a new Copy job to ingest data from Google BigQuery via CDC to a destination:

1. Select **+ New Item**, choose the **Copy job** icon, name your Copy job, and select **Create**.

   :::image type="content" source="media/copy-job/create-new-copy-job.png" alt-text="Screenshot showing where to navigate to the Data Factory home page and create a new Copy job.":::

1. Choose the data store to copy data from. In this example, choose **Google BigQuery**.

1. Enter your **connection details** and **credentials** to connect to Google BigQuery. You need to provide your Google Cloud project ID and authentication credentials.

1. You should have clear visibility of which source tables have CDC enabled. Select the **tables with CDC enabled** to copy.

   Tables with CDC enabled:
   :::image type="content" source="media/copy-job/cdc-table-icon.png" alt-text="Screenshot showing cdc table icon.":::

   Tables without CDC enabled:
   :::image type="content" source="media/copy-job/none-cdc-table-icon.png" alt-text="Screenshot showing none cdc table icon.":::

   :::image type="content" source="media/copy-job/select-cdc-tables.png" alt-text="Screenshot showing where to select cdc tables for the Copy job.":::

1. Select your destination store. Choose a destination that supports CDC operations for optimal CDC replication.

   :::image type="content" source="media/copy-job/select-destination-store.png" alt-text="Screenshot showing where to select the destination store for the Copy job.":::

   > [!NOTE]
   > Based on the supported connectors, Google BigQuery as a CDC source can replicate to destinations that support incremental copy. Review the [supported connectors for CDC](cdc-copy-job.md#supported-connectors) to choose an appropriate destination.

1. Select **Incremental copy** and you'll see no Incremental column for each table is required to be input to track changes. The default **Update method** should be set to **Merge**, and the required key columns will match the primary key defined in the source store by default.

   > [!NOTE]
   > Copy job initially performs a full load and subsequently carries out incremental copies in subsequent runs via CDC.

   :::image type="content" source="media/copy-job/copy-job-cdc-mode.png" alt-text="Screenshot showing where to select the CDC.":::

1. Review the job summary, set the run option to on schedule, and select **Save + Run**.

   > [!NOTE]
   > Ensure that your BigQuery change history retention period is longer than the interval between scheduled runs; otherwise, the changed data might be lost if not processed within the retention period.

1. Your copy job starts immediately. The first run copies an initial full snapshot.

1. Update your source tables in BigQuery by inserting, updating, or deleting rows.

1. Run the Copy job again to capture and replicate all changes, including inserted, updated, and deleted rows, to the destination.

## Next steps

- [Change data capture (CDC) in Copy job](cdc-copy-job.md)
- [What is the Copy job in Data Factory](what-is-copy-job.md)
- [How to monitor a Copy job](monitor-copy-job.md)
- [Google BigQuery connector overview](connector-google-bigquery-overview.md)
