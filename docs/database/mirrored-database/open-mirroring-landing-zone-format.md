---
title: "Open Mirroring (Preview) Landing Zone Requirements and Formats"
description: Review the requirements for files in the landing for open mirroring in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: tinglee, sbahadur
ms.date: 01/21/2025
ms.topic: conceptual
ms.search.form: Fabric Mirroring
no-loc: [Copilot]
---
# Open mirroring landing zone requirements and format

This article details the landing zone and table/column operation requirements for open mirroring in Microsoft Fabric.

[!INCLUDE [feature-preview-note](../../includes/feature-preview-note.md)]

Once you have created your open mirrored database via the Fabric portal or public API in your Fabric workspace, you get a landing zone URL in OneLake in the **Home** page of your mirrored database item. This landing zone is where your application to create a metadata file and land data in Parquet format (uncompressed, Snappy, GZIP, ZSTD).

:::image type="content" source="media/open-mirroring-landing-zone-format/landing-zone-url.png" alt-text="Screenshot from the Fabric portal showing the Landing zone URL location in the Home page of the mirrored database item." lightbox="media/open-mirroring-landing-zone-format/landing-zone-url.png":::

## Landing zone

For every mirrored database, there is a unique storage location in OneLake for metadata and delta tables. Open mirroring provides a landing zone folder for application to create a metadata file and push data into OneLake. Mirroring monitors these files in the landing zone and read the folder for new tables and data added.

For example, if you have tables (`Table A`, `Table B`, `Table C`) to be created in the landing zone, create folders like the following URLs:

- `https://onelake.dfs.fabric.microsoft.com/<workspace id>/<mirrored database id>/Files/LandingZone/TableA`
- `https://onelake.dfs.fabric.microsoft.com/<workspace id>/<mirrored database id>/Files/LandingZone/TableB`
- `https://onelake.dfs.fabric.microsoft.com/<workspace id>/<mirrored database id>/Files/LandingZone/TableC`


### Metadata file in the landing zone

Every table folder must contain a `_metadata.json` file. 

This table metadata file contains a JSON record to currently specify only the unique key columns as `keyColumns`. 

For example, to declare columns `C1` and `C2` as a compound unique key for the table:

```json
{
   "keyColumns" : ["C1", "C2"]
}
```

If `keyColumns` or `_metadata.json` is not specified, then update/deletes are not possible. This file can be added anytime, but once added `keyColumns` can't be changed.

## Data file and format in the landing zone

Open mirroring supports Parquet as the landing zone file format with or without compression. Supported compression formats include Snappy, GZIP, and ZSTD.

All the Parquet files written to the landing zone have the following format:

`<RowMarker><DataColumns>`

- `RowMarker`: column name is `__rowMarker__` (including two underscores before and after `rowMarker`). 
   - `RowMaker` values:
      - `0` for INSERT
      - `1` for UPDATE
      - `2` for DELETE
      - `4` for UPSERT

- Row order: All the logs in the file should be in natural order as applied in transaction. This is important for the same row being updated multiple times. Open mirroring applies the changes using the order in the files.

- File order: Files should be added in monotonically increasing numbers.

- File name: File name is 20 digits, like `00000000000000000001.parquet` for the first file, and `00000000000000000002.parquet` for the second. File names should be in continuous numbers. Files will be deleted by the mirroring service automatically, but the last file will be left so that the publisher system can reference it to add the next file in sequence.

### Initial load

For the initial load of data into an open mirrored database, all rows should have INSERT as row marker. Without `RowMarker` data in a file, mirroring treats the entire file as an INSERT.

### Incremental changes

Open mirroring reads incremental changes in order and applies them to the target Delta table. Order is implicit in the change log and in the order of the files.

Updated rows must contain the full row data, with all columns. 

Here is some sample parquet data of the row history to change the `EmployeeLocation` for `EmployeeID` E0001 from Redmond to Bellevue. In this scenario, the `EmployeeID` column has been marked as a key column in the [metadata file in the landing zone](#metadata-file-in-the-landing-zone).

```parquet
__rowMarker__,EmployeeID,EmployeeLocation
0,E0001,Redmond
0,E0002,Redmond
0,E0003,Redmond
1,E0001,Bellevue
```

If key columns are updated, then it should be presented by a DELETE on previous key columns and an INSERT rows with new key and data. For example, the row history to change the `RowMarker` unique identifier for `EmployeeID` E0001 to E0002. You don't need to provide all column data for a DELETE row, only the key columns.

```parquet
__rowMarker__,EmployeeID,EmployeeLocation
0,E0001,Bellevue
2,E0001,NULL
0,E0002,Bellevue
```

## Table operations

Open mirroring supports table operations such as add, drop, and rename tables.

### Add table

Open mirroring picks up any table added to landing zone by the application. Open mirroring scans for new tables in every iteration.

### Drop table

Open mirroring keeps track of the folder name. If a table folder is deleted, open mirroring drops the table in the mirrored database. 

If a folder is recreated, open mirroring drops the table and recreates it with the new data in the folder, accomplished by tracking the ETag for the folder.

When attempting to drop a table, you can try deleting the folder, but there is a chance that open mirroring is still using the data from the folder, causing a delete failure for publisher.

### Rename table

To rename a table, drop and recreate the folder with initial and incremental data. Data will need to be repopulated to the renamed table.

### Schema

A table path can be specified within a schema folder. A schema landing zone should have a `<schemaname>.schema` folder name. There can be multiple schemas and there can be multiple tables in a schema.

For example, if you have schemas (`Schema1`, `Schema2`) and tables (`Table A`, `Table B`, `Table C`) to be created in the landing zone, create folders like the following paths in OneLake:

- `https://onelake.dfs.fabric.microsoft.com/<workspace id>/<mirrored database id>/Files/LandingZone/Schema1.schema/TableA`
- `https://onelake.dfs.fabric.microsoft.com/<workspace id>/<mirrored database id>/Files/LandingZone/Schema1.schema/TableB`
- `https://onelake.dfs.fabric.microsoft.com/<workspace id>/<mirrored database id>/Files/LandingZone/Schema2.schema/TableC`

## Table columns and column operations

### Column types

- Simple parquet types are supported in the landing zone.
- Complex types should be written as a JSON string.
- Binary complex types like geography, images, etc. can be stored as binary type in the landing zone.

### Add column

If new columns are added to the parquet files, open mirroring adds the columns to the delta tables.

### Delete column

If a column is dropped from the new log files, open mirroring stores `NULL` for those columns in new rows, and old rows have the columns present in the data. To delete the column, [drop the table](#drop-table) and create the table folder in the landing zone again, which will result into recreation of the Delta table with new schema and data.

Open mirroring always unions all the columns from previous version of added data. To remove a column, recreate the table/folder.

### Change column type

To change a column type, drop and recreate the folder with initial and incremental data with the new column type. Providing a new column type without recreating the table results an error, and replication for that table will stop. Once the table folder is recreated, replication resumes with new data and schema.

### Rename column

To rename a column, delete the table folder and recreate the folder with all the data and with the new column name.

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Configure Microsoft Fabric open mirrored databases](open-mirroring-tutorial.md)

## Related content

- [Monitor Fabric mirrored database replication](monitor.md)
