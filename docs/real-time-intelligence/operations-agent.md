---
title: Create and Configure Operations Agents
description: Learn how to use operations agents in Fabric Real-Time Intelligence.
ms.reviewer: willthom, v-hzargari
ms.topic: how-to
ms.date: 05/24/2026
ms.search.form: Operations Agent
ai-usage: ai-assisted
---

# Create and configure operations agents

Operations agents in Fabric Real-Time Intelligence help organizations turn real-time data into immediate, actionable decisions. Instead of relying on manual monitoring and intervention, use agents to track key metrics continuously, surface insights, and recommend targeted actions. They enable teams to respond quickly and optimize operations at scale. Each operations agent is a dedicated Fabric item, designed for a specific business process.

By configuring agents with clear goals, instructions, and data sources, you can deploy multiple agents as virtual experts across your organization. This modular approach ensures that every critical process is monitored and dynamically improved, with recommended actions always aligned to your strategic objectives.

In this article, you learn how to create and use an AI operations agent in Real-Time Intelligence. The operations agent is designed to monitor real-time data and suggest actionable decisions.

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity). Trial capacities aren't supported.
* An [eventhouse](create-eventhouse.md) or [ontology](../iq/ontology/overview.md) in your workspace.
* A [KQL database](create-database.md) in your eventhouse, if you're using an eventhouse.
* A Microsoft Teams account.
* Fabric admin permissions enabled for operations agent preview, and Microsoft Copilot and Azure OpenAI.
* The cross-geo processing and storage for AI as per [data agent tenant settings](../data-science/data-agent-tenant-settings.md). This prerequisite only applies if your Fabric capacity isn't provisioned in US or EU regions.  

    :::image type="content" source="media/operations-agent/admin.png" alt-text="Screenshot of the Admin portal to enable permissions.":::

> [!NOTE]
> If you want to try operations agent on sample data, please set up the [Real-time Intelligence end to end sample](../real-time-intelligence/sample-end-to-end.md). The included Eventhouse can be monitored by your operations agent.

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

1. Define the business goals that the agent should focus on. This information helps the agent understand the context and objectives of your operations.

    :::image type="content" source="media/operations-agent/business-goals.png" alt-text="Screenshot of the business goals section on the setup page." lightbox="media/operations-agent/business-goals.png":::

1. Provide specific instructions to guide the agent's behavior and decision-making process. For example, you can tell the agent to send you an alert when it detects a condition that matches your business goals.

    :::image type="content" source="media/operations-agent/agent-instruction.png" alt-text="Screenshot of the instructions section on the setup page." lightbox="media/operations-agent/agent-instruction.png":::

1. Choose a relevant data source that the agent can analyze and monitor. This choice ensures the agent has access to accurate and up-to-date information for generating insights.

    :::image type="content" source="media/operations-agent/knowledge-source.png" alt-text="Screenshot of the knowledge source section on the setup page." lightbox="media/operations-agent/knowledge-source.png":::

1. By default, operations agents can send you messages via Teams when conditions it is monitoring for are met. Optionally you can also configure additional actions that it can recommend and take. See [Operations agent actions](operations-agent-actions.md) for more details.

When you finish the configuration, save the agent and select Generate Playbook. The playbook outlines the goals, instructions, data, and actions you defined, providing the agent with a clear understanding of its tasks.

You can see properties and the fields that they're mapped to from the underlying data. When you review the rules, you might see it refer to the name of the property rather than the underlying column. Take care to confirm the model and rules match your requirements.

:::image type="content" source="media/operations-agent/properties.png" alt-text="Screenshot of the playbook and its properties." lightbox="media/operations-agent/properties.png":::

The playbook displays the concepts the agent monitors and the rules or conditions it evaluates. To adjust the agent's behavior, update the goals or instructions and save the agent again. When you're satisfied with the configuration, select **Start** in the toolbar to start the agent. Select **Stop** to stop it.

> [!IMPORTANT]
> The agent operates by using the delegated identity and permissions of its creator. When a recipient approves a recommendation, the agent executes the action on behalf of the creator, using the creator's permissions.


## Related content

* [Operations agent actions](operations-agent-actions.md)
* [Operations agent limitations](operations-agent-limitations.md)
