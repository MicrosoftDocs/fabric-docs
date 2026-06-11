---
title: Business Workflow Management with Pipelines in Fabric Data Factory
description: Learn how to use Microsoft Fabric Data Factory pipelines for business workflow management, including human approvals, conditional logic, notifications, and end-to-end orchestration.
ms.reviewer: noelleli
ms.topic: concept-article
ms.custom: pipelines
ms.date: 05/05/2026
ai-usage: ai-assisted
---

# Business workflow management with pipelines in Fabric Data Factory

Business workflows often extend beyond pure data movement or transformation. Many real-world processes require human approvals, conditional decision points, notifications, and integration with external systems.

In Microsoft Fabric Data Factory, you can model these end-to-end business workflows by using pipelines together with workflow-oriented activities such as Approvals, Web, and notification activities. This article introduces how Fabric Data Factory pipelines support business workflow management and when to use them.

## What is business workflow management?

Business workflow management, also known as business process management (BPM), is the orchestration of data operations and business decisions into a single, automated process. These workflows often include:

- Automated data preparation or validation.
- Human checkpoints such as approvals or reviews.
- Conditional branching based on outcomes.
- Notifications or callbacks to downstream systems.

By modeling these steps together, you can ensure workflows are repeatable, auditable, and easy to monitor.

## How pipelines support business workflows

A pipeline is a logical grouping of activities that together perform a workflow. In addition to data processing activities, pipelines can include workflow activities that introduce decision-making and human interaction.

With pipelines, you can:

- Define sequential or parallel workflow steps.
- Pause execution until an approval or external signal is received.
- Route execution down different paths based on approval outcomes or conditions.
- Enforce governance and visibility through centralized monitoring.

Pipelines let you deploy, schedule, and manage the entire workflow as a single unit instead of coordinating each step independently.

## Common business workflow scenarios

Pipelines support a range of business workflow scenarios, including:

- [Approval-gated publishing](#approval-gated-publishing)- require sign out before data is published
- [Operational handoffs](#operational-handoffs)- pause processing until downstream teams confirm readiness
- [Exception handling workflows](#exception-handling-workflows)- route failures to manual review
- [Controlled promotions](#controlled-promotions)- approve data movement between environments

### Approval-gated publishing

Require business owner or compliance approval before data is published or exposed. Use the [Approval activity](approval-activity.md) to pause the pipeline and wait for explicit sign out.

### Operational handoffs

Pause data processing until downstream teams confirm readiness or validation. Combine Approval activities with conditional logic to create structured handoff points.

### Exception handling workflows

Automatically notify stakeholders and route failures to manual review paths. Use Teams or email notification activities alongside failure conditions to escalate issues.

### Controlled promotions

Approve movement of data from development or staging environments into production. Gate the promotion step with an Approval activity to enforce governance.

## Key workflow activities in pipelines

The following activities support business workflow patterns in your pipelines:

- [Approval activity](#approval-activity)- human decision points
- [Conditional and control activities](#conditional-and-control-activities)- workflow logic and branching
- [Integration and notification activities](#integration-and-notification-activities)- external systems and stakeholder communication

### Approval activity

The [Approval activity](approval-activity.md) pauses pipeline execution and requests an explicit approve or reject decision from designated approvers.

Use approvals when:

- A workflow requires manual sign out.
- Business or compliance teams must review results before continuing.
- Decisions should be auditable and traceable.

Based on the approval outcome, the pipeline can continue, take an alternate path, or stop.

### Conditional and control activities

Pipelines include control flow activities that help manage workflow logic:

- **If Condition**: Branch execution based on approval results or expressions.
- **Switch**: Route workflows based on defined cases.
- **Until / ForEach**: Repeat workflow steps until a condition is met.

These control flow activities let you model complex, decision-driven business processes.

### Integration and notification activities

Workflow pipelines often integrate with external systems. You can use activities such as:

- [Web activity](web-activity.md) to call external APIs or workflow systems.
- [Teams](teams-activity.md) or [email](outlook-activity.md) activities to notify stakeholders of outcomes.
- [Invoke Pipeline activity](invoke-pipeline-activity.md) to trigger downstream workflows.

These integration activities allow pipelines to act as the orchestration layer across data platforms and business tools.

## Example workflow: approval-based data publishing

A typical business workflow in Fabric Data Factory pipelines looks like this:

1. Prepare and validate data.
1. Request approval from a business owner.
1. If approved, publish results and notify stakeholders.
1. If rejected, send feedback and stop execution.

All steps run within a single pipeline, enabling full visibility and monitoring of the workflow lifecycle.

## Monitor business workflows

Business workflows built with pipelines are fully observable through Fabric monitoring experiences. You can:

- Track execution status and duration.
- View approval outcomes and decision paths.
- Diagnose failures or stalled workflows.
- Audit who approved or rejected requests.

Because workflows are modeled as pipelines, they inherit the same monitoring and governance capabilities as data workloads.

## When to use pipelines for business workflows

Use pipelines for business workflow management when you need:

- Orchestrated data and decision logic in one place.
- Human-in-the-loop controls.
- Repeatable, governed processes.
- End-to-end visibility and auditing.

Pipelines are especially useful when workflows span data operations and business actions, not just data movement.

## Related content

- [Approval activity](approval-activity.md)
- [Activity overview](activity-overview.md)
- [Run, schedule, or use events to trigger a pipeline](pipeline-runs.md)
