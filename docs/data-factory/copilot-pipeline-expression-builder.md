---
title: Build Pipeline Expressions with Copilot
description: Discover how to generate and explain pipeline expressions using Copilot's intuitive chat interface. Boost productivity and simplify complex workflows.
ms.reviewer: conxu
ms.date: 11/04/2025
ai-usage: ai-assisted
ms.topic: concept-article
ms.collection: ce-skilling-ai-copilot
---

# Build pipeline expressions with Copilot (Preview)

> [!NOTE]
> Currently, this feature is in [preview](/fabric/fundamentals/preview).

The pipeline expression builder now comes with Copilot built in! You can chat with Copilot directly in the expression builder, similar to how you interact with it in other Data Factory features. This means you can get help creating and understanding expressions without leaving your workspace.

Currently, Copilot helps you:

- Write pipeline expressions without manual coding
- Avoid errors
- Work faster
- Build robust pipelines with confidence

To open the pipeline expression builder:

1. Add an activity that supports dynamic content or expressions.
1. Inside the activity, select **View in expression builder** or **Add dynamic content** where you want to add your expression.

    :::image type="content" source="media/copilot-pipeline-expression-builder/view-in-expression-builder.png" alt-text="Screenshot of the view in expression builder option." lightbox="media/copilot-pipeline-expression-builder/view-in-expression-builder.png":::

    :::image type="content" source="media/copilot-pipeline-expression-builder/add-dynamic-content.png" alt-text="Screenshot of the add dynamic content option." lightbox="media/copilot-pipeline-expression-builder/add-dynamic-content.png":::

1. You see to the pipeline expression builder, where you'll find the in line Copilot experience.

    :::image type="content" source="media/copilot-pipeline-expression-builder/pipeline-expression-copilot.png" alt-text="Screenshot of the pipeline expression builder with Copilot experience." lightbox="media/copilot-pipeline-expression-builder/pipeline-expression-copilot.png":::

To learn more about expressions, see [Expressions and functions](/fabric/data-factory/expression-language).

## Generate expressions with natural language

Type what you want in the Copilot chat. Copilot turns your request into a pipeline expression.

For example, you might enter:

```Get the current date and time in UTC. Convert the current UTC time to Central Standard Time (CST). Format the converted CST time into a string like 2025/07/10. Finally, concatenate the string "ContosoSales\\" with the formatted date.```

You can choose to either **Accept**, **Discard**, or **Refresh** to retry your expression.

## Explain expressions in plain language

Copilot gives you clear explanations of what your pipeline expressions do.

You can select **Explain this expression** or ask Copilot in the chat to explain it.

Here's an example summary Copilot might provide:

:::image type="content" source="media/copilot-pipeline-expression-builder/example-expression-explanation.png" alt-text="Screenshot of an example summary provided by Copilot." lightbox="media/copilot-pipeline-expression-builder/example-expression-explanation.png":::

## Related content

- [Expressions and functions](/fabric/data-factory/expression-language)
- [Evaluate pipeline expressions](/fabric/data-factory/evaluate-pipeline-expression)
- [Copilot in Fabric in the Data Factory workload](copilot-fabric-data-factory.md)
- [Get started with Copilot in Data Factory](copilot-fabric-data-factory-get-started.md)
