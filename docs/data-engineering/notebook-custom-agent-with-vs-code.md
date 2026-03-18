---
title: Author notebooks with the Fabric Notebook custom agent in Visual Studio Code
description: Learn about the Fabric Notebook custom agent in Visual Studio Code and how to use it to develop Microsoft Fabric notebooks with the code suggestions and code generation features.
ms.reviewer: qixwang
ms.topic: how-to
ms.date: 03/18/2026
ms.search.form: VSCodeExtension
ai-usage: ai-assisted
---

# Develop Microsoft Fabric notebooks with the Fabric Notebook custom agent in Visual Studio Code

> [!NOTE]
> Fabric Notebook custom agent in Visual Studio Code is currently in preview.

The Fabric Notebook custom agent is a specialized agent that you can select in the **GitHub Copilot Chat** experience in Visual Studio Code. It helps you author Microsoft Fabric notebooks with suggestions and code generation that are aware of Fabric notebook context.

Compared to a general-purpose coding agent, the Fabric Notebook custom agent understands Fabric notebook patterns. For example, it recognizes the built-in `spark` variable that represents your current Spark session, so it can suggest code that uses the existing session instead of creating a new one.

It also helps with common Fabric data access patterns, such as using relative paths for the default Lakehouse and full ABFSS paths for nondefault Lakehouses.

## When to use this agent

Use the Fabric Notebook custom agent when you need AI assistance for notebook authoring tasks, such as generating Spark code, refining notebook logic, and troubleshooting notebook code with Fabric-specific context.

Use more Fabric Data Engineering VS Code extension features when you need workspace and artifact operations, such as browsing Fabric items, opening notebooks, and managing resources. To learn what the extension is and what it supports, see [What is the Fabric Data Engineering VS Code extension?](setup-vs-code-extension.md).

## Prerequisites

- Install the [Fabric Data Engineering VS Code extension](https://marketplace.visualstudio.com/itemdetails?itemName=SynapseVSCode.synapse). 

## Select the Fabric Notebook custom agent

Follow these steps in order to select the session type, agent, and model in **GitHub Copilot Chat**.

1. Make sure the [Fabric Data Engineering VS Code extension](https://marketplace.visualstudio.com/itemdetails?itemName=SynapseVSCode.synapse) is installed.

    This extension is required for the Fabric Notebook custom agent to appear.

1. Open a Fabric notebook in Visual Studio Code.
1. Open **GitHub Copilot Chat**.
1. In the session type selector, choose **Local**.

    The FabricNotebook custom agent supports only the **Local** session type. **Background** and **Cloud** aren't supported for this agent.

1. In the agent selector, choose **FabricNotebook**.

    :::image type="content" source="media\fabric-notebook-customagent-vscode\select-notebook-custom-agent.png" alt-text="Screenshot of selecting the Fabric Notebook custom agent in VS Code. "lightbox="media\fabric-notebook-customagent-vscode\select-notebook-custom-agent.png":::

1. In the model picker, choose one of the supported base models: **Claude Sonnet 4.5**, **Claude Opus 4.6**, or **GPT-5.2**.

    > [!IMPORTANT]
    > Use one of these base models with the Fabric Notebook custom agent: Claude Sonnet 4.5, Claude Opus 4.6, or GPT-5.2. If another model is selected, switch to one of these supported models.

## Use the Fabric Notebook custom agent

After you select **FabricNotebook**, you can start using it immediately in **GitHub Copilot Chat** by entering your own prompts. You don't need to use sample prompts to work with the agent.

The sample prompts and saved prompts are optional helpers in the **FABRIC DATA ENGINEERING** extension view.

1. In the Activity Bar, select the **FABRIC DATA ENGINEERING** extension view.
1. In that panel, expand **AGENT PROMPTS - FABRIC DATA ENGINEERING** to view sample prompts.

    Sample prompts help you start common tasks quickly. For example, you can use prompts for exploring and validating data, cleaning and preparing data, and similar notebook workflows.

    :::image type="content" source="media\fabric-notebook-customagent-vscode\notebook-custom-agent-sample-prompt.png" alt-text="Screenshot of showing sample prompts in the Fabric Notebook custom agent in VS Code. "lightbox="media\fabric-notebook-customagent-vscode\notebook-custom-agent-sample-prompt.png":::

1. To save prompts for reuse, under **AGENT PROMPTS - FABRIC DATA ENGINEERING**, expand **Saved Prompts**.

    Use this section to store your frequently used prompts and access them quickly later.



## Related content

- [What is the Fabric Data Engineering VS Code extension?](setup-vs-code-extension.md)
- [Develop, execute, and manage Microsoft Fabric notebooks](author-execute-notebook.md)
- [Create and manage Microsoft Fabric notebooks in Visual Studio Code](author-notebook-with-vs-code.md)
