---
title: Troubleshoot Lakehouse Errors in Data Engineering
description: Troubleshoot common Lakehouse issues in Data Engineering in Microsoft Fabric.
author: ValOlson
ms.author: vallariolson
ms.reviewer: ' '
ms.date: 02/09/2026
ms.topic: troubleshooting
---

# Troubleshoot Lakehouse issues in Microsoft Fabric

This article provides guidance for troubleshooting common issues you might encounter when working with Lakehouse in Fabric.

## Error messages and resolution categories

This table lists common Lakehouse error messages and links to relevant troubleshooting sections.

| Error | Categories and resolution |
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

### Error: [DELTA_FAILED_TO_MERGE_FIELDS] Failed to Merge Fields

**Error Messages:**
- [DELTA_FAILED_TO_MERGE_FIELDS] Failed to merge fields 'field 1' and 'field 2' / Invalid Table

#### What Happened

This error occurs when there is a schema incompatibility between your source data and the target Delta Lake table. Even though both fields have the same name, Delta Lake cannot merge them because they have different properties such as data types, nullability, or precision.

**Common Causes:**
- Data type mismatch (e.g., StringType vs. TimestampType, IntegerType vs. BigIntegerType)
- Nullability conflicts (one field allows nulls, the other doesn't)
- Precision or scale differences in numeric/decimal types
- Schema changes in source data without proper evolution enabled

#### How to Fix the Error

**Fix 1: Identify and Cast Mismatched Data Types**

Compare your source and target schemas to identify the type mismatch. Understanding [how Delta Lake tables manage schemas in Fabric lakehouses](lakehouse-schemas.md) is critical.

First, inspect both schemas:
```python
# Check target table schema
spark.sql("DESCRIBE TABLE your_lakehouse.your_table").show()

# Check source DataFrame schema
source_df.printSchema()
```

Once you identify the mismatch, cast the problematic column in your source data to match the target table:
```python
from pyspark.sql.functions import col

# Cast the column to match target type (e.g., timestamp)
source_df = source_df.withColumn("field_name", col("field_name").cast("timestamp"))

# Then write to table, use merge instead of append to avoid duplicates (if you have a key)
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

### Error: Failed to Deserialize the Latest Schema for a Delta Table

**Error Messages:**
- Failed to Deserialize the Latest Schema for a Delta Table because it is in an invalid/malformed form / Invalid Schema For Delta Table

#### What Happened

Delta Lake cannot parse or deserialize the schema information stored in the transaction log. The schema metadata may be corrupted, malformed, or contain unsupported data types, preventing Delta from understanding the table structure.

**Common Causes:**
- Corrupted transaction log files in `_delta_log` directory
- Schema definition contains invalid or unsupported data types
- Interrupted write operation left incomplete schema metadata
- Incompatible Delta Lake versions wrote to the table
- Manual edits to Delta log files caused corruption

#### How to Fix the Error

**Fix 1: Inspect and Repair Transaction Log**

Check the Delta transaction log for corruption using the [Lakehouse and Delta Tables guide](lakehouse-and-delta-tables.md):

```python
from notebookutils import mssparkutils

# Check Delta table history for issues
spark.sql("DESCRIBE HISTORY your_table_name").show()

# Examine the transaction log files
display(mssparkutils.fs.ls("Tables/your_table_name/_delta_log/"))

# Try to read the latest checkpoint
spark.read.parquet("Tables/your_table_name/_delta_log/*.checkpoint.parquet").show()
```

If log files are corrupted, you may need to restore from a backup or rebuild the table. If you have the underlying Parquet data files:

```python
# Read the data files directly (bypassing Delta log)
df = spark.read.parquet("Tables/your_table_name/*.parquet")

# Recreate table with explicit schema
from pyspark.sql.types import StructType, StructField, StringType, IntegerType

explicit_schema = StructType([
    StructField("column1", StringType(), True),
    StructField("column2", IntegerType(), True)
])

df_with_schema = spark.read.schema(explicit_schema).parquet("Tables/your_table_name/*.parquet")
df_with_schema.write.format("delta").mode("overwrite").saveAsTable("your_table_name_restored")
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

## Error: Naming Conflicts

### Error: Table or View Already Exists

**Error Messages:**
- Table Name already exists
- Materialized view already exists
- Cannot create table, name already in use

#### What Happened

The table, materialized view, or schema you're attempting to create already exists in the Lakehouse. Delta Lake prevents duplicate object names within the same namespace to avoid data conflicts and ambiguity.

**Common Causes:**
- Attempting to create a table or view with a name that already exists in the same workspace
- Rerunning CREATE TABLE statements without checking for existence
- Schema merge conflicts when appending data with incompatible structures
- Notebook or pipeline reruns creating tables that already exist

#### How to Fix the Error

**Fix 1: Check for Existing Tables and Use CREATE OR REPLACE**

Before creating tables or materialized views, verify they don't already exist. This operation requires Contributor role or higher since it modifies data:

```python
# Check if table exists
existing_tables = spark.sql("SHOW TABLES IN your_lakehouse").collect()
table_names = [row.tableName for row in existing_tables]

if "your_table_name" in table_names:
    print("Table already exists - replacing it")

# CREATE OR REPLACE handles both cases (table exists or not)
spark.sql("""
    CREATE OR REPLACE TABLE your_lakehouse.your_table_name (
        id INT,
        name STRING
    ) USING DELTA
""")
```

For materialized views, use `CREATE OR REPLACE` which handles both cases (view exists or not):

```sql
-- CREATE OR REPLACE handles both cases (view exists or not)
CREATE OR REPLACE MATERIALIZED VIEW your_view_name AS
SELECT * FROM source_table;
```

**Fix 2: Use Conditional Creation Logic**

Implement existence checks before table creation in notebooks or pipelines. This operation requires Contributor role or higher:

```python
# Assumes df is already defined with your source data
# Check and create only if table doesn't exist
if "your_table_name" not in [row.tableName for row in spark.sql("SHOW TABLES").collect()]:
    df.write.format("delta").mode("overwrite").saveAsTable("your_lakehouse.your_table_name")
else:
    print("Table exists, appending data instead")
    df.write.format("delta").mode("append").saveAsTable("your_lakehouse.your_table_name")
```

For more information on schema management, see [Lakehouse schemas documentation](lakehouse-schemas.md).

### Error: Invalid Column Names

**Error Messages:**
- Invalid column name(s) in file / Invalid column name
- Column name contains invalid characters
- Column name exceeds maximum length

#### What Happened

Column names in your source data or schema definition don't meet Delta Lake naming requirements. Delta tables require column names to use specific character sets and length constraints.

**Common Causes:**
- Column names containing spaces or special characters
- Column names exceeding 128 characters
- Duplicate column names within the same table schema definition
- Non-UTF-8 characters in column names

#### How to Fix the Error

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

### Error: No Delta Transaction Log Entries Were Found for Table

**Error Messages:**
- No Log Entries for Delta Table found
- Delta Table is missing a Delta transaction log entry

#### What Happened

The Delta table's `_delta_log` directory is missing, empty, or corrupted. Delta Lake relies on transaction logs to maintain ACID properties, track all changes, and manage table metadata. Without valid transaction log entries, the table cannot function properly.

**Common Causes:**
- Table directory exists but was not initialized as a Delta table
- `_delta_log` folder was deleted or is missing
- Interrupted write operation that didn't complete Delta table initialization
- Attempting to read a Parquet directory as a Delta table without proper conversion
- Files copied manually without Delta metadata

#### How to Fix the Error

**Fix 1: Validate Delta Table Structure and Recreate if Needed**

Check if the `_delta_log` directory exists using the [Lakehouse and Delta Tables documentation](lakehouse-and-delta-tables.md):

```python
from notebookutils import mssparkutils

# Check for _delta_log directory
display(mssparkutils.fs.ls("Tables/your_table_name/"))

# Verify _delta_log exists and contains files
display(mssparkutils.fs.ls("Tables/your_table_name/_delta_log/"))
```

If the `_delta_log` directory is missing or empty, the directory is not a valid Delta table. You need to recreate it:

```python
# Read the parquet files (if they exist)
df = spark.read.parquet("Tables/your_table_name/")

# Write as a proper Delta table
df.write.format("delta").mode("overwrite").saveAsTable("your_table_name")
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
# Create table with proper schema and Delta log
table_path = "Tables/your_table_name"
df.write.format("delta").mode("overwrite").save(table_path)

# Register as managed table
spark.sql(f"CREATE TABLE your_table_name USING DELTA LOCATION '{table_path}'")
```

### Error: The Metadata for the Delta Table Could Not Be Found

**Error Messages:**
- Missing Metadata For Delta Table Version

#### What Happened

Delta Lake cannot locate or read the metadata required to access the table. The metadata includes information stored in the `_delta_log` directory that describes the table structure, partitions, and transaction history.

**Common Causes:**
- `_delta_log` directory missing or deleted from the table location
- Table path is incorrect or points to a non-Delta directory
- Metadata corruption or incomplete table initialization
- Permissions issue preventing access to `_delta_log` files
- Table was dropped from metastore but files remain in storage

#### How to Fix the Error

**Fix 1: Verify Delta Table Structure and Path**

Check that the table location contains proper Delta metadata using the [Lakehouse and Delta Tables documentation](lakehouse-and-delta-tables.md):

```python
from notebookutils import mssparkutils

# Verify _delta_log exists
try:
    log_files = mssparkutils.fs.ls("Tables/your_table_name/_delta_log/")
    print(f"Found {len(log_files)} log files")
    display(log_files)
except Exception as e:
    print(f"_delta_log not found: {e}")

# Check if location has any Delta characteristics
from delta.tables import DeltaTable
try:
    dt = DeltaTable.forPath(spark, "Tables/your_table_name")
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
# Read existing Parquet files and recreate as Delta
df = spark.read.parquet("Tables/your_table_name/")
df.write.format("delta").mode("overwrite").saveAsTable("your_table_name")

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
-- Look for 'Type' in the output - must be 'EXTERNAL'
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

**Error Messages:**
- Delta Table Is Not Checkpointed
- Delta Table Is Infrequently Checkpointed

#### What Happened

The Delta table has accumulated too many transaction log files without creating a checkpoint. Checkpoints are consolidated Parquet files that summarize the transaction history, improving read performance. When checkpoints are missing or infrequent, query performance degrades.

**Common Causes:**
- Checkpoint file missing or deleted from `_delta_log` directory
- Table has more than 10 transactions since last checkpoint (default threshold)
- External tools writing to table without triggering checkpoints
- Failed checkpoint operation during previous write
- Very active table with frequent small writes

#### How to Fix the Error

**Fix 1: Run OPTIMIZE to Trigger Checkpointing**

The recommended way to address checkpoint issues is to run `OPTIMIZE`, which compacts small files and triggers a checkpoint. This operation requires Contributor role or higher. The [Lakehouse and Delta Tables documentation](lakehouse-and-delta-tables.md) explains checkpoint management:

```sql
-- OPTIMIZE compacts files and triggers checkpoint creation
OPTIMIZE your_table_name;

-- For tables with many small files
OPTIMIZE your_table_name ZORDER BY (commonly_filtered_column);

-- Run VACUUM to permanantly deletes old files (minimum default retention period)
VACUUM your_table_name RETAIN 168 HOURS;   
```

You can also verify the current checkpoint status by examining the transaction log:

```python
from notebookutils import mssparkutils

# List checkpoint files in the _delta_log directory
# Checkpoint files have names like 00000000000000000010.checkpoint.parquet
log_files = mssparkutils.fs.ls("Tables/your_table_name/_delta_log/")
checkpoint_files = [f for f in log_files if 'checkpoint' in f.name]
print(f"Found {len(checkpoint_files)} checkpoint files")
display(checkpoint_files)
```

**Fix 2: Perform Table Maintenance**

Regular table maintenance helps prevent checkpoint issues. Use the [Delta Lake table optimization guide](delta-optimization-and-v-order.md).

## Table Not Found Errors

### Error: Table Was Not Found in Lakehouse

**Error Messages:**
- Table Was Not Found in Lakehouse
- A Delta formatted table was not found at path
- Delta table does not exist

#### What Happened

The specified Delta table cannot be found in the lakehouse metadata catalog. Even though the underlying files may exist in storage, the table is not registered or recognized by the lakehouse, making it inaccessible for queries and operations.

**Common Causes:**
- Table was never created, deleted, moved in storage without updating metadata, or registration failed
- Case sensitivity issue in table name (Delta is case-sensitive)
- Connected to wrong lakehouse workspace
- Catalog synchronization delay or metadata corruption

#### How to Fix the Error

**Fix 1: Verify Table Exists and Check Table Name Case**

Use the [Lakehouse and Delta Tables](lakehouse-and-delta-tables.md) interface to verify the table exists. In a Spark notebook, list all available tables:

```python
# List all tables in the current lakehouse
spark.sql("SHOW TABLES").show()

# Check specific table details (case-sensitive)
spark.sql("DESCRIBE TABLE your_table_name").show()
```

Delta table names are **case-sensitive**. If you created a table as `CustomerData` but reference it as `customerdata`, the error will occur. Always use the exact name as it appears in the lakehouse Tables section.

**Fix 2: Create or Re-register the Delta Table**

If the table doesn't exist, you need to create it. If Delta files exist in storage but aren't registered, re-create the table reference. These operations require Contributor role or higher. The [Work with Delta Lake Tables training module](/training/modules/work-delta-lake-tables-fabric/) provides comprehensive guidance.

**Option A: Create a new managed table from a DataFrame**

```python
# Assumes df is already defined with your source data
df.write.format("delta").mode("overwrite").saveAsTable("your_table_name")
```

**Option B: Register existing Delta files as an external table**

```sql
-- Creates a table reference pointing to existing Delta files (doesn't copy data)
CREATE TABLE your_table_name
USING DELTA
LOCATION 'abfss://path/to/delta/table'
```

If you suspect the table exists but isn't showing up, try refreshing your lakehouse view or restarting your Spark session to clear any caching issues.

**Fix 3: Verify Correct Lakehouse and Workspace Context**

Ensure you're connected to the correct lakehouse and workspace. If you have multiple lakehouses, you may be querying the wrong one. Check your context in notebooks:

```python
# For notebooks with attached lakehouse, verify the default lakehouse
print(spark.conf.get("spark.sql.catalog.default"))

# List all databases/schemas available
spark.sql("SHOW DATABASES").show()
```

The [Delta Lake table format interoperability documentation](../fundamentals/delta-lake-interoperability.md) explains how to properly reference tables across different lakehouses and external Delta tables. If accessing a table from a different lakehouse, use the fully qualified name: `lakehouse_name.table_name`.

## File and Path Errors

### Error: Path Not Found During Table Operations

**Error Messages:**
- The path `<NAME>` for targeted Delta table was not found. Please check that the targeted table is valid.
- Path not found

#### What Happened

This error appears when trying to access a Lakehouse path or Delta table that the system cannot find during operations such as loading table schema, refreshing path, or listing tables. This typically occurs due to incorrect path formatting, missing permissions, or the table/path no longer existing at the specified location.

**Common Causes:**
- The Delta table path is invalid, unavailable, or permissions are insufficient
- Incorrect workspace/lakehouse context or malformed ABFSS paths with typos in workspace or lakehouse IDs
- The lakehouse or table has been deleted, renamed, or moved since the connection was configured
- Notebook not attached to the correct Lakehouse

#### How to Fix the Error

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

**Error Messages:**
- Artifact is Not Found in Workspace During List Tables

#### What Happened

The system cannot locate the specified Lakehouse artifact in the workspace, often due to naming issues, incorrect paths, or synchronization problems.

**Common Causes:**
- Workspace or lakehouse name contains invalid characters (spaces or special symbols), especially problematic with schema-enabled lakehouses
- Incorrect API paths or malformed workspace/lakehouse IDs in API calls or abfss paths
- The artifact may have been deleted, renamed, or moved
- SQL endpoint not synchronized with lakehouse storage changes

#### How to Fix the Error

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

**Error Messages:**
- No Data File Found / No CSV File Found in Folder

#### What Happened

Microsoft Fabric cannot locate CSV files in the expected location during data ingestion or Delta table creation operations. This error typically happens during file upload processes, notebook operations, or when attempting to load data from the lakehouse Files section.

**Common Causes:**
- CSV file uploaded to incorrect location in the lakehouse (e.g., Tables folder instead of Files folder)
- OneDrive not configured for staging file uploads in the Fabric environment
- Incorrect file path reference in notebooks or Spark operations
- File upload didn't complete successfully or files appear in "Unidentified Area" of lakehouse

#### How to Fix the Error

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

### Error: Error Sending Request - Failed to Fetch During File Upload

**Error Messages:**
- Error Sending Request: Failed to Fetch During File Upload

#### What Happened

The browser or application cannot complete the file upload request to the Lakehouse, often due to permission restrictions, network issues, or UI limitations.

**Common Causes:**
- Insufficient permissions - user needs Contributor or Owner access on the Lakehouse
- Browser/network issues including cache problems, extensions (ad blockers/VPN), or firewall/proxy blocking API calls
- File size or storage quota limits exceeded

#### How to Fix the Error

**Fix 1: Verify and Update Permissions**

1. Ensure you have at least Contributor or Owner access on the Lakehouse
2. Have an admin re-grant permissions if needed
3. Sometimes permissions can become unsynchronized and require re-assignment
4. Check workspace settings to confirm your role assignment

**Fix 2: Use Spark Notebook Workaround**

If UI upload doesn't work due to permission or policy restrictions, use a Fabric Notebook with Spark code to write files directly to the Lakehouse. This operation requires Contributor role or higher:

```python
from notebookutils import mssparkutils

# Write string content directly to a file in the Lakehouse
file_content = "col1,col2,col3\nvalue1,value2,value3"
mssparkutils.fs.put("Files/data/yourfile.csv", file_content, overwrite=True)

# Or copy files between Lakehouse locations
mssparkutils.fs.cp("Files/source/data.csv", "Files/destination/data.csv")
```

This method bypasses UI limitations and works even when the Explorer UI is restricted.

**Fix 3: Troubleshoot Browser and Network**

1. Try different browsers (Chrome, Edge, Firefox) to isolate browser-specific issues
2. Clear cache and cookies, or use incognito/private mode
3. Disable browser extensions, especially ad blockers and VPN-related plugins
4. Switch networks (e.g., mobile hotspot instead of office VPN) to rule out firewall/proxy issues

For additional guidance, see [Troubleshoot the Lakehouse connector](../data-factory/connector-troubleshoot-lakehouse.md).

## Lakehouse Operation and Data Copy Errors

### Error: Lakehouse Data Copy Operation Failed

**Error Messages:**
- Lakehouse Data Copy Operation failed
- Lakehouse Data Copy Operation (pipeline or runtime) Operations Failing Due to Network or Secure Channel Problems

#### What Happened

Data copy operations in pipelines, notebooks, or data flows failed due to connectivity issues, authentication problems, or network security restrictions preventing access to source or destination endpoints.

**Common Causes:**
- Network connectivity issues, firewall rules, or SSL/TLS certificate validation failures blocking communication
- Network isolation or private endpoint configuration preventing access to source or destination
- Authentication token expiration or insufficient permissions during long-running copy operations
- Transient network errors, timeouts, or insufficient bandwidth during large data transfers

#### How to Fix the Error

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

### Error: Internal Server Error (500) / Job Execution Failures

**Error Messages:**
- Job execution fails with 500 internal server errors
- An internal error occurred while processing your request
- Internal server error

#### What Happened

The Microsoft Fabric service encountered an unexpected internal error while processing your request, job, or operation. These errors typically indicate a problem on the service side rather than a configuration issue.

**Common Causes:**
- Temporary service outages or degraded performance affecting backend systems
- Resource exhaustion on backend services processing your request
- Corruption in metadata or catalog entries causing processing failures
- Bugs or issues in the Fabric service platform
- Conflicts or race conditions in concurrent operations
- Edge cases not properly handled by the service

#### How to Fix the Error

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

**Fix 3: Clear Cache and Restart Sessions**

1. Clear browser cache and cookies if using the web interface
2. Stop and restart Spark sessions in notebooks
3. Restart pipeline runs rather than resuming from a failed state
4. Delete and recreate temporary artifacts that may be corrupted
5. Sign out and sign back in to refresh authentication and session state

## Materialized Lake Views Errors

### Error: An Error Occurred While Processing Your Request

**Error Messages:**
- An error occurred while processing your request

#### What Happened

This error occurs when attempting to retrieve or view the lineage information for Materialized Lake Views in Microsoft Fabric. The lineage feature tracks data dependencies and flow between artifacts, but the system cannot process the request to display this information.

**Common Causes:**
- Workspace or capacity experiencing high load or throttling
- Complex lineage graph with too many dependencies causing processing delays
- Permissions issue preventing access to lineage metadata
- Recently created or modified Materialized Lake View with lineage metadata still being computed
- Cache or synchronization issue between the lineage service and lakehouse metadata

#### How to Fix the Error

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

### Error: Power BI Entity Not Found at Lakehouse Refresh

**Error Messages:**
- Power BI Entity Not Found at Lakehouse Refresh
- Entity does not exist in Lakehouse
- Table or dataset not found

#### What Happened

Power BI cannot locate the Lakehouse entity (table or dataset) during a refresh operation. The referenced entity may have been renamed, deleted, or moved since the Power BI connection was originally configured.

**Common Causes:**
- The entity (table/dataset) has been renamed, deleted, or moved since the Power BI connection was configured
- Incorrect table or dataset name in the Power BI connection string
- Lakehouse has been deleted or moved to a different workspace
- Table was dropped and recreated with a different schema or ID
- Connection is pointing to the wrong Lakehouse or workspace

#### How to Fix the Error

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

**Error Messages:**
- Power BI Not Authorized at Lakehouse Refresh
- Access denied during refresh
- Unauthorized to access Lakehouse data

#### What Happened

Power BI cannot access the Lakehouse entity during a refresh operation due to insufficient permissions. The user or service principal performing the refresh lacks the necessary access rights to read data from the Lakehouse.

**Common Causes:**
- Users lack explicit access to the Lakehouse or individual tables despite being workspace admins
- Direct Lake mode semantic model has outdated or missing credentials
- Data source credentials are expired or incorrect in Power BI Desktop
- Service principal lacks proper permissions to access the Lakehouse
- Workspace role is insufficient (need Contributor or higher for data access)

#### How to Fix the Error

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