---
title: Delta Lake FSCK REPAIR TABLE command
description: Learn how to fix your delta table when the delta log contains references to missing files
ms.reviewer: snehagunda
ms.author: t-sofyam
author: DaniBunny
ms.topic: 
ms.custom:
  - None
  - 
ms.date: 
ms.search.form: 
---

# Delta Lake FSCK REPAIR TABLE command

Sometimes, the files that are referenced within the delta log may get removed from the file system. In that case, the user will start running into an error similar to `org.apache.spark.SparkFileNotFoundException: File <FilePath> does not exist`. The FSCK command is intended to make the table usable again. Specifically by removing the files referenced in the transaction log that are not found in the filesystem. This guide will go over how to use the `FSCK REPAIR TABLE` command and how that might affect the stored data.

At the moment, only missing parquet files are handled by this command and the support for missing deletion vectors is in progress. 

## How to avoid using FSCK?

Note that running the FSCK command does not preserve data constistency so it is better to avoid using this command in the first place. While sometimes the files can get removed randomly, there are some specific actions taken by the user that can lead to the `File does not exist` error. The following sequence of actions is likely to lead to this scenario:
1. Create a table, insert data into it and delete some of the data.
2. Clean up the files unreferenced in the transaction log by running the VACUUM command.
3. Restore the table to the version before the vacuum retention period (by default it's set to 7 days).

Now, the table we have has references to files that were vacuumed which means the table is not usable. Not performing this sequence of actions will decrease your changes of having to use this command. However, if do run into `File does not exist` errors, see below for how to correctly use the `FSCK REPAIR TABLE` command to fix the table.

## How will the data be affected?

Since running the FSCK command removes references to the parquet files, the data that was contained in those parquet files will not be in the table anymore. It's important to keep this in mind when running this command

# Syntax

```sql
FSCK REPAIR TABLE <table|delta.fileOrFolderPath> [DRY RUN]
```

## Parameters

- `<table|fileOrFolderPath>`
  Reference to __an existing__ delta table. The command supports spaces in table names, full, and relative paths. 
- `DRY RUN`
  
  __Note__: it is strongly encouraged to run the command in dry run mode first before running it without dry run to get an idea what files will be removed before they are removed.
  
  Running the command in `DRY RUN` mode provides insights into which files are present in the transaction log and are missing in the filesystem. Speficially, the generated output will provde file paths that are missing within the filesystem but are found in the transaction log. By default, the first `1000` files are displayed but that limit can be changed by updating the `spark.databricks.delta.fsck.maxNumEntriesInResult` config. This limit will only be applied to DRY RUN mode. When ran without DRY RUN, all of the deleted files will be displayed.

## Returns
In both cases (`DRY RUN` and normal), the following columns will be reported to the user:
- `dataFilePath STRING NOT NULL` - path of the missing file
- `dataFileMissing BOOLEAN NOT NULL` - whether the data file is missing on disk or not. Since only the missing files are reported, in this version of the command this column is always set to True

# Examples

## FSCK Simple 

Assume here that the transaction log for table `t` contains `file1.parquet`, `file2.parquet`, and `file3.parquet` but `file1.parquet` is missing on disk
```sql
> FSCK REPAIR TABLE t DRY RUN;
Found (1) file(s) to be removed from the delta log. Listing all row
+--------------------+---------------+
|        dataFilePath|dataFileMissing|
+--------------------+---------------+
|file1.parquet       |           true| 
+--------------------+---------------+
> FSCK REPAIR TABLE t;
Removed (1) file(s) from the delta log.
+--------------------+---------------+
|        dataFilePath|dataFileMissing|
+--------------------+---------------+
|file1.parquet       |           true| 
+--------------------+---------------+
```

## FSCK with partitions

Assume here that the transaction log for table `t` contains partitions `col1=1/col2=0` and `col1=1/col2=1` and `file1.parquet`, `file2.parquet`, and `file3.parquet` in each partition but the directory for `col1=1/col2=1` partition is missing on disk.
```sql
> FSCK REPAIR TABLE t DRY RUN;
Found (3) file(s) to be removed from the delta log. Listing all row
+--------------------+---------------+
|        dataFilePath|dataFileMissing|
+--------------------+---------------+
|col1=1/col2=1/file1.|           true| 
+--------------------+---------------+
|col1=1/col2=1/file2.|           true|
+--------------------+---------------+
|col1=1/col2=1/file3.|           true|
+--------------------+---------------+

> FSCK REPAIR TABLE t;
Removed (3) file(s) from the delta log.
+--------------------+---------------+
|        dataFilePath|dataFileMissing|
+--------------------+---------------+
|col1=1/col2=1/file1.|           true| 
+--------------------+---------------+
|col1=1/col2=1/file2.|           true|
+--------------------+---------------+
|col1=1/col2=1/file3.|           true|
+--------------------+---------------+
```

## Related content

- [What is Delta Lake?](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake)
- [Lakehouse and Delta Lake](lakehouse-and-delta-tables.md)

