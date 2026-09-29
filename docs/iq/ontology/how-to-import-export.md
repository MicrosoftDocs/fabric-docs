---
title: Import and Export Ontologies (Preview)
description: Learn how to import and export ontology (preview) items.
ms.date: 09/04/2026
ms.topic: how-to
ai-usage: ai-assisted
---

# Import and export ontologies (preview)

Use import to bring an external ontology (preview) file (TTL, RDF/RDFS, or OWL) into an empty ontology (preview) item. Fabric converts the file into native ontology content—entity types, properties, relationships, labels, descriptions, and synonyms—instead of storing it as a separate file. Export does the reverse. It writes the current ontology (preview) as a TTL or RDF file so you can validate, share, or round-trip it.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Prerequisites

Before you import or export an ontology, make sure you have the following prerequisites:

* A [Fabric workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
* **Ontology item (preview)** enabled on your tenant.
* To import: a new, empty ontology (preview) item, and an external ontology file in TTL, RDF/RDFS, or OWL format.
* To export: an ontology (preview) item that already contains content.

## Import an ontology

>[!NOTE]
> You can only import into an empty ontology item. The current preview doesn't support importing into an ontology that already contains content.

1. Open the empty ontology item you created in the Prerequisites section. Select **import from RDF/OWL**.

    :::image type="content" source="media/how-to-import-export/import-get-started.png" alt-text="Screenshot of the ontology get-started view with the option to import a TTL, RDF/RDFS, or OWL file." lightbox="media/how-to-import-export/import-get-started.png":::

1. Browse to an external ontology file in TTL, RDF/RDFS, or OWL format, and then select it.

    :::image type="content" source="media/how-to-import-export/import-dialog.png" alt-text="Screenshot of the Import dialog showing a preview of an ontology file." lightbox="media/how-to-import-export/import-dialog.png":::

1. Start the import. Fabric converts the file into ontology content, including entity types, properties, and relationships.

During import, Fabric maps source fields to ontology fields as follows: a source label becomes the Fabric display name, a description or comment becomes the Fabric description, and an alternate label (altLabel) becomes a synonym.

### Review import summary

When the import finishes, review the import summary before you close it. The summary shows a status count and a table of imported items with their name, type, and status.

:::image type="content" source="media/how-to-import-export/import-summary.png" alt-text="Screenshot of the import summary showing Preserved, Auto-fixed, and Not supported counts." lightbox="media/how-to-import-export/import-summary.png":::

The import summary reports each item with one of the following status values:

* **Preserved**: Fabric imported the item without meaningful change.
* **Auto-fixed**: Fabric imported the item but adjusted it to fit the ontology model. For example, Fabric makes duplicate names unique, keeps only the first parent for multiple inheritance, and might convert a property without a supported type to a string.
* **Not supported**: The file contains something Fabric can't currently represent, so Fabric skips the item. The reason appears in the summary and log.

The import summary provides these additional actions:

* Use the filter and search controls in the summary to find items by status or type (entity type, property, or relationship).
* Download the import log (for example, JSON or CSV) to keep a record of what Fabric imported, transformed, or dropped.

>[!IMPORTANT]
> The import summary is temporary and can't be reopened, so review it before closing.

When you're done reviewing the import summary, close the summary and confirm that Fabric created the expected entity types, properties, relationships, labels, descriptions, and synonyms in the ontology.

## Export an ontology

>[!NOTE]
> You can't export an empty ontology.

1. Open an ontology item that contains content and select the export action.

    :::image type="content" source="media/how-to-import-export/export.png" alt-text="Screenshot of the Export option for an ontology." lightbox="media/how-to-import-export/export.png":::

1. Choose the output format: **TTL** or **RDF**. Export doesn't support OWL, which is available only as an import format.
1. Download the exported file.
1. Optionally, import the exported file into another new, empty ontology item to confirm round-trip behavior.
