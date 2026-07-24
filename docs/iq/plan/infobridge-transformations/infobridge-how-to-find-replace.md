---
title: Use Find and Replace in Infobridge
description: Learn how to use the Find and Replace transformation in Infobridge to standardize dimension values by using text matching and regular expressions.
ms.date: 06/22/2026
ms.topic: how-to
#customer intent: As a user, I want to find and replace values in dimension columns so that data is standardized and easier to analyze.
---

# Use Find and Replace in Infobridge

Use the **Find and Replace** transformation to search for values within one or more columns and replace them with new values. Use this transformation to standardize dimension members, simplify reporting categories, and clean source data before loading it into a planning sheet or report.

[!INCLUDE [Fabric feature-preview-note](../../../includes/feature-preview-note.md)]

The following examples demonstrate how to use **Find and Replace** on the **Market & Geography** column.

## Replace a text value

In this example, the **Market & Geography** column contains values such as *Channel Partners,Canada*, *Enterprise,Canada*, and *Government,Canada*.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-find-replace/market-geography-source-values.png" alt-text="Screenshot of Market and Geography values before applying Find and Replace." lightbox="../media/infobridge-transformations/infobridge-how-to-find-replace/market-geography-source-values.png":::

To replace all occurrences of **Canada** with **CA**:

1. On the **Transform** tab, select **Find and Replace**.
1. In **Target Columns**, select **Market & Geography**.
1. In **Find**, enter **Canada**.
1. Select **Fuzzy Match**.
1. In **Replace With**, enter **CA**.
1. Select **Apply**.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-find-replace/find-replace-canada-to-ca.png" alt-text="Screenshot of Find and Replace dialog configured to replace Canada with CA in the Market and Geography column by using the Fuzzy Match option." lightbox="../media/infobridge-transformations/infobridge-how-to-find-replace/find-replace-canada-to-ca.png":::

After you apply the transformation, the **Market & Geography** column uses the abbreviated country code.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-find-replace/market-geography-country-code-replaced.png" alt-text="Screenshot of Market and Geography column showing values such as Channel Partners,CA, Enterprise,CA, and Government,CA after replacing Canada with CA." lightbox="../media/infobridge-transformations/infobridge-how-to-find-replace/market-geography-country-code-replaced.png":::

## Replace values by using a regular expression

Use regular expressions to replace multiple matching values with a single standardized value.

In this example, you group all values in the **Market & Geography** column that end with **CA** into a single category called **Canada Market**.

1. On the **Transform** tab, select **Find and Replace**.
1. In **Target Columns**, select **Market & Geography**.
1. In **Find**, enter `.*,CA$`.
1. Select **Use Regular Expression**.
1. In **Replace With**, enter **Canada Market**.
1. Select **Apply**.

The regular expression `.*,CA$` matches any value that ends with **CA**.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-find-replace/find-replace-regex-canada-market.png" alt-text="Screenshot of Find and Replace dialog configured to use the regular expression dot star comma CA dollar sign and replace matching values with Canada Market." lightbox="../media/infobridge-transformations/infobridge-how-to-find-replace/find-replace-regex-canada-market.png":::

After you apply the transformation, all matching values appear as **Canada Market**.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-find-replace/market-geography-canada-market-result.png" alt-text="Screenshot of Market and Geography column showing Canada Market after applying a regular expression based Find and Replace transformation." lightbox="../media/infobridge-transformations/infobridge-how-to-find-replace/market-geography-canada-market-result.png":::

## Match case options

The **Find and Replace** transformation supports the following matching methods:

- **Fuzzy Match**: Finds values that approximately match the search text.
- **Fuzzy Case Match**: Finds approximate matches while considering letter casing.
- **Match Full String**: Replaces values only when the entire value matches the search text.
- **Use Regular Expression**: Uses regular expression patterns to identify matching values.
