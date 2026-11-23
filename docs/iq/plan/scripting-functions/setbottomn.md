---
title: SETBOTTOMN
description: Learn how to use the SETBOTTOMN scripting function in planning in Fabric to display the bottom N records for a category.
ms.date: 11/02/2026
ms.topic: reference
---

# SETBOTTOMN

Use SETBOTTOMN to display the bottom N records for a category in a planning sheet. Configure the function in a parameter action to let users switch between different bottom-N views.

## Syntax

```text
SETBOTTOMN(category, number, boolean)
```

## Parameters

The following table describes the parameters that the SETBOTTOMN function accepts.

| Parameter | Description |
|---|---|
| category | The category to rank and filter. Select the relevant category field from the available references. |
| number | The number of bottom records to display. For example, use 1 to display the lowest-ranked record or 3 to display the bottom three records. |
| boolean | A Boolean value that enables or disables bottom-N ranking. Use TRUE to enable ranking and FALSE to disable ranking. |

## Example

Use a toggle parameter to switch between the bottom one and bottom three records for the Sub-Category category in a planning sheet. Configure the parameter actions as follows.

1. Create a parameter and set **Type** to **Action**.
2. Enter a name, such as **Set Bottom N**.
3. Set **Interface Type** to **Toggle** and select **Enable Script**.
4. In **On State Configuration**, set **Label** to **Bottom 1**. Set **Apply to** to **Planning**, and enter the following formula in **Formula Script**:

   ```text
   SETBOTTOMN(Sub_Category_D_13871156346345963805, 1, TRUE)
   ```

   :::image type="content" source="../media/scripting-functions/setbottomn/setbottomn-configuration-on.png" alt-text="Screenshot of the On State Configuration for the Set Bottom N parameter, with the label Bottom 1 and a SETBOTTOMN formula that displays the bottom record." lightbox="../media/scripting-functions/setbottomn/setbottomn-configuration-on.png":::

5. In **Off State Configuration**, set **Label** to **Bottom 3**. Set **Apply to** to **Planning**, and enter the following formula in **Formula Script**:

   ```text
   SETBOTTOMN(Sub_Category_D_13871156346345963805, 3, TRUE)
   ```

   :::image type="content" source="../media/scripting-functions/setbottomn/setbottomn-configuration-off.png" alt-text="Screenshot of the Off State Configuration for the Set Bottom N parameter, with the label Bottom 3 and a SETBOTTOMN formula that displays the bottom three records." lightbox="../media/scripting-functions/setbottomn/setbottomn-configuration-off.png":::

6. Set **Default State** to **Bottom 1**, and save the parameter.

    When the toggle is set to **Bottom 1**, the planning sheet displays the lowest-ranked subcategory records within each parent category.

    :::image type="content" source="../media/scripting-functions/setbottomn/setbottomn-result-on.png" alt-text="Screenshot of a planning sheet displaying the bottom one subcategory record within each parent category." lightbox="../media/scripting-functions/setbottomn/setbottomn-result-on.png":::

    When the toggle is set to **Bottom 3**, the planning sheet displays the three lowest-ranked subcategory records within each parent category.

    :::image type="content" source="../media/scripting-functions/setbottomn/setbottomn-result-off.png" alt-text="Screenshot of a planning sheet displaying the bottom three subcategory records within each parent category." lightbox="../media/scripting-functions/setbottomn/setbottomn-result-off.png":::
