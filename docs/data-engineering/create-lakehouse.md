---
title: Create a Lakehouse
description: Learn how to create a Lakehouse.
ms.reviewer: snehagunda
ms.author: avinandac
author: avinandaMS
ms.topic: how-to
ms.date: 02/24/2023
ms.search.form: Create lakehouse
---

# Creating a Lakehouse

[!INCLUDE [preview-note](../includes/preview-note.md)]

In this tutorial, you learn how to create a Lakehouse in [!INCLUDE [product-name](../includes/product-name.md)].

## Prerequisites

To get started, you must complete the following prerequisites:

- Get access to a premium workspace with contributor or above permissions.

## Create a Lakehouse

The Lakehouse creation process is quick and simple; there are several ways to get started.

### Ways to create a Lakehouse

There are a few ways you can get started with the creation process:

1. **Data Engineering** homepage

   - You can easily create a Lakehouse through the **Lakehouse** card under the **New** section in the homepage.

   :::image type="content" source="media\create-lakehouse\lakehouse-card.png" alt-text="Screenshot showing the Lakehouse card." lightbox="media\create-lakehouse\lakehouse-card.png":::

1. **Workspace** view

   - You can also create a Lakehouse through the workspace view when you are on the **Data Engineering** workload by using the **New** dropdown.

   :::image type="content" source="media\create-lakehouse\new-lakehouse-menu.png" alt-text="Screenshot showing the Lakehouse option in the New menu." lightbox="media\create-lakehouse\new-lakehouse-menu.png":::

1. **Create Hub**

   - An entry point to create a Lakehouse is available in the **Create Hub** page under **Data Engineering**.

   :::image type="content" source="media\create-lakehouse\lakehouse-create-hub.png" alt-text="Screenshot showing the Lakehouse option in the Data Engineering Create Hub." lightbox="media\create-lakehouse\lakehouse-create-hub.png":::

### Creating a Lakehouse from the Data Engineering homepage

1. Browse to the **Data Engineering** homepage.

1. Under the New section, locate the **Lakehouse** card and select it to get started with the creation process

1. Enter a name for the Lakehouse and a sensitivity label if your organization requires one, and select **Create**.

1. Once the Lakehouse is created, you land on the **Lakehouse Editor** page where you can get started and load data.

> [!NOTE]
> The Lakehouse will be created under the current workspace you are in.

## Next steps

After you create your Lakehouse, your next step is to get data in it. Here are a few ways you can do that:

- [How to copy data into your Lakehouse](../data-factory/copy-data-activity.md)
- [How to use a notebook to load data in your Lakehouse](lakehouse-notebook-load-data.md)
- [Navigating the Lakehouse explorer](navigate-lakehouse-explorer.md)
