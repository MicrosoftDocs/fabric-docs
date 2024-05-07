---
title: Real-Time Intelligence tutorial part 1- Create resources
description: Learn how to create a KQL database and enable data availability in Microsoft Fabric.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.custom:
  - build-2024
  - ignite-2023
ms.date: 05/21/2024
ms.search.form: Get started
# customer intent: I want to learn how to create a KQL database and enable data availability in Microsoft Fabric.
---
# Real-Time Intelligence tutorial part 1: Create resources

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Introduction to the Real-Time Intelligence tutorial](tutorial-introduction.md).

In this part of the tutorial, you create an [event house](eventhouse.md), which automatically creates a child KQL database, and enable OneLake availability.

## Create an event house

1. Browse to the workspace in which you want to create your tutorial resources.
1. On the bottom left experience switcher, select **Real-Time Intelligence**.
1. In the upper left corner, select **+ New > Eventhouse**.
1. Enter *Tutorial* as the event house name. A KQL database is created simultaneously with the same name.
1. Select **Create**. When provisioning is complete, the event house **System overview** page is shown.

## Turn on OneLake availability

1. From the **System overview** page, select the KQL database you created in the previous step.

    :::image type="content" source="media/tutorial/select-tutorial-database.png" alt-text="Screnshot of the System overview for new event house with Tutorial database selected and highlighted with a red box.":::

1. In the **Database details** section, select the **pencil icon** next to **OneLake availability**.
1. Toggle the button to **Active** and select **Done**.

    :::image type="content" source="media/tutorial/one-lake-availability.png" alt-text="Screenshot showing how to turn on OneLake availability.":::

## Related content

For more information about tasks performed in this tutorial, see:

* [Create a database](create-database.md)
* [Turn on OneLake availability](one-logical-copy.md#turn-on-onelake-availability)

## Next step

> [!div class="nextstepaction"]
> [Tutorial part 2: Get data in the Real-Time Hub](tutorial-2-get-real-time-events.md)
