---
title: Create a driver-based model using Model Builder
description: Learn how to create a driver-based model using Model Builder
ms.date: 04/26/2026
ms.topic: how-to
#customer intent: As a user, I want to learn how to create a driver-based model using Model Builder.
---

# Create a driver-based model

In this article, you learn how to create a driver-based model.

A **driver model** is a type of model in which outputs are determined by key input variables called **drivers**. Examples include units sold, price per unit, headcount, production volume, etc. These inputs are linked to outputs such as revenue, costs, or demand through defined formulas or proportional logic.

For example:

```text
* Revenue = Units Sold × Price
* Cost = Headcount × Cost per Employee
```

Configuring drivers allows you to quickly adjust assumptions and instantly see the impact across the model.

## How Model Builder supports driver models

Model Builder makes it easier to create driver-based models by:

* Linking input rows (drivers) to calculated rows
* Structuring dependencies using hierarchies
* Providing various driver methods to choose from.

## Steps to create a driver-based model

Follow the steps mentioned in the [Create a model using Model Builder](./how-to-create-model-using-model-builder.md) section and create the model you want.

For example, consider the model:

:::image type="content" source="../media/planning-model-builder/how-to-configure-row-properties-for-model/sample-model.jpg" alt-text="Screenshot of sample model.":::

```text
Gross Revenue = Volume x Revenue per Barrel
```

In this model, *Gross Revenue* is driven by two drivers—*Volume* and *Revenue per Barrel*.

Consider adding another input driver, such as **Price Growth %**, to evaluate how price changes affect gross revenue over time. In such scenarios, you can use driver-based modeling.

1. Create a new row to capture the driver output, such as **Final Gross Revenue**. Alternatively, you can reuse an existing row if it fits your use case.

   >[!Note]
   >Ensure that the new row is created as an independent row to avoid circular references.

1. Configure the row properties for the *Final Gross Revenue* as follows:

    * **Type**: Driver Input (as this row is driven by a driver input).
    * **Driver Row**: Gross Revenue (one driver).
    * **Driver Method**: Growth By Percentage.

    :::image type="content" source="../media/planning-model-builder/create-driver-based-model/configure-driver-method.png" alt-text="Screenshot of configuring driver row and driver method.":::

1. Go back to the planning sheet and select the 'Driver' icon. Then, enter the price growth % values in the **Driver Input** table that appears below. You can enter driver input at either the total or leaf levels.

    :::image type="content" source="../media/planning-model-builder/create-driver-based-model/enter-driver-input.png" alt-text="Screenshot of entering driver input in planning sheet.":::

1. After you enter the *Price Growth %* values, the ***Final Gross Revenue*** row is automatically updated based on the selected driver method (10% growth in gross revenue).
1. Enter different driver inputs to calculate not only the change in revenue, but also the net revenue and gross profit as price growth changes roll up to the top.

    :::image type="content" source="../media/planning-model-builder/create-driver-based-model/result-driver-input.png" alt-text="Screenshot of results after entering driver input in planning sheet.":::

This shows how driver-based modeling helps you find outcomes based on key assumptions, so you can test different driver inputs without changing the core model.

Changes automatically roll up to top-level results and also distribute across periods, allowing you to perform fast, flexible what-if analysis directly in the planning sheet.

You can also modify the distribution method while creating a driver-based model. To know more, refer to [Distribution](./how-to-configure-row-properties-for-model.md/#distribution).
