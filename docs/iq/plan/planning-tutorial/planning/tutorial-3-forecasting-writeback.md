---
ai-usage: ai-assisted
title: Build a Rolling Forecast in Fabric Planning
description: Fabric planning forecasting shows you how to generate statistical predictions with Trend Decomposition, reforecast open periods, and save results to a SQL database.
ms.date: 09/07/2026
ms.topic: tutorial
---

# Fabric planning tutorial part 3: Optimize data input measures to achieve a target result

In this tutorial, you learn how to create rolling forecasts in planning sheets:

* Build a rolling 2026 forecast anchored on 24 months of actuals
* Generate a statistical forecast using the Trend Decomposition with MSTL algorithm 
* Close January 2026 as actuals arrive
* Extend the horizon to January 2027
* Commit the finalized forecast to a Fabric SQL database

## Prerequisites

Before you start this tutorial, ensure you complete the first three tutorials:

*  [Introduction to planning in Microsoft Fabric](./tutorial-0-introduction.md )
*  [Allocations and collaboration](./tutorial-1-allocation-collaboration.md)
*  [Optimize input values](./tutorial-2-optimizer.md)

This tutorial uses the plan app and the Fabric SQL database you created in the previous tutorials.

## Create a rolling forecast sheet

In this section, you set up the forecast planning sheet and create a blank forecast measure for 2026, ready to be populated by the statistical model.

1. In *Northwind_FMCG_Plan*, select **New Planning Sheet** in the **Home** ribbon. Enter *Forecast* and select **Create**.
1. Configure the field assignments:

    | Field   | Value                                     |
    | ------- | ----------------------------------------- |
    | Rows    | Category → Sub-Category                   |
    | Columns | Date hierarchy—Year, Quarter, Month Short |
    | Values  | Gross Revenue                             |

1. In the **Filter** panel in the sidebar, apply a year filter for 2024 and 2025. Only these two years’ values feed into the statistical forecast.
1. In the **Planning** ribbon, select **Totals** and enable **Column Subtotal** on the left.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/planning-ribbon-enable-column-subtotal.png" alt-text="Screenshot of the Totals menu in the Planning ribbon with Column Subtotal enabled." lightbox="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/planning-ribbon-enable-column-subtotal.png":::

1. In the **Model** ribbon, select **Forecast**.
1. Enter *Forecast* as the measure name. Set the *Forecast Period* to Jan 2026 to Dec 2026. Select **Next**.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/forecast-measure-name-period-range.png" alt-text="Screenshot of entering the forecast measure name and selecting the forecast period." lightbox="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/forecast-measure-name-period-range.png":::

1. In the closed period configuration, select **Link to Measure** and set **Source Measure** to *Gross Revenue*. This configuration brings in the corresponding Gross Revenue actuals once a period closes. Select **Next**.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/closed-period-source-gross-revenue.png" alt-text="Screenshot of configuring closed periods to use Gross revenue as the source." lightbox="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/closed-period-source-gross-revenue.png":::

1. In the open period configuration, select **Data Input** and set **Default Value** to **None**. Leaving open periods blank allows the predict feature to populate the forecast using statistical methods. Select **Save**.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/open-period-data-input.png" alt-text="Screenshot of the data input option for configuring open periods." lightbox="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/open-period-data-input.png":::

1. Observe that the 2024 and 2025 forecast columns appear greyed out, indicating closed periods. The 2026 columns are open and empty, ready for the statistical model.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/forecast-grid-2026-blank-closed-periods-greyed.png" alt-text="Screenshot of a blank forecast created for 2026 with 2024 and 2025 forecasts populated with Gross Revenue values." lightbox="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/forecast-grid-2026-blank-closed-periods-greyed.png":::

## Generate the statistical forecast

In this section, you run the statistical forecast across the full January–December 2026 horizon using 24 months of historical actuals. The Trend Decomposition with MSTL algorithm detects seasonal patterns at both annual and quarterly cycles and generates a complete year of forecasted values in one pass.

1. Select the cell at the intersection of the *All* row and the Forecast subtotal column for 2026.
1. In the **Model** ribbon, select **Predict**. The Predict panel opens.
1. Use the lock icon to freeze the selection. Confirm **Row Selected** is *Grand Total* and **Select Measure** is *Forecast*.
1. Confirm the following default selections:

    | Setting             | Value             |
    | ------------------- | ----------------- |
    | Historic data range | Jan 2024–Dec 2025 |
    | Forecast date range | Jan 2026–Dec 2026 |

