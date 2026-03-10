---
title: NotebookUtils notebook management for Fabric
description: Use NotebookUtils to create, get, update, delete, and list notebook artifacts programmatically in Microsoft Fabric.
ms.reviewer: jingzh
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 03/31/2025
---

# Manage notebook artifacts with NotebookUtils

`notebookutils.notebook` provides utilities for managing notebook items programmatically in Microsoft Fabric. You can use these APIs to create, retrieve, update, delete, and list notebook artifacts, which enables automation of notebook deployment, lifecycle management, and CI/CD integration.

> [!NOTE]
> These APIs are supported only in Fabric notebooks, not in Azure Synapse. The user must have appropriate permissions in the target workspace for each operation.

The following table lists the available notebook management methods:

| Method | Signature | Description |
|---|---|---|
| `create` | `create(name, description, content, defaultLakehouse, defaultLakehouseWorkspace, workspaceId): Artifact` | Creates a new notebook. |
| `get` | `get(name, workspaceId): Artifact` | Retrieves a notebook by name or ID. |
| `getDefinition` | `getDefinition(name, workspaceId, format): String` | Retrieves the notebook definition (content). |
| `update` | `update(name, newName, description, workspaceId): Artifact` | Updates notebook metadata. |
| `updateDefinition` | `updateDefinition(name, content, defaultLakehouse, defaultLakehouseWorkspace, workspaceId, environmentId, environmentWorkspaceId): bool` | Updates the notebook definition and lakehouse. |
| `delete` | `delete(name, workspaceId): Boolean` | Deletes a notebook. |
| `list` | `list(workspaceId, maxResults): Array[Artifact]` | Lists all notebooks in a workspace. |

## Create a notebook

Use `notebookutils.notebook.create()` to create a new notebook artifact in the current workspace or a specified workspace.

### Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | String | Yes | Display name for the new notebook. Must be unique within the workspace. |
| `description` | String | No | Description of the notebook. Defaults to empty. |
| `content` | String, bytes, or dict | No | Notebook content in valid `.ipynb` JSON format. Can also be raw bytes or a dict object. |
| `defaultLakehouse` | String | No | Name or ID of the default lakehouse to attach. |
| `defaultLakehouseWorkspace` | String | No | Workspace ID of the default lakehouse. Leave empty for the current workspace. |
| `workspaceId` | String | No | Target workspace ID. Leave empty for the current workspace. |

> [!IMPORTANT]
> You must provide valid `.ipynb` format content when you create a notebook. At minimum, provide a valid empty notebook structure.

### Create a notebook from a template

```python
# Read notebook template from a file
with open("/path/to/template.ipynb", "r") as f:
    notebook_content = f.read()

# Create the notebook
notebook = notebookutils.notebook.create(
    name="ProcessingNotebook",
    description="Data processing notebook from template",
    content=notebook_content
)

print(f"Created notebook: {notebook.displayName} (ID: {notebook.id})")
```

### Create a notebook with a default lakehouse

```python
# Minimum valid notebook content - content can't be empty
minimal_content = '''{
    "cells": [],
    "metadata": {},
    "nbformat": 4,
    "nbformat_minor": 5
}'''

# Create notebook with default lakehouse configuration
notebook = notebookutils.notebook.create(
    name="DataAnalysis",
    description="Analysis notebook with lakehouse access",
    content=minimal_content,
    defaultLakehouse="MyLakehouse",
    defaultLakehouseWorkspace=""  # Current workspace
)

print(f"Created notebook with lakehouse: {notebook.displayName}")
```

### Create a notebook in another workspace

```python
with open("/path/to/notebook.ipynb", "r") as f:
    content = f.read()

notebook = notebookutils.notebook.create(
    name="SharedNotebook",
    description="Notebook for the shared workspace",
    content=content,
    workspaceId="bbbbbbbb-2222-3333-4444-cccccccccccc"
)

print(f"Created in remote workspace: {notebook.displayName}")
```

### Create multiple notebooks from a template

