---
title: Financial functions
description: Learn about financial functions in plan (preview) and how to use them to perform financial calculations.
ms.date: 06/04/2026
ms.topic: reference
ms.search.form: Financial functions
#customer intent: As a user, I want to understand financial functions and how to use them in calculations.
---

# Financial functions

Financial functions let you perform financial calculations in reports. These functions are commonly used to calculate loan payments, evaluate financial scenarios, and support budgeting and forecasting activities.

[!INCLUDE [Fabric feature-preview-note](../../../../includes/feature-preview-note.md)]

## PMT

The *PMT* function calculates the periodic payment amount for a loan based on a constant interest rate and a fixed payment schedule. It determines the amount to be paid in each period to repay a loan or investment over time. This function is commonly used in financial planning, loan analysis, and investment calculations.

### Syntax

```
PMT(rate:number, nper:number, pv:number, fv:number, type:number)
```

### Arguments

* `rate`: The interest rate for each period.
* `nper`: The total number of payment periods.
* `pv`: The present value or initial investment amount. Cash outflows are considered negative, and cash inflows are considered positive.
* `fv` (optional): The future or residual value. If omitted, the default value is 0.
* `type` (optional): Indicates when payments are made. Use 0 for payments at the end of the period and 1 for payments at the beginning of the period. If omitted, the default value is 0.

### Return value

Returns the periodic payment amount for a loan or investment.

### Example

```
PMT(Rate Of Interest, Number Of Periods, Initial)
```

In this example, the *PMT Result* measure is created using the PMT function, which calculates the periodic payment amount based on the values in *Rate Of Interest*, *Number Of Periods*, and *Initial*.

:::image type="content" source="../../media/planning-reference-formulas/math-functions/financial-functions/pmt.png" alt-text="Screenshot of PMT function." lightbox="../../media/planning-reference-formulas/math-functions/financial-functions/pmt.png":::

#### Excel equivalent

[PMT](https://support.microsoft.com/en-us/office/pmt-function-0214da64-9a63-4996-bc20-214433fa6441)
