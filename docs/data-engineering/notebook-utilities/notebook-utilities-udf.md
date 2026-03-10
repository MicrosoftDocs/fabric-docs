---
title: NotebookUtils User Data Function (UDF) utilities for Fabric
description: Use NotebookUtils UDF utilities to retrieve and invoke User Data Functions from Fabric notebooks.
ms.reviewer: jingzh
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 03/31/2025
---

# NotebookUtils User Data Function (UDF) utilities for Fabric

The `notebookutils.udf` module provides utilities for integrating notebook code with User Data Function (UDF) items. You can access functions from a UDF item within the same workspace or across different workspaces, and then invoke those functions as needed. UDF items promote code reusability, centralized maintenance, and team collaboration.

Key capabilities:

- **Function retrieval** – Access functions from UDF items by name.
- **Cross-workspace access** – Use functions from UDF items in other workspaces.
- **Function discovery** – Inspect available functions and their signatures.
- **Flexible invocation** – Call functions with positional or named parameters.

> [!NOTE]
> You need read access to a UDF item in the target workspace to retrieve its functions. Exceptions from UDF functions propagate to the calling notebook.

The following table lists the available UDF methods:

| Method | Signature | Description |
|---|---|---|
| `getFunctions` | `getFunctions(udf: String, workspaceId: String = ""): UDFFunctions` | Retrieves all functions from a UDF item by artifact ID or name. Returns an object with callable function attributes. |

The returned object also exposes:

| Property | Description |
|---|---|
| `functionDetails` | A list of function metadata dictionaries with keys: `Name`, `Description`, `Parameters`, `FunctionReturnType`, and `DataSourceConnections`. |
| `itemDetails` | A dictionary of UDF item metadata with keys: `Id`, `Name`, `WorkspaceId`, and `CapacityId`. |

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
var myFunctions = notebookutils.udf.getFunctions("UDFItemName")
var myFunctions = notebookutils.udf.getFunctions("UDFItemName", "workspaceId")
```

---

> [!TIP]
> Retrieve UDF functions once and reuse the wrapper object. Avoid calling `getFunctions()` repeatedly in a loop—cache the result instead.

## Invoke a function

After retrieving functions from a UDF item, call them by name with positional or named parameters.

### [Python](#tab/python)

```python
# Positional parameters
myFunctions.functionName('value1', 'value2')

# Named parameters (recommended for clarity)
myFunctions.functionName(parameter1='value1', parameter2='value2')
```

### [Scala](#tab/scala)

```scala
val res = myFunctions.functionName('value1', 'value2'...)
```

### [R](#tab/r)

```r
myFunctions$functionName('value1', 'value2'...)
```

---

## Display details

You can inspect UDF item metadata and function signatures programmatically.

### Display UDF item details

### [Python](#tab/python)

```python
display([myFunctions.itemDetails])
```

### [Scala](#tab/scala)

```scala
display(Array(myFunctions.itemDetails))
```

### [R](#tab/r)

```r
myFunctions$itemDetails()
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
myFunctions$functionDetails()
```

---

> [!TIP]
> Always inspect `functionDetails` when working with a new UDF item. This helps you verify available functions and their expected parameter types before invocation.

## Error handling

Wrap UDF invocations in `try-except` blocks to handle missing functions or unexpected parameter types gracefully.

```python
try:
    validators = notebookutils.udf.getFunctions('DataValidators')

    # Check if function exists before calling
    functions_info = validators.functionDetails
    function_names = [f['Name'] for f in functions_info]

    if 'validateSchema' in function_names:
        is_valid = validators.validateSchema(
            schema='sales_schema',
            data_path='Files/data/sales.csv'
        )
        print(f"Schema validation: {'passed' if is_valid else 'failed'}")
    else:
        print("validateSchema function not available")

except AttributeError as e:
    print(f"Function not found: {e}")
except Exception as e:
    print(f"Error invoking UDF: {e}")
```

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
