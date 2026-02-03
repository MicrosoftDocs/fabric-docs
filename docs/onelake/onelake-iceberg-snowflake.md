---
title: Use Snowflake with Iceberg tables in OneLake
description: Learn how to use Snowflake to write Iceberg tables to OneLake and read any Fabric table as an Iceberg-formatted table.
ms.reviewer: mahi
ms.author: mahi
author: matt1883
ms.topic: how-to
ms.date: 6/30/2025
#customer intent: As a Snowflake user, I want to learn how to write Iceberg tables to OneLake and/or to read a Fabric (Delta Lake) table as an Iceberg table.
---

# Use Snowflake with Iceberg tables in OneLake

Microsoft OneLake can be used with Snowflake for storage and access of Apache Iceberg tables.

Follow this guide to use Snowflake on Azure to: 
* write Iceberg tables directly to OneLake
* read virtual Iceberg tables converted from the Delta Lake format

Before getting started, follow the prerequisite steps in this article.

## Prerequisite

To use Snowflake on Azure to write or read Iceberg tables with OneLake, your Snowflake account's identity in Entra ID needs to be able to communicate with Fabric. Enable the Fabric tenant-level settings that allow service principals to [call Fabric APIs](/rest/api/fabric/articles/identity-support#service-principal-tenant-setting) and to [call OneLake APIs](./security/get-started-security.md#allow-apps-running-outside-of-fabric-to-access-data-via-onelake).

## Write an Iceberg table to OneLake using Snowflake on Azure

If you use Snowflake on Azure, you can write Iceberg tables to OneLake by following these steps:

1.	Make sure your Fabric capacity is in the same Azure location as your Snowflake instance.

    Identify the location of the Fabric capacity associated with your Fabric lakehouse. Open the settings of the Fabric workspace that contains your lakehouse.

    :::image type="content" source="media\onelake-iceberg-table-shortcut\capacity-region.png" alt-text="Screenshot showing Fabric capacity region.":::

    In the bottom-left corner of your Snowflake on Azure account interface, check the Azure region of the Snowflake account.

    :::image type="content" source="media\onelake-iceberg-table-shortcut\snowflake-region.png" alt-text="Screenshot showing Snowflake account region.":::

    If these regions are different, you need to use a different Fabric capacity in the same region as your Snowflake account.

1.	Open the menu for the Files area of your lakehouse, select Properties, and copy the URL (the HTTPS path) of that folder.

    :::image type="content" source="media\onelake-iceberg-table-shortcut\files-properties.png" alt-text="Screenshot showing Properties menu item.":::

1.  Identify your Fabric tenant ID. Select your user profile in the top-right corner of the Fabric UI, and hover over the info bubble next to your **Tenant Name**. Copy the **Tenant ID**.

    :::image type="content" source="media\onelake-iceberg-table-shortcut\tenant-id.png" alt-text="Screenshot showing tenant ID.":::

