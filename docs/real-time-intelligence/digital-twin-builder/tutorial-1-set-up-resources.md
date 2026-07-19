---
title: 'Digital Twin Builder (Preview) Tutorial Part 1: Set Up Resources'
description: Prepare your environment for the tutorial scenario and create a digital twin builder item. Part 1 of the digital twin builder (preview) tutorial.
ms.date: 06/14/2026
ms.topic: tutorial
#customer intent: As a Fabric user, I want to set up sample data and create a digital twin builder item so that I can learn how to model digital twins.
---

# Digital twin builder (preview) tutorial part 1: Set up resources

This tutorial is Part 1 of a series that walks you through the basics of digital twin builder (preview) in Microsoft Fabric. Digital twin builder is a tool for creating digital representations of real-world assets and their relationships. In this part, you prepare your environment by uploading sample data to a lakehouse and creating a digital twin builder item.

In this tutorial, you:

> [!div class="checklist"]
> - Download and upload sample data to a Fabric lakehouse
> - Load CSV files into lakehouse tables
> - Create a digital twin builder item in your workspace

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Prerequisites

- A [Microsoft Fabric subscription](/fabric/fundamentals/fabric-trial) or free trial
- A Fabric workspace with contributor or higher permissions

## Upload sample data to a lakehouse

1. Download all the `.csv` files from the sample folder in GitHub: [digital-twin-builder/contoso-energy](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/real-time-intelligence/digital-twin-builder/contoso-energy).
1. Go to [Microsoft Fabric](https://powerbi.com/home?experience=fabric-developer) and open your workspace.
1. Select **+ New item**:

    :::image type="content" source="media/tutorial/prep-new-item.png" alt-text="Screenshot of Microsoft Fabric, New item.":::
1. Scroll down or search for **Lakehouse** and select that item. Name your lakehouse *GettingStartedRawData* and select **Create**. Your lakehouse opens when it's done.
1. In the **Explorer** pane on the left, select the more options menu (**...**) next to **Files**. Select **Upload** > **Upload Files**.

    :::image type="content" source="media/tutorial/prep-lakehouse-upload.png" alt-text="Screenshot of Microsoft Fabric, upload files to the lakehouse.":::
1. Select the sample data files you downloaded and then select **Upload**. When the files are finished uploading, close the **Upload files** pane.

    :::image type="content" source="media/tutorial/prep-select-file-upload.png" alt-text="Screenshot of Microsoft Fabric, files uploaded." lightbox="media/tutorial/prep-select-file-upload.png":::
1. In the **Explorer** pane on the left, select **Files** to see the files in the lakehouse. For each file, complete these steps:
    1. Hover over the file name and select the more options menu (**...**). Select **Load to Tables** > **New table**.

        :::image type="content" source="media/tutorial/prep-load-to-tables.png" alt-text="Screenshot of Microsoft Fabric, selecting the Load to Tables option.":::
    1. In the new table settings that appear, leave the default settings. Select **Load**.

        :::image type="content" source="media/tutorial/prep-configure-load.png" alt-text="Screenshot of Microsoft Fabric, configuring the load.":::
    1. Wait for the table to finish loading before you start loading the next one.

You should now see five tables in the **Explorer** pane of your lakehouse, under **Tables**. Open them to verify they contain data.

:::image type="content" source="media/tutorial/prep-lakehouse-tables.png" alt-text="Screenshot of Microsoft Fabric, sample data tables.":::

You now have sample data available in your *GettingStartedRawData* lakehouse. You use the data in this lakehouse throughout this tutorial.

<!--## Create new digital twin builder item in Fabric (title in include)-->
[!INCLUDE [Create digital twin builder](../includes/create-digital-twin-builder.md)]

In the next step of this tutorial, you use the semantic canvas to define a domain ontology.

## Next step

> [!div class="nextstepaction"]
> [Tutorial part 2: Add entity types and map data](tutorial-2-add-entities-map-data.md)