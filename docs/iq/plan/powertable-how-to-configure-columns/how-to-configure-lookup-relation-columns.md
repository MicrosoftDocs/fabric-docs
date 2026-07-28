---
title: Configure Single Select Column in a PowerTable Sheet
description: Learn how to configure a single select column by using manual values, distinct values, and lookup tables to standardize data entry and establish relationships between tables in PowerTable.
ms.date: 07/04/2026
ms.topic: how-to
#customer intent: As a user, I want to configure single select columns by using manual values, distinct values, or lookup tables so that I can standardize data entry and display related data across tables.
---

# Configure single select column in a PowerTable sheet

This article explains how to configure columns that use the **Single Select** input type.

A single select column lets you select a value from a predefined list of options. You can configure the available options in one of the following ways:

* [**Manual**](#manual): Define the dropdown options manually.
* [**Distinct Values**](#distinct-values): Generate distinct dropdown options from existing column values.
* [**Lookup**](#lookup): Retrieve dropdown values from another related table, typically to establish foreign key relationships.

Use single select predefined options to maintain data consistency, simplify data entry, and standardize values across records.

The following sections describe how to configure each option source.

## Manual

Use the **Manual** option to define dropdown values and labels directly.

To configure dropdown values manually:

1. In the column setup window, select the pencil icon next to the required column.
1. Set **Input Type** to **Single Select**.
1. Select **Manual** as the **Values Type**.

   :::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-lookup-relation-columns/single-select-manual.png" alt-text="Screenshot of the Single Select Input type with Manual Values Type." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-lookup-relation-columns/single-select-manual.png":::

1. Enter the required options and labels. Then, configure the background color for each label.
1. Select **Save**.

   :::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-lookup-relation-columns/options.png" alt-text="Screenshot of configuring the dropdown options for manual values type." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-lookup-relation-columns/options.png":::

Use **Add** to create additional options or the delete icon to remove an existing option.

:::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-lookup-relation-columns/add-delete.png" alt-text="Screenshot of the Add option and the delete icons to add or delete the dropdown options." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-lookup-relation-columns/add-delete.png":::

After you save the configuration, select values from the dropdown list when you edit records in the sheet.

:::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-lookup-relation-columns/select-single-select-value.png" alt-text="Screenshot of selecting values from the dropdown list in the PowerTable sheet." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-lookup-relation-columns/select-single-select-value.png":::

## Distinct values

Use the **Distinct Values** option to generate dropdown values from the existing values in the selected column.

To configure dropdown values from existing data:

1. Select the pencil icon next to the required column.
1. Set **Input Type** to **Single Select**.
1. Select **Distinct Values** in the **Values Type**.
1. Select **Save**.

   :::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-lookup-relation-columns/single-select-distinct.png" alt-text="Screenshot of the Single Select Input type with Distinct Values Type." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-lookup-relation-columns/single-select-distinct.png":::

PowerTable creates a unique list of values from the selected column and uses them as dropdown options. Then, select values from the generated dropdown list.

:::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-lookup-relation-columns/select-single-select-distinct.png" alt-text="Screenshot of selecting the values from the dropdown list configured by the Distinct values type." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-lookup-relation-columns/select-single-select-distinct.png":::

## Lookup

Use the **Lookup** option to get dropdown values from another table.  

This option is commonly used to show user-friendly values for foreign key fields while storing the corresponding key values in the current table.  

To configure a lookup column:

1. Select the pencil icon next to the required column.
1. Set **Input Type** to **Single Select**.
1. Select **Lookup** as the **Values Type**.
1. In **Lookup Schema**, select the schema that contains the lookup table.
1. In **Lookup Table**, select the table that contains the lookup values.
1. Under **Lookup Key Column**, select the current table column that contains the key values.
1. Under **Lookup Display Column**, select the lookup table column that contains the values to display.
1. Select **Save**.

:::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-lookup-relation-columns/lookup-configuration.png" alt-text="Screenshot of the configuration of Lookup values type." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-lookup-relation-columns/lookup-configuration.png":::

Optionally, select **Add Hierarchy** to configure additional levels in the lookup hierarchy. To remove a hierarchy level, select the **Delete** icon next to it.

:::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-lookup-relation-columns/add-hierarchy-delete.png" alt-text="Screenshot of the Add Hierarchy and delete options." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-lookup-relation-columns/add-hierarchy-delete.png":::

After you configure a lookup, the corresponding display values from the lookup table replace the key values in the current table.  

For example, consider a *Products* table that contains a *ProductSubcategoryKey* column with key values.

:::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-lookup-relation-columns/product-table.png" alt-text="Screenshot of the Products table with subcategory key values." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-lookup-relation-columns/product-table.png":::

The *Subcategory* table serves as the lookup table and contains the *ProductSubcategoryKey* column along with the corresponding *SubcategoryName* values.

:::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-lookup-relation-columns/subcategory-table.png" alt-text="Screenshot of the Subcategory table with the subcategory names for the keys." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-lookup-relation-columns/subcategory-table.png":::

After you configure the lookup, the corresponding label values from the *SubcategoryName* column replace the key values in the *ProductSubcategoryKey* column. This change makes the data more readable and easier to understand.  

When you insert or edit records, you can select values from the lookup-based dropdown list.

:::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-lookup-relation-columns/lookup-dropdown-list.png" alt-text="Screenshot of selecting the values from lookup based dropdown list in the sheet." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-lookup-relation-columns/lookup-dropdown-list.png":::

### Filter based on another column

Use the **Filter based on another column** option to further filter the lookup values displayed in the dropdown list. You can apply this setting when tables share more than one matching column.

In this case, you can configure multiple matching column pairs between the current table and the lookup table. When you apply a filter, the dropdown list displays only lookup values that satisfy all configured matching conditions.

:::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-lookup-relation-columns/filter-based-on-another-column.png" alt-text="Screenshot of the Filter based on another column checkbox." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-lookup-relation-columns/filter-based-on-another-column.png":::
