---
title: Govern workspace settings editing across your tenant
description: Allow workspace settings editing is a tenant-scoped policy that restricts edits to customer-managed keys and networking settings. Discover how it works.
#customer intent: As a tenant admin, I want to understand how the Allow workspace settings editing policy interacts with tenant settings, so that I know which configuration takes precedence.
author: msmimart
ms.author: mimart
ms.date: 09/16/2026
ms.topic: concept-article
---

# Microsoft Fabric policy: Allow workspace settings editing

The **Allow workspace settings editing** policy is a tenant-scoped policy that controls which workspace admins can modify security-sensitive workspace settings. It lets tenant admins restrict changes to customer-managed keys and workspace networking settings without removing the workspace admin role or limiting unrelated workspace management tasks.

The policy governs **who can edit a setting**. It doesn't configure the setting value. Existing tenant settings continue to determine whether a capability is available.

| **Property** | **Value** |
|----|----|
| Policy type | WorkspaceSettingsEditing |
| Scope | Tenant |
| Evaluated when | A user opens the workspace settings in the Microsoft Fabric portal, or attempts to change a governed workspace setting through API |
| Rule logic | Conditions in a rule use AND logic. Rules use OR logic. |

> [!IMPORTANT]
> A tenant setting takes precedence over this policy. If a tenant setting disables a capability, allowing a workspace admin to edit the related workspace setting doesn't enable the capability.

## Effects

This policy type supports two effects that determine whether a workspace admin can edit a governed setting.

| **Effect** | **Behavior** |
|----|----|
| `Allow` | Permits the setting editing by the user when the rule matches. |
| `Block` (implicit) | Denies the editing of the setting when advanced policy enforcement is active and no `Allow` rule matches. `Block` isn't authored in the create request; it is the outcome for unmatched requests. |

### Default effect

The default effect is `Allow`. When no active policy or policy rule applies, workspace admins can edit all workspace settings, including those that this policy type supports.

### Policy action behavior

- **Allow all** permits workspace admins to edit all supported network-security settings, subject to tenant settings status. Other workspace settings that this policy type doesn't support remain editable.
- **Blocked** denies all workspace admins from editing the network security settings on all workspaces. Other workspace settings that this policy type doesn't support remain editable.
- **Advanced** uses allow list behavior. Matching `Allow` rules permit an operation; every operation that doesn't match an `Allow` rule is implicitly blocked.
- Omitting a condition means that dimension doesn't restrict the rule. For example, omitting `workspace.id` applies the rule to all workspaces.

> [!IMPORTANT]
> Switching to **Advanced** and adding an `Allow` rule changes the policy from allow-all behavior to allow list behavior. For example, if a rule allows editing of customer-managed keys, all other security settings (outbound and inbound settings) are immediately blocked unless another active rule allows them.

## Conditions

Define conditions in the `conditions` array of a policy rule. Each entry is a `DynamicCondition` that resolves a target property from the edit-workspace-setting evaluation context and applies a predicate to produce a true-or-false result.

### Key concepts

| Concept | Description |
|----|----|
| `DynamicCondition` | A condition that resolves a property from the evaluation context. Its JSON discriminator is `"type": "Dynamic"`. |
| `targetProperty` | A dot-separated property path, such as `workspaceSettingsEditing.settingType` or `principal.groups.id`. |
| `predicate` | The comparison definition that contains `operator` and `values`. |
| `operator` | The comparison to perform. Workspace settings editing supports `AnyOf` and `NoneOf`. |
| `values` | An array of strings. Each string must be a valid API item-type identifier or GUID for the selected target property. |

### Condition structure

```json
{
  "type": "Dynamic",
  "targetProperty": "workspaceSettingsEditing.settingType",
  "predicate": {
    "operator": "AnyOf",
    "values": ["Encryption", "OutboundNetworking"]
  }
}
```

