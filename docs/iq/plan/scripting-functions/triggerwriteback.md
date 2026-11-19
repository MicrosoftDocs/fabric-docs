---
title: Trigger writeback using scripting functions
description: Use TRIGGERWRITEBACK to execute a configured writeback operation from a button in a planning sheet.
ms.date: 11/11/2026
ms.topic: reference
---

# Trigger writeback using scripting functions

Use TRIGGERWRITEBACK to trigger a writeback operation when a user selects a button in a planning sheet.

The function runs the writeback action configured for the button.

> [!NOTE]
> Configure the writeback destination before users run the action.

## Syntax

```text
TRIGGERWRITEBACK()
```

## Example

Use TRIGGERWRITEBACK() in the formula script for an Action parameter to let users run writeback from a button.

### Configure the Action parameter

1. In the planning sheet, open the **Parameter** pane and select **Add new**.

2. In the **Edit Parameter** pane, set **Type** to **Action**.

3. Enter a name and parameter ID. For example, enter **Trigger Writeback** for the name and **TriggerWriteback** for the parameter ID.

4. In **Description**, enter a description such as: Triggers the writeback operation when the button is clicked.

5. Under **Interface Options**, set **Interface Type** to **Button** and select **Enable Script**.

6. Under **Button Configuration**, enter a label for the button. For example, enter **Writeback**.

7. In the button's **Actions** configuration, add an action, set **Apply to** to **Planning**, and enter the following formula in **Formula Script**:

   ```text
   TRIGGERWRITEBACK()
   ```

   :::image type="content" source="../media/scripting-functions/triggerwriteback/triggerwriteback-configuration.png" alt-text="Screenshot of the Button State Configuration dialog showing the Writeback label, Planning action, and TRIGGERWRITEBACK() formula." lightbox="../media/scripting-functions/triggerwriteback/triggerwriteback-configuration.png":::

8. Select **Save** in the Button State Configuration dialog, and then select **Update** in the **Edit Parameter** pane.

9. Save the planning sheet. The configured button is available in the **Parameter** pane.

   :::image type="content" source="../media/scripting-functions/triggerwriteback/triggerwriteback-result.png" alt-text="Screenshot of the Parameter pane showing the Writeback button configured for the Trigger Writeback action." lightbox="../media/scripting-functions/triggerwriteback/triggerwriteback-result.png":::

### Run the writeback operation

1. In the **Parameter** pane, select the **Writeback** button.

2. The function triggers the configured writeback operation. When the operation completes successfully, the application displays a **Writeback completed** confirmation message.

   :::image type="content" source="../media/scripting-functions/triggerwriteback/triggerwriteback-completed-message.png" alt-text="Screenshot of the Writeback completed confirmation message after the writeback operation runs." lightbox="../media/scripting-functions/triggerwriteback/triggerwriteback-completed-message.png":::
