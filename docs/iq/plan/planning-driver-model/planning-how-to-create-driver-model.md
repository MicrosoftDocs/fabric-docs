---
title: Create a Driver Model
description: Learn how to create a driver model by using the model builder.
ms.date: 04/28/2026
ms.topic: how-to
#customer intent: As a user, I want to learn how to create a driver model by using model builder.
---

# Create a driver model by using the model builder

This article explains how to create a driver-based model.

[!INCLUDE [Fabric feature-preview-note](../../../includes/feature-preview-note.md)]

A [*driver model*](planning-concept-driver-model.md) is a type of model in which outputs are determined by key input variables called *drivers*. Examples include units sold, price per unit, headcount, production volume, and so on. These inputs are linked to outputs such as revenue, costs, or demand through defined formulas or proportional logic.

For example:

```
Revenue = Units Sold × Price
Cost = Headcount × Cost per Employee
```

Configuring drivers allows you to quickly adjust assumptions and instantly see the impact across the model.

## How model builder supports driver models

Model builder makes it easier to create driver models by:

* Linking input rows (drivers) to calculated rows
* Structuring dependencies using hierarchies
* Providing various driver methods to choose from

## Create a driver model

Start by creating a model using model builder as described in [Create a model using model builder](planning-how-to-create-model-using-model-builder.md).

Consider the following model to use as an example throughout this article:

```
Gross Revenue = Volume x Revenue per Barrel
```

:::image type="content" source="../media/planning-driver-model/planning-how-to-create-driver-model/sample-model.png" alt-text="Screenshot of sample model." lightbox="../media/planning-driver-model/planning-how-to-create-driver-model/sample-model.png":::

In this model, *Gross Revenue* is driven by two drivers—*Volume* and *Revenue per Barrel*.

The following steps describe how to add another input driver, **Price Growth %**, to evaluate how price changes affect gross revenue over time. This scenario is a good candidate for driver-based modeling.

1. Create a new row to capture the driver output, such as **Final Gross Revenue**. You could also reuse an existing row that fits your use case.

   >[!NOTE]
   >Ensure that the new row is created as an independent row to avoid circular references.

1. Configure the row properties for the *Final Gross Revenue* as follows:

    * **Type**: Driver Input
    * **Driver Row**: Gross Revenue (one of the drivers)
    * **Driver Method**: Growth By Percentage

    :::image type="content" source="../media/planning-driver-model/planning-how-to-create-driver-model/configure-driver-method.png" alt-text="Screenshot of configuring driver row and driver method." lightbox="../media/planning-driver-model/planning-how-to-create-driver-model/configure-driver-method.png":::

1. Go back to the planning sheet and select the driver icon. Then, enter the price growth % values in the **Driver Input** table that appears. You can enter driver input at either the total or leaf levels.

    :::image type="content" source="../media/planning-driver-model/planning-how-to-create-driver-model/enter-driver-input.png" alt-text="Screenshot of entering driver input in planning sheet.":::

1. After you enter the *Price Growth %* values, the **Final Gross Revenue** row updates automatically based on the selected driver method (10% growth in gross revenue).
1. Enter different driver inputs to calculate the change in gross revenue, the net revenue, and gross profit as price growth changes roll up to the top.

    :::image type="content" source="../media/planning-driver-model/planning-how-to-create-driver-model/result-driver-input.png" alt-text="Screenshot of results after entering driver input in planning sheet.":::

This example shows how driver-based modeling helps you find outcomes based on key assumptions so you can test different driver inputs without changing the core model.

Changes automatically roll up to top-level results and distribute across periods, allowing you to perform fast, flexible what-if analysis directly in the planning sheet.

You can also modify the distribution method while creating a driver model. For more information, see [Distribution](planning-how-to-configure-model-row-properties.md#distribution).
