---
title: Lakehouse schemas
description: Organize lakehouse tables into schemas for better discovery, access control, and cross-workspace queries in Microsoft Fabric.
ms.reviewer: tvilutis
ms.topic: concept-article
ms.date: 02/22/2026
ms.search.form: Lakehouse schemas
---

# What are lakehouse schemas?

Lakehouse schemas in Microsoft Fabric let you group tables into named collections — such as `sales`, `marketing`, or `hr`. Several Fabric features require schema-enabled lakehouses:

- **Organize tables by domain** — Browse tables by business area instead of a flat list, which becomes increasingly important as the number of tables grows.
- **Control access at the schema level** — Grant different teams access to different schemas, and apply [row-level](../onelake/security/row-level-security.md) and [column-level](../onelake/security/column-level-security.md) security to tables within schemas.
- **Query across workspaces** — Reference tables with a four-part namespace (`workspace.lakehouse.schema.table`) to join data from multiple lakehouses and workspaces in a single Spark SQL query.
- **Reference external data with schema shortcuts** — Map a schema to a folder in another lakehouse or in Azure Data Lake Storage (ADLS) Gen2, so external Delta tables appear as local tables.
- **Use advanced features** — Features like [materialized lake views](materialized-lake-views/overview-materialized-lake-view.md) require schema-enabled lakehouses.

