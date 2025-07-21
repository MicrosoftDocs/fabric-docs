---
title: Consume a data agent in Azure AI foundry (preview)
description: Learn how to consume a data agent in Azure AI foundry (preview).
ms.author: scottpolly
author: s-polly
ms.reviewer: scottpolly
reviewer: midesa
ms.service: fabric
ms.subservice: data-science
ms.topic: how-to #Don't change
ms.date: 03/25/2025
ms.update-cycle: 180-days
ms.collection: ce-skilling-ai-copilot

#customer intent: As an Analyst, I want to consume Fabric data agent within Azure AI Agent Services in Azure AI Foundry.

---

# Consume Fabric data agent from Azure AI Foundry Services (preview)

Data agent in Microsoft Fabric transforms enterprise data into conversational Q&A systems. It enables users to interact with their data through chat, to uncover actionable insights. One way to consume Fabric data agent is through Azure AI Agent Service, a core component of Azure AI Foundry. Through integration of Fabric data agents with Azure AI Foundry, your Azure AI agents can directly tap into the rich, structured, and semantic data available in Microsoft Fabric OneLake. This integration provides immediate access to high-quality enterprise data, and it empowers your Azure AI agents to generate actionable insights and streamline analytical workflows. Organizations can then enhance data-driven decision-making with Fabric data agent as a powerful knowledge source within their Azure AI environments.

