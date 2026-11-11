---
title: Import and Export Ontologies (Preview)
description: Learn how to import and export ontology (preview) items and how Fabric maps supported RDF, RDFS, OWL, and SKOS concepts.
ms.date: 10/23/2026
ms.topic: how-to
ai-usage: ai-assisted
---

# Import and export ontologies (preview)

Use import to bring an external ontology (preview) file (TTL, RDF/RDFS, or OWL) into an empty ontology (preview) item. Fabric converts the file into native ontology content—entity types, properties, relationships, labels, descriptions, and synonyms—instead of storing it as a separate file. Export does the reverse. It writes the current ontology (preview) as a TTL or RDF file.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Prerequisites

Before you import or export an ontology, make sure you have the following prerequisites:

* A [Fabric workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
* **Users can create ontology (preview) items** and **Users can create Fabric items** [enabled on your Fabric tenant](overview-tenant-settings.md).
* To import: a new, empty ontology (preview) item, and an external ontology file with a `.ttl`, `.rdf`, or `.owl` extension.
* To export: an ontology (preview) item that already contains content.

## Import an ontology

>[!NOTE]
> You can only import into an empty ontology item. The current preview doesn't support importing into an ontology that already contains content.

1. Open the empty ontology item you created in the Prerequisites section. Select **Import ontology**.

    :::image type="content" source="media/how-to-import-export/import-get-started.png" alt-text="Screenshot of the ontology get-started view with the Import ontology option." lightbox="media/how-to-import-export/import-get-started.png":::

1. Select **Browse**, choose a `.ttl`, `.rdf`, or `.owl` file, and then select it.

    :::image type="content" source="media/how-to-import-export/import-dialog.png" alt-text="Screenshot of the import dialog showing a selected ontology file and the Start import button." lightbox="media/how-to-import-export/import-dialog.png":::

1. Select **Start import**. Fabric converts supported concepts in the file into ontology, including entity types, properties, and relationships.

During import, Fabric maps source fields to ontology fields as follows: a source label becomes the Fabric display name, a description or comment becomes the Fabric description, and an alternate label (altLabel) becomes a synonym.

### Review import summary

When the import finishes, review the import summary before you close it. The summary shows a status count and a table of imported items with their name, type, and status.

:::image type="content" source="media/how-to-import-export/import-summary.png" alt-text="Screenshot of the import summary showing Preserved, Fixed automatically, and Not supported counts." lightbox="media/how-to-import-export/import-summary.png":::

The import summary reports each item with one of the following status values:

* **Preserved**: Fabric imported the supported entity type, property, or relationship without a reported transformation.
* **Fixed automatically**: Fabric imported the item but adjusted it to fit the ontology model. For example, Fabric makes colliding entity type or relationship names unique, retains only one supported parent for multiple inheritance, and converts a property without a supported data type to a string.
* **Not supported**: Fabric skipped the item. Review the reason in the summary and log.

>[!IMPORTANT]
> A **Preserved** status or 100% import success doesn't guarantee that all source semantics were retained. Some unsupported constructs, such as OWL restrictions, aren't reported separately. Review the resulting model and, if needed, compare an export with the source file.

The import summary provides these additional actions:

* Use the filter and search controls in the summary to find items by status or type (entity type, property, or relationship).
* Download the import log (for example, JSON or CSV) to keep a record of what Fabric imported, transformed, or dropped.

>[!IMPORTANT]
> The import summary is temporary and can't be reopened, so review it before closing.

When you're done reviewing the import summary, select **Done** and confirm that Fabric created the expected entity types, properties, relationships, descriptions, and synonyms in the ontology.

## Export an ontology

>[!NOTE]
> You can't export an empty ontology.

1. Open an ontology item that contains content and select **Export**.

    :::image type="content" source="media/how-to-import-export/export.png" alt-text="Screenshot of the Export option for an ontology." lightbox="media/how-to-import-export/export.png":::

1. Choose the output format: **Turtle (.ttl)** or **RDF/XML (.rdf)**. There's no separate `.owl` output option, but both output formats can contain supported OWL concepts.
1. Select **Export** to download the file.
1. Optionally, import the exported file into another new, empty ontology item to confirm round-trip behavior.

## Supported RDF concept mappings

Ontology in Fabric supports importing and exporting a subset of RDF, RDFS, OWL, and SKOS concepts by mapping them to native ontology in Fabric concepts. Some concepts map directly, while Fabric transforms others into the closest supported representation.

### Import mappings

| RDF, RDFS, OWL, or SKOS concept | Ontology in Fabric concept | Mapping |
|---|---|---|
| `owl:Class` | **Entity type** | Imported as a native ontology in Fabric entity type. |
| `owl:DatatypeProperty` | **Property** | Imported as a native property when `rdfs:domain` identifies an imported entity type. A property without a resolvable domain is skipped. |
| `owl:ObjectProperty` | **Relationship type** | Imported as a native relationship when its source and target resolve to imported entity types. |
| `rdfs:label` | **Display name** | The default-language label is imported. Other-language labels are dropped and logged. |
| `rdfs:comment` | **Description** | Imported as the description of the corresponding ontology concept. |
| `skos:altLabel` | **Synonyms** | Supported alternate labels are imported as synonyms. |
| Single-parent `rdfs:subClassOf` | **Entity type inheritance** | The child entity type is imported, and the parent is mapped as its base entity type. |
| Multi-parent `rdfs:subClassOf` | **Single-parent inheritance** | One supported parent becomes the base entity type. Additional parents are dropped and reported in the import log. |
| `xsd:anyURI` | **String property** | The property is imported as a string, and the type conversion is reported in the import log. Export writes `xsd:string`, not the original `xsd:anyURI` range. |
| Invalid concept name | No imported concept | Concepts whose names don't meet Fabric naming requirements are skipped, with a reason in the import log. Name collisions are handled separately; entity type and relationship names can receive a suffix to make them unique. |

### Export mappings

Ontology in Fabric serializes supported native concepts to their corresponding RDF, RDFS, OWL, or SKOS representations in the selected Turtle or RDF output format.

| Ontology in Fabric concept | RDF, RDFS, OWL, or SKOS concept | Mapping |
|---|---|---|
| **Entity type** | `owl:Class` | Exported as an OWL class. |
| **Property** | `owl:DatatypeProperty` | Exported as a datatype property with `rdfs:domain` identifying the owning entity type and `rdfs:range` representing the property data type. |
| **Relationship type** | `owl:ObjectProperty` | Exported as an object property with `rdfs:domain` and `rdfs:range` identifying the source and target entity types. |
| **Entity description** | `rdfs:comment` | Exported as the RDF description of the entity type. |
| **Entity type name** | `rdfs:label` | Exported as the label for the entity type, not necessarily the original source label. |
| **Synonyms** | `skos:altLabel` | Exported as one `skos:altLabel` triple per supported synonym. |
| **Base entity type** | `rdfs:subClassOf` | Supported single-parent inheritance is exported as a subclass relationship. |

### RDF concepts without a direct ontology in Fabric equivalent

RDF and OWL provide semantic constructs that don't have a direct representation in the ontology in Fabric metamodel. Examples include complex OWL class expressions and restrictions, property characteristics such as transitivity or symmetry, RDF reification, and arbitrary RDF graph structures.

During import, Fabric ignores these constructs, retains them as metadata where supported, or transforms them into an equivalent ontology in Fabric modeling pattern. Import and export preserve commonly used modeling semantics and support interoperability with RDF-based systems, but they don't provide complete or lossless support for the full RDF or OWL specification.
