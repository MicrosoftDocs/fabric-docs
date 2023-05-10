---
title: Data warehouse tutorial - build a report
description: In this fourth tutorial step, learn how to build a report with the data you ingested into your warehouse in the last step.
ms.reviewer: wiassaf
ms.author: scbradl
author: bradleyschacht
ms.topic: tutorial
ms.date: 5/23/2023
---

# Tutorial: Build a report

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Learn how to build a report with the data you ingested into your warehouse in the last step.

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Build a report

1. Select **Data Warehouse Tutorial** in the left-hand navigation menu to return to the workspace artifact view.

   :::image type="content" source="media\tutorial-build-report\tutorial-in-navigation.png" alt-text="Screenshot of the navigation menu, showing where to select Data Warehouse Tutorial.":::

1. From the artifact list, select **WideWorldImporters** with the type of **Dataset (default)**.

   :::image type="content" source="media\tutorial-build-report\select-artifact-list.png" alt-text="Screenshot of the WorldWideImporters option in the list of artifacts.":::

1. In the **Visualize this data** section, select **Create a report** > **Auto-create**. A report is generated from the `dimension_customer` table that was loaded in the previous section.

   :::image type="content" source="media\tutorial-build-report\visualize-create-report.png" alt-text="Screenshot of the Visualize this data section, showing where to select Auto-create from the Create a report menu.":::

1. A report similar to the following image is generated.

   :::image type="content" source="media\tutorial-build-report\quick-summary-report-example.png" alt-text="Screenshot of a Quick summary page that shows four different bar charts as an example of an auto-created report."lightbox="media\tutorial-build-report\quick-summary-report-example.png":::

1. From the ribbon, select **Save.**

1. Enter `Customer Quick Summary` in the name box.

1. Select **Save**.

   :::image type="content" source="media\tutorial-build-report\save-report-dialog.png" alt-text="Screenshot of the Save your report dialog with the report name Customer Quick Summary entered.":::

## Next steps

> [!div class="nextstepaction"]
> [Tutorial: Create tables in a data warehouse](tutorial-create-tables.md)