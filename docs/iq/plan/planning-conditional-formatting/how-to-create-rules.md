---
title: Create Conditional Formatting Rules in Planning Sheet
description: Learn how to create conditional formatting rules in planning sheets.
ms.date: 05/14/2026
ms.topic: how-to
#customer intent: As a user, I want to understand and create conditional formatting rules in planning sheets effectively.
---

# Create conditional formatting rules

Conditional formatting helps you highlight important data points in a planning sheet by applying visual cues such as colors, icons, and styles based on defined rules. This formatting improves readability and directs attention to key performance indicators in high-density tabular reports.

[!INCLUDE [Fabric feature-preview-note](../../../includes/feature-preview-note.md)]

## Prerequisite

* You have access to the Planning sheet with the required dataset.

## Create a conditional formatting rule

1. In the Planning sheet navigate to **Format >** **Conditional formatting**.
1. Select **Create rule**.

    :::image type="content" source="../media/planning-conditional-formatting/how-to-create-rules/create-rule.png" alt-text="Screenshot of creating rules in conditional formatting." lightbox="../media/planning-conditional-formatting/how-to-create-rules/create-rule.png":::

1. Enter a **Title** for the rule.
1. Select where to apply formatting using **Apply to** (rows, columns, headers, or measures).

    :::image type="content" source="../media/planning-conditional-formatting/how-to-create-rules/configure-rules.png" alt-text="Screenshot of configuring rules in conditional formatting." lightbox="../media/planning-conditional-formatting/how-to-create-rules/configure-rules.png":::

1. Select the formatting scope using **Row hierarchy levels**:

    * Values only
    * Totals only
    * Values and totals

    :::image type="content" source="../media/planning-conditional-formatting/how-to-create-rules/row-hierarchy.png" alt-text="Screenshot of row hierarchy while configuring rules in conditional formatting.":::

1. Select a rule type from **Format by**:

    * Rules (IF conditions): For more information about configuring rules using IF conditions, see [Configure rules using IF conditions](how-to-format-if.md).
    * Color scale: For more information about configuring rules using color scale, see [Configure rules using format by color scale](how-to-format-color-scales.md).
    * Classification: For more information about configuring rules classification, see [Configure rules using format by classification](how-to-format-classification.md).

    :::image type="content" source="../media/planning-conditional-formatting/how-to-create-rules/format-by.png" alt-text="Screenshot of format by while configuring rules in conditional formatting.":::

1. Select **Apply** to create the rule.
   
    :::image type="content" source="../media/planning-conditional-formatting/how-to-create-rules/rule-created.png" alt-text="Screenshot of created rule in conditional formatting." lightbox="../media/planning-conditional-formatting/how-to-create-rules/rule-created.png":::
