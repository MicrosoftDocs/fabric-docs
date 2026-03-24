---
ms.date: 03/24/2026
author: misaacs
ms.topic: include
---

You need user permissions for your BigQuery database that contains the following permissions:

## Mirroring for Google BigQuery (GBQ) – Permissions List

- `bigquery.datasets.create`
- `bigquery.tables.list`
- `bigquery.tables.create`
- `bigquery.tables.export`
- `bigquery.tables.get`
- `bigquery.tables.getData`
- `bigquery.tables.updateData`
- `bigquery.routines.get`
- `bigquery.routines.list`
- `bigquery.jobs.create`
- `storage.buckets.create`
- `storage.buckets.list`
- `storage.objects.create`
- `storage.objects.delete`
- `storage.objects.list`
- `iam.serviceAccounts.signBlob`

### Retrieve Table Metadata and Change History Configuration (Required)

The **BigQueryAdmin** and **StorageAdmin** roles should include these permissions.
The following permissions are required to determine whether change history is enabled and to retrieve primary key or composite key information.

The user needs to have at least one role assigned that allows access to the BigQuery instance.
Check the networking requirements to access your BigQuery data source. If you're using Mirroring for Google BigQuery for On-Premises Data Gateway (OPDG), you must have OPDG version 3000.286.6 or greater to enable successful Mirroring.

#### Required Permissions

To manually establish buckets (and forgo needing to grant the **storage.buckets.create** permission), you can use:

- `bigquery.tables.get`
- `bigquery.tables.list`
- `bigquery.routines.get`
- `bigquery.routines.list`

1. Navigate to **Cloud Storage** within your Google Console and select **Buckets**.
1. Select **Create** and name the bucket in this format (case sensitive): `<projectid>_fabric_staging_bucket`
1. Ensure the location/region of the bucket is the same as the GCP Project you're planning to mirror.
1. Select **Create**. The mirroring system will automatically detect the bucket.

---

More permissions could be required depending on your use case. The minimum required permissions are for working with change history and handling various sized tables (tables larger than 10GB). Even if you aren't working with tables larger than 10GB, enable all of these minimum permissions to enable the success of your Mirroring usage.

### Retrieve Change History and Table Data (Required)

For more information on permissions, see Google BigQuery documentation on [Required Privileges for Streaming data](https://cloud.google.com/bigquery/docs/streaming-data-into-bigquery), [Required Permissions for change history access](https://cloud.google.com/bigquery/docs/change-history), and [Required Permissions for writing query results](https://cloud.google.com/bigquery/docs/writing-results)

The following permissions are required to read change history and table data.

> [!IMPORTANT]
> Any granular security established in the source BigQuery warehouse must be reconfigured in the mirrored database in Microsoft Fabric.
> For more information, see [SQL granular permissions in Microsoft Fabric](../../data-warehouse/sql-granular-permissions.md).

#### Required Permissions

- `bigquery.tables.getData`
- `bigquery.jobs.create`
- `bigquery.jobs.get`
- `bigquery.jobs.list`
- `bigquery.readsessions.create`
- `bigquery.readsessions.getData`

---

### Enabling Change History Capabilities (Required)

Change history must be enabled on the source BigQuery tables using **one** of the following options.

#### Option 1: Enable Permission

- `bigquery.tables.update`

Allows enabling change history on tables.

#### Option 2: Enable Table Option in GCP

Ensure the following table option is set to `TRUE`:

- `enable_change_history`

---

### Export Data to Google Cloud Storage for Staging and Copy to OneLake (Required)

The following permissions are required to export BigQuery data to Google Cloud Storage for staging and copy it into OneLake.

#### Required Permissions

- `bigquery.tables.export`
- `storage.objects.create`
- `storage.objects.list`
- `storage.buckets.get`
- `iam.serviceAccounts.signBlob`

---

### Google Cloud Storage Bucket for Staging (Required)

A Google Cloud Storage bucket is required to export BigQuery table data for staging.

#### Bucket Creation Options

Use **one** of the following approaches:

**Option 1: Allow Automatic Bucket Creation**

Grant the following permission:

- `storage.buckets.create`

**Option 2: Manually Create the Staging Bucket**

Create a bucket with the following naming convention: `<your_project_id_in_lowercase>_fabric_staging_bucket`

#### Bucket Requirements

- The bucket **must be in the same location/region as the BigQuery dataset**.
- The Mirroring system will automatically detect the bucket once it exists.

---

### List Datasets (Required)

#### Required Permissions

- `bigquery.datasets.get`

---

### List Projects (Required)

#### Required Permissions

- `resourcemanager.projects.get`

---

### Role and Access Requirements

The **BigQuery Admin** and **Storage Admin** roles typically include the permissions listed above.

The user must be assigned at least one role that grants access to the target BigQuery project and datasets.

---

### Networking and Gateway Requirements

Check the networking requirements to access your BigQuery data source.

If you're using **Mirroring for Google BigQuery with the on-premises Data Gateway (OPDG)**, you must use:

- **OPDG version 3000.286.6 or later**

---

### Additional Notes

More permissions may be required depending on your use case. The permissions listed above represent the **minimum required** for:

- Working with change history
- Handling tables of various sizes, including tables larger than 10 GB

Even if you aren't currently working with tables larger than 10 GB, enabling all minimum permissions is recommended to ensure successful Mirroring.

For more information, see:

- [Required Privileges for Streaming Data](https://cloud.google.com/bigquery/docs/streaming-data-into-bigquery)
- [Required Permissions for Change History Access](https://cloud.google.com/bigquery/docs/change-history)
- [Required Permissions for Writing Query Results](https://cloud.google.com/bigquery/docs/writing-results)

> [!IMPORTANT]
> Any granular security defined in the source BigQuery warehouse must be reconfigured in the mirrored database in Microsoft Fabric.
> For more information, see [SQL granular permissions in Microsoft Fabric](../../data-warehouse/sql-granular-permissions.md).