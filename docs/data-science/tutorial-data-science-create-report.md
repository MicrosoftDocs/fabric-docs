---
title: Data science tutorial - create a Power BI report to visualize predictions
description: In this sixth module, learn how to get set up to create reports and how to create various visuals to analyze data.
ms.reviewer: mopeakande
ms.author: mopeakande
author: msakande
ms.topic: tutorial
ms.date: 5/4/2023
---

# Module 6: Create a Power BI report to visualize predictions

In this module, we use the Microsoft Fabric DirectLake feature, which enables direct connectivity from Power BI datasets to lakehouse tables in direct query mode with automatic data refresh. For the following steps, use the prediction data produced in [Module 5: Perform batch scoring and save predictions to a lakehouse](tutorial-data-science-batch-scoring.md).

## Prepare for creating reports

1. Navigate to the default lakehouse artifact in the workspace that you used as part of the previous modules and open the lakehouse UI.

1. Select **New Power BI dataset** on the top ribbon and select **nyctaxi_pred**, then select **Continue** to create a new Power BI dataset linked to the predictions data you produced in module 5.

   :::image type="content" source="media\tutorial-data-science-create-report\new-power-bi-dataset.png" alt-text="Screenshot of the lakehouse UI home, showing where to select the New Power BI dataset option on the ribbon." lightbox="media\tutorial-data-science-create-report\new-power-bi-dataset.png":::

   :::image type="content" source="media\tutorial-data-science-create-report\select-predictions-data.png" alt-text="Screenshot of the New Power BI dataset dialog box, showing where to select the correct data and select Continue." lightbox="media\tutorial-data-science-create-report\select-predictions-data.png":::

1. Once the UI for the new dataset loads, rename the dataset by clicking on the dropdown at top left corner of the dataset page and entering the more user-friendly name ***nyctaxi_predictions***. Click outside the drop down to apply the name change.

   :::image type="content" source="media\tutorial-data-science-create-report\rename-dataset.png" alt-text="" lightbox="media\tutorial-data-science-create-report\rename-dataset.png":::

1. On the dataset pane in the section titled **Visualize this data**, select **Create from scratch** and then select **Start from Scratch** to open the Power BI report authoring page.

   :::image type="content" source="media\tutorial-data-science-create-report\visualize-this-data.png" alt-text="Screenshot of the dataset pane, showing where to select Create from scratch and Start from scratch." lightbox="media\tutorial-data-science-create-report\visualize-this-data.png":::

You can now create various visuals to generate insights from the prediction dataset.

## Sample visuals to analyze predictedTripDuration

1. Create a Slicer visualization for pickupDate.

   - Select the slicer option from the visualizations pane and select ***pickupDate*** from the data pane and drop it on the created slicer visualization field of the date slider visual.

      :::image type="content" source="media\tutorial-data-science-create-report\select-slicer-option.png" alt-text="Screenshot of the visualizations pane and the data pane, showing where to select the slicer option and pickupDate data." lightbox="media\tutorial-data-science-create-report\select-slicer-option.png":::

1. Visualize Average tripDuration and predictedTripDuration by timeBins using a clustered column chart.

   - Add a clustered column chart, add ***timeBins*** to the X-axis, ***tripDuration*** and ***predictedTripDuration*** to the Y-axis and change the aggregation method to Average.

      :::image type="content" source="media\tutorial-data-science-create-report\cluster-column-chart.png" alt-text="Screenshot of the Visualizations pane and Data pane, showing where to select data for the X axis and Y axis for a clustered column chart." lightbox="media\tutorial-data-science-create-report\cluster-column-chart.png":::

1. Visualize Average tripDuration and predictedTripDuration by weekDayName.

   - Add an area chart visual and add ***weekDayName*** onto X-axis, ***tripDuration*** to Y-axis and ***predictedTripDuration*** to secondary Y-axis. Switch aggregation method to Average for both Y-axes.

      :::image type="content" source="media\tutorial-data-science-create-report\add-area-chart-visual.png" alt-text="Screenshot of the Visualizations pane and Data pane, showing where to add data to an area chart visual." lightbox="media\tutorial-data-science-create-report\add-area-chart-visual.png":::

1. Add Card visuals for overall predictedTripDuration and tripDuration.

   - Add a Card Visual and add predictedTripDuration to the fields and switch aggregation method to Average.

   - Add a Card Visual and add TripDuration to the fields and switch aggregation method to Average.

      :::image type="content" source="media\tutorial-data-science-create-report\two-card-visuals.png" alt-text="Screenshot two Visualizations panes, showing where to add to the fields. The calculations are shown below the panes." lightbox="media\tutorial-data-science-create-report\two-card-visuals.png":::

1. Visualize Average tripDuration and predictedTripDuration by pickupDate using line chart.

   - Add a line chart visual and add ***pickupDate*** onto X-axis, ***tripDuration*** and ***predictedTripDuration*** to Y-axis and switch aggregation method to Average for both fields.

      :::image type="content" source="media\tutorial-data-science-create-report\add-line-chart.png" alt-text="Screenshot of the Visualizations pane beside the resulting line chart." lightbox="media\tutorial-data-science-create-report\add-line-chart.png":::

1. Visualize Average predictedTripDuration using a map visual.

   - Add a map chart visual, and add ***startLat*** to the **Latitude** field and ***startLon*** to the **Longitude** field.

   - Add ***predictedTripDuration*** to bubble size field and switch the aggregation method of predictedTripDuration to Average.

      :::image type="content" source="media\tutorial-data-science-create-report\create-map-visual.png" alt-text="Screenshot of Visualizations pane beside the resulting map visual." lightbox="media\tutorial-data-science-create-report\create-map-visual.png":::

Once all the visuals are added, you can reshape the visuals and realign the layout based on your preferences.

:::image type="content" source="media\tutorial-data-science-create-report\reshape-realign-visuals.png" alt-text="Screenshot of all four visuals arranged together." lightbox="media\tutorial-data-science-create-report\reshape-realign-visuals.png":::

## Next steps

- [How to use end-to-end AI samples in Microsoft Fabric](use-ai-samples.md)
