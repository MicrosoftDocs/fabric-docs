---
title: SQL sources in Fabric data agent
description: Learn how Fabric data agent translates natural-language questions into T-SQL against Lakehouse, Data Warehouse, SQL Database, and Mirrored Database sources, and compare the standard NL2SQL tool with the preview Advanced NL2SQL tool.
ms.author: midesa
author: midesa
ms.reviewer: jonburchel
ms.topic: concept-article
ms.date: 06/03/2026
---

# SQL sources in Fabric data agent

Fabric data agent lets users ask plain-language questions over SQL data in OneLake — Lakehouse, Data Warehouse, Fabric SQL Database, and Mirrored Databases — and get back governed, read-only answers. Behind the scenes, the agent uses a built-in natural-language-to-SQL tool to translate each question into a T-SQL query, validate it against the schema you selected, and execute it through the source's SQL analytics endpoint.

This article describes the two query-generation tools the agent can use for SQL sources:

- **NL2SQL** — the generally available (GA) tool, used by data agents on the [standard runtime](data-agent-runtime.md#standard-runtime).
- **Advanced NL2SQL** — a preview tool with multi-step reasoning, used by data agents on the [preview runtime](data-agent-runtime.md#preview-runtime).

Both tools draw on the same configuration you provide for each SQL source — schema selection, data source instructions, and example queries. For details on configuring those inputs, see [Add and configure data sources in Fabric data agent](data-agent-add-datasources.md).

## NL2SQL

NL2SQL is the default query-generation tool for SQL sources and is the tool used by data agents on the standard runtime. It generates a T-SQL query in a single pass:

1. It reads the selected schema and the data source instructions you provided.
2. It retrieves the top example queries that are most similar to the user's question, using vector similarity over your example query library.
3. It generates a SQL query grounded in that context, validates it against the approved schema, and executes it through the SQL analytics endpoint.

NL2SQL is optimized for stable, predictable behavior and is the recommended choice for production data agents where consistent output between releases is important. For details on the schema selection, data source instructions, and example queries that feed NL2SQL, see [Add and configure data sources in Fabric data agent](data-agent-add-datasources.md).

## Advanced NL2SQL (preview)

Advanced NL2SQL is a new version of the NL2SQL tool, available on the preview runtime. It's the same tool — natural-language-to SQL over your SQL sources — with one key difference: instead of generating the query in a single pass, it can plan and execute several reasoning steps before returning a query. For example, it can inspect the schema, pick relevant examples, resolve ambiguous filter values, or ask a clarifying question before committing to a query.

:::image type="content" source="media/data-agent-runtime/data-agent-advanced-sql.gif" alt-text="Animated illustration of Advanced NL2SQL planning and executing several reasoning steps in a Fabric data agent before returning a T-SQL query." lightbox="media/data-agent-runtime/data-agent-advanced-sql.gif":::

This multi-step reasoning produces better results in scenarios where NL2SQL has historically struggled:

- **Following example queries more consistently.** NL2SQL doesn't always follow your example queries closely, and sometimes adds logic or constraints that weren't in the examples. Advanced NL2SQL adheres more closely to the patterns demonstrated in your example query library.
- **Substituting filter values correctly.** When a question implies multiple categorical or boolean filters rather than stating them explicitly, NL2SQL may miss or misapply some of them. Advanced NL2SQL reasons through the implied filters and substitutes the right values into the query.
- **Handling ambiguous questions.** When a question is ambiguous, NL2SQL tends to commit to an assumption and generate a query anyway. Advanced NL2SQL can detect the ambiguity and ask the user a clarifying question before generating SQL, reducing incorrect answers caused by misread intent.

Advanced NL2SQL uses the same data source configuration as NL2SQL — schema selection, data source instructions, and example queries — so you don't need to reconfigure your sources to try it.

### Use Advanced NL2SQL

Advanced NL2SQL is part of the preview runtime. To use it, switch your data agent to the preview runtime. See [Fabric data agent runtime](data-agent-runtime.md) for how to switch runtimes and what else changes when you do.

Because Advanced NL2SQL is in preview, its behavior can change between releases. Use it to evaluate upcoming improvements and to give feedback before they graduate to GA; for production data agents that need consistent output, stay on the standard runtime with NL2SQL.

## Related content

- [Add and configure data sources in Fabric data agent](data-agent-add-datasources.md)
- [Fabric data agent runtime](data-agent-runtime.md)
- [Fabric data agent concepts](concept-data-agent.md)
- [Example queries for Fabric data agent](data-agent-example-queries.md)