| API property | Type | Required | Description |
|----|----|----|----|
| `type` | string | Yes | Condition discriminator. Use `Dynamic`. |
| `targetProperty` | string | Yes | Dot-separated property path supported by WorkspaceSettingsEditing. |
| `predicate` | object | Yes | Predicate applied to the resolved target property. |
| `predicate.operator` | string | Yes | `AnyOf` or `NoneOf`. |
| `predicate.values` | array of string | Yes | 1-50 values in the format required by `targetProperty`. |

### Predicates

| Operator | Predicate example | Result |
|----|:---|:---|
| `AnyOf` | `{"operator":"AnyOf","values":["Encryption", "OutboundNetworking"]}` | True when the setting edit requested field is `customer managed keys`. |
| `NoneOf` | `{"operator":"NoneOf","values":["Encryption"]}` | True when the setting edit request isn't `customer managed keys`. |

- `AnyOf` is true when at least one resolved value equals one configured value.
- `NoneOf` is true when no resolved value equals a configured value.
- Values within a predicate use **OR** logic.
- Conditions within a rule use **AND** logic.
- Separate rules use **OR** logic.
- `AnyOf` and `NoneOf` accept 1-50 values.
- Omit a condition when that dimension shouldn't restrict the rule.

### Supported root entities for this policy type

Each policy type exposes a different set of root entities. The WorkspaceSettingsEditing policy type supports the root entities listed in the following table. The root entity is the first segment of `targetProperty`.

| Root entity | Entity type | Source | Description |
|----|----|----|:---|
| [`principal`](#principal) | `Principal` | Platform-provided user context | The effective user performing the edit operation. Must be a workspace admin on the specified workspace. |
| [`workspaceSettingsEditing`](#workspacesettingsediting) | `WorkspaceSettingsEditing` | Workspace setting edit request | The workspace setting the user attempts to edit. |
| [`workspace`](#workspace) | `Workspace` | Platform-provided workspace context | The workspace in which the setting will be edited. |

### `Principal`

**Root path:** `principal`

The platform resolves the effective human user's transitive Microsoft Entra security-group membership. Display names can appear in the editor, but policy JSON stores stable group object IDs.

| Property | Type | Supported operators | Values | Description |
|----|----|----|----|----|
| [`groups`](#group) | `list<Group>` | Select the `id` property | None | The effective user's transitive Microsoft Entra security groups. |

Example entity path: `principal.groups.id`.

### `Group`

**Referenced from:** `principal.groups`

| Property | Type | Supported operators | Values | Description |
|----|----|----|----|----|
| `id` | `guid` | `AnyOf`, `NoneOf` | 1-50 security-group object IDs | The stable Microsoft Entra object ID of a security group. |

### `WorkspaceSettingsEditing`

**Root path:** `workspaceSettingsEditing`

| Property | Type | Supported operators | Values | Description |
|----|----|----|----|----|
| `settingType` | `string` | `AnyOf`, `NoneOf` | `Encryption` or `OutboundNetworking` | The type of workspace setting the user attempts to edit. |

Example entity path: `workspaceSettingsEditing.settingType`.

### `Workspace`

**Root path:** `workspace`

The platform resolves the target workspace.

| Property | Type | Supported operators | Values | Description |
|----|----|----|----|----|
| `id` | `guid` | `AnyOf`, `NoneOf` | 1-50 Fabric workspace IDs | The target workspace's stable Fabric object ID. |

Example entity path: `workspace.id`.

### Current REST API limitations

- Policy-set activation supports `ScopeType: "Tenant"` for this policy type. The API rejects `ScopeType: "Workspace"`.

## Related content

- [What are Microsoft Fabric policies?](../governance/fabric-policies-overview.md?toc=/fabric/admin/TOC.json&bc=/fabric/admin/breadcrumb/toc.json)
- [Get started with Microsoft Fabric policies](../governance/fabric-policies-get-started.md?toc=/fabric/admin/TOC.json&bc=/fabric/admin/breadcrumb/toc.json)
- [Item creation policy](../governance/fabric-policies-item-creation.md?toc=/fabric/admin/TOC.json&bc=/fabric/admin/breadcrumb/toc.json)
