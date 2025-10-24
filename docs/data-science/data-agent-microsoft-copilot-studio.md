---
title: Consume a data agent in Microsoft Copilot Studio (preview)
description: Learn how to consume a data agent in Microsoft Copilot Studio.
author: jonburchel
ms.author: jburchel
ms.reviewer: amjafari
reviewer: amjafari
ms.service: fabric
ms.subservice: data-science
ms.topic: how-to #Don't change
ms.date: 08/20/2025
ms.update-cycle: 180-days
ms.collection: ce-skilling-ai-copilot
#customer intent: As an Analyst, I want to consume a Fabric data agent within Microsoft Copilot Studio.
---

# Consume a Fabric Data Agent in Microsoft Copilot Studio (preview)

Microsoft Copilot Studio is a graphical, low-code platform for building custom AI agents that understand natural language, answer user inquiries, and perform actions such as automating tasks. These agents can then be deployed across channels such as Microsoft Teams, websites, and Microsoft 365 Copilot.

One of the ways to consume a Fabric data agent is by adding it to a custom AI agent in Microsoft Copilot Studio as a connected agent. This connected agents setup enables agent-to-agent collaboration, allowing the custom AI agent in Copilot Studio to securely access enterprise data through the Fabric data agent and ground its responses in organizational knowledge for improved accuracy, relevance, and context.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

[!INCLUDE [data-agent-prerequisites](./includes/data-agent-prerequisites.md)]
- Microsoft 365 Copilot license and a user license for each individual who builds and manages custom agents.

### Prerequisites for making Fabric data agents available in Copilot Studio

Before you can connect a Fabric data agent to Microsoft Copilot Studio, ensure the following settings are configured:

1. **Data agent readiness**: Confirm that data agent is working as expected and is responding to queries.

1. **Publish your Fabric data agent**: The data agent must be published with a rich and detailed description.

1. **Tenant alignment**: Both the Fabric data agent and Microsoft Copilot Studio agent must be on the same tenant.

1. **Authentication**: Sign in to both Microsoft Fabric and Microsoft Copilot Studio with the same account that has access to the data agent.

1. **Permissions**: Ensure you have the following permissions:
   - At least read access to the Fabric data agent. Read [here](../data-science/data-agent-sharing.md?tabs=azure-devops) about different permissions to the Fabric data agent.
   - Permission to create and modify agents in Microsoft Copilot Studio
   - Access to the underlying data sources used by the Fabric data agent

## How to add a Fabric data agent to the custom AI agent in Copilot Studio

