---
title: Use the Copilot for Data Engineering and Data Science chat pane (preview)
description: Learn how to use the Copilot chat pane in Fabric notebooks to generate code, analyze data, and get AI-powered assistance.
ms.topic: how-to
ms.reviewer: jejiang
ms.date: 03/18/2026
ms.update-cycle: 180-days
no-loc: [Copilot]
ms.collection: ce-skilling-ai-copilot
ai-usage: ai-assisted
#CustomerIntent: As a Data Scientist, or Data engineer, I want to use Copilot for Data Engineering and Data Science to increase my productivity and help answer questions I have about my data to use with notebooks.
---

# Use the Copilot for Data Engineering and Data Science chat pane (preview)

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

This article covers both ways to interact with Copilot in notebooks: the **chat pane**, which opens on the right side of your notebook for multi-step conversations, and **[in-cell Copilot](#in-cell-copilot)**, which lets you generate code or run slash commands directly above a code cell. 

For an overview of Copilot capabilities in Data Science and Data Engineering, see [Overview of Copilot for Data Engineering and Data Science](./copilot-notebooks-overview.md).

When you open a notebook, Copilot automatically uses notebook context such as your workspace, attached Lakehouse, available schemas, tables, and files, existing notebook code, and runtime.

Copilot supports notebook-wide, multi-step code generation, refactoring, summarization, and validation across entire workflows, not just single cells or isolated prompts. It can coordinate changes across multiple cells in a session, helping you build and optimize end-to-end pipelines without losing context.

## Prerequisites

Copilot must be enabled for your tenant and your workspace must be on a supported capacity. If your capacity is outside the US or EU, your Fabric admin might need to enable more [tenant settings](../admin/service-admin-portal-copilot.md) for cross-geo data processing. 

For full requirements, see [prerequisites in the Copilot overview](./copilot-notebooks-overview.md#prerequisites).

## Get started

You don't need to install anything or start a session. Copilot is ready to use as soon as you open the pane.

To use Copilot in Fabric notebooks:

1. Create a new notebook or open an existing one.
1. Attach a Lakehouse to provide schema and data context.
1. Select the **Copilot** button on the notebook ribbon.

    :::image type="content" source="media/copilot-notebooks-chat-pane/copilot-ribbon-button.png" alt-text="Screenshot showing the Copilot button on the ribbon." lightbox="media/copilot-notebooks-chat-pane/copilot-ribbon-button.png":::

1. The Copilot chat pane opens on the right side of your notebook.

1. Select a model from the model selector. Different models (for example, GPT-5 or GPT-4.1) might produce different results depending on the complexity of your task.

    :::image type="content" source="media/copilot-notebooks-chat-pane/copilot-select-model.png" alt-text="Screenshot of the model selector in the Copilot chat pane showing available models." lightbox="media/copilot-notebooks-chat-pane/copilot-select-model.png":::

1. Enter a prompt or select a suggested starter prompt.

For detailed instructions, example prompts, and a walkthrough of the chat pane experience, see the [example walkthrough section](#example-walkthrough).

## Example walkthrough

The following walkthrough shows one example of an end-to-end Copilot flow, from selecting a starter prompt through reviewing and approving changes. Your experience might vary — Copilot responses depend on your data, notebook context, and how you phrase your prompts. 

1. Open the notebook and select **Copilot** from the ribbon to open the chat pane. Select a model from the model selector at the top (for example, GPT-5 or GPT-4.1), then choose one of the prebuilt starter prompts or type a custom question in the chat box.

    :::image type="content" source="media/copilot-notebooks-chat-pane/copilot-ribbon-button.png" alt-text="Screenshot of the Copilot chat pane open from the ribbon, showing starter prompts and a text box." lightbox="media/copilot-notebooks-chat-pane/copilot-ribbon-button.png":::

1. In this example, we select the starter prompt **"Profile my table to check columns, missing values, and duplicates"** under **Explore and Validate Data**. Copilot automatically uses notebook context — the attached Lakehouse, available schemas, and tables — to determine which table to profile. You don't need to specify the data source; Copilot discovers it from your workspace.

    :::image type="content" source="media/copilot-notebooks-chat-pane/copilot-profile-running.png" alt-text="Screenshot of Copilot searching the attached Lakehouse for schemas and tables." lightbox="media/copilot-notebooks-chat-pane/copilot-profile-running.png":::

1. Copilot finds the dimension_customer table in the default Lakehouse and requests permission to add a new code cell.

    :::image type="content" source="media/copilot-notebooks-chat-pane/copilot-profile-allow.png" alt-text="Screenshot of Copilot finding the dimension_customer table and requesting permission to add a code cell." lightbox="media/copilot-notebooks-chat-pane/copilot-profile-allow.png":::

1. After you approve, the Spark session starts and Copilot runs the code cell it created.

    :::image type="content" source="media/copilot-notebooks-chat-pane/copilot-profile-running-cell.png" alt-text="Screenshot of the Spark session starting and Copilot running the code cell." lightbox="media/copilot-notebooks-chat-pane/copilot-profile-running-cell.png":::

1. Copilot requests permission to edit code or run cells. You can **Allow** the action, **Allow and automatically approve** similar permissions in the future, or **Skip** to prevent Copilot from running the tool. You can change the default approval behavior at any time — see [Approval settings](#approval-settings) for details.

    :::image type="content" source="media/copilot-notebooks-chat-pane/copilot-profile-allow-run-future.png" alt-text="Screenshot of Copilot asking to run a notebook cell with options to allow, auto-approve, or skip." lightbox="media/copilot-notebooks-chat-pane/copilot-profile-allow-run-future.png":::

1. After the Spark job completes, you can choose to **Keep** or **Undo** the changes to the notebook. You can also open the **diff view** to see exactly what Copilot changed. 

    :::image type="content" source="media/copilot-notebooks-chat-pane/copilot-profile-keep-undo.png" alt-text="Screenshot of Spark job results with keep, undo, and diff view options after Copilot profiled a table." lightbox="media/copilot-notebooks-chat-pane/copilot-profile-keep-undo.png":::

1. The diff view shows the original notebook contents on the left and Copilot's edits on the right. Each side has a **Keep this version** button. Select the version you want to keep — either the original or Copilot's version. You can also go back without choosing either option.

    :::image type="content" source="media/copilot-notebooks-chat-pane/copilot-profile-keep-copilot-version.png" alt-text="Screenshot of the diff view showing original content on the left and Copilot edits on the right." lightbox="media/copilot-notebooks-chat-pane/copilot-profile-keep-copilot-version.png":::

1. You can also type a custom question in the chat box. In this example, Copilot uses one of several tools available to it from MCP servers to process the request. Here, it uses the `microsoft_docs_search` tool to find relevant information.

    :::image type="content" source="media/copilot-notebooks-chat-pane/copilot-prompt-tutorial.png" alt-text="Screenshot of a custom question in the chat pane with Copilot using the microsoft_docs_search tool." lightbox="media/copilot-notebooks-chat-pane/copilot-prompt-tutorial.png":::

This walkthrough covers the core chat pane flow. The chat pane also supports [chat history](#chat-history) for reviewing previous conversations, and you can interact with Copilot directly within cells using [in-cell Copilot](#in-cell-copilot) for tasks like fixing, explaining, or optimizing code.

## Performance insights and optimization

When you ask Copilot for optimization help, it can provide recommendations based on data size, join patterns, and runtime behavior. For example, it can suggest more efficient join strategies, help avoid unnecessary shuffles, identify opportunities to refactor into reusable functions, and highlight data quality issues that affect performance or correctness. You can surface these insights during multi-step conversations or by using the `/optimize` command.

## Chat history

Copilot preserves your chat history across sessions. You can view previous conversations by selecting the chat history icon in the chat pane. 

:::image type="content" source="media/copilot-notebooks-chat-pane/copilot-show-chat-history.png" alt-text="Screenshot of the chat history pane showing previous Copilot conversations." lightbox="media/copilot-notebooks-chat-pane/copilot-show-chat-history.png":::

To start a new conversation, select the new chat option.

:::image type="content" source="media/copilot-notebooks-chat-pane/copilot-new-chat.png" alt-text="Screenshot showing the new chat option in the Copilot chat pane." lightbox="media/copilot-notebooks-chat-pane/copilot-new-chat.png":::

## Model selection

You can choose between available models (for example, GPT-5 or GPT-4.1) from the model selector in the chat pane. Different models might provide different results depending on the complexity of your task.

## Approval settings

Copilot includes approval settings that control whether it asks for confirmation before running cells. To change approval settings, select the settings gear icon in the chat pane.

:::image type="content" source="media/copilot-notebooks-chat-pane/copilot-allow-settings.png" alt-text="Screenshot of the Copilot approval settings showing options to always ask or don't ask for approval before running tools." lightbox="media/copilot-notebooks-chat-pane/copilot-allow-settings.png":::

The available options are:

- **Ask for approval** — Copilot asks for confirmation before every cell run.
- **Don't ask for approval** — Copilot runs cells automatically.

High-risk actions, such as running multiple cells at once or installing packages, always require approval regardless of your setting.

When Copilot recommends code changes (for example, through Fix with Copilot or optimization suggestions), it can auto-apply the changes when approved. Copilot always presents an approval diff for review so you can inspect the proposed changes before they're committed. After applying, you can still **Keep** or **Undo** the changes.

## In-cell Copilot

In addition to the chat pane, you can interact with Copilot directly within notebook cells. This experience is ideal for quick, targeted actions on a single cell. Select the Copilot button above a code cell to open a text box where you can enter a request or slash command. For example, enter "Generate code for a logistic regression that fits this data" and Copilot writes the code in the cell below.

:::image type="content" source="media/copilot-notebooks-chat-pane/copilot-in-cell-commands.png" alt-text="Screenshot of the in-cell Copilot text box and slash command dropdown above a code cell." lightbox="media/copilot-notebooks-chat-pane/copilot-in-cell-commands.png":::

You can also use the following slash commands for specific actions on existing code:

- `/explain` — Explain code. Provides a plain-language explanation of any code block.
- `/fix` — Fix code errors. Identifies errors and suggests corrections.
- `/comments` — Add code comments. Automatically documents your code with summaries of logic and data changes.
- `/optimize` — Optimize code. Suggests improvements for performance and efficiency, including join strategy selection, shuffle reduction, function refactoring, and detection of potential data quality issues that affect performance or correctness.

Fabric notebooks also offer [inline code completion](author-execute-notebook.md#copilot-inline-code-completion-preview), which provides AI-powered autocomplete suggestions as you type in code cells.

## Diagnose notebook failures

When a notebook cell fails, Copilot can help you diagnose and fix the issue directly in your notebook workflow.

### Use Fix with Copilot for cell failures

After a cell execution failure (including Spark job failures surfaced in notebook execution), a **Fix with Copilot** option appears below the failed cell.

:::image type="content" source="media/copilot-notebooks-chat-pane/fix-with-copilot.png" alt-text="Screenshot showing the "Fix with Copilot" button." lightbox="media/copilot-notebooks-chat-pane/fix-with-copilot.png":::

When you select **Fix with Copilot**, Copilot uses notebook context such as:

- Code from the failed cell.
- Runtime and execution context.
- Spark execution details and error logs.

Copilot then provides:

- An error summary.
- A likely root cause.
- Recommended next steps.

If a code change is needed, Copilot can suggest an updated version. Review the change in diff view, then choose whether to keep or undo it.

### Use `/fix` for targeted or broader troubleshooting

You can also troubleshoot from Copilot chat or in-cell Copilot by using `/fix`.

- Use `/fix` on a specific cell for a focused issue.
- Use `/fix` from chat to run broader diagnostics across the entire notebook, not only a single cell. Copilot can provide a consolidated summary, root-cause analysis across steps, and propose coordinated fixes spanning multiple cells when appropriate.
- Use chat context to continue investigating related failures across multiple cells.

### Current behavior

**Fix with Copilot** is available when a failure occurs in the current notebook session. If you reopen the notebook later, the button isn't shown for previous failures.

## FAQ

### When does **Fix with Copilot** appear?

**Fix with Copilot** appears after a notebook cell execution fails in the current session, including failures surfaced from Spark job execution in the notebook.

### What information does Copilot use for diagnostics?

Copilot uses notebook context, including failed cell code, runtime and execution context, and available Spark execution details and error logs.

### Does Copilot automatically change my code?

Copilot can suggest code fixes when needed. Review the proposed changes in diff view, then choose whether to keep or undo them.

### Can Copilot troubleshoot issues across multiple cells?

Yes. Use `/fix` for a specific cell, and continue in chat to investigate related failures across multiple cells.

### Does Copilot replace manual debugging?

No. Copilot accelerates diagnosis and suggests fixes, but you can still inspect logs and perform manual debugging as needed.

### Will **Fix with Copilot** still appear after I reopen a notebook?

No. Today, the button appears only for failures that occur in the current notebook session.

## Related content

- [Overview of Copilot for Data Engineering and Data Science](./copilot-notebooks-overview.md)
- [Overview of Copilot in Fabric and Power BI](../fundamentals/copilot-fabric-overview.md)
- [Privacy, security, and responsible use of Copilot in notebooks](../fundamentals/copilot-data-science-privacy-security.md)

