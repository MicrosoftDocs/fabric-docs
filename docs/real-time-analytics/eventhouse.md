---
title: Eventhouse overview (Preview)
description: Learn about Eventhouse data storage in Real-Time Analytics.
ms.reviewer: sharmaanshul
ms.author: yaschust
author: YaelSchuster
ms.topic: Conceptual
ms.date: 12/21/2023
ms.search.form: Eventhouse
---
# Eventhouse overview (Preview)

In Real-Time Analytics, you interact with your data in the context of Eventhouses, databases, and tables. A single workspace can hold multiple Eventhouses, an Eventhouse can hold multiple databases, and each database can hold multiple tables.

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

An Eventhouse allows you to manage multiple databases at once, and to consolidate small databases into a larger unit for billing purposes. Sharing and permissions can be set at either Eventhouse or database levels. 

While Eventhouse is in preview, you can create a standalone [KQL database](create-database.md), or a KQL database within an Eventhouse. The KQL database can either be a standard database, or a [database shortcut](database-shortcut.md). [Data availability in OneLake](one-logical-copy.md) is still enabled on a database or table level.

Autoscale

Region/zonality?

## Monitor


## Next step

> [!div class="nextstepaction"]
> [Create an Eventhouse](create-eventhouse.md)
