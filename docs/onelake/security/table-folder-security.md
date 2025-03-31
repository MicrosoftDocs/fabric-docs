---
title: Table and folder security
description: Learn how to use OneLake security (preview) to enforce access permissions at the table and folder level in OneLake.
ms.reviewer: aamerril
ms.author: kgremban
author: kgremban
ms.topic: how-to
ms.custom:
ms.date: 03/24/2025
#customer intent: As a [], I want to learn how to [] so that I can [].
---

# Table and folder security in OneLake (preview)

Table-level and folder-level security, or object level security (OLS), is a feature of OneLake security (preview) that allows for granting access to specific tables or folders in a data item. Using OLS lets you create permissions for both structured and unstructured data at the folder level.

[!INCLUDE [onelake-security-preview](../../includes/onelake-security-preview.md)]

## Prerequisites

* A Lakehouse in OneLake with OneLake data access roles turned on. For more information, see [Get started with OneLake data access roles](get-started-data-access-roles.md).

## Define security rules

Users can define object-level security on any folder within a data item. Because delta-parquet tables in OneLake are represented as folders, security can also be configured on tables. Likewise, schemas are also folders and can be secured similarly.

Use the following steps to define security roles for tables or folders.

1. Navigate to your Lakehouse and select **Manage OneLake data access (preview)**.

1. Select an existing role that you want to define table or folder security for, or select **New** to create a new role.

1. On the role details page, select **Add data**. This action opens the data browsing experience. 

   :::image type="content" source="./media/table-folder-security/add-data.png" alt-text="Screenshot that shows selecting 'add data' to edit a security role.":::

1. Expand the **Tables** or **Files** directories to browse to the items you want to include in the role. 

   * For tables, you can expand schemas to choose individual tables. 

   * For files, you can expand any number of folders to identify the right items. 

1. Select the checkbox next to the items you want to grant access to. You can select up to 500 items per role. 

1. Once you have made your selection, select **Add data** to save your changes and return to the data in role page 

   :::image type="content" source="./media/table-folder-security/add-selected-data.png" alt-text="Screenshot that shows selecting 'add data' to confirm data selection for a security role.":::

   Your changes to the role are saved automatically.
