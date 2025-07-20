---
title: Query Fabric Onelake Delta tables from Snowflake
description: Learn how to query acceleration policy over OneLake shortcuts to improve query performance and reduce latency for external delta tables.
ms.reviewer: chschmidt
ms.author: v-hzargari
author: hzargari-ms
ms.topic: how-to
ms.custom:
ms.date: 07/15/2025
---

# Query Fabric OneLake Delta Tables from Snowflake

This article explains how to query Fabric OneLake Delta Tables from Snowflake using the [Snowflake connector for Microsoft Fabric](/fabric/data-factory/connector-snowflake-overview?view=microsoft-fabric&preserve-view=true).

:::image type="content" source="media/query-onelake-from-snowflake/workflow.png" alt-text="Screenshot of the workflow diagram including data ingestion, analyzing, and exporting to snowflake":::

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)

## Set up Fabric demo data

1. Create your environment in Fabric:
    1. Create an EventHouse and an EventStream.
    1. Use *Sample data* to create a Lakehouse and set the EventHub as the desternation to generate a new table.
    :::image type="content" source="media/query-onelake-from-snowflake/data-source.png" alt-text="Screenshot of the optional data sources":::
    :::image type="content" source="media/query-onelake-from-snowflake/diagram.png" alt-text="Screenshot of the data flow":::
1. Enable **OneLake Availability**:
    1. In the EventHouse KQL database, turn on OneLake availability.
    :::image type="content" source="media/query-onelake-from-snowflake/onelake.png" alt-text="Screenshot of the OneLake availability toggle in the EventHouse KQL database.":::
1. Optimize Sync Timing:
    1. Set a low latency target rate to avoid long delays. Default can be up to 3 hours.
    1. Run this KQL query to set the target rate:
    ```kql
    .alter-merge table <TableName> policy mirroring dataformat=parquet with (IsEnabled=true, TargetLatencyInMinutes=5)
    ```
1. Create a Lakehouse:
    1. In your Lakehouse, select Tables > **New shortcut**.
    :::image type="content" source="media/query-onelake-from-snowflake/shortcut.png" alt-text="Screenshot of the New Shortcut option in the dropdown menu":::
    1. Choose **Microsoft OneLake** as the source.
    1. Navigate to and select the KQL database and table you created in the EventHouse.
    :::image type="content" source="media/query-onelake-from-snowflake/using-shortcut.png" alt-text="Screenshot of connecting the new shortcut to the data":::

## Configure Snowflake

1. Get started with Snowflake:
    1. Login or create a Snowflake account if you don't have one. [Sign up](https://signup.snowflake.com/) for a free 30-day trial.
    1. Set up a Snowflake warehouse and database.
1. Create a Catalog Integration
    ```kql
    CREATE OR REPLACE CATALOG INTEGRATION delta_catalog_integration
    CATALOG_SOURCE = OBJECT_STORE
    TABLE_FORMAT = DELTA
    ENABLED = TRUE
    ``` 

1. Link the Database to the Catalog

    ```kql
    ALTER DATABASE <database_name>
    SET CATALOG = 'delta_catalog_integration'
    ```

1. Create an External Volume to OneLake

    ```kql
    CREATE OR REPLACE EXTERNAL VOLUME onelake
    STORAGE_LOCATIONS = (
      (
        NAME = 'my-onelake',
        STORAGE_PROVIDER = 'AZURE',
        STORAGE_BASE_URL = 'azure://onelake.dfs.fabric.microsoft.com/<workspace-guid>/<lakehouse-guid>/Tables/',
        AZURE_TENANT_ID = '<your-tenant-id>'
      )
    )
    ```

1. Create and authorize a Snowflake Service Principal

    ```kql
    DESC EXTERNAL VOLUME onelake
    ```

    1. From the JSON output, find:
        1. AZURE_CONSENT_URL
        1. AZURE_MULTI_TENANT_APP_NAME
    1. Visit the AZURE_CONSENT_URL and log in with a user who can create service principals. A service principal will be created.
1. Grant access in Fabric:
    1. In Fabric, grant the service principal access to the Lakehouse (workspace or item level).
    1. You can add it as a workspace member or apply more granular permissions.
1. Verify access:

    ```kql
    SELECT SYSTEM$VERIFY_EXTERNAL_VOLUME('onelake')
    ```
    * You should see a success message confirming read/write/list/delete access

## Create and query the Iceberg table

1. Create the Iceberg table in Snowflake:

    ```kql
    CREATE OR REPLACE ICEBERG TABLE onelaketest
    EXTERNAL_VOLUME = 'onelake'
    CATALOG = 'delta_catalog_integration'
    BASE_LOCATION = '<table_name_in_onelake>/'
    AUTO_REFRESH = TRUE
    ```
    * AUTO_REFRESH ensures metadata stays in sync with Delta updates.
2. Query the Iceberg table:
    
    ```kql
    SELECT COUNT(*) FROM MyDATABASE.ONELAKETEST
    ```
