---
title: "Tutorial: Clean up Microsoft Fabric HorizonDB resources"
description: Remove the application, Copy job, analytical items, PostgreSQL objects, database, and workspace created in the Fabric HorizonDB tutorial.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: tutorial
ai-usage: ai-assisted
---
# Tutorial: Clean up Microsoft Fabric HorizonDB resources

This final tutorial step removes the resources you created for the Fabric HorizonDB end-to-end scenario.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

## Prerequisite

- Complete [Connect a PostgreSQL application](tutorial-connect-application.md).

Deletion might be irreversible during public preview. Review every name and dependency before you delete an item, schema, database, or workspace.

## Choose a cleanup scope

Use one of these options:

- To keep the workspace and database, remove only the application-facing and sample PostgreSQL objects.
- To keep the workspace but remove the complete scenario, delete the dependent Fabric items and HorizonDB database.
- To remove everything created by the tutorial, delete the `contoso-horizondb-tutorial` workspace after you verify that it contains no resources you need.

Don't delete a shared workspace or database to clean up tutorial objects.

## Stop and remove the local application

1. Wait for the Python application process to finish, or stop it with **Ctrl+C**.
1. Delete the local `contoso-orders-app` folder if you no longer need the code.
1. Clear the `HORIZONDB_HOST`, `HORIZONDB_PORT`, `HORIZONDB_DATABASE`, `HORIZONDB_USER`, `HORIZONDB_TENANT_ID`, `HORIZONDB_SSLMODE`, and `HORIZONDB_TOKEN_SCOPE` values from persistent local configuration.

The tutorial doesn't store a token in a file. If you added credentials while adapting the sample, revoke them and remove them from local configuration and source history.

## Delete dependent Fabric items

If you want to retain `contoso-orders-db`, delete dependent items that you no longer need:

1. In `contoso-horizondb-tutorial`, delete the `contoso-order-operations` report.
1. Delete the `contoso-orders-model` semantic model.
1. Delete the `contoso-orders-analysis` notebook.
1. Delete the `load-contoso-customer-signals` Copy job.
1. Delete any other customer-created item used only for this tutorial.

Delete `contoso-signals-warehouse` only if you created it for this tutorial and no other workload uses it. If you substituted an existing warehouse, keep it and remove only the source table you created after reviewing dependencies.

Review mirroring and analytical dependencies before deleting their source. Don't try to drop service-managed mirroring components through PostgreSQL.

## Remove customer-owned PostgreSQL objects

Skip this section if you plan to delete the entire database.

Connect as the database creator to the `contoso-orders-db` item's PostgreSQL endpoint, using database `postgres`. First review the schemas:

```sql
SELECT
    schema_name
FROM information_schema.schemata
WHERE schema_name IN ('fabric_mirror', 'fabric_sales', 'analytics_ops', 'horizon_sample')
ORDER BY schema_name;
```

After you confirm that these are the tutorial schemas, run:

```sql
DROP SCHEMA IF EXISTS analytics_ops CASCADE;
DROP SCHEMA IF EXISTS fabric_mirror CASCADE;
DROP SCHEMA IF EXISTS fabric_sales CASCADE;
DROP SCHEMA IF EXISTS horizon_sample CASCADE;
DROP SERVER IF EXISTS customer_signals_dw;
```

`CASCADE` also removes the application views that depend on the tutorial tables. Review these dependencies first. `customer_signals_dw` is the customer-owned server created by the tutorial. Don't drop service-managed extensions, servers, or schemas; in particular, keep `pg_fabric_fdw` and `fabric_dw`.

Verify removal:

```sql
SELECT
    table_schema,
    table_name
FROM information_schema.tables
WHERE table_schema IN ('fabric_mirror', 'fabric_sales', 'analytics_ops', 'horizon_sample')
ORDER BY table_schema, table_name;
```

The query returns no tutorial tables.

## Delete the database

Skip this section if you want to retain `contoso-orders-db`.

1. Confirm that you no longer need its data or dependent analytical items.
1. In the Fabric workspace, open the item menu for `contoso-orders-db`.
1. Select the delete action shown by the portal.
1. Review the warning and dependencies.
1. Confirm deletion only when the selected item is `contoso-orders-db`.
1. Wait for the asynchronous delete operation to finish.

Treat database deletion as irreversible.

## Delete the workspace

Delete the workspace only if you created it solely for this tutorial:

1. Open `contoso-horizondb-tutorial`.
1. Confirm that it contains no shared, retained, or unrelated items.
1. Open the workspace settings.
1. Select the workspace deletion action.
1. Enter any requested confirmation.
1. Confirm deletion.

If you used an existing workspace, keep it and remove only the tutorial items.

## Verify cleanup

Confirm that:

- The local Python process is stopped.
- Tutorial environment values and any credentials you added are removed.
- The report, semantic model, notebook, and Copy job are deleted or intentionally retained.
- The tutorial warehouse is deleted or intentionally retained, and any preexisting source remains unchanged.
- The tutorial schemas are deleted if you kept the database.
- `contoso-orders-db` is deleted or intentionally retained.
- `contoso-horizondb-tutorial` is deleted only if it was dedicated to the tutorial.

You have completed the Fabric HorizonDB end-to-end tutorial.

## Related content

- [Create a HorizonDB database](create.md).
- [Fabric HorizonDB overview](overview.md).
