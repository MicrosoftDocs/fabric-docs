---
title:  Enhancing events processing with multiple-schema inferencing
description: Provides information on using the multiple schema feature to process and preview events in Microsoft Fabric Eventstream.
ms.reviewer: spelluru
ms.author: xujiang1
author: wenyang
ms.topic: how-to
ms.custom:
ms.date: 06/25/2025
ms.search.form: Enhancing events processing with multiple-schema inferencing
---

# Enhancing events processing with multiple-schema inferencing (preview)

The multiple-schema inferencing feature in Microsoft Fabric event streams supports inferring multiple schemas from various sources and eventstream itself, enabling you to design different data transformation paths by picking up one of the inferred schemas with rich flexibility. This allows for seamless data integration and processing, catering to complex and multiple data shapes environment. It addresses the challenges previously encountered with single-schema inferencing.

This feature is useful for the following scenarios:

- **View and update the inferred schemas**: The inferred schemas within an Eventstream can be reviewed and verified in multiple locations. If any data types in specific fields are incorrectly inferred, this feature allows for necessary corrections. 
- **Leverage various inferred schemas for diverse transformation paths**: When configuring the first operator node after the middle default stream, it's necessary to select one of the inferred schemas. This allows the transformation path to be designed with event columns from the chosen schema. Different transformation paths can use different schemas for data transformation within a single Eventstream, increasing flexibility in data transformation. 
- **Well-organized data preview and test results**: Multiple-schema inferencing allows for a well-organized display of previewed data and test results. Previously, data with multiple schemas were shown with mixed columns during data previewing or test results, leading to confusion. Now, an inferred schema can be selected to filter the previewed or testing data, ensuring that only the data that matches the selected schema is displayed in the data preview or test results tab.
- **Eliminate the authoring errors on transformation paths when re-entering edit mode**: This feature preserves the schema applied in transformation paths, e.g., operators, after the Eventstream is published. By introducing this capability, authoring errors that previously appeared on transformation paths in single-schema inferencing eventstreams - when no matching schema was present in Edit mode - are eliminated. You can now continue adjusting operator configurations in transformation paths and publish Eventstream even if the newly inferred schema does not align with the one used in operator configurations or if no schema is inferred upon reentering Edit mode.
- **Map schema to source**: When inferring multiple schemas, Eventstream helps mapping the schema to the source, ensuring that each schema is associated with a known source. If Eventstream can't identify the source of data with the inferred schema, you're prompted to manually map the schema to an appropriate source, ensuring that each schema has an associated source for transformation design. It provides the visibility of from where the schema originates. 

## How it works

**The schemas are inferred based on the data previewed from both sources and eventstream within a given time range**. Thus, if there's no data in source or eventstream, or the source doesn’t support data preview, there won’t be any schema inferred. If the previewed data changes (for example, new fields added, data type changes, etc.), new schema is inferred. If there are operators configured in your eventstream, **the schema that was used for operator configuration is retained when publishing this eventstream**. When reentering Edit mode, this retained schema remains applied to the operators. This approach addresses authoring errors that arise when the inferred schema differs from the one used in operator configurations or if no schema is inferred.

## Prerequisites

- Access to a workspace with **Contributor** or higher permissions where your eventstream is located.

## How to enable multiple-schema inferencing

To use this feature, you need to enable multiple-schema inferencing in your eventstream. You can enable it in both new and existing eventstream. 
1. Open your eventstream and go to **Settings**, and then select **Schema**.
1. Turn on **Multiple schema inferencing** and select **Apply**.

:::image type="content" source="./media/process-events-with-multiple-schemas/enable-multiple-schema.png" alt-text="Screenshot showing how to enable multiple schema feature." lightbox="./media/process-events-with-multiple-schemas/enable-multiple-schema.png":::

> [!NOTE]
>  Once enabled, this feature cannot be disabled for this eventstream.

## View and update the inferred schema(s)

If your eventstream's source supports data preview or your eventstream contains data, schemas can be automatically inferred from the previewed data. Go to edit mode, select the **Inferred schema** tab to review and modify the schemas within Eventstream.

:::image type="content" source="./media/process-events-with-multiple-schemas/inferred-schema.png" alt-text="Screenshot showing the autoinferred schemas." lightbox="./media/process-events-with-multiple-schemas/inferred-schema.png":::

