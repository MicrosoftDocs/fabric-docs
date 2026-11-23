---
title: Primary, Foreign, and Unique Keys
description: Learn more about table constraints support using Warehouse in Microsoft Fabric.
ms.reviewer: xiaoyul
ms.date: 09/08/2026
ms.topic: how-to
ms.search.form: Warehouse design and development # This article's title should not change. If so, contact engineering.
---
# Primary keys, foreign keys, and unique keys in Warehouse in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-se-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Learn about table constraints in [!INCLUDE [fabricse](includes/fabric-se.md)] and [!INCLUDE [fabricdw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)], including the primary key, foreign keys, and unique keys.

> [!IMPORTANT]  
> To add or remove primary key, foreign key, or unique constraints, use `ALTER TABLE`. You can't create these constraints inline within a `CREATE TABLE` statement.

## Table constraints

[!INCLUDE [fabricse](includes/fabric-se.md)] and [!INCLUDE [fabricdw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)] support adding these table constraints to existing tables: 

- `PRIMARY KEY` is only supported when you use `NONCLUSTERED` and `NOT ENFORCED`.
- `FOREIGN KEY` is only supported when you use `NOT ENFORCED`.
- `UNIQUE` constraint is only supported when you use `NONCLUSTERED` and `NOT ENFORCED`.

For syntax, check [ALTER TABLE](/sql/t-sql/statements/alter-table-transact-sql?view=fabric&preserve-view=true).

- [!INCLUDE [fabricse](includes/fabric-se.md)] and [!INCLUDE [fabric-dw](includes/fabric-dw.md)] don't support default constraints at this time. 
- For more information on tables, see [Tables in Fabric Data Warehouse](tables.md).

> [!IMPORTANT]
> There are limitations when adding table constraints or columns by using [Git Integration for Fabric Warehouse Development](git-integration.md#limitations-in-git-integration).

## Examples

Create a [!INCLUDE [product-name](../includes/product-name.md)] [!INCLUDE [fabric-dw](includes/fabric-dw.md)] table with a primary key: 

```sql 
CREATE TABLE PrimaryKeyTable (c1 INT NOT NULL, c2 INT);

ALTER TABLE PrimaryKeyTable ADD CONSTRAINT PK_PrimaryKeyTable PRIMARY KEY NONCLUSTERED (c1) NOT ENFORCED;
```

Create a [!INCLUDE [product-name](../includes/product-name.md)] [!INCLUDE [fabric-dw](includes/fabric-dw.md)] table with a unique constraint:

```sql
CREATE TABLE UniqueConstraintTable (c1 INT NOT NULL, c2 INT);

ALTER TABLE UniqueConstraintTable ADD CONSTRAINT UK_UniqueConstraintTablec1 UNIQUE NONCLUSTERED (c1) NOT ENFORCED;
```

Create a [!INCLUDE [product-name](../includes/product-name.md)] [!INCLUDE [fabric-dw](includes/fabric-dw.md)] table with a foreign key:

```sql
CREATE TABLE ForeignKeyReferenceTable (c1 INT NOT NULL);

ALTER TABLE ForeignKeyReferenceTable ADD CONSTRAINT PK_ForeignKeyReferenceTable PRIMARY KEY NONCLUSTERED (c1) NOT ENFORCED;

CREATE TABLE ForeignKeyTable (c1 INT NOT NULL, c2 INT);

ALTER TABLE ForeignKeyTable ADD CONSTRAINT FK_ForeignKeyTablec1 FOREIGN KEY (c1) REFERENCES ForeignKeyReferenceTable (c1) NOT ENFORCED;
```

## Related content

- [Tables in Fabric Data Warehouse](tables.md)
- [Data types in Fabric Data Warehouse](data-types.md)
- [What is Fabric Data Warehouse?](data-warehousing.md)
- [What is Microsoft Fabric Data Engineering?](../data-engineering/data-engineering-overview.md)
- [[!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)]](data-warehousing.md#fabric-data-warehouse)
- [Create a Warehouse in Microsoft Fabric](create-warehouse.md)
- [Query the warehouse or SQL analytics endpoint](query-warehouse.md)
