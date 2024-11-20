---
title: Get started using Activator
description: Learn how to get started using Activator and unleash the power of data-driven decision making in your organization.
author: mihart
ms.author: mihart
ms.topic: how-to
ms.custom: FY25Q1-Linter
ms.search.form: Activator Getting Started
ms.date: 11/19/2024
#customer intent: As a Fabric user I want to get started with Activator.
---

# Get started with [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]

There are several different ways to create an activator using Fabric [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]. This article teaches you how to create an activator using **Create** and the Microsoft *Package delivery* sample.

## Create an Activator item

As with all Fabric workloads, you can begin using [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] by creating an item in a Fabric workspace. And you can also create an item and a new workspace simultaneously. [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]’s items are called *activators.* 

An activator holds all the information necessary to connect to data, monitor for conditions, and act. You typically create an activator for each business process or area you monitor.

1. In Microsoft Fabric, from the left navigation pane (nav pane) select **Create** > **Real-Time Intelligence** > **Activator**. 

    - If you don't see **Create**, select the ellipses(...) to display more icons.
    - If you don't see the **Real-Time Intelligence** option, make sure you're in Fabric and not Power BI.

    :::image type="content" source="media/activator-get-started/activator-create.png" alt-text="Screenshot of Activator experience.":::

2. Select **Try sample**. This loads the **Package delivery sample**. 

    :::image type="content" source="media/activator-get-started/activator-sample.png" alt-text="Screenshot showing the Definition view of the sample activator.":::

3. Explore the sample activator to familiarize yourself with the streams, objects, rules, and rule definitions. This sample is safe to use, the work you do with the sample here doesn't damage the source sample.

Once you create and become familiar with this sample activator, continue learning with the [Activator tutorial](activator-tutorial.md). The tutorial uses the same **Package delivery events** sample to teach you how to create and use rules on objects in live data. 

To learn how to get different types of data into an activator, read through these two articles:

- [Get data for [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] from Power BI](activator-get-data-power-bi.md)
- [Get data for [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] from eventstreams](activator-get-data-eventstreams.md)


## Related content

- [What is [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]?](activator-introduction.md)
- [What is Microsoft Fabric?](../../get-started/microsoft-fabric-overview.md)