---
title: Overview of Copilot for Data Engineering and Data Science in Microsoft Fabric (preview)
description: Learn about Copilot for Data Engineering and Data Science, an AI assistant that helps you analyze, transform, debug, and understand data in Fabric notebooks.
ms.topic: overview
ms.reviewer: jejiang
ms.custom:
  - build-2023
  - build-2023-fabric
  - ignite-2023
  - ignite-2023-fabric
  - copilot-learning-hub
ms.date: 03/18/2026
ms.update-cycle: 180-days
ms.search.form: Data Science Overview
no-loc: [Copilot]
ms.collection: ce-skilling-ai-copilot
ai-usage: ai-assisted
---

# Overview of Copilot for Data Engineering and Data Science (preview)

> [!IMPORTANT]
> Copilot for Data Engineering and Data Science is in [preview](../fundamentals/preview.md).

Copilot in Microsoft Fabric is your AI partner for turning data into insights faster, with less friction.

Available across Fabric workloads, each Copilot experience is tailored to the task at hand. This article focuses on the Data Science and Data Engineering notebook experience.

In notebooks, Copilot helps you move from data to working code without breaking your flow. It understands your notebook context, including attached Lakehouses, workspace tables and files, and loaded dataframes, to suggest relevant code, explain results, and troubleshoot issues so you can turn questions into trusted insights faster.

For information about Copilot in other workloads, see [Overview of Copilot in Fabric and Power BI](../fundamentals/copilot-fabric-overview.md).

## What you can accomplish with Copilot

Copilot supports your full notebook workflow, from exploration to optimization, so you can move from question to validated result without leaving your notebook.

When you open the Copilot chat pane, you can start with a suggested prompt or ask your own question in natural language.

With Copilot, you can:

- Accelerate development with code generation and less repetitive setup.
- Generate and refactor code across multiple cells and entire workflows, not just individual cells.
- Summarize and validate notebook logic end-to-end.
- Explore, validate, and prepare data by profiling tables, sampling data, and cleaning inconsistencies.
- Surface performance insights such as recommending efficient join strategies, avoiding costly data shuffles, refactoring into reusable functions, and highlighting data quality issues detected during exploration.
- Resolve issues in context by understanding errors and applying suggested fixes.
- Analyze and optimize notebooks by generating metrics, exploring trends, converting code, and documenting logic for collaboration.

If you want step-by-step usage instructions, prompt examples, and portal walkthroughs, see [Use the Copilot chat pane](./copilot-notebooks-chat-pane.md).

For failure diagnostics and recovery workflows, see [Diagnose notebook failures with Copilot](./copilot-notebooks-chat-pane.md#diagnose-notebook-failures).

## How Copilot works

When you open a notebook, Copilot automatically understands:

- The current workspace
- The attached Lakehouse
- Available schemas, tables, and files
- The notebook's structure and existing code
- The execution environment
- The runtime state and recent execution telemetry (for example, data sizes and join behavior)

You don't need to describe your setup. Copilot uses this context to generate relevant, environment-aware responses as your notebook evolves. Responses and recommendations consider current runtime characteristics to propose optimizations aligned to the observed behavior.

Because Copilot is schema-aware, you can ask:

- "How many tables are in the lakehouse?"
- "What are the columns of the table customers?"
- "Create a dataframe from sales.csv."

Copilot generates code and explanations directly in the chat pane, aligned to your environment.

## Work the way you prefer: chat pane and in-cell Copilot

Copilot integrates into notebooks in two complementary ways.

- **Chat pane**: Best for multi-step workflows, building pipelines across cells, exploring datasets, and reviewing generated code with diff view. The chat pane supports notebook-wide code generation and refactoring across cells, with the ability to review and apply changes using an approval diff. It can coordinate changes spanning several cells to build or optimize end-to-end workflows.
- **In-cell Copilot**: Best for focused improvements within a single cell, such as generating code, explaining logic (`/explain`), fixing errors (`/fix`), adding documentation (`/comments`), or optimizing performance (`/optimize`).

Both experiences share the same notebook context, so you can move seamlessly between broader workflow design and targeted refinement.

For end-to-end instructions and examples, see [Use the Copilot chat pane](./copilot-notebooks-chat-pane.md). For details on slash commands and in-cell usage, see [In-cell Copilot](./copilot-notebooks-chat-pane.md#in-cell-copilot). For inline code completion, see [Copilot inline code completion](./author-execute-notebook.md#copilot-inline-code-completion-preview).

## Responsible use of AI

Copilot is a productivity tool, not a replacement for human judgment. Always review AI-generated code, explanations, and suggestions before applying them to your notebook. Copilot might produce results that are inaccurate, incomplete, or based on outdated library syntax.

To support responsible use:

- **Review all output** — Validate generated code and results against your data and expectations before running in production.
- **Control what Copilot runs** — By default, Copilot asks for your approval before running cells or editing code. Keep this setting enabled so you can review each action before it executes. For details, see [Approval settings](./copilot-notebooks-chat-pane.md#approval-settings).
- **Understand data handling** — Customer data is temporarily stored and processed to detect harmful use of AI. For full details on data privacy, security, and retention, see [Privacy, security, and responsible use of Copilot in notebooks](../fundamentals/copilot-data-science-privacy-security.md).

## Prerequisites

Before you can use Copilot in notebooks:

- Confirm that the **Users can use Copilot and other features powered by Azure OpenAI** tenant setting is enabled. This setting is enabled by default, but your Fabric admin might have turned it off.
- Ensure your workspace is on a supported capacity (F2 or higher, or P1 or higher).
- If your capacity is outside the US or EU, ensure your admin enables more tenant settings for cross-geo data processing and storage.

For details on capacity requirements, region availability, required tenant settings, and data processing across geographic areas, see [Overview of Copilot in Fabric and Power BI](../fundamentals/copilot-fabric-overview.md). For the full list of tenant settings, see [Copilot tenant settings](../admin/service-admin-portal-copilot.md).

## Limitations

- Copilot features in the Data Science and Data Engineering experience are currently scoped to notebooks. Copilot can also read Power BI semantic models through semantic link integration.

- If your tenant is configured with private link, the Copilot chat pane doesn't work. Inline code suggestions and quick actions might still work, but chat interactions fail to load.

- Code generation with fast-moving or recently released libraries might include inaccuracies or fabrications.

- AI-generated content might be inaccurate. Always review Copilot suggestions before applying them.

## Fix with Copilot

When a cell or Spark job fails, the **Fix with Copilot** action appears below the failed cell. It provides an error summary, root-cause analysis, and recommended fixes. Copilot can auto-apply code changes with an approval diff so you can review before committing. You can also invoke the `/fix` command in Copilot chat for targeted diagnostics on a specific cell or for the entire notebook.

For more information about failure diagnostics, see [Diagnose notebook failures](./copilot-notebooks-chat-pane.md#diagnose-notebook-failures).

## Related content

- [How to use the Copilot chat pane](./copilot-notebooks-chat-pane.md)
- [Overview of Copilot in Fabric and Power BI](../fundamentals/copilot-fabric-overview.md)
- [Privacy, security, and responsible use of Copilot in notebooks](../fundamentals/copilot-data-science-privacy-security.md)
