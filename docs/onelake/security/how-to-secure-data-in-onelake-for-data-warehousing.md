---
title: How to secure data in OneLake for data warehousing
description: Get started with securing your data in OneLake with this overview of the concepts and capabilities.
ms.reviewer: eloldag
ms.author: aamerril
author: aamerril
ms.topic: conceptual
ms.custom:
  - ignite-2023
ms.date: 11/15/2023
---

# How-to secure a lakehouse for Data Warehousing teams

## Introduction

In this article, we will provide an overview of how to configure security for a lakehouse in Fabric for use with SQL users. This could be business analysts consuming data through SQL, report builders, or data engineers creating new tables and views. 
Security features
Microsoft Fabric uses a multi-layer security model with different controls available at different levels in order to provide only the minimum needed permissions. For full details on the different security features available in Fabric see this document. (link )
The SQL Warehouse and SQL Endpoint also allow for the defining of native SQL security. SQL security uses the full library of T-SQL security constructs to allow for granular access control of tables, views, rows, and columns with an item. For more information on SQL security see here . 
The SQL permissions that are configured in the SQL warehouse and endpoint only apply to queries that are executed against the SQL warehouse or endpoint. The underlying data lives in OneLake, but access to OneLake data is controlled separately through OneLake data access roles. To ensure users with SQL specific permissions do not see data they aren’t given access to in SQL, do not include those users in a OneLake data access role. 
 
## Secure by use case

Security in Microsoft Fabric is optimized around securing data for specific use cases. A use case is a set of users needing specific access and accessing data through a given engine. For SQL scenarios, some common use cases are:
-	SQL writers: Users that need to create new tables, view, or write data to existing tables.
-	SQL readers: Users that need to read data using SQL queries. They could be accessing the SQL connection directly or through another service like Power BI.
We can then align each use case with the necessary permissions in Fabric. 

### SQL Write access

There are two ways for a user to have write access to a SQL warehouse or SQL endpoint. The first is through Fabric workspace roles. (link) There are three workspace roles that grant write permissions, and each role automatically translates to a corresponding role in SQL that grants equivalent write access. The second way is by having only read access to the SQL engine but having custom SQL permissions that grant write access to some or all the data.
If a user needs write access to all the SQL warehouses and SQL endpoints in a workspace, the workspace role is recommended. In general, unless a user needs to be able to assign other users to workspace roles the Contributor role should be used. 
If a user only needs to write to specific SQL warehouses and endpoint, then granting them direct access through SQL permissions is recommended.

### Read access

For users that need to read data using pipelines or Spark notebooks, permissions are governed by the Fabric item permissions together with the OneLake data access roles. The Fabric item permissions what items a user can see and how they can access that item. The OneLake data access roles govern what data the user can access through experiences that leverage OneLake. 
 
For the use cases we have defined (read lakehouse data through Spark and notebooks) we first need to grant the users read access to the lakehouse. This can be done by clicking the Share button on a lakehouse either from the workspace page or from within the lakehouse UI. Enter the email addresses or security group for those users and click share. (leave the Additional permissions boxes unchecked) 
Next, navigate to the lakehouse UI and click the Manage OneLake data access (preview) button. Using this experience you can create roles that grant users access to see and read from specific folders in the lakehouse. Access to folders is disallowed by default. Users who are added to a role then are granted access to the folders covered by that role. To learn more about configuring OneLake data access roles click here . 
!!Important!! All lakehouses have a DefaultReader role that grants access to the lakehouse data. If a user has the ReadAll permission, they will not be restricted by other data access roles. Make sure that any users that are included in a data access role are not also part of the DefaultReader role or remove the DefaultReader role. Otherwise they will maintain full access to the data. 
Use with shortcuts 
Shortcuts are a OneLake feature that allow for data to be referenced from one location without physically copying the data. Shortcuts are a powerful tool that allow for data from one lakehouse to be easily reused in other locations without making duplicate copies of data. 
You can secure data for use with shortcuts in the same way as the pipeline and notebook scenarios in the Read access section above. After configuring the data access roles, users from other lakehouses will only be able to create shortcuts to folders they have access to. This allows for data mesh architectures to be easily. Each downstream workspace can have its own data access role granting access to only the tables they are allowed to see. The data can then be reused in the downstream workspace without the source data leaving control of the workspace owners.
 

## Related content

- [OneLake data access roles (preview)](/security/get-started-data-access-roles.md)
- [OneLake data access control model](../security/data-access-control-model.md)
- [Workspace roles](../get-started/roles-workspaces.md)
- [OneLake security](onelake-security.md)
- [Share items](../get-started/share-items.md)
