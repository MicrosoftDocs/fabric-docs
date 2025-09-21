---
title: Create a lakehouse in Microsoft Fabric
description: Learn how to create a lakehouse from the Data Engineering homepage, the Workspace view, or the Create page.
ms.reviewer: avinandac
ms.author: eur
author: eric-urban
ms.topic: how-to
ms.custom:
ms.date: 05/13/2024
ms.search.form: Create lakehouse
---

# Create a lakehouse in Microsoft Fabric

In this tutorial, you learn different ways to create a Lakehouse in [!INCLUDE [product-name](../includes/product-name.md)].

## Prerequisites

To create a lakehouse, you need access to a [Fabric enabled workspace](../admin/fabric-switch.md). Fabric admins can enable trial or paid capacity for a tenant or users. If Fabric isn't enabled, you won't see the lakehouse card.

### Ways to create a lakehouse

The lakehouse creation process is quick and simple; there are several ways to get started.

1. **Data Engineering** homepage

   - You can easily create a lakehouse through the **Lakehouse** card under the **New** section in the homepage.

   :::image type="content" source="media\create-lakehouse\lakehouse-card-inline.png" alt-text="Screenshot showing the lakehouse item under Data Engineering." lightbox="media\create-lakehouse\lakehouse-card.png":::

1. **Workspace** view

   - You can also create a lakehouse through the workspace view in **Data Engineering** by using the **New** dropdown menu.

   :::image type="content" source="media\create-lakehouse\new-lakehouse-menu.png" alt-text="Screenshot showing the Lakehouse option in the New menu." lightbox="media/create-lakehouse/new-lakehouse-menu.png":::

1. **Create** page

   - An entry point to create a lakehouse is available in the **Create** page under **Data Engineering**.

   :::image type="content" source="media\create-lakehouse\lakehouse-create-hub.png" alt-text="Screenshot showing the Lakehouse option in the Data Engineering Create page." lightbox="media/create-lakehouse/lakehouse-create-hub.png":::

### Creating a lakehouse from the Data Engineering homepage

1. Browse to the **Data Engineering** homepage.

1. Under the New section, locate the **Lakehouse** card and select it to get started with the creation process

1. Enter a name for the lakehouse and a sensitivity label if your organization requires one, and select **Create**.

1. Once the lakehouse is created, you land on the **Lakehouse Editor** page where you can get started and load data.

> [!NOTE]
> The lakehouse will be created under the current workspace you are in.

## Delete a lakehouse

To delete a lakehouse, navigate to **OneLake data hub** and find your lakehouse. select the **...** next to the lakehouse name and select **Delete**. The lakehouse and its associated SQL analytics endpoint and semantic model are deleted. 

> [!NOTE]
> - A lakehouse can't be deleted if it's referenced elsewhere, for example, in a pipeline or within a real time analytics workflow.
> - There is no way to restore a lakehouse after it's deleted.

## Related content

Now that you have successfully created your Lakehouse, learn more about:

- Different ways to load data in Lakehouse, see [Options to get data into the Fabric Lakehouse](load-data-lakehouse.md)

- Exploring your lakehouse explorer, see [Navigating the Lakehouse explorer](navigate-lakehouse-explorer.md)
