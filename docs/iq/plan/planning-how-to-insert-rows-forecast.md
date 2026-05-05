---
title: Insert forecast rows in a Planning sheet
description: Learn how to insert and configure forecast rows in a Planning sheet. 
ms.date: 05/05/2026
ms.topic: how-to
#customer intent: As a user, I want to understand how to insert and configure forecast rows.
---

# Insert forecast rows

Create row-level forecasts to predict outcomes at a detailed level, such as by region or product line. After you create a forecast measure, you can generate forecasts at the row level by inserting a forecast row.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

This article explains how to create and configure forecast rows.

> [!NOTE]
>The **Forecast** row option is only available when the report contains forecast measures. For more information, see [Forecast measures](planning-forecasting/planning-how-to-build-forecasts.md).

## Insert a forecast row

1. Select the row where you want to create the forecast.
1. Go to **Planning** > **Insert Row** > **Forecast**, or use the **row gripper** > **Insert** > **Forecast Row**.

    :::image type="content" source="media/planning-how-to-insert-rows-forecast/insert-forecast-row-planning-tab.png" alt-text="Screenshot of inserting a forecast row using planning tab." :::

    :::image type="content" source="media/planning-how-to-insert-rows-forecast/insert-forecast-row-row-gripper.png" alt-text="Screenshot of inserting a forecast row using row gripper.":::

1. In the Forecast configuration window, enter a row name and [configure](#configure-forecast-row-properties) the required options.
1. Select **Save** to generate the forecast row.

## Configure forecast row properties

The following options can be configured while creating a forecast row:

* **Row name**: Specifies the label for the forecast row.
* **Insert As**: Choose one of the following options.
    * **Single Row**: Inserts a single forecast row.
    * **Templated Row**: Replicates the forecast row across all hierarchy levels.
    
    :::image type="content" source="media/planning-how-to-insert-rows-forecast/insert-as.png" alt-text="Screenshot of configuring row name and insert as option.":::

* **Closed period**: Populate past or closed periods by choosing one of the following options.
    * Referencing another row: Select **Linked Row** in **Closed Period** and choose the row you want to refer.
    
      :::image type="content" source="media/planning-how-to-insert-rows-forecast/linked-row.png" alt-text="Screenshot of configuring closed period through linked row option.":::
    
    * Defining a formula: Select **Formula** in **Closed Period** and define the formula.
    
      :::image type="content" source="media/planning-how-to-insert-rows-forecast/formula.png" alt-text="Screenshot of configuring closed period through formula option.":::

* **Open period**: Populate future periods using one of the following options.
    * **Linked row**: Reference values from another row.
    
      :::image type="content" source="media/planning-how-to-insert-rows-forecast/open-period.png" alt-text="Screenshot of options available in open period":::

    * **Formula**: Define a formula for forecast values.
    * **Data input**: Manually enter forecast values with optional default values using a **static** value, another **row**, or a **formula**.
    
      :::image type="content" source="media/planning-how-to-insert-rows-forecast/open-period-data-input.png" alt-text="Screenshot of options available in data input type in open period.":::

> [!NOTE]
> Select the **Templated** option when the row categories repeat across all levels of the hierarchy.

## Configure forecast range

The forecast time frame is configured when you [create a forecast measure](planning-forecasting/planning-how-to-build-forecasts.md). After configuring forecast row properties, select **Next** to define the forecast time range in **Target Periods**.

> [!NOTE]
> The **Next** option to configure the period range is only available when **Data input** is selected for the **Open period**.

The forecast range can be configured using one of the following options:

* Apply a single configuration for the entire period.

    :::image type="content" source="media/planning-how-to-insert-rows-forecast/single-configuration.png" alt-text="Screenshot of configuring single forecast range.":::

* Split the forecast into multiple time ranges using **Add Range**.

    :::image type="content" source="media/planning-how-to-insert-rows-forecast/multiple-time-range.png" alt-text="Screenshot of configuring multiple forecast range":::

    When you split the forecast period, ensure that all time ranges together cover the entire forecasting duration. Otherwise, the forecast cannot be created.

## Configure forecast source

* **Set source**: Choose how to populate forecast values:
    * Use a blank forecast (manual input).
    * Reference another row.
    
      :::image type="content" source="media/planning-how-to-insert-rows-forecast/set-source.png" alt-text="Screenshot of set source option.":::

* **Source row**: Select the row whose values will be used when sourcing by row.

    :::image type="content" source="media/planning-how-to-insert-rows-forecast/source-row.png" alt-text="Screenshot of source row option.":::

* **Operation**: Define how forecast values are calculated:
    * **Period range**: Copy values from a selected time range.
    * **Single period**: Use values from a specific period.
    * **Average of period range**: Use the average of selected periods.
    
      :::image type="content" source="media/planning-how-to-insert-rows-forecast/operation.png" alt-text="Screenshot of options available in operation.":::

## Edit and update a forecast row

Edit an existing forecast row by selecting the edit icon on the row. The side pane opens where the following properties can be updated:

:::image type="content" source="media/planning-how-to-insert-rows-forecast/edit-update.png" alt-text="Screenshot of the side pane when editing a forecast row." lightbox="media/planning-how-to-insert-rows-forecast/edit-update.png":::

* Edit the **Title** as needed.
* Reconfigure **Period Settings** to update forecast values for closed and open periods.
* Configure **Scaling Factor**, **Bind for Cross filter/RLS**, **Include in total**, **Allow Input** and **Description**.

For more information, see [data input row properties](planning-how-to-insert-rows-data-input.md#data-input-row-properties). After making the required changes, select **Update**.

:::image type="content" source="media/planning-how-to-insert-rows-forecast/edit-update-more-options.png" alt-text="Screenshot of the side pane with more options when editing a forecast row." lightbox="media/planning-how-to-insert-rows-forecast/edit-update-more-options.png":::
