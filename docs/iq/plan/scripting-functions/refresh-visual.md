---
title: REFRESH VISUAL
description: Use the REFRESH_VISUAL function to refresh a specific visual when a user runs a script in a planning item.
ms.date: 10/29/2026
ms.topic: reference
---

# REFRESH VISUAL

Use the REFRESH_VISUAL function to refresh a specific visual when a user runs a script in a planning item. For example, configure a button that refreshes a visual.

## Syntax

The following syntax refreshes a specific visual.

```text
REFRESH_VISUAL(visuals.visualLabel)
```

Replace visualLabel with the reference to the visual you want to refresh.

## Example

The following example refreshes the visual named Overlapped column.

```text
REFRESH_VISUAL(visuals."Overlapped column@6")
```

## Configure a button to refresh a visual

1. Open the planning item and create or edit an action parameter.
2. Set **Type** to **Action**.
3. Enter a name, such as Refresh Visual.
4. In **Description**, explain what the action does. For example, enter: Refreshes the specified visual when the user selects the button.
5. Under **Interface Options**, set **Interface Type** to **Button**.
6. Select **Enable Script**.
7. Under **Button Configuration**, set **Label** to Refresh.
8. Add an action, select the root scope, and enter the following formula script:

   ```text
   REFRESH_VISUAL(visuals."Overlapped column@6")
   ```

9. Save the button configuration, and then select **Update**.

   :::image type="content" source="../media/scripting-functions/refresh-visual/refresh-visual-configuration.png" alt-text="Screenshot of the button configuration for the REFRESH_VISUAL function." lightbox="../media/scripting-functions/refresh-visual/refresh-visual-configuration.png":::

    When a user selects **Refresh**, the planning item refreshes the specified visual.

    :::image type="content" source="../media/scripting-functions/refresh-visual/refresh-visual-result.png" alt-text="Screenshot of the planning item after the REFRESH_VISUAL function refreshes the visual." lightbox="../media/scripting-functions/refresh-visual/refresh-visual-result.png":::

