---
title: NotebookUtils lakehouse utilities for Fabric
description: Use NotebookUtils lakehouse utilities to create, get, update, delete, and manage Lakehouse items programmatically in Fabric notebooks.
ms.reviewer: jingzh
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 03/31/2025
ai-usage: ai-assisted
---

# NotebookUtils lakehouse utilities

Use `notebookutils.lakehouse` to manage Lakehouse items programmatically in Fabric notebooks. You can create, get, update, delete, and list Lakehouses directly from notebook code.

The Lakehouse utilities are available in Python, PySpark, Scala, and R notebooks. The examples on this page use Python as the primary language, with Scala and R equivalents shown for key methods.

> [!NOTE]
> Lakehouse utilities are only supported in Microsoft Fabric. They aren't available in Azure Synapse Analytics.

To display the available methods and their descriptions, call `notebookutils.lakehouse.help()`.

## Overview of methods

The following table summarizes the available methods:

| Method | Description | Returns |
|---|---|---|
| `create` | Creates a new Lakehouse, with optional schema support. | `Artifact` object with properties: `id`, `displayName`, `description`, and `workspaceId`. |
| `get` | Retrieves a Lakehouse by name. | `Artifact` object with basic metadata. |
| `getWithProperties` | Retrieves a Lakehouse with extended properties. | `Artifact` object with extended metadata and connection details. |
| `update` | Updates an existing Lakehouse name or description. | Updated `Artifact` object. |
| `delete` | Deletes a Lakehouse. | `Boolean`. `True` if successful; otherwise, `False`. |
| `list` | Lists Lakehouses in a workspace. | Array of `Artifact` objects. |
| `listTables` | Lists tables in a Lakehouse. | Array of `Table` objects. |
| `loadTable` | Starts a load operation for a Lakehouse table. | `Boolean`. `True` if successful; otherwise, `False`. |

```python
# Method signatures
notebookutils.lakehouse.create(name: String, description: String = "", definition: String = "", workspaceId: String = ""): Artifact
notebookutils.lakehouse.get(name: String, workspaceId: String = ""): Artifact
notebookutils.lakehouse.getWithProperties(name: String, workspaceId: String = ""): Artifact
notebookutils.lakehouse.update(name: String, newName: String, description: String = "", workspaceId: String = ""): Artifact
notebookutils.lakehouse.delete(name: String, workspaceId: String = ""): Boolean
notebookutils.lakehouse.list(workspaceId: String = "", maxResults: Int = 1000): Array[Artifact]
notebookutils.lakehouse.listTables(lakehouse: String = "", workspaceId: String = "", maxResults: Int = 1000): Array[Table]
notebookutils.lakehouse.loadTable(loadOption: String, table: String, lakehouse: String = "", workspaceId: String = ""): Boolean
```

All methods accept an optional `workspaceId` parameter. When omitted, the operation targets the current workspace. Specify a workspace ID for cross-workspace access. You must have appropriate permissions in the target workspace.

## Create a Lakehouse

Use `notebookutils.lakehouse.create()` to create a new Lakehouse in the current workspace or a specified workspace. Lakehouse names must be unique within a workspace.

### Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | String | Yes | Display name of the Lakehouse. Must be unique within the workspace. |
| `description` | String | No | A text description for the Lakehouse. |
| `definition` | String or Dict | No | Creation payload for the Lakehouse. Pass `{"enableSchemas": True}` to enable schema support. |
| `workspaceId` | String | No | Target workspace ID. Defaults to the current workspace. |

### Create a basic Lakehouse

### [Python](#tab/python)

```python
artifact = notebookutils.lakehouse.create("lakehouse_name", "Description of the Lakehouse")
```

### [Scala](#tab/scala)

```scala
val artifact = notebookutils.lakehouse.create("lakehouse_name", "Description of the Lakehouse")
```

### [R](#tab/r)

```r
artifact <- notebookutils.lakehouse.create("lakehouse_name", "Description of the Lakehouse")
```

---

> [!NOTE]
> In Scala, pass the `definition` parameter as a JSON string. In Python, PySpark, and R, you can pass a dictionary or list.

