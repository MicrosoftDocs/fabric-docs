---
title: Real-Time Intelligence Tutorial Part 7 - Detect Anomalies on an Eventhouse Table
description: Learn how to detect anomalies on your Eventhouse table in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.topic: tutorial
ms.date: 05/20/2026
ms.subservice: rti-core
ms.search.form: Get started
#customer intent: I want to learn how to detect anomalies on my Eventhouse table in Real-Time Intelligence.
---

# Real-Time Intelligence tutorial part 7: Detect anomalies on an Eventhouse table

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Real-Time Intelligence tutorial part 6: Create a Real-Time Dashboard](tutorial-6-create-dashboard.md).

In this part of the tutorial, you build a real-time data workflow that detects anomalies in streaming data. You use an Eventhouse table to analyze time series data and identify unusual patterns.

## Create an anomaly detector

Open the Eventhouse table created in the previous tutorial.

1. From the left navigation pane, select **Real-Time**.

    :::image type="content" source="media/tutorial/anomaly-detection/real-time-button.png" alt-text="Screenshot of the Real-Time button in the left navigation pane." lightbox="media/tutorial/anomaly-detection/real-time-button.png":::

1. Under **Streaming data**, select the **TransformedData** table.

    :::image type="content" source="media/tutorial/anomaly-detection/select-table.png" alt-text="Screenshot of selecting the TransformedData table." lightbox="media/tutorial/anomaly-detection/select-table.png":::

1. On the table details page, select **Detect anomalies** from the toolbar.

    :::image type="content" source="media/tutorial/anomaly-detection/table-details-page.png" alt-text="Screenshot of selecting Detect anomalies from the toolbar." lightbox="media/tutorial/anomaly-detection/table-details-page.png":::

Create a detector to analyze the data for anomalies.

1. In the **New Anomaly detector** pane:
   1. Enter a name for the detector.
   1. Select your Fabric workspace.
   1. Select **Create**.

:::image type="content" source="media/tutorial/anomaly-detection/new-anomaly-detector.png" alt-text="Screenshot of the New Anomaly detector pane." lightbox="media/tutorial/anomaly-detection/new-anomaly-detector.png":::

## Configure anomaly detection

Configure the attributes used to detect anomalies.

1. In the **Edit configuration** section, set the following values:

    | Field | Value |
    |---|---|
    | Value to watch | No_Bikes |
    | Group by | Street |
    | Timestamp | Timestamp |

    :::image type="content" source="media/tutorial/anomaly-detection/configure.png" alt-text="Screenshot of the anomaly detection configuration popup." lightbox="media/tutorial/anomaly-detection/configure.png":::

1. Select **Save**.

## Choose an anomaly detection model

1. In the **Find models** section, select **Analyze my data** to find the best anomaly detection model for your data.

    :::image type="content" source="media/tutorial/anomaly-detection/analyze.png" alt-text="Screenshot of the Find models section." lightbox="media/tutorial/anomaly-detection/analyze.png":::

1. Review the recommended models and select the one that best fits your needs. For this tutorial, select the recommended **Local Pattern Detector** model.

    :::image type="content" source="media/tutorial/anomaly-detection/models.png" alt-text="Screenshot of selecting the Local Pattern Detector model." lightbox="media/tutorial/anomaly-detection/models.png":::

1. Select **Save**.

## Review anomaly results

After the analysis completes, review the detected anomalies.

1. View the anomaly results in the **Detector results** pane.
1. Inspect the chart and tabular output to identify unusual patterns.

    :::image type="content" source="media/tutorial/anomaly-detection/results.png" alt-text="Screenshot of completed anomaly detection." lightbox="media/tutorial/anomaly-detection/results.png":::

## Next step

> [!div class="nextstepaction"]
> [Real-Time Intelligence tutorial part 8: Create a map using geospatial data](tutorial-8-create-map.md)
``