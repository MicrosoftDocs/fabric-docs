---
title: NotebookUtils runtime context for Fabric
description: Use NotebookUtils runtime context to access session information, workspace details, and execution context in Fabric notebooks.
ms.reviewer: jingzh
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 03/31/2025
---

# NotebookUtils runtime context for Fabric

The `notebookutils.runtime` module gives you read-only access to context information about the current notebook execution session. You can retrieve metadata such as the notebook name, workspace details, default lakehouse configuration, pipeline execution flags, and reference run hierarchy—all without modifying any state.

Runtime context is useful for:

- **Dynamic configuration** – Adapt notebook behavior based on the execution environment.
- **Conditional logic** – Branch logic depending on whether the notebook runs in a pipeline or interactively.
- **Debugging and monitoring** – Include context properties in log output and correlate related executions.
- **Audit trails** – Capture execution metadata for compliance and lineage tracking.

> [!NOTE]
> Runtime context is available in Python, PySpark, Scala, and R notebooks. The context is read-only—you can't modify any of the properties returned by `notebookutils.runtime.context`. Some properties are only populated in specific contexts, such as reference runs or pipeline executions, and might return `null` or empty values otherwise.

## Show session context info

Use `notebookutils.runtime.context` to get the context information of the current live session, including the notebook name, default lakehouse, workspace info, and whether it's a pipeline run.

### [Python](#tab/python)

```python
notebookutils.runtime.context
```

### [Scala](#tab/scala)

```scala
notebookutils.runtime.context
```

### [R](#tab/r)

```r
notebookutils.runtime.context()
```

---

The following table describes the available properties.

| Property | Type | Description |
|---|---|---|
| `currentNotebookName` | String | The name of the current notebook. |
| `currentNotebookId` | String | The unique ID of the current notebook. |
| `currentWorkspaceName` | String | The name of the current workspace. |
| `currentWorkspaceId` | String | The ID of the current workspace. |
| `defaultLakehouseName` | String | The display name of the default lakehouse, if defined. |
| `defaultLakehouseId` | String | The ID of the default lakehouse, if defined. |
| `defaultLakehouseWorkspaceName` | String | The workspace name of the default lakehouse, if defined. |
| `defaultLakehouseWorkspaceId` | String | The workspace ID of the default lakehouse, if defined. |
| `currentRunId` | String | In a reference run, the current run ID. |
| `parentRunId` | String | In a reference run with nested runs, this ID is the parent run ID. |
| `rootRunId` | String | In a reference run with nested runs, this ID is the root run ID. |
| `isForPipeline` | Boolean | Whether the run is for a pipeline. |
| `isForInteractive` | Boolean | Whether the run is an interactive session. |
| `isReferenceRun` | Boolean | Whether the current run is a reference run. |
| `referenceTreePath` | String | The tree structure of nested reference runs, used only for the snapshot hierarchy in the monitoring L2 page. |
| `rootNotebookId` | String | (Only in reference run) The ID of the root notebook in a reference run. |
| `rootNotebookName` | String | (Only in reference run) The name of the root notebook in a reference run. |
| `rootWorkspaceId` | String | (Only in reference run) The workspace ID of the root notebook in a reference run. |
| `rootWorkspaceName` | String | (Only in reference run) The workspace name of the root notebook in a reference run. |
| `activityId` | String | The Livy job ID for the current activity. |
| `hcReplId` | String | The REPL ID in High Concurrency Mode. |
| `clusterId` | String | The identity of the Synapse Spark cluster. |
| `poolName` | String | The name of the Spark pool being used. |
| `environmentId` | String | The environment ID where the job is running. |
| `environmentWorkspaceId` | String | The workspace ID of the environment. |
| `userId` | String | The user ID of the current user. |
| `userName` | String | The user name of the current user. |
| `currentKernel` | String | The name of the current notebook kernel. |
| `productType` | String | The product type identifier (for example, `Fabric`). |

## Usage examples

### Access basic context information

Cache the context object when you need to read multiple properties:

### [Python](#tab/python)

```python
context = notebookutils.runtime.context

print(f"Notebook: {context['currentNotebookName']}")
print(f"Workspace: {context['currentWorkspaceName']}")
print(f"Lakehouse: {context['defaultLakehouseName'] or 'None'}")
```

### [Scala](#tab/scala)

```scala
val context = notebookutils.runtime.context

println(s"Notebook: ${context("currentNotebookName")}")
println(s"Workspace: ${context("currentWorkspaceName")}")
```

### [R](#tab/r)

```r
context <- notebookutils.runtime.context()

cat(paste("Notebook:", context$currentNotebookName, "\n"))
cat(paste("Workspace:", context$currentWorkspaceName, "\n"))
```

---

### Check pipeline vs. interactive execution

Use the `isForPipeline` flag to branch logic depending on the execution mode. For example, you can apply stricter error handling in pipeline runs.

```python
context = notebookutils.runtime.context

if context['isForPipeline']:
    print("Pipeline mode: Strict error handling")
    error_handling = "strict"
    max_retries = 3
elif context['isReferenceRun']:
    print("Running as a referenced notebook")
    error_handling = "strict"
    max_retries = 2
else:
    print("Interactive mode: Lenient error handling")
    error_handling = "lenient"
    max_retries = 1
```

### Inspect the reference run hierarchy

When a notebook runs as part of a nested reference run, you can trace the full hierarchy from the current run back to the root:

```python
context = notebookutils.runtime.context

if context['isReferenceRun']:
    print("Reference Run Context:")
    print(f"  Current Run ID: {context['currentRunId']}")
    print(f"  Parent Run ID: {context['parentRunId']}")
    print(f"  Root Run ID: {context['rootRunId']}")
    print(f"  Root Notebook: {context['rootNotebookName']}")
else:
    print("Not a reference run")
```

### Include context in logging

Enrich log messages with execution context for easier debugging and monitoring:

```python
context = notebookutils.runtime.context

log_prefix = (
    f"[{context['currentWorkspaceName']}/{context['currentNotebookName']}]"
    f" run={context.get('currentRunId', 'interactive')}"
)

print(f"{log_prefix} Processing started")
```

> [!TIP]
> Use `isForPipeline` and `isReferenceRun` together to implement three-way branching: pipeline mode, reference-run mode, and interactive mode. This pattern helps you tailor retry counts, logging verbosity, and error handling per execution context.

## Related content

- [NotebookUtils for Fabric](../notebook-utilities.md)