```python
# Load template content (must be valid .ipynb)
with open("/path/to/template.ipynb", "r") as f:
    template_content = f.read()

regions = ["US", "EU", "Asia"]

created_notebooks = []
for region in regions:
    notebook = notebookutils.notebook.create(
        name=f"Process_{region}",
        description=f"Processing notebook for {region} region",
        content=template_content,
        defaultLakehouse=f"Lakehouse_{region}"
    )
    created_notebooks.append(notebook)
    print(f"Created: {notebook.displayName}")

print(f"\nCreated {len(created_notebooks)} notebooks")
```

> [!TIP]
> Provide meaningful names and descriptions for your notebooks to make them easier to find. Use a consistent naming convention such as `<Project>_<Purpose>_<Region>` for automated deployments.

## Get a notebook

Use `notebookutils.notebook.get()` to retrieve notebook metadata by name or ID. This method returns an `Artifact` object with properties like `displayName`, `id`, and `description`.

### Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | String | Yes | Name or ID of the notebook to retrieve. |
| `workspaceId` | String | No | Workspace ID. Leave empty for the current workspace. |

### Get a notebook from the current workspace

```python
notebook = notebookutils.notebook.get("MyNotebook")

print(f"Notebook Name: {notebook.displayName}")
print(f"Notebook ID: {notebook.id}")
print(f"Description: {notebook.description}")
```

### Get a notebook from another workspace

```python
workspace_id = "bbbbbbbb-2222-3333-4444-cccccccccccc"
notebook = notebookutils.notebook.get("SharedNotebook", workspaceId=workspace_id)

print(f"Retrieved: {notebook.displayName} from workspace {workspace_id}")
```

> [!TIP]
> Use `get()` before update or delete operations to verify that the target notebook exists. You can also use it to check if a notebook name is already taken before you create a new one.

## Get a notebook definition

> [!NOTE]
> The `getDefinition()` method isn't available in R. Use Python or Scala to retrieve notebook definitions.

Use `notebookutils.notebook.getDefinition()` to retrieve the full notebook content in `.ipynb` format. This method is useful for backup, migration, version control, and content analysis scenarios.

### Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | String | Yes | Name or ID of the notebook. |
| `workspaceId` | String | No | Workspace ID. Leave empty for the current workspace. |
| `format` | String | No | Output format. Defaults to `"ipynb"`. |

### Retrieve and save a notebook definition

### [Python](#tab/python)

```python
# Retrieve notebook definition as .ipynb content
notebook_content = notebookutils.notebook.getDefinition("MyNotebook")

# Save to a file for backup
with open("/path/to/backup/MyNotebook.ipynb", "w") as f:
    f.write(notebook_content)

print("Notebook definition retrieved and saved")
```

### [Scala](#tab/scala)

```scala
// Retrieve notebook definition in Scala
val content = notebookutils.notebook.getDefinition("MyNotebook")

println(s"Retrieved notebook content (${content.length} characters)")
```

---

### Get a notebook definition from another workspace

```python
workspace_id = "cccccccc-3333-4444-5555-dddddddddddd"
notebook_content = notebookutils.notebook.getDefinition(
    name="SharedNotebook",
    workspaceId=workspace_id,
    format="ipynb"
)

print(f"Retrieved definition from workspace {workspace_id}")
```

### Export all notebooks for backup

```python
import os
from datetime import datetime

def export_all_notebooks(backup_dir="/path/to/backups"):
    """Export all notebooks in the workspace for backup."""

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    export_dir = f"{backup_dir}/backup_{timestamp}"
    os.makedirs(export_dir, exist_ok=True)

    notebooks = notebookutils.notebook.list()
    print(f"Exporting {len(notebooks)} notebooks to {export_dir}")

    exported_count = 0
    for nb in notebooks:
        try:
            content = notebookutils.notebook.getDefinition(nb.displayName)
            filename = f"{export_dir}/{nb.displayName}.ipynb"
            with open(filename, "w") as f:
                f.write(content)
            exported_count += 1
            print(f"Exported: {nb.displayName}")
        except Exception as e:
            print(f"Failed to export {nb.displayName}: {e}")

    print(f"\nExported {exported_count} of {len(notebooks)} notebooks")
    return export_dir

backup_location = export_all_notebooks()
```

