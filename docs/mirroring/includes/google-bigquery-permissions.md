---
author: whhender
ms.author: whhender
ms.date: 09/09/2025
ms.topic: include

---

You need user permissions for your BigQuery database that contains the following permissions:

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

The **BigQueryAdmin** and **StorageAdmin** roles should include these permissions.

The user needs to have at least one role assigned that allows access to the BigQuery instance.
Check the networking requirements to access your BigQuery data source. If you're using Mirroring for Google BigQuery for On-Premises Data Gateway (OPDG), you must have OPDG version 3000.286.6 or greater to enable successful Mirroring.

To manually establish buckets (and forgo needing to grant all bucket permissions), you can:

1. Navigate to **Cloud Storage** within your Google Console and select buckets.
1. Select **Create** and name the bucket in this format (case sensitive): \<projectid\>_fabric_staging_bucket
1. Ensure the location/region of the bucket is the same as the GCP Project you're planning to mirror.
1. Select **Create**. The mirroring system will automatically detect the bucket.

More permissions could be required depending on your use case. The minimum required permissions are for working with change history and handling various sized tables (tables larger than 10GB). Even if you aren't working with tables larger than 10GB, enable all of these minimum permissions to enable the success of your Mirroring usage.

For more information on permissions, see Google BigQuery documentation on [Required Privileges for Streaming data](https://cloud.google.com/bigquery/docs/streaming-data-into-bigquery), [Required Permissions for change history access](https://cloud.google.com/bigquery/docs/change-history), and [Required Permissions for writing query results](https://cloud.google.com/bigquery/docs/writing-results)

> [!IMPORTANT]
> Any granular security established in the source BigQuery warehouse must be reconfigured in the mirrored database in Microsoft Fabric.
> For more information, see [SQL granular permissions in Microsoft Fabric](../../data-warehouse/sql-granular-permissions.md).