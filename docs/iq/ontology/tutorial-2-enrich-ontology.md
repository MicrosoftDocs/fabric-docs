---
title: "Tutorial Part 2: Enrich the Ontology with Additional Data (Preview)"
description: Enrich the ontology by adding metadata and rules. Part 2 of the ontology (preview) tutorial.
ms.date: 09/12/2026
ms.topic: tutorial
---

# Ontology (preview) tutorial part 2: Enrich the ontology with additional data

In this tutorial step, you enrich your ontology by adding metadata to the entity type and its properties. You also create some ontology business rules. This information adds more domain context and operational information.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Add metadata

You can add metadata to entity types and to specific properties on the entity types. You can also add metadata to relationships.

### Add entity type metadata

Metadata for entity types supports descriptions, synonyms, and additional metadata key-value pairs. Follow these steps to add that metadata to your entity types.

1. Start with the Store entity type. Select it on the semantic canvas and select **View Entity Type details**.

    :::image type="content" source="media/tutorial-2-enrich-ontology/store-view-entity-type-details.png" alt-text="Screenshot of opening entity type details for Store." lightbox="media/tutorial-2-enrich-ontology/store-view-entity-type-details.png":::

1. On the **Configure** page that opens, scroll down to the **Entity metadata** section.
1. Enter the following **Description**: *Filtered locations binding where LocationType = STORE; priorityDefinition=Tier 1 stores require same-day response.*

    :::image type="content" source="media/tutorial-2-enrich-ontology/store-metadata.png" alt-text="Screenshot of adding a metadata description to Store." lightbox="media/tutorial-2-enrich-ontology/store-metadata.png":::

    Select **Update**.

1. Use the same steps that you used for the Store entity type to add the entity type metadata described in the following table.

    | Entity type name | Metadata | Notes |
    | --- | --- | --- |
    | Distribution Center | **Description:** *Filtered locations binding where LocationType = DC.* | |
    | Frozen Product | **Description:** *Filtered items binding where StorageClass = FROZEN.* | |
    | Perishable Product | **Description:** *Filtered items binding where StorageClass = PERISHABLE.* | |
    | Inventory | **Additional metadata:**<br><br> On-Shelf Availability % : On-shelf availability percentage is calculated by dividing the total ShelfAvailableUnits by the total ShelfCapacityUnits. If total ShelfCapacityUnits is zero, the result is blank to avoid division by zero. <br><br> Low On-Shelf Availability : On-Shelf Availability % less than 95 | Additional metadata is entered as key-value pairs. |
    | Sale | **Description** and **Synonyms** are already added to the entity type from the semantic model import. | Just review the metadata that's already there (no need to add metadata manually). |

### Add entity type property metadata

Metadata for properties supports descriptions and additional metadata key-value pairs, but not synonyms. Follow these steps to add metadata to properties on your entity types.

1. Start with Product > `ProductId`. Select the Product entity type, select **...**, and then select **Bind data**.

    :::image type="content" source="media/tutorial-2-enrich-ontology/product-bind-data.png" alt-text="Screenshot of opening the Product data bindings." lightbox="media/tutorial-2-enrich-ontology/product-bind-data.png":::

1. Select **Entity type properties** from the left pane to open the **Properties** list.
1. Next to the `ProductId` property, select **Metadata**.

    :::image type="content" source="media/tutorial-2-enrich-ontology/product-property-metadata.png" alt-text="Screenshot of selecting metadata for the property." lightbox="media/tutorial-2-enrich-ontology/product-property-metadata.png":::

1. For **Description**, enter *Enterprise product identifier; not a supplier SKU or UPC.*

    :::image type="content" source="media/tutorial-2-enrich-ontology/product-property-metadata-edit.png" alt-text="Screenshot of entering metadata description for the property." lightbox="media/tutorial-2-enrich-ontology/product-property-metadata-edit.png":::

    Select **Update**.

1. Select **Save**.
1. Use the same steps that you used for the Product > `ProductId` property to add the property metadata described in the following table.

    | Entity Type | Property | Metadata |
    | --- | --- | --- |
    | Refrigeration Telemetry | TemperatureC | **Description:** Temperature in Celsius. |
    | Inventory | InventoryStatus | **Description:** 0 is AT_RISK and 1 is HEALTHY. |

