---
title: Materialized lake views notebook utilities (Preview)
description: Learn how to use notebook utilities for materialized lake views in Fabric.
ms.topic: how-to
ms.reviewer: bsankaran, sairamyeturi, nijelsf, hgowrisankar
ms.date: 08/27/2026
#customer intent: As a data engineer, I want to use notebook utilities for Materialized Lake Views in Fabric so that I can interact with and manage Materialized Lake Views from a notebook.
---

# Materialized lake view notebook utilities (preview)

This article describes how to use notebook utilities for materialized lake views (MLVs) from Fabric notebooks. Materialized lake view notebook utilities provide the recommended way to trigger materialized lake view refreshes from Fabric notebooks. While notebook-based refreshes are convenient for development, testing, troubleshooting, and ad hoc execution scenarios, they don't provide the full lakehouse refresh orchestration experience, including scheduled lineage-aware refreshes, dependency-aware orchestration, and centralized monitoring. For production workloads, use lakehouse lineage and scheduled refresh capabilities to manage refreshes across dependent materialized lake views. You can access materialized lake view notebook utilities through the `notebookutils.lakehouse` module.

> [!TIP]
> To create your first materialized lake view, see [Get started with materialized lake views](./get-started-with-materialized-lake-views.md).

> [!NOTE]
> Materialized lake view notebook utilities are supported with **Spark 4.0**.

## Prerequisites

Before using materialized lake view notebook utilities, ensure you have the following prerequisites:

- A Fabric workspace that contains a lakehouse.
- A lakehouse that has one or more materialized lake views.
- A notebook that has the appropriate lakehouse attached.

## Discover available notebook utilities

The following materialized lake view notebook utility is currently available:

| Utility | Description |
|----------|-------------|
| `refreshMlv` | Starts a materialized lake view refresh operation. |

Use the `help` command to view documentation for materialized lake view notebook utilities. The help output displays the API signature, parameters, and return type.

```python
notebookutils.lakehouse.help("refreshMlv")
```

## Refresh a materialized lake view


Use the `refreshMlv` API to start a materialized lake view refresh.

### Syntax

```python
notebookutils.lakehouse.refreshMlv(
    name: str,
    refreshMode: str = "optimal"
)
```

### Arguments

| Parameter | Description |
|-|-|
| `name` | Name of the materialized lake view to refresh. |
| `refreshMode` | Refresh mode. Supported values are `optimal` and `full`. |

### Returns

Returns a `RefreshMlvOperation` object.

The refresh request is submitted asynchronously and immediately returns an operation handle.

### Example

```python
from notebookutils import lakehouse

op = lakehouse.refreshMlv("sales_summary")
```

## Specify a refresh mode

The `refreshMode` argument controls how the refresh request is executed.

### Optimal refresh

`optimal` is the default refresh mode.

```python
from notebookutils import lakehouse

op = lakehouse.refreshMlv(
    "sales_summary",
    refreshMode="optimal"
)
```

### Full refresh

Use `full` to force a complete recomputation of the materialized lake view.

```python
from notebookutils import lakehouse

op = lakehouse.refreshMlv(
    "sales_summary",
    refreshMode="full"
)
```

## Monitor refresh progress

The `refreshMlv` API returns an operation handle that you can use to check the refresh status.

```python
op.status()
```


```python
from notebookutils import lakehouse

op = lakehouse.refreshMlv("sales_summary")

print(op.status())
```

## View run details and logs

When you submit a refresh request, the notebook output includes a link to the associated run details page.

```text
View run details and logs: ...
```

Use the run details page to:

- Monitor refresh progress.
- Review refresh execution status.
- Access refresh logs.

## Common errors

### Materialized lake view not found

This error occurs when the specified materialized lake view doesn't exist in the lakehouse.

```python
lakehouse.refreshMlv("sales_summary_v2")
```

Example error:

```text
MLV_SELECTED_NOT_FOUND:
One or more selected materialized lake views [sales_summary_v2] do not exist in the Lakehouse.
```

Verify that the materialized lake view exists and that the specified name is correct.

## Use Lakehouse refresh orchestration for production workloads

> [!TIP]
> **Manage materialized lake view refresh from your lakehouse**
>
> Use notebook-based refresh for development, validation, testing, and ad hoc execution scenarios.
>
> For production workloads, use the built-in lakehouse capabilities:
>
> * **Lineage**: View dependencies between materialized lake views and monitor refresh execution.
> * **Scheduled refresh**: Create schedules to refresh all materialized lake views or a selected subset.
>
> These experiences automatically manage refresh ordering across dependent materialized lake views and provide a centralized monitoring experience.

## Current limitations

The following limitations apply to materialized lake view notebook refresh:

* Refresh requests are asynchronous and return immediately with an operation handle.
* Notebook-based refresh is intended for interactive and development workflows. For production orchestration, use lineage and scheduled refresh.

## Related content

* [Get started with materialized lake views](./get-started-with-materialized-lake-views.md)
* [Optimal refresh for materialized lake views in a lakehouse](./refresh-materialized-lake-view.md)
* [Manage and refresh materialized lake views in Fabric with APIs](./materialized-lake-views-public-api.md)
