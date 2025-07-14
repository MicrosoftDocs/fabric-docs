---
title: 'Digital twin builder (preview) tutorial: Set up resources'
description: Prepare your environment for the tutorial scenario and create a digital twin builder item.
author: baanders
ms.author: baanders
ms.date: 05/01/2025
ms.topic: tutorial
---

# Digital twin builder (preview) tutorial part 1: Set up resources

Prepare for the tutorial by uploading the sample data to a lakehouse in your Fabric workspace. Then, create a digital twin builder (preview) item in that workspace.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Upload sample data to a lakehouse

1. Download all the *.csv* files from the sample folder in GitHub: [digital-twin-builder/contoso-energy](https://aka.ms/dtb-samples-energy).
1. Go to [Microsoft Fabric](https://powerbi.com/home?experience=fabric-developer) and open your workspace.
1. Select **+ New item**:

    :::image type="content" source="media/tutorial/prep-new-item.png" alt-text="Screenshot of Microsoft Fabric, New item.":::
1. Scroll down or search for **Lakehouse** and select that item. Name your lakehouse *GettingStartedRawData* and select **Create**. Your lakehouse opens when it's done.
1. In the **Explorer** pane on the left, select **...** next to **Files**. Select **Upload** and **Upload Files**.

    :::image type="content" source="media/tutorial/prep-lakehouse-upload.png" alt-text="Screenshot of Microsoft Fabric, upload files to the lakehouse.":::
1. Select the sample data files you downloaded and then select **Upload**. When the files are finished uploading, close the **Upload files** pane.

    :::image type="content" source="media/tutorial/prep-select-file-upload.png" alt-text="Screenshot of Microsoft Fabric, files uploaded." lightbox="media/tutorial/prep-select-file-upload.png":::
1. In the **Explorer** pane on the left, select **Files** to see the files populated in the lakehouse. For each of the files, do the following actions:
    1. Hover over the file name and select **...**. From that menu, select **Load to Tables** and **New table**.

        :::image type="content" source="media/tutorial/prep-load-to-tables.png" alt-text="Screenshot of Microsoft Fabric, selecting the Load to Tables option.":::
    1. In the new table settings that appear, leave the default settings. Select **Load**.

        :::image type="content" source="media/tutorial/prep-configure-load.png" alt-text="Screenshot of Microsoft Fabric, configuring the load.":::
    1. Wait for the table to finish loading before you start the next table.

You should now see five tables in the **Explorer** pane of your lakehouse, under **Tables**. Open them to verify that they contain data.

:::image type="content" source="media/tutorial/prep-lakehouse-tables.png" alt-text="Screenshot of Microsoft Fabric, sample data tables.":::

You now have sample data available in your *GettingStartedRawData* lakehouse. You use the data in this lakehouse throughout this tutorial.

## Create new digital twin builder item in Fabric

>[!NOTE]
> Recall from the [tutorial prerequisites](tutorial-0-introduction.md#prerequisites) that digital twin builder (preview) must be enabled on your Fabric tenant.

1. Navigate to your Fabric workspace. 
1. Select **New item**.
1. Search for the *Digital Twin Builder (preview)* item, and select it.

    :::image type="content" source="media/tutorial/new-digital-twin-builder.png" alt-text="Screenshot of Digital Twin Builder item.":::
1. Name your item *Contoso_Energy* and select **Create**. 

    >[!TIP]
    >Digital twin builder names can include numbers, letters, and underscores (no spaces or dashes).

1. Wait for your digital twin builder item to be created. Once your digital twin builder item is ready, it opens to the semantic canvas.

In the semantic canvas, you define a domain ontology in the next tutorial section.

## Next step

> [!div class="nextstepaction"]
> [Tutorial part 2: Add entity types and map data](tutorial-2-add-entities-map-data.md)