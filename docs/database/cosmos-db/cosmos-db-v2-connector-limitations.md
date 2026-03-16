---
title: Azure Cosmos DB v2 Connector Limitations
description: Learn about the current limitations and restrictions when using the Azure Cosmos DB v2 Connector in Microsoft Fabric.
ms.reviewer: jmaldonado
ms.topic: concept-article
ms.date: 10/31/2025
ms.search.form: Azure Cosmos DB v2 Connector Limitations
ai-usage: ai-generated
---

# Azure Cosmos DB v2 connector limitations in Microsoft Fabric

This article lists current limitations for the Azure Cosmos DB v2 connector in Microsoft Fabric.

## Query performance and optimization

- **Partitioned containers with aggregate functions**: For partitioned Cosmos DB in Fabric containers, SQL queries with aggregate functions are passed to Cosmos DB in Fabric only if the query includes a filter (`WHERE` clause) on the partition key. Without a partition key filter, the connector performs the aggregation locally in Power BI.

- **TOP or LIMIT with aggregates**: The connector doesn't pass aggregate functions to Cosmos DB in Fabric when they follow `TOP` or `LIMIT` operations. Cosmos DB in Fabric processes the `TOP` operation at the end of query processing. For example:
  
  ```sql
  SELECT COUNT(1) FROM (SELECT TOP 4 * FROM MyContainer) C
  ```
  
  In this query, `TOP` is applied in the subquery, and the aggregate function is applied to that result set.

- **DISTINCT in aggregate functions**: If `DISTINCT` is included in an aggregate function, the connector doesn't pass the aggregate function to Cosmos DB in Fabric. Cosmos DB in Fabric doesn't support `DISTINCT` within aggregate functions.

## Aggregate function behavior

- **SUM with non-numeric values**: Cosmos DB in Fabric returns `undefined` if any arguments in a `SUM` function are string, boolean, or null. When null values are present, the connector passes the query to Cosmos DB in Fabric with null values replaced by zero during the SUM calculation.

- **AVG with non-numeric values**: Cosmos DB in Fabric returns `undefined` if any arguments in an `AVG` function are string, boolean, or null. The connector provides a connection property to disable passing the `AVG` aggregate function to Cosmos DB in Fabric. When `AVG` passdown is disabled, the connector performs the averaging operation locally. To configure this option, go to **Advanced options** > **Enable AVERAGE function Pass down** in the connector settings.

- **Large partition keys**: Cosmos DB in Fabric containers with large partition keys aren't supported in the connector.

## Query limitations

- Aggregation passdown is disabled in these scenarios due to server limitations:

  - The query doesn't filter on a partition key, or the partition key filter uses the `OR` operator with another predicate at the top level in the `WHERE` clause.

  - One or more partition keys appear in an `IS NOT NULL` clause in the `WHERE` clause.

  - Filter passdown is disabled when queries containing one or more aggregate columns are referenced in the `WHERE` clause.

## Data types and schema

- **Complex data types**: The v2 connector doesn't support complex data types such as arrays, objects, and hierarchical structures. For scenarios requiring these data types, use the SQL analytics endpoint approach with mirrored data in OneLake.

- **Schema inference**: The connector samples the first 1,000 documents to infer the schema. This approach isn't recommended for schema evolution scenarios where only some documents are updated. For example, a newly added property in one document within a container of thousands of documents might not be included in the inferred schema. For dynamic schema scenarios, consider using the SQL analytics endpoint approach.

- **Nonstring object properties**: The connector doesn't support nonstring values in object properties.

- **Column size limitation**: The Cosmos DB ODBC driver has a 255-byte limit on column values. If a document property exceeds this limit, you might encounter an error: "Cannot store value in temporary table without truncation. (Column metadata implied a maximum of 255 bytes, while provided value is [size] bytes)". To resolve this issue, consider the following options:

  - **Option 1 - Remove the column**: If you don't need the field in your visuals, open Power Query (**Transform Data**), select **Remove Columns** > **Choose Columns**, and deselect the column. Or add a step in Power Query:
    
    ```powerquery
    #"Removed Columns" = Table.RemoveColumns(#"PreviousStep", {"myLongTextColumn"})
    ```

  - **Option 2 - Truncate the text**: If you need part of the data, add a custom column in Power Query to keep the first 250 characters:
    
    ```powerquery
    #"Added Truncated Column" = Table.AddColumn(#"PreviousStep", "myShorterTextColumn", each Text.Start([myLongTextColumn], 250))
    ```

    Then remove the original column and use the truncated version in your visuals.

  - **Option 3 - Use SQL analytics endpoint**: If you need to analyze the full text without truncation, use the SQL analytics endpoint approach instead of the Azure Cosmos DB v2 connector. The SQL analytics endpoint accesses mirrored data in OneLake and doesn't have the 255-byte column limitation.

## Related content

- [Power BI reporting with Cosmos DB in Fabric](./how-to-create-reports.md)
- [Limitations for Cosmos DB in Fabric](./limitations.md)
- [Cosmos DB in Fabric FAQ](./faq.yml)

