---
title: NotebookUtils variable library utilities for Fabric
description: Use NotebookUtils variable library utilities to access centrally managed variables and configuration in Fabric notebooks.
ms.reviewer: jingzh
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 03/31/2025
---

# NotebookUtils variable library utilities for Fabric

Variable libraries let you avoid hardcoding values in your notebook code. Instead of modifying code, you update the values in the library and the notebook references the variable library to retrieve those values. This approach simplifies code reuse across teams and projects by using a centrally managed library.

The following table lists the available variable library methods:

| Method | Signature | Description |
|---|---|---|
| `getLibrary` | `getLibrary(variableLibraryName: String): VariableLibrary` | Retrieves a variable library object. Access variables as properties on the returned object. |
| `get` | `get(variableReference: String): Any` | Retrieves a single variable value by its reference path. The value is automatically typed based on the variable definition. |

## Define variables

Define the variables in your variable library before using `notebookutils.variableLibrary`. You can create and manage variable libraries through the Fabric UI.

:::image type="content" source="../media/notebook-utilities/variable-library.png" alt-text="Screenshot of variables list in variable library." lightbox="../media/notebook-utilities/variable-library.png":::

## Retrieve variable library

Use `getLibrary()` to get the entire library as an object, then access variables as properties. You can also use `getVariable('name')` or bracket syntax `library['name']` for dynamic access.

### [Python](#tab/python)

```python
samplevl = notebookutils.variableLibrary.getLibrary("sampleVL")

# Property access
samplevl.test_int
samplevl.test_str

# Method access (useful for dynamic variable names)
samplevl.getVariable("test_int")

# Bracket access
samplevl["test_int"]
```

### [Scala](#tab/scala)

```scala
val samplevl = notebookutils.variableLibrary.getLibrary("sampleVL")

samplevl.test_int
samplevl.test_str
```

### [R](#tab/r)

```r
samplevl <- notebookutils.variableLibrary.getLibrary("sampleVL")

samplevl.test_int
samplevl.test_str
```

---

The following example shows how to dynamically construct a file path using variable library values:

```python
samplevl = notebookutils.variableLibrary.getLibrary("sampleVL")

file_path = f"abfss://{samplevl.Workspace_name}@onelake.dfs.fabric.microsoft.com/{samplevl.Lakehouse_name}.Lakehouse/Files/<FileName>.csv"
df = spark.read.format("csv").option("header","true").load(file_path)

display(df)
```

## Access a single variable by reference

Use the `get()` method with the reference pattern `$(/**/libraryName/variableName)` to retrieve a single variable value. The value is automatically typed based on the variable definition.

### [Python](#tab/python)

```python
notebookutils.variableLibrary.get("$(/**/samplevl/test_int)")
notebookutils.variableLibrary.get("$(/**/samplevl/test_str)")
notebookutils.variableLibrary.get("$(/**/samplevl/test_bool)")
```

### [Scala](#tab/scala)

```scala
notebookutils.variableLibrary.get("$(/**/samplevl/test_int)")
notebookutils.variableLibrary.get("$(/**/samplevl/test_str)")
notebookutils.variableLibrary.get("$(/**/samplevl/test_bool)")
```

### [R](#tab/r)

```r
notebookutils.variableLibrary.get("$(/**/samplevl/test_int)")
notebookutils.variableLibrary.get("$(/**/samplevl/test_str)")
notebookutils.variableLibrary.get("$(/**/samplevl/test_bool)")
```

---

## Supported variable types

Variable libraries support the following data types. Values are automatically typed when retrieved—you don't need to cast them explicitly in most cases.

| Type | Description | Example |
|---|---|---|
| **String** | Text values. | `"my_connection_string"` |
| **Int** | Integer numbers. | `42` |
| **Bool** | Boolean true/false. | `true` |
| **Float** | Decimal numbers. | `3.14` |
| **Secret** | Sensitive values such as passwords, tokens, and keys. Automatically redacted in logs. | `"••••••"` |
| **DateTime** | Date and time values in ISO 8601 format. | `"2025-01-15T08:30:00Z"` |

### Environment-specific configuration

Variable libraries support **value sets**, which let you define alternative sets of values for the same variables—for example, dev, test, and prod. Each workspace has one active value set at a time, and deployment pipelines can automatically activate the appropriate value set per stage.

```python
# These values change based on the active value set (dev/test/prod)
app_config = notebookutils.variableLibrary.getLibrary("app_config")

api_endpoint = app_config.api_endpoint
batch_size = app_config.batch_size
debug_mode = app_config.debug_enabled

print(f"API Endpoint: {api_endpoint}")
print(f"Batch Size: {batch_size}")
print(f"Debug Mode: {debug_mode}")

if debug_mode:
    print("Running in debug mode")
```

## Considerations

> [!NOTE]
> - The `notebookutils.variableLibrary` API only supports accessing variable libraries within the same workspace.
> - Retrieving variable libraries across workspaces isn't supported in child notebooks during a reference run.
> - The notebook code references the variables defined in the active value set of the variable library.
> - Service Principal (SPN) isn't currently supported for variable library utilities.
> - Variable libraries are read-only from notebooks. Modifications must be done through the Fabric UI or APIs.
> - Each library supports up to 1,000 variables and 1,000 value sets (maximum 10,000 cells total, 1 MB size limit).

> [!TIP]
> Use the **Secret** type for all sensitive values such as passwords, API keys, and tokens. Secret values are automatically redacted in logs and output.

## Related content

- [NotebookUtils for Fabric](../notebook-utilities.md)
