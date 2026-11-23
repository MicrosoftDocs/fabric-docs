---
title: Create and Manage Event Schemas in Fabric Schema Sets
description: Learn how to create, update, download, and manage Avro event schemas in Microsoft Fabric event schema sets.
#customer intent: As a user, I want to learn how to add a schema to a schema set.
ms.topic: how-to
ms.custom:
  - ai-gen-docs-bap
  - ai-gen-description
  - ai-seo-date:08/07/2025
ms.date: 09/08/2026
ms.search.form: Schema Registry
ai-usage: ai-assisted
---

# Create and manage event schemas in schema sets

Create an event schema to define the structure of your streaming events. You can build an Avro schema in the UI, upload a definition, or enter it in the code editor. To bring in several schemas or versions at once, use [Import event schemas](import-event-schemas.md).

## Prerequisites

- An [event schema set](create-manage-event-schema-sets.md).
- Permission to edit the schema set. For example, the **Admin**, **Member**, or **Contributor** workspace role provides this access. For details, see [Permissions](schema-registry-overview.md#permissions).

## Add an event schema

1. Open the Fabric workspace, and select the event schema set.

    :::image type="content" source="./media/create-manage-event-schemas/select-schema-set.png" alt-text="Screenshot that shows a workspace with an event schema set selected." lightbox="./media/create-manage-event-schemas/select-schema-set.png":::

1. On the schema set page, select **New event schema**.

    :::image type="content" source="./media/create-manage-event-schemas/new-event-schema-button-2.png" alt-text="Screenshot that shows the option to create an event schema from a schema set." lightbox="./media/create-manage-event-schemas/new-event-schema-button-2.png":::

1.  On the **Create new schema** page, enter a **name** for the **schema**, not the schema set. Optionally, enter a **description** that explains the event data.
1. Choose how to define the schema:

    | Method | Steps |
    | --- | --- |
    | Upload an Avro definition | Select **Upload**, and choose a file containing an Avro schema. Use the [device telemetry example](device-telemetry-schema-example.md) to try this workflow. |
    | Build a schema visually | Use the **Schema view** tab to build your schema visually. Select **Add field**, and enter each field's name, type, and description. |
    | Enter an Avro definition | Use the **Code view** to open the code editor, and enter or paste the Avro schema as JSON. Use this option for the nested records, arrays, and other complex types in the example. |

    :::image type="content" source="./media/create-manage-event-schemas/code-editor-schema-json.png" alt-text="Screenshot that shows a device telemetry Avro definition in the schema code editor." lightbox="./media/create-manage-event-schemas/code-editor-schema-json.png":::

1. Review the definition and the target schema set, and select **Finish**.
1. Open the new schema from the schema set page. Verify the saved definition and its version.

    :::image type="content" source="./media/create-manage-event-schemas/select-schema.png" alt-text="Screenshot that shows the schema in a list on the schema set page." lightbox="./media/create-manage-event-schemas/select-schema.png":::

## Find an event schema

Use the search box on the schema set page to find a schema by name. To search across schema sets you can access, open **Event schema registry** in Real-Time hub.

Open a schema to inspect its definition, or use its preview to stay on the list. To inspect an older definition, [switch the displayed version](manage-event-schema-versions.md#view-a-schema-version).

## Download an event schema

You can download an event schema from a schema set page. Select one or more schemas from the list, and select **Download** on the ribbon. This option allows you to download selected schemas in a zip file. 

:::image type="content" source="./media/create-manage-event-schemas/download-schema-set-page.png" alt-text="Screenshot that shows the option to download a schema from the schema set page." lightbox="./media/create-manage-event-schemas/download-schema-set-page.png":::

You can also download an event schema from the individual schema page. Open the schema and select **Download** to save its definition to your computer. 

:::image type="content" source="./media/create-manage-event-schemas/download-button.png" alt-text="Screenshot that shows the option to download an event schema definition." lightbox="./media/create-manage-event-schemas/download-button.png":::

For sample definitions to upload, see the [device telemetry schema example](device-telemetry-schema-example.md).

## Update an event schema

When you update a saved schema definition, you create a new version instead of replacing the earlier definition.

> [!IMPORTANT]
> The UI doesn't expose schema compatibility policy controls. Review changes with the owners of your producers and consumers, and test them before changing a production pipeline. A successful save or a version comparison isn't proof of compatibility.

1. Open the schema you want to update.
1. Select **Update**.

    :::image type="content" source="./media/create-manage-event-schemas/update-button.png" alt-text="Screenshot that shows the update button on the schema page." lightbox="./media/create-manage-event-schemas/update-button.png":::
1. Edit the definition by using the **Schema view** or the **Code view**, or upload the updated Avro schema, and review the changes.

    :::image type="content" source="./media/create-manage-event-schemas/update-event-schema.png" alt-text="Screenshot that shows an updated device telemetry definition before saving a new version." lightbox="./media/create-manage-event-schemas/update-event-schema.png":::
1. Select **Finish**.
1. Open the version history, and verify that the new version contains the expected definition.


    For a walkthrough of inspecting and comparing saved versions, see [Manage event schema versions](manage-event-schema-versions.md).

## View versions of an event schema

You can choose which saved version to inspect without changing the latest version or a pipeline's configuration. See [View a schema version](manage-event-schema-versions.md#view-a-schema-version).

## View history of an event schema

The schema's version history helps you navigate earlier definitions and compare changes. See [Compare schema versions](manage-event-schema-versions.md#compare-schema-versions).

## Delete an event schema

Before deleting a schema, check whether producers, event types, or eventstreams depend on it. Deleting a schema isn't a way to roll back a pipeline to an earlier version.

1. On the schema page, select **Delete** on the ribbon. 

    :::image type="content" source="./media/create-manage-event-schemas/delete-button.png" alt-text="Screenshot that shows the Schema page with the Delete button highlighted." lightbox="./media/create-manage-event-schemas/delete-button.png":::    
1. Confirm the deletion in the dialog that appears.

    :::image type="content" source="./media/create-manage-event-schemas/delete-confirmation.png" alt-text="Screenshot that shows the confirmation dialog for deleting a schema." lightbox="./media/create-manage-event-schemas/delete-confirmation.png" border="true":::


## Related content

- [Import event schemas](import-event-schemas.md).
- [Manage event schema versions](manage-event-schema-versions.md).
- [Device telemetry schema example](device-telemetry-schema-example.md).
- [Use schemas in eventstreams](use-event-schemas.md).
