---
title: Ingestion operation logs
description: View a set of ingestion operation logs that you can query in your Fabric workspace monitoring database.
author: KesemSharabi
ms.author: kesharab
ms.topic: reference
ms.date: 11/06/2024

---

# Ingestion operations

Ingestion operation logs are part of the Eventhouse logs and are registered in the Eventhouse KQL database, which is part of the Real-Time Intelligence solution. You can use these logs to monitor the usage and performance of your workspace.

## Ingestion operation logs

Ingestion operations provide information about successful and failed ingestion operations, and are supported for queued ingestions. Use to:

* Monitor the number of successful ingestions.
* Monitor the number of failed ingestions.
* Troubleshoot the cause o failed ingestions.

This table lists the Ingestion result logs.

| Column Name | Type | Description |
|--|--|--|
| ArtifactId | string | The identifier of the Fabric Eventhouse item. |
| ArtifactKind | string | The type of Fabric item. Valid values: Eventhouse. |
| ArtifactName | string | The name of the Fabric Eventhouse item. |
| CorrelationId | string | The correlation identifier of the ingestion operation. |
| CustomerTenantId | string | The customer tenant identifier. |
| DatabaseId | string | The database unique identifier. |
| DatabaseName | string | The name of the database. |
| IngestionErrorDetails | string | The ingestion error details. |
| IngestionFailureStatus | string | The status failure. Permanent or RetryAttemptsExceeded indicates that the operation exceeded the maximum retries or maximum time limit following a recurring transient error. |
| IngestionOperationId | string | The identifier for the ingest operation. |
| IngestionResultDetails | dynamic | A detailed description of the failure and error message. |
| IngestionSourceId | string | The identifier for the ingested source. |
| IngestionSourcePath | string | The path of the ingestion data sources or the Azure blob storage URI. |
| IsIngestionOriginatesFromUpdatePolicy | boolean | Indicates whether the failure originated from an update policy. |
| OperationEndTime | datetime | The time (UTC) the operation ended. |
| OperationId | string | The unique ingestion results log identifier. |
| OperationStartTime | datetime | The time (UTC) the operation started. |
| PlatformMonitoringTableName | string | The name of the platform monitoring table. Valid values:  EventhouseIngestionResults |
| PremiumCapacityId | string | The Fabric capacity identifier. |
| PremiumCapacityName | string | The Fabric capacity name. |
| Region | string | The region where the Fabric KQL Database is located. |
| Status | string | The completion status of the ingestion. |
| TableName | string | The name of the destination table used by the ingestion. |
| Timestamp | datetime | The time (UTC) the event was generated.. |
| WorkspaceId | string | The identifier of the workspace. |
| WorkspaceName | string | The name of the workspace. |

## Sample queries

You can find sample queries in the [fabric-samples](https://github.com/microsoft/fabric-samples) GitHub repository.

## Related content

* [Enable monitoring in your workspace](enable-workspace-monitoring.md)

* [Eventhouse logs](eventhouse-logs.md)
