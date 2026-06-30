---
title: Discover available Skills for Fabric
description: Find Skills for Fabric installed in your AI tool, look up details for a specific skill, and browse the full catalog on GitHub.
ms.reviewer: bocrivat
ms.topic: how-to
ms.date: 06/29/2026
ms.search.form: skills, AI, agents, Fabric workloads
ms.collection: ce-skilling-ai-copilot
ai-usage: ai-assisted

#CustomerIntent: As a developer or data professional, I want to discover which Skills for Fabric are available so I can choose the right skills for my workload.
---

# Discover available skills for Microsoft Fabric

[Skills for Fabric](skills-for-fabric-overview.md) span the major Fabric workloads. Because new skills are added to the [microsoft/skills-for-fabric](https://github.com/microsoft/skills-for-fabric) repository regularly, this article shows you how to discover what's currently available rather than enumerating every skill.

> [!NOTE]
> Skills for Fabric are open source under the [MIT License](https://github.com/microsoft/skills-for-fabric/blob/main/LICENSE). The catalog evolves quickly. Always check the [skills folder on GitHub](https://github.com/microsoft/skills-for-fabric/tree/main/skills) for the latest list.

## Workload areas covered

Skills for Fabric are organized by workload. The repository currently includes skills across these areas:

| Workload area | What the skills help you do |
|---------------|-----------------------------|
| Data engineering | Author Spark notebooks, manage Spark sessions, diagnose job failures, and build end-to-end Medallion architectures. |
| Data warehouse | Run authoring T-SQL, query Lakehouse SQL endpoints, and analyze warehouse performance. |
| Real-time intelligence | Author and query Eventhouses with KQL, build Eventstream topologies, and manage Activator alerts. |
| Data Factory | Build, refresh, and inspect Dataflows Gen2, and upgrade Gen1 dataflows to Gen2.1. |
| Power BI | Plan, design, and manage Power BI semantic models and report definitions; query semantic models with DAX; and ask natural-language questions through FabricIQ. Report and semantic model authoring skills ship in the separate `powerbi-authoring` plug-in. |
| Fabric admin and governance | Document workspaces and inventory items across tenants. |
| Migration | Port workloads to Microsoft Fabric from Azure Databricks, Azure Synapse Analytics, Azure HDInsight, and Synapse pipelines. |
| Discovery and search | Find Fabric items across workspaces. |

For the current list of skills in each area, browse the [skills folder on GitHub](https://github.com/microsoft/skills-for-fabric/tree/main/skills).

## List skills installed in your AI tool

After you [install Skills for Fabric](skills-for-fabric-install.md), use your tool's slash commands to see what's available locally.

#### GitHub Copilot CLI or Claude Code

1. Start a Copilot CLI or Claude Code session.
1. Run `/env` to list all installed skills, including the Skills for Fabric marketplace.

#### Visual Studio Code

1. Open the Chat view.
1. Type `/` to view available skills auto-loaded from `~/.copilot/`.

#### Cursor, Windsurf, and other AGENTS.md-compatible tools

Skills are auto-loaded from the cloned `microsoft/skills-for-fabric` repository at session start. Ask your tool to list available Skills for Fabric or check the `skills/` folder in the cloned repository.

## Get details for a specific skill

To see what a skill does, its triggers, and its required parameters:

#### GitHub Copilot CLI or Claude Code

Run the following command, replacing `<skill-name>` with the skill you want to inspect:

```bash
/skills info <skill-name>
```

For example: `/skills info eventhouse-consumption-cli`

#### Other tools

Open the corresponding `SKILL.md` file in [microsoft/skills-for-fabric/skills](https://github.com/microsoft/skills-for-fabric/tree/main/skills). Each skill folder contains a `SKILL.md` file with a description, trigger phrases, and usage notes.

## Browse the full catalog on GitHub

Each subfolder in [microsoft/skills-for-fabric/skills](https://github.com/microsoft/skills-for-fabric/tree/main/skills) represents one skill. The folder name describes the workload and capability. For example, `sqldw-authoring-cli` is for Data Warehouse authoring via CLI.

To stay current with new releases, watch the [Releases page](https://github.com/microsoft/skills-for-fabric/releases). Your AI coding tool also checks for plug-in updates automatically when you install or reinstall a bundle.

## Related content

- [Skills for Fabric overview](skills-for-fabric-overview.md)
- [Install Skills for Fabric](skills-for-fabric-install.md)
- [Skills for Fabric on GitHub](https://github.com/microsoft/skills-for-fabric)
