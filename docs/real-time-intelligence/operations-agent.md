---
title: Create and Configure Operations Agents
description: Learn how to use operations agents in Fabric Real-Time Intelligence.
ms.reviewer: willthom, v-hzargari
ms.topic: how-to
ms.date: 06/18/2026
ms.search.form: Operations Agent
ai-usage: ai-assisted
---

# Create and configure operations agents

Operations agents in Fabric Real-Time Intelligence help organizations turn real-time data into immediate, actionable decisions. Instead of relying on manual monitoring and intervention, use agents to track key metrics continuously, surface insights, and recommend targeted actions. They enable teams to respond quickly and optimize operations at scale. Each operations agent is a dedicated Fabric item, designed for a specific business process.

By configuring agents with clear instructions, and data sources, you can deploy multiple agents as virtual experts across your organization. This modular approach monitors and continuously improves every critical process, and keeps recommended actions aligned with your strategic objectives.

In this article, you learn how to create and use an AI operations agent in Real-Time Intelligence. The operations agent monitors real-time data and suggests actionable decisions.

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity). Trial capacities aren't supported.
* An [eventhouse](create-eventhouse.md) or [ontology](../iq/ontology/overview.md) in your workspace.
* A [KQL database](create-database.md) in your eventhouse, if you're using an eventhouse.
* A Microsoft Teams account.
* Fabric admin permissions enabled for the operations agent, Microsoft Copilot, and Azure OpenAI.
* Enable cross-geo processing and storage for AI as described in [data agent tenant settings](../data-science/data-agent-tenant-settings.md). This prerequisite applies only if your Fabric capacity isn't provisioned in US or EU regions.  

    :::image type="content" source="media/operations-agent/admin.png" alt-text="Screenshot of the Admin portal to enable permissions.":::

> [!NOTE]
> To try an operations agent on sample data, set up the [Real-Time Intelligence end-to-end sample](../real-time-intelligence/sample-end-to-end.md). Your operations agent can monitor the included eventhouse.

## Create an operations agent

1. On the Fabric home page, select the ellipsis (**...**) icon, and then select **Create**.

    :::image type="content" source="media/operations-agent/create.png" alt-text="Screenshot of the ellipsis icon and Create option.":::

1. On **Create**, go to the **Real-Time Intelligence** section, and select **Operations agent**.

    :::image type="content" source="media/operations-agent/operational-agents.png" alt-text="Screenshot of the option for creating an operations agent.":::

1. On **New Operations agent**, enter a name for your agent and select the workspace where you want to create it.

    :::image type="content" source="media/operations-agent/new-agent.png" alt-text="Screenshot of the pane for a new operations agent." lightbox="media/operations-agent/new-agent.png":::

1. Select **Create** to create the operations agent.

## Configure an operations agent

On **Agent setup**, configure the operations agent and adjust it to your data by providing the following information:

1. Provide specific instructions to guide the agent's behavior and decision-making process. For example, you can tell the agent to send you an alert when it detects a condition that matches your business goals.

    :::image type="content" source="media/operations-agent/agent-instruction.png" alt-text="Screenshot of the instructions section on the setup page." lightbox="media/operations-agent/agent-instruction.png":::

1. Choose a relevant data source that the agent can analyze and monitor. This choice gives the agent access to accurate, up-to-date information to generate insights.

    :::image type="content" source="media/operations-agent/knowledge-source.png" alt-text="Screenshot of the knowledge source section on the setup page." lightbox="media/operations-agent/knowledge-source.png":::

1. By default, an operations agent can send you messages in Teams when the conditions it monitors are met. Optionally, you can configure additional actions that it can recommend and take. For more information, see [Operations agent actions](operations-agent-actions.md).

When you finish the configuration, save the agent and select **Generate Playbook**. The playbook outlines the goals, instructions, data, and actions you defined, so the agent understands its tasks.

You can see the properties and the fields they map to in the underlying data. When you review the rules, you might see a rule refer to the name of the property rather than the underlying column. Confirm that the model and rules match your requirements.

:::image type="content" source="media/operations-agent/properties.png" alt-text="Screenshot of the playbook and its properties." lightbox="media/operations-agent/properties.png":::

The playbook displays the concepts the agent monitors and the rules or conditions it evaluates.

