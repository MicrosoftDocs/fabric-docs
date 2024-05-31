---
title: Data types
description: Learn about the T-SQL data types supported the SQL analytics endpoint and Warehouse in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: cynotebo
ms.date: 05/21/2024
ms.service: fabric
ms.subservice: data-warehouse
ms.topic: conceptual
ms.search.form: SQL Analytics Endpoint overview, Warehouse overview # This article's title should not change. If so, contact engineering.
---
# Data types in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-se-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Tables in [!INCLUDE [product-name](../includes/product-name.md)] support the most commonly used T-SQL data types.

- For more information on table creation, see [Tables](tables.md).

## Data types in Warehouse

[!INCLUDE [fabric-dw](includes/fabric-dw.md)] supports a subset of T-SQL data types. Each offered data type is based on the SQL Server data type of the same name. For more information, to the reference article for each in the following table.

| **Category** | **Supported data types** |
|---|---|
| **Exact numerics** | <ul><li>**[bit](/sql/t-sql/data-types/bit-transact-sql?view=fabric&preserve-view=true)**</li><li>**[smallint](/sql/t-sql/data-types/int-bigint-smallint-and-tinyint-transact-sql?view=fabric&preserve-view=true)**</li><li>**[int](/sql/t-sql/data-types/int-bigint-smallint-and-tinyint-transact-sql?view=fabric&preserve-view=true)**</li><li>**[bigint](/sql/t-sql/data-types/int-bigint-smallint-and-tinyint-transact-sql?view=fabric&preserve-view=true)**</li><li>**[decimal/numeric](/sql/t-sql/data-types/decimal-and-numeric-transact-sql?view=fabric&preserve-view=true)**</li></ul> |
| **Approximate numerics** | <ul><li>**[float](/sql/t-sql/data-types/float-and-real-transact-sql?view=fabric&preserve-view=true)**</li><li>**[real](/sql/t-sql/data-types/float-and-real-transact-sql?view=fabric&preserve-view=true)**</li></ul> |
| **Date and time** | <ul><li>**[date](/sql/t-sql/data-types/date-transact-sql?view=fabric&preserve-view=true)**</li><li>**[time](/sql/t-sql/data-types/time-transact-sql?view=fabric&preserve-view=true)**\*</li><li>**[datetime2](/sql/t-sql/data-types/datetime2-transact-sql?view=fabric&preserve-view=true)**\*</li></ul> |
| **Fixed-length character strings** | <ul><li>**[char](/sql/t-sql/data-types/char-and-varchar-transact-sql?view=fabric&preserve-view=true)**</li></ul>|
| **Variable length character strings**| <ul><li>**[varchar](/sql/t-sql/data-types/char-and-varchar-transact-sql?view=fabric&preserve-view=true)**</li></ul> |
| **Binary strings** | <ul><li>**[varbinary](/sql/t-sql/data-types/binary-and-varbinary-transact-sql?view=fabric&preserve-view=true)**</li><li>**[uniqueidentifer](/sql/t-sql/data-types/uniqueidentifier-transact-sql?view=fabric&preserve-view=true)**\*\*</li></ul> |

\* The precision for **datetime2** and **time** is limited to 6 digits of precision on fractions of seconds.

