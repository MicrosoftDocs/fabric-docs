---
title: Hide visuals using scripting functions
description: Learn how to use the HIDE_VISUAL function to hide a visual or visual group in an intelligence sheet.
ms.date: 11/09/2026
ms.topic: reference
---

# Hide visuals using scripting functions

Use the HIDE_VISUAL function to hide a visual or visual group in an intelligence sheet. For example, configure a toggle parameter that lets users hide a visual when they turn the toggle off.

## Syntax

Use the following syntax to hide a visual or visual group.

```text
HIDE_VISUAL(visualLabel)
```

Replace visualLabel with the label of the visual or visual group you want to hide. When you reference a visual by its label, use the visual reference syntax supported by the intelligence sheet.

## Example

The following example uses a toggle parameter to control the visibility of a visual named Overlapped column@6 in an intelligence sheet. When the toggle is off, the HIDE_VISUAL function hides the visual. The example also uses SHOW_VISUAL in the toggle's on action so users can display the visual again.

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

    :::image type="content" source="../media/scripting-functions/hide-visual/hide-visual-configuration.png" alt-text="Screenshot of the action parameter configuration with SHOW_VISUAL and HIDE_VISUAL actions for the Overlapped column visual." lightbox="../media/scripting-functions/hide-visual/hide-visual-configuration.png":::

### Test the toggle

Open the **Parameter** pane and turn the toggle off to run HIDE_VISUAL and hide the specified visual. Turn the toggle on to run SHOW_VISUAL and display the visual again.

:::image type="content" source="../media/scripting-functions/hide-visual/hide-visual-hide.png" alt-text="Screenshot of the intelligence sheet with the specified visual hidden while the Show Visual toggle is off." lightbox="../media/scripting-functions/hide-visual/hide-visual-hide.png":::

:::image type="content" source="../media/scripting-functions/hide-visual/hide-visual-show.png" alt-text="Screenshot of the intelligence sheet with the specified visual displayed while the Show Visual toggle is on." lightbox="../media/scripting-functions/hide-visual/hide-visual-show.png":::
