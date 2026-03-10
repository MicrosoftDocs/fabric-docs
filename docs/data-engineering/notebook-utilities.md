---
title: NotebookUtils (former MSSparkUtils) for Fabric
description: Use NotebookUtils, a built-in package for Fabric Notebook, to work with file systems, modularize and chain notebooks together, manage data engineering items, and work with credentials.
ms.reviewer: jingzh
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.search.form: Microsoft Spark utilities, Microsoft NotebookUtils
ms.date: 03/31/2025
---

# NotebookUtils (former MSSparkUtils) for Fabric

Notebook Utilities (NotebookUtils) is a built-in package to help you easily perform common tasks in Fabric Notebook. You can use NotebookUtils to work with file systems, to get environment variables, to chain notebooks together, and to work with secrets. The NotebookUtils package is available in PySpark (Python) Scala, SparkR notebooks, and Fabric pipelines.

> [!NOTE]
> - MsSparkUtils is officially renamed to **NotebookUtils**. The existing code remains **backward compatible** and doesn't cause any breaking changes. It's **strongly recommended** to upgrade to notebookutils to ensure continued support and access to new features. The mssparkutils namespace will be retired in the future.
> - NotebookUtils is designed to work with **Spark 3.4 (Runtime v1.2) and above**. All new features and updates are exclusively supported with the notebookutils namespace going forward.

## NotebookUtils modules

NotebookUtils provides the following modules. Select a module to see detailed documentation, code examples, and best practices.

| Module | Namespace | Description |
|---|---|---|
| [File system utilities](notebook-utilities/notebook-utilities-file-system.md) | `notebookutils.fs` | Work with files and directories across ADLS Gen2, Azure Blob Storage, and Lakehouse storage. Includes copy, move, read, write, delete, and list operations. |
| [File mount and unmount](notebook-utilities/notebook-utilities-mount.md) | `notebookutils.fs` | Attach remote storage (ADLS Gen2) to Spark nodes as local mount points for simplified file access. |
| [Notebook run and orchestration](notebook-utilities/notebook-utilities-notebook-run.md) | `notebookutils.notebook` | Run and chain notebooks together, including parallel execution with DAG support, cross-workspace references, and exit values. |
| [Notebook management](notebook-utilities/notebook-utilities-notebook-management.md) | `notebookutils.notebook` | Programmatically create, get, update, delete, and list notebook artifacts. |
| [Credentials utilities](notebook-utilities/notebook-utilities-credentials.md) | `notebookutils.credentials` | Get access tokens for Azure services and retrieve secrets from Azure Key Vault. |
| [Lakehouse utilities](notebook-utilities/notebook-utilities-lakehouse.md) | `notebookutils.lakehouse` | Create, get, update, delete, and manage Lakehouse items and tables programmatically. |
| [Runtime context](notebook-utilities/notebook-utilities-runtime.md) | `notebookutils.runtime` | Access session context information including notebook name, workspace details, and execution context. |
| [Session management](notebook-utilities/notebook-utilities-session-management.md) | `notebookutils.session` | Stop interactive sessions and restart the Python interpreter. |
| [User Data Function (UDF) utilities](notebook-utilities/notebook-utilities-udf.md) | `notebookutils.udf` | Retrieve and invoke User Data Functions from notebooks. |
| [Variable library utilities](notebook-utilities/notebook-utilities-variable-library.md) | `notebookutils.variableLibrary` | Access centrally managed variables and configuration from Variable Library items. |

To get an overview of all available modules and methods, run:

```python
notebookutils.help()
```

To get help for a specific module, run:

```python
notebookutils.fs.help()
notebookutils.notebook.help()
notebookutils.credentials.help()
```

## Known issues

- When using runtime version above 1.2 and running `notebookutils.help()`, the listed **fabricClient** and **PBIClient** APIs aren't supported yet, but they'll be available in a future release.

## Related content

- [Microsoft Spark Utilities (MSSparkUtils) for Fabric](microsoft-spark-utilities.md)
- [Develop, execute, and manage Microsoft Fabric notebooks](author-execute-notebook.md)
- [Manage and execute notebooks in Fabric with APIs](notebook-public-api.md)