### Add relationship metadata

Metadata for relationship types supports descriptions and additional metadata key-value pairs, but not synonyms. Follow these steps to add metadata to your relationship types.

1. Start with *Store operates Refrigeration Unit*. Select the Store entity in the **Explorer** to show it on the configuration canvas, and select the *operates* relationship connected to it to open the relationship configuration options.
1. Scroll down to the **Metadata** section. Select **Edit**.

    For **Description**, enter *Identifies the refrigeration equipment operating in a store.*

    :::image type="content" source="media/tutorial-2-enrich-ontology/relationship-metadata.png" alt-text="Screenshot of adding a metadata description to the relationship type." lightbox="media/tutorial-2-enrich-ontology/relationship-metadata.png":::

    Select **Update**.

1. Use the same steps that you used for the *Store operates Refrigeration Unit* relationship type to add the relationship type metadata described in the following table.

    | Relationship type name | Source > target entity type | Metadata |
    | --- | --- | --- |
    | *operates* | Store > Refrigeration Unit | **Description:** *Identifies the refrigeration equipment operating in a store.* |
    | *deliversTo* | Shipment > Store | **Description:** *Identifies the store receiving the shipment.* |
    | *occursAt* | Sale > Store | **Description:** *Identifies where the sale occurred.* |
    | *stockedAt* | Inventory > Store | **Description:** *Represents an active store assortment and its current inventory position, not merely a historical sale.* |
    | *originatesAt* | Shipment > Distribution Center | **Description:** *Identifies the distribution center sending the shipment.* |
    | *forProduct* | Sale > Product | **Description:** *Identifies the item sold.* |
    | *stockedAt* | Product > Inventory | **Description:** *The item is part of the store's active assortment and has a current inventory position there.* |
    | *suppliedBy* | Product > Supplier | **Description:** *Identifies the supplier responsible for the items.* |
    | *contains* | Shipment > Product | **Description:** *Identifies the item being replenished.* |
    | *hasTelemetryReading* | Refrigeration Unit > Refrigeration Telemetry | **Description:** *Identified sensor telemetry readings for refrigeration units.* |

## Add rules

Next, add some business rules that give more detail about day-to-day operations. Write rules in natural language and link them to entity types, properties, and relationship types so consumers (like AI agents) can discover these rules and use them to ground their responses.

1. In the **Explorer**, expand **Overview** and select **Rules**.

    :::image type="content" source="media/tutorial-2-enrich-ontology/rules.png" alt-text="Screenshot of opening the Business rules page." lightbox="media/tutorial-2-enrich-ontology/rules.png":::

1. Select **+ Create rule**.
1. Enter the following rule details:

    1. **Name:** Cold-chain exception
    1. **Definition:** *A frozen product has a cold-chain exception when the temperature of the refrigeration unit storing it remains above the product’s maximum storage temperature for more than 20 minutes.*
    1. **Linked ontology concepts:** Frozen Product, Refrigeration Unit

    :::image type="content" source="media/tutorial-2-enrich-ontology/rules-configure.png" alt-text="Screenshot of configuring rule details." lightbox="media/tutorial-2-enrich-ontology/rules-configure.png":::

1. Select **Save**. After the rule finishes saving, select **Cancel** to close the configuration details.
1. You see the rule in the **Business rules** page.

    :::image type="content" source="media/tutorial-2-enrich-ontology/rules-done.png" alt-text="Screenshot of the new rule on the Business rules page." lightbox="media/tutorial-2-enrich-ontology/rules-done.png":::

1. Select **New rule** to add more rules. Add two rules with the following details:

    | Name | Definition | Linked concepts |
    | --- | --- | --- |
    | Inventory at risk | *A store inventory position is at risk when projected on-hand inventory falls below safety stock before the next scheduled delivery* | - Store <br>- Inventory |
    | Late replenishment | *A replenishment shipment is late when its estimated arrival is more than four hours after its scheduled arrival.* | Shipment |

## Next steps

Your ontology is now enriched with additional metadata and business rules that give more context about day-to-day operations.

Next, continue to [Explore the ontology](tutorial-3-preview-ontology.md).
