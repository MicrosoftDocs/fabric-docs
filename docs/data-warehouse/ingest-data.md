---
title: Ingesting data into the warehouse
description: Learn about the features that allow you to ingest data into your warehouse.
ms.reviewer: wiassaf
ms.author: kecona
author: KevinConanMSFT
ms.topic: conceptual
ms.date: 03/15/2023
---

# Ingesting data into the warehouse

[!INCLUDE [preview-note](../includes/preview-note.md)]

**Applies to:** Warehouse

In order to really use your data warehouse, you first need to bring data into it! In this article, we cover the features you need to know about to bring data into your data warehouse.

Those key features include:

- COPY
- CREATE TABLE, INSERT, UPDATE, and DELETE
- Ingesting data from a Lakehouse to a warehouse using cross-database queries
- Explicit transactions
- ADF and pipelines

The COPY command feature in [!INCLUDE [product-name](../includes/product-name.md)] Warehouse uses a simple, flexible, and fast interface for high-throughput data ingestion for SQL workloads. In the current version of [!INCLUDE [product-name](../includes/product-name.md)] Warehouse, we support loading data from external storage accounts only.

You can also use TSQL to create a new table and then insert into it, and then update and delete rows of data. Data can be inserted from any database within the [!INCLUDE [product-name](../includes/product-name.md)] workspace using cross-database queries. If you want to ingest data from a Lakehouse to a warehouse, you can do this with a cross database query. For example:

```sql
INSERT INTO MyWarehouseTable
SELECT * FROM MyLakehouse.dbo.MyLakehouseTable;
```

Explicit transactions allow you to group multiple data changes together so that they're only visible when reading one or more tables when the transaction is fully committed. You also have the ability to roll back the transaction if any of the changes fail.

> [!NOTE]
> If a SELECT is within a transaction, and was preceded by data insertions, the automatically generated statistics may be inaccurate after a rollback. Inaccurate statistics can lead to unoptimized query plans and execution times. If you roll back a transaction with SELECTs after a large INSERT, you may want to [update statistics](/sql/t-sql/statements/update-statistics-transact-sql?view=sql-server-ver16&preserve-view=true) for the columns mentioned in your SELECT.

## Next steps

- [Ingest data using the COPY command](ingest-data-copy-command.md)
- [Ingest data using Data pipelines](ingest-data-pipelines.md)