## Update a notebook

Use `notebookutils.notebook.update()` to change a notebook's metadata, such as its display name and description. This method doesn't modify the notebook's content or lakehouse configuration.

### Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | String | Yes | Current name or ID of the notebook. |
| `newName` | String | Yes | New display name for the notebook. |
| `description` | String | No | Updated description. |
| `workspaceId` | String | No | Workspace ID. Leave empty for the current workspace. |

### Rename a notebook

```python
updated_notebook = notebookutils.notebook.update(
    name="OldNotebookName",
    newName="NewNotebookName",
    description="Updated description with more details"
)

print(f"Updated notebook: {updated_notebook.displayName}")
```

## Update a notebook definition

Use `notebookutils.notebook.updateDefinition()` to modify a notebook's content, default lakehouse, or both. Use this method when you need to change what's inside a notebook rather than its metadata.

### Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | String | Yes | Name or ID of the notebook to update. |
| `content` | String | No | New notebook content in `.ipynb` format. |
| `defaultLakehouse` | String | No | New default lakehouse name. |
| `defaultLakehouseWorkspace` | String | No | Workspace ID of the new default lakehouse. Leave empty for the current workspace. |
| `workspaceId` | String | No | Workspace ID. Leave empty for the current workspace. |
| `environmentId` | String | No | Environment ID to attach to the notebook. |
| `environmentWorkspaceId` | String | No | Workspace ID of the environment. Leave empty for the current workspace. |

> [!NOTE]
> The `environmentId` and `environmentWorkspaceId` parameters are only available in the Spark notebook runtime. Python notebooks don't support these parameters.

### Update notebook content
# Load new content
with open("/path/to/updated_notebook.ipynb", "r") as f:
    new_content = f.read()

is_updated = notebookutils.notebook.updateDefinition(
    name="MyNotebook",
    content=new_content
)

print(f"Notebook definition updated: {is_updated}")
```

### Change the default lakehouse

```python
is_updated = notebookutils.notebook.updateDefinition(
    name="MyNotebook",
    defaultLakehouse="NewLakehouse",
    defaultLakehouseWorkspace=""  # Current workspace
)

print(f"Default lakehouse updated: {is_updated}")
```

### Update both content and lakehouse

```python
with open("/path/to/new_version.ipynb", "r") as f:
    new_content = f.read()

is_updated = notebookutils.notebook.updateDefinition(
    name="MyNotebook",
    content=new_content,
    defaultLakehouse="ProductionLakehouse",
    defaultLakehouseWorkspace=""
)

print(f"Notebook fully updated: {is_updated}")
```

> [!TIP]
> Use `update()` for metadata changes (name, description) and `updateDefinition()` for content and lakehouse changes. When you need a full refresh of both metadata and content, call both methods in sequence.

## Delete a notebook

Use `notebookutils.notebook.delete()` to permanently remove a notebook from a workspace. This method returns `True` if the deletion succeeds and `False` otherwise.

### Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | String | Yes | Name or ID of the notebook to delete. |
| `workspaceId` | String | No | Workspace ID. Leave empty for the current workspace. |

> [!IMPORTANT]
> Deletion is permanent. Deleted notebooks can't be recovered. Always verify the notebook name before you delete, and consider backing up the notebook definition with `getDefinition()` first.

### Delete a notebook

### [Python](#tab/python)

```python
is_deleted = notebookutils.notebook.delete("ObsoleteNotebook")

if is_deleted:
    print("Notebook deleted successfully")
else:
    print("Failed to delete notebook")
```

### [Scala](#tab/scala)

```scala
// Delete a notebook in Scala
val isDeleted = notebookutils.notebook.delete("ObsoleteNotebook")

