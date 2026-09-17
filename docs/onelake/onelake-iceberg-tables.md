---
title: Use Iceberg tables with OneLake
description: Discover how to leverage table format virtualization in OneLake to seamlessly read Delta Lake tables as Iceberg or create shortcuts to Iceberg tables in storage. Explore how OneLake automatically virtualizes Iceberg tables into the Delta Lake format for use across Fabric workloads, and Delta Lake tables into the Iceberg format for compatibility with Iceberg readers.
ms.reviewer: mahi # Product team ms alias(es)
# author: Do not use - assigned by folder in docfx file
# ms.author: Do not use - assigned by folder in docfx file
ms.topic: how-to
ms.date: 7/30/2026
ai-usage: ai-assisted
#customer intent: As a OneLake user, I want to learn how to use table format virtualization to read Iceberg tables across Fabric workloads, or read Fabric (Delta Lake) tables using Apache Iceberg readers.
---

# Use Iceberg tables with OneLake

In OneLake, you can seamlessly work with tables in both Delta Lake and Apache Iceberg formats. 

This flexibility is enabled through **metadata virtualization**, a feature that allows Iceberg tables to be interpreted as Delta Lake tables, and vice versa. You can directly write Iceberg tables or create shortcuts to them, making these tables accessible across various Fabric workloads. Similarly, Fabric tables written in the Delta Lake format can be read using Iceberg readers.

When you write or create a shortcut to an Iceberg table folder, OneLake automatically generates virtual Delta Lake metadata (Delta log) for the table, enabling its use with Fabric workloads. Conversely, Delta Lake tables now include virtual Iceberg metadata, allowing compatibility with Iceberg readers.

:::image type="content" source="media\onelake-iceberg-table-shortcut\iceberg-shortcut-diagram.png" alt-text="Diagram showing table virtualization from Iceberg to Delta Lake.":::

While this article includes guidance for using Iceberg tables with Snowflake, this feature is intended to work with any Iceberg tables with Parquet-formatted data files in storage.

## Virtualize Delta Lake tables as Iceberg

To set up the automatic conversion and virtualization of tables from Delta Lake format to Iceberg format, follow these steps.

1. Ensure your Delta Lake table, or a shortcut to it, is located in the `Tables` section of your data item. The data item might be a lakehouse or another Fabric data item.

    > [!TIP]
    > If your lakehouse is schema-enabled, then your table directory will be located directly within a schema such as `dbo`. If your lakehouse is not schema-enabled, then your table directory will be directly within the `Tables` directory.

1.	Confirm that your Delta Lake table has converted successfully to the  virtual Iceberg format. You can do this by examining the directory behind the table.

    To view the directory if your table is in a lakehouse, you can right-click the table in the Fabric UI and select **View files**.

    If your table is in another data item type, such as a warehouse, a database, or a mirrored database, you will need to use a client like Azure Storage Explorer or OneLake File Explorer, rather than the Fabric UI, to view the files behind the table.

1.  You should see a directory named `metadata` inside the table folder, and it should contain multiple files, including the conversion log file. Open the conversion log file to see more info about the Delta Lake to Iceberg conversion, including the timestamp of the most recent conversion and any error details.

