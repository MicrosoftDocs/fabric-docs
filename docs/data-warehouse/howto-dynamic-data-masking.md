---
title: How to implement dynamic data masking in Synapse Data Warehouse
description: Learn how to implement dynamic data masking in Synapse Data Warehouse in Microsoft Fabric.
author:      SQLStijn-MSFT
ms.author:   stwynant 
ms.reviewer: wiassaf
ms.topic:  how-to
ms.date:  10/31/2023
---

# How to implement dynamic data masking in Synapse Data Warehouse

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Dynamic data masking is a cutting-edge data protection technology that helps organizations safeguard sensitive information within their databases. It allows you to define masking rules for specific columns, ensuring that only authorized users see the original data while concealing it for others. Dynamic data masking provides an additional layer of security by dynamically altering the data presented to users, based on their access permissions.

## Prerequisites

Before you begin, make sure you have the following:

1. A Microsoft Fabric workspace with an active capacity or trial capacity.
1. A [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and [!INCLUDE [fabric-se](includes/fabric-se.md)].
1. Either the Administrator, Member, or Contributor rights on the workspace or elevated permissions on the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)].
1. A table where dynamic data masking should be applied.
1. Users or roles to test.

__Step 1: Connect to__

1. Open the fabric workspace and navigate to the Fabric Warehouse/SQL Endpoint you want to apply dynamic data masking to.

1. Log in using an account with elevated access on the Warehouse/SQL Endpoint. (Either Admin/Member/Contributor role on the workspace or Control Permissions on the warehouse/SQL Endpoint)

__Step 3: Configure dynamic data masking__

1. In the Fabric workspace, navigate to your Warehouse/SQL Endpoint for Lakehouse.

1. Click on the 'New Query' option.

1. In your SQL script, you can define dynamic data masking rules using the `MASKED WITH FUNCTION` clause. For example:



```sql
CREATE TABLE dbo.EmployeeData (
    EmployeeID INT
    ,FirstName VARCHAR(50) MASKED WITH (FUNCTION = 'partial(1,"XXX-XX-",2)') NULL
    ,LastName VARCHAR(50) MASKED WITH (FUNCTION = 'default()') NULL
    ,SSN CHAR(11) MASKED WITH (FUNCTION = 'partial(0,"XXX-XX-",4)') NULL
    );
```

In this example, we have created a table `EmployeeData` with dynamic data masking applied to the `FirstName` and `SSN` columns.

__Step 4: Execute the SQL Script__

1. click on the "Run" button to execute it.

1. Confirm the execution of the script.

1. The script will apply the specified dynamic data masking rules to the designated columns in your table.

__Step 5: Test dynamic data masking__

1. Once the dynamic data masking rules are applied, you can test the masking by querying the table. Log in to a tool like Azure Data Studio or SQL Server Management Studio using the credentials with access to your Fabric Warehouse or Fabric SQL Endpoint

1. Run a query against the table, and you will notice that the masked data is displayed according to the rules you defined.

__Step 6: Manage and Modify dynamic data masking rules__

1. To manage or modify existing dynamic data masking rules, return to the SQL script where you defined them.

1. Make the necessary changes to the rules.

1. Re-run the SQL script to apply the updated dynamic data masking rules.


## Related content

- [Dynamic data masking in Fabric data warehousing](dynamic-data-masking.md)
- [Workspace roles in Fabric data warehousing](workspace-roles.md)
- [Column-level security in Fabric data warehousing](column-level-security.md)
- [Row-level security in Fabric data warehousing](row-level-security.md)
- [Security for data warehousing in Microsoft Fabric](security.md)
