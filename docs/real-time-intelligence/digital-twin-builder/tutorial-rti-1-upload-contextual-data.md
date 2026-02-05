---
title: 'Digital twin builder (preview) in Real-Time Intelligence tutorial part 1: Upload contextual data'
description: Prepare your environment for the tutorial scenario by uploading the static, contextual sample data to a lakehouse.
author: baanders
ms.author: baanders
ms.date: 11/10/2025
ms.topic: tutorial
---

# Digital twin builder (preview) in Real-Time Intelligence tutorial part 1: Upload contextual data

In this part of the tutorial, you set up the sample data lakehouse and upload the static sample data: a CSV file of bus stop data that provides contextual information about stop locations. 

## Create a lakehouse

1. Browse to the workspace in which you want to create your tutorial resources. You must create all resources in the same workspace.
1. Select **+ New item**.
1. In the **Filter by item type** search box, enter **Lakehouse**.
1. Select the lakehouse item.
1. Enter *TutorialLH* as the lakehouse name.
1. Select **Create**. When provisioning is complete, the lakehouse explorer page is shown. 

## Upload static contextual data

In this section, you upload a static file of bus stop data to the *TutorialLH* lakehouse. The information in this file provides context about the locations of the bus stops along the bus routes.

1. Download the *stops_data.csv* sample data file from the sample folder in GitHub: [digital-twin-builder/bus-scenario](https://aka.ms/dtb-samples-bus).
1. In the lakehouse explorer page in Fabric, select **Get data** from the menu ribbon and choose **Upload files**.

    :::image type="content" source="media/tutorial-rti/prep-get-data.png" alt-text="Screenshot of getting a local file for the Tutorial lakehouse.":::
    
1. Select the sample data file you downloaded and then select **Upload**. When the file is finished uploading, close the **Upload files** pane.
1. In the **Explorer** pane on the left, select **Files**. Hover over the file name and select the **...** that appears. Then select **Load to Tables** and **New table**.

    :::image type="content" source="media/tutorial-rti/prep-new-table.png" alt-text="Screenshot of Microsoft Fabric, selecting the Load to Tables option.":::
    
1. Leave the default table name of *stops_data* and the other default settings, and select **Load**.
1. When the table is created, review your new **stops_data** table and verify that it contains data.

    :::image type="content" source="media/tutorial-rti/prep-stops-data.png" alt-text="Screenshot of the stops_data table with data.":::

## Next step

> [!div class="nextstepaction"]
> [Tutorial part 2: Get and process streaming data](tutorial-rti-2-get-streaming-data.md)