## Use Copilot chat to configure the operations agent's instructions and rules

Instead of configuring every goal, rule, and threshold by hand, you can use the built-in Copilot chat to set up the agent conversationally. Open chat from the ribbon.

:::image type="content" source="media/operations-agent/open-chat.png" alt-text="Screenshot of ribbon and the open chat button." lightbox="media/operations-agent/open-chat.png":::

Start by describing what you want the agent to do in natural language, such as "Monitor the turbines and alert me when motor temperature gets too high." The chat interprets your intent, grounds it against the data source you selected, and helps translate it into the goals, instructions, and rules that make up the agent's playbook. You can use chat alongside manual configuration, so you can type instructions directly or ask Copilot to draft and refine them for you.

The chat is most useful for refining instructions and turning them into monitoring logic. As you describe conditions, Copilot proposes rules and the queries that back them, and it tells you when something needs attention, for example when an instruction is unclear, references data that isn't available, or asks for a condition or action that isn't supported. This feedback loop helps you correct course before you start the agent, rather than discovering gaps at runtime. Because an explicit query backs each rule, you can inspect what Copilot generates and validate the logic yourself.

Configuration is iterative. After Copilot proposes rules, queries, and actions, you can ask follow-up questions to refine the instructions, adjust thresholds, or narrow the monitoring scope. The playbook updates as you go. Continue this propose-clarify-refine loop until the playbook reflects what you want the agent to watch for and how it responds. When you're satisfied, review the resulting goals, rules, data sources, and actions. Then save and start the agent.

## Start the agent

To adjust the agent's behavior, update the goals or instructions and save the agent again. When you're satisfied with the configuration, select **Start** in the toolbar to start the agent. Select **Stop** to stop it.

> [!IMPORTANT]
> The agent operates with the delegated identity and permissions of its creator. When a recipient approves a recommendation, the agent runs the action on behalf of the creator, using the creator's permissions.

## Understand operations agent rules

The agent runs a query for each rule against your data source. You can view this query to see exactly how the rule maps to the underlying columns, properties, and logic. Reviewing the query helps you validate that the agent evaluates the right property, applies the intended condition, and reads the correct data. This way, you confirm the agent looks for the right thing before you start it.

:::image type="content" source="media/operations-agent/rule-details.png" alt-text="Screenshot of a rule expanded to show the query." lightbox="media/operations-agent/rule-details.png":::

You can use the **Copy code** option and paste it into a KQL Queryset item, or the Ontology graph query editor, to test it against your data. For KQL, you need to replace the *startTime* and *endTime* parameters with recent timestamps (or the KQL `now()` function) to validate it against your data.

The operations agent runs the rule's query every 5 minutes and tracks the results against a condition that defines *when* the rule is met. Conditions fall into two categories, and the difference determines how often a rule signals:

* **State conditions** are met *any time* the property's current value satisfies the condition. They stay satisfied for as long as the value remains in that state, so they can signal repeatedly while the condition persists. Use a state condition when you care about *being* in a state, such as "the temperature is above 80."
* **Transition conditions** are met *only at the moment* the property changes from not satisfying the condition to satisfying it, including a change from a null value. They signal once per transition and don't signal again until the value leaves the condition and re-enters it. Use a transition condition when you care about the *change*, such as "the temperature becomes greater than 80."

For example, **Is above** is met on every evaluation while a value stays over the threshold, whereas **Crosses above** is met only when the value moves from below to above the threshold. Choose the condition that matches whether you want to respond to an ongoing state or to a change in state.

The following table describes the available conditions:

| Condition | Type | When it's met |
|-----------|------|---------------|
| Is above | State | Met any time the property is above the value. |
| Crosses above | Transition | Met when the property changes from below to above the value (or from null to above the value). |
| Is below | State | Met any time the property is below the value. |
| Crosses below | Transition | Met when the property changes from above to below the value (or from null to below the value). |
| Enters range | Transition | Met any time the property changes from outside to inside the range. |
| Exits range | Transition | Met any time the property changes from inside to outside the range. |
| Is | State | Met any time the property matches the value. |
| Becomes | Transition | Met when the property changes to the value from a different value (or null). |

## Related content

* [Operations agent actions](operations-agent-actions.md)
* [Operations agent limitations](operations-agent-limitations.md)
