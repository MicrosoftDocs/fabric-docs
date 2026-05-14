---
title: Driver Model
description: Learn about the driver model and model builder in plan (preview).
ms.date: 04/28/2026
ms.topic: concept-article
#customer intent: As a user, I want to understand what is a model, a driver model and the model builder interface in plan.
---

# What is a model?

A *model* is a structured representation of business logic that's built from an interconnected hierarchy of rows. Instead of using scattered formulas, a model organizes logic into a hierarchy of rows, where:

* Inputs feed into calculations
* Calculations roll up into parent rows
* Relationships define how values flow across the model

This approach ensures that your planning logic is centralized, transparent, scalable, and easier to maintain.

[!INCLUDE [Fabric feature-preview-note](../../../includes/feature-preview-note.md)]

### Driver model

A *driver model* is a type of model in which the outputs are determined by key input variables called drivers. Drivers are the key inputs that influence business outcomes. Examples include *units sold*, *price per unit*, *headcount*, *production volume*, and so on. These drivers are linked to outputs such as *revenue*, *costs*, or *demand* through formulas or proportional logic.

### Why use a driver model?

* Run what-if scenarios by changing assumptions (drivers) to see instant results.
* Improve decision-making with clear cause-and-effect relationships.
* Simplify forecasting by focusing on key business levers.

## How a driver model works

In a driver model, you create a model with a hierarchical structure of connected rows that represent business logic. Next, use the rows to:

1. **Define the drivers** (input variables).
2. **Establish relationships** between drivers and outputs.
3. **Calculate outcomes** using formulas or proportional logic.

The following formulas illustrate how input drivers can be connected to business outcomes:

```
Revenue = Units Sold × Price
Total Cost = Headcount × Cost per Employee
```

Driver-based modeling also aligns with allocation concepts, where values are distributed proportionally based on a driver's relative contribution. You can also modify the allocation method to meet your requirements.

## Model builder

In Planning sheet, when you select **Driver Model**, **Model Builder** is enabled.

:::image type="content" source="../media/planning-driver-model/planning-concept-driver-model/enable-model-builder.png" alt-text="Screenshot of enabling Model Builder from the Planning sheet.":::

The model builder is a no-code, flexible interface for creating and managing advanced and driver models.

### Capabilities of model builder

* Create models through a straightforward interface with guided interactions, menus, and dropdowns.
* Customize with various row types, formulas, and aggregations.
* Use templates to reuse repetitive model structures.

The following image shows the model builder interface before you build a model:

:::image type="content" source="../media/planning-driver-model/planning-concept-driver-model/before-model.png" alt-text="Screenshot of model builder interface before a model is built." lightbox="../media/planning-driver-model/planning-concept-driver-model/before-model.png":::

From here, you can create parent rows, add related line items as child rows, and define how values flow through the model.

### Use cases

The model builder supports a wide range of planning scenarios, including:

* Financial Planning & Analysis (FP&A)
* Supply chain planning
* Headcount planning
* Operations planning
* What-if Profit and Loss (P&L) reporting
* 3-Statement financial model
* Weekly sales forecasting
* Budgeting, and so on.

By organizing logic into a model, you can build reusable frameworks that adapt to changing business needs.

## Next steps

[Create a model using model builder](planning-how-to-create-model-using-model-builder.md)

## Related content

[Create a driver model](planning-how-to-create-driver-model.md)