\*\* The **uniqueidentifier** data type is a T-SQL data type without a matching data type in Delta Parquet. As a result, it's stored as a binary type. [!INCLUDE [fabric-dw](includes/fabric-dw.md)] supports storing and reading **uniqueidentifier** columns, but these values can't be read on the [!INCLUDE [fabric-dw](includes/fabric-se.md)]. Reading **uniqueidentifier** values in the lakehouse displays a binary representation of the original values. As a result, features such as cross-joins between [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and [!INCLUDE [fabric-dw](includes/fabric-se.md)] using a **uniqueidentifier** column doesn't work as expected.

For more information about the supported data types including their precisions, see [data types in CREATE TABLE reference](/sql/t-sql/statements/create-table-azure-sql-data-warehouse?view=fabric&preserve-view=true#DataTypesFabric).

### Unsupported data types

For T-SQL data types that aren't currently supported, some alternatives are available. Make sure you evaluate the use of these types, as precision and query behavior vary:

| **Unsupported data type** | **Alternatives available** |
|---|---|
| **money** and **smallmoney** | Use **decimal**, however note that it can't store the monetary unit.  |
| **datetime** and **smalldatetime** | Use **datetime2**. |
| **nchar** and **nvarchar** | Use **char** and **varchar** respectively, as there's no similar **unicode** data type in Parquet. The **char** and **varchar** types in a UTF-8 collation might use more storage than **nchar** and **nvarchar** to store unicode data. To understand the impact on your environment, see [Storage differences between UTF-8 and UTF-16](/sql/relational-databases/collations/collation-and-unicode-support?view=fabric&preserve-view=true#storage_differences). |
| **text and ntext** | Use **varchar**. |
| **image** | Use **varbinary**. |

Unsupported data types can still be used in T-SQL code for variables, or any in-memory use in session. Creating tables or views that persist data on disk with any of these types isn't allowed.

For a guide to create a table in [!INCLUDE [fabric-dw](includes/fabric-dw.md)], see [Create tables](create-table.md).

## Autogenerated data types in the SQL analytics endpoint

The tables in [!INCLUDE [fabric-se](includes/fabric-se.md)] are automatically created whenever a table is created in the associated lakehouse. The column types in the [!INCLUDE [fabric-se](includes/fabric-se.md)] tables are derived from the source Delta types.

The rules for mapping original Delta types to the SQL types in [!INCLUDE [fabric-se](includes/fabric-se.md)] are shown in the following table:

| Delta data type | SQL data type (mapped) |
| :---| :---|
| **LONG**, **BIGINT** | **[bigint](/sql/t-sql/data-types/int-bigint-smallint-and-tinyint-transact-sql?view=fabric&preserve-view=true)** |
| **BOOLEAN**, **BOOL** | **[bit](/sql/t-sql/data-types/bit-transact-sql?view=fabric&preserve-view=true)** |
| **INT**, **INTEGER** | **[int](/sql/t-sql/data-types/int-bigint-smallint-and-tinyint-transact-sql?view=fabric&preserve-view=true)** |
| **TINYINT**, **BYTE**, **SMALLINT**, **SHORT** | **[smallint](/sql/t-sql/data-types/int-bigint-smallint-and-tinyint-transact-sql?view=fabric&preserve-view=true)** |
| **DOUBLE** | **[float](/sql/t-sql/data-types/float-and-real-transact-sql?view=fabric&preserve-view=true)** |
| **FLOAT**, **REAL** | **[real](/sql/t-sql/data-types/float-and-real-transact-sql?view=fabric&preserve-view=true)** |
| **DATE** | **[date](/sql/t-sql/data-types/date-transact-sql?view=fabric&preserve-view=true)** |
| **TIMESTAMP** | **[datetime2/*](/sql/t-sql/data-types/datetime2-transact-sql?view=fabric&preserve-view=true)** |
| **CHAR**(n) | **[varchar](/sql/t-sql/data-types/char-and-varchar-transact-sql?view=fabric&preserve-view=true)**(n) with `Latin1_General_100_BIN2_UTF8` collation |
| **STRING**, **VARCHAR**(n) | **[varchar](/sql/t-sql/data-types/char-and-varchar-transact-sql?view=fabric&preserve-view=true)**(n) with `Latin1_General_100_BIN2_UTF8` collation |
| **STRING**, **VARCHAR**(MAX) | **[varchar](/sql/t-sql/data-types/char-and-varchar-transact-sql?view=fabric&preserve-view=true)**(8000) with `Latin1_General_100_BIN2_UTF8` collation |
| **BINARY** | **[varbinary](/sql/t-sql/data-types/binary-and-varbinary-transact-sql?view=fabric&preserve-view=true)**(n) |
| **DECIMAL**, **DEC**, **NUMERIC** | **[decimal](/sql/t-sql/data-types/decimal-and-numeric-transact-sql?view=fabric&preserve-view=true)**(p,s) |

The columns that have the types that aren't listed in the table aren't represented as the table columns in the [!INCLUDE [fabric-se](includes/fabric-se.md)].

## Related content

- [T-SQL Surface Area in Microsoft Fabric](tsql-surface-area.md)
