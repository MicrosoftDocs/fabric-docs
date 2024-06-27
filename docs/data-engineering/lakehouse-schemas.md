---
title: Lakehouse schemas (preview)
description: What lakehouse schemas are and how to use it
ms.reviewer: snehagunda
ms.author: tvilutis
author: tedvilutis
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
  - ignite-2023-fabric
ms.date: 06/28/2024
ms.search.form: Lakehouse schemas
---

# What are lakehouse schemas (Preview)?

Lakehouse supports the creation of custom schemas. Schemas allow you to group your tables together for better data discovery, access control, and more.

## How to create a lakehouse schema?

To enable schema support for your lakehouse, check the box next to **Lakehouse schemas (PublicPreview)** when you create it.

:::image type="content" source="media\lakehouse-schemas\newlakehouse.png" alt-text="Screenshot showing the new lakehouse dialog.":::

> [!IMPORTANT]
> Preview limitation requires workspace name contain only alphanumeric characters. If special characters will be used in workspace names some of Lakehouse features won't work.

Once your lakehouse is ready, you can find a default schema named **dbo** under **Tables**. This schema is always there and can't be changed or removed. To make a new schema, hover over **Tables**, select on **…**, and choose **New schema**. After typing your schema name and clicking **Create**, you'll see your schema listed under **Tables** in alphabetical order.

:::image type="content" source="media\lakehouse-schemas\newschema.png" alt-text="Screenshot showing the new lakehouse schema dialog.":::


## Storing tables in lakehouse schemas

You need a schema name to store a table in a schema. Otherwise, it goes to the default **dbo** schema.

```python
df.write.mode("Overwrite").saveAsTable("contoso.sales")
```

You can use Lakehouse Explorer to arrange your tables and drag and drop table names to different schemas.

:::image type="content" source="media\lakehouse-schemas\movetables.gif" alt-text="Animation of moving tables between schemas.":::

> [!CAUTION]
> If you change the table, you also need to change items that uses that table, such as notebook code or dataflows, so that they use the right schema.

## Bringing multiple tables with schema shortcut

To reference multiple Delta tables from other Fabric lakehouse or external storage, use schema shortcut that displays all tables under the chosen schema or folder. Any changes to the tables in the source location also appear in the schema. To create a schema shortcut, hover over **Tables**, select on **…**, and choose **New schema shortcut**. Then select a schema on another lakehouse, or a folder with Delta tables on your external storage like Azure Data Lake Storage (ADLS) Gen2. That creates a new schema with your referenced tables.

:::image type="content" source="media\lakehouse-schemas\schemashortcut.png" alt-text="Screenshot showing the new lakehouse schema shortcut.":::

## Accessing lakehouse schemas for Power BI reporting

To make your semantic model, just choose the tables that you want to use. Tables can be in different schemas. If tables from different schemas share the same name, you see numbers next to table names when in the model view.

## Lakehouse schemas in Notebook

When you look at a schema enabled lakehouse in Notebook object explorer, you see tables are in schemas. You can drag and drop table into a code cell and get a code snippet that refers to the schema where the table is located. Use this namespace to refer to tables in your code: "workspace.lakehouse.schema.table". If you leave out any of the elements, the executor uses default setting. For example, if you only give table name, it uses default schema (**dbo**) from default lakehouse for the notebook.

> [!IMPORTANT]
> If you want to use schemas in your code make sure that the default lakehouse for the notebook is schema enabled.

## Cross-workspace Spark SQL queries

Use the namespace "workspace.lakehouse.schema.table” to refer to tables in your code. This way, you can join tables from different workspaces if the user who runs the code has permission to access the tables.

```sql
SELECT * 
    FROM hr.hrm.employees as employees 
    INNER JOIN corporate.company.departments as departments
    ON employees.deptno = departments.deptno;
```

> [!IMPORTANT]
> Make sure you join tables only from lakehouses that have schemas enabled. Joining tables from lakehouses that don’t have schemas enabled won’t work.

## Public preview limitations

Below listed unsupported features/functionalities are for current release of public preview. They'll be resolved in the coming releases before General Availability.

| Unsupported Features/ Functionality | Notes |
|-|-|
| Git (CI/CD)	| Git integration isn't supported. Exporting schema enabled Lakehouse would export as a nonschema Lakehouse. Hence, only nonschema Lakehouses are imported.|
| Non-Delta, Managed Table Schema	| Getting schema for managed, non-Delta formatted tables (for example, CSV) isn't supported. Expanding these tables in Lakehouse Explorer doesn't show any schema information in the UX. |
| External Spark Tables	| External Spark Table operations (for example, discovery, getting schema, etc.) aren't supported. These tables are unidentified in the UX. |
| Public API	| Public APIs (List Tables, Load Table, exposing defaultSchema extended property etc.) aren't supported for schema enabled Lakehouse. Existing public APIs called on a schema enabled Lakehouse results an error. |
| Table Maintenance	| Not supported. |
| Update Table Properties	 | Not supported. |
| Spark 3.5	| Spark 3.5 runtime isn't supported |
| Workspace name containing special characters	| Workspace with special characters (for example, space, slashes) isn't supported. A user error is shown. |
| Spark Views | Not supported. |
| Hive specific features | Not supported. |
| `USE <schemaName>` | Doesn't work cross workspaces, but supported within same workspace. |
| Migration	| Migration of existing nonschema Lakehouses to schema Lakehouses isn't supported. |


## Related content

- [Navigate the Fabric Lakehouse explorer](navigate-lakehouse-explorer.md)
- [Explore the data in your lakehouse with a notebook](lakehouse-notebook-explore.md)
- [Options to get data into the Lakehouse](load-data-lakehouse.md)
- [Learn more about shortcuts](../onelake/onelake-shortcuts.md)