---
title: Ingesting data into the warehouse
description: Learn about the features that allow you to ingest data into your warehouse.
ms.reviewer: wiassaf
ms.author: kecona
author: KevinConanMSFT
ms.topic: conceptual
ms.date: 04/03/2023
ms.search.form: Ingesting data
---

# Ingesting data into the Synapse Data Warehouse

**Applies to:** [!INCLUDE[fabric-dw](includes/applies-to-version/fabric-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

In order to really use your data warehouse, you first need to bring data into it! In this article, we cover the features you need to know about to bring data into your data warehouse.

> [!NOTE]
> To load data into your [Lakehouse](../data-engineering/lakehouse-overview.md), see [Load data into the Lakehouse](../data-engineering/load-data-lakehouse.md).

## Ingest data options

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
> If a transaction has data insertion into an empty table and issues a SELECT before rolling back, the automatically generated statistics may still reflect the uncommitted data, causing inaccurate statistics. Inaccurate statistics can lead to unoptimized query plans and execution times. If you roll back a transaction with SELECTs after a large INSERT, you may want to [update statistics](/sql/t-sql/statements/update-statistics-transact-sql?view=sql-server-ver16&preserve-view=true) for the columns mentioned in your SELECT.

## Next steps

- [Ingest data using the COPY command](ingest-data-copy-command.md)
- [Ingest data using Data pipelines](ingest-data-pipelines.md)
