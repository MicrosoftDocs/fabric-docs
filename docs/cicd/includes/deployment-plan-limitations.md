---
title: Include file for deployment plan limitations
description: This file lists all the limitations to consider when you work with deployment plans.
ms.topic: include
ms.date: 09/24/2026
ai-usage: ai-assisted
---

### General deployment plan limitations

- You can't use one plan to deploy into more than one workspace in a single run.
- You can attach only one deployment plan to a deployment operation.

### Limitations for attaching a plan

- A plan attachment applies only to the current operation. You can't configure a plan as the default for future deployments or schedule the plan itself. If a deployment tool schedules an operation, the operation must attach the plan each time it runs.
- You can't attach a plan to a single-item import operation.
- The `fabric-cicd` library doesn't support deployment plans.

### Limitations during a deployment

- You can't deploy independent deployment groups in parallel.
- A failed deployment isn't rolled back. Items that already deployed stay in the target workspace, and later items don't deploy.

### Limitations for plan actions

- Only supported item and job type combinations can run as pre-deploy or post-deploy actions. See [Item types you can run as an action](../deployment-plan/deployment-plan-actions.md#item-types-you-can-run-as-an-action).
- You can't use the same Dataflow Gen2 item in more than one action in a plan. Its refresh job can't run more than once at a time, so the canvas warns you when you add the second occurrence, and the second occurrence is blocked during the deployment.
- You can't return more than 512 KB from a user data function action. Larger output is truncated. The action still succeeds.
- You can't make an action wait for the services it feeds to catch up. An action completes when the action itself ends, so the next action can start before the data it produced is queryable.
- You can't use a deployment plan to change the active value set of a [Variable Library](../variable-library/variable-library-overview.md) during deployment. Variable references resolve against the value set that's already active in the target workspace. In a newly created target workspace, **Default** is active until you select and save another value set. For more information, see [Variable library CI/CD](../variable-library/variable-library-cicd.md).

### Limitations for plan authoring

- You can't add more than one item to a deployment group.
- The canvas supports automatic layout only.

### Deployment plan size limits

A plan that exceeds any of these limits is rejected when it's saved. The limits are enforced whenever a plan is saved, so they apply to the canvas, the REST API, a pull from Git, and external tools alike.

| Element | Limit |
|---|---|
| Plan size | 1 MB |
| Length of a group or step name | 60 characters |
| Groups in a plan | 1,000 |
| Dependencies on a group | 1,000 |
| Pre-deploy actions in a group | 20 |
| Post-deploy actions in a group | 20 |
| Dependencies on an action | 20 |
| Parameters on an action | 20 |
