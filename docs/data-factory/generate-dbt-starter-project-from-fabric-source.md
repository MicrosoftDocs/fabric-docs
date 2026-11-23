---
title: Generate a dbt starter project from a Fabric warehouse or lakehouse (Preview)
description: Learn how to select tables, views, and columns from a Fabric warehouse or lakehouse and generate dbt models and source definitions.
ms.reviewer: meghasony
ms.service: fabric
ms.subservice: data-factory
ms.topic: how-to
ms.date: 10/22/2026
ai-usage: ai-assisted
---

# Generate a dbt starter project from a Fabric warehouse or lakehouse (Preview)

When your data already exists in a Fabric warehouse or lakehouse, you don't need to create every dbt source declaration and model file manually. Use the schema import experience in a dbt job to select existing tables, views, and columns and generate an editable starter project.

This approach is especially useful for schemas that contain many objects. It gives you a consistent starting point that you can refine with transformation logic, tests, documentation, and deployment settings.

## What the experience creates

For the tables and views that you select, the dbt job creates:

- A SQL model for each selected object. The generated model selects either all columns or the specific columns that you chose and references the object through the dbt `source()` function.
- A `sources.yml` file that defines the selected schema as a dbt source and lists the selected tables and views.

The generated files are starter assets. They remove repetitive setup work, but they don't infer joins, business rules, measures, data quality tests, or production-ready transformations.

## Prerequisites

Before you begin, ensure that you have:

- Access to a Fabric workspace and permission to create or edit a dbt job.
- Access to the Fabric warehouse or lakehouse that contains the source schema.
- At least one schema with tables or views that you want to model.

You can generate the starter files before you configure the dbt adapter. However, you must configure the adapter settings before you validate or run the dbt project.

## Create a starter project

### 1. Start from the dbt job landing page

For a new project, open a dbt job and, under **Start with a Fabric source**, select **Create a new project**. This card is the primary entry point for generating a new project from an existing Fabric source.

You can also start the same workflow by selecting **Import schema** on the **Home** toolbar. Its tooltip, **Create models from warehouse or lakehouse schema**, identifies the toolbar command to use while you're working in the dbt job editor.

:::image type="content" source="media/dbt-import-schema/import-schema-entry-points.png" alt-text="Screenshot of the dbt job landing page with the Create a new project card and Import schema toolbar command highlighted." lightbox="media/dbt-import-schema/import-schema-entry-points.png":::

### 2. Choose a Fabric data source

On the **Choose data source** page:

1. Find the warehouse or lakehouse that contains the schema you want to use.
1. To browse more Fabric items, select **OneLake catalog** or **View more**.
1. Use **Search** to narrow the list when your workspace or catalog contains many items.
1. Select the warehouse or lakehouse, and then select **Next**.

> [!IMPORTANT]
> If you use a warehouse as the target for your dbt project, select a source warehouse or lakehouse in the same workspace as the target warehouse. Direct cross-workspace table access isn't supported.
> For more information and a lakehouse-shortcut workaround for data in another workspace, see [Ingest from mirrored databases and other workspace items](../data-warehouse/ingest-data-warehouse-tables-tsql.md#ingest-from-mirrored-databases-and-other-workspace-items).

### 3. Select a schema, objects, and columns

On the **Choose data** page:

1. In **Select a schema**, choose the schema that contains the source objects.
1. Under **Select tables to import**, select individual tables and views, or use **Select all** to include every listed object.
1. To include only specific columns from a table, expand the table and, under **Select columns to include**, select the columns that you want in the generated model.
1. Select an object to preview its data. Use the preview to confirm that you selected the intended source object and columns.
1. Use **Search** to locate specific objects in a large schema.
1. Select **Next**.

Choose only the objects and columns that are relevant to the project. A focused selection keeps the generated project easier to review and avoids bringing unrelated source data into the initial model surface.

:::image type="content" source="media/dbt-import-schema/select-schema-objects.png" alt-text="Screenshot of the Choose data page with a schema, tables and views, and individual table columns selected for import, with source data shown in the preview pane." lightbox="media/dbt-import-schema/select-schema-objects.png":::

### 4. Review the selection and create the files

On the **Review and create** page:

1. Confirm the selected Fabric item and schema.
1. Review the number and names of the selected tables and views.
1. Check the object type shown for each selection.
1. For tables with a column-level selection, confirm the selected column names. `SELECT *` indicates that the generated model includes all columns from that object.
1. To add the selected warehouse or lakehouse connection to the dbt profile, select **Add this connection to dbt profile**. This step is optional.
1. If you need to change the source, objects, or columns, select **Back**.
1. Select **Next** to generate the dbt model files and `sources.yml`.

:::image type="content" source="media/dbt-import-schema/review-and-create.png" alt-text="Screenshot of the Review and create page showing the selected schema, tables and views, selected table columns, and the option to add the connection to the dbt profile." lightbox="media/dbt-import-schema/review-and-create.png":::

## Review the generated project

When generation finishes, the dbt job saves the new files and displays them in **Explorer**.

1. Expand the `models` folder and confirm that it contains a SQL model for every table or view that you selected.
1. Open a generated model and verify that it selects the expected columns. A model generated from a column-level selection should include only the columns that you selected.
1. Open `sources.yml` and confirm that it contains the selected schema and source objects.
1. Update the generated SQL and descriptions with your transformation logic and business context.
1. Configure the adapter settings if you haven't already done so, and then validate the project before you run it.

> [!IMPORTANT]
> Treat the generated files as a starting point, not as finished transformation logic. Review the models and source definitions before you use them in a production workflow.

## Next steps

With the starter project in place, you can focus on the work that adds business value instead of manually scaffolding files for every source object. Refine the generated project by completing these tasks:

- Replace broad selections with intentional column lists where appropriate.
- Add transformations, naming conventions, and model layers for your use case.
- Add source and model tests for keys, nullability, accepted values, and relationships.
- Replace generated descriptions with business definitions and ownership information.
- Configure the adapter and environment-specific settings.
- Validate and run the project, and commit the reviewed files to version control.

## Related content

- [dbt job in Microsoft Fabric overview](dbt-job-overview.md)
- [Create a new dbt job in Microsoft Fabric](dbt-job-how-to.md)
- [Configure a dbt job in Microsoft Fabric](dbt-job-configure.md)
