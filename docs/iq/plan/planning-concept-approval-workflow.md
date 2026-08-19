---
title: Approval Workflows in Fabric Plan
description: Approval workflows help organizations control planning changes through structured review and approval processes. Learn how approval levels, notifications, status tracking, and rejection handling support governed planning.
ms.date: 08/19/2026
ms.topic: concept-article
---

# Approval workflow

Approval workflows in Planning help organizations control changes to planning data by routing updates through one or more approval levels. When multiple users contribute to the same planning sheet, approval workflows provide a structured process for reviewing changes before they finalize them.

When a user submits a planning change for review, the workflow moves the request through the configured approval levels. Approvers can approve or reject the request, while the workflow automatically updates the corresponding status and can notify users about the progress and outcome.

## How approval workflows work

Approval workflows follow a sequential approval process:

1. A user updates a planning value and submits the change for review.
1. The workflow sends the request to the first configured approval level.
1. The approver reviews the change and approves or rejects the request.
1. If approved, the request moves to the next approval level.
1. The process continues until all approval levels are completed.
1. If a request is rejected, the workflow can reopen it for further changes.
1. When all required approvals are completed, the request is marked as approved.

You can configure multiple approval levels to support review processes that require approval from different users or roles.

## Why use approval workflows?

Approval workflows help organizations:

* Establish a consistent review process for planning changes.
* Control how planning updates are reviewed and finalized.
* Provide visibility into the status of submitted changes.
* Support sequential approvals across different roles or levels.
* Keep requesters and approvers informed through notifications.
* Handle rejected requests without losing the approval history.

## Common business scenarios

Use approval workflows to:

* Review budget changes before they are finalized.
* Route forecast updates through manager and director approval.
* Review planning data submitted by different business units.
* Require multiple approvals for financial or operational plans.
* Send notifications when planning changes require review.
* Return rejected changes to users for correction and resubmission.

## Key capabilities

Approval workflows enable you to:

* Configure one or more approval levels.
* Assign approvers directly or use email addresses stored in planning columns.
* Track the overall request status and the status of individual approval levels.
* Notify approvers when a request requires review.
* Notify submitters about approval decisions.
* Reopen requests when an approval is rejected.
* Reset previous approval levels when a request is rejected at the final approval level.
* Customize approval logic by using scripts or configure workflows through the Approval Workflow interface.

## Approval notifications

Approval workflows can use Microsoft Teams notifications to keep users informed throughout the approval process. Notifications can be sent to approvers when a request is submitted for review and to submitters when an approval decision is made.

## Configure approval workflows

Planning provides two ways to configure approval workflows:

* **Approval Workflow interface** - Create approval workflows without writing scripts by configuring approval levels, approvers, and workflow settings through the interface.
* **Scripts** - Create customized approval workflows by using the **On Change Formula** section of planning columns to define workflow logic, such as updating statuses and sending notifications.

For more information about configuring approval workflows, see [**Configure approval workflows**](./planning-how-to-configure-approval-workflows.md).

## Key takeaway

Approval workflows provide a structured way to review and approve changes to planning data. By supporting multiple approval levels, status tracking, notifications, and rejection handling, they help organizations establish controlled and consistent planning processes.
