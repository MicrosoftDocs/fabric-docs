---
title: Write Back Planning Data to Semantic Models from Fabric Planning
description: Learn how to add writeback tables to Power BI semantic models, configure cardinality, and enable bi-directional filtering for accurate reporting.
ms.date: 09/26/2026
ms.topic: how-to
---

# Write back planning data to semantic models

Operational and planning data traditionally live in separate silos. While you configure a table for planning data, it often remains isolated inside the Planning artifact, unavailable for broader reporting or advanced analytics without manual intervention. 

The *Writeback to Semantic Model* feature in Fabric Planning bridges this gap by seamlessly elevating written-back plan tables directly into the organization's existing Power BI semantic model. Ultimately, this feature ensures that planning data is correctly structured, properly related, and immediately useful across the entire Fabric analytics ecosystem. Planning inputs, approved forecasts, reporting, and calculations can remain aligned around the same governed analytical model, reducing the need to maintain a disconnected planning model. 

> [!NOTE]
> You can't writeback to composite semantic models.

## Add writeback table to semantic model

To integrate your planning data with the semantic model, first write back your plan to a SQL database destination table. After you create the table, establish star-schema relationships by defining matching join columns, appropriate cardinality, and cross-filtering behavior.

1. In the **Writeback** ribbon, select **Add destination**.
1. Select the SQL database connection. Select the database and schema to create the writeback table. Enter the destination table name and select **Add**.

    :::image type="content" source="../media/planning-writeback/planning-how-to-write-back-semantic-model/add-writeback-destination.png" alt-text="Screenshot of the Create Destination dialog for configuring a SQL writeback destination table." lightbox="../media/planning-writeback/planning-how-to-write-back-semantic-model/add-writeback-destination.png":::

1. After you configure and add the SQL destination table, you can write back to the source semantic model. Select **Add table to semantic model**.

    :::image type="content" source="../media/planning-writeback/planning-how-to-write-back-semantic-model/add-table-semantic-model-option.png" alt-text="Screenshot of option to add a writeback table to the semantic model." lightbox="../media/planning-writeback/planning-how-to-write-back-semantic-model/add-table-semantic-model-option.png":::

1. Trigger an initial writeback to create the configured destination. Select **Next**.
1. Select **+ New relationship** to create star schema relationships with dimension tables in the semantic model. This step is optional.
1. Select the table in the semantic model table to create the relationship with. 

    :::image type="content" source="../media/planning-writeback/planning-how-to-write-back-semantic-model/select-table-create-relationship.png" alt-text="Screenshot of selecting semantic model table name to create a relationship." lightbox="../media/planning-writeback/planning-how-to-write-back-semantic-model/select-table-create-relationship.png":::

1. Under **Writeback Table Column Name**, select the common column, and then select the matching column under **Semantic Model Table Column Name**.

    :::image type="content" source="../media/planning-writeback/planning-how-to-write-back-semantic-model/select-matching-column.png" alt-text="Screenshot of selecting matching columns between writeback table and semantic model table." lightbox="../media/planning-writeback/planning-how-to-write-back-semantic-model/select-matching-column.png":::

1. Cardinality defines how many records in the writeback table can relate to records in the semantic model table. Select the cardinality based on your data.

    | From Cardinality | To Cardinality | Description |
    | ---------- | :------: | :------- |
    | One | One | Each record in the writeback table corresponds to exactly one record in the semantic model table, and vice versa. |
    | One | Many | A single record in the writeback table can relate to multiple records in the semantic model, but a record in the semantic model relates to only one record in the writeback table. |
    | Many | One | The reverse perspective of One-to-Many. Multiple records in the writeback table relate to a single record in the semantic model. |
    | Many | Many | Multiple records in the writeback table can relate to multiple records in the semantic model. |

    :::image type="content" source="../media/planning-writeback/planning-how-to-write-back-semantic-model/relationship-cardinality-bidirectional-filtering.png" alt-text="Screenshot of cardinality options and bi-directional filtering checkbox for a table relationship." lightbox="../media/planning-writeback/planning-how-to-write-back-semantic-model/relationship-cardinality-bidirectional-filtering.png":::

1. Enable bi-directional filtering based on your data. In a standard data model (using a One-to-Many relationship):
   * Single filtering (Default): Filters applied to the One side automatically filter the Many side. For example, filtering a Customers table filters the Sales table, however, filtering the Sales table doesn't filter the Customers table.
   * Bidirectional filtering: Filters applied to the Many side propagate back up to filter the One side.
1. Select **Review**. The **Review** section displays errors, if any, when creating the relationship. If cardinality and column configurations are correct, select **Apply to model**.

    :::image type="content" source="../media/planning-writeback/planning-how-to-write-back-semantic-model/apply-to-model-review-summary.png" alt-text="Screenshot of the relationship summary and review option." lightbox="../media/planning-writeback/planning-how-to-write-back-semantic-model/apply-to-model-review-summary.png":::

1. Refresh the catalog from the **Data** pane. Notice that the writeback table is added to the source semantic model. The configured destination table name is prefixed with "Plan" in the semantic model to identify it as a writeback destination.

    :::image type="content" source="../media/planning-writeback/planning-how-to-write-back-semantic-model/table-added-semantic-model.png" alt-text="Screenshot of the writeback table added to the semantic model." lightbox="../media/planning-writeback/planning-how-to-write-back-semantic-model/table-added-semantic-model.png":::

1. The writeback table is automatically added to the semantic model ontology, so AI agents can immediately answer queries about your plan data.

    :::image type="content" source="../media/planning-writeback/planning-how-to-write-back-semantic-model/ontology-entity-relationship-graph.png" alt-text="Screenshot of writeback table added to ontology." lightbox="../media/planning-writeback/planning-how-to-write-back-semantic-model/ontology-entity-relationship-graph.png":::

## Related content

* [What is Ontology](/fabric/iq/ontology/overview)
