---
title: "SETNUMBERFORMATTING"
description: "Use SETNUMBERFORMATTING to switch between uniform and measure-level number formatting in a planning sheet."
ms.date: 11/03/2026
ms.topic: reference
---

# SETNUMBERFORMATTING

Use SETNUMBERFORMATTING to switch the number formatting applied to values in a planning sheet. The function supports four formatting modes: Native, Uniform, Measure Level, and Auto.

## Syntax

The following example switches the planning sheet to uniform number formatting.

```text
SETNUMBERFORMATTING(NUMBERFORMATTING.UNIFORM)
```

## Parameters

| Parameter | Description |
|---|---|
| NUMBERFORMATTING.NATIVE | Uses the native number formatting behavior. |
| NUMBERFORMATTING.UNIFORM | Applies uniform number formatting to values in the planning sheet. |
| NUMBERFORMATTING.MEASURELEVEL | Uses the number formatting configured for each measure. |
| NUMBERFORMATTING.AUTO | Uses automatic number formatting. |

The function accepts one formatting mode from the NUMBERFORMATTING reference. Select the mode that matches how you want values to appear in the planning sheet.

## Example

Create a parameter that lets users switch between uniform number formatting and measure-level number formatting.

1. Open the planning sheet.
2. Open the **Parameters** pane and create a new parameter.
3. Set **Type** to **Action**.
4. Enter a name, such as **Choose Number Format**.
5. Set **Interface Type** to **Toggle**.
6. Enable **Enable Script**.
7. Set **Default State** to **Uniform**.
8. Add an action for each toggle state.

    For the **On** state, set the label to **Uniform** and enter the following formula in **Formula Script**:

    ```text
    SETNUMBERFORMATTING(NUMBERFORMATTING.UNIFORM)
    ```

    :::image type="content" source="../media/scripting-functions/setnumberformatting/setnumberformatting-configuration-on.png" alt-text="Screenshot of the On State Configuration with Uniform selected and the SETNUMBERFORMATTING formula." lightbox="../media/scripting-functions/setnumberformatting/setnumberformatting-configuration-on.png":::

    For the **Off** state, set the label to **Measure level** and enter the following formula in **Formula Script**:

    ```text
    SETNUMBERFORMATTING(NUMBERFORMATTING.MEASURELEVEL)
    ```

    :::image type="content" source="../media/scripting-functions/setnumberformatting/setnumberformatting-configuration-off.png" alt-text="Screenshot of the Off State Configuration with Measure level selected and the SETNUMBERFORMATTING formula." lightbox="../media/scripting-functions/setnumberformatting/setnumberformatting-configuration-off.png":::

9. Select **Include in read mode** if users must be able to switch the formatting mode in read mode.
10. Save the parameter and update the planning sheet.

    When the toggle is on, the planning sheet uses uniform number formatting. In the example, the values are displayed to one decimal place.

    :::image type="content" source="../media/scripting-functions/setnumberformatting/setnumberformatting-result-uniform.png" alt-text="Screenshot of the planning sheet with Uniform number formatting enabled and values displayed to one decimal place." lightbox="../media/scripting-functions/setnumberformatting/setnumberformatting-result-uniform.png":::

    When the toggle is off, the planning sheet uses the number formatting configured at the measure level. In the example, the values retain two decimal places and the measure headers include the unit label.

    :::image type="content" source="../media/scripting-functions/setnumberformatting/setnumberformatting-result-mesaure-level.png" alt-text="Screenshot of the planning sheet with Measure level number formatting enabled and values displayed to two decimal places." lightbox="../media/scripting-functions/setnumberformatting/setnumberformatting-result-mesaure-level.png":::
