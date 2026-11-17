---
title: "Create a HorizonDB database in the portal"
description: Create a HorizonDB database, wait for readiness, and validate the PostgreSQL connection.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: quickstart
ms.search.form: product-databases, Fabric HorizonDB get started, PostgreSQL databases
ai-usage: ai-assisted
---
# Create a HorizonDB database in the portal

In this quickstart, you create a HorizonDB database in Microsoft Fabric HorizonDB and validate it with a PostgreSQL query.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

## Prerequisites

- A Fabric tenant and an eligible workspace assigned to active Fabric capacity.
- Contributor or Admin access to the workspace and permission to create PostgreSQL database items.
- Fabric HorizonDB availability in the workspace region.
- A Microsoft Entra identity enabled for the preview.

Use a dedicated development or test workspace and synthetic, nonsensitive data. Confirm tenant, workspace, capacity, and region enablement with your administrator or preview contact.

## Create the database

1. Sign in to the [Fabric portal](https://app.fabric.microsoft.com/).
1. Open the target workspace.
1. Select **+ New item**.
1. Search for **HorizonDB database**.
1. Select **HorizonDB database (preview)**.

   :::image type="content" source="media/onboarding/create-postgresql-item.png" alt-text="Screenshot of the HorizonDB database (preview) item in the New item dialog.":::

1. Enter a unique item name such as `contoso-horizondb`.

   :::image type="content" source="media/onboarding/new-database.png" alt-text="Screenshot of the New HorizonDB database dialog with an empty Name field.":::

1. Select **Create**, and wait for the item to report **Online** or **Ready**.

Creation is asynchronous. Don't create a duplicate item if the operation remains in progress. Open the item details and record its operation or correlation ID if provisioning reports a failure.

The database is usable only after the item reports a ready state and its PostgreSQL endpoint accepts an authorized query. Fabric integrations can continue initializing independently.

## Validate the database

1. Open the database item.
1. Select **New Query**.
1. Paste the following PostgreSQL query, select the full statement, and select **Run**:

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

   - `database_name` matches the PostgreSQL database name in the item's connection details. In the current preview, this is `postgres`, not the Fabric item display name.
   - `signed_in_user` represents your expected Microsoft Entra principal.
   - `server_version` reports the engine version used by your preview database.
   - The query returns one session ID and timestamp.

Only the Microsoft Entra identity that created the database can connect in the current preview. Sharing the item doesn't enable another user or principal to connect. See [Validate PostgreSQL access](configure-postgresql-access-controls.md).

## Review connection information

Select **Visual Studio Code** in the database toolbar to open the connection pane. Record the nonsensitive values your client needs:

- PostgreSQL host.
- Port.
- Database name.
- Microsoft Entra user format.
- Released TLS mode and certificate guidance.

Don't copy a token into a document, notebook output, shell history, or source file. Don't use the SQL analytics endpoint for an operational PostgreSQL connection.

## Understand the initial compute state

The platform manages compute resources. Use only the controls shown in your database item. Where scale to zero is enabled, an idle database can pause and a connection through the same endpoint resumes it. Allow for startup latency; don't assume a fixed idle interval or resume time.

## Next steps

- [Create tables](create-table.md).
- [Load sample data](load-sample-data.md).
- [Connect with PostgreSQL clients](connect.md).

## Related content

- [Creation options](create-options.md).
- [Fabric HorizonDB limitations](limitations.md).
- [Troubleshoot Fabric HorizonDB](troubleshoot.md).
