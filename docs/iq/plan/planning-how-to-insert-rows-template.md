---
title: Insert template rows in a Planning sheet
description: Learn how to insert and configure template rows in a Planning sheet. 
ms.date: 05/05/2026
ms.topic: how-to
#customer intent: As a user, I want to understand how to insert and configure template rows.
---

# Insert template rows

Plan enables efficient hierarchy handling with template rows, letting you insert custom rows across all levels of a hierarchy at once instead of adding them individually.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

This article explains how to insert template rows and use them across hierarchy levels.

## Create a template row

1. Select the row underneath the space where you want to insert the template row. The template row will be inserted above the selected row.
1. Go to **Planning** > **Insert Row** > **Data Input** and select **Number**, or select the **row gripper**, then choose **Insert** > **Data Input**.
1. In the **Static Row** pane, select **Templated**, enter a title, and configure values as needed:

    :::image type="content" source="media/planning-how-to-insert-rows-template/insert-template-row.jpg" alt-text="Screenshot of inserting a template row." lightbox="media/planning-how-to-insert-rows-template/insert-template-row.jpg":::

1. Configure a default value for the template row.

    * Choose **Row** in **Default Value** to source values from another row.
    * Choose **Static** to enter a fixed value.
    * Or enter values directly in the rows after creation.

1. Finally, select **Create** to insert the row across all hierarchy levels.

> [!NOTE]
>You can also create formula (calculated) rows as template rows, by selecting **Planning** > **Insert Row** > **Formula**. Alternatively, set the **Row Type** to *Formula* in the side pane shown in the images.

## Configure template row properties

Configure other properties for template rows, such as **Scaling Factor**, **Include in total**, **Distribute parent value to children**, and **Allow input**. For more information, see [Row properties](planning-how-to-insert-rows-data-input.md#data-input-row-properties).

You can also configure the following settings for template rows:

* **Row position**: Defines where the row appears at each category level. By default, it's set to *Auto*.
    * **Auto**: Creates the template row above the selected row.
    * **First**: Creates the template row at the top of each category level.
    * **Last**: Creates the template row at the bottom of each category level.
    
    :::image type="content" source="media/planning-how-to-insert-rows-template/template-row-properties.png" alt-text="Screenshot of row position in template row properties." lightbox="media/planning-how-to-insert-rows-template/template-row-properties.png":::

## Edit or delete a template row

* Use the row gripper and select the **Edit** or **Delete Row** options.
* Or go to **Insert Row** > **Manage Rows** > **Template Rows**, hover over the created row, and choose the appropriate action through the icons.

    :::image type="content" source="media/planning-how-to-insert-rows-template/edit-delete-template-row.png" alt-text="Screenshot of editing or deleting a template row." lightbox="media/planning-how-to-insert-rows-template/edit-delete-template-row.png":::

## Conditional template rows

Template conditions can be configured to control which parent categories and levels receive template rows. Template rows are created only for row categories that meet these conditions.

1. In the **Static Row** window > **Template conditions** section, select **Configure**.
1. In the **Set Template Conditions** window, specify where the template rows should be applied by choosing the required categories, and select **Apply**.

    :::image type="content" source="media/planning-how-to-insert-rows-template/set-template-conditions.png" alt-text="Screenshot of setting a template condition" lightbox="media/planning-how-to-insert-rows-template/set-template-conditions.png":::

1. Use this to restrict or allow specific hierarchy levels to get the template rows.

    The following image shows the *Energy Drinks* template row inserted only for the selected category, *Beverages*, across the hierarchy.

    :::image type="content" source="media/planning-how-to-insert-rows-template/energy-drinks-template-row.png" alt-text="Screenshot of a template row inserted only for selected category." lightbox="media/planning-how-to-insert-rows-template/energy-drinks-template-row.png":::

## Dynamic referencing in template rows

Plan provides a dynamic referencing feature that lets you reference a sibling’s child row while inserting calculated template rows. This lets values be automatically populated based on the corresponding parent category.

### Create a dynamic reference in template rows

1. Select the row underneath the space where you want to insert the template row. The template row will be inserted above the selected row.
1. Go to **Planning** > **Insert Row** and select **Formula**, or use the **row gripper** > **Insert > Formula**.
1. In the **Calculated Row** window, select **Templated** and enter a title.
1. Define a formula by using **References** to source values from a sibling row.

    In the following example, a template row named *Cocktails* references the value of *Soda* under the *Beverages* category.

    :::image type="content" source="media/planning-how-to-insert-rows-template/dynamic-reference-row.png" alt-text="Screenshot of configuring dynamic reference row." lightbox="media/planning-how-to-insert-rows-template/dynamic-reference-row.png":::

    The referenced value is applied across all sibling categories within the same *Sub Region*. For sub-regions such as *APAC* and *EMEA*, the *Cocktails* row dynamically retrieves the value of the *Soda* subcategory within each respective sub-region.

    :::image type="content" source="media/planning-how-to-insert-rows-template/cocktails-dynamic-row.png" alt-text="Screenshot of inserting a dynamically referenced row." lightbox="media/planning-how-to-insert-rows-template/cocktails-dynamic-row.png":::
