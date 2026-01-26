---
title: Adopting an iterative process for improving your data agent
description: Learn how to adopt an iterative process for improving your data agent.
ms.author: jburchel
author: jonburchel
ms.reviewer: midesa
reviewer: midesa
ms.topic: best-practice
ms.date: 06/12/2025
---

# Adopt an iterative process to improve your data agent

Tuning a data agent is not a one-time setup—it’s an ongoing, iterative process that involves experimentation, observation, and refinement.

This article outlines best practices to help you get started with improving your data agent, but it’s important to recognize that every data environment and use case is unique. You may find that certain types of instructions, examples, or formatting work better for your specific datasets, or that additional context is needed to help the agent interpret user questions more accurately. As you evaluate responses, expect to go through cycles of trial and error—revising agent instructions, expanding your benchmark set, or adjusting example queries to resolve confusion or improve accuracy. Over time, this process will help uncover gaps in logic, schema alignment, or query phrasing that may not be immediately obvious. The key is to treat the data agent as an evolving system that improves through regular testing, feedback, and iteration—not a static configuration set once and forgotten.

## Step 1: Start with a benchmark set

Begin with an initial benchmark of examples to guide your agent configuration and evaluate performance. Use the following format:

| Question                                 | Expected Query                          | Expected Answer                |
|------------------------------------------|------------------------------------------|--------------------------------|
| How many employees work in the HR team? | SELECT COUNT(*) FROM EmployeeDim WHERE DepartmentName = 'HR' | 25                             |
| What is the average salary in Marketing? | SELECT AVG(Salary) FROM EmployeeCompensation WHERE Department = 'Marketing' | $85,000                         |
| Which products had sales last month?     | SELECT ProductName FROM Sales WHERE SaleDate >= '2024-05-01' | [Product A, Product B]         |

You can learn more about evaluating your agent in the article: [How to evaluate your data agent](../data-science/evaluate-data-agent.md)

You can continue expanding your benchmark set over time to increase coverage of the types of user questions you expect the agent to handle.

## Step 2: Diagnose incorrect responses

When your data agent returns an incorrect or suboptimal result, take time to analyze the cause. Identifying the right point of failure will help you make targeted improvements to instructions, examples, or query logic.

Ask the following questions as part of your review:

- Is a necessary explanation or instruction missing?
- Are the instructions too vague, unclear, or misleading?
- Is the example query inaccurate or not representative of the user question?
- Is the user question ambiguous given the structure or naming in the schema?
- Are values inconsistently formatted (e.g., `"ca"` vs. `"CA"` vs. `"Ca"`), making it harder for the agent to apply filters correctly?

Each of these issues can impact the agent’s ability to interpret intent and generate accurate queries. Identifying them early helps guide more effective refinements in later steps.

## Step 3: Guide better reasoning with clearer agent instructions

If the agent consistently chooses the wrong data sources, misinterprets user intent, or returns poorly formatted answers, it's a sign that your [agent-level instructions](../data-science/data-agent-configurations.md#data-agent-instructions) need refinement. Use these instructions to guide how the agent reasons through questions, selects data sources, and formats its responses.

When iterating on agent instructions:

- **Clarify data source usage:** Specify which data sources to use for particular types of questions and in what order of priority. If certain sources should only be used in specific contexts, make that clear.
- **Define expected response behavior:** Set expectations for tone, structure, and level of detail. Indicate whether responses should be concise summaries, include tabular output, or provide row-level details.
- **Guide the agent’s reasoning steps:** Provide a logical framework the agent should follow when interpreting a question—such as rephrasing it, identifying relevant terms, or selecting tools based on topic.
- **Explain terminology:** Include definitions or mappings for ambiguous, business-specific, or commonly misunderstood terms so the agent can more accurately interpret user questions.

Improving these instructions over time helps the agent make better decisions at every step—from question interpretation to query execution and final response formatting.

## Step 4: Improve schema understanding through better data source instruction

Use insights from failure analysis to continuously improve your [data source instructions](../data-science/data-agent-configurations.md#data-source-instructions). Look for patterns across multiple incorrect responses to identify where the agent may be misinterpreting intent, struggling with schema understanding, or failing to apply correct query logic.

Update your configuration by focusing on the following areas:

- **Clarify filter usage:** Explicitly describe when and how filters should be applied within your instructions. For example, specify whether filters should use exact matches, ranges, or pattern matching.
- **Add typical value examples:** Help the agent understand how to filter correctly by providing sample values and expected formats (e.g., `"CA"`, `"MA"`, `"NY"` for state abbreviations, or `"Q1 FY25"` for fiscal quarters).
- **Reinforce consistency:** Ensure terminology, formatting, and phrasing are applied consistently across instructions and examples. Avoid mixing abbreviations, casing, or alternate labels for the same concept.
- **Update based on evolving schema or business rules:** If new tables, columns, or logic are introduced in your data sources, adjust your instructions and examples to reflect those changes.

Iterating on these details ensures the agent stays aligned with your evolving data and business context—and results in more accurate, reliable responses over time.

## Step 5: Use targeted examples to guide accurate query generation

Example queries play a critical role in helping the agent generalize and generate accurate responses—especially for questions involving joins, filtering, and complex logic. If the data agent returns incorrect queries, revisit and refine your examples to better illustrate the expected structure and logic.

Focus on the following improvements:

- **Clarify join logic:** If the agent is generating incorrect joins, include example queries that explicitly demonstrate how related tables should be joined (e.g., join keys, join type).
- **Correct filter patterns:** Show how filters should be applied for specific columns, including any formatting details (e.g., `LIKE '%keyword%'`, date ranges, or casing requirements).
- **Specify expected output:** Make it clear which columns the agent should return for different types of questions. This helps guide both the structure and focus of the generated query.
- **Refine vague or overloaded examples:** Break apart generic or overly broad examples into more targeted queries that reflect specific user intents.
- **Ensure alignment with current instructions and schema:** Keep examples up to date with any recent changes to the schema, business rules, or instruction formats.

By improving and expanding your example queries based on observed issues, you give the agent stronger reference points to generate accurate and context-aware responses.

## Step 6: Address join issues

Join logic is a common source of failure in query generation. When the data agent returns incorrect or incomplete results due to join errors, you’ll need to provide clearer structural guidance and examples to help the agent understand how your data is related.

To improve join accuracy:

- **Document join relationships clearly:** Specify which tables are related, the keys used for joining (e.g., `EmployeeID`, `ProductKey`), and the direction of the relationship (e.g., one-to-many). Include this guidance in the relevant data source instructions.
- **Include join examples in queries:** Add example queries that explicitly demonstrate correct join behavior for the most common or complex relationships.
- **Clarify required columns across joined tables:** Indicate which fields should be retrieved from which table, especially when similar column names exist across multiple sources.
- **Simplify when necessary:** If the required joins are too complex or error-prone, consider flattening the structure into a single denormalized table to reduce ambiguity and improve reliability.

Properly defining join logic—both in instructions and examples—helps the agent understand how to navigate your data structure and return complete, accurate answers.

## Next steps

- [Data agent concept](concept-data-agent.md)
- [Data agent scenario](data-agent-scenario.md)
- [Overview of data agent configurations](data-agent-configurations.md)