---
title: Create shortcuts to Iceberg tables
description: Learn how to create table shortcuts that point to Iceberg tables in storage. Learn how OneLake automatically and virtually converts Iceberg tables to the Delta Lake format for use across all Fabric workloads.
ms.reviewer: mahi
ms.author: mahi
author: matt1883
ms.topic: how-to
ms.date: 11/13/2024
#customer intent: As a OneLake user, I want to learn how to create a table shortcut to an Iceberg table to consume that table across Fabric workloads.
---

# Use Iceberg tables with OneLake

In Microsoft OneLake, you can create shortcuts to your Apache Iceberg tables and use them with the wide variety of Fabric workloads. This is possible using a feature called **metadata virtualization**, which makes those Iceberg tables look like Delta Lake tables from the point of view of the shortcut. When a table shortcut is created to an Iceberg table folder, OneLake automatically generates Delta Lake metadata (the Delta log) for that table and makes the metadata available virtually through the shortcut.

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

:::image type="content" source="media\onelake-iceberg-table-shortcut\iceberg-shortcut-diagram.png" alt-text="Screenshot showing shortcut creation menu item under Tables.":::

While this article includes guidance for writing Iceberg tables from Snowflake to OneLake, this feature is intended to work with any Iceberg tables with Parquet data files.

## Create a table shortcut to an Iceberg table

