---
title: Column-level security
description: Learn how to use OneLake security (preview) to enforce access permissions at the column level in OneLake.
ms.reviewer: aamerril
ms.author: kgremban
author: kgremban
ms.topic: how-to
ms.custom:
ms.date: 09/05/2025
#customer intent: As a [], I want to learn how to [] so that I can [].
---

# Column-level security in OneLake (preview)

Column-level security (CLS) is a feature of [OneLake security (preview)](./get-started-onelake-security.md) that allows you to have access to selected columns in a table instead of full access to the table. CLS lets you specify a subset of tables that users can access. Any columns that are removed from the list aren't visible to users.

## Prerequisites

* An item in OneLake with OneLake security turned on. For more information, see [Get started with OneLake data access roles](get-started-onelake-security.md).
* Switch the SQL analytics endpoint on the lakehouse to **User's identity** mode through the **Security** tab.
* For creating semantic models, use the steps to create a [DirectLake model](../../fundamentals/direct-lake-power-bi-desktop.md).
* For a full list of limitations, see the [known limitations section.](./data-access-control-model.md#onelake-security-limitations)

## Enforce column-level security

OneLake security CLS gets enforced in one of the following two ways:

* **Filtered tables in Fabric engines:** Queries to the Fabric engines, like Spark notebooks, result in the user seeing only the columns they're allowed to see per the CLS rules.
* **Blocked access to tables:** Tables with CLS rules applied to them can't be read outside of supported Fabric engines.

For filtered tables, the following behaviors apply:

* CLS rules don't restrict access to users with the Admin, Member, and Contributor roles.
* If the CLS rule has a mismatch with the table it's defined on, the query fails and no columns are returned. For example, if CLS is defined for a column that isn't part of the table.
* Queries of CLS tables fail with an error if a user is part of two different roles and one of the roles has row-level security (RLS). 
* CLS rules can only be enforced for Delta parquet table objects. 
  * CLS rules that are applied to non-Delta table objects block access to the entire table for members of the role. 
* If a user runs a `select *` query on a table where they only have access to some of the columns, CLS rules behave differently depending on the Fabric engine.
  * Spark notebooks: The query succeeds and only shows the allowed columns.
  * SQL analytics Endpoint: Column access is blocked for the columns the user can't access.
  * Semantic models: Column access is blocked for the columns the user can't access. 

## Define column-level security rules

You can define column-level security as part of a OneLake security role for any Delta-parquet table in the **Tables** section of an item. CLS is always specified for a table and is either enabled or disabled. By default, CLS is disabled and users have access to all columns. Users can enable CLS and remove columns from the list to revoke access.

> [!IMPORTANT]
> Removing access to a column doesn't deny access to that column if another role grants access to it.

Use the following steps to define column-level security:

1. Navigate to your data item and select **Manage OneLake security (preview)**.

1. Select an existing role that you want to define table or folder security for, or select **New** to create a new role.

1. On the role details page, select more options (**...**) next to the table you want to define CLS for, then select **Column security (preview)**. 

   :::image type="content" source="./media/column-level-security/select-column-security.png" alt-text="Screenshot that shows selecting 'column security' to edit permissions on a table.":::

1. By default, CLS for a table is disabled. Select **Enable CLS** or create a **New rule** to enable it. 

   The UI populates with a list of columns for that table that the users are allowed to see. By default, it shows all of the columns. 

1. To restrict access to a column, select the checkbox next to the column name, then select **Remove**. At least one column must remain in the list of allowed columns. 

1. Select **Save** to update the role. 

1. If you want to add a removed column, select **New rule**. This action adds a new CLS rule entry to the end of the list. Then, use the dropdown to choose the column you want to include in the access. 

1. Once you complete your changes, select **Save**.

### Enable OneLake security for SQL analytics endpoint

Before you can use OneLake security with SQL analytics endpoint, you must enable its **User's identity mode**. Newly created SQL analytics endpoints will default to user's identity mode, so these steps must be followed for existing SQL analytics endpoints.

> [!NOTE]
> Switching to **User's identity** mode only needs to be done once per SQL analytics endpoint. Endpoints that are not switched to user's identity mode will continue to use a delegated identity to evaluate permissions.

1. Navigate to SQL analytics endpoint.

1. In the SQL analytics endpoint experience, select the **Security** tab in the top ribbon.

1. Select **User's identity** under **OneLake access mode**.

   :::image type="content" source="./media/column-level-security/sqlaep-enable-userid.png" alt-text="Screenshot that shows selecting 'user identity' to enable OneLake security for SQL analytics endpoint.":::

1. In the prompt, select **Yes, use the user's identity**. 

   :::image type="content" source="./media/column-level-security/sqlaep-prompt.png" alt-text="Screenshot that shows user prompt which must be accepted to enable OneLake security for table read access.":::

Now the SQL analytics endpoint is ready to use with OneLake security.

[!INCLUDE [onelake-rls-cls](../../includes/onelake-rls-cls.md)]
