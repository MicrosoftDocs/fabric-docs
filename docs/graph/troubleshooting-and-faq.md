---
title: Troubleshooting Graph in Microsoft Fabric
description: Learn about troubleshooting Graph in Microsoft Fabric.
ms.topic: reference
ms.date: 01/26/2026
author: lorihollasch
ms.author: loriwhip
ms.reviewer: wangwilliam
---

# Troubleshooting Graph in Microsoft Fabric

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

This article provides troubleshooting guidance and answers to frequently asked questions about Graph in Microsoft Fabric. For known limitations that might impact your experience, see [Current Limitations of Graph in Microsoft Fabric](limitations.md).

## Graph model disappears or becomes empty when switching tabs

If your graph model disappears or shows an empty canvas when you switch between tabs or windows:

1. Save your model before switching tabs or windows.
1. If the graph disappears, close the tab and refresh the browser.
1. Don't open multiple graph objects at the same time.

## "Failed to load graph model" error in queryset view

This error typically means the queryable graph isn't ready yet. This situation is different from having no model defined.

- Wait a moment and refresh the page.
- Verify that your graph model is saved and processed.
- Check that your graph model contains at least one node and edge definition.

## Querysets show errors or appear corrupted

If you encounter binding errors or corrupted querysets:

1. Perform a full browser refresh (not just the tab).
1. Avoid clicking **Create new queryset** immediately after saving. Wait a few seconds for the queryable graph to be ready.
1. If the filter window was open when you switched tabs, close and reopen the queryset after refreshing.

> [!NOTE]
> Queryset corruption can affect all querysets in your workspace until you perform a full browser refresh.

## Queryset doesn't show recent model changes

After updating a graph model, the queryset's underlying queryable graph isn't immediately updated. A new snapshot must be generated before changes appear in the queryset. Save your model and wait for the queryable graph to be ready before creating or refreshing a queryset.

Currently, there's no UI option to manually refresh a queryset's connection to an updated model. After saving your model changes, create a new queryset to see the updated nodes and edges.

## FAQ

### Can I create a node from a column in an existing table?

Yes, you can create a separate node type from any column in your table. For each of these node types, you should delete properties that you won't need in queries or analysis, because excessive properties make your graph harder to maintain and use.

You may also use that same table as the edge mapping table for edges types connected to these node types.

### How do I change which property appears as the node label?

By default, nodes display their ID as the label. To change the display label:

1. Open the query view.
1. On the right side, find the **Components** panel.
1. Select the ellipses (...) next to the node type.
1. Choose the property you want to appear as the node label.

## Best practices

- **Save frequently**: Save your graph model before switching tabs, windows, or creating querysets.
- **Wait after saving**: Allow a few seconds after saving before creating new querysets.
- **One graph at a time**: Avoid having multiple graph objects open simultaneously to reduce the chance of UI problems.
- **Refresh on errors**: If you encounter unexpected errors, perform a full browser refresh to reset the workspace state.

## Related content

- [What is Graph in Microsoft Fabric?](overview.md)
- [Quickstart guide for Graph in Microsoft Fabric](quickstart.md)
