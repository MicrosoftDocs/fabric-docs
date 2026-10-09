---
title: Evaluate your data agent
description: Learn how to use the Python data agent SDK to evaluate your data agent.
ms.author: scottpolly
author: s-polly
ms.topic: how-to
ms.date: 09/01/2026
ms.reviewer: midesa
ai-usage: ai-assisted
---

# Evaluate your data agent (preview)

By using the Fabric SDK for evaluation, you can programmatically test how well your data agent responds to natural language questions. By using a simple Python interface, you can define ground truth examples, run evaluations, and analyze results—all within your notebook environment. This process helps you validate accuracy, debug errors, and confidently improve your agent before deploying it to production.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

[!INCLUDE [data-agent-prerequisites](./includes/data-agent-prerequisites.md)]

## Install the data agent SDK

To get started with evaluating your Fabric data agent programmatically, install [the Fabric data agent Python SDK](./fabric-data-agent-sdk.md). This SDK provides the tools and methods required to interact with your data agent, run evaluations, and log results. Install the latest version by running the following command in your notebook:

```python
%pip install -U fabric-data-agent-sdk
```

This step ensures you have the most up-to-date features and fixes available in the SDK.

## Load your ground truth dataset

To evaluate your Fabric data agent, you need a set of sample questions along with the expected answers. Use these questions to verify how accurately the agent responds to real-world queries.

Define these questions directly in your code by using a pandas DataFrame:

```python
import pandas as pd

# Define a sample evaluation set with user questions and their expected answers.
# You can modify the question/answer pairs to match your scenario.
df = pd.DataFrame(
    columns=["question", "expected_answer"],
    data=[
        ["Show total sales for Canadian Dollar for January 2013", "46,117.30"],
        ["What is the product with the highest total sales for Canadian Dollar in 2013", "Mountain-200 Black, 42"],
        ["Total sales outside of the US", "19,968,887.95"],
        ["Which product category had the highest total sales for Canadian Dollar in 2013", "Bikes (Total Sales: 938,654.76)"]
    ]
)

```

Alternatively, if you have an existing evaluation dataset, load it from a CSV file with the columns `question` and `expected_answer`:

```python
# Load questions and expected answers from a CSV file
input_file_path = "/lakehouse/default/Files/Data/Input/curated_2.csv"
df = pd.read_csv(input_file_path)

```

This dataset serves as the input for running automated evaluations against your data agent to assess accuracy and coverage.

## Evaluate and assess your data agent

The next step is to run the evaluation by using the `evaluate_data_agent` function. This function compares the agent's responses against your expected results and stores the evaluation metrics.

> [!NOTE]
> This step requires a data agent that's already published to the stage you evaluate (`production` or `sandbox`). If you don't have one yet, see [Create a Fabric data agent](./how-to-create-data-agent.md).

```python
from fabric.dataagent.evaluation import evaluate_data_agent

# Name of your data agent
data_agent_name = "AgentEvaluation"

# (Optional) Name of the workspace if the data agent is in a different workspace
workspace_name = None

# (Optional) Name of the output table to store evaluation results (default: "evaluation_output")
# Two tables will be created:
# - "<table_name>": contains summary results (e.g., accuracy)
# - "<table_name>_steps": contains detailed reasoning and step-by-step execution
table_name = "demo_evaluation_output"

# Specify the data agent stage: "production" (default) or "sandbox"
data_agent_stage = "production"

# Run the evaluation and get the evaluation ID
try:
    evaluation_id = evaluate_data_agent(
        df,
        data_agent_name,
        workspace_name=workspace_name,
        table_name=table_name,
        data_agent_stage=data_agent_stage
    )
    print(f"Unique ID for the current evaluation run: {evaluation_id}")
except Exception as e:
    print(f"Evaluation failed: {e}")
```

After the run finishes, you see output similar to the following text:

```output
Unique ID for the current evaluation run: <evaluation-id>
```

### Get evaluation summary

After running the evaluation, you can retrieve a high-level summary of the results by using the `get_evaluation_summary` function. This function provides insights into how well your data agent performed overall, including metrics like how many responses matched the expected answers.

```python
from fabric.dataagent.evaluation import get_evaluation_summary

# Retrieve a summary of the evaluation results
summary_df = get_evaluation_summary(table_name)

```

:::image type="content" source="media/how-to-evaluate-data-agent/evaluation-summary.png" alt-text="Screenshot showing summary of the data agent evaluation results." lightbox="media/how-to-evaluate-data-agent/evaluation-summary.png":::

