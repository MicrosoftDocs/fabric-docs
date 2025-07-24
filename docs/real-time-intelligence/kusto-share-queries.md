---
title: Share queries
description: Learn how to share KQL queries in Real-Time Intelligence.
ms.reviewer: tzgitlin
author: spelluru
ms.author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 03/05/2025
ms.search.form: KQL Queryset
---
# Share queries

In this article, you learn how to share Kusto Query Language (KQL) queries. This includes how to share a query link, share the query results, or pin it to a dashboard. For more information about the query language, see [Kusto Query Language overview](/azure/data-explorer/kusto/query/index?context=/fabric/context/context).

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions and data.

## Copy query

To copy and share the queries you create, follow these steps:

1. At the top of the query window, select **Copy query**.

    :::image type="content" source="media/kusto-share-queries/copy.png" alt-text="Screenshot of the Copy query dialog box.":::
1. Select the desired action(s) from the list in the dialog box:
    1. Copy a deep link that can be used to run the query.
        :::image type="content" source="media/kusto-share-queries/link.png" alt-text="Screenshot of the copy query link in the dialog box.":::
    1. Copy the text of the query.
        :::image type="content" source="media/kusto-share-queries/code.png" alt-text="Screenshot of the copy query code in the dialog box.":::
    1. Copy the results of the query.
        :::image type="content" source="media/kusto-share-queries/results.png" alt-text="Screenshot of the copy query results in the dialog box.":::
1. Paste this information to edit or share it, for example in Microsoft Word, Microsoft Teams, or Outlook.

    > [!IMPORTANT]
    > The user who is receiving the query link must have viewing permissions to the underlying data to execute the query and view results.

## Use a shared query

To use a shared query, follow these steps:

1. Open the Real-Time Intelligence link that was shared with you. The link opens as an unsaved, temporary query.
1. Run the query or add other steps to the query.
1. Then either:
    1. Close the query without saving it.
    1. Select **Save to** and then **New KQL queryset** or **Existing KQL queryset**.

        :::image type="content" source="media/kusto-share-queries/save-shared-query.png" alt-text="Screenshot of the Save query dropdown.":::

## Export query data to CSV

To export the query results to a CSV file, follow these steps:

1. In the query window, select the query that you want to export.

1. Select **Export to CSV**.

    :::image type="content" source="media/kusto-share-queries/export-to-csv.png" alt-text="Screenshot of the export to CSV button.":::

## Pin to dashboard

To pin a query to a [Real-Time dashboard](dashboard-real-time-create.md) for continuous monitoring, follow these steps:

1. In the query window, select the query that you want to pin.

1. Select **Pin to dashboard**.

    :::image type="content" source="media/kusto-share-queries/pin-dashboard.png" alt-text="Screenshot of the pin to dashboard button.":::

1. In the **Pin query to dashboard** pane:
    1. Select an existing dashboard or create a new dashboard.
    1. Name your dashboard tile.
    1. Optionally, select **Open dashboard after tile creation** to view your dashboard immediately after creation.
    1. Select **Create**.

        :::image type="content" source="media/kusto-share-queries/pin-query-dashboard.png" alt-text="Screenshot of the Pin query to dashboard window.":::

## Related content

> [!div class="nextstepaction"]
> [Query data in a KQL queryset](kusto-query-set.md)
