---
title: Get data for Data Activator from Power BI
description: Learn how to get data from Power BI for use in Data Activator.
author: davidiseminger
ms.author: davidi
ms.topic: concept
ms.custom: 
ms.date: 11/15/2023
---

# Get data for Data Activator from Power BI

You can get data for use in Data Activator from many sources. This article describes how to get data from Power BI.

## Get data from Power BI

You can use Data Activator to trigger notifications when conditions are met about data in a Power BI report. For example, if you have a report displaying daily sales per store, you could send a notification at the end of the day if daily sales for any store fall beneath a threshold. You can send notifications to yourself, or to others in your organization. This section explains how notifications can be created and triggered.

## Prerequisites

Before you begin, you need a Power BI report that is published online to a Fabric workspace in a Premium capacity.

### Create a Data Activator trigger from a Power BI visual

This section, and the sections within it, describes how to create a Data Activator from a Power BI visual. 

#### Select trigger action on your Power BI visual

To begin creating a trigger from a Power BI report:

1. Open your Power BI report.
2. Choose a visual on the report for Data Activator to monitor. 
3. Select the ellipsis (…) at the top-right of the visual, and select *Trigger Action*.

The following image shows an example of how to trigger an action from a visual that displays today’s sales for each store in a retail chain:

:::image type="content" source="media/data-activator-get-data/data-activator-get-data-01.png" alt-text="Screenshot of sales by store.":::

#### Create your Data Activator trigger

Next, define your trigger conditions and to create your trigger. In the *Create Alert* dialog that appears, take the following steps:

1. Fill out the *What to monitor* section, to tell Data Activator which measure to monitor, and how often to check its value. Data Activator checks the value of the measure separately for each value of the *For Each* dimension that you select.
2. Fill out the *What to detect* section, to define your trigger condition. Whenever this condition is met, Data Activator sends a notification.
3. Fill out the *Where to save* section, to tell Power BI where to save your Data Activator trigger. You can choose an existing reflex item, or you can create a new reflex item.
4. Choose *Continue*, to create your Data Activator trigger, and open it within your reflex item.  

Then with the example from step 1, the following image shows how you would create a trigger that fires daily if the sales for any store drop to under $60,000:

:::image type="content" source="media/data-activator-get-data/data-activator-get-data-02.png" alt-text="Screenshot of create an alert window.":::

### Next step: go to Data Activator to start your trigger

The final step is to go to Data Activator to define the notification that Data Activator should provide when your trigger fires, then start your trigger. Power BI prompts you to start your trigger:  

:::image type="content" source="media/data-activator-get-data/data-activator-get-data-03.png" alt-text="Screenshot of trigger successfully created.":::


Pressing **Start your trigger** takes you to Data Activator to start your trigger. Refer to [start and stop your trigger](data-activator-create-triggers-design-mode.md#start-and-stop-your-trigger) for information on how to do start your trigger.



### Next steps

The next step is to assign your data to some objects. To do this, follow the steps described in the [Assign data to objects in Data Activator](data-activator-assign-data-objects.md) article.

* [What is Data Activator?](data-activator-introduction.md)
* [Get started with Data Activator](data-activator-get-started.md)
* [Assign data to objects in Data Activator](data-activator-assign-data-objects.md)
* [Create Data Activator triggers in design mode](data-activator-create-triggers-design-mode.md)
* [Detection conditions in Data Activator](data-activator-detection-conditions.md)
* [Use Custom Actions to trigger Power Automate Flows](data-activator-trigger-power-automate-flows.md)
* [Data Activator tutorial using sample data](data-activator-tutorial.md)

You can also learn more about Microsoft Fabric:

* [What is Microsoft Fabric?](../get-started/microsoft-fabric-overview.md)
