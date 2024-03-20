---
title: Implement column-level security in Fabric data warehousing
description: A guide to use column-level security in Fabric data warehousing.
author: SQLStijn-MSFT
ms.author: stwynant
ms.reviewer: wiassaf
ms.topic: how-to
ms.custom:
  - ignite-2023
ms.date: 11/15/2023
---
# Implement column-level security in Fabric data warehousing

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Column-level security (CLS) in Microsoft Fabric allows you to control access to columns in a table based on specific grants on these tables. For more information, see [Column-level security in Fabric data warehousing](column-level-security.md).

This guide will walk you through the steps to implement column-level security in a Warehouse or SQL analytics endpoint. 

## Prerequisites

Before you begin, make sure you have the following:

1. A Fabric workspace with an active capacity or trial capacity.
1. A Fabric Warehouse or SQL analytics endpoint on a Lakehouse.
1. Either the Administrator, Member, or Contributor rights on the workspace, or elevated permissions on the Warehouse or SQL analytics endpoint.

## 1. Connect

1. Log in using an account with elevated access on the Warehouse or SQL analytics endpoint. (Either Admin/Member/Contributor role on the workspace or Control Permissions on the Warehouse or SQL analytics endpoint).
1. Open the Fabric workspace and navigate to the Warehouse or SQL analytics endpoint where you want to apply column-level security.

## 2. Define column-level access for tables

1. Identify user or roles and the data tables you want to secure with column-level security.
1. Implement column-level security with the [GRANT](/sql/t-sql/statements/grant-transact-sql?view=fabric&preserve-view=true) T-SQL statement and a column list. For simplicity of management, assigning permissions to roles is preferred to using individuals.
    ```sql
    -- Grant select to subset of columns of a table
    GRANT SELECT ON YourSchema.YourTable 
    (Column1, Column2, Column3, Column4, Column5) 
    TO [SomeGroup];
    ```

1. Replace `YourSchema` with the name of your schema and `YourTable` with the name of your target table.
1. Replace `SomeGroup` with the name of your User/Group.
1. Replace the comma-delimited columns list with the columns you want to give the role access to.
1. Repeat these steps to grant specific column access for other tables if needed.

## 3. Test column-level access

1. Log in as a user who is a member of a role with an associated GRANT statement.
1. Query the database tables to verify that column-level security is working as expected. Users should only see the columns they have access to, and should be blocked from other columns. For example:
    ```sql
    SELECT * FROM YourSchema.YourTable;
    ```
1. Similar results for the user will be filtered with other applications that use Microsoft Entra authentication for database access.

## 4. Monitor and maintain column-level security

Regularly monitor and update your column-level security policies as your security requirements evolve. Keep track of role assignments and ensure that users have the appropriate access.

## Related content

- [Column-level security for Fabric data warehousing](column-level-security.md)
- [Row-level security in Fabric data warehousing](row-level-security.md)
