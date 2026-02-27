---
title: Consume a Fabric data agent MCP server with Microsoft Agent Framework
description: Learn how to authenticate with Microsoft Entra ID and call a Fabric data agent MCP server using Microsoft Agent Framework.
author: jordanbean-msft
ms.date: 2026-02-27
ms.topic: how-to
keywords:
  - microsoft fabric
  - data agent
  - mcp
  - agent framework
estimated_reading_time: 10
---

## Overview

Use this guide to call a Fabric data agent MCP server by using Microsoft Agent Framework. You authenticate with Microsoft Entra ID, connect to the MCP endpoint, and invoke a tool exposed by the data agent.

> [!NOTE]
> Fabric data agent MCP support is in preview.

[!INCLUDE [data-agent-prerequisites](./includes/data-agent-prerequisites.md)]

* A Microsoft Entra ID account with access to the Fabric workspace.
* An Azure OpenAI resource with a deployed model.
* Access to the MCP endpoint URL from the Fabric data agent settings.
* Development environment based on your chosen language:
  * **Python**: Python 3.10 or later
  * **C#**: .NET 8.0 or later (coming soon)

## Set up your environment in VS Code

# [Python](#tab/python)

1. Create a virtual environment.

   ```bash
   python -m venv .venv
   ```

1. Activate the virtual environment.

   # [Windows](#tab/windows)

   ```cmd
   .venv\Scripts\activate
   ```

   # [macOS](#tab/macos)

   ```bash
   source .venv/bin/activate
   ```

   # [Linux](#tab/linux)

   ```bash
   source .venv/bin/activate
   ```

# [C#](#tab/csharp)

Coming soon.

---

## Install dependencies

# [Python](#tab/python)

Install only the packages required for the MCP call:

# [Windows](#tab/windows)

```cmd
pip install agent-framework azure-identity httpx
```

# [macOS](#tab/macos)

```bash
pip install agent-framework azure-identity httpx
```

# [Linux](#tab/linux)

```bash
pip install agent-framework azure-identity httpx
```

# [C#](#tab/csharp)

Coming soon.

---

## Configure the client

# [Python](#tab/python)

Set environment variables with your MCP endpoint and Azure OpenAI settings.

# [Windows](#tab/windows)

```cmd
set FABRIC_DATA_AGENT_MCP_URL=<your-fabric-data-agent-mcp-url>
set FABRIC_DATA_AGENT_SCOPE=https://api.fabric.microsoft.com/.default
set AZURE_OPENAI_ENDPOINT=<your-azure-openai-endpoint>
set AZURE_OPENAI_DEPLOYMENT_ID=<your-deployment-id>
```

# [macOS](#tab/macos)

```bash
export FABRIC_DATA_AGENT_MCP_URL="<your-fabric-data-agent-mcp-url>"
export FABRIC_DATA_AGENT_SCOPE="https://api.fabric.microsoft.com/.default"
export AZURE_OPENAI_ENDPOINT="<your-azure-openai-endpoint>"
export AZURE_OPENAI_DEPLOYMENT_ID="<your-deployment-id>"
```

# [Linux](#tab/linux)

```bash
export FABRIC_DATA_AGENT_MCP_URL="<your-fabric-data-agent-mcp-url>"
export FABRIC_DATA_AGENT_SCOPE="https://api.fabric.microsoft.com/.default"
export AZURE_OPENAI_ENDPOINT="<your-azure-openai-endpoint>"
export AZURE_OPENAI_DEPLOYMENT_ID="<your-deployment-id>"
```

# [C#](#tab/csharp)

Coming soon.

---

## Configure Entra ID app registration for service principal authentication

If you authenticate through a service principal to act as the signed-in user, configure your Entra ID app registration with the appropriate API permissions.

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

> [!IMPORTANT]
> When using a service principal with delegated permissions, the application acts on behalf of a signed-in user. The user must have appropriate permissions to the Fabric workspace and data agent. The service principal requires both the API permissions listed above and a valid user context.

## Authenticate and call the MCP server

# [Python](#tab/python)

The script uses `DefaultAzureCredential`, which supports local development with Azure CLI sign-in and production workloads with managed identity. Sign in with Azure CLI if you are running locally.

```bash
az login
```

Create a Python file and paste the sample below.

```python
import asyncio
import os

import httpx
from azure.identity import DefaultAzureCredential
from agent_framework import Agent, MCPStreamableHTTPTool
from agent_framework.openai import AzureOpenAIResponsesClient


async def main() -> None:
    mcp_url = os.getenv("FABRIC_DATA_AGENT_MCP_URL")
    scope = os.getenv("FABRIC_DATA_AGENT_SCOPE")
    azure_endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
    deployment_id = os.getenv("AZURE_OPENAI_DEPLOYMENT_ID")

    credential = DefaultAzureCredential()
    access_token = credential.get_token(scope).token

    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
    }

    async with httpx.AsyncClient(headers=headers) as http_client:
        mcp_browser = MCPStreamableHTTPTool(
            name="fabric_data_agent",
            url=mcp_url,
            description="Fabric Data Agent MCP server",
            http_client=http_client,
        )

        await mcp_browser.connect()
        try:
            print("Available MCP tools:")
            for tool in mcp_browser.functions:
                print(f"- {tool.name}")
        finally:
            await mcp_browser.close()

    client = AzureOpenAIResponsesClient(
        endpoint=azure_endpoint,
        deployment_id=deployment_id,
        credential=credential,
    )

    mcp_tool = client.get_mcp_tool(
        name="FabricDataAgent",
        url=mcp_url,
        headers=headers,
        approval_mode="never_require",
    )

    async with Agent(
        client=client,
        name="FabricDataAgentAssistant",
        instructions=(
            "Use the Fabric Data Agent MCP tool to answer the user question."
        ),
        tools=mcp_tool,
    ) as agent:
        while True:
            user_question = input("Question (press Enter to quit): ").strip()
            if not user_question:
                break
            result = await agent.run(user_question)
            print(result.text)


if __name__ == "__main__":
    asyncio.run(main())
```

Run the script.

# [Windows](#tab/windows)

```cmd
python fabric_data_agent_mcp.py
```

# [macOS](#tab/macos)

```bash
python fabric_data_agent_mcp.py
```

# [Linux](#tab/linux)

```bash
python fabric_data_agent_mcp.py
```

# [C#](#tab/csharp)

Coming soon.

---

## Related content

* [Using Hosted MCP tools with Agent Framework](https://learn.microsoft.com/en-us/agent-framework/agents/tools/hosted-mcp-tools)
* [Fabric data agent concepts](https://learn.microsoft.com/en-us/fabric/data-science/concept-data-agent)
* [Fabric data agent SDK](https://learn.microsoft.com/en-us/fabric/data-science/fabric-data-agent-sdk)
* [Data agent end-to-end tutorial](https://learn.microsoft.com/en-us/fabric/data-science/data-agent-end-to-end-tutorial)
