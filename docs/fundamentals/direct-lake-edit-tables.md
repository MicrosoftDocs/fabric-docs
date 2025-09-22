---
title: Edit tables for Direct Lake semantic models
description: Describes editing tables Direct Lake semantic models.
author: JulCsc
ms.author: juliacawthra
ms.reviewer: ''
ms.service: powerbi
ms.subservice: powerbi-premium
ms.custom:
ms.topic: concept-article
ms.date: 07/26/2024
LocalizationGroup: Admin
---
# Edit tables for Direct Lake semantic models

Semantic models in Direct Lake mode's tables come from Microsoft Fabric and OneLake data. Instead of the **transform data** experience of Power BI import and DirectQuery, Direct Lake mode uses the **Edit tables** experience, allowing you to decide which Direct Lake tables you want the semantic model to use.

## Use and features of Edit tables

The purpose of **Edit tables** is to add or remove tables in the semantic model in Direct Lake mode. Such tables reside in a single Fabric item that writes data to the OneLake, such as a Lakehouse or Warehouse. 

The following image shows the Edit tables initial dialog:

:::image type="content" source="media/direct-lake-edit-tables/direct-lake-edit-tables-01.png" alt-text="Screenshot of edit semantic model dialog.":::

The Edit tables dialog have the following sections:

* **Title** displays whether you're editing or creating.
* **Information** text and **learn more** link to the Direct Lake documentation.
* **Workspace** and **Fabric item** links to view the source of the tables in the web. Not available in all scenarios.
* **Search** to find the specific table or view from the data source.
* **Filter** to limit the schema or object type (table or view) that is displayed.
* **Reload** to sync the SQL analytics endpoint of a Lakehouse or a warehouse (requires write permission on the Lakehouse or warehouse). Not available in all scenarios.
* **Tree view** organizes the available tables or views:
    * Schema name
        * Object type (table or view)
            * Table or view name
* **Check boxes** allow you to select or unselect tables or views to use in the semantic model.
* **Confirm or Cancel** button let you decide whether to make the change to the semantic model.


In the semantic model, tables and columns can be renamed to support reporting expectations. Edit tables still show the data source table names, and schema sync doesn't impact the semantic model renames. 

In the Lakehouse, tables and views can also be renamed. If the upstream data source renames a table or column after it has been added to the semantic model, the semantic model will still reference the previous name. Consequently, the table will be removed from the model during the schema sync. The table with the new name shows in the **Edit tables** dialog as unchecked, and must be explicitly checked and added again to the semantic model. Measures can be moved to the new table, but relationships and column property updates need to be reapplied to the table. 

## Entry points

The following sections describe the multiple ways to get to **Edit tables**.

### Editing a semantic model with Direct Lake tables in web modeling

When editing a semantic model in the browser, there's a ribbon button to launch **Edit tables**. Alternatively, select the context menu of a table and choose **Edit tables**, as shown in the following image.

:::image type="content" source="media/direct-lake-edit-tables/direct-lake-edit-tables-web-modeling.png" alt-text="Screenshot of edit tables button in the browser." lightbox="media/direct-lake-edit-tables/direct-lake-edit-tables-web-modeling.png":::

>[!Note]
>If the **Edit tables** button is disabled, try selecting a single table.

### Live editing as semantic model with Direct Lake tables in Power BI Desktop

Select the context menu of a table and choose **Edit tables**, as shown in the following image.

:::image type="content" source="media/direct-lake-edit-tables/direct-lake-edit-tables-live-edit-desktop.png" alt-text="Screenshot of edit tables button in the Power BI Desktop." lightbox="media/direct-lake-edit-tables/direct-lake-edit-tables-live-edit-desktop.png":::

### Edit tables dialog

Selecting **Edit tables** launches the dialog, as shown in the following image.

:::image type="content" source="media/direct-lake-edit-tables/direct-lake-edit-tables-desktop.png" alt-text="Screenshot of edit tables dialog launched while using the browser." lightbox="media/direct-lake-edit-tables/direct-lake-edit-tables-desktop.png":::

You can perform many actions that impact the tables in the semantic model:

* Selecting the **Confirm** button with no changes initiates a schema sync. Any table changes in the data source, such as an added or removed column, are applied to the semantic model.
* Selecting the **Cancel** button returns to editing the model without applying any updates.
* **Selecting** tables or views previously unselected adds the selected items to the semantic model.
* **Unselecting** tables or views previously selected removes them from the semantic model.

Tables with measures can be unselected but remain in model view showing measures only without any data columns. The measures can be either deleted or moved to a different table. When all measures are moved or deleted, go back to Edit tables and click Confirm to no longer show the empty table in the model.

## Creating a new semantic model

A dialog shows to pick Direct Lake tables when creating a new semantic model from **OneLake catalog** in web create page and in Power BI Desktop.

When creating a semantic model, you must specify two properties:

* **Direct Lake semantic model:** The name of the semantic model in the workspace, which can be changed later. If the semantic model with the same name already exists in the workspace, a number is automatically appended to the end of the model name.
* **Workspace:** The workspace where the semantic model is saved. By default the workspace you're currently working in is selected, but you can change it to another Fabric workspace.

The following image shows the dialog when creating a new semantic model.

:::image type="content" source="media/direct-lake-edit-tables/direct-lake-edit-tables-choose-tables-from-onelake.png" alt-text="Screenshot of create new semantic model." lightbox="media/direct-lake-edit-tables/direct-lake-edit-tables-choose-tables-from-onelake.png":::

## Relationships between tables

In other storage modes, there are data previews and relationship validation to populate the cardinality and cross-filter direction based on column profiling queries automatically. Direct Lake tables don't run queries to show data previews. Many to one (*:1) cardinality is determined based on table row count DAX queries. The table with more rows is considered the many side. Single cross-filter direction is always pre-populated. These properties may need to be changed manually to reflect the relationship correctly. 

To further validate your relationship properties, run a DAX query in **DAX query view** or create a visual in **Report view** using these two tables together.

Refer to the [create relationships in Power BI](/power-bi/transform-model/desktop-create-and-manage-relationships) article for more information about table relationships.

### Creating new relationships

Now you have tables in your semantic model you can create relationships between them. Row counts are used to help determine the cardinality. There are many ways to create the relationship.

- In the **Model view**, dragging a column from one table to a column in another table opens the **Relationship editor** or **Properties** pane with the columns pre-selected.

- Selecting **Manage relationships** from the ribbon gives you the option to create a **New relationship** without any pre-selections in the editor. 

- Using the context menu on the **Data** pane **Model Explorer**'s **Relationships** node to pick **New relationship** gives you the option to create a relationship without any pre-selections in the **Properties** pane. 

:::image type="content" source="media/direct-lake-edit-tables/direct-lake-relationship-editor-in-Power-BI-Desktop.png" alt-text="Screenshot of a relationship between Direct Lake storage mode tables in Power BI Desktop." lightbox="media/direct-lake-edit-tables/direct-lake-relationship-editor-in-power-bi-desktop.png":::

### Editing existing relationships

To edit an existing relationship, select any created relationship line in the diagram view to show the relationship in the **Properties** pane, and double-clicking opens the **relationship editor**.

## Limitations
- Tables in Direct Lake storage mode do not show data previews in the relationship dialog.
- Tables in Direct Lake storage mode do not have relationship validation for cardinality and cross-filter direction.

## Related content

- [Direct Lake overview](../fundamentals/direct-lake-overview.md)
- [Create a lakehouse for Direct Lake](direct-lake-create-lakehouse.md)  
- [Analyze query processing for Direct Lake semantic models](direct-lake-analyze-query-processing.md)  
