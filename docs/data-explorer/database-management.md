---
title: Manage 
description: Learn how to use the manage ribbon to manage your database.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.prod: analytics
ms.technology: data-explorer
ms.topic: how-to
ms.date: 12/18/2022
---

# Manage

To manage your data, select **Manage** on the **home** tab.

You can modify the following database settings:

* [Data retention policy](#data-retention-policy)
* [Continuous export](#continuous-export)
* [Data connections](#data-connections)

## Data Retention policy

To control the mechanism that automatically removes data from your database, see [Retention policy](#data-retention-policy). By default, your data is stored for 100 years.

:::image type="content" source="media/database-management/data-retention-policy.png" alt-text="Screenshot of data retention policy pane.":::

## Continuous export

To enable continuous data export, you need to have database admin permissions.

To learn more about continuous export, see [Continuous data export overview](#continuous-export).

:::image type="content" source="media/database-management/continuous-export.png" alt-text="Screenshot of Continuous Export dropdown pane.":::

## Data connections

Ingestion can be done as a one-time operation, or as a continuous method using Event Hub. To establish a continuous data connection, [Create a data connection in Trident](get-data-event-hub.md#create-a-data-connection-in-trident).

:::image type="content" source="media/database-management/data-connections.png" alt-text="Screenshot of Data Connections pane.":::
