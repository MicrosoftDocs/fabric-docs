---
title: Column-level security in Fabric data warehousing
description: Learn about column-level security in tables in Fabric data warehousing.
author: SQLStijn-MSFT
ms.author: stwynant
ms.reviewer: wiassaf
ms.topic: conceptual
ms.custom:
  - ignite-2023
ms.date: 11/15/2023
---
# Column-level security in Fabric data warehousing

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Column-level security simplifies the design and coding of security in your application, allowing you to restrict column access to protect sensitive data. For example, ensuring that specific users can access only certain columns of a table pertinent to their department. 

## Column-level security at the data level

The access restriction logic is located in the database tier, not in any single application tier. The database applies the access restrictions every time data access is attempted, from any application or reporting platform including Power BI. This restriction makes your security more reliable and robust by reducing the surface area of your overall security system. 

Column-level security only applies to queries on a Warehouse or SQL analytics endpoint in Fabric. Power BI queries on a warehouse in Direct Lake mode will fall back to Direct Query mode to abide by column-level security.

## Restrict access to certain columns to certain users

In addition, column-level security is simpler and than designing additional [views](/sql/relational-databases/views/views?view=fabric&preserve-view=true) to filter out columns for imposing access restrictions on the users.

Implement column-level security with the [GRANT](/sql/t-sql/statements/grant-transact-sql?view=fabric&preserve-view=true) T-SQL statement. For simplicity of management, assigning permissions to roles is preferred to using individuals.

Column-level security is applied to [shared warehouse or lakehouse](share-warehouse-manage-permissions.md), because the underlying data source hasn't changed.

Only Microsoft Entra authentication is supported.

## Example

This example will create a table and will limit the columns that `charlie@contoso.com` can see in the `customers` table.

```sql
CREATE TABLE dbo.Customers
  (CustomerID int,
   FirstName varchar(100) NULL,
   CreditCard char(16) NOT NULL,
   LastName varchar(100) NOT NULL,
   Phone varchar(12) NULL,
   Email varchar(100) NULL);

```

We will allow Charlie to only access the columns related to the customer, but not the sensitive `CreditCard` column:

```sql
GRANT SELECT ON Customers(CustomerID, FirstName, LastName, Phone, Email) TO [Charlie@contoso.com];
```

Queries executed as `charlie@contoso.com` will fail if they include the `CreditCard` column:

```sql
SELECT * FROM Customers;
```

```output
Msg 230, Level 14, State 1, Line 12
The SELECT permission was denied on the column 'CreditCard' of the object 'Customers', database 'ContosoSales', schema 'dbo'.
```

## Related content

- [Security for data warehousing in Microsoft Fabric](security.md)
- [Share your warehouse and manage permissions](share-warehouse-manage-permissions.md)
- [Row-level security in Fabric data warehousing](row-level-security.md)
- [Dynamic data masking in Fabric data warehousing](dynamic-data-masking.md)

## Next step

> [!div class="nextstepaction"]
> [Implement column-level security in Fabric Data Warehousing](tutorial-column-level-security.md)
