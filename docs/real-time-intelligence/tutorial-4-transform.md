---
title: Real-Time Intelligence tutorial part 4- Transform your data in Event streams
description: Learn how to transform your data in Event streams.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.custom:
  - build-2024
ms.date: 05/21/2024
ms.search.form: Get started
---
# Real-Time Intelligence tutorial part 4: Transform your data in Event streams

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Tutorial part 3: Get historical data](tutorial-3-get-historical-data.md).




Navigate back to Real-time Intelligence Hub 

Hover your mouse over the Eventstream that you created in step 8 

Click on “…” context menu and choose Open Eventstream 

In the authoring canvas, choose Manage Fields in Transform events menu in the top ribbon 

Connect Source of Manage Fields node to Destination of your eventstream 

Click on the Pencil with solid fill icon 

Enter the name for the operation 

Click Add all fields 

Then click on Add field 

Under “Built-in Date Time Function”, choose SYSTEM.Timestamp(). With this, we are adding timestamp column in our input data source since it doesn’t exist. 

Name the field as Timestamp 

Click on Add 

Click Done 

In the top ribbon, choose KQL Database in the New destination menu 

Choose Event processing before ingestion 

Enter destination name 

Choose the workspace in which your KQL Database was created 

Choose the KQL Database created in step 4 

Create a new table  

Click on Save 

Connect the output of Managed Fields node to KQL Database node 

Your data is now flowing into KQL Database. 

## Related content

For more information about tasks performed in this tutorial, see:


## Next step

> [!div class="nextstepaction"]
> [Tutorial part 5: Use advanced KQL queries](tutorial-5-advanced-kql-query.md)
