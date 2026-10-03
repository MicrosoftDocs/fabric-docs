---
title: "Tutorial Part 0: Introduction and Environment Setup (Preview)"
description: Get started with ontology (preview) by setting up a sample retail scenario. Part 0 of the ontology (preview) tutorial.
ms.date: 09/11/2026
ms.topic: tutorial
ms.search.form: Ontology Tutorial
---

# Ontology (preview) tutorial part 0: Introduction and environment setup

This tutorial shows how to create your first ontology (preview) in Microsoft Fabric. You create ontology elements manually and with the help of the ontology agent, and bind them to data from multiple OneLake data sources. You enrich the ontology with additional metadata and information, and explore the completed ontology in the visual experience as well as through ontology agent queries.  

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

The example scenario for this tutorial is a fictional company called Lakeshore Retail. Lakeshore is a retail ice cream seller that keeps data on sales and refrigerator streaming data. In the tutorial, you create entity types like *Store*, *Products*, and *Sale*. You bind streaming data like refrigerator temperature from an eventhouse, and answer questions like: "What is the top product by revenue across all stores?"

## Prerequisites

* A [workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity). Use this workspace for all resources you create in the tutorial.
* The *Users can create ontology (preview) items* and *Users can create Fabric items* settings enabled on your Fabric tenant.

    A [Fabric administrator](../../admin/roles.md) can enable the settings in **OneLake catalog** > **Govern** > **Configurations** > [**Tenant settings**](../../admin/tenant-settings-index.md):

    :::image type="content" source="media/overview-tenant-settings/prerequisite-ontology.png" alt-text="Screenshot of enabling ontology in the admin portal." lightbox="media/overview-tenant-settings/prerequisite-ontology.png":::

    :::image type="content" source="media/overview-tenant-settings/prerequisite-fabric-items.png" alt-text="Screenshot of enabling Fabric items in the admin portal." lightbox="media/overview-tenant-settings/prerequisite-fabric-items.png":::

## Scenario

Lakeshore Retail is a multi-region retailer that sells general merchandise, perishable goods, and frozen products through stores supplied by regional distribution centers. Store operations teams need to maintain product availability without increasing waste, while frozen products must remain within safe storage temperatures throughout the retail cold chain.

This tutorial works toward one concrete operational outcome: *Which high-priority stores in the West have frozen products below safety stock, a recent refrigeration-temperature exception, and on-shelf availability below target? For each store, show the next inbound shipment and its expected arrival.*

With a robust ontology, the ontology agent can answer this question. Design an ontology that helps the agent understand that a frozen product is a type of product, what below safety stock and temperature exception mean, how products are stocked at stores, which refrigeration units operate at each store, how inbound shipments connect distribution centers to stores, and how the governed Power BI measure for on-shelf availability should be calculated.

The ontology in this tutorial connects operational signals, business definitions, governed metrics, and business relationships so that an agent can explain where intervention is needed and why.

### Ontology

The Lakeshore Retail elements in this tutorial comprise the following ontology. Review the diagram to understand the entity types and relationships that are involved in the scenario.

:::image type="content" source="media/tutorial-0-introduction/scenario.png" alt-text="Diagram showing entity types like Store, Shipment, and Product connected by relationships like deliversTo and stockedAt ." lightbox="media/tutorial-0-introduction/scenario.png":::

## Download sample data

Download the contents of the **New experience** folder from ontology samples in GitHub: [Ontology samples](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/iq/ontology/new-experience).

The sample data includes a set of CSV files containing static entity details about the Lakeshore Retail scenario and streaming data from its refrigerators, as well as a Power BI semantic model containing sales data.

## Prepare the lakehouse

Follow these steps to prepare the sample tutorial data in a lakehouse.

1. Start in your Fabric workspace. Use the **+ New item** button to create a new **Lakehouse** item.

    :::image type="content" source="media/tutorial-0-introduction/lakehouse-new.png" alt-text="Screenshot of creating a new lakehouse item." lightbox="media/tutorial-0-introduction/lakehouse-new.png":::