By default, this function looks for a table named `evaluation_output`. If you specified a custom table name during evaluation (like `demo_evaluation_output`), pass that name as the `table_name` argument.

The returned DataFrame includes aggregated metrics such as the number of correct, incorrect, or unclear responses. This result helps you quickly assess the agent's accuracy and identify areas for improvement.

### Inspect detailed evaluation results

To dive deeper into how your data agent responded to each individual question, use the `get_evaluation_details` function. This function returns a detailed breakdown of the evaluation run, including the actual agent responses, whether they matched the expected answer, and a link to the evaluation thread (visible only to the user who ran the evaluation).

```python
from fabric.dataagent.evaluation import get_evaluation_details

# Table name used during evaluation
table_name = "demo_evaluation_output"

# Whether to return all evaluation rows (True) or only failures (False)
get_all_rows = False

# Whether to print a summary of the results
verbose = True

# Retrieve evaluation details for a specific run
eval_details = get_evaluation_details(
    evaluation_id,
    table_name,
    get_all_rows=get_all_rows,
    verbose=verbose
)

```

:::image type="content" source="media/how-to-evaluate-data-agent/evaluation-detail.png" alt-text="Screenshot showing details of a specific data agent evaluation results." lightbox="media/how-to-evaluate-data-agent/evaluation-detail.png":::

## Customize your prompt for evaluation

By default, the Fabric SDK uses a built-in prompt to evaluate whether the data agent's actual answer matches the expected answer. However, you can supply your own prompt for more nuanced or domain-specific evaluations by using the `critic_prompt` parameter.

Your custom prompt should include the placeholders `{query}`, `{expected_answer}`, and `{actual_answer}`. The evaluation process dynamically substitutes these placeholders for each question.

```python
from fabric.dataagent.evaluation import evaluate_data_agent

# Define a custom prompt for evaluating agent responses
critic_prompt = """
    Given the following query, expected answer, and actual answer, please determine if the actual answer is equivalent to expected answer. If they are equivalent, respond with 'yes'.

    Query: {query}

    Expected Answer:
    {expected_answer}

    Actual Answer:
    {actual_answer}

    Is the actual answer equivalent to the expected answer?
"""

# Name of the data agent
data_agent_name = "AgentEvaluation"

# Run evaluation using the custom critic prompt
evaluation_id = evaluate_data_agent(df, data_agent_name, critic_prompt=critic_prompt)

```

This feature is especially useful when:
  
- You want to apply more lenient or stricter criteria for what counts as a match.
- Your expected and actual answers might vary in format but still be semantically equivalent.
- You need to capture domain-specific nuances in how answers should be judged.

## Diagnostics button

The **Diagnostics** button lets you download a full snapshot of your data agent's configuration and execution steps. This export includes details such as data source settings, applied instructions, example queries used, and the underlying steps the data agent took to generate its response.

Use this feature when you work with Microsoft Support or troubleshoot unexpected behavior. By reviewing the downloaded file, you can see exactly how the data agent processed your request, which configurations were applied, and where potential issues occurred. This level of transparency makes it easier to debug and optimize your data agent's performance.

:::image type="content" source="media/how-to-create-data-agent/data-agent-diagnostics.png" alt-text="Screenshot of diagnostics button in the data agent." lightbox="media/how-to-create-data-agent/data-agent-diagnostics.png":::

## Troubleshooting

| Issue | Cause | Resolution |
|-------|-------|------------|
| Data agent not found | The `data_agent_name` or `workspace_name` is incorrect, or the agent isn't published. | Verify the agent name and workspace, and make sure the agent is published to the specified `data_agent_stage`. |
| Empty or missing results | The table name doesn't match the one used during `evaluate_data_agent`. | Pass the same `table_name` to `get_evaluation_summary` and `get_evaluation_details`. |
| `message_url` isn't accessible | Evaluation threads are visible only to the user who ran the evaluation. | Rerun the evaluation under your own identity to access the thread links. |
| Custom prompt has no effect or errors | The `critic_prompt` is missing required placeholders. | Include `{query}`, `{expected_answer}`, and `{actual_answer}` in your prompt. |
| Permission or capacity error | Missing F2 or higher capacity, or missing read access to the data source. | Confirm the prerequisites, including capacity and data source read access. |


## Next steps

- [Create a Fabric data agent](./how-to-create-data-agent.md)
- [Use the Fabric data agent SDK](./fabric-data-agent-sdk.md)
- [Access sample notebooks on how to use the data agent SDK](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/data-science/data-agent-sdk)