1.	In Snowflake, set up your `EXTERNAL VOLUME` using the path to the `Files` folder in your lakehouse. [More info on setting up Snowflake external volumes can be found here.](https://docs.snowflake.com/en/user-guide/tables-iceberg-configure-external-volume)

    > [!NOTE]
    > Snowflake requires the URL scheme to be `azure://`, so be sure to change the path from `https://` to `azure://`.

    ```sql
    CREATE OR REPLACE EXTERNAL VOLUME onelake_write_exvol
    STORAGE_LOCATIONS =
    (
        (
            NAME = 'onelake_write_exvol'
            STORAGE_PROVIDER = 'AZURE'
            STORAGE_BASE_URL = 'azure://<path_to_lakehouse>/Files/icebergtables'
            AZURE_TENANT_ID = '<Tenant_ID>'
        )
    );
    ```

    In this sample, any tables created using this external volume are stored in the Fabric lakehouse, within the `Files/icebergtables` folder.

1.	Now that your external volume is created, run the following command to retrieve the consent URL and name of the application that Snowflake uses to write to OneLake. This application is used by any other external volume in your Snowflake account.
    
    ```sql
    DESC EXTERNAL VOLUME onelake_write_exvol;
    ```

    The output of this command returns the `AZURE_CONSENT_URL` and `AZURE_MULTI_TENANT_APP_NAME` properties. Take note of both values. The Azure multitenant app name looks like `<name>_<number>`, but you only need to capture the `<name>` portion.

1.	Open the consent URL from the previous step in a new browser tab, if you did not previously complete this step. If you would like to proceed, consent to the required application permissions, if prompted. You may be redirected to the main Snowflake website.

1.	Back in Fabric, open your workspace and select **Manage access**, then **Add people or groups**. Grant the application used by your Snowflake external volume the permissions needed to write data to lakehouses in your workspace. We recommend granting the **Contributor** role.

1.	Back in Snowflake, use your new external volume to create an Iceberg table.
    
    ```sql
    CREATE OR REPLACE ICEBERG TABLE MYDATABASE.PUBLIC.Inventory (
        InventoryId int,
        ItemName STRING
    )
    EXTERNAL_VOLUME = 'onelake_write_exvol'
    CATALOG = 'SNOWFLAKE'
    BASE_LOCATION = 'Inventory/';
    ```

    This statement creates a new Iceberg table folder named Inventory within the folder path defined in the external volume.

1.  Add some data to your Iceberg table.

    ```sql
    INSERT INTO MYDATABASE.PUBLIC.Inventory
    VALUES
    (123456,'Amatriciana');
    ```
    
1.	Finally, in the Tables area of the same lakehouse, [you can create a OneLake shortcut to your Iceberg table](./onelake-iceberg-tables.md#create-a-table-shortcut-to-an-iceberg-table). Through that shortcut, your Iceberg table appears as a Delta Lake table for consumption across Fabric workloads.

## Read a virtual Iceberg table from OneLake using Snowflake on Azure

To use Snowflake on Azure to read a virtual Iceberg table based on a Delta Lake table in Fabric, follow these steps.

1.  Follow [the guide to confirm your Delta Lake table converted successfully to Iceberg](./onelake-iceberg-tables.md#virtualize-delta-lake-tables-as-iceberg), and take note of the path to the data item containing your table, as well as your table's most recent `*.metadata.json` file.

1.  Identify your Fabric tenant ID. Select your user profile in the top-right corner of the Fabric UI, and hover over the info bubble next to your **Tenant Name**. Copy the **Tenant ID**.

    :::image type="content" source="media\onelake-iceberg-table-shortcut\tenant-id.png" alt-text="Screenshot showing tenant ID.":::

1.	In Snowflake, set up your `EXTERNAL VOLUME` using the path to the `Tables` folder of the data item that contains your table. [More info on setting up Snowflake external volumes can be found here.](https://docs.snowflake.com/en/user-guide/tables-iceberg-configure-external-volume)

    ```sql
    CREATE OR REPLACE EXTERNAL VOLUME onelake_read_exvol
    STORAGE_LOCATIONS =
    (
        (
            NAME = 'onelake_read_exvol'
            STORAGE_PROVIDER = 'AZURE'
            STORAGE_BASE_URL = 'azure://<path_to_data_item>/Tables/'
            AZURE_TENANT_ID = '<Tenant_ID>'
        )
    )
    ALLOW_WRITES = false;
    ```

    > [!NOTE]
    > Snowflake requires the URL scheme to be `azure://`, so be sure to change `https://` to `azure://`.
    > 
    > Replace `<path_to_data_item>` with the path to your data item, such as `https://onelake.dfs.fabric.microsoft.com/83896315-c5ba-4777-8d1c-e4ab3a7016bc/a95f62fa-2826-49f8-b561-a163ba537828`.

1.	Now that your external volume is created, run the following command to retrieve the consent URL and name of the application that Snowflake uses to write to OneLake. This application is used by any other external volume in your Snowflake account.
    
    ```sql
    DESC EXTERNAL VOLUME onelake_read_exvol;
    ```

    The output of this command returns the `AZURE_CONSENT_URL` and `AZURE_MULTI_TENANT_APP_NAME` properties. Take note of both values. The Azure multitenant app name looks like `<name>_<number>`, but you only need to capture the `<name>` portion.

1.	Open the consent URL from the previous step in a new browser tab, if you did not previously complete this step. If you would like to proceed, consent to the required application permissions, if prompted. You may be redirected to the main Snowflake website.

1.	Back in Fabric, open your workspace and select **Manage access**, then **Add people or groups**. Grant the application used by your Snowflake external volume the permissions needed to read data from data items in your workspace.

    > [!TIP]
    > You may instead choose to grant permissions at the data item level, if you wish. [Learn more about OneLake data access.](./security/get-started-security.md#workspace-permissions)

1.	Create the `CATALOG INTEGRATION` object in Snowflake, if you did not previously complete this step. This step is required by Snowflake to reference existing Iceberg tables in storage.

    ```sql
    CREATE CATALOG INTEGRATION onelake_catalog_integration
    CATALOG_SOURCE = OBJECT_STORE
    TABLE_FORMAT = ICEBERG
    ENABLED = TRUE;
    ```

1.	Back in Snowflake, create an Iceberg table referencing the latest metadata file for the virtualized Iceberg table in OneLake.

    ```sql
    CREATE OR REPLACE ICEBERG TABLE MYDATABASE.PUBLIC.<TABLE_NAME>
    EXTERNAL_VOLUME = 'onelake_read_exvol'
    CATALOG = onelake_catalog_integration
    METADATA_FILE_PATH = '<metadata_file_path>';
    ```

    > [!NOTE]
    > Replace `<TABLE_NAME>` with your table name, and `<metadata_file_path>` with your Iceberg table's metadata file path, such as `dbo/MyTable/metadata/321.metadata.json`.

    After you run this statement, you now have a reference to your virtualized Iceberg table that you can now query using Snowflake.

1.  Query your virtualized Iceberg table by running the following statement.

    ```sql
    SELECT TOP 10 * FROM MYDATABASE.PUBLIC.<TABLE_NAME>;
    ```

## Troubleshooting

See the [troubleshooting](./onelake-iceberg-tables.md#troubleshooting) and [limitations and considerations](./onelake-iceberg-tables.md#limitations-and-considerations) sections of our documentation of OneLake table format virtualization and conversion between Delta Lake and Apache Iceberg table formats.
