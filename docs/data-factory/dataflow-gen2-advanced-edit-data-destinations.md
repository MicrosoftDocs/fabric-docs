---
title: Advanced edit for data destination queries in Dataflow Gen2
description: Learn how to enable and use advanced edit for data destination queries in Dataflow Gen2 to modify destination scripts directly using Power Query M code.
ms.reviewer: whhender
ms.author: jeluitwi
author: luitwieler
ms.topic: how-to
ms.date: 02/02/2026
ms.custom: dataflows
ai-usage: ai-assisted
---

# Advanced edit for data destination queries in Dataflow Gen2

When you configure a data destination in Dataflow Gen2, the system automatically creates internal queries that handle the navigation and loading logic for your destination. In most cases, you don't need to interact with these queries directly. However, for advanced scenarios where you need more control over the destination behavior, you can enable advanced editing to modify the destination queries directly using Power Query M code.

> [!CAUTION]
> Modifying data destination queries directly can lead to unexpected behavior or break your dataflow. Only use this feature if you understand the implications and have a specific need for direct query modification.

## Prerequisites

Before using advanced edit for data destination queries, you should be familiar with:

- [What is Dataflow Gen2?](dataflows-gen2-overview.md)
- [Dataflow Gen2 data destinations and managed settings](dataflow-gen2-data-destinations-and-managed-settings.md)
- [Power Query M formula language](/powerquery-m/)

## Enable advanced edit for data destination queries

By default, the advanced edit feature for data destination queries is disabled. You must explicitly enable it in the dataflow options before you can access the advanced editor.

1. Open your dataflow in the Power Query editor.

1. Select **Options** from the **Home** tab in the ribbon.

1. In the **Options** dialog, scroll down to the **Data destinations** section.

1. Select the checkbox for **Enable advanced edit for data destination queries**.

   :::image type="content" source="media/dataflow-gen2-advanced-edit-data-destinations/enable-advanced-edit-option.png" alt-text="Screenshot of the Options dialog with the Enable advanced edit for data destination queries checkbox selected in the Data destinations section.":::

1. A warning dialog appears explaining that modifying destination queries can cause unexpected behavior or break the dataflow. Read the warning carefully.

   :::image type="content" source="media/dataflow-gen2-advanced-edit-data-destinations/advanced-edit-warning-dialog.png" alt-text="Screenshot of the warning dialog that appears when enabling advanced edit for data destination queries.":::

1. Select **OK** to confirm and enable the feature.

1. Select **OK** to close the Options dialog.

## Use the advanced editor for destination queries

After you enable advanced edit, you can access the advanced editor for any data destination query in your dataflow.

1. In the **Queries** pane, locate the data destination section that shows your configured destinations.

1. Right-click on the destination you want to edit.

1. From the context menu, select **Advanced editor**.

   :::image type="content" source="media/dataflow-gen2-advanced-edit-data-destinations/advanced-editor-context-menu.png" alt-text="Screenshot of the context menu showing the Advanced editor option for a data destination.":::

1. The **Advanced editor** window opens, displaying the M code for the destination query.

   :::image type="content" source="media/dataflow-gen2-advanced-edit-data-destinations/advanced-editor-window.png" alt-text="Screenshot of the Advanced editor window showing the M code for a data destination query with a warning banner.":::

   > [!NOTE]
   > The Advanced editor displays a warning banner reminding you that modifying the query may cause unexpected behavior or break the dataflow.

1. Make your changes to the M code as needed.

1. Select **OK** to save your changes, or **Cancel** to discard them.

## Understanding the destination query structure

When you open the advanced editor for a destination query, you see M code that follows a specific pattern. Here's an example of a typical destination query for Lakehouse:

```powerquery-m
let
    Pattern = Lakehouse.Contents([HierarchicalNavigation = null, CreateNavigationProperties = false, EnableFolding = false]),
    Navigation_1 = Pattern{[workspaceId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"]}[Data],
    Navigation_2 = Navigation_1{[lakehouseId = "yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy"]}[Data],
    TableNavigation = Navigation_2{[Id = "Table", ItemKind = "Table"]}?[Data]?
in
    TableNavigation
```

This query contains:

- **Pattern**: The connection to the destination type (for example, `Lakehouse.Contents`)
- **Navigation steps**: Steps that navigate to the specific workspace, item, and table
- **Final output**: The reference to the destination table or file

## Common scenarios for advanced editing

While most users don't need to modify destination queries directly, here are some scenarios where advanced editing might be useful:

### Change destination identifiers

If you need to update the workspace ID, lakehouse ID, or other destination identifiers without reconfiguring the entire destination, you can modify them directly in the M code.

### Troubleshoot destination issues

When encountering validation errors, viewing the raw M code can help you understand the exact configuration and identify potential issues. For more information about validation errors, see [Data destinations validation rules](dataflow-gen2-data-destinations-validation-rules.md).

### Advanced parameterization

While the standard UI supports basic parameterization for table names, advanced edit allows you to parameterize other aspects of the destination query that aren't exposed in the UI.

## Important considerations

Keep these considerations in mind when using advanced edit:

- **Validation**: Changes you make in the advanced editor are subject to [validation rules](dataflow-gen2-data-destinations-validation-rules.md). Invalid modifications cause validation errors during publish or refresh.

- **Return type**: The destination query must return a valid type (table, binary, or null). Returning other types like functions or lists causes a `DestinationQueryHasUnsupportedScript` error.

- **Data source references**: The destination query should reference exactly one data source. Referencing multiple data sources or no data sources causes validation errors.

- **Unsupported modifications**: Some changes aren't supported and might cause the dataflow to fail. Always test your changes thoroughly before deploying to production.

- **No undo**: Changes saved in the advanced editor can't be automatically reverted. Consider documenting the original query before making modifications.

## Disable advanced edit

If you no longer need advanced editing capabilities, you can disable the feature:

1. Select **Options** from the **Home** tab.
1. In the **Data destinations** section, clear the checkbox for **Enable advanced edit for data destination queries**.
1. Select **OK** to save the setting.

> [!NOTE]
> Disabling advanced edit doesn't revert any changes you made to destination queries. Those changes remain in place.

## Related content

- [Dataflow Gen2 data destinations and managed settings](dataflow-gen2-data-destinations-and-managed-settings.md)
- [Data destinations validation rules](dataflow-gen2-data-destinations-validation-rules.md)
- [Dataflow refresh](dataflow-gen2-refresh.md)
- [View refresh history and monitor your dataflows](dataflows-gen2-monitor.md)
