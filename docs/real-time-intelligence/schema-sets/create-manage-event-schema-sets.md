---
title: Create and Manage Event Schema Sets
description: Learn about how to create and manage an event schema set in Fabric Real-Time Intelligence.
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 08/07/2025
ms.search.form: Schema set
#customer intent: As a user, I want to learn how to create an event schema set in Real-Time Intelligence.
---
# Create and manage event schema sets in Microsoft Fabric
In this article, you learn how to create and manage event schema sets in Microsoft Fabric Real-Time Intelligence. Event schema sets help you organize and standardize data structures (schemas) for your real-time analytics workflows, making it easier to process and analyze streaming data consistently.

## Create a schema set

1. Sign in to [Microsoft Fabric](https://fabric.microsoft.com/).
1. Select **My workspace** on the left navigation bar.
1. On the **My workspace** page, select **+ New item** on the command bar. 
1. On the **New item** page, search for **Event schema set**, and then select **Event Schema Set (preview)**. 

    :::image type="content" source="./media/create-manage-event-schema-sets/new-item-event-schema-set.png" alt-text="Screenshot of the New item page with Event schema set (preview) selected." lightbox="./media/create-manage-event-schema-sets/new-item-event-schema-set.png":::
1. In the **New event schema set (preview)** window, enter a **name** for the schema set, and then select **Create**. The name must contain fewer than **256 UTF-8 characters**. 

    :::image type="content" source="./media/create-manage-event-schema-sets/new-schema-set-window.png" alt-text="Screenshot that shows the New event schema set (preview) window." lightbox="./media/create-manage-event-schema-sets/new-schema-set-window.png":::
1. Creation of the new event schema set in your workspace can take a few seconds. After the schema set is created, you're directed to the main editor where you can start with adding a schema to the schema set. 

    :::image type="content" source="./media/create-manage-event-schema-sets/editor.png" alt-text="Screenshot that shows the main editor for a schema set." lightbox="./media/create-manage-event-schema-sets/editor.png":::

## Configure settings for a schema set
Once you have at least one schema in the schema set, you can configure settings such as schema set name, description, sensitivity label, and endorsement, select the **gear** button on the ribbon in the top-left corner. 

:::image type="content" source="./media/create-manage-event-schema-sets/schema-set-settings.png" alt-text="Screenshot that shows the settings for a schema set." lightbox="./media/create-manage-event-schema-sets/schema-set-settings.png":::


## Next step
Now, add a schema to the event schema set by following instructions from [Create and manage event schemas in schema sets](create-manage-event-schemas.md).


