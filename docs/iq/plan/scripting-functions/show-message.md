---
title: SHOW_MESSAGE
description: Use the SHOW_MESSAGE function to display a toast message when a user runs a script in a planning item.
ms.date: 10/28/2026
ms.topic: reference
---

# SHOW_MESSAGE

Use the SHOW_MESSAGE function to display a toast message to users when a script runs. For example, display a confirmation, provide a short instruction, or direct users to contact a person.

## Syntax

The following syntax displays a message.

```text
SHOW_MESSAGE("message")
```

Replace message with the text you want to display. Enclose the message in double quotation marks.

## Example

The following example displays a message that directs users to email the contact person at Contoso.

```text
SHOW_MESSAGE("Email the contact person at Contoso.com.")
```

## Configure a button to display a message

1. Open the planning item and create or edit an action parameter.
2. Set **Type** to **Action**.
3. Enter a name, such as Contact Person.
4. In **Description**, explain what the action does. For example, enter: Displays a message directing users to email the contact person at Contoso.com.
5. Under **Interface Options**, set **Interface Type** to **Button**.
6. Select **Enable Script**.
7. Under **Button Configuration**, set **Label** to Contact.
8. Add an action, select the root scope, and enter the following formula script:

   ```text
   SHOW_MESSAGE("Email the contact person at Contoso.com.")
   ```

9. Save the button configuration, and then select **Update**.

    :::image type="content" source="../media/scripting-functions/show-message/show-message-configuration.png" alt-text="Screenshot of the button configuration for the SHOW_MESSAGE function." lightbox="../media/scripting-functions/show-message/show-message-configuration.png":::

    When a user selects **Contact**, the planning item displays the message as a toast notification.

    :::image type="content" source="../media/scripting-functions/show-message/show-message-result.png" alt-text="Screenshot of the toast message displayed after a user selects the Contact button." lightbox="../media/scripting-functions/show-message/show-message-result.png":::