### Create a Lakehouse with schema support

When you enable schema support, the Lakehouse supports multiple schemas for organizing tables. Pass `{"enableSchemas": True}` as the `definition` parameter:

### [Python](#tab/python)

```python
artifact = notebookutils.lakehouse.create(
    "SalesAnalyticsWithSchema",
    "Lakehouse with schema support for multi-tenant data",
    {"enableSchemas": True}
)

print(f"Created lakehouse with schema support: {artifact.displayName}")
print(f"Lakehouse ID: {artifact.id}")
```

### [Scala](#tab/scala)

```scala
val definition = """{"enableSchemas": true}"""

val artifact = notebookutils.lakehouse.create(
    "SalesAnalyticsWithSchema",
    "Lakehouse with schema support for multi-tenant data",
    definition,
    ""
)

println(s"Created lakehouse with schema support: ${artifact.displayName}")
println(s"Lakehouse ID: ${artifact.id}")
```

### [R](#tab/r)

```r
artifact <- notebookutils.lakehouse.create(
    "SalesAnalyticsWithSchema",
    "Lakehouse with schema support for multi-tenant data",
    list(enableSchemas = TRUE)
)

print(paste("Created lakehouse with schema support:", artifact$displayName))
print(paste("Lakehouse ID:", artifact$id))
```

---

### Create a Lakehouse in a different workspace

### [Python](#tab/python)

```python
workspace_id = "aaaaaaaa-1111-2222-3333-bbbbbbbbbbbb"

artifact = notebookutils.lakehouse.create(
    name="SharedAnalytics",
    description="Shared analytics lakehouse",
    workspaceId=workspace_id
)

print(f"Created lakehouse in workspace: {workspace_id}")
```

### [Scala](#tab/scala)

```scala
val workspaceId = "aaaaaaaa-1111-2222-3333-bbbbbbbbbbbb"

val artifact = notebookutils.lakehouse.create(
    "SharedAnalytics",
    "Shared analytics lakehouse",
    workspaceId = workspaceId
)

println(s"Created lakehouse in workspace: ${workspaceId}")
```

### [R](#tab/r)

```r
workspace_id <- "aaaaaaaa-1111-2222-3333-bbbbbbbbbbbb"

artifact <- notebookutils.lakehouse.create(
    "SharedAnalytics",
    "Shared analytics lakehouse",
    workspaceId = workspace_id
)

print(paste("Created lakehouse in workspace:", workspace_id))
```

---

### Batch create Lakehouses

You can create multiple Lakehouses in a loop to provision environments for different teams or projects:

```python
departments = ["Sales", "Marketing", "Finance", "Operations"]

created_lakehouses = []
for dept in departments:
    lakehouse = notebookutils.lakehouse.create(
        name=f"{dept}Analytics",
        description=f"Analytics lakehouse for {dept} department"
    )
    created_lakehouses.append(lakehouse)
    print(f"Created: {lakehouse.displayName}")

print(f"Created {len(created_lakehouses)} lakehouses")
```

> [!TIP]
> Use descriptive names that reflect the Lakehouse purpose and consider naming conventions for environment separation (dev, test, prod).

## Get a Lakehouse

Use `notebookutils.lakehouse.get()` to retrieve a Lakehouse by name.

### Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | String | Yes | Name of the Lakehouse to retrieve. |
| `workspaceId` | String | No | Target workspace ID. Defaults to the current workspace. |

### [Python](#tab/python)

```python
artifact = notebookutils.lakehouse.get("lakehouse_name", "optional_workspace_id")

print(f"Lakehouse Name: {artifact.displayName}")
print(f"Lakehouse ID: {artifact.id}")
print(f"Workspace ID: {artifact.workspaceId}")
```

### [Scala](#tab/scala)

```scala
val artifact = notebookutils.lakehouse.get("lakehouse_name", "optional_workspace_id")
println(s"Lakehouse Name: ${artifact.displayName}")
```

### [R](#tab/r)

```r
artifact <- notebookutils.lakehouse.get("lakehouse_name", "optional_workspace_id")
print(paste("Lakehouse Name:", artifact$displayName))
```

---

