---
title: Planning in Fabric Billing and Pricing Model
description: The Billing Model for Planning in Fabric uses an active-session, capacity-based pricing model that aligns costs with actual usage. Learn how role-based and session billing work.
ms.date: 09/11/2026
ms.topic: concept-article
---

# Billing and usage for planning in Fabric

Planning in Fabric uses a session-based pricing model where you pay for active 30-day user sessions rather than fixed per-user licenses.

Key benefits include:

* Pay only for active user sessions.
* Allow occasional users, such as budget reviewers and approvers, to participate without purchasing dedicated licenses.
* Share unused capacity with other Microsoft Fabric workloads.
* Use eligible Microsoft Azure Consumption Commitment (MACC) credits for Fabric capacity.
* Avoid license commitment and administration.

> [!NOTE]
> To understand planning consumption and charges, review the data at the capacity level, as this is the level at which billing is calculated and reported.
>
> The workspace name "Planning" shown in the billing data doesn't represent an actual workspace created in your tenant. The reported numbers reflect billed Planner, Stakeholder, and Viewer sessions. To support capacity-level reporting, the workspace and artifact fields are populated with the value "Planning". These fields shouldn't be interpreted as actual workspace or artifact names.

## User roles in Fabric Planning

Planning in Fabric defines three user roles with different capabilities and capacity consumption.

* **Planner**: Builds and manages planning models, configures business rules, creates and administers plan items.
* **Stakeholder**: Enters and approves data, collaborates with business users, creates scenarios, builds reports and dashboards, performs analysis, and manages reference data applications.
* **Viewer**: Accesses plan items, dashboards, and reports in read-only mode with support for filtering, sorting, and bookmarks.

For more information, see [Roles in Fabric planning](../overview-roles.md).

## Billing rates

Capacity consumption depends on the user's assigned role over a 30-day session.

| User role                                                  | 30 day consumption rate |
| ---------------------------------------------------------- | ----------------------- |
| <p>Planner<br>FP\&A analysts, modelers, administrators</p> | 847 CU-hour             |
| <p>Stakeholder<br>Business users, reviewers, approvers</p> | 168 CU-hour             |
| <p>Viewer<br>Executives and report consumers</p>           | 37 CU-hour              |

Use the [Fabric Planning Capacity Estimator](https://community.fabricplan.com/capacity-pricing/) to estimate capacity requirements for your deployment.

## How active sessions work

* **Trigger**: A session starts when a user opens, creates, or edits a planning item.
* **Duration**: Once active, a session lasts 30 days (730 hours) and can't end early.
* **Scope**: Sessions are tracked per unique combination of tenant + user + capacity.
* **Role Changes**: Upgrading a role prorates the existing session and starts billing at the higher tier. Downgrades take effect only after the current session expires.

## Additional capacity usage

Automation jobs and connected planning workloads consume capacity independently of user sessions. Account for job-based CU consumption and extra capacity for Microsoft Fabric workloads outside planning in Fabric.

### Automation jobs and connected planning

Automation jobs in PowerTable and connected planning instances in Infobridge are billed independently of user sessions.

* Each successful automation job consumes **2 CU**.
* Failed jobs aren't billed.
* Job billing applies regardless of the user's role.

For more information, see [PowerTable automation](../powertable-concept-automation.md) and [connected planning in Infobridge](../infobridge-concept-connected-planning.md).

### Fabric workloads

Microsoft Fabric services outside Fabric planning, such as Fabric SQL, OneLake, Power BI XMLA operations, and other native Fabric workloads consume capacity separately. Reserve extra capacity to support these workloads. Consider an estimated **30% capacity buffer**, although actual usage varies by deployment.

## FAQs

### What triggers a billing session?

A session starts when you open or engage with an existing plan item (in edit mode or reading view), or create a new plan item, assign data, and save it.

### How long does a session last?

Each session runs for 730 hours, equivalent to a 30-day month. Any users assuming the same role, under the same tenant and capacity returning within the 30 day period will not start a new session.

### Can you stop a session before 30 days?

No. After a session starts, it remains active for the full 30 days, and you can't end it manually. If your role is upgraded during the session, billing for the previous role stops, and billing continues at the higher role.

### What happens when a session ends?

When the 30-day period expires, a new session starts the next time you engage with a planning item. The assigned role depends on the action.

### What if your role changes mid-session?

You can upgrade your role (for example, from Viewer to Stakeholder or from Stakeholder to Planner), but you can't downgrade your role within an active session. When you upgrade your role, the earlier session closes and is prorated, and billing continues at the higher-tier rate.

### What if I work across multiple capacities?

Each unique combination of tenant, user, and capacity creates a separate session that's billed independently. If you work across two capacities, you have two active sessions.

### What if multiple workspaces share the same capacity?

If you assign the same capacity to multiple workspaces, you're billed at the highest role tier active across all workspaces under that capacity. Billing is calculated using the combination of Tenant ID, Capacity ID, User ID, and Session Type. A single user session can involve activity across multiple workspaces and artifacts, so the billing records aren't attributed to a specific workspace.

### Are automation jobs billed separately?

Yes. Automation jobs are billed at a fixed amount per completed job, regardless of whether a Planner, Stakeholder, or Viewer ran the job. Only successful jobs are billed; failed jobs aren't charged.

### What happens if the Fabric capacity is paused or deleted?

If a capacity is paused or deleted, the remaining CUs for any active 30-day Planner, Stakeholder, Viewer session(s) are summed and added to your Azure Bill. For more information, see [pause and resume your Fabric capacity](../../../enterprise/pause-resume.md).

### What happens if a planning item is deleted mid-session?

Active sessions continue to run and are billed through to the end of the 30 days, even if the planning item is deleted.

### What if the capacity runs out of credits before the session ends?

Sessions continue to be recorded even if the capacity is exhausted through other workloads. Credits aren't reserved exclusively for Fabric planning; billing continues periodically.

### What if too many users are assigned to a small-capacity SKU?

If the number of active sessions exceeds what the SKU supports, you overcommit the SKU. This condition is particularly relevant for smaller SKUs such as F2 and F4, as well as for capacities shared with other Fabric workloads. You might need to dynamically control the number of users assigned to a capacity to avoid overcommitting the SKU.
