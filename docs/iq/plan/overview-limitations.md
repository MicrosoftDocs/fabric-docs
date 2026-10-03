---
title: Known Limitations in Planning
description: This article lists known issues and limitations present in planning in Fabric.
ms.topic: concept-article
ms.date: 09/23/2026
#customer intent: As a user, I want to know the limitations present in planning.
---

# Known limitations in planning

Review the following known issues and limitations before you begin working with planning in Fabric.

Supported limits might vary depending on client resources, Fabric capacity, and Power BI XMLA query limits.

## B2B user support

Planning in Fabric doesn't support Microsoft Entra B2B IDs.

## Private link support

Workspaces or tenants that use [private links](../../security/security-private-links-overview.md#what-is-a-private-endpoint) don't support plan items.

## Semantic model

* You must have *Read* and *Build* permissions on the semantic model to attach it to a plan. *Read* permission is sufficient to read model data in a plan.
* Each plan item connects to one semantic model, and you can't change it after you connect it. If you need to plan against different data sources, you must create separate plan items.
* Semantic models published in *My workspace* aren't supported.
* Composite models are supported in Planning, while support for individual configurations depends on the capabilities of the underlying semantic model, including storage modes, data sources, and authentication.
* If the semantic model contains unsupported Unicode characters, inserting a Data input column in a planning sheet might fail.
* Don't rename a semantic model that's connected to a plan item. Renaming the semantic model breaks the connection, and the plan item no longer works with the renamed semantic model.

### Row-level security (RLS) behavior

* RLS and object-level security (OLS) are evaluated based on the signed-in user's permissions on the connected semantic model.

## Writeback limitations

* Planning in Fabric supports writeback only to Fabric SQL databases.
* Writeback stores planning data separately in Fabric SQL. It doesn't update the connected semantic model.
* For Long and Wide writeback formats, subsequent writeback replaces existing rows when all dimension columns and values match. To retain previous values as change history, use Long with Changes or Wide with Changes.
* Deleting a row in a planning sheet doesn't delete the corresponding row from the destination Fabric SQL table. To remove data from the SQL database, you must delete it directly in the database.

## Capacities supported

Power BI Pro and Power BI Premium Per User (PPU) aren't supported for planning scenarios that use XMLA endpoints. Similarly, lower-capacity SKUs that don't support XMLA endpoints are also unsupported.

## PowerTable limitations

The following limitations apply to PowerTable sheets.

### DMTS connection recovery

If you delete the DMTS connection that you configured for a PowerTable sheet, or if it becomes unavailable, you can't open the sheet to update the connection. The connection recovery screen doesn't appear, and you see the message "DMTS connection is deleted or not found."

To recover, create a new PowerTable sheet by using the **Existing Table** option and configure the same table again.

### Excel export limitations

Excel export (Raw mode) supports up to 20 million cells or 1 million rows, while Excel export (Label mode) supports up to 5 million cells.

### Sort row limit

Sort supports a maximum of 5 million rows. Sort isn't supported when the total number of rows exceeds 5 million.

### Group By row limit

Group By supports a maximum of 5 million rows. Group By isn't supported when the total number of rows exceeds 5 million.

### Insight row limit

Insight supports up to 5 million rows. Insight isn't supported when the total number of rows exceeds 5 million.

### Find and Replace row limit

Find and Replace supports up to 5 million rows. Find and Replace isn't supported when the total number of rows exceeds 5 million.

### Snapshot limitations

Snapshot export in Gantt supports up to 100,000 rows, and you can create up to 5 snapshots per table.

### Automation Find Action record limit

Find Action fetches only the first 1,000 records.

### Automation repeated group iteration limit

A repeating group processes only the first 1,000 items. Additional items beyond this limit aren't processed.

### Cascading automation trigger depth limit

Cascading automation triggers support up to 2 levels, including the initial trigger. Automation chains can't extend beyond two trigger levels, and further cascading triggers aren't executed.

### Multiple record operations in automation

Multiple record operations aren't supported in subsequent automation actions. Subsequent actions support only single-record operations.

### Automation database trigger writeback limit

Create Record, Update Record, Delete Record, and Form Submission database triggers support writeback of up to 10 records per trigger type. If a user writes back more than 10 records, automation jobs aren't triggered for any of the records. The system doesn't partially execute the automation for the first 10 records.

### Scroll bar row limit

Scroll bar supports up to 5 million rows. Scroll bar isn't supported when the total number of rows exceeds 5 million. Users can navigate the table only through pagination.

### Gantt and Resource Layout row limit

Gantt and Resource Layout support up to 30,000 rows. Gantt and Resource Layout aren't supported when the total number of rows exceeds 30,000.

## CI/CD service principal support

> [!NOTE]
> Application database creation for plan items is now supported when using a service principal with deployment pipelines.

## Deployment pipelines will fail with 100 Data Input items

Deployment pipelines will fail when a plan item contains 100 Data Input items. A fix will be available soon.

## When you receive a "Something went wrong" error

If you encounter a "Something went wrong" error that could be caused by a database connection issue, wait up to 90 minutes and try again. A fix will be available soon.

## Workspace renaming

Don't rename a workspace that contains a plan item. Renaming the
workspace breaks the plan item, and the item no longer opens.

## Bulk data input limit

Bulk data input supports up to 1 million rows. Uploading more than 1 million rows from an Excel or CSV file isn't supported and might cause the upload to fail.

## Maximum number of sheets per item

A plan item supports up to 25 sheets. Keep the number of sheets within this limit to avoid problems when working with the item.

## Maximum number of visuals per item

A plan item supports up to 50 visuals. Keep the number of visuals within this limit to avoid problems when working with the item.

## Infobridge cell limit

Each Infobridge query in a planning sheet supports up to 1.2 million cells. Queries that exceed this limit might fail to load or process.

To work with larger datasets, split the data across multiple planning sheets and append the queries. This approach supports a consolidated workbook of up to about 5 million cells (for example, across five planning sheets).

## Writeback cell limit

Writeback supports up to 1.2 million cells per operation. Writeback operations that exceed this limit aren't supported and might fail.
