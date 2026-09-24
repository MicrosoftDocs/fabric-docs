---
ms.topic: faq
ms.date: 08/01/2026
title: Intelligence sheets FAQ for Planning in Fabric
description: Intelligence sheets in plan items let you visualize semantic model data with charts, matrices, and KPI cards. Explore answers to the most frequently asked setup questions.
---

# Intelligence sheets FAQ

This FAQ addresses common questions and clarifications that arise while working with intelligence sheets in planning.

## What is the difference between an intelligence sheet and a planning sheet?

* An **intelligence sheet** is a reporting layer that sits on top of a semantic model. It's designed for data visualization by using charts, matrices, KPI cards, Gantt charts, and filters. It doesn't support data entry or writeback.
* A **planning sheet** is where you store and edit planning data. Use it to enter inputs, create forecasts, and write data back.
* The **intelligence sheet** reads data from the semantic model connected to the plan item but doesn't write data back to it.

## Do I need to create a new plan item for every intelligence sheet?

No. You can create multiple intelligence sheets within the same plan item, provided they use the same semantic model.

If you want to use a different semantic model, create a new plan item that connects to that semantic model.

## Does importing a PBIX file publish both a report and a semantic model?

Yes. Importing a PBIX file creates the following items in the Fabric workspace:

* A report.
* A semantic model.

When you create an intelligence sheet, you use the semantic model. If you don't need the report, you can delete it.

## Can I reuse an existing semantic model connection for an intelligence sheet?

Yes. You can reuse an existing semantic model connection when connecting a semantic model to a plan item. You don't need to create a new connection unless you want to use different connection settings.

## What is the difference between Semantic Model and Excel / CSV** on the Get Data page?

* **Semantic Model** creates a live connection to a published Power BI semantic model. The intelligence sheet reflects updates as the semantic model is refreshed.
* **Excel / CSV** imports data from a file. The imported data is static and doesn't update automatically when the source file changes.

## What should I do if the semantic model doesn't appear in the connection dialog?

1. First, use the search option in the connection dialog to locate the semantic model.
1. If the semantic model still doesn't appear, verify that you have access to the workspace that contains the semantic model. If necessary, contact your administrator to confirm that the required workspace permissions are assigned.

## How do I connect a semantic model to an intelligence sheet?

From the **Data** pane, select **Add Semantic Model**, choose the required semantic model, and then select **Connect**.

## Can I use an existing semantic model in an intelligence sheet?

Yes. Intelligence sheets connect directly to an existing semantic model to retrieve measures and dimensions for reporting.

## How do I create an intelligence sheet?

On the **Home** tab, select **New Intelligence Sheet**.

## How do I add a Matrix visual?

From the **Visualization** pane, select **Matrix** and add it to the canvas.

## Which measures should I add to build a profit and loss (P\&L) report?

Add the required measures, such as **Actuals** and **Plan**, to the **Values** section of the **Matrix** visual.

## Which dimensions should I use to build a profit and loss (P&L) report?

Add the **Account Hierarchy** dimension to **Rows** and the **Time** dimension to **Columns**.

## How do I apply the Financial template?

On the **Matrix** tab, select **Templates**, and then choose **Financial**.

## What formatting does the Financial template apply?

The **Financial** template automatically applies the following formatting:

* Indentation.
* Subtotals.
* Bold formatting for parent rows.

## Are bookmarks supported, similar to Power BI?

Yes. Intelligence sheets support bookmarks that you can use to save and switch between different report states, including filters, selections, and visual configurations.

## Can I apply filters at the visual, page, and report levels?

Yes. Intelligence sheets support filters at the following levels:

* **Visual**
* **Page**
* **Report**

This feature gives you control over the data displayed throughout the report.

## Are styling options such as borders and shadows available?

Yes. Intelligence sheets provide a wide range of styling options, including:

* Borders
* Shadows
* Backgrounds
* Corner radius
* Padding
* Other formatting properties

## Can I add shapes or buttons?

Yes. You can add and customize shapes and buttons to create interactive and visually appealing reports.

## Can I add text boxes?

Yes. You can add text boxes anywhere on the canvas and customize them by using:

* Fonts
* Font sizes
* Colors
* Alignment
* Text formatting options

## Can I apply themes, similar to Power BI?

Yes. Intelligence sheets support themes to maintain a consistent look and feel across reports. Use themes to control:

* Colors
* Fonts
* Visual styling
* Formatting

## Can I add or view comments for all visuals in an intelligence sheet?

Yes. You can add and view comments across all supported visuals in an intelligence sheet. Users also receive email notifications for new comments, enabling collaborative review and discussion.

## Is **Edit Interactions** supported, similar to Power BI?

Yes. Intelligence sheets support **Edit Interactions**, which you use to control how visuals interact with one another. You can configure interactions to:

* Filter
* Highlight
* Disable interactions between visuals

## Can I share reports with other users?

Yes. You can share intelligence sheets through Power BI or Microsoft Fabric workspaces. Report access respects the configured user permissions and security settings.

## Can I align and arrange visuals on the canvas?

Yes. Intelligence sheets provide alignment, positioning, and sizing options to help you create pixel-perfect dashboard layouts.

## Can I embed Planning and PowerTable visuals within an intelligence sheet?

Yes. You can embed Planning and PowerTable visuals within an intelligence sheet, so you can combine multiple visual types on a single interactive canvas for reporting and analysis.

## Can I use measures from a planning sheet in an intelligence sheet?

Yes. You can use measures, calculated measures, and planning data from a planning sheet directly in an intelligence sheet.

This feature allows you to combine planning, reporting, and analytics in a single interactive report.

## What is the difference between assigning a hierarchical dimension to the Rows data well versus adding individual dimension fields separately?

When you drag a hierarchy dimension, you add the entire hierarchy in a single action. This action automatically inserts all hierarchy levels as nested rows. This approach is faster than adding each level individually and preserves the parent-child hierarchy.

## What does the "Ragged Hierarchy" toggle under Format > Appearance actually control?

The **Ragged Hierarchy** toggle hides empty or blank child members within a hierarchy and shows only the relevant parent rows. This feature helps reduce unnecessary gaps in the table and makes the hierarchy easier to read.

## What's the difference between "Fit to Header" and "Fit to Content" under Auto Fit?

**Fit to Content** widens each column to match its longest value so data isn't truncated. **Fit to Header** sizes the column to the header label, which can leave long values truncated.

## Do measures need to be added in a specific order into Values, or does order not matter?

Order doesn't affect the underlying data. The **Values** data well holds measure columns shown side by side. The order you choose determines the left-to-right column order on the sheet.
