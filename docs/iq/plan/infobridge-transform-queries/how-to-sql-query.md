---
title: SQL Queries
description: Learn how to create SQL queries in Infobridge to retrieve and transform data from existing queries.
ms.date: 07/27/2026
ms.topic: how-to
#customer intent: As a user, I want to create SQL queries to retrieve and transform data from an existing Infobridge query.
---

# SQL queries in Infobridge

Use **SQL Query** to create a new query by writing SQL statements against an existing Infobridge query.

SQL queries let you retrieve specific columns, filter data, and reshape query results without modifying the original query.

> [!NOTE]
> SQL queries create a new query. They don't modify the original Infobridge query.

## Example scenario

This example creates a new SQL query named **High Value Product Sales** from an existing planning sheet query.

The SQL query retrieves the product, category, country/region, units, unit price, and revenue columns from the source query.

## Create a SQL query

This example shows how to create a new SQL query from an existing Infobridge query.

1. On the **Home** ribbon, select **SQL Query**.

   :::image type="content" source="../media/infobridge-transform-queries/how-to-sql-query/select-sql-query.png" alt-text="Screenshot of the SQL Query command selected on the Home ribbon." lightbox="../media/infobridge-transform-queries/how-to-sql-query/select-sql-query.png":::

1. In **Source Name**, enter **High Value Product Sales**.

   :::image type="content" source="../media/infobridge-transform-queries/how-to-sql-query/open-create-sql-query-dialog.png" alt-text="Screenshot of the Create SQL Query dialog displaying the Source Name and SQL Query fields." lightbox="../media/infobridge-transform-queries/how-to-sql-query/open-create-sql-query-dialog.png":::

1. Under **Query References**, on the **Reference** tab, select **Query 1 - Planning 1**.

   Infobridge inserts the query reference into the SQL editor.

   :::image type="content" source="../media/infobridge-transform-queries/how-to-sql-query/select-query-reference.png" alt-text="Screenshot of the Create SQL Query dialog showing Query 1 - Planning 1 selected from the Reference tab." lightbox="../media/infobridge-transform-queries/how-to-sql-query/select-query-reference.png":::

1. In **SQL Query**, enter the following SQL statement.

   ```sql
   SELECT
       ProductName,
       Category,
       Ctry,
       Units,
       "Unit Price",
       Revenue
   FROM {{query_id:1}}
   ```

   > [!NOTE]
   > Add query references by using the **Query References** pane or by entering `{{query_id:1}}` directly in the SQL statement.

1. Select **Create**.

   Infobridge creates a new SQL query named **High Value Product Sales** under **Queries**.

   :::image type="content" source="../media/infobridge-transform-queries/how-to-sql-query/sql-query-created.png" alt-text="Screenshot of the Queries pane showing the newly created High Value Product Sales SQL query." lightbox="../media/infobridge-transform-queries/how-to-sql-query/sql-query-created.png":::
