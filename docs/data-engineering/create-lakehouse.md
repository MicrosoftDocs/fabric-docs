---
title: Create a lakehouse in Microsoft Fabric
description: Create a lakehouse in Microsoft Fabric to store and analyze structured and unstructured data with Spark and SQL. Also learn how to delete a lakehouse.
ms.reviewer: avinandac
ms.topic: how-to
ms.custom:
ms.date: 02/22/2026
ms.search.form: Create lakehouse
---

# Create a lakehouse in Microsoft Fabric

A lakehouse in Microsoft Fabric lets data engineers transform data with Spark notebooks and data analysts query it with T-SQL—all against the same Delta Lake storage. When you create a lakehouse, Fabric also generates a [SQL analytics endpoint](lakehouse-sql-analytics-endpoint.md) for T-SQL queries and a default [semantic model](/power-bi/connect-data/service-datasets-understand) for Power BI reporting.

In this article, you learn how to create and delete a lakehouse.

## Prerequisites

A Fabric workspace backed by a trial or paid capacity, with Contributor or higher [workspace permissions](../fundamentals/roles-workspaces.md). If you don't see the option to create a lakehouse, ask your Fabric admin to [assign capacity to the workspace](../admin/capacity-settings.md).

## Create a lakehouse

To create a lakehouse:

1. Open your Fabric workspace.
1. Select **+ New item**.
1. Search for or select **Lakehouse**.

    :::image type="content" source="media\create-lakehouse\new-lakehouse-menu.png" alt-text="Screenshot showing the Lakehouse option in the New menu." lightbox="media/create-lakehouse/new-lakehouse-menu.png":::

1. Enter a name for the lakehouse and select the workspace where you want to create it.
1. The **Lakehouse schemas** checkbox is selected by default. Schemas let you organize tables into logical groups (for example, `sales.orders` and `marketing.campaigns`) instead of placing all tables in a single flat list. Clear the checkbox if you don't need schema-based organization. For more information, see [What are lakehouse schemas?](lakehouse-schemas.md).
1. Select **Create**.

> [!NOTE]
> If your tenant admin configured [sensitivity label policies in Microsoft Purview](/purview/create-sensitivity-labels), you also see a **Sensitivity label** option in the dialog. Use it to classify the lakehouse according to your organization's data protection requirements.

The lakehouse opens in the lakehouse **Explorer** pane, where you can start [loading data](load-data-lakehouse.md).

For information about how to create a lakehouse with the REST API, see [Create Lakehouse - REST API](/rest/api/fabric/lakehouse/items/create-lakehouse)

## Delete a lakehouse

Deleting a lakehouse removes the lakehouse item, all its data, the associated SQL analytics endpoint, and the semantic model. To delete a lakehouse:

1. Open the workspace that contains the lakehouse.
1. Find the lakehouse in the item list.
1. Select the ellipsis **...** next to the lakehouse name for more options.
1. Select **Delete**.

> [!CAUTION]
> Deleting a lakehouse is permanent and can't be undone. The lakehouse, its data, its SQL analytics endpoint, and its semantic model are all removed. 

You can't delete a lakehouse that's referenced by other items—for example, if it's used as a source in a pipeline or by a [Real-Time Intelligence workflow](../real-time-intelligence/overview.md). Remove those references before deleting the lakehouse.

> [!TIP]
> If you accidentally delete a **file inside** a lakehouse (not the lakehouse itself), you might be able to recover it within seven days by using [OneLake soft delete](../onelake/soft-delete.md).

## Related content

- [What is a lakehouse?](lakehouse-overview.md)
- [Options to get data into the Fabric Lakehouse](load-data-lakehouse.md)
- [Navigate the Fabric Lakehouse explorer](navigate-lakehouse-explorer.md)
- [Create Lakehouse - REST API](/rest/api/fabric/lakehouse/items/create-lakehouse)
