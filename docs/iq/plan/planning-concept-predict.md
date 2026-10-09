---
title: Statistical Forecasting Algorithms in Predict
description: Learn about the forecasting algorithms, statistical models, model orders, and forecasting parameters available in the Predict feature in planning in Fabric.
ms.date: 08/07/2026
ms.topic: concept-article
---

# Predict - statistical forecasting algorithms

**Predict** is a forecasting feature that generates future values by analyzing historical data and identifying patterns such as trends, seasonality, and historical relationships. It applies statistical forecasting techniques to estimate future values for a specified forecast period and supports configurable forecasting options to meet different planning requirements.

The behavior of the forecast depends on the *forecasting algorithm*, the *forecasting model* it uses, and the *model order* selected.

A **forecasting algorithm** is a mathematical or statistical method that analyzes historical time-series data to identify patterns such as level, trend, seasonality, and relationships between observations, and uses those patterns to estimate future values.

A **statistical model** is the mathematical representation of a historical time series created by a forecasting algorithm. It captures characteristics, such as level, trend, seasonality, and relationships between observations, and is used to generate forecast values.

A **model order** is a set of parameters that defines the structure and complexity of a statistical model. It tells the algorithm how many components or parameters are included in the model.

The following table lists the forecast algorithms, statistical models, and model orders available in planning in Fabric.

| Forecast Algorithm | Statistical Model | Model Order |
|--------------------|-------------------|-------------|
| Trend Decomposition with MSTL | | |
| Exponential Smoothing | - Auto ETS<br>- Simple Exponential Smoothing<br>- Holt (Double Exponential)<br>- Holt (Double Exponential), Damped Trend<br>- Holt Winters, Additive (A, A, A)<br>- Holt Winters, Additive, Damped (A, Ad, A)<br>- Holt Winters, Multiplicative (M, M, M)<br>- Holt Winters, Multiplicative, Damped (M, Ad, M)<br>- Holt Winters, Multiplicative, Seasonal (M, N, M) | |
| ARIMA | - Auto ARIMA<br>- Non-Seasonal (ARIMA)<br>- Seasonal (SARIMA) | **Non-Seasonal (ARIMA)**<br>- ARIMA / (1,1,1)<br>- Random Walk / (0,1,0)<br>- AR(1) / (1,0,0)<br>- IMA(1,1) / (0,1,1)<br>- Differenced AR(1) / (1,1,0)<br><br>**Seasonal (SARIMA)**<br>- Airline Model (0,1,1,12)<br>- General SARIMA (1,1,1,12)<br>- Seasonal AR (1,0,0,12)<br>- Quarterly (1,0,1,4) |

## Trend decomposition with MSTL

Trend decomposition with MSTL (Multiple Seasonal Trend decomposition using LOESS) is a time-series decomposition technique that separates a time series into trend, multiple seasonal components, and a remainder using LOESS smoothing. You can use the decomposed components to improve forecasting accuracy for data with multiple seasonal patterns.

It's particularly useful for analyzing data with more than one seasonal pattern and can improve forecasting by isolating the underlying structure of the time series.

Use MSTL when your data has:

- More than one seasonal pattern.
- Long-term trends.
- Complex recurring cycles.

## Exponential smoothing

Exponential Smoothing is a statistical forecasting algorithm that predicts future values by calculating weighted averages of historical observations, assigning greater weight to more recent data and progressively smaller weights to older data.

It's commonly used for time-series forecasting and can be extended to model trends and seasonal patterns through methods such as Holt's Linear Trend and Holt-Winters.

Use Exponential Smoothing when your data has:

- A relatively stable level.
- No significant trend.
- No repeating seasonal pattern.

### Simple exponential smoothing

Simple exponential smoothing predicts future values by computing a weighted average of past observations. It gives the greatest weight to the most recent data. Use it for time series with no trend and no seasonality.

### Holt (Double Exponential)

Holt's (Double Exponential) Smoothing is a forecasting method that models and forecasts future values by estimating both the current level and the underlying trend of a time series. It's suitable for data with a trend but no seasonality.

### Holt (Double Exponential), Damped Trend

Holt's (Double Exponential) Smoothing with Damped Trend is a forecasting method that models and forecasts future values by estimating the current level and trend while gradually reducing the influence of the trend over time. It's suitable for non-seasonal data where growth or decline is expected to slow.

### Holt-Winters, Additive (A, A, A)

Holt-Winters Additive (A, A, A) is a forecasting method that predicts future values by combining an additive error, an additive trend, and an additive seasonal component. It's suitable for time series with a trend and constant-sized seasonal fluctuations. Seasonal fluctuations remain approximately constant in magnitude regardless of the level of the series.

### Holt-Winters, Additive, Damped (A, Ad, A)

Holt-Winters Additive Damped (A, Ad, A) is an ETS forecasting method that predicts future values using an additive error, a trend that gradually weakens over time, and a constant additive seasonal pattern. It's suitable for data with trend and constant-sized seasonality where long-term growth is expected to slow.

### Holt-Winters, Multiplicative (M, M, M)

Holt-Winters Multiplicative (M, M, M) is an ETS forecasting method that predicts future values using multiplicative error, multiplicative trend, and multiplicative seasonal components. It's ideal for time series where both growth and seasonal fluctuations increase proportionally with the level of the data. Seasonal fluctuations change proportionally with the level of the series.

### Holt-Winters, Multiplicative, Damped (M, Ad, M)

Holt-Winters Multiplicative Damped (M, Ad, M) is an ETS forecasting method that predicts future values using multiplicative errors, a gradually weakening trend, and multiplicative seasonality. It's ideal for data where seasonal effects grow with the level of the series but long-term growth is expected to slow down.

### Holt-Winters, Multiplicative, Seasonal (M, N, M)

Holt-Winters Multiplicative Seasonal (M, N, M) is an ETS forecasting method that predicts future values using multiplicative errors, no trend, and multiplicative seasonality. It's suitable for stable time series with seasonal effects that change proportionally with the level of the data.

### Auto ETS

Auto ETS automatically evaluates multiple ETS statistical models and selects the model that best fits the historical time series using statistical selection criteria.

### Optimize exponential smoothing parameters

After running forecast, you can optimize it by choosing the following **parameters**:

- **Alpha (α)** – Level Smoothing Parameter: Alpha controls how quickly the model updates the current level (average) based on the newest observation. The parameter range of Alpha is **(0 < α < 1)**.
- **Beta (β)** – Trend Smoothing Parameter: Beta controls how quickly the model updates the trend. The parameter range of Beta is **(0 < β < 1)**.
- **Gamma (γ)** – Seasonal Smoothing Parameter: Gamma controls how quickly the seasonal pattern is updated. The parameter range of Gamma is **(0 < γ < 1)**.
- **Phi (φ)** – Damping Parameter: Phi controls how much the trend is reduced (damped) into the future. The parameter range of Phi is **(0 < φ < 1)**.

## ARIMA

ARIMA (AutoRegressive Integrated Moving Average) is a forecasting algorithm that predicts future values by combining information from past observations (AutoRegressive), differencing the data to achieve stationarity, and past forecast errors (Moving Average). This combination makes ARIMA well suited for non-seasonal time series forecasting.


Use ARIMA when your data:

- Has no seasonal pattern.
- Might have a **trend** that you can remove through differencing.
- Shows **autocorrelation**, where past values help predict future values.
- Contains sufficient historical observations to estimate the model.
- Requires short- to medium-term forecasting based on historical patterns.

### Nonseasonal ARIMA

Nonseasonal ARIMA is the standard ARIMA forecasting method. It predicts future values by using past observations, differencing, and past forecast errors. It's designed for time series that have trends but no repeating seasonal patterns.  

You can also choose the **model order**.

#### ARIMA (1,1,1)

ARIMA(1,1,1) is a nonseasonal forecasting model that first differences the data once to remove the trend, and then predicts future values by using one previous observation and one previous forecast error.

#### Random Walk (0,1,0)

Random Walk (ARIMA(0,1,0)) is the simplest ARIMA model. It differences the data once and predicts the next value as the current observed value, assuming future changes are random.

#### AR(1) (1,0,0)

AR(1), or ARIMA(1,0,0), is a forecasting model that predicts the next value by using only the immediately previous observation. It assumes the data is already stationary and has no trend or seasonality.

#### IMA(1,1) (0,1,1)

IMA(1,1), or ARIMA(0,1,1), is a forecasting model that removes the trend by differencing the data once and predicts future values by adjusting for the most recent forecast error, without using autoregressive terms.

#### Differenced AR(1) (1,1,0)

Differenced AR(1), or ARIMA(1,1,0), is a forecasting model that first removes the trend by differencing the data once and then predicts future values by modeling the relationship between consecutive changes using one autoregressive term.

The following table summarizes the nonseasonal ARIMA model orders.

| Model Order | Description |
|--------------|-------------|
| ARIMA (1,1,1) | Uses both recent observations and recent forecast errors to forecast non-seasonal data with a trend. |
| Random Walk (0,1,0) | Assumes the future value will be similar to the latest observed value. |
| AR(1) (1,0,0) | Uses the most recent observation to predict the next value. |
| IMA(1,1) (0,1,1) | Uses recent forecast errors to improve predictions after removing the trend. |
| Differenced AR(1) (1,1,0) | Uses recent changes in the data to forecast future values after removing the trend. |

### Seasonal ARIMA

Seasonal ARIMA (SARIMA) is a forecasting method that extends ARIMA by modeling both non-seasonal patterns (trend and short-term relationships) and repeating seasonal patterns. This extension makes it ideal for time series with regular cycles such as monthly, quarterly, or weekly data.

You can choose the **model order**.

#### Airline Model (0,1,1,12)

The Airline Model (0,1,1,12) is a seasonal forecasting model that removes both trend and yearly seasonality. Then, it uses recent and seasonal forecast errors to predict future values, making it especially effective for monthly data with a repeating annual pattern.

#### General SARIMA (1,1,1,12)

The General SARIMA (1,1,1,12) is a seasonal forecasting model that removes both trend and yearly seasonality. Then, it predicts future values using the non-seasonal autoregressive and moving average components together with seasonal autoregressive and seasonal moving average components.

#### Seasonal AR (1,0,0,12)

Seasonal AR(1,0,0,12) is a seasonal autoregressive forecasting model that predicts a value using the observation from one seasonal cycle earlier (such as the same month last year), with no seasonal differencing and no seasonal moving average component.

#### Quarterly (1,0,1,4)

Quarterly (1,0,1,4) is the seasonal component of a SARIMA model that uses one seasonal autoregressive term and one seasonal moving average term with a seasonal period of four quarters. This model is suitable for quarterly data with a stable yearly seasonal pattern.

The following table summarizes the seasonal ARIMA model orders.

| Model Order | Description |
|--------------|-------------|
| Airline Model (0,1,1,12) | Models yearly seasonality and trend using recent forecast errors. |
| General SARIMA (1,1,1,12) | Models trend, recent observations, and yearly seasonal patterns. |
| Seasonal AR (1,0,0,12) | Predicts future values using observations from the same season in previous years. |
| Quarterly AR (1,0,1,4) | Models recurring quarterly patterns using previous quarters and seasonal forecast errors. |

### Auto ARIMA

Auto ARIMA automatically evaluates multiple ARIMA model orders and selects the best-fitting ARIMA model using statistical model selection criteria.

## Choose a forecasting algorithm

Refer to the following table for a summary of which algorithm to choose.

| Data Pattern | Recommended Algorithm |
|--------------|-----------------------|
| Stable data with no trend or seasonality | Simple Exponential Smoothing |
| Trend only | Holt's Linear Trend |
| Trend gradually weakens | Holt's Damped Trend |
| Trend with constant seasonal variation | Holt-Winters Additive |
| Trend with seasonal variation proportional to the level | Holt-Winters Multiplicative |
| Multiple seasonal patterns | MSTL |
| Non-seasonal data with autocorrelation | ARIMA |
| Seasonal data | SARIMA |
| Unsure which ETS model to use | Auto ETS |
| Unsure which ARIMA model to use | Auto ARIMA |
