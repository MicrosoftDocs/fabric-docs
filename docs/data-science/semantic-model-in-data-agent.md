---
title: Add Power BI semantic model as data source to Fabric data agent (preview)
description: Learn best practices about using semantic model as a data source in Fabric data agent.
author: jonburchel
ms.author: jburchel
ms.reviewer: amjafari
reviewer: amhjf
ms.service: fabric
ms.subservice: data-science
ms.topic: how-to #Don't change
ms.date: 10/17/2025
ms.collection: ce-skilling-ai-copilot
#customer intent: As an Analyst, I want to add the semantic model as a data source to Fabric data agent.
---

# Adding a Power BI semantic model as a data source to Fabric data agent (preview)

You can add a semantic model as a data source to the Fabric data agent. Before doing so, it’s recommended to prepare the semantic model using [Prep for AI in Power BI](https://learn.microsoft.com/en-us/power-bi/create-reports/copilot-prepare-data-ai).

Prep for AI helps you shape how the semantic model is interpreted by AI experiences. It lets you define which parts of the model to expose, describe how they should be used, and provide additional context to improve the accuracy of generated responses.

In addition to the configurations done via Prep for AI, the Fabric data agent also benefits from following best practices in the semantic model such as meaningful names and descriptions on tables, columns, and measures. Therefore, elements such as table and column descriptions, synonyms, relationships, and data types are all used by the data agent to better interpret user questions, select relevant fields, and generate accurate responses. You can learn [here](https://learn.microsoft.com/en-us/power-bi/guidance/power-bi-optimization#optimizing-the-data-model) about additional guidance on how to optimize the semantic model.

## Prep for AI Components and Fabric data agent

Prep for AI offers three key configuration components in Power BI:

- **AI Data Schemas**: Define which tables and columns are prioritized for generated DAX queries.
- **Verified Answers**: Predefined, validated responses to common or important questions.
- **AI Instructions**: Contextual guidance to help AI generate relevant and accurate answers.

## How Fabric data agent uses Prep for AI components

- **AI Instructions and Verified Answers**: These components only exist via “Prep for AI” on the semantic model side and are not configurable within the Fabric data agent. However, the Fabric data agent fully honors them when present in the semantic model.

You should use AI Instructions to describe which set of tables and columns should be used to answer which types of questions. This effectively helps you partition the semantic model into logical domains, improving response relevance and reducing ambiguity.

You can also include example DAX queries in the AI Instructions to help determine which queries are most appropriate for different types of questions. To determine which DAX query should be used for each question, you can use the [DAX Query View](https://learn.microsoft.com/en-us/dax/best-practices/dax-user-defined-functions) to test and validate which DAX expressions produce the correct results for different types of questions that users might ask about your semantic model.

In DAX Query View (available in Power BI Desktop), you can write and run DAX queries directly against your semantic model. This lets you:

- Explore how different measures and columns behave.
- Verify that your DAX formulas return the right numbers and structure.

Once you confirm which DAX queries return accurate and meaningful results, you can include those as example DAX queries in the AI Instructions within Prep for AI.

- **AI Data Schemas**: Both Prep for AI and Fabric data agent allow you to select tables, but the behavior depends on how the selections overlap:

| Scenario | Behavior |
|-----------|-----------|
| Table selected in both Fabric data agent and Prep for AI | Only the columns defined in Prep for AI are used. |
| Table selected only in Fabric data agent and not in Prep for AI | All columns in the table are used. |
| There is no Prep for AI configuration | Fabric data agent uses its own table selections and all columns from the selected table will be used. |
| Table selected only in Prep for AI and not selected in Fabric data agent | Fabric data agent ignores the table that is only selected in Prep for AI. |

## Best practices to configure Power BI semantic models as data sources in Fabric data agent

- **Always use Prep for AI first**: Configure AI Data Schemas, AI Instructions, and Verified Answers in the semantic model before adding it to Fabric data agent.
- **Align table selections**: When adding a semantic model, ensure that you select the same tables in Fabric data agent that have also been defined through AI Data Schemas in Prep for AI.
- **Leverage AI Instructions**: Clearly define which tables and columns should be used for specific types of questions. This helps the AI split the model into logical domains and improves response precision.

## Related content

- [Data agent concept](concept-data-agent.md)
- [Data agent end-to-end tutorial](data-agent-end-to-end-tutorial.md)
- [Overview of data agent configurations](data-agent-configurations.md)
- [Adapt an iterative process to developing data agents](../data-science/develop-iterative-process-data-agent.md)


