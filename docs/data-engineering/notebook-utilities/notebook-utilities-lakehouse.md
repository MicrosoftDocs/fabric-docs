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

`notebookutils.lakehouse` provides utilities tailored for managing Lakehouse items programmatically. These utilities empower you to create, get, update, and delete Lakehouse artifacts directly from Fabric notebooks.

The Lakehouse utilities are available in Python, PySpark, Scala, and R notebooks. The examples on this page use Python as the primary language, with Scala and R equivalents shown for key methods.

> [!NOTE]
> Lakehouse utilities are only supported in Microsoft Fabric. They aren't available in Azure Synapse Analytics.

To display the available methods and their descriptions, call `notebookutils.lakehouse.help()`.

## Overview of methods

The following table summarizes the available methods:

| Method | Description |
|---|---|
| `create` | Creates a new Lakehouse, with optional schema support. |
| `get` | Retrieves a Lakehouse artifact by name. |
| `getWithProperties` | Retrieves a Lakehouse artifact with extended properties. |
| `update` | Updates an existing Lakehouse name or description. |
| `delete` | Deletes a Lakehouse artifact. |
| `list` | Lists all Lakehouse artifacts in a workspace. |
| `listTables` | Lists all tables in a Lakehouse. |
| `loadTable` | Starts a load table operation in a Lakehouse. |

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
artifact = notebookutils.lakehouse.create("artifact_name", "Description of the artifact")
```

### [Scala](#tab/scala)

```scala
val artifact = notebookutils.lakehouse.create("artifact_name", "Description of the artifact")
```

### [R](#tab/r)

```r
artifact <- notebookutils.lakehouse.create("artifact_name", "Description of the artifact")
```

---

> [!NOTE]
> In Scala, the `create` method doesn't support the `definition` parameter. Schema-enabled Lakehouse creation is available in Python, PySpark, and R.

### Create a Lakehouse with schema support

When you enable schema support, the Lakehouse supports multiple schemas for organizing tables. Pass `{"enableSchemas": True}` as the `definition` parameter:

```python
artifact = notebookutils.lakehouse.create(
    "SalesAnalyticsWithSchema",
    "Lakehouse with schema support for multi-tenant data",
    {"enableSchemas": True}
)

print(f"Created lakehouse with schema support: {artifact.displayName}")
print(f"Lakehouse ID: {artifact.id}")
```

### Create a Lakehouse in a different workspace

```python
workspace_id = "aaaaaaaa-1111-2222-3333-bbbbbbbbbbbb"

artifact = notebookutils.lakehouse.create(
    name="SharedAnalytics",
    description="Shared analytics lakehouse",
    workspaceId=workspace_id
)

print(f"Created lakehouse in workspace: {workspace_id}")
```

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

Use `notebookutils.lakehouse.get()` to retrieve a Lakehouse artifact by name.

### Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | String | Yes | Name of the Lakehouse to retrieve. |
| `workspaceId` | String | No | Target workspace ID. Defaults to the current workspace. |

### [Python](#tab/python)

```python
artifact = notebookutils.lakehouse.get("artifact_name", "optional_workspace_id")

print(f"Lakehouse Name: {artifact.displayName}")
print(f"Lakehouse ID: {artifact.id}")
print(f"Workspace ID: {artifact.workspaceId}")
```

### [Scala](#tab/scala)

```scala
val artifact = notebookutils.lakehouse.get("artifact_name", "optional_workspace_id")
println(s"Lakehouse Name: ${artifact.displayName}")
```

### [R](#tab/r)

```r
artifact <- notebookutils.lakehouse.get("artifact_name", "optional_workspace_id")
print(paste("Lakehouse Name:", artifact$displayName))
```

---

### Get a Lakehouse with extended properties

Use `notebookutils.lakehouse.getWithProperties()` when you need extended properties beyond basic metadata, such as connection strings or configuration details:

```python
artifact = notebookutils.lakehouse.getWithProperties("artifact_name", "optional_workspace_id")

print(f"Lakehouse: {artifact.displayName}")
print(f"Properties: {artifact.properties}")
```

### Get a Lakehouse from another workspace

```python
workspace_id = "bbbbbbbb-2222-3333-4444-cccccccccccc"
artifact = notebookutils.lakehouse.get("SharedData", workspaceId=workspace_id)

print(f"Retrieved: {artifact.displayName} from workspace {workspace_id}")
```

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
is_deleted = notebookutils.lakehouse.delete("artifact_name", "optional_workspace_id")

if is_deleted:
    print("Lakehouse deleted successfully")
else:
    print("Failed to delete lakehouse")
```

### [Scala](#tab/scala)

```scala
val isDeleted = notebookutils.lakehouse.delete("artifact_name", "optional_workspace_id")
```

### [R](#tab/r)

```r
is_deleted <- notebookutils.lakehouse.delete("artifact_name", "optional_workspace_id")
```

---

## List Lakehouses

Use `notebookutils.lakehouse.list()` to enumerate all Lakehouse artifacts in a workspace.

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
artifacts_tables_list = notebookutils.lakehouse.listTables("artifact_name", "optional_workspace_id")
```

### [Scala](#tab/scala)

```scala
val tables = notebookutils.lakehouse.listTables("artifact_name", "optional_workspace_id")
```

### [R](#tab/r)

```r
tables <- notebookutils.lakehouse.listTables("artifact_name", "optional_workspace_id")
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

```python
notebookutils.lakehouse.loadTable(
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
    }, "table_name", "artifact_name", "optional_workspace_id")
```

## Related content

- [NotebookUtils for Fabric](../notebook-utilities.md)
