---
title: Fabric data agent Python SDK (preview)
description: Learn how to use the Fabric data agent Python SDK to create, configure, and publish data agents from a notebook or from your own code.
ms.author: amjafari 
author: amhjf
ms.reviewer: scottpolly
reviewer: s-polly
ms.service: fabric
ms.subservice: data-science
ms.topic: how-to
ms.date: 06/24/2026
ms.collection: ce-skilling-ai-copilot
---

# Fabric data agent Python SDK (preview)

The Fabric data agent Python SDK provides programmatic access to Fabric data agent artifacts. It's designed for code-first users who want to create, configure, update, and publish data agents without using the Fabric portal. You can run the SDK inside a Microsoft Fabric notebook, or from your own environment after you authenticate to Fabric.

> [!IMPORTANT]
> This feature is in [preview](../fundamentals/preview.md).

## Management plane and runtime

The SDK is a management-plane tool. Use it to manage the lifecycle of a data agent: create the artifact, add and configure data sources, set instructions and example queries, and publish. It runs on the Fabric public REST API, which is the same surface you already use for other workspaces and items, so authentication and the request patterns are the same.

The management plane is separate from how you query the data agent at runtime. After you publish a data agent, query it through its Model Context Protocol (MCP) endpoint from tools, applications, and other agentic experiences. For more information, see [Data agent as a Model Context Protocol server](data-agent-mcp-server.md).

## Prerequisites

- A [Fabric workspace](../fundamentals/create-workspaces.md) with a capacity that supports data agents.
- A supported data source in the workspace, such as a lakehouse, warehouse, Power BI semantic model, or KQL database.
- Python 3.10 or later.
- For execution outside a Fabric notebook, a way to authenticate to Fabric, such as the Azure CLI or a service principal.

## Installation

The SDK is published on PyPI as [fabric-data-agent-sdk](https://pypi.org/project/fabric-data-agent-sdk/). Install it by using pip:

```python
%pip install fabric-data-agent-sdk
```

## Authenticate to Fabric

When you run the SDK inside a Fabric notebook, the notebook handles authentication for you.

When you run the SDK outside Fabric, sign in to Fabric first. The following example signs in with the Azure CLI credential and sets it as the default for the session. You can use either a user account or a service principal.

```python
from azure.identity import AzureCliCredential
from fabric.analytics.environment.credentials import (
    SetFabricAnalyticsDefaultTokenCredentialsGlobally,
)

credential = AzureCliCredential()
SetFabricAnalyticsDefaultTokenCredentialsGlobally(credential)
```

> [!NOTE]
> The account or service principal that you authenticate with must have permission to create and manage items in the target workspace.

## Create a data agent

Create a data agent in a workspace. Replace the workspace ID with the ID of the workspace where the data agent exists.

```python
from fabric.dataagent.client import create_data_agent

workspace_id = "<your-workspace-id>"

agent = create_data_agent(
    data_agent_name="Quickstart data agent",
    workspace_id=workspace_id,
)
```

## Configure the data agent and add data sources

Set the agent instructions, then add a data source. Use the artifact ID of an existing lakehouse, warehouse, semantic model, or KQL database.

```python
agent_instructions = "<your agent instructions>"
datasource_id = "<your-datasource-id>"

agent.update_settings(ai_instructions=agent_instructions)

agent.add_staging_datasource(
    artifact_name_or_id=datasource_id,
    workspace_id_or_name=workspace_id,
)
```

You can also add data source instructions and example queries to improve the quality of the data agent's answers. To learn more, see the [Fabric data agent SDK samples](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/data-science/data-agent-sdk) on GitHub.

## Publish the data agent

Publish the staged configuration to make the data agent available for querying.

```python
agent.publish_staging(description="Initial publish")
```

> [!NOTE]
> Publishing through the SDK works inside and outside Fabric. Publishing a data agent to Microsoft 365 Copilot doesn't use the public API yet, so you still do that from within Fabric, either in the portal or by running the SDK in a Fabric notebook.

## Query a published data agent

After you publish the data agent, query it through its MCP endpoint. The MCP endpoint is the runtime and consumption surface for the data agent. You can connect to it from tools, applications, and other agents to query the data agent, ask questions, and receive answers. For setup steps and supported clients, see [Data agent as a Model Context Protocol server](data-agent-mcp-server.md).

> [!IMPORTANT]
> The data agent works as an MCP server only after you publish it. If you don't publish the data agent, the MCP endpoint doesn't work.

### Get the endpoint URL

You can get the MCP endpoint URL in two ways:

- **Copy it from the data agent settings.** After you publish the data agent, open the **Model Context Protocol** tab in the agent settings and copy the **MCP server URL**. For details, see [Data agent as a Model Context Protocol server](data-agent-mcp-server.md).

- **Build it manually.** Construct the URL from your workspace ID and data agent (artifact) ID by using the following format:

  ```http
  https://api.fabric.microsoft.com/v1/mcp/workspaces/{WorkspaceId}/dataagents/{DataAgentId}/agent
  ```

  Replace the placeholders with values from your published data agent:

  | Placeholder      | Description                                                   |
  | ---------------- | ------------------------------------------------------------- |
  | `{WorkspaceId}`  | The ID of the Fabric workspace that contains the data agent. |
  | `{DataAgentId}`  | The ID of the published data agent.                          |

  A manually built URL works only after you publish the data agent. If the data agent isn't published, the endpoint returns an error even when the URL is correct.

### Authentication

Requests to the MCP endpoint must be authenticated against Fabric. Make sure your client includes a valid bearer token with permissions to access the target workspace and data agent. The token can represent either a user identity or a service principal (SPN).

### Available tools

The Fabric data agent exposes an MCP server that provides a single tool. Clients call this tool to send a question to the data agent and receive the generated answer.

### Query the data agent from Python

The following example connects to the MCP endpoint, discovers the tool, sends a question, and prints the answer. It reuses the `credential` from the [Authenticate to Fabric](#authenticate-to-fabric) step and uses the [MCP Python SDK](https://pypi.org/project/mcp/). Install the SDK first:

```python
%pip install mcp
```

```python
import asyncio

from mcp import ClientSession
from mcp.client.streamable_http import streamablehttp_client

workspace_id = "<your-workspace-id>"
data_agent_id = "<your-data-agent-id>"
question = "<your question>"

mcp_url = (
    f"https://api.fabric.microsoft.com/v1/mcp/workspaces/{workspace_id}"
    f"/dataagents/{data_agent_id}/agent"
)


def get_auth_headers():
    token = credential.get_token("https://api.fabric.microsoft.com/.default")
    return {"Authorization": f"Bearer {token.token}"}


async def query_data_agent(question):
    headers = get_auth_headers()

    async with streamablehttp_client(mcp_url, headers=headers) as (read, write, _):
        async with ClientSession(read, write) as session:
            await session.initialize()

            # The data agent exposes a single tool. Discover it, then call it.
            tools = await session.list_tools()
            tool = tools.tools[0]
            question_arg = next(iter(tool.inputSchema["properties"]))

            result = await session.call_tool(tool.name, {question_arg: question})

            answers = [block.text for block in result.content if block.type == "text"]
            return "\n".join(answers)


answer = asyncio.run(query_data_agent(question))
print(answer)
```

## Related content

- [Create a Fabric data agent](how-to-create-data-agent.md)
- [Data agent as a Model Context Protocol server](data-agent-mcp-server.md)
- [Fabric data agent SDK samples](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/data-science/data-agent-sdk)
- [Fabric REST API reference](/rest/api/fabric/articles/)
