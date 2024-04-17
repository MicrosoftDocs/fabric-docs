---
title: User audit logs for Microsoft Fabric Synapse Data Warehouse
description: Learn about auditing user activity on Microsoft Fabric data warehousing in Microsoft Purview and PowerShell.
author: jacindaeng
ms.author: jacindaeng
ms.reviewer: wiassaf
ms.date: 11/15/2023
ms.topic: conceptual
ms.custom:
  - ignite-2023
ms.search.form: Monitoring # This article's title should not change. If so, contact engineering.
---
# User audit logs for Microsoft Fabric Data [!INCLUDE [fabric-dw](includes/fabric-dw.md)]

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

To track user activity for meeting regulatory compliance and records managements requirements, a set of audit activities are accessible via Microsoft Purview and PowerShell. You can use user audit logs to identify who is taking what action on your Fabric items.

For more information on how to access user audit logs, visit [Track user activities in Microsoft Fabric](../admin/track-user-activities.md).

## Permissions

You must be a tenant/global admin or auditor to have access to user audit logs.

## Operations available in the user audit logs

The following operations are available in the user audit logs for [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and [!INCLUDE [fabric-se](includes/fabric-se.md)] activities. 

| Friendly name | Operation name | Notes | 
| --- | --- | --- | 
| Created a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] | `CreateWarehouse` |  |
| Updated a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] | `UpdateWarehouse` |  |
| Updated metadata for a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] | `UpdateWarehouseMetadata` |  |
| Deleted a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] | `DeleteWarehouse` |  | 
| Updated settings for a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] | `UpdateWarehouseSettings` |  | 
| Updated parameters for a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] | `UpsertWarehouseParameters` |  | 
| Viewed a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] | `ViewWarehouse` |  | 
| Canceled a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] batch | `CancelWarehouseBatch` |  | 
| Resumed a suspended [!INCLUDE [fabric-dw](includes/fabric-dw.md)] | `ResumeSuspendedWarehouse` |  | 
| Renamed a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] | `RenameWarehouse` |  | 
| Shared a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] | `ShareWarehouse` |  | 
| Connected to a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)] from an external app | `ConnectWarehouseAndSqlAnalyticsEndpointLakehouseFromExternalApp` | Previously named "Connected to a warehouse or default warehouse from an external app" (Operation name: `ConnectWarehouseAndDefaultWarehouseFromExternalApp`) | 
| Created a SQL query from a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] | `CreateSqlQueryFromWarehouse` |  | 
| Created a visual query from a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] | `CreateVisualQueryFromWarehouse` |  | 
| Deleted a SQL query from a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] | `DeleteSqlQueryFromWarehouse` | This audit event covers both deleting SQL and visual queries from the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] | 
| Updated a [!INCLUDE [fabric-se](includes/fabric-se.md)]  | `UpdateSqlAnalyticsEndpointLakehouse` | Previously named "Updated a default warehouse" (Operation name: `UpdateDefaultWarehouse`) | 
| Updated settings for a [!INCLUDE [fabric-se](includes/fabric-se.md)]  | `UpdateSqlAnalyticsEndpointLakehouseSettings` | Previously named "Updated settings for a default warehouse" (Operation name: `UpdateDefaultWarehouseSettings`) | 
| Upserted parameters from a [!INCLUDE [fabric-se](includes/fabric-se.md)]  | `UpsertSqlAnalyticsEndpointLakehouseParameters` | Previously named "Updated parameters from a default warehouse" (Operation name: `UpsertDefaultWarehouseParameters`) | 
| Viewed a [!INCLUDE [fabric-se](includes/fabric-se.md)]  | `ViewSqlAnalyticsEndpointLakehouse` | Previously named "Viewed a default warehouse" (Operation name: `ViewDefaultWarehouse`) | 
| Canceled a [!INCLUDE [fabric-se](includes/fabric-se.md)]  batch | `CancelSqlAnalyticsEndpointlakehouseBatch` | Previously named "Canceled a default warehouse" (Operation name: `CancelDefaultWarehouseBatch`) | 
| Resumed a suspended [!INCLUDE [fabric-se](includes/fabric-se.md)]  | `ResumeSuspendedSqlAnalyticsEndpointLakehouse` | Previously named "Resumed a suspended default warehouse" (Operation name: `ResumeSuspendedDefaultWarehouse`) | 
| Refreshed metadata for a [!INCLUDE [fabric-se](includes/fabric-se.md)]  | `RefreshSqlAnalyticsEndpointLakehouseMetadata` | Previously named "Refreshed metadata for a default warehouse" (Operation name: `RefreshDefaultWarehouseMetadata`) | 
| Created a SQL query from a [!INCLUDE [fabric-se](includes/fabric-se.md)]  | `CreateSqlQueryFromSqlAnalyticsEndpointLakehouse` |  | 
| Created a visual query from a [!INCLUDE [fabric-se](includes/fabric-se.md)]  | `CreateVisualQueryFromSqlAnalyticsEndpointLakehouse` |  |
| Deleted a SQL query from a [!INCLUDE [fabric-se](includes/fabric-se.md)]  | `DeleteSqlQueryFromSqlAnalyticsEndpointLakehouse` | This audit event covers both deleting SQL and visual queries from the [!INCLUDE [fabric-se](includes/fabric-se.md)] of the Lakehouse. |

## Related content

- [Monitor connections, sessions, and requests using DMVs](monitor-using-dmv.md)
- [Query using the SQL query editor](sql-query-editor.md)
