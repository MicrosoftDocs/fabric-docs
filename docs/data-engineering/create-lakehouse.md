---
title: Create a lakehouse
description: Learn how to create a lakehouse.
ms.reviewer: snehagunda
ms.author: avinandac
author: avinandaMS
ms.topic: how-to
ms.date: 02/24/2023
ms.search.form: Create lakehouse
---

# Creating a lakehouse

[!INCLUDE [preview-note](../includes/preview-note.md)]

In this tutorial, you learn how to create a lakehouse in [!INCLUDE [product-name](../includes/product-name.md)].

## Prerequisites

To get started, you must complete the following prerequisites:

- Get access to a premium workspace with contributor or above permissions.

## Create a lakehouse

The lakehouse creation process is quick and simple; there are several ways to get started.

### Ways to create a lakehouse

There are a few ways you can get started with the creation process:

1. **Data Engineering** homepage

   - You can easily create a lakehouse through the **Lakehouse** card under the **New** section in the homepage.

   :::image type="content" source="media\create-lakehouse\lakehouse-card.png" alt-text="Screenshot showing the lakehouse card." lightbox="media\create-lakehouse\lakehouse-card.png":::

1. **Workspace** view

   - You can also create a lakehouse through the workspace view when you are on the **Data Engineering** workload by using the **New** dropdown.

   :::image type="content" source="media\create-lakehouse\new-lakehouse-menu.png" alt-text="Screenshot showing the Lakehouse option in the New menu." lightbox="media\create-lakehouse\new-lakehouse-menu.png":::

1. **Create Hub**

   - An entry point to create a lakehouse is available in the **Create Hub** page under **Data Engineering**.

   :::image type="content" source="media\create-lakehouse\lakehouse-create-hub.png" alt-text="Screenshot showing the Lakehouse option in the Data Engineering Create Hub." lightbox="media\create-lakehouse\lakehouse-create-hub.png":::

### Creating a lakehouse from the Data Engineering homepage

1. Browse to the **Data Engineering** homepage.

1. Under the New section, locate the **Lakehouse** card and select it to get started with the creation process

1. Enter a name for the lakehouse and a sensitivity label if your organization requires one, and select **Create**.

1. Once the lakehouse is created, you land on the **Lakehouse Editor** page where you can get started and load data.

> [!NOTE]
> The lakehouse will be created under the current workspace you are in.

## Next steps

After you create your lakehouse, your next step is to get data in it. Here are a few ways you can do that:

- [How to copy data into your lakehouse](../data-factory/copy-data-activity.md)
- [How to use a notebook to load data in your lakehouse](lakehouse-notebook-load-data.md)
- [Navigating the lakehouse explorer](navigate-lakehouse-explorer.md)
