---
title: "Tutorial part 0: Introduction and environment setup"
description: Get started with ontology (preview) by setting up a sample retail scenario. Part 0 of the ontology (preview) tutorial.
author: baanders
ms.author: baanders
ms.reviewer: baanders
ms.date: 02/04/2026
ms.topic: tutorial
zone_pivot_group_filename: iq/ontology/zone-pivot-groups.json
zone_pivot_groups: create-ontology-scenario
ms.search.form: Ontology Tutorial
---

# Ontology (preview) tutorial part 0: Introduction and environment setup

This tutorial shows how to create your first ontology (preview) in Microsoft Fabric, either by generating it from an existing **Power BI semantic model** or by **building it from your OneLake data**. Then, enrich the ontology with live operational data, and explore it with both graph preview and natural-language (NL) queries through Fabric data agent.  

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

The example scenario for this tutorial is a fictional company called Lakeshore Retail. Lakeshore is a retail ice cream seller that keeps data on sales and freezer streaming data. In the tutorial, you generate entity types like *Store*, *Products*, and *SaleEvent*. You bind streaming data like *freezer temperature* from Eventhouse, and answer questions like: "What is the top product by revenue across all stores?"

[!INCLUDE [tutorial choice note](includes/choose-tutorial-method.md)]

## Prerequisites

::: zone pivot="semantic-model"
* A [workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity). Use this workspace for all resources you create in the tutorial.
* Required settings for ontology (preview) and data agent must be enabled on your tenant. A [Fabric administrator](../../admin/roles.md) should enable the following settings in the [tenant settings](../../admin/tenant-settings-index.md) page of the [admin portal](../../admin/admin-center.md):
    * *Enable Ontology item (preview)*
    * *User can create Graph (preview)*
    * *Users can create and share Data agent item types (preview)*
    * *Users can use Copilot and other features powered by Azure OpenAI*
    * *Data sent to Azure OpenAI can be processed outside your capacity's geographic region, compliance boundary, or national cloud instance*
    * *Data sent to Azure OpenAI can be stored outside your capacity's geographic region, compliance boundary, or national cloud instance*

    :::image type="content" source="media/tutorial-0-introduction/prerequisite-ontology.png" alt-text="Screenshot of enabling ontology in the admin portal.":::

    For more information about these prerequisites, see [Ontology (preview) required tenant settings](overview-tenant-settings.md).
::: zone-end
::: zone pivot="onelake"
* A [workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity). Use this workspace for all resources you create in the tutorial.
* Required settings for ontology (preview) and data agent must be enabled on your tenant. A [Fabric administrator](../../admin/roles.md) should enable the following settings in the [tenant settings](../../admin/tenant-settings-index.md) page of the [admin portal](../../admin/admin-center.md):
    * *Enable Ontology item (preview)*
    * *User can create Graph (preview)*
    * *Users can create and share Data agent item types (preview)*
    * *Users can use Copilot and other features powered by Azure OpenAI*
    * *Data sent to Azure OpenAI can be processed outside your capacity's geographic region, compliance boundary, or national cloud instance*
    * *Data sent to Azure OpenAI can be stored outside your capacity's geographic region, compliance boundary, or national cloud instance*

    :::image type="content" source="media/tutorial-0-introduction/prerequisite-ontology.png" alt-text="Screenshot of enabling ontology in the admin portal.":::

    For more information about these prerequisites, see [Ontology (preview) required tenant settings](overview-tenant-settings.md).
::: zone-end

## Download sample data 

Download the contents of this GitHub folder: [IQ samples](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/iq).

It contains the following sample CSV files. The data contains static entity details about the Lakeshore Retail scenario and streaming data from its freezers:
* *DimStore.csv*
* *DimProducts.csv*
* *FactSales.csv*
* *Freezer.csv*
* *FreezerTelemetry.csv*

## Prepare the lakehouse 

Follow these steps to prepare the sample tutorial data in a lakehouse.

1. Start in your Fabric workspace. Use the **+ New item** button to create a new **Lakehouse** item called *OntologyDataLH*.

    :::image type="content" source="media/tutorial-0-introduction/lakehouse-new.png" alt-text="Screenshot of creating a new lakehouse item." lightbox="media/tutorial-0-introduction/lakehouse-new.png":::

1. The new lakehouse opens when it's ready. From the lakehouse ribbon, select **Get data > Upload files**.

    :::image type="content" source="media/tutorial-0-introduction/lakehouse-upload.png" alt-text="Screenshot of uploading files to the lakehouse.":::

1. Select four of the sample CSV files that you downloaded earlier to upload them to your lakehouse. These files contain entity details about business objects in the Lakeshore Retail scenario.
    * *DimProducts.csv*
    * *DimStore.csv*
    * *FactSales.csv*
    * *Freezer.csv*

    >[!NOTE]
    > Don't upload *FreezerTelemetry.csv* to the lakehouse. You upload this file to Eventhouse in a later step.

