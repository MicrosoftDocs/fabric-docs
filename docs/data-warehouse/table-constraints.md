---
title: Primary, foreign, and unique keys
description: Learn more about table constraints support using Warehouse in Microsoft Fabric.
author: KevinConanMSFT
ms.author: kecona
ms.reviewer: wiassaf
ms.date: 12/13/2023
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.search.form: Warehouse design and development # This article's title should not change. If so, contact engineering.
---
# Primary keys, foreign keys, and unique keys in Warehouse in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-se-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Learn about table constraints in [!INCLUDE [fabricse](includes/fabric-se.md)] and [!INCLUDE [fabricdw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)], including the primary key, foreign keys, and unique keys.

> [!IMPORTANT]  
> To add or remove primary key, foreign key, or unique constraints, use ALTER TABLE.

## Table constraints

[!INCLUDE [fabricse](includes/fabric-se.md)] and [!INCLUDE [fabricdw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)] support these table constraints: 

- PRIMARY KEY is only supported when NONCLUSTERED and NOT ENFORCED are both used.
- UNIQUE constraint is only supported when NONCLUSTERED and NOT ENFORCED is used.
- FOREIGN KEY is only supported when NOT ENFORCED is used.

For syntax, check [ALTER TABLE](/sql/t-sql/statements/alter-table-transact-sql?view=fabric&preserve-view=true).

- [!INCLUDE [fabricse](includes/fabric-se.md)] and [!INCLUDE [fabric-dw](includes/fabric-dw.md)] don't support default constraints at this time. 
- For more information on tables, see [Tables in data warehousing in Microsoft Fabric](tables.md).

## Remarks

Having primary key, foreign key and/or unique key allows [!INCLUDE [fabricse](includes/fabric-se.md)] and [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)] to generate an optimal execution plan for a query.  

ALTER TABLE cannot be part of an explicit transaction.

> [!IMPORTANT]  
> After creating a table with primary key or unique constraint in [!INCLUDE [fabricse](includes/fabric-se.md)] or [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)], make sure all values in those columns are unique. A violation of that can cause the query to return inaccurate result. Foreign keys are not enforced.

This example shows how a query might return inaccurate result if the primary key or unique constraint column includes duplicate values.  

```sql
 -- Create table t1
CREATE TABLE t1 (a1 INT NOT NULL, b1 INT) 

-- Insert values to table t1 with duplicate values in column a1.
INSERT INTO t1 VALUES (1, 100)
INSERT INTO t1 VALUES (1, 1000)
INSERT INTO t1 VALUES (2, 200)
INSERT INTO t1 VALUES (3, 300)
INSERT INTO t1 VALUES (4, 400)

-- Run this query.  No primary key or unique constraint.  4 rows returned. Correct result.
SELECT a1, COUNT(*) AS total FROM t1 GROUP BY a1

/*
a1          total
----------- -----------
1           2
2           1
3           1
4           1

(4 rows affected)
*/

-- Add unique constraint
ALTER TABLE t1 ADD CONSTRAINT unique_t1_a1 unique NONCLUSTERED (a1) NOT ENFORCED

-- Re-run this query.  5 rows returned.  Incorrect result.
SELECT a1, count(*) AS total FROM t1 GROUP BY a1

/*
a1          total
----------- -----------
2           1
4           1
1           1
3           1
1           1

(5 rows affected)
*/

-- Drop unique constraint.
ALTER TABLE t1 DROP CONSTRAINT unique_t1_a1

-- Add primary key constraint
ALTER TABLE t1 add CONSTRAINT PK_t1_a1 PRIMARY KEY NONCLUSTERED (a1) NOT ENFORCED

-- Re-run this query.  5 rows returned.  Incorrect result.
SELECT a1, COUNT(*) AS total FROM t1 GROUP BY a1

/*
a1          total
----------- -----------
2           1
4           1
1           1
3           1
1           1

(5 rows affected)
*/

-- Manually fix the duplicate values in a1
UPDATE t1 SET a1 = 0 WHERE b1 = 1000

-- Verify no duplicate values in column a1 
SELECT * FROM t1

/*
a1          b1
----------- -----------
2           200
3           300
4           400
0           1000
1           100

(5 rows affected)
*/

-- Add unique constraint
ALTER TABLE t1 ADD CONSTRAINT unique_t1_a1 unique NONCLUSTERED (a1) NOT ENFORCED  

-- Re-run this query.  5 rows returned.  Correct result.
SELECT a1, COUNT(*) as total FROM t1 GROUP BY a1

/*
a1          total
----------- -----------
2           1
3           1
4           1
0           1
1           1

(5 rows affected)
*/

-- Drop unique constraint.
ALTER TABLE t1 DROP CONSTRAINT unique_t1_a1

-- Add primary key contraint
ALTER TABLE t1 ADD CONSTRAINT PK_t1_a1 PRIMARY KEY NONCLUSTERED (a1) NOT ENFORCED

-- Re-run this query.  5 rows returned.  Correct result.
SELECT a1, COUNT(*) AS total FROM t1 GROUP BY a1

/*
a1          total
----------- -----------
2           1
3           1
4           1
0           1
1           1

(5 rows affected)
*/

```

## Examples

Create a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)] table with a primary key: 

```sql 
CREATE TABLE PrimaryKeyTable (c1 INT NOT NULL, c2 INT);

ALTER TABLE PrimaryKeyTable ADD CONSTRAINT PK_PrimaryKeyTable PRIMARY KEY NONCLUSTERED (c1) NOT ENFORCED;
```

Create a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)] table with a unique constraint:

```sql
CREATE TABLE UniqueConstraintTable (c1 INT NOT NULL, c2 INT);

ALTER TABLE UniqueConstraintTable ADD CONSTRAINT UK_UniqueConstraintTablec1 UNIQUE NONCLUSTERED (c1) NOT ENFORCED;
```

Create a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)] table with a foreign key:

```sql
CREATE TABLE ForeignKeyReferenceTable (c1 INT NOT NULL);

ALTER TABLE ForeignKeyReferenceTable ADD CONSTRAINT PK_ForeignKeyReferenceTable PRIMARY KEY NONCLUSTERED (c1) NOT ENFORCED;

CREATE TABLE ForeignKeyTable (c1 INT NOT NULL, c2 INT);

ALTER TABLE ForeignKeyTable ADD CONSTRAINT FK_ForeignKeyTablec1 FOREIGN KEY (c1) REFERENCES ForeignKeyReferenceTable (c1) NOT ENFORCED;
```

## Related content

- [Design tables in Warehouse in [!INCLUDE [product-name](../includes/product-name.md)]](tables.md)
- [Data types in Microsoft Fabric](data-types.md)
- [What is data warehousing in [!INCLUDE [product-name](../includes/product-name.md)]?](data-warehousing.md)
- [What is data engineering in [!INCLUDE [product-name](../includes/product-name.md)]?](../data-engineering/data-engineering-overview.md)
- [[!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)]](data-warehousing.md#synapse-data-warehouse)
- [Create a [!INCLUDE [fabric-dw](includes/fabric-dw.md)]](create-warehouse.md)
- [Query a warehouse](query-warehouse.md)
