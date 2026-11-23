---
title: "Privacy, security, and responsible use of Copilot for Real-Time Intelligence"
description: Learn about privacy, security, and responsible use of Copilot for Real-Time Intelligence in Microsoft Fabric.
author: spelluru
ms.author: spelluru
ms.reviewer: mibar
ms.topic: concept-article
ms.date: 10/07/2026
ms.update-cycle: 180-days
no-loc: [Copilot]
ms.collection: ce-skilling-ai-copilot
ai-usage: ai-assisted
---

# Privacy, security, and responsible use of Copilot for Real-Time Intelligence

Copilot for Real-Time Intelligence uses generative AI to help you query, explore, visualize, and present real-time data. This article explains how Copilot uses data, how Microsoft evaluates its features, which limitations to consider, and how to use Copilot responsibly.

## About Copilot for Real-Time Intelligence

Copilot for Real-Time Intelligence is a shared generative AI capability used across Microsoft Fabric Real-Time Intelligence experiences. Depending on the experience and workflow, Copilot can help you create or modify KQL queries, explore data, generate analytical results and visualizations, and create or modify Real-Time Dashboards. For an overview of these topics for Copilot in Fabric, see [Privacy, security, and responsible use for Copilot](copilot-privacy-security.md).

The capabilities available to you depend on the feature, experience, permissions, data source, and release stage.

Copilot for Real-Time Intelligence helps you query, analyze, visualize, and explore real-time data by using natural language.

- Depending on the experience, you can use Copilot to:

- Author or modify KQL queries.
- Ask questions and explore data conversationally.
- Generate tables, visualizations, and natural-language insights.
- Create or modify dashboard tiles.
- Generate an initial Real-Time Dashboard from a description of the intended dashboard.
- Save or share generated analytical results.

Copilot reduces the need for specialized KQL knowledge, but you're responsible for reviewing generated content before using, saving, sharing, or applying it.

## Intended use of Copilot for Real-Time Intelligence

Copilot for Real-Time Intelligence helps authorized users query, explore, visualize, and present real-time or operational data.

Example uses include:

- Generating and refining KQL queries in a KQL queryset.
- Creating or modifying the query and visualization for a dashboard tile.
- Exploring data associated with a dashboard, visual, table, or other supported data context.
- Generating an initial dashboard based on available data and the user's described intent.
- Refining generated results through follow-up questions or instructions.

Copilot is an assistive, human-directed capability. It isn't designed to autonomously make consequential decisions or take actions in external systems.

## What can Copilot for Real-Time Intelligence do?

Copilot uses generative AI models, including GPT-5 in supported experiences, to interpret natural-language instructions together with contextual information supplied by the product experience.

Depending on the feature, this context can include the connected database schema, tables and columns, user-defined functions, data samples, an existing KQL query, dashboard configuration, a selected visual, previous conversation messages, and the user's dashboard description.

Copilot can generate one or more of the following:

- KQL queries and query modifications.
- Tabular query results.
- Visualizations and visual configuration.
- Natural-language insights or summaries.
- Starter and follow-up prompts.
- Dashboard tiles.
- An initial Real-Time Dashboard.

Some experiences execute generated queries to display results, while others present generated KQL for the user to review and run. The product experience indicates which behavior applies.

## How Copilot for Real-Time Intelligence uses data

Copilot processes the user's prompt together with contextual information required for the selected experience. Depending on the feature, this information can include database schema, user-defined functions, data samples, an existing query, dashboard or visual configuration, underlying query results, and previous messages in the current Copilot interaction.

Copilot operates within the user's existing permissions and doesn't grant additional access to data. Users can only use Copilot with data and items that the product experience authorizes them to access.

Customer data, including dashboard data, isn't used to train foundation models. Microsoft Fabric service terms govern prompt processing. Prompts and responses might be retained for abuse monitoring and service protection.

Fabric tenant administrators can control whether Copilot capabilities are enabled. Additional tenant settings might be required when data is processed outside the capacity's geographic region, compliance boundary, or national cloud instance.

## How Microsoft evaluates Copilot for Real-Time Intelligence

Before release, Microsoft evaluates Copilot features based on their specific inputs, outputs, user interactions, and potential risks. Evaluations can include query quality, grounding, harmful content, prompt injection and jailbreak attempts, cross-prompt injection, protected material, and other risks relevant to the feature.

Because Copilot experiences perform different tasks, evaluation methods and datasets can differ between features. For example, a feature that generates KQL is evaluated differently from a feature that generates a dashboard or modifies an existing visualization.

Evaluation results reduce risk but don't guarantee that every generated query, result, visualization, insight, or dashboard is correct. Review generated content and validate important results against the underlying data.

## Limitations of Copilot for Real-Time Intelligence

- Copilot can misunderstand ambiguous, complex, lengthy, or insufficiently detailed instructions.
- Generated KQL can be syntactically valid but fail to represent the user's intended business logic.
- Generated results depend on the quality and clarity of schema metadata, table and column names, dashboard context, data samples, and underlying data.
- Copilot might not understand organizational definitions, business rules, exceptions, or causal relationships that aren't represented in its available context.
- Generated insights, visualizations, tiles, or dashboards can be incomplete, inaccurate, or unsuitable for the intended purpose.
- Similar instructions can result in different valid queries, visualizations, or dashboard designs.
- Generated content can overwrite or conflict with manual changes in experiences that modify an existing item. Review the updated item before keeping the generated changes.
- Prompt-injection attempts can try to redirect model behavior. Testing and mitigations reduce but don't eliminate this risk.
- Feature availability, supported data sources, authoring operations, and administrative requirements vary by Copilot experience.
- Don't use Copilot as the sole basis for consequential or high-impact decisions.

## Tips for working with Copilot for Real-Time Intelligence

- Clearly describe the task and intended result.
- Specify relevant tables, columns, metrics, filters, time periods, operators, or visual types when known.
- Use meaningful table and column descriptions to help Copilot interpret the schema.
- Break complex analytical or authoring tasks into focused requests and use follow-up instructions to refine the result.
- Inspect generated KQL before relying on it.
- Compare generated explanations and visualizations with the query results and underlying data.
- Review generated or modified dashboards before saving or sharing them.
- Don't include passwords, credentials, secrets, or unnecessary personal information in prompts.
- Validate important outputs before using them to support business or operational decisions.
- Use the available feedback controls to report incorrect or inappropriate results.

## Copilot experiences in Real-Time Intelligence

Copilot for Real-Time Intelligence supports multiple experiences, including:

- **KQL query authoring**: Generate and refine KQL in Querysets and supported dashboard editors.
- **Data exploration**: Ask questions about supported dashboard or table data, refine the analysis, and inspect query, table, and visual results.
- **Dashboard tile creation and editing**: Create or modify a dashboard tile through natural-language instructions.
- **Dashboard generation**: Generate an initial Real-Time Dashboard based on selected data and a description of the intended dashboard.

Additional Copilot experiences might be introduced over time. The relevant product documentation describes the capabilities, prerequisites, controls, and limitations of each experience.

## Related content

- [What is Microsoft Fabric?](../fundamentals/microsoft-fabric-overview.md)
- [Copilot in Fabric: FAQ](copilot-faq-fabric.yml)
