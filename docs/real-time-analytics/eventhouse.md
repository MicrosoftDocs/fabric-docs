---
title: Eventhouse overview (Preview)
description: Learn about Eventhouse data storage in Real-Time Analytics.
ms.reviewer: sharmaanshul
ms.author: yaschust
author: YaelSchuster
ms.topic: Conceptual
ms.date: 01/15/2024
ms.search.form: Eventhouse
---
# Eventhouse overview (Preview)

In Real-Time Analytics, you interact with your data in the context of Eventhouses, databases, and tables. A single workspace can hold multiple Eventhouses, an Eventhouse can hold multiple databases, and each database can hold multiple tables. An Eventhouse allows you to manage multiple databases at once, sharing capacity and resources to optimize performance and cost. It provides unified monitoring and management across all databases and per database.

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

While Eventhouse is in preview, you can create a standalone [KQL database](create-database.md), or a KQL database within an Eventhouse. The KQL database can either be a standard database, or a [database shortcut](database-shortcut.md). [Data availability in OneLake](one-logical-copy.md) is still enabled on a database or table level.

## Guaranteed availability

In general, an autoscale mechanism is used to determine the size of each KQL database. This mechanism ensures cost and performance optimization based on your usage pattern. You can, however, set a minimum available CU size by enabling **Guaranteed availability** on the Eventhouse level. This compute is available to all the databases within the specified Eventhouse. 

When you enable **Guaranteed availability**, you also select the size that corresponds to the minimum [capacity units (CUs)](../admin/service-admin-portal-capacity-settings.md) allotted to this Eventhouse. The following table maps the size to the minimum CUs:

| Name        | Minimum CUs|
|-------------|------------|
| Extra Small | 8.5        |
| Small       | 13         |
| Medium      | 18         |
| Large       | 26         |
| Extra Large | 34         |
| 2X Large    | 56         |

For instructions on how to enable guaranteed availability, see [Enable guaranteed availability](create-eventhouse.md#enable-guaranteed-availability).


## Next step

> [!div class="nextstepaction"]
> [Create an Eventhouse](create-eventhouse.md)
