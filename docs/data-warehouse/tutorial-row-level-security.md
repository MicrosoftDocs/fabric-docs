---
title: Implement row-level security in Microsoft Fabric data warehousing
description: A guide to use row-level security in Fabric Data Warehousing
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: stwynant
ms.date: 04/24/2024
ms.service: fabric
ms.subservice: data-warehouse
ms.topic: how-to
ms.custom:
  - ignite-2023
---
# Implement row-level security in Microsoft Fabric data warehousing

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Row-level security (RLS) in Fabric Warehouse and SQL analytics endpoint allows you to control access to rows in a database table based on user roles and predicates. For more information, see [Row-level security in Fabric data warehousing](row-level-security.md).

This guide will walk you through the steps to implement row-level security in Microsoft Fabric Warehouse or SQL analytics endpoint.

## Prerequisites

Before you begin, make sure you have the following:

1. A Fabric workspace with an active capacity or trial capacity.
1. A Fabric Warehouse or SQL analytics endpoint on a Lakehouse.
1. Either the Administrator, Member, or Contributor rights on the workspace, or elevated permissions on the Warehouse or SQL analytics endpoint.

## 1. Connect

1. Log in using an account with elevated access on the Warehouse or SQL analytics endpoint. (Either Admin/Member/Contributor role on the workspace or Control Permissions on the Warehouse or SQL analytics endpoint).
1. Open the Fabric workspace and navigate to the Warehouse or SQL analytics endpoint where you want to apply row-level security.

## 2. Define security policies

1. Determine the roles and predicates you want to use to control access to data. Roles define who can access data, and predicates define the criteria for access.
1. Create security predicates. Security predicates are conditions that determine which rows a user can access. You can create security predicates as inline table-valued functions. This simple exercise assumes there is a column in your data table, `UserName_column`, that contains the relevant username, populated by the system function [USER_NAME()](/sql/t-sql/functions/user-name-transact-sql?view=fabric&preserve-view=true).

    ```sql
    -- Creating schema for Security
    CREATE SCHEMA Security;
    GO
    
    -- Creating a function for the SalesRep evaluation
    CREATE FUNCTION Security.tvf_securitypredicate(@UserName AS varchar(50))
        RETURNS TABLE
    WITH SCHEMABINDING
    AS
        RETURN SELECT 1 AS tvf_securitypredicate_result
    WHERE @UserName = USER_NAME();
    GO
    
    -- Using the function to create a Security Policy
    CREATE SECURITY POLICY YourSecurityPolicy
    ADD FILTER PREDICATE Security.tvf_securitypredicate(UserName_column)
    ON sampleschema.sampletable
    WITH (STATE = ON);
    GO 
    ```

1. Replace `YourSecurityPolicy` with your policy name, `tvf_securitypredicate` with the name of your predicate function, `sampleschema` with the name of your schema and `sampletable` with the name of your target table. 
1. Replace `UserName_column` with a column in your table that contains user names.
1. Replace `WHERE @UserName = USER_NAME();` with a `WHERE` clause that matches the desired predicate-based security filter. For example, this filters the data where the `UserName` column, mapped to the `@UserName` parameter, matches the result of the system function [USER_NAME()](/sql/t-sql/functions/user-name-transact-sql?view=fabric&preserve-view=true).
1. Repeat these steps to create security policies for other tables if needed.

## 3. Test row-level security

1. Log in to Fabric as a user who is a member of a role with an associated security policy. Use the following query to verify the value that should be matched in the table.

    ```sql
    SELECT USER_NAME() 
    ```

1. Query the database tables to verify that row-level security is working as expected. Users should only see data that satisfies the security predicate defined in their role. For example:

    ```sql
    SELECT * FROM sampleschema.sampletable
    ```

1. Similar filtered results for the user will be filtered with other applications that use Microsoft Entra authentication for database access.

## 4. Monitor and maintain row-level security

Regularly monitor and update your row-level security policies as your security requirements evolve. Keep track of role assignments and ensure that users have the appropriate access.

## Related content

- [Row-level security in Fabric data warehousing](row-level-security.md)
- [Column-level security for Fabric data warehousing](column-level-security.md)
