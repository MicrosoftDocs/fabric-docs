---
title: NotebookUtils variable library utilities for Fabric
description: Use NotebookUtils variable library utilities to access centrally managed variables and configuration in Fabric notebooks.
ms.reviewer: jingzh
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 03/31/2025
ai-usage: ai-assisted
---

# NotebookUtils variable library utilities for Fabric

Variable libraries help you avoid hardcoding values in notebook code. Instead of editing code, you update the values in the library and retrieve them at run time. This pattern helps you reuse notebooks across teams and projects by centralizing configuration.

The following table lists the available variable library methods:

| Method | Signature | Description |
|---|---|---|
| `getLibrary` | `getLibrary(variableLibraryName: String): VariableLibrary` | Retrieves a variable library object. Access variables as properties on the returned object, such as `library.variableName`. You can use `getVariable('name')` or bracket syntax `library['name']` for dynamic access. |
| `get` | `get(variableReference: String): Any` | Retrieves a single variable value by its reference path in the format `$(/**/libraryName/variableName)`. The `/**/` prefix is required. The value is automatically typed based on the variable definition. |

## Define variables

Define the variables in your variable library before using `notebookutils.variableLibrary`. You can create and manage variable libraries through the Fabric UI.

:::image type="content" source="../media/notebook-utilities/variable-library.png" alt-text="Screenshot of variables list in variable library." lightbox="../media/notebook-utilities/variable-library.png":::

## Retrieve variable library

Use `getLibrary()` to retrieve the entire library as an object, and then access variables as properties. Use `getVariable('name')` or bracket syntax `library['name']` when you need dynamic access.

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

samplevl$test_int()
samplevl$test_str()
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

> [!IMPORTANT]
> The `/**/` prefix is required in the reference pattern. The full pattern must be `$(/**/libraryName/variableName)`, where `libraryName` is the exact variable library item name and `variableName` is the defined variable in that library. Names are case-sensitive.

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

Variable libraries support the following data types. Values are automatically typed when you retrieve them—you don't need to cast them explicitly in most cases.

| Type | Description | Example |
|---|---|---|
| **String** | Text values. | `"my_connection_string"` |
| **Integer** | Integer numbers. | `42` |
| **Boolean** | Boolean true/false. | `true` |
| **Number** | Decimal numbers. | `3.14` |
| **DateTime** | Date and time values in ISO 8601 format. | `"2025-01-15T08:30:00Z"` |
| **Guid** | Globally unique identifiers. | `"123e4567-e89b-12d3-a456-426614174000"` |
| **Item reference** | References to supported Fabric items. | `"workspace/item"` |

### Environment-specific configuration

Variable libraries support **value sets**, which let you define alternative sets of values for the same variables—for example, dev, test, and prod. Each workspace has one active value set at a time, and deployment pipelines can automatically activate the appropriate value set per stage.

This pattern eliminates the need for code changes when you promote notebooks across environments:

### [Python](#tab/python)

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

### [Scala](#tab/scala)

```scala
val appConfig = notebookutils.variableLibrary.getLibrary("app_config")

val apiEndpoint = appConfig.api_endpoint
val batchSize = appConfig.batch_size
val debugMode = appConfig.debug_enabled

println(s"API Endpoint: ${apiEndpoint}")
println(s"Batch Size: ${batchSize}")
println(s"Debug Mode: ${debugMode}")

if (debugMode) {
    println("Running in debug mode")
}
```

### [R](#tab/r)

```r
app_config <- notebookutils.variableLibrary.getLibrary("app_config")

api_endpoint <- app_config$api_endpoint()
batch_size <- app_config$batch_size()
debug_mode <- app_config$debug_enabled()

print(paste("API Endpoint:", api_endpoint))
print(paste("Batch Size:", batch_size))
print(paste("Debug Mode:", debug_mode))

if (debug_mode) {
    print("Running in debug mode")
}
```

---

## Considerations

Keep these considerations in mind:

- The `notebookutils.variableLibrary` API only supports access to variable libraries within the same workspace. Cross-workspace access isn't supported.
- You can't retrieve variable libraries across workspaces in child notebooks during a reference run.
- Notebook code references the variables defined in the active value set of the variable library. To use different values, activate a different value set in the workspace or use deployment pipelines to manage value sets for each environment.
- Service Principal (SPN) isn't currently supported for variable library utilities.
- Variable libraries are read-only from notebooks. Make changes through the Fabric UI or APIs.
- Each library supports up to 1,000 variables and 1,000 value sets, with a maximum of 10,000 cells and a 1 MB size limit.
- Variable and library names are case-sensitive. Use exact name matching when you reference variables.

> [!TIP]
> Use deployment pipelines to automatically activate the appropriate value set for each stage (dev, test, prod). This eliminates the need to manually switch value sets or modify code when promoting notebooks across environments.

## Related content

- [NotebookUtils for Fabric](../notebook-utilities.md)
