---
title: Install Skills for Fabric
description: Learn how to install, configure, and update Skills for Fabric using GitHub Copilot CLI, Claude Code, or other AI coding tools.
ms.reviewer: bocrivat
ms.topic: how-to
ms.date: 06/19/2026
ms.search.form: skills, AI, agents, Copilot CLI, install
ms.collection: ce-skilling-ai-copilot
ai-usage: ai-assisted

#CustomerIntent: As a developer or data professional, I want to install Skills for Fabric so I can use AI coding tools to work with Microsoft Fabric workloads.
---

# Install Skills for Fabric

This article explains how to install, configure, and update [Skills for Fabric](skills-for-fabric-overview.md) by using GitHub Copilot CLI, Claude Code, or other compatible AI coding tools.

## Prerequisites

Before you install Skills for Fabric, make sure you have the following items:

- **An AI coding tool**, such as [GitHub Copilot CLI](https://docs.github.com/copilot/how-tos/use-copilot-for-common-tasks/use-copilot-in-the-cli), [Claude Code](https://docs.anthropic.com/claude/docs/claude-code), [Visual Studio Code](https://code.visualstudio.com/), Cursor, Windsurf, or another `AGENTS.md` compatible tool.
- **[Node.js](https://nodejs.org/)**: Required for the standalone GitHub Copilot CLI, which installs as an npm package (`npm install -g @github/copilot`). For full setup steps, see [Set up GitHub Copilot CLI](https://docs.github.com/copilot/how-tos/set-up/set-up-for-self).
- **[PowerShell 7](/powershell/scripting/install/installing-powershell)**: Required for GitHub Copilot CLI. Verify with `pwsh --version`.
- **[Git](https://git-scm.com/downloads)**: Required to clone skill repositories for tools that don't use the plugin marketplace.
- **[Azure CLI](/cli/azure/install-azure-cli)**: Most Fabric operations require Azure authentication. After installing, sign in with `az login`.

## Install with GitHub Copilot CLI or Claude Code

Both GitHub Copilot CLI and Claude Code use the same plugin marketplace workflow.

1. Add the Skills for Fabric marketplace:

   ```bash
   /plugin marketplace add microsoft/skills-for-fabric
   ```

1. Install a bundle. You can install the full bundle or a focused bundle. For focused bundles, see [Installation bundles](#installation-bundles). To install the complete bundle with all Skills for Fabric:

   ```bash
   /plugin install fabric-skills@fabric-collection
   ```

1. Quit and restart your tool to load the skills:

   ```bash
   /quit
   ```

1. Verify the installation:

   ```bash
   /skills
   ```

## Install with other AI tools

For Cursor, Windsurf, Codex, and similar tools, clone the [Skills for Fabric](https://github.com/microsoft/skills-for-fabric) repository. The root-level configuration files (`CLAUDE.md`, `.cursorrules`, `.windsurfrules`, `AGENTS.md`) are automatically detected when you clone the repository into your project folder.

## Installation bundles

A bundle is a preconfigured group of skills packaged for the plugin marketplace. Instead of installing skills one at a time, pick a bundle that matches your role or workflow and install the entire group with a single command. Skills for Fabric offers four bundles so you can install only the skills you need:

| Bundle | Description | Install command |
|--------|-------------|----------------|
| `fabric-skills` | Complete bundle: all skills for authoring, consumption, operations, migration, and end-to-end architecture | `/plugin install fabric-skills@fabric-collection` |
| `fabric-authoring` | Developer skills for REST APIs, CLI automation, notebooks, T-SQL, KQL, Dataflows Gen2, Eventstreams, and semantic models | `/plugin install fabric-authoring@fabric-collection` |
| `fabric-consumption` | Read-only exploration and query skills across all Fabric workloads | `/plugin install fabric-consumption@fabric-collection` |
| `fabric-operations` | Performance and health diagnostics | `/plugin install fabric-operations@fabric-collection` |

You can filter the full bundle by workload in GitHub Copilot CLI or Claude Code using the following commands:

```bash
/plugin install fabric-skills@fabric-collection --filter "sqldw-*"
/plugin install fabric-skills@fabric-collection --filter "spark-*"
/plugin install fabric-skills@fabric-collection --filter "eventhouse-*"
```

## Example prompts for common scenarios

After installing a Skills for Fabric bundle, open your AI coding tool and try one of the following prompt examples. Modify the workspace and item names to match your environment.

### Analyze data and generate a PDF report

```copilot-prompt
I have New York City taxi trips in a data warehouse called DemoDW,
in a workspace called FabricCLIDemo. Analyze the data and produce
a PDF report of key indicators for every month (average trip
duration, average trip fare, number of trips). Include outlier
analysis across months, and a 3-month forecast. Save the results
as a PDF.
```

### Document a workspace

```copilot-prompt
Document my Fabric Workspace: take a look at the workspace called
FabricCLIDemo. Document the data solution, the role of each
item, the lineage, and what happens in each item with my
data. Look at notebooks, pipelines, views, stored procedures, and
semantic models. Write all results to a WorkspaceReport folder in
Markdown format.
```

### Build a Medallion Architecture

```copilot-prompt
Use Microsoft Fabric skills to design a medallion architecture
for NYC taxi data. Download all data dictionaries and trip data for
2025. Create clean tables following the dimensional model with fact
and dimension tables. Create an aggregate reporting view in the SQL
endpoint. Generate a Power BI semantic model definition with
dimensions, facts, and relationships. Before deploying, ask me
which workspace to use.
```

### Build an interactive dashboard

```copilot-prompt
Use FabricAppDev. NYC Taxi Trips data is in the DemoDW warehouse
of the FabricCLIDemo workspace. Generate an interactive Python
dashboard that connects to the warehouse using ODBC, takes into
account month, day of week, and time of day, and tells me where
to pick up customers to maximize tips. When done, launch the app.
```

> [!TIP]
> Consider asking Copilot to plan before execution. Use **Shift+Tab** to move to planning mode, where you enter your prompt. After you're satisfied with the plan, switch back and ask the agent to start executing. Empirically, results are better when the AI plans first.

## Update skills

Skills for Fabric check for updates weekly in GitHub Copilot CLI and Claude Code. You can force a check at any time by using the following methods:

- **Natural language prompt**: "Check for Skills for Fabric updates"
- **Explicit skill invocation** (Copilot CLI / Claude Code): `/fabric-skills:check-updates`

To manually update skills in Copilot CLI or Claude Code, use the following command:

```bash
/plugin uninstall fabric-skills@fabric-collection
/plugin install fabric-skills@fabric-collection
```

## Common issues and resolutions

| Issue | Cause | Resolution |
|-------|-------|------------|
| `copilot` command not found | GitHub Copilot CLI isn't installed or isn't on PATH. | Install [GitHub Copilot CLI](https://docs.github.com/copilot/how-tos/use-copilot-for-common-tasks/use-copilot-in-the-cli), then close and reopen PowerShell 7. Verify with `copilot --help`. |
| Plugins don't install correctly | PowerShell version is too old. GitHub Copilot CLI requires PowerShell 7. | Run `pwsh --version` to verify PowerShell 7 is installed. Ensure your terminal profile launches `pwsh`, not `powershell.exe`. |
| Marketplace add fails or repo is inaccessible | Not authenticated with the correct GitHub account. | Authenticate with your GitHub account and verify you can access the [Skills for Fabric](https://github.com/microsoft/skills-for-fabric) repo in a browser. Relogin to Copilot CLI. |
| No skills appear after marketplace add | Copilot session wasn't restarted, or the plugin wasn't activated. | Run `/quit`, restart Copilot, then run `/plugin marketplace browse fabric-collection` and `/plugin install fabric-skills@fabric-collection`. |
| Skills installed but not being invoked | Skills are disabled, the prompt is too vague, or skill autoselection didn't trigger. | Run `/skills` to verify skills are enabled. Use explicit prompts that mention your Fabric workspace, warehouse, or lakehouse. Try explicit invocation with `/fabric-skills:<skill-name>`. |
| Actions occur in the wrong workspace | Workspace wasn't specified in the prompt. | Always specify workspace explicitly. Add "Before making any changes, ask me which workspace to use" to your prompt. |
| Plugin update not reflected | Cached plugin version is still active. | Restart Copilot CLI and run `/fabric-skills:check-updates`. If still stale, uninstall and reinstall the plugin. |
| Workspace creation or capacity permission errors | Insufficient permissions on the Fabric capacity, or the capacity is paused. | Verify you have Contributor or Admin permissions on the target capacity. In the Azure portal, check that the capacity is in an **Active** (Resumed) state. |

> [!CAUTION]
> Use caution with the `/yolo` command (which allows the AI to execute actions without confirmation) when provisioning or deploying resources. Start with **Plan mode** to validate the plan summary before switching to **Autopilot mode**.

## Related content

- [Skills for Fabric overview](skills-for-fabric-overview.md)
- [Discover available Skills for Fabric](skills-for-fabric-discover.md)
- [Skills for Fabric on GitHub](https://github.com/microsoft/skills-for-fabric)
