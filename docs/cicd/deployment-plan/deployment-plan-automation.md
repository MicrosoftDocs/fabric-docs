---
title: Automate deployments with a deployment plan
description: Learn how to add a Microsoft Fabric deployment plan to an automated Git update, deployment pipeline deployment, or bulk import operation.
ms.reviewer: NimrodShalit
ms.topic: how-to
ms.date: 09/24/2026
ms.custom:
  - deployment_plan
ms.search.form: Deployment plan
ai-usage: ai-assisted
#customer intent: As a Fabric developer, I want to add a deployment plan to my existing automation, so that the operation uses the plan's order and actions.
---

# Automate deployments with a deployment plan (preview)

A deployment plan extends an existing API request. It doesn't replace the API's standard flow. Add a plan to set item order. A plan can also run actions before or after an item deploys. The original request still sets the source, target, and selected items.

[!INCLUDE [feature-preview-note](~/includes/feature-preview-note.md)]

## Choose an automation workflow

Start with the automation guide for your operation. Then add the deployment plan input from this article.

| API that accepts a deployment plan | Existing automation guidance |
|---|---|
| [Update From Git](/rest/api/fabric/core/git/update-from-git) | [Automate Git integration by using APIs](../git-integration/git-automation.md) |
| [Deploy Stage Content](/rest/api/fabric/core/deployment-pipelines/deploy-stage-content) | [Automate your deployment pipeline with Fabric APIs](../deployment-pipelines/pipeline-automation-fabric.md) |
| [Bulk Import Item Definitions](/rest/api/fabric/core/items/bulk-import-item-definitions) | [Fabric CI/CD with Bulk Import Item Definitions API](../tutorial-bulkapi-cicd.md) |

Without a deployment plan, each API works as before.

These are the APIs that accept the `deploymentPlan` input. Your workflow can also call other APIs to prepare the operation or check its status. Continue to use those supporting APIs as described in the existing automation guide.

## Prerequisites

Before you add a plan:

- Create the deployment plan. Make sure the operation can resolve it.
- Get a Microsoft Entra access token. Use it for the Fabric API.
- Make sure the caller has the roles required by the original operation.
- Make sure the token includes the original operation's scope and `Item.Execute.All`.
- Add `beta=true` to the operation URL.

The token must include these scopes:

| Operation | Original operation scope | Additional scope when a plan is supplied |
|---|---|---|
| Update From Git | `Workspace.GitUpdate.All` | `Item.Execute.All` |
| Deploy Stage Content | `Pipeline.Deploy` or `DeploymentPipeline.Deploy.All` | `Item.Execute.All` |
| Bulk Import Item Definitions | `Item.ReadWrite.All` | `Item.Execute.All` |

The caller also needs the roles listed in the original API reference. The same reference lists the identity types that the API supports. A service principal or managed identity works only if every item in the operation supports it.

## Add the deployment plan to a request

For each supported API:

1. Add `beta=true` to the request URL.
1. Add a `deploymentPlan` object inside the existing `options` object.
1. Keep the rest of the request unchanged.

Use the lowercase `referenceType` property. Its value is case-sensitive.

### Update a workspace from Git

Use the plan's logical ID. The plan can come from the workspace or the incoming Git content. For a plan stored in Git, find the logical ID in its `.platform` file.

For an API-driven initial sync, call [Initialize Connection](/rest/api/fabric/core/git/initialize-connection) first. If the response requires an update, add the plan to the following Update From Git request. Initialize Connection doesn't accept a deployment plan.

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/git/updateFromGit?beta=true
```

Add the following object to the Update From Git request:

```json
{
  "options": {
    "deploymentPlan": {
      "logicalId": "00000000-0000-0000-0000-000000000000",
      "referenceType": "ByLogicalId"
    }
  }
}
```

Keep `workspaceHead`, `remoteCommitHash`, conflict resolution, and the other options. Build the full request by using the Git automation guide. The guide also shows how to poll the operation status. See [Update from Git](../git-integration/git-automation.md#update-from-git).

### Deploy content between pipeline stages

Reference the deployment plan by its item ID.

```http
POST https://api.fabric.microsoft.com/v1/deploymentPipelines/{deploymentPipelineId}/deploy?beta=true
```

Add the following object to the Deploy Stage Content request:

```json
{
  "options": {
    "deploymentPlan": {
      "itemId": "00000000-0000-0000-0000-000000000000",
      "referenceType": "ByItemId"
    }
  }
}
```

Keep the source stage, target stage, selected items, deployment note, and other options. Build the full request by using the deployment pipeline guide. The guide also shows how to poll the operation status. See [Automate your deployment pipeline with Fabric APIs](../deployment-pipelines/pipeline-automation-fabric.md).

### Import item definitions

Use the plan's logical ID. Find it in the plan's `.platform` file.

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/bulkImportDefinitions?beta=true
```

