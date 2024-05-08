---
title: Create Data Activator alerts from a Real-Time Dashboard
description: Learn how to create a Data Activator alert from a Real-Time Dashboard
author: jameshutton
ms.author: jameshutton
ms.topic: concept
ms.custom: 
ms.date: 05/08/2024
---

# Create Data Activator alerts from a Real-Time Dashboard

You can create Data Activator alerts from several data sources in Microsoft Fabric. This article explains how to create Data Activator alerts from a Real-Time dashboard.

## Alert when conditions are met in a Real-Time Dashboard

You can use Data Activator to trigger notifications when conditions are met about data in a Real-time Dashboard. For example, if you have a Real-Time Dashboard displaying real-time availability of bicycles for hire in multiple locations, you can trigger an alert if the there are too few bicycles available in any one location. You can send alert notifications either to yourself, or to others in your organization, via either email or Microsoft Teams. 

## Prerequisites

Before you begin, you need a Real-Time dashboard.

### Create a Data Activator alert from a Real-Time Dashboard

This section, and the sections within it, describe how to create a Data Activator alerts from a tile in a Real-Time Dashboard.

#### Select Set alert on a tile in your Real-Time Dashboard

To begin creating a trigger from a Real-Time Dashboard:

1. Open your Real-Time Dashboard
2. Choose a tile on the Real-Time Dashboard for Data Activator to monitor
3. Select the ellipsis (...) at the top-right of the tile, and select *Set Alert*. You can also use the *Set Alert* button in the Real-Time Dashboard toolbar.

The following image shows an example of how set an alert from a tile that is displaying the current number of bicycles for hire in each neighbourhood, in the "Bikes" sample that comes with Eventstreams.

:::image type="content" source="media/data-activator-get-data/data-activator-get-data-06.png" alt-text="Screenshot showing how to add an alert from a tile":::

#### Create your Data Activator alert

Next, define your alert conditions. In the *Set Alert* pane that appears, take the following steps:

1. Specify your alert condition using the *Condition* dropdown and the *Value* text box. 
2. In the *Action* section, specify whether you want your alert via email or Microsoft Teams.
3. Fill out the *Where to save* section, to specify where to save your Data Activator alert. You can choose an existing reflex item, or you can create a new reflex item.
4. Choose *Create*, to create your Data Activator trigger

The following image shows an example of an alert that will notify you via emails if the number of bicycles available in any neighbourhood exceeds 32,000.

:::image type="content" source="media/data-activator-get-data/data-activator-get-data-07.png" alt-text="Screenshot of create an alert window.":::

### Optional: edit your trigger in Data Activator

When your trigger is ready, you will receive a notification with a link to your trigger. This gives you the option to edit your trigger in Data Activator. 

Editing your trigger in Data Activator can be useful if you want to add other recipients to your alert, or to define a more complex alert condition than is possible in the *Set alert* pane Refer to [Create triggers in design mode](data-activator-create-triggers-design-mode.md) for information on how to edit triggers in Data Activator.


### Next steps

* [What is Data Activator?](data-activator-introduction.md)
* [Get started with Data Activator](data-activator-get-started.md)
* [Assign data to objects in Data Activator](data-activator-assign-data-objects.md)
* [Create Data Activator triggers in design mode](data-activator-create-triggers-design-mode.md)
* [Detection conditions in Data Activator](data-activator-detection-conditions.md)
* [Use Custom Actions to trigger Power Automate Flows](data-activator-trigger-power-automate-flows.md)
* [Data Activator tutorial using sample data](data-activator-tutorial.md)

You can also learn more about Microsoft Fabric:

* [What is Microsoft Fabric?](../get-started/microsoft-fabric-overview.md)
