---
title: Best practices for improving data agent query generation
description: Learn how to help a Fabric data agent understand your data and generate more accurate queries.
ms.author: scottpolly
author: s-polly
ms.reviewer: midesa
ms.topic: how-to
ms.date: 08/21/2026
---

# Best practices for improving data agent query generation

A data agent generates better queries when it has focused, accurate context about the data it can use. Object names and schema metadata provide a starting point, but they might not explain business meaning, expected values, relationships, or the query logic required to answer a question.

Use the configuration that best matches the context you need to provide:

| Goal | Configuration |
|---|---|
| Limit which data the agent can query | Schema selection |
| Explain what an individual table, column, or other schema element means | Schema object descriptions |
| Define business rules, relationships, and guidance that apply across objects | Data source instructions |
| Demonstrate the query pattern for a question | Example queries |

For an overview of these settings, see [Data agent configurations](data-agent-configurations.md).

## Use clear schema names

Use descriptive names for data sources, tables, and columns when you control the schema. Names such as `CustomerOrders`, `order_submission_date`, and `product_unit_price` give the agent more useful signals than names such as `Table1`, `date1`, and `value`.

Don't rely on naming alone. Even a clear technical name might not communicate the object's business meaning, level of detail, units, or valid values. Use descriptions and data source instructions to provide that context.

## Limit the selected schema

Select only the tables, columns, views, and functions needed for the questions that the data agent should answer. Irrelevant objects increase ambiguity and give the query-generation tool more possible paths to consider.

For example, if users ask about current customer orders, don't include archived staging tables or unrelated finance tables. When two selected objects contain similar data, explain which one is authoritative and when to use each one.

## Describe schema objects (Preview)

For large or ambiguous SQL schemas, use [schema object descriptions](data-agent-schema-object-descriptions.md) to explain what individual tables, columns, and other schema elements represent. Schema object descriptions are available only when the data agent uses the [preview runtime](data-agent-runtime.md#preview-runtime).

Descriptions are useful when:

- Object names are abbreviated, generic, or similar to one another.
- A table's grain or business purpose isn't evident from its name.
- A column contains codes, flags, units, or category values that require interpretation.
- A date column represents a specific business event, such as order submission rather than fulfillment.
- The schema is too large to explain every object clearly in data source instructions.

Describe both meaning and expected values when that information affects query generation. For example:

| Schema object | Effective description |
|---|---|
| `AdoptionEvents` | Contains one row for each completed pet adoption. Use `AdoptionDate` for the completion date. |
| `StatusCode` | Adoption lifecycle status. Expected values are `AP` (approved), `PD` (pending), and `CN` (canceled). |
| `Weight` | Current animal weight in kilograms. Null means that no measurement is available. |

Prioritize descriptions for objects that are difficult to infer. Avoid repeating an obvious name without adding business context.

## Use data source instructions for rules across objects

[Data source instructions](data-agent-configurations.md#data-source-instructions) provide query-generation guidance for a specific data source. Use them for context that spans multiple schema objects or defines how a query should be constructed, including:

- Authoritative tables for a subject.
- Join keys and required join paths.
- Table grain and deduplication rules.
- Default filters, such as using only current or active records.
- Date logic, fiscal calendars, and time-zone assumptions.
- Required calculations or output columns.

Write direct instructions that state what the agent should do. For example, use "Join `EmployeeStatusFact` to `EmployeeDim` on `EmployeeID`" instead of "Avoid joining employee tables incorrectly."

Keep instructions focused. Put object-specific definitions in schema object descriptions instead of using limited instruction space as a glossary for every table and column.

## Define business terms and expected values

Define terminology that users might include in their questions but that doesn't map directly to the schema. Examples include acronyms such as "MAU," organization-specific meanings of "active customer," and distinctions such as fiscal year versus calendar year.

Also document values that the agent needs to construct filters correctly:

- Whether a state column uses `"CA"` or `"California"`.
- Whether a Boolean value is stored as `1` and `0`, `Y` and `N`, or text.
- Whether currency values are stored in dollars or cents.
- Which status values represent completed, canceled, or active records.
- Whether null, zero, or a sentinel date has a special meaning.

Place a definition in the schema object description when it applies to one object. Place it in data source instructions when it applies across the data source or affects multi-object query logic.

## Explain relationships and table grain

Accurate joins depend on more than matching column names. Identify the grain of important tables, valid relationship paths, and keys that aren't obvious from metadata.

For example, explain whether a sales table contains one row per order, order line, or daily product total. If joining two fact tables would duplicate rows, instruct the agent to aggregate each table before joining or to use the appropriate dimension table.

Include relationship guidance such as:

```md
- Join `OrderItems` to `Orders` on `OrderID`.
- Join `Orders` to `Customers` on `CustomerID`.
- Aggregate `OrderItems` to one row per `OrderID` before joining to order-level payment totals.
```

## Use example queries for complex logic

Use [example queries](data-agent-example-queries.md) when showing the query is clearer than describing the logic in prose. A good example pairs a representative natural-language question with a valid query that demonstrates the expected pattern.

Prioritize examples that demonstrate:

- Multi-table joins or required preaggregation.
- Business-specific calculations.
- Relative dates, fiscal periods, or snapshot logic.
- Filters that map user terminology to stored values.
- Ranking, window functions, or other complex query patterns.

Keep each example focused on one reusable pattern. Avoid overlapping or contradictory examples, and verify that every example still matches the current schema.

## Test and refine the context

Test representative questions, inspect the generated query, and identify what context was missing or misunderstood. Update the configuration closest to the problem:

- Remove irrelevant objects or add missing ones in schema selection.
- Clarify the meaning or expected values of one object in its schema description.
- Add cross-object business or join logic to data source instructions.
- Add an example query when the agent needs to learn a specific query pattern.

Repeat this process as the schema and user questions evolve. For a structured testing workflow, see [Develop a data agent by using an iterative process](develop-iterative-process-data-agent.md).

## Next steps

- [Data agent configurations](data-agent-configurations.md)
- [Add schema object descriptions to a data agent](data-agent-schema-object-descriptions.md)
- [Fabric data agent runtime](data-agent-runtime.md)
- [Example queries](data-agent-example-queries.md)
- [Add and configure data sources](data-agent-add-datasources.md)