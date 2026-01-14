---
title: "Open Mirroring Landing Zone Requirements and Formats"
description: Review the requirements for files in the landing for open mirroring in Microsoft Fabric.
author: whhender
ms.author: whhender
ms.reviewer: tinglee, sbahadur, marakiketema
ms.date: 09/09/2025
ms.topic: reference
ms.search.form: Fabric Mirroring
no-loc: [Copilot]
---
# Open mirroring landing zone requirements and format

This article details the landing zone and table/column operation requirements for open mirroring in Microsoft Fabric.

Once you have created your open mirrored database via the Fabric portal or public API in your Fabric workspace, you get a landing zone URL in OneLake in the **Home** page of your mirrored database item. This landing zone is where your application to create a metadata file and land data in Parquet or delimited text format, including CSV. Files can be uncompressed or compressed with Snappy, GZIP, or ZSTD. For more information, see [supported data files and format](#data-file-and-format-in-the-landing-zone). 

:::image type="content" source="media/open-mirroring-landing-zone-format/landing-zone-url.png" alt-text="Screenshot from the Fabric portal showing the Landing zone URL location in the Home page of the mirrored database item." lightbox="media/open-mirroring-landing-zone-format/landing-zone-url.png":::

## Landing zone

For every mirrored database, there's a unique storage location in OneLake for metadata and delta tables. Open mirroring provides a landing zone folder for application to create a metadata file and push data into OneLake. Mirroring monitors these files in the landing zone and read the folder for new tables and data added.

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

If `keyColumns` or `_metadata.json` isn't specified, then update/deletes aren't possible. This file can be added anytime, but once added `keyColumns` can't be changed.

### Events file in the landing zone

If you're a partner implementing an open mirroring solution or a customer who would like to provide more details to us about the type of source you're mirroring into OneLake, we've added a new `_partnerEvents.json` file. This isn't required, but is strongly recommended.

Example: 

```json
{
  "partnerName": "testPartner",
  "sourceInfo": {
    "sourceType": "SQL",
    "sourceVersion": "2019",
    "additionalInformation": {
      "testKey": "testValue"
    }
  }
}

```

Requirements of the `_partnerEvents.json` file:

- The `_partnerEvents.json` file should be placed at the mirrored database level in the landing zone, not per table.
- The `sourceType` can be any descriptive string representing the source. There are no constraints on this value, for example: "SQL", "Oracle", "Salesforce", etc.
- The `partnerName` can be set to any name of your choosing and can be representative of your organization's name. Keep the name consistent across all mirror databases.

## Data file and format in the landing zone

Open mirroring supports data intake in Parquet or delimited text formats. Files can be uncompressed or compressed with Snappy, GZIP, or ZSTD.

### Parquet requirements

### Delimited text requirements

- For delimited text format, the file must have header row in the first row.
- For delimited text, provide additional information in your `_metadata.json` file. The `FileExtension` property is required. Delimited text files have the following properties and defaults:

   | Property           | Description                                   | Notes                                                                 |
   |:-------------------|:----------------------------------------------|:----------------------------------------------------------------------|
   | `FirstRowAsHeader`   | True/false for first row header.              | Required to be `true` for delimited text files.                       |
   | `RowSeparator`       | Character used to separate rows.              | Default is `\r\n`. Also supports `\n` and `\r`.                       |
   | `ColumnSeparator`    | Character used to separate columns.           | Default is `,`. Also supports `;`, `|`, and `\t`.                     |
   | `QuoteCharacter`     | Character used to quote values containing delimiters. | Default is `"`. Can also be `'` or empty string.              |
   | `EscapeCharacter`    | Used to escape quotes inside quoted values.   | Default is `\`. Can also be `/`, `"`, or empty.                       |
   | `NullValue`          | String representation of null values.         | Can be `""`, `"N/A"`, `"null"`, etc.                                  |
   | `Encoding`           | Character encoding of the file.               | Default is `UTF-8`. Supports a wide range of encodings including `ascii`, `utf-16`, `windows-1252`, etc. |
   | `SchemaDefinition`   | Defines column names, types, and nullability. | Schema evolution isn't supported.                                    |
   | `FileFormat`         | Format of the data file.                      | Defaults to `CSV` if not specified. Must be `"DelimitedText"` for formats other than CSV. |
   | `FileExtension`      | Specifies file extension like `.tsv`, `.psv`. | Required when using `DelimitedText`.                                  |

   For example, the `_metadata.json` file for a `.tsv` data file with four columns:

   ```json
   {
   "KeyColumns": [ "id" ],
   "SchemaDefinition": {
      "Columns": [
                    {
                    "Name": "id",
                    "DataType": "Int32"
                    },
                    {
                    "Name": "name",
                    "DataType": "String",
                    "IsNullable": true
                    },
                    {
                    "Name": "age",
                    "DataType": "Int32",
                    "IsNullable": true
                    },
                    {
                    "Name": "seqNum",
                    "DataType": "Int64",
                    "IsNullable": false
                    }
                  ]
                },
   "FileFormat": "DelimitedText",
   "FileExtension": "tsv",
   "FileFormatTypeProperties": {
                              "FirstRowAsHeader": true,
                              "RowSeparator": "\r\n",
                              "ColumnSeparator": ",",
                              "QuoteCharacter": "'",
                              "EscapeCharacter": "\",
                              "NullValue": "N/A",
                              "Encoding": "UTF-8"
                           }
   }
  ```

- Only delimited text formats are expected to have a data type in the file `_metadata.json`. Parquet files don't need to specify column type information. The data types currently supported:

| Supported data type | Description                                                                         |
|---------------------|------------------------------------------------------------------------------------|
| `Double`            | A number with decimals, used when high precision is needed (for example, 3.14159). |
| `Single`            | A number with decimals, but less precise than Double (for example, 3.14).          |
| `Int16`             | A small whole number, typically between -32,768 and 32,767.                        |
| `Int64`             | A very large whole number, used for big counts or IDs.                             |
| `Int32`             | A standard whole number, commonly used for counting or indexing.                   |
| `DateTime`          | A full date and time value (for example, 2025-06-17 14:30:00).                     |
| `IDate`             | A calendar date without time (for example, 2025-06-17).                            |
| `ITime`             | A full date and time value (for example, 2025-06-17 14:30:00)                      |
| `String`            | Text data like names, labels, or descriptions.                                     |
| `Boolean`           | A true or false value, often used for toggles or yes/no choices.                   |
| `ByteArray`         | Raw binary data, such as files, images, or encoded content.                        |

## Format requirements

All files written to the landing zone have the following format:

`<rowMarker><DataColumns>`

- `rowMarker`: column name is `__rowMarker__` (including two underscores before and after `rowMarker`). `__rowMarker__` values and behaviors:
  
   | `__rowMarker__` (Scenario) | If row doesn't exist with same key column(s) in the destination | If row exists with same key column(s) in the destination |
   |:--|:--|:--|
   | `0` (Insert) | Insert the row to destination | Insert the row to destination, no validation for dup key column check. |
   | `1` (Update) | Insert the row to destination, no validation/exception to check existence of row with same key column. | Update the row with same key column. |
   | `2` (Delete) | No data change, no validation/exception to check existence of row with same key column. | Delete the row with same key column. |
   | `4` (Upsert) | Insert the row to destination, no validation/exception to check existence of row with same key column. | Update the row with same key column. |

- Row order: All the logs in the file should be in natural order as applied in transaction. This is important for the same row being updated multiple times. Open mirroring applies the changes using the order in the files.

- File order: Files should be added in monotonically increasing numbers.

- File name: File name is 20 digits, like `00000000000000000001.parquet` for the first file, and `00000000000000000002.parquet` for the second. File names should be in continuous numbers. Files will be deleted by the mirroring service automatically, but the last file will be left so that the publisher system can reference it to add the next file in sequence.

 > [!IMPORTANT]
 > The `__rowMarker__` column needs to be the final column in the list

### Nonsequential files

Nonsequential files are also supported; files will be read based on their timestamp. To specify this and default to upsert changes rather than inserts, update the _metadata.json file like this:

```json
{
   "keyColumns" : ["id"],
   "fileDetectionStrategy": LastUpdateTimeFileDetection,
   "isUpsertDefaultRowMarker": true
}
```

The 'default to upsert' doesn't depend on nonsequential files. All the following combinations are supported:

- Have both **fileDetectionStrategy** as LastUpdateTimeFileDetection and **isUpsertDefaultRowMarker** as true.
- Only have **isUpsertDefaultRowMarker** as true.
- Only have **fileDetectionStrategy** as LastUpdateTimeFileDetection.
- Default

### Initial load

For the initial load of data into an open mirrored database, `__rowMarker__` in the initial data file is optional and not recommended. Mirroring treats the entire file as an INSERT when `__rowMarker__` doesn't exist.

For better performance and accurate metrics, `__rowMarker__` is a mandatory field only for incremental changes to apply update/delete/upsert operation. 

### Incremental changes

Open mirroring reads incremental changes in order and applies them to the target Delta table. Order is implicit in the change log and in the order of the files.

Data changes are considered as incremental changes once the `__rowMarker__` column is found from any row/file.

Updated rows must contain the full row data, with all columns. 

Here's some sample parquet data of the row history to change the `EmployeeLocation` for `EmployeeID` E0001 from Redmond to Bellevue. In this scenario, the `EmployeeID` column has been marked as a key column in the [metadata file in the landing zone](#metadata-file-in-the-landing-zone).

```parquet
EmployeeID,EmployeeLocation,__rowMarker__
E0001,Redmond,0
E0002,Redmond,0
E0003,Redmond,0
E0001,Bellevue,1
```

If key columns are updated, then it should be presented by a DELETE on previous key columns and an INSERT rows with new key and data. For example, the row history to change the `__rowMarker__` unique identifier for `EmployeeID` E0001 to E0002. You don't need to provide all column data for a DELETE row, only the key columns. 

```parquet
EmployeeID,EmployeeLocation,__rowMarker__
E0001,Bellevue,0
E0001,NULL,2
E0002,Bellevue,0
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

If new columns are added to the parquet or CSV files, open mirroring adds the columns to the delta tables.

### Delete column

If a column is dropped from the new log files, open mirroring stores `NULL` for those columns in new rows, and old rows have the columns present in the data. To delete the column, [drop the table](#drop-table) and create the table folder in the landing zone again, which will result into recreation of the Delta table with new schema and data.

Open mirroring always unions all the columns from previous version of added data. To remove a column, recreate the table/folder.

### Change column type

To change a column type, drop and recreate the folder with initial and incremental data with the new column type. Providing a new column type without recreating the table results an error, and replication for that table will stop. Once the table folder is recreated, replication resumes with new data and schema.

### Rename column

To rename a column, delete the table folder and recreate the folder with all the data and with the new column name.

### Cleanup process

A cleanup process for opening mirroring moves all processed files to a separate folder called `_ProcessedFiles` or `_FilesReadyToDelete`. After seven days, the files are removed from this folder. 

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Configure Microsoft Fabric open mirrored databases](../mirroring/open-mirroring-tutorial.md)

## Related content

- [Monitor Fabric mirrored database replication](../mirroring/monitor.md)