Select the schema name to view all columns (i.e., fields) in the schema. If any fields are incorrectly inferred, you can use this feature to correct them, for example, correcting column (i.e., field) names, correcting data types, or adding and removing columns. Select **Apply** to save changes.

:::image type="content" source="./media/process-events-with-multiple-schemas/edit-schema.png" alt-text="Screenshot showing how to edit the inferred schema." lightbox="./media/process-events-with-multiple-schemas/edit-schema.png":::

> [!NOTE]
> This step allows you to correct how Eventstream interprets your data when the inferred schema is inaccurate. To convert data types during processing, use the Managed Field operator in the transformation path.

## Using different schemas in transformation paths

The multiple-schema inferencing feature enables the capability that different schemas can be used in different transformation paths. When configuring the first operator node after the default stream, select an **Input schema**. 

:::image type="content" source="./media/process-events-with-multiple-schemas/select-input-schema.png" alt-text="Screenshot showing how to select input schema in first node." lightbox="./media/process-events-with-multiple-schemas/select-input-schema.png":::

**Selecting a schema here helps you define transformation logic using the fields specified in that schema. However, it doesn't filter incoming data.** Even if an event lacks the selected fields, it's still processed, with those fields left as *null*. For example, if you select a schema from "Sp500stocks" but receive data from "Bicycles", the event still reaches the custom endpoint, with the selected fields showing null values.

:::image type="content" source="./media/process-events-with-multiple-schemas/null-value.png" alt-text="Screenshot showing the result of dispatching schema." lightbox="./media/process-events-with-multiple-schemas/null-value.png":::

Eventhouse destination doesn’t receive any data in this case.

:::image type="content" source="./media/process-events-with-multiple-schemas/event-house-result.png" alt-text="Screenshot showing the result of dispatching schema of Event house." lightbox="./media/process-events-with-multiple-schemas/event-house-result.png":::

Each transformation path in an eventstream can use different schema. In the first operator of each path after the default stream, you can select the schema that best matches the expected data transformation requirement for that path.

If a transformation path doesn't include any operators, you can select the input schema directly in the destination configuration. **Again, the input schema doesn’t act as a filter, but a schema input for backend query generation.**

:::image type="content" source="./media/process-events-with-multiple-schemas/directly-insert-destination.png" alt-text="Screenshot showing how to directly insert a destination after a default stream." lightbox="./media/process-events-with-multiple-schemas/directly-insert-destination.png":::

## View the data by schema in Data Preview and Test result

After adding a preview-supported source or after data begins flowing into a published eventstream, you can enter edit mode and select an inferred schema to view the matched test data.

You can select an inferred schema in edit mode to view the test result if the source supports data preview, or if it doesn’t but the Eventstream is published and data flows into the default stream.

:::image type="content" source="./media/process-events-with-multiple-schemas/test-result.png" alt-text="Screenshot showing test results in edit mode." lightbox="./media/process-events-with-multiple-schemas/test-result.png":::

To view the schema details that are used in the nodes (operators or destination) in the transformation path, select the operator or destination node, and then select **View schema**.

:::image type="content" source="./media/process-events-with-multiple-schemas/view-schema.png" alt-text="Screenshot showing how to view schema on the first node." lightbox="./media/process-events-with-multiple-schemas/view-schema.png":::

You can also select an inferred schema to filter the previewed data in Live view, ensuring that only the data matching the selected schema is displayed in the Data preview tab.

> [!NOTE]
> The schema in Live view is used to organize the previewed data. These schemas are inferred from the previewed live data from the supported sources and the eventstream. Therefore, if there's no data being previewed, no schema is shown. If there's data with a new schema, the schema displayed in Live view differs from the schema previously shown in Edit view.

:::image type="content" source="./media/process-events-with-multiple-schemas/data-preview-in-live-view.png" alt-text="Screenshot showing how to preview in live view." lightbox="./media/process-events-with-multiple-schemas/data-preview-in-live-view.png":::

## Mapping a schema to its source

Eventstream automatically maps the inferred schemas to their respective sources when the origins of the schemas are identified. For instance, if the source supports data preview and the schema is inferred from this previewed data, Eventstream maps the schema with the source accordingly.

:::image type="content" source="./media/process-events-with-multiple-schemas/map-data-source.png" alt-text="Screenshot showing how to map schema to data source." lightbox="./media/process-events-with-multiple-schemas/map-data-source.png":::

