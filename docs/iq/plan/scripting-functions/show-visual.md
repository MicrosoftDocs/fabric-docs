---
title: Show visuals using scripting functions
description: Learn how to use the SHOW_VISUAL function to show a visual or visual group in an intelligence sheet.
ms.date: 11/09/2026
ms.topic: reference
---

# Show visuals using scripting functions

Use the SHOW_VISUAL function to show a visual or visual group in an intelligence sheet. For example, configure a toggle parameter that lets users display a visual when they turn the toggle on.

## Syntax

Use the following syntax to show a visual or visual group.

```text
SHOW_VISUAL(visualLabel)
```

Replace visualLabel with the label of the visual or visual group you want to show. When you reference a visual by its label, use the visual reference syntax supported by the intelligence sheet.

## Example

The following example uses a toggle parameter to control the visibility of a visual named Overlapped column@6 in an intelligence sheet. When the toggle is on, the SHOW_VISUAL function displays the visual. The example also uses HIDE_VISUAL in the toggle's off action so users can hide the visual again.

### Configure a toggle parameter

1. Open the intelligence sheet and create or edit an action parameter.
2. Set **Interface Type** to **Toggle**.
3. Enable **Enable Script**.
4. Set **Default State** to **Hide**.
5. Under **On Actions**, add an action, set **Apply to** to **Root**, and enter the following formula in **Formula Script**.

    ```text
    SHOW_VISUAL(visuals."Overlapped column@6")
    ```

6. Under **Off Actions**, add an action, set **Apply to** to **Root**, and enter the following formula in **Formula Script**.

    ```text
    HIDE_VISUAL(visuals."Overlapped column@6")
    ```

7. Save the action parameter.

    :::image type="content" source="../media/scripting-functions/show-visual/show-visual-configuration.png" alt-text="Screenshot of the action parameter configuration with SHOW_VISUAL and HIDE_VISUAL actions for the Overlapped column visual." lightbox="../media/scripting-functions/show-visual/show-visual-configuration.png":::

### Test the toggle

Open the **Parameter** pane and turn the toggle on to run SHOW_VISUAL and display the specified visual. Turn the toggle off to run HIDE_VISUAL and hide the visual again.

:::image type="content" source="../media/scripting-functions/show-visual/show-visual-hidden.png" alt-text="Screenshot of the intelligence sheet with the specified visual hidden while the Show Visual toggle is off." lightbox="../media/scripting-functions/show-visual/show-visual-hidden.png":::

:::image type="content" source="../media/scripting-functions/show-visual/show-visual-shown.png" alt-text="Screenshot of the intelligence sheet with the specified visual displayed while the Show Visual toggle is on." lightbox="../media/scripting-functions/show-visual/show-visual-shown.png":::
