---
title: Get Data from an Eventstream in Multiple Fabric Items
description: This article describes how to get data from an eventstream inside other Fabric items.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.custom:
ms.date: 11/15/2023
ms.search.form: Eventstreams with Other Fabric Items
---

# Get data from an eventstream in multiple Fabric items

Eventstreams can route event data to various destinations, including Microsoft Fabric items like a lakehouse or a Kusto Query Language (KQL) database. You can get the data from an eventstream inside these Fabric items. This article describes how to use this integration experience.

## Prerequisites

- Get access to a workspace with Contributor or higher permissions where your eventstream item is located.
- For a KQL database or lakehouse item, get access to a workspace with Contributor or higher permissions where that item is located.

## Get data from an eventstream and add it to a KQL database

To get data from an eventstream and add it to a KQL table inside a KQL database, select **Get data** on the ribbon of your KQL database. Two options are available: **Existing Eventstream** and **New Eventstream**.

:::image type="content" source="./media/get-data-from-eventstream-in-multiple-fabric-items/get-data-to-kql-database.png" alt-text="Screenshot that shows options for getting data from an eventstream." lightbox="./media/get-data-from-eventstream-in-multiple-fabric-items/get-data-to-kql-database.png" :::

### Get data from an existing eventstream

1. In the dropdown list, select **Existing Eventstream**.

1. A wizard appears. To complete all the steps, follow the article [Get data from an eventstream](./../get-data-eventstream.md).

   :::image type="content" source="./media/get-data-from-eventstream-in-multiple-fabric-items/get-data-to-kql-database-wizard.png" alt-text="Screenshot that shows the wizard for getting data from an existing eventstream." lightbox="./media/get-data-from-eventstream-in-multiple-fabric-items/get-data-to-kql-database-wizard.png" :::

### Get data from a new eventstream

1. In the dropdown list, select **New Eventstream**.

   :::image type="content" source="./media/get-data-from-eventstream-in-multiple-fabric-items/get-data-to-kql-database-options.png" alt-text="Screenshot that shows the menu option for getting data from a new eventstream." lightbox="./media/get-data-from-eventstream-in-multiple-fabric-items/get-data-to-kql-database-options.png" :::

1. In the dialog that appears, enter a name for the new eventstream. Then select **Create**.

   :::image type="content" source="./media/get-data-from-eventstream-in-multiple-fabric-items/get-data-to-kql-database-new.png" alt-text="Screenshot that shows the dialog for naming a new eventstream." lightbox="./media/get-data-from-eventstream-in-multiple-fabric-items/get-data-to-kql-database-new.png" :::

1. The new eventstream opens with teaching bubbles. By following the guidance in these teaching bubbles, you can get the data from this eventstream and add it to your KQL database.

   :::image type="content" source="./media/get-data-from-eventstream-in-multiple-fabric-items/get-data-to-kql-database-wizard-new-guide.png" alt-text="Screenshot that shows an eventstream with a teaching bubble." lightbox="./media/get-data-from-eventstream-in-multiple-fabric-items/get-data-to-kql-database-wizard-new-guide.png" :::

## Get data from an eventstream and add it to a lakehouse

1. On the ribbon of your KQL database, select **Get data** > **New Eventstream**. For a lakehouse, only the **New Eventstream** option is available as an eventstream data source.

   :::image type="content" source="./media/get-data-from-eventstream-in-multiple-fabric-items/get-data-to-lakehouse.png" alt-text="Screenshot that shows the options for getting data for a lakehouse." lightbox="./media/get-data-from-eventstream-in-multiple-fabric-items/get-data-to-lakehouse.png" :::

1. In the dialog that appears, enter a name for the new eventstream. The name is the same as the one in the KQL database. When you finish, select **Create**.

1. On the canvas for the new eventstream, follow the guidance in the teaching bubbles to add the data to your lakehouse.

   :::image type="content" source="./media/get-data-from-eventstream-in-multiple-fabric-items/get-data-to-lakehouse-new-guide.png" alt-text="Screenshot that shows a  teaching bubble for getting data for a lakehouse." lightbox="./media/get-data-from-eventstream-in-multiple-fabric-items/get-data-to-lakehouse-new-guide.png" :::

## Related content

- [Add and manage a destination in an eventstream](./add-manage-eventstream-destinations.md)
