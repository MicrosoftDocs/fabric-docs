---
title: Operations Agent Actions
description: Learn how an operations agent in Fabric Real-Time Intelligence sends Teams messages and how to configure custom actions.
ms.reviewer: willthom, v-hzargari, tessarhurr
ms.topic: how-to
ms.date: 06/24/2026
ms.search.form: Operations Agent Actions
ai-usage: ai-assisted
---

# Operations agent actions

Operations agents in Microsoft Fabric Real-Time Intelligence respond to the conditions they monitor by taking *actions*. By default, an operations agent can send a message in Microsoft Teams to the user who created the agent whenever it detects a condition that matches its business goals. You don't need to configure anything extra to receive these messages.

You can also extend the agent with further actions, such as running a Fabric notebook or triggering a Power Automate flow, so the agent can do more than send a notification.

## Receive messages from an operations agent

To enable the agent to contact you proactively when it identifies data that matches the defined rules, install the Fabric Operations Agent Teams app. If the app isn't installed automatically, you can find it by searching for Fabric Operations Agent in the Teams app store.

:::image type="content" source="media/operations-agent/teams-app.png" alt-text="Screenshot of the Fabric Operations Agent in the Teams app." lightbox="media/operations-agent/teams-app.png":::

After you install the app, the agent can send messages in Teams when it identifies data that matches the specified conditions. These messages include a summary of the insights and recommended actions. You can update the recipients of these messages in the agent's configuration settings. Recipients must belong to your organization and have write permissions for the agent item in Fabric. You can find these details in the operations agent item settings under **Agent behavior**.

Select **Edit** and choose from sending a direct message to an individual user, or posting in a Teams channel.

:::image type="content" source="media/operations-agent/agent-behavior.png" alt-text="Screenshot of the option for agent behavior in the Fabric Operations Agent settings." lightbox="media/operations-agent/agent-behavior.png":::

> [!IMPORTANT]
> The agent operates by using the delegated identity and permissions of its creator. When a recipient approves a recommendation, the agent executes the action on behalf of the creator, using the creator's permissions.

When the agent makes a recommendation, you receive a message containing context about the data that triggered the condition it was monitoring. You also receive a suggestion from the agent about the best action to take in response.

## Understand anomaly alerts with Investigator insights (preview)

When the operations agent detects an anomaly, it automatically runs Investigator insights to provide more context about what happened. Investigator insight analyzes telemetry data and detects correlated or explanatory patterns around the time of the anomaly, helping you understand the potential causes without manually investigating the data.

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

### View Investigator insights in Teams

To view Investigator insights, open the agent's message in Teams and select **Investigate further**.

:::image type="content" source="media/operations-agent/initial-teams-notification.png" alt-text="Screenshot of the Investigator insights button in Teams." lightbox="media/operations-agent/initial-teams-notification.png":::

The agent generates a detailed analysis of the anomaly and a summary of the root cause. To view the full analysis, select **View full investigation**.

:::image type="content" source="media/operations-agent/teams-view-full-investigation.png" alt-text="Screenshot of the Investigator insights summary in Teams." lightbox="media/operations-agent/teams-view-full-investigation.png":::

The full investigation includes the following sections:

1. **Investigation scope:**

    * Displays the name of the table that was analyzed.

    :::image type="content" source="media/operations-agent/investigation-scope.png" alt-text="Screenshot of the investigation scope in Investigator insights." lightbox="media/operations-agent/investigation-scope.png":::

1. **Key observations:**

    * Lists actual findings:
        * Actual values
        * Deviations from baseline
        * Trends and outliers

    :::image type="content" source="media/operations-agent/key-observations.png" alt-text="Screenshot of the key observations in Investigator insights." lightbox="media/operations-agent/key-observations.png":::

1. **Pattern analysis:**

    * Highlights changes around the anomaly, including:
        * Dimensions with significant changes
        * Signals that shifted
    * Indicates when no meaningful patterns were found

    :::image type="content" source="media/operations-agent/pattern-analysis.png" alt-text="Screenshot of the pattern analysis in Investigator insights." lightbox="media/operations-agent/pattern-analysis.png":::

