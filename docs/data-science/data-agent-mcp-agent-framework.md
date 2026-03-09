---
title: Consume a Fabric data agent using MCP & the Agent Framework SDK (preview)
description: Learn how to authenticate with Microsoft Entra ID and call a Fabric data agent MCP server using Microsoft Agent Framework.
author: jonburchel
ms.author: jburchel
ms.reviewer: jordanbean
reviewer: jordanbean-msft
ms.date: 03/09/2026
ms.topic: how-to
ai-usage: ai-assisted
keywords:
  - microsoft fabric
  - data agent
  - mcp
  - agent framework
---

# Consume a Fabric data agent using MCP & the Agent Framework SDK (preview)

Use this guide to call a Fabric data agent MCP server using the [Microsoft Agent Framework SDK](/agent-framework/overview/?pivots=programming-language-python). You authenticate with Microsoft Entra ID, connect to the MCP endpoint, and invoke a tool exposed by the data agent.

> [!NOTE]
> Fabric data agent MCP support is in preview.

[!INCLUDE [data-agent-prerequisites](./includes/data-agent-prerequisites.md)]

* A Microsoft Entra ID account with access to the Fabric workspace.
* An Azure OpenAI resource with a deployed model.
* Access to the MCP endpoint URL from the Fabric data agent settings.
* Development environment based on your chosen language:
  * **Python**: Python 3.10 or later

## Set up your environment

# [Python](#tab/python)

1. Create a virtual environment.

   ```bash
   python -m venv .venv
   ```

1. Activate the virtual environment.

   ```bash
   source .venv/bin/activate
   ```

---

## Install dependencies

# [Python](#tab/python)

Install only the packages required for Azure OpenAI and MCP integration. Use `agent-framework-azure-ai` instead of `agent-framework` to avoid installing unnecessary optional integrations.

The `azure-identity` package handles authentication to Azure services using your Microsoft Entra ID credentials, enabling secure connections to Azure OpenAI and the Fabric data agent MCP server.

```bash
pip install agent-framework-azure-ai azure-identity
```

---

## Configure the client

# [Python](#tab/python)

Set environment variables with your MCP endpoint and Azure OpenAI settings.

```bash
export FABRIC_DATA_AGENT_MCP_URL="<your-fabric-data-agent-mcp-url>"
export AZURE_OPENAI_ENDPOINT="<your-azure-openai-endpoint>"
export AZURE_OPENAI_RESPONSES_DEPLOYMENT_NAME="<your-deployment-name>"
```

---

## Authenticate and call the MCP server

The script uses `DefaultAzureCredential`, which supports local development with Azure CLI sign-in and production workloads with managed identity. Sign in with Azure CLI if you are running locally.

```bash
az login
```

Create a file named `fabric_data_agent_mcp.py` for Python and follow the sections to build the script step by step.

## Import required libraries

# [Python](#tab/python)

Import the necessary packages for authentication and Agent Framework integration.

```python
import asyncio
import os

from azure.identity import DefaultAzureCredential
from agent_framework.azure import AzureOpenAIResponsesClient

FABRIC_DATA_AGENT_SCOPE = "https://api.fabric.microsoft.com/.default"
```

---

## Load configuration from environment variables

# [Python](#tab/python)

Read the MCP endpoint URL and Azure OpenAI settings from environment variables.

```python
async def main() -> None:
    mcp_url = os.getenv("FABRIC_DATA_AGENT_MCP_URL")
    azure_endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
    deployment_name = os.getenv("AZURE_OPENAI_RESPONSES_DEPLOYMENT_NAME")
```

---

## Authenticate with Microsoft Entra ID

Use `DefaultAzureCredential` as the shared authentication mechanism for both services in this script:

* The script explicitly requests a Fabric token (`https://api.fabric.microsoft.com/.default`) and sends it as a bearer token in MCP HTTP headers.
* The same credential instance is also passed to `AzureOpenAIResponsesClient`, which requests Azure OpenAI tokens as needed.

This pattern is required because each downstream API validates a different token audience (`aud`) claim:

* Fabric data agent MCP endpoint expects a token issued for the Fabric resource (`aud = https://api.fabric.microsoft.com`).
* Azure OpenAI expects a token issued for the Cognitive Services resource (`aud = https://cognitiveservices.azure.com`).

When a token is minted for one audience, the other service rejects it with a `401 Unauthorized` error because the `aud` claim doesn't match its expected resource. In other words, a Fabric token can call Fabric MCP, but not Azure OpenAI, and an Azure OpenAI token can call Azure OpenAI, but not Fabric MCP.

In this script, you request the Fabric token directly because MCP tool registration needs explicit HTTP headers. The token is passed in the `headers` argument when calling `get_mcp_tool()`, and `AzureOpenAIResponsesClient` handles its own token acquisition internally by using the same `DefaultAzureCredential` object.

# [Python](#tab/python)

```python
    credential = DefaultAzureCredential()
    # Fabric MCP endpoint requires a Fabric API token.
    fabric_access_token = credential.get_token(FABRIC_DATA_AGENT_SCOPE).token

    headers = {
        "Authorization": f"Bearer {fabric_access_token}",
        "Content-Type": "application/json",
    }
```

---

## Create the Azure OpenAI client

# [Python](#tab/python)

Initialize the Azure OpenAI client with your `endpoint`, `deployment_name`, and `credential`. This client handles LLM interactions for the agent.

```python
    client = AzureOpenAIResponsesClient(
        endpoint=azure_endpoint,
        deployment_name=deployment_name,
        credential=credential,
    )
```