> [!IMPORTANT]  
> This feature is in [preview](../fundamentals/preview.md). You should use the latest beta/preview version of the [Azure AI Agents Python SDK](https://pypi.org/project/azure-ai-agents/1.1.0b3/).

[!INCLUDE [data-agent-prerequisites](./includes/data-agent-prerequisites.md)]
- Developers and end users in Azure AI Foundry must at least have the `AI Developer` Role-Based Access Control (RBAC) role.

## How it works

**Agent Setup**: In Azure AI Agent Service, create a new agent and add Fabric data agent as one of its knowledge sources. To establish this connection, you need the workspace ID and artifact ID for the Fabric data agent. The setup enables your Azure AI agent to evaluate available sources when it receives a query, to ensure that it invokes the correct tool to process the request. Currently, you can only add one Fabric data agent as a knowledge source to your Azure AI agent.

> [!NOTE]
> The model you select in Azure AI Agent setup is only used for Azure AI agent orchestration and response generation. It doesn't affect the model that Fabric data agent uses.

**Query Processing**: When a user sends a query from the Foundry playground, the Azure AI Agent Service determines whether or not Fabric data agent is the best tool for the task. If it is, the Azure AI agent:

- Uses the identity of the end user to generate secure queries over the data sources the user has permission to access from within the Fabric data agent.
- Invokes Fabric to fetch and process the data, to ensure a smooth, automated experience.
- Combines the results from Fabric data agent with its own logic to generate comprehensive responses. Identity Passthrough (On-Behalf-Of) authorization secures this flow, to ensure robust security and proper access control across enterprise data.

> [!NOTE]
> The Fabric data agent and the Azure AI Foundry resources should be on the same tenant, and both Microsoft Fabric and Azure AI Foundry should be signed in with the same account.

## Adding Fabric data agent to your Azure AI Agent

You can add Fabric data agent to your Azure AI agent, either programmatically or with the user interface (UI). You can find detailed code examples and further instructions in the Azure AI Agent integration documentation.

**Add Fabric data agent through UI**:

- Navigate to the left pane. Under **Build and Customize**, select **Agents**, as shown in the following screenshot:

:::image type="content" source="./media/how-to-consume-data-agent/foundry-agents.png" alt-text="Screenshot showing the main Azure Foundry page." lightbox="./media/how-to-consume-data-agent/foundry-agents.png":::

This displays the list of your existing Azure AI agents. You can add Fabric to one of these agents, or you can select **New Agent** to create a new agent. New agent creation generates a unique agent ID and a default name. You can change that name at any time. For more information, please visit [What is Azure OpenAI in Azure AI Foundry portal](/azure/ai-foundry/azure-openai-in-ai-foundry).

- Initiate Adding a Knowledge Source: Select the **Add** button, as shown in the following screenshot:

:::image type="content" source="./media/how-to-consume-data-agent/add-knowledge.png" alt-text="Screenshot showing addition of Fabric data agent as knowledge." lightbox="./media/how-to-consume-data-agent/add-knowledge.png":::

This opens a menu of supported knowledge source types.

- Select Microsoft Fabric as the Source: From the list, choose **Microsoft Fabric**, as shown in the following screenshot:

:::image type="content" source="./media/how-to-consume-data-agent/select-fabric.png" alt-text="Screenshot showing selecting Fabric as knowledge source." lightbox="./media/how-to-consume-data-agent/select-fabric.png":::

With this option, your agent can access Fabric data agent.

- Create a connection: If you previously established a connection to a Fabric data agent, you can reuse that connection for your new Azure AI Agent. Otherwise, select **New Connection** to create a connection, as shown in the following screenshot:

:::image type="content" source="./media/how-to-consume-data-agent/new-connection.png" alt-text="Screenshot showing how to create a new Fabric connection." lightbox="./media/how-to-consume-data-agent/new-connection.png":::

The **Create a new Microsoft Fabric connection** window opens, as shown in the following screenshot:

:::image type="content" source="./media/how-to-consume-data-agent/create-connection.png" alt-text="Screenshot showing creating a connection." lightbox="./media/how-to-consume-data-agent/create-connection.png":::

When you set up the connection, provide the Fabric data agent `workspace-id` and `artifact-id` values as custom keys. You can find the `workspace-id` and `artifact-id` values in the published Fabric data agent endpoint. Your Fabric data agent endpoint has this format:

https://fabric.microsoft.com/groups/<**workspace_id**>/aiskills/<**artifact-id**>, and select the **Is Secret** checkbox

Finally, assign a name to your connection, and choose whether to make it available to all projects in Azure AI Foundry or to restrict it to the current project.

After you select **Connect**, the Microsoft Fabric data agent is added as a **Knowledge** resource, as shown in the following screenshot:

:::image type="content" source="./media/how-to-consume-data-agent/instructions-foundry.png" alt-text="Screenshot that shows how to add instructions." lightbox="./media/how-to-consume-data-agent/instructions-foundry.png":::

You must also provide instructions to your Azure AI agent about when, how, and under what conditions to use the Fabric data agent. From the perspective of the Azure AI agent, the Fabric data agent is treated as a Fabric tool, so you can refer to it as such in your instructions.

You can also adjust the deployment model, add Actions, or change Model settings based on your use case requirements. Once your Azure AI agent is fully configured, select **Try in playground** to test its performance.

**Add Fabric data agent programmatically**: The following steps describe how to add Fabric data agent programmatically to your Azure AI agent in Python. For other languages (C#, JavaScript) you can refer to [this](https://aka.ms/AgentFabricDoc) resource.

#### Step 1: Create a project client

Create a client object that contains the connection string that connects to your AI project and other resources.

```python
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import FabricTool, ListSortOrder
```

#### Step 2: Create an Agent with the Microsoft Fabric tool enabled

To make the Fabric data agent tool available to your Azure AI agent, use a connection to initialize the tool and attach it to the agent. You can find your connection in the **connected resources** section of your project in the Azure AI Foundry portal.

```python
# The Fabric connection ID can be found in the Azure AI Foundry project as a property of the Fabric tool
# Your connection ID is in the format /subscriptions/<your-subscription-id>/resourceGroups/<your-resource-group>/providers/Microsoft.MachineLearningServices/workspaces/<your-project-name>/connections/<your-fabric-connection-name>
conn_id = "your-connection-id"

# Initialize the AI project client
project_client = AIProjectClient(
    endpoint=os.environ["PROJECT_ENDPOINT"],
    credential=DefaultAzureCredential(),
)

# Initialize agent Fabric tool and add the connection ID
fabric = FabricTool(connection_id=conn_id)

# Create agent with the Fabric tool and process assistant run
with project_client:
    agent = project_client.agents.create_agent(
        model="gpt-4o",
        name="my-assistant",
        instructions="You are a helpful assistant",
        tools=fabric.definitions,
        headers={"x-ms-enable-preview": "true"},
    )
    print(f"Created agent, ID: {agent.id}")
```
#### Step 3: Create a thread


```python
# Create thread for communication
thread = project_client.agents.create_thread()
print(f"Created thread, ID: {thread.id}")

# Create message to thread
# Remember to update the message with your data
message = project_client.agents.create_message(
    thread_id=thread.id,
    role="user",
    content="what is top sold product in Contoso last month?",
)
print(f"Created message, ID: {message.id}")
```
#### Step 4: Create a run and check the output

Create a run, and observe that the model uses the Fabric data agent tool to provide a response to the user's question.

```python
# Create and process agent run in thread with tools
run = project_client.agents.create_and_process_run(thread_id=thread.id, assistant_id=agent.id)
print(f"Run finished with status: {run.status}")

if run.status == "failed":
    print(f"Run failed: {run.last_error}")

# Delete the assistant when done
project_client.agents.delete_agent(agent.id)
print("Deleted agent")

# Fetch and log all messages
messages = project_client.agents.list_messages(thread_id=thread.id)
print(f"Messages: {messages}")
```

## Related content

- [Data agent concept](concept-data-agent.md)
- [Data agent end-to-end tutorial](data-agent-end-to-end-tutorial.md)