---
title: Manage Query Actions
description: Learn how to duplicate, delete, refresh, and group queries.
ms.date: 06/17/2026
ms.topic: how-to
---

# Manage query operations

Use the query context menu to perform common query tasks. From the context menu, you can rerun queries, delete queries, organize queries into groups, copy query identifiers, and access other query-specific actions.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

Hover over a query and select **More options** (...) to duplicate, group, delete, or refresh queries.

:::image type="content" source="media/infobridge-how-to-manage-queries/manage-query-options.png" alt-text="Screenshot of the query context menu with the list of operations." lightbox="media/infobridge-how-to-manage-queries/manage-query-options.png":::

## Rerun a query

Rerun the query to refresh transformations and apply the latest results.

## Refresh a query

* **Refresh now**: Trigger a source refresh to pull the latest changes after you add dimensions or measures, or update native measure values.
* **Refresh history**: View the logs and milestones for source refresh jobs.

:::image type="content" source="media/infobridge-how-to-manage-queries/refresh-history.png" alt-text="Screenshot of refresh logs with the job ID, timestamp, status, and person who triggered the refresh." lightbox="media/infobridge-how-to-manage-queries/refresh-history.png":::


## Duplicate a query

Create a copy or a backup of your query. Use this option to preserve the original query and transform the copy.

:::image type="content" source="media/infobridge-how-to-manage-queries/duplicate-query.png" alt-text="Screenshot of creating a copy of a query with the duplicate option" lightbox="media/infobridge-how-to-manage-queries/duplicate-query.png":::

## Copy the query identifier

The query GUID (globally unique identifier) uniquely identifies a query. Use the GUID in a formula to look up values from a query without importing the measure into the planning sheet.

## Group queries

Create groups to logically organize related queries. To create a group, select **Move to Group** > **New Group** and enter the group name.

:::image type="content" source="media/infobridge-how-to-manage-queries/create-group.png" alt-text="Screenshot of option to create a new query group." lightbox="media/infobridge-how-to-manage-queries/create-group.png":::

Repeat this step to move queries into different folders.

:::image type="content" source="media/infobridge-how-to-manage-queries/multiple-query-groups.png" alt-text="Screenshot of creating multiple query groups." lightbox="media/infobridge-how-to-manage-queries/multiple-query-groups.png":::

> [!TIP]
> Hover over a folder and select **More options** (...) > **Ungroup** to remove queries from the group and delete the folder.
