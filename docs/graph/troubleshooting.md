---
title: Troubleshooting Graph in Microsoft Fabric
description: Learn about troubleshooting Graph in Microsoft Fabric.
ms.topic: reference
ms.date: 01/23/2026
author: lorihollasch
ms.author: loriwhip
ms.reviewer: wangwilliam
---

# Troubleshooting Graph in Microsoft Fabric

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

This article provides troubleshooting guidance and answers to frequently asked questions about Graph in Microsoft Fabric.

## Troubleshooting

### Graph model disappears or becomes empty when switching tabs

If your graph model disappears or shows an empty canvas when switching between tabs or windows:

1. Save your model before switching tabs or windows.
1. If the graph disappears, close the tab and refresh the browser.
1. Avoid having multiple graph objects open simultaneously.

### Querysets show errors or appear corrupted

If you encounter binding errors or corrupted querysets:

1. Perform a full browser refresh (not just the tab).
1. Avoid clicking **Create new queryset** immediately after saving—wait a few seconds for the queryable graph to be ready.
1. If the filter window was open when switching tabs, close and reopen the queryset after refreshing.

> [!NOTE]
> Queryset corruption can affect all querysets in your workspace until you perform a full browser refresh.

### "Failed to load graph model" error in queryset view

This error typically means the queryable graph isn't ready yet. This is different from having no model defined.

- Wait a moment and refresh the page.
- Verify that your graph model has been saved and processed.
- Check that your graph model contains at least one node and edge definition.

## FAQ

### Why doesn't my queryset show nodes or edges I just added to the model?

After updating a graph model, the queryset's underlying queryable graph isn't immediately updated. A new snapshot must be generated before changes appear in the queryset. Save your model and wait for the queryable graph to be ready before creating or refreshing a queryset.

### How do I refresh a queryset to see model changes?

Currently, there's no UI option to manually refresh a queryset's connection to an updated model. After saving your model changes, create a new queryset to see the updated nodes and edges. The team is working on improving the messaging and adding versioning UI to make this process clearer.

### How do I choose which properties appear on a node?

When you select a node and its source table, all columns are added as properties by default. To remove properties you don't need:

1. Select the node in the graph model.
1. In the properties panel, locate the property you want to remove.
1. Click the trashcan icon next to the property.

### Can I create a node from a column in an existing table?

Yes. If you have denormalized data (for example, a category column within a larger table), you can create an additional node and edge based on that column. This modeling approach requires an underlying change to the data file itself. More complex modeling scenarios like this are actively being improved.

### Why do I get an error when clicking "Create new queryset" after saving?

If you click **Create new queryset** too quickly after saving your graph model, you might encounter a binding error. This happens because the queryable graph snapshot isn't ready yet.

**To avoid this issue:**

- Wait a few seconds after saving before creating a new queryset.
- If you encounter this error, refresh the browser before attempting to create another queryset.

## Best practices

- **Save frequently**: Save your graph model before switching tabs, windows, or creating querysets.
- **Wait after saving**: Allow a few seconds after saving before creating new querysets.
- **One graph at a time**: Avoid having multiple graph objects open simultaneously to reduce the chance of UI issues.
- **Refresh on errors**: If you encounter unexpected errors, perform a full browser refresh to reset the workspace state.

## Related content

- [What is Graph in Microsoft Fabric?](overview.md)
- [Create a graph model](create-graph-model.md)
- [Query a graph](query-graph.md)
