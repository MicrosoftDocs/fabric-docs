---
title: "Generating an ontology (preview) from a semantic model"
description: Learn about generating an ontology (preview) item from a Power BI semantic model.
author: baanders
ms.author: baanders
ms.reviewer: baanders
ms.date: 01/20/2026
ms.topic: concept-article
---

# Generating an ontology (preview) from a semantic model

A [semantic model](../../data-warehouse/semantic-models.md) in Fabric is a logical description of a domain, like a business. Semantic models hold information about your data and the relationships among that data. You can create them from lakehouse tables. When your data is in a semantic model, you can generate an ontology directly from that semantic model. 

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Process overview 

Ontology generation automatically creates the following artifacts:
* A new **ontology (preview) item** in your Fabric workspace, with a name that you choose.
* **Entity types** in the ontology that match the tables in your semantic model.
* **Static properties** on each entity type based on the columns in your tables, and **data bindings** that link your data rows to these properties.
* **Relationship types** between entity types that follow relationships defined in the semantic model.

After generating an ontology, complete these actions manually:
* Bind **time series data** to entity types. Properties for time series data aren't created automatically.
* Review **entity type keys** and add any that are missing, especially for multi-key scenarios.
* Bind **relationship types** to data.
* Review the entire ontology to make sure entity types, their properties and data bindings, and relationships are complete.

## Support for semantic model modes

This section describes feature support in ontology (preview) for different semantic model modes. For more information about semantic models and their modes, see [Power BI semantic models in Microsoft Fabric](../../data-warehouse/semantic-models.md).

| Feature | Import mode | Direct Lake mode | DirectQuery mode |
| --- | --- | --- | --- |
| Generating entity type definitions | Supported | Supported | Supported |
| Generating property definitions | Supported | Supported | Supported |
| Generating relationship definitions | Supported | Supported | Supported |
| Generating entity type bindings to data sources | Not supported | Supported ONLY when backing lakehouse is in a workspace with **inbound public access enabled** (otherwise, the  ontology item is created successfully but that entity type has no data bindings) | Not Supported |
| Generating relationship type bindings to data sources | Not supported | Supported ONLY when primary key is identified (the primary key is used as the entity type key for the ontology) | Not Supported |
| Querying data using bindings to data sources | Not supported | Supported (without measures and calculated columns) | Not Supported |

## Other limitations

Other limitations for generating ontology from a semantic model are organized by category below.

### Semantic model service limitations

Semantic models used for ontology generation are subject to general limitations of semantic models in the Power BI service. Some examples of relevant limitations are [semantic model size considerations](../../enterprise/powerbi/service-premium-large-models.md) and [XMLA endpoint limitations](../../enterprise/powerbi/service-premium-connect-tools.md#unsupported-semantic-models).

### Lakehouse tables

* Ontology only supports **managed** lakehouse tables (located in the same OneLake directory as the lakehouse), not **external** tables that show in the lakehouse but reside in a different location.
* The ontology graph does not support delta tables with column mapping enabled. Column mapping can be enabled manually, or is enabled automatically on lakehouse tables where column names have certain special characters, including `,`, `;`, `{}`, `()`, `\n`, `\t`, `=`, and space. It also happens automatically on the delta tables that store data for import mode semantic model tables.
* Fabric Graph doesn't currently support the `Decimal` type. As a result, if you generate an ontology from a semantic model with tables that include `Decimal` type columns, you see null values returned for those properties on all queries.
 
    >[!NOTE]
    >`Decimal` is different from the floating-point `Double` type, which is supported. `Decimal` is a fixed-precision numeric type that is most commonly used for representing monetary values.

### Workspace

You can't generate an ontology from a semantic model in the default Fabric workspace **My workspace**. Make sure the semantic model is in a different workspace.

### Troubleshooting

For troubleshooting tips related to semantic model ontology generation, see [Troubleshoot ontology (preview)](resources-troubleshooting.md#troubleshoot-ontology-generated-from-a-semantic-model).

## Next steps

For an example of this process, see [Ontology (preview) tutorial part 1: Create an ontology](tutorial-1-create-ontology.md?pivots=semantic-model).