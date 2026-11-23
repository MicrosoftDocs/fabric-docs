---
title: Create a semantic view
description: Learn how to create a semantic view in a lakehouse, edit or upload YAML definitions, and organize the view folder.
ms.reviewer: vvereen
ms.topic: how-to
ms.date: 11/18/2026
ms.search.form: Semantic views
ai-usage: ai-assisted
---

# Create a semantic view

Create a semantic view in your lakehouse to define tables, relationships, and metrics. This article shows how to edit or upload YAML files and organize the view folder.

If you're deciding whether to use a semantic view or author a Power BI semantic model directly, see [Semantic view or semantic model?](semantic-views-overview.md#semantic-view-or-semantic-model)

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

## Prerequisites

- A Fabric workspace with a lakehouse.
- **Write** permission on that lakehouse. To publish, you also need the Contributor role or higher in the workspace.

Before creating a view, check the [workspace restrictions for publishing](semantic-views-overview.md#publish-and-manage-views).

## Create a view with the starter file

The **New semantic view** command is available on the **Lakehouse** view, not the **SQL analytics endpoint** tab. It creates the folder structure and adds a commented starter file you can fill in.

For supported YAML syntax, see [Semantic view YAML syntax reference](semantic-views-yaml-reference.md).

1. Open your lakehouse and ensure you are on the **Lakehouse** view.
1. On the ribbon, select **New semantic view**. After the `Semantic Views` folder exists, you can also right-click it in the Explorer pane and select **New semantic view**.

   :::image type="content" source="media/semantic-views/new-semantic-view.png" alt-text="Screenshot of the lakehouse ribbon with New semantic view highlighted." lightbox="media/semantic-views/new-semantic-view.png":::

1. Enter a name for the view in **Semantic view name**, then select **Create**.

   :::image type="content" source="media/semantic-views/new-semantic-view-dialog.png" alt-text="Screenshot of the New semantic view dialog with the Semantic view name field." lightbox="media/semantic-views/new-semantic-view-dialog.png":::

The command creates `Context/Semantic Views/<view-name>/` and adds a starter `.yaml` file. For example, a view named `sales` starts with `sales_semantic_view.yaml`. If a view folder with that name already exists, the command fails and doesn't change the existing folder.

:::image type="content" source="media/semantic-views/folder-starter-file.png" alt-text="Screenshot of Context/Semantic Views/sales containing sales_semantic_view.yaml." lightbox="media/semantic-views/folder-starter-file.png":::

The folder name is the view name and the name of the generated semantic model. Each YAML file still needs a `name` value, but Fabric doesn't use it.

Fill in `name` and at least one dataset in the starter file. For example, this minimal definition exposes an existing `dbo.sales` table:

```yaml
version: 0.2.0.dev0
name: sales
datasets:
  - name: sales
    source: dbo.sales
```

Uncomment and complete the relationship blocks for any relationships your metrics need, then add the metric definitions. Don't leave unfilled keys in the definition. For examples, see [Semantic view YAML syntax reference](semantic-views-yaml-reference.md).

:::image type="content" source="media/semantic-views/starter-file.png" alt-text="Screenshot of the starter YAML file with a dataset and commented relationship and metric examples." lightbox="media/semantic-views/starter-file.png":::

## Upload existing YAML files

If you already have YAML files for a view, upload them into the view folder instead of using the starter file. Uploaded files are saved automatically.

If you created the view with **New semantic view**, replace or delete the starter YAML file when your uploaded files provide the complete definition. Publishing includes every `.yaml` file in the view folder, so an incomplete or conflicting starter can cause publishing to fail.

To create the folder structure manually, create a folder named exactly `Semantic Views` under `Context`, then create a subfolder for your view inside it. The view subfolder name becomes the view name and the name of the generated semantic model.

1. In the Explorer pane, right-click the view folder under `Context/Semantic Views`.
1. Select **Upload** > **Upload files**, then choose your files.

   :::image type="content" source="media/semantic-views/upload-files.png" alt-text="Screenshot of the sales folder context menu with Upload files available under Upload." lightbox="media/semantic-views/upload-files.png":::

## Edit and save

Under `Context/Semantic Views/<view-name>/`, open a `.yaml` file, edit its definitions or descriptions, then select **Save**. Don't edit the generated output in `SystemContext`.

:::image type="content" source="media/semantic-views/metrics-yaml.png" alt-text="Screenshot of metrics.yaml open in the lakehouse editor with three DAX metrics and the Save button." lightbox="media/semantic-views/metrics-yaml.png":::

Saving writes the file only. It doesn't validate the definition or update the generated semantic model. To do that, [publish the view](semantic-views-publish.md).

## Organize the view folder

How you arrange files inside the view folder determines what you can share through a OneLake shortcut, because shortcuts work at the folder level.

When splitting a definition across files, follow the [validation rules](semantic-views-yaml-reference.md#validation-across-files).

### Keep schema and metrics together

**New semantic view** starts with one file. You can split the definition into multiple files in the same folder, as shown in the following example. A shortcut to the folder shares schema and metrics together.

```
Context/
  Semantic Views/
    sales/
      schema.yaml
      metrics-revenue.yaml
      metrics-profitability.yaml
```

### Separate schema from metrics

Use subfolders when you want to shortcut schema and metrics independently. Combine a shortcut to shared metrics with local dataset and relationship definitions.

```
Context/
  Semantic Views/
    sales/
      schema/
        schema.yaml
      metrics/
        metrics-revenue.yaml
        metrics-profitability.yaml
```

Subfolders don't create separate views. For shortcut setup, local data requirements, and updates to shared definitions, see [Reuse a view in another lakehouse](semantic-views-consume.md#reuse-a-view-in-another-lakehouse).

## Folder rules

Keep these constraints in mind as you create and organize views:

- A view folder must be a direct child of `Context/Semantic Views`. Subfolders aren't independently publishable views, but can contain shortcuts to other views' definitions. See [Combine semantic views](semantic-views-consume.md#combine-semantic-views).
- Each folder directly under `Semantic Views` is an independent view. Sibling views aren't automatically merged; include their definitions through shortcuts to combine them.
- All `.yaml` files inside a view folder, including subfolders and shortcut content, are merged into that one view when you publish. File order doesn't matter.
- A semantic view supports up to 20 `.yaml` files in total, including files in subfolders and shortcut content.
- Files with other extensions, including `.yml`, are ignored without warnings and don't count toward the YAML file limit.
- Folder names are case-sensitive in OneLake, but semantic model names aren't. If two view folders differ only by case, such as `Sales` and `sales`, you can publish only one of them.
- You can't rename or delete the `Semantic Views` folder in the Fabric portal. You can rename or delete it through OneLake file explorer and the APIs, which breaks the views it contains.

For file-count and size limits, see [Size and file limits](semantic-views-yaml-reference.md#size-and-file-limits). For rename and delete behavior, see [Considerations and limitations](semantic-views-overview.md#considerations-and-limitations).

## Delete a semantic view

Deleting a semantic view requires separate cleanup of its source folder, generated semantic model, and generated output. Before deleting the model, identify connected reports and agents and coordinate with their owners. Deleting the model breaks those connections; republishing the view creates a new model and doesn't restore them.

1. In the lakehouse Explorer pane, delete the specific view folder under `Context/Semantic Views`, such as `Context/Semantic Views/sales`. Don't delete the parent `Semantic Views` folder or other views.
1. In the workspace, delete the generated semantic model for that view, such as `sales`. Deleting the source folder alone doesn't delete the model.
1. If another view remains in the same lakehouse, [publish that view](semantic-views-publish.md#publish-a-view) to trigger cleanup of the deleted view's generated output. Publishing also updates the remaining view's model, so review its saved definitions before publishing.
1. Under `SystemContext/Semantic Views`, verify that the deleted view's generated folder, such as `SystemContext/Semantic Views/sales`, is gone.

> [!IMPORTANT]
> In this preview, generated-output cleanup runs only when a view in the same lakehouse is published. There is no background cleanup. If you delete the last view and no subsequent publish occurs, its generated output remains in `SystemContext`. Don't treat deletion of the source folder or model alone as removal of metadata exposed through `SystemContext`.

## Related content

- [Work with semantic views through APIs](semantic-views-overview.md#work-with-semantic-views-through-apis)
- [Semantic view YAML syntax reference](semantic-views-yaml-reference.md)
- [Publish a semantic view](semantic-views-publish.md)
- [Semantic views (preview)](semantic-views-overview.md)
