---
title: NotebookUtils User Data Function (UDF) utilities for Fabric
description: Use NotebookUtils UDF utilities to retrieve and invoke User Data Functions from Fabric notebooks.
ms.reviewer: jingzh
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 03/31/2025
ai-usage: ai-assisted
---

# NotebookUtils User Data Function (UDF) utilities for Fabric

The `notebookutils.udf` module provides utilities for integrating notebook code with User Data Function (UDF) items. You can access functions from a UDF item within the same workspace or across different workspaces, and then invoke those functions as needed. UDF items promote code reusability, centralized maintenance, and team collaboration.

Use UDF utilities to:

- **Function retrieval** – Access functions from UDF items by name.
- **Cross-workspace access** – Use functions from UDF items in other workspaces.
- **Function discovery** – Inspect available functions and their signatures.
- **Flexible invocation** – Call functions with language-appropriate parameters.

> [!NOTE]
> You need read access to a UDF item in the target workspace to retrieve its functions. Exceptions from UDF functions propagate to the calling notebook.

The following table lists the available UDF methods:

| Method | Signature | Description |
|---|---|---|
| `getFunctions` | `getFunctions(udf: String, workspaceId: String = ""): UDF` | Retrieves all functions from a UDF item by artifact ID or name. Returns an object with callable function attributes. |

The returned object exposes the following properties:

| Property | Type | Description |
|---|---|---|
| `functionDetails` | List | A list of function metadata dictionaries. Each dictionary includes: `Name` (function name), `Description` (function description), `Parameters` (list of parameter definitions), `FunctionReturnType` (return type), and `DataSourceConnections` (data source connections used). |
| `itemDetails` | Dictionary | A dictionary of UDF item metadata with keys: `Id` (artifact ID), `Name` (item name), `WorkspaceId` (workspace ID), and `CapacityId` (capacity ID). |
| `<functionName>` | Callable | Each function in the UDF item becomes a callable method on the returned object. Use `myFunctions.functionName(...)` to invoke. |

> [!TIP]
> Retrieve UDF functions once and cache the wrapper object. Avoid calling `getFunctions()` repeatedly in a loop—cache the result instead to minimize overhead.

## Retrieve functions from a UDF

Use `notebookutils.udf.getFunctions()` to get all functions from a UDF item. You can optionally specify a workspace ID for cross-workspace access.

### [Python](#tab/python)

```python
# Get functions from a UDF item in the current workspace
myFunctions = notebookutils.udf.getFunctions('UDFItemName')

# Get functions from a UDF item in another workspace
myFunctions = notebookutils.udf.getFunctions('UDFItemName', 'workspaceId')
```

### [Scala](#tab/scala)

```scala
val myFunctions = notebookutils.udf.getFunctions("UDFItemName")
val sharedFunctions = notebookutils.udf.getFunctions("UDFItemName", "workspaceId")
```

### [R](#tab/r)

```r
# Get functions from a UDF item in the current workspace
myFunctions <- notebookutils.udf.getFunctions("UDFItemName")

# Get functions from a UDF item in another workspace
myFunctions <- notebookutils.udf.getFunctions("UDFItemName", "workspaceId")
```

---

## Invoke a function

After retrieving functions from a UDF item, call them by name. Python supports positional and named parameters. Scala and R examples use positional parameters.

### [Python](#tab/python)

```python
# Positional parameters
myFunctions.functionName('value1', 'value2')

# Named parameters (recommended for clarity)
myFunctions.functionName(parameter1='value1', parameter2='value2')
```

### [Scala](#tab/scala)

```scala
val res = myFunctions.functionName("value1", "value2")
```

### [R](#tab/r)

```r
result <- myFunctions$functionName("value1", "value2")
```

---

## Default parameter values

Fabric user data functions support default argument values. When you invoke functions retrieved via `notebookutils.udf.getFunctions`, any parameter that has a defined default can be omitted—the runtime uses the default automatically. You can also supply named arguments to override specific defaults while leaving others at their defaults.

### [Python](#tab/python)

```python
# Assume the UDF item defines a function like:
# def score_customer(customerId: str, startDate: datetime = "2024-01-01T00:00:00Z", isActive: bool = True, maxRecords: int = 100) -> dict

# (1) Call without optional parameters — defaults are used for startDate, isActive, and maxRecords
result = myFunctions.scoreCustomer(customerId='C001')

# (2) Override one default via a named argument, keep the others at their defaults
result = myFunctions.scoreCustomer(customerId='C001', maxRecords=50)

# (3) Pass a date/time in ISO 8601 format for reliable parsing
result = myFunctions.scoreCustomer(customerId='C001', startDate='2024-12-31T23:59:59Z')
```

### [Scala](#tab/scala)

```scala
// All required parameters must be supplied; optional (default) parameters can be omitted.
// Scala does not support named arguments when calling UDF functions through notebookutils.
val result = myFunctions.scoreCustomer("C001")
```

### [R](#tab/r)

```r
# All required parameters must be supplied; optional (default) parameters can be omitted.
result <- myFunctions$scoreCustomer("C001")
```

