---
title: Ingest data into the Synapse Data Warehouse
description: Learn about the features that allow you to ingest data into your Synapse Data Warehouse in Microsoft Fabric.
author: periclesrocha
ms.author: procha
ms.reviewer: wiassaf
ms.date: 05/23/2023
ms.topic: conceptual
ms.search.form: Ingesting data # This article's title should not change. If so, contact engineering.
---

# Ingest data into the Synapse Data Warehouse

**Applies to:** [!INCLUDE[fabric-dw](includes/applies-to-version/fabric-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

 [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)] offers built-in data ingestion tools that allow users to ingest data into warehouses at scale using code-free or code-rich experiences.

## Data ingestion options

You can ingest data into a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] using one of the following options:

- **COPY (Transact-SQL)**: the COPY statement offers flexible, high-throughput data ingestion from an external Azure storage account. You can use the COPY statement as part of your existing ETL/ELT logic in Transact-SQL code. For more information, see [COPY INTO](/sql/t-sql/statements/copy-into-transact-sql?view=fabric&preserve-view=true).
- **Data pipelines**: pipelines offer a code-free or low-code experience for data ingestion. Using pipelines, you can orchestrate robust workflows for a full Extract, Transform, Load (ETL) experience that includes activities to help prepare the destination environment, run custom Transact-SQL statements, perform lookups, or copy data from a source to a destination.
- **Dataflows**: an alternative to pipelines, Dataflows enable easy data preparation, cleaning, and transformation using a code-free experience. 
- **Cross-warehouse ingestion**: data ingestion from workspace sources is also possible. This scenario may be required when there's the need to create a new table with a subset of a different table, or as a result of joining different tables in the warehouse and in the lakehouse. For cross-warehouse ingestion, in addition to the options mentioned, Transact-SQL features such as **INSERT...SELECT**, **SELECT INTO**, or **CREATE TABLE AS SELECT (CTAS)** work cross-warehouse within the same workspace.

### Decide which data ingestion tool to use

To decide which data ingestion option to use, you can use the following criteria: 

- Use **dataflows** for a code-free experience that allow custom transformations to source data before it's ingested. These transformations include (but aren't limited to) changing data types, adding or removing columns or using functions to produce calculated columns.
- Use **data pipelines** for code-free or low-code, robust data ingestion workflows that run repeatedly, at a schedule, or that involves large volumes of data.
- Use the **COPY (Transact-SQL)** statement for code-rich data ingestion operations, for the highest data ingestion throughput possible, or when you need to add data ingestion as part of a Transact-SQL logic. 
- Use **cross-warehouse ingestion** to create new tables with source data within the same workspace, using a code-rich experience.
 
> [!NOTE]
> The COPY statement in [!INCLUDE [fabric-dw](includes/fabric-dw.md)] supports only data sources on Azure storage accounts, with authentication using to Shared Access Signature (SAS), Storage Account Key (SAK), or accounts with public access. For other limitations, see [COPY (Transact-SQL)](/sql/t-sql/statements/copy-into-transact-sql).

## Supported data formats and sources

Data ingestion in [!INCLUDE [fabric-dw](includes/fabric-dw.md)] offers a vast number of data formats and sources you can use. Each of the options outlined includes its own list of supported data connector types and data formats. 

For **cross-warehouse ingestion**, data sources must be within the same [!INCLUDE [product-name](../includes/product-name.md)] workspace. Queries can be performed using three-part naming for the source data.

As an example, suppose there's two warehouses named `Inventory` and `Sales` in a workspace. A query such as the following one creates a new table in the `Inventory` warehouse with the content of a table in the `Inventory` warehouse, joined with a table in the `Sales` warehouse:

```sql
CREATE TABLE Inventory.dbo.RegionalSalesOrders
AS
SELECT s.SalesOrders, i.ProductName
FROM Sales.dbo.SalesOrders s
JOIN Inventory.dbo.Products i
WHERE s.ProductID = i.ProductID
    AND s.Region = 'West region'
```

The **[COPY (Transact-SQL)](/sql/t-sql/statements/copy-into-transact-sql?view=fabric&preserve-view=true)** statement currently supports the PARQUET and CSV file formats. For data sources, only Azure Data Lake Storage Gen2 accounts are supported.

**Data pipelines** and **dataflows** support a wide variety of data sources and data formats. For more information, see [Ingest data using Data pipelines](ingest-data-pipelines.md).

For more information, visit [Ingest data into your warehouse using Data pipelines](/ingest-data-pipelines) and [Ingest data into your warehouse using Data flows](/ingest-data-flows).

## Best practices

For optimal ingestion performance, the following best practices are recommended:

- Avoid ingesting data using singleton **INSERT** statements, as this causes poor performance on queries and updates. If singleton **INSERT** statements were used for data ingestion consecutively, we recommend creating a new table by using **CREATE TABLE AS SELECT (CTAS)** or **INSERT...SELECT** patterns, dropping the original table, and then creating your table again from the table you created using **CREATE TABLE AS SELECT (CTAS)** or **INSERT...SELECT**.
- When working with external data on files, we recommend that files are at least 4 MB in size.
- For large compressed CSV files, consider splitting your file into multiple files.
- Azure Data Lake Storage (ADLS) Gen2 account offers better performance than Azure Blob Storage (legacy). Consider using an ADLS Gen2 account whenever possible. 
- For pipelines that run frequently, consider isolating your Azure storage account from other services that could access the same files at the same time.

## Next steps

- [Ingest data using the COPY command](/sql/t-sql/statements/copy-into-transact-sql?view=fabric&preserve-view=true)
- [Ingest data using Data pipelines](ingest-data-pipelines.md)
- [CREATE TABLE AS SELECT](/sql/t-sql/statements/create-table-as-select-azure-sql-data-warehouse?view=fabric&preserve-view=true)
- For details on **INSERT...SELECT** patterns, see [INSERT (Transact-SQL)](/sql/t-sql/statements/insert-transact-sql?view=fabric&preserve-view=true)
