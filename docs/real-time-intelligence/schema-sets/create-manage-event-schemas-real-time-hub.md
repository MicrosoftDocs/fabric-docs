---
title: Create and Manage Event Schemas in Fabric Real-Time Hub
ms.service: fabric
ms.reviewer: spelluru
description: Learn how to create and manage event schemas in Fabric Real-Time Hub with step-by-step guidance for registration, schema building, and organization.
#customer intent: As a user, I want to learn how to add a schema to a schema set.
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.custom:
  - ai-gen-docs-bap
  - ai-gen-title
  - ai-seo-date:08/07/2025
  - ai-gen-description
ms.date: 12/18/2025
ms.search.form: Schema Registry
---

# Create and manage event schemas in Fabric Real-Time hub

In this article, you lean how to register or add a schema in Fabric Real-Time hub.

## Navigate to Real-Time hub

[!INCLUDE [navigate-to-real-time-hub](../../real-time-hub/includes/navigate-to-real-time-hub.md)]

## Event schema registry page

On the left navigation bar, select **Event schema registry**. On the **Event schema registry** page, you see all the schemas that are registered using Fabric Real-Time hub or Fabric schema sets user interface (UI). To learn how to add schema using schema sets, see [Create and manage event schemas in schema sets](create-manage-event-schemas.md).

:::image type="content" source="./media/create-manage-event-schemas-real-time-hub/event-schemas.png" alt-text="Screenshot of the Schema Registry page in Fabric Real-Time hub." lightbox="./media/create-manage-event-schemas-real-time-hub/event-schemas.png":::

### Columns

This page mainly has the list of schemas with the following columns.

| Column           | Description                                                      |
| ---------------- | ---------------------------------------------------------------- |
| Name             | Name of the schema.                                              |
| Event schema set | The schema set that contains the schema.                         |
| Updated          | The date and time at which the schema was updated last.         |
| Owner            | Owner of the schema.                                             |
| Workspace        | The workspace that contains the schema set.                      |
| Endorsement      | The endorsement status of the schema.                            |

### Search

It also has a search box at the top where you can enter text to search for your schema.

### Filters

Using the filter drop-down lists, you can filter schemas by using the following filters.

- Schema set owner
- Schema set name
- Fabric workspace

Now, let's see how to add an event schema using the **+ New event schema** button.

## Add a new event schema

1. On the **Event schema registry** page, select **+New event schema** button.

1. On the **New event schema** page, follow these instructions:

    1. Specify a **name** for the event schema set.
    1. Optionally, enter a description for the event schema set.

1. Use one of the following options to create a schema.

    - If you have a schema JSON file, select **Upload** to upload the file. For a sample file, see the [Sample schema file](create-manage-event-schemas.md#download-an-event-schema) section.

        :::image type="content" source="./media/create-manage-event-schemas-real-time-hub/upload-button.png" alt-text="Screenshot that shows the upload option to create a schema." lightbox="./media/create-manage-event-schemas-real-time-hub/upload-button.png":::

    - Start building a schema manually by selecting **Add row**. For each row, select the **field type**, **field name**, and optionally enter a **description**. 
    
        :::image type="content" source="./media/create-manage-event-schemas-real-time-hub/build-schema.png" alt-text="Screenshot that shows the manual way of building a schema." lightbox="./media/create-manage-event-schemas-real-time-hub/build-schema.png":::            
    
    - To build a schema by entering JSON code, select **Code editor** option as shown in the following image. If you see the message: **If you choose to use the code editor to create your schema, note that you won’t be able to switch back to the UI builder**, select **Edit**. 

        :::image type="content" source="./media/create-manage-event-schemas-real-time-hub/code-editor-schema.png" alt-text="Screenshot that shows the code editor to build a schema." lightbox="./media/create-manage-event-schemas-real-time-hub/code-editor-schema.png":::

        Enter the JSON code into the editor.

        :::image type="content" source="./media/create-manage-event-schemas-real-time-hub/code-editor-schema-json.png" alt-text="Screenshot that shows the JSON code in the code editor to build a schema." lightbox="./media/create-manage-event-schemas-real-time-hub/code-editor-schema-json.png":::

1. Now, in the right pane, follow these steps:

    - **To use an existing schema set**:

        1. Select the Fabric workspace that has the schema set.
        1. Select the schema set where you want to save the schema.

            :::image type="content" source="./media/create-manage-event-schemas-real-time-hub/use-existing-schema-set.png" alt-text="Screenshot that shows the right pane where you select an existing schema set." lightbox="./media/create-manage-event-schemas-real-time-hub/use-existing-schema-set.png":::

    - **To create a new schema set**:

        1. Select the Fabric workspace where you want to create the schema set.
        1. In the drop-down list for **Event schema set**, select **Create**.

            :::image type="content" source="./media/create-manage-event-schemas-real-time-hub/create-menu.png" alt-text="Screenshot that shows the right pane where you can select an option to create a new schema set." lightbox="./media/create-manage-event-schemas-real-time-hub/create-menu.png":::

        1. Enter a name for the schema set.

            :::image type="content" source="./media/create-manage-event-schemas-real-time-hub/schema-set-name.png" alt-text="Screenshot that shows the right pane where you enter a name for the schema set." lightbox="./media/create-manage-event-schemas-real-time-hub/schema-set-name.png":::

1. Select **Finish** to start creating the schema.

    :::image type="content" source="./media/create-manage-event-schemas-real-time-hub/finish-button.png" alt-text="Screenshot that shows the New event schema page with the Finish button selected." lightbox="./media/create-manage-event-schemas-real-time-hub/finish-button.png":::

1. On the **Event schema registry** page, you should see the schema you created in the list of schemas. If you don't see it, refresh the page.

    :::image type="content" source="./media/create-manage-event-schemas-real-time-hub/new-schema.png" alt-text="Screenshot that shows the new schema in the list of schemas." lightbox="./media/create-manage-event-schemas-real-time-hub/new-schema.png":::

    To add more schemas to the schema set, select **+ New event schema** at the top of the page.

## View or endorse schema set

Hover the mouse over a schema in the list, and select **... (ellipsis)**. You see two actions: **Open event schema set** and **Endorse**.

:::image type="content" source="./media/create-manage-event-schemas-real-time-hub/schema-actions.png" alt-text="Screenshot that shows the actions available on the schema." lightbox="./media/create-manage-event-schemas-real-time-hub/schema-actions.png":::

If you select **Open event schema set**, you see the event schema opened in the schema set user interface where you can also add schemas, update schemas, or delete schemas. For more information, see [Create and manage event schemas in schema sets](create-manage-event-schemas.md).

:::image type="content" source="./media/create-manage-event-schemas-real-time-hub/schema-set-user-interface.png" alt-text="Screenshot that shows the schema opened in the schema set editor." lightbox="./media/create-manage-event-schemas-real-time-hub/schema-set-user-interface.png":::

If you select **Endorse**, you see a window that lets you set the endorsement level for the schema. Organizations often have large numbers of Microsoft Fabric items available for sharing and reuse by their Fabric users. It can be difficult to identify trustworthy and authoritative items. Endorsement is a way to make it easier for users to find the high-quality items they need. For more information, see [Endorsement in Fabric](../../fundamentals/endorsement-promote-certify.md).

:::image type="content" source="./media/create-manage-event-schemas-real-time-hub/endorse.png" alt-text="Screenshot that shows the endorsement user interface." lightbox="./media/create-manage-event-schemas-real-time-hub/endorse.png":::

## Related content

To learn how to use schemas in Fabric eventstreams, see [Use schemas in eventstreams](use-event-schemas.md).
