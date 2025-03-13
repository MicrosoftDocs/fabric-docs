---
title: Leveraging public parameters in Dataflow Gen2 (Preview)
description: Dataflow Gen2 within Fabric offers the capability to define parameters that can be accessible and overriden uring execution through. This article covers the how to leverage this new mode, its prerequisites and limitations.
author: ptyx507x
ms.author: miescobar
ms.reviewer: 
ms.topic: conceptual
ms.date: 03/12/2025
---

# Leveraging public parameters in Dataflow Gen2 (Preview)

>[!NOTE]
>Public parameters in Fabric Dataflow Gen2 are available as a preview feature. Only Dataflow Gen2 with CI/CD support have this experience enabled.

Parameters in Dataflow Gen2 allow you to dynamically control and customize dataflows, making them more flexible and reusable by enabling different inputs and scenarios without modifying the dataflow itself. This helps keep things organized by reducing the need for multiple dataflows and centralizing control within a single, parameterized dataflow.

**Public parameters** in Dataflow Gen2 is a new mode where you can allow your Dataflow to be refreshed by passing parameter values outside of the Power Query editor through the Fabric REST API or through native Fabric experiences. This will allow you to have a more dynamic experience with your Dataflow where each refresh can be invoked with different parameters that will impact how your Dataflow is executed.

## Enabling the public parameters mode



## Prerequisites

* **A Dataflow Gen2 with CI/CD support**
* **Parameters must be set within your Dataflow.** [Learn more on how to set Query parameters in Dataflow](https://learn.microsoft.com/power-query/power-query-query-parameters).

## Considerations and limitations

* **Dataflows with the public parameters mode enabled cannot be scheduled for refresh through the Fabric scheduler.** The only exception is a Dataflow with no required parameters set.
* **Parameters that affect the resource path of a data source or a destination are not supported.** Connections are linked to the exact data source path defined in the authored Dataflow and cannot be currently overriden to use other connections or resource paths.
* **Dataflows with incremental refresh can't leverage this new mode.**
* **Only parameters of the type *decimal number*, *whole number*, *text* and *true/false* can be passed for override.** Any other 
* **The public parameters mode allows users to modify the logic defined within the Dataflow by overriding the parameter values.** This  would allow others who have permissions to the Dataflow to refresh the data with other values, resulting in different outputs from the data sources used in the Dataflow.
* **Refresh history doen't display information about the parameters passed during the invocation of the Dataflow.**
* **Monitoring hub doen't display information about the parameters passed during the invocation of the Dataflow.**



## Passing custom parameter values for execution



### Public API

### Scheduler

### Pipelines 