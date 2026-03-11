---
title: NotebookUtils notebook run and orchestration for Fabric
description: Use NotebookUtils to run, reference, and orchestrate notebooks in Microsoft Fabric, including parallel execution with DAG support.
ms.reviewer: jingzh
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 03/31/2025
ai-usage: ai-assisted
---

# NotebookUtils notebook run and orchestration

Use the notebook utilities to run a notebook, run multiple notebooks in parallel, or exit a notebook with a value. Run the following command to get an overview of the available methods:

```python
notebookutils.notebook.help()
```

The following table lists the available notebook run and orchestration methods:

| Method | Signature | Description |
|---|---|---|
| `run` | `run(path: str, timeout_seconds: int = 90, arguments: dict = None, workspace: str = ""): str` | Runs a notebook and returns its exit value. |
| `runMultiple` | `runMultiple(dag: Any, config: dict = None): dict[str, dict[str, Any]]` | Runs multiple notebooks concurrently with support for dependency relationships. |
| `validateDAG` | `validateDAG(dag: Any): bool` | Validates whether a DAG definition is correctly structured. |
| `exit` | `exit(value: str): None` | Exits the current notebook with a value. |

For notebook CRUD operations (create, get, update, delete, list), see [Manage notebook artifacts](notebookutils-notebook-management.md).

> [!NOTE]
> The `config` parameter in `runMultiple()` is only available in Python. Scala and R don't support this parameter.

> [!NOTE]
> Notebook utilities aren't applicable for Apache Spark job definitions (SJD).

## Reference a notebook

The `run()` method references a notebook and returns its exit value. You can run nesting function calls in a notebook interactively or in a pipeline. The notebook being referenced runs on the Spark pool of the notebook that calls this function.

### [Python](#tab/python)

```python
notebookutils.notebook.run("notebook name", <timeout_seconds>, <arguments>, <workspace>)
```

For example:

```python
notebookutils.notebook.run("Sample1", 90, {"input": 20 })
```

### [Scala](#tab/scala)

```scala
notebookutils.notebook.run("Sample1", 90, Map("input" -> 20), "")
```

### [R](#tab/r)

```r
notebookutils.notebook.run("Sample1", 90, list(input = 20), "")
```

---

### Return value

The `run()` method returns the exact string passed to `notebookutils.notebook.exit(value)` in the child notebook. If `exit()` isn't called in the child notebook, an empty string (`""`) is returned.

Fabric notebooks also support referencing notebooks across workspaces by specifying the *workspace ID*.

### [Python](#tab/python)

```python
notebookutils.notebook.run("Sample1", 90, {"input": 20 }, "fe0a6e2a-a909-4aa3-a698-0a651de790aa")
```

### [Scala](#tab/scala)

```scala
notebookutils.notebook.run("Sample1", 90, Map("input" -> 20), "fe0a6e2a-a909-4aa3-a698-0a651de790aa")
```

### [R](#tab/r)

```r
notebookutils.notebook.run("Sample1", 90, list(input = 20), "fe0a6e2a-a909-4aa3-a698-0a651de790aa")
```

---

Open the snapshot link in the cell output to inspect the reference run. The snapshot captures run results and helps you debug the referenced notebook.

:::image type="content" source="../media/notebook-utilities/reference-run.png" alt-text="Screenshot of reference run result." lightbox="../media/notebook-utilities/reference-run.png":::

:::image type="content" source="../media/notebook-utilities/run-snapshot.png" alt-text="Screenshot of a snapshot example." lightbox="../media/notebook-utilities/run-snapshot.png":::

### Set up child notebooks to receive parameters

When you create a child notebook that's called via `run()` or `runMultiple()`, set up a parameter cell so that the notebook can receive arguments from the parent:

1. Create a code cell with default parameter values.
1. Mark the cell as a parameter cell by selecting **Mark cell as parameters** in the notebook UI.
1. During execution, the parameter cell values are replaced with the arguments passed from the parent.

```python
# This cell should be marked as "parameters" cell
# Default values are overridden when the notebook is called
date = "2024-01-01"
region = "US"
```

> [!TIP]
> Exit values are always strings. If you need a numeric value in the parent notebook, convert the result after retrieval (for example, `int(result)`).

### Considerations

