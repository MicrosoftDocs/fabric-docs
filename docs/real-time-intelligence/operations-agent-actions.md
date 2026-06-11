---
title: Operations Agent Actions
description: Learn how an operations agent in Fabric Real-Time Intelligence sends Teams messages and how to configure custom actions.
ms.reviewer: willthom, v-hzargari
ms.topic: how-to
ms.date: 05/13/2026
ms.search.form: Operations Agent Actions
ai-usage: ai-assisted
---

# Operations agent actions

Operations agents in Microsoft Fabric Real-Time Intelligence respond to the conditions they monitor by taking *actions*. By default, an operations agent sends a message in Microsoft Teams to the user who created the agent whenever it detects a condition that matches its business goals. You don't need to configure anything extra to receive these messages.

You can also extend the agent with *custom actions*, such as triggering a Power Automate flow, so the agent can do more than send a notification.

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

## Receive messages from an operations agent

To enable the agent to contact you proactively when it identifies data that matches the defined rules, install the Fabric Operations Agent Teams app. If the app isn't installed automatically, you can find it by searching for Fabric Operations Agent in the Teams app store.

:::image type="content" source="media/operations-agent/teams-app.png" alt-text="Screenshot of the Fabric Operations Agent in the Teams app." lightbox="media/operations-agent/teams-app.png":::

After you install the app, the agent can send messages in Teams when it identifies data that matches the specified conditions. These messages include a summary of the insights and recommended actions. You can update the recipients of these messages in the agent's configuration settings. Recipients must belong to your organization and have write permissions for the agent item in Fabric. You can find this in the operations agent item settings under **Agent behavior**.

:::image type="content" source="media/operations-agent/agent-behavior.png" alt-text="Screenshot of the option for agent behavior in the Fabric Operations Agent settings." lightbox="media/operations-agent/agent-behavior.png":::

> [!IMPORTANT]
> The agent operates by using the delegated identity and permissions of its creator. When a recipient approves a recommendation, the agent executes the action on behalf of the creator, using the creator's permissions.

When the agent makes a recommendation, you receive a message containing context about the data that triggered the condition it was monitoring. You also receive a suggestion from the agent about the best action to take in response.

:::image type="content" source="media/operations-agent/example-message.png" alt-text="Screenshot of an example message from the operations agent in Teams." lightbox="media/operations-agent/example-message.png":::

Select **Yes** to approve or **No** to reject the recommendation. The message displays the values for any parameters the agent identifies. You can adjust these parameters if needed before providing final approval for the agent to take action.

<!-- TODO (GA): Add a section that explains how to send messages to a Teams channel instead of a 1:1 chat once the feature ships. Include configuration steps and a screenshot of the channel target picker. -->

## Create custom actions

In addition to Teams messages, you can define custom actions that the agent can take when it detects a condition. Each action has a name, a description that clarifies its purpose, and an optional list of parameters (such as a specific value) that the agent passes when it invokes the action.

<!-- TODO (GA): Replace the screenshots in this section when the new action wizard ships. The new wizard changes the layout of the actions pane, the configuration pane, and the connection step. -->
<!-- TODO (GA): Add subsections for the new built-in action types (for example, run a Fabric notebook, run a Fabric pipeline) once they're available. Each new action type needs a short description, configuration steps, and a screenshot. -->

:::image type="content" source="media/operations-agent/actions.png" alt-text="Screenshot of the actions section on the setup page." lightbox="media/operations-agent/actions.png":::

After you create an action, configure it:

1. Select the action you want to configure.

    :::image type="content" source="media/operations-agent/action-needs-configuration.png" alt-text="Screenshot of the action needing configuration." lightbox="media/operations-agent/action-needs-configuration.png":::

1. On the **Configure custom action** pane, select the workspace and the activator item, and then create a connection.

    :::image type="content" source="media/operations-agent/create-connection.png" alt-text="Screenshot of the pane for configuring a custom action." lightbox="media/operations-agent/create-connection.png":::

1. Select **Copy** to copy the connection string, and select **Open flow builder** to create a flow that gets triggered by the action.

    :::image type="content" source="media/operations-agent/connector.png" alt-text="Screenshot of copying the connection string." lightbox="media/operations-agent/connector.png":::

1. In the **Flow builder**, paste the connection string in the **Connection string** field and select **Save**.

    :::image type="content" source="media/operations-agent/activator.png" alt-text="Screenshot of the flow builder with the connection string." lightbox="media/operations-agent/activator.png":::

1. To use the values passed through the parameters to the flow, access them through dynamic content as described in [Trigger custom actions (Power Automate flows)](data-activator/activator-trigger-power-automate-flows.md#use-dynamic-content-in-your-flow).

## Related content

* [Create and configure operations agents](operations-agent.md)
* [Operations agent limitations](operations-agent-limitations.md)
