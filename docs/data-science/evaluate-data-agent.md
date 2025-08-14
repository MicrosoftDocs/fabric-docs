---
title: Evaluate your data agent
description: Learn how to use the Python data agent SDK to evaluate your data agent.
ms.author: jburchel
author: jonburchel
ms.topic: how-to
ms.custom: 
ms.date: 05/06/2025
reviewer: midesa
ms.reviewer: midesa
---

# Evaluate your data agent (preview)

Evaluation with the Fabric SDK allows you to programmatically test how well your Data Agent responds to natural language questions. Using a simple Python interface, you can define ground truth examples, run evaluations, and analyze results—all within your notebook environment. This helps you validate accuracy, debug errors, and confidently improve your agent before deploying it to production.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

[!INCLUDE [data-agent-prerequisites](./includes/data-agent-prerequisites.md)]

## Install the data agent SDK

To get started with evaluating your Fabric Data Agent programmatically, you need to install [the Fabric Data Agent Python SDK](./fabric-data-agent-sdk.md). This SDK provides the tools and methods required to interact with your data agent, run evaluations, and log results. Install the latest version by running the following command in your notebook:

```python
%pip install -U fabric-data-agent-sdk
```

This step ensures you have the most up-to-date features and fixes available in the SDK.

## Load your ground truth dataset

To evaluate your Fabric Data Agent, you need a set of sample questions along with the expected answers. These questions are used to verify how accurately the agent responds to real-world queries.

You can define these questions directly in your code using a pandas DataFrame:

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

Alternatively, if you have an existing evaluation dataset, you can load it from a CSV file with the columns question and expected_answer:

```python
# Load questions and expected answers from a CSV file
input_file_path = "/lakehouse/default/Files/Data/Input/curated_2.csv"
df = pd.read_csv(input_file_path)

```

This dataset serves as the input for running automated evaluations against your data agent to assess accuracy and coverage.

## Evaluate and assess your data agent

The next step is to run the evaluation using the ```evaluate_data_agent``` function. This function compares the agent’s responses against your expected results and stores the evaluation metrics.

```python
from fabric.dataagent.evaluation import evaluate_data_agent

# Name of your Data Agent
data_agent_name = "AgentEvaluation"

# (Optional) Name of the workspace if the Data Agent is in a different workspace
workspace_name = None

# (Optional) Name of the output table to store evaluation results (default: "evaluation_output")
# Two tables will be created:
# - "<table_name>": contains summary results (e.g., accuracy)
# - "<table_name>_steps": contains detailed reasoning and step-by-step execution
table_name = "demo_evaluation_output"

# Specify the Data Agent stage: "production" (default) or "sandbox"
data_agent_stage = "production"

# Run the evaluation and get the evaluation ID
evaluation_id = evaluate_data_agent(
    df,
    data_agent_name,
    workspace_name=workspace_name,
    table_name=table_name,
    data_agent_stage=data_agent_stage
)

print(f"Unique ID for the current evaluation run: {evaluation_id}")

```

### Get evaluation summary

After running the evaluation, you can retrieve a high-level summary of the results using the ```get_evaluation_summary``` function. This function provides insights into how well your Data Agent performed overall — including metrics like how many responses matched the expected answers.

```python
from fabric.dataagent.evaluation import get_evaluation_summary

# Retrieve a summary of the evaluation results
df = get_evaluation_summary(table_name)

```

:::image type="content" source="media/how-to-evaluate-data-agent/evaluation-summary.png" alt-text="Screenshot showing summary of the data agent evaluation results." lightbox="media/how-to-evaluate-data-agent/evaluation-summary.png":::

By default, this function looks for a table named evaluation_output. If you specified a custom table name during evaluation (like "```demo_evaluation_output```"), pass that name as the ```table_name``` argument.

The returned DataFrame includes aggregated metrics such as the number of correct, incorrect, or unclear responses. This result helps you quickly assess the agent’s accuracy and identify areas for improvement.

#### get_evaluation_summary

Returns a DataFrame containing high-level summary metrics for a completed evaluation run, such as the number of correct, incorrect, and unclear responses.

```python
get_evaluation_summary(table_name='evaluation_output', verbose=False)

```

**Input parameters:**

- ```table_name``` *(str, optional)* – The name of the table containing the evaluation summary results. Defaults to '```evaluation_output```'.
- ```verbose``` *(bool, optional)* – If set to ```True```, prints a summary of evaluation metrics to the console.  Defaults to ```False```.

**Returns:**

- ```DataFrame``` – A pandas DataFrame containing summary statistics for the evaluation, such as:
  - Total number of evaluated questions
  - Counts of true, false, and unclear results
  - Accuracy

### Inspect detailed evaluation results

To dive deeper into how your Data Agent responded to each individual question, use the ``get_evaluation_details`` function. This function returns a detailed breakdown of the evaluation run, including the actual agent responses, whether they matched the expected answer, and a link to the evaluation thread (visible only to the user who ran the evaluation).

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

#### get_evaluation_details

Returns a DataFrame containing detailed results for a specific evaluation run, including questions, expected answers, agent responses, evaluation status, and diagnostic metadata.

**Input parameters:**

- ```evaluation_id```*(str)* – Required. The unique identifier for the evaluation run to retrieve details for.
- ```table_name```*(str, optional)* – The name of the table containing the evaluation results. Defaults to ```evaluation_output```.
- ```get_all_rows```*(bool, optional)* – Whether to return all rows from the evaluation (True) or only rows where the agent’s response was incorrect or unclear (False). Defaults to ```False```.
- ```verbose```*(bool, optional)* – If set to True, prints a summary of evaluation metrics to the console. Defaults to ```False```.

**Returns:**

- ```DataFrame``` – A pandas DataFrame containing row-level evaluation results, including:

  - ```question```
  - ```expected_answer```
  - ```actual_answer```
  - ```evaluation_result``` (```true```, ```false```, ```unclear```)
  - ```thread_url``` (only accessible by the user who ran the evaluation)

## Customize your prompt for evaluation

By default, the Fabric SDK uses a built-in prompt to evaluate whether the Data Agent’s actual answer matches the expected answer. However, you can supply your own prompt for more nuanced or domain-specific evaluations using the ```critic_prompt``` parameter.

Your custom prompt should include the placeholders ```{query}```, ```{expected_answer}```, and ```{actual_answer}```. These placeholders are dynamically substituted for each question during evaluation.

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

# Name of the Data Agent
data_agent_name = "AgentEvaluation"

# Run evaluation using the custom critic prompt
evaluation_id = evaluate_data_agent(df, data_agent_name, critic_prompt=critic_prompt)

```

This feature is especially useful when:
  
- You want to apply for more lenient or stricter criteria what counts as a match.
- Your expected and actual answers may vary in format but still be semantically equivalent.
- You need to capture domain-specific nuances in how answers should be judged.

## Next steps

- [Use the Fabric data agent SDK](./fabric-data-agent-sdk.md)
- [Access sample notebooks on how to use the data agent SDK](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/data-science/data-agent-sdk)