---

## Register the MCP tool with the agent

# [Python](#tab/python)

Register the Fabric data agent MCP tool with the Azure OpenAI client by calling `get_mcp_tool()`. Pass the Fabric bearer token in the `headers` argument so the MCP endpoint receives the correct authorization. Set the approval mode to `never_require` to allow the agent to call the MCP tool automatically without user approval.

```python
    mcp_tool = client.get_mcp_tool(
        name="FabricDataAgent",
        url=mcp_url,
        headers=headers,
        approval_mode="never_require",
    )
```

---

## Create an agent and run the interactive loop

# [Python](#tab/python)

Create an agent that uses the MCP tool to answer questions by calling `client.as_agent()`. The agent runs in an interactive loop, prompting the user for questions and displaying responses until the user presses Enter without input.

```python
    agent = client.as_agent(
        name="FabricDataAgentAssistant",
        instructions="Use the Fabric Data Agent MCP tool to answer the user question.",
        tools=[mcp_tool],
    )

    while True:
        user_question = input("Question (press Enter to quit): ").strip()
        if not user_question:
            break
        print("Running agent...")
        result = await agent.run(user_question)
        print(f"Answer: {result.text}")


if __name__ == "__main__":
    asyncio.run(main())
```

---

## Run the script

# [Python](#tab/python)

After you create the script, run it with Python.

```bash
python fabric_data_agent_mcp.py
```

---

## Complete script

# [Python](#tab/python)

Here's the complete script combining all the sections:

```python
import asyncio
import os

from azure.identity import DefaultAzureCredential
from agent_framework.azure import AzureOpenAIResponsesClient

FABRIC_DATA_AGENT_SCOPE = "https://api.fabric.microsoft.com/.default"

async def main() -> None:
    mcp_url = os.getenv("FABRIC_DATA_AGENT_MCP_URL")
    azure_endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
    deployment_name = os.getenv("AZURE_OPENAI_RESPONSES_DEPLOYMENT_NAME")

    credential = DefaultAzureCredential()
    # Fabric MCP endpoint requires a Fabric API token.
    fabric_access_token = credential.get_token(FABRIC_DATA_AGENT_SCOPE).token

    headers = {
        "Authorization": f"Bearer {fabric_access_token}",
        "Content-Type": "application/json",
    }

    client = AzureOpenAIResponsesClient(
        endpoint=azure_endpoint,
        deployment_name=deployment_name,
        credential=credential,
    )

    mcp_tool = client.get_mcp_tool(
        name="FabricDataAgent",
        url=mcp_url,
        headers=headers,
        approval_mode="never_require",
    )

    agent = client.as_agent(
        name="FabricDataAgentAssistant",
        instructions="Use the Fabric Data Agent MCP tool to answer the user question.",
        tools=[mcp_tool],
    )

    while True:
        user_question = input("Question (press Enter to quit): ").strip()
        if not user_question:
            break
        print("Running agent...")
        result = await agent.run(user_question)
        print(f"Answer: {result.text}")


if __name__ == "__main__":
    asyncio.run(main())
```

---

## Alternative: Service principal authentication

The example in this article uses `DefaultAzureCredential`, which supports multiple authentication methods including Azure CLI for local development and managed identity for production. If you need to authenticate using a service principal with a client secret instead, configure your Microsoft Entra ID app registration and modify the authentication code.

> [!NOTE]
> This is an alternative authentication approach. The main example earlier in this article uses `DefaultAzureCredential`.

### Configure Entra ID app registration

1. In the Azure portal, navigate to **Microsoft Entra ID** > **App registrations**.

1. Select your app registration or create a new one.

1. Select **API permissions** > **Add a permission**.

1. Select **APIs my organization uses** and search for **Power BI Service**.

1. Select **Delegated permissions** and add the following permissions:
   * `Workspace.ReadWrite.All` - Required to access Fabric workspaces and data agents
   * `Item.ReadWrite.All` - Required to read and write Fabric items
   * `Dataset.ReadWrite.All` - Required to access datasets in Fabric
   * `DataAgent.Read.All` - Required to read data agent configurations
   * `DataAgent.Execute.All` - Required to execute data agent operations

1. Select **Add permissions**.

1. If your organization requires admin consent, select **Grant admin consent for [Your Organization]**.

1. Create a client secret under **Certificates & secrets** > **Client secrets** > **New client secret**.

1. Note the **Application (client) ID**, **Directory (tenant) ID**, and **Client secret value** for use in your application.

### Modify the authentication code

# [Python](#tab/python)

Replace the `DefaultAzureCredential` initialization in the script with `ClientSecretCredential`:

```python
from azure.identity import ClientSecretCredential

# Replace the placeholder values with your app registration details
tenant_id = "<your-tenant-id>"
client_id = "<your-client-id>"
client_secret = "<your-client-secret>"

credential = ClientSecretCredential(
    tenant_id=tenant_id,
    client_id=client_id,
    client_secret=client_secret
)
```

---

> [!IMPORTANT]
> When using a service principal with delegated permissions, the application acts on behalf of a signed-in user. The user must have appropriate permissions to the Fabric workspace and data agent. Store client secrets securely using Azure Key Vault or environment variables, never in source code.

## Related content

* [Using Hosted MCP tools with Agent Framework](/agent-framework/agents/tools/hosted-mcp-tools)
* [Fabric data agent concepts](concept-data-agent.md)
* [Fabric data agent SDK](fabric-data-agent-sdk.md)
* [Data agent end-to-end tutorial](data-agent-end-to-end-tutorial.md)
