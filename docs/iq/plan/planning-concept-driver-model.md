---
title: Driver Model
description: Learn about the Driver Model and Model Builder in Plan
ms.date: 04/25/2026
ms.topic: concept-article
#customer intent: As a user, I want to understand what is a model, a driver model and the model builder interface in Plan.
---

# What is a model?

A model is a structured representation of business logic built from an interconnected hierarchy of rows. Instead of using scattered formulas, a model organizes logic into a hierarchy of rows, where:

* Inputs feed into calculations
* Calculations roll up into parent rows
* Relationships define how values flow across the model

This approach ensures that your planning logic is centralized, transparent, scalable, and easier to maintain.

## Driver Model

A driver model is a type of model in which the outputs are determined by key input variables called drivers. Drivers are the key inputs that influence business outcomes. Examples include *units sold*, *price per unit*, *headcount*, *production volume*, etc. These drivers are linked to outputs such as *revenue*, *costs*, or *demand* through formulas or proportional logic.

## How a Driver Model works

In a driver model, you create a model with a hierarchical structure of connected rows representing business logic. Next, using the rows,

1. **Define the drivers** (input variables)
2. **Establish relationships** between drivers and outputs
3. **Calculate outcomes** using formulas or proportional logic

The following formulas illustrate how input drivers can be connected to business outcomes.

```text
Revenue = Units Sold × Price
Total Cost = Headcount × Cost per Employee
```

Driver-based modeling also aligns with allocation concepts, where values are distributed proportionally based on a driver’s relative contribution. You can also modify the allocation method as per your requirement.

## Why use a Driver Model?

* Run what-if scenarios by changing assumptions (drivers) to see instant results.
* Improves decision-making with clear cause-and-effect relationships.
* Simplifies forecasting by focusing on key business levers.

## Model Builder

In Planning sheet, when you select **Driver Model**, the **Model Builder** is enabled.

:::image type="content" source="media/includes/enable-model-builder.png" alt-text="Screenshot of enabling model builder from the planning sheet.":::

Model Builder is a no-code, flexible interface for creating and managing advanced and driver-based models.

## Capabilities of Model Builder

* Create models through a WYSIWYG interface, with guided interactions, menus, and dropdowns.
* Customize with various row types, formulas, and aggregations.
* Use templates to reuse repetitive model structures.

The image below shows the Model Builder interface before a model is built:

:::image type="content" source="media/includes/before-model.png" alt-text="Screenshot of model builder interface before a model is built.":::

From here, you can create parent rows, add related line items as child rows, and define how values flow through the model.

## Use cases

The Model Builder supports a wide range of planning scenarios, including:

* Financial Planning & Analysis (FP&A)
* Supply chain planning
* Headcount planning
* Operations planning
* What-if P\&L reporting
* 3-Statement financial model
* Weekly sales forecasting
* Budgeting, and so on.

By organizing logic into a model, you can build reusable frameworks that adapt to changing business needs.

## Next step

* Create a model using Model Builder.

## Related content

* Create a driver-based model.
