---
title: PowerTable sheets in plan (preview)
description: Learn about the PowerTable sheets component of the plan (preview) item, including its core features and business use cases. Understand how to get started building collaborative data applications.
ms.date: 03/11/2026
ms.topic: overview
#customer intent: As a user, I want to know what is PowerTable, its key capabilities, and an overview of the steps to get started.

---

# What are PowerTable sheets in plan (preview)?

The *PowerTable sheets* component of plan (preview) is a no-code reference and master data management and productivity app platform in Microsoft Fabric. It enables users to build collaborative table apps directly from database tables and semantic models without writing code.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

PowerTable sheets provide an Excel-like editing experience combined with enterprise data governance. With this, users can quickly create, update and manage structured data while maintaining live synchronization with the underlying database.

You can use PowerTable sheets for structured data entry, reference data management, collaborative planning, operational workflow management, project planning and execution, and automation directly within the data platform. All modifications are written back to the source system to maintain operational data synchronization.

## Why use PowerTable sheets?

Organizations frequently rely on spreadsheets, disconnected tools, or custom data applications to manage operational data. These approaches create challenges such as lack of governance, data silos, inconsistent change tracking, and manual workflow monitoring.

PowerTable sheets address these challenges by enabling teams to build governed data applications **directly on enterprise data platforms**. It allows organizations to manage operational data, approvals, and automation while keeping analytics and operations connected.

## Key capabilities

The following table lists the core capabilities of PowerTable sheets.

| Capability | Description |
|---|---|
| **Build without code** | - Instant table apps from the database with live sync <br>- Drag-and-drop interface builder <br>- Excel-like editing experience <br>- Forms, filters, and custom views <br>- Lookups and calculated columns |
| **Collaborate seamlessly** | - Multi-user concurrent editing <br>- Approval workflows and governance <br>- Comments, `@mentions`, and threads <br>- Notifications through email and Microsoft Teams <br>- Shareable bookmarks |
| **Plan and execute** | - Project Gantt charts <br>- Resource allocation views <br>- Time tracking and time sheets <br>- Task management and status tracking <br>- Automated triggers and webhooks |
| **Control and audit** | - Enterprise-grade permissions <br>- Full change history and audit logs <br>- Row-level and column-level security <br>- Compliance-ready support for Type II SCD <br>- Integration with OneLake for analytics |

## Overview of PowerTable sheet steps

### Prerequisites

Before you begin, make sure that you have the following prerequisites in place:

* A **Fabric SQL database** to store the app metadata.
* [Connections or data sources](../../data-factory/data-source-management.md) established to the **Fabric SQL database** and the **semantic model**.

### Create a PowerTable sheet

Follow these steps to get started with PowerTable sheets:

1. **Create a plan**: Create a plan (preview) item in your Fabric workspace.
1. **Create a PowerTable sheet**: [Create a new PowerTable sheet](powertable-how-to-create-table-app.md#create-a-powertable-sheet) inside the plan.
1. **Create a table**: Connect to data to [create a table](powertable-how-to-create-table-app.md#create-a-table). You can create your table in the following ways:

    * Connect to an existing database
    * Upload Excel or CSV file
    * Type data directly into the PowerTable sheets
    * Connect to a semantic model

1. **Configure Columns**: Configure the table columns and their properties. While PowerTable sheets automatically detect column properties, you can modify them as required.
1. **Save changes to the source**: Your table app is ready. You can now read and write on your table app and synchronize the changes back to the source.

## Next steps

Connect PowerTable sheets to your data with the steps in the following articles:

* [Create a table app with PowerTable sheets](powertable-how-to-create-table-app.md)
* [Connect to semantic model](powertable-how-to-connect-semantic-model.md)