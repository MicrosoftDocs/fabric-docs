---
title: Automate Fabric policy sets with policy-as-code
description: Learn how to create, configure, and activate Fabric policy sets programmatically with the Fabric policies REST APIs for policy-as-code and CI/CD scenarios.
ms.topic: concept-article
ms.date: 07/31/2026
ai-usage: ai-assisted
#customer intent: As a developer or administrator, I want to understand how the Fabric policies REST APIs work so that I can manage policy sets as code and integrate them into CI/CD workflows.
---

# Fabric policies REST APIs (preview)

By using the Fabric policies REST APIs (preview), you can programmatically create, configure, and activate policy sets. Automating these operations helps you manage governance as code and integrate policy management into your CI/CD workflows, rather than configuring each policy set manually in the Policies Center.

A policy set contains policies and rule definitions, and you scope and activate it. Fabric stores each policy set in a policy item. Because the policy item is a native Microsoft Fabric item, it supports standard Fabric item capabilities, including public REST APIs, the standard permission model, Git integration, and CI/CD. This article introduces the policy APIs and explains how the item model supports policy-as-code and automated deployment.

## Fabric policies REST API authentication and identities

The Fabric policies REST APIs use Microsoft Entra ID for authentication, the same model as the rest of the Fabric REST API. The APIs support:

- User tokens
- Service principals
- Managed identities

By using service principals and managed identities, you can run policy automation without an interactive sign-in, which makes unattended CI/CD pipelines possible.

## Git integration and CI/CD for Fabric policy sets

Because Fabric stores a policy set in a policy item, you can use Git integration and CI/CD to version, promote, and deploy governance as code across your environments. By storing policy items in source control, you can review policy set changes, track history, and move a validated configuration from development to production the same way you handle application code.

Git doesn't support activation. To enforce a policy set, use the activation API or the Policies Center. This separation lets you manage the definition of a policy set as code while keeping enforcement an explicit, controlled action.

## Fabric policies REST API lifecycle operations

The Fabric policies REST APIs map to the stages of the policy set lifecycle: create, configure, activate, manage, and evaluate. The following table describes the operations available at each step.

| Step | API | Description |
|---|---|---|
| Create | Create Policy Set | Create a policy set with an admin scope and store it in a policy item in a workspace. |
| Configure | Add Policy Rule | Add a rule definition (policy, conditions, effect) to a policy set with schema validation. |
| Configure | Update / Delete / List Policy Rule | Manage rules within a policy set. |
| Activate | Activate Policy Set (Tenant / Capacity) | Enforce the policy set for the scope. |
| Manage | Deactivate Policy Set, List Policy Sets, Read Active Policy Sets | Manage and discover policy sets and their policy items. |
| Evaluate | Policy Evaluation API | Runtime check returning Allow, Denied, or System default. |

For full request and response details for each operation, see the [Fabric REST API reference](/rest/api/fabric/).

## Fabric policy item operations and policy rule operations

The API surface covers two kinds of operations:

- **Policy item operations.** You can create, read, update, and delete the policy item that stores a policy set like any other Fabric item.
- **Policy rule operations.** Within the policy set, you can create, update, delete, and list its individual rules.

Because the policy item APIs extend the Fabric Items REST API, the standard Fabric item operations and permission model apply to the policy item. Activation applies to the policy set and requires the appropriate scope administrator: a Fabric administrator for a Tenant scope or a capacity administrator for a Capacity scope.

## Related content

- [What are Fabric policies?](fabric-policies-overview.md)
- [Get started with Fabric policy sets](fabric-policies-get-started.md)
- [External data sharing policy](fabric-policies-external-data-sharing.md)
- [Item creation policy](fabric-policies-item-creation.md)
