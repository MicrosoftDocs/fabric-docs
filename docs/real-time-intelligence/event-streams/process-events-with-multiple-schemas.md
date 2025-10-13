---
title: Enhance Event Processing with Multiple Schema Inferencing
description: This article provides information on using multiple schemas to process and preview events in a Microsoft Fabric eventstream.
ms.reviewer: spelluru
ms.author: xujiang1
author: wenyang
ms.topic: how-to
ms.custom:
ms.date: 09/08/2025
ms.search.form: Enhancing events processing with multiple schema inferencing
---

# Enhance event processing by using multiple schema inferencing (preview)

The feature of multiple schema inferencing in Microsoft Fabric eventstreams supports inferring multiple schemas from various sources and the eventstream itself. You can use the feature to design various data transformation paths by picking up one of the inferred schemas with rich flexibility. This ability allows for seamless data integration and processing that caters to environments with complex and multiple data shapes. It addresses the challenges that users previously encountered with single-schema inferencing.

This feature is useful for the following scenarios:

- **View and update inferred schemas**: The inferred schemas within an eventstream can be reviewed and verified in multiple locations. If any data types in specific fields are incorrectly inferred, the feature allows for necessary corrections.
- **Use various inferred schemas for diverse transformation paths**: When you're configuring the first operator node after the middle default stream, it's necessary to select one of the inferred schemas. This selection allows the transformation path to be designed with event columns from the chosen schema.

  Different transformation paths can use different schemas for data transformation within a single eventstream. This ability increases flexibility in data transformation.
- **Get a well-organized data preview and test result**: Multiple schema inferencing allows for a well-organized display of previewed data and test results. Previously, data with multiple schemas appeared with mixed columns during data previewing or test results. This kind of display led to confusion. Now, you can select an inferred schema to filter the previewed or tested data. Only the data that matches the selected schema appears on the tab for data preview or test results.
- **Eliminate the authoring errors on transformation paths when you reenter Edit mode**: This feature preserves the schema applied in transformation paths (for example, operators) after the eventstream is published. This capability eliminates authoring errors that previously appeared on transformation paths in single-schema inferencing eventstreams, when no matching schema was present in **Edit** mode.

  You can now continue adjusting operator configurations in transformation paths and publish the eventstream even if the newly inferred schema doesn't align with the one used in operator configurations, or if no schema is inferred upon reentry into **Edit** mode.
- **Map each schema to a source**: When you're inferring multiple schemas, an eventstream helps map each schema to a source. If the eventstream can't identify the source of data with the inferred schema, you're prompted to manually map the schema to an appropriate source. This mapping ensures that each schema has an associated source for transformation design. It provides visibility into where the schema originates.

## How it works

Schemas are inferred based on the data previewed from both sources and the eventstream within a time range. If there's no data in the source or eventstream, or the source doesn't support a data preview, no schema is inferred. If the previewed data changes (for example, new fields are added or the data type changes), a new schema is inferred.

If operators are configured in your eventstream, the schema that you used for operator configurations is retained when you publish the eventstream. When you reenter **Edit** mode, this retained schema remains applied to the operators. This approach addresses authoring errors that arise when the inferred schema differs from the one used in operator configurations, or if no schema is inferred.

## Prerequisites

- Access to a workspace with Contributor or higher permissions where your eventstream is located.

## Enable multiple schema inferencing

To use multiple schema inferencing, you need to enable the feature in your eventstream. You can enable it in both new and existing eventstreams.

1. Open your eventstream, go to **Settings**, and then select **Schema**.
1. Turn on the **Multiple schema inferencing** toggle, and then select **Apply**.

:::image type="content" source="./media/process-events-with-multiple-schemas/enable-multiple-schema.png" alt-text="Screenshot that shows selections for turning on multiple schema inferencing." lightbox="./media/process-events-with-multiple-schemas/enable-multiple-schema.png":::

> [!NOTE]
> After you enable the feature, you can't disable it for this eventstream.

## View and update the inferred schemas

If your eventstream's source supports data preview or your eventstream contains data, schemas can be automatically inferred from the previewed data. Go to **Edit** mode, and then select the **Inferred schema** tab to review and modify the schemas within the eventstream.

:::image type="content" source="./media/process-events-with-multiple-schemas/inferred-schema.png" alt-text="Screenshot that shows automatically inferred schemas." lightbox="./media/process-events-with-multiple-schemas/inferred-schema.png":::

