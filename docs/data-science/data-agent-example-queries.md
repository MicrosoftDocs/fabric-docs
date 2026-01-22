---
title: Data Agent Example Queries
description: Overview of data agent example queries.
ms.author: jburchel
author: jonburchel
ms.reviewer: midesa
reviewer: midesa
ms.topic: concept-article
ms.date: 09/11/2025
---

# Example queries

Example queries (also called “few-shot examples”) give the Data Agent concrete patterns to learn from. They are sample questions and their corresponding query logic that creators supply to guide how the agent should respond. When a user asks a question against a data source, the Data Agent automatically retrieves the most relevant examples—typically the top four—and feeds them into its generation process. By referencing these examples, the agent can better understand the expected structure, filters, and joins, which helps it produce more accurate, consistent, and context-aware query results.

## Provide example queries

When providing example queries, you must include both a natural language question and its corresponding query answer. Each question should be unique to give the Data Agent a diverse set of reference points. Every example query is validated against the schema of the selected data source—queries that don't pass validation aren't sent to the agent. To ensure your examples are actually used, it’s essential to confirm they pass this validation step.

:::image type="content" source="media/how-to-create-data-agent/data-agent-adding-examples-sql.png" alt-text="Screenshot of adding example queries to the data agent." lightbox="media/how-to-create-data-agent/data-agent-adding-examples-sql.png":::

The table below shows which data sources currently support example queries in the Data Agent. These examples help guide the agent’s query generation process by providing patterns and context.

| Data Source Type            | Supports Example Queries? |
|-----------------------------|---------------------------|
| Lakehouse                   | ✅ Yes                   |
| Warehouse                   | ✅ Yes                   |
| Eventhouse KQL Databases     | ✅ Yes                   |
| Semantic Models             | ❌ No                    |
| Ontology                    | ❌ No                    |

You can also use the **run steps** view to debug which example queries were actually retrieved and applied to a user’s question. This is especially useful for confirming that the right examples are being used and for diagnosing why certain results are being generated. If the wrong examples appear, try refining your questions or adding clearer, more targeted examples.  

:::image type="content" source="media/how-to-evaluate-data-agent/example-queries-run-steps.png" alt-text="Screenshot of the referenced example queries in the run steps." lightbox="media/how-to-evaluate-data-agent/example-queries-run-steps.png":::

### Best practices for writing example queries  

When creating example queries for the Data Agent, following best practices ensures they provide clear, reliable guidance during query generation. Well-crafted examples help the agent understand how natural language questions translate into SQL/KQL logic, highlight complex joins or calculations, and improve the accuracy of its results. Use the guidelines below to make your examples more effective and representative of real user scenarios.  

| # | Best Practice | Why It Matters |
|---|---------------|---------------|
| 1 | **Ensure questions clearly map to the query** | The Data Agent uses these examples to learn the pattern between the question and the resulting SQL/KQL. Ambiguity reduces accuracy. |
| 2 | **Include comments in the query to guide the agent** | Comments (e.g., `-- substitute customer_id here`) help the agent understand where to substitute values or apply important logic. |
| 3 | **Highlight join logic or complex patterns** | Use example queries to show how to handle multi-table joins, aggregations, or other advanced logic that’s hard to describe in plain instructions. |
| 4 | **Avoid overlap or contradictions** | Each example should be distinct and non-conflicting to give the agent a clean signal of how to behave. |
| 5 | **Use run steps to debug which examples are passed** | Run steps let you see which examples were retrieved for a given user question — if the wrong ones show up, adjust your questions or add more specific examples. |
| 6 | **Reflect real user behavior** | Add example queries that represent the kinds of questions your users will actually ask to maximize relevance and accuracy. |

## Validate example queries

The Fabric Data Agent SDK provides built-in tools to **evaluate and improve the quality of your example queries**. Using the `evaluate_few_shot_examples` function, you can validate each natural-language/SQL pair to confirm it's clear, correct, and aligned with your data source schema. The SDK runs each example through the Data Agent’s evaluation process, returning a detailed summary of which examples passed and which need refinement. By reviewing the success rate and feedback, you can iteratively adjust your examples—clarifying questions, improving SQL logic, or adding comments—so the Data Agent learns from higher-quality patterns and produces more accurate results for new questions.

