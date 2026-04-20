---
title: Set conditions for a rule
description: Include file with instructions to add conditions for a rule in a Fabric activator. 
ms.topic: include
ms.date: 02/27/2026
---

## Condition section

Choose the type of condition that you want to detect. You can use conditions that check:

- on each event, do an action
- on each event when a value is met, do an action
- on each event grouped by a field, do an action (for example, on each `PackageId` event when ``Temperature` is greater than `30`)

Follow one of these steps:

- In the **Condition** section, for **Check**, select **On each event**. 

    :::image type="content" source="./media/set-details-conditions-actions-rule/condition.png" alt-text="Screenshot that shows the Add rule pane with the condition selected.":::    

- In the **Condition** section, for **Check**, select **On each event when a value is met**. Then, select the field that you want to check, the operator, and the value.

    :::image type="content" source="./media/set-details-conditions-actions-rule/condition-value.png" alt-text="Screenshot that shows the Add rule pane with the condition with value selected.":::

- In the **Condition** section, for **Check**, select **On each event grouped by a field when a value is met**. Then, select the field that you want to group by, the field that you want to check, the operator, the value, and the occurrence. The occurrence can be one of these values: every time the condition is met, when it occurred specific number of times, when it  was true for a specific duration.

    :::image type="content" source="./media/set-details-conditions-actions-rule/condition-grouped.png" alt-text="Screenshot that shows the Add rule pane with the condition grouped by a field selected.":::