1. Configure the forecast as follows:

    | Setting                           | Value     |
    | --------------------------------- | --------- |
    | Confidence                        | 90%       |
    | Growth factor                     | 4%        |
    | Evaluation                        | Bottom Up |
    | Round all negative values to zero | No        |

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/predict-settings-evaluation-confidence.png" alt-text="Screenshot of the predict forecast settings to set the confidence, growth factor, and evaluation." lightbox="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/predict-settings-evaluation-confidence.png":::

1. Under **Choose Algorithm**, confirm **Trend Decomposition with MSTL** is selected. Under **Customize Algorithm**, select both **Year** and **Quarter** under **Set Seasonality**. This selection tells the model to detect and account for patterns at both cycle levels at the same time. Select **Run Forecast**.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/select-trend-decomposition-seasonality.png" alt-text="Screenshot of selecting the trend decomposition algorithm and setting the seasonality to Year and Quarter." lightbox="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/select-trend-decomposition-seasonality.png":::

1. The forecast preview appears—historical data in grey, predicted values in green, with the confidence range shown as green shading.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/predict-values-preview-graph.png" alt-text="Screenshot of the forecast preview graph showing historical values in grey, predicted values in green, and a shaded confidence interval." lightbox="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/predict-values-preview-graph.png":::

1. Scroll down to see the forecast table. Select **Save Forecast**.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/forecast-predicted-values-table-view.png" alt-text="Screenshot of the actual predict values displayed in tabular format along with the confidence interval." lightbox="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/forecast-predicted-values-table-view.png":::

1. Confirm the forecast measure and the date range, and then select **Save**. The statistical forecast is created with values calculated at the most granular level of the row and column hierarchies, then aggregated up to higher levels.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/statistical-forecast-created-using-predict.png" alt-text="Screenshot of statistical forecast values applied to the planning sheet." lightbox="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/statistical-forecast-created-using-predict.png":::

## Close the period and extend the forecast horizon

In this section, you reveal January 2026 actuals, close the period to lock them in, extend the horizon to January 2027, and reforecast the newly opened month.

### Reveal January 2026 actuals

In this part, you add 2026 to the year filter to reveal January's actual Gross Revenue alongside the statistical forecast. Comparing the two values shows how closely the forecast matched actuals.

1. In the **Filter** panel, edit the existing year filter and add 2026 alongside 2024 and 2025.
1. Expand the column headers and compare the two January 2026 values side by side: 

    * Forecast: $2.09m—the value generated by the statistical model
    * Gross Revenue: $1.92m—the actual January figure

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/enable-revenue-actuals-2026.png" alt-text="Screenshot of actuals populated for 2026 and comparing the predicted forecast with actuals." lightbox="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/enable-revenue-actuals-2026.png":::

### Close January forecast and extend the horizon

In this section, you close the January 2026 forecast to lock in the actuals and extend the forecast horizon by one month. This action keeps a continuous 12-month forward view as each period closes.

1. In the **Model** ribbon, select the **Period** dropdown and select **Close Period**.
1. In the **Close Period** dialog box, select the **Close period till** dropdown and select **Custom**. Set the period to January 2026.
1. Select **Extend Forecast Range** and set **Duration** to 1 Month. This action maintains a continuous 12-month forward window. As January closes, January 2027 is added to the horizon.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/close-period-configuration-extend-one-month.png" alt-text="Screenshot of the Close Period dialog with January 2026 set as the custom period and the forecast range extended by one month." lightbox="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/close-period-configuration-extend-one-month.png":::

1. Select **Preview**. Verify the following values, and then select **Save**:

    | Field         | Value              |
    | ------------- | ------------------ |
    | Measure       | Forecast           |
    | Closed period | Jan 2024–Jan 2026  |
    | Open period   | Feb 2026- Jan 2027 |

1. January 2026 is now populated with actual gross revenue and greyed out. The forecast horizon extends automatically to January 2027.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/forecast-extended-2027.png" alt-text="Screenshot of closing the January 2026 forecast and creating a rolling forecast by extending it to January 2027." lightbox="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/forecast-extended-2027.png":::

### Reforecast January 2027

In this section, you reforecast the newly opened January 2027 period using January 2026 actuals as a baseline. This approach gives the extended month a realistic starting value instead of an empty cell.

1. In the **Model** ribbon, select **Reforecast** and select **Reforecast Column**. Configure it as follows and select **Apply**:

    | Setting         | Value             |
    | --------------- | ----------------- |
    | Target period   | Jan 2027–Jan 2027 |
    | Copy source     | Gross Revenue     |
    | Apply operation | Single Period     |
    | Source periods  | Jan 2026          |

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/reforecast-configuration-single-period.png" alt-text="Screenshot of the reforecast configuration for January 2027 using the Single Period operation with source period Jan 2026." lightbox="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/reforecast-configuration-single-period.png":::

