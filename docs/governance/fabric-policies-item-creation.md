---
title: Control item creation on a Fabric capacity
description: Learn how the item creation policy in Fabric policies lets capacity administrators control which item types users can create in workspaces assigned to a capacity.
ms.topic: concept-article
ms.date: 08/25/2026
ai-usage: ai-assisted

#customer intent: As a Fabric capacity administrator, I want to understand how the item creation policy works so that I can control which item types users can create in the workspaces assigned to my capacity.
---

# Microsoft Fabric policy: Allow item creation

The **Allow item creation** policy controls who can create selected Microsoft Fabric item types in workspaces assigned to a capacity. Capacity admins configure this policy type.

The policy is evaluated when a user attempts to create a Fabric item. The creation flow supplies the requested item type, user context, and target workspace to the policy evaluation API.

| **Property**   | **Value**                               |
|----------------|-----------------------------------------|
| Policy type    | `ItemCreation`                          |
| Scope          | Capacity                                |
| Evaluated when | A user attempts to create a Fabric item |
| Rule logic     | All conditions in a rule must match     |

## Effects

### Supported effects

| **Effect** | **Behavior** |
|----|----|
| `Allow` | Permits the item-creation operation when the rule matches. |
| `Block` (implicit) | Denies the item-creation operation when advanced policy enforcement is active and no `Allow` rule matches. You don't author `Block` in the create request; it is the outcome for unmatched requests. |

The **Create Policy Rule** API doesn't include an effect property. The `ItemCreation` policy type defines the allow behavior, and blocking is an implicit policy outcome.

### Default effect

The default effect is `Allow`. When no active policy or policy rule applies, users can create items according to their workspace permissions.

### Policy action behavior

- **Allow all** permits every item type according to the user's workspace permissions.
- **Blocked** denies all item-creation operations covered by the policy.
- **Advanced** uses allow list behavior. Matching `Allow` rules permit an operation; every operation that doesn't match an `Allow` rule is implicitly blocked.
- Omitting a condition means that dimension doesn't restrict the rule. For example, omitting `workspace.id` applies the rule to all workspaces in the selected capacity.

> [!IMPORTANT]
> > Switching to **Advanced** and adding an `Allow` rule changes the policy from allow-all behavior to allow list behavior. For example, if a rule allows creation of only `Notebook` and `Lakehouse` items, all other item types are immediately blocked unless another active rule allows them.

## Conditions

Define conditions in the `conditions` array of a policy rule. Each entry is a `DynamicCondition` that resolves a target property from the item-creation evaluation context and applies a predicate to produce a true-or-false result.

### Key concepts

| Concept | Description |
|----|----|
| `DynamicCondition` | A condition that resolves a property from the evaluation context. Its JSON discriminator is `"type": "Dynamic"`. |
| `targetProperty` | A dot-separated property path, such as `item.type` or `principal.groups.id`. |
| `predicate` | The comparison definition that contains `operator` and `values`. |
| `operator` | The comparison to perform. Item Creation supports `AnyOf` and `NoneOf`. |
| `values` | An array of strings. Each string must be a valid API item-type identifier or GUID for the selected target property. |

### Condition structure

```json
    {
      "type": "Dynamic",
      "targetProperty": "<propertyPath>",
      "predicate": {
        "operator": "<operator>",
        "values": ["<value>"]
      }
    }
```

| API property | Type | Required | Description |
|----|----|----|----|
| `type` | string | Yes | Condition discriminator. Use `Dynamic`. |
| `targetProperty` | string | Yes | Dot-separated property path supported by `ItemCreation`. |
| `predicate` | object | Yes | Predicate applied to the resolved target property. |
| `predicate.operator` | string | Yes | `AnyOf` or `NoneOf`. |
| `predicate.values` | array of string | Yes | 1-50 values in the format required by `targetProperty`. |

### Predicates

| Operator | Predicate example | Result |
|----|----|----|
| `AnyOf` | `{"operator":"AnyOf","values":["Notebook"]}` | True when the requested item type is `Notebook`. |
| `NoneOf` | `{"operator":"NoneOf","values":["Notebook"]}` | True when the requested item type isn't `Notebook`. |

- `AnyOf` is true when at least one resolved value equals one configured value.
- `NoneOf` is true when no resolved value equals a configured value.
- Values within a predicate use **OR** logic.
- Conditions within a rule use **AND** logic.
- Separate rules use **OR** logic.
- `AnyOf` and `NoneOf` accept 1-50 values.
- Omit a condition when that dimension shouldn't restrict the rule.

### Supported root entities for this policy type

Each policy type exposes a different set of root entities. The `ItemCreation` policy type supports the root entities listed in the following table. The root entity is the first segment of `targetProperty`.

