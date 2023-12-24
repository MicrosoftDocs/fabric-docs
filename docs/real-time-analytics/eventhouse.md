---
title: Eventhouse data storage (Preview)
description: Learn about Eventhouse data storage in Real-Time Analytics.
ms.reviewer: sharmaanshul
ms.author: yaschust
author: YaelSchuster
ms.topic: Conceptual
ms.date: 12/21/2023
ms.search.form: Eventhouse
---
# Eventhouse (Preview)

In Real-Time Analytics, you interact with your data in the context of Eventhouses, databases, and tables. A single workspace can hold multiple Eventhouses, an Eventhouse can hold multiple databases, and each database can hold multiple tables.

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

An Eventhouse allows you to manage multiple databases at once, and to consolidate small databases into a larger unit for billing purposes. Sharing and permissions can be set at either Eventhouse or database levels. 

While Eventhouse is in preview, you can create a standalone [KQL database](create-database.md), or a KQL database within an Eventhouse. The KQL database can either be a standard database, or a [database shortcut](database-shortcut.md). [Data availability in OneLake](one-logical-copy.md) is still enabled on a database or table level.

Autoscale

Region/zonality?

## How does it work?

1. Create a new item from the workspace homepage.

    :::image type="content" source="media/eventhouse/new-eventhouse.png" alt-text="Screenshot of creating new Eventhouse item in Real-Time Analytics.":::

1. When you enter a name for an Eventhouse, both an Eventhouse and a KQL database are created with the same name. 

    :::image type="content" source="media/eventhouse/create-eventhouse.png" alt-text="Screenshot of creating Eventhouse by entering name in Real-Time Analytics.":::

1. You can add more databases to the existing Eventhouse. 
1. When you are on the database details page for any of the databases that is a child of the Eventhouse, select the **Eventhouse** menu item to view Eventhouse level information.

    :::image type="content" source="media/eventhouse/choose-eventhouse.png" alt-text="Screenshot of choosing Eventhouse from database details page":::


    :::image type="content" source="media/eventhouse/databases-in-eventhouse.png" alt-text="Screenshot showing the databases summary in Eventhouse.":::


YOU WILL BE ABLE TO MANAGE THEM ALL FROM EVENTHOUSE LEVEL?? UPDATE WHEN RELEVANT