---
title: "Generating an ontology (preview) from a semantic model"
description: Learn about the option to generate an ontology (preview) from a Power BI semantic model.
author: baanders
ms.author: baanders
ms.reviewer: baanders
ms.date: 12/03/2025
ms.topic: concept-article
---

# Generating an ontology (preview) from a semantic model

A [semantic model](../../data-warehouse/semantic-models.md) in Fabric is a logical description of an analytical domain (like a business). They can be created from lakehouse tables, and hold information about your data and the relationships among that data.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

When your data is represented by a semantic model, you can generate an ontology directly from that semantic model. 

Ontology generation automatically performs the following actions:
* Creates a new **ontology (preview) item** in your Fabric workspace, with a name of your choosing
* Creates an **entity type** in the ontology for each table in your semantic model
* Creates **static properties** on each entity type based on the columns in your tables, and **binds data** to them based on data rows
* Creates **relationship types** between entity types that follow relationships defined in the semantic model

After generating an ontology, complete these actions manually:
* Bind **time series data** to entity types (properties for time series data aren't created automatically)
* Review **entity type keys** and add them if missing (especially for multi-key scenarios)
* Bind **relationship types** to data
* Review the entire ontology to make sure entity types, their properties and data bindings, and relationships are complete

## Support for semantic model modes

This section describes support in ontology (preview) for different semantic model modes. For more information about semantic models and their modes, see [Power BI semantic models in Microsoft Fabric](../../data-warehouse/semantic-models.md).

| Ontology (preview) | Import mode | Direct Lake mode | DirectQuery mode |
| --- | --- | --- | --- |
| Generating entity type definitions | Supported | Supported | Supported |
| Generating property definitions | Supported | Supported | Supported |
| Generating relationship definitions | Supported | Supported | Supported |
| Generating entity type bindings to data sources | Not supported | Supported; backing lakehouse must be in a workspace with **inbound public access enabled** | Not Supported |
| Generating relationship type bindings to data sources | Not supported | Supported; primary key must be identified (the primary key is used as the entity type key for the ontology) | Not Supported |
| Querying data using bindings to data sources | Not supported | Supported (without measures and calculated columns) | Not Supported |

## Other semantic model limitations

* Generating an ontology from a semantic model isn't supported in the default Fabric workspace **My workspace**. Make sure the semantic model is in a different workspace.
* Ontology does not support creating data bindings when the semantic model table is in **Direct Lake mode** and the backing lakehouse is in a workspace with **inbound public access disabled**. The ontology item is created successfully but that entity type has no data bindings.
* Fabric Graph does not currently support the `Decimal` type. As a result, if you generate an ontology from a semantic model with tables that include `Decimal` type columns, you see null values returned for those properties on all queries. 
    * `Decimal` is different from the floating-point `Double` type, which is supported. `Decimal` is a fixed-precision numeric type that is most commonly used for representing monetary values.
* Ontology only supports **managed** lakehouse tables (located in the same OneLake directory as the lakehouse), not **external** tables that show in the lakehouse but reside in a different location.
* The ontology graph does not support delta tables with column mapping enabled. Column mapping can be enabled manually, or is enabled automatically on lakehouse tables where column names have certain special characters, including `,`, `;`, `{}`, `()`, `\n`, `\t`, `=`, and space. It also happens automatically on the delta tables that store data for import mode semantic model tables.

### Troubleshooting

For troubleshooting tips related to semantic model ontology generation, see [Troubleshoot ontology (preview)](resources-troubleshooting.md#troubleshoot-ontology-generated-from-a-semantic-model).

## Next steps

See an example of this process in the [Ontology (preview) tutorial part 1: Create an ontology](tutorial-1-create-ontology.md?pivots=semantic-model).