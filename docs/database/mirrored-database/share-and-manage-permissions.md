---
title: Share Your Mirrored Database and Manage Permissions
description: Learn how to share a Fabric mirrored database and manage permissions.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: jingwang, mesrivas 
ms.date: 04/06/2025
ms.topic: conceptual
---
# Share your mirrored database and manage permissions

When you share a mirrored database, you grant other users or groups access to the mirrored database without giving access to the workspace and the rest of its items. Sharing a mirrored database also grants access to the SQL analytics endpoint and the associated default semantic model.

> [!NOTE]
> You must be an admin or member in your workspace to share an item in Microsoft Fabric.

## Share a mirrored database

To share a mirrored database, navigate to your workspace, and select **Share** next to the mirrored database name. 

You're prompted with options to select who you would like to share the mirrored database with, what permissions to grant them, and whether they'll be notified by email.

By default, sharing a mirrored database grants users Read permission to the mirrored database, the associated SQL analytics endpoint, and the default semantic model. In addition to these default permissions, you can grant:

- **"Read all SQL analytics endpoint data"**: Grants the recipient the ReadData permission for the SQL analytics endpoint, allowing the recipient to read all data via the SQL analytics endpoint using Transact-SQL queries.

- **"Read all OneLake data"**: Grants the ReadAll and SubscribeOneLakeEvents permission to the recipient, allowing them to access the mirrored data in OneLake, for example, by using Spark or [OneLake Explorer](explore-data-directly.md), and subscribe to OneLake events in Fabric Real-Time Hub.

- **"Build reports on the default semantic model"**: Grants the recipient the Build permission for the default semantic model, enabling users to create Power BI reports on top of the semantic model.

- **"Read and write"**: Grants the recipient the Write permission for the mirrored database, allowing them to edit the mirrored database configuration and read/write data from/to the landing zone.

## Manage permissions

To review the permissions granted to a mirrored database, its SQL analytics endpoint, or its default semantic model, navigate to one of these items in the workspace and select the **Manage permissions** quick action.

If you have the **Share** permission for a mirrored database, you can also use the **Manage permissions** page to grant or revoke permissions. To view existing recipients, select the context menu (**...**) at the end of each row to add or remove specific permission. 

> [!NOTE]
> When mirroring data from Azure SQL Database, Azure SQL Managed Instance, Azure Database for PostgreSQL or SQL Server 2025, its System Assigned Managed Identity needs to have "Read and write" permission to the mirrored database. If you create the mirrored database from the Fabric portal, the permission is granted automatically. If you use API to create the mirrored database, make sure you grant the permission following above instruction. You can search the recipient by specifying the name of your Azure SQL Database logical server or Azure SQL Managed Instance.

## Known issues
The sharing dialog for a mirrored database provides the option to subscribe to OneLake events. Currently, permission to subscribe to OneLake events is granted along with the Read All OneLake data permission.


## Related content

- [What is Mirroring in Fabric?](overview.md)
- [What is the SQL analytics endpoint for a lakehouse?](../../data-engineering/lakehouse-sql-analytics-endpoint.md)
