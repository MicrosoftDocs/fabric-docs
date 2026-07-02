---
title: Text functions in Infobridge
description: Learn how to use text functions in Infobridge to extract, split, format, trim, and add prefixes or suffixes to text fields.
ms.date: 06/29/2026
ms.topic: how-to
#customer intent: As a user, I want to extract and format text values so that I can prepare data for analysis and reporting.
---

# Text functions in Infobridge

Text functions in Infobridge help you prepare text fields for reporting, analysis, and writeback. Use **Extract** to create a new text column from an existing column by position, length, first characters, last characters, or delimiter. Use **Format** to change casing, remove leading or trailing spaces, or add a prefix or suffix.

You can find the text functions on the **Transform** tab in the **Text** group.

## Extract text

The **Extract** transformation creates a new column by extracting characters from a selected text column. You can extract characters by range, length, first characters, last characters, or delimiter.

### Extract a range of text

Use **Range** to extract characters from a specific starting position for a fixed number of characters. The following example uses the **Postal Code** column, which contains values such as `79907Central`, where the first five characters represent the postal code.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-text-functions/extract-range-source-postal-code.png" alt-text="Screenshot of the query table showing the Postal Code column before extracting a text range." lightbox="../media/infobridge-transformations/infobridge-how-to-text-functions/extract-range-source-postal-code.png":::

1. On the **Transform** tab, in the **Text** group, select **Extract**.

1. In the **Extract** dialog, configure the extraction:

   1. In **Target column**, select **Postal Code**.
   1. In **Extract Type**, select **Range**.
   1. In **Starting Index**, enter `1`.
   1. In **Number of Characters**, enter `5`.

   :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-text-functions/extract-range-dialog-postal-code.png" alt-text="Screenshot of the Extract dialog configured to extract a five-character range from the Postal Code column." lightbox="../media/infobridge-transformations/infobridge-how-to-text-functions/extract-range-dialog-postal-code.png":::

1. Select **Apply**.

   :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-text-functions/extract-range-result-postal-code.png" alt-text="Screenshot of query results showing the Postal Code Range column created from the Postal Code column." lightbox="../media/infobridge-transformations/infobridge-how-to-text-functions/extract-range-result-postal-code.png":::

A new **Postal Code Range** column is created with the extracted five-character postal code values.

### Extract text length

Use **Length** to return the number of characters in a text value. The following example uses the **Product Category** column and adds the length of each value as a new column.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-text-functions/extract-length-source-product-category.png" alt-text="Screenshot of the query table showing the Product Category column before extracting text length." lightbox="../media/infobridge-transformations/infobridge-how-to-text-functions/extract-length-source-product-category.png":::

1. On the **Transform** tab, in the **Text** group, select **Extract**.

1. In the **Extract** dialog, configure the extraction:

   1. In **Target column**, select **Product Category**.
   1. In **Extract Type**, select **Length**.

   :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-text-functions/extract-length-dialog-product-category.png" alt-text="Screenshot of the Extract dialog configured to return the length of values in the Product Category column." lightbox="../media/infobridge-transformations/infobridge-how-to-text-functions/extract-length-dialog-product-category.png":::

1. Select **Apply**.

   :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-text-functions/extract-length-result-product-category.png" alt-text="Screenshot of query results showing the Product Category length column created from the Product Category column." lightbox="../media/infobridge-transformations/infobridge-how-to-text-functions/extract-length-result-product-category.png":::

A new **Product Category Length** column is created with the character count for each value.

### Extract the first or last characters

Use **First Characters** or **Last Characters** to extract a specified number of characters from the beginning or end of a text value.

The following example extracts the first five characters from the **Postal Code** column. The same workflow applies when extracting the last characters, except that you select **Last Characters** as the **Extract Type**.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-text-functions/extract-first-characters-source-postal-code.png" alt-text="Screenshot of the query table showing the Postal Code column before extracting first characters." lightbox="../media/infobridge-transformations/infobridge-how-to-text-functions/extract-first-characters-source-postal-code.png":::

1. On the **Transform** tab, in the **Text** group, select **Extract**.

