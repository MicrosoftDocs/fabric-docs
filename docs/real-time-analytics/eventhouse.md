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

An Eventhouse allows you to manage multiple databases at once, and consolidate small databases into a larger unit. Sharing and permissions can be set at Eventhouse or database levels. As Eventhouse is in preview, you can create a standalone [KQL database](create-database.md), or a KQL database within an Eventhouse. The KQL database can either be a standard database, or a [database shortcut](database-shortcut.md).

Autoscale

Region/zonality?

Can create an ADX-to-RTA database follower under the EH

Mirroring ? Right now database or table level, will probably be also eventhouse level

## How does it work?


Create EH by putting a name
You are brought to the database that is created simultaneously by default
You can add more databases


:::image type="content" source="media/eventhouse/choose-eventhouse.png" alt-text="Screenshot of choosing Eventhouse from database details page":::

:::image type="content" source="media/eventhouse/databases-in-eventhouse.png" alt-text="Screenshot showing the databases summary in Eventhouse.":::