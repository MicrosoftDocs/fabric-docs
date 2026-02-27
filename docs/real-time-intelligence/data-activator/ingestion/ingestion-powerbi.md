---
title: Activator ingestion from Power BI
description: Learn how Activator ingests data from Power BI semantic models, including query frequency, object mapping, and time handling.
ms.topic: concept-article
ms.date: 02/27/2026
---

# Ingestion from Power BI

This article explains how Activator ingests data from Power BI. Understanding this is useful for understanding how rules created from Power BI behave. For step-by-step instructions on creating a rule from a Power BI visual, see [Create a rule from Power BI](../activator-get-data-power-bi.md).

## How it works

Power BI is a **query data source** for Activator. Activator creates rules by connecting to the semantic model that backs a Power BI visual, periodically querying it, and evaluating your rules against the results.

When you create an Activator rule from a Power BI visual, Activator uses the query that the visual already runs against its semantic model. For example, a visual that shows sales by product per day runs a query that returns a dimension (product), a measure (sales), and a time dimension (day). Activator reuses that same query to pull data for rule evaluation.

Activator converts the columns returned by the visual's query into objects and properties. Using the sales by product per day example:

- The **dimension** (product) becomes an **object** in Activator: one object is created for each product.
- The **measure** (sales) becomes a **property** on that object: Activator tracks the value of sales for each product over time.
- The **time dimension** (day) becomes the **event time**: Activator uses it as the timestamp for each recorded value of the sales property.

### How Activator handles time

How Activator timestamps your data depends on whether the visual includes a time dimension.

- **Visuals with a time dimension**: Activator uses the time dimension from the visual's query as the event time, as described above. Each value is read once: if the semantic model later updates the value for an already-read time point, Activator does not re-read it. Continuing the sales by product per day example, once Activator reads the sales figure for a given day, that value is final, even if the semantic model subsequently recalculates it.
- **Visuals without a time dimension**: Some visuals have no time axis (for example, a KPI card showing total sales). In this case, Activator uses the ingestion time (that is, the moment it queries the semantic model) as the timestamp for each recorded value.

### How Activator handles table visuals

For rules created from table visuals, Activator treats each row in the table as the state of an object at a point in time, and your rule runs against every row.

- **Objects**: Activator combines all dimension columns in the table into a single object key. Each unique combination of dimension values becomes one object.
- **Time**: You can optionally nominate a column as the time dimension. If you do, Activator uses that column's value as the timestamp for each row. If you don't, Activator uses the ingestion time, just as it does for chart visuals without a time dimension and re-reads every row on each query.

### Activator queries the semantic model directly

Activator makes a copy of the visual's underlying query at the time you create your rule. It then repeatedly runs that query directly against the semantic model, not against the Power BI report or visual.

This has two important implications:

- Changes to the Power BI report after the rule is created (such as editing the visual, changing filters, or republishing the report) have no effect on the rule.
- You can delete the Power BI report entirely. The Activator rule continues to run because it queries the semantic model directly.

> [!NOTE]
> If you want to update the query that an Activator rule uses, you need to delete the rule and recreate it from the updated visual.

### Query frequency

By default, Activator queries the semantic model once per hour. You can change the query frequency in the data source settings for the rule.

> [!TIP]
> Choose a query frequency that matches how often the data in your semantic model changes. Querying more frequently than the semantic model refreshes provides no benefit and may increase load on the model.
