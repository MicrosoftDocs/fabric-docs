---
title: Show or hide measures using scripting functions
description: Learn how to show or hide all measures in a planning sheet using the SHOWMEASURES function.
ms.date: 11/09/2026
ms.topic: reference
---

# Show or hide measures using scripting functions

Use the SHOWMEASURES function to show or hide all measures in a planning sheet. Pass TRUE to show the measures or FALSE to hide them.

## Syntax

Use the following syntax to show or hide measures.

```text
SHOWMEASURES(TRUE)
```

To hide all measures, use the following formula:

```text
SHOWMEASURES(FALSE)
```

## Example

The following example uses a toggle parameter to show or hide all measures in a planning sheet. When the toggle is on, the SHOWMEASURES function displays the measures. When the toggle is off, the function hides the measures.

### Configure a toggle parameter

1. In the planning sheet, create an **Action** parameter named **Show Measures**.
2. Set the **Interface Type** to **Toggle** and select **Enable Script**.
3. Under **On Actions**, add a planning action and enter the following formula in **Formula Script**:

   ```text
   SHOWMEASURES(TRUE)
   ```

   :::image type="content" source="../media/scripting-functions/showmeasures/showmeasures-configuration-on.png" alt-text="Screenshot of the On State Configuration dialog with SHOWMEASURES(TRUE) entered in Formula Script." lightbox="../media/scripting-functions/showmeasures/showmeasures-configuration-on.png":::

4. Under **Off Actions**, add a planning action and enter the following formula in **Formula Script**:

   ```text
   SHOWMEASURES(FALSE)
   ```

   :::image type="content" source="../media/scripting-functions/showmeasures/showmeasures-configuration-off.png" alt-text="Screenshot of the Off State Configuration dialog with SHOWMEASURES(FALSE) entered in Formula Script." lightbox="../media/scripting-functions/showmeasures/showmeasures-configuration-off.png":::

5. Set **Default State** to **Show Measures**.
6. Save the parameter.

### Test the toggle

Open the **Parameter** pane and switch the toggle between **Show Measures** and **Hide Measures**.

- When the toggle is on, the planning sheet displays all measures.

  :::image type="content" source="../media/scripting-functions/showmeasures/showmeasures-result-on.png" alt-text="Screenshot of the planning sheet displaying all measures when the Show Measures toggle is on." lightbox="../media/scripting-functions/showmeasures/showmeasures-result-on.png":::

- When the toggle is off, the planning sheet hides all measures while retaining the row hierarchy.

  :::image type="content" source="../media/scripting-functions/showmeasures/showmeasures-result-off.png" alt-text="Screenshot of the planning sheet with all measures hidden and the row hierarchy still visible when the Show Measures toggle is off." lightbox="../media/scripting-functions/showmeasures/showmeasures-result-off.png":::
