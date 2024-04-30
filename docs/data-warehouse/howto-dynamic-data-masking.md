---
title: How to implement dynamic data masking in Synapse Data Warehouse
description: Learn how to implement dynamic data masking in Synapse Data Warehouse in Microsoft Fabric.
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

# How to implement dynamic data masking in Synapse Data Warehouse

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Dynamic data masking is a cutting-edge data protection technology that helps organizations safeguard sensitive information within their databases. It allows you to define masking rules for specific columns, ensuring that only authorized users see the original data while concealing it for others. Dynamic data masking provides an additional layer of security by dynamically altering the data presented to users, based on their access permissions.

For more information, see [Dynamic data masking in Fabric data warehousing](dynamic-data-masking.md).

## Prerequisites

Before you begin, make sure you have the following:

1. A Microsoft Fabric workspace with an active capacity or trial capacity.
1. A [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. 
    1. Dynamic data masking works on [!INCLUDE [fabric-se](includes/fabric-se.md)]. You can add masks to existing columns using `ALTER TABLE ... ALTER COLUMN` as demonstrated later in this article.
    1. This exercise uses a [!INCLUDE [fabric-dw](includes/fabric-dw.md)].
1. To administer, a user with the Administrator, Member, or Contributor rights on the workspace, or elevated permissions on the [!INCLUDE [fabric-dw](includes/fabric-dw.md)].
    1. In this tutorial, the "admin account".
1. To test, a user without the Administrator, Member, or Contributor rights on the workspace, and without elevated permissions on the [!INCLUDE [fabric-dw](includes/fabric-dw.md)].
    1. In this tutorial, the "test user".

### 1. Connect

1. Open the Fabric workspace and navigate to the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] you want to apply dynamic data masking to.
1. Sign in using an account with elevated access on the [!INCLUDE [fabric-dw](includes/fabric-dw.md)], either Admin/Member/Contributor role on the workspace or Control Permissions on the [!INCLUDE [fabric-dw](includes/fabric-dw.md)].

### 2. Configure dynamic data masking

1. Sign into the Fabric portal with your admin account.
1. In the Fabric workspace, navigate to your [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and [!INCLUDE [fabric-se](includes/fabric-se.md)] for Lakehouse.
1. Select the **New SQL query** option, and under **Blank**, select **New SQL query**.
1. In your SQL script, define dynamic data masking rules using the `MASKED WITH FUNCTION` clause. For example:
    
    ```sql
    CREATE TABLE dbo.EmployeeData (
        EmployeeID INT
        ,FirstName VARCHAR(50) MASKED WITH (FUNCTION = 'partial(1,"-",2)') NULL
        ,LastName VARCHAR(50) MASKED WITH (FUNCTION = 'default()') NULL
        ,SSN CHAR(11) MASKED WITH (FUNCTION = 'partial(0,"XXX-XX-",4)') NULL
        ,email VARCHAR(256) NULL
        );
    GO
    INSERT INTO dbo.EmployeeData
        VALUES (1, 'TestFirstName', 'TestLastName', '123-45-6789','email@youremail.com');
    GO
    INSERT INTO dbo.EmployeeData
        VALUES (2, 'First_Name', 'Last_Name', '000-00-0000','email2@youremail2.com');
    GO
    ```

    - The `FirstName` column shows only the first and last two characters of the string, with `-` in the middle.
    - The `LastName` column shows `XXXX`.
    - The `SSN` column shows `XXX-XX-` followed by the last four characters of the string.
1. Select the **Run** button to execute the script.
1. Confirm the execution of the script.
1. The script will apply the specified dynamic data masking rules to the designated columns in your table. 

### 3. Test dynamic data masking

Once the dynamic data masking rules are applied, you can test the masking by querying the table with a test user who does not have the Administrator, Member, or Contributor rights on the workspace, or elevated permissions on the [!INCLUDE [fabric-dw](includes/fabric-dw.md)].

1. Sign in to a tool like Azure Data Studio or SQL Server Management Studio as the test user, for example TestUser@contoso.com.
1. As the test user, run a query against the table. The masked data is displayed according to the rules you defined.
    ```sql
    SELECT * FROM dbo.EmployeeData;
    ```
1. With your admin account, grant the `UNMASK` permission from the test user.
    ```sql
    GRANT UNMASK ON dbo.EmployeeData TO [TestUser@contoso.com];
    ```
1. As the test user, verify that a user signed in as TestUser@contoso.com can see unmasked data.
    ```sql
    SELECT * FROM dbo.EmployeeData;
    ``` 
1. With your admin account, revoke the `UNMASK` permission from the test user.
    ```sql
    REVOKE UNMASK ON dbo.EmployeeData TO [TestUser];
    ```
1. Verify that the test user cannot see unmasked data, only the masked data.
    ```sql
    SELECT * FROM dbo.EmployeeData;
    ```
1. With your admin account, you can grant and revoke the `UNMASK` permission to a role
    ```sql
    GRANT UNMASK ON dbo.EmployeeData TO [TestRole];
    REVOKE UNMASK ON dbo.EmployeeData TO [TestRole];
    ```

### 4. Manage and modify dynamic data masking rules

To manage or modify existing dynamic data masking rules, create a new SQL script.

1. You can add a mask to an existing column, using the `MASKED WITH FUNCTION` clause:

    ```sql
    ALTER TABLE dbo.EmployeeData
    ALTER COLUMN [email] ADD MASKED WITH (FUNCTION = 'email()');
    GO
    ```

    ```sql
    ALTER TABLE dbo.EmployeeData 
    ALTER COLUMN [email] DROP MASKED;
    ```

### 5. Cleanup

1. To clean up this testing table:
    ```sql
    DROP TABLE dbo.EmployeeData;
    ```

## Related content

- [Dynamic data masking in Fabric data warehousing](dynamic-data-masking.md)
- [Workspace roles in Fabric data warehousing](workspace-roles.md)
- [Column-level security in Fabric data warehousing](column-level-security.md)
- [Row-level security in Fabric data warehousing](row-level-security.md)
- [Security for data warehousing in Microsoft Fabric](security.md)