If you have an existing lakehouse that was created before schemas were available, see [Enable schemas for existing lakehouses](#enable-schemas-for-existing-lakehouses).

## Create a lakehouse schema

Schemas are enabled by default when you [create a lakehouse](create-lakehouse.md) in the Fabric portal. To enable schema support, keep the box next to **Lakehouse schemas** checked when you create the lakehouse. If you create a lakehouse through the REST API, you must explicitly enable schemas — see [Create a lakehouse with schemas using the REST API](#create-a-lakehouse-with-schemas-using-the-rest-api).

:::image type="content" source="media\lakehouse-schemas\new-lakehouse.png" alt-text="Screenshot showing the new lakehouse dialog." lightbox="media/lakehouse-schemas/new-lakehouse.png":::

> [!NOTE]
> If you prefer to create a lakehouse without schema support, you can uncheck the checkbox.

Every schema-enabled lakehouse includes a **dbo** default schema under **Tables** that can't be renamed or removed. 

To create a new schema, hover over **Tables**, select **…**, and choose **New schema**. Enter your schema name and select **Create**. You see your schema listed under **Tables** in alphabetical order.

:::image type="content" source="media\lakehouse-schemas\new-schema.png" alt-text="Screenshot showing the new lakehouse schema dialog." lightbox="media/lakehouse-schemas/new-schema.png":::

## Store tables in lakehouse schemas

In code, you need to include the schema name when you save a table to store it in a specific schema. Without a schema name, the table goes to the default **dbo** schema.

```python
# schema.table
df.write.mode("overwrite").saveAsTable("marketing.productdevelopment")
```

In this example, `marketing` is the schema name and `productdevelopment` is the table name.

You can use Lakehouse Explorer to arrange your tables and drag and drop table names to different schemas.

:::image type="content" source="media\lakehouse-schemas\move-tables.gif" alt-text="Animation of moving tables between schemas." lightbox="media/lakehouse-schemas/move-tables.gif":::

> [!CAUTION]
> If you move a table to a different schema or rename it, you must also update any items that reference the table—such as notebook code, dataflows, and SQL queries—to use the new schema or table name.

## Bring multiple tables with schema shortcut

A schema shortcut creates a new schema in your lakehouse that references Delta tables from another Fabric lakehouse or from external storage like Azure Data Lake Storage (ADLS) Gen2. You can also add local tables to the same schema alongside the shortcut tables. Changes to the tables in the source location are automatically reflected in the schema.

To create a schema shortcut:

1. In the lakehouse **Explorer** pane, hover over **Tables**, select **…**, and then choose **New schema shortcut**.
    
    :::image type="content" source="media\lakehouse-schemas\schema-shortcut.png" alt-text="Screenshot showing the new lakehouse schema shortcut." lightbox="media/lakehouse-schemas/schema-shortcut.png":::

1. Select a source: a schema on another Fabric lakehouse, or a folder that contains Delta tables on external storage like Azure Data Lake Storage (ADLS) Gen2.

A new schema appears in your lakehouse with all the referenced tables from the source.

## Access lakehouse schemas for Power BI reporting

When you build a semantic model from a schema-enabled lakehouse, you can select tables from any schema. If tables in different schemas share the same name, you see numbers next to the table names in the model view so you can distinguish them.

## Lakehouse schemas in notebook

The notebook object explorer shows tables grouped by schema. You can drag and drop a table into a code cell to generate a code snippet that includes the schema reference.

Use the four-part namespace to refer to tables in your code: `workspace.lakehouse.schema.table`. If you omit any part of the namespace, Spark resolves it using defaults — for example, a bare table name resolves to the **dbo** schema of the default lakehouse.

> [!IMPORTANT]
> To use schemas in your notebook code, the default lakehouse for the notebook must be schema-enabled or there's no default lakehouse selected.

## Cross-workspace Spark SQL queries

Schema-enabled lakehouses let you query and join tables across multiple workspaces in a single Spark SQL statement. Use the four-part namespace `workspace.lakehouse.schema.table` to reference any table the current user has permission to access.

```sql
-- workspace.lakehouse.schema.table
SELECT * 
    FROM ops_workspace.hr_lakehouse.hrm.employees AS employees 
    INNER JOIN global_workspace.corporate_lakehouse.company.departments AS departments
    ON employees.deptno = departments.deptno;
```

## Referencing non-schema lakehouses

If you work with both schema-enabled and non-schema lakehouses, you can query and join both types in the same Spark SQL code. Reference non-schema lakehouse tables without a schema part — either as `lakehouse.table` or `workspace.lakehouse.table` for cross-workspace queries.

```sql
-- Schema-enabled: workspace.lakehouse.schema.table
-- Non-schema:     workspace.lakehouse.table
SELECT * 
    FROM my_workspace.sales_lakehouse.retail.orders AS schema_table 
    INNER JOIN my_workspace.legacy_lakehouse.customers AS nonschema_table
    ON schema_table.customer_id = nonschema_table.id;
```

To prepare for a future migration to schemas, you can start using four-part naming with `dbo` for non-schema lakehouses today — for example, `workspace.lakehouse.dbo.table`. Spark accepts this syntax even though the `dbo` schema doesn't exist yet in the non-schema lakehouse. For more information, see [Enable schemas for existing lakehouses](#enable-schemas-for-existing-lakehouses).

## Create a lakehouse with schemas using the REST API

When you create a lakehouse through the [Create Lakehouse REST API](/rest/api/fabric/lakehouse/items/create-lakehouse), schemas aren't enabled by default. To create a schema-enabled lakehouse, include `"enableSchemas": true` in the `creationPayload`:

```json
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/lakehouses

{
  "displayName": "Lakehouse_created_with_schema",
  "description": "A schema enabled lakehouse.",
  "creationPayload": {
    "enableSchemas": true
  }
}
```

To list tables, schemas, or get table details, use the [OneLake table APIs for Delta](../onelake/table-apis/delta-table-apis-get-started.md).

## Enable schemas for existing lakehouses

Lakehouses created before schemas were available don't have schema support. Fabric continues to support non-schema lakehouses, and Spark can query and join both types in the same code. Migration tools that convert a non-schema lakehouse to a schema-enabled lakehouse without moving data or downtime aren't yet available.

In the meantime, you can start preparing by using four-part naming (`workspace.lakehouse.dbo.table`) in your existing code — even for non-schema lakehouses — so your queries are ready when you enable schemas. For more information, see [Referencing non-schema lakehouses](#referencing-non-schema-lakehouses).

## Current limitations

Schema-enabled lakehouses have the following known limitations. The table also describes workarounds for each.

| Limitation | Description | Workaround |
|---|---|---|
| Spark views | `CREATE VIEW` in Spark SQL isn't currently supported for schema-enabled lakehouses. | Use [materialized lake views](materialized-lake-views/overview-materialized-lake-view.md) to precompute and persist query results as Delta tables. |
| Shared lakehouses | A schema-enabled lakehouse can't currently be shared directly through workspace-level sharing. | Create [shortcuts](../onelake/onelake-shortcuts.md) in a lakehouse where the user has a workspace role, and reference the shared lakehouse tables through those shortcuts. |
| External ADLS tables | External table metadata over Azure Data Lake Storage (ADLS) isn't supported directly in schema-enabled lakehouses. | Use [OneLake shortcuts](/rest/api/fabric/core/onelake-shortcuts) to reference external Delta tables. |
| Outbound access protection | Cross-workspace Spark SQL queries are blocked when outbound access protection is enabled. | Use non-schema lakehouses for cross-workspace query scenarios in environments where outbound access protection is enabled. |

## Related content

- [Navigate the Fabric Lakehouse explorer](navigate-lakehouse-explorer.md)
- [Explore the data in your lakehouse with a notebook](lakehouse-notebook-explore.md)
- [Options to get data into the Lakehouse](load-data-lakehouse.md)
- [Learn more about shortcuts](../onelake/onelake-shortcuts.md)
- [OneLake table APIs for Delta](../onelake/table-apis/delta-table-apis-get-started.md)

