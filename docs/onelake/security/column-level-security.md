---
title: Column-level security
description: Learn how to use OneLake security (preview) to enforce access permissions at the column level in OneLake.
ms.reviewer: aamerril
ms.author: kgremban
author: kgremban
ms.topic: how-to
ms.custom:
ms.date: 03/13/2025
#customer intent: As a [], I want to learn how to [] so that I can [].
---

# Column-level security in OneLake (preview)

Column-level security (CLS) is a feature of OneLake security (preview) that allows users to have access to selected columns in a table instead of full access to the table. CLS allows for specifying a subset of tables that users have access to. Any columns that are removed from the list aren't visible to users. These CLS rules are part of a OneLake security role and apply to all members of that role.

[!INCLUDE [onelake-security-preview](../../includes/onelake-security-preview.md)]

## Enforce column-level security

OneLake security CLS gets enforced in one of two ways:

* **Filtered tables in Fabric engines:** Queries to the list of supported Fabric engines, like Spark notebooks, result in the user seeing only the columns they are allowed to see per the CLS rules.
* **Blocked access to tables:** Tables with CLS rules applied to them can't be read outside of supported Fabric engines.

For filtered tables, the following behaviors apply:

* Users in the Admin, Member, and Contributor roles aren't restricted by CLS rules. 
* If the CLS rule has a mismatch with the table it is defined on, the query fails and no columns will be returned. For example, if CLS is defined for a column that isn't part of the table.
* Queries of CLS tables fail with an error if a user is part of two different roles and one of the roles has row-level security (RLS). 
* CLS rules can only be enforced for objects that are Delta parquet tables. 
  * CLS rules that are applied to non-Delta table objects instead block access to the entire table for members of the role. 
* If a user runs a `select *` query for a table where they only have access to some of the columns, CLS rules behave differently depending on the Fabric engine.
  * Spark notebooks: The query succeeds and only shows the allowed columns.
  * SQL Analytics Endpoint: Column access is blocked for the columns the user can't access.
  * Semantic models: Column access is blocked for the columns the user can't access. 

## Define column-level security rules

Users can define column-level security as part of a OneLake security role for any Delta-parquet table in the **Tables** section of an artifact. CLS is always specified for a table and is either enabled or disabled. By default, CLS is disabled and users have access to all columns. Users can enable CLS and remove columns from the list to revoke access.

>[!IMPORTANT]
>Removing access to a column doesn't deny access to that column if another role grants access to it.

Use the following steps to define column-level security:

1. Open the manage roles UX from the item where you are defining security. 

1. Select the role that you want to define CLS for. 

1. Select more options (**...**) next to the table that you want to define CLS for, then select **Column security**. 

1. By default, CLS for a table is disabled. Select **Enable CLS** or **New rule** to enable it. 

   The UI populates with a list of columns for that table that the users are allowed to see. This starts as all of the columns. 

1. To restrict access to a column, select the checkbox next to the column name. At least one column must be left unchecked. 

1. Select **Remove** to delete the rules for those columns. 

1. Select **Save** to update the role. 

1. If you want to re-add a column, select **New rule**. This action adds a new CLS rule entry to the end of the list. You can then use the dropdown to choose the column you want to include in the access. 

1. Once complete your changes, select **Save** to publish the role. 

[!INCLUDE [onelake-rls-cls](../../includes/onelake-rls-cls.md)]
