---
title: Set alert on Real Time Dashboard or KQL Queryset
description: Describes how to set alerts on a Real-Time Dashboard or KQL Queryset, providing scenario-based examples and step-by-step instructions.
ms.reviewer: guregini
ms.author: spelluru
author: spelluru
ms.topic: concept-article
ms.date: 11/19/2024
ms.subservice: rti-core
ms.custom:
ms.search.form: Data Activator Kusto Dashboard Onramp
#customer intent: I want to learn how to set alerts on a Real-Time Dashboard or KQL Queryset.
---
# Set alert on Real Time Dashboard or KQL Queryset

This capability enables users to easily set alerts on a [Real-Time Dashboard](dashboard-real-time-create.md) or on the result set of a [KQL Queryset](kusto-query-set.md) using the Fabric [!INCLUDE [fabric-activator](includes/fabric-activator.md)] no-code side pane to benefit from the capabilities of [!INCLUDE [fabric-activator](includes/fabric-activator.md)] on data from an [Eventhouse](eventhouse.md).

## Steps - Real-Time Dashboard

:::image type="content" source="media/user-flows/user-flow-6-1.png" alt-text="Schematic of user flow starting from Real-Time Dashboard and going to Activator.":::

1. In a Real-Time Dashboard, select the **More menu [...]** on the desired tile and set an alert.
1. Set the alert conditions and create an alert.
1. Optionally, further modify the conditions and actions in [!INCLUDE [fabric-activator](includes/fabric-activator.md)].

For more information, see [Create alerts from a Real-Time Dashboard](data-activator/activator-get-data-real-time-dashboard.md).

## Steps - KQL Queryset

:::image type="content" source="media/user-flows/user-flow-6-2.png" alt-text="Schematic of user flow starting from KQL Queryset and going to Activator.":::

1. In a KQL Queryset, create a query. This query can either trigger an alert when a scheduled KQL query returns results, or when conditions are met on data in the query result.
1. Set the alert conditions and create an alert.
1. Optionally, further modify the alert in [!INCLUDE [fabric-activator](includes/fabric-activator.md)].

For more information, see [Create alerts from a KQL Queryset](data-activator/activator-alert-queryset.md).

## Potential use cases

* **Real-Time Dashboard**: This feature lets you monitor live data trends by setting conditions on visualizations. For instance, if you visualize sales data distribution across product categories in a pie chart, you can set an alert to notify you if the share of any category drops below a certain threshold. This helps you quickly identify and address potential issues with that product line. 
* **KQL Queryset**: For example, on a KQL database that tracks application logs, you can configure an alert to notify you if the query, scheduled at a frequency of your choice (for example, every 5 minutes), returns any logs where the message field contains the string "error". 
