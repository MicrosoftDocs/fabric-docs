---
title: Measure Model for Planning
description: Learn about the concept of measure model as Plan's semantic enrichment framework that creates measure hierarchy.
#customer intent: As a finance business user, I want to understand how to create a measure hierarchy to perform calculations without help from IT.
ms.date: 08/07/2026
ms.topic: concept-article
---

# Measure Model - the semantic enrichment framework

Measure Model leverages the native intelligence of your existing, highly developed data models. Instead of forcing you to rebuild calculations, it imports your central corporate DAX measures and empowers business users to enrich and extend them directly within the Fabric Plan visual interface.

## How it works

It connects to your existing complex Semantic Models that hold DAX measures.

Fabric Plan treats each inherited DAX measure as a foundational baseline (or "Driver"), allowing users to build a layer of dynamic Visual Measures directly on top of them without touching the backend database code.

## Real-world example

Your underlying semantic model serves up a robust, governed DAX measure like *Revenue Actual*. Inside the Fabric Plan, a sales planner can instantly reference that measure to build a Visual Measure called *Revenue Forecast* for their upcoming sales planning cycle.

## Key concept

Every DAX Measure is a baseline Driver, enriched visually.

## Why planners choose measure-based modeling

### The "Extend, Don't Rebuild" paradigm

If your organization already invested heavily in a central BI semantic layer, you don't lose that work. You inherit those precise business logic rules and use them as the launching pad for your forecasting models.

### No-code planning agility

Finance and operational teams can create scenario-specific planning metrics (like What-If Forecasts or Target Overrides) visually within the tool, eliminating the need to wait for IT or BI engineers to write new DAX formulas in the backend.

### Seamless reporting and planning alignment

Because your Fabric Plan visual measures directly anchor to your central corporate DAX measures, your actuals and forecasts sit in perfect harmony, removing data discrepancies.

## Benefits of measure model

A measure model helps organizations:

- Organize measures into meaningful business hierarchies.
- Perform simulations at the measure level.
- Visualize the cascading impact of changes across measures and dimensions.
- Improve planning and decision-making with a consolidated hierarchical view of business performance.
