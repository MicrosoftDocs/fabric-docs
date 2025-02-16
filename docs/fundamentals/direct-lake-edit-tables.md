---
title: Edit tables for Direct Lake semantic models
description: Describes editing tables Direct Lake semantic models.
author: kfollis
ms.author: kfollis
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

The areas in the Edit tables dialog are the following:

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

In the Lakehouse, tables and views can also be renamed. If the upstream data source renames a table or column after the table was added to the semantic model, the semantic model schema sync will still be looking for the table using the previous name, so the table will be removed from the model on schema sync. The table with the new name will show in the **Edit tables** dialog as unchecked, and must be explicitly checked again and added again to the semantic model. Measures can be moved to the new table, but relationships and column property updates need to be reapplied to the table. 

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

Tables that have measures can be unselected but will still show in the model with columns removed and only showing measures. The measures can be either deleted or moved to a different table. When all measures have been moved or deleted, go back to Edit tables and click Confirm to no longer show the empty table in the model.

### Creating a new semantic model from Lakehouse and Warehouse

When creating a semantic model, you must specify two properties:

* **Direct Lake semantic model:** The name of the semantic model in the workspace, which can be changed later. If the semantic model with the same name already exists in the workspace, a number is automatically appended to the end of the model name.
* **Workspace:** The workspace where the semantic model is saved. By default the workspace you're currently working in is selected, but you can change it to another Fabric workspace.

The following image shows the **New semantic model** dialog.

:::image type="content" source="media/direct-lake-edit-tables/direct-lake-edit-tables-04.png" alt-text="Screenshot of create new semantic model." lightbox="media/direct-lake-edit-tables/direct-lake-edit-tables-04.png":::


### Default semantic model

There are some differences for the default Power BI semantic model in Direct Lake mode. Refer to the [default Power BI semantic models in Microsoft Fabric](/fabric/data-warehouse/semantic-models) article for more information about the differences.


## Related content

- [Direct Lake overview](../fundamentals/direct-lake-overview.md)
- [Create a lakehouse for Direct Lake](direct-lake-create-lakehouse.md)  
- [Analyze query processing for Direct Lake semantic models](direct-lake-analyze-query-processing.md)  
