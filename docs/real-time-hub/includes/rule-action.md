---
title: Set actions for a rule
description: Include file with instructions to add actions for a rule in a Fabric activator. 
author: spelluru
ms.author: spelluru
ms.topic: include
ms.date: 10/21/2025
---

## Action section

In the **Action** section, select one of the following actions:

### Email

To configure the alert to send an email when the condition is met, follow these steps:

1. For **Select action**, select **Send email**. 
1. For **To**, enter the **email address** of the receiver or use the drop-down list to select a property whose value is an email address. 
1. For **Subject**, enter a subject for the email. 
1. For **Headline**, enter a headline for the email.
1. For **Notes**, enter notes for the emails.

    > [!NOTE]
    > When entering subject, headline, or notes, you can refer to properties in the data by typing `@` or by selecting the button next to the text boxes. For example, `@BikepointID`. 
1. For **Context**, select values from the drop-down list that you want to include in the context. 

    :::image type="content" source="./media/set-details-conditions-actions-rule/action-email.png" alt-text="Screenshot that shows the Add rule pane with the Send email action selected.":::            
    

### Teams message

To configure the alert to send a Teams message to an individual or a group chat or a channel when the condition is met, follow these steps:

1. For **Select action**, select **Teams** -> **Message to individuals** or **Group chat message**, or **Channel post**. 
1. Follow one of these steps depending on the option you selected in the previous step:
    - If you selected the **Message to individuals** option, enter **email addresses** of receivers or use the drop-down list to select a property whose value is an email address. When the condition is met, an email is sent to specified individuals. 
    - If you selected the **Group chat message** option, select a **group chat** from the drop-down list. When the condition is met, a message is posted to the group chat. 
    - If you selected the **Channel post** option, select a **team** and a **channel**. When the condition is met, a message is posted in the channel. 
1. For **Headline**, enter a headline for the email. 
1. For **Notes**, enter notes for the emails.

    > [!NOTE]
    > When entering headline, or notes, you can refer to properties in the data by typing `@` or by selecting the button next to the text boxes. For example, `@BikepointID`. 
1. For **Context**, select values from the drop-down list that you want to include in the context. 

    :::image type="content" source="./media/set-details-conditions-actions-rule/action-teams.png" alt-text="Screenshot that shows the Add rule pane with the Send Teams message option selected.":::            

### Run a Fabric item

To configure the alert to launch a Fabric item (pipeline, notebook, Spark job, etc.) when the condition is met, follow these steps:

1. For **Selection action**, select **Run a Fabric item**.

    :::image type="content" source="./media/set-details-conditions-actions-rule/action-fabric-item.png" alt-text="Screenshot that shows the Add rule pane with Run a Fabric item option selected.":::            
2. Choose **Select Fabric item to run**, and then select the Fabric item from the list. 
1. Select **Add parameter** and specify the name of the parameter for the Fabric item and a value for it. You can add more than one parameter. 

        :::image type="content" source="./media/set-details-conditions-actions-rule/fabric-item-parameters.png" alt-text="Screenshot that shows the Add rule pane with parameters for a Fabric item specified.":::            