If your data source doesn’t support data preview, you must first publish the Eventstream and wait for data to arrive. Then, switch back to edit mode to review the inferred schema. In this case, because Eventstream can't identify the data source based on the inferred schema, you're prompted to manually map the schema to the right source.

You can select **Map to data source** under the **Inferred schema** tab in edit mode to manually assign it to a source.

:::image type="content" source="./media/process-events-with-multiple-schemas/manually-map-data-source.png" alt-text="Screenshot showing how to manually map schema to data source." lightbox="./media/process-events-with-multiple-schemas/manually-map-data-source.png":::

Select data source for mapping and select **Save** to save your changes.

:::image type="content" source="./media/process-events-with-multiple-schemas/select-data-source.png" alt-text="Screenshot showing how to select data source to map schema.":::

You can also map the schema during its first use in the transformation path. When you configure and save an operator or destination, a dialog appears prompting you to select the appropriate source for the schema.

:::image type="content" source="./media/process-events-with-multiple-schemas/save.png" alt-text="Screenshot showing how to save mapping." lightbox="./media/process-events-with-multiple-schemas/save.png":::
   
## FAQ

**Q: Why is no schema inferred after adding a source and refreshing test results?**  

A: When creating a new eventstream and adding a source that doesn't support data preview, no schema will be inferred immediately, even after refreshing the test results. For example, the custom endpoint source, Azure Service Bus, etc. To generate inferred schemas in this case, you need to publish Eventstream first and wait for data to arrive in your eventstream. Once data starts flowing into your eventstream, switch back to Edit mode to view the inferred schemas. **This is because the schemas are inferred based on the data previewed from both sources and eventstream.**

In this case, if you use the inferred schema in a transformation path, make sure to manually map the schema to the correct source under the Inferred schema tab.

:::image type="content" source="./media/process-events-with-multiple-schemas/re-enter-edit-mode.png" alt-text="Screenshot showing reentering edit mode to map data source that does not support data preview." lightbox="./media/process-events-with-multiple-schemas/re-enter-edit-mode.png":::

**Q: I edited the inferred schema, but the data didn’t change. Why?**  

A: Editing an inferred schema modifies Eventstream's interpretation of your incoming data structure and type but does not alter the actual data values and types. Use this function when you determine that the inferred schema is not consistent with your real data format and structure, and you need accurate column (i.e., field) types for downstream operators’ configuration. To apply changes to the data itself (e.g., renaming fields, converting types) when processing data, use the **Managed Field** operator in the transformation path.

**Q: What if the schema of my data in the existing source changes after it’s been inferred?**  

A: If the data structure changes (for example, new fields added, data type changes, etc.) in a source, a new schema is inferred when this new data is previewed in this eventstream as schema is inferred from the previewed data. You can review and use the new schema in Edit mode. Or the new schema can be used to organize the previewed data in Live view. If your previous schema is used in an operator or destination, and the eventstream is published, your previous schema is retained and can still be viewed in edit mode. 

**Q: What are the consequences of publishing an eventstream if a schema is not mapped to any source?** 

A: This schema won't be retained in this eventstream because it's a temporary schema and isn't used by any operator or destination configurations.

**Q: What happens if I delete an existing source that has a mapped schema?**  

A: If the schema inferred from the source isn't used in any operator or destination, deleting the source doesn't result in an error. However, if the schema inferred from the source is used in any operator or destination, an authoring error occurs. To proceed, you need to remap the schema inferred from the deleted source to a valid source before publishing, or you select another schema as the input schema for the operator.

:::image type="content" source="./media/process-events-with-multiple-schemas/re-map-schema.png" alt-text="Screenshot showing how to remap schema." lightbox="./media/process-events-with-multiple-schemas/re-map-schema.png":::

**Q: Why do I see an extra schema after enabling this feature on an existing eventstream?**  

A: When this feature is enabled in an existing eventstream and you switch to Edit mode, an extra schema containing mixed fields appear in certain cases. This schema originates from the existing eventstream, which used for operator configurations in existing eventstream. By default, it's mapped to all sources because Eventstream can't determine its origin. This safeguards the continuity of your current setup without errors.

## Limitations

- Currently, when an eventstream has multiple-schema inferencing enabled, CI/CD and REST APIs for this eventstream may not function as expected. 

## Related content

- [Add and manage destinations in an eventstream](./add-manage-eventstream-destinations.md).
- [Process event data with the event processor editor](./process-events-using-event-processor-editor.md).