- The cross-workspace reference notebook is supported by **runtime version 1.2 and above**.
- If you use the files under [Notebook Resource](../how-to-use-notebook.md#notebook-resources), use `notebookutils.nbResPath` in the referenced notebook to make sure it points to the same folder as the interactive run.
- Reference run allows child notebooks to run only if they use the same lakehouse as the parent, inherit the parent's lakehouse, or neither defines one. The execution is blocked if the child specifies a different lakehouse than the parent notebook. To bypass this check, set `useRootDefaultLakehouse: True` in the arguments.
- Don't call `notebookutils.notebook.exit(value)` inside a `try-catch` block. The exit call won't take effect when wrapped in exception handling.

## Reference run multiple notebooks in parallel

Use `notebookutils.notebook.runMultiple()` to run multiple notebooks in parallel or in a predefined topological structure. The API uses a multithreaded implementation within a Spark session, which means referenced notebook runs share compute resources.

With `notebookutils.notebook.runMultiple()`, you can:

- Execute multiple notebooks simultaneously, without waiting for each one to finish.

- Specify the dependencies and order of execution for your notebooks, using a simple JSON format.

- Optimize the use of Spark compute resources and reduce the cost of your Fabric projects.

- View the Snapshots of each notebook run record in the output, and debug/monitor your notebook tasks conveniently.

- Get the exit value of each executive activity and use them in downstream tasks.

Run `notebookutils.notebook.help("runMultiple")` to view more examples and usage details.

### Run a simple list of notebooks

The following example runs a list of notebooks in parallel:

### [Python](#tab/python)

```python
notebookutils.notebook.runMultiple(["NotebookSimple", "NotebookSimple2"])
```

### [Scala](#tab/scala)

```scala
notebookutils.notebook.runMultiple(Seq("NotebookSimple", "NotebookSimple2"))
```

### [R](#tab/r)

```r
notebookutils.notebook.runMultiple(list("NotebookSimple", "NotebookSimple2"))
```

---

The execution result from the root notebook is as follows:

:::image type="content" source="../media/notebook-utilities/reference-notebook-list.png" alt-text="Screenshot of reference a list of notebooks." lightbox="../media/notebook-utilities/reference-notebook-list.png":::

### Return value

The `runMultiple()` method returns a dictionary where each key is the activity name and each value is a dictionary with the following keys:

- `exitVal`: The string returned by the child notebook's `exit()` call, or an empty string if `exit()` wasn't called.
- `exception`: An error object if the activity failed, or `None` if it succeeded.

### Run notebooks with a DAG structure

The following example runs notebooks in a DAG structure by using `notebookutils.notebook.runMultiple()`.

### [Python](#tab/python)

```python
# run multiple notebooks with parameters
DAG = {
    "activities": [
        {
            "name": "Process_1", # activity name, must be unique
            "path": "NotebookSimple", # notebook item name
            "timeoutPerCellInSeconds": 90, # max timeout for each cell, default to 90 seconds
            "args": {"p1": "changed value", "p2": 100}, # notebook parameters
            "workspace":"WorkspaceName" # both name and id are supported
        },
        {
            "name": "Process_2",
            "path": "NotebookSimple2",
            "timeoutPerCellInSeconds": 120,
            "args": {"p1": "changed value 2", "p2": 200},
            "workspace":"id" # both name and id are supported
        },
        {
            "name": "Process_1.1",
            "path": "NotebookSimple2",
            "timeoutPerCellInSeconds": 120,
            "args": {"p1": "changed value 3", "p2": 300},
            "retry": 1,
            "retryIntervalInSeconds": 10,
            "dependencies": ["Process_1"] # list of activity names that this activity depends on
        }
    ],
    "timeoutInSeconds": 43200, # max timeout for the entire DAG, default to 12 hours
    "concurrency": 12 # max number of notebooks to run concurrently, default to 3x CPU cores, 0 means unlimited
}
notebookutils.notebook.runMultiple(DAG, {"displayDAGViaGraphviz": False})
```

### [Scala](#tab/scala)

```scala
val dag =
    """
        |{
        |  "activities": [
        |    {
        |      "name": "Process_1",
        |      "path": "NotebookSimple",
        |      "timeoutPerCellInSeconds": 90,
        |      "args": {"p1": "changed value", "p2": 100},
        |      "workspace": "WorkspaceName"
        |    },
        |    {
        |      "name": "Process_2",
        |      "path": "NotebookSimple2",
        |      "timeoutPerCellInSeconds": 120,
        |      "args": {"p1": "changed value 2", "p2": 200},
        |      "workspace": "id"
        |    },
        |    {
        |      "name": "Process_1.1",
        |      "path": "NotebookSimple2",
        |      "timeoutPerCellInSeconds": 120,
        |      "args": {"p1": "changed value 3", "p2": 300},
        |      "retry": 1,
        |      "retryIntervalInSeconds": 10,
        |      "dependencies": ["Process_1"]
        |    }
        |  ],
        |  "timeoutInSeconds": 43200,
        |  "concurrency": 12
        |}
        |""".stripMargin

notebookutils.notebook.runMultiple(dag)
```

### [R](#tab/r)

```r
DAG <- '{
    "activities": [
        {
            "name": "Process_1",
            "path": "NotebookSimple",
            "timeoutPerCellInSeconds": 90,
            "args": {"p1": "changed value", "p2": 100},
            "workspace": "WorkspaceName"
        },
        {
            "name": "Process_2",
            "path": "NotebookSimple2",
            "timeoutPerCellInSeconds": 120,
            "args": {"p1": "changed value 2", "p2": 200},
            "workspace": "id"
        },
        {
            "name": "Process_1.1",
            "path": "NotebookSimple2",
            "timeoutPerCellInSeconds": 120,
            "args": {"p1": "changed value 3", "p2": 300},
            "retry": 1,
            "retryIntervalInSeconds": 10,
            "dependencies": ["Process_1"]
        }
    ],
    "timeoutInSeconds": 43200,
    "concurrency": 12
}'

notebookutils.notebook.runMultiple(DAG)
```

---

The execution result from the root notebook is as follows:

:::image type="content" source="../media/notebook-utilities/reference-notebook-list-with-parameters.png" alt-text="Screenshot of reference a list of notebooks with parameters." lightbox="../media/notebook-utilities/reference-notebook-list-with-parameters.png":::

### DAG parameter reference

The following table describes each field you can use in the DAG definition:

| Field | Level | Required | Description |
|---|---|---|---|
| `activities` | Root | Yes | A list of activity objects that define the notebooks to run. |
| `timeoutInSeconds` | Root | No | Maximum timeout for the entire DAG. Default is 43200 (12 hours). |
| `concurrency` | Root | No | Maximum number of notebooks to run concurrently. Default is 3 times the available CPU core count. Set this value explicitly if you need tighter control, or use `0` for unlimited concurrency. |
| `name` | Activity | Yes | A unique name for the activity. Used to identify results and define dependencies. |
| `path` | Activity | Yes | The notebook item name or path to execute. |
| `timeoutPerCellInSeconds` | Activity | No | Maximum timeout for each cell in the child notebook. Default is 90 seconds. |
| `args` | Activity | No | A dictionary of parameters to pass to the child notebook. |
| `workspace` | Activity | No | The workspace name or ID where the notebook resides. By default, the child notebook runs in the same workspace as the caller. |
| `retry` | Activity | No | Number of retry attempts if the activity fails. Default is 0. |
| `retryIntervalInSeconds` | Activity | No | Wait time in seconds between retry attempts. Default is 0. |
| `dependencies` | Activity | No | A list of activity names that must complete before this activity starts. |

### Reference exit values between activities

You can reference the exit value of a dependency activity in the `args` field by using the `@activity()` expression. This pattern lets you pass data between notebooks in a DAG.

```python
DAG = {
    "activities": [
        {
            "name": "Extract",
            "path": "ExtractData",
            "timeoutPerCellInSeconds": 120,
            "args": {"source": "prod_db"}
        },
        {
            "name": "Transform",
            "path": "TransformData",
            "timeoutPerCellInSeconds": 180,
            "args": {
                "data_path": "@activity('Extract').exitValue()"
            },
            "dependencies": ["Extract"]
        }
    ]
}

results = notebookutils.notebook.runMultiple(DAG)
```

> [!TIP]
> Use the `@activity('activity_name').exitValue()` expression in the `args` field to pass results from one activity to another within a DAG.

### Build a dynamic DAG

You can generate DAG structures programmatically for scenarios like fan-out processing across multiple partitions:

```python
def create_fan_out_dag(partitions):
    activities = []

    for partition in partitions:
        activities.append({
            "name": f"Process_{partition}",
            "path": "ProcessPartition",
            "timeoutPerCellInSeconds": 180,
            "args": {"partition": partition}
        })

    activities.append({
        "name": "Aggregate",
        "path": "AggregateResults",
        "timeoutPerCellInSeconds": 120,
        "dependencies": [f"Process_{p}" for p in partitions]
    })

    return {"activities": activities, "concurrency": 25}

partitions = ["2024-01", "2024-02", "2024-03", "2024-04"]
dag = create_fan_out_dag(partitions)

results = notebookutils.notebook.runMultiple(dag)
```

### Validate a DAG

Use `validateDAG()` to verify that your DAG structure is valid before execution. It catches issues such as duplicate activity names, missing dependencies, and circular references.

### [Python](#tab/python)

```python
notebookutils.notebook.validateDAG(DAG)
```

### [Scala](#tab/scala)

```scala
notebookutils.notebook.validateDAG(dag)
```

### [R](#tab/r)

```r
notebookutils.notebook.validateDAG(DAG)
```

---

### Return value

The `validateDAG()` method returns `True` if the DAG structure is valid or raises an exception if validation fails.

> [!TIP]
> Always call `validateDAG()` before `runMultiple()` in production workflows to catch structural errors early.

### Handle runMultiple failures

The `runMultiple()` method returns a dictionary where each key is the activity name and each value contains an `exitVal` (string) and an `exception` (error object or `None`). You can inspect partial results even when some activities fail:

```python
try:
    results = notebookutils.notebook.runMultiple(DAG)
except Exception as ex:
    results = ex.result

for activity_name, result in results.items():
    if result["exception"]:
        print(f"{activity_name} failed: {result['exception']}")
    else:
        print(f"{activity_name} succeeded: {result['exitVal']}")
```

### Considerations

- The parallelism degree of the multiple notebook run is restricted to the total available compute resource of a Spark session.
- The default number of concurrent notebooks is **3 times the available CPU core count**. You can customize this value, but excessive parallelism might lead to stability and performance issues because of high compute resource usage. If issues arise, consider separating notebooks into multiple `runMultiple` calls or reducing the concurrency by adjusting the **concurrency** field in the DAG parameter.
- The default timeout for the entire DAG is 12 hours, and the default timeout for each cell in a child notebook is 90 seconds. You can change the timeout by setting the **timeoutInSeconds** and **timeoutPerCellInSeconds** fields in the DAG parameter.
- Configure `retry` and `retryIntervalInSeconds` for activities that might fail due to transient issues such as network timeouts or temporary service unavailability.
- Parallel notebooks share compute resources within a single Spark session. Monitor resource utilization to avoid memory pressure and CPU contention.

## Exit a notebook

The `exit()` method exits a notebook with a value. You can run nesting function calls in a notebook interactively or in a pipeline.

- When you call an `exit()` function from a notebook interactively, the Fabric notebook throws an exception, skips running subsequent cells, and keeps the Spark session alive.

- When you orchestrate a notebook in a pipeline that calls an `exit()` function, the notebook activity returns with an exit value. This completes the pipeline run and stops the Spark session.

- When you call an `exit()` function in a notebook that is being referenced, Fabric Spark stops the further execution of the referenced notebook, and continues to run the next cells in the main notebook that calls the `run()` function. For example: Notebook1 has three cells and calls an `exit()` function in the second cell. Notebook2 has five cells and calls `run(notebook1)` in the third cell. When you run Notebook2, Notebook1 stops at the second cell when hitting the `exit()` function. Notebook2 continues to run its fourth cell and fifth cell.

### [Python](#tab/python)

```python
notebookutils.notebook.exit("value string")
```

### [Scala](#tab/scala)

```scala
notebookutils.notebook.exit("value string")
```

### [R](#tab/r)

```r
notebookutils.notebook.exit("value string")
```

---

### Return behavior

The `exit()` method doesn't return a value. It terminates the current notebook and passes the provided string to the calling notebook or pipeline.

> [!NOTE]
> The `exit()` function overwrites the current cell output. To avoid losing the output of other code statements, call `notebookutils.notebook.exit()` in a separate cell.

> [!IMPORTANT]
> Don't call `notebookutils.notebook.exit()` inside a `try-catch` block. The exit won't take effect when wrapped in exception handling. The `exit()` call must be at the top level of your code to work correctly.

For example:

The **Sample1** notebook has the following two cells:

- Cell 1 defines an **input** parameter with default value set to 10.

- Cell 2 exits the notebook with **input** as exit value.

:::image type="content" source="../media/notebook-utilities/input-exit-value.png" alt-text="Screenshot showing a sample notebook of exit function." lightbox="../media/notebook-utilities/input-exit-value.png":::

You can run the **Sample1** in another notebook with default values:

```python
exitVal = notebookutils.notebook.run("Sample1")
print (exitVal)
```

**Output:**

```console
Notebook is executed successfully with exit value 10
```

You can run the **Sample1** in another notebook and set the **input** value as 20:

```python
exitVal = notebookutils.notebook.run("Sample1", 90, {"input": 20 })
print (exitVal)
```

**Output:**

```console
Notebook is executed successfully with exit value 20
```

## Related content

- [NotebookUtils overview](../notebook-utilities.md)
- [Manage notebook artifacts](notebookutils-notebook-management.md)
