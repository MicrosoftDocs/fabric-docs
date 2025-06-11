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

In Microsoft OneLake, you can create shortcuts to your Apache Iceberg tables, enabling their use across the wide variety of Fabric workloads. This functionality is made possible through a feature called **metadata virtualization**, which allows Iceberg tables to be interpreted as Delta Lake tables from the shortcut's perspective. When you create a shortcut to an Iceberg table folder, OneLake automatically generates the corresponding Delta Lake metadata (the Delta log) for that table, making the Delta Lake metadata accessible through the shortcut.

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

:::image type="content" source="media\onelake-iceberg-table-shortcut\iceberg-shortcut-diagram.png" alt-text="Diagram illustrating Delta Lake metadata virtualization.":::

While this article includes guidance for writing Iceberg tables from Snowflake to OneLake, this feature is intended to work with any Iceberg tables with Parquet data files.

## Create a table shortcut to an Iceberg table

If you already have an Iceberg table in a storage location supported by [OneLake shortcuts](./onelake-shortcuts.md#types-of-shortcuts), follow these steps to create a shortcut and have your Iceberg table appear with the Delta Lake format.

1.	**Locate your Iceberg table.** Find where your Iceberg table is stored. This could be in Azure Data Lake Storage, OneLake, Amazon S3, Google Cloud Storage, or an S3 compatible storage service.

    > [!NOTE]
    > If you're using Snowflake and aren't sure where your Iceberg table is stored, you can run the following statement to see the storage location of your Iceberg table.
    > 
    > `SELECT SYSTEM$GET_ICEBERG_TABLE_INFORMATION('<table_name>');`
    > 
    > Running this statement returns a path to the metadata file for the Iceberg table. This path tells you which storage account contains the Iceberg table. For example, here's the relevant info to find the path of an Iceberg table stored in Azure Data Lake Storage:
    > 
    > `{"metadataLocation":"azure://<storage_account_path>/<path_within_storage>/<table_name>/metadata/00001-389700a2-977f-47a2-9f5f-7fd80a0d41b2.metadata.json","status":"success"}`
    
    Your Iceberg table folder needs to contain a `metadata` folder, which itself contains at least one file ending in `.metadata.json`.

1.	In your Fabric lakehouse, create a new shortcut in the Tables area of a *non-schema-enabled* lakehouse.

    > [!NOTE]
    > If you see schemas such as `dbo` under the Tables folder of your lakehouse, then the lakehouse is schema-enabled and isn't yet compatible with this feature.

    :::image type="content" source="media\onelake-iceberg-table-shortcut\new-shortcut.png" alt-text="Screenshot showing shortcut creation menu item under Tables.":::

1.	For the target path of your shortcut, select the Iceberg table folder. The Iceberg table folder contains the `metadata` and `data` folders.

1.	Once your shortcut is created, you should automatically see this table reflected as a Delta Lake table in your lakehouse, ready for you to use throughout Fabric.

    :::image type="content" source="media\onelake-iceberg-table-shortcut\shortcut-placement.png" alt-text="Screenshot showing successful Iceberg table shortcut creation.":::

    If your new Iceberg table shortcut doesn't appear as a usable table, check the [Troubleshooting](#troubleshooting) section.

## Write an Iceberg table to OneLake using Snowflake

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

1.	In Snowflake, set up your `EXTERNAL VOLUME` using the path to the Files folder in your lakehouse. [More info on setting up Snowflake external volumes can be found here.](https://docs.snowflake.com/en/user-guide/tables-iceberg-configure-external-volume)

    > [!NOTE]
    > Snowflake requires the URL scheme to be `azure://`, so be sure to change `https://` to `azure://`.

    ```sql
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
    ```

    In this sample, any tables created using this external volume are stored in the Fabric lakehouse, within the `Files/icebergtables` folder.

1.	Now that your external volume is created, run the following command to retrieve the consent URL and name of the application that Snowflake uses to write to OneLake. This application is used by any other external volume in your Snowflake account.
    
    ```sql
    DESC EXTERNAL VOLUME onelake_exvol;
    ```

    The output of this command returns the `AZURE_CONSENT_URL` and `AZURE_MULTI_TENANT_APP_NAME` properties. Take note of both values. The Azure multitenant app name looks like `<name>_<number>`, but you only need to capture the `<name>` portion.

1.	Open the consent URL from the previous step in a new browser tab. If you would like to proceed, consent to the required application permissions, if prompted.

1.  Make sure your Fabric tenant settings support Snowflake's communication with Fabric and OneLake. If you're not sure if a setting change is needed, you may proceed; however, we recommend you check the [Troubleshooting](#troubleshooting) section if you encounter an error.

    To check the settings, have your Fabric tenant administrator perform the following steps.
    
    1.  In the upper-right corner of the Fabric UI, open **Settings**, and select **Admin portal**.
    1.  Under **Tenant settings**, in the **Developer settings** section, enable the setting labeled [**Service principals can use Fabric APIs**](../admin/service-admin-portal-developer.md#service-principals-can-use-fabric-apis).
    1.  In the same area, in the **OneLake settings** section, enable the setting labeled [**Users can access data stored in OneLake with apps external to Fabric**](../admin/service-admin-portal-onelake.md#users-can-access-data-stored-in-onelake-with-apps-external-to-fabric).

1.	Back in Fabric, open your workspace and select **Manage access**, then **Add people or groups**. Grant the application used by your Snowflake external volume the permissions needed to write data to lakehouses in your workspace. We recommend granting the **Contributor** role.

1.	Back in Snowflake, use your new external volume to create an Iceberg table.
    
    ```sql
    CREATE OR REPLACE ICEBERG TABLE MYDATABASE.PUBLIC.Inventory (
        InventoryId int,
        ItemName STRING
    )
    EXTERNAL_VOLUME = 'onelake_exvol'
    CATALOG = 'SNOWFLAKE'
    BASE_LOCATION = 'Inventory/';
    ```

    With this statement, a new Iceberg table folder named Inventory is created within the folder path defined in the external volume.

1.  Add some data to your Iceberg table.

    ```sql
    INSERT INTO MYDATABASE.PUBLIC.Inventory
    VALUES
    (123456,'Amatriciana');
    ```
    
1.	Finally, in the Tables area of the same lakehouse, [you can create a OneLake shortcut to your Iceberg table](#create-a-table-shortcut-to-an-iceberg-table). Through that shortcut, your Iceberg table appears as a Delta Lake table for consumption across Fabric workloads.

## Troubleshooting

The following tips can help make sure your Iceberg tables are compatible with this feature:

### Check the folder structure of your Iceberg table

Open your Iceberg folder in your preferred storage explorer tool, and check the directory listing of your Iceberg folder in its original location. You should see a folder structure like the following example.

```
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
```

If you don't see the metadata folder, or if you don't see files with the extensions shown in this example, then you might not have a properly generated Iceberg table.

### Check the conversion log

When an Iceberg table is virtualized as a Delta Lake table, a folder named `_delta_log/` can be found inside the shortcut folder. This folder contains the Delta Lake format's metadata (the Delta log) after successful conversion.

This folder also includes the `latest_conversion_log.txt` file, which contains the latest attempted conversion's success or failure details.

To see the contents of this file after creating your shortcut, open the menu for the Iceberg table shortcut under Tables area of your lakehouse and select **View files**.

:::image type="content" source="media\onelake-iceberg-table-shortcut\view-files.png" alt-text="Screenshot View files menu item.":::

You should see a structure like the following example:

```
Tables/
|-- MyIcebergTable123/
    |-- data/
        |-- <data files>
    |-- metadata/
        |-- <metadata files>
    |-- _delta_log/   <-- Virtual folder. This folder doesn't exist in the original location.
        |-- 00000000000000000000.json
        |-- latest_conversion_log.txt   <-- Conversion log with latest success/failure details.
```

Open the conversion log file to see the latest conversion time or failure details. If you don't see a conversion log file, [conversion wasn't attempted](#if-conversion-wasnt-attempted).

### If conversion wasn't attempted

If you don't see a conversion log file, then the conversion wasn't attempted. Here are two common reasons why conversion isn't attempted:

* **The shortcut wasn't created in the right place.**
    
    In order for a shortcut to an Iceberg table to get converted to the Delta Lake format, the shortcut must be placed directly under the Tables folder of a non-schema-enabled lakehouse. You shouldn't place the shortcut in the Files section or under another folder if you want the table to be automatically virtualized as a Delta Lake table.

    :::image type="content" source="media\onelake-iceberg-table-shortcut\shortcut-placement.png" alt-text="Screenshot showing the correct placement of a shortcut in the Tables folder.":::

* **The shortcut's target path is not the Iceberg folder path.**
    
    When you create the shortcut, the folder path you select in the target storage location must only be the Iceberg table folder. This folder *contains* the `metadata` and `data` folders.

    :::image type="content" source="media\onelake-iceberg-table-shortcut\shortcut-target.png" alt-text="Screenshot showing the contents of a shortcut target path during shortcut creation.":::

### `Fabric capacity region cannot be validated` error message in Snowflake 

If you are using Snowflake to write a new Iceberg table to OneLake, you might see the following error message:

> Fabric capacity region cannot be validated. Reason: 'Invalid access token. This may be due to authentication and scoping. Please verify delegated scopes.'

If you see this error, double-check that you've enabled both tenant settings mentioned in the [Write an Iceberg table to OneLake using Snowflake](#write-an-iceberg-table-to-onelake-using-snowflake) section. You may need to involve your Fabric tenant admin to confirm these settings are enabled.

## Limitations and considerations

Keep in mind the following temporary limitations when you use this feature: 

* **Supported data types**
  
  The following Iceberg column data types map to their corresponding Delta Lake types using this feature.

  | Iceberg column type | Delta Lake column type | Comments |
  | --- | --- | --- |
  | `int` | `integer` |  |
  | `long` | `long` | See **Type width issue**. |
  | `float` | `float` | |
  | `double` | `double` | See **Type width issue**. |
  | `decimal(P, S)` | `decimal(P, S)` | See **Type width issue**. |
  | `boolean` | `boolean` | |
  | `date` | `date` | |
  | `timestamp` | `timestamp_ntz` | The `timestamp` Iceberg data type doesn't contain time zone information. The `timestamp_ntz` Delta Lake type isn't fully supported across Fabric workloads. We recommend the use of timestamps with time zones included. |
  | `timestamptz` | `timestamp` | In Snowflake, to use this type, specify `timestamp_ltz` as the column type during Iceberg table creation. [More info on Iceberg data types supported in Snowflake can be found here.](https://docs.snowflake.com/en/user-guide/tables-iceberg-data-types) |
  | `string` | `string` | |
  | `binary` | `binary` | |
  | `time` | N/A | Not supported |
    
* **Type width issue**
    
    If you use Snowflake to write your Iceberg table and the table contains column types `INT64`, `double`, or `Decimal` with precision >= 10, then the resulting virtual Delta Lake table may not be consumable by all Fabric engines. You may see errors such as:
     
    ```
    Parquet column cannot be converted in file ... Column: [ColumnA], Expected: decimal(18,4), Found: INT32.
    ```

    We're working on a fix for this issue.
     
    **Workaround:**
    If you're using the Lakehouse table preview UI and see this issue, you can resolve this error by switching to the SQL Endpoint view (top right corner, select Lakehouse view, switch to SQL Endpoint) and previewing the table from there. If you then switch back to the Lakehouse view, the table preview should display properly.
    
    If you're running a Spark notebook or job and encounter this issue, you can resolve this error by setting the `spark.sql.parquet.enableVectorizedReader` Spark configuration to `false`. Here's an example PySpark command to run in a Spark notebook:
    
    ```
    spark.conf.set("spark.sql.parquet.enableVectorizedReader","false")
    ```

* **Iceberg table metadata storage isn't portable**

    The metadata files of an Iceberg table refer to each other using absolute path references. If you copy or move an Iceberg table's folder contents to another location without rewriting the Iceberg metadata files, the table becomes unreadable by Iceberg readers, including this OneLake feature.

    **Workaround:**

    If you need to move your Iceberg table to another location to use this feature, use the tool that originally wrote the Iceberg table to write a new Iceberg table in the desired location.

* **Iceberg table folders must contain only one set of metadata files**

    If you drop and recreate an Iceberg table in Snowflake, the metadata files aren't cleaned up. This behavior is by design, in support of the `UNDROP` feature in Snowflake. However, because your shortcut points directly to a folder and that folder now has multiple sets of metadata files within it, we can't convert the table until you remove the old table’s metadata files.

    Conversion will fail if more than one set of metadata files are found in the Iceberg table's metadata folder.

    **Workaround:**

    To ensure the converted table reflects the correct version of the table:
    * Ensure you aren’t storing more than one Iceberg table in the same folder.
    * Clean up any contents of an Iceberg table folder after dropping it, before recreating the table.

* **Metadata changes not immediately reflected**

    If you make metadata changes to your Iceberg table, such as adding a column, deleting a column, renaming a column, or changing a column type, the table may not be reconverted until a data change is made, such as adding a row of data.

    We're working on a fix that picks up the correct latest metadata file that includes the latest metadata change.

    **Workaround:**

    After making the schema change to your Iceberg table, add a row of data or make any other change to the data. After that change, you should be able to refresh and see the latest view of your table in Fabric.

* **Region availability limitation**

    The feature isn't yet available in the following regions:

    * Qatar Central
    * Norway West
    
    **Workaround:**

    Workspaces attached to Fabric capacities in other regions can use this feature. [See the full list of regions where Microsoft Fabric is available.](../admin/region-availability.md)

* **Private links not supported**

    This feature isn't currently supported for tenants or workspaces that have private links enabled.

    We're working on an improvement to remove this limitation.

* **OneLake shortcuts must be same-region**

    We have a temporary limitation on the use of this feature with shortcuts that point to OneLake locations:  the target location of the shortcut must be in the same region as the shortcut itself.

    We're working on an improvement to remove this requirement.

    **Workaround:**

    If you have a OneLake shortcut to an Iceberg table in another lakehouse, be sure that the other lakehouse is associated with a capacity in the same region.

* **Iceberg tables must be copy-on-write (not merge-on-read)**
    
    Currently, Iceberg tables must be *copy-on-write*. This means that they cannot contain delete files or be *merge-on-read*.
    
    Snowflake currently produces *copy-on-write* Iceberg tables, but other Iceberg writers may follow a different approach.

    We are working on support for *merge-on-read* Iceberg tables.

 * **Certain Iceberg partition transform types are not supported**

    Currently, the [Iceberg partition types](https://iceberg.apache.org/spec/#partition-transforms) ``bucket[N]``, ``truncate[W]``, and ``void`` are not supported.

    If the Iceberg table being converted contains these partition transform types, virtualization to the Delta Lake format will not succeed.

    We're working on an improvement to remove this limitation.


## Related content

- Learn more about [Fabric and OneLake security](./security/fabric-onelake-security.md).
- Learn more about [OneLake shortcuts](./onelake-shortcuts.md).
