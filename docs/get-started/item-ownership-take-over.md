---
title: Take ownership of Fabric items
description: This article explains how to take ownership of Fabric items when current owner credentials are no longer valid or accessible.
ms.reviewer: sakjai
ms.author: painbar
author: paulinbar
ms.topic: how-to
ms.date: 11/20/2024
#customer intent: As a member of a workspace that has items that no longer work correctly because the current owner has left the organization, I want to know how to take over ownership of such items and make other changes to get the items working again.
---
# Take ownership of Fabric items

The Take Over feature allows users with write permissions on an item (including Admin, Members, Contributors and anyone who receives write permissions through sharing) to take ownership of Fabric items in a workspace, through the item settings UI. 

This feature is useful in a situation where the item stops working due to the original item owner no longer being present in the company or their credentials becoming inactive.

> [!NOTE]
> Power BI items already have functionality to change ownership.

## Steps to Take ownership of a Fabric item

This feature allows users to set themselves as the owner for an item and its child items. This means all items in the parent child hierarchy will have the same owner.

1. Navigate to Item Settings for the Fabric Item. 
1. In the About tab, click Take over.
1. If the operation is successful, the message bar will indicate that.
1. If the operation failed either due to parent item ownership failure or child item ownership failure, you would need to retry Take over. 

   | **States** | **Next step** | **Error message** |
   |---|---|---|
   | **Success** | None | Successfully took over the item. |
   | **Partial Failure** | Retry Take over of parent item | Can't Take over child items. Try again. |
   | **Complete Failure** | Retry Take over of parent item | Can't Take over [ItemName]. Try again. |

**Note1:** Data Pipeline Item requires an additional step of ensuring the Last Modified By user is also updated after taking item ownership. You can make a small update in the Pipeline (e.g. Activity name), to achieve this.<br>

**Note2:** This feature does not cover ownership change of related items. For instance, if a Data pipeline has Notebook activity, the ownership change of Data Pipeline does not change the ownership of the Notebook. Ownership of related items needs to be changed separately.

## Connections after Fabric item ownership change

Some connections using the previous item owner's credentials may stop working if the new item owner does not have access to the connection. You may see a warning message 

In this scenario, the new item owner can fix connections by going into the item and replacing the connection with a new or existing connection. Shortcuts can be fixed by going into the "Shortcuts" tab in Item settings and replacing the connection used, details. Detailed steps can be found below for connections.

### Steps to modify data connections

#### KQL Queryset

1. Within the KQL Queryset item, in the Explorer pane on the left, add another connection or select an existing one.

   :::image type="content" source="media/image1.png" alt-text="Screenshot showing how to add another connection or select an existing one in a KQL Queryset item.":::

#### Kusto Dashboard

1. Go to "New data source" on the Item home page.
1. Click "Add+" to add new data sources.

   :::image type="content" source="media/image2.png" alt-text="Screenshot showing how to add a new data source in a Kusto Dashboard.":::

1. In the new or existing tile, select the appropriate data source.<br>

#### Pipelines

1. Within the Pipeline item, click on the activity created.
1. Replace the connection in Source and/or Destination with the appropriate connection.

   :::image type="content" source="media/image3.png" alt-text="Screenshot showing how to add the appropriate connection in a pipeline.":::

#### User data functions

1. Go to "Manage Connections" within the item.
1. Click on "Add data connection" to add a new connection and use that in the data function.

   :::image type="content" source="media/image4.png" alt-text="Screenshot showing how to add a new connection in a user data function.":::

## Limitations

* The following Fabric items don't support ownership change.

  * Mirrored Cosmos DB

  * Mirrored SQL DB

  * Mirrored SQL Managed Instance

  * Mirrored Snowflake 

* There is no API support for changing ownership of Fabric items that support the Take over feature. This does not impact existing functionality available for items such as semantic models, reports, dataflows gen1 and gen2, datamarts, and warehouses.