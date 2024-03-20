---
title: Get started using Data Activator
description: Learn how to get started using Data Activator.
author: davidiseminger
ms.author: davidi
ms.topic: concept
ms.custom:
  - ignite-2023-fabric
ms.date: 11/20/2023
---

# Get started with Data Activator

> [!IMPORTANT]
> Data Activator is currently in preview.

The first step in using Data Activator is for your administrator to enable Data Activator for your organization. The following image shows where to enable Data Activator in the Admin portal.

:::image type="content" source="media/data-activator-get-started/data-activator-get-started-04.png" alt-text="Screenshot of enabling data activator in the admin portal.":::

Next, select the Data Activator experience in Microsoft Fabric, then select it from the menu at the bottom of the screen to tailor your Fabric experience to Data Activator.

:::image type="content" source="media/data-activator-get-started/data-activator-get-started-01.png" alt-text="Screenshot of data activator fabric experience.":::


## Create a reflex item

As with all Fabric experiences, you begin using Data Activator by creating an item in a Fabric Workspace. Data Activator’s items are called *reflexes.*

A reflex holds all the information necessary to connect to data, monitor for conditions, and act. You'll typically create a reflex for each business process or area you’re monitoring.

To get started, you create a reflex item in your Fabric workspace. From the New menu in the workspace, choose the **Reflex** item.

:::image type="content" source="media/data-activator-get-started/data-activator-get-started-03.png" alt-text="Screenshot of selecting a new data activator reflex item.":::

## Navigate between data mode and design mode

When you open a reflex, you see two tabs at the bottom of the screen that switch between **data mode** and **design mode**. In data mode, you can see your incoming data and assign it to objects. In design mode, you build triggers from your objects. At first, these will be empty; the next step after creating a reflex is to populate it with your data.

:::image type="content" source="media/data-activator-get-started/data-activator-get-started-02.png" alt-text="Screenshot of data activator switch between data mode and design mode.":::

## Related content

Once you have created a reflex, you need to populate it with your data. Learn how to get data into your reflex from the [Get data for Data Activator from Power BI](data-activator-get-data-power-bi.md) and [Get data for Data Activator from Eventstreams](data-activator-get-data-eventstreams.md) articles. Alternatively, if you just want to learn about Data Activator using sample data, you can try the [Data Activator tutorial using sample data](data-activator-tutorial.md).

* [Enable Data Activator](../admin/data-activator-switch.md)
* [What is Data Activator?](data-activator-introduction.md)
* [Get data for Data Activator from Power BI](data-activator-get-data-power-bi.md)
* [Get data for Data Activator from Eventstreams](data-activator-get-data-eventstreams.md)
* [Assign data to objects in Data Activator](data-activator-assign-data-objects.md)
* [Create Data Activator triggers in design mode](data-activator-create-triggers-design-mode.md)
* [Detection conditions in Data Activator](data-activator-detection-conditions.md)
* [Use Custom Actions to trigger Power Automate Flows](data-activator-trigger-power-automate-flows.md)
* [Data Activator tutorial using sample data](data-activator-tutorial.md)

You can also learn more about Microsoft Fabric:

* [What is Microsoft Fabric?](../get-started/microsoft-fabric-overview.md)
