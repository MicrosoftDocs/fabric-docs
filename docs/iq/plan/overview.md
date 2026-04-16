---
title: What is plan (preview)?
description: Learn about the plan (preview) item, including its components, core features, and use cases.
ms.date: 03/12/2026
ms.topic: overview
#customer intent: As a user, I want to understand what plan is, including its components, key capabilities, use cases, and why to choose it.
---

# What is plan (preview)?

Plan (preview) is an Enterprise and Corporate Performance Management (EPM & CPM) solution built directly into Microsoft Fabric. It enables organizations to create, manage, and analyze plans such as budgets, forecasts, and scenarios within the same governed platform used for data, analytics, and AI.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

Plan brings together three integrated capabilities in a single unified suite:

* Planning for creating and managing plans such as budgets, forecasts, and scenarios
* PowerTable for data management and data applications
* Intelligence for integrated reporting and insights

By planning directly in Microsoft Fabric, plan removes the need for separate planning tools or spreadsheet‑based workflows. Organizations can bring goals, plans, and actual results together on shared semantic models, making it easier to move from manual planning to continuous, data‑driven decisions.

By combining historical data, real-time signals, and future projections in a single environment, plan creates an AI‑ready foundation for smarter decisions.

To learn which regions support plan during preview, see [Region availability for plan (preview)](overview-regions.md).

> [!NOTE]
> The preview of plan in Fabric IQ is now accessible to organizations worldwide in Microsoft Fabric as part of the Microsoft Fabric SKU, and new meters have been created. Meters are currently available but are not currently billed.

## Why use plan?

Traditional enterprise planning typically relies on multiple tools:

* BI platforms for reporting on historical data
* Separate planning or CPM tools for forecasts and budgets
* Spreadsheets for modeling and scenario analysis

This fragmented approach introduces data silos, manual reconciliation, delayed insights, and governance challenges.

Plan addresses these challenges by bringing planning directly into Fabric.

Plan allows organizations to:

* Perform enterprise planning, scenario modeling, and what-if analysis
* Model and integrate budgets and forecasts 
* Automatically write planning results back to a SQL database in Fabric
* Unify goals, plans, and actuals on a shared semantic model 
* Manage forward-looking reference data 
* Perform variance reporting and analysis 
* Operate entirely within a single, governed Fabric environment

Historical data, real-time signals, and future projections are combined in one platform, using consistent definitions and governed access.

### Unified data foundation

Plan is built on Fabric semantic models, ensuring that planning and analytics share the same trusted business logic.

With plan, organizations can combine:

* Historical data from Fabric analytics
* Real-time or refreshed operational data
* Future projections and assumptions

Because plans are stored and governed in Fabric, they remain aligned with enterprise reporting and downstream analytics.

### Designed for business users and the enterprise

Plan is designed to be accessible to business users while meeting enterprise requirements.

These are the benefits for business users:

* Native experience inside Fabric
* No code/low code interactions
* Familiar Excel-like interface

These are the benefits for enterprises:

* Centralized governance
* Security and access controls
* Scalability for large planning models
* Alignment with Fabric administration and compliance standards

This balance enables finance teams and business stakeholders to participate directly in planning without heavy IT dependency.

## Core components of plan

Plan consists of four primary components that support end-to-end planning workflows.

### Planning sheets

Planning sheets are used for budgeting, forecasting, and scenario modeling. They allow users to define assumptions, inputs, and calculated outcomes in a familiar, spreadsheet‑like experience.

### PowerTable sheets

PowerTable sheets enable structured planning at scale. They support large, dimensional planning models aligned with Fabric data structures and semantic models.

### Intelligence sheets

Intelligence sheets provide analytical insights and automated variance analysis over planning data. They help users understand variances, trends, and forward‑looking implications.

### InfoBridge

InfoBridge connects and integrates data across systems, ensuring planning data stays aligned with Fabric workloads and source systems.

Plan extends Microsoft Fabric beyond analytics into enterprise decision intelligence. By embedding planning directly into Fabric, organizations can unify data, analytics, and planning in a single platform, reducing manual effort, improving alignment, and enabling proactive, AI-assisted decision-making.

## Enable required tenant setting

This setting is **required** to create plan (preview) items: *Users can create Plan (preview) items*.

:::image type="content" source="media/overview/prerequisite-plan.png" alt-text="Screenshot of enabling plan in the admin portal." lightbox="media/overview/prerequisite-plan.png":::

If you don't enable this setting, you get errors when creating a new plan item.

## Next steps

Explore the components of plan in more detail:
* [Planning sheets](planning-overview.md)
* [PowerTable sheets](powertable-overview.md)
* [Intelligence sheets](intelligence-overview.md)
* [InfoBridge](infobridge-overview.md)