---
title: Govern external data sharing across your tenant
description: "Learn how the external data sharing policy, one of the Fabric policies, controls which users, workspaces, and recipient domains can share Fabric data externally."
ms.topic: concept-article
ms.date: 08/25/2026
ai-usage: ai-assisted
#customer intent: As a Fabric tenant administrator, I want to understand how the external data sharing policy evaluates external share requests so that I can control which users, workspaces, and recipient domains are allowed to share Fabric data externally.
---

# Microsoft Fabric policy: Allow external data sharing

The **Allow external data sharing** policy controls who can share Microsoft Fabric data externally, from which workspaces, for which sensitivity labels, and with which recipient email domains. Tenant admins configure this policy type. 

The policy is evaluated when a user creates or modifies an external data share. The external data sharing feature supplies the recipient domain and evaluation identifiers to the policy evaluation API. 

## Properties

|Property  |Value  |
|---------|---------|
|Policy type     | ExternalDataSharing |
|Scope           | Tenant |
|Evaluated when  | A user creates or modifies an external data share |
|Rule logic      | All conditions in a rule must match |


## Effects 

### Supported effects 

|Effect  |Behavior  |
|-------|---------|
|Allow  |Permits the external-sharing operation when the rule matches. |

The **Create Policy Rule** API doesn't include an effect property. The **ExternalDataSharing** policy type defines the allow behavior, and an unmatched request is blocked when policy enforcement is active. 

### Default effect 

- When an active policy doesn't manage external data sharing, the system uses the legacy tenant-setting configuration as the default. 
- When policy enforcement is active, an operation must match an Allow rule or the operation is denied. 
- Omitting a condition means that dimension doesn't restrict the rule. For example, omitting `workspace.id` applies the rule to all workspaces. 

## Conditions 

You define conditions in the conditions array of a policy rule. Each entry is a DynamicCondition that resolves a target property from the external-sharing evaluation context and applies a predicate to produce a true-or-false result. 

### Key concepts 


|Concept  |Description  |
|---------|---------|
|DynamicCondition | A condition that resolves a property from the evaluation context. Its JSON discriminator is `"type": "Dynamic"`. |
|targetProperty   | A dot-separated property path, such as `item.sensitivityLabel.id` or `externalDataShareRecipient.emailDomain`. |
|predicate        | The comparison definition that contains operator and values. |
|operator         | The comparison to perform. External Data Sharing supports `AnyOf` and `NoneOf`. |
|values           | An array of strings. Each string must be a valid GUID or email-domain value for the selected target property. |

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

|API property  |Type  |Required  |Description  |
|---------|---------|---------|---------|
|type     |string   |Yes      |Condition discriminator. Use Dynamic. |
|targetProperty |string |Yes    |A dot-separated property path supported by ExternalDataSharing. |
|predicate |object  |Yes      |Predicate applied to the resolved target property. |
|predicate.operator |string |Yes |AnyOf or NoneOf. |
|predicate.values |array of string |Yes |1-50 values in the format required by targetProperty. |

### Predicates

|Operator  |Predicate example  |Result  |
|---------|---------|---------|
|AnyOf     |{"operator":"AnyOf","values":["@contoso.com"]} |True when the resolved domain is @contoso.com. |
|NoneOf     |{"operator":"NoneOf","values":["@contoso.com"]} |True when the resolved domain isn't @contoso.com. |

- AnyOf is true when at least one resolved value equals one configured value. 
- NoneOf is true when no resolved value equals a configured value.
- Values within a predicate use OR logic. 
- Conditions within a rule use AND logic. 
- Separate rules use OR logic. 
- AnyOf and NoneOf accept 1-50 values. 
- Omit a condition when that dimension shouldn't restrict the rule.

### Supported root entities for this policy type 

Each policy type exposes a different set of root entities. The ExternalDataSharing policy type supports the root entities listed in the following table. The root entity is the first segment of `targetProperty`. A property that references another entity links to that entity's definition. 

|Root entity  |Entity type  |Source  |Description  |
|---------|---------|---------|---------|
|principal     | Principal        |Platform-provided user context         |The effective user performing the sharing operation.         |
|workspace     | Workspace        |Platform-provided workspace context         |The workspace from which the item is shared.         |
|item     | Item        |Platform-provided item context         |The Fabric item being shared.         |
|externalDataShareRecipient     | ExternalDataShareRecipient        |External data sharing evaluation context         |The external recipient supplied by the external data sharing enforcement point.         |

#### Principal 

**Root path:** principal 

The platform resolves the effective human user's transitive Microsoft Entra security-group membership. Display names can appear in the editor, but policy JSON stores stable group object IDs. 

|Property  |Type  |Supported operators  |Values  |Description  |
|---------|---------|---------|---------|---------|
|groups     | `list<Group>` |Select the `id` property         |None         | The effective user's transitive Entra security groups. |

Example entity path: `principal.groups.id`. 

#### Group 

**Referenced from:** `principal.groups` 

|Property  |Type  |Supported operators  |Values  |Description  |
|---------|---------|---------|---------|---------|
|id  |guid  |AnyOf, NoneOf  |1-50 security-group object IDs  | The stable Entra object ID of a security group. |

