---
title: User Roles in Planning
description: Learn about user roles and actions in planning in Fabric, including capabilities of each role and how to upgrade roles.
ms.date: 06/23/2026
ms.topic: overview
---

# Roles in planning in Fabric

Planning roles provide a flexible, least-privilege access model for plan items. Instead of assigning fixed permissions, planning automatically adjusts your role based on the actions you perform. With dynamic role assignment, you start with the minimum required access and gain more capabilities only when necessary.

Planning supports three roles:

* *Viewer*: Has read-only access to consume and analyze plans, reference data, and dashboards. Viewers can explore data, filter information, and compare scenarios without modifying planning data or structures. This role is intended for executives and business users who consume plans, dashboards, and forecasts.
* *Stakeholder*: Can collaborate on plans by entering data and writing back values. Stakeholders can't permanently modify the structure of planning sheets. While they can temporarily customize layouts for analysis, planning doesn't persist these changes, and other users can't see them. This role is intended for business leads who enter data, validate assumptions, and approve plans. Stakeholders can also create and edit data apps and advanced reports.
* *Planner*: Acts as an author and modeler with administrative privileges and can create planning input structures. Planners can manage planning structures, configure business rules, manage writeback destinations, create forecasts and scenarios, and perform advanced planning operations. Planners can create master data, reports, and dashboards. This role is intended for FP&A teams and analysts who design models, run scenarios, and orchestrate the planning cycle.

> [!IMPORTANT]
> Planning treats creating or editing PowerTable sheets and intelligence sheets as Stakeholder persona activities. These actions no longer upgrade your session to the Planner persona.
> Planning assigns the Planner persona only when you create or edit planning sheets.

Role permission matrix:

| Workload | Viewer | Stakeholder | Planner |
|----------|:------:|:-----------:|:-------:|
| **Planning**<br>Budgets, forecasts, scenarios, allocations | Read | Contribute | Create |
| **PowerTable**<br>Reference and master data management | Read | Create | Create |
| **Intelligence**<br>Reports, dashboards, and analysis | Read | Create | Create |

Roles are flexible, and planning assigns them dynamically through time-bound sessions based on your actions. Roles adapt in real time based on how you contribute, without manual role reassignment.

## Relationship between Fabric workspace roles and planning roles

Fabric workspace roles and planning roles are independent and serve different purposes. Fabric workspace roles determine your ability to access and manage workspace items. Planning roles determine the actions you can perform within a plan item.

Recommended Fabric workspace role mapping:

| Planning persona | Fabric workspace role          |
| ---------------- | ------------------------------ |
| Viewer           | Viewer                         |
| Stakeholder      | Viewer, contributor, or member |
| Planner          | Admin, member, or contributor  |

This recommendation helps ensure that:

* Fabric enforces row-level security (RLS) and semantic model security rules correctly.
* You see only the data you have permission to access.
* Stakeholders and Viewers can't enter report edit mode.
* Planning templates and report structures stay safe from unintended modifications.

## Dynamic role assignment

Planning assigns planning roles dynamically based on user activity. You typically begin in a Viewer session. As you perform actions that require extra privileges, planning automatically upgrades you to the appropriate role.

Examples:

| User action                                                             | Resulting role          |
| ------------------------------------------------------------------------| ------------------------|
| Open and view a planning sheet                                          | Viewer                  |
| Enter data, write back values, participate in approvals, or collaborate | Stakeholder             |
| Edit plan items or perform authoring operations                     | Planner                 |

With this dynamic model, administrators don't need to manually manage role assignments.

## Upgrade roles

Upgrade your planning role by performing an action that requires Planner or Stakeholder permissions, or upgrade the role manually.

### Check current role

The planning toolbar shows your assigned role. Select the role indicator to display additional information, including current session type, session expiration details, and capabilities of the current role.

:::image type="content" source="media/overview-roles/check-role.png" alt-text="Screenshot of the planning role assigned to the current user and the capabilities of the role." lightbox="media/overview-roles/check-role.png":::

### Role sessions

Planning roles operate through time-bound sessions. Planning creates a session when you perform a planning action, such as opening a planning sheet.

Each session remains active for 30 days. When you perform an action that requires a higher privilege level, planning automatically creates a new session for the upgraded role.
Role sessions help organizations implement least-privilege access while letting you transition between planning responsibilities.

### Upgrade prompts

Administrators can control whether planning prompts users before a role upgrade occurs. To display upgrade notifications, in **Workspace settings**, go to **Plan**, and enable **Prompt on Session Upgrade**.

> [!NOTE]
> Creating a new plan item automatically upgrades your session to Planner. Because item creation requires Planner capabilities, no warning or confirmation prompt appears.

* **Prompt enabled**: When enabled, you receive a notification before planning upgrades the role and can choose whether to proceed.
* **Prompt disabled**: When disabled, role upgrades occur automatically when you perform a qualifying action. Upgrade prompts are disabled by default.

### Role lifecycle

**Role upgrades:** Planning assigns roles dynamically based on user actions through time‑bound sessions. Role upgrades occur when you perform valid planning actions. You can upgrade roles only to a higher privilege level:
   * Planning can upgrade a Viewer to a Stakeholder.
   * Planning can upgrade a Stakeholder to a Planner.
     
**Role downgrades:** Planning doesn't support manual downgrades within an active session.

**Session expiry:** Each session automatically expires after 30 days. After the 30-day session expires, a new session begins only when you perform a new action on a plan item. The first successful action determines the persona for the new session:
   * If you only open and view a plan item, the new session starts as a Viewer session.
   * If you perform a Planner-level action (for example, create a new planning sheet or write back data), the new session starts as a Planner session. Each new session inherits its role from your first successful activity.

