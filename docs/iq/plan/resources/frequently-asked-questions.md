---  
title: "Fabric Plan (preview) Frequently Asked Questions"
description: "Frequently asked questions about plan (preview)."
ms.topic: faq
ms.date: 07/18/2026
---

# Plan (preview) general FAQ

This FAQ addresses common questions and clarifications that arise while working with plan. It covers environment setup and interface navigation.

[!INCLUDE [Fabric feature-preview-note](../../../includes/feature-preview-note.md)]

For feature-specific FAQs, see the following articles:
* [Writeback FAQ](../planning-writeback/writeback-faq.md)

## What permissions do I need to create a plan app?

You need Contributor or higher access to the Fabric workspace and at least Build access to the semantic model you want to connect.

## Can I connect one plan app to multiple semantic models or change the semantic model after I create the plan app?

No—each plan app connects to one semantic model, and you can't change it after you connect it. If you need to plan against different data sources, you must create separate plan apps.

## What happens if my semantic model isn't visible in the connection dialog?

Ensure that you have at least Viewer access to the workspace where the semantic model is published. The semantic model doesn't need to be in the same Fabric workspace as your report or item, because you can access it across workspaces. Still, you need at least viewer-level permissions on its host workspace to see it in the dialog. If it still doesn't appear, try refreshing the connection or signing out and back in.

## As a contributor, can I create my own semantic model connection?

No, contributors can't create a semantic model connection directly. If you only have contributor access, the workspace admin should create the connection, and you can use it.

## What is the Fabric SQL database used for?

The Fabric SQL database is where Fabric Planning stores all plan data—inputs, forecasts, scenarios, and writeback entries. It's separate from the semantic model so that you can write plan data back without affecting the underlying actuals or reporting layer.

## What's the difference between the semantic model connection and the SQL database connection?

The semantic model connection pulls your actuals and reporting data in for planning, whereas the SQL database connection is a separate connection that supports collaboration. You use it to save and share the plan, and you set it up after you build the planning sheet.

## Can I reuse an existing connection instead of creating a new one?

Yes. In the connection dropdown, select an existing connection instead of choosing **Create a new connection**, as long as it meets the [prerequisites](../overview-prerequisites.md).

## Do I need to create the plan app before or after the SQL database?

This flow creates the SQL database first, but the two items are independent—creating one doesn't depend on the other. However, the SQL database should exist before you attempt writeback, because you can only write planning data back to a Fabric SQL database, not any other data source.

## What is the difference between semantic model data and From Sheets data in the Data pane?

Semantic model data is read-only actuals and reference data pulled directly from your Power BI semantic model—historical revenue, dates, and product hierarchies. From Sheets data is data created within Fabric Planning (forecasts, targets, sales plans) and available for use in other sheets.

## Can I add dimensions from different tables to the same planning sheet?

Yes—as long as the tables are related in the semantic model, you can combine dimensions from different tables in the rows, columns, and values of a single planning sheet. If the tables aren't related, the values don't cross-filter correctly.

## If I change the field assignments on a planning sheet—for example, moving a dimension out of Rows or removing a measure from Values—does it affect the underlying data?

No—field assignments are a display configuration only. Adding, removing, or rearranging what appears in **Rows**, **Columns**, and **Values** on a planning sheet doesn't alter the data in the semantic model or the Fabric SQL database. It only changes what appears on that sheet.

## What is the difference between a visual-level filter and a global filter?

A visual-level filter applies only to the current planning sheet and doesn't affect other sheets in the plan app. A global filter applies across all sheets.

## How do I navigate a sheet with a large number of rows?

Use the footer's **Settings** control to configure how many rows appear per page. Then, use the page navigation controls—first, previous, next, and last—to move between pages. For columns that extend beyond the visible area, use the horizontal scrollbar at the bottom of the canvas or reduce the zoom level by using the zoom slider in the footer. Collapsing the **Explorer** pane and sidebar panels also gives the canvas more space.

## Can I export to PDF or CSV as well as Excel?

Yes—the **Export** dialog offers PDF, Excel, and CSV.

* PDF produces a fully formatted, paginated export that preserves layout, cell values, number formatting, notes, filters, and calculated rows and columns. Use advanced options to configure page size, orientation, content order, scaling, margins, and whether to include comments, filter information, or a logo.
* Excel export is for further analysis and data manipulation, with three export modes: Fully Expanded (all hierarchy levels expanded flat), With Expand/Collapse (hierarchy grouping controls preserved in Excel), and Current State (exports exactly what's currently visible on screen, including applied filters and expanded levels).
* CSV is a flat data export that's useful for downstream processing, but it doesn't preserve hierarchy, formatting, or layout.

## What actions can I perform and save while in reading mode?

Viewing mode isn't purely static. While it locks down the core design of your report, it keeps the planning sheet highly interactive for day-to-day work. However, there's a clear distinction between temporary visual changes and saved planning actions.

1. Temporary Actions (Not Saved)

    Customize your view on the fly by changing sheet layouts, updating number formatting, applying Top N rules, or filtering data. However, these visual adjustments are temporary and aren't saved when you exit or refresh the report.

1. Saved Actions

    Viewing mode saves and commits the following core planning and data entry actions:
    
    * Data Inputs: Type numbers directly into cells, as well as bulk edit, allocate, and distribute values across rows and columns.
    * Forecasts: Change planning assumptions and distribute the updated impacts across your forecast columns.
    * Comments: Add, update, and manage commentary.
    * Writeback: Commit your data changes back to the backend database—provided the report author already configured an active writeback destination.
    