```python
# Evaluate few-shot examples using the Data Agent SDK.
# This runs validation on your natural-language/SQL pairs and returns a summary of results.
result = evaluate_few_shot_examples(
    examples,              # The list of few-shot examples you loaded and formatted earlier
    llm_client=llm_client, # The OpenAI/Fabric LLM client you configured
    model_name=model_name, # Model to use for evaluation, e.g., 'gpt-4o'
    batch_size=20,         # Number of examples to evaluate per batch
    use_fabric_llm=True    # Whether to use the Fabric LLM wrapper for evaluation
)

# Print out the overall success rate of your examples.
# This shows how many examples passed validation vs. the total tested.
print(f"Success rate: {result.success_rate:.2f}% ({result.success_count}/{result.total})")

```

After running the validator, you’ll receive a clear breakdown of which examples **passed** and which **failed**. This feedback makes it easy to identify strengths and weaknesses in your few-shot examples.  

- **Success Cases:** Examples where the SQL matched the expected answers. These are strong references you can model future examples after.  
- **Failure Cases:** Examples where the SQL didn’t match the expected answer, or where the question/query pair may be unclear or invalid. These cases should be reviewed and refined.  

```python
# Convert success and failure cases to Pandas DataFrames for easy inspection
success_df = cases_to_dataframe(result.success_cases)
failure_df = cases_to_dataframe(result.failure_cases)

# Display results for analysis
display(success_df)
display(failure_df)
```

Use this feedback to **iterate and improve** your example queries. Regularly strengthening weaker examples will help the Data Agent produce more accurate SQL and answers over time.

:::image type="content" source="media/how-to-evaluate-data-agent/fabric-data-agent-sdk-validator.png" alt-text="Screenshot of example query validator results." lightbox="media/how-to-evaluate-data-agent/fabric-data-agent-sdk-validator.png":::

To explore a full working example, you can check out the sample notebook in the [Fabric Data Agent SDK GitHub repository](https://aka.ms/fabric-data-agent-example-query-validator):

> [!NOTE]
> This evaluation utility is currently available **only for SQL-based example queries**. KQL or other query types aren't yet supported.

## Understand validator scores  

When you run the validator on your example queries, it generates three key scores for each example: **Clarity**, **Relatedness**, and **Mapping**. These scores are derived from how well your natural language questions and SQL queries align with best practices.  

- **Clarity**  
  Measures whether the natural language question is **clear and unambiguous**. Questions should be specific, include necessary metrics, timeframes, and filters, and avoid vague or multi-intent phrasing.  
  *Example – Good:* “Total revenue by region for 2024.”  
  *Example – Needs Improvement:* “Show performance.”  

- **Relatedness**  
  Evaluates how closely the SQL query matches the **intent of the natural language question**. The SQL should return the correct metric, apply the proper filters, and match the requested granularity.  
  *Example – Good:* A question asks for **count of customers in March 2025** → SQL counts customers with `WHERE month='2025-03'`.  
  *Example – Needs Improvement:* A question asks for **count**, but the SQL returns **SUM(revenue)** or filters a different period.  

- **Mapping**  
  Checks whether **all literals in the natural language question appear in the SQL query**. Every number, date, or category mentioned in the question should be explicitly represented in the SQL. This doesn’t judge column names, only the literal values.  
  *Example – Good:* “Orders over 100 in March 2025 for ‘West’” → SQL includes `> 100`, `2025-03`, and `'West'`.  
  *Example – Needs Improvement:* SQL is missing one of those literals (e.g., no month filter).  

An example is considered **high quality** only if **all three scores**—Clarity, Relatedness, and Mapping—are positive. Use these scores to refine your example queries: rewrite unclear questions, align SQL more closely with the question intent, and ensure every literal in the question appears in the SQL query. This iterative process helps the Data Agent learn from better patterns and produce more accurate results.  

## Next steps

- [Data agent concept](concept-data-agent.md)
- [Data agent scenario](data-agent-scenario.md)
- [Sample notebook to validate example queries](https://aka.ms/fabric-data-agent-example-query-validator)
