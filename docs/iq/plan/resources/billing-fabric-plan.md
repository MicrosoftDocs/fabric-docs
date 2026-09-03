---
title: Planning in Fabric Billing and Pricing Model
description: Planning in Fabric billing uses an active-session, capacity-based pricing model that aligns costs with actual usage. Learn how role-based and session billing work.
ms.date: 07/23/2026
ms.topic: concept-article
---

# Billing and usage for planning in Fabric

Planning in Fabric uses an active-session, capacity-based pricing model that aligns licensing costs with actual product usage. You pay for a session only when a user actively engages with a plan item, so your organization can avoid fixed per-user license commitments and optimize capacity utilization. A session stays active for 30 days once started.

[!INCLUDE [Fabric feature-preview-note](../../../includes/feature-preview-note.md)]

Key benefits include:

* Pay only for active user sessions.
* Allow occasional users, such as budget reviewers and approvers, to participate without purchasing dedicated licenses.
* Share unused capacity with other Microsoft Fabric workloads.
* Use eligible Microsoft Azure Consumption Commitment (MACC) credits for Fabric capacity.
* Avoid license commitment and administration.

## User roles

Planning in Fabric defines three user roles with different capabilities and capacity consumption.

* **Planner**: Builds and manages planning models, configures business rules, creates and administers plan items.
* **Stakeholder**: Enters and approves data, collaborates with business users, creates scenarios, builds reports and dashboards, performs analysis, and manages reference data applications.
* **Viewer**: Accesses plan items, dashboards, and reports in read-only mode with support for filtering, sorting, and bookmarks.

For more information, see [Roles in planning in Fabric (preview)](../overview-roles.md).

## Role-based billing

Planning in Fabric uses role-based billing. Capacity consumption depends on your role, and planning bills it per active 30-day session. Billing aligns with business roles at different CU-per-hour rates. Planning also bills automation jobs separately. Additional Microsoft Fabric workloads consume capacity independently.

Use the [Planning in Fabric Capacity Estimator](https://community.fabricplan.com/capacity-pricing/) to estimate capacity requirements for your deployment.

> [!NOTE]
> Microsoft Fabric services outside planning, such as Fabric SQL, OneLake, Power BI XMLA operations, and other native Fabric workloads consume capacity separately.
>
> Reserve additional capacity to support these workloads. Consider an estimated **30% capacity buffer**, although actual usage varies by deployment.

| User role       |  30 day consumption rate |
| ----------------- |----------------------- |
| Planner <br> FP&A analysts, modelers, administrators | 847 CU           |
| Stakeholder <br> Business users, reviewers, approvers   | 168 CU     |
| Viewer <br> Executives and report consumers    | 37 CU     |

## Session billing

A session starts when a user first interacts with a planning workflow. Each unique combination of user, workspace, and tenant has a separate session. When a user switches to a different workspace or tenant, a new session starts automatically.

> [!NOTE]
> If a user downgrades to a lower capacity, their assigned role remains unchanged and continues to be valid until the current 30-day session expires.

* A session remains active for 30 days, regardless of whether you delete or pause the capacity.
* Billing reflects the highest active role assigned to the user for the tenant and Fabric capacity.
* Sessions don't renew automatically unless the user starts a new session.

## Job billing

Automation jobs in PowerTable and connected planning instances in Infobridge are billed independently of user sessions.

* Each successful automation job consumes **2 CU**.
* Failed jobs aren't billed.
* Job billing applies regardless of the user's role.

For more information, see [PowerTable automation](../powertable-concept-automation.md) and [connected planning in Infobridge](../infobridge-concept-connected-planning.md).

## FAQs

### What triggers a billing session?

A session starts when you open or engage with an existing plan item (in edit mode or reading view), or create a new plan item, assign data, and save it.

### How long does a session last?

Each session runs for 730 hours—equivalent to a 30-day month.

### Can you stop a session before 30 days?

No. After a session starts, it remains active for the full 30 days, and you can't end it manually. If your role is upgraded during the session, billing for the previous role stops, and billing continues at the higher role.

### What happens when a session ends?

When the 30-day period expires, a new session starts the next time you engage with a plan item. The assigned role depends on the action.

### What if your role changes mid-session?

You can upgrade your role (for example, from Viewer to Stakeholder or from Stakeholder to Planner) but you can't downgrade your role within an active session. When you upgrade your role, the earlier session closes and is prorated, and billing continues at the higher-tier rate.

### What if I work across multiple capacities?

Each unique combination of tenant, user, and capacity creates a separate session that's billed independently. If you work across two capacities, you have two active sessions.

### What if multiple workspaces share the same capacity?

If you assign the same capacity to multiple workspaces, you're billed at the highest role tier active across all workspaces under that capacity.

### Are automation jobs billed separately?

Yes. Automation jobs are billed at a fixed amount per completed job, regardless of whether a Planner, Stakeholder, or Viewer ran the job. Only successful jobs are billed—failed jobs aren't charged.

### What happens if the Fabric capacity is paused or deleted?

If a capacity is paused or deleted, the billing record for the full session period is written for each active session under that capacity.

### What happens if a plan item is deleted mid-session?

Active sessions continue to run and are billed through to the end of the 30 days, even if the plan item is deleted.

### What if the capacity runs out of credits before the session ends?

Sessions continue to be recorded even if the capacity is exhausted through other workloads. No credits are reserved exclusively for planning—billing continues periodically.

### What if too many users are assigned to a small-capacity SKU?

If the number of active sessions exceeds what the SKU supports, you overcommit the SKU. This condition is particularly relevant for smaller SKUs such as F2 and F4, as well as for capacities shared with other Fabric workloads. You might need to dynamically control the number of users assigned to a capacity to avoid overcommitting the SKU.
