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
ms.date: 04/01/2026
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
- When prompted, surface performance insights such as recommending efficient join strategies, avoiding costly data shuffles, refactoring into reusable functions, and highlighting data quality issues detected during exploration.
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

## Fix with Copilot

When a cell or Spark job fails, the **Fix with Copilot** action appears below the failed cell. It provides an error summary, root-cause analysis, and recommended fixes. Copilot can auto-apply code changes with an approval diff so you can review before committing. You can also invoke the `/fix` command in Copilot chat for targeted diagnostics on a specific cell or for the entire notebook.

For more information about failure diagnostics, see [Diagnose notebook failures](./copilot-notebooks-chat-pane.md#diagnose-notebook-failures).

## Known limitations

- Copilot features in the Data Science and Data Engineering experience are currently scoped to notebooks. Copilot can also read Power BI semantic models through semantic link integration.
- Copilot context awareness is optimized for Lakehouse scenarios. If you're working with other data sources such as SQL databases, Copilot might not fully recognize the connection context and could default to Lakehouse-oriented suggestions. Specify the data source explicitly in your prompts for the best results.
- If your tenant is configured with private link, the Copilot chat pane doesn't work. Inline code suggestions and quick actions might still work, but chat interactions fail to load.
- Code generation with fast-moving or recently released libraries might include inaccuracies or fabrications.
- AI-generated content might be inaccurate. Always review Copilot suggestions before applying them.

### Copilot button is disabled in notebooks

In some cases, the Copilot button in Fabric Notebooks may appear disabled (grayed out). This indicates that Copilot is not currently available in your environment due to configuration, capacity, or regional requirements not being met.

Copilot relies on several prerequisites across tenant settings, capacity, workspace configuration, and regional availability. If any of these requirements are not satisfied, the Copilot entry point will be disabled.

#### How to resolve

Use the table below to identify the cause and take appropriate action.

| # | Reason | User / Admin action |
|---|--------|---------------------|
| 1 | Tenant admin has not enabled Copilot. The "Users can use Copilot and other features powered by Azure OpenAI" tenant setting is turned off. | Contact your Fabric/Power BI tenant admin → **Admin Portal** → **Tenant settings** → Enable **"Copilot and Azure OpenAI Service"**. |
| 2 | Capacity SKU does not meet the minimum requirement. Copilot requires F64 or higher Fabric capacity (or P1+ for Power BI Premium). Trial capacities are also supported. | Upgrade your capacity to F64+ or start a Fabric trial at [Fabric Trial](https://www.microsoft.com/microsoft-fabric/getting-started). |
| 3 | Cross-geo data processing not enabled. Your capacity is in a region where Azure OpenAI is not natively available, and the cross-geo setting is off. | **Admin Portal** → **Tenant settings** → Enable **"Data sent to Azure OpenAI can be processed outside your capacity's geographic region, compliance boundary, or national cloud instance"**. |
| 4 | Workspace not assigned to an eligible capacity. The workspace containing the notebook is not attached to a capacity that supports Copilot. | Move the workspace to an eligible capacity (F64+ / P1+ / Trial). |
| 5 | Copilot not yet available in your region. Azure OpenAI regional availability may limit Copilot in certain geos. | Check [Copilot available regions](/fabric/get-started/copilot-fabric-overview#available-regions) and consider enabling cross-geo processing. |

> [!TIP]
> If you're unsure which setting is causing the issue, start by contacting your tenant administrator, as most Copilot requirements are controlled at the organization level.

## Known issues

### Copilot shows "Copilot is currently unavailable"

In some cases, Copilot may display *"Copilot is currently unavailable"* in the chat pane. This typically occurs when the notebook session is disrupted, for example, after closing another notebook in the same workspace.

**Impact:**

- Copilot chat becomes unavailable.
- Prompts can't be submitted or completed.

**How to resolve:**

1. Close all open notebooks in your workspace.
1. Reopen your notebook and the Copilot pane again.

**Best practice:**

- Avoid closing other notebooks while actively using Copilot, as this may interrupt the session.

### Copilot may not use the latest cell error output when troubleshooting

In some cases, Notebook Copilot may not fully incorporate the most recent error output from a notebook cell when diagnosing issues. This can lead to incomplete or less relevant troubleshooting guidance.

**Workaround**

To improve response quality, explicitly reference or include the latest error message in your prompt when asking Copilot for help.



> [!NOTE]
> These are known issues that may occur in production environments. A fix is in progress and will be rolled out in an upcoming update.

## Related content

- [How to use the Copilot chat pane](./copilot-notebooks-chat-pane.md)
- [Overview of Copilot in Fabric and Power BI](../fundamentals/copilot-fabric-overview.md)
- [Privacy, security, and responsible use of Copilot in notebooks](../fundamentals/copilot-data-science-privacy-security.md)
