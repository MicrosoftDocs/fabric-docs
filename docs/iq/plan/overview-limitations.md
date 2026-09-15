---
title: Known Limitations in Planning
description: This article lists known issues and limitations present in planning in Fabric.
ms.topic: concept-article
ms.date: 09/10/2026
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

* You must have *Admin* or *Build* permissions on the semantic model.
* Semantic models in Direct Lake mode require [additional configuration](planning-how-to-create-semantic-model-connection.md#connect-to-a-direct-lake-semantic-model).
* Semantic model connections only support OAuth-based and service principal-based authentication.
* Semantic models published in *My workspace* aren't supported.
* Composite models aren't supported.
* If the semantic model contains unsupported Unicode characters, inserting a Data input column in a planning sheet might fail.

## Semantic model renaming

Don't rename a semantic model that's connected to a plan item. Renaming the semantic model breaks the connection, and the plan item no longer works with the renamed semantic model.

## Capacities supported

Power BI Pro and Power BI Premium Per User (PPU) aren't supported for planning scenarios that use XMLA endpoints and embed tokens. Similarly, lower-capacity SKUs that don't support XMLA endpoints are also unsupported.

## PowerTable limitations

### Database-level row-level security (RLS) support

PowerTable doesn't support user-specific database-level row-level security (RLS) when connecting to Fabric SQL tables through a database connection. As a result, users might see rows that differ from the expected RLS-filtered results. This limitation exists because PowerTable executes all database queries by using the identity associated with the database connection that the user configures during sheet creation, rather than the identity of the signed-in PowerTable user.

Blend (From Sheets) doesn't support RLS. All data available in the source sheet is visible regardless of the viewer's RLS permissions.

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

### Scrollbar row limit

Scrollbar supports up to 5 million rows. Scrollbar isn't supported when the total number of rows exceeds 5 million. Users can navigate the table only through pagination.

### Gantt and Resource Layout row limit

Gantt and Resource Layout support up to 30,000 rows. Gantt and Resource Layout aren't supported when the total number of rows exceeds 30,000.

## Workspace permissions

* Users with the *Contributor* role can't create or share cloud connections.
* Users with lower-level workspace roles, such as *Contributor*, can't create plan items that require embed token generation.

## CI/CD service principal support

Automatic application database creation isn't supported when deploying plan items through CI/CD by using a service principal.

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
