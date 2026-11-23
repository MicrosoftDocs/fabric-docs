---
title: View and Compare Event Schema Versions in Fabric
description: Navigate event schema version history and compare saved Avro definitions in Microsoft Fabric.
ms.topic: how-to
ms.date: 09/08/2026
ms.search.form: Schema Registry
ai-usage: ai-assisted
#customer intent: As a data engineer, I want to inspect and compare schema versions so that I can understand changes before updating my event producers and consumers.
---

# View and compare event schema versions

Event schema sets retain earlier schema definitions when you save a new version. Versions use incrementing numbers, such as version 1, version 2, and version 3, rather than semantic versions.

Use the version history to inspect an earlier definition or compare two versions. Viewing an older version doesn't make it the latest version, restore it, or change the version used by a producer, consumer, or eventstream.

## Prerequisites

- Read access to the event schema set. See [Permissions](schema-registry-overview.md#permissions).
- A schema with at least two saved versions for comparison. To try the workflow, [import](import-event-schemas.md) the three versions from the [device telemetry example](device-telemetry-schema-example.md).

## View a schema version

1. Open the event schema set from its workspace, or expand it on the **Event schema registry** page in Real-Time hub.
1. Open the schema you want to inspect.
1. You see the version history for the schema in the right pane. By default, you see the latest version of the schema. In this example, it's version 2.

    :::image type="content" source="./media/manage-event-schema-versions/view-schema-versions.png" alt-text="Screenshot that shows versions of a schema." lightbox="./media/manage-event-schema-versions/view-schema-versions.png":::    
1. Select another version to view its definition. In this example, version 1 is selected. You can select a version in the **History** section or by using the **version drop-down** at the top of the schema view. Version 2 added an extra field named **description** to the schema.

    :::image type="content" source="./media/manage-event-schema-versions/view-schema-version-1.png" alt-text="Screenshot that shows version 1 of a schema." lightbox="./media/manage-event-schema-versions/view-schema-version-1.png":::    
1. Select the latest version to return to the current definition.

## Compare schema versions

1. Open the schema that you want to compare.
1. View the version history of the schema in the right pane. 
1. On the ribbon, select **Compare**.

    :::image type="content" source="./media/manage-event-schema-versions/select-compare-button.png" alt-text="Screenshot that shows the Compare button on the ribbon." lightbox="./media/manage-event-schema-versions/select-compare-button.png":::  
1. In the **Compare changes** page, you can compare versions by using the drop-down lists at the top. Review the side-by-side definitions and the highlighted differences. Check added or removed fields, changed types, defaults, and nested structures. In the following example, version 1 is compared with version 2.

    :::image type="content" source="./media/manage-event-schema-versions/compare-changes-page.png" alt-text="Screenshot that shows version 1 versus version 2 with additions visible." lightbox="./media/manage-event-schema-versions/compare-changes-page.png":::
1. To see the comparisons in non-JSON mode, switch to the **Preview mode** tab. 

    :::image type="content" source="./media/manage-event-schema-versions/compare-preview-mode.png" alt-text="Screenshot that shows version 1 versus version 2 with additions visible in the preview mode." lightbox="./media/manage-event-schema-versions/compare-preview-mode.png":::
    
1. Close the comparison when you're finished reviewing by selecting **X** in the top-right corner.


    > [!IMPORTANT]
    > A comparison shows differences; it isn't a compatibility check. Compatibility policy controls aren't exposed in the UI. Test changes with the producers and consumers that use the schema before adopting a new version.
    
## Create a new version

To save a changed definition, [update the event schema](create-manage-event-schemas.md#update-an-event-schema). The update creates a later version and preserves earlier definitions.

An earlier version isn't an editable replacement for the latest version. If you need a definition that resembles an earlier one, treat it as a new schema change and review its impact. Selecting a version in the history isn't a pipeline rollback operation.

## Related content

- [Create and manage event schemas](create-manage-event-schemas.md).
- [Import event schemas](import-event-schemas.md).
- [Device telemetry schema example](device-telemetry-schema-example.md).
- [Event schema limitations](schema-registry-limitations.md).
