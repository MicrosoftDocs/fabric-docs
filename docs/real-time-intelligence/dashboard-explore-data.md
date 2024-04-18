---
title: Explore data in Real-Time Dashboard tiles
description: Learn how to explore data in Real-Time Analytics tiles for more insights about the information rendered in the visual.
ms.reviewer: mibar
author: shsagir
ms.author: shsagir
ms.topic: how-to
ms.date: 04/18/2024
---
# Explore data in Real-Time Dashboard tiles 

The explore data feature allows you to go deeper into the data prepresented in a Real-Time Dashboard tile. You can use the explore data feature as a starting point to explore the data, gain additional insights, and help you create other tiles.

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A dashboard with visuals. For more information, see [Create a Real-Time Dashboard](dashboard-real-time-create.md)

## Explore data

1. On the tile that you'd like to explore, Select the **More menu [...]** > **Explore data**.






---- GA or Preview?

1. NYC Taxi Dashboard
1. Notice analomies on chart of rides
1. Explore data      ---- Expected chart to open looking same as in tile
1. 












//Anomaly Detection
Trips
| where pickup_datetime between(datetime(2009-01-01) .. datetime(2018-07-01))
| make-series RideCount=count() on pickup_datetime from datetime(2009-01-01) to datetime(2018-07-01) step 7d     
| extend anomalies = series_decompose_anomalies(RideCount, 1) 
| render anomalychart with(anomalycolumns=anomalies,title='Anomalies on NY Taxi rides')

y: RideCount, Anomalies
x: pickup_datetime
series: infer