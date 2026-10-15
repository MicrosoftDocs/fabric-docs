---
description: Learn how locking, distribution, and min-max rules help manage planning inputs and allocations in Fabric.
ms.date: 10/14/2026
ms.topic: concept-article
title: Overview of allocation rules and controls
---

# Overview of allocation rules and controls

Plan provides rule-based controls to manage how data is entered, adjusted, and distributed across a model.

- **Locking Rule** protects critical data by restricting edits to specific rows, columns, or periods. During allocations, locking cells helps ensure that their values remain unchanged.
- **Distribution Rule** controls how values are allocated across measures and dimensions to support consistency and accuracy.
- **Minmax Rule** validates data input and allocations by enforcing minimum and maximum values.

Together, these rules help maintain data integrity and provide greater control over the planning process.

## Key features

Allocation rules and controls provide the following capabilities:

- Configure locking, distribution, and min-max rules in one place.
- Apply rules to all visual measures and columns or to specific measures.
- Select the row dimensions, columns, and periods where rules apply.
- Configure rules for existing measures and columns, as well as future columns.
- Use filters to specify the rows and columns that rules target.
- Review rule details, including who created a rule, when it was configured, and the applicable measures, rows, and columns.

You can access these rules from the **Plan** tab.

## Choose an allocation rule

Choose a rule based on your planning requirements: **Locking Rule**, **Distribution Rule**, or **Minmax Rule**.

:::image type="content" source="../media/planning-allocation-rules-controls/overview-allocation-rules-controls/allocation-rules-overview.png" alt-text="Screenshot of the Plan tab showing the Locking Rule, Distribution Rule, and Min-Max Rule commands above a planning sheet." lightbox="../media/planning-allocation-rules-controls/overview-allocation-rules-controls/allocation-rules-overview.png":::
