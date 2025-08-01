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

Semantic models in Direct Lake mode's tables come from Microsoft Fabric and OneLake data. Instead of the **transform data** experience of Power BI import and DirectQuery, Direct Lake mode uses the **Edit tables** experience, allowing you to decide which tables you want the semantic model in Direct Lake mode to use.

## Use and features of Edit tables

The purpose of **Edit tables** is to add or remove tables in the semantic model in Direct Lake mode. Such tables reside in a single Fabric item that writes data to the OneLake, such as a Lakehouse or Warehouse. 

The following image shows the Edit tables initial dialog:

:::image type="content" source="media/direct-lake-edit-tables/direct-lake-edit-tables-01.png" alt-text="Screenshot of edit semantic model dialog.":::

The Edit tables dialog have the following sections:

* **Title** displays whether you're editing or creating.
* **Information** text and **learn more** link to the Direct Lake documentation.
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

The following sections describe the multiple ways you can edit semantic models in Direct Lake. 

### Editing a semantic model in Direct Lake mode in web modeling

When editing a semantic model in the browser, there's a ribbon button to launch **Edit tables**, as shown in the following image. 

:::image type="content" source="media/direct-lake-edit-tables/direct-lake-edit-tables-02.png" alt-text="Screenshot of edit tables button in the browser." lightbox="media/direct-lake-edit-tables/direct-lake-edit-tables-02.png":::

Selecting the ribbon button launches the **Edit tables** dialog, as shown in the following image.

:::image type="content" source="media/direct-lake-edit-tables/direct-lake-edit-tables-03.png" alt-text="Screenshot of edit tables dialog launched while using the browser." lightbox="media/direct-lake-edit-tables/direct-lake-edit-tables-03.png":::

You can perform many actions that impact the tables in the semantic model:

* Selecting the **Confirm** button with no changes initiates a schema sync. Any table changes in the data source, such as an added or removed column, are applied to the semantic model.
* Selecting the **Cancel** button returns to editing the model without applying any updates.
* **Selecting** tables or views previously unselected adds the selected items to the semantic model.
* **Unselecting** tables or views previously selected removes them from the semantic model.

Tables with measures can be unselected but remain in model view showing measures only without any data columns. The measures can be either deleted or moved to a different table. When all measures are moved or deleted, go back to Edit tables and click Confirm to no longer show the empty table in the model.

### Creating a new semantic model from Lakehouse and Warehouse

When creating a semantic model, you must specify two properties:

* **Direct Lake semantic model:** The name of the semantic model in the workspace, which can be changed later. If the semantic model with the same name already exists in the workspace, a number is automatically appended to the end of the model name.
* **Workspace:** The workspace where the semantic model is saved. By default the workspace you're currently working in is selected, but you can change it to another Fabric workspace.

The following image shows the **New semantic model** dialog.

:::image type="content" source="media/direct-lake-edit-tables/direct-lake-edit-tables-04.png" alt-text="Screenshot of create new semantic model." lightbox="media/direct-lake-edit-tables/direct-lake-edit-tables-04.png":::

<a id="default-semantic-model"></a>

### Semantic model

There are some differences for the Power BI semantic model in Direct Lake mode. For more information about the differences, see [Power BI semantic models in Microsoft Fabric](/fabric/data-warehouse/semantic-models).

## Creating relationships between tables

Now you have tables in your semantic model you can create relationships between them. 

In the **Model view**, dragging a column from one table to a column in another table opens the **Relationship editor** or **Properties** pane with the columns pre-selected and default cardinality of Many to one (*:1) and cross-filter direction (Single) pre-populated. 

:::image type="content" source="media/direct-lake-edit-tables/direct-lake-relationship-editor-in-Power-BI-Desktop.png" alt-text="Screenshot of a relationship between Direct Lake storage mode tables in Power BI Desktop." lightbox="media/direct-lake-edit-tables/direct-lake-relationship-editor-in-power-bi-desktop.png":::

Selecting **Manage relationships** from the ribbon gives you the option to create a **New relationship** without any pre-selections in the editor. 

Using the context menu on the **Data** pane **Model Explorer**'s **Relationships** node to pick **New relationship** gives you the option to create a relationship without any pre-selections in the **Properties** pane. 

To edit an existing relationship, select any created relationship line in the diagram view to show the relationship in the **Properties** pane, and double-clicking opens the **relationship editor**.

In other storage modes, there are data previews and relationship validation to populate the cardinality and cross-filter direction based on column profiling queries automatically. Direct Lake storage mode currently does not run queries to show data previews or validate relationships cardinality and cross-filter direction. Many to one (*:1) cardinality and single cross-filter direction are always populated but these properties may need to be changed manually to reflect the relationship correctly. To manually validate your relationship properties, run a DAX query in **DAX query view** or create a visual in **Report view** using these two tables together.

Refer to the [create relationships in Power BI](/power-bi/transform-model/desktop-create-and-manage-relationships) article for more information about table relationships.

### Limitations
- Tables in Direct Lake storage mode do not show data previews in the relationship dialog.
- Tables in Direct Lake storage mode do not have relationship validation for cardinality and cross-filter direction.

## Related content

- [Direct Lake overview](../fundamentals/direct-lake-overview.md)
- [Create a lakehouse for Direct Lake](direct-lake-create-lakehouse.md)  
- [Analyze query processing for Direct Lake semantic models](direct-lake-analyze-query-processing.md)  