If you already have Iceberg tables written to a storage location supported by [OneLake shortcuts](./onelake-shortcuts#types-of-shortcuts), such as an Azure Data Lake Storage, OneLake, Amazon S3, Google Cloud Storage, or an S3 compatible storage service,  follow these steps to create a shortcut and have your Iceberg table appear with the Delta Lake format.

1.	**Locate your Iceberg table.** Find where your Iceberg tables are stored. This could be in any of the external storage locations supported by OneLake shortcuts including Azure Data Lake Storage, OneLake, Amazon S3, Google Cloud Storage, or an S3 compatible storage service.

    > [!NOTE]
    > If you are using Snowflake and are not sure where your Iceberg table is stored, you can run the following statement to see the storage location of your Iceberg table.
    > 
    > `SELECT SYSTEM$GET_ICEBERG_TABLE_INFORMATION('<table_name>');`
    > 
    > This will return a path to the metadata file for this table, which should tell you which storage account contains the Iceberg table. For example, this is the relevant info to find the Iceberg table:
    > 
    > `{"metadataLocation":"azure://<storage_account_path>/<path_within_storage>/<table_name>/metadata/00001-389700a2-977f-47a2-9f5f-7fd80a0d41b2.metadata.json","status":"success"}`
    
    Your Iceberg table folder needs to contain a `metadata` folder, which itself contains at least one file ending in `.metadata.json`.

1.	In your Fabric lakehouse, create a new shortcut in the Tables area of a *non-schema-enabled* lakehouse.

    > [!NOTE]
    > If you see schemas such as `dbo` under the Tables folder of your lakehouse, then the lakehouse is schema-enabled and is not yet compatible with this feature. This is a temporary limitation.

    :::image type="content" source="media\onelake-iceberg-table-shortcut\new-shortcut.png" alt-text="Screenshot showing shortcut creation menu item under Tables.":::

1.	For the target path of your shortcut, select the Iceberg table folder. This is the folder that contains the `metadata` and `data` folders.

1.	That's all! Once your shortcut is created, you should automatically see this table reflected as a Delta Lake table in your lakehouse, ready for you to use throughout Fabric.

    If your new Iceberg table shortcut doesn't appear as a usable table, check the [Troubleshooting](#troubleshooting) section below.

## Write an Iceberg table to OneLake using Snowflake

If you use Snowflake on Azure, you can write Iceberg tables to OneLake by following these steps:

1.	Make sure your Fabric capacity is in the same Azure location as your Snowflake instance. To do this, identify the location of the Fabric capacity associated with your Fabric lakehouse. You can quickly discover this by opening the settings of the Fabric workspace that contains your lakehouse.

    :::image type="content" source="media\onelake-iceberg-table-shortcut\capacity-region.png" alt-text="Screenshot showing Fabric capacity region.":::

    In the bottom-left corner of your Snowflake on Azure account interface, check the Azure region of the Snowflake account.

    :::image type="content" source="media\onelake-iceberg-table-shortcut\snowflake-region.png" alt-text="Screenshot showing Snowflake account region.":::

    If these regions are different, you will need to use a different Fabric capacity in the same region as your Snowflake account.

1.	Right-click on the Files area of your lakehouse, select Properties, and copy the URL (the HTTPS path) of that folder.

    :::image type="content" source="media\onelake-iceberg-table-shortcut\files-properties.png" alt-text="Screenshot showing Properties menu item.":::

1.  Identify your Fabric tenant ID. Click your user profile in the top-right corner of the Fabric UI, and hover over the info bubble next to your **Tenant Name**. Copy the **Tenant ID**.

    :::image type="content" source="media\onelake-iceberg-table-shortcut\tenant-id.png" alt-text="Screenshot showing tenant ID.":::

1.	In Snowflake, set up your `EXTERNAL VOLUME` using the path to the Files folder in your lakehouse. [More info on setting up Snowflake external volumes can be found here.](https://docs.snowflake.com/en/user-guide/tables-iceberg-configure-external-volume)

    > [!NOTE]
    > Snowflake requires the URL scheme to be `azure://`, so be sure to change `https://` to `azure://`.

        CREATE OR REPLACE EXTERNAL VOLUME onelake_exvol
        STORAGE_LOCATIONS =
        (
            (
                NAME = 'onelake_exvol'
                STORAGE_PROVIDER = 'AZURE'
                STORAGE_BASE_URL = 'azure://<path_to_Files>/icebergtables'
                AZURE_TENANT_ID = '<Tenant_ID>'
            )
        );

    With the above sample, any tables created using this external volume will be stored in the Fabric lakehouse, within the `Files/icebergtables` folder.

1.	Now that your external volume is created, run the command below to retrieve the consent URL and name of the application that Snowflake will use to write to OneLake. This application is used by any other external volume in your Snowflake account.
    
        DESC EXTERNAL VOLUME onelake_exvol;

    The output of the above command will return the `AZURE_CONSENT_URL` and `AZURE_MULTI_TENANT_APP_NAME` properties. Take note of both values. The Azure multi-tenant app name will look like `<name>_<number>`, but you only need to capture the `<name>` portion.

1.	Open the consent URL from the previous step in a new browser tab. If you would like to proceed, consent to the required application permissions, if prompted.

1.	Back in Fabric, open your workspace and click **Manage access**, then **Add people or groups**. Grant the application used by your Snowflake external volume the permissions needed to write data to lakehouses in your workspace. We recommend granting the **Contributor** role.

1.	Back in Snowflake, use your new external volume to create an Iceberg table.
    
        // Example statement to create an Iceberg table
        CREATE OR REPLACE ICEBERG TABLE MYDATABASE.PUBLIC.Inventory (
            InventoryId int,
            ItemName STRING,
            AddedTimestamp timestamptz
        )
        EXTERNAL_VOLUME = 'onelake_exvol'
        CATALOG = 'SNOWFLAKE'
        BASE_LOCATION = 'Inventory/';
    
    With the above statement, a new Iceberg table folder named Inventory will be created within the folder path defined in the external volume.

1.  Add some data to your Iceberg table.

        // Example statement to write data to an Iceberg table
        INSERT INTO MYDATABASE.PUBLIC.Inventory
        VALUES
        (123456,'Amatriciana','2024-01-02 03:04:05.060000000+00:00');
    
1.	Finally, in the Tables area of the same lakehouse, [you can create a OneLake shortcut to your Iceberg table](#create-a-table-shortcut-to-an-iceberg-table). This will ensure your Iceberg table appears as a Delta Lake table for consumption across Fabric.

## Troubleshooting

The following tips can help make sure your Iceberg tables are compatible with this feature:

### Check the folder structure of your Iceberg table

Open your Iceberg folder in your preferred storage explorer tool, and check the directory listing of your Iceberg folder in its original location. You should see a folder structure like the following.

    ../
    |-- MyIcebergTable123/
        |-- data/
            |-- snow_A5WYPKGO_2o_APgwTeNOAxg_0_1_002.parquet
            |-- snow_A5WYPKGO_2o_AAIBON_h9Rc_0_1_003.parquet
        |-- metadata/
            |-- 00000-1bdf7d4c-dc90-488e-9dd9-2e44de30a465.metadata.json
            |-- 00001-08bf3227-b5d2-40e2-a8c7-2934ea97e6da.metadata.json
            |-- 00002-0f6303de-382e-4ebc-b9ed-6195bd0fb0e7.metadata.json
            |-- 1730313479898000000-Kws8nlgCX2QxoDHYHm4uMQ.avro
            |-- 1730313479898000000-OdsKRrRogW_PVK9njHIqAA.avro
            |-- snap-1730313479898000000-9029d7a2-b3cc-46af-96c1-ac92356e93e9.avro
            |-- snap-1730313479898000000-913546ba-bb04-4c8e-81be-342b0cbc5b50.avro

If you do not see the metadata folder, or if you do not see files with the extensions shown in the above example, then you might not have a properly generated Iceberg table.

### Check the conversion log

When an Iceberg table is virtually converted to Delta Lake format, a folder named `_delta_log/` can be found inside the shortcut folder. This is where the Delta Lake format's metadata (the Delta log) will be available after successful conversion.

This folder will also include the `latest_conversion_log.txt` file, which contains the latest attempted conversion's success or failure details.

To see the contents of this file after creating your shortcut, right-click the Iceberg table shortcut under Tables area of your lakehouse and click **View files**.

:::image type="content" source="media\onelake-iceberg-table-shortcut\view-files.png" alt-text="Screenshot View files menu item.":::

You should see a structure like the following:

    Tables/
    |-- MyIcebergTable123/
        |-- data/
            |-- <data files>
        |-- metadata/
            |-- <metadata files>
        |-- _delta_log/   <-- Virtual folder. This not exist in the original location.
            |-- 00000000000000000000.json
            |-- latest_conversion_log.txt   <-- Conversion log.

Open the conversion log file to see the latest conversion time or failure details. If you don't see a conversion log file, this means that [conversion was not attempted](#if-conversion-was-not-attempted).

### If conversion was not attempted

If you don't see a conversion log file, then the conversion was not attempted. This could be for one of a few reasons:

* **The shortcut was not created in the right place.**
    
    In order for a shortcut to an Iceberg table to get converted to the Delta Lake format, the shortcut must be placed directly under the Tables folder of a non-schema-enabled lakehouse. You should not place the shortcut in the Files section or under another folder if you want the table to be automatically virtualized as a Delta Lake table.

    :::image type="content" source="media\onelake-iceberg-table-shortcut\shortcut-placement.png" alt-text="Screenshot showing the correct placement of a shortcut in the Tables folder.":::

* **The shortcut's target path is not the Iceberg folder path.**
    
    When creating the shortcut, the path in the target storage location may only be the Iceberg table folder. This is the folder that *contains* the `metadata` and `data` folders.

    :::image type="content" source="media\onelake-iceberg-table-shortcut\shortcut-target.png" alt-text="Screenshot showing the contents of a shortcut target path during shortcut creation.":::

## Limitations and considerations

The following are temporary limitations to keep in mind when using this feature: 

* **Supported data types**
  
  The following Iceberg column data types map to their corresponding Delta Lake types using this feature.

  | Iceberg column type | Delta Lake column type | Comments |
  | --- | --- | --- |
  | `int` | `integer` |  |
  | `long` | `long` | See **Type width issue** below. |
  | `float` | `float` | |
  | `double` | `double` | See **Type width issue** below. |
  | `decimal(P, S)` | `decimal(P, S)` | See **Type width issue** below. |
  | `boolean` | `boolean` | |
  | `date` | `date` | |
  | `timestamp` | `timestamp_ntz` | The `timestamp` Iceberg data type does not contain time zone information. The `timestamp_ntz` Delta Lake type is not fully supported across Fabric workloads. We recommend the use of timestamps with time zones included. |
  | `timestamptz` | `timestamp` | |
  | `string` | `string` | |
  | `binary` | `binary` | |

    
* **Type width issue**
    
    If your Iceberg table is written by Snowflake and the table contains column types that have a maximum width that is larger than what `INT32` can contain, such as `INT64`, `double`, or `Decimal` with precision >= 10, then the resulting virtual Delta Lake table may not be consumable by all Fabric engines. You may see errors such as:
     
         Parquet column cannot be converted in file ... Column: [ColumnA], Expected: decimal(18,4), Found: INT32.
     
    **Workaround:**
    If you are using the Lakehouse table preview UI and see this issue, you can resolve this by switching to the SQL Endpoint view (top right corner, click Lakehouse view, switch to SQL Endpoint) and previewing the table from there. If you then switch back to the Lakehouse view, the table preview should display properly.
    
    If you are running a Spark notebook or job and encounter this error, you can resolve this by setting the `spark.sql.parquet.enableVectorizedReader` Spark configuration to `false`. Below is an example PySpark command to run in a Spark notebook:
    
        spark.conf.set("spark.sql.parquet.enableVectorizedReader","false")

* **Iceberg table metadata storage is not portable**

    The metadata files of an Iceberg table refer to each other using absolute path references. Because of this, if you copy or move an Iceberg table's folder contents to another location without rewriting the Iceberg metadata files, the table will become unreadable by Iceberg readers, including this OneLake feature.

    **Workaround:**

    If you need to move your Iceberg table to another location to use this feature, use the tool that originally wrote the Iceberg table to write a new Iceberg table in the desired location.

* **Iceberg tables must be deeper than root level**
    
    The Iceberg table folder in storage must be located in a directory deeper than bucket or container level. Iceberg tables stored directly in the root directory of a bucket or container may not be virtualized to the Delta Lake format.
   
    **Workaround:**
    
    Ensure that any Iceberg tables are stored in a directory deeper than the root directory of a bucket or container.

* **Iceberg table folders must contain only one set of metadata files**

    If you drop and recreate an Iceberg table in Snowflake, the metadata files are not cleaned up. This is by design to support the UNDROP feature in Snowflake. However, because your shortcut points directly to a folder and that folder now has multiple sets of metadata files within it, we cannot convert the table until you remove the old table’s metadata files.

    Currently, there is an issue that causes us to attempt conversion even in this scenario, which can result in old table contents and schema being shown.

    We are working on a fix in which conversion will fail if more than one set of metadata files are found in the Iceberg table’s metadata folder.

    **Workaround:**

    To ensure the converted table reflects the correct version of the table:
    * Ensure you aren’t storing more than one Iceberg table in the same folder.
    * Clean up any contents of an Iceberg table folder after dropping it, before recreating the table.

* **Metadata changes not immediately reflected**

    If you make metadata changes to your Iceberg table, such as adding a column, deleting a column, renaming a column, or changing a column type, the table may not be re-converted until a data change is made, such as adding a row of data.

    We are working on a fix that will pick up the correct latest metadata file that includes the latest metadata change.

    **Workaround:**

    After making the schema change to your Iceberg table, add a row of data or make any other kind of change to the data. After that change, you should be able to refresh and see the latest view of your table in Fabric.

* **Schema-enabled workspaces not yet supported**

    If you create an Iceberg shortcut in a schema-enabled lakehouse, conversion will not occur for that shortcut.

    **Workaround:**

    Use a non-schema-enabled lakehouse. This is an option during lakehouse creation.

* **Region availability limitation**

    The feature is not yet available in the following regions:

    * Qatar Central
    * Norway West
    
    **Workaround:**

    Workspaces attached to Fabric capacities in other regions can use this feature. [See the full list of regions where Microsoft Fabric is available.](../admin/region-availability)


## Related content

- Learn more about [Fabric and OneLake security](./security/fabric-onelake-security.md).
- Learn more about [OneLake shortcuts](./onelake-shortcuts.md).