1.  If the conversion log file shows that the table was successfully converted, read the Iceberg table using your service, app, or library of choice.

    Depending on what Iceberg reader you use, you will need to know either the path to the table directory or to the most recent `.metadata.json` file shown in the `metadata` directory.

    You can see the HTTP path to the latest metadata file of your table by opening the **Properties** view for the `*.metadata.json` file with the highest version number. Take note of this path.

    The path to your data item's `Tables` folder might look like this:

    ```
    https://onelake.dfs.fabric.microsoft.com/83896315-c5ba-4777-8d1c-e4ab3a7016bc/a95f62fa-2826-49f8-b561-a163ba537828/Tables/
    ```

    Within that folder, the relative path to the latest metadata file might look like `dbo/MyTable/metadata/321.metadata.json`.

    To read your virtual Iceberg table using Snowflake, [follow the steps in this guide](./onelake-iceberg-snowflake.md#read-a-virtual-iceberg-table-from-onelake-using-snowflake-on-azure).

## Create a table shortcut to an Iceberg table

If you already have an Iceberg table in a storage location supported by [OneLake shortcuts](./onelake-shortcuts.md#types-of-shortcuts), follow these steps to create a shortcut and have your Iceberg table appear with the Delta Lake format.

1.	**Locate your Iceberg table.** Find where your Iceberg table is stored, which could be in Azure Data Lake Storage, OneLake, Amazon S3, Google Cloud Storage, or an S3 compatible storage service.

    > [!NOTE]
    > If you're using Snowflake and aren't sure where your Iceberg table is stored, you can run the following statement to see the storage location of your Iceberg table.
    > 
    > `SELECT SYSTEM$GET_ICEBERG_TABLE_INFORMATION('<table_name>');`
    > 
    > Running this statement returns a path to the metadata file for the Iceberg table. This path tells you which storage account contains the Iceberg table. For example, here's the relevant info to find the path of an Iceberg table stored in Azure Data Lake Storage:
    > 
    > `{"metadataLocation":"azure://<storage_account_path>/<path_within_storage>/<table_name>/metadata/00001-389700a2-977f-47a2-9f5f-7fd80a0d41b2.metadata.json","status":"success"}`
    
    Your Iceberg table folder needs to contain a `metadata` folder, which itself contains at least one file ending in `.metadata.json`.

1.	In your Fabric lakehouse, create a new table shortcut in the Tables area of a lakehouse. 

    > [!TIP]
    > If you see schemas such as dbo under the Tables folder of your lakehouse, then the lakehouse is schema-enabled. In this case, right-click on the schema and create a table shortcut under the schema.
    
    :::image type="content" source="media\onelake-iceberg-table-shortcut\new-shortcut.png" alt-text="Screenshot showing new shortcut action.":::

1.	For the target path of your shortcut, select the Iceberg table folder. The Iceberg table folder contains the `metadata` and `data` folders.

1.	Once your shortcut is created, you should automatically see this table reflected as a Delta Lake table in your lakehouse, ready for you to use throughout Fabric.

    :::image type="content" source="media\onelake-iceberg-table-shortcut\shortcut-placement.png" alt-text="Screenshot showing created shortcut.":::

    If your new Iceberg table shortcut doesn't appear as a usable table, check the [Troubleshooting](#troubleshooting) section.

## Troubleshooting

The following tips can help make sure your Iceberg tables are compatible with this feature:

### Check the folder structure of your Iceberg table

Open your Iceberg folder in your preferred storage explorer tool, and check the directory listing of your Iceberg folder in its original location. You should see a folder structure like the following example.

```
../
|-- MyIcebergTable123/
    |-- data/
        |-- A5WYPKGO_2o_APgwTeNOAxg_0_1_002.parquet
        |-- A5WYPKGO_2o_AAIBON_h9Rc_0_1_003.parquet
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

### Understand the conversion log and error categories

The `latest_conversion_log.txt` file records the latest conversion attempt. When you virtualize an Iceberg table as Delta Lake, you find this file in the table's `_delta_log/` folder. When you virtualize a Delta Lake table as Iceberg, it's in the table's `metadata/` folder. The file is plain text. When a conversion fails, `latest_conversion_log.txt` contains a structured block similar to the following:

```
Status:             Failed
Timestamp (UTC):    2025-07-29T19:04:11Z
Latest Metadata:    00000000000000000012.metadata.json
Invocation Id:      6f1c...e2
Root Activity Id:   9a3d...b7
Error Code:         <code>
Error Category:     USER | SYSTEM
Error Details:      <message>
```

Use the **Error Category** to decide what to do next:

* **`USER`** means the source table contains something this feature can't convert. **Error Details** describes what to fix. Adjust the source table (see [Limitations and considerations](#limitations-and-considerations)), and then commit a change to the source table. Conversion re-attempts automatically after the next commit.

* **`SYSTEM`** means an internal or transient error occurred, and there's nothing to fix in the source table. To trigger another conversion attempt, commit a change to the source table. If failures persist, contact support and provide the entire `latest_conversion_log.txt` file.

### If conversion wasn't attempted

If you don't see a conversion log file, then the conversion wasn't attempted. Here are two common reasons why conversion isn't attempted:

* **The shortcut wasn't created in the right place.**
    
    In order for a shortcut to an Iceberg table to get converted to the Delta Lake format, the shortcut must be placed directly under the Tables folder of a non-schema-enabled lakehouse. You shouldn't place the shortcut in the Files section or under another folder if you want the table to be automatically virtualized as a Delta Lake table.

    :::image type="content" source="media\onelake-iceberg-table-shortcut\shortcut-placement.png" alt-text="Screenshot showing the correct placement of a shortcut in the Tables folder.":::

* **The shortcut's target path is not the Iceberg folder path.**
    
    When you create the shortcut, the folder path you select in the target storage location must only be the Iceberg table folder. This folder *contains* the `metadata` and `data` folders.

    :::image type="content" source="media\onelake-iceberg-table-shortcut\shortcut-target.png" alt-text="Screenshot showing the contents of a shortcut target path during shortcut creation.":::

### "Fabric capacity region cannot be validated" error message in Snowflake 

If you are using Snowflake to write a new Iceberg table to OneLake, you might see the following error message:

> Fabric capacity region cannot be validated. Reason: 'Invalid access token. This may be due to authentication and scoping. Please verify delegated scopes.'

If you see this error, have your Fabric tenant admin double-check that you've enabled both tenant settings mentioned in the [Write an Iceberg table to OneLake using Snowflake](./onelake-iceberg-snowflake.md#write-an-iceberg-table-to-onelake-using-snowflake-on-azure) section:

1.  In the upper-right corner of the Fabric UI, open **Settings**, and select **Admin portal**.
1.  Under **Tenant settings**, in the **Developer settings** section, enable the setting labeled [**Service principals can use Fabric APIs**](../admin/service-admin-portal-developer.md#service-principals-can-use-fabric-apis).
1.  In the same area, in the **OneLake settings** section, enable the setting labeled [**Users can access data stored in OneLake with apps external to Fabric**](../admin/service-admin-portal-onelake.md#users-can-access-data-stored-in-onelake-with-apps-external-to-fabric).

## Limitations and considerations

Keep in mind the following limitations when you use this feature. Some limitations apply to both conversion directions. Others are specific to converting **Delta Lake to Iceberg** or **Iceberg to Delta Lake**.

### How conversion issues surface

When a source feature can't be fully translated, one of two things happens. Both outcomes are reported in the conversion log.

| Outcome | What happens |
| --- | --- |
| **Conversion fails** | No new target metadata is produced. The table keeps its last successfully converted version. |
| **Feature dropped** | Conversion succeeds, but an unsupported column or partitioning is omitted from the output table format. |

### General limitations

* **Apache Iceberg version support**

  The supported Iceberg version depends on the conversion direction:

  | Conversion direction | Iceberg version behavior |
  | --- | --- |
  | Delta Lake to Iceberg | Produces Iceberg V2 metadata. |
  | Iceberg to Delta Lake | Supports Iceberg V2 source tables. Iceberg V3 source tables are partially supported; see [Iceberg V3 features](#iceberg-v3-features). |

* **Parquet data files only**

  This feature supports only Parquet as the underlying data file format for metadata translation, in both conversion directions.

* **Latest metadata version converted**

  The table format virtualization feature currently converts the latest table metadata version in the original table format. If multiple versions are written to the original table format, only the most recent table metadata version will be converted to the virtual table format.

* **Maximum number of input transactions**

  Source tables must have fewer than 5,000 transactions or commits for the table format conversion to take place. Be sure to compact your transaction logs or manifests to reduce the number of transactions or commits.

* **Conversion latency and update frequency**

  Generation of table format metadata can take between 5 seconds and 2 minutes. Ensure the updates you make to your source table are less frequent than once per 2 minutes. Otherwise, you might see an inconsistent view of the output table format.

* **Schema evolution**

  In both conversion directions, widening type changes (for example, `int` to `long`) are supported. A narrowing or otherwise incompatible type change causes conversion to fail.

### Delta Lake to Iceberg

These limitations apply when you virtualize a Delta Lake table as Iceberg.

> [!TIP]
> For the most complete conversion to Iceberg V2, use `IcebergCompatV2` when the source table doesn't use deletion vectors. If the table uses deletion vectors, use `IcebergCompatV3`; OneLake converts them to Iceberg V2 position deletes. Because this feature produces Iceberg V2 metadata, Iceberg V3-only features aren't converted.

The following considerations apply, especially to Delta Lake tables that *aren't* written with an `IcebergCompat` writer feature:

* **Nested `array` and `map` columns** require stable field IDs on their element, key, and value. Without them, the nested collection column is dropped from the Iceberg output (noted in the conversion log). `IcebergCompat` assigns these IDs.

* **Timestamps** must be stored as INT64 microseconds. A table whose timestamps are physically stored as INT96 (legacy) converts, but its timestamp columns can't be read by Iceberg engines. `IcebergCompat` enforces INT64 timestamps.

* **Column renames** — Preserved when the Delta Lake table uses column mapping (`id` or `name` mode), which `IcebergCompat` requires. With column mapping mode `none`, a rename appears as dropping and adding a column.

* **Column types** — Only Iceberg-compatible types are converted; other columns are dropped (noted in the conversion log). For example, `void` has no Iceberg equivalent. `IcebergCompat` restricts the schema to a convertible type set.

* **Partitioning** — Identity and temporal (year, month, day, hour) partitions are converted. Delta Lake has a single table-wide partitioning.

### Iceberg to Delta Lake

These limitations apply when you virtualize an Iceberg table as Delta Lake.

* **Column renames aren't supported.** You can't rename a column in the source Iceberg table. Instead, recreate the table with the new column names. When you recreate the table, remove any leftover metadata files, as described in the **Iceberg table folders must contain only one set of metadata files** limitation.

* **Partition transforms** — Only identity and temporal (year, month, day, hour) transforms are supported. The `bucket[N]`, `truncate[W]`, and `void` transforms are ignored: the table still converts, but without that partitioning. The underlying column is preserved as a regular, non-partition column.

* **Partition evolution** — If the source table's live data files span more than one partition spec, or a previously converted table's partition columns change, conversion is rejected. Delta Lake has a single table-wide partitioning, and converting mixed-spec files would incorrectly produce null partition values for the older files. Keep a single partition spec.

* **Row-level deletes** — Iceberg V2 position deletes and V3 deletion vectors are converted to Delta Lake deletion vectors. Equality deletes cause conversion to fail.

* **Unsupported types** — Types with no Delta Lake equivalent (for example, `time`, and the Iceberg V3 extended types) are dropped; `uuid` is mapped to binary. See [Iceberg V3 features](#iceberg-v3-features).

* **Type width issue**
    
    If you use Snowflake to write your Iceberg table and the table contains column types `INT64`, `double`, or `Decimal` with precision >= 10, the resulting virtual Delta Lake table might not be consumable by all Fabric engines. You might see errors such as:
     
    ```
    Parquet column cannot be converted in file ... Column: [ColumnA], Expected: decimal(18,4), Found: INT32.
    ```

    We're working on a fix for this issue.
     
    **Workaround:**
    If you're using the Lakehouse table preview UI and see this issue, you can resolve this error by switching to the SQL analytics endpoint view (top right corner, select Lakehouse view, switch to SQL analytics endpoint) and previewing the table from there. If you then switch back to the Lakehouse view, the table preview should display properly.
    
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

    If you make metadata changes to your Iceberg table, such as adding a column, deleting a column, renaming a column, or changing a column type, the table might not be reconverted until a data change is made, such as adding a row of data.

    We're working on a fix that picks up the correct latest metadata file that includes the latest metadata change.

    **Workaround:**

    After making the schema change to your Iceberg table, add a row of data or make any other change to the data. After that change, you should be able to refresh and see the latest view of your table in Fabric.

#### Iceberg V3 features

This feature produces and reads Iceberg V2 metadata; it doesn't write Iceberg V3 metadata. When the source is an Iceberg V3 table, its features are translated as described in the following table. Dropped columns and other translation notes are recorded in the conversion log.

| Iceberg V3 feature | Supported | Translation behavior |
| --- | --- | --- |
| Deletion vectors | Yes | Read and converted to Delta Lake deletion vectors. |
| Row lineage | No | Row-lineage metadata isn't translated to Delta Lake. The table still converts, and its row data is unchanged. |
| Default column values | No | A column that has a reader default is dropped. Write defaults aren't translated. |
| New data types (`variant`, geospatial, nanosecond timestamps, `unknown`) | No | Columns that use new Iceberg V3 data types are dropped. For the full list, see [Supported data types](#supported-data-types). |
| Multi-argument partition transforms | No | Not supported. |
| Table encryption keys | No | Not supported. |

> [!IMPORTANT]
> Even when the conversion drops columns with new Iceberg V3 data types, some Fabric engines can't read a table if the data files use Iceberg V3 types. The data files still carry that type information.
>
> **Workaround:** For the broadest compatibility across Fabric, avoid using Iceberg V3 columns in tables you virtualize.

### Supported data types

The following table shows how column data types map between formats. Unless noted, a type is converted in both directions.

| Delta Lake type | Iceberg type | Notes |
| --- | --- | --- |
| `string` | `string` | |
| `integer` | `int` | |
| `long` | `long` | |
| `short`, `byte` | `int` | Delta Lake `short` and `byte` widen to Iceberg `int` |
| `float` | `float` | |
| `double` | `double` | |
| `decimal(P, S)` | `decimal(P, S)` | Precision up to 38 |
| `boolean` | `boolean` | |
| `binary` | `binary` | |
| `date` | `date` | |
| `timestamp` | `timestamptz` | UTC; stored as INT64 microseconds. In Snowflake, specify `timestamp_ltz` to produce this type. |
| `timestamp_ntz` | `timestamp` | No time zone. `timestamp_ntz` isn't fully supported across all Fabric workloads; prefer time zone-aware timestamps. |
| `struct`, `array`, `map` | `struct`, `list`, `map` | Delta Lake to Iceberg: nested `array` and `map` require IcebergCompat |
| `void` | — | Delta Lake only; dropped during conversion |
| — | `time` | Iceberg only; no Delta Lake equivalent, dropped |
| — | `uuid` | Iceberg only; mapped to `binary` |
| — | `variant` | Iceberg only (V3); dropped. See [Iceberg V3 features](#iceberg-v3-features) |
| — | `geometry`, `geography` | Iceberg only (V3); dropped. See [Iceberg V3 features](#iceberg-v3-features) |
| — | `timestamp_ns`, `timestamptz_ns` | Iceberg only (V3); dropped. See [Iceberg V3 features](#iceberg-v3-features) |
| — | `unknown` | Iceberg only (V3); dropped. See [Iceberg V3 features](#iceberg-v3-features) |

For Snowflake-written Iceberg tables, wide `long`, `double`, or `decimal` columns can also be affected by the Type width issue described in the [Iceberg to Delta Lake](#iceberg-to-delta-lake) section.

### Supported partition transforms

| Transform | Iceberg to Delta Lake | Delta Lake to Iceberg |
| --- | --- | --- |
| identity | Supported | Supported |
| year, month, day, hour | Supported | Supported |
| `bucket[N]` | Ignored (partitioning dropped) | N/A |
| `truncate[W]` | Ignored (partitioning dropped) | N/A |
| `void` | Ignored (partitioning dropped) | N/A |

### Schema and partition evolution

| Capability | Iceberg to Delta Lake | Delta Lake to Iceberg | Notes |
| --- | --- | --- | --- |
| Add column | Supported | Supported | |
| Drop column | Supported | Supported | |
| Rename column | Not supported | Supported | Delta Lake to Iceberg requires column mapping (`id` or `name` mode) |
| Widening type change | Supported | Supported | For example, `int` to `long` |
| Narrowing or incompatible type change | Fails | Fails | |
| Partition evolution (multiple specs) | Fails | N/A | Delta Lake has a single table-wide partitioning |

### Row-level deletes

When you virtualize an Iceberg table as Delta Lake:

| Delete kind | Behavior |
| --- | --- |
| Iceberg V2 position deletes | Converted to Delta Lake deletion vectors. |
| Iceberg V3 deletion vectors | Read and converted to Delta Lake deletion vectors. |
| Equality deletes | Conversion fails. |

When you virtualize a Delta Lake table as Iceberg:

| Delete kind | Behavior |
| --- | --- |
| Delta Lake deletion vectors | Written as Iceberg V2 position deletes. |


### Availability and platform limitations

* **Region availability limitation**

    The feature isn't yet available in the following regions:

    * Qatar Central
    * Norway West
    
    **Workaround:**

    Workspaces attached to Fabric capacities in other regions can use this feature. [See the full list of regions where Fabric is available.](../admin/region-availability.md)

* **Private links not supported**

    This feature isn't currently supported for tenants or workspaces that have private links enabled.

    We're working on an improvement to remove this limitation.

* **OneLake shortcuts must be same-region**

    We have a temporary limitation on the use of this feature with shortcuts that point to OneLake locations:  the target location of the shortcut must be in the same region as the shortcut itself.

    We're working on an improvement to remove this requirement.

    **Workaround:**

    If you have a OneLake shortcut to an Iceberg table in another lakehouse, be sure that the other lakehouse is associated with a capacity in the same region.


## Related content

- [Use Snowflake to write or read Iceberg tables in OneLake](./onelake-iceberg-snowflake.md).
- Learn more about [OneLake shortcuts](./onelake-shortcuts.md).

