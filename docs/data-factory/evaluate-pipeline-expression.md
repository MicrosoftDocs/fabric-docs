---
title: Evaluate Pipeline Expression
description: This article provides information about debugging Pipeline Expressions through the Evaluate Expression feature in Microsoft Fabric Data Factory.
ms.reviewer: conxu
ms.topic: how-to
ms.custom: pipelines
ms.date: 08/26/2025
ai-usage: ai-assisted
---

# Evaluate your pipeline expressions before you run them

This article shows you how to use the Evaluate expression feature in Microsoft Fabric Data Factory to test and debug your pipeline expressions. You'll learn how to check expression outputs, review individual components, and validate your logic without running the entire pipeline.

Here's what you can do with the evaluate expression feature:

- Check the final output
- Review each part of your expression (parameters, variables, functions, system variables)
- Enter sample values for items that only exist when the pipeline runs

This way, you can confirm your logic and formatting work correctly before you schedule or run your pipeline.

:::image type="content" source="media/evaluate-pipeline-expression/evaluate-dynamic-content.png" alt-text="Screenshot of the Evaluate expression feature showing dynamic content evaluation." lightbox="media/evaluate-pipeline-expression/evaluate-dynamic-content.png":::

## When to use the Evaluate expression feature

Here are some ways the Evaluate expression feature can help you:

- Confirm the final string or value your expression returns (like a dated folder path or formatted file name)
- Check that parameters and variables work correctly in your expression
- Test function combinations (string, date/time, math) and see results immediately
- Provide sample inputs for items that only exist during an actual pipeline run (like trigger values or activity outputs)

## How to use the Evaluate expression feature

1. Open the **expression builder** in your pipeline.

   :::image type="content" source="media/evaluate-pipeline-expression/view-in-expression-builder.png" alt-text="Screenshot of an Outlook activity with an option to view in expression builder.":::

1. Type or paste your expression.

   :::image type="content" source="media/evaluate-pipeline-expression/pipeline-expression-builder.png" alt-text="Screenshot of the pipeline expression builder with expression content.":::

1. Select **Evaluate expression**.

   :::image type="content" source="media/evaluate-pipeline-expression/evaluate-expression.png" alt-text="Screenshot of the Evaluate expression button inside the Pipeline expression builder.":::

1. Review the **Value** section in the table that shows each part of your expression (parameters, variables, system variables, functions).

   :::image type="content" source="media/evaluate-pipeline-expression/value.png" alt-text="Screenshot of the evaluate dynamic content value input field.":::

1. If any part needs a sample value (like a trigger time or an activity's output), type it in the **Value** field.

1. Select **Evaluate** again to see the updated result.

   :::image type="content" source="media/evaluate-pipeline-expression/evaluate-preview-content.png" alt-text="Screenshot of the evaluate dynamic content and previewing the expression.":::

   >[!TIP]
   > The panel often fills in defaults for parameters and variables. You can overwrite them to test different scenarios.

## Current limitations

Currently, evaluation happens before the pipeline runs. The evaluator doesn't know anything that occurs at runtime or afterward. It doesn't pull a run ID, trigger instance ID, activity outputs, or any values that only exist during a run. So, you’ll have to manually provide these values.

**What to do instead:** In the **Value** column, type sample values to mirror the data you expect at runtime (like paste a mock JSON for `activity('LookupCustomers').output`). This lets you validate your expression's structure and formatting even though the pipeline isn't running.

## Related content

- [Expressions and functions](expression-language.md)
- [How to monitor pipeline runs](monitor-pipeline-runs.md)
