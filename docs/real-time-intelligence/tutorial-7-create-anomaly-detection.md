---
title: Real-Time Intelligence tutorial part 7 - Detect anomalies on an Eventhouse table
description: Learn how to detect anomalies on your Eventhouse table in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.topic: tutorial
ms.date: 03/05/2026
ms.subservice: rti-core
ms.search.form: Get started
#customer intent: I want to learn how to detect anomalies on my Eventhouse table in Real-Time Intelligence.
---
# Real-Time Intelligence tutorial part 7: Detect anomalies on an Eventhouse table

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Real-Time Intelligence tutorial part 6: Create a Real-Time Dashboard](tutorial-6-create-dashboard.md).

Anomaly detection is a feature of Real-Time Intelligence that allows you to identify unusual patterns in your data. In this part of the tutorial, you learn how to create an **Anomaly detector** item on your workspace to detect anomalies in the number of empty docks at a station.

## Getting started

You can start anomaly detection in **three** ways:

## [From an Eventhouse table](#tab/eventhouse)

1. Select a database and the **table** or the **shortcut** you want to analyze.

1. In the upper toolbar, select **Create Anomaly Detector** or select the **Anomaly Detector** option from the ellipsis (⋯) in the database tree.

:::image type="content" source="media/anomaly-detection/eventhouse-bike-anomaly-detector.png" alt-text="Screenshot of the Anomaly Detector option in the Eventhouse database tree and in the upper toolbar." lightbox="media/anomaly-detection/eventhouse-bike-anomaly-detector.png":::

## [From Real-Time hub](#tab/real-time-hub)

1. Select **Real-Time hub** in the left navigation pane.

    :::image type="content" source="media/anomaly-detection/real-time-hub.png" alt-text="Screenshot of the Real-Time hub button in the left navigation pane.":::

1. Find the table you want to analyze for anomalies and do **either** of the following steps:
    - Select the ellipsis (⋯) to open the table's ribbon menu, and select **Anomaly detection**.

        :::image type="content" source="media/anomaly-detection/detect-dropdown.png" alt-text="Screenshot of the Real-Time hub with a table selected for anomaly detection.":::

    - Select the table to open the details page. In the upper toolbar, select **Anomaly detection**.

        :::image type="content" source="media/anomaly-detection/detect-details-page.png" alt-text="Screenshot of the detect anomalies option in the details page.":::
1. On the **Anomaly detection** page, for **Save to**, select the drop-down list, and then select **Create detector**. 

    :::image type="content" source="media/anomaly-detection/real-time-hub-create-detector.png" alt-text="Screenshot of the Anomaly Detector page in Real-Time hub.":::
1. On the **Create anomaly detector** page, select your Fabric **workspace**, enter a **name** for the anomaly detector, and then select **Create**. 

    :::image type="content" source="media/anomaly-detection/real-time-hub-create-anomaly-detector-dialog.png" alt-text="Screenshot of the Create Anomaly Detector page in Real-Time hub.":::     

## [From the Create button](#tab/create)

1. In the Fabric home page, select the ellipsis (⋯) icon and then the **Create** option.

    :::image type="content" source="media/anomaly-detection/create-button.png" alt-text="Screenshot of the Create button in the left navigation pane.":::

1. In the **Create** pane, select **Anomaly detection** under the **Real-Time Intelligence** section.

    :::image type="content" source="media/anomaly-detection/create-anomaly-detection.png" alt-text="Screenshot of the Create pane with Anomaly detection selected.":::

1. In the **Anomaly detection** configuration pane, enter **`BikeAnomaliesconfiguration`** as Name and select the **Data source** you want to analyze. 

    :::image type="content" source="media/anomaly-detection/add-source.png" alt-text="Screenshot of the Anomaly detection configuration pane with Data source option highlighted.":::

1. Select the workspace in which you want to create the anomaly detector item, enter **`BikeAnomalies`**. Then select **Create**.

1. In the **Select source** pane, choose the Eventhouse and table you want to analyze, and then select **Add**.

    :::image type="content" source="media/anomaly-detection/select-source.png" alt-text="Screenshot of the Select source pane with an Eventhouse and table selected.":::

----

## Configure anomaly detection

1. In the *Select attributes* section, choose the following options:

    | Field | Value |
    | --- | --- |
    | Value to watch | No_Empty_Docks |
    | Group by | Street|
    | Timestamp | Timestamp |  

    :::image type="content" source="media/tutorial/anomaly-configuration.png" alt-text="Screenshot of anomaly configuration pane." lightbox="media/tutorial/anomaly-configuration.png":::

1. Select **Run analysis**.

    > [!IMPORTANT]
    > Analysis typically takes up to 4 minutes depending on your data size and can run for up to 30 minutes. You can navigate away from the page and check back in when the analysis is complete.
    
    > [!NOTE]
    > Ensure your Eventhouse table contains sufficient historical data to improve model recommendations and anomaly detection accuracy. For example, datasets with one data point per day require a few months of data, while datasets with one data point per second might only need a few days.
    
1. When analysis is complete, anomalies along with tabular data are displayed on the right.

    :::image type="content" source="media/tutorial/anomalies-detected.png" alt-text="Screenshot of completed anomaly detection." lightbox="media/tutorial/anomalies-detected.png":::

    > [!NOTE]
    > Play around with the **Detection model** under **Customize detection** section and Timestamp above the **Detector results** pane. More data might increase anomaly detection accuracy.
    
1. Select **Save**.

## Related content

For more information about tasks performed in this tutorial, see:
* [Anomaly detection in Real-Time Intelligence (Preview)](anomaly-detection.md)

## Next step

> [!div class="nextstepaction"]
> [Real-Time Intelligence tutorial part 8: Create a map using geospatial data](tutorial-8-create-map.md)

