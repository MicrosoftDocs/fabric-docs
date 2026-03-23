---
title: Planning sheets in plan (preview)
description: Learn about the Planning sheets component of the plan (preview) item for budgeting and forecasting.
ms.date: 03/11/2026
ms.topic: overview
#customer intent: As a user, I want to understand and use Planning sheets effectively.
---

# What are Planning sheets in plan (preview)?

The *Planning sheets* component of plan (preview) enables organizations to implement structured, collaborative, and data-driven planning processes within their enterprise data environment.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

A Planning sheet is a structured workspace in plan that allows users to enter, update, and analyze planning data across defined business dimensions such as time, department, account, or product. Planning sheets provide a controlled environment for budgeting, forecasting, and scenario analysis while ensuring that planning data follows organizational rules and governance policies.

The platform is designed for business users and features a no-code, self-service architecture.

## Why use Planning sheets?

Use Planning sheets to deliver **strategic business value** by helping your organization do the following:

* Improve forecast accuracy through data-driven planning
* Accelerate planning cycles with streamlined workflows
* Align cross-functional teams on shared plans and targets
* Maintain controlled governance and approval processes
* Reduce risks associated with manual spreadsheets

Planning sheets also provide **measurable operational outcomes**, including:

* Shortened budget and planning cycles
* Increased reliability of forecasts
* Reduced effort required for data reconciliation
* Improved auditability and compliance of planning processes.

### Where to use Planning sheets

Plans are used in several areas of the platform:

* **Budgeting**: Define annual or quarterly budgets.
* **Forecasting**: Update projections based on current performance.
* **Financial planning**: Model revenue, expenses, and profitability.
* **Operational planning**: Plan metrics such as sales targets or headcount.
* **Reporting and analysis**: Compare plan data with actual results in dashboards and reports.

## Key capabilities

The following table lists the core capabilities of Planning sheets.

| Capability | Description | Key features |
| --- | --- | --- |
| **Data exploration and analysis** | Enables users to interactively explore planning data to identify trends, patterns, and anomalies. | - Filtering and sorting data <br>- Top N ranking <br>- Hierarchy navigation <br>- Grouping rows and columns <br>- Adjustable column widths and layouts |
| **Planning and forecasting** | Supports enterprise planning workflows including budgeting, forecasting, and scenario analysis. | - Budget creation <br>- Forecast management <br>- Scenario analysis <br>- What-if simulations <br>- Rolling forecasts <br>- Version management and snapshots |
| **Business logic and calculations** | Allows users to define formulas, calculations, and custom logic directly in planning sheets. | - Insert data input rows <br>- Add template rows across hierarchy levels <br>- Create formula rows using Excel-style expressions <br>- Insert manual input columns <br>- Create calculated columns and measures <br>- Apply quick formulas for common calculations |
| **Data integration (InfoBridge)** | Integrates data from multiple sources to support unified planning and analytics workflows. | - Data consolidation from multiple sources <br>- Data transformations (merge, append, pivot, group) <br>- Real-time data integration <br>- Data mapping between planning sheets |
| **Collaboration and comments**  | Enables team collaboration and review directly within the planning interface. | - Notes and annotations <br>- Comment threads <br>- `@mentions` <br>- Email notifications <br>- Comment digests |
| **Write-back and data storage** | Allows planning inputs to be written back to external systems for persistence and integration. | - Multiple destination support <br>- Write-back logs and monitoring <br>- Secure data persistence <br>- Integration with enterprise data platforms |
| **Approval workflows** | Provides governance for planning cycles through structured approval processes. | - Define approval flows <br>- Assign approvers <br>- Review and approve planning changes <br>- Request adjustments |
| **Model editor** | Defines and manages the structure of a planning model by configuring dimensions, measures, hierarchies, and calculations | - Map model components to data sources <br>- Validate model configuration before deployment <br>- Maintain centralized governance of the planning model <br>- Define hierarchies for roll-ups and drill-down analysis |
| **Cube** | Organizes and stores planning data in a multidimensional data structure. | - Analyze data across multiple dimensions <br>- Aggregate data across hierarchy levels <br>- Process large volumes of planning data efficiently |      

## Overview of Planning sheet steps

### Prerequisites

Before you create a Planning sheet, make sure that you have the following prerequisites in place:
* A **Fabric SQL database** to store the app metadata.
* [Connections or data sources](../../data-factory/data-source-management.md) established to the **Fabric SQL database** and the **semantic model**.

### Create a Planning sheet

Follow these steps to get started with Planning sheets:

1. **Create a Planning sheet**: Connect the Planning sheet to a semantic model and configure the layout.
1. **Define planning structure**: Add rows, columns, measures, and hierarchies required for the planning model.
1. **Add calculations and logic**: Insert formulas, calculated measures, or manual input columns.
1. **Perform planning**: Enter budget or forecast values and analyze plan vs. actual results.
1. **Collaborate and review**: Use comments, annotations, and approval workflows to review planning data.
1. **Write back data**: Save finalized planning data to configured destinations.

## Next steps

To create your first Planning sheet, see [Get started with Planning sheets](planning-how-to-get-started.md).