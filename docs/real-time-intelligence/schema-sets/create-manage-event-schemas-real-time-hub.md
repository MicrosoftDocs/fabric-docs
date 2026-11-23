---
title: Create and Manage Event Schemas in Fabric Real-Time Hub
description: Find, create, import, and manage event schemas across accessible schema sets in Fabric Real-Time hub.
#customer intent: As a user, I want to learn how to add a schema to a schema set.
ms.topic: how-to
ms.custom:
  - ai-gen-docs-bap
  - ai-gen-title
  - ai-seo-date:08/07/2025
  - ai-gen-description
ms.date: 09/08/2026
ms.search.form: Schema Registry
ai-usage: ai-assisted
---

# Create and manage event schemas in Fabric Real-Time hub

Use the **Event schema registry** page to discover and manage schemas across the schema sets you can access in your tenant. A schema set is a Fabric workspace item that groups related schemas. The registry is the cross-workspace view of those items.

## Prerequisites

You need read access to inspect a schema set and edit access to add or update schemas. To create a new schema set, you need the **Admin**, **Member**, or **Contributor** role in the target workspace. For more information, see [Permissions](schema-registry-overview.md#permissions).

## Navigate to Real-Time hub

[!INCLUDE [navigate-to-real-time-hub](../../real-time-hub/includes/navigate-to-real-time-hub.md)]

## Event schema registry page

Select **Event schema registry** on the left navigation bar. The registry shows schema sets and you can expand a set to explore its schemas.

:::image type="content" source="./media/create-manage-event-schemas-real-time-hub/event-schemas.png" alt-text="Screenshot of the Event schema registry with an expanded schema set and its schemas." lightbox="./media/create-manage-event-schemas-real-time-hub/event-schemas.png":::

### Search and filter

Use the search box to find a schema or schema set. Use the available filters to narrow the list, such as by workspace. The registry only shows items you have permission to access.

:::image type="content" source="./media/create-manage-event-schemas-real-time-hub/search.png" alt-text="Screenshot of the Event schema registry search functionality." lightbox="./media/create-manage-event-schemas-real-time-hub/search.png":::

### Schema set actions

You can open a schema set by selecting it in the list. When you hover over the schema set in the list and select **... (ellipsis)**, you see more actions. 

- **Open a schema set**. Use this option to view the details of a schema set, including the list of schemas it contains. From here, you can manage the schema set, add new schemas, or inspect existing ones. You can also open a schema by selecting it in the list.
- **Endorse a schema set**. Use this option to endorse a schema set to indicate that it's approved for use. On the **Endorsement** page, set the appropriate endorsement level for the schema set.

    :::image type="content" source="./media/create-manage-event-schemas-real-time-hub/endorse.png" alt-text="Screenshot that shows the Endorsement options." lightbox="./media/create-manage-event-schemas-real-time-hub/endorse.png":::


### Schema actions
You can open a schema by selecting it in the list. When you hover over the schema in the list and select **... (ellipsis)**, you see more actions. 

:::image type="content" source="./media/create-manage-event-schemas-real-time-hub/select-schema.png" alt-text="Screenshot of selecting a schema in the Event schema registry." lightbox="./media/create-manage-event-schemas-real-time-hub/select-schema.png":::

- **Edit schema**. Use this option to open the schema page to view and modify its details, including its definition and versions. You can also open the schema by selecting it in the list.     
- **Copy schema**. Use this option to copy the schema AVRO into the clipboard that you can copy to another location or share with others.
- **Download schema**. Use this option to download the schema AVRO to your local machine.
- **Delete schema**. Use this option to remove the schema from the schema set.

## Create an event schema

1. On the **Event schema registry** page, select **Create event schema set** or **Create**.

:::image type="content" source="./media/create-manage-event-schemas-real-time-hub/create-button.png" alt-text="Screenshot of the schema set list with the Create button highlighted." lightbox="./media/create-manage-event-schemas-real-time-hub/create-button.png":::
1. Enter a name and, optionally, a description for the **schema**.
1. Choose how to define the schema:

    | Method | Steps |
    | --- | --- |
    | Upload an Avro definition | Select **Upload**, and choose a file containing an Avro schema. Use the [device telemetry example](device-telemetry-schema-example.md) to try this workflow. |
    | Build a schema visually | Use the **Schema view** tab to build your schema visually. Select **Add field**, and enter each field's name, type, and description. |
    | Enter an Avro definition | Use the **Code view** to open the code editor, and enter or paste the Avro schema as JSON. Use this option for the nested records, arrays, and other complex types in the example. |

    :::image type="content" source="./media/create-manage-event-schemas/code-editor-schema-json.png" alt-text="Screenshot that shows a device telemetry Avro definition in the schema code editor." lightbox="./media/create-manage-event-schemas/code-editor-schema-json.png":::
1. Select the target workspace.
1. Choose an existing event schema set, or select the option to create a schema set and enter its name.

    :::image type="content" source="./media/create-manage-event-schemas-real-time-hub/use-existing-schema-set.png" alt-text="Screenshot that shows how to choose a workspace and an existing schema set for a new schema." lightbox="./media/create-manage-event-schemas-real-time-hub/use-existing-schema-set.png":::

1. Review the definition and target schema set, and select **Finish**.
1. Return to the registry, expand the target schema set, and verify that the schema appears. Refresh the list if needed.

To add several schemas or versions together, see [Import event schemas](import-event-schemas.md).

## Import event schemas

To import event schemas, use the import functionality in the Event schema registry. By uploading a file with schema definitions, you can add multiple schemas or versions at once. On **Event schema registry**, select the **Import your own schemas** tile or the **Import** button located above the list.

  :::image type="content" source="./media/create-manage-event-schemas-real-time-hub/import.png" alt-text="Screenshot that shows how to import event schemas in the Event schema registry." lightbox="./media/create-manage-event-schemas-real-time-hub/import.png":::    

For detailed instructions, see [Import event schemas](import-event-schemas.md).


## Related content

- [Explore the Event schema registry page](../../real-time-hub/event-schema-registry-page.md).
- [Create and manage event schema sets](create-manage-event-schema-sets.md).
- [Create and manage event schemas in schema sets](create-manage-event-schemas.md).
- [Import event schemas](import-event-schemas.md).
- [Use schemas in eventstreams](use-event-schemas.md).
