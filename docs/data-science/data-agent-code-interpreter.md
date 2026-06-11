---
title: Enable the code interpreter tool (preview) for your data agent
description: Learn how to add the code interpreter tool to your Fabric data agent so it can run Python to analyze data, perform calculations, and generate visualizations.
ms.author: midesa
author: midesa
ms.reviewer: jonburchel
ms.topic: how-to
ms.date: 05/26/2026
ai-usage: ai-assisted
---

# Enable the code interpreter tool (preview) for your data agent

The code interpreter tool gives your data agent a secure, sandboxed Python environment for analyzing the data it retrieves. With the tool enabled, your data agent can go beyond querying your data sources and answer natural language questions that require data analysis, mathematical computations, or visualizations. For example, you can ask your data agent to  chart trends over time, detect correlations across columns, or combine results from multiple sources. The agent generates and runs the Python code on your behalf, and you can review the generated code, outputs, and Python visualizations directly in the run steps.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

[!INCLUDE [data-agent-prerequisites](./includes/data-agent-prerequisites.md)]

## Add the code interpreter tool

To add the code interpreter tool to your data agent:

1. Open your data agent.
1. Select the **Tools** tab.

   :::image type="content" source="media/data-agent-code-interpreter/add-tool-code-interpreter.png" alt-text="Screenshot of the Tools tab in the data agent with the option to add the code interpreter tool." lightbox="media/data-agent-code-interpreter/add-tool-code-interpreter.png":::

1. Select **Add code interpreter**.
1. In the confirmation dialog, select **Confirm**.

   :::image type="content" source="media/data-agent-code-interpreter/data-agent-code-interpreter-confirmation.png" alt-text="Screenshot of the confirmation dialog for adding the code interpreter tool to the data agent." lightbox="media/data-agent-code-interpreter/data-agent-code-interpreter-confirmation.png":::

The code interpreter tool is now added to your data agent and ready to use.

## Ask questions

After you add the code interpreter tool, you can ask your data agent questions in natural language. The agent queries your connected data sources, passes the results to the code interpreter, and uses Python to analyze the data, run calculations, or generate visualizations. You don't need to write any code yourself.

Try questions like:

- Generate a heatmap of claim frequency by region and cause of loss over the past five years.
- Create a pairwise plot of customer tenure, monthly spend, and churn risk to explore correlations.
- Is supplier `reliability_score` correlated with actual on-time delivery rate?
- Build a correlation heatmap across all supplier performance metrics—contracted `reliability_score`, contracted `lead_time_days`, actual on-time delivery percentage, defect rate, actual lead time, units delivered, and total cost. Show me which metrics move together and which are independent.
- Forecast next quarter's revenue based on the past three years of sales data.

## Inspect the results

After your data agent answers a question, you can use the run steps to see exactly how the code interpreter produced the result. Expand the code interpreter step to view the Python code the agent generated, the inputs it ran against, and the output it returned. The run steps make it easy to validate the analysis, or troubleshoot unexpected results.

:::image type="content" source="media/data-agent-code-interpreter/code-interpreter-step.png" alt-text="Screenshot of a code interpreter run step showing the generated Python code and output." lightbox="media/data-agent-code-interpreter/code-interpreter-step.png":::

## Use agent instructions

You can't add instructions directly to the code interpreter tool, but you can use agent-level instructions to shape how and when your data agent calls it. For example, you can guide the agent on when to prefer the code interpreter over another tool, what context to include in the request, or how to format the final result. For more information, see [Configure your data agent](data-agent-configurations.md).

## Next steps

- [Data agent concept](concept-data-agent.md)
- [Data agent configurations](data-agent-configurations.md)
