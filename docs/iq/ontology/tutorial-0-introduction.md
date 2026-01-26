---
title: "Tutorial: Introduction and environment setup"
description: Get started with ontology (preview) with this tutorial featuring a sample retail scenario.
author: baanders
ms.author: baanders
ms.reviewer: baanders
ms.date: 12/03/2025
ms.topic: tutorial
zone_pivot_group_filename: iq/ontology/zone-pivot-groups.json
zone_pivot_groups: create-ontology-scenario
ms.search.form: Ontology Tutorial
---

# Ontology (preview) tutorial part 0: Introduction and environment setup

This tutorial shows how to create your first ontology (preview) in Microsoft Fabric, either by generating it from an existing **Power BI semantic model** or by **building it from your OneLake data**. Then, you enrich the ontology with live operational data and explore it with both graph preview and natural-language (NL) queries through Fabric data agent.  

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

The example scenario for this tutorial is a fictional company called Lakeshore Retail. Lakeshore is a retail ice cream seller that keeps data on sales and freezer streaming data. In the tutorial, you generate entity types like *Store*, *Products*, and *SaleEvent*. You bind streaming data like *freezer temperature* from Eventhouse, and answer questions like: "What is the top product by revenue across all stores?"

[!INCLUDE [tutorial choice note](includes/choose-tutorial-method.md)]

## Prerequisites

::: zone pivot="semantic-model"
* A [workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity). Use this workspace for all resources you create in the tutorial.
* Required settings for ontology (preview) and data agent must be enabled on your tenant. A [Fabric administrator](../../admin/roles.md) should enable the following settings in the [tenant settings](../../admin/tenant-settings-index.md) page of the [admin portal](../../admin/admin-center.md):
    * *Enable Ontology item (preview)*
    * *User can create Graph (preview)*
    * *Allow XMLA endpoints and Analyze in Excel with on-premises semantic models* <!--Only required for semantic model pivot-->
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

First, create a new lakehouse called *OntologyDataLH* in your Fabric workspace.

Then, upload four sample CSV files to your lakehouse and load each one to a new delta table. These files contain entity details about business objects in the Lakeshore Retail scenario.
* *DimStore.csv*
* *DimProducts.csv*
* *FactSales.csv*
* *Freezer.csv*

>[!NOTE]
> Don't upload *FreezerTelemetry.csv* to the lakehouse. You upload this file to Eventhouse in a later step.

For detailed instructions on loading files to lakehouse tables, see the first three sections of [CSV file upload to Delta table for Power BI reporting](../../data-engineering/get-started-csv-upload.md).

The default table names reflect the file names in all lowercase. The lakehouse looks like this when you're done:

:::image type="content" source="media/tutorial-0-introduction/lakehouse-tables.png" alt-text="Screenshot of the tables in the lakehouse.":::

::: zone pivot="semantic-model"
## Prepare the Power BI semantic model 

This section prepares you to generate an ontology from a semantic model. If you're not following the semantic model scenario and you want to build the ontology manually from OneLake, use the selector at the beginning of the article to change to the OneLake scenario.

1. From the lakehouse ribbon, select **New semantic model**.

    :::image type="content" source="media/tutorial-0-introduction/new-semantic-model.png" alt-text="Screenshot of creating a new semantic model.":::

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

1. Create a new eventhouse called *TelemetryDataEH* in your Fabric workspace. A default KQL database is created with the same name. For detailed instructions, see [Create an eventhouse](../../real-time-intelligence/create-eventhouse.md).
1. The eventhouse opens when it's ready. Open the KQL database by selecting its name.
1. Create a new table called *FreezerTelemetry* that uses the *FreezerTelemetry.csv* sample file as a source. For detailed instructions, see [Get data from file](../../real-time-intelligence/get-data-local-file.md).

The KQL database shows the *FreezerTelemetry* table when you're done:

:::image type="content" source="media/tutorial-0-introduction/eventhouse-table.png" alt-text="Screenshot of the table in the database.":::

## Next steps

Now your sample scenario is set up in Fabric. Next, create an ontology (preview) item by generating it automatically from a semantic model or building it manually from the OneLake data source.

Both options are available in the next step, [Create an ontology](tutorial-1-create-ontology.md).