### No available Investigator insights

If the agent doesn't find any meaningful patterns, it displays a message explaining what it analyzed and confirming that it found no statistically significant patterns. This outcome is normal when there's no identifiable root cause. It means the investigation ran completely and the data didn't surface any correlated signals.

The agent might also suppress Investigator insights results if:

* The analysis contradicts the alert logic.
* The analysis produces irrelevant information.
* The results exceed Teams message limits.

## Configure agent actions

The operations agent can perform various actions when it detects a condition. Select the appropriate tab to configure your preferred action type.

# [Teams message](#tab/teams-message)

You can configure the operations agent to send a direct message to an individual user or post in a Teams channel when it detects a condition.
In the operations agent settings, under **Agent behavior**, select **Edit** and choose the recipient of the messages.

:::image type="content" source="media/operations-agent/agent-behavior.png" alt-text="Screenshot of the agent behavior settings." lightbox="media/operations-agent/agent-behavior.png":::

# [Fabric item action](#tab/fabric-item-action)

In addition to Teams messages, you can provide actions that the agent can take when it detects a condition. Each action has a name, a description that clarifies its purpose, and an optional list of parameters (such as a specific value) that the agent passes when it invokes the action. Select **Add action** in the Agent setup to define an action.

Fabric item actions allow you to run notebooks, pipelines, user-defined functions, and other Fabric items.

:::image type="content" source="media/operations-agent/create-actions.png" alt-text="Screenshot of the action selection." lightbox="media/operations-agent/create-actions.png":::

### Configure a Fabric item action

1. Select **Fabric item**, browse to the item, and select the appropriate function. Enter the **Action name** and **Action description**. The agent uses this information to decide which action is appropriate when conditions are met.

    :::image type="content" source="media/operations-agent/new-action.png" alt-text="Screenshot of defining a new action." lightbox="media/operations-agent/new-action.png":::

1. The agent setup pane shows the completed action. Select **Edit** to reconfigure the action.

   :::image type="content" source="media/operations-agent/created-action.png" alt-text="Screenshot of the configured action." lightbox="media/operations-agent/created-action.png":::

# [Power Automate action](#tab/power-automate-action)

Choose Power Automate to create a new flow in Power Automate and link this agent to it.

:::image type="content" source="media/operations-agent/create-actions.png" alt-text="Screenshot of the action selection." lightbox="media/operations-agent/create-actions.png":::

### Configure a Power Automate action

1. Select **Power Automate action**, and enter the **Action name** and **Action description**. The agent uses this information to decide which action is appropriate when conditions are met.

    :::image type="content" source="media/operations-agent/create-actions.png" alt-text="Screenshot of the dialog for configuring a custom action." lightbox="media/operations-agent/create-actions.png":::

1. Select the workspace and **Activator** item to save the Power Automate connection. The agent uses this item only for saving the connection details. Then, select **Copy** to copy the connection string, and select **Open flow builder** to create a flow that gets triggered by the action.

    :::image type="content" source="media/operations-agent/configure-custom-action.png" alt-text="Screenshot of copying the connection string." lightbox="media/operations-agent/configure-custom-action.png":::

1. In the **Flow builder**, paste the connection string in the **Connection string** field and select **Save**.

    :::image type="content" source="media/operations-agent/activator.png" alt-text="Screenshot of the flow builder with the connection string." lightbox="media/operations-agent/activator.png":::

1. To use the values passed through the parameters to the flow, access them through dynamic content as described in [Trigger custom actions (Power Automate flows)](data-activator/activator-trigger-power-automate-flows.md#use-dynamic-content-in-your-flow).

---

## Related content

* [Operations agent limitations](operations-agent-limitations.md)
* [Operations agent limitations](operations-agent-limitations.md)
* [Operations agent transparency note](operations-agent-transparency-note.md)
