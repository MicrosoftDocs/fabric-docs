---
title: "Tutorial: Create a HorizonDB database"
description: Create the tutorial HorizonDB database and validate its PostgreSQL endpoint as the Microsoft Entra database creator.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: tutorial
ai-usage: ai-assisted
---
# Tutorial: Create a HorizonDB database

In this tutorial step, you create the `contoso-orders-db` HorizonDB database in Microsoft Fabric HorizonDB and validate the operational PostgreSQL endpoint.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

## Prerequisites

- Complete [Create a workspace](tutorial-create-workspace.md).
- Keep the `contoso-horizondb-tutorial` workspace open.
- Confirm that you can create database items in the workspace.

## Create the database

1. In the `contoso-horizondb-tutorial` workspace, select **New item**.
1. Search for **HorizonDB database**.
1. Select **HorizonDB database (preview)**.

   :::image type="content" source="media/onboarding/create-postgresql-item.png" alt-text="Screenshot of the HorizonDB database (preview) item in Fabric.":::

1. Enter `contoso-orders-db` as the name.
1. Select **Create**.
1. Wait for the creation operation to finish.
1. Open the database item when it reports **Online** or **Ready**.

Creation is asynchronous. Don't create another database if the first operation is still running. If creation fails, record the item ID, operation or correlation ID, timestamp, and displayed error before retrying.

The database can become ready before every dependent integration finishes initializing. PostgreSQL readiness and mirroring state are separate.

## Validate PostgreSQL

1. In the database item, open a new SQL query.
1. Run this PostgreSQL query:

   ```sql
   SELECT
       current_database() AS database_name,
       current_user AS signed_in_user,
       current_setting('server_version') AS server_version,
       current_setting('server_version_num') AS server_version_number,
       pg_backend_pid() AS session_id,
       clock_timestamp() AS validated_at;
   ```

1. Confirm that:

   - `database_name` matches the database name in the connection pane: `postgres` in the current preview, not the item display name `contoso-orders-db`.
   - `signed_in_user` represents your expected Microsoft Entra principal.
   - `server_version` reports the version used by your preview database.
   - One session ID and timestamp are returned.

The full build string can contain service implementation details. Use the settings in the query rather than publishing unreviewed `version()` output.

## Review the connection information

Select **Visual Studio Code** in the database toolbar, and record these nonsensitive connection values for the client and application exercises:

- PostgreSQL host.
- Port.
- Database name.
- Microsoft Entra user format.
- Released TLS mode and certificate guidance.
- Released token scope or token-acquisition guidance.

Don't record an access token, password, authorization header, or complete authenticated connection string. The notebook uses the PostgreSQL endpoint, not the SQL analytics endpoint.

## Review compute behavior

The platform manages compute resources. Use only the controls shown in your item. Where scale to zero is enabled, an idle database can pause and a connection through the same endpoint resumes it. Allow for startup latency; don't assume a fixed idle interval.

## Expected outcome

The `contoso-orders-db` item is ready, the validation query succeeds with your Microsoft Entra identity, and you have recorded the nonsensitive connection coordinates required later.

Only the Microsoft Entra identity that created the database can connect in the current preview. Keep using that identity in later steps. Sharing the item doesn't enable other users or principals. See [Validate PostgreSQL access](configure-postgresql-access-controls.md).

## Next step

> [!div class="nextstepaction"]
> [Create tables and load sample data](tutorial-ingest-data.md)

## Related content

- [Create a HorizonDB database](create.md).
- [Connect to Fabric HorizonDB](connect.md).
- [Control compute usage](control-compute-usage.md).
