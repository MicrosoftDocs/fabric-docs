---
title: OneLake table, column, and row-level security
description: Learn how table and folder, column-level, and row-level security in OneLake control access to your data and how each is enforced.
ms.reviewer: aamerril
ms.topic: concept-article
ms.date: 07/27/2026
ai-usage: ai-assisted
#customer intent: As a data owner, I want to understand how table, column, and row-level security work in OneLake so that I can choose the right controls for my data.
---

# Table, column, and row-level security in OneLake

OneLake security roles control who can access the data in your Fabric items. Sometimes granting or denying access to a whole item is too coarse. You might need to hide sensitive columns, limit which rows a user sees, or expose only certain tables. Within a role, you can refine access at three levels of granularity: object-level security for tables and folders, column-level security (CLS) for individual columns, and row-level security (RLS) for individual rows.

This article explains what each control does and how OneLake enforces it. To author these controls, see [Create and manage OneLake security roles](./create-manage-roles.md).

OneLake security roles use a grant model to give access to data. You can't deny access that is granted through a different role or permission model. For that reason, these controls don't restrict access for users in the Admin, Member, and Contributor roles at the workspace level.

## Table and folder security

Table-level and folder-level security, also called object-level security (OLS), lets you grant access to specific tables or folders in a data item. With OLS, you create permissions for both structured and unstructured data at the folder level. Because Delta Parquet tables in OneLake are represented as folders, you can secure tables the same way you secure folders. Schemas are also folders, so you can secure them the same way.

## Column-level and row-level security

OneLake security enforces column-level and row-level security in one of two ways:

* **Filter tables:** A user who queries a table by using a Fabric engine, like Spark notebooks, or an [authorized third-party engine](./onelake-security-integrations-overview.md) sees only the columns or rows that the CLS or RLS rules allow.
* **Block tables:** A user who queries a table by using an unauthorized third-party engine can't read the table.

OneLake security can enforce CLS and RLS rules for Delta Parquet tables or [virtualized Iceberg tables](../onelake-iceberg-tables.md). Rules applied to other table types block access to the entire table for members of the role.

If a CLS or RLS rule has a mismatch with the table it's defined on, the query fails and returns no data. For example, a mismatch occurs when a rule references a column that isn't in the table.

### Column-level security

Column-level security (CLS) grants access to selected columns in a table instead of the full table. Data in columns that you remove from the allowed list isn't visible to users.

For tables filtered with CLS, the following behaviors apply:

* If a user runs a `select *` query on a table where they have access to only some of the columns, CLS rules behave differently depending on the Fabric engine:
  * Spark notebooks: The query succeeds and shows only the allowed columns.
  * SQL analytics endpoint: The query returns an error and blocks access to the columns the user can't access.
  * Semantic models: The query returns an error and blocks access to the columns the user can't access.
* The name of a secured column might be visible in certain experiences, but the data values never appear.

### Row-level security

Row-level security (RLS) defines row-level data restrictions for tabular data stored in OneLake. You define roles that contain rules for filtering rows of data for members of the role. When a member of an RLS role queries the data, OneLake evaluates the RLS rules and returns only the allowed rows. Rows are a concept relevant only to tabular data, so you can't define RLS for non-table folders or unstructured data.

For tables filtered with RLS, the following behaviors apply:

* Access to a table might be blocked if the RLS statement contains syntax errors that prevent it from being evaluated.

For the syntax used to write RLS rules, see [Row-level security syntax reference](./row-level-security-syntax.md).

## Combine row-level and column-level security

Row-level and column-level security can be used together to restrict user access to a table. However, the two policies have to be applied using a single OneLake security role. In this scenario, access to data is restricted according to the rules that are set in the one role.

OneLake security doesn't support the combination of two or more roles where one contains RLS rules and another contains CLS rules. Users that try to access tables that are part of an unsupported role combination receive query errors.

## Related content

* [Create and manage OneLake security roles](./create-manage-roles.md)
* [Read data secured with OneLake security](./read-secured-data.md)
* [Row-level security syntax reference](./row-level-security-syntax.md)
* [OneLake security access control model](./data-access-control-model.md)
