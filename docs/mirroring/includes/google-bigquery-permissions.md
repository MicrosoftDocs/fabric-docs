---
ms.date: 09/09/2025
author: misaacs
ms.topic: include

---

# Mirroring for Google BigQuery (GBQ) – Permissions List

## Retrieve Table Metadata and Change History Configuration (Required)

The following permissions are required to determine whether change history is enabled and to retrieve primary key or composite key information.

### Required Permissions

    - `bigquery.tables.get\`
    - `bigquery.tables.list\`
    - `bigquery.routines.get\`
    - `bigquery.routines.list\`

\---

## Retrieve Change History and Table Data (Required)

The following permissions are required to read change history and table data.

### Required Permissions

    - `bigquery.tables.getData\`
    - `bigquery.jobs.create\`
    - `bigquery.jobs.get\`
    - `bigquery.jobs.list\`
    - `bigquery.readsessions.create\`
    - `bigquery.readsessions.getData\`

\---

## Enabling Change History Capabilities (Required)

Change history must be enabled on the source BigQuery tables using \*\*one\*\* of the following options.

### Option 1: Enable Permission

\-\`bigquery.tables.update\`

Allows enabling change history on tables.

### Option 2: Enable Table Option in GCP

Ensure the following table option is set to \`TRUE\`:

    -  `enable\_change\_history\`

\---

## Export Data to Google Cloud Storage for Staging and Copy to OneLake (Required)

The following permissions are required to export BigQuery data to Google Cloud Storage for staging and copy it into OneLake.

### Required Permissions
    - `bigquery.tables.export\`
    - `storage.objects.create\`
    - `storage.objects.list\`
    - `storage.buckets.get\`
    - `iam.serviceAccounts.signBlob\`

\---

## Google Cloud Storage Bucket for Staging (Required)

A Google Cloud Storage bucket is required to export BigQuery table data for staging.

### Bucket Creation Options

Use \*\*one\*\* of the following approaches:

#### Option 1: Allow Automatic Bucket Creation

Grant the following permission:

    - `storage.buckets.create\`

#### Option 2: Manually Create the Staging Bucket

Create a bucket with the following naming convention: `<your\_project\_id\_in\_lowercase>\_fabric\_staging\_bucket\`

### Bucket Requirements
    - The bucket \*\*must be in the same location/region as the BigQuery dataset\*\*.
    - The Mirroring system will automatically detect the bucket once it exists.

\---

## List Datasets (Required)

### Required Permissions

    - `bigquery.datasets.get\`

\---

## List Projects (Required)

### Required Permissions

    - `resourcemanager.projects.get\`

\---

## Role and Access Requirements

The \*\*BigQuery Admin\*\* and \*\*Storage Admin\*\* roles typically include the permissions listed above.

The user must be assigned at least one role that grants access to the target BigQuery project and datasets.

\---

## Networking and Gateway Requirements

Check the networking requirements to access your BigQuery data source.

If you are using \*\*Mirroring for Google BigQuery with the On-Premises Data Gateway (OPDG)\*\*, you must use:

\-\*\*OPDG version 3000.286.6 or later\*\*

\---

## Additional Notes

More permissions may be required depending on your use case. The permissions listed above represent the \*\*minimum required\*\* for:

    - Working with change history
    - Handling tables of various sizes, including tables larger than 10 GB

Even if you are not currently working with tables larger than 10 GB, enabling all minimum permissions is recommended to ensure successful Mirroring.

For more information, see:

    - [Required Privileges for Streaming Data\](https://cloud.google.com/bigquery/docs/streaming-data-into-bigquery)
    - [Required Permissions for Change History Access\](https://cloud.google.com/bigquery/docs/change-history)
    - [Required Permissions for Writing Query Results\](https://cloud.google.com/bigquery/docs/writing-results)

\> \[!IMPORTANT\]

\> Any granular security defined in the source BigQuery warehouse must be reconfigured in the mirrored database in Microsoft Fabric.

\> For more information, see \[SQL granular permissions in Microsoft Fabric\](../../data-warehouse/sql-granular-permissions.md).