---
title: Update Forecast Periods with Reforecasting
description: Reforecasting lets you update forecast periods by copying values from existing periods as a baseline. Learn how to seed new periods and apply growth assumptions.
ms.date: 08/12/2026
ms.topic: concept-article
---

# Reforecasting

Reforecasting lets you update forecast periods by using values from existing periods as a baseline. You can copy values from a source period to a target period, and then apply adjustments, such as growth assumptions, to create an updated forecast with a time extension.


Reforecasting is useful when you extend the forecast horizon (planning period) after closing a period and need to seed the newly opened period with the latest actual values. Alternatively, it also allows you to retain the forecast values you previously entered in the closing period.


## How reforecasting works

Reforecasting follows these steps:

1. Close the completed period and extend the forecast horizon.
1. Select the newly opened forecast period as the target period.
1. Select the measure and source period to use as the baseline.
1. Copy the source values to the target period.
1. Apply adjustments to the target values, such as a growth assumption.

## When to use reforecasting

Use reforecasting when you need to:

- Input values in the opened forecast period with values from an existing period.
- Use recent actuals as a baseline for future forecasts.
- Update forecast values after closing a period.
- Apply growth assumptions to newly seeded forecast values.
- Maintain a continuous forecast horizon as actual periods become available.
- Distribute forecast deficit value to open periods in the forecast measures.

## Key takeaway

Reforecasting lets you use existing planning values to seed future forecast periods and apply updated assumptions. When you combine reforecasting with period closing and forecast extension, you can maintain a continuous forecast horizon as actuals become available. Deficit distribution also comes handy when you want to retain the total (original) forecast for the year by spreading the delta in the open period.
