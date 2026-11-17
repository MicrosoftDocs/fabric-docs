---
title: Publish a semantic view
description: Publish a semantic view, inspect the generated model, and resolve errors before retrying.
ms.reviewer: vvereen
ms.topic: how-to
ms.date: 10/20/2026
ms.search.form: Semantic Views
ai-usage: ai-assisted
---

# Publish a semantic view

Publish a semantic view to create or update its read-only Direct Lake on OneLake semantic model for reports and agents. The view's YAML definition remains the source of truth. Saving a YAML file alone doesn't publish your changes.

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

## Prerequisites

- A [semantic view](semantic-views-create.md) in a lakehouse.
- **Write** permission on the lakehouse and the Contributor role or higher in its workspace.

> [!IMPORTANT]
> In this preview, you can't publish semantic views in a workspace connected to deployment pipelines, Git, or Power Platform solutions, or one with workspace-level private links enabled. See [Publish and manage views](semantic-views-overview.md#publish-and-manage-views).

## Publish a view

Before publishing, check the [validation rules for the combined definition](semantic-views-yaml-reference.md#validation-across-files).

1. In the Explorer pane, expand `Context` > `Semantic Views`.
1. Right-click the view folder, and then select **Publish**.

   :::image type="content" source="media/semantic-views/publish-menu.png" alt-text="Screenshot of the sales view folder context menu with Publish highlighted." lightbox="media/semantic-views/publish-menu.png":::

1. In the confirmation dialog, select **Publish**. Only saved changes are published.

   :::image type="content" source="media/semantic-views/publish-dialog.png" alt-text="Screenshot of the Publish the semantic view confirmation dialog." lightbox="media/semantic-views/publish-dialog.png":::

**Publish** is available only on view folders directly under `Semantic Views`. Each view publishes independently.

Publishing merges the view's YAML files, validates the definition against the lakehouse, writes compiled TMDL output to `SystemContext/Semantic Views/<view-name>/`, and creates or updates the generated semantic model.

> [!NOTE]
> The first publish might take a while. Wait for the publish result before using the generated model.

After changing the YAML definitions or referenced table schema, save your changes and publish again to update the model. Connected reports and agents use the updated model; publishing doesn't create a separate test model.

## Check the result

Review the publish result before using the model.

:::image type="content" source="media/semantic-views/publish-success.png" alt-text="Screenshot of a successful publish result with Validate in DQV and Open in Model View buttons." lightbox="media/semantic-views/publish-success.png":::

- **Errors:** Manually correct the reported problems in the source YAML files in `Context`, save, and retry **Publish**. Publishing doesn't automatically fix errors or rewrite files.
- **Warnings:** Publishing can succeed while skipping unsupported functionality. Review what was skipped and verify that your measures don't depend on it. For construct-specific behavior, see [Semantic view YAML syntax reference](semantic-views-yaml-reference.md).

> [!IMPORTANT]
> In this preview, an object-level security (OLS) warning indicates that users who can read `SystemContext` can see metadata about restricted tables or columns in the generated TMDL, although the generated model still enforces OLS on the data. If this exposure isn't acceptable, see [Delete a semantic view](semantic-views-create.md#delete-a-semantic-view) for cleanup steps and limitations.

For example, an error can report a source table that wasn't found in the lakehouse schema:

:::image type="content" source="media/semantic-views/publish-failure.png" alt-text="Screenshot of a failed publish with expanded details reporting that the dbo.sales source table wasn't found." lightbox="media/semantic-views/publish-failure.png":::

A successful publish can include a warning that a metric without a supported DAX dialect was omitted:

:::image type="content" source="media/semantic-views/publish-warning.png" alt-text="Screenshot of a successful publish with expanded warning details about an omitted metric without a supported DAX dialect." lightbox="media/semantic-views/publish-warning.png":::

If compilation fails, the previous generated output and model remain unchanged. If compilation succeeds but the model update fails, `SystemContext` can contain newer output than the model. Correct the problem and retry the full publish operation.

After a successful publish, inspect the model and test your measures in [DAX query view (DQV)](/power-bi/transform-model/dax-query-view):

1. Expand `SystemContext` > `Semantic Views`.
1. Right-click the view folder, then select **Open in model view** to inspect the model or **Validate in DQV** to test your measures.

:::image type="content" source="media/semantic-views/system-context-menu.png" alt-text="Screenshot of the generated sales folder menu with Validate in DQV and Open in model view highlighted." lightbox="media/semantic-views/system-context-menu.png":::

These commands are available after a model exists. Publishing validates the definition but not your business logic, so before you share the model, query your key metrics in DQV and compare the results with values you know are correct. You can also read the generated Tabular Model Definition Language (TMDL) file under `SystemContext`; make edits only in the source YAML under `Context`.

## Related content

- [Create a semantic view](semantic-views-create.md)
- [Semantic view YAML syntax reference](semantic-views-yaml-reference.md)
- [Consume semantic views](semantic-views-consume.md)
- [Semantic view considerations and limitations](semantic-views-overview.md#considerations-and-limitations)
