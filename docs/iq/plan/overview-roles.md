---
title: User Roles in Plan
description: Learn about user roles and actions in plan, including capabilities of each role and how to upgrade roles.
ms.date: 08/24/2026
ms.topic: overview
---

# User roles and access management in Fabric Planning

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
| ---------- | :------: | :-----------: | :-------: |
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

### How workspace roles and tenant settings work together

Fabric workspace roles and tenant settings for Fabric Planning control different aspects of access:

- **Workspace roles** determine whether you can access and manage plan items in the workspace. For example, a user with the Viewer workspace role has read-only access to workspace items and can't edit a plan item.
- **Plan tenant settings** determine which users can upgrade to Planner or Stakeholder sessions. These settings don't grant workspace permissions.

For example, if a user has the Viewer workspace role and belongs to a security group that is allowed to upgrade to a Planner session, the user can upgrade to a Planner session when the required action is performed. However, the Planner session doesn't change the user's workspace role. The user can't edit a plan item unless their workspace permissions allow them to do so.

Similarly, allowing Stakeholder session upgrades doesn't grant a user access to a plan item that they can't access through their workspace permissions.

To perform an action, both the user's workspace permissions and the applicable planning role must allow the action.

## Dynamic role assignment

Planning assigns planning roles dynamically based on user activity. You typically begin in a Viewer session. As you perform actions that require extra privileges, planning automatically upgrades you to the appropriate role.

Examples:

| User action                                                             | Resulting role          |
| ------------------------------------------------------------------------| ------------------------|
| Open and view a planning sheet                                          | Viewer                  |
| Enter data, write back values, participate in approvals, or collaborate | Stakeholder             |
| Edit plan items or perform authoring operations                         | Planner                 |

With this dynamic model, administrators don't need to manually assign roles. However, they can control which users can upgrade to **Planner** and **Stakeholder** sessions. To learn more, see [Control session upgrades](#admin-settings-to-control-session-upgrades).

## Role upgrades

Upgrade your planning role by performing an action that requires Planner or Stakeholder permissions. Planning assigns roles dynamically based on user actions through time‑bound sessions. Role upgrades occur when you perform valid planning actions. You can upgrade roles only to a higher privilege level:
   * Upgrade from a Viewer to a Stakeholder.
   * Upgrade from a Stakeholder to a Planner.

> [!IMPORTANT]
> Planning doesn't support manual downgrades within an active session.

The planning toolbar shows your assigned role. Select the role indicator to display more information, including current session type, session expiration details, and capabilities of the current role. If you're in a Stakeholder session, you can switch to editing mode and perform a planner-level action such as creating a data input field or applying conditional formatting.

:::image type="content" source="media/overview-roles/planning-stakeholder-session-popup-reading-view.png" alt-text="Screenshot showing the Stakeholder badge and session details popup in a Planning sheet, with Reading mode selected." lightbox="media/overview-roles/planning-stakeholder-session-popup-reading-view.png":::

When you save your changes, your role automatically upgrades to Planner.

:::image type="content" source="media/overview-roles/planner-role-badge-session-details-popup.png" alt-text="Screenshot of the Planner badge in a Planning sheet toolbar with a popup showing Planner session capabilities, capacity, and session end date." lightbox="media/overview-roles/planner-role-badge-session-details-popup.png":::

### Role sessions

Planning roles operate through time-bound sessions. Planning creates a session when you perform a planning action, such as opening a planning sheet.

Each session remains active for 30 days. When you perform an action that requires a higher privilege level, planning automatically creates a new session for the upgraded role.
Role sessions help organizations implement least-privilege access while letting you transition between planning responsibilities.

Each session automatically expires after 30 days. After the 30-day session expires, a new session begins only when you perform a new action on a plan item. The first successful action determines the persona for the new session:
   * If you only open and view a plan item, the new session starts as a Viewer session.
   * If you perform a Planner-level action (for example, create or edit a planning sheet), the new session starts as a Planner session. Each new session inherits its role from your first successful activity.

## Admin settings to control session upgrades

Administrators can control which users can upgrade to **Planner** and **Stakeholder** sessions. They can also configure whether users receive a warning when creating or upgrading a session could result in capacity oversubscription.

The following tenant settings are available:

- [**Users can upgrade to a Planner session**](#users-can-upgrade-to-a-planner-session)
- [**Users can upgrade to a Stakeholder session**](#users-can-upgrade-to-a-stakeholder-session)
- [**Show Oversubscription Warning**](#show-oversubscription-warning)

:::image type="content" source="media/overview-roles/plan-session-upgrade-settings.png" alt-text="Screenshot of Plan settings page showing three enabled tenant settings for Planner session, Stakeholder session, and Oversubscription Warning." lightbox="media/overview-roles/plan-session-upgrade-settings.png":::

> [!NOTE]
> * **Capacity-level override**: All three settings are configured at the tenant level and can be overridden at the capacity level for individual capacities by using **Delegated Tenant Settings**. This feature allows capacity administrators to apply different plan settings to specific capacities based on their governance and capacity requirements.
>
> * Changes to tenant settings can take up to 30 minutes to reflect.

### Users can upgrade to a Planner session

Use this setting to manage who can upgrade to a Planner session. Administrators can enable or disable session upgrades for:

* The entire organization – Allows all users to upgrade to Planner sessions.
* Specific security groups – Restricts upgrade access to selected security groups.

> [!IMPORTANT]
> If the **Users can upgrade to a Planner session** setting is enabled, users automatically can upgrade to a Stakeholder session. If you enable Planner access for the entire organization, all users in the organization can also upgrade to a Stakeholder session.
> Administrators can grant Stakeholder access independently to specific users or security groups.

### Users can upgrade to a Stakeholder session

Use this setting to manage who can upgrade to a Stakeholder session. Administrators can enable or disable session upgrades for:

* The entire organization – Allows all users to upgrade to Stakeholder sessions.
* Specific security groups – Restricts upgrade access to selected security groups.

If upgrades are restricted to specific security groups, to upgrade to a Stakeholder session, users must either

* Belong to a security group configured for Stakeholder access, or
* Belong to a security group configured for Planner access.

Users who don't have either type of access can't create or edit plan items, enter data, write back changes, or collaborate. They can only access plan items in Reading view.

### Show Oversubscription Warning

Use this setting to alert users before an action leads to capacity oversubscription.

When enabled, a warning message appears before a user creates or upgrades a session that might exceed available capacity, helping them understand the impact before proceeding.

Options:
* On (Enabled): Displays the warning message when capacity might be oversubscribed.
* Off (Disabled): Suppresses the warning message.

> [!NOTE]
> This setting applies to the entire organization.

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
| Participate in approval workflows. | ✅ | ✅ |
| Fill data collection forms. | ✅ | ✅ |
| Update status and contribute project and time entries. | ✅ | ✅ |

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
