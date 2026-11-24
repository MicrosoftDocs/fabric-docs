---
title: Consume semantic views
description: Use semantic views in reports and agents, and reuse definitions in another lakehouse through OneLake shortcuts.
ms.reviewer: vvereen
ms.topic: how-to
ms.date: 11/05/2026
ms.search.form: Semantic views
ai-usage: ai-assisted
---

# Consume semantic views

Use semantic views in [Fabric IQ](../iq/overview.md) to share consistent business definitions across reports and agents. In this preview, reports and agents query the semantic model generated when you publish a view. You can also reuse the view or selected definitions with another lakehouse's data through OneLake shortcuts.

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

## Prerequisites

- A published semantic view. See [Publish a semantic view](semantic-views-publish.md).
- **Read** permission on the parent lakehouse and access to the underlying data. See [Access](#access).

## Access

The generated semantic model inherits permissions from its parent lakehouse. Manage access through the lakehouse.

- **Authoring:** Lakehouse **Write** permission lets you create and edit semantic views. Publishing also requires the Contributor role or higher in the workspace.
- **Consuming:** Lakehouse **Read** permission grants **Read** and **Build** permissions on the generated model, so you can query it and build reports.

Querying the model also requires access to the underlying tables through a OneLake security role, or **ReadAll** permission when OneLake security isn't enabled. See [Direct Lake on OneLake security requirements](direct-lake-security-integration.md#direct-lake-on-onelake).

## Query from a Fabric data agent

The generated model is a Power BI semantic model, so you add it to a data agent the same way you add any other semantic model.

1. Open your data agent, and then select **Add data source**.
1. Select the generated semantic model. It has the same name as the view folder.

In the workspace, the generated model appears as a child of its lakehouse:

:::image type="content" source="media/semantic-views/workspace-view.png" alt-text="Screenshot of the workspace showing the sales semantic model as a child of lakehouse_sales." lightbox="media/semantic-views/workspace-view.png":::

The agent queries the model's tables, relationships, and measures. For more information, see [Add a data source to a Fabric data agent](../data-science/data-agent-add-datasources.md).

## Query from Power BI

Connect to the generated semantic model:

- **Build a report directly.** [Create a report based on an existing semantic model](/power-bi/connect-data/service-datasets-discover-across-workspaces) from Power BI Desktop or the Fabric portal, and build visuals on the measures.
- **Extend through a separate model.** Create a separate [composite model on a Power BI semantic model](/power-bi/transform-model/desktop-composite-models#composite-models-on-power-bi-semantic-models-and-analysis-services) when you need to add local measures or combine the view with other data. This supported consumption path doesn't modify the generated model or the view.

To view a shared report, recipients also need **Read** permission on that report.

## Reuse a view in another lakehouse

Use a OneLake shortcut to share a semantic view folder without copying its YAML. For example, regional teams can use one centrally maintained revenue definition against their own sales tables. Each consuming lakehouse uses its own generated semantic model.

Each lakehouse can contain multiple semantic views, but a view doesn't directly reference tables or semantic views in another lakehouse. Shortcuts let you reuse or combine the definitions in the consuming lakehouse; publish the containing view there to create or update its model. For steps to combine definitions from multiple views, see [Combine semantic views](#combine-semantic-views).

### Set up a shortcut

The consuming lakehouse must have the tables and columns that the definition references. The definition resolves against those local tables, not the source lakehouse's data. The shortcut shares definitions; it doesn't copy table data.

Keep the source and consuming lakehouses consistent in whether they use schemas. Dataset sources that specify a schema, such as `sales.orders`, must resolve to that schema and table in the consuming lakehouse. Mixing schema-enabled and non-schema lakehouses can cause publishing to fail. If you don't explicitly define a dataset, the system resolves its table in the `dbo` schema. Publishing fails if the table exists only in another schema. For more information, see [Datasets](semantic-views-yaml-reference.md#datasets).

Ensure you can access the shortcut target and have permission to publish in the consuming lakehouse. For permission details, see [Secure and manage OneLake shortcuts](../onelake/onelake-shortcut-security.md).

1. In the consuming lakehouse, create a shortcut under `Context/Semantic Views` that points to the view folder in the source lakehouse.
1. Publish the shortcut view folder in the consuming lakehouse.

The following screenshot shows selecting the source view folder in the OneLake shortcut dialog:

:::image type="content" source="media/semantic-views/shortcut-dialog.png" alt-text="Screenshot of the New shortcut dialog with the sales semantic view folder selected under Context/Semantic Views in the source lakehouse." lightbox="media/semantic-views/shortcut-dialog.png":::

Review the shortcut location and selected folder before creating the shortcut:

:::image type="content" source="media/semantic-views/shortcut-dialog-summary.png" alt-text="Screenshot of the New shortcut summary showing a sales shortcut to the source semantic view folder, with the shortcut location and read-only setting." lightbox="media/semantic-views/shortcut-dialog-summary.png":::

Publishing fails if the shortcut target is moved, deleted, or no longer accessible.

### Reuse part of a definition

You can also share schema or metrics independently. Create a view folder in the consuming lakehouse and place a shortcut to the shared subfolder inside it, alongside local YAML definitions. The view combines the local files and shortcut content.

Shortcut a metrics subfolder to reuse calculations with local dataset and relationship definitions, or shortcut a schema subfolder to reuse datasets and relationships with local metrics. Include every relationship the shared metrics need in the combined definition. All metric expressions must resolve against that definition.

The merged definition must satisfy the same validation rules and [size and file limits](semantic-views-yaml-reference.md#size-and-file-limits) as any other view. For folder layouts, see [Organize the view folder](semantic-views-create.md#organize-the-view-folder).

### Combine semantic views

You can combine definitions from different semantic views by placing shortcuts to their folders inside another view folder or its subfolders. For example, add a shortcut to a finance view inside a sales view folder to use shared finance metrics alongside sales metrics. Alternatively, create a new view with shortcuts to both the finance and sales view folders.

When you publish the containing view, its local YAML files and the files reached through the shortcuts merge into one definition. The combined definition produces one semantic model; the source views' generated models aren't combined.

Before publishing:

- Resolve duplicate dataset, relationship, and metric names and conflicting definitions across the combined files. Different shortcut folder names don't resolve conflicts within the YAML definitions.
- Define the top-level model `description` in only one combined file, or use exactly the same text in every file that defines it. Conflicting top-level descriptions cause publishing to fail.
- Ensure all referenced tables and columns exist in the consuming lakehouse and all metric references resolve.
- Define any relationships needed between the finance and sales datasets explicitly.
- Avoid circular shortcut references, such as a sales view that includes finance while finance includes sales.

The [validation rules](semantic-views-yaml-reference.md#validation-across-files) and size limits apply to the entire combined definition.

### Apply changes to shared definitions

Maintain shared YAML definitions in the source lakehouse and coordinate changes with consuming teams. After updating the definitions, republish each consuming view to update its generated model. Publishing the source view doesn't automatically republish models in other lakehouses.

Ensure the consuming lakehouses still have the tables and columns the updated definitions reference.

## Limitations

The generated semantic model is read-only. Edit definitions in the view's YAML files and publish them to update the model.

- **Web modeling:** Opening the model with **Open in model view** requires model **Write** permission, inherited from lakehouse **Write** permission. Model **Read** or **Build** alone isn't sufficient. The model opens for inspection, not editing.
- **XMLA:** XMLA endpoint access, including read-only access, is blocked. This restriction doesn't prevent the composite-model consumption described in [Query from Power BI](#query-from-power-bi).
- **Ontologies:** Creating ontologies from the generated model isn't supported.
- **Desktop live editing:** In Power BI Desktop's OneLake catalog, use **Connect** to build a live-connected report from the generated semantic model. **Edit** (remote modeling) isn't supported because the generated model is read-only. To change the model, edit the view's YAML files and publish the view again. For supported report creation options, see [Query from Power BI](#query-from-power-bi).
- **Definition changes:** Direct edits through web modeling or REST APIs and version history aren't supported.

## Related content

- [Publish a semantic view](semantic-views-publish.md)
- [Semantic views (preview)](semantic-views-overview.md)
- [What is a Fabric data agent?](../data-science/concept-data-agent.md)
- [Direct Lake overview](direct-lake-overview.md)
