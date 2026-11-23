---
title: "SETTOPBOTTOMN"
description: "Use SETTOPBOTTOMN to display the top and bottom items in a planning sheet based on values or percentages."
ms.date: 11/03/2026
ms.topic: reference
---

# SETTOPBOTTOMN

Use SETTOPBOTTOMN to filter the highest-ranking and lowest-ranking items within a category. You can apply the filter by specifying a number of items or a percentage. Items that don't meet the filtering criteria can be grouped under Others.

## Syntax

```text
SETTOPBOTTOMN(category, number, valueMode)
```

## Parameters

| Parameter | Description |
|---|---|
| category | Specifies the category whose items you want to filter. |
| number | Specifies the number of items to display at the top and bottom when valueMode is TRUE, or the percentage to use when valueMode is FALSE. |
| valueMode | Specifies the filtering mode. Use TRUE to filter by a specified number of items or FALSE to filter by a percentage. |

## Example

The following example creates a toggle parameter that switches between displaying the top and bottom 2 items by value and the top and bottom 5 percent of items in the Sub-Category dimension.

1. Create an action parameter in the planning sheet.
2. Set the **Name** to Set Top Bottom N and the **Parameter Id** to SetTopBottomN.
3. Enter the following description:

   Applies Top N and Bottom N filtering to the selected category based on values or percentages.

4. Set the **Interface Type** to **Toggle** and enable **Enable Script**.
5. Configure the off state with the label **Top/Bottom 5%**. Set **Apply to** to **Planning** and enter the following formula in **Formula Script**:

   ```text
   SETTOPBOTTOMN(Sub-Category, 5, FALSE)
   ```

   :::image type="content" source="../media/scripting-functions/settopbottomn/settopbottomn-configuration-off.png" alt-text="Screenshot of the off state configuration with the Top/Bottom 5% label and percentage-based formula." lightbox="../media/scripting-functions/settopbottomn/settopbottomn-configuration-off.png":::

   This configuration applies a percentage-based filter, displaying the top and bottom 5 percent of items in the Sub-Category dimension.

6. Configure the on state with the label **Top/Bottom 2 - Value**. Set **Apply to** to **Planning** and enter the following formula in **Formula Script**:

   ```text
   SETTOPBOTTOMN(Sub-Category, 2, TRUE)
   ```

   :::image type="content" source="../media/scripting-functions/settopbottomn/settopbottomn-configuration-on.png" alt-text="Screenshot of the on state configuration with the Top/Bottom 2 - Value label and value-based formula." lightbox="../media/scripting-functions/settopbottomn/settopbottomn-configuration-on.png":::

   This configuration displays the two highest and two lowest items by value in the Sub-Category dimension.

7. Set the **Default State** to **Top/Bottom 2 - Value** and enable **Include in read mode**.
8. Save the parameter configuration and add the parameter to the planning sheet.
9. Turn off the toggle to apply the percentage-based filter.

   :::image type="content" source="../media/scripting-functions/settopbottomn/settopbottomn-result-off.png" alt-text="Screenshot of the planning sheet with the toggle off, showing the percentage-based top and bottom filter." lightbox="../media/scripting-functions/settopbottomn/settopbottomn-result-off.png":::

   The planning sheet displays the top and bottom items based on the 5 percent setting. The remaining items are grouped under Others within each parent category.

10. Turn on the toggle to apply the value-based filter.

    :::image type="content" source="../media/scripting-functions/settopbottomn/settopbottomn-result-on.png" alt-text="Screenshot of the planning sheet with the toggle on, showing the value-based top and bottom filter." lightbox="../media/scripting-functions/settopbottomn/settopbottomn-result-on.png":::

    The planning sheet displays the two highest and two lowest items by value within each parent category. The remaining items are grouped under Others.