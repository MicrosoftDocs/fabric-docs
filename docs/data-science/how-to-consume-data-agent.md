---
title: Consume a Fabric data agent (preview)
description: Learn how to consume a Fabric data agent.
author: fbsolo-ms1
ms.author: amjafari
ms.reviewer: franksolomon
reviewer: midesa
ms.service: fabric
ms.subservice: data-science
ms.topic: how-to #Don't change
ms.date: 03/21/2025
ms.collection: ce-skilling-ai-copilot

#customer intent: As an Analyst, I want to consume Fabric data agent within Azure AI Agent Services in Azure AI Foundry.

---

# Consume Fabric data agent (preview)

Data agent in Microsoft Fabric transforms enterprise data into conversational Q&A systems, and it enables users to interact with their data through chat, to uncover actionable insights. One way to consume Fabric data agent is through Azure AI Agent Service, a core component of Azure AI Foundry. Through integration of Fabric data agents with Azure AI Foundry, your Azure AI agents can directly tap into the rich, structured, and semantic data available in Microsoft Fabric OneLake. This integration provides immediate access to high-quality enterprise data, and it empowers your Azure AI agents to generate actionable insights and streamline analytical workflows. Organizations can then enhance data-driven decision-making with Fabric data agent as a powerful knowledge source within their Azure AI environments.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

## Prerequisites

- [A paid F64 or higher Fabric capacity resource](../fundamentals/copilot-fabric-overview.md#available-regions-for-azure-openai-service)
- [Fabric data agent tenant settings](./data-agent-tenant-settings.md) is enabled.
- [Copilot tenant switch](./data-agent-tenant-settings.md) is enabled.
- [Cross-geo processing for AI](./data-agent-tenant-settings.md) is enabled.
- [Cross-geo storing for AI](./data-agent-tenant-settings.md) is enabled.
- A warehouse, lakehouse, Power BI semantic models, and KQL databases with data.
- [Power BI semantic models via XMLA endpoints tenant switch](./data-agent-tenant-settings.md) is enabled for Power BI semantic model data sources.
- Developers and end users must at least have `AI Developer` ​Role-Based Access Control (RBAC) role.

## How it works

**Agent Setup**: In Azure AI Agent Service, create a new agent and add Fabric data agent as one of its knowledge sources. To establish this connection, you need the workspace ID and artifact ID for the Fabric data agent. The setup enables your Azure AI agent to evaluate available sources when it receives a query, ensuring that it invokes the correct tool to process the request. Currently, you can only add one Fabric data agent as a knowledge source to your Azure AI agent.

> [!NOTE]
> The model you select in Azure AI Agent setup is only used for Azure AI agent orchestration and response generation. It doesn't impact the model that Fabric data agent uses.

**Query Processing**: When a user sends a query from the Foundry playground, the Azure AI Agent Service determines whether or not Fabric data agent is the best tool for the task. If it is, the Azure AI agent:

- Uses the end user’s identity to generate secure queries over the data sources the user is permitted to access within the Fabric data agent.
- Invokes Fabric to fetch and process the data, to ensure a smooth, automated experience.
- Combines the results from Fabric data agent with its own logic to generate comprehensive responses. Identity Passthrough (On-Behalf-Of) authorization secures this flow, to ensure robust security and proper access control across enterprise data.

## Adding Fabric data agent to your Azure AI Agent

You can add Fabric data agent to your Azure AI agent either programmatically or with the user interface (UI). Detailed code examples and further instructions are available in the Azure AI Agent integration documentation.

**Add Fabric data agent through UI**:

- Navigate to the left pane. Under **Build and Customize**, select **Agents**, as shown in the following screenshot:

:::image type="content" source="./media/how-to-consume-data-agent/foundry-agents.png" alt-text="Screenshot showing the main Azure Foundry page." lightbox="./media/how-to-consume-data-agent/foundry-agents.png":::

This displays the list of your existing Azure AI agents. You can add Fabric to one of these agents, or you can select **New Agent** to create a new agent. New agent creation generates a unique agent ID, and a default name. You can change that name at any time. For more information, please visit [What is Azure OpenAI in Azure AI Foundry portal](/azure/ai-foundry/azure-openai-in-ai-foundry).

- Initiate Adding a Knowledge Source: Select the **Add** button, as shown in the following screenshot:

:::image type="content" source="./media/how-to-consume-data-agent/add-knowledge.png" alt-text="Screenshot showing addition of Fabric data agent as knowledge." lightbox="./media/how-to-consume-data-agent/add-knowledge.png":::

This opens a menu of supported knowledge source types.

- Select Microsoft Fabric as the Source: From the list, choose **Microsoft Fabric**, as shown in the following screenshot:

:::image type="content" source="./media/how-to-consume-data-agent/select-fabric.png" alt-text="Screenshot showing selecting Fabric as knowledge source." lightbox="./media/how-to-consume-data-agent/select-fabric.png":::

With this option, your agent can access Fabric data agent.

- Create a connection: If you previously established a connection to a Fabric data agent, you can reuse that connection for your new Azure AI Agent. Otherwise, select **New Connection** to create a connection, as shown in this screenshot:

:::image type="content" source="./media/how-to-consume-data-agent/new-connection.png" alt-text="Screenshot showing how to create a new Fabric connection." lightbox="./media/how-to-consume-data-agent/new-connection.png":::

The **Create a new Microsoft Fabric connection** window opens, as shown in this screenshot:

:::image type="content" source="./media/how-to-consume-data-agent/create-connection.png" alt-text="Screenshot showing creating a connection." lightbox="./media/how-to-consume-data-agent/create-connection.png":::

When you set up the connection, provide the Fabric data agent `workspace-id` and `artifact-id` values as custom keys. You can find the `workspace-id` and `artifact-id` values in the published Fabric data agent endpoint. Your Fabric data agent endpoint has this format:

https://fabric.microsoft.com/groups/<**workspace_id**>/aiskills/<**artifact-id**>, and select the **Is Secret** checkbox

Finally, assign a name to your connection, and choose whether to make it available to all projects in Azure AI Foundry or to restrict it to the current project.

**Add Fabric data agent programmatically**: You can refer to learn how to add Fabric data agent programmatically to your Azure AI agent.

## Related content

- [Data agent concept](concept-data-agent.md)
- [Data agent scenario](data-agent-scenario.md)