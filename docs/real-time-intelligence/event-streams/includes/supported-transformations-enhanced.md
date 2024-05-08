---
title: Sources supported by Fabric event streams
description: This include file has the list of sources supported by Fabric event streams. 
ms.author: xujiang1
author: xujxu 
ms.topic: include
ms.custom:
  - build-2024
ms.date: 04/24/2024
---


| Transformation          | Description |
| --------------- | ---------- |
| Filter |  Use the Filter transformation to filter events based on the value of a field in the input. Depending on the data type (number or text), the transformation keeps the values that match the selected condition, such as `is null` or `is not null`. |
| Manage fields | The Manage fields transformation allows you to add, remove, change data type, or rename fields coming in from an input or another transformation. |
| Aggregate | Use the Aggregate transformation to calculate an aggregation (Sum, Minimum, Maximum, or Average) every time a new event occurs over a period of time. This operation also allows for the renaming of these calculated columns, and filtering or slicing the aggregation based on other dimensions in your data. You can have one or more aggregations in the same transformation. |
| Group by | Use the Group by transformation to calculate aggregations across all events within a certain time window. You can group by the values in one or more fields. It's like the Aggregate transformation allows for the renaming of columns, but provides more options for aggregation and includes more complex options for time windows. Like Aggregate, you can add more than one aggregation per transformation. |
| Union | Use the Union transformation to connect two or more nodes and add events with shared fields (with the same name and data type) into one table. Fields that don't match are dropped and not included in the output. |
| Expand | Use the Expand array transformation to create a new row for each value within an array. |
| Join | Use the Join transformation to combine data from two streams based on a matching condition between them. |

 