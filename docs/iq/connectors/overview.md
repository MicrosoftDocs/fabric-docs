---
title: Fabric IQ integrations overview
description: Compare Fabric IQ integrations for Microsoft Copilot, agents, and MCP clients, and learn about Power BI content support, licensing, billing, and security.
author: PM-Sara
ms.author: svredevoogd
ms.service: fabric
ms.subservice: iq
ms.topic: overview
ms.date: 11/25/2026
ai-usage: ai-assisted
---

# Fabric IQ integrations overview

Fabric IQ integrations bring business data into the AI experiences where you work and build. With Power BI reports and semantic models, you can use Microsoft Copilot, agents that you build, and Model Context Protocol (MCP) clients to find content, understand its business definitions, and query its data.

These integrations use the measures, relationships, and permissions in your existing semantic models. You don't need to recreate your business logic for each AI experience. Answers depend on the source content, the question, and the agent, so validate important results against the source data.

This article compares the integrations for Power BI data and explains how they work, how licensing and billing work, and which content they support.

## Choose an integration

Choose an integration based on who provides the agent and where you want to work:

- **In Microsoft Copilot:** Microsoft provides the agent, and you bring your Power BI content.
- **Build agents:** You configure or develop an agent on a Microsoft agent platform and connect it to Fabric IQ.
- **Connect MCP clients and developer tools:** You connect your own MCP-compatible client directly to the Fabric IQ MCP server.

| Integration | Use it for | Status |
| --- | --- | --- |
| [Microsoft 365 Copilot Chat](microsoft-365-copilot-overview.md) | Quick data answers and trends alongside context from email, files, and meetings. | Generally available. |
| [Copilot Cowork](cowork-overview.md) | Multistep workflows that turn data insights into emails, documents, or scheduled tasks. | The Fabric IQ plugin is generally available. |
| [Microsoft Copilot in Power BI and Fabric](copilot-power-bi-fabric.md) | Microsoft Copilot conversations without leaving Power BI or Fabric. | Preview. |
| [Microsoft 365 Agent Builder](agent-builder-overview.md) | Agents with a defined business purpose and instructions, grounded in permitted Power BI data. | The Fabric capability is generally available. |
| [Copilot Studio](/microsoft-copilot-studio/agents-experience/fabric-iq-connect) | Agents that use Fabric IQ as a connected tool. | See the Copilot Studio documentation for current availability. |
| [Microsoft Foundry](/azure/foundry/agents/how-to/tools/fabric-iq) | Custom agents that connect to hosted MCP servers for Fabric items. | Preview. |
| [Fabric IQ MCP server](fabric-iq-mcp.md) | Data exploration and question answering from MCP-compatible clients and developer tools. | Generally available. |

For the MCP client experience, use the [Fabric IQ skill](https://github.com/microsoft/skills-for-fabric/blob/main/skills/fabriciq/SKILL.md) with the server. The skill guides the agent's use of the Fabric IQ tools; the server provides authenticated access to Power BI content.

Fabric data agents provide a separate way to bring Fabric data into Microsoft Copilot. See [Consume Fabric data agent in Microsoft Copilot](../../data-science/data-agent-microsoft-365-copilot.md).

> [!NOTE]
> Foundry can connect to MCP servers for different Fabric item types, including ontologies and data agents. Their authentication, capacity requirements, and supported operations can differ from the Power BI integrations described here. Follow the [Foundry integration documentation](/azure/foundry/agents/how-to/tools/fabric-iq) for the selected item and server.

## How integrations work with Power BI data

The AI agent owns the conversation. It interprets your question, selects capabilities, and writes the answer. Fabric IQ provides access to the Power BI content you have permission to use.

A typical data question follows this flow:

1. **Find content.** The integration finds a report or semantic model, or uses content you attach, link, or name. How you reference content depends on the integration.
1. **Understand the content.** The integration retrieves report context and semantic model metadata, such as visuals, filters, tables, columns, measures, and descriptions.
1. **Locate values.** When available, value search finds exact stored values, such as a product name, so filters match the data.
1. **Query the data.** A DAX query runs against the semantic model with the signed-in user's permissions. Row-level security (RLS) and object-level security (OLS) apply.
1. **Answer.** The agent explains the result. Depending on the experience, it can combine the result with other context or use it in a follow-up task.

The Fabric IQ MCP server exposes these capabilities as tools. The calling agent combines the tools, generates DAX, and explains the results. Query execution is separate from that AI reasoning. For the current tool contract, see [Available tools](fabric-iq-mcp.md#available-tools).

## Licensing and billing

For Power BI data, distinguish the AI experience from the query workload:

| Task | What it covers | How it is billed |
| --- | --- | --- |
| AI reasoning and LLM usage. | Interpreting the question, generating DAX, and composing the answer. | The agent or host experience, under that product's licensing and billing terms. |
| Fabric query execution. | Running queries against the semantic model. | The workspace capacity that hosts the semantic model. |

### AI experience licensing

The required license depends on where you use Fabric IQ.

| Experience | Licensing and billing |
| --- | --- |
| Copilot Chat in the Microsoft 365 Copilot app or web experience. | You need a Microsoft 365 Copilot Premium license. Copilot Chat usage is covered by the applicable license. |
| Microsoft Copilot embedded in Power BI and Fabric. | Basic and Premium Copilot licenses are supported. Basic licenses provide Fabric IQ but not Work IQ grounding in organizational Microsoft 365 content. |
| Copilot Cowork. | You need a Microsoft 365 Copilot Premium license. In addition, usage-based Cowork billing must be enabled for your account. |
| Microsoft 365 Agent Builder. | Makers and users need Microsoft 365 Copilot Premium licenses for the Fabric capability. Agent access and consumption follow your organization's licensing or usage-based billing configuration. |
| Copilot Studio. | Building, testing, evaluating, and using agents can consume Copilot Credits. See [Copilot Studio usage-based billing](/microsoft-copilot-studio/agents-experience/billing-credit-overview). |
| Microsoft Foundry. | Your Foundry project, deployed model, and agent services have their own costs. See the [Foundry integration prerequisites](/azure/foundry/agents/how-to/tools/fabric-iq#prerequisites). |
| Direct Fabric IQ MCP clients. | The client provider's licensing and billing apply, such as a GitHub Copilot subscription. The Fabric IQ MCP connection doesn't require a Microsoft 365 Copilot license. |

Basic-license support applies to the embedded Power BI and Fabric entry points, not the broader Microsoft 365 Copilot app or web experience. See [Licensing and available capabilities](copilot-power-bi-fabric.md#licensing-and-available-capabilities).

Neither Copilot Chat nor Cowork charges customer Fabric capacity units (CUs) for DAX generation. For a direct MCP client, the client provider handles its LLM usage.

### Power BI query execution

Fabric treats the DAX query like a query that calculates a measure in a Power BI report visual:

- If the semantic model is hosted on Premium or Fabric capacity, query execution consumes that model's capacity as interactive usage.
- If the semantic model is hosted on shared capacity, as Pro models are, the query doesn't introduce an additional customer capacity charge. Standard Power BI technical limits still apply.

More questions can add query workload, just as more report interactions do. The AI experience's license or usage-based charges are separate from this workload.

The Power BI integrations described here don't require access to Copilot in Fabric or a separate Fabric capacity purchase beyond what the source content requires. Each user still needs permission and licensed access to that content. This requirement differs from the [capacity requirements for Copilot in Fabric](../../fundamentals/copilot-enable-fabric.md).

### Monitor usage

| What to monitor | Where |
| --- | --- |
| Query execution, compute consumption, and throttling on Premium or Fabric capacity. | [Microsoft Fabric Capacity Metrics app](../../enterprise/metrics-app.md). The Capacity Metrics app reports on customer Premium and Fabric capacities. Don't use it as a billing view for shared-capacity workspaces.|
| Copilot adoption and prompt activity. | In the Microsoft 365 admin center, select **Reports** > **Usage** > **Microsoft Copilot**. Don't assume these reports include every basic-license user. |
| Copilot interactions for compliance investigations. | Microsoft Purview Audit, when auditing is enabled. See [Microsoft Copilot data protection and auditing](/microsoft-365/copilot/microsoft-365-copilot-architecture-data-protection-auditing). |
| Usage-based agent and client consumption. | The host product's billing and usage reports. |


## Prerequisites at a glance

Every user needs permission and licensed access to the Power BI content they ask about. Connecting an integration or sharing an agent doesn't grant access to that content.

| Integration | Setup and administrative requirements |
| --- | --- |
| Copilot Chat. | Microsoft 365 Copilot Premium licensing, the relevant Microsoft 365 and Fabric tenant settings including cross-geography processing for customers outside the US & EU. See [Copilot Chat prerequisites](microsoft-365-copilot-overview.md#prerequisites) and [tenant settings](microsoft-365-copilot-overview.md#tenant-settings). |
| Microsoft Copilot in Power BI and Fabric. | Enable the Microsoft Copilot entry point and its required settings for the intended users. See [Prerequisites](copilot-power-bi-fabric.md#prerequisites). |
| Copilot Cowork. | Microsoft 365 Copilot Premium licensing and usage-based billing, and the relevant Microsoft 365 and Fabric tenant settings. See [Cowork prerequisites](cowork-overview.md#prerequisites). |
| Microsoft 365 Agent Builder. |  Microsoft 365 Copilot Premium licensing, permission to create or edit agents, access to the Fabric capability, and the applicable licensing, sharing, and tenant settings. See [Prerequisites and availability](agent-builder-overview.md#prerequisites-and-availability). |
| Fabric IQ MCP server. | A Microsoft Entra work or school account, a compatible MCP client, and delegated `Item.Read.All` and `Item.Execute.All` permissions. You don't need a workspace role or Build permission solely to connect. See [Prerequisites](fabric-iq-mcp.md#prerequisites) and [Authenticate](fabric-iq-mcp.md#authenticate). |

For Copilot Studio and Foundry, follow the prerequisites in their integration guides. Don't apply the direct Fabric IQ MCP server's requirements to a different Fabric item's endpoint.

The Fabric IQ Power BI integrations are available to customers whose home tenants are in regions with broad Fabric support, not regions where Power BI is the only Fabric workload. For the current list, see [Fabric region availability](../../admin/region-availability.md#all-workloads). The Fabric IQ MCP server isn't available in sovereign clouds. Check each integration's guide for data-processing requirements.

## Supported Fabric content

Content support differs between Copilot experiences and the direct MCP server.

| Content | Copilot Chat | Cowork | Fabric IQ MCP server |
| --- | --- | --- | --- |
| Power BI reports. | Supported. | Supported. | Supported. |
| Semantic models referenced directly. | Paste the model's browser URL. Models don't appear in the attachment menu. | Use a report backed by the semantic model; direct references by model name aren't supported. | Supported by name or browser URL. |
| Dashboards and paginated (RDL) reports. | Not supported. | Not supported. | Not supported. |
| Power BI share links. | Not supported. Use the browser URL. | Not supported. | Not supported. Use the browser URL. |
| Fabric data agents. | Supported. | Not supported. | Not supported. |

In Copilot Chat, you can paste a browser URL, attach, or name reports in workspace apps. For reports in org apps, you must attach or name the report; link paste isn't supported. Top-level apps aren't supported directly. For other integrations, see [Cowork limitations](cowork-overview.md#current-limitations), [Fabric IQ MCP limitations](fabric-iq-mcp.md#limitations-and-considerations), and [Agent Builder limitations](agent-builder-overview.md#considerations-and-limitations) instead of assuming that every Chat reference method is supported.

The Fabric IQ MCP server doesn't support Fabric ontologies or data agents. Cowork also doesn't support these item types. Publishing a Fabric data agent to Microsoft Copilot as a declarative agent is a separate integration with its own prerequisites.

## Security and governance

All Fabric IQ integrations use the signed-in user's existing permissions. RLS and OLS restrict the returned data, so different users can receive different answers to the same question. Sharing an agent doesn't share its source data.

Semantic model owners can manage AI access with the **Copilot and Microsoft's MCP tools** setting. For its supported experiences, permission behavior, and configuration, see [Control Copilot access for semantic models](/power-bi/create-reports/copilot-semantic-models#control-copilot-access-for-semantic-models).

Information protection support varies by host. Copilot Chat and Cowork honor sensitivity labels on Power BI content, but Cowork doesn't currently support data loss prevention (DLP) against Fabric content. Don't assume that a separate MCP client applies Microsoft 365 conversation-label or DLP behavior. Review your client's data-handling policies before returning data to it.

For details, see [Copilot Chat sensitivity labels](microsoft-365-copilot-overview.md#sensitivity-labels), [Cowork sensitivity labels](cowork-overview.md#sensitivity-labels), and [Cowork limitations](cowork-overview.md#current-limitations).

## Related content

- [Fabric IQ in Microsoft 365 Copilot Chat](microsoft-365-copilot-overview.md).
- [Fabric IQ in Copilot Cowork](cowork-overview.md).
- [Microsoft Copilot in Power BI and Fabric](copilot-power-bi-fabric.md).
- [Use Fabric IQ in Microsoft 365 Agent Builder](agent-builder-overview.md).
- [Get started with the Fabric IQ MCP server](fabric-iq-mcp.md).
- [Connect to Fabric IQ from a Copilot Studio agent](/microsoft-copilot-studio/agents-experience/fabric-iq-connect).
- [Connect agents to Microsoft Fabric with Fabric IQ in Foundry](/azure/foundry/agents/how-to/tools/fabric-iq).