Select the schema name to view all columns (that is, fields) in the schema. If any fields are incorrectly inferred, you can correct them. For example, you can correct field names, correct data types, or add and remove fields. Select **Update** to save changes.

:::image type="content" source="./media/process-events-with-multiple-schemas/edit-schema.png" alt-text="Screenshot that shows selections for editing an inferred schema." lightbox="./media/process-events-with-multiple-schemas/edit-schema.png":::

> [!NOTE]
> You use this step to correct how an eventstream interprets your data when the inferred schema is inaccurate. To convert data types during processing, use the **Manage fields** operator in the transformation path.

## Use different schemas in transformation paths

The feature of multiple schema inferencing enables the use of different schemas in different transformation paths. When you configure the first operator node after the default stream, select an item in the **Input schema** list.

:::image type="content" source="./media/process-events-with-multiple-schemas/select-input-schema.png" alt-text="Screenshot that shows how to select an input schema in the first node." lightbox="./media/process-events-with-multiple-schemas/select-input-schema.png":::

Selecting a schema here helps you define transformation logic by using the fields specified in that schema. However, it doesn't filter incoming data. Even if an event lacks the selected fields, it's still processed, with those fields left as *null*.

For example, if you select a schema from **Sp500stocks** but you receive data from **Bicycles**, the event still reaches the custom endpoint. The selected fields show null values.

:::image type="content" source="./media/process-events-with-multiple-schemas/null-value.png" alt-text="Screenshot that shows the result of dispatching a schema." lightbox="./media/process-events-with-multiple-schemas/null-value.png":::

An eventhouse destination doesn't receive any data in this case.

:::image type="content" source="./media/process-events-with-multiple-schemas/event-house-result.png" alt-text="Screenshot that shows the result of dispatching a schema for an eventhouse." lightbox="./media/process-events-with-multiple-schemas/event-house-result.png":::

Each transformation path in an eventstream can use a different schema. In the first operator of each path after the default stream, you can select the schema that best matches that path's expected requirement for data transformation.

If a transformation path doesn't include any operators, you can select the input schema directly in the destination configuration. The input schema doesn't act as a filter. It acts as a schema input for back-end query generation.

:::image type="content" source="./media/process-events-with-multiple-schemas/directly-insert-destination.png" alt-text="Screenshot that shows how to directly insert a destination after a default stream." lightbox="./media/process-events-with-multiple-schemas/directly-insert-destination.png":::

## View the data by schema in the data preview and test result

After you add a preview-supported source or after data begins flowing into a published eventstream, you can enter **Edit** mode and select an inferred schema to view the matched test data.

You can select an inferred schema in **Edit** mode to view the test result if the source supports data preview, or if it doesn't but the eventstream is published and data flows into the default stream.

:::image type="content" source="./media/process-events-with-multiple-schemas/test-result.png" alt-text="Screenshot that shows a test result in Edit mode." lightbox="./media/process-events-with-multiple-schemas/test-result.png":::

To view the schema details that are used in the nodes (operators or destination) in the transformation path, select the operator or destination node, and then select **View schema**.

:::image type="content" source="./media/process-events-with-multiple-schemas/view-schema.png" alt-text="Screenshot that shows selections for viewing a schema on the first node." lightbox="./media/process-events-with-multiple-schemas/view-schema.png":::

You can also select an inferred schema to filter the previewed data in **Live** view. This filtering can ensure that only the data that matches the selected schema appears on the **Data preview** tab.

> [!NOTE]
> You use the schema in **Live** view to organize the previewed data. These schemas are inferred from the previewed live data from the supported sources and the eventstream. If you're not previewing any data, no schema appears. If there's data with a new schema, the schema displayed in **Live** view differs from the schema previously shown in **Edit** view.

:::image type="content" source="./media/process-events-with-multiple-schemas/data-preview-in-live-view.png" alt-text="Screenshot that shows a preview in Live view." lightbox="./media/process-events-with-multiple-schemas/data-preview-in-live-view.png":::

## Map a schema to its source

An eventstream automatically maps the inferred schemas to their respective sources when the origins of the schemas are identified. For instance, if the source supports data preview and the schema is inferred from this previewed data, the eventstream maps the schema with the source accordingly.

:::image type="content" source="./media/process-events-with-multiple-schemas/map-data-source.png" alt-text="Screenshot that shows the tab for inferred schemas." lightbox="./media/process-events-with-multiple-schemas/map-data-source.png":::

