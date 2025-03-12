---
title: Table and folder security
description: Learn how to use OneLake security (preview) to enforce access permissions at the table and folder level in OneLake.
ms.reviewer: aamerril
ms.author: kgremban
author: kgremban
ms.topic: how-to
ms.custom:
ms.date: 05/09/2024
#customer intent: As a [], I want to learn how to [] so that I can [].
---

# Table and folder security in OneLake (preview)

Table-level and folder-level security, or object level security (OLS), is a feature of OneLake security (preview) that allows for granting access to specific tables or folders in a data item. Using OLS lets you create permissions for both structured and unstructured data at the folder level.

## Define security rules

Users can define object-level security on any folder within a data item. Because delta-parquet tables in OneLake are represented as folders, security can also be configured on tables. Likewise, schemas are also folders and can be secured similarly.

Use the following steps to define security roles for tables or folders.

1. Open the manage roles UX from the item where you are defining security. 

1. Select the role you want to define table or folder security for. 

1. Select + Add data from the ribbon to open the data browsing experience. 

1. For data items that support unstructured data, you will see a Files top level folder in addition to the Tables folder. 

1. Expand Tables or Files to browse to the items you want to include in the role. 

   * For Tables, you can expand schemas to choose individual tables. 

   * For Files, you can expand any number of folders to identify the right items. 

1. Select the checkbox next to the items you want to grant access to. You can select up to 500 items per role. 

1. Once you have made your selection, choose Add data to save your changes and return to the data in role page 

## Differences between tables and folders

<!--TODO-->