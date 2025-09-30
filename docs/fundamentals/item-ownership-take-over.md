---
title: Take ownership of Fabric items
description: This article explains how to take ownership of Fabric items when current owner credentials are no longer valid or accessible.
ms.reviewer: sakjai
author: SnehaGunda
ms.author: sngun
ms.topic: how-to
ms.date: 01/31/2025
#customer intent: As a member of a workspace that has items that no longer work correctly because the current owner has left the organization, I want to know how to take over ownership of such items and make other changes to get the items working again.
---
# Take ownership of Fabric items

When a user leaves the organization, or if they don't sign in for more than 90 days, it's possible that any Fabric items they own will stop working correctly. In such cases, anyone with read and write permissions on such an item (such as workspace admins, members, and contributors) can take ownership of the item, using the procedure described in this article.

When a user takes over ownership of an item using this procedure, they also become the owner of any child items the item might have. You can't take over ownership of child items directly - only through the parent item.

> [!NOTE]
> Items such as semantic models, reports, datamarts, dataflows gen1 and dataflows gen2 have existing functionality for changing item ownership that remains the same. This article describes the procedure for taking ownership of other Fabric items.

## Prerequisites

To take over ownership of a Fabric item, you must have read and write permissions on the item.

## Take ownership of a Fabric item

To take ownership of a Fabric item:

1. Navigate to the item's settings. Remember, the item can't be a child item.

1. In the **About** tab, select **Take over**.

1. A message bar indicates whether the take over was successful.

   If the take over fails for any reason, select **Take over** again.

   | **Operation status** | **Error message** | **Next step** |
   |---|---|---|
   | **Success** | Successfully took over the item. | None. |
   | **Partial Failure** | Can't take over child items. Try again. | Retry take over of parent item. |
   | **Complete Failure** | Can't take over \<item_name\>. Try again. | Retry take over of parent item. |

> [!NOTE]
> Pipeline items require the additional step of ensuring that the **Last Modified By** user is also updated after taking item ownership. You can do this by making a small edit to the item and saving it. For example, you could make a small change to the activity name.

> [!IMPORTANT]
> The take over feature doesn't cover ownership change of related items. For instance, if a pipeline has notebook activity, changing ownership of the pipeline doesn't change the ownership of the notebook. Ownership of related items needs to be changed separately.

## Repair connections after Fabric item ownership change

Some connections that use the previous item owner's credentials might stop working if the new item owner doesn't have access to the connection. In such cases, you might see a warning message.

In this scenario, the new item owner can fix connections by going into the item and replacing the connection with a new or existing connection. The following sections describe the steps for doing this procedure for several common item types. For other item types that have connections, refer to the item's connection management documentation.

### Pipelines

1. Open the pipeline.

1. Select the activity created.

1. Replace the connection in the source and/or destination with the appropriate connection.

   :::image type="content" source="./media/item-ownership-take-over/data-pipeline-replace-connection.png" alt-text="Screenshot showing how to add the appropriate connection in a pipeline.":::

### KQL Queryset

1. Open the KQL queryset.

1. In the **Explorer** pane, add another connection or select an existing one.

### Real-Time Dashboard

1. Open the real-time dashboard in edit mode.

1. Choose **New data source** on the tool bar.
 
1. Select **Add+** to add new data sources.

1. In the new or existing tile, select the appropriate data source.

### User data functions

1. Open the item and go to **Manage Connections**.

1. Select **Add data connection** to add a new connection and use that in the data function.

### Dataflow Gen2 (CI/CD) 
This is a separate item from Dataflows Gen1 and Gen2. Refer to the creation experience [here](/fabric/data-factory/dataflow-gen2-cicd-and-git-integration).
1. Open the item and go to **Manage Connections**.
2. Navigate to the relevant connection and select **Edit Connection** to make updates.

## Considerations and limitations

* The following Fabric items don't support ownership change.

   * Mirrored Cosmos DB

   * Mirrored SQL DB

   * Mirrored SQL Managed Instance

   * Mirrored Snowflake

   * Mirrored database

   If a mirrored database stops working because the item owner has left the organization or their credentials are disabled, create a new mirrored database.

* The option to take over an item isn't available if the item is a system-generated item not visible or accessible to users in a workspace. For instance, a parent item might have system-generated child items - this can happen when items such as Eventstream items and Activator items are created through the Real-Time hub. In such cases, the take over option is not available for the parent item.

* Currently, there's no API support for changing ownership of Fabric items. This doesn't impact existing functionality for changing ownership of items such as semantic models, reports, dataflows gen1 and gen2, and datamarts, which continues to be available. For information about taking ownership of warehouses, see [Change ownership of Fabric Warehouse](/fabric/data-warehouse/change-ownership).

* This Fabric-item takeover feature doesn't cover ownership takeover as a service principal.
