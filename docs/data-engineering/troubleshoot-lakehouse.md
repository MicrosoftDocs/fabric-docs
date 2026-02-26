---
title: Troubleshoot Lakehouse Errors in Data Engineering
description: Troubleshoot common Lakehouse issues in Data Engineering in Microsoft Fabric.
author: ValOlson
ms.author: vallariolson
ms.reviewer: eur
ms.date: 02/09/2026
ms.topic: troubleshooting
---

# Troubleshoot Lakehouse issues for Microsoft Fabric Data Engineering

This article provides guidance for troubleshooting common issues you might encounter when working with Lakehouse in Microsoft Fabric.

>[!NOTE]
> Code examples in this article use placeholder names like `your_table_name`, `your_lakehouse`, and `commonly_filtered_column`. Replace these placeholders with your actual table, lakehouse, and column names before running the code.

## Error messages and resolution categories

Use this reference table to quickly identify common Microsoft Fabric Lakehouse error messages and navigate to their troubleshooting solutions.

| Errors | Resolution category |
|-------|---------------------------|
| Schema Errors for a Delta Table | [Delta Table Schema Errors](#delta-table-schema-errors) |
| Table Name already exists | [Table or View Already Exists](#error-table-or-view-already-exists) |
| Invalid column name(s) in file | [Invalid Column Names](#error-invalid-column-names) |
| Delta Table Metadata and Log Errors | [Delta Table Metadata and Transaction Log Errors](#delta-table-metadata-and-transaction-log-errors) |
| Table Was Not Found in Lakehouse | [Table Not Found Errors](#table-not-found-errors) |
| Path not found / Artifact not found | [File and Path Errors](#file-and-path-errors) |
| Error Sending Request: Failed to Fetch During File Upload | [File Upload Errors](#file-upload-errors) |
| Lakehouse Data Copy Operation failed | [Lakehouse Operation and Data Copy Errors](#lakehouse-operation-and-data-copy-errors) |
| Internal server error / Job execution fails with 500 | [Internal Server and Processing Errors](#internal-server-and-processing-errors) |
| An error occurred while processing your request | [Materialized Lake Views Errors](#materialized-lake-views-errors) |
| Power BI Entity Not Found / Not Autorized at Lakehouse Refresh | [Power BI Integration Errors](#power-bi-integration-errors) |

## Delta Table Schema Errors

This section addresses schema compatibility issues and type mismatches when working with Delta tables in Lakehouse.

### Error: [DELTA_FAILED_TO_MERGE_FIELDS] Failed to Merge Fields

This error occurs when there's a schema incompatibility between source data and the target Delta table.

**Error Messages:**
- [DELTA_FAILED_TO_MERGE_FIELDS] Failed to merge fields 'field 1' and 'field 2' / Invalid Table

#### Scenario

This issue typically occurs when you are appending new data to an existing Delta table or performing a MERGE operation.

#### Common Causes

The following are the most frequent reasons for schema merge failures:
- Writing a DataFrame to a Delta table using `.mode("append")` when the source data has different data types than the target table (e.g., StringType vs. TimestampType)
- Loading CSV files into a Delta table where string columns don't match the expected timestamp or numeric types
- Nullability conflicts where one field allows nulls and the other doesn't
- Schema changes in source data without proper evolution enabled

#### What Happened

This error occurs when there is a schema incompatibility between your source data and the target Delta Lake table. Even though both fields have the same name, Delta Lake cannot merge them because they have different properties such as data types, nullability, or precision.

#### How to Fix the Error

Apply one or more of these solutions to resolve schema incompatibilities and successfully write data to your Delta table.

**Fix 1: Identify and Cast Mismatched Data Types**

Compare your source and target schemas to identify the type mismatch. Understanding [how Delta Lake tables manage schemas in Fabric lakehouses](lakehouse-schemas.md) is critical.

First, inspect both schemas:
```python
# Check target table schema
spark.sql("DESCRIBE TABLE your_lakehouse.your_table").show()

# Check source DataFrame schema
source_df.printSchema()
```

Once you identify the mismatches, cast **all** problematic columns in your source data to match the target table. CSV sources without an explicit schema default to `StringType` for every column, so you might need to cast more than just the column named in the error:

```python
from pyspark.sql.functions import col

# Cast every column whose type doesn't match the target table
source_df = (source_df
    .withColumn("id", col("id").cast("int"))
    .withColumn("field_name", col("field_name").cast("timestamp"))
    # Repeat for each mismatched column
)

# Then append to the table
source_df.write.format("delta").mode("append").saveAsTable("your_table")
```

The [Lakehouse and Delta Tables documentation](lakehouse-and-delta-tables.md) explains how Delta enforces strict schema consistency.

**Fix 2: Use Explicit Schema Definitions**

Define an explicit schema for your source data before writing to prevent type mismatches. This ensures [Delta Lake table format interoperability](../fundamentals/delta-lake-interoperability.md):

```python
from pyspark.sql.types import StructType, StructField, TimestampType, IntegerType

# Define schema matching your target table exactly
schema = StructType([
    StructField("id", IntegerType(), False),
    StructField("field_name", TimestampType(), True),
    # Add all other fields with matching types
])

# Apply schema when reading source data
source_df = spark.read.schema(schema).format("csv").load("Files/your_source")
```

This preventive approach is especially useful when ingesting data from external sources with inconsistent or unknown types.

**Fix 3: Fix Schema Mismatches in MERGE Operations**

When performing upsert operations with MERGE statements, ensure both source and target have matching field types. This operation writes to the target table, so you need at least Contributor role on the Lakehouse.

```python
from delta.tables import DeltaTable
from pyspark.sql.functions import col

# Read source data (replace with your actual source)
source_df = spark.read.format("csv").option("header", "true").load("Files/your_source")

# Cast mismatched columns to match target table schema
source_df = source_df.withColumn("field_name", col("field_name").cast("timestamp"))

# Connect to existing Delta table and perform merge
# This updates matching rows and inserts new rows
target_table = DeltaTable.forName(spark, "your_table")
target_table.alias("target").merge(
    source_df.alias("source"),
    "target.id = source.id"
).whenMatchedUpdateAll().whenNotMatchedInsertAll().execute()
```

Review the [Lakehouse schemas documentation](lakehouse-schemas.md) for more details on schema enforcement during merge operations.

**Fix 4: Prevent Future Schema Issues with Proper Table Configuration**

Configure tables with optimization properties to maintain consistent file layouts and reduce schema-related issues. See [table maintenance and optimization](../fundamentals/table-maintenance-optimization.md) for comprehensive guidance on configuring optimize-write, auto-compaction, and layer-specific optimization strategies.


### Error: Failed to Deserialize the Latest Schema for a Delta Table

This error occurs when Delta Lake cannot parse or understand the schema information stored in the transaction log.

**Error Messages:**
- Failed to Deserialize the Latest Schema for a Delta Table because it is in an invalid/malformed form / Invalid Schema For Delta Table

#### Scenario

This issue typically occurs when you are attempting to read from or query a Delta table that has corrupted metadata.

#### Common Causes

The following are the most common reasons for schema deserialization failures:
- Opening a notebook and trying to query a Delta table after an interrupted write operation left incomplete schema metadata
- Attempting to read a Delta table where the `_delta_log` directory was manually modified or contains corrupted JSON files
- Corrupted transaction log files in `_delta_log` directory
- Incompatible Delta Lake versions wrote to the table

#### What Happened

Delta Lake cannot parse or deserialize the schema information stored in the transaction log. The schema metadata may be corrupted, malformed, or contain unsupported data types, preventing Delta from understanding the table structure.

#### How to Fix the Error

Follow one or more of these approaches to recover from corrupted schema metadata and restore table access.

**Fix 1: Inspect and Repair Transaction Log**

Check the Delta transaction log for corruption using the [Lakehouse and Delta Tables guide](lakehouse-and-delta-tables.md):

```python
from notebookutils import mssparkutils

# Check Delta table history for issues
# Replace 'your_table_name' with your actual table name (e.g., 'sales_data')
spark.sql("DESCRIBE HISTORY your_table_name").show()

# Get the actual table location (needed for filesystem operations on managed tables)
table_detail = spark.sql("DESCRIBE DETAIL your_table_name").collect()[0]
table_path = table_detail["location"]
delta_log_path = f"{table_path}/_delta_log/"

# Examine the transaction log files
display(mssparkutils.fs.ls(delta_log_path))

# Try to read the latest checkpoint
spark.read.parquet(f"{table_path}/_delta_log/*.checkpoint.parquet").show()
```

If log files are corrupted, you may need to restore from a backup or rebuild the table. If you have the underlying Parquet data files:

```python
# Get the actual table location (managed tables require the full ABFS path)
table_detail = spark.sql("DESCRIBE DETAIL your_table_name").collect()[0]
table_path = table_detail["location"]

# Read the data files directly (bypassing Delta log)
# Use recursive glob - Delta tables store Parquet files in subdirectories
df = spark.read.parquet(f"{table_path}/**/*.parquet")

# Verify the recovered data looks correct
df.printSchema()
df.show()

# Recreate as a new Delta table (overwriteSchema handles cases where
# the restored table already exists with a different schema)
df.write.format("delta").mode("overwrite").option("overwriteSchema", "true").saveAsTable("your_table_name_restored")
```

**Fix 2: Define Explicit Schema to Prevent Issues**

Prevent schema deserialization errors by always defining explicit schemas using the [Work with Delta Lake Tables training](/training/modules/work-delta-lake-tables-fabric/):

```python
from pyspark.sql.types import StructType, StructField, StringType, IntegerType, TimestampType

# Define schema explicitly
schema = StructType([
    StructField("id", IntegerType(), nullable=False),
    StructField("name", StringType(), nullable=True),
    StructField("created_at", TimestampType(), nullable=True)
])

# Use schema when creating table
df = spark.read.schema(schema).option("header", "true").format("csv").load("Files/data.csv")
df.write.format("delta").mode("overwrite").option("overwriteSchema", "true").saveAsTable("your_table_name")
```

Avoid schema drift by using consistent schemas across all write operations and enabling schema validation.

**Fix 3: Enable Table Maintenance to Prevent Corruption**

Proper table maintenance reduces the risk of metadata corruption by ensuring consistent file layouts and reducing transaction log complexity:

```python
# Configure table properties for better reliability
spark.sql("""
    ALTER TABLE your_table_name 
    SET TBLPROPERTIES (
        'delta.autoOptimize.optimizeWrite' = 'true',
        'delta.autoOptimize.autoCompact' = 'true'
    )
""")
```

**Recommended approach**: Use table properties instead of session configurations to ensure all writers follow consistent practices:

```python
# Recommended: Table-level properties persist across all sessions
spark.sql("""
    CREATE TABLE your_table_name (
        id INT,
        name STRING,
        created_at TIMESTAMP
    )
    TBLPROPERTIES (
        'delta.autoOptimize.optimizeWrite' = 'true',
        'delta.autoOptimize.autoCompact' = 'true'
    )
""")
```

This approach prevents inconsistent write patterns that can lead to schema deserialization issues. See [table maintenance and optimization](../fundamentals/table-maintenance-optimization.md) for comprehensive guidance.


## Error: Naming Conflicts

This section helps you resolve issues related to duplicate object names in your Lakehouse.

### Error: Table or View Already Exists

This error occurs when you attempt to create a table or view with a name that's already in use.

**Error Messages:**
- Table Name already exists
- Materialized view already exists
- Cannot create table, name already in use

#### Scenario

This issue typically occurs when you are running notebooks or pipelines that create tables without checking for existing objects.

#### Common Causes

The following situations commonly lead to naming conflicts:
- Running a notebook cell with `CREATE TABLE` statement multiple times without dropping the table first or rerunning CREATE TABLE statements without checking for existence
- Rerunning a data pipeline that includes table creation steps after a previous successful execution
- Schema merge conflicts when appending data with incompatible structures
- Notebook or pipeline reruns creating tables that already exist

#### What Happened

The table, materialized view, or schema you're attempting to create already exists in the Lakehouse. Delta Lake prevents duplicate object names within the same namespace to avoid data conflicts and ambiguity.

#### How to Fix the Error

Use one or more of these methods to resolve naming conflicts and safely create or manage tables.

**Fix 1: Use CREATE OR REPLACE**

Use `CREATE OR REPLACE` to avoid naming conflicts entirely. This is the recommended pattern in Fabric because it handles both cases—whether the object exists or not—without requiring separate existence checks. This operation requires Contributor role or higher:

For tables:

```python
# CREATE OR REPLACE handles both cases (table exists or not)
spark.sql("""
    CREATE OR REPLACE TABLE your_lakehouse.your_table_name (
        id INT,
        name STRING
    ) USING DELTA
""")
```

For materialized views, `CREATE OR REPLACE` is the standard pattern. It removes the need for existence checks and prevents naming conflicts on reruns:

```sql
-- CREATE OR REPLACE handles both cases (view exists or not)
CREATE OR REPLACE MATERIALIZED VIEW your_view_name AS
SELECT * FROM source_table;
```

**Fix 2: Use Conditional Creation Logic**

If you need more control over how existing data is handled (for example, appending instead of replacing), implement existence checks before table creation. This operation requires Contributor role or higher:

```python
# Assumes df is already defined with your source data
# Check and create only if table doesn't exist
if "your_table_name" not in [row.tableName for row in spark.sql("SHOW TABLES").collect()]:
    df.write.format("delta").mode("overwrite").saveAsTable("your_lakehouse.your_table_name")
else:
    # Use mergeSchema to handle cases where source has new columns
    print("Table exists, appending data instead")
    df.write.format("delta").mode("append").option("mergeSchema", "true").saveAsTable("your_table_name")
```

For more information on schema management, see [Lakehouse schemas documentation](lakehouse-schemas.md). To configure table properties for optimal maintenance and performance, see [configuration best practices](../fundamentals/table-maintenance-optimization.md#configuration-best-practices).


### Error: Invalid Column Names

This error occurs when column names don't meet Delta Lake's naming requirements.

**Error Messages:**
- Invalid column name(s) in file / Invalid column name
- Column name contains invalid characters
- Column name exceeds maximum length

#### Scenario

This issue typically occurs when you are loading data from external sources with non-standard column naming conventions.

#### Common Causes

The following situations commonly produce invalid column names:
- Importing CSV or Excel files with column headers that contain spaces or special characters like `#` or `@`
- Reading data from source systems that use very long column names exceeding 128 characters
- Duplicate column names within the same table schema definition
- Non-UTF-8 characters in column names

#### What Happened

Column names in your source data or schema definition don't meet Delta Lake naming requirements. Delta tables require column names to use specific character sets and length constraints.

#### How to Fix the Error

Apply one or more of these techniques to rename columns and ensure they meet Delta Lake requirements.

**Fix 1: Validate and Correct Invalid Column Names**

Column names must meet specific requirements: UTF-8 encoded Unicode word characters only, maximum 128 characters long, and no space characters allowed. Valid characters include letters (any case), nonspacing marks, punctuation connectors like underscore (_), and decimal digits.

```python
import re

# Function to validate column name
def is_valid_column_name(col_name):
    # Check length
    if len(col_name) > 128:
        return False, "Column name exceeds 128 characters"
    # Check for spaces
    if ' ' in col_name:
        return False, "Column name contains spaces"
    # Check for valid characters (word characters: letters, digits, underscore, Unicode)
    if not re.match(r'^[\w]+$', col_name, re.UNICODE):
        return False, "Column name contains invalid characters"
    return True, "Valid"

# Clean invalid column names
def clean_column_name(col_name):
    # Replace spaces with underscores
    cleaned = col_name.replace(' ', '_')
    # Remove invalid characters (keep only word characters)
    cleaned = re.sub(r'[^\w]', '', cleaned, flags=re.UNICODE)
    # Truncate to 128 characters
    cleaned = cleaned[:128]
    return cleaned

# Apply to DataFrame (source_df must be defined before running this code)
for col_name in source_df.columns:
    is_valid, message = is_valid_column_name(col_name)
    if not is_valid:
        new_name = clean_column_name(col_name)
        print(f"Renaming '{col_name}' to '{new_name}': {message}")
        source_df = source_df.withColumnRenamed(col_name, new_name)
```

**Fix 2: Remove Duplicate Column Names**

Inspect your schema definition and source data for duplicate columns:

```python
# Check for duplicate column names in DataFrame
columns = source_df.columns
duplicates = [col for col in columns if columns.count(col) > 1]
if duplicates:
    print(f"Duplicate columns found: {set(duplicates)}")

# Remove or rename duplicate columns
from pyspark.sql.functions import col

# Option 1: Select distinct column names (keeps first occurrence)
distinct_columns = []
seen = set()
for c in source_df.columns:
    if c not in seen:
        distinct_columns.append(c)
        seen.add(c)
source_df = source_df.select(*distinct_columns)

# Option 2: Rename duplicates with suffix
for i, column in enumerate(source_df.columns):
    if source_df.columns.count(column) > 1:
        source_df = source_df.withColumnRenamed(column, f"{column}_{i}")
```

For more information on schema management, see [Lakehouse schemas documentation](lakehouse-schemas.md).

## Delta Table Metadata and Transaction Log Errors

This section addresses issues with Delta table transaction logs and metadata integrity.

### Error: No Delta Transaction Log Entries Were Found for Table

This error indicates that the Delta table's transaction log is missing or empty.

**Error Messages:**
- No Log Entries for Delta Table found
- Delta Table is missing a Delta transaction log entry

#### Scenario

This issue typically occurs when you are attempting to read a directory as a Delta table that was not properly initialized.

#### Common Causes

The following situations commonly result in missing transaction logs:
- Trying to query a folder containing Parquet files that were copied directly without Delta table conversion
- Accessing a table location where the `_delta_log` directory was accidentally deleted or never created
- Interrupted write operation that didn't complete Delta table initialization
- Attempting to read a Parquet directory as a Delta table without proper conversion

#### What Happened

The Delta table's `_delta_log` directory is missing, empty, or corrupted. Delta Lake relies on transaction logs to maintain ACID properties, track all changes, and manage table metadata. Without valid transaction log entries, the table cannot function properly.

#### How to Fix the Error

Use one or more of these methods to restore or recreate the Delta table's transaction log.

**Fix 1: Validate Delta Table Structure and Recreate if Needed**

Check if the `_delta_log` directory exists using the [Lakehouse and Delta Tables documentation](lakehouse-and-delta-tables.md):

```python
from notebookutils import mssparkutils

# Get the actual table location (relative paths don't resolve for managed tables)
table_detail = spark.sql("DESCRIBE DETAIL your_table_name").collect()[0]
table_path = table_detail["location"]

# Check for _delta_log directory
display(mssparkutils.fs.ls(table_path))

# Verify _delta_log exists and contains files
display(mssparkutils.fs.ls(f"{table_path}/_delta_log/"))
```

If the `_delta_log` directory is missing or empty, the directory is not a valid Delta table. You need to recreate it:

```python
# Read the parquet files (if they exist)
# Use recursive glob - Delta tables store Parquet files in subdirectories
df = spark.read.parquet(f"{table_path}/**/*.parquet")

# Write as a proper Delta table
df.write.format("delta").mode("overwrite").option("overwriteSchema", "true").saveAsTable("your_table_name")
```

**Fix 2: Convert Existing Parquet Data to Delta Table**

If you have existing Parquet data that needs to be converted to Delta format, use the CONVERT TO DELTA command as explained in the [Work with Delta Lake Tables training module](/training/modules/work-delta-lake-tables-fabric/):

```sql
-- Convert existing Parquet files to Delta table
CONVERT TO DELTA parquet.`Tables/your_table_name`
```

Or use PySpark to write a proper Delta table with transaction log. This operation requires Contributor role or higher:

```python
# Assumes df is already defined with your Parquet data (e.g., spark.read.parquet(...))
# saveAsTable creates both the Delta files and metastore registration in one step
df.write.format("delta").mode("overwrite").option("overwriteSchema", "true").saveAsTable("your_table_name")
```

### Error: The Metadata for the Delta Table Could Not Be Found

This error occurs when Delta Lake cannot locate or access the table's metadata in the transaction log.

**Error Messages:**
- Missing Metadata For Delta Table Version

#### Scenario

This issue typically occurs when you are querying a Delta table where the metadata has been corrupted or is inaccessible.

#### Common Causes

The following are common reasons for missing Delta table metadata:
- Running a Spark query against a table where the `_delta_log` directory is missing or has permission issues preventing access
- Attempting to access a table that was dropped from the metastore but storage files were not cleaned up
- Table path is incorrect or points to a non-Delta directory
- Metadata corruption or incomplete table initialization

#### What Happened

Delta Lake cannot locate or read the metadata required to access the table. The metadata includes information stored in the `_delta_log` directory that describes the table structure, partitions, and transaction history.

#### How to Fix the Error

Follow one or more of these steps to verify table structure and restore missing metadata.

**Fix 1: Verify Delta Table Structure and Path**

Check that the table location contains proper Delta metadata using the [Lakehouse and Delta Tables documentation](lakehouse-and-delta-tables.md):

```python
from notebookutils import mssparkutils

# Get the actual table location (relative paths don't resolve for managed tables)
table_detail = spark.sql("DESCRIBE DETAIL your_table_name").collect()[0]
table_path = table_detail["location"]

# Verify _delta_log exists
try:
    log_files = mssparkutils.fs.ls(f"{table_path}/_delta_log/")
    print(f"Found {len(log_files)} log files")
    display(log_files)
except Exception as e:
    print(f"_delta_log not found: {e}")

# Check if location has any Delta characteristics
from delta.tables import DeltaTable
try:
    dt = DeltaTable.forPath(spark, table_path)
    print("Valid Delta table")
except:
    print("Not a valid Delta table - metadata missing")
```

If `_delta_log` is missing, the directory is not a Delta table and needs to be created or converted properly.

**Fix 2: Recreate or Convert to Delta Table**

If metadata is missing or corrupted, recreate the Delta table using the [Work with Delta Lake Tables training module](/training/modules/work-delta-lake-tables-fabric/). Choose one of the following approaches (not both). These operations require Contributor role or higher.

Option 1: Read Parquet and recreate as Delta table**

This approach reads the data files and writes a new Delta table, which may reorder or compact the underlying files:

```python
# Get the actual table location
table_detail = spark.sql("DESCRIBE DETAIL your_table_name").collect()[0]
table_path = table_detail["location"]

# Read existing Parquet files and recreate as Delta
# Use recursive glob - Delta tables store Parquet files in subdirectories
df = spark.read.parquet(f"{table_path}/**/*.parquet")
df.write.format("delta").mode("overwrite").option("overwriteSchema", "true").saveAsTable("your_table_name")

# Verify metadata was created
spark.sql("DESCRIBE DETAIL your_table_name").show()
```

Option 2: Convert in-place using CONVERT TO DELTA**

This approach preserves existing Parquet files and adds Delta transaction log metadata:

```sql
-- Convert existing Parquet files to Delta table (preserves original files)
CONVERT TO DELTA parquet.`Tables/your_table_name`
```

For tables registered in the metastore but with missing metadata files, drop and recreate the table registration. This operation requires Contributor role or higher.

```sql
-- Check if table is EXTERNAL or MANAGED before dropping
-- Look for 'Type' in the output
DESCRIBE EXTENDED your_table_name;
```

If the table is external, you can safely drop and re-register it:

```sql
-- Only run this if DESCRIBE EXTENDED shows Type = EXTERNAL
DROP TABLE IF EXISTS your_table_name;

-- Re-register with correct path
CREATE TABLE your_table_name
USING DELTA
LOCATION 'Tables/your_table_name';
```

### Error: Delta Table Is Not Checkpointed / Infrequently Checkpointed

This error indicates that the Delta table's checkpoint mechanism needs attention to maintain query performance.

**Error Messages:**
- Delta Table Is Not Checkpointed
- Delta Table Is Infrequently Checkpointed

#### Scenario

This issue typically occurs when you are working with Delta tables that have accumulated many transaction log files without consolidation.

#### Common Causes

The following situations lead to checkpoint issues:
- Querying a Delta table that has had many small incremental writes without triggering checkpoint creation (more than 10 transactions since last checkpoint)
- Running performance monitoring tools that detect missing checkpoint files affecting read performance
- External tools writing to table without triggering checkpoints
- Failed checkpoint operation during previous write

#### What Happened

The Delta table has accumulated too many transaction log files without creating a checkpoint. Checkpoints are consolidated Parquet files that summarize the transaction history, improving read performance. When checkpoints are missing or infrequent, query performance degrades.

#### How to Fix the Error

Use one or more of these maintenance operations to create checkpoints and improve table performance.

**Fix 1: Run OPTIMIZE to Trigger Checkpointing**

The recommended way to address checkpoint issues is to run `OPTIMIZE`, which compacts small files and triggers a checkpoint. This operation requires Contributor role or higher. The [Lakehouse and Delta Tables documentation](lakehouse-and-delta-tables.md) explains checkpoint management:

```sql
-- First, list all tables in your lakehouse to find exact table names
SHOW TABLES;

-- Replace 'your_table_name' with your actual table name (e.g., 'sales_data')
-- OPTIMIZE compacts files and triggers checkpoint creation
OPTIMIZE your_table_name;

-- For tables with many small files (replace column name with your filter column)
OPTIMIZE your_table_name ZORDER BY (commonly_filtered_column);

-- Run VACUUM to permanantly deletes old files (minimum default retention period)
VACUUM your_table_name RETAIN 168 HOURS;   
```

You can also verify the current checkpoint status by examining the transaction log:

```python
from notebookutils import mssparkutils

# Get the actual table location (relative paths don't resolve for managed tables)
# Replace 'your_table_name' with your actual table name (e.g., 'sales_data')
table_detail = spark.sql("DESCRIBE DETAIL your_table_name").collect()[0]
table_path = table_detail["location"]

# List checkpoint files in the _delta_log directory
# Checkpoint files have names like 00000000000000000010.checkpoint.parquet
log_files = mssparkutils.fs.ls(f"{table_path}/_delta_log/")
checkpoint_files = [f for f in log_files if 'checkpoint' in f.name]
print(f"Found {len(checkpoint_files)} checkpoint files")
display(checkpoint_files)
```

**Fix 2: Perform Table Maintenance**

Regular table maintenance helps prevent checkpoint issues. Configure automatic maintenance based on your table's role in the data architecture:

```python
# Enable auto-compaction at table level for automatic maintenance
spark.sql("""
    ALTER TABLE your_table_name 
    SET TBLPROPERTIES (
        'delta.autoOptimize.autoCompact' = 'true',
        'delta.autoOptimize.optimizeWrite' = 'true'
    )
""")
```

**Maintenance Strategy by Layer:**

- **Bronze layer (ingestion)**: Auto-compaction optional; prioritize write speed
- **Silver layer (curated)**: Enable auto-compaction; schedule OPTIMIZE aggressively
- **Gold layer (serving)**: Enable auto-compaction and optimize-write; run OPTIMIZE frequently

For streaming or frequent small writes, combine auto-compaction with scheduled OPTIMIZE jobs:

```
%%sql
-- Schedule this to run periodically (daily or weekly)
OPTIMIZE your_table_name;

-- If you want V-Order (good for Power BI / SQL read scenarios)
OPTIMIZE your_table_name VORDER;
```

See [table maintenance and optimization](../fundamentals/table-maintenance-optimization.md) for detailed guidance on medallion architecture optimization strategies.

## Table Not Found Errors

This section helps you resolve issues when tables cannot be located in your Lakehouse.

### Error: Table Was Not Found in Lakehouse

This error occurs when you reference a table that doesn't exist or cannot be found in the metadata catalog.

**Error Messages:**
- Table Was Not Found in Lakehouse
- A Delta formatted table was not found at path
- Delta table does not exist

#### Scenario

This issue typically occurs when you are querying or referencing a table that doesn't exist in the lakehouse metadata catalog.

#### Common Causes

The following are common reasons for table not found errors:
- Running a SQL query or Spark command that references a table name with incorrect casing or spelling (Delta is case-sensitive)
- Attempting to read a table that was deleted or never created in the first place
- Connected to wrong lakehouse workspace
- Catalog synchronization delay or metadata corruption

#### What Happened

The specified Delta table cannot be found in the lakehouse metadata catalog. Even though the underlying files may exist in storage, the table is not registered or recognized by the lakehouse, making it inaccessible for queries and operations.

#### How to Fix the Error

Use one or more of these methods to locate the table and ensure proper registration in the metadata catalog.

**Fix 1: Verify Table Exists and Check Table Name Case**

Use the [Lakehouse and Delta Tables](lakehouse-and-delta-tables.md) interface to verify the table exists. In a Spark notebook, list all available tables:

```python
# List all tables in the current lakehouse
spark.sql("SHOW TABLES").show()

# Check specific table details (case-sensitive)
# Replace 'your_table_name' with your actual table name from the list above
spark.sql("DESCRIBE TABLE your_table_name").show()
```

Delta table names are **case-sensitive**. If you created a table as `CustomerData` but reference it as `customerdata`, the error will occur. Always use the exact name as it appears in the lakehouse Tables section.

**Fix 2: Create or Re-register the Delta Table**

If the table doesn't exist, you need to create it. If Delta files exist in storage but aren't registered, re-create the table reference. These operations require Contributor role or higher. The [Work with Delta Lake Tables training module](/training/modules/work-delta-lake-tables-fabric/) provides comprehensive guidance.

**Create a new managed table from a DataFrame**

```python
# Assumes df is already defined with your source data
df.write.format("delta").mode("overwrite").option("overwriteSchema", "true").saveAsTable("your_table_name")
```

>[!NOTE]
> Fabric Lakehouse only supports managed tables. External tables with `CREATE TABLE ... LOCATION` aren't supported. To access Delta tables in other storage locations, use Shortcuts instead.

If you suspect the table exists but isn't showing up, try refreshing your lakehouse view or restarting your Spark session to clear any caching issues.

**Fix 3: Verify Correct Lakehouse and Workspace Context**

Ensure you're connected to the correct lakehouse and workspace. If you have multiple lakehouses, you may be querying the wrong one. Check your context in notebooks:

```python
# For notebooks with attached lakehouse, verify the default lakehouse
print(spark.catalog.currentDatabase())

# List all databases/schemas available
spark.sql("SHOW DATABASES").show()
```

The [Delta Lake table format interoperability documentation](../fundamentals/delta-lake-interoperability.md) explains how to properly reference tables across different lakehouses and external Delta tables. If accessing a table from a different lakehouse, use the fully qualified name: `lakehouse_name.table_name`.

## File and Path Errors

This section addresses issues related to file paths, missing files, and storage location problems in Lakehouse.

### Error: Path Not Found During Table Operations

This error occurs when the system cannot locate the specified Lakehouse path or Delta table.

**Error Messages:**
- The path `<NAME>` for targeted Delta table was not found. Please check that the targeted table is valid.
- Path not found

#### Scenario

This issue typically occurs when you are accessing a lakehouse or table using an incorrect or outdated path reference.

#### Common Causes

The following are common reasons for path not found errors:
- Running a notebook that references a table path using ABFSS format with typos in workspace or lakehouse IDs, or malformed ABFSS paths
- Attempting to read data from a lakehouse that has been renamed or deleted since the connection was configured
- The Delta table path is invalid, unavailable, or permissions are insufficient
- Notebook not attached to the correct Lakehouse

#### What Happened

This error appears when trying to access a Lakehouse path or Delta table that the system cannot find during operations such as loading table schema, refreshing path, or listing tables. This typically occurs due to incorrect path formatting, missing permissions, or the table/path no longer existing at the specified location.

#### How to Fix the Error

Follow one or more of these steps to verify and correct path references in your Lakehouse operations.

**Fix 1: Verify Path Formatting**

Ensure ABFSS paths are correctly formatted:
```
abfss://<workspace_id>@onelake.dfs.fabric.microsoft.com/<lakehouse_id>/Tables/
```

- Check for typos in workspace or lakehouse IDs
- Verify the path includes the correct folder structure (Files/ or Tables/)

**Fix 2: Confirm Access Rights and Lakehouse Existence**

1. Verify you have at least Viewer role on both the workspace and Lakehouse
2. In the Fabric portal, ensure the Lakehouse still exists and hasn't been deleted, renamed, or moved
3. If using a notebook, verify it's attached to the correct Lakehouse with valid workspace and lakehouse IDs
4. Check that changes in permissions haven't revoked your access

### Error: Artifact Is Not Found in Workspace During List Tables

This error occurs when the system cannot locate a Lakehouse artifact, often due to naming or path issues.

**Error Messages:**
- Artifact is Not Found in Workspace During List Tables

#### Scenario

This issue typically occurs when you are attempting to list tables in a lakehouse with naming or configuration issues.

#### Common Causes

The following are common causes of artifact not found errors:
- Calling the List Tables API for a lakehouse that has spaces or special characters in its name (especially problematic with schema-enabled lakehouses)
- Running Spark code that tries to access a lakehouse artifact using an incorrect workspace or lakehouse identifier
- Incorrect API paths or malformed workspace/lakehouse IDs in API calls or abfss paths
- The artifact may have been deleted, renamed, or moved

#### What Happened

The system cannot locate the specified Lakehouse artifact in the workspace, often due to naming issues, incorrect paths, or synchronization problems.

#### How to Fix the Error

Use one or more of these methods to resolve artifact location issues and restore access to your Lakehouse tables.

**Fix 1: Remove Invalid Characters from Names**

1. Rename your workspace and/or lakehouse to remove spaces and special characters
2. Use only alphanumeric characters and underscores in names
3. After renaming, rerun your queries to verify the issue is resolved

**Fix 2: Verify API Paths and IDs**

1. Double-check workspace and lakehouse IDs in your API calls or abfss paths
2. Use the correct pattern: `abfss://workspaceid@onelake.dfs.fabric.microsoft.com/lakehouseid/Tables/`
3. Ensure there are no typos in workspace or lakehouse GUIDs
4. For programmatic listing examples and patterns, see [Lakehouse management API](lakehouse-api.md)

**Fix 3: Sync SQL Analytics Endpoint**

1. If tables exist in storage but not in metadata, use the API or admin tools to explicitly sync or refresh the SQL analytics endpoint
2. Navigate to the Lakehouse settings and trigger a manual sync
3. This resolves issues where tables are physically present but not appearing in lists or queries
4. Wait a few minutes after sync before retrying the operation

### Error: No CSV File Found in Folder

This error occurs when Fabric cannot locate CSV files at the expected path during data loading operations.

**Error Messages:**
- No Data File Found / No CSV File Found in Folder

#### Scenario

This issue typically occurs when you are loading CSV files into a lakehouse using the UI or notebook code.

#### Common Causes

The following situations commonly cause CSV file not found errors:
- Uploading files to a lakehouse and attempting to load them into a Delta table when the files are in the wrong folder location (e.g., Tables folder instead of Files folder)
- Running Spark code to read CSV files using an incorrect path that doesn't match where files were uploaded
- OneDrive not configured for staging file uploads in the Fabric environment
- File upload didn't complete successfully or files appear in "Unidentified Area" of lakehouse

#### What Happened

Microsoft Fabric cannot locate CSV files in the expected location during data ingestion or Delta table creation operations. This error typically happens during file upload processes, notebook operations, or when attempting to load data from the lakehouse Files section.

#### How to Fix the Error

Follow one or more of these steps to ensure files are in the correct location and accessible to your Lakehouse operations.

**Fix 1: Verify File Location in Lakehouse Explorer**

Ensure your CSV files are uploaded to the correct location using the [Lakehouse explorer](navigate-lakehouse-explorer.md). CSV files should be placed in the **Files** section of your lakehouse, not the Tables section. The Tables area contains managed Delta tables, while the Files area is for raw data files.

Navigate to your lakehouse and check:
- Files are under `/Files/` directory (e.g., `/Files/data/yourfile.csv`)
- Files don't appear in the "Unidentified Area" (which means they're not registered in the metastore)
- Upload completed successfully and files are visible in the lakehouse explorer

Follow the [lakehouse tutorial](tutorial-build-lakehouse.md) for proper file organization and upload procedures.

**Fix 2: Use Correct File Path in Spark Operations**

When referencing files in notebooks or Spark jobs, use the correct ABFS path format. You can obtain the exact path by right-clicking the file in Lakehouse Explorer and selecting **Copy ABFS path**. Example paths:

```python
# Read CSV from Files section
df = spark.read.csv(
    "abfss://<workspace>@onelake.dfs.fabric.microsoft.com/<lakehouse>/Files/data/yourfile.csv",
    header=True,
    inferSchema=True
)

# Or use relative path if lakehouse is attached to notebook
df = spark.read.csv("/lakehouse/default/Files/data/yourfile.csv", header=True, inferSchema=True)
```

Understanding [how to access files in Fabric lakehouse using notebooks](lakehouse-notebook-explore.md) ensures you reference the correct storage paths for your data operations.

## File Upload Errors

This section addresses issues that occur when uploading files to a Lakehouse through the UI or programmatically.

### Error: Error Sending Request - Failed to Fetch During File Upload

This error occurs when the browser or application cannot complete the file upload request to the Lakehouse.

**Error Messages:**
- Error Sending Request: Failed to Fetch During File Upload

#### Scenario

This issue typically occurs when you are using the lakehouse UI to upload files from your local machine or OneDrive.

#### Common Causes

The following situations commonly prevent file uploads:
- Attempting to upload files through the lakehouse explorer interface without Contributor or Owner permissions
- Uploading large files while browser extensions (ad blockers or VPNs) interfere with the upload request
- Browser/network issues including cache problems or firewall/proxy blocking API calls
- File size or storage quota limits exceeded

#### What Happened

The browser or application cannot complete the file upload request to the Lakehouse, often due to permission restrictions, network issues, or UI limitations.

#### How to Fix the Error

Try one or more of these solutions to successfully upload files to your Lakehouse.

**Fix 1: Verify and Update Permissions**

1. Ensure you have at least Contributor or Owner access on the Lakehouse
2. Have an admin re-grant permissions if needed
3. Sometimes permissions can become unsynchronized and require re-assignment
4. Check workspace settings to confirm your role assignment

**Fix 2: Use Spark Notebook Workaround**

If UI upload doesn't work due to permission or policy restrictions, use a Fabric Notebook with Spark code to write files directly to the Lakehouse. This operation requires Contributor role or higher:

> [!CAUTION]
> Setting `overwrite=True` permanently replaces any existing file at the target path without confirmation. Verify the file path and confirm you don't need the existing data before running this command.

```python
from notebookutils import mssparkutils

# Write string content directly to a file in the Lakehouse, overwriting if it exists
file_content = "col1,col2,col3\nvalue1,value2,value3"
mssparkutils.fs.put("Files/data/yourfile.csv", file_content, overwrite=True)

# Or copy files between Lakehouse locations (recurse=True handles both files and directories)
mssparkutils.fs.cp("Files/source/data.csv", "Files/destination/data.csv", recurse=True)
```

This method bypasses UI limitations and works even when the Explorer UI is restricted.

**Fix 3: Troubleshoot Browser and Network**

1. Try different browsers (Chrome, Edge, Firefox) to isolate browser-specific issues
2. Clear cache and cookies, or use incognito/private mode
3. Disable browser extensions, especially ad blockers and VPN-related plugins
4. Switch networks (e.g., mobile hotspot instead of office VPN) to rule out firewall/proxy issues

For additional guidance, see [Troubleshoot the Lakehouse connector](../data-factory/connector-troubleshoot-lakehouse.md).

## Lakehouse Operation and Data Copy Errors

This section helps you resolve failures in data copy operations and pipeline activities involving Lakehouse.

### Error: Lakehouse Data Copy Operation Failed

This error indicates that a data copy operation failed due to connectivity, authentication, or network issues.

**Error Messages:**
- Lakehouse Data Copy Operation failed
- Lakehouse Data Copy Operation (pipeline or runtime) Operations Failing Due to Network or Secure Channel Problems

#### Scenario

This issue typically occurs when you are running data pipelines or copy activities that transfer data to or from a lakehouse.

#### Common Causes

The following network and authentication issues commonly cause copy operation failures:
- Executing a Copy Data activity in a pipeline that connects to external data sources through a firewall or private endpoint with network connectivity issues blocking communication
- Running a long-running data copy operation where authentication tokens expire before completion
- Network isolation or private endpoint configuration preventing access to source or destination
- Transient network errors, timeouts, or insufficient bandwidth during large data transfers

#### What Happened

Data copy operations in pipelines, notebooks, or data flows failed due to connectivity issues, authentication problems, or network security restrictions preventing access to source or destination endpoints.

#### How to Fix the Error

Apply one or more of these troubleshooting steps to identify and resolve network connectivity and authentication issues.

**Fix 1: Verify Network Connectivity and Firewall Rules**

1. Test connectivity to the source and destination endpoints from your network
2. Check organizational firewall rules and ensure required URLs and ports are allowed
3. Verify that [Microsoft Fabric networking requirements](../security/security-overview.md) are met
4. For on-premises data sources, ensure the [data gateway](/data-integration/gateway/service-gateway-onprem) is installed and running
5. Test with a small data copy operation first to isolate network vs. data volume issues
6. Ensure SSL/TLS certificates are valid and not expired
7. Verify HTTPS endpoints are using supported TLS versions (TLS 1.2 or higher)

**Fix 2: Configure Authentication and Network Isolation**

For authentication and private endpoint issues:
1. Implement retry logic in pipelines with exponential backoff
2. Break large copy operations into smaller chunks to avoid timeouts
3. Refresh authentication tokens periodically for operations exceeding token lifetime
4. Verify service principal credentials or managed identity permissions are valid
5. Navigate to Workspace Settings > Network security and ensure proper private endpoint configuration
6. Verify that virtual network rules allow traffic from pipeline runtime environments
7. Check [managed virtual network](../security/security-managed-vnets-fabric-overview.md) settings in the data integration runtime

**Fix 3: Test and Isolate Connection Issues**

1. Use a minimal test dataset to verify connectivity without data volume complications
2. Check [Azure Service Health](https://portal.azure.com/#blade/Microsoft_Azure_Health/AzureHealthBrowseBlade/serviceIssues) for known network or service issues
3. For self-signed certificates, add them to the trusted certificate store
4. Ensure DNS resolution works correctly for private endpoints
5. Review error logs to identify specific failure points in the copy operation

## Internal Server and Processing Errors

This section addresses unexpected service-side failures and internal errors in Microsoft Fabric.

### Error: Internal Server Error (500) / Job Execution Failures

This error indicates that the Fabric service encountered an unexpected internal error while processing your request.

**Error Messages:**
- Job execution fails with 500 internal server errors
- An internal error occurred while processing your request
- Internal server error

#### Scenario

This issue typically occurs when you are performing operations that encounter unexpected service-side failures.

#### Common Causes

The following situations can trigger internal server errors:
- Running a Spark job or notebook that triggers backend processing issues in the Fabric service due to resource exhaustion
- Executing queries against a lakehouse with corrupted metadata that causes processing failures
- Temporary service outages or degraded performance affecting backend systems
- Bugs or issues in the Fabric service platform

#### What Happened

The Microsoft Fabric service encountered an unexpected internal error while processing your request, job, or operation. These errors typically indicate a problem on the service side rather than a configuration issue.

#### How to Fix the Error

Since these errors are typically service-side issues, try one or more of these recovery steps.

**Fix 1: Retry and Check Service Health**

1. Wait a few minutes and retry the operation (many 500 errors are transient)
2. Check [Azure Service Health](https://portal.azure.com/#blade/Microsoft_Azure_Health/AzureHealthBrowseBlade/serviceIssues) for known issues affecting Microsoft Fabric
3. Implement retry logic with exponential backoff in automated processes

**Fix 2: Simplify the Operation**

If the error persists:
1. Break complex operations into smaller, simpler steps
2. Reduce batch sizes or data volumes being processed
3. Test with a minimal subset of data to isolate the issue
4. Avoid concurrent operations on the same resources
5. Disable complex features (e.g., complex transformations) temporarily to identify the trigger
6. Check table health and file fragmentation using OPTIMIZE DRY RUN to identify potential issues (see [identify table health](../fundamentals/table-maintenance-optimization.md#identify-table-health))

**Fix 3: Clear Cache and Restart Sessions**

1. Clear browser cache and cookies if using the web interface
2. Stop and restart Spark sessions in notebooks
3. Restart pipeline runs rather than resuming from a failed state
4. Delete and recreate temporary artifacts that may be corrupted
5. Sign out and sign back in to refresh authentication and session state

## Materialized Lake Views Errors

This section addresses errors specific to creating and managing materialized views in Lakehouse.

### Error: An Error Occurred While Processing Your Request

This error occurs during materialized view operations when the system encounters processing or configuration issues.

**Error Messages:**
- An error occurred while processing your request

#### Scenario

This issue typically occurs when you are working with Materialized Lake Views (MLVs) in a Fabric Lakehouse and attempt to inspect their lineage.

#### Common Causes

The following situations can cause errors when viewing materialized view lineage:
- Opening a Fabric workspace and navigating to a Lakehouse, then selecting Materialized lake views and attempting to view lineage information when workspace or capacity is experiencing high load or throttling
- Clicking on the lineage view for a recently created or modified Materialized Lake View where lineage metadata is still being computed
- Creating a materialized view over source tables that are located in a different workspace than the materialized view itself
- Complex lineage graph with too many dependencies causing processing delays
- Permissions issue preventing access to lineage metadata

#### What Happened

This error occurs when attempting to retrieve or view the lineage information for Materialized Lake Views in Microsoft Fabric. The lineage feature tracks data dependencies and flow between artifacts, but the system cannot process the request to display this information.

#### How to Fix the Error

Use one or more of these troubleshooting steps to resolve lineage viewing issues for materialized views.

**Fix 1: Verify Permissions and Access**

Ensure you have the appropriate permissions to view lineage information:

1. Verify you have at least **Viewer** role in the workspace containing the Materialized Lake View
2. Check that you have permissions to view the source and target artifacts in the lineage graph
3. Navigate to Workspace Settings > Manage access and confirm your role
4. If using a service principal, ensure it has the necessary permissions to read metadata

**Fix 2: Simplify Lineage View**

If the Materialized Lake View has complex dependencies:

1. Try viewing lineage for individual source tables instead of the entire view
2. Use the lineage filters to focus on specific time periods or artifact types
3. Check lineage for related but simpler artifacts first to verify the feature is working

**Fix 3: Check Workspace and Capacity Status**

1. Use the [Fabric Capacity Metrics app](../enterprise/capacity-planning-troubleshoot-consumption.md) to verify the capacity is not throttled or overloaded
2. Check if other workspace operations are working correctly to isolate the issue
3. Verify the workspace is assigned to an active Fabric capacity (Workspace Settings > License Info)
4. If capacity is overloaded, wait until utilization decreases or scale up the capacity

For more information on lineage in Microsoft Fabric, see [Lineage in Microsoft Fabric](../governance/lineage.md).

## Power BI Integration Errors

This section addresses errors that occur when integrating Power BI with Lakehouse data sources.

### Error: Power BI Entity Not Found at Lakehouse Refresh

This error occurs when Power BI cannot locate the referenced Lakehouse entity during a refresh operation.

**Error Messages:**
- Power BI Entity Not Found at Lakehouse Refresh
- Entity does not exist in Lakehouse
- Table or dataset not found

#### Scenario

This issue typically occurs when you are refreshing a Power BI semantic model connected to a lakehouse.

#### Common Causes

The following situations commonly cause entity not found errors:
- Triggering a scheduled refresh for a Power BI dataset after the underlying lakehouse table has been renamed or deleted since the Power BI connection was configured
- Opening a Power BI report that references lakehouse entities that no longer exist in the workspace
- Incorrect table or dataset name in the Power BI connection string
- Table was dropped and recreated with a different schema or ID

#### What Happened

Power BI cannot locate the Lakehouse entity (table or dataset) during a refresh operation. The referenced entity may have been renamed, deleted, or moved since the Power BI connection was originally configured.

#### How to Fix the Error

Follow one or more of these steps to restore the connection between Power BI and your Lakehouse entities.

**Fix 1: Verify Entity Existence and Connections**

1. In the Fabric portal, confirm the expected tables/datasets exist and are accessible in the target workspace
2. Ensure the workspace and lakehouse connections are correct
3. Verify that no tables have been renamed or deleted since the initial configuration
4. Check that the connection string or data source path points to the correct Lakehouse
5. Re-establish connections if the Lakehouse has been moved or renamed

**Fix 2: Update Power BI Data Source Settings**

For Power BI Desktop:
1. Open the PBIX file
2. Go to File > Options and settings > Data source settings
3. Verify the Lakehouse path and table names are correct
4. Edit the connection to point to the correct entity
5. Refresh the data source to test the connection

For Power BI Service:
1. Navigate to the dataset settings in Power BI Service
2. Expand the Data source credentials section
3. Update the connection string with the correct Lakehouse and table names
4. Test the connection before attempting a full refresh

**Fix 3: Sync Direct Lake Semantic Models**

For Direct Lake mode:
1. Navigate to SQL Analytics Endpoint > Default semantic model settings
2. Enable "Sync the default model"
3. If "Keep Direct Lake data up to date" is disabled, data will only update on manual or scheduled refresh
4. Manually trigger a sync to refresh the semantic model metadata
5. Verify table and schema changes in the Lakehouse are reflected in the semantic model

### Error: Power BI Not Authorized at Lakehouse Refresh

This error indicates that Power BI lacks the necessary permissions to access Lakehouse data during refresh.

**Error Messages:**
- Power BI Not Authorized at Lakehouse Refresh
- Access denied during refresh
- Unauthorized to access Lakehouse data

#### Scenario

This issue typically occurs when you are refreshing Power BI reports or datasets connected to lakehouse data.

#### Common Causes

The following permission issues commonly prevent Power BI refresh:
- Triggering a Power BI dataset refresh using Direct Lake mode when credentials are outdated or missing
- Attempting to refresh a semantic model where the service principal or user account lacks Read permissions on the lakehouse despite being workspace admins
- Data source credentials are expired or incorrect in Power BI Desktop
- Workspace role is insufficient (need Contributor or higher for data access)

#### What Happened

Power BI cannot access the Lakehouse entity during a refresh operation due to insufficient permissions. The user or service principal performing the refresh lacks the necessary access rights to read data from the Lakehouse.

#### How to Fix the Error

Apply one or more of these permission fixes to enable Power BI to access your Lakehouse data during refresh.

**Fix 1: Check Dataset and Data Source Permissions**

1. In Power BI service, verify your user has direct data access, not just workspace privileges
2. For Dataflows Gen2, ensure you're authorized for the target Data Warehouse/Lakehouse with specific roles or policies
3. Open the PBIX file, go to File > Options and settings > Data source settings
4. Edit or refresh credentials and test the connection
5. Verify the account being used has the necessary permissions on the Lakehouse

**Fix 2: Grant Lakehouse Access Permissions**

Ensure the user or service principal has appropriate permissions:
1. Navigate to the Lakehouse > Manage permissions
2. Add the user or service principal with at least **Read** permission
3. For SQL queries: Grant "Read all data using SQL" (**ReadData** permission)
4. For Spark access: Grant "Read all data using Apache Spark" (**ReadAll** permission)
5. Verify workspace role is **Contributor**, **Member**, or **Admin** (not just Viewer)

See [lakehouse sharing documentation](lakehouse-sharing.md) for permission details.

**Fix 3: Update Service Principal Credentials**

For service principal authentication:
1. Verify the service principal is enabled in Fabric Admin Portal (Tenant settings)
2. Ensure the service principal is added to the workspace with Contributor role or higher
3. Update credentials in Power BI data source settings with the correct tenant ID, client ID, and secret
4. Test the connection to verify authentication succeeds
5. Set appropriate token expiration and refresh policies for long-running operations

## Related content
- [What is a lakehouse?](lakehouse-overview.md)
- [Lakehouse table maintenance](lakehouse-table-maintenance.md)
- [Delta Lake in Microsoft Fabric](lakehouse-and-delta-tables.md)
- [Fabric Capacity Planning and Troubleshooting](../enterprise/capacity-planning-troubleshoot-errors.md)
- [Work with Delta Lake Tables Training Module](/training/modules/work-delta-lake-tables-fabric/)
- [Lakehouse Tutorial](tutorial-build-lakehouse.md)