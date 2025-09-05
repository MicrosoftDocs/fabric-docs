---
title: Sources Supported by Fabric Eventstreams
description: This include file has the list of sources that Fabric eventstreams support. 
ms.author: xujiang1
author: xujxu 
ms.topic: include
ms.custom:
ms.date: 05/21/2024
---


| Transformation          | Description |
| --------------- | ---------- |
| **Filter** |  Use this transformation to filter events based on the value of a field in the input. Depending on the data type (number or text), the transformation keeps the values that match the selected condition, such as `is null` or `is not null`. |
| **Manage fields** | Use this transformation to add, remove, change data type, or rename fields coming in from an input or another transformation. |
| **Aggregate** | Use this transformation to calculate an aggregation (sum, minimum, maximum, or average) every time a new event occurs over a period of time. This operation also allows for the renaming of these calculated columns, along with filtering or slicing the aggregation based on other dimensions in your data. You can have one or more aggregations in the same transformation. |
| **Group by** | Use this transformation to calculate aggregations across all events within a certain time window. You can group by the values in one or more fields. It's like the **Aggregate** transformation in that it allows for the renaming of columns, but it provides more options for aggregation and includes more complex options for time windows. Like **Aggregate**, you can add more than one aggregation per transformation. |
| **Union** | Use this transformation to connect two or more nodes and add events with shared fields (with the same name and data type) into one table. Fields that don't match are dropped and not included in the output. |
| **Expand** | Use this transformation to create a new row for each value within an array. |
| **Join** | Use this transformation to combine data from two streams based on a matching condition between them. |
