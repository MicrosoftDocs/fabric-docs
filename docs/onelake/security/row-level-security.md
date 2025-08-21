---
title: Row-level security
description: Learn how to use OneLake security (preview) to enforce access permissions at the row level in OneLake.
ms.reviewer: aamerril
ms.author: kgremban
author: kgremban
ms.topic: how-to
ms.custom:
ms.date: 03/24/2025
#customer intent: As a [], I want to learn how to [] so that I can [].
---

# Row-level security in OneLake (preview)

Row-level security (RLS) is a feature of OneLake security (preview) that allows for defining row-level data restrictions for tabular data stored in OneLake. Users can define roles in OneLake that contain rules for filtering rows of data for members of that role. When a member of an RLS role goes to query that data, the RLS rules are evaluated and only allowed rows are returned.

## Prerequisites

* An item in OneLake with OneLake security turned on. For more information, see [Get started with OneLake data access roles](get-started-data-access-roles.md).
* Switch the SQL Analytics Endpoint on the lakehouse to "User's identity" mode through the **Security** tab.
* For creating semantic models, use the steps to create a [DirectLake model](../../fundamentals/direct-lake-power-bi-desktop.md).
* For a full list of limitations, see the [known limitations section.](./data-access-control-model.md#onelake-security-limitations)

## Enforce row-level security

OneLake security RLS gets enforced in one of two ways: 

* **Filtered tables in Fabric engines:** Queries to the list of supported Fabric engines, like Spark notebooks, result in the user seeing only the rows they're allowed to see per the RLS rules.
* **Blocked access to tables:** Tables with RLS rules applied to them can't be read outside of supported Fabric engines.

For filtered tables, the following behaviors apply:

* RLS rules don't restrict access for users in the Admin, Member, and Contributor roles.
* If the RLS rule has a mismatch with the table it's defined on, the query fails and no rows are returned. For example, if the RLS rule references a column that isn't part of the table.
* Queries of RLS tables fail with an error if a user is part of two different roles and one of the roles has column-level security (CLS). 
* RLS rules can only be enforced for objects that are Delta parquet tables. 
  * RLS rules that are applied to non-Delta table objects instead block access to the entire table for members of the role.
* Access to a table might be blocked if the RLS statement contains syntax errors that prevent it from being evaluated.

## Define row-level security rules

You can define row-level security rules as part of any OneLake security role that grants access to table data in Delta parquet format. Rows are a concept only relevant to tabular data, so RLS definitions aren't allowed for non-table folders or unstructured data.  

RLS rules use SQL syntax to specify the rows that a user can see. This syntax takes the form of a SQL `SELECT` statement with the RLS rules defined in the `WHERE` clause. RLS rules only support a subset of the SQL language as defined in [Syntax rules](#syntax-rules). Queries with invalid RLS syntax or RLS syntax that doesn't match the underlying table result in no rows being shown to users, or query errors in the SQL analytics endpoint. 

As a best practice, avoid using vague or overly complex RLS expressions. Strongly-typed expressions with integer or string lookups with "=" will be the most secure and easy to understand.

Use the following steps to define RLS rules: 

1. Navigate to your Lakehouse and select **Manage OneLake security (preview)**.

1. Select an existing role that you want to define table or folder security for, or select **New** to create a new role.

1. On the role details page, select more options (**...**) next to the table you want to define RLS for, then select **Row security (preview)**. 

   :::image type="content" source="./media/row-level-security/select-row-security.png" alt-text="Screenshot that shows selecting 'row security' to edit permissions on a table.":::

1. Type the SQL statement for defining which rows you want users to see in the code editor. Use the [Syntax rules](#syntax-rules) section for guidance. 

1. Select **Save** to confirm the row security rules.

### Enable OneLake security for SQL analytics endpoint

Before you can use OneLake security with SQL analytics endpoint, you must enable its **User's identity mode**. Newly created SQL analytics endpoints will default to user's identity mode, so these steps must be followed for existing SQL analytics endpoints.

> [!NOTE]
> Switching to **User's identity** mode only needs to be done once per SQL analytics endpoint. Endpoints that are not switched to user's identity mode will continue to use a delegated identity to evaluate permissions.

1. Navigate to SQL analytics endpoint.

1. In the SQL analytics endpoint experience, select the **Security** tab in the top ribbon.

1. Select **User's identity** under **OneLake access mode**.

   :::image type="content" source="./media/row-level-security/sqlaep-enable-userid.png" alt-text="Screenshot that shows selecting 'user identity' to enable OneLake security for SQL analytics endpoint.":::

1. In the prompt, select **Yes, use the user's identity**. 

   :::image type="content" source="./media/row-level-security/sqlaep-prompt.png" alt-text="Screenshot that shows user prompt which must be accepted to enable OneLake security for table read access.":::

Now the SQL analytics endpoint is ready to use with OneLake security.

## Syntax rules

All row-level security rules take the following form:

```SELECT * FROM {schema_name}.{table_name} WHERE {column_level_boolean_1}{column_level_boolean_2}...{column_level_boolean_N}```

For example:

```SELECT * FROM Sales WHERE Amount>'50000' AND State='CA'```

The maximum number of characters in a row-level security rule is 1000.

| Placeholder | Description |
| ----------- | ---------- |
| {schema_name} | The name of the schema where {table_name} is located. If the artifact supports schemas, then {schema_name} is required. |
| {table_name} | The name of the table that the RLS predicate gets applied to. This value must be an exact match with the name of the table, or the RLS results in no rows being shown. |
| {column_level_boolean} | A Boolean statement containing the following components:<br><br>* Column name: The name of a column in {table_name} as specified in the Delta log schema. Column names can be formatted either as {column_name} or {table_name}.{column_name}.<br>* Operator: One of the [Supported operators](#supported-operators) that evaluates the column name and value to a Boolean value.<br>* Value: A static value or set of values to be evaluated against.<br><br>You can have one or more Boolean statements separated by AND or OR. |

### Supported operators

Row-level security rules support the following list of operators and keywords:

| Operator | Description |
| -------- | ----------- |
| = (equals) | Evaluates to true if the two values are the same data type and exact matches. |
| <> (not equals) | Evaluates to true if the two values aren't the same data type and not exact matches. |
| > (greater than) | Evaluates to true if the column value is greater than the evaluation value. For string values, this operator uses bitwise comparison to determine if one string is greater than the other. |
| >= (greater than or equal to) | Evaluates to true if the column value is greater than or equal to the evaluation value. For string values, this operator uses bitwise comparison to determine if one string is greater than or equal to the other. |
| < (less than) | Evaluates to true if the column value is less than the evaluation value. For string values, this operator uses bitwise comparison to determine if one string is less than the other. |
| <= (less than or equal to) | Evaluates to true if the column value is less than or equal to the evaluation value. For string values, this operator uses bitwise comparison to determine if one string is less than or equal to the other. |
| IN | Evaluates to true if any of the evaluation values are the same data type and exactly match the column value. |
| NOT | Evaluates to true if any of the evaluation values aren't the same data type or not an exact match of the column value. |
| AND | Combines the previous statement and the subsequent statement using a Boolean AND operation. Both statements must be true for the entire predicate to be true. |
| OR | Combines the previous statement and the subsequent statement using a Boolean OR operation. One of the statements must be true for the entire predicate to be true. |
| TRUE | The Boolean expression for true. |
| FALSE | The Boolean expression for false. |
| BLANK | The blank data type, which can be used with the IS operator. For example, `row IS BLANK`.|
| NULL | The null data type, which can be used with the IS operator. For example, `row IS NULL`.|


[!INCLUDE [onelake-rls-cls](../../includes/onelake-rls-cls.md)]
