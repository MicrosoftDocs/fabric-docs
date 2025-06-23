---
title: Create and Manage a Warehouse Snapshot (Preview)
description: Learn how to create, use, and manage warehouse snapshots in Fabric Data Warehouse.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: twcyril
ms.date: 05/08/2025
ms.service: fabric
ms.topic: how-to
ms.search.form: Manage warehouse snapshots
---
# Create and manage a warehouse snapshot (preview)

This article includes steps to create and manage warehouse snapshots using the Fabric portal, T-SQL queries, or the [Fabric API](/rest/api/fabric/articles/).

> [!NOTE]
> Warehouse snapshots are currently a [preview feature](../fundamentals/preview.md).

## Prerequisites

- A Fabric workspace with an active capacity or trial capacity.
- A Fabric warehouse.
- Verify the necessary [user permissions](warehouse-snapshot.md#permissions).

## Create

Multiple snapshots can be created for the same parent warehouse. Once warehouse snapshots are created, they appear as child items of the parent warehouse in the workspace view.

## [Create a warehouse snapshot in the Fabric portal](#tab/portal)

Warehouse snapshots can be created via the Fabric portal. In the ribbon, under **Management**, select **New warehouse snapshot**.

## [Create a warehouse snapshot with REST API](#tab/restapi)

Sample JSON request for creating a warehouse snapshot via the REST API:

```http
POST https://api.fabric.microsoft.com/v1/workspaces/<workspace ID>/items
Authorization: Bearer <bearer token>
Content-Type: application/json

{ 
 "type": "WarehouseSnapshot",
  "displayName": "<snapshot item display name>", 
  "description": "<helpful description of snapshot item>", 
  "creationPayload": { 
    "parentWarehouseId": "<parent warehouse ID>", 
    "snapshotDateTime": "<YYYY-MM-DDTHH:SS:SSZ>" //Enter UTC time
  } 
} 
```

- Replace `<workspace ID>` and `<parent warehouse ID>` with the corresponding Fabric workspace and warehouse IDs. To find these values, visit your warehouse in the Fabric portal.
   - `<workspace ID>`: Find the workspace GUID in the URL after the `/groups/` section, or by running `SELECT @@SERVERNAME` in an existing warehouse. For example, `11aaa111-a11a-1111-1aaa-aa111111aaa`. Don't include the `/` characters. 
   - `<parent warehouse ID>`: Find the warehouse GUID in the URL after the `/warehouses/` section, or by running `SELECT @@SERVERNAME` in an existing warehouse. For example, `11aaa111-a11a-1111-1aaa-aa111111aaa`. Don't include the `/` characters. 
- `<bearer token>`: Obtain this by following these steps:
  1. Open your Microsoft Fabric workspace in a browser (Microsoft Edge or Google Chrome).
  1. Press **F12** to open Developer Tools. 
  1. Select the **Console** tab. If necessary, select **Expand Quick View** to reveal the console prompt `>`.
  1. Type the command `powerBIAccessToken` and press **Enter**. Right-click on the large unique string returned in the console and select **Copy string contents**.
  1. Paste it in place of `<bearer token>`.

- Provide self-explanatory values for `<snapshot item display name>`  and `<helpful description of snapshot item>`.
- Provide a time for the snapshot to be based on. The timestamp can be set to any point within the retention period (within the last 30 days). If `snapshotDateTime` isn't provided, the snapshot uses the current time. 

To return the properties of the specified snapshot:

```http
GET https://api.fabric.microsoft.com/v1/workspaces/<workspace ID>/items/<warehouse snapshot ID>
Authorization: Bearer <bearer token>
```

- Replace `<workspace ID>` and `<warehouse snapshot ID>` with the corresponding Fabric workspace ID and warehouse snapshotId. To find these values, visit your warehouse snapshot in the Fabric portal.
   - `<workspace ID>`: Find the workspace GUID in the URL after the `/groups/` section, or by running `SELECT @@SERVERNAME` in an existing warehouse. For example, `11aaa111-a11a-1111-1aaa-aa111111aaa`. Don't include the `/` characters. 
   - `<warehouse snapshot ID>`: Find the warehouse snapshot GUID in the URL after the `/warehousesnapshots/` section.

---

## Query a snapshot

Once created, warehouse snapshots appear as child items in the workspace. 

:::image type="content" source="media/create-manage-warehouse-snapshot/workspace.png" alt-text="Screenshot from the Fabric portal showing the warehouse snapshot in the item list." lightbox="media/create-manage-warehouse-snapshot/workspace.png":::

Connect to the snapshot just like a warehouse. In the settings of your warehouse snapshot, visit **SQL endpoint** to view and copy the **SQL connection string**. The connection string looks like this: `<server-name>.datawarehouse.fabric.microsoft.com`. Users with appropriate permissions (Admin, Member, Contributor, or Viewer) can query a snapshot just like a warehouse. For more information, see [Warehouse connectivity in Microsoft Fabric](connectivity.md).

## View the snapshot timestamp

When a T-SQL query is run, information about the current version of the data being accessed is included. For example, you can see the timestamp in the **Messages** of the [Fabric portal query editor](../database/sql/query-editor.md):

:::image type="content" source="media/create-manage-warehouse-snapshot/current-version-of-data-being-accessed.png" alt-text="Screenshot from the Fabric portal query editor showing the Messages output of a query on a warehouse snapshot." lightbox="media/create-manage-warehouse-snapshot/current-version-of-data-being-accessed.png":::

To see a warehouse's snapshots and their current timestamps, use the following T-SQL query on `sys.databases` and the extended property of `TIMESTAMP` to render attributes:

```sql
SELECT snapshot_name = v.name
, source_warehouse_name = s.name
, snapshot_timestamp = DATABASEPROPERTYEX(v.name,'TIMESTAMP')
FROM sys.databases AS v 
INNER JOIN sys.databases AS s ON v.source_database_id=s.database_id;
```

## Update snapshot timestamp

You can update the timestamp of an existing warehouse snapshot at any time.

You can accomplish this with T-SQL commands in the context of the parent warehouse, or via the Fabric portal. For more information, see [Update snapshot timestamp](warehouse-snapshot.md#update-snapshot-timestamp).

In the Fabric portal, select **Capture new state** from the context menu, then select a timestamp for the snapshot. You can select **Current** or any point within the retention period (within the last 30 days).

The `ALTER DATABASE` SQL statement uses the system time of the warehouse as the new point in time in which the source warehouse data will be reflected in the snapshot. 

- To update the snapshot to the current state of the warehouse, use `CURRENT_TIMESTAMP`.
 
   ```sql
   ALTER DATABASE [<snapshot name>]
   SET TIMESTAMP = CURRENT_TIMESTAMP; 
   ```

- The timestamp can also be set to any point within the retention period (within the last 30 days). The format of the `TIMESTAMP` argument is `YYYY-MM-DDTHH:MM:SS.SS`. For example, to set the timestamp to April 27, 2025 at 18:10 UTC:

   ```sql
   ALTER DATABASE [<snapshot name>]
   SET TIMESTAMP = '2025-04-27T18:10:00.00';
   ```

## Rename

You can rename a warehouse snapshot item via REST API and in the Fabric portal.

## [Rename a warehouse snapshot in the Fabric portal](#tab/portal)

Warehouse snapshots can be renamed via the Fabric portal. Open your warehouse snapshot. Select the settings button, provide a new **Name**.

## [Rename a warehouse snapshot with REST API](#tab/restapi)

Sample JSON request to rename a warehouse snapshot via the REST API:

```http
PATCH https://api.fabric.microsoft.com/v1/workspaces/<workspace ID>/items/<warehouse snapshot ID>
Authorization: Bearer <bearer token> 
Content-Type: application/json

{ 
  "type": "WarehouseSnapshot",
  "displayName": "<snapshot item new display name>", 
  "description": "<helpful description of snapshot item>", 
  "creationPayload": { 
    "parentWarehouseId": "<parent warehouse ID>", 
    "snapshotDateTime": "YYYY-MM-DDTHH:SS:SSZ" //Enter UTC time
  } 
}
```

- Replace `<workspace ID>` , `<warehouse snapshot ID>`, and `<parent Warehouse ID>`with the corresponding Fabric workspace and warehouse IDs. To find these values, visit your warehouse snapshot in the Fabric portal.
   - `<workspace ID>`: Find the workspace GUID in the URL after the `/groups/` section, or by running `SELECT @@SERVERNAME` in an existing warehouse. For example, `11aaa111-a11a-1111-1aaa-aa111111aaa`. Don't include the `/` characters. 
   - `<warehouse snapshot ID>`: Find the warehouse snapshot GUID in the URL after the `/warehousesnapshots/` section.
   - `<parent warehouse ID>`: Find the warehouse GUID in the URL after the `/warehouses/` section, or by running `SELECT @@SERVERNAME` in an existing warehouse. For example, `11aaa111-a11a-1111-1aaa-aa111111aaa`. Don't include the `/` characters. 
- `<bearer token>`: Obtain this by following these steps:
  1. Open your Microsoft Fabric workspace in a browser (Microsoft Edge or Google Chrome).
  1. Press **F12** to open Developer Tools. 
  1. Select the **Console** tab. If necessary, select **Expand Quick View** to reveal the console prompt `>`.
  1. Type the command `powerBIAccessToken` and press **Enter**. Right-click on the large unique string returned in the console and select **Copy string contents**.
  1. Paste it in place of `<bearer token>`.

- Provide self-explanatory values for `<snapshot item new display name>` and `<helpful description of snapshot item>`.
- Provide a time for the snapshot to be based on. The timestamp can be set to any point within the retention period (within the last 30 days). If `snapshotDateTime` isn't provided, the snapshot uses the current time.

---

## Delete

You can delete a warehouse snapshot in the Fabric portal or with the REST API. 

## [Delete a warehouse snapshot in the Fabric portal](#tab/portal)

Warehouse snapshots can be deleted via the Fabric portal. In the workspace item list, select the context menu for the warehouse snapshot item, and select **Delete**.

## [Delete a warehouse snapshot with REST API](#tab/restapi)

Sample REST API request for deleting a snapshot:

```http
DELETE https://api.fabric.microsoft.com/v1/workspaces/<workspace ID>/items/<warehouse snapshot ID>
Authorization: Bearer <bearer token>
```

- Replace `<workspace ID>` and `<warehouse snapshot ID>` with the corresponding Fabric workspace and warehouse IDs. To find these values, visit your warehouse snapshot in the Fabric portal.
   - `<workspace ID>`: Find the workspace GUID in the URL after the `/groups/` section, or by running `SELECT @@SERVERNAME` in an existing warehouse. For example, `11aaa111-a11a-1111-1aaa-aa111111aaa`. Don't include the `/` characters. 
   - `<warehouse snapshot ID>`: Find the warehouse snapshot GUID in the URL after the `/warehousesnapshots/` section.
- `<bearer token>`: Obtain this by following these steps:
  1. Open your Microsoft Fabric workspace in a browser (Microsoft Edge or Google Chrome).
  1. Press **F12** to open Developer Tools. 
  1. Select the **Console** tab. If necessary, select **Expand Quick View** to reveal the console prompt `>`.
  1. Type the command `powerBIAccessToken` and press **Enter**. Right-click on the large unique string returned in the console and select **Copy string contents**.
  1. Paste it in place of `<bearer token>`.

---

## Related content

- [Warehouse snapshots](warehouse-snapshot.md)
- [ALTER DATABASE SET options](/sql/t-sql/statements/alter-database-transact-sql-set-options?view=fabric&preserve-view=true)
