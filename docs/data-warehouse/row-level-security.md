---
title: Row-level security in Fabric data warehousing
description: Learn about row-level security in tables in Fabric data warehousing.
author: SQLStijn-MSFT
ms.author: stwynant
ms.reviewer: wiassaf
ms.topic: conceptual
ms.custom:
  - ignite-2023
ms.date: 11/15/2023
---
# Row-level security in Fabric data warehousing

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Row-level security (RLS) enables you to use group membership or execution context to control access to rows in a database table. For example, you can ensure that workers access only those data rows that are pertinent to their department. Another example is to restrict customers' data access to only the data relevant to their company in a multitenant architecture. The feature is similar to row-level security in [SQL Server](/sql/relational-databases/security/row-level-security?view=fabric&preserve-view=true).

## Row-level security at the data level

Row-level security simplifies the design and coding of security in your application. Row-level security helps you implement restrictions on data row access.

The access restriction logic is in the database tier, not in any single application tier. The database applies the access restrictions every time data access is attempted, from any application or reporting platform including Power BI. This makes your security system more reliable and robust by reducing the surface area of your security system. Row-level security only applies to queries on a Warehouse or SQL analytics endpoint in Fabric. Power BI queries on a warehouse in Direct Lake mode will fall back to Direct Query mode to abide by row-level security.

## Restrict access to certain rows to certain users

Implement RLS by using the [CREATE SECURITY POLICY](/sql/t-sql/statements/create-security-policy-transact-sql?view=fabric&preserve-view=true) Transact-SQL statement, and predicates created as [inline table-valued functions](/sql/relational-databases/user-defined-functions/create-user-defined-functions-database-engine?view=fabric&preserve-view=true).

Row-level security is applied to [shared warehouse or lakehouse](share-warehouse-manage-permissions.md), because the underlying data source hasn't changed.

## Predicate-based row-level security

Row-level security in Fabric Synapse Data Warehouse supports predicate-based security. Filter predicates silently filter the rows available to read operations.

Access to row-level data in a table is restricted by a security predicate defined as an inline table-valued function. The function is then invoked and enforced by a security policy. For filter predicates, the application is unaware of rows that are filtered from the result set. If all rows are filtered, then a null set will be returned.

Filter predicates are applied while reading data from the base table. They affect all get operations: `SELECT`, `DELETE`, and `UPDATE`. The users can't select or delete rows that are filtered. The user can't update rows that are filtered. But it's possible to update rows in such a way that they'll be filtered afterward. 

Filter predicate and security policies have the following behavior:

- You can define a predicate function that joins with another table and/or invokes a function. If the security policy is created with `SCHEMABINDING = ON` (the default), then the join or function is accessible from the query and works as expected without any additional permission checks.

- You can issue a query against a table that has a security predicate defined but disabled. Any rows that are filtered or blocked aren't affected.

- If a dbo user, a member of the `db_owner` role, or the table owner queries a table that has a security policy defined and enabled, the rows are filtered or blocked as defined by the security policy.

- Attempts to alter the schema of a table bound by a schema bound security policy will result in an error. However, columns not referenced by the predicate can be altered.

- Attempts to add a predicate on a table that already has one defined for the specified operation results in an error. This will happen whether the predicate is enabled or not.

- Attempts to modify a function, that is used as a predicate on a table within a schema bound security policy, will result in an error.

- Defining multiple active security policies that contain non-overlapping predicates, succeeds.

Filter predicates have the following behavior:

- Define a security policy that filters the rows of a table. The application is unaware of any rows that are filtered for `SELECT`, `UPDATE`, and `DELETE` operations. Including situations where all the rows are filtered out. The application can `INSERT` rows, even if they will be filtered during any other operation.

## Permissions

Creating, altering, or dropping security policies requires the `ALTER ANY SECURITY POLICY` permission. Creating or dropping a security policy requires `ALTER` permission on the schema.

Additionally, the following permissions are required for each predicate that is added:

- `SELECT` and `REFERENCES` permissions on the function being used as a predicate.

- `REFERENCES` permission on the target table being bound to the policy.

- `REFERENCES` permission on every column from the target table used as arguments.

Security policies apply to all users, including dbo users in the database. Dbo users can alter or drop security policies however their changes to security policies can be audited. If members of roles like Administrator, Member, or Contributor need to see all rows to troubleshoot or validate data, the security policy must be written to allow that.

If a security policy is created with `SCHEMABINDING = OFF`, then to query the target table, users must have the `SELECT` or `EXECUTE` permission on the predicate function and any additional tables, views, or functions used within the predicate function. If a security policy is created with `SCHEMABINDING = ON` (the default), then these permission checks are bypassed when users query the target table.

