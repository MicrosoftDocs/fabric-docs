---
title: Real-Time Intelligence tutorial part 7 - Detect anomalies on an Eventhouse table
description: Learn how to detect anomalies on your Eventhouse table in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: spelluru
author: spelluru
ms.topic: tutorial
ms.custom:
ms.date: 11/19/2024
ms.subservice: rti-core
ms.search.form: Get started
#customer intent: I want to learn how to detect anomalies on my Eventhouse table in Real-Time Intelligence.
---
# Real-Time Intelligence tutorial part 7: Detect anomalies on an Eventhouse table

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Tutorial part 6: Set an alert on an eventstream](tutorial-6-set-alert.md).

Anomaly detection is a feature of Real-Time Intelligence that allows you to identify unusual patterns in your data. In this part of the tutorial, you learn how to create an 'Anomaly detector' item on your workspace to detect anomalies in the number of empty docks at a station.

## Detect anomalies on an Eventhouse table

1. From the left navigation bar, select **Real-Time** to open the *Real-Time hub*.
2. Under **All data streams** select the eventhouse table **TransformedData** you created in the previous tutorial. The table details page opens. Select **Detect anomalies** from the top menu.

    ![Screenshot of eventhouse table details page and detect anomalies selected.](media/tutorial/detect-anomalies.png)

3. Enter **`BikeAnomaliesconfiguration`** as Name
4. Under Save to, select the workspace in which you want to create the anomaly detector item, enter a name such as **`BikeAnomalies`**. Then select **Create**.
5. In the *Select attributes* section, choose the following options:

    | Field | Value |
    | --- | --- |
    | Value to watch | No_Empty_Docks |
    | Group by | Street|
    | Timestamp | Timestamp |  

    ![Screenshot of anomaly configuration pane](media/tutorial/anomaly-configuration.png)

6. Select **Run analysis**.

> [!IMPORTANT]
> Analysis typically takes up to 4 minutes depending on your data size and can run for up to 30 minutes. You can navigate away from the page and check back in when the analysis is complete.

> [!NOTE]
> Ensure your Eventhouse table contains sufficient historical data to improve model recommendations and anomaly detection accuracy. For example, datasets with one data point per day require a few months of data, while datasets with one data point per second might only need a few days.

7. When analysis is complete, anomalies along with tabular data are displayed on the right.

    ![Screenshot of completed anomaly detection](media/tutorial/anomalies-detected.png)

> [!NOTE]
> Play around with the **Detection model** under **Customize detection** section and Timestamp above the **Detector results** pane. More data might increase anomaly detection accuracy.

8. Select **Save**.

## Related content

For more information about tasks performed in this tutorial, see:
* [Anomaly detection in Real-Time Intelligence (Preview)](anomaly-detection.md)

## Next step

> [!div class="nextstepaction"]
> [Tutorial part 8: Create a Map](tutorial-8-create-map.md)

