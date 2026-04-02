---
title: Spark Views in lakehouse
description: Learn how to create, manage, and query Spark Views in a Microsoft Fabric lakehouse to simplify data access without duplicating data.
ms.reviewer: tvilutis
ms.topic: concept-article
ms.date: 04/02/2026
ms.search.form: Spark Views in Lakehouse
ai-usage: ai-assisted
---

# Spark Views in Microsoft Fabric lakehouse

Spark Views in Microsoft Fabric let you abstract complex data modeling logic and provide simplified access for end users without duplicating data. Unlike materialized views, Spark Views don't store data. Instead, the underlying query executes each time you select from the view, giving you real-time results based on current data.

You can view, manage, and query Spark Views directly in Lakehouse Explorer alongside your tables.

## How Spark Views store metadata

View metadata is stored in OneLake alongside your tables, but as files rather than folders. This approach:

- **Prevents naming conflicts** between views and tables
- **Uses a special file property** that allows engines to identify the object as a view

    :::image type="content" source="media\lakehouse-spark-views\spark-view.png" alt-text="Screenshot showing Spark View in a lakehouse." lightbox="media/lakehouse-spark-views/spark-view.png":::

Currently, only Spark and the lakehouse can read Spark Views. Other Fabric workloads, like SQL analytics endpoint or Semantic models, don't yet recognize Spark Views.

## Create a Spark View

To create a Spark View, you need a notebook session with a schema-enabled lakehouse as your default lakehouse. In the notebook run a Spark SQL statement using `CREATE OR REPLACE VIEW` with your view name and query:

```sql
CREATE OR REPLACE VIEW my_view AS
SELECT * FROM my_table WHERE status = 'active'
```

The view appears in Lakehouse Explorer under your schema after you refresh.

### Cross-lakehouse queries

Spark Views can reference data from multiple lakehouses that you have access to. You can join tables from different lakehouses—or even different workspaces—within a single view.

```sql
CREATE OR REPLACE VIEW my_view AS
SELECT * FROM myworkspace.mylakehouse.schema.my_table as a
JOIN otherworkspace.otherlakehouse.schema.my_other_table as b
ON a.identifier=b.identifier WHERE a.status = 'active'
```

### Specify the view location

Create views in your default lakehouse, or specify a four-part name for any lakehouse you have access to, like 


```sql
CREATE OR REPLACE VIEW myworkspace.mylakehouse.schema.my_view AS
SELECT * FROM my_table WHERE status = 'active'
```

For more information about four-part naming, see [Cross-workspace Spark SQL queries](lakehouse-schemas.md#cross-workspace-spark-sql-queries).

## Manage views in Lakehouse Explorer

Once created, your Spark View appears in Lakehouse Explorer alongside your tables. From the view's context menu, you can:

- **Rename** the view
- **Delete** the view
- **View properties**, including the underlying query definition

    :::image type="content" source="media\lakehouse-spark-views\spark-view-properties.png" alt-text="Screenshot showing Spark View Properties." lightbox="media/lakehouse-spark-views/spark-view-properties.png":::

## Spark Views in non-schema lakehouses

For non-schema lakehouses, Spark Views have been stored in a metastore that wasn't accessible to Lakehouse Explorer. But you can still create Spark View that is stored in OneLake and visible in Lakehouse Explorer.

To determine which storage format is used for new views, check your default lakehouse:

- If your default lakehouse is **schema-enabled**, new views are stored in OneLake and visible in Lakehouse Explorer. You can specify non-schema lakehouse when storinga view even if the default laehouse is schema enabled.
- If your default lakehouse is **not schema-enabled**, views are stored in metastore and are not visible in Lakehouse Explorer.

> [!NOTE]
> A tool to copy Spark Views from metastore to OneLake is planned for a future release.

## Related content

- [What is a lakehouse?](lakehouse-overview.md)
- [Lakehouse schemas](lakehouse-schemas.md)
- [Navigate the Fabric Lakehouse explorer](navigate-lakehouse-explorer.md)
- [Create and use notebooks](how-to-use-notebook.md)