if (isDeleted) println("Deleted") else println("Failed to delete")
```

---

### Safely clean up notebooks by pattern

```python
def cleanup_notebooks(name_pattern, dry_run=True):
    """Delete notebooks matching a name pattern."""

    notebooks = notebookutils.notebook.list()
    to_delete = [nb for nb in notebooks if name_pattern in nb.displayName]

    print(f"Found {len(to_delete)} notebooks matching '{name_pattern}':")
    for nb in to_delete:
        print(f"  - {nb.displayName}")

    if dry_run:
        print("\nDRY RUN - No notebooks deleted")
        return

    deleted_count = 0
    for nb in to_delete:
        if notebookutils.notebook.delete(nb.displayName):
            deleted_count += 1
            print(f"Deleted: {nb.displayName}")
        else:
            print(f"Failed to delete: {nb.displayName}")

    print(f"\nDeleted {deleted_count} of {len(to_delete)} notebooks")

# Always run with dry_run=True first to preview
cleanup_notebooks("temp_", dry_run=True)
```

> [!TIP]
> For safe bulk deletion, always run with `dry_run=True` first to preview which notebooks will be removed. Consider renaming notebooks with a `_TO_DELETE` prefix instead of deleting them immediately, so you can recover them if needed.

## List notebooks

Use `notebookutils.notebook.list()` to enumerate all notebooks in a workspace. This method returns an array of `Artifact` objects.

### Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `workspaceId` | String | No | Workspace ID. Leave empty for the current workspace. |
| `maxResults` | Int | No | Maximum number of results to return. Defaults to 1000. |

### List all notebooks in the current workspace

### [Python](#tab/python)

```python
notebooks = notebookutils.notebook.list()

print(f"Found {len(notebooks)} notebooks:")
for nb in notebooks:
    print(f"  - {nb.displayName} (ID: {nb.id})")
```

### [Scala](#tab/scala)

```scala
// List all notebooks in Scala
val notebooks = notebookutils.notebook.list()

println(s"Found ${notebooks.length} notebooks")
notebooks.foreach(nb => println(s"  - ${nb.displayName}"))
```

---

### List notebooks in another workspace

```python
workspace_id = "cccccccc-3333-4444-5555-dddddddddddd"
notebooks = notebookutils.notebook.list(workspaceId=workspace_id)

print(f"Found {len(notebooks)} notebooks in workspace {workspace_id}")
```

### Filter notebooks by name pattern

```python
all_notebooks = notebookutils.notebook.list()

# Filter for notebooks that start with a specific prefix
processing_notebooks = [nb for nb in all_notebooks if nb.displayName.startswith("Process_")]

print(f"Found {len(processing_notebooks)} processing notebooks:")
for nb in processing_notebooks:
    print(f"  - {nb.displayName}")
```

### Clone a notebook

Use `list()` and `getDefinition()` together to clone a notebook within the same workspace or to another workspace.

```python
def clone_notebook(source_name, target_name, target_workspace=""):
    """Clone a notebook by retrieving its content and creating a copy."""

    source = notebookutils.notebook.get(source_name)
    content = notebookutils.notebook.getDefinition(source_name)

    cloned = notebookutils.notebook.create(
        name=target_name,
        description=f"Clone of {source_name}",
        content=content,
        workspaceId=target_workspace
    )

    print(f"Cloned {source_name} to {cloned.displayName}")
    return cloned

cloned_notebook = clone_notebook("TemplateNotebook", "NewInstance")
```

### Migrate a notebook to another workspace

```python
def migrate_notebook(name, target_workspace_id, new_name=None):
    """Migrate a notebook from the current workspace to another workspace."""

    content = notebookutils.notebook.getDefinition(name)
    target_name = new_name if new_name else name

    migrated = notebookutils.notebook.create(
        name=target_name,
        description=f"Migrated from {name}",
        content=content,
        workspaceId=target_workspace_id
    )

    print(f"Migrated {name} to workspace {target_workspace_id} as {target_name}")
    return migrated

target_ws = "dddddddd-4444-5555-6666-eeeeeeeeeeee"
migrated_nb = migrate_notebook("DataPipeline", target_ws, "DataPipeline_v2")
```

## Related content

- [NotebookUtils for Fabric](../notebook-utilities.md)
- [NotebookUtils notebook run](notebook-utilities-notebook-run.md)
