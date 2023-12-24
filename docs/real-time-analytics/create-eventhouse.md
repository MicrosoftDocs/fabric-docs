---
title: Create an Eventhouse (Preview)
description: Learn about how to create an Eventhouse for data storage in Real-Time Analytics.
ms.reviewer: sharmaanshul
ms.author: yaschust
author: YaelSchuster
ms.topic: Conceptual
ms.date: 12/24/2023
ms.search.form: Eventhouse
---
# Create an Eventhouse (Preview)


What is an eventhouse? link to overview, blah blah,  [Eventhouse overview (Preview)](eventhouse.md)

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)

## Create an Eventhouse

1. Select **New** > **Eventhouse**.

    :::image type="content" source="media/eventhouse/new-eventhouse.png" alt-text="Screenshot of creating new Eventhouse item in Real-Time Analytics.":::

1. Enter a name for an Eventhouse. Both an Eventhouse and its child KQL database are created with the same name.

    :::image type="content" source="media/eventhouse/create-eventhouse.png" alt-text="Screenshot of creating Eventhouse by entering name in Real-Time Analytics.":::

1. The [database details](create-database.md#database-details) page opens for the default database in the newly created Eventhouse. To view all the databases in this Eventhouse or create new databases, select the **Eventhouse** menu item.

    :::image type="content" source="media/eventhouse/choose-eventhouse.png" alt-text="Screenshot of choosing Eventhouse from database details page":::

1. Select **+ New** to create a new database. Enter a database name.

    :::image type="content" source="media/eventhouse/databases-in-eventhouse.png" alt-text="Screenshot showing the databases summary in Eventhouse.":::

## Delete an Eventhouse

1. Browse to the Eventhouse item in your workspace.
1. Select **More menu** [**...**] > **Delete**.

    :::image type="content" source="media/eventhouse/delete-eventhouse.png" alt-text="Screenshot of deleting Eventhouse.":::

    Both the Eventhouse and all the related KQL databases are deleted and cannot be recovered.

## Related content

* [Eventhouse overview (Preview)](eventhouse.md)
* [Create a KQL database](create-database.md)


YOU WILL BE ABLE TO MANAGE THEM ALL FROM EVENTHOUSE LEVEL?? UPDATE WHEN RELEVANT