1. In the **Extract** dialog, configure the extraction:

   1. In **Target column**, select **Postal Code**.
   1. In **Extract Type**, select **First Characters**.
   1. In **Count**, enter `5`.

   :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-text-functions/extract-first-characters-dialog-postal-code.png" alt-text="Screenshot of the Extract dialog configured to extract the first five characters from the Postal Code column." lightbox="../media/infobridge-transformations/infobridge-how-to-text-functions/extract-first-characters-dialog-postal-code.png":::

1. Select **Apply**.

   :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-text-functions/extract-first-characters-result-postal-code.png" alt-text="Screenshot of the query table showing the Postal Code First Characters column." lightbox="../media/infobridge-transformations/infobridge-how-to-text-functions/extract-first-characters-result-postal-code.png":::

A new **Postal Code First Characters** column is created with the first five characters from each postal code value.

### Extract text before a delimiter

Use **Text Before Delimiters** to extract the text that appears before a specific delimiter. The following example uses the **Product Category** column, which contains values such as `Furniture-Bookcases`. The extraction returns the text before the hyphen (`-`).

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-text-functions/text-before-delimiter-source-product-category.png" alt-text="Screenshot of the query table showing delimited Product Category values before extracting text before a delimiter." lightbox="../media/infobridge-transformations/infobridge-how-to-text-functions/text-before-delimiter-source-product-category.png":::

1. On the **Transform** tab, in the **Text** group, select **Extract**.

1. In the **Extract** dialog, configure the extraction:

   1. In **Target column**, select **Product Category**.
   1. In **Extract Type**, select **Text Before Delimiters**.
   1. In **Delimiter**, enter `-`.

   :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-text-functions/text-before-delimiter-dialog-product-category.png" alt-text="Screenshot of the Extract dialog configured to extract text before the hyphen delimiter from the Product Category column." lightbox="../media/infobridge-transformations/infobridge-how-to-text-functions/text-before-delimiter-dialog-product-category.png":::

1. Select **Apply**.

   :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-text-functions/text-before-delimiter-result-product-category.png" alt-text="Screenshot of query results showing the Product Category Before Delimiter column with extracted category values." lightbox="../media/infobridge-transformations/infobridge-how-to-text-functions/text-before-delimiter-result-product-category.png":::

A new **Product Category Before Delimiter** column is created. The column contains the text before the hyphen, such as `Furniture`.

### Extract text after a delimiter

Use **Text After Delimiters** to extract the text that appears after a specific delimiter. The following example uses the **Product Category** column, which contains values such as `Furniture-Bookcases`. The extraction returns the text after the hyphen (`-`).

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-text-functions/text-after-delimiter-source-product-category.png" alt-text="Screenshot of the query table showing delimited Product Category values before extracting text after a delimiter." lightbox="../media/infobridge-transformations/infobridge-how-to-text-functions/text-after-delimiter-source-product-category.png":::

1. On the **Transform** tab, in the **Text** group, select **Extract**.

1. In the **Extract** dialog, configure the extraction:

   1. In **Target column**, select **Product Category**.
   1. In **Extract Type**, select **Text After Delimiters**.
   1. In **Delimiter**, enter `-`.

   :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-text-functions/text-after-delimiter-dialog-product-category.png" alt-text="Screenshot of the Extract dialog configured to extract text after the hyphen delimiter from the Product Category column." lightbox="../media/infobridge-transformations/infobridge-how-to-text-functions/text-after-delimiter-dialog-product-category.png":::

1. Select **Apply**.

   :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-text-functions/text-after-delimiter-result-product-category.png" alt-text="Screenshot of query results showing the Product Category After Delimiter column with extracted subcategory values." lightbox="../media/infobridge-transformations/infobridge-how-to-text-functions/text-after-delimiter-result-product-category.png":::

A new **Product Category After Delimiter** column is created. The column contains the text after the hyphen, such as `Bookcases` or `Chairs`.

## Format text

Use the **Format** transformation to modify text values in one or more columns.

You can convert text case, trim leading or trailing spaces, or add prefixes and suffixes.

1. On the **Transform** tab, in the **Text** group, select **Format**.

1. In the **Format** dialog, select **Formatting Type** to view the available options.

   :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-text-functions/format-options-dialog.png" alt-text="Screenshot of the Format dialog showing text formatting options including lowercase, uppercase, trim, add prefix, and add suffix." lightbox="../media/infobridge-transformations/infobridge-how-to-text-functions/format-options-dialog.png":::

### Convert text to uppercase or lowercase

Use **Uppercase** or **Lowercase** to convert text values in one or more selected columns.

The following example converts the **Region** and **Segment** columns to uppercase. The same workflow applies when converting text to lowercase, except that you select **Lowercase** as the **Formatting Type**.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-text-functions/uppercase-source-region-segment.png" alt-text="Screenshot of the query table showing Region and Segment values before changing text case." lightbox="../media/infobridge-transformations/infobridge-how-to-text-functions/uppercase-source-region-segment.png":::

1. On the **Transform** tab, in the **Text** group, select **Format**.

1. In the **Format** dialog, configure the formatting:

   1. In **Target column**, select **Region** and **Segment**.
   1. In **Formatting Type**, select **Uppercase**.

   :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-text-functions/uppercase-dialog-region-segment.png" alt-text="Screenshot of the Format dialog configured to convert the Region and Segment columns to uppercase." lightbox="../media/infobridge-transformations/infobridge-how-to-text-functions/uppercase-dialog-region-segment.png":::

1. Select **Apply**.

   :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-text-functions/uppercase-result-region-segment.png" alt-text="Screenshot of query results showing Region and Segment values converted to uppercase." lightbox="../media/infobridge-transformations/infobridge-how-to-text-functions/uppercase-result-region-segment.png":::

The values in the **Region** and **Segment** columns are converted to uppercase.

### Trim spaces

Use **Trim** to remove leading and trailing spaces from text values. The following example uses the **Product Classification** column to clean the product identifiers.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-text-functions/trim-source-product-classification.png" alt-text="Screenshot of the query table showing Product Classification values before trimming spaces." lightbox="../media/infobridge-transformations/infobridge-how-to-text-functions/trim-source-product-classification.png":::

1. On the **Transform** tab, in the **Text** group, select **Format**.

1. In the **Format** dialog, configure the formatting:

   1. In **Target column**, select **Product Classification**.
   1. In **Formatting Type**, select **Trim**.

   :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-text-functions/trim-dialog-product-classification.png" alt-text="Screenshot of the Format dialog configured to trim spaces from the Product Classification column." lightbox="../media/infobridge-transformations/infobridge-how-to-text-functions/trim-dialog-product-classification.png":::

1. Select **Apply**.

   :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-text-functions/trim-result-product-classification.png" alt-text="Screenshot of query results showing Product Classification values after trimming spaces." lightbox="../media/infobridge-transformations/infobridge-how-to-text-functions/trim-result-product-classification.png":::

Leading and trailing spaces are removed from the **Product Classification** values.

### Add a prefix or suffix

Use **Add prefix** or **Add suffix** to add a fixed text value before or after each value in a selected column.

The following example demonstrates how to add a prefix to the **Product Classification** column. The same workflow applies when adding a suffix, except that you specify a suffix value instead of a prefix.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-text-functions/add-prefix-source-product-classification.png" alt-text="Screenshot of the query table showing Product Classification values before adding a prefix." lightbox="../media/infobridge-transformations/infobridge-how-to-text-functions/add-prefix-source-product-classification.png":::

1. On the **Transform** tab, in the **Text** group, select **Format**.

1. In the **Format** dialog, configure the formatting:

   1. In **Target column**, select **Product Classification**.
   1. In **Formatting Type**, select **Add prefix**.
   1. In **Prefix**, enter `PRD-`.

   :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-text-functions/add-prefix-dialog-product-classification.png" alt-text="Screenshot of the Format dialog configured to add the PRD prefix to the Product Classification column." lightbox="../media/infobridge-transformations/infobridge-how-to-text-functions/add-prefix-dialog-product-classification.png":::

1. Select **Apply**.

   :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-text-functions/add-prefix-result-product-classification.png" alt-text="Screenshot of query results showing Product Classification values with the PRD prefix added." lightbox="../media/infobridge-transformations/infobridge-how-to-text-functions/add-prefix-result-product-classification.png":::

The **Product Classification** values are updated with the `PRD-` prefix.