1. January 2027 is seeded from January 2026 actuals ($1.92M), giving a realistic baseline for the extended horizon.
1. Double-click the Jan 2027 grand total cell, enter +4%, and select the check mark. January 2027 is now populated at $2M.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/reforecast-increase-value-four-percent.png" alt-text="Screenshot of increasing the forecast for 2027 by four percent." lightbox="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/reforecast-increase-value-four-percent.png":::

## Commit the forecast to the database

In this section, you add a writeback destination, configure writeback settings, run writeback, and verify the results in the database.

For an overview of writeback concepts, see [Writeback in Planning](../../planning-writeback/planning-how-to-persist-data.md).

### Add a writeback destination

In this section, you add the Fabric SQL database as a writeback destination for the forecast measure. This destination determines where committed values are written when you run writeback.

1. In the **Writeback** ribbon, select **Add destination**.
1. In **Create Destination**, configure the settings as shown in the following table and select **Add**:

    | Setting           | Value                                                |
    | ----------------- | ---------------------------------------------------- |
    | Select connection | Northwind_FMCG (created in Tutorial 1)               |
    | Database name     | Northwind_FMCG_Lisa Taylor (created in Tutorial 1)   |
    | Schema            | dbo                                                  |
    | Table name        | Forecast                                             |
    | Decimal precision | 2                                                    |
    | Text length       | 512                                                  |

1. A confirmation message appears when you add the destination successfully.
<Add image here - image 56 with writeback add destination settings>

### Configure writeback settings

In this section, you configure how the forecast is written to the database - the writeback type, which measures are included, and the destination. These settings determine what gets written and how each writeback run behaves.

1. In the **Writeback** ribbon, select **Settings**. The settings panel has four tabs—**General**, **Data**, **Destinations**, and **Advanced**.
1. In the **General** tab, select the information icon next to each writeback type to review the options:

    | Type              | Behavior                                                       |
    | ----------------- | -------------------------------------------------------------- |
    | Long              | One row per observation. Full snapshot every run.              |
    | Wide              | Each measure as a separate column. Full snapshot every run.    |
    | Long with Changes | Writes only changed values. Builds an audit history over time. |
    | Wide with Changes | Same as Wide but writes only changed values.                   |

1. Select **Long with Changes**. A warning appears confirming the destination will be turned off. Select **Proceed**.
1. Confirm **Filter type** is set to **None**—this writes back all data without filtering.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/general-settings-writeback-type-filter.png" alt-text="Screenshot of general settings for writeback with the writeback type set to Long with Changes and filter type set to None." lightbox="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/general-settings-writeback-type-filter.png":::

1. Select the **Data** tab. Deselect *Gross Revenue*—this is a read-only actuals measure and doesn't need to be committed to the database. Only Forecast should be selected.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/writeback-data-settings-select-forecast.png" alt-text="Screenshot of selecting the Forecast measure and deselecting the native Gross Revenue measure for writeback." lightbox="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/writeback-data-settings-select-forecast.png":::

1. Open the **Destinations** tab and select the Fabric SQL destination created in [Add a writeback destination](#add-a-writeback-destination).
   
   :::image type="content" source="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/select-fabric-sql-destination.png" alt-text="Screenshot of selecting the Fabric SQL writeback destination." lightbox="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/select-fabric-sql-destination.png":::

### Run writeback and verify data

In this section, you run writeback and confirm that writeback saves forecast data correctly in the Fabric SQL database. You also review the writeback logs to see the run's status and details.

1. In the **Writeback** ribbon, select **Writeback**. A confirmation message that states, *Writeback Completed*, appears within a few seconds.
1. Open your training workspace folder and open the Northwind_FMCG SQL database.
1. Expand **Northwind_FMCG** > **dbo** > **Tables** and select the *Forecast* table. Verify the forecast data appears in the preview.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/verify-forecast-writeback-fabric-sql.png" alt-text="Screenshot of forecast data from the planning sheet written back to a Fabric SQL table in the Northwind_FMCG database." lightbox="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/verify-forecast-writeback-fabric-sql.png":::

1. Go back to the plan app. In the **Writeback** ribbon, select **Logs**. Review the log details - status, duration, user who performed the writeback, measures written back, and writeback type.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/writeback-logs.png" alt-text="Screenshot of writeback logs screen with details including the job id, duration, status, trigger time and user who initiated the writeback instance." lightbox="../../media/planning-tutorial/planning/tutorial-3-forecasting-writeback/writeback-logs.png":::
