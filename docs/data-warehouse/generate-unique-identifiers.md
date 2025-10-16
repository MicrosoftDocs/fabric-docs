---
title: "Generate unique identifiers in a warehouse table"
description: "Learn about workarounds to generate unique identifiers in a Microsoft Fabric warehouse table."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: procha
ms.date: 10/15/2025
ms.topic: how-to
ms.custom:
  - fabric-cat
---

# Generate unique identifiers in a warehouse table in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

It's a common requirement in data warehouses to assign a unique identifier to each row of a table. In SQL Server-based environments this is typically done by creating an [identity column](/sql/t-sql/statements/create-table-transact-sql-identity-property?view=sql-server-ver16&preserve-view=true) in a table, however currently this feature isn't supported in a warehouse in Microsoft Fabric. This article describes a workaround to generate unique identifiers in a warehouse table.

> [!IMPORTANT]
> Considerations should be made for multiple processes inserting data simultaneously as this could lead to duplicate values.

1. Create a table that includes a column that stores unique identifier values. The column data type should be set to **int** or **bigint**, depending on the volume of data you expect to store. You should also define the column as `NOT NULL` to ensure that every row is assigned an identifier.

    The following T-SQL code sample creates an example table named `Orders_with_Identifier` in the `dbo` schema, where the `Row_ID` column serves as a unique key.

    ```sql
    --Drop a table named 'Orders_with_Identifier' in schema 'dbo', if it exists
    IF OBJECT_ID('[dbo].[Orders_with_Identifier]', 'U') IS NOT NULL
        DROP TABLE [dbo].[Orders_with_Identifier];
    GO
    
    CREATE TABLE [dbo].[Orders_with_Identifier] (
        [Row_ID] BIGINT NOT NULL,
        [O_OrderKey] BIGINT NULL,
        [O_CustomerKey] BIGINT NULL,
        [O_OrderStatus] VARCHAR(1) NULL,
        [O_TotalPrice] DECIMAL(15, 2) NULL,
        [O_OrderDate] DATE NULL,
        [O_OrderPriority] VARCHAR(15) NULL,
        [O_Clerk] VARCHAR (15) NULL,
        [O_ShipPriority] INT NULL,
        [O_Comment] VARCHAR (79) NULL
    );
    GO
    ```

1. Before you insert rows into the table, you need to determine the last identifier value stored in the table. You can do that by retrieving the _maximum_ identifier value. This value should be assigned to a variable so you can refer to it when you insert table rows (in the next step).

    The following code assigns the last identifier value to a variable named `@MaxID`.
    
    ```sql
    --Assign the last identifier value to a variable
    --If the table doesn't contain any rows, assign zero to the variable
    DECLARE @MaxID AS BIGINT;
    
    IF EXISTS(SELECT * FROM [dbo].[Orders_with_Identifier])
        SET @MaxID = (SELECT MAX([Row_ID]) FROM [dbo].[Orders_with_Identifier]);
    ELSE
        SET @MaxID = 0;
    ```

1. When you insert rows into the table, unique and sequential numbers are computed by adding the value of the `@MaxID` variable to the values returned by the [ROW\_NUMBER](/sql/t-sql/functions/row-number-transact-sql?view=fabric6&preserve-view=true) function. This function is a window function that computes a sequential row number starting with `1`.
    
    The following T-SQL code—which is run in the same batch as the script in step 2—inserts rows into the `Orders_with_Identifier` table. The values for the `Row_ID` column are computed by adding the `@MaxID` variable to values returned by the `ROW_NUMBER` function. The function must have an `ORDER BY` clause, which defines the logical order of the rows within the result set. However when set to `SELECT NULL`, no logical order is imposed, meaning identifier values are arbitrarily assigned. This `ORDER BY` clause results in a faster execution time.

    ```sql
    --Insert new rows with unique identifiers
    INSERT INTO [dbo].[Orders_with_Identifier]
    SELECT
        @MaxID + ROW_NUMBER() OVER(ORDER BY (SELECT NULL)) AS [Row_ID],
        [src].[O_OrderKey],
        [src].[O_CustomerKey],
        [src].[O_OrderStatus],
        [src].[O_TotalPrice],
        [src].[O_OrderDate],
        [src].[O_OrderPriority],
        [src].[O_Clerk],
        [src].[O_ShipPriority],
        [src].[O_Comment]
    FROM [dbo].[Orders] AS [src];
    ```
    
## Related content

- [Design tables in Warehouse in Microsoft Fabric](tables.md)
- [Data types in Microsoft Fabric](data-types.md)
- [ROW_NUMBER (Transact-SQL)](/sql/t-sql/functions/row-number-transact-sql?view=fabric&preserve-view=true)
- [SELECT - OVER Clause (Transact-SQL)](/sql/t-sql/queries/select-over-clause-transact-sql?view=fabric&preserve-view=true)
