---
title: Take ownership of Fabric items
description: This article explains how to take ownership of Fabric items when current owner credentials are no longer valid or accessible.
ms.reviewer: sakjai
ms.author: painbar
author: paulinbar
ms.topic: how-to
ms.date: 12/08/2024
#customer intent: As a member of a workspace that has items that no longer work correctly because the current owner has left the organization, I want to know how to take over ownership of such items and make other changes to get the items working again.
---
# Take ownership of Fabric items

When a user leaves the organization, or if their credentials become disabled for some reason, it's possible that any Fabric items they own will stop working correctly. In such cases, anyone with read and write permissions on such an item (such as workspace admins, members, and contributors) can take ownership of the item, using the procedure described in this article.

When a user takes over ownership of an item using this procedure, they also become the owner of any child items the item might have.

> [!NOTE]
> This article describes the procedure for taking ownership of Fabric items. Power BI items have their own functionality for changing item ownership.

## Prerequisites

To take over ownership of a Fabric item, you must have read and write permissions on the item.

## Steps to take ownership of a Fabric item

To take ownership of a Fabric item:

1. Navigate to the item's settings.

1. In the **About** tab, select **Take over**.

1. A message bar indicates whether the take over was successful. , a message bar will indicate that.

   If the take over fails, due to either parent item ownership failure or child item ownership failure, select **Take over** again.

   | **Operation result** | **Error message** | **Next step** |
   |---|---|---|
   | **Success** | Successfully took over the item. | None. |
   | **Partial Failure** | Can't take over child items. Try again. | Retry take over of parent item. |
   | **Complete Failure** | Can't Take over \<ItemName\>. Try again. | Retry Take over of parent item. |

> [!NOTE]
> Data Pipeline items require the additional step of ensuring that the **Last Modified By** user is also updated after taking item ownership. You can make a small update in the pipeline (e.g. Activity name), to achieve this.

> [!IMPORTANT]
> The take over feature does not cover ownership change of related items. For instance, if a data pipeline has notebook activity, changing ownership of the data pipeline doesn't change the ownership of the notebook. Ownership of related items needs to be changed separately.

## Repair connections after Fabric item ownership change

Some connections that use the previous item owner's credentials may stop working if the new item owner does not have access to the connection. In such cases you might see a warning message.

In this scenario, the new item owner can fix connections by going into the item and replacing the connection with a new or existing connection. Shortcuts can be fixed by going into the **Shortcuts**"** tab in item settings and replacing the details of the connection used. The steps for this procedure in common item types are described in the following sections.

### KQL Queryset

1. Open the KQL queryset.

1. In the **Explorer** pane, add another connection or select an existing one.

   :::image type="content" source="./media/item-ownership-take-over/kql-queryset-add-connection.png" alt-text="Screenshot showing how to add another connection or select an existing one in a KQL Queryset item.":::

### Real-Time Dashboard

1. Open the real-time dashboard in edit mode.

1. Choose **New data source** on the on the tool bar.
 
1. Select **Add+** to add new data sources.

   :::image type="content" source="./media/item-ownership-take-over/real-time-dashboard-add-new-data-sources.png" alt-text="Screenshot showing how to add a new data source in a Kusto Dashboard.":::

1. In the new or existing tile, select the appropriate data source.

### Pipelines

1. Open the pipeline.

1. Select the activity created.

1. Replace the connection in source and/or destination with the appropriate connection.

   :::image type="content" source="./media/item-ownership-take-over/data-pipeline-replace-connection.png" alt-text="Screenshot showing how to add the appropriate connection in a pipeline.":::

#### User data functions

1. Open the item and go to **Manage Connections**.

1. Select **Add data connection** to add a new connection and use that in the data function.

   :::image type="content" source="./media/item-ownership-take-over/user-function-add-data-connection.png" alt-text="Screenshot showing how to add a new connection in a user data function.":::

## Considerations and limitations

* The following Fabric items don't support ownership change.

   * Mirrored Cosmos DB

  * Mirrored SQL DB

  * Mirrored SQL Managed Instance

  * Mirrored Snowflake

   If a mirrored database stops working because the item owner has left the organization or their credentials are disabled, create a new mirrored database.

* There is no API support for changing ownership of Fabric items that support the take over feature. Any existing API functionality for changing ownership of items such as semantic models, reports, dataflows gen1 and gen2, datamarts, and warehouses continues to be available.