### Get a Lakehouse with extended properties

Use `notebookutils.lakehouse.getWithProperties()` when you need extended properties beyond basic metadata, such as connection strings or configuration details:

### [Python](#tab/python)

```python
artifact = notebookutils.lakehouse.getWithProperties("lakehouse_name", "optional_workspace_id")

print(f"Lakehouse: {artifact.displayName}")
print(f"Properties: {artifact.properties}")
```

### [Scala](#tab/scala)

```scala
val artifact = notebookutils.lakehouse.getWithProperties("lakehouse_name", "optional_workspace_id")

println(s"Lakehouse: ${artifact.displayName}")
println(s"Properties: ${artifact.properties}")
```

### [R](#tab/r)

```r
artifact <- notebookutils.lakehouse.getWithProperties("lakehouse_name", "optional_workspace_id")

print(paste("Lakehouse:", artifact$displayName))
print(artifact$properties)
```

---

### Get a Lakehouse from another workspace

### [Python](#tab/python)

```python
workspace_id = "bbbbbbbb-2222-3333-4444-cccccccccccc"
artifact = notebookutils.lakehouse.get("SharedData", workspaceId=workspace_id)

print(f"Retrieved: {artifact.displayName} from workspace {workspace_id}")
```

### [Scala](#tab/scala)

```scala
val workspaceId = "bbbbbbbb-2222-3333-4444-cccccccccccc"
val artifact = notebookutils.lakehouse.get("SharedData", workspaceId)

println(s"Retrieved: ${artifact.displayName} from workspace ${workspaceId}")
```

### [R](#tab/r)

```r
workspace_id <- "bbbbbbbb-2222-3333-4444-cccccccccccc"
artifact <- notebookutils.lakehouse.get("SharedData", workspace_id)

print(paste("Retrieved:", artifact$displayName, "from workspace", workspace_id))
```

---

## Update a Lakehouse

Use `notebookutils.lakehouse.update()` to update the name or description of an existing Lakehouse.

> [!IMPORTANT]
> Renaming a Lakehouse can break downstream dependencies such as notebooks, pipelines, or shortcuts that reference the original name. Coordinate renames with your team before applying them.

### Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | String | Yes | Current name of the Lakehouse. |
| `newName` | String | Yes | New name for the Lakehouse. |
| `description` | String | No | Updated description. |
| `workspaceId` | String | No | Target workspace ID. Defaults to the current workspace. |

### [Python](#tab/python)

```python
updated_artifact = notebookutils.lakehouse.update(
    "old_name",
    "new_name",
    "Updated description",
    "optional_workspace_id"
)

print(f"Updated lakehouse: {updated_artifact.displayName}")
```

### [Scala](#tab/scala)

```scala
val updatedArtifact = notebookutils.lakehouse.update("old_name", "new_name", "Updated description", "optional_workspace_id")
```

### [R](#tab/r)

```r
updated_artifact <- notebookutils.lakehouse.update("old_name", "new_name", "Updated description", "optional_workspace_id")
```

---

## Delete a Lakehouse

Use `notebookutils.lakehouse.delete()` to permanently remove a Lakehouse from a workspace.

> [!CAUTION]
> Deletion is permanent and can't be undone. Verify the Lakehouse name before deleting and check for dependent notebooks, pipelines, or workflows that reference it.

### Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | String | Yes | Name of the Lakehouse to delete. |
| `workspaceId` | String | No | Target workspace ID. Defaults to the current workspace. |

### [Python](#tab/python)

```python
is_deleted = notebookutils.lakehouse.delete("lakehouse_name", "optional_workspace_id")

if is_deleted:
    print("Lakehouse deleted successfully")
else:
    print("Failed to delete lakehouse")
```

### [Scala](#tab/scala)

```scala
val isDeleted = notebookutils.lakehouse.delete("lakehouse_name", "optional_workspace_id")
```

### [R](#tab/r)

```r
is_deleted <- notebookutils.lakehouse.delete("lakehouse_name", "optional_workspace_id")
```

---

## List Lakehouses

Use `notebookutils.lakehouse.list()` to enumerate Lakehouses in a workspace.

### Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `workspaceId` | String | No | Target workspace ID. Defaults to the current workspace. |
| `maxResults` | Int | No | Maximum number of items to return. Defaults to 1000. |

### [Python](#tab/python)

```python
artifacts_list = notebookutils.lakehouse.list("optional_workspace_id")

print(f"Found {len(artifacts_list)} lakehouses:")
for lh in artifacts_list:
    print(f"  - {lh.displayName} (ID: {lh.id})")
```

### [Scala](#tab/scala)

```scala
val artifactsList = notebookutils.lakehouse.list("optional_workspace_id")
```

### [R](#tab/r)

```r
artifacts_list <- notebookutils.lakehouse.list("optional_workspace_id")
```

---

> [!NOTE]
> In Scala, the `list` method doesn't support the `maxResults` parameter. Use `list(workspaceId)` instead.

## List tables

Use `notebookutils.lakehouse.listTables()` to list all tables in a Lakehouse.

### Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `lakehouse` | String | Yes | Name of the Lakehouse. |
| `workspaceId` | String | No | Target workspace ID. Defaults to the current workspace. |
| `maxResults` | Int | No | Maximum number of items to return. Defaults to 1000. |

### [Python](#tab/python)

```python
artifacts_tables_list = notebookutils.lakehouse.listTables("lakehouse_name", "optional_workspace_id")
```

### [Scala](#tab/scala)

```scala
val tables = notebookutils.lakehouse.listTables("lakehouse_name", "optional_workspace_id")
```

### [R](#tab/r)

```r
tables <- notebookutils.lakehouse.listTables("lakehouse_name", "optional_workspace_id")
```

---

## Load table

Use `notebookutils.lakehouse.loadTable()` to load data from files into a Lakehouse table.

### Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `loadOption` | String or Dict | Yes | A JSON string or dictionary specifying the file path, mode, format, and other load options. |
| `table` | String | Yes | Name of the target table. |
| `lakehouse` | String | Yes | Name of the Lakehouse. |
| `workspaceId` | String | No | Target workspace ID. Defaults to the current workspace. |

The `loadOption` dictionary supports the following keys:

| Key | Description |
|---|---|
| `relativePath` | Path to the source file relative to the Lakehouse root (for example, `Files/myFile.csv`). |
| `pathType` | Type of path. Use `File` for a single file. |
| `mode` | Load mode, such as `Overwrite` or `Append`. |
| `recursive` | Set to `True` to include files in subfolders. |
| `formatOptions` | A dictionary with format-specific settings like `format`, `header`, and `delimiter`. |

**Example:**

### [Python](#tab/python)

```python
result = notebookutils.lakehouse.loadTable(
    {
        "relativePath": "Files/myFile.csv",
        "pathType": "File",
        "mode": "Overwrite",
        "recursive": False,
        "formatOptions": {
            "format": "Csv",
            "header": True,
            "delimiter": ","
        }
    }, "table_name", "lakehouse_name", "optional_workspace_id")

if result:
    print("Table loaded successfully")
else:
    print("Table load failed")
```

### [Scala](#tab/scala)

```scala
val result = notebookutils.lakehouse.loadTable(
    Map(
        "relativePath" -> "Files/myFile.csv",
        "pathType" -> "File",
        "mode" -> "Overwrite",
        "recursive" -> false,
        "formatOptions" -> Map(
            "format" -> "Csv",
            "header" -> true,
            "delimiter" -> ","
        )
    ),
    "table_name",
    "lakehouse_name",
    "optional_workspace_id"
)

println(s"Table loaded successfully: ${result}")
```

### [R](#tab/r)

```r
result <- notebookutils.lakehouse.loadTable(
    list(
        relativePath = "Files/myFile.csv",
        pathType = "File",
        mode = "Overwrite",
        recursive = FALSE,
        formatOptions = list(
            format = "Csv",
            header = TRUE,
            delimiter = ","
        )
    ),
    "table_name",
    "lakehouse_name",
    "optional_workspace_id"
)

print(paste("Table loaded successfully:", result))
```

---

## Related content

- [NotebookUtils for Fabric](../notebook-utilities.md)
