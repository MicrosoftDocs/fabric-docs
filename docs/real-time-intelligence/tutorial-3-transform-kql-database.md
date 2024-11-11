---
title: Real-Time Intelligence tutorial part 3- Transform data in a KQL Database
description: Learn how to use an update policy to transform data in a KQL Database in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.date: 11/19/2024
ms.subservice: rti-core
ms.search.form: Get started
#customer intent: I want to learn how to transform data in a KQL database in Real-Time Intelligence.
---
# Real-Time Intelligence tutorial part 3: Transform data in a KQL database

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Tutorial part 1: Create resources](tutorial-1-resources.md).

In this part of the tutorial, you learn how to use an update policy to transform data in a KQL Database in Real-Time Intelligence. 

```kusto
//Create target table with same schema as source table for applying update policy
.create table BikesDataTransformed based-on BikesData
 
//Create function with transformation logic to be used in update policy
.create-or-alter function ParseBikePointID()
{
    BikesData
    | parse BikepointID with * "BikePoints_" BikepointID
}
 
//Command to apply update policy
.alter table BikesDataTransformed policy update
```[{
    "IsEnabled": true,
    "Source": "BikesData",
    "Query": "ParseBikePointID()",
    "IsTransactional": false,
    "PropagateIngestionProperties": false
}]```
 
//Source table
BikesData
| take 10
 
//Transformed table with parsed BikepointID column after applying update policy
BikesDataTransformed
| take 10
```
