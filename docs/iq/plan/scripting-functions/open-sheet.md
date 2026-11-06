---
title: OPEN SHEET
description: Use the OPEN_SHEET function to open planning sheet when a user runs a script in a planning item.
ms.date: 10/28/2026
ms.topic: reference
---

# OPEN SHEET

Use the OPEN_SHEET function to open planning sheet when a user runs a script. For example, add a button that lets users navigate from one planning sheet to another.

## Syntax

The following syntax opens a planning sheet.

```text
OPEN_SHEET(sheets.sheetLabel1)
```

Replace sheetLabel1 with the reference to the sheet you want to open.

## Example

The following example opens the planning sheet named Planning 2.

```text
OPEN_SHEET(sheets."Planning 2@3")
```

## Configure a button to open a planning sheet

1. Open the planning item and create or edit an action parameter.
2. Set **Type** to **Action**.
3. Enter a name, such as Open Planning Sheet.
4. In **Description**, explain what the action does. For example, enter: Opens Planning Sheet 2 when the user selects the button.
5. Under **Interface Options**, set **Interface Type** to **Button**.
6. Select **Enable Script**.
7. Under **Button Configuration**, set **Label** to Open Planning Sheet 2.
8. Add an action, select the root scope, and enter the following formula script:

   ```text
   OPEN_SHEET(sheets."Planning 2@3")
   ```

9. Save the button configuration, and then select **Update**.

    :::image type="content" source="../media/scripting-functions/open-sheet/open-sheet-configuration.png" alt-text="Screenshot of the button configuration for the OPEN_SHEET function." lightbox="../media/scripting-functions/open-sheet/open-sheet-configuration.png":::

    When a user selects **Open Planning Sheet 2**, the planning item opens the specified planning sheet.

    :::image type="content" source="../media/scripting-functions/open-sheet/open-sheet-result.png" alt-text="Screenshot of the planning item after the OPEN_SHEET function opens the target planning sheet." lightbox="../media/scripting-functions/open-sheet/open-sheet-result.png":::


