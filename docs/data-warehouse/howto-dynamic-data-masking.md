---
# Required metadata
# For more information, see https://review.learn.microsoft.com/en-us/help/platform/learn-editor-add-metadata?branch=main
# For valid values of ms.service, ms.prod, and ms.topic, see https://review.learn.microsoft.com/en-us/help/platform/metadata-taxonomies?branch=main

title:       # Add a title for the browser tab
description: # Add a meaningful description for search results
author:      SQLStijn-MSFT # GitHub alias
ms.author:   stwynant # Microsoft alias
ms.service:  # Add the ms.service or ms.prod value
# ms.prod:   # To use ms.prod, uncomment it and delete ms.service
ms.topic:    # Add the ms.topic value
ms.date:     10/26/2023
---

# Implement dynamic data masking

Dynamic Data Masking is a cutting-edge data protection technology that helps organizations safeguard sensitive information within their databases. It allows you to define masking rules for specific columns, ensuring that only authorized users see the original data while concealing it for others. DDM provides an additional layer of security by dynamically altering the data presented to users, based on their access permissions.

__Prerequisites__

Before you begin, make sure you have the following:

1. A fabric workspace with an active capacity or trial capacity

1. Either the Administrator, Member or Contributor rights on the workspace or elevated permissions on the Warehouse/SQL Endpoint

1. A Fabric Warehouse or SQL Endpoint from Lakehouse

1. User/Roles & Tables you want to apply ddm to.

__Step 1: Connect to__

1. Open the fabric workspace and navigate to the Fabric Warehouse/SQL Endpoint you want to apply dynamic data masking to.

1. Log in using an account with elevated access on the Warehouse/SQL Endpoint. (Either Admin/Member/Contributor role on the workspace or Control Permissions on the warehouse/SQL Endpoint)

__Step 3: Configure Dynamic Data Masking__

1. In the Fabric workspace, navigate to your Warehouse/SQL Endpoint for Lakehouse.

1. Click on the ‘New Query’ option.

1. In your SQL script, you can define dynamic data masking rules using the __MASKED WITH FUNCTION__ clause. For example:



```tsql
CREATE TABLE dbo.EmployeeData (
    EmployeeID INT
    ,FirstName VARCHAR(50) MASKED WITH (FUNCTION = 'partial(1,"XXX-XX-",2)') NULL
    ,LastName VARCHAR(50) MASKED WITH (FUNCTION = 'default()') NULL
    ,SSN CHAR(11) MASKED WITH (FUNCTION = 'partial(0,"XXX-XX-",4)') NULL
    );
```

In this example, we have created a table __EmployeeData__ with DDM applied to the __FirstName__ and __SSN__ columns.

__Step 4: Execute the SQL Script__

1. click on the "Run" button to execute it.

1. Confirm the execution of the script.

1. The script will apply the specified dynamic data masking rules to the designated columns in your table.

__Step 5: Test Dynamic Data Masking__

1. Once the DDM rules are applied, you can test the masking by querying the table. Log in to a tool like Azure Data Studio or SQL Server Management Studio using the credentials with access to your Fabric Warehouse or Fabric SQL Endpoint

1. Run a query against the table, and you will notice that the masked data is displayed according to the rules you defined.

__Step 6: Manage and Modify DDM Rules__

1. To manage or modify existing DDM rules, return to the SQL script where you defined them.

1. Make the necessary changes to the rules.

1. Re-run the SQL script to apply the updated DDM rules.


