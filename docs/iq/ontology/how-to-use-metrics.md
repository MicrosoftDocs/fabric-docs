---
title: Define Metrics in Ontology (Preview)
description: Learn how to use the metrics feature in ontology (preview).
ms.date: 09/04/2026
ms.topic: how-to
ai-usage: ai-assisted
---

# Define business metrics in ontology (preview)

When you generate an ontology (preview) from a Power BI semantic model, the ontology surfaces the model's DAX measures under the corresponding ontology entities as *metrics*. A *metric* in ontology reflects the measures from the semantic model by keeping a link to the semantic model and pulling the original DAX expression on demand. This article shows how to view and work with metrics in ontology.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Prerequisites

Before you view metrics, make sure you have the following prerequisites:

* A [Fabric workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
* **Ontology item (preview)** enabled on your tenant.
* A Power BI semantic model that contains one or more DAX measures.
* To view a measure's original DAX expression, **write** permission on the source semantic model. Without it, you can still see each measure's name, description, table, and source, but you can't pull the expression.

## How metrics work

One way to create an ontology is to [generate it from one or multiple semantic models](how-to-generate-from-semantic-models.md). Generating an ontology from a semantic model brings in the model's tables as entities, and its measures as *metrics*. Metrics are visible on ontology entities and have the following behavior:

* Each measure appears as a metric under the entity for the table you defined it on. Today the mapping is one entity to one table, even when a measure's DAX references multiple tables.
* Ontology metrics proxy measures instead of copying them. A metric stores a link to the source semantic model and retrieves the original DAX expression from the model when you request it.
* Anything you edit in the ontology, such as a metric description, stays in the ontology only, where agents can use it. It never changes the semantic model.

## Generate the ontology from a semantic model

1. From the semantic model, select **Generate ontology**, name the new ontology, and create it. Fabric connects to the semantic model and pulls its tables, columns, and relationships. For more information, see [Generate an ontology from a semantic model](how-to-generate-from-semantic-models.md).

    :::image type="content" source="media/how-to-use-metrics/generate-ontology-progress.png" alt-text="Screenshot of the generate-ontology progress connecting to a semantic model." lightbox="media/how-to-use-metrics/generate-ontology-progress.png":::

1. When generation finishes, open the new ontology item and confirm that the tables appear as entities and the relationships connect them.

    :::image type="content" source="media/how-to-use-metrics/generated-model-view.png" alt-text="Screenshot of a generated ontology model view showing tables as entities with relationships." lightbox="media/how-to-use-metrics/generated-model-view.png":::

## View metrics on an entity

1. Open an entity and select **View Entity Type details**.

    :::image type="content" source="media/how-to-use-metrics/entity-type-details.png" alt-text="Screenshot of the entity type details page for an entity." lightbox="media/how-to-use-metrics/entity-type-details.png":::

1. Locate the **Metrics** section on the entity details page. It lists metrics based on measures in the semantic model behind this entity. Each metric shows a name, description, source semantic model, and table.

    :::image type="content" source="media/how-to-use-metrics/metrics-grid.png" alt-text="Screenshot of the Metrics section listing metrics with their source semantic model and table." lightbox="media/how-to-use-metrics/metrics-grid.png":::

    >[!NOTE]
    > The Metrics section is only visible if the entity has metrics coming from its semantic model source. If you don't see a Metrics section, the entity might not have any metrics.

1. Use the search, sort, and filter controls to find metrics by source semantic model or by table.

## View metric details

Select a metric to open its details. The details include the description, the source semantic model, and the table the metric applies to.

:::image type="content" source="media/how-to-use-metrics/metric-details.png" alt-text="Screenshot of a single metric's details, including its DAX expression." lightbox="media/how-to-use-metrics/metric-details.png":::

You can perform these actions from the detail page:

* Edit the metric formula or description.
    >[!NOTE]
    > The ontology stores the change only, where agents use it; it doesn't change the semantic model.
* Select **Resolve underlying DAX** to pull the original DAX expression from the semantic model. Viewing the original expression requires **write** permission on the source semantic model. The first pull is slower because Fabric fetches all measures; later ones load quickly.
* Select the **Source model** link to open the semantic model in a new tab.

## Refresh to see semantic model changes

Metrics don't update automatically. When a measure's DAX expression or description changes in the semantic model, refresh the ontology to see the updated metric value.

## Related content

* [Generate an ontology from a semantic model](how-to-generate-from-semantic-models.md)