If your data source doesn't support data preview, you must first publish the eventstream and wait for data to arrive. Then, switch back to **Edit** mode to review the inferred schema. In this case, because the eventstream can't identify the data source based on the inferred schema, you're prompted to manually map the schema to the right source.

To manually assign a schema to a source:

1. In **Edit** mode, on the **Inferred schema** tab, select **Map to data source**.

   :::image type="content" source="./media/process-events-with-multiple-schemas/manually-map-data-source.png" alt-text="Screenshot that shows selections to start manually mapping a schema to a data source." lightbox="./media/process-events-with-multiple-schemas/manually-map-data-source.png":::

1. Select the data source for mapping, and then select **Save** to save your changes.

   :::image type="content" source="./media/process-events-with-multiple-schemas/select-data-source.png" alt-text="Screenshot that shows the selection of a data source to map a schema.":::

You can also map the schema during its first use in the transformation path. When you configure and save an operator or destination, a dialog prompts you to select the appropriate source for the schema.

:::image type="content" source="./media/process-events-with-multiple-schemas/save.png" alt-text="Screenshot that shows the dialog for selecting a source for a schema." lightbox="./media/process-events-with-multiple-schemas/save.png":::

## FAQ

### Why is no schema inferred after I add a source and refresh the test result?

When you're creating a new eventstream and adding a source that doesn't support data preview, no schema is inferred immediately, even after you refresh the test result.

For example, assume that you're using Azure Service Bus as the custom endpoint source. To generate inferred schemas in this case, you need to publish the eventstream first and wait for data to arrive in your eventstream. After data starts flowing into your eventstream, switch back to **Edit** mode to view the inferred schemas. These actions are necessary because the schemas are inferred based on the data previewed from both the source and the eventstream.

In this case, if you use the inferred schema in a transformation path, make sure to manually map the schema to the correct source on the **Inferred schema** tab.

:::image type="content" source="./media/process-events-with-multiple-schemas/re-enter-edit-mode.png" alt-text="Screenshot that shows reentering edit mode to map a data source that doesn't support data preview." lightbox="./media/process-events-with-multiple-schemas/re-enter-edit-mode.png":::

### I edited the inferred schema, but the data didn't change. Why?

Editing an inferred schema modifies the eventstream's interpretation of your incoming data structure and type, but it doesn't alter the actual data values and types. Use this function when you determine that the inferred schema is not consistent with your real data format and structure, and you need accurate column (that is, field) types for downstream operators' configuration.

To apply changes to the data itself (for example, rename fields or  convert types) when you're processing data, use the **Manage fields** operator in the transformation path.

### What if the schema of my data in the existing source changes after it's inferred?

If the data structure changes (for example, you add new fields or change the data type) in a source, a new schema is inferred when this new data is previewed in this eventstream. The reason is that the schema is inferred from the previewed data.

You can review and use the new schema in **Edit** mode. Or you can use the new schema to organize the previewed data in **Live** view. If your previous schema is used in an operator or destination, and the eventstream is published, your previous schema is retained and can still be viewed in **Edit** mode.

### What are the consequences of publishing an eventstream if a schema isn't mapped to any source?

The schema isn't retained in the eventstream because it's a temporary schema, and no operator or destination configurations use it.

### What happens if I delete an existing source that has a mapped schema?

If the schema inferred from the source isn't used in any operator or destination, deleting the source doesn't result in an error. However, if the schema inferred from the source is used in any operator or destination, an authoring error occurs.

To proceed, you need to remap the schema inferred from the deleted source to a valid source before publishing. Or you can select another schema as the input schema for the operator.

:::image type="content" source="./media/process-events-with-multiple-schemas/re-map-schema.png" alt-text="Screenshot that shows the dialog for mapping a schema." lightbox="./media/process-events-with-multiple-schemas/re-map-schema.png":::

### Why do I see an extra schema after I enable this feature on an existing eventstream?

When you enable multiple schema inferencing in an existing eventstream and you switch to **Edit** mode, an extra schema that contains mixed fields appears in certain cases. This schema originates from the existing eventstream, which you used for operator configurations. By default, it's mapped to all sources because the eventstream can't determine its origin. This default behavior safeguards the continuity of your current setup and avoids errors.

## Related content

- [Add and manage a destination in an eventstream](./add-manage-eventstream-destinations.md)
- [Process event data by using the event processing editor](./process-events-using-event-processor-editor.md)