1. Expand the **Files** folder in the Explorer to view your uploaded files. Next, load each file to a delta table.

    For each file, select **...** next to the file name, then **Load to Tables > New table**.

    :::image type="content" source="media/tutorial-0-introduction/lakehouse-new-table.png" alt-text="Screenshot of the load to tables dialogue in lakehouse." lightbox="media/tutorial-0-introduction/lakehouse-new-table.png":::

    Continue through the table creation dialogue, keeping the default settings.

The lakehouse looks like the following image when you're done. The default table names reflect the file names in all lowercase. 

:::image type="content" source="media/tutorial-0-introduction/lakehouse-tables.png" alt-text="Screenshot of the tables in the lakehouse." lightbox="media/tutorial-0-introduction/lakehouse-tables.png":::

::: zone pivot="semantic-model"
## Prepare the Power BI semantic model 

This section prepares you to generate an ontology from a semantic model. If you're not following the semantic model scenario and you want to build the ontology manually from OneLake, use the selector at the beginning of the article to change to the OneLake scenario.

1. From the lakehouse ribbon, select **New semantic model**.

    :::image type="content" source="media/tutorial-0-introduction/new-semantic-model.png" alt-text="Screenshot of creating a new semantic model." lightbox="media/tutorial-0-introduction/new-semantic-model.png":::

1. In the **New semantic model** pane, set the following details:
    * **Direct Lake semantic model name**: *RetailSalesModel*
    * **Workspace**: Your tutorial workspace is chosen by default.
    * **Select or deselect tables for the semantic model.** Select three tables:
        * *dimproducts*
        * *dimstore*
        * *factsales*

        >[!NOTE]
        > Don't select the *freezer* table. You create this entity manually in a later step.

    Select **Confirm**.

1. Open the semantic model in **Editing** mode when it's ready. From the ribbon, select **Manage relationships**.

    :::image type="content" source="media/tutorial-0-introduction/manage-relationships.png" alt-text="Screenshot of the semantic model ribbon." lightbox="media/tutorial-0-introduction/manage-relationships.png":::

1. In the **Manage relationships** pane, use the **+ New relationship** button to create two relationships with the following details.

    | From table | To table | Cardinality | Cross-filter direction | Make this relationship active? |
    |---|---|---|---|---|
    | *factsales*, select `StoreId` | *dimstore*, select `StoreId` | Many to one (*:1) | Single | Yes |
    | *factsales*, select `ProductId` | *dimproducts*, select `ProductId` | Many to one (*:1) | Single | Yes |

    The relationships look like this when you're done:

    :::image type="content" source="media/tutorial-0-introduction/manage-relationships-2.png" alt-text="Screenshot of the created relationships.":::

    Select **Close**.

Now the semantic model is ready to import into an ontology.

::: zone-end
::: zone pivot="onelake"
::: zone-end

## Prepare the eventhouse 

Follow these steps to upload the device streaming data file to a KQL database in Eventhouse.

1. In your Fabric workspace, use the **+ New item** button to create a new eventhouse called *TelemetryDataEH*. A default KQL database is created with the same name.
1. The eventhouse opens when it's ready. Open the KQL database by selecting its name in the explorer.

    :::image type="content" source="media/tutorial-0-introduction/eventhouse-database.png" alt-text="Screenshot of the KQL database in the eventhouse." lightbox="media/tutorial-0-introduction/eventhouse-database.png":::

1. Next, create a new table called *FreezerTelemetry* that uses the *FreezerTelemetry.csv* sample file as a source.

    In the menu ribbon, select **Get data > Local file**.

    :::image type="content" source="media/tutorial-0-introduction/eventhouse-get-data.png" alt-text="Screenshot of the data source options for the database." lightbox="media/tutorial-0-introduction/eventhouse-get-data.png":::

    Create a **New table** called *FreezerTelemetry* and browse for the *FreezerTelemetry.csv* file that you downloaded earlier.

    :::image type="content" source="media/tutorial-0-introduction/eventhouse-get-data-2.png" alt-text="Screenshot of uploading the csv file and creating the table." lightbox="media/tutorial-0-introduction/eventhouse-get-data-2.png":::

    Continue through the table creation dialogue, keeping the default settings.

When you're done, the KQL database shows the *FreezerTelemetry* table with data:

:::image type="content" source="media/tutorial-0-introduction/eventhouse-table.png" alt-text="Screenshot of the table in the database." lightbox="media/tutorial-0-introduction/eventhouse-table.png":::

## Next steps

Now your sample scenario is set up in Fabric. Next, create an ontology (preview) item by generating it automatically from a semantic model or building it manually from the OneLake data source.

Both options are available in the next step, [Create an ontology](tutorial-1-create-ontology.md).