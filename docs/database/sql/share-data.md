---
title: "Share data in your SQL database"
description: Learn how to share data in a SQL database in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: dlevy
ms.date: 11/06/2024
ms.topic: how-to
ms.custom: sfi-image-nochange
---
# Share data and manage access to your SQL database in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

Fabric makes it easy to share items via the share button in the workspace. Fabric SQL database extends this experience by making it possible to share an item using granular SQL permissions. This allows things like sharing a single table in a database.

## Prerequisites

- You need an existing Fabric capacity. If you don't, [start a Fabric trial](../../fundamentals/fabric-trial.md).
- Make sure that you [Enable SQL database in Fabric using Admin Portal tenant settings](enable.md).
- [Create a new workspace](../../fundamentals/workspaces.md) or use an existing Fabric workspace.
- [Create a new SQL database with the AdventureWorks sample data](load-adventureworks-sample-data.md) or use an existing database.

## Share a database

1. Open your workspace containing the database in the Fabric portal.
1. In the list of items, or in an open item, select the **Share** button. :::image type="content" source="media/share-data/share-button.png" alt-text="Screenshot of the Share button in the Fabric portal.":::
1. The **Grant people access** dialog opens. Enter the names of the people or groups that need access.
   :::image type="content" source="media/share-data/grant-people-access.png" alt-text="Screenshot of the Grant people access dialogue box from the Fabric portal.":::

   The dialog offers a few simple options to grant broad access to the SQL database for scenarios where a database has been created for a single user or purpose. We'll skip checking any of those boxes here.
1. Choose whether to notify recipients with an email and add a message.
1. Select **Grant**.
1. The users now have access to connect to the database but are unable to do anything yet. The users can be added to SQL roles by selecting **Manage SQL security** from the **Security** menu in the database editor.
1. Select the db_datareader role and then **Manage Access**.
1. Add the users to the role and select **Save**.
1. Select the db_datawriter role and then **Manage Access**.
1. Add the users to the role and select **Save**.

The users now have access to read and write every table within the database. They won't have rights on any other Fabric items in the workspace unless they have also been granted. Instead of the broad roles, consider that users could be granted rights on individual tables to follow the principle of least privilege.

> [!NOTE]
> Microsoft Purview protection policies can augment effective permission for database users. If your organization uses Microsoft Purview with Microsoft Fabric, see [Protect sensitive data in SQL database with Microsoft Purview protection policies](protect-databases-with-protection-policies.md).

## Related content

- [Share your SQL database and manage permissions](share-sql-manage-permission.md)
- [Protect sensitive data in SQL database with Microsoft Purview protection policies](protect-databases-with-protection-policies.md)