1. Navigate to [Microsoft Copilot Studio](https://copilotstudio.microsoft.com) and select your desired environment.

   :::image type="content" source="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-environments.png" alt-text="Screenshot showing the main select environment in Copilot Studio." lightbox="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-environments.png":::

1. Once you select desired environment, on the left pane, select **Create**, then select **+ New agent** to start building your custom AI agent. If you already have a custom AI agent, you can skip steps 2 and 3.

   :::image type="content" source="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-create-agent.png" alt-text="Screenshot showing the main page to create agent in Copilot Studio." lightbox="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-create-agent.png":::

1. Configure your agent by giving it a **Name** and **Description** that describes its purpose and role. Make sure to save your changes.

   :::image type="content" source="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-main.png" alt-text="Screenshot showing to set up name and description for custom AI agent." lightbox="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-main.png":::

1. Once you set the basic details, you can move forward by adding:
   - **Knowledge sources** such as SharePoint, public websites, or uploaded files.
   - **Tools** that enable the agent to perform specific tasks or access external systems.
   - **Connections to other agents**, allowing more complex scenarios where multiple agents collaborate.

1. To add a Fabric data agent to your custom AI agent in Copilot Studio, navigate to **Agents** from the top pane and then select **+ Add** to add agents to your custom AI agent.

   :::image type="content" source="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-agents.png" alt-text="Screenshot showing the first step to add agents to Copilot Studio." lightbox="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-agents.png":::

1. Select Microsoft Fabric from the **Choose how you want to extend your agent** category.

   :::image type="content" source="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-add-fabric.png" alt-text="Screenshot showing the Fabric as connected agents category." lightbox="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-add-fabric.png":::

1. If there's already a connection between Microsoft Fabric and the custom AI agent, you can select **Next** and move to next step. Otherwise, select the dropdown and select **Create new connection** to establish a connection between Microsoft Fabric and Copilot Studio.

   :::image type="content" source="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-connector.png" alt-text="Screenshot showing to add the Fabric connector to Copilot Studio." lightbox="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-connector.png":::

   > [!NOTE]
   > Ensure to publish your Fabric data agent before adding to your custom AI agent in Copilot Studio. The Fabric data agent and Microsoft Copilot resources should be on the same tenant, and both Microsoft Fabric and Microsoft Copilot should be signed in with the same account.

1. From the list of Fabric data agents you have access to, select the data agent that you want to connect to the custom AI agent in Copilot Studio and select **Next**. The selected data agent works together with the custom AI agent to handle specific workflows.

   :::image type="content" source="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-data-agents.png" alt-text="Screenshot showing the list of Fabric data agents." lightbox="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-data-agents.png":::

   > [!TIP]
   > If you don't see your Fabric data agent in the list, verify that:
   > - The data agent is published and running in Microsoft Fabric.
   > - You're signed in with the correct account that has access to the data agent.
   > - The data agent and Copilot Studio are on the same tenant.
   > - You have the necessary permissions to access the Fabric workspace.

1. You can adjust the description for the Fabric data agent that you select and then select **Add agent**. This step adds the Fabric data agent to the custom AI agent in Microsoft Copilot Studio.

   :::image type="content" source="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-add-fabric-data-agent.png" alt-text="Screenshot showing the last step to add data agent to Copilot Studio." lightbox="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-add-fabric-data-agent.png":::

1. Once done, navigate back to the **Agents** from the top pane and you should see the Fabric data agent among the agents that are connected to the custom AI agent. 

   :::image type="content" source="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-fabric-added.png" alt-text="Screenshot showing the list of Fabric data agents added to Copilot Studio." lightbox="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-fabric-added.png":::

1. Select the connected Fabric data agent. Under additional details, you can optionally decide the authentication of the Fabric data agent to be the **User authentication** or **Agent author authentication**. If you select **User authentication** as the authentication, you need to ensure that users have access to the Fabric data agent and its underlying data sources.

   :::image type="content" source="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-fabric-authentication.png" alt-text="Screenshot showing the authentication for Fabric data agent in MCS." lightbox="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-fabric-authentication.png":::

1. To further enhance the responsiveness of your custom AI agent, you can define how the agent responds to users through adding topics and trigger phrases.

1. You could use the built-in test chat pane on the right to ask questions and get answers. This helps you to validate the performance of the custom AI agent to ensure it invokes the connected Fabric data agents to get answers and further fine-tune its behavior.

1. Ensure that you have enabled generative AI orchestration. To do this, select **Settings** that is located on the top of the chat pane and under **Orchestration**, select the first one.

   :::image type="content" source="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-orchestrator.png" alt-text="Screenshot showing the agent setting in MCS." lightbox="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-orchestrator.png":::

1. You can publish the custom AI agent and then navigate to the **Channels** to select your desired consumption channel.

   :::image type="content" source="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-publish.png" alt-text="Screenshot showing to publish custom agent in MCS." lightbox="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-publish.png":::

   :::image type="content" source="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-channels.png" alt-text="Screenshot showing the list of channels to which you can publish from Copilot Studio." lightbox="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-channels.png":::

   > [!NOTE]
   > The ability to use the custom agent with connected Fabric data agent isn't currently supported in Microsoft 365 Copilot.

1. To publish to Teams, select Teams and Microsoft 365 Copilot from the list of channels. This opens the window on left. Select **Add channel** to enable this channel. Once done, the **See agent in Teams** are active. You can select it, which prompts you to open Microsoft Teams.

   > [!NOTE]
   > If you share your custom AI agent with others, they must have at least read access to the Fabric data agent and the necessary permissions for all underlying data sources.

   :::image type="content" source="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-teams-channels.png" alt-text="Screenshot showing the publish process to Teams." lightbox="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-teams-channels.png":::

1. This will then launch Microsoft Teams where you can ask questions from the custom AI agent and get answers.
