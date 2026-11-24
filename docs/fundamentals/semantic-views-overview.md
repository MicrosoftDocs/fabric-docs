---
title: Semantic views (preview)
description: Define business metrics once alongside your data in OneLake with semantic views. Reuse definitions across teams and tools, independently of compute.
ms.reviewer: vvereen
ms.topic: concept-article
ms.date: 11/18/2026
ms.search.form: Semantic views
ai-usage: ai-assisted
---

# Semantic views (preview)

Semantic views are a capability of [Fabric IQ](../iq/overview.md) that you can use to define business metrics once, alongside your data in OneLake, and reuse them across teams for AI and BI. A semantic view describes datasets, relationships, business metrics, and their meaning, independently of the engines and tools that consume them. For example, define revenue once so agents and reports use the same business logic rather than maintaining separate versions.

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

In this preview, you can create semantic views only in lakehouses. Published metrics require DAX.

A semantic view contains definitions, not data. It uses an open YAML format based on [Apache Ossie (incubating)](https://ossie.apache.org/). Fabric supports selected constructs and applies its own requirements. For supported properties and behavior, see [Semantic view YAML syntax reference](semantic-views-yaml-reference.md).

## Why use semantic views?

Use semantic views when you want to:

- **Keep business definitions consistent.** Define metrics and relationships once for reports, agents, and compatible analytics tools.
- **Reuse definitions across teams.** Share a view or part of its definition through OneLake shortcuts. Teams can apply shared business logic to data in different lakehouses.
- **Add business meaning where data lives.** Describe tables and calculations alongside the data so consumers can interpret them consistently.
- **Separate definitions from compute.** Maintain business logic in an open YAML format, independently of a particular report or model editor.

## How semantic views relate to semantic models

Semantic views complement Power BI semantic models; they aren't a new version or a replacement. A semantic view is a lightweight, reusable definition stored alongside your lakehouse data. It isn't a standalone Fabric item or query engine. A Power BI semantic model is a Fabric item that provides modeling and query capabilities for BI.

In this preview, publishing a view creates a read-only Direct Lake on OneLake semantic model for DAX execution. Reports and agents query that model. The view's YAML definition remains the source of truth.

### Semantic view or semantic model?

Choose the authoring approach that fits your requirements:

- Use a **semantic view** when you want to define business logic alongside your data, separately from the model that runs queries, and reuse all or part of those definitions across lakehouses.
- Author a **Power BI semantic model directly** when your solution requires modeling capabilities that semantic views don't support in this preview. Choose semantic model authoring when you need broader data-source support, storage-mode flexibility, or existing Power BI model editors and tooling.

## How it works

You can create multiple semantic views in one lakehouse. Each view publishes independently and resolves its table references within that lakehouse. A view doesn't directly reference tables or semantic views in other lakehouses. To reuse or combine definitions from other lakehouses, create OneLake shortcuts to the relevant view folders or subfolders in the consuming lakehouse. Then publish the containing view to create or update its semantic model.

For example, regional sales teams can share a revenue definition while keeping their sales data in separate lakehouses:

- **Define:** Describe the tables, relationships, and revenue calculation in YAML alongside the data.
- **Reuse:** Share the view folder through OneLake shortcuts without copying its YAML. Each team supplies the data referenced by the definition and publishes the view in its own lakehouse.
- **Consume:** Use the business logic in reports and agents through each lakehouse's generated model.

For setup and the steps to make definitions available, see [Create a semantic view](semantic-views-create.md) and [Reuse a view in another lakehouse](semantic-views-consume.md#reuse-a-view-in-another-lakehouse).

:::image type="content" source="media/semantic-views/lakehouse-explorer.png" alt-text="Screenshot of the lakehouse Explorer pane showing Tables, Files, Context, and SystemContext, with the two context folders highlighted." lightbox="media/semantic-views/lakehouse-explorer.png":::

## Context and SystemContext

New and existing lakehouses include **Tables**, **Files**, **Context**, and **SystemContext** in the Explorer pane.

To add semantic views, manually create a folder named exactly `Semantic Views` under `Context`, or select **New semantic view** on the ribbon to create the required folder structure and a starter YAML file. After the `Semantic Views` folder exists, you can also right-click it and select **New semantic view**.

For semantic views, `Context` stores the source definitions, and `SystemContext` stores the generated output:

| Folder | Contents for a semantic view |
|---|---|
| `Context/Semantic Views/<view-name>/` | User-editable YAML definitions of datasets, relationships, metrics, and descriptions. |
| `SystemContext/Semantic Views/<view-name>/` | Read-only, system-generated Tabular Model Definition Language (TMDL) output from compilation. |

:::image type="content" source="media/semantic-views/generated-model-definition.png" alt-text="Screenshot of the generated sales.tmdl file under SystemContext/Semantic Views/sales." lightbox="media/semantic-views/generated-model-definition.png":::

Edit source files in `Context`, not generated output in `SystemContext`. See [Edit and save](semantic-views-create.md#edit-and-save) and [Check the result](semantic-views-publish.md#check-the-result) for the steps.

## Get started

Open your lakehouse, select **New semantic view**, complete the starter YAML or upload your own files, and then select **Publish** from the view folder.

For a guided example, follow [Tutorial: Build a semantic view](semantic-views-tutorial.md) to define sales relationships and metrics and use them to analyze revenue by region.

If you already have your definitions, start with [Create a semantic view](semantic-views-create.md).

To create and publish a view, you need **Write** permission on the lakehouse and the Contributor role or higher in its workspace. The generated model [inherits access from its lakehouse](#access-and-security). For sharing permissions and OneLake data-access requirements, see [Access](semantic-views-consume.md#access).

:::image type="content" source="media/semantic-views/workspace-view.png" alt-text="Screenshot of the workspace showing lakehouse_sales and its sales child semantic model." lightbox="media/semantic-views/workspace-view.png":::

## Work with semantic views through APIs

Use APIs to find semantic views, read or edit their definitions, reuse shared definitions through shortcuts, and publish changes for reports and agents to use.

| What you want to do | API documentation |
|---|---|
| Find semantic views in a lakehouse. | [List semantic views (beta)](/rest/api/fabric/lakehouse/semantic-views/list%28beta%29) |
| Read an existing view's definitions, create a new view, or edit its definition files. | [OneLake API access](../onelake/onelake-access-api.md) |
| Find shortcuts and identify where their shared definitions are stored. | [List shortcuts](/rest/api/fabric/core/onelake-shortcuts/list-shortcuts) and [Get shortcut](/rest/api/fabric/core/onelake-shortcuts/get-shortcut) |
| Reuse definitions from another folder or lakehouse. | [Create shortcut](/rest/api/fabric/core/onelake-shortcuts/create-shortcut) |
| Publish a new view or apply saved changes to its generated semantic model. | [Publish a semantic view (beta)](/rest/api/fabric/lakehouse/semantic-views/publish%28beta%29) |

Store definition files under `Context/Semantic Views/<view-name>/`. After creating or editing files, publish the view to update its generated semantic model.

> [!IMPORTANT]
> During preview, the List and Publish APIs require `beta=true`. These beta APIs are provided for evaluation and development only and aren't recommended for production use. Publishing by using a third-party token isn't supported. The [publishing restrictions](#publish-and-manage-views) also apply to API calls.

## Considerations and limitations

The following considerations and limitations apply.

### Scope and definitions

- **Scope:** A lakehouse can contain multiple independent semantic views, each in a direct subfolder of `Context/Semantic Views`. Publishing a view merges the YAML files within that view's folder and subfolders into one definition and creates or updates its semantic model. Views in sibling folders remain independent, each with its own semantic model once published.
- **Lakehouse boundary and reuse:** All referenced tables and columns must resolve in the consuming lakehouse. Shortcuts share definitions; source views' generated models aren't combined. Republish each consuming view after shared definitions change. See [Reuse a view in another lakehouse](semantic-views-consume.md#reuse-a-view-in-another-lakehouse).
- **Required folder name:** The folder under `Context` must be named exactly `Semantic Views`. The Lakehouse explorer doesn't offer rename or delete actions for this folder. You can rename or delete it through OneLake file explorer or OneLake APIs, but doing so breaks the views it contains.
- **Naming:** Each YAML file requires a `name` value, but it isn't used. The view folder name becomes the view name and the name of the generated semantic model.
- **Definitions:** Only `.yaml` files are published. File-count and size limits apply across the view, including subfolders and shortcut content. See [Size and file limits](semantic-views-yaml-reference.md#size-and-file-limits).
- **Modeling:** Construct and expression-dialect support varies across platforms. Published metrics require DAX, and relationships support a single column on each side. See [Semantic view YAML syntax reference](semantic-views-yaml-reference.md) for supported constructs and skipped properties.

### Publish and manage views

- **CI/CD:** Semantic views and their generated semantic models don't support CI/CD, including Git integration and deployment pipelines. You can't publish semantic views in a workspace connected to deployment pipelines, Git, or Power Platform solutions.
- **Workspace-level private links:** You can't publish a semantic view in a workspace with workspace-level private links enabled because publishing creates a Power BI semantic model, which isn't supported in those workspaces. You also can't enable workspace-level private links for a workspace that contains the generated model. For details, see [Supported scenarios and limitations for workspace-level private links](../security/security-workspace-level-private-links-support.md).
- **Public API:** In this preview, publishing a semantic view through the Fabric public API with a third-party token isn't supported.
- **Name conflicts:** Publishing fails if the workspace already contains an item with the target model name that isn't the generated model for this view.
- **Concurrency:** Publish reads the view's files as they are when it runs and doesn't lock them. Avoid editing files while a publish is running. If two people publish the same view at the same time, the last write wins.
- **Rename and delete:** Changes to a view folder and its generated model aren't coordinated. Renaming either can prevent subsequent publishes from updating the original model. Deleting one leaves the other in place; republishing after model deletion creates a new model and doesn't restore existing connections. Renaming or deleting a view doesn't immediately remove its old generated output in `SystemContext`. For cleanup steps and limitations, see [Delete a semantic view](semantic-views-create.md#delete-a-semantic-view). Deleting the lakehouse deletes its generated models.

### Access and security

The generated semantic model inherits permissions from its parent lakehouse:

| Lakehouse permission | Generated semantic model permission |
|---|---|
| Read | Read and Build |
| Write | Write |

Manage access through the lakehouse. For underlying data-access requirements, see [Access](semantic-views-consume.md#access).

- **Model access:** Opening the generated model in web modeling requires model **Write** permission, inherited from lakehouse **Write** permission. The model remains read-only. In Power BI Desktop's OneLake catalog, **Connect** is supported for report creation, but **Edit** (remote modeling) isn't supported for the generated model. XMLA endpoint access and creating ontologies from the generated model aren't supported.
- **OneLake security:** When enabled, OneLake security rules apply to queries against the generated semantic model, including object-level security (OLS) and row-level security (RLS). The `Context` folder doesn't support OneLake security.
- **Object-level security metadata:** If a semantic view includes tables or columns restricted by OLS, publishing generates the model's TMDL in `SystemContext` and displays a warning. Users who can read `SystemContext` can see metadata about those tables or columns, but not the restricted data.

### Costs

Semantic views don't introduce a separate meter. Definition files use [OneLake storage](../onelake/onelake-capacity-consumption.md), and queries against the generated model use the existing Direct Lake query meters.

## Related content

- [Create a semantic view](semantic-views-create.md)
- [Publish a semantic view](semantic-views-publish.md)
- [Consume semantic views](semantic-views-consume.md)
- [Semantic view YAML syntax reference](semantic-views-yaml-reference.md)
- [Direct Lake overview](direct-lake-overview.md)
