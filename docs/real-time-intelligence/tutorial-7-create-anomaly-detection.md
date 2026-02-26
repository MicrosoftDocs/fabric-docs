---
title: Real-Time Intelligence tutorial part 7 - Detect anomalies on an Eventhouse table
description: Learn how to detect anomalies on your Eventhouse table in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.topic: tutorial
ms.date: 02/26/2026
ms.subservice: rti-core
ms.search.form: Get started
#customer intent: I want to learn how to detect anomalies on my Eventhouse table in Real-Time Intelligence.
---
# Real-Time Intelligence tutorial part 7: Detect anomalies on an Eventhouse table

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Real-Time Intelligence tutorial part 6: Create a Real-Time Dashboard](tutorial-6-create-dashboard.md).

Anomaly detection is a feature of Real-Time Intelligence that allows you to identify unusual patterns in your data. In this part of the tutorial, you learn how to create an **Anomaly detector** item on your workspace to detect anomalies in the number of empty docks at a station.

## Detect anomalies on an Eventhouse table

### Getting started

You can start anomaly detection in two ways:

1. From an **Eventhouse**:
    1. Select a database and the **table** or the **shortcut** you want to analyze.
    1. If you're in **Viewing** mode, toggle to **Editing** mode to enable the anomaly detection option.
    1. In the upper toolbar, select **Create Anomaly Detector**.

1. From **Real-Time hub**:
    1. From the left navigation pane, select **Real-Time hub**.
    1. Under **Streaming data** select the eventhouse table **TransformedData** you created in the previous tutorial. The table details page opens. Select **Detect anomalies** from the top menu.

        :::image type="content" source="media/tutorial/detect-anomalies.png" alt-text="Screenshot of eventhouse table details page and detect anomalies selected." lightbox="media/tutorial/detect-anomalies.png":::

### Configure anomaly detection

1. Enter **`BikeAnomaliesconfiguration`** as Name.
1. Under Save to, select **Create detector**.
1. Select the workspace in which you want to create the anomaly detector item, enter **`BikeAnomalies`**. Then select **Create**.
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

