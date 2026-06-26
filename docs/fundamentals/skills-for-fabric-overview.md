---
title: Skills for Fabric overview
description: Learn about Skills for Fabric, a collection of reusable AI agent skills that help AI coding tools author, query, operate, and govern Microsoft Fabric workloads.
ms.reviewer: bocrivat
ms.topic: concept-article
ms.date: 06/19/2026
ms.search.form: skills, AI, agents, Copilot CLI, MCP
ms.collection: ce-skilling-ai-copilot
ai-usage: ai-assisted

#CustomerIntent: As a developer or data professional, I want to understand Skills for Fabric so I can use AI coding tools to work with Microsoft Fabric workloads more effectively.
---

# Skills for Microsoft Fabric

Skills for Fabric are reusable instructions that teach AI coding tools how to work with Microsoft Fabric workloads. Each skill gives an AI agent the knowledge it needs to perform a specific Fabric task, such as which REST APIs to call, what query syntax to use, and which operational patterns to follow.

Skills for Fabric are open source under the [MIT License](https://github.com/microsoft/skills-for-fabric/blob/main/LICENSE) and are maintained in the [microsoft/skills-for-fabric](https://github.com/microsoft/skills-for-fabric) repository on GitHub.

AI coding tools don't have built-in knowledge of Fabric-specific APIs or query patterns. Skills bridge that gap so that tools like GitHub Copilot CLI, Visual Studio Code, Claude Code, and Cursor can act as Fabric-aware agents that author, query, and govern your Fabric resources.

To get started, see [Install Skills for Fabric](skills-for-fabric-install.md). For the full list of available skills, see [Discover available Skills for Fabric](skills-for-fabric-discover.md).

## What is an AI skill?

A *skill* is a reusable instruction set that teaches an AI coding tool how to perform a specific task. Each skill is a markdown file (`SKILL.md`) that defines:

- The intent or trigger phrases the skill responds to.
- The APIs, commands, or query syntax to use.
- The authentication and environment setup the task requires.
- The operational best practices to follow.

AI coding tools load these skill files at session start. When you describe an intent in natural language, the tool matches your prompt against the installed skills and follows the matching skill's instructions to act on your behalf.

Skills are static knowledge. They don't execute code on their own. The AI tool decides which actions to take based on the guidance the skill provides.

## How Skills for Fabric work

Skills for Fabric apply this pattern to Microsoft Fabric. Each skill packages the REST API, CLI, T-SQL, KQL, or PySpark knowledge needed for a specific Fabric task. The flow from a natural-language intent to a deployed Fabric workload looks like as follows:

:::image type="content" source="media/skills-for-fabric/skills-in-action.png" alt-text="Diagram showing how a user prompt flows through Skills for Fabric layer and ends in a deployed Fabric workload." lightbox="media/skills-for-fabric/skills-in-action.png":::

1. **User intent.** You write a natural-language prompt that describes what you want to accomplish.
1. **AI tool.** Your AI coding tool receives the prompt and matches it against the installed skills.
1. **Skills layer.** The matching `SKILL.md` provides workload-specific instructions, including REST API endpoints, query syntax, and authentication patterns.
1. **Fabric APIs.** The AI tool calls Fabric REST APIs, SQL endpoints, KQL, or other Fabric surfaces with the right parameters.
1. **Deployed.** Fabric resources are created or modified end-to-end, with the workload's best practices applied automatically.

Skills differ from [Model Context Protocol (MCP)](../real-time-intelligence/mcp-overview.md) servers. Skills teach the AI assistant *what to do*. MCP servers *do it*. Skills provide the expertise and MCP servers provide the data connection. They both work best together. The following table summarizes the key differences:

| Aspect | Skills | MCP servers |
|--------|--------|-------------|
| **Purpose** | Provide knowledge and patterns | Provide live data access |
| **Content** | Markdown documentation | Executable servers |
| **Runtime** | Loaded into AI context | Run as separate processes |
| **Example** | "How to query a warehouse" | "Execute this SQL query" |

> [!NOTE]
> Skills produce Fabric item definitions and data-movement code, but they don't currently render finished Power BI reports. For visualizations, use a local Python dashboard through the `FabricAppDev` agent, export results as a PDF, or build Power BI reports manually on top of the semantic models that the skills generate.

## Common scenarios

The following table lists realistic intents across three audiences. In each case, you describe the outcome in natural language and the agent applies the matching skills, best practices, and deployment steps.

| Role | Example intent | What the agent does |
|------|----------------|---------------------|
| **Data engineer or developer** | "Build a Bronze, Silver, Gold medallion architecture for my NYC taxi data." | Creates lakehouses, notebooks, and pipelines with Spark best practices applied. |
| **Data engineer or developer** | "Migrate this SQL Server stored procedure to a Fabric warehouse." | Translates T-SQL, creates the warehouse schema, and loads data with `COPY INTO`. |
| **Data engineer or developer** | "Set up Git integration and a deployment pipeline for my workspace." | Configures Fabric Git integration and deployment pipelines. |
| **Data analyst or BI developer** | "Author a semantic model over my Gold lakehouse." | Builds a Power BI semantic model definition with dimensions, facts, and relationships. |
| **Data analyst or BI developer** | "What tables are in my lakehouse, and how fresh is the data?" | Inspects metadata, row counts, and last refresh times. |
| **Data analyst or BI developer** | "Profile this dataset." | Generates summary statistics, null counts, and outlier detection. |
| **Citizen developer or business user** | "I have CSV files. Build me an interactive dashboard." | Ingests and models the data, then generates a local Python dashboard you can run. |
| **Citizen developer or business user** | "Show me total revenue by product for last quarter." | Writes and runs the warehouse query, and returns the results. |
| **Citizen developer or business user** | "Document my entire Fabric workspace." | Scans the workspace and produces structured documentation in Markdown. |

## Compatible AI tools

Skills for Fabric work with the following AI coding tools:

| Tool | Installation method |
|------|-------------------|
| **GitHub Copilot CLI** | Plugin marketplace (recommended) |
| **Visual Studio Code** | Automatically detected from `~/.copilot/` folder (VS Code 1.108+) |
| **Claude Code** | Plugin marketplace |
| **Cursor** | Clone the repository; `.cursorrules` is auto-detected |
| **Windsurf** | Clone the repository; `.windsurfrules` is auto-detected |
| **Codex / Jules / OpenCode** | Clone the repository; `AGENTS.md` is auto-detected |

## Agent specializations

Skills for Fabric includes experimental agent specializations that act like focused teammates. Agents combine prompts and tool selections unique to specific workflows. The following agents are available:

| Agent | Description |
|-------|-------------|
| **FabricDataEngineer** | Focused on data engineering tasks, such as building end-to-end Medallion architectures. |
| **FabricAdmin** | Focused on workspace administration tasks, such as documenting all items in a workspace. |
| **FabricAppDev** | Builds local applications that connect to Fabric, such as Python dashboards that use ODBC to refresh from warehouse data. |
| **FabricMigrationEngineer** | Orchestrates end-to-end workload migrations from Azure Synapse Analytics, Azure HDInsight, or Databricks to Microsoft Fabric. Handles migration assessment, phased execution planning, and cross-platform coordination. |

To use an agent specialization in GitHub Copilot CLI, reference it in your prompt:

```copilot-prompt
Using FabricAdmin, document my Workspace FabricCLIDemo
```

Or use the Copilot CLI command `/agent` to display and select from installed agents before entering your prompt.

## MCP server integration with Skills for Fabric

Some installation bundles include MCP server configuration where supported. You can also register additional Fabric MCP servers if your environment provides them.

For more information, see the [MCP servers guide](https://github.com/microsoft/skills-for-fabric/blob/main/mcp-setup/README.md), [What is the Fabric MCP server?](/rest/api/fabric/articles/mcp-servers/what-is-fabric-mcp-server), and [What is MCP in Real-Time Intelligence?](../real-time-intelligence/mcp-overview.md)

## Related content

- [Install Skills for Fabric](skills-for-fabric-install.md)
- [Discover available Skills for Fabric](skills-for-fabric-discover.md)
- [Skills for Fabric on GitHub](https://github.com/microsoft/skills-for-fabric)
- [What is the Fabric MCP server?](/rest/api/fabric/articles/mcp-servers/what-is-fabric-mcp-server)
- [Build AI agents for Real-Time Intelligence](../real-time-intelligence/ai-agents-eventhouse.md)
- [What is MCP in Real-Time Intelligence?](../real-time-intelligence/mcp-overview.md)