1. For the lakehouse **Name**, enter *LakeshoreStaticDataLH*. For **Location**, select your workspace. Keep the **Lakehouse schemas** checkbox selected (default) and select **Create**.

1. The new lakehouse opens when it's ready. From the lakehouse ribbon, select **Get data > Upload files**.

    :::image type="content" source="media/tutorial-0-introduction/lakehouse-upload.png" alt-text="Screenshot of uploading files to the lakehouse." lightbox="media/tutorial-0-introduction/lakehouse-upload.png":::

1. Upload **all except one of the sample CSV files** to your lakehouse. Don't upload *refrigeration_telemetry.csv* (you upload this file to eventhouse instead in a later step), or *SalesReport.pbix* (you import this data through the ontology agent in a later step).

1. Expand the **Files** folder in the Explorer to view your uploaded files. Next, load each file to a delta table.

    For each file, select **...** next to the file name, then **Load to Tables > New table**.

    :::image type="content" source="media/tutorial-0-introduction/lakehouse-new-table.png" alt-text="Screenshot of the load to tables dialog in lakehouse." lightbox="media/tutorial-0-introduction/lakehouse-new-table.png":::

    Continue through the table creation dialog, keeping the default settings.

The lakehouse looks like the following image when you're done. The default table names reflect the file names in all lowercase.

:::image type="content" source="media/tutorial-0-introduction/lakehouse-tables.png" alt-text="Screenshot of the tables in the lakehouse." lightbox="media/tutorial-0-introduction/lakehouse-tables.png":::

## Prepare the eventhouse

Follow these steps to upload the device streaming data file to a KQL database in an eventhouse.

1. In your Fabric workspace, select **+ New item** to create a new eventhouse called *LakeshoreTelemetryDataEH*. Fabric creates a default KQL database with the same name.
1. The eventhouse opens when it's ready. Open the KQL database by selecting its name in the explorer.

    :::image type="content" source="media/tutorial-0-introduction/eventhouse-database.png" alt-text="Screenshot of the KQL database in the eventhouse." lightbox="media/tutorial-0-introduction/eventhouse-database.png":::

1. Next, create a new table called *RefrigerationTelemetry* that uses the *refrigeration_telemetry.csv* sample file as a source.

    In the menu ribbon, select **Get data > Local file**.

    :::image type="content" source="media/tutorial-0-introduction/eventhouse-get-data.png" alt-text="Screenshot of the data source options for the database." lightbox="media/tutorial-0-introduction/eventhouse-get-data.png":::

    Create a **New table** called *RefrigerationTelemetry* and browse for the *refrigeration_telemetry.csv* file that you downloaded earlier.

    :::image type="content" source="media/tutorial-0-introduction/eventhouse-get-data-table.png" alt-text="Screenshot of uploading the csv file and creating the table." lightbox="media/tutorial-0-introduction/eventhouse-get-data-table.png":::

    Continue through the table creation dialog, keeping the default settings.

When you're done, the KQL database shows the *RefrigerationTelemetry* table with data:

:::image type="content" source="media/tutorial-0-introduction/eventhouse-table.png" alt-text="Screenshot of the table in the database." lightbox="media/tutorial-0-introduction/eventhouse-table.png":::

## Upload the semantic model

Finally, upload the sample semantic model to your workspace.

1. In your Fabric workspace, select **Import** > **Report, Paginated Report or Workbook** > **From this computer**.

    :::image type="content" source="media/tutorial-0-introduction/import.png" alt-text="Screenshot of importing a report into a workspace." lightbox="media/tutorial-0-introduction/import.png":::

    Find the *SalesReport.pbix* file that you downloaded and select **Open**.

1. The report is visible in your workspace, and a semantic model is created with the same name.

    :::image type="content" source="media/tutorial-0-introduction/workspace-semantic-model.png" alt-text="Screenshot of the report now visible in the workspace." lightbox="media/tutorial-0-introduction/workspace-semantic-model.png":::

## Next steps

Now your sample scenario is set up in Fabric. Next, create an ontology (preview) item and add elements to it that connect to these data sources: [Create an ontology](tutorial-1-create-ontology.md).
