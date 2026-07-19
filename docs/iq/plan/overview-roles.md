---
title: User Roles in Plan (Preview)
description: Learn about user roles and actions in plan (preview), including capabilities of each role and how to upgrade roles.
ms.date: 06/23/2026
ms.topic: overview
---

# Roles in Fabric plan (preview)

Planning roles provide a flexible, least-privilege access model for planning items. Instead of assigning fixed permissions, plan automatically adjusts your role based on the actions you perform. With dynamic role assignment, you start with the minimum required access and gain more capabilities only when necessary.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

Plan supports three roles:

* *Viewer*: Has read-only access to consume and analyze plans. Viewers can explore data, filter information, and compare scenarios without modifying planning data or structures.
  
* *Stakeholder*: Can collaborate on plans by entering data and writing back values. Stakeholders can't permanently modify the structure of planning sheets. While they can temporarily customize layouts for analysis, plan doesn't persist these changes, and other users can't see them.

* *Planner*: Acts as an author and modeler with administrative privileges and can create planning input structures. Planners can manage planning structures, configure business rules, manage writeback destinations, create forecasts and scenarios, and perform advanced planning operations.

Roles are flexible, and plan assigns them dynamically through time-bound sessions based on user actions. Roles adapt in real time based on how users contribute, without manual role reassignment.

## Relationship between Fabric workspace roles and planning roles

Fabric workspace roles and planning roles are independent and serve different purposes. Fabric workspace roles determine your ability to access and manage workspace items. Planning roles determine the actions you can perform within a planning item.

> [!TIP]
> As a best practice, also assign the Fabric workspace Viewer role to users with the Viewer or Stakeholder role in plan.

Recommended Fabric workspace role mapping:

| Planning persona | Fabric workspace role          |
| ---------------- | ------------------------------ |
| Viewer           | Viewer                         |
| Stakeholder      | Viewer                         |
| Planner          | Admin, member, or contributor  |

This recommendation helps ensure that:

* Fabric enforces Row-Level Security (RLS) and semantic model security rules correctly.
* Users see only the data they have permission to access.
* Stakeholders and Viewers can't enter report edit mode.
* Planning templates and report structures stay safe from unintended modifications.

## Dynamic role assignment

Plan assigns planning roles dynamically based on user activity. Users typically begin in a Viewer session. As users perform actions that require extra privileges, plan automatically upgrades them to the appropriate role.

Examples:

| User action                                                             | Resulting role          |
| ------------------------------------------------------------------------| ------------------------|
| Open and view a planning sheet                                          | Viewer                  |
| Enter data, write back values, participate in approvals, or collaborate | Stakeholder             |
| Edit planning items or perform authoring operations                     | Planner                 |

With this dynamic model, administrators don't need to manually manage role assignments.

## Capabilities by role

### Formatting and layout

| Capability | Planner | Stakeholder | Viewer |
|---|---|---|---|
| Change the layout | ✅ | ✅ | ✅ |
| Sort, search, filter, rank, and bookmark planning sheets | ✅ | ✅ | ✅ |
| Enable totals and subtotals | ✅ | ✅ | ✅ |
| Number formatting—convert to percentage, change scaling, adjust decimal places | ✅ | ✅ | ✅ |
| Change the font style | ✅ | ✅ | ✅ |
| Change value alignment in cells | ✅ | ✅ | ✅ |
| Enable ruler | ✅ | ✅ | ✅ |
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
| Create Planning, PowerTable, and Intelligence sheets | ✅ | | |
| Visualize Planning sheets with Intelligence | ✅ | | |
| Import and save data from internal sources such as Planning and PowerTable sheets, as well as external sources such as CSV, Excel, and JSON | ✅ | ✅ | |

## FAQs

**Q:** **Can you share roles across capacities?**

**A:** No. Each capacity evaluates roles independently.

**Q:** **Can I manually change my role?**

**A:** Plan automatically assigns roles based on your actions. To upgrade a role, select the role and then select the **Upgrade session** button.

**Q: Can you downgrade roles?**

**A:** No, plan doesn't support downgrades. You can only upgrade roles to higher privilege levels; however, your assigned role automatically expires after 30 days.

**Q: What happens when my role session expires?**

**A**: The next time you interact with a planning item, plan creates a new session. Your first successful action determines the role for the new session.

**Q: Do planning roles affect Fabric workspace permissions?**

**A**: No. Planning roles and Fabric workspace roles are independent security models that Fabric evaluates separately.
