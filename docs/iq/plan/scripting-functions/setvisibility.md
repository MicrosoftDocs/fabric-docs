---
title: SETVISIBILITY function
description: Learn how to use the SETVISIBILITY scripting function in planning in Fabric to show or hide measures.
ms.date: 11/02/2026
ms.topic: reference
---

# SETVISIBILITY

Use SETVISIBILITY to show or hide one or more measures in a planning sheet. Use this function in a parameter action to switch between measures, such as showing actual values or plan values.

## Syntax

```text
SETVISIBILITY(measure, boolean)
```

## Parameters

The SETVISIBILITY function uses the following parameters to control the visibility of measures in a planning sheet.

| Parameter | Description |
|---|---|
| measure | The measure to show or hide. Select the relevant measure from the available references. |
| boolean | A Boolean value that specifies whether to show or hide the measure. Use TRUE to show the measure and FALSE to hide it. |

## Example

Use a toggle parameter to switch between the Actuals and Plan measures in a planning sheet. Configure the parameter actions as follows.

1. Create a parameter and set **Interface Type** to **Toggle**.
2. Enable **Enable Script**.
3. Set **Default State** to **Show Actuals**.
4. In **On State Configuration**, set **Label** to **Show Actuals**. Set **Apply to** to **Planning**, and enter the following formulas in **Formula Script**:

   ```text
   SETVISIBILITY(Actuals_M_11925419800285133932, true)
   SETVISIBILITY(Plan_M_16435073439253070543, false)
   ```

   :::image type="content" source="../media/scripting-functions/setvisibility/setvisibility-configuration-on.png" alt-text="Screenshot of the On State Configuration for the Show Actuals toggle, showing the Actuals measure set to visible and the Plan measure set to hidden." lightbox="../media/scripting-functions/setvisibility/setvisibility-configuration-on.png":::

5. In **Off State Configuration**, set **Label** to **Show Plan**. Set **Apply to** to **Planning**, and enter the following formulas in **Formula Script**:

   ```text
   SETVISIBILITY(Actuals_M_11925419800285133932, false)
   SETVISIBILITY(Plan_M_16435073439253070543, true)
   ```

   :::image type="content" source="../media/scripting-functions/setvisibility/setvisibility-configuration-off.png" alt-text="Screenshot of the Off State Configuration for the Show Plan toggle, showing the Actuals measure set to hidden and the Plan measure set to visible." lightbox="../media/scripting-functions/setvisibility/setvisibility-configuration-off.png":::

6. Save the parameter.

    When the toggle is set to **Show Actuals**, the sheet displays the Actuals measure and hides the Plan measure.

    :::image type="content" source="../media/scripting-functions/setvisibility/setvisibility-result-actuals.png" alt-text="Screenshot of the planning sheet displaying the Actuals measure while the Plan measure is hidden." lightbox="../media/scripting-functions/setvisibility/setvisibility-result-actuals.png":::

    When the toggle is set to **Show Plan**, the sheet displays the Plan measure and hides the Actuals measure.

    :::image type="content" source="../media/scripting-functions/setvisibility/setvisibility-result-plan.png" alt-text="Screenshot of the planning sheet displaying the Plan measure while the Actuals measure is hidden." lightbox="../media/scripting-functions/setvisibility/setvisibility-result-plan.png":::