## Security considerations: side channel attacks

Consider and prepare for the following two scenarios.

### Malicious security policy manager

It is important to observe that a malicious security policy manager, with sufficient permissions to create a security policy on top of a sensitive column and having permission to create or alter inline table-valued functions, can collude with another user who has select permissions on a table to perform data exfiltration by maliciously creating inline table-valued functions designed to use side channel attacks to infer data. Such attacks would require collusion (or excessive permissions granted to a malicious user) and would likely require several iterations of modifying the policy (requiring permission to remove the predicate in order to break the schema binding), modifying the inline table-valued functions, and repeatedly running select statements on the target table. We recommend you limit permissions as necessary and monitor for any suspicious activity. Activity such as constantly changing policies and inline table-valued functions related to row-level security should be monitored.

### Carefully crafted queries

It is possible to cause information leakage by using carefully crafted queries that use errors to exfiltrate data. For example, `SELECT 1/(SALARY-100000) FROM PAYROLL WHERE NAME='John Doe';` would let a malicious user know that John Doe's salary is exactly $100,000. Even though there is a security predicate in place to prevent a malicious user from directly querying other people's salary, the user can determine when the query returns a divide-by-zero exception.

## Example

We can demonstrate row-level security [!INCLUDE [fabricdw](includes/fabric-dw.md)] and [!INCLUDE [fabricse](includes/fabric-se.md)] in Microsoft Fabric.

The following example creates sample tables that will work with [!INCLUDE [fabricdw](includes/fabric-dw.md)] in Fabric, but in [!INCLUDE [fabricse](includes/fabric-se.md)] use existing tables. In the [!INCLUDE [fabricse](includes/fabric-se.md)], you cannot `CREATE TABLE`, but you can `CREATE SCHEMA`, `CREATE FUNCTION`, and `CREATE SECURITY POLICY`.

In this example, first create a schema `sales`, a table `sales.Orders`.

```sql
CREATE SCHEMA sales;
GO

-- Create a table to store sales data
CREATE TABLE sales.Orders (
    SaleID INT,
    SalesRep VARCHAR(100),
    ProductName VARCHAR(50),
    SaleAmount DECIMAL(10, 2),
    SaleDate DATE
);

-- Insert sample data
INSERT INTO sales.Orders (SaleID, SalesRep, ProductName, SaleAmount, SaleDate)
VALUES
    (1, 'Sales1@contoso.com', 'Smartphone', 500.00, '2023-08-01'),
    (2, 'Sales2@contoso.com', 'Laptop', 1000.00, '2023-08-02'),
    (3, 'Sales1@contoso.com', 'Headphones', 120.00, '2023-08-03'),
    (4, 'Sales2@contoso.com', 'Tablet', 800.00, '2023-08-04'),
    (5, 'Sales1@contoso.com', 'Smartwatch', 300.00, '2023-08-05'),
    (6, 'Sales2@contoso.com', 'Gaming Console', 400.00, '2023-08-06'),
    (7, 'Sales1@contoso.com', 'TV', 700.00, '2023-08-07'),
    (8, 'Sales2@contoso.com', 'Wireless Earbuds', 150.00, '2023-08-08'),
    (9, 'Sales1@contoso.com', 'Fitness Tracker', 80.00, '2023-08-09'),
    (10, 'Sales2@contoso.com', 'Camera', 600.00, '2023-08-10');
```

Create a `Security` schema, a function `Security.tvf_securitypredicate`, and a security policy `SalesFilter`.

```sql
-- Creating schema for Security
CREATE SCHEMA Security;
GO
 
-- Creating a function for the SalesRep evaluation
CREATE FUNCTION Security.tvf_securitypredicate(@SalesRep AS nvarchar(50))
    RETURNS TABLE
WITH SCHEMABINDING
AS
    RETURN SELECT 1 AS tvf_securitypredicate_result
WHERE @SalesRep = USER_NAME() OR USER_NAME() = 'manager@contoso.com';
GO
 
-- Using the function to create a Security Policy
CREATE SECURITY POLICY SalesFilter
ADD FILTER PREDICATE Security.tvf_securitypredicate(SalesRep)
ON sales.Orders
WITH (STATE = ON);
GO
```

## Related content

- [Security for data warehousing in Microsoft Fabric](security.md)
- [Share your warehouse and manage permissions](share-warehouse-manage-permissions.md)
- [Column-level security in Fabric data warehousing](column-level-security.md)
- [Dynamic data masking in Fabric data warehousing](dynamic-data-masking.md)

## Next step

> [!div class="nextstepaction"]
> [Implement row-level security in Fabric Data Warehousing](tutorial-row-level-security.md)