| Root entity | Entity type | Source | Description |
|----|----|----|----|
| `principal` | `Principal` | Platform-provided user context | The effective user performing the create operation. |
| `item` | `Item` | Item-creation request | The item the user intends to create. |
| `workspace` | `Workspace` | Platform-provided workspace context | The workspace in which the item will be created. |

### `Principal`

**Root path:** `principal`

The platform resolves the effective human user's transitive Microsoft Entra security-group membership. Display names can appear in the editor, but policy JSON stores stable group object IDs.

| Property | Type | Supported operators | Values | Description |
|----|----|----|----|----|
| `groups` | `list<Group>` | Select the `id` property | None | The effective user’s transitive Entra security groups. |

Example entity path: `principal.groups.id`.

### `Group`

**Referenced from:** `principal.groups`

| Property | Type | Supported operators | Values | Description |
|----|----|----|----|----|
| `id` | `guid` | `AnyOf`, `NoneOf` | 1-50 security-group object IDs | The stable Entra object ID of a security group. |

### `Item`

**Root path:** `item`

The item-creation flow supplies this custom entity because the requested item doesn't exist yet.

| Property | Type | Supported operators | Values | Description |
|----|----|----|----|----|
| `type` | `enum` | `AnyOf`, `NoneOf` | 1-50 supported API item-type identifiers | The type of Fabric item the user intends to create. |

Example entity path: `item.type`.

> [!IMPORTANT]
> Use API item-type identifiers, not UI display names. For example, use `DataPipeline` for the UI item type **Pipeline**. 

### `Workspace`

**Root path:** `workspace`

The platform resolves the target workspace. For this capacity-scoped policy, referenced workspaces must belong to the selected capacity.

| Property | Type | Supported operators | Values | Description |
|----|----|----|----|----|
| `id` | `guid` | `AnyOf`, `NoneOf` | 1-50 Fabric workspace IDs | The target workspace's stable Fabric object ID. |

Example entity path: `workspace.id`.

`workspace.name` isn't a supported substitute. The API rejects it with `UnsupportedPropertyValue`.

### Current REST API limitations

- Policy-set activation supports `ScopeType``: "Capacity"` for this policy type. `ScopeType``: "Workspace"` is rejected.
- A policy set can be active on only one scope at a time. Deactivate it before activating it on another capacity.

## Common scenarios and examples

### Allow data engineers to create engineering items

This rule allows members of the Data Engineers group to create notebooks, data pipelines, and lakehouses in two production workspaces. All three conditions must match.

```json
    {
      "displayName": "Allow engineering item creation",
      "description": "Allows Data Engineers to create selected engineering items in production workspaces.",
      "policy": "ItemCreation",
      "conditions": [
        {
          "type": "Dynamic",
          "targetProperty": "principal.groups.id",
          "predicate": {
            "operator": "AnyOf",
            "values": ["2f9f8a1e-6b77-4b1a-9af7-9a611f29de18"]
          }
        },
        {
          "type": "Dynamic",
          "targetProperty": "item.type",
          "predicate": {
            "operator": "AnyOf",
            "values": ["Notebook", "DataPipeline", "Lakehouse"]
          }
        },
        {
          "type": "Dynamic",
          "targetProperty": "workspace.id",
          "predicate": {
            "operator": "AnyOf",
            "values": [
              "a7b2c3d4-e5f6-47a8-9012-3456789abcde",
              "b8c3d4e5-f6a7-48b9-8123-456789abcdef"
            ]
          }
        }
      ]
    }
```

### Apply an item-type rule across the capacity

Omit `workspace.id` to apply the rule to every workspace in the selected capacity.

```json
    {
      "displayName": "Allow approved analytical items",
      "description": "Allows the Analytics Builders group to create approved item types across the capacity.",
      "policy": "ItemCreation",
      "conditions": [
        {
          "type": "Dynamic",
          "targetProperty": "principal.groups.id",
          "predicate": {
            "operator": "AnyOf",
            "values": ["7b785ad9-1a87-4f31-a336-cbb8f0de28c4"]
          }
        },
        {
          "type": "Dynamic",
          "targetProperty": "item.type",
          "predicate": {
            "operator": "AnyOf",
            "values": ["Warehouse", "SemanticModel", "Report"]
          }
        }
      ]
    }
```


## Related content

- [What are Fabric policies?](fabric-policies-overview.md)
- [Get started with Fabric policy sets](fabric-policies-get-started.md)
- [External data sharing policy](fabric-policies-external-data-sharing.md)
- [Automate Fabric policies with the REST APIs](fabric-policies-rest-api.md)
