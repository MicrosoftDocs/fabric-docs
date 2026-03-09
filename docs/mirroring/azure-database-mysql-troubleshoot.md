---
title: Troubleshoot Fabric Mirrored Databases from Azure Database for MySQL (Preview)
description: Troubleshooting mirrored databases from Azure Database for MySQL in Microsoft Fabric.
ms.reviewer: vamehta, maghan
ms.date: 03/18/2026
ms.topic: troubleshooting
ms.custom:
  - references_regions
---

# Troubleshoot Fabric mirrored databases from Azure Database for MySQL (preview)

This article covers troubleshooting steps for mirroring Azure Database for MySQL.

## Changes to Fabric capacity or workspace

| Cause | Result | Recommended resolution |
| --- | --- | --- |
| Fabric capacity paused or deleted | Mirroring stops | 1. Resume or assign capacity from the Azure portal.<br />2. Go to the Fabric mirrored database item. From the toolbar, select **Stop replication**.<br />3. Start replication by selecting **Mirror database** for the mirrored item in the Fabric portal. |
| Fabric capacity resumed | Mirroring doesn't resume | 1. Go to the Fabric mirrored database item. From the toolbar, select **Stop replication**.<br />2. Start replication by selecting **Mirror database** for the mirrored item in the Fabric portal. |
| Workspace deleted | Mirroring stops automatically | If mirroring is still active on the Azure Database for MySQL, connect by using a server admin and stop the mirroring replication process through the MySQL administrative tools or by disabling the mirroring configuration in the Fabric portal. |
| Fabric trial capacity expired | Mirroring stops automatically | See [Fabric trial capacity expires](../../fundamentals/fabric-trial.md#the-trial-expires). |
| Fabric capacity exceeded | Mirroring pauses | Wait until the overload state is over or update your capacity. For more information, see [Actions you can take to recover from overload situations](../../enterprise/throttling.md#how-to-stop-throttling-when-it-occurs). Mirroring continues once the capacity is recovered. |
| Any other resource errors | Mirroring is disabled | To ensure your compute resources aren't affected and to minimize impact on the Azure Database for MySQL, mirroring disables on any persistent resource errors. |

## SQL queries for troubleshooting

If you're experiencing mirroring problems, perform the following server level checks using system views and functions to validate configuration.

Check if the following server parameters are set to the required values:

| Server Parameter | Required Value |
| --- | --- |
| `binlog_row_image` | `noblob`/`full` |
| `gtid_mode` | `OFF` |
| `aad_auth_only` | `OFF` |

| Status Code | Status Type | Description |
| --- | --- | --- |
| `PipelineNullContext` | ERROR | The Fabric mirroring process failed to start. Recommended Action - Restart Fabric mirroring. If the issue persists after restart, contact support. |
| `ValidationNullModel` | ERROR | Invalid or missing mirroring configuration detected. Recommended Action - Contact Support. |
| `ValidationInvalidModelType` | ERROR | Invalid or missing mirroring configuration detected. Recommended Action - Contact Support. |
| `ValidationNullTargetConnectionInfo` | ERROR | Target connection information is missing. Recommended Action - Contact Support. |
| `MetadataBulkLoadStatusMissing` | ERROR | Verify bulk load completion and restart Fabric mirroring. If the issue persists, contact support. |
| `MetadataCdcStatusMissing` | ERROR | Verify change data completion and restart Fabric mirroring. If the issue persists, contact support. |
| `CdcCrashRecoveryFailed` | ERROR | Contact Support. |
| `UploadFileError` | ERROR | Contact Support. |
| `StorageLandingZoneNull` | ERROR | Contact Support. |
| `StorageLandingZoneInvalid` | ERROR | Mirroring configuration error. Recommended Action - Contact Support. |
| `BinlogDisabled` | ERROR | Enable `log_bin=ON` and `binlog_format=ROW`, then restart Fabric mirroring. |
| `BinlogLocklessHandled` | ERROR | Contact Support. |
| `BinlogLocklessUnhandled` | ERROR | Contact Support. |
| `PrepareServerUnhandled` | ERROR | Contact Support. |
| `PipelineStepFailed` | ERROR | Contact Support. |
| `InternalContainerNameInvalid` | ERROR | Contact Support. |
| `CdcPipelineError` | ERROR | Contact Support. |
| `ManagerStartFailure` | ERROR | Restart Fabric mirroring. If the issue persists, contact support. |
| `ManagerStopFailure` | ERROR | Restart Fabric mirroring. If the issue persists, contact support. |
| `BulkLoadStepFailed` | ERROR | Contact Support. |
| `ValidationNullDbName` | ERROR | No database name provided for mirroring. Provide a valid database name and retry. |
| `ValidationNullSelectedTables` | ERROR | No tables selected for mirroring. Select one or more tables and restart Fabric mirroring. |
| `MetadataTableMissing` | ERROR | Restart Fabric mirroring. If the issue persists, contact support. |
| `ValidationTableNotFound` | ERROR | Selected table not found on the source server. If the issue persists, contact support. |
| `ValidationNullTableName` | ERROR | Make sure you selected the tables for mounting. If the issue persists after restart, contact support. |
| `ValidationNullSelectedDatabases` | ERROR | No databases selected for mirroring. Recommended Action - Select one database and start Fabric mirroring again. |
| `CdcRowImageMismatch` | ERROR | Source schema (DDL) change detected; DDL isn't supported. |
| `CdcParquetWriteFailed` | ERROR | Make sure you don't use unsupported data types. If the issue persists, contact support. |

### Supported data types

Only columns with following types are supported:

- `bigint`
- `binary`
- `bit`
- `bool`
- `char`
- `date`
- `datetime`
- `decimal`
- `double`
- `enum`
- `float`
- `int`
- `long`
- `mediumint`
- `set`
- `short`
- `smallint`
- `time`
- `timestamp`
- `tinyint`
- `varbinary`
- `varchar`
- `year`

In MySQL, time values are stored in the server's time zone. Ensure consistent time zone handling for accurate data representation.

Execute the following query to check if there's any error:

```sql
SELECT * FROM fabric_info.error_logs;
```

Review the output for any errors or warnings in the replication status.

[Contact support](/power-bi/support/service-support-options) if troubleshooting is required.

## Managed identity

The User Assigned Managed Identity (UAMI) of the Azure Database for MySQL needs to be created and assigned to the MySQL server.

### UAMI permissions

Don't remove Azure Database for MySQL User Assigned Managed Identity (UAMI) contributor permissions on the Fabric mirrored database item.

If you remove Azure Database for MySQL UAMI permissions or permissions aren't set up correctly, disable and re-enable mirroring from the Azure portal and set up the configuration from the Fabric portal again.

## Related content

- [Microsoft Fabric mirrored databases from Azure Database for MySQL](azure-database-mysql.md)
