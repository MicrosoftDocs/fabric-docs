---
title: Perform contextualization
description: Learn about building relationship types with the contextualization feature of digital twin builder (preview).
author: baanders
ms.author: baanders
ms.date: 05/02/2025
ms.topic: how-to
---

# Perform contextualization

The *contextualization* feature within digital twin builder (preview) allows users to further augment the context of their data by creating semantic relationship types between entity types in their ontology.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

Relationships are like the predicates in Resource Description Framework (RDF) triples, where each triple consists of a subject-predicate-object structure. For example, a triple might consist of a **machine** (subject) that **is operated by** (predicate) an **operator** (object). "Is operated by" is an example of a relationship. Relationship types in digital twin builder describe how entity types are linked to each other, and they play a fundamental role in providing context on data. Once the entity types and relationship types are defined, objects from your data are represented as specific instances of the entity types, connected by instances of the relationship types.

Here are some uses and benefits of creating semantic relationships in digital twin builder.
* **Connecting entity types**. Relationship types define how resources are connected, allowing you to create a network of data. For example, you can link a *Person* entity type to an *Organization* entity type with a *worksFor* relationship type. This process allows your data to become a more complete representation of your real-world environment.
* **Defining semantics**. Relationship types add semantic meaning to data, by defining the nature of connections between resources and processes in the real world. This process allows the ontology in digital twin builder to be more understandable and structured, which facilitates machine comprehension.
* **Data interoperability and discoverability**. Adding relationship types standardizes connections across entity types, making it easier for people to query and navigate data. It also helps downstream and consumer systems understand and integrate diverse data sources.

## Prerequisites

* A [workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
* Your desired data in a [Fabric lakehouse](../../data-engineering/lakehouse-overview.md) with the necessary ETL done.
    * Time series data should be in *columnar* format. Columnar time series data is structured so that each column represents a different variable or attribute, while each row corresponds to a specific timestamp. 
* A [digital twin builder (preview) item](tutorial-1-set-up-resources.md#create-new-digital-twin-builder-item-in-fabric) with at least two entity types [mapped](model-manage-mappings.md).

## Create a relationship type

This section describes how to add a new relationship type between two entity types in the [semantic canvas](concept-semantic-canvas.md).

1. In the semantic canvas, select one of the entity types involved in your relationship type, and select **Add relationships** in the menu ribbon. Or, select **...** to the right of the entity type name and then **Add relationship** from those options.

    :::image type="content" source="media/model-perform-contextualization/create-1.png" alt-text="Screenshot of Add relationships button.":::

1. In the **Relationship configuration** pane that appears, 
    1. Select the name of the **First entity**, and which **Property to join** in the relationship type. Repeat the process for the **Second entity**.
    1. Define the relationship type with a **Relationship name**.
    1. For **Select relationship type**, choose the appropriate cardinality.
    
        If a single source entity instance might be connected to many target entity instances, choose **1:N**. If there are many source entity instances that might connect to a single target entity instance, choose **N:1**.

1. When you're finished adding the configuration details, select **Create**.

    :::image type="content" source="media/model-perform-contextualization/create-2.png" alt-text="Screenshot of relationship type configuration details.":::

The relationship type appears in the semantic canvas immediately. It might take a few minutes for it to propagate across the [data layer](concept-modeling.md#storage-and-access) and be available in the [explorer](explore-search-visualize.md).

## Manage relationship types

To manage an existing relationship type, select it from the semantic canvas. You can change the selected entity types and entity type properties, and the relationship type's cardinality.

To edit a relationship type, follow these steps.

1. Find the relationship type in the semantic canvas, by selecting its source or target entity type from the **Entities** pane and selecting the relationship type from the canvas.

    :::image type="content" source="media/model-perform-contextualization/edit-relationship.png" alt-text="Screenshot of selecting the relationship type." lightbox="media/model-perform-contextualization/edit-relationship.png":::

1. Update the relationship type configuration. When you're done with your changes, select **Apply**.

The relationship type updates in the semantic canvas immediately. It might take a few minutes for it to propagate across the [data layer](concept-modeling.md#storage-and-access) and be available in the [explorer](explore-search-visualize.md).

## Limitations

Relationship types in digital twin builder (preview) have the following restrictions:

* All relationship types must reference entity type properties. This information is used by digital twin builder to create connections in the data layer based on specific reference keys (like in a traditional relationship database scenario).
* A single entity type property can't be both the source and target in the same relationship type. 

    For example, say the *Employee* entity type has the following properties: *EmployeeId*, *EmployeeEmail*, and *ManagerId*.

    The semantic relationship type *Employee (EmployeeId) -reportsTo-> Employee (ManagerId)* is valid, but *Employee (EmployeeId) -is-> Employee (EmployeeId)* isn't valid.