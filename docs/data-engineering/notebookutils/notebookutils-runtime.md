---
title: NotebookUtils runtime context for Fabric
description: Use NotebookUtils runtime context to access session information, workspace details, and execution context in Fabric notebooks.
ms.reviewer: jingzh
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 03/31/2025
ai-usage: ai-assisted
---

# NotebookUtils runtime context for Fabric

Use `notebookutils.runtime` to read context information about the current notebook session. You can retrieve metadata such as the notebook name, workspace details, default lakehouse configuration, pipeline execution flags, and reference run hierarchy without modifying any state.

Use runtime context to:

- **Dynamic configuration** – Adapt notebook behavior based on the execution environment.
- **Conditional logic** – Branch logic depending on whether the notebook runs in a pipeline or interactively.
- **Debugging and monitoring** – Include context properties in log output and correlate related executions.
- **Audit trails** – Capture execution metadata for compliance and lineage tracking.

> [!NOTE]
> Runtime context is available in Python, PySpark, Scala, and R notebooks. The context is read-only—you can't modify any of the properties returned by `notebookutils.runtime.context`. Some properties are only populated in specific contexts, such as reference runs or pipeline executions, and might return `null` or empty values otherwise.

## View session context

Use `notebookutils.runtime.context` to view context information for the current session, including the notebook name, default lakehouse, workspace information, and whether the session runs in a pipeline.

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

| Property | Type | Description | Availability |
|---|---|---|---|
| `currentNotebookName` | String | The name of the current notebook. | All contexts |
| `currentNotebookId` | String | The unique ID of the current notebook. | All contexts |
| `currentWorkspaceName` | String | The name of the current workspace. | All contexts |
| `currentWorkspaceId` | String | The ID of the current workspace. | All contexts |
| `defaultLakehouseName` | String | The display name of the default lakehouse, if defined. | When default lakehouse is attached |
| `defaultLakehouseId` | String | The ID of the default lakehouse, if defined. | When default lakehouse is attached |
| `defaultLakehouseWorkspaceName` | String | The workspace name of the default lakehouse, if defined. | When default lakehouse is attached |
| `defaultLakehouseWorkspaceId` | String | The workspace ID of the default lakehouse, if defined. | When default lakehouse is attached |
| `currentRunId` | String | In a reference run, the current run ID. | Reference runs only |
| `parentRunId` | String | In a reference run with nested runs, this ID is the parent run ID. | Nested reference runs only |
| `rootRunId` | String | In a reference run with nested runs, this ID is the root run ID. | Nested reference runs only |
| `isForPipeline` | Boolean | Whether the run is for a pipeline. | All contexts |
| `isForInteractive` | Boolean | Whether the run is an interactive session. | All contexts |
| `isReferenceRun` | Boolean | Whether the current run is a reference run. | All contexts |
| `referenceTreePath` | String | The tree structure of nested reference runs, used only for the snapshot hierarchy in the monitoring L2 page. | Nested reference runs only |
| `rootNotebookId` | String | The ID of the root notebook in a reference run. | Reference runs only |
| `rootNotebookName` | String | The name of the root notebook in a reference run. | Reference runs only |
| `rootWorkspaceId` | String | The workspace ID of the root notebook in a reference run. | Reference runs only |
| `rootWorkspaceName` | String | The workspace name of the root notebook in a reference run. | Reference runs only |
| `activityId` | String | The Livy job ID for the current activity. | All contexts |
| `hcReplId` | String | The REPL ID in High Concurrency Mode. | High concurrency mode only |
| `clusterId` | String | The identity of the Synapse Spark cluster. | All contexts |
| `poolName` | String | The name of the Spark pool being used. | All contexts |
| `environmentId` | String | The environment ID where the job is running. | All contexts |
| `environmentWorkspaceId` | String | The workspace ID of the environment. | All contexts |
| `userId` | String | The user ID of the current user. | All contexts |
| `userName` | String | The user name of the current user. | All contexts |
| `currentKernel` | String | The name of the current notebook kernel. | Python Notebook only |
| `productType` | String | The product type identifier (for example, `Fabric`). | All contexts |

## Usage examples

### Access basic context information

Cache the context object when you need to read multiple properties.

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

### [Python](#tab/python)

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

### [Scala](#tab/scala)

```scala
val context = notebookutils.runtime.context

if (context("isForPipeline").asInstanceOf[Boolean]) {
    println("Pipeline mode: Strict error handling")
} else if (context("isReferenceRun").asInstanceOf[Boolean]) {
    println("Running as a referenced notebook")
} else {
    println("Interactive mode: Lenient error handling")
}
```

### [R](#tab/r)

```r
context <- notebookutils.runtime.context()

if (context$isForPipeline) {
    print("Pipeline mode: Strict error handling")
} else if (context$isReferenceRun) {
    print("Running as a referenced notebook")
} else {
    print("Interactive mode: Lenient error handling")
}
```

---

> [!TIP]
> Use `isForPipeline` and `isReferenceRun` together to implement three-way branching for different execution contexts. This pattern helps you tailor retry counts, logging verbosity, and error handling strategies. For production workloads, pipeline and reference runs typically require stricter error handling than interactive sessions.

### Inspect the reference run hierarchy

When a notebook runs as part of a nested reference run, you can trace the full hierarchy from the current run back to the root:

### [Python](#tab/python)

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

### [Scala](#tab/scala)

```scala
val context = notebookutils.runtime.context

if (context("isReferenceRun").asInstanceOf[Boolean]) {
    println("Reference Run Context:")
    println(s"  Current Run ID: ${context("currentRunId")}")
    println(s"  Parent Run ID: ${context("parentRunId")}")
    println(s"  Root Run ID: ${context("rootRunId")}")
    println(s"  Root Notebook: ${context("rootNotebookName")}")
} else {
    println("Not a reference run")
}
```

### [R](#tab/r)

```r
context <- notebookutils.runtime.context()

if (context$isReferenceRun) {
    print("Reference Run Context:")
    print(paste("Current Run ID:", context$currentRunId))
    print(paste("Parent Run ID:", context$parentRunId))
    print(paste("Root Run ID:", context$rootRunId))
    print(paste("Root Notebook:", context$rootNotebookName))
} else {
    print("Not a reference run")
}
```

---

### Include context in logging

Enrich log messages with execution context for easier debugging and monitoring:

### [Python](#tab/python)

```python
context = notebookutils.runtime.context

run_id = context.get("currentRunId") or "interactive"
log_prefix = (
    f"[{context['currentWorkspaceName']}/{context['currentNotebookName']}]"
    f" run={run_id}"
)

print(f"{log_prefix} Processing started")
```

### [Scala](#tab/scala)

```scala
val context = notebookutils.runtime.context

val logPrefix = s"[${context("currentWorkspaceName")}/${context("currentNotebookName")}] run=${context.getOrElse("currentRunId", "interactive")}"

println(s"${logPrefix} Processing started")
```

### [R](#tab/r)

```r
context <- notebookutils.runtime.context()

run_id <- if (!is.null(context$currentRunId) && nzchar(context$currentRunId)) context$currentRunId else "interactive"
log_prefix <- paste0("[", context$currentWorkspaceName, "/", context$currentNotebookName, "] run=", run_id)

print(paste(log_prefix, "Processing started"))
```

## Related content

- [NotebookUtils for Fabric](../notebook-utilities.md)
