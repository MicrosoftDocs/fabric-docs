---
title: Import and Export Transformation Steps
description: Learn how to export transformation steps from a query and import them into another query to reuse the same data preparation workflow.
ms.date: 07/08/2026
ms.topic: how-to
#customer intent: As a user, I want to reuse transformation steps across queries so that I don't have to recreate the same data preparation workflow.
---

# Import and export transformation steps

Use the **Export** and **Import** commands to reuse transformation steps across multiple queries. Exporting a query creates a `.bck` file that contains its transformation steps. Then import the file into another query.

Reusing transformation steps helps maintain consistency across similar datasets and reduces the time required to recreate the same data preparation workflow.

[!INCLUDE [Fabric feature-preview-note](../../../includes/feature-preview-note.md)]

Find the **Import** and **Export** commands on the **Transform** tab.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-import-export/import-export-command.png" alt-text="Screenshot highlighting the Import and Export commands on the Transform tab and the Performed Steps pane." lightbox="../media/infobridge-transformations/infobridge-how-to-import-export/import-export-command.png":::

## Export transformation steps

The following example shows how to export transformation steps from a query.

1. Open the query that contains the transformation steps that you want to reuse.

1. Verify that the **Performed Steps** pane lists the required transformation steps.

1. On the **Transform** tab, select **Export**.

1. Save the generated `.bck` file to your computer.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-import-export/export-complete.png" alt-text="Screenshot showing the exported .bck file after selecting Export." lightbox="../media/infobridge-transformations/infobridge-how-to-import-export/export-complete.png":::

The exported `.bck` file contains all transformation steps from the selected query.

## Import transformation steps

The following example shows how to import transformation steps into another query.

1. Open the target query.

1. On the **Transform** tab, select **Import**.

1. In the **Import Steps** dialog, browse to or drag and drop the exported `.bck` file.

    :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-import-export/import-steps-dialog.png" alt-text="Screenshot showing the Import Steps dialog for selecting or dragging a .bck file." lightbox="../media/infobridge-transformations/infobridge-how-to-import-export/import-steps-dialog.png":::

1. After the file uploads successfully, select **Upload**.

    :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-import-export/import-upload.png" alt-text="Screenshot showing the uploaded .bck file ready to be imported." lightbox="../media/infobridge-transformations/infobridge-how-to-import-export/import-upload.png":::

1. After the import completes, the imported transformation steps appear in the **Performed Steps** pane of the target query.

    :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-import-export/imported-steps.png" alt-text="Screenshot showing imported transformation steps displayed in the Performed Steps pane." lightbox="../media/infobridge-transformations/infobridge-how-to-import-export/imported-steps.png":::

Continue transforming the query, or write the transformed data to a destination.
