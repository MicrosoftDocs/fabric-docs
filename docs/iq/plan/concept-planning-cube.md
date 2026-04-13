---
title: Allocate plans with a cube
description: Learn about multi-dimensional driver based allocation 
ms.date: 04/12/2026
ms.topic: concept-article
#customer intent: As a user, I want to understand planning cubes and multi-dimensional driver based allocation.
---
# What is a planning cube?

In many business scenarios, plans are created separately for each dimension, such as regions, product lines, departments, or time periods-resulting in duplicated effort and fragmented planning. Multi-dimensional cube planning lets you create and allocate plans across multiple dimensions with different granularities in a single step. Cubes enable plans to stay synchronized across different levels of detail.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Driver-based allocation model

Each cube is configured around a [data input measure](planning-how-to-input-data.md) or [forecast](planning-how-to-build-forecasts.md) measure. Allocation within the cube is performed using an allocation driver (also referred to as a reference measure or allocation key).
The allocation driver is typically a DAX measure from the semantic model, such as prior year actuals, current year revenue, units sold, headcount, or production volume.
This driver measure provides the weights and ratios used for proportional distribution.

## How allocation works

1. A value is entered at a summarized level, such as 500 entered for a product without selecting lower-level dimensions (for example, region or province).
1. The selected allocation driver measure determines how the value should be distributed.
1. The value is allocated proportionally across all valid dimension intersections, based on the driver measure’s relative weights.

## Allocation formula (Conceptual)

Allocated value is calculated by multiplying the entered value by the relative weight of the allocation driver at each valid intersection:

```
Allocated Value =
Entered Value ×                                                                                                  (Driver Value at the intersection ÷ Sum of Driver Values within the hierarchy scope)
```

Where:

* Entered Value is the total value entered at a higher level of aggregation.
* Driver Value at the intersection is the allocation driver’s value for a combination of row and column dimensions.
* The hierarchy scope includes all valid lower‑level intersections over which the entered value is distributed.

## What allocation means in practice

* Allocation is performed only for dimension intersections where the driver has a non-null value.
* Values are distributed based on the relative contribution of each driver value within the hierarchy scope.
* Allocation respects the dimensional granularity and breakdowns configured in the cube, ensuring consistency with the data model.
  
    :::image type="content" source="media/concept-planning-cube/allocation.png" alt-text="Screenshot of allocating values.":::

## Multi-dimensional allocation

Cubes support distributing plans across

* Dimensions present in the planning sheet
* Dimensions not currently visible in the sheet, but configured in the cube breakdown
* Multiple granularities simultaneously

This allows complex enterprise allocations—such as Region → Product Line → Department—to occur in a single action, while maintaining data integrity across the cube.
The allocation driver measure doesn't need to be added to the planning sheet. It can exist solely in the semantic model and be used internally as the weighting mechanism.

## Use case: Enterprise-Level budget allocation

Consider an organization allocating an annual budget across Regions, Product Lines, and Departments.

Using a cube:

* The total budget is entered at a higher level.
* A driver measure (for example, prior year actuals) is selected as the allocation driver.
* The cube proportionally distributes the budget across all valid intersections.
* Allocations remain synchronized across all dimensions—even those not visible in the current sheet.

This approach avoids manual breakdowns, duplicate models, and reconciliation errors.
