---
title: Get-data from Eventstream in multiple Fabric items
description: This article describes how to get data from Eventstream inside other Fabric items.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.date: 11/15/2023
ms.search.form: Eventstreams with Other Fabric Items
---

# Get data from Eventstream in multiple Fabric items

Eventstreams can route the event data to various destinations, including the Fabric items, for example: Fabric Lakehouse, Fabric KQL Database, etc. With the integration between Fabric Eventstream and these Fabric items, you can get the data from Eventstream item inside these Fabric items. This article describes how to use this integration experience within these Fabric items.

## Prerequisites

Before you start, you must complete the following prerequisites:

- Get access to a **premium workspace** with **Contributor** or above permissions where your Eventstream item is located.
- For a KQL database or Lakehouse item, get access to a **premium workspace** with **Contributor** or above permissions where your KQL database or Lakehouse item is located.

## Get data from Eventstream in a KQL database

To get data from Eventstream into a KQL table inside a KQL database, Select **Get data** on the ribbon of your KQL database

:::image type="content" source="./media/get-data-from-eventstream-in-multiple-fabric-items/get-data-to-kql-database.png" alt-text="Screenshot showing the get data options." lightbox="./media/get-data-from-eventstream-in-multiple-fabric-items/get-data-to-kql-database.png" :::

There are two options available:
- **Existing Eventstream**
- **New Eventstream**

### Get data from an existing eventstream

1. Select **Existing Eventstream** in the drop-down list, a wizard pops up:

   :::image type="content" source="./media/get-data-from-eventstream-in-multiple-fabric-items/get-data-to-kql-database-wizard.png" alt-text="Screenshot showing the get data wizard first step." lightbox="./media/get-data-from-eventstream-in-multiple-fabric-items/get-data-to-kql-database-wizard.png" :::

1. To get all the steps completed, following this article [Get data wizard configuration guide](./../get-data-eventstream.md).

### Get data from a new eventstream

1. Select **New Eventstream** in the drop-down list, a dialog pops up asking for a new eventstream name:

   :::image type="content" source="./media/get-data-from-eventstream-in-multiple-fabric-items/get-data-to-kql-database-options.png" alt-text="Screenshot showing the options for getting data from eventstream." lightbox="./media/get-data-from-eventstream-in-multiple-fabric-items/get-data-to-kql-database-options.png" :::

   :::image type="content" source="./media/get-data-from-eventstream-in-multiple-fabric-items/get-data-to-kql-database-new.png" alt-text="Screenshot showing the new eventstream dialog." lightbox="./media/get-data-from-eventstream-in-multiple-fabric-items/get-data-to-kql-database-new.png" :::

1. After you select **Create** with the new eventstream name, the new eventstream will be open with the teaching bubbles.

   :::image type="content" source="./media/get-data-from-eventstream-in-multiple-fabric-items/get-data-to-kql-database-wizard-new-guide.png" alt-text="Screenshot showing the new eventstream naming dialog." lightbox="./media/get-data-from-eventstream-in-multiple-fabric-items/get-data-to-kql-database-wizard-new-guide.png" :::

Following the guide in these teaching bubbles, you'll be able to get the data from this eventstream to your KQL database.

## Get data from Eventstream in a lakehouse

1. To get data from Eventstream into a lakehouse, Select **Get data** on the ribbon of your KQL database. In lakehouse, only **New Eventstream** option is available to get the data from.

   :::image type="content" source="./media/get-data-from-eventstream-in-multiple-fabric-items/get-data-to-lakehouse.png" alt-text="Screenshot showing the get data options in lakehouse." lightbox="./media/get-data-from-eventstream-in-multiple-fabric-items/get-data-to-lakehouse.png" :::

1. After select it, a dialog pops up asking for a new eventstream name, which is the same as the one in KQL database. 

1. After you give the name and select **Create**, you'll be directed to the new eventstream canvas where the similar teaching bubbles are available to guide you complete the rest of steps to get the data into your lakehouse.

   :::image type="content" source="./media/get-data-from-eventstream-in-multiple-fabric-items/get-data-to-lakehouse-new-guide.png" alt-text="Screenshot showing the teaching bubbles in lakehouse." lightbox="./media/get-data-from-eventstream-in-multiple-fabric-items/get-data-to-lakehouse-new-guide.png" :::

## Related content

- [Add and manage a destination in an eventstream](./add-manage-eventstream-destinations.md)
