---
title: Primary, Foreign, and Unique Keys
description: Learn more about table constraints support using Warehouse in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: xiaoyul
ms.date: 08/01/2024
ms.topic: how-to
ms.search.form: Warehouse design and development # This article's title should not change. If so, contact engineering.
---
# Primary keys, foreign keys, and unique keys in Warehouse in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-se-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Learn about table constraints in [!INCLUDE [fabricse](includes/fabric-se.md)] and [!INCLUDE [fabricdw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)], including the primary key, foreign keys, and unique keys.

> [!IMPORTANT]  
> To add or remove primary key, foreign key, or unique constraints, use ALTER TABLE. These cannot be created inline within a CREATE TABLE statement.

## Table constraints

[!INCLUDE [fabricse](includes/fabric-se.md)] and [!INCLUDE [fabricdw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)] support these table constraints: 

- PRIMARY KEY is only supported when NONCLUSTERED and NOT ENFORCED are both used.
- FOREIGN KEY is only supported when NOT ENFORCED is used.
- UNIQUE constraint is only supported when NONCLUSTERED and NOT ENFORCED are both used.

For syntax, check [ALTER TABLE](/sql/t-sql/statements/alter-table-transact-sql?view=fabric&preserve-view=true).

- [!INCLUDE [fabricse](includes/fabric-se.md)] and [!INCLUDE [fabric-dw](includes/fabric-dw.md)] don't support default constraints at this time. 
- For more information on tables, see [Tables in data warehousing in Microsoft Fabric](tables.md).

> [!IMPORTANT]
> There are limitations with adding table constraints or columns when using [Source Control with Warehouse](source-control.md#limitations-in-source-control).

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

- [Design tables in Warehouse in [!INCLUDE [product-name](../includes/product-name.md)]](tables.md)
- [Data types in Microsoft Fabric](data-types.md)
- [What is data warehousing in [!INCLUDE [product-name](../includes/product-name.md)]?](data-warehousing.md)
- [What is data engineering in [!INCLUDE [product-name](../includes/product-name.md)]?](../data-engineering/data-engineering-overview.md)
- [[!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)]](data-warehousing.md#fabric-data-warehouse)
- [Create a [!INCLUDE [fabric-dw](includes/fabric-dw.md)]](create-warehouse.md)
- [Query a warehouse](query-warehouse.md)