## Capabilities by role

### Formatting and layout

| Capability | Planner | Stakeholder | Viewer |
|---|---|---|---|
| Change the layout | ✅ | ✅ | ✅ |
| Sort, search, filter, rank, and bookmark planning sheets | ✅ | ✅ | ✅ |
| Enable totals and subtotals | ✅ | ✅ | ✅ |
| Number formatting—convert to percentage, change scaling, and adjust decimal places | ✅ | ✅ | ✅ |
| Change the font style | ✅ | ✅ | ✅ |
| Change value alignment in cells | ✅ | ✅ | ✅ |
| Enable the ruler | ✅ | ✅ | ✅ |
| Configure conditional formatting | ✅ | | |
| Apply semantic formatting | ✅ | | |
| Undo/redo and reset formats, values, notes, header order, and row order | ✅ | | |
| Pivot data | ✅ | ✅ | |
| Add language translations | ✅ | | |
| Add page breaks and enable row highlights, gridlines, and table outline | ✅ | | |

### Data input, forecasting, and what-if analysis

| Capability | Planner | Stakeholder | Viewer |
|---|---|---|---|
| Insert rows | ✅ | ✅ | |
| Insert calculated and data input columns | ✅ | | |
| Enter values and distribute them to lower levels in the dimensional hierarchy | ✅ | ✅ | |
| Bulk edit values | ✅ | ✅ | |
| Extend time for data input fields | ✅ | | |
| Create and manage forecasts | ✅ | | |
| Close forecast periods, reforecast, and distribute deficits | ✅ | | |
| Insert simulation measures | ✅ | ✅ | |
| Create scenarios, update settings, copy to base, bulk edit, select input method, and pivot | ✅ | ✅ | |
| Compare scenarios | ✅ | ✅ | ✅ |
| Use Optimizer | ✅ | ✅ | |
| Use model builder | ✅ | | |
| Create locking, distribution, and min/max rules | ✅ | | |

### Writeback and export

| Capability | Planner | Stakeholder | Viewer |
|---|---|---|---|
| Export plans to Excel or PDF files | ✅ | ✅ | |
| Add and manage destinations | ✅ | | |
| Write back and save planning data | ✅ | ✅ | |
| Enable autowriteback | ✅ | | |
| Select the writeback type, create writeback filters, and rename columns | ✅ | | |
| View writeback logs | ✅ | ✅ | |
| Export writeback logs | ✅ | | |
| Writeback scenarios and view logs | ✅ | ✅ | |
| Add destination to writeback scenarios | ✅ | | |

### Commenting and collaboration

| Capability | Planner | Stakeholder | Viewer |
|---|---|---|---|
| Add notes | ✅ | ✅ | |
| Add and assign comments, tag users, and enable the comments column | ✅ | ✅ | |
| Add report-level comments | ✅ | ✅ | |
| Edit comments settings | ✅ | | |
| Enable the comments pane to view all comments | ✅ | ✅ | |

### Build planning models

| Capability | Planner | Stakeholder | Viewer |
|---|---|---|---|
| Connect the planning workspace directly to enterprise semantic models in Power BI/Fabric | ✅ | | |
| Browse the organizational semantic model catalog (metadata) natively within the planning interface | ✅ | | |
| Create planning, PowerTable, and intelligence sheets | ✅ | | |
| Visualize planning sheets with Intelligence | ✅ | | |
| Import and save data from internal sources such as Planning and PowerTable sheets, as well as external sources such as CSV, Excel, and JSON | ✅ | ✅ | |

### PowerTable

> [!NOTE]
> For plan items that contain only PowerTable sheets, only the Stakeholder and Viewer roles are available.

| Capability | Stakeholder | Viewer |
|------------|:-----------:|:------:|
| Browse reference data and PowerTable grids. | ✅ | ✅ |
| Build and edit no-code reference data apps. | ✅ |  |
| Integrate multilevel approval workflows. | ✅ |  |
| Configure event-driven automation. | ✅ |  |
| Control row and column access permissions. | ✅ |  |
| Integrate with planning and intelligence. | ✅ |  |
| Participate in approval workflows. | ✅ |  |
| Fill data collection forms. | ✅ |  |
| Update status and contribute project and time entries. | ✅ |  |

### Intelligence

> [!NOTE]
> For plan items that contain only intelligence sheets, only the Stakeholder and Viewer roles are available.

| Capability | Stakeholder | Viewer |
|------------|:-----------:|:------:|
| View intelligence sheets in read-only mode. | ✅ | ✅ |
| Build and edit dashboards and reports. | ✅ |  |
| Perform ad-hoc analysis. | ✅ |  |
| Use more than 100 chart types in dashboards. | ✅ |  |
| Run plan vs. actual variances. | ✅ |  |
| Use annotations. | ✅ |  |
| Filter data. | ✅ |  |
| Apply bookmarks. | ✅ |  |

## FAQs

### Can I share roles across capacities?

No. Each capacity evaluates roles independently.

### Can I downgrade roles?

No, planning doesn't support downgrades. You can only upgrade roles to higher privilege levels; however, your assigned role automatically expires after 30 days.

### What happens when my role session expires?

The next time you interact with a plan item, planning creates a new session. Your first successful action determines the role for the new session.

### Do planning roles affect Fabric workspace permissions?

No. Planning roles and Fabric workspace roles are independent security models that Fabric evaluates separately.
