---
title: OneLake row-level security (RLS) syntax
description: Reference for OneLake row-level security syntax, including the SQL placeholders and supported operators you use to define RLS rules.
ms.reviewer: aamerril
ms.topic: reference
ms.date: 07/27/2026
ai-usage: ai-assisted
---

# Row-level security syntax reference

This article documents the syntax for defining [row-level security (RLS)](./table-column-row-security.md#row-level-security) rules in OneLake security. To apply an RLS rule to a table, see [Create and manage OneLake security roles](./create-manage-roles.md).

RLS rules use SQL syntax to specify the rows that a user can see. The syntax takes the form of a SQL `SELECT` statement with the RLS rules defined in the `WHERE` clause. RLS rules support only the subset of SQL defined in this article. Queries with invalid RLS syntax, or RLS syntax that doesn't match the underlying table, result in no rows being shown to users, or query errors in the SQL analytics endpoint.

As you write RLS expressions, keep the following best practices in mind:

* Avoid vague or overly complex RLS expressions.
* Strongly typed expressions with integer or string lookups that use "=" are the most secure and easiest to understand.
* Use integer columns for sorting and greater-than or less-than operations.
* Avoid string equivalencies if you don't know the format of the input data, especially for Unicode characters or accent sensitivity.

Row-level security evaluates string data as case insensitive by using the following collation for sorting and comparisons: `Latin1_General_100_CI_AS_KS_WS_SC_UTF8`.

## Syntax

The maximum number of characters in a row-level security rule is 1000.

All row-level security rules take the following form:

```sql
SELECT * FROM {schema_name}.{table_name} WHERE {column_level_boolean_1}{column_level_boolean_2}...{column_level_boolean_N}
```

For example:

```sql
SELECT * FROM Sales WHERE Amount > 50000 AND State='CA'
```

| Placeholder | Description |
| ----------- | ---------- |
| {schema_name} | The name of the schema that contains {table_name}. If the item supports schemas, you must include {schema_name}. |
| {table_name} | The name of the table that the RLS predicate applies to. This value must exactly match the name of the table, or the RLS shows no rows. Use square brackets `[]` to escape table names with special characters. For example, `SELECT * FROM [dbo].[Secret.Table]`. |
| {column_level_boolean} | A Boolean statement containing the following components:<br><br>* Column name: The name of a column in {table_name}, as it appears in the Delta log schema. You can format column names as either {column_name} or {table_name}.{column_name}.<br>* Operator: One of the [supported operators](#supported-operators) that evaluates the column name and value to a Boolean value.<br>* Value: A static value or set of values to evaluate against.<br><br>You can have one or more Boolean statements separated by AND or OR. |

## Supported operators

Row-level security rules support the following operators and keywords:

| Operator | Description |
| -------- | ----------- |
| `=` (equals) | Evaluates to true if the two values are the same data type and exact matches. |
| `<>` (not equals) | Evaluates to true if the two values aren't the same data type and not exact matches. |
| `>` (greater than) | Evaluates to true if the column value is greater than the evaluation value. For string values, this operator uses bitwise comparison to determine if one string is greater than the other. |
| `>=` (greater than or equal to) | Evaluates to true if the column value is greater than or equal to the evaluation value. For string values, this operator uses bitwise comparison to determine if one string is greater than or equal to the other. |
| `<` (less than) | Evaluates to true if the column value is less than the evaluation value. For string values, this operator uses bitwise comparison to determine if one string is less than the other. |
| `<=` (less than or equal to) | Evaluates to true if the column value is less than or equal to the evaluation value. For string values, this operator uses bitwise comparison to determine if one string is less than or equal to the other. |
| `IN` | Evaluates to true if any of the evaluation values are the same data type and exactly match the column value. |
| `NOT` | Evaluates to true if any of the evaluation values aren't the same data type or not an exact match of the column value. |
| `AND` | Combines the previous statement and the subsequent statement by using a Boolean AND operation. Both statements must be true for the entire predicate to be true. |
| `OR` | Combines the previous statement and the subsequent statement by using a Boolean OR operation. One of the statements must be true for the entire predicate to be true. |
| `TRUE` | The Boolean expression for true. |
| `FALSE` | The Boolean expression for false. |
| `BLANK` | The blank data type, which you can use with the IS operator. For example, `row IS BLANK`. |
| `NULL` | The null data type, which you can use with the IS operator. For example, `row IS NULL`. |

## Related content

* [Row-level security in OneLake](./table-column-row-security.md#row-level-security)
* [Create and manage OneLake security roles](./create-manage-roles.md)
