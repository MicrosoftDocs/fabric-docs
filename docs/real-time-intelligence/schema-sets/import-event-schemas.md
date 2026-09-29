---
title: Import Event Schemas into a Fabric Event Schema Set
description: Import multiple Avro schemas and versions into a new or existing event schema set in Microsoft Fabric.
ms.topic: how-to
ms.date: 09/08/2026
ms.search.form: Schema Registry
ai-usage: ai-assisted
#customer intent: As a data engineer, I want to import existing Avro schemas and their versions so that I can reuse my data contracts in Fabric.
---

# Import event schemas into an event schema set

Use bulk import to add multiple Avro schemas to a new or existing event schema set. You can also import multiple versions of a schema, review their order, and keep the latest definition available alongside its history.

## Prerequisites

- Permission to edit the target schema set, or the **Admin**, **Member**, or **Contributor** role in the workspace where you create a new set. See [Permissions](schema-registry-overview.md#permissions).
- Files containing Avro schema definitions, such as `.avsc` files. Event payloads aren't schema definitions.
- For a walkthrough, save all three versions from the [device telemetry schema example](device-telemetry-schema-example.md) as separate files.

## Select files and a target schema set

1. Navigate to your event schema set from the Fabric workspace page or the Fabric Real-Time hub. 
1. Select **Import** on the ribbon.

    :::image type="content" source="media/import-event-schemas/import-button.png" alt-text="Screenshot showing the Import button on the ribbon." lightbox="media/import-event-schemas/import-button.png":::
1. On **Import schemas**, follow these steps:
    1. Confirm that the **Use existing schema set** option is selected if you want to import into an existing set. Otherwise, choose **New schema set**.
    1. Confirm the workspace selection is correct.
    1. If you selected the **Use existing schema set** option, confirm the right schema set is selected. 
    1. Select **Choose files** on the ribbon.
    
        :::image type="content" source="media/import-event-schemas/choose-files.png" alt-text="Screenshot showing the Choose files button on the ribbon." lightbox="media/import-event-schemas/choose-files.png":::
1. Select files for one or more schemas, and one or more versions of a schema. In this example, select the files you downloaded: device-telemetry-v1.avsc, device-telemetry-v2.avsc, device-telemetry-v3.avsc.
1. Review the selected files, schema names, descriptions, and detected versions before importing. Check that the files represent versions of the same intended schema rather than unrelated definitions. Review the displayed grouping and ordering instead of relying only on the order in which you selected the files. Resolve any validation errors shown in the import workflow. Then, select **Import**.

    :::image type="content" source="media/import-event-schemas/import.png" alt-text="Screenshot showing the Import button on the import review page." lightbox="media/import-event-schemas/import.png":::

## Review imported schemas

1. Open the target schema set. Verify that the imported schemas appear. Select the schema that you want to inspect. 

    :::image type="content" source="media/import-event-schemas/select-schema.png" alt-text="Screenshot showing the selected schema in the target schema set." lightbox="media/import-event-schemas/select-schema.png":::
1. Inspect its latest definition. Use the version history to verify that the earlier versions are available in the intended order.

    :::image type="content" source="media/import-event-schemas/verify-import.png" alt-text="Screenshot showing schema and its version history." lightbox="media/import-event-schemas/verify-import.png"::: 


> [!IMPORTANT]
> Review the import result before using the schemas in a pipeline. Importing a definition doesn't update producers, change an eventstream's schema association, or prove that the new version is compatible with existing consumers.

To review differences between the imported definitions, see [Compare schema versions](manage-event-schema-versions.md#compare-schema-versions).

## Related content

- [Create and manage event schema sets](create-manage-event-schema-sets.md).
- [Create and manage event schemas](create-manage-event-schemas.md).
- [Manage event schema versions](manage-event-schema-versions.md).
- [Device telemetry schema example](device-telemetry-schema-example.md).
