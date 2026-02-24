---
title: Navigate the Fabric Lakehouse explorer
description: Browse tables and files, preview data, and manage lakehouse objects in the Fabric portal.
ms.reviewer: avinandac
ms.topic: concept-article
ms.date: 02/22/2026
ms.search.form: Lakehouse Explorer
---

# Navigate the Fabric Lakehouse explorer

The Lakehouse explorer is the central page for interacting with your lakehouse in the Fabric portal. To open it, go to your workspace and select a lakehouse item. From here you can browse tables and files, preview data, load new data, and manage lakehouse objects.

The page has two main areas: the **explorer pane** on the left for navigating tables and files, and the **main view** on the right for previewing and interacting with the selected item. A **ribbon** across the top provides quick-access actions.

:::image type="content" source="media\lakehouse-overview\lakehouse-overview.gif" alt-text="Screencast of the Lakehouse explorer showing tables, files, and the main view." lightbox="media\lakehouse-overview\lakehouse-overview.gif":::

## Tables

The **Tables** section of the explorer pane shows the managed area of your lakehouse. This area contains all your Delta tables, organized by [schema](lakehouse-schemas.md) if schemas are enabled.

From the explorer pane, you can:

- Browse schemas, tables, and table details.
- Select a table to preview in the main view.
- Access a table's underlying files from the context menu.
- Rename or delete tables, create schemas or shortcuts, and view table properties.

### Table and file views

When you select a table, the main view shows the table data in a preview datagrid. Use the dropdown to switch between two views:

- **Table view** — Displays the table data as rows and columns. You can sort columns in ascending or descending order, filter data by substring or by selecting from a list of values, and resize columns.
- **File view** — Displays the underlying Delta and Parquet files that back the selected table (stored under `/Tables/schema/tablename/` in OneLake). This view shows the table's internal storage, not the **Files** section in the explorer pane.

:::image type="content" source="media\lakehouse-overview\lakehouse-table-file-view.png" alt-text="Screenshot of the Lakehouse explorer main view showing a table in table view with the dropdown to switch between table view and file view." lightbox="media\lakehouse-overview\lakehouse-table-file-view.png":::

You can switch between table view and file view without going back to the explorer pane.

### Table deep links

You can generate a unique URL for any table so that others can open the Lakehouse explorer with that table already previewed. Select **...** next to the table and choose **Copy URL**.

:::image type="content" source="media\lakehouse-overview\lakehouse-deep-link.png" alt-text="Screenshot showing how to copy a table deep link." lightbox="media\lakehouse-overview\lakehouse-deep-link.png":::

### Unidentified area

The **Unidentified** area appears under **Tables** in the explorer pane when the managed area contains folders or files that the lakehouse can't recognize as Delta tables. Common causes include:

- **Broken shortcuts** — If a shortcut target becomes invalid (for example, after a git sync or deployment pipeline update), the shortcut moves to the Unidentified section until the target is resolved.
- **Non-Delta content written programmatically** — Files written to the `/Tables/` path through the OneLake API or other tools that aren't valid Delta tables appear here.
- **Nested subfolders** — Subfolders placed under `/Tables/` that don't follow the expected Delta table structure are labeled as unidentified.

From this section, you can delete unidentified items or move them to the **Files** section.

## Files

The **Files** section of the explorer pane represents the unmanaged area of your lakehouse — a landing zone for raw data ingested from various sources. The explorer pane shows only folders at the top level. To see individual files, select a folder to open it in the main view.

:::image type="content" source="media\lakehouse-overview\lakehouse-file-view.png" alt-text="Screenshot of the Lakehouse explorer showing the Files section with folders in the explorer pane and file contents in the main view." lightbox="media\lakehouse-overview\lakehouse-file-view.png":::

From the explorer pane, you can:

- Browse your lakehouse directories.
- Select a folder to preview its contents in the main view.
- Rename or delete folders, create subfolders or shortcuts, and upload files and folders.

### File preview

When you select a folder from **Files**, the main view shows the contents of that folder. This is separate from the file view toggle described in [Table and file views](#table-and-file-views).

You can preview the following file types directly in the main view:

- **Image:** jpg, jpeg, png, bmp, gif, svg
- **Text:** txt, js, ts, tsx, py, json, xml, css, mjs, md, html, ps1, yaml, yml, log, sql

For tabular file formats like CSV, the main view also offers a table view that renders the file data as rows and columns, similar to the table preview for Delta tables.

## Reference lakehouses

You can add multiple lakehouses to the explorer pane as references, so you can view and manage them alongside your primary lakehouse. To add a reference lakehouse, select **Add lakehouse** in the explorer pane and choose the lakehouse you want to add.

With reference lakehouses, you can:

- Add any lakehouse you have access to, while keeping your primary lakehouse clearly distinguished.
- Sort, filter, and search across all schemas, tables, and folders in all added lakehouses.
- Preview data, create subfolders, rename objects, and perform other actions directly in the explorer.
- Copy a reference lakehouse URL and paste it into your browser to open the Lakehouse explorer with that lakehouse as the primary.


## Filter, sort, and search

Sorting, filtering, and searching are available in both the explorer pane and the main view to help you find and organize lakehouse objects.

- **Sort** schemas, tables, files, and folders by name or creation date through the object's context menu. Sorting applies to the immediate children of the selected parent node.
- **Filter** objects by type, loading status, or creation date.
    - In the explorer pane: filter schemas and tables.
    - In the main view: filter files and folders.
- **Search** for schemas, tables, files, or folders by entering a substring.
    - In the explorer pane: search schemas and tables.
    - In the main view: search files and folders.


## Download files

You can download files directly from the Lakehouse explorer, from both table files and the **Files** section (with required permissions). Downloaded files include Microsoft Information Protection (MIP) sensitivity labels for supported formats.

To enable file downloads:

1. In the Fabric portal, select the **Settings** gear icon (**&#9881;**) at the top of the page.
1. In the side pane, under **Governance and administration**, select **Admin portal**.
1. Select **Tenant settings**.
1. Under **OneLake settings**, turn on "Users can access data stored in OneLake with apps external to Fabric."

:::image type="content" source="media\lakehouse-overview\lakehouse-download-settings.png" alt-text="Screenshot showing the download setting in tenant settings." lightbox="media\lakehouse-overview\lakehouse-download-settings.png":::

## Ribbon

The ribbon across the top of the Lakehouse explorer provides quick access to common actions: refresh your lakehouse, access item settings, load data, create or open notebooks, create semantic models, and more.

> [!NOTE]
> Ribbon actions apply to the primary lakehouse. They are grayed out when you select a non-primary lakehouse. Any lakehouse in the explorer pane — including a [reference lakehouse](#reference-lakehouses) — can be set as the primary lakehouse.

### SQL analytics endpoint

You can access the [SQL analytics endpoint](lakehouse-sql-analytics-endpoint.md) directly from the dropdown in the top-right area of the ribbon. This opens the T-SQL editor, where you can query your Delta tables with SQL to prepare them for reporting.

## Related content

- [Options to get data into the Fabric Lakehouse](load-data-lakehouse.md)
- [What are lakehouse schemas?](lakehouse-schemas.md)
- [Lakehouse overview](lakehouse-overview.md)