---
title: "Understand Direct Lake query performance"
description: "Learn how Direct Lake query performance depends on Delta table health and efficient data updates. Understand the importance of V-Order optimization, row groups, and Delta log management for optimal query execution."
author: JulCsc
ms.author: juliacawthra
ms.reviewer: phseamar, Kay.Unkroth
ms.date: 06/03/2025
ms.topic: concept-article
ms.custom: fabric-cat
---

# Understand Direct Lake query performance

Apart from semantic model design and query complexity, Direct Lake performance specifically depends on well-tuned Delta tables for efficient and fast column loading (transcoding) and optimal query execution. Make sure you apply V-Order optimization. Also, keep the number of Parquet files small, use large row groups, and strive to minimize the effect of data updates on the Delta log. These are common best practices that can help to ensure fast query execution in cold, semiwarm, warm, and hot Direct Lake mode states.

This article explains how Direct Lake performance depends on Delta table health and efficient data updates. Understanding these dependencies is crucial. You learn that the data layout in your Parquet files is as important for query performance as are a good semantic model design and well-tuned data analysis expression (DAX) measures.

## What you need to know

This article assumes that you're already familiar with the following concepts:

- **Delta tables in OneLake**: Detailed information about Delta tables in OneLake is available in the [Microsoft Fabric fundamentals documentation](index.yml).
- **Parquet files, row groups, and Delta log**: The Parquet file format, including how data is organized into row groups and column chunks, and how metadata is handled, is explained in the [Parquet file format documentation](https://Parquet.apache.org/docs/file-format/). See also the [Delta transaction log protocol documentation](https://github.com/delta-io/delta/blob/master/PROTOCOL.md).
- **Delta table optimization and V-Order**: See the Fabric Lakehouse documentation about Delta table maintenance, such as [Delta Lake table optimization and V-Order](../data-engineering/delta-optimization-and-v-order.md).
- **Framing and transcoding**: Refreshing a Direct Lake semantic model (framing) and on-demand column data loading (transcoding) are important concepts, covered at an introductory level in the [Direct Lake overview article](direct-lake-overview.md).
- **Formula and Storage Engine**: When a DAX query is executed, the Formula Engine generates the query plan and retrieves the necessary data and initial aggregations from the Storage Engine. The optimizations discussed in this article focus on the Storage Engine. To learn more about the Formula Engine and the Storage Engine, explore the [Analysis Services developer documentation](/analysis-services/analysis-services-developer-documentation).
- **VertiPaq and VertiScan**: In import mode and in Direct Lake mode, the Storage Engine uses its VertiPaq engine to maintain a columnar in-memory store. VertiScan enables the Formula Engine to interact with VertiPaq. For more information, see the [Analysis Services developer documentation](/analysis-services/analysis-services-developer-documentation).
- **Dictionary encoding**: Both Parquet files and VertiPaq use dictionary encoding, which is a data compression technique applied to individual columns of various data types, such as int, long, date, and char. It works by storing each unique column value in memory as an integer using Run Length Encoding (RLE)/Bit-Packing Hybrid encoding. VertiPaq always uses dictionary encoding, but Parquet might switch to plain encoding or delta encoding under some circumstances, as explained in [Encodings in the Parquet File-Format documentation](https://Parquet.apache.org/docs/file-format/data-pages/encodings/), which would require Direct Lake to re-encode the data with corresponding effect on transcoding performance.
- **Column chunks and column segments**: Refer to the way Parquet and VertiPaq store column data for efficient data retrieval. Each column in a table is divided into smaller chunks that can be processed and compressed independently. VertiPaq calls these chunks segments. You can use the [DISCOVER_STORAGE_TABLE_COLUMN_SEGMENTS schema rowset](/analysis-services/instances/use-dynamic-management-views-dmvs-to-monitor-analysis-services) to retrieve information about the column segments in a Direct Lake semantic model.
- **Python and Jupyter Notebooks**: Jupyter Notebooks provide an interactive environment to write and run Python code. Basic knowledge of Python is helpful if you want to follow the code snippets later in this chapter. For more information, see the [Python language reference](https://docs.python.org/3/reference/index.html). For information on how to use notebooks in Microsoft Fabric, see [How to use notebooks - Microsoft Fabric](../data-engineering/how-to-use-notebook.md).

## What affects Direct Lake query performance

This section summarizes the main factors affecting Direct Lake performance. Subsequent sections offer more detailed explanations:

- **V-Order compression**: The effectiveness of compression can affect query performance, as better compression leads to faster data loading and more efficient query processing. Data loading is fast because streaming compressed data boosts transcoding efficiency. Query performance is also optimal because V-Order compression enables VertiScan to compute results directly on top of compressed data, skipping the decompression step.
- **Data types**: Using appropriate data types for columns can improve compression and performance. For example, use integer data types instead of strings where possible and avoid storing integers as strings.
- **Segment size and count**: VertiPaq stores column data in segments. A large number of smaller segments can negatively affect query performance. For large tables, Direct Lake prefers large segment sizes, such as between 1 million to 16 million rows.
- **Column cardinality**: High cardinality columns (columns with many unique values) can slow down performance. Reducing cardinality where possible can help.
- **Indexes and aggregations**: Columns with lower cardinality benefit from dictionary encoding, which can speed up queries by reducing the amount of data that needs to be scanned.
- **DirectQuery fallback**: Fallback operations might result in slower query performance as the data must now be fetched from the SQL analytics endpoint of the Fabric data source. Moreover, fallback relies on hybrid query plans to support both DirectQuery and VertiScan with some tradeoffs on performance even when Direct Lake doesn't need to fallback. If possible, disable DirectQuery fallback to avoid hybrid query plans.
- **Degree of memory residency**: Direct Lake semantic models can be in cold, semiwarm, warm, or hot state with increasingly better performance from cold to hot. Transitioning quickly from cold to warm is a key to good Direct Lake performance.
  - *Cold*: VertiPaq store is empty. All data required to answer a DAX query must be loaded from Delta tables.
  - *Semiwarm*: Direct Lake only drops those column segments during framing that belong to removed row groups. This means that only updated or newly added data must be loaded. A Direct Lake semantic model can also go into semiwarm state under memory pressure when it must unload segments and join indexes due to memory pressure.
  - *Warm*: The column data required to answer a DAX query is already fully loaded into memory.
  - *Hot*: The column data is already fully loaded into memory, VertiScan caches are populated, and the DAX queries hit the caches.
- **Memory pressure**: Direct Lake must load all column data required to answer a DAX query into memory, which can exhaust available memory resources. With insufficient memory, Direct Lake must unload previously loaded column data, which Direct Lake then might have to reload again for subsequent DAX queries. Adequately sizing Direct Lake semantic models can help to avoid frequent reloading.

## Memory residency and query performance

Direct Lake performs best in the warm or hot state, while cold states result in slower performance. Direct Lake avoids falling back to cold as much as possible by using incremental framing.

### Bootstrapping

After the initial semantic model load, no column data is resident in memory yet. Direct Lake is cold. When a client submits a DAX query to a Direct Lake semantic model in the cold state, Direct Lake must perform the following main tasks so that the DAX query can be processed and answered:

- VertiPaq dictionary transcoding. Direct Lake must merge the local Parquet dictionaries for each column chunk to create a global VertiPaq dictionary for the column. This **merge** operation affects query response time.
- Loading Parquet column chunks into column segments. In most cases, this is a direct remapping of Parquet data IDs to VertiPaq IDs when both sides can use RLE/Bit-Packing Hybrid encoding. If the Parquet dictionaries use plain encoding, VertiPaq must convert the values to RLE/Bit-Packing Hybrid encoding, which takes longer.
  - Direct Lake performance is optimal on V-Ordered Parquet files because V-Ordering increases the quality of RLE compression. Direct Lake can load tightly packed V-Ordered data faster than less compressed data.
- Generating join indexes. If the DAX query accesses columns from multiple tables, Direct Lake must build join indexes according to the table relationships so that VertiScan can join the tables correctly. To build the join indexes, Direct Lake must load the dictionaries of the key columns participating in the relationship and the column segments of the primary key column (the column on the One side of the table relationship).
- Applying Delta deletion vectors. If a source Delta table uses deletion vectors, Direct Lake must load these deletion vectors to ensure deleted data is excluded from query processing.

  > [!NOTE]
  > The cold state can also be induced by sending a `processClear` followed by a `processFull` XMLA command to the model. The `ProcessClear` command removes all data and the association with the framed Delta table version. The `ProcessFull` XMLA command performs framing to bind the model to the latest available Delta commit version.

### Incremental framing

During framing, Direct Lake analyzes the Delta log of each Delta table and drops loaded column segments and join indexes only when the underlying data has changed. Dictionaries are retained to avoid unnecessary transcoding and new values are simply added to the existing dictionaries. This incremental framing approach reduces the reload burden and benefits cold query performance.

You can analyze incremental framing effectiveness by using the `INFO.STORAGETABLECOLUMNSEGMENTS()` DAX function, which wraps the `DISCOVER_STORAGE_TABLE_COLUMN_SEGMENTS` schema rowset. Follow these steps to ensure meaningful results:

1. Query your Direct Lake semantic model to ensure it is in warm or hot state.
1. Update the Delta table you want to investigate and refresh the Direct Lake semantic model to perform framing.
1. Run a DAX query to retrieve column segment information by using the `INFO.STORAGETABLECOLUMNSEGMENTS()` function, as in the following screenshot. The screenshot uses a small sample table for illustration purposes. Each column only has a single segment. The segments aren't resident in memory. This indicates a true cold state. If the model was warm before framing, this means that the Delta table was updated using a destructive data loading pattern, making it impossible to use incremental framing. Delta table update patterns are covered later in this article.

:::image type="content" source="media/direct-lake-query-performance/run-dax-query.png" alt-text="Screenshot showing the result of a DAX query using INFO.STORAGETABLECOLUMNSEGMENTS in a Direct Lake semantic model, highlighting column segment residency." lightbox="media/direct-lake-query-performance/run-dax-query.png":::

> [!NOTE]
> When a Delta table receives no updates, no reload is necessary for columns already resident in memory. When using nondestructive update patterns, queries show far less performance effect after framing because incremental framing essentially enables Direct Lake to update substantial portions of the existing in-memory data in place.

### Full memory residency

With dictionaries, column segments, and join indexes loaded, Direct Lake reaches the warm state with query performance on par with import mode. In both modes, the number and size of column segments play a crucial role in optimizing query performance.

## Delta table differences

Parquet files organize data by columns rather than rows. Direct Lake also organizes data by columns. The alignment facilitates seamless integration, yet there are important differences, specifically concerning row groups and dictionaries.

### Row groups versus column segments

A row group in a Parquet file consists of column chunks, and each chunk contains data for a specific column. A column segment in a semantic model, on the other hand, also contains a chunk of column data.

There's a direct relationship between the total row group count of a Delta table and the segment count for each column of the corresponding semantic model table. For example, if a Delta table across all its current Parquet files has three row groups in total, then the corresponding semantic model table has three segments per column, as illustrated in the following diagram. In other words, if a Delta table has a large number of tiny row groups, a corresponding semantic model table would also have a large number of tiny column segments. This would negatively affect query performance.

:::image type="content" source="media/direct-lake-query-performance/delta-table-model-table.png" alt-text="Diagram showing the relationship between Delta table row groups and semantic model column segments in Direct Lake." lightbox="media/direct-lake-query-performance/delta-table-model-table.png":::

  > [!NOTE]
  > Because Direct Lake prefers large column segments, the row groups of the source Delta tables should ideally be large.

### Local dictionaries versus global dictionary

The total row group count of a Delta table also has direct effect on dictionary transcoding performance because Parquet files use local dictionaries while Direct Lake semantic models use a global dictionary for each column, as depicted in the following diagram. The higher the number of row groups, the higher the number of local dictionaries that Direct Lake must merge to create a global dictionary, and the longer it takes for transcoding to complete.

:::image type="content" source="media/direct-lake-query-performance/table-dictionary-transcoding.png" alt-text="Diagram illustrating the process of merging local Parquet dictionaries into a global dictionary for Direct Lake semantic models." lightbox="media/direct-lake-query-performance/table-dictionary-transcoding.png":::

## Delta table update patterns

The method used to ingest data into a Delta table can greatly influence incremental framing efficiency. For instance, using the **Overwrite** option when loading data into an existing table erases the Delta log with each load. This means Direct Lake can't use incremental framing and must reload all the data, dictionaries, and join indexes. Such destructive update patterns negatively affect query performance.

:::image type="content" source="media/direct-lake-query-performance/connect-data-destination.png" alt-text="Diagram showing data ingestion and update patterns for Delta tables in Direct Lake." lightbox="media/direct-lake-query-performance/connect-data-destination.png":::

This section covers Delta table update patterns that enable Direct Lake to use incremental framing, preserving VertiPaq column store elements like dictionaries, column segments, and join indexes, to maximize transcoding efficiency and boost cold query performance.

### Batch processing without partitioning

This update pattern collects and processes data in large batches at scheduled intervals, such as on a weekly or monthly basis. As new data arrives, old data is often removed in a rolling or sliding window fashion to keep the table size under control. However, removing old data can be a challenge if the data is spread across most of the Parquet files. For example, removing one day out of 30 days might affect 95% of the Parquet files instead of 5%. In this case, Direct Lake would have to reload 95% of the data even for a relatively small **delete** operation. The same issue also applies to updates of existing rows because updates are combined deletes and appends. You can analyze the effect of **delete** and **update** operations by using Delta Analyzer, as explained later in this article.

### Batch processing with partitioning

Delta table partitioning can help to reduce the effect of **delete** operations as the table is divided into smaller Parquet files stored in folders based on the distinct values in the partition column. Commonly used partition columns include date, region, or other dimensional categories. In the previous example of removing one day out of 30 days, a Delta table partitioned by date would constrain the deletes to only the Parquet files of the partition for that day. However, it's important to note that extensive partitioning could result in a substantially increased number of Parquet files and row groups, thereby causing an excessive increase in column segments within the Direct Lake semantic model, negatively affecting query performance. Choosing a low-cardinality partition column is crucial for query performance. As a best practice, the column should have fewer than 100-200 distinct values.

### Incremental loading

With incremental loading, the update process only inserts new data into a Delta table without affecting existing Parquet files and row groups. There are no deletes. Direct Lake can load the new data incrementally without having to discard and reload existing VertiPaq column store elements. This method works well with Direct Lake incremental framing. Delta table partitioning isn't necessary.

### Stream processing

Processing data near real-time, as it arrives, can cause a proliferation of small Parquet files and row groups, which can negatively affect Direct Lake performance. As with the incremental loading pattern, it isn't necessary to partition the Delta table. However, frequent table maintenance is essential to ensure that the number of Parquet files and row groups remains within the guardrail limits specified in the [Direct Lake overview article](direct-lake-overview.md). In other words, don't forget to run Spark Optimize regularly, such as daily or even more often. Spark Optimize is covered again in the next section.

  > [!NOTE]
  > Actual real-time analysis is best implemented using Eventstreams, KQL databases, and Eventhouse. Refer to the [Real-Time Intelligence documentation in Microsoft Fabric](../real-time-intelligence/index.yml) for guidance.

## Delta table maintenance

Key maintenance tasks include vacuuming and optimizing Delta tables. To automate maintenance operations, you can use the Lakehouse APIs as explained in the [Manage the Lakehouse with Microsoft Fabric REST API](../data-engineering/lakehouse-api.md) documentation.

### Vacuuming

Vacuuming removes Parquet files no longer included in the current Delta commit version and older than a set retention threshold. Removing these Parquet files doesn't affect Direct Lake performance because Direct Lake only loads the Parquet files that are in the current commit version. If you run VACUUM daily with the default values, the Delta commit versions of the last seven days are retained for time travel.

  > [!IMPORTANT]
  > Because a framed Direct Lake semantic model references a particular Delta commit version, you must ensure that the Delta table keeps this version until you refresh (frame) the model again to move it to the current version. Otherwise, users encounter query errors when the Direct Lake semantic model tries to access Parquet files that no longer exist.

### Spark Optimize

Delta table optimization merges multiple small Parquet files into fewer large files. Because this can affect cold Direct Lake performance, it's good practice to optimize infrequently, such as over weekends or at the end of the month. Optimize more often if small Parquet files accumulate quickly (high-frequency small updates) to ensure the Delta table stays within guardrail limits.

Partitioning can help to minimize optimization effect on incremental framing because partitioning effectively collocates the data. For example, partitioning a large Delta table based on a low-cardinality date_key column would constrain weekly maintenance to a maximum of seven partitions. The Delta table would retain most of the existing Parquet files. Direct Lake would only have to reload seven days of data.

## Analyzing Delta table updates

Use Delta Analyzer or similar tools to study how Delta table updates affect Parquet files and row groups. Delta Analyzer lets you track the evolution of Parquet files, row groups, column chunks, and columns in response to **append**, **update**, and **delete** operations. Delta Analyzer is available as a [standalone Jupyter Notebook](https://github.com/microsoft/Analysis-Services/tree/master/DeltaAnalyzer). It's also available in the [semantic-link-labs library](https://github.com/microsoft/semantic-link-labs). The following sections use semantic-link-labs. This library is easy to install in a notebook using the `%pip install semantic-link-labs` command.

### Row group size

The ideal row-group size for Direct Lake semantic models is between 1 million and 16 million rows, yet Fabric might use larger row group sizes for large tables if the data is compressible. Generally, we don't recommend that you change the default row group size. It's best to let Fabric manage the Delta table layout. But it's also a good idea to double check.

The following Python code can serve as a starting point to analyze the row group sizes and other details of a Delta table in a Fabric notebook-connected lakehouse. The following table shows the output for a sample table with 1 billion rows.

```
import sempy_labs as labs
from IPython.display import HTML
from IPython.display import clear_output

table_name = "<Provide your table name>"

# Load the Delta table and run Delta Analyzer
df = spark.read.format("delta").load(f"Tables/{table_name}")
da_results = labs.delta_analyzer(table_name)

# Display the table summary in an HTML table.
clear_output()

df1 = da_results['Summary'].iloc[0]

html_table = "<table border='1'><tr><th>Column Name</th><th>{table_name}</th></tr>"
for column in da_results['Summary'].columns:
    html_table += f"<tr><td>{column}</td><td>{df1[column]}</td></tr>"
html_table += "</table>"

display(HTML(html_table))
```

**Output**:

| Parameter | Value |
|---|---|
| **Table name** | sales_1 |
| **Row count** | 1000000000 |
| **Row groups** | 24 |
| **Parquet files** | 8 |
| **Max rows per row group** | 51210000 |
| **Min rows per row group** | 22580000 |
| **Avg rows per row group** | 41666666.666666664 |
| **VOrder enabled** | True |
| **Total size** | 7700808430 |
| **Timestamp** | 2025-03-24 03:01:02.794979 |

The Delta Analyzer summary shows an average row group size of approximately 40 million rows. This is larger than the recommended maximum row group size of 16 million rows. Fortunately, the larger row group size doesn't cause significant issues for Direct Lake. Larger row groups facilitate continuous segment jobs with minimal overhead in the Storage Engine. Conversely, small row groups, those significantly under 1 million rows, can cause performance issues.

More important in the previous example is that Fabric distributed the row groups across eight Parquet files. This aligns with the number of cores on the Fabric capacity to support efficient parallel **read** operations. Also important is that the individual row group sizes don't deviate too far from the average. Large variations can cause nonuniform VertiScan load, resulting in less optimal query performance.

### Rolling window updates

For illustration purposes, the following Python code sample simulates a rolling window update. The code removes the rows with the oldest DateID from a sample Delta table. It then updates the DateID of these rows and inserts them back again into the sample table as the most recent rows.

```
from pyspark.sql.functions import lit

table_name = "<Provide your table name>"
table_df = spark.read.format("delta").load(f"Tables/{table_name}")

# Get the rows of the oldest DateID.
rows_df = table_df[table_df["DateID"] == 20200101]
rows_df = spark.createDataFrame(rows_df.rdd, schema=rows_df.schema)

# Delete these rows from the table
table_df.createOrReplaceTempView(f"{table_name}_view")
spark.sql(f"DELETE From {table_name}_view WHERE DateID = '20200101'")

# Update the DateID and append the rows as new data
rows_df = rows_df.withColumn("DateID", lit(20250101))
rows_df.write.format("delta").mode("append").save(f"Tables/{table_name}")
```

The `get_delta_table_history` function in the [semantic-link-labs library](https://github.com/microsoft/semantic-link-labs) can help to analyze the effect of this rolling window update. See the following Python code sample. See also the table with the output after the code snippet.

```
import sempy_labs as labs
from IPython.display import HTML
from IPython.display import clear_output

table_name = "<Provide your table name>"
da_results = labs.get_delta_table_history(table_name)

# Create a single HTML table for specified columns
html_table = "<table border='1'>"
# Add data rows for specified columns
for index, row in da_results.iterrows():
    for column in ['Version', 'Operation', 'Operation Parameters', 'Operation Metrics']:
        if column == 'Version':
            html_table += f"<tr><td><b>Version</b></td><td><b>{row[column]}</b></td></tr>"
        else:
            html_table += f"<tr><td>{column}</td><td>{row[column]}</td></tr>"
html_table += "</table>"

# Display the HTML table
display(HTML(html_table))
```

**Output**:

| Version | Description | Value |
|---|---|---|
| **2** | **Operation** | WRITE |
| |**Operation parameters** | {'mode': 'Append', 'partitionBy': '[]'} |
| |**Operation metrics** | {'numFiles': '1', 'numOutputRows': '548665', 'numOutputBytes': '4103076'} |
| **1** | **Operation** | DELETE |
|| **Operation parameters** | {'predicate': '["(DateID#3910 = 20200101)"]'} |
|| **Operation metrics** | {'numRemovedFiles': '8', 'numRemovedBytes': '7700855198', 'numCopiedRows': '999451335', 'numDeletionVectorsAdded': '0', 'numDeletionVectorsRemoved': '0', 'numAddedChangeFiles': '0', 'executionTimeMs': '123446', 'numDeletionVectorsUpdated': '0', 'numDeletedRows': '548665', 'scanTimeMs': '4820', 'numAddedFiles': '18', 'numAddedBytes': '7696900084', 'rewriteTimeMs': '198625'} |
| **0** | **Operation** | WRITE |
||**Operation parameters** | {'mode': 'Overwrite', 'partitionBy': '[]'} |
|| **Operation metrics** | {'numFiles': '8', 'numOutputRows': '1000000000', 'numOutputBytes': '7700892169'} |

The Delta Analyzer history above shows that this Delta table now has the following three versions:

- **Version 0**: This is the original version with eight Parquet files and 24 row groups as discussed in the previous section.
- **Version 1**: This version reflects the **delete** operation. Although only a single day's worth of data (DateID = '20200101') was removed from the sample table with five years of sales transactions, all eight Parquet files were affected. In the Operation Metrics, `numRemovedFiles` is eight [Parquet files] and `numAddedFiles` is 18 [Parquet files]. The means that the **delete** operation replaced the original eight Parquet files with 18 new Parquet files.
- **Version 3**: The Operation Metrics reveal that one more Parquet file with 548,665 rows was added to the Delta table.

After the rolling window update, the most current Delta commit version includes 19 Parquet files and 21 row groups, with sizes ranging from 500 thousand to 50 million rows. The rolling window update of 548,665 rows affected the entire Delta table of 1 billion rows. It replaced all Parquet files and row groups. Incremental framing can't be expected to improve cold performance in this case, and the increased variation in row group sizes is unlikely to benefit warm performance.

### Delta table updates

The following Python code updates a Delta table in essentially the same way as described in the previous section. On the surface, the update function only changes the DateID value of the existing rows that match a given DateID. However, Parquet files are immutable and can't be modified. Below the surface, the **update** operation removes existing Parquet files and adds new Parquet files. The outcome and effect are the same as for the rolling window update.

```
from pyspark.sql.functions import col, when
from delta.tables import DeltaTable

# Load the Delta table
table_name = "<Provide your table name>"
delta_table = DeltaTable.forPath(spark, f"Tables/{table_name}")

# Define the condition and the column to update
condition = col("DateID") == 20200101
column_name = "DateID"
new_value = 20250101

# Update the DateID column based on the condition
delta_table.update(
    condition,
    {column_name: when(condition, new_value).otherwise(col(column_name))}
)
```

### Partitioned rolling window updates

Partitioning can help to reduce the effect of table updates. It might be tempting to use the date keys, but a quick cardinality check can reveal that this isn't the best choice. For example, the sample table discussed so far contains sales transactions for the last five years, equivalent to about 1800 distinct date values. This cardinality is too high. The partition column should have fewer than 200 distinct values.

```
column_name = 'DateID'
table_name = "<Provide your table name>"
table_df = spark.read.format("delta").load(f"Tables/{table_name}")

distinct_count = table_df.select(column_name).distinct().count()
print(f"The '{column_name}' column has {distinct_count} distinct values.")

if distinct_count <= 200:
    print(f"The '{column_name}' column is a good partitioning candidate.")
    table_df.write.format("delta").partitionBy(column_name).save(f"Tables/{table_name}_by_date_id")
    print(f"Table '{table_name}_by_date_id' partitioned and saved successfully.")
else:   
    print(f"The cardinality of the '{column_name}' column is possibly too high.")
```

**Output**:

```
The 'DateID' column has 1825 distinct values.
The cardinality of the 'DateID' column is possibly too high.
```

If there's no suitable partition column, it can be created artificially by reducing the cardinality of an existing column. The following Python code adds a Month column by removing the last two digits of the DateID. This produces 60 distinct values. The sample code then saves the Delta table partitioned by the Month column.

```
from pyspark.sql.functions import col, expr

column_name = 'DateID'
table_name = "sales_1"
table_df = spark.read.format("delta").load(f"Tables/{table_name}")

partition_column = 'Month'
partitioned_table = f"{table_name}_by_month"
table_df = table_df.withColumn(partition_column, expr(f"int({column_name} / 100)"))

distinct_count = table_df.select(partition_column).distinct().count()
print(f"The '{partition_column}' column has {distinct_count} distinct values.")

if distinct_count <= 200:
    print(f"The '{partition_column}' column is a good partitioning candidate.")
    table_df.write.format("delta").partitionBy(partition_column).save(f"Tables/{partitioned_table}")
    print(f"Table '{partitioned_table}' partitioned and saved successfully.")
else:   
    print(f"The cardinality of the '{partition_column}' column is possibly too high.")
```

**Output**:

```
The 'Month' column has 60 distinct values.
The 'Month' column is a good partitioning candidate.
Table 'sales_1_by_month' partitioned and saved successfully.
```

The Delta Analyzer summary now shows that the Delta table layout is well aligned with Direct Lake. The average row group size is about 16 million rows, and the mean absolute deviation of the row group sizes and therefore segment sizes is fewer than 1 million rows.

| Parameter | Value |
|---|---|
| **Table name** | sales_1_by_month |
| **Row count** | 1000000000 |
| **Row groups** | 60 |
| **Parquet files** | 60 |
| **Max rows per row group** | 16997436 |
| **Min rows per row group** | 15339311 |
| **Avg rows per row group** | 16666666.666666666 |
| **VOrder enabled** | True |
| **Total size** | 7447946016 |
| **Timestamp** | 2025-03-24 03:01:02.794979 |

After a rolling window update against a partitioned sample table, the Delta Analyzer history shows that only one Parquet file was affected. See the following output table. Version 2 has exactly 16,445,655 rows copied over from the old Parquet file into a replacement Parquet file, and Version 3 adds a new Parquet file with 548,665 rows. In total, Direct Lake only needs to reload about 17 million rows, a sizeable improvement over a 1-billion-rows reload without partitioning.

| Version | Description | Value|
|---|---|---|
|**2** | **Operation** | WRITE |
| |**Operation parameters** | {'mode': 'Append', 'partitionBy': '["Month"]'} |
| |**Operation metrics** | {'numFiles': '1', 'numOutputRows': '548665', 'numOutputBytes': '4103076'} |
|**1** | **Operation** | DELETE |
|| **Operation parameters** | {'predicate': '["(DateID#3910 = 20200101)"]'} |
|| **Operation metrics** | {'numRemovedFiles': '1', 'numRemovedBytes': '126464179', 'numCopiedRows': '16445655', 'numDeletionVectorsAdded': '0', 'numDeletionVectorsRemoved': '0', 'numAddedChangeFiles': '0', 'executionTimeMs': '19065', 'numDeletionVectorsUpdated': '0', 'numDeletedRows': '548665', 'scanTimeMs': '1926', 'numAddedFiles': '1', 'numAddedBytes': '121275513', 'rewriteTimeMs': '17138'} |
| **0** | **Operation** | WRITE |
|| **Operation parameters** | {'mode': 'Overwrite', 'partitionBy': '["Month"]'} |
|| **Operation metrics** | {'numFiles': '60', 'numOutputRows': '1000000000', 'numOutputBytes': '7447681467'} |

### Append-only pattern followed by Spark Optimize

Append-only patterns don't affect existing Parquet files. They work well with Direct Lake incremental framing. However, don't forget to optimize your Delta tables to consolidate Parquet files and row groups, as discussed earlier in this article. Small and frequent appends can accumulate files quickly and can distort the uniformity of the row group sizes.

The following output shows the Delta Analyzer history for a nonpartitioned table compared to a partitioned table. The history includes seven appends and one subsequent **optimize** operation.

| Version | Description | Value in *default* layout | Value in *partitioned* layout |
|---|---|---|---|
|**8** | **Operation** | OPTIMIZE | OPTIMIZE |
|| **Operation parameters** | {'predicate': '[]', 'auto': 'false', 'clusterBy': '[]', 'vorder': 'true', 'zOrderBy': '[]'} | {'predicate': '["(\'Month >= 202501)"]', 'auto': 'false', 'clusterBy': '[]', 'vorder': 'true', 'zOrderBy': '[]'} |
|| **Operation metrics** | {'numRemovedFiles': '8', 'numRemovedBytes': '991234561', 'p25FileSize': '990694179', 'numDeletionVectorsRemoved': '0', 'minFileSize': '990694179', 'numAddedFiles': '1', 'maxFileSize': '990694179', 'p75FileSize': '990694179', 'p50FileSize': '990694179', 'numAddedBytes': '990694179'} | {'numRemovedFiles': '7', 'numRemovedBytes': '28658548', 'p25FileSize': '28308495', 'numDeletionVectorsRemoved': '0', 'minFileSize': '28308495', 'numAddedFiles': '1', 'maxFileSize': '28308495', 'p75FileSize': '28308495', 'p50FileSize': '28308495', 'numAddedBytes': '28308495'} |
| **7** | **Operation** | WRITE | WRITE |
||**Operation parameters** | {'mode': 'Append', 'partitionBy': '[]'} | {'mode': 'Append', 'partitionBy': '["Month"]'} |
||**Operation metrics** | {'numFiles': '1', 'numOutputRows': '547453', 'numOutputBytes': '4091802'} | {'numFiles': '1', 'numOutputRows': '547453', 'numOutputBytes': '4091802'} |
| **6** | **Operation** | WRITE | WRITE |
||**Operation parameters** | {'mode': 'Append', 'partitionBy': '[]'} | {'mode': 'Append', 'partitionBy': '["Month"]'} |
||**Operation metrics** | {'numFiles': '1', 'numOutputRows': '548176', 'numOutputBytes': '4095497'} | {'numFiles': '1', 'numOutputRows': '548176', 'numOutputBytes': '4095497'} |
| **5** | **Operation** | WRITE | WRITE |
|| **Operation parameters** | {'mode': 'Append', 'partitionBy': '[]'} | {'mode': 'Append', 'partitionBy': '["Month"]'} |
|| **Operation metrics** | {'numFiles': '1', 'numOutputRows': '547952', 'numOutputBytes': '4090107'} | {'numFiles': '1', 'numOutputRows': '547952', 'numOutputBytes': '4093015'} |
| **4** | **Operation** | WRITE | WRITE |
|| **Operation parameters** | {'mode': 'Append', 'partitionBy': '[]'} | {'mode': 'Append', 'partitionBy': '["Month"]'} |
|| **Operation metrics** | {'numFiles': '1', 'numOutputRows': '548631', 'numOutputBytes': '4093134'} | {'numFiles': '1', 'numOutputRows': '548631', 'numOutputBytes': '4094376'} |
| **3**|**Operation** | WRITE | WRITE |
||**Operation parameters** | {'mode': 'Append', 'partitionBy': '[]'} | {'mode': 'Append', 'partitionBy': '["Month"]'} |
||**Operation metrics** | {'numFiles': '1', 'numOutputRows': '548671', 'numOutputBytes': '4101221'} | {'numFiles': '1', 'numOutputRows': '548671', 'numOutputBytes': '4101221'} |
| **2** |**Operation** | WRITE | WRITE |
||**Operation parameters** | {'mode': 'Append', 'partitionBy': '[]'} | {'mode': 'Append', 'partitionBy': '["Month"]'} |
||**Operation metrics** | {'numFiles': '1', 'numOutputRows': '546530', 'numOutputBytes': '4081589'} | {'numFiles': '1', 'numOutputRows': '546530', 'numOutputBytes': '4081589'} |
| **1** | **Operation** | WRITE | WRITE |
||**Operation parameters** | {'mode': 'Append', 'partitionBy': '[]'} | {'mode': 'Append', 'partitionBy': '["Month"]'} |
||**Operation metrics** | {'numFiles': '1', 'numOutputRows': '548665', 'numOutputBytes': '4101048'} | {'numFiles': '1', 'numOutputRows': '548665', 'numOutputBytes': '4101048'} |
| **0** | **Operation** | WRITE | WRITE |
||**Operation parameters** | {'mode': 'Overwrite', 'partitionBy': '[]'} | {'mode': 'Overwrite', 'partitionBy': '["Month"]'} |
||**Operation metrics** | {'numFiles': '8', 'numOutputRows': '1000000000', 'numOutputBytes': '7700855198'} | {'numFiles': '60', 'numOutputRows': '1000000000', 'numOutputBytes': '7447681467'} |

Looking at the Operation Metrics of Version 8, it's worth pointing out that the **optimize** operation for the nonpartitioned tabled merged eight Parquet files affecting roughly 1 GB of data while the **optimize** operation of the partitioned table merged seven Parquet files affecting only about 25 MB of data. It follows that Direct Lake would perform better with the partitioned table.

## Considerations and limitations

Considerations and limitations for optimizing Direct Lake performance are as follows:

- Avoid destructive update patterns on large Delta tables to preserve incremental framing in Direct Lake.
- Small Delta tables don't need to be optimized for incremental framing.
- Aim for a row group size of between 1 million to 16 million rows to create column segments in Direct Lake with 1 million to 16 million rows. Direct Lake prefers large column segments.
- Avoid high cardinality partition columns because Direct Lake transcoding is less efficient with many small Parquet files and row groups than with fewer large Parquet files and row groups.
- Due to unforeseen demand for compute and memory resources, a semantic model might be reloaded onto another Fabric cluster node in cold state.
- Direct Lake doesn't use delta\Parquet statistics for row group\file skipping to optimize data loading.
