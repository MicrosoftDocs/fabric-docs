---
title: Lakehouse schemas
description: What lakehouse schemas are and how to use it
ms.reviewer: tvilutis
ms.author: eur
author: eric-urban
ms.topic: concept-article
ms.date: 12/10/2025
ms.search.form: Lakehouse schemas
---

# What are lakehouse schemas?

Lakehouse supports the creation of custom schemas. Schemas allow you to group your tables together for better data discovery, access control, and more.

## Create a lakehouse schema

To enable schema support for your lakehouse, keep the box next to **Lakehouse schemas** checked when you create it.

:::image type="content" source="media\lakehouse-schemas\new-lakehouse.png" alt-text="Screenshot showing the new lakehouse dialog." lightbox="media/lakehouse-schemas/new-lakehouse.png":::

> [!NOTE]
>If you prefer to create a lakehouse without schema support, you can uncheck the checkbox.

Once you create the lakehouse, you can find a default schema named **dbo** under **Tables**. This schema is always there and can't be changed or removed. To create a new schema, hover over **Tables**, select **…**, and choose **New schema**. Enter your schema name and select **Create**. You see your schema listed under **Tables** in alphabetical order.

:::image type="content" source="media\lakehouse-schemas\new-schema.png" alt-text="Screenshot showing the new lakehouse schema dialog." lightbox="media/lakehouse-schemas/new-schema.png":::

## Store tables in lakehouse schemas

You need a schema name to store a table in a schema. Otherwise, it goes to the default **dbo** schema.

```python
df.write.mode("Overwrite").saveAsTable("contoso.sales")
```

You can use Lakehouse Explorer to arrange your tables and drag and drop table names to different schemas.

:::image type="content" source="media\lakehouse-schemas\move-tables.gif" alt-text="Animation of moving tables between schemas." lightbox="media/lakehouse-schemas/move-tables.gif":::

> [!CAUTION]
> If you modify the table, you must also update related items like notebook code or dataflows to ensure they're aligned with the correct schema.

## Bring multiple tables with schema shortcut

To reference multiple Delta tables from other Fabric lakehouse or external storage, use schema shortcut that displays all tables under the chosen schema or folder. Any changes to the tables in the source location also appear in the schema. To create a schema shortcut, hover over **Tables**, select on **…**, and choose **New schema shortcut**. Then select a schema on another lakehouse, or a folder with Delta tables on your external storage like Azure Data Lake Storage (ADLS) Gen2. That creates a new schema with your referenced tables.

:::image type="content" source="media\lakehouse-schemas\schema-shortcut.png" alt-text="Screenshot showing the new lakehouse schema shortcut." lightbox="media/lakehouse-schemas/schema-shortcut.png":::

## Access lakehouse schemas for Power BI reporting

To make your semantic model, just choose the tables that you want to use. Tables can be in different schemas. If tables from different schemas share the same name, you see numbers next to table names when in the model view.

## Lakehouse schemas in notebook

When you look at a schema enabled lakehouse in the notebook object explorer, you see tables are in schemas. You can drag and drop table into a code cell and get a code snippet that refers to the schema where the table is located. Use this namespace to refer to tables in your code: "workspace.lakehouse.schema.table". If you leave out any of the elements, the executor uses default setting. For example, if you only give table name, it uses default schema (**dbo**) from default lakehouse for the notebook.

> [!IMPORTANT]
> If you want to use schemas in your code, make sure that the default lakehouse for the notebook is schema enabled or there's no default lakehouse selected.


## Cross-workspace Spark SQL queries

Use the namespace "workspace.lakehouse.schema.table" to refer to tables in your code. This way, you can join tables from different workspaces if the user who runs the code has permission to access the tables.

```sql
SELECT * 
    FROM operations.hr.hrm.employees as employees 
    INNER JOIN global.corporate.company.departments as departments
    ON employees.deptno = departments.deptno;
```

## Referencing nonschema lakehouses

When you set a schema-enabled lakehouse or no lakehouse as the default in your notebook, Spark code uses schema-enabled referencing for tables. However, you can still access lakehouses without enabled schemas within the same code by referencing them as "lakehouse.table."

Additionally, it’s possible to join tables from different types of lakehouses.
```sql
SELECT * 
    FROM workspace.schemalh.schema.table as schematable 
    INNER JOIN workspace.nonschemalh.table as nonschematable
    ON schematable.id = nonschematable.id;
```

To help transition and refactor existing code to schema-enabled lakehouses, four-part naming is supported for lakehouses without schemas. You can reference tables as "workspace.lakehouse.dbo.table", where "dbo" serves as the schema name—even though it doesn’t exist yet in a lakehouse that isn’t schema-enabled. This approach lets you update your code with no downtime before enabling schema support in your lakehouses.

## API for lakehouse schemas

To create a lakehouse with schemas use [Create Lakehouse - REST API](/rest/api/fabric/lakehouse/items/create-lakehouse) and specify "enableSchemas": true in creationPayload request.
To list tables, schemas, or get table details use [OneLake table APIs for Delta](../onelake/table-apis/delta-table-apis-get-started.md).


## Enabling schemas for existing lakehouses

We continue to support nonschema lakehouses and are working towards complete feature parity between both types. Full interoperability in Spark is also supported, enabling querying and joining different types of lakehouses. Soon, we introduce tools to help customers transition their lakehouses from nonschema to schema-enabled versions, allowing you to benefit from enhanced features without needing to move data or experience downtime.

## Current limitations

There are still some limitations with schema-enabled lakehouses in Spark that are currently being rolled out in the coming months.

| Unsupported Features/ Functionality | Workaround |
|-|-|
| Spark views | Use [Materialized Lake Views](materialized-lake-views/overview-materialized-lake-view.md). |
| Shared lakehouse	| Create shortcuts in a lakehouse with the workspace role to shared lakehouse tables and access them through the shortcuts. |
| External ADLS tables	| Use [OneLake Shortcuts](/rest/api/fabric/core/onelake-shortcuts). |
| Outbound Access Protection 	| For scenarios that involve accessing lakehouses from different workspaces using Spark SQL statemets please use  nonschema lakehouses. |

## Related content

- [Navigate the Fabric Lakehouse explorer](navigate-lakehouse-explorer.md)
- [Explore the data in your lakehouse with a notebook](lakehouse-notebook-explore.md)
- [Options to get data into the Lakehouse](load-data-lakehouse.md)
- [Learn more about shortcuts](../onelake/onelake-shortcuts.md)
- [OneLake table APIs for Delta](../onelake/table-apis/delta-table-apis-get-started.md)

