---
title: OPEN LINK
description: Use the OPEN_LINK function to open an external URL when a user runs a script in a planning item.
ms.date: 10/28/2026
ms.topic: reference
---

# OPEN LINK

Use the OPEN_LINK function to navigate to an external URL when a user runs a script in a planning item. For example, configure a button that opens a website.

## Syntax

The following syntax opens an external URL.

```text
OPEN_LINK("https://example.com")
```

Replace "https://example.com" with the URL you want to open. Include the URL in quotation marks.

## Example

The following example opens the Microsoft website.

```text
OPEN_LINK("https://www.microsoft.com")
```

## Configure a button to open a website

1. Open the planning item and create or edit an action parameter.
2. Set **Type** to **Action**.
3. Enter a name, such as Open Website.
4. In **Description**, explain what the action does. For example, enter: Opens the specified website when the user selects the button.
5. Under **Interface Options**, set **Interface Type** to **Button**.
6. Select **Enable Script**.
7. Under **Button Configuration**, set **Label** to Open Website.
8. Add an action, select the root scope, and enter the following formula script:

   ```text
   OPEN_LINK("https://www.microsoft.com")
   ```

9. Save the button configuration, and then select **Update**.

    :::image type="content" source="../media/scripting-functions/open-link/open-link-configuration.png" alt-text="Screenshot of the button configuration for the OPEN_LINK function." lightbox="../media/scripting-functions/open-link/open-link-configuration.png":::

    When a user selects **Open Website**, the planning item opens the specified URL in the browser.

    :::image type="content" source="../media/scripting-functions/open-link/open-link-result.png" alt-text="Screenshot of the planning item after the OPEN_LINK function opens the Microsoft website in a browser." lightbox="../media/scripting-functions/open-link/open-link-result.png":::