#### Workspace 

**Available paths:** `workspace`, `item.workspace` 

The API supports the workspace supplied directly in the evaluation context and the workspace referenced by the shared item. 

|Property  |Type  |Supported operators  |Values  |Description  |
|---------|---------|---------|---------|---------|
|id  |guid  |AnyOf, NoneOf  |1-50 Fabric workspace IDs  |The source workspace's stable Fabric object ID. |

Example entity paths: `workspace.id` and `item.workspace.id`. 

 

#### Item 

**Root path:** `item` 

The platform resolves the Fabric item being shared. 

|Property  |Type  |Supported operators  |Values  |Description  |
|---------|---------|---------|---------|---------|
|sensitivityLabel  |SensitivityLabel  |Select the `id` property  |None  |The Microsoft Purview sensitivity label applied to the item. |
|workspace  |Workspace  |Select the `id` property  |None  |The workspace that contains the shared item. |

Example entity paths: `item.sensitivityLabel.id` and `item.workspace.id`. 

#### SensitivityLabel 

**Referenced from:** item.sensitivityLabel 

The label picker requires the Microsoft Purview Information Protection tenant setting to be enabled. It shows labels available through the acting admin's Purview label policy. JSON can reference other valid label IDs. 

|Property  |Type  |Supported operators  |Values  |Description  |
|---------|---------|---------|---------|---------|
|id  |guid  |AnyOf, NoneOf  |1-50 sensitivity-label IDs  |The stable Purview sensitivity-label ID. |

For an unlabeled item, use the supported **No label** authoring option rather than a display name.

#### ExternalDataShareRecipient 

**Root path:** externalDataShareRecipient 

The external data sharing feature supplies this custom entity directly in the evaluation request. The policy platform doesn't fetch it. 

|Property  |Type  |Supported operators  |Values  |Description  |
|---------|---------|---------|---------|---------|
|emailDomain  |string  |AnyOf, NoneOf  |1-50 normalized domains in the form @domain.tld  |The domain extracted from the external recipient address. Comparisons are case-insensitive. |

Example entity path: externalDataShareRecipient.emailDomain. 

## Common scenarios and examples 

### Allow approved teams to share with approved domains 

This rule allows Sales and Partner Success users to share labeled content from selected workspaces with two approved domains. Every condition must match. 

```json
{ 
  "displayName": "Allow approved partner sharing", 
  "description": "Allows approved teams to share labeled data from selected workspaces with approved domains.", 
  "policy": "ExternalDataSharing", 
  "conditions": [ 
    { 
      "type": "Dynamic", 
      "targetProperty": "principal.groups.id", 
      "predicate": { 
        "operator": "AnyOf", 
        "values": [ 
          "8a6e2aa2-6e4d-49ad-a970-2e757ac8a2f1", 
          "b2d465a3-734e-47f6-82b7-2fdddb9a91d5" 
        ] 
      } 
    }, 
    { 
      "type": "Dynamic", 
      "targetProperty": "workspace.id", 
      "predicate": { 
        "operator": "AnyOf", 
        "values": [ 
          "c9d4e5f6-a7b8-49c0-9234-56789abcdef0", 
          "d0e5f6a7-b8c9-40d1-8345-6789abcdef01" 
        ] 
      } 
    }, 
    { 
      "type": "Dynamic", 
      "targetProperty": "item.sensitivityLabel.id", 
      "predicate": { 
        "operator": "AnyOf", 
        "values": [ 
          "f42a3342-8706-4288-bd31-ebb85995028c", 
          "75a9e7c2-7d3f-4566-8f2b-5c123f58a9f8" 
        ] 
      } 
    }, 
    { 
      "type": "Dynamic", 
      "targetProperty": "externalDataShareRecipient.emailDomain", 
      "predicate": { 
        "operator": "AnyOf", 
        "values": ["@contoso.com", "@fabrikam.com"] 
      } 
    } 
  ] 
} 
```

### Add a separate finance exception 

Rules use OR logic with each other. This second rule allows Finance Leadership to share with an external auditor without changing the first rule. 

```json
{ 
  "displayName": "Allow finance auditor sharing", 
  "description": "Allows Finance Leadership to share with the approved external auditor.", 
  "policy": "ExternalDataSharing", 
  "conditions": [ 
    { 
      "type": "Dynamic", 
      "targetProperty": "principal.groups.id", 
      "predicate": { 
        "operator": "AnyOf", 
        "values": ["db0fc5e1-f9de-47de-909e-417c611bf4ab"] 
      } 
    }, 
    { 
      "type": "Dynamic", 
      "targetProperty": "externalDataShareRecipient.emailDomain", 
      "predicate": { 
        "operator": "AnyOf", 
        "values": ["@finance-auditor.com"] 
      } 
    } 
  ] 
} 
```

## Related content

- [What are Fabric policies?](fabric-policies-overview.md)
- [Get started with Fabric policy sets](fabric-policies-get-started.md)
- [Item creation policy](fabric-policies-item-creation.md)
- [Automate Fabric policies with the REST APIs](fabric-policies-rest-api.md)
- [External data sharing in Microsoft Fabric](./external-data-sharing-overview.md)
