---
title: What is Fabric data engineering agent (Project Osmos)? (preview)
description: Fabric data engineering agent (Project Osmos) is an autonomous data engineering capability for Microsoft Fabric that plans, executes, and validates work against authorized lakehouse resources.
author: vsarad
ms.author: vijaykris
ms.date: 08/22/2026
ms.topic: overview
ms.service: fabric
ms.subservice: data-engineering
ai-usage: ai-assisted
#customer intent: As a data engineer, I want to understand what Fabric data engineering agent (Project Osmos) is and when to use it so that I can decide whether to run autonomous data engineering tasks in Fabric.
---

# What is Fabric data engineering agent (Project Osmos)? (preview)

Fabric data engineering agent (Project Osmos) is an autonomous data engineering capability for Microsoft Fabric. It runs persistent tasks that plan, execute, and validate data engineering work against Fabric resources you’re authorized to access.

From a supported command-line client, you enter a **Project outcome** (a description of the complete end-to-end data engineering task) and select the Fabric lakehouse that hosts the task. Project Osmos can inspect data, create and test Spark notebooks, transform data, write Delta tables, and validate results. Tasks continue running in Fabric after the local client disconnects.

> [!IMPORTANT]
> The Data engineering agent (Project Osmos) is in preview. Preview features are released with limited capabilities and are subject to separate [supplemental preview terms](https://go.microsoft.com/fwlink/?linkid=2240967). They're not intended for production use, aren't subject to service-level agreements, and might be available only in selected regions. For more information, see [Microsoft Fabric preview information](/fabric/fundamentals/preview).

## Key capabilities

The data engineering agent (Project Osmos) implements and executes data engineering tasks in a managed Fabric task. It uses SparkCore, persistent state, access controls, progress tracking, and validation against target data. Multiple coordinated agents create and evaluate multiple implementation options to deliver production-quality output.

Project Osmos adds Fabric-specific capabilities:

- **Fabric-hosted execution:** Code and data operations run with Fabric Spark and OneLake rather than only in a local development environment.
- **Persistent task state:** The task keeps running after the local client disconnects and can be resumed without starting over.
- **Lakehouse context:** Project Osmos resolves the Fabric workspace and default Spark-session lakehouse from the lakehouse URL you provide.
- **Operational guardrails:** Before execution, you review settings for permissions, write safety, rerun behavior, schema evolution, artifacts, and reasoning effort.
- **Integrated validation:** The task can run generated code and check row counts, nulls, schemas, and other success criteria in the target environment.
- **Shared visibility:** Anyone who has access to the lakehouse where you launched the task can check its progress and provide input if needed.

These capabilities turn a Project outcome into a managed unit of data engineering work rather than a transient chat response.

## How data engineering agent (Project Osmos) works

Project Osmos uses a managed lifecycle for each data engineering task:

- **Define:** The Project outcome identifies the complete end-to-end data
  engineering task, and the lakehouse URL identifies the Fabric lakehouse that
  hosts it.
- **Plan:** Project Osmos analyzes the available context and recommends operating settings for review.
- **Execute:** The task runs in Fabric and can create, test, and refine data engineering artifacts.
- **Validate:** The task checks its outputs against the specified success criteria and reports the results.
- **Monitor:** The task remains available from the command-line client and the lakehouse task experience.

The selected lakehouse is the default lakehouse for the Spark session. It isn't
automatically the only source or destination. Your Project outcome, Fabric
permissions, and reviewed operating settings determine the task's scope.

For steps to create your first task, see
[Get started with Project Osmos](data-engineering-agent-get-started.md).

## Choose an appropriate use case

Project Osmos is designed for outcome-oriented data engineering work that benefits from autonomous planning, execution, and validation.

| Use case | Example outcome |
|----------|-----------------|
| Data preparation | Clean sales files, standardize types, remove invalid rows, and write a validated Delta table. |
| Table integration | Join orders, customers, and product data, then create a curated table for downstream analytics. |
| Lakehouse modernization | Convert an existing transformation into Spark, produce a tested notebook, and validate the new output. |
| Medallion architecture | Build bronze, silver, and gold transformations from source files as one complete task. |
| Data quality remediation | Profile a table, identify quality issues, apply approved fixes, and report before-and-after metrics. |
| Performance improvement | Review Delta tables, recommend partitioning or layout changes, implement approved changes, and measure results. |
| Migration assistance | Transform legacy extracts into a Fabric-ready model while preserving business rules and validating totals. |

Project Osmos is built to solve data engineering challenges. It isn't intended for a quick query, a Power BI report change, or other non-data engineering tasks.

## Work across the CLI and Fabric

Project Osmos uses two connected experiences. You create and steer tasks from your command line and view task progress in the Fabric application:

- **Command-line experience:** Use GitHub Copilot CLI, Codex, or Claude Code to
  create a task, enter a Project outcome, review operating settings, and send
  follow-up guidance.
- **Fabric lakehouse experience:** Browse the lakehouse's tasks, check status, open a task, review activity and errors, and inspect produced outputs.

Both experiences refer to the same Fabric-hosted task and task ID.

## Next steps

- [Get started with data engineering agent (Project Osmos)](data-engineering-agent-get-started.md)
- [Best practices for data engineering agent (Project Osmos)](data-engineering-agent-best-practices.md)
- [What is a lakehouse in Microsoft Fabric?](/fabric/data-engineering/lakehouse-overview)
