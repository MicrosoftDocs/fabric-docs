---
title: Consume a data agent in Microsoft Copilot Studio (preview)
description: Learn how to consume a data agent in Microsoft Copilot Studio.
author: amhjf
ms.author: amjafari
ms.reviewer: jburchel
reviewer: amjafari
ms.service: fabric
ms.subservice: data-science
ms.topic: how-to #Don't change
ms.date: 05/09/2025
ms.update-cycle: 180-days
ms.collection: ce-skilling-ai-copilot
#customer intent: As an Analyst, I want to consume a Fabric data agent within Microsoft Copilot Studio.
---

# Consume a Fabric Data Agent in Microsoft Copilot Studio (preview)

Microsoft Copilot Studio is a graphical, low-code platform for building custom AI agents that understand natural language, answer user inquiries, and perform actions such as automating tasks. These agents can then be deployed across channels such as Microsoft Teams, websites, and Microsoft 365 Copilot.

One of the ways to consume a Fabric data agent is by adding it to a custom AI agent in Microsoft Copilot Studio as a connected agent. This connected agents setup enables agent-to-agent collaboration, allowing the custom AI agent in Copilot Studio to securely access enterprise data through the Fabric data agent and ground its responses in organizational knowledge for improved accuracy, relevance, and context.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

[!INCLUDE [data-agent-prerequisites](./includes/data-agent-prerequisites.md)]
- Microsoft 365 Copilot license and a user license for each individual who will be building and managing custom agents.

## How to add a Fabric data agent to the custom AI agent in Copilot Studio

1. Navigate to [Microsoft Copilot Studio](https://copilotstudio.microsoft.com) and select your desired environment.

:::image type="content" source="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-environments.png" alt-text="Screenshot showing the main select environment in copilot studio." lightbox="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-environments.png":::

2. Once you select desired environment, on the left pane, select **Create**, then select **+ New agent** to start building your custom AI agent. If you already have a custom AI agent, you can skip steps 2 and 3.

:::image type="content" source="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-create-agent.png" alt-text="Screenshot showing the main page to create agent in copilot studio." lightbox="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-create-agent.png":::

3. Configure your agent by giving it a **Name** and **Description** that describes its purpose and role. Make sure to save your changes.

:::image type="content" source="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-main.png" alt-text="Screenshot showing to set up name and description for custom AI agent." lightbox="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-main.png":::

4. Once you set the basic details, you can move forward by adding:
   - **Knowledge sources** such as SharePoint, public websites, or uploaded files.
   - **Tools** that enable the agent to perform specific tasks or access external systems.
   - **Connections to other agents**, allowing more complex scenarios where multiple agents collaborate.

5. To add a Fabric data agent to your custom AI agent in Copilot Studio, navigate to **Agents** from the top pane and then select **+ Add** to add agents to your custom AI agent.

:::image type="content" source="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-agents.png" alt-text="Screenshot showing the first step to add agents to Copilot Studio." lightbox="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-agents.png":::

6. Select Microsoft Fabric from the **Choose how you want to extend your agent** category.

:::image type="content" source="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-add-fabric.png" alt-text="Screenshot showing the Fabric as connected agents category." lightbox="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-add-fabric.png":::

7. If there is already a connection between Microsoft Fabric and the custom AI agent, you can select **Next** and move to next step. Otherwise, select the dropdown and select **Create new connection** to establish a connection between Microsoft Fabric and Copilot Studio.

:::image type="content" source="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-connector.png" alt-text="Screenshot showing to add the Fabric connector to Copilot Studio." lightbox="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-connector.png":::

> [!NOTE]
> Ensure to publish your Fabric data agent prior to adding to your custom AI agent in Copilot Studio. The Fabric data agent and Microsoft Copilot resources should be on the same tenant, and both Microsoft Fabric and Microsoft Copilot should be signed in with the same account.

8. From the list of Fabric data agents you have access to, select the data agent that you want to connect to the custom AI agent in Copilot Studio and select **Next**. The selected data agent will work together with the custom AI agent to handle specific workflows.

:::image type="content" source="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-data-agents.png" alt-text="Screenshot showing the list of Fabric data agents." lightbox="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-data-agents.png":::

9. You can adjust the description for the Fabric data agent that you have selected and then select **Add agent**. This step will add the Fabric data agent to the custom AI agent in Microsoft Copilot Studio.

:::image type="content" source="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-add-fabric-data-agent.png" alt-text="Screenshot showing the last step to add data agent to Copilot Studio." lightbox="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-add-fabric-data-agent.png":::

10. Once done, navigate back to the **Agents** from the top pane and you should see the Fabric data agent among the agents that are connected to the custom AI agent. 

:::image type="content" source="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-fabric-added.png" alt-text="Screenshot showing the list of Fabric data agents added to Copilot Studio." lightbox="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-fabric-added.png":::

11. Select the connected Fabric data agent. Under additional details, you can optionally decide the authentication of the Fabric data agent to be the **User authentication** or **Agent author authentication**.

:::image type="content" source="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-fabric-authentication.png" alt-text="Screenshot showing the authentication for Fabric data agent in MCS." lightbox="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-fabric-authentication.png":::

12. To further enhance the responsiveness of your custom AI agent, you can define how the agent responds to users through adding topics and trigger phrases.

13. You could use the built-in test chat pane on the right to ask questions and get answers. This helps you to validate the performance of the custom AI agent to ensure it invokes the connected Fabric data agents to get answers and further fine-tune its behavior.

14. You can publish the custom AI agent and then navigate to the **Channels** to select your desired consumption channel.

:::image type="content" source="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-publish.png" alt-text="Screenshot showing to publish custom agent in MCS." lightbox="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-publish.png":::

:::image type="content" source="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-channels.png" alt-text="Screenshot showing the list of channel to which you can publish from Copilot Studio." lightbox="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-channels.png":::

> [!NOTE]
> The ability to use the custom agent with connected Fabric data agent is not currently supported in Microsoft 365 Copilot.

15. To publish to Teams, select Teams and Microsoft 365 Copilot from the list of channels. This opens the window on left, select **Add channel** to enable this channel. Once done, the **See agent in Teams** will be active. You can select it which will prompt you to Microsoft Teams.

:::image type="content" source="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-teams-channels.png" alt-text="Screenshot showing the publish process to Teams." lightbox="./media/data-agent-microsoft-copilot-studio/microsoft-copilot-studio-teams-channels.png":::

16. This will then launch Microsoft Teams where you will be able to ask questions from the custom AI agent and get answers.
