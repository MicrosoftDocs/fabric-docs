---
title: Allocation Rules and Data Input Controls in Planning
description: Allocation rules in planning apply business logic to planning data with distribution, min/max, and locking controls. Learn how each rule type works and when to use it.
ms.topic: concept-article
ms.date: 08/26/2026
---

# Allocation rules and data input controls in planning sheet

Rules help organizations apply consistent planning policies across planning sheets and reduce manual intervention. In planning sheet, use rules to apply business logic and controls to planning data. You can target rules to specific planning data, including measures, members, rows, columns, and periods.

Apply rules to control how values are distributed, define acceptable value ranges, and prevent users from changing values that should remain unchanged.

Planning supports three types of rules:

- **Distribution rules** control how values are allocated across members.
- **Min/max rules** define the acceptable range for planning values.
- **Locking rules** control which values users can modify.

## Why use rules?

Planning requires more than entering values into a planning sheet. Organizations need to apply business policies to distribute values consistently, keep values within acceptable limits, and protect approved or finalized data.

Rules apply these controls directly to planning data.

Use rules to:

- **Standardize planning** by applying consistent business logic.
- **Control data entry** by restricting values to defined limits.
- **Maintain hierarchical controls** by ensuring that changes at higher or lower levels remain within defined business rules.
- **Automate distribution** by allocating values across detailed members.
- **Protect important values** from accidental or unauthorized changes.
- **Support planning and forecasting** by controlling how users interact with planning values.
- **Reduce manual adjustments** by applying predefined business rules.

For example, an organization can use a distribution rule to allocate a total budget across departments, a min/max rule to keep departmental budgets within approved limits, and a locking rule to protect approved values from further changes.

## Distribution rules

A distribution rule controls how planning allocates a value from an aggregated level to its child members.

When a planner changes a value at a parent or total level, the distribution rule determines how planning allocates that value across the underlying members. This feature lets planners work with aggregated values without manually entering values at each detailed level.

### Distribution methods

Distribution rules can use different methods to determine how planning allocates a value.

**Equal distribution** allocates the value evenly across the applicable members. Use this method when each member should receive the same share of the value.

**Weighted distribution** allocates the value based on the relative weight of each member. The rule can derive weights from existing planning data for a defined period or range.

For example, suppose a planner enters a $1 million marketing budget at the company level. A weighted distribution rule can allocate the budget across regions based on existing sales values. A region with a larger share of sales receives a proportionally larger share of the budget.

### When to use distribution rules

Use distribution rules when:

- You want to apply the same allocation logic across planning cycles.
- The allocation should reflect an existing measure, such as revenue, sales, headcount, or volume.
- You want to reduce manual entry at detailed levels.
- Planners need to work with aggregated values while maintaining detailed planning data.

You can also target distribution rules to specific planning areas so that the rule affects only the intended measures, rows, columns, members, or periods.

## Min/max rules

A min/max rule defines the lowest and highest values that users can enter for a planning value.

The **minimum** defines the lowest permitted value, while the **maximum** defines the highest permitted value. These limits help keep planning and forecast values within predefined business boundaries. Planning validates updates against applicable rules across the hierarchy.

When you update a lower-level value, planning also validates the resulting higher-level value against its min/max rule. Similarly, when you update a higher-level value, planning validates the allocated values at lower levels against their applicable rules. If any rule is violated, planning prevents the update.

For example, an organization might define a minimum headcount of 10 and a maximum headcount of 50 for a department. The rule prevents planners from entering a value outside that range.

Min/max rules are useful when planning values must comply with approved thresholds, operational constraints, or business policies.

### When to use min/max rules

Use min/max rules when:

- A planning value must remain within an approved range.
- A business measure has a defined lower or upper limit.
- Forecast values shouldn't exceed established thresholds.
- You want to prevent unrealistic or invalid planning values.
- Different planning areas require different value limits.

For example, a company can define minimum and maximum spending limits for departments during budget planning. The rule keeps each department's spending within its approved range.

Min/max constraints can also help maintain valid values during distribution and forecasting.

## Locking rules

A locking rule controls whether users can modify planning values.

Use locking rules to protect values that users shouldn't change after they're finalized, approved, or loaded from a source system.

For example, you can lock approved budget values after the approval process is complete.

You can apply locking rules to specific planning areas, so editable and noneditable values can coexist within the same planning sheet.

### When to use locking rules

Use locking rules when:

- You need to protect approved budget or forecast values.
- Certain measures should remain read-only.
- Users shouldn't modify values during a controlled planning process.
- You need to prevent accidental changes to critical data.

Locking rules also support forecasting scenarios. For example, you can keep open forecast periods editable while protecting forecast values that should remain centrally controlled.

## Combining rules

You can combine different rule types to apply multiple controls to the same planning process.

For example, consider an annual expense planning process:

- A **distribution rule** allocates the total expense budget across departments based on historical spending.
- A **min/max rule** keeps each department's allocation within approved limits.
- A **locking rule** protects the approved values from further changes.

Together, these rules control both **how values are distributed** and **how users can interact with those values**.

## Rules and data integrity

Rules help maintain the integrity of planning data by ensuring that values follow predefined business requirements.

Without rules, planners might need to manually distribute values, check whether values fall within acceptable limits, or verify that approved values didn't change. Rules automate these controls and make planning more consistent.

The three rule types address different aspects of planning data:

| Rule | Controls | Example |
| --- | --- | --- |
| **Distribution rule** | How values are allocated | Distribute a total budget across departments based on sales |
| **Min/max rule** | What values users can enter | Keep headcount between 10 and 50 |
| **Locking rule** | Which values users can change | Prevent changes to approved budget values |