Add the deployment plan to the Bulk Import request options:

```json
{
  "options": {
    "allowPairingByName": false,
    "deploymentPlan": {
      "logicalId": "00000000-0000-0000-0000-000000000000",
      "referenceType": "ByLogicalId"
    }
  }
}
```

Keep all item definition parts and import options. Build the full request by using the Bulk Import tutorial. The tutorial also shows how to poll the operation status. See [Fabric CI/CD with Bulk Import Item Definitions API](../tutorial-bulkapi-cicd.md).

## Understand what the plan changes

The plan changes only the order and actions. It doesn't change the selected items.

| Request input | What it controls |
|---|---|
| Original API request | Source, target, selected items, and operation-specific settings |
| Deployment plan | Explicit item order and pre-deploy or post-deploy actions |
| Fabric lineage | Dependencies that Fabric detects between selected items |

Selected items outside a deployment group use the operation's standard behavior.

For how the request scope, plan relationships, Fabric lineage, and actions work together, see [How a deployment plan works](deployment-plan-overview.md#how-a-deployment-plan-works).

## Validate the request

Before you run the automation, verify that:

- The URL includes `beta=true`.
- The token includes `Item.Execute.All` and the original operation's scope.
- The `deploymentPlan` object is inside `options`, not at the request root.
- `referenceType` uses the documented value and casing.
- The item ID or logical ID isn't empty or malformed.
- The operation can resolve the plan in the relevant workspace or incoming content.
- The plan definition is valid and doesn't contain a circular dependency.

The operation stops when validation, an item, or an action fails. Fabric doesn't roll back completed work.

## Considerations and limitations

The `fabric-cicd` library doesn't support deployment plans. Use Update From Git, Deploy Stage Content, or Bulk Import Item Definitions when you automate a deployment with a plan.

For all deployment plan constraints, see [Deployment plan considerations and limitations](deployment-plan-overview.md#considerations-and-limitations).

## Manage the deployment plan item

A deployment plan is a Fabric item. Use the following Fabric REST APIs to manage it. These calls are separate from the deployment operation.

| Task | REST API |
| --- | --- |
| Create a plan | [Create Deployment Plan](/rest/api/fabric/deploymentplan/items/create-deployment-plan) |
| List plans in a workspace | [List Items](/rest/api/fabric/core/items/list-items) |
| Get plan properties | [Get Item](/rest/api/fabric/core/items/get-item) |
| Get the plan definition | [Get Item Definition](/rest/api/fabric/core/items/get-item-definition) |
| Update plan properties | [Update Item](/rest/api/fabric/core/items/update-item) |
| Update the plan definition | [Update Item Definition](/rest/api/fabric/core/items/update-item-definition) |
| Delete a plan | [Delete Item](/rest/api/fabric/core/items/delete-item) |

The deployment plan definition contains parts with a path, Base64 payload, and `InlineBase64` payload type.

## Related content

- [What is a deployment plan?](deployment-plan-overview.md)
- [Attach a deployment plan](deployment-plan-attach.md)
- [Create a deployment plan](how-to-create-deployment-plan.md)
- [Deployment plan actions](deployment-plan-actions.md)
- [Deployment plan permissions](deployment-plan-permissions.md)
- [Troubleshoot deployment plans](deployment-plan-troubleshoot.md)
- [Automate Git integration by using APIs](../git-integration/git-automation.md)
- [Automate your deployment pipeline with Fabric APIs](../deployment-pipelines/pipeline-automation-fabric.md)
- [Fabric CI/CD with Bulk Import Item Definitions API](../tutorial-bulkapi-cicd.md)
