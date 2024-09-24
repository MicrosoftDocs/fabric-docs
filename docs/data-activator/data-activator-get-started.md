---
title: Get started using Data Activator
description: Learn how to get started using Data Activator and unleash the power of data-driven decision making in your organization.
author: mihart
ms.author: mihart
ms.topic: how-to
ms.custom: FY25Q1-Linter
ms.date: 09/09/2024
#customer intent: As a Fabric user I want to get started with Data Activator.
---

# Get started with Data Activator

> [!IMPORTANT]
> Data Activator is currently in preview.

Since Data Activator is in Preview, it must be enabled by your administrator. If you can't open Data Activator, ask your administrator to use the Admin portal to turn on the preview.

:::image type="content" source="media/data-activator-get-started/data-activator-get-started-04.png" alt-text="Screenshot of enabling data activator in the admin portal.":::

## Create a Data Activator reflex item

In Microsoft Fabric, select **Data Activator** from the workload switcher in the bottom left corner.

:::image type="content" source="media/data-activator-get-started/data-activator-get-started-01.png" alt-text="Screenshot of data activator fabric experience.":::

As with all Fabric workloads, you begin using Data Activator by creating an item in a Fabric workspace. Data Activator’s items are called *reflexes.*

A reflex holds all the information necessary to connect to data, monitor for conditions, and act. You typically create a reflex for each business process or area you monitor.

1. Create a reflex in your Fabric workspace.

1. From the **New** menu in the workspace, choose **Reflex**.

:::image type="content" source="media/data-activator-get-started/data-activator-get-started-03.png" alt-text="Screenshot of selecting a new data activator reflex item.":::

## Navigate between Data mode and Design mode

When you open a reflex, you see two tabs at the bottom of the screen that switch between **Data mode** and **Design mode**. In data mode, you see your incoming data and assign it to objects. In design mode, you build triggers from your objects. At first, you don't have any. The next step after creating a reflex is to populate it with your data.

:::image type="content" source="media/data-activator-get-started/data-activator-get-started-02.png" alt-text="Screenshot of data activator switch between data mode and design mode.":::

Once you create a reflex, you need to populate it with data. Learn how to get data into your reflex from the [Get data for Data Activator from Power BI](data-activator-get-data-power-bi.md) and [Get data for Data Activator from eventstreams](data-activator-get-data-eventstreams.md) articles. Alternatively, if you just want to learn about Data Activator using sample data, you can try the [Data Activator tutorial using sample data](data-activator-tutorial.md).

## Related content

* [Enable Data Activator](../admin/data-activator-switch.md)
* [What is Data Activator?](data-activator-introduction.md)
* [What is Microsoft Fabric?](../get-started/microsoft-fabric-overview.md)