---

### Supported default input types

The following types are supported as default parameter values:

| **Default type** | **Notes** |
|---|---|
| String | Any JSON-serializable string. |
| Datetime string | Parsed to `datetime`; use a consistent format such as ISO 8601 (for example, `2024-12-31T23:59:59Z`). |
| Boolean | `True` or `False`. |
| Integer | Any integer value. |
| Float | Any floating-point value. |
| List | Must be JSON-serializable; prefer `None` in the signature and assign inside the function to avoid mutable default pitfalls. |
| Dictionary | Must be JSON-serializable; prefer `None` in the signature and assign inside the function. |
| pandas DataFrame | Provided as a JSON object that the SDK converts to a pandas type. Requires `fabric-user-data-functions` version 1.0.0 or later. |
| pandas Series | Provided as a JSON array of objects that the SDK converts to a pandas type. Requires `fabric-user-data-functions` version 1.0.0 or later. |

### Limitations and guidance

> [!NOTE]
> Keep the following in mind when using default parameter values:
> - **Use `None` for list/dict defaults**: Assign the actual default inside the function body to avoid shared mutable defaults. For example: `def myFunc(items: list | None = None): items = items or []`.
> - **JSON serializable only**: Defaults must be JSON-serializable. Sets and tuples are **not** supported as default values.
> - **Date/time formats**: Use a consistent, unambiguous format such as ISO 8601 (`2024-12-31T23:59:59Z`) for datetime defaults to ensure reliable parsing.
> - **pandas defaults**: Using pandas DataFrame or Series as a default value requires the `fabric-user-data-functions` package version 1.0.0 or later in the item environment.

## Display details

You can inspect UDF item metadata and function signatures programmatically.

### Display UDF item details

### [Python](#tab/python)

```python
display(myFunctions.itemDetails)
```

### [Scala](#tab/scala)

```scala
display(myFunctions.itemDetails)
```

### [R](#tab/r)

```r
myFunctions$itemDetails
```

---

### Display function details

### [Python](#tab/python)

```python
display(myFunctions.functionDetails)
```

### [Scala](#tab/scala)

```scala
display(myFunctions.functionDetails)
```

### [R](#tab/r)

```r
myFunctions$functionDetails
```

---

> [!TIP]
> Always inspect `functionDetails` when working with a new UDF item. This helps you verify available functions and their expected parameter types before invocation.

## Error handling

Wrap UDF invocations in language-appropriate error handling to manage missing functions or unexpected parameter types gracefully. Always verify that a function exists in the UDF item before you call it.

### [Python](#tab/python)

```python
import json

try:
    validators = notebookutils.udf.getFunctions('DataValidators')

    # Check if function exists before calling
    functions_info = json.loads(validators.functionDetails)
    function_names = [f['Name'] for f in functions_info]

    if 'validateSchema' in function_names:
        is_valid = validators.validateSchema(
            schema='sales_schema',
            data_path='Files/data/sales.csv'
        )
        print(f"Schema validation: {'passed' if is_valid else 'failed'}")
    else:
        print("validateSchema function not available in this UDF item")
        print(f"Available functions: {', '.join(function_names)}")

except AttributeError as e:
    print(f"Function not found: {e}")
except TypeError as e:
    print(f"Parameter type mismatch: {e}")
except Exception as e:
    print(f"Error invoking UDF: {e}")
```

### [Scala](#tab/scala)

```scala
try {
    val validators = notebookutils.udf.getFunctions("DataValidators")
    val isValid = validators.validateSchema("sales_schema", "Files/data/sales.csv")
    println(s"Schema validation: ${if (isValid) "passed" else "failed"}")
} catch {
    case e: Exception => println(s"Error invoking UDF: ${e.getMessage}")
}
```

### [R](#tab/r)

```r
validators <- notebookutils.udf.getFunctions("DataValidators")

result <- tryCatch({
    validators$validateSchema("sales_schema", "Files/data/sales.csv")
}, error = function(e) {
    print(paste("Error invoking UDF:", e$message))
    NULL
})

if (!is.null(result)) {
    print(paste("Schema validation:", ifelse(result, "passed", "failed")))
}
```

---

### Use UDF functions in a data pipeline

You can compose UDF functions to build reusable ETL steps:

```python
etl_functions = notebookutils.udf.getFunctions('ETLUtilities')

df = spark.read.csv('Files/raw/sales.csv', header=True)
cleaned_df = etl_functions.removeOutliers(df, columns=['amount'])
enriched_df = etl_functions.addCalculatedColumns(cleaned_df)
validated_df = etl_functions.validateAndFilter(enriched_df)

validated_df.write.mode('overwrite').parquet('Files/processed/sales.parquet')
print("ETL pipeline completed using UDF functions")
```

> [!IMPORTANT]
> UDF invocations have overhead. If you call the same function with the same parameters repeatedly, consider caching the result. Avoid calling UDF functions in tight loops when possible.

## Related content

- [NotebookUtils for Fabric](../notebook-utilities.md)
