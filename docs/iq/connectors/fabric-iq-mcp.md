---
title: Get started with the Fabric IQ MCP server
description: Learn what the Fabric IQ MCP server is, connect GitHub Copilot CLI, test the connection, and understand its Power BI data-exploration tools.
author: fabiovillatoroPM
ms.author: fvillatoro
ms.reviewer: svredevoogd
ms.service: fabric
ms.subservice: iq
ms.topic: get-started
ms.date: 09/14/2026
ai-usage: ai-assisted
---

# Get started with the Fabric IQ MCP server

Fabric IQ MCP is a remote [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server that connects AI agents, applications, and MCP-compatible clients to Power BI reports and semantic models in Microsoft Fabric.

The server exposes a read-only toolset that helps an agent find Power BI content, inspect report and semantic model metadata, locate relevant values, and run DAX queries against data the signed-in user can access. You can connect any compatible MCP client without building a separate Fabric integration for each client.

Fabric IQ MCP doesn't expose a natural-language answering tool. The calling AI agent selects and combines the tools, composes DAX queries, and explains the results.

Fabric IQ MCP is generally available.

The server applies the caller's existing Microsoft Fabric permissions. Connecting through MCP doesn't grant access to reports, semantic models, or data that the caller can't otherwise access. Power BI row-level security (RLS) and object-level security (OLS) continue to restrict returned data.

> [!IMPORTANT]
> Fabric IQ MCP is an MCP server, not a traditional REST API. Clients interact with it through the MCP lifecycle and tool interface.

This article shows you how to:

- Review the prerequisites.
- Add Fabric IQ MCP to GitHub Copilot CLI.
- Use the Fabric IQ skill for the recommended agent experience.
- Sign in with Microsoft Entra ID.
- Verify the MCP connection and Fabric access.
- Understand the available Power BI tools.
- Pin the current Fabric IQ tool-contract version.

## Prerequisites

Before you connect, ensure you have:

- A tenant whose home region supports all Fabric workloads.
- A Microsoft Entra work or school account.
- Access to at least one supported Power BI report or semantic model.
- GitHub Copilot CLI installed and authenticated.

Fabric IQ MCP respects your existing Fabric permissions. You don't need a workspace role or Build permission on the semantic model. You also don't need a workspace ID, report ID, or semantic model ID for the first test. You only need the name of a report or semantic model that you can access. You can also copy a report or semantic model URL from your browser's address bar and paste it into your MCP client.

## Client compatibility

- The client must support Streamable HTTP and the required OAuth 2.0 flow.
- Some clients require a single-tenant Microsoft Entra app registration.
- Clients should call `tools/list` instead of hard-coding an assumed schema and should tolerate additive tools and fields.

## Fabric IQ MCP endpoint

Use the following endpoint:

```text
https://fabriciq.svc.cloud.microsoft/v1/mcp/fabriciq
```

> [!NOTE]
> If your organization uses private links, use `https://api.fabric.microsoft.com/v1/mcp/fabriciq` instead.

## Use the Fabric IQ skill (recommended)

> [!IMPORTANT]
> Fabric IQ MCP works best with the [Fabric IQ skill](https://github.com/microsoft/skills-for-fabric/blob/main/skills/fabriciq/SKILL.md) from [Skills for Fabric](/fabric/fundamentals/skills-for-fabric-overview). Use them together for the recommended experience.

Skills and MCP servers serve complementary roles. The skill teaches the AI agent how to identify Power BI content, interpret report and semantic model context, and coordinate the Fabric IQ tools to answer business questions. The MCP server provides authenticated access to your live Power BI content and executes the tool calls.

You can connect to Fabric IQ MCP without installing the skill. Without it, the client must determine the Fabric-specific orchestration and guardrails.

For GitHub Copilot CLI, follow [Install Skills for Fabric](/fabric/fundamentals/skills-for-fabric-install) to install Skills for Fabric through the plugin marketplace. Then configure the Fabric IQ MCP endpoint as described in the next section.

## Set up GitHub Copilot CLI

Fabric IQ MCP uses MCP over Streamable HTTP. For protocol concepts and client guidance, see the [Model Context Protocol documentation](https://modelcontextprotocol.io/docs/getting-started/intro). On Windows, open or create `%USERPROFILE%\.copilot\mcp-config.json`. On macOS or Linux, open or create `~/.copilot/mcp-config.json`.

Add the following server configuration:

```json
{
  "mcpServers": {
    "FabricIQ": {
      "type": "http",
      "url": "https://fabriciq.svc.cloud.microsoft/v1/mcp/fabriciq",
      "tools": ["*"]
    }
  }
}
```

Don't add an `Authorization` bearer token to the recommended configuration. A configured `Authorization` header overrides interactive OAuth and automatic token management. If the token is invalid or expired, remove the header to restore the interactive sign-in flow.

## Authenticate

Fabric IQ MCP uses delegated OAuth 2.0 authentication through Microsoft Entra ID.

All clients require the delegated `Item.Read.All`, `Item.Execute.All`, and `Dataset.Read.All` permissions from the Power BI Service API. Service-principal and application-only authentication aren't supported.

### GitHub Copilot CLI

GitHub Copilot CLI uses a preregistered Microsoft Entra application. You don't need to create your own app registration:

1. Start GitHub Copilot CLI after you save the MCP configuration.
1. Run `/mcp show FabricIQ`.
1. When prompted, sign in with your Microsoft Entra work or school account.
1. Accept the requested permissions if prompted.
1. Return to GitHub Copilot CLI after sign-in completes.

The browser prompts you to select a Microsoft Entra account:

:::image type="content" source="media/fabric-iq-mcp/sign-in-account.png" alt-text="Screenshot of the Microsoft sign-in page prompting the user to select an account." lightbox="media/fabric-iq-mcp/sign-in-account.png":::

After authorization succeeds, return to GitHub Copilot CLI:

:::image type="content" source="media/fabric-iq-mcp/authorization-successful.png" alt-text="Screenshot of the authorization successful confirmation page." lightbox="media/fabric-iq-mcp/authorization-successful.png":::

The client acquires, stores, refreshes, and sends the bearer token at runtime.

### Clients that require an app registration

If your MCP client doesn't provide a preregistered Microsoft Entra application with OAuth support, create your own app registration:

1. In the Microsoft Entra admin center, go to **App registrations** and select **New registration**.
1. Enter a name and select **Accounts in this organizational directory only** to create a single-tenant application.
1. Under **Authentication**, add the redirect URI required by your MCP client.
1. Under **API permissions**, select **Add a permission** > **APIs my organization uses** > **Power BI Service**.
1. Select **Delegated permissions**, add `Item.Read.All`, `Item.Execute.All`, and `Dataset.Read.All`, and then select **Add permissions**.
1. Provide the application (client) ID and tenant ID to the MCP client if it requests them.
1. Start the Fabric IQ MCP connection and complete the browser sign-in flow.

> [!NOTE]
> The `Item.Read.All`, `Item.Execute.All`, and `Dataset.Read.All` permissions don't require administrator consent by default. Users can consent when tenant settings allow it. A tenant administrator can restrict user consent or require requests to use the admin approval workflow. Authentication permissions apply to the endpoint as a whole.

## Test your connection

Use two checks to validate the setup.

### Check the MCP connection

After you save the configuration:

1. Start GitHub Copilot CLI.
1. Run `/mcp show FabricIQ`.
1. Complete the browser sign-in when prompted.
1. Confirm that the server is connected and that Fabric IQ tools are available.

This check verifies the endpoint, authentication, and MCP handshake.

Enter `/mcp show FabricIQ` in GitHub Copilot CLI:

:::image type="content" source="media/fabric-iq-mcp/mcp-show-command.png" alt-text="Screenshot of the mcp show FabricIQ command in GitHub Copilot CLI." lightbox="media/fabric-iq-mcp/mcp-show-command.png":::

The command displays the connection status and available Fabric IQ tools:

:::image type="content" source="media/fabric-iq-mcp/mcp-show-results.png" alt-text="Screenshot of a connected Fabric IQ MCP server and its six available tools in GitHub Copilot CLI." lightbox="media/fabric-iq-mcp/mcp-show-results.png":::

> [!TIP]
> Use the runtime `tools/list` response as the authoritative list of available tools and input schemas.

### Check Fabric access and tool execution

Ask the client to find a report or semantic model that you can access. For example:

```text
Find the Sales Analytics report in Microsoft Fabric.
```

The client calls `DiscoverArtifacts` to search by name. A successful result verifies:

- Authentication.
- Your Fabric permissions.
- Tool discovery and execution.
- Access to the target report or semantic model.

:::image type="content" source="media/fabric-iq-mcp/discover-report.png" alt-text="Screenshot of GitHub Copilot CLI finding a Power BI report with the DiscoverArtifacts tool." lightbox="media/fabric-iq-mcp/discover-report.png":::

You don't need to provide internal identifiers. Fabric IQ MCP obtains the identifiers needed for later schema and query operations.

Alternatively, copy the report or semantic model URL from your browser's address bar and paste it into the client. Don't use a Power BI share link for either type. Fabric IQ MCP resolves the browser URL and obtains the identifiers that later tools need.

:::image type="content" source="media/fabric-iq-mcp/report-url-result.png" alt-text="Screenshot of GitHub Copilot CLI resolving a Power BI report URL and summarizing the report." lightbox="media/fabric-iq-mcp/report-url-result.png":::

### Run an end-to-end data test

After discovery succeeds, ask a question that requires data from the item. For example:

```text
Using the Sales Analytics report, show total sales by region for the latest quarter.
```

Depending on the request, the client can:

1. Call `DiscoverArtifacts` or `ResolveFabricItem`.
1. Call `GetReportMetadata` and `GetSemanticModelSchema`.
1. Call `ValueSearch`, when available, to locate an exact stored value.
1. Generate a DAX query.
1. Call `ExecuteQuery`.
1. Explain the returned result.

:::image type="content" source="media/fabric-iq-mcp/data-query-result.png" alt-text="Screenshot of GitHub Copilot CLI querying a semantic model and comparing the highest and lowest spending values." lightbox="media/fabric-iq-mcp/data-query-result.png":::

## Available tools

Fabric IQ provides tools for working with Power BI reports and semantic models.

| Tool | Description |
| --- | --- |
| `DiscoverArtifacts` | Searches for Power BI reports and semantic models by name. |
| `ResolveFabricItem` | Resolves a supported Fabric item URL for use by the other tools. |
| `GetReportMetadata` | Retrieves metadata for a Power BI report. |
| `GetSemanticModelSchema` | Retrieves schema information for a semantic model. |
| `ValueSearch` | Searches a semantic model for specific stored values. |
| `ExecuteQuery` | Runs a DAX query against a semantic model. |

An agent typically combines several tools to answer one question.

## Tool contract

The Fabric IQ tool contract exposed through `tools/list` and `tools/call` includes:

- Available tool names.
- Tool input schemas.
- Tool output contracts.
- Tool behavior.
- Error behavior.

Call `tools/list` at runtime instead of hard-coding an assumed tool schema.

### Select a toolset version

Fabric IQ uses the `X-Variants` header to select a version of its tool contract. The `v1` in the endpoint URL is part of the endpoint address and isn't the tool-contract version.

The current public version is `Fabric.Routing.FabricIQ.V1`. To pin this version, send the following header on every MCP request:

```http
X-Variants: Fabric.Routing.FabricIQ.V1
```

Use the same value for `initialize`, `tools/list`, and `tools/call`. When a newer version becomes the default, this article will be updated with its selector.

## Limitations and considerations

- Fabric IQ MCP is available when the tenant home region supports all Fabric workloads. It isn't available in Power BI-only regions or sovereign clouds. Reports and semantic models don't need to be hosted on Fabric or Premium capacity.
- Fabric IQ MCP supports Power BI reports and semantic models. It doesn't support Power BI dashboards, paginated (RDL) reports, or Power BI apps. It doesn't currently support Fabric ontologies or data agents.
- Fabric IQ MCP supports read-only consumption scenarios. It doesn't provide workspace administration, development, or item-creation functionality. For these operations, use [Skills for Fabric](/fabric/fundamentals/skills-for-fabric-overview) with the broader [Fabric MCP servers](/rest/api/fabric/articles/mcp-servers/what-is-fabric-mcp-server).
- Each `ExecuteQuery` call targets one semantic model. The toolset doesn't join or query multiple semantic models in a single execution. Depending on the agent and prompt, the agent can combine results from separate executions across semantic models.
- When you don't specify `maxRows`, `ExecuteQuery` returns up to 250 rows by default. Set `maxRows` to request a larger result set. For large responses, Fabric IQ MCP automatically returns an embedded CSV resource. Clients typically show a small inline preview and provide access to the complete returned dataset through the CSV resource, but support for embedded resources varies. Use aggregation, filters, and focused queries to reduce result size. CSV delivery remains subject to Power BI query limits, so results might be truncated.
- Service-principal authentication isn't supported.
- Application-only authentication isn't supported.
- Query results reflect the data available in the semantic model and are only as current as its latest successful refresh.
- RLS and OLS can cause different users to receive different results for the same query.
- The server can't query a report or semantic model that the authenticated identity can't access.
- Discovery, metadata, value-search, and query operations run under the signed-in user's Power BI permissions. There is no administrator-impersonation path.
- A tool result can be incomplete or fail if the model doesn't expose the fields, measures, relationships, or values needed for the question.
- Power BI service-side throttling applies to metadata and DAX operations. Rate-limit errors are retryable; clients should back off before retrying.

## Troubleshooting

| Symptom | Likely cause | What to check |
| --- | --- | --- |
| The browser sign-in doesn't open. | The client doesn't support automatic OAuth discovery, or it requires an app registration. | Check the client's OAuth setup and configure a single-tenant app registration if required. |
| Authentication fails. | The token is missing, expired, has the wrong audience, lacks `Item.Read.All`, `Item.Execute.All`, or `Dataset.Read.All` permissions, or requires approval under the tenant consent policy. | Reauthenticate and check the app registration, Power BI Service permissions, and tenant consent policy. |
| `tools/list` doesn't show the expected tools. | The server connection is stale. | Restart the connection and check the runtime tool list. |
| Fabric IQ tools don't match the documented list. | The `X-Variants` header is missing or has an incorrect value. | Configure `X-Variants` as `Fabric.Routing.FabricIQ.V1`, and then reconnect. |
| A known report or semantic model isn't found. | The caller lacks access, the item type isn't supported, or the name is ambiguous. | Verify Fabric access, use a more specific name, or provide a supported report or semantic model browser URL. |
| A tool call returns a permission error. | The authenticated identity can't access the requested content or operation. | Verify access to the report or semantic model, and check whether RLS or OLS restricts the requested data. |
| A request returns a rate-limit error. | The client sent requests too quickly, or an upstream Power BI API throttled the operation. | Back off before retrying, reduce request bursts, and narrow metadata or query results. |
| A query returns stale data. | The semantic model hasn't completed a recent refresh. | Check the model's refresh history and retry after a successful refresh. |

## Related content

- [Skills for Fabric overview](/fabric/fundamentals/skills-for-fabric-overview)
- [Install Skills for Fabric](/fabric/fundamentals/skills-for-fabric-install)
- [Fabric IQ skill](https://github.com/microsoft/skills-for-fabric/blob/main/skills/fabriciq/SKILL.md)
- [Fabric MCP Servers overview](/rest/api/fabric/articles/mcp-servers/what-is-fabric-mcp-server)
- [Fabric IQ in Microsoft 365 Copilot Chat](microsoft-365-copilot-overview.md)
- [Use ontology MCP server](../ontology/how-to-use-ontology-mcp-server.md)
- [Model Context Protocol specification](https://modelcontextprotocol.io/)
