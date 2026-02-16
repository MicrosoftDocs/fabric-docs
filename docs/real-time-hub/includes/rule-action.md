---
title: Set Actions for Rules in Fabric Activator
ms.reviewer: spelluru
description: Learn how to configure actions for rules in Fabric activators. An action can send an email, Teams message, run a Fabric pipeline, dataflow, notebook, Spark job, or custom function.
#customer intent: As an IT admin, I want to configure email alerts for specific conditions so that I can notify relevant stakeholders automatically.
author: spelluru
ms.author: spelluru
ms.topic: include
ms.date: 11/11/2025
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

    :::image type="content" source="./media/set-details-conditions-actions-rule/action-email.png" alt-text="Screenshot of the Add rule pane with the Send email action selected.":::            
    

### Teams message

To configure the alert to send a Teams message to an individual or a group chat or a channel when the condition is met, follow these steps:

1. For **Select action**, select **Teams** -> **Message to individuals** or **Group chat message**, or **Channel post**. 
1. Follow one of these steps depending on the option you selected in the previous step:
    - If you selected the **Message to individuals** option, enter **email addresses** of receivers or use the drop-down list to select a property whose value is an email address. When the condition is met, a Teams message is sent to specified individuals. 
    - If you selected the **Group chat message** option, select a **group chat** from the drop-down list. When the condition is met, a message is posted to the group chat. 
    - If you selected the **Channel post** option, select a **team** and a **channel**. When the condition is met, a message is posted in the channel. 
1. For **Headline**, enter a headline for the Teams message. 
1. For **Notes**, enter notes for the Teams message.

    > [!NOTE]
    > When entering headline or notes, you can refer to properties in the data by typing `@` or by selecting the button next to the text boxes. For example, `@BikepointID`. 
1. For **Context**, select values from the drop-down list that you want to include in the context. 

    :::image type="content" source="./media/set-details-conditions-actions-rule/action-teams.png" alt-text="Screenshot of the Add rule pane with the Send Teams message option selected.":::            

### Run Fabric activities

To configure the alert to launch a Fabric pipeline, dataflow (preview), notebook, or Spark job when the condition is met, follow these steps:

1. For **Select action**, select the appropriate Fabric item type within the "Run Fabric Activities" section

    :::image type="content" source="./media/set-details-conditions-actions-rule/action-fabric-item.png" alt-text="Screenshot of the Run Fabric items option.":::            
1. On **Select Fabric item to run**, select the Fabric item from the list. 
1. For the **Pipeline**, **Dataflow**, **Notebook**, and **Spark job** types, select **Add parameter** and specify the name of the parameter for the Fabric item and a value for it. You can add more than one parameter. 

    :::image type="content" source="./media/set-details-conditions-actions-rule/fabric-item-parameters.png" alt-text="Screenshot of the Add rule pane with parameters for a Fabric item specified.":::            

    If you selected **Run function** option, follow these steps:
    1. For **Function**, select a **function** from the list.
    1. For parameters to the function, specify values for each of the parameters defined for the function as shown in the following example:
    
        :::image type="content" source="./media/set-details-conditions-actions-rule/run-function-parameters.png" alt-text="Screenshot of the Add rule pane with parameters for a Function specified.":::

        You can use properties from the data by typing `@` or by selecting the button next to the text boxes. For example, `@BikepointID`.

### Custom action

To configure the alert to call a custom action when the condition is met, follow these steps:

1. For **Select action**, select **Create custom action**.
 
    :::image type="content" source="./media/set-details-conditions-actions-rule/custom-action.png" alt-text="Screenshot of the Action section with custom action selected.":::   
1. As mentioned in the **Action** section, create the rule first, and then complete the custom action setup by following steps from [Trigger custom actions (Power Automate flows)](/fabric/real-time-intelligence/data-activator/activator-trigger-power-automate-flows).

    :::image type="content" source="./media/set-details-conditions-actions-rule/create-custom-action.png" alt-text="Screenshot of the custom action selected.":::   
1. After you create the custom action, in the **Definition** pane of the rule, select the custom action from the **Action** drop-down list. 

    :::image type="content" source="./media/set-details-conditions-actions-rule/select-custom-action.png" alt-text="Screenshot of the custom action selected in the Select action drop-down list." lightbox="./media/set-details-conditions-actions-rule/select-custom-action.png":::