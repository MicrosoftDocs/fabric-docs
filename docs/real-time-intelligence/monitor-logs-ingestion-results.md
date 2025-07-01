---
title: Ingestion results logs
description: View and analyze the log of the results from data ingestions to an Eventhouse KQL database within Real-Time Intelligence.
author: spelluru
ms.author: spelluru
ms.topic: reference
ms.custom:
ms.date: 11/06/2024
---

# Ingestion results logs

The ingestion results logs table contains the list of results from data ingestions to an Eventhouse KQL database, which is part of Real-Time Intelligence. For each ingestion result, a log event record is stored in the **EventhouseIngestionResultsLogs** table.

## Ingestion results logs table

Ingestion operation results provide details on both successful and failed ingestions and are supported for queued ingestions.

Use the ingestion results logs to:

* Monitor the number of successful ingestions.
* Monitor the number of failed ingestions.
* Troubleshoot the cause o failed ingestions.

The following table describes the columns stored in the **EventhouseIngestionResultsLogs** table:

| Column Name | Type | Description |
|--|--|--|
| CapacityId | string | The Fabric capacity identifier. |
| CorrelationId | string | The correlation identifier of the ingestion operation. |
| CustomerTenantId | string | The customer tenant identifier. |
| DatabaseId | string | The database unique identifier. |
| DatabaseName | string | The name of the database. |
| DurationMs | long | The duration of the ingestion operation (ms). |
| Identity | dynamic | Not applicable. |
| IngestionErrorDetails | string | The ingestion error details. |
| IngestionFailureStatus | string | The status failure. Permanent or RetryAttemptsExceeded indicates that the operation exceeded the maximum retries or maximum time limit following a recurring transient error. |
| IngestionOperationId | string | The identifier for the ingest operation. |
| IngestionResultDetails | dynamic | A detailed description of the failure and error message. |
| IngestionSourceId | string | The identifier for the ingested source. |
| IngestionSourcePath | string | The path of the ingestion data sources or the Azure blob storage URI. |
| IsIngestionOriginatesFromUpdatePolicy | boolean | Indicates whether the failure originated from an update policy. |
| ItemId | string | The identifier of the Fabric Eventhouse item. |
| ItemKind | string | The type of Fabric item. Valid values: Eventhouse. |
| ItemName | string | The name of the Fabric Eventhouse item. |
| Level | string | Not applicable. |
| OperationEndTime | datetime | The time (UTC) the operation ended. |
| OperationId | string | The unique ingestion results log identifier. |
| OperationStartTime | datetime | The time (UTC) the operation started. |
| Region | string | The region where the Fabric KQL database is located. |
| ResultCode | string | The result code of the ingestion operation. |
| ShouldRetry | boolean | Indicates whether the operation should be retried. |
| Status | string | The completion status of the ingestion. |
| TableName | string | The name of the destination table used by the ingestion. |
| Timestamp | datetime | The time (UTC) the event was generated. |
| WorkspaceId | string | The identifier of the workspace. |
| WorkspaceMonitoringTableName | string | The name of the workspace monitoring table. Valid values:  EventhouseIngestionResults |
| WorkspaceName | string | The name of the workspace. |

## Sample queries

You can find sample queries in the [fabric-samples](https://github.com/microsoft/fabric-samples) GitHub repository.

## Related content

* [Enable monitoring in your workspace](../fundamentals/enable-workspace-monitoring.md)

* [Eventhouse monitoring](monitor-eventhouse.md)
