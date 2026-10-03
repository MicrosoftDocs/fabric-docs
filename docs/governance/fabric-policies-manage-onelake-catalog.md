---
title: Manage the OneLake catalog Policies center
description: "Govern Fabric policies from the OneLake catalog Policies center. View policies by scope, connect a policy set, configure rules, and monitor enforcement."
ms.topic: how-to
ms.date: 08/25/2026
ai-usage: ai-assisted
#customer intent: As a Fabric administrator or capacity administrator, I want to manage Fabric policies from the OneLake catalog Policies center so that I can govern my tenant or capacity and monitor policy enforcement.
---

# Manage Microsoft Fabric policies in the OneLake catalog Policies center (preview)

The Policies center in the OneLake catalog is a management experience for all active [Fabric policies (preview)](fabric-policies-overview.md). Use it to change the scope you are viewing, review policy status, and add, update, or delete policy rules.

## Prerequisites

To manage policies, you need: 

- The [Policies tenant setting enabled](fabric-policies-get-started.md#enable-the-policies-feature-in-the-tenant-settings). 
- A Fabric administrator role to manage tenant-scoped policies. 
- A capacity administrator role for each capacity whose policies you manage. 
- **ReadWrite** access to the active policy set.

## Open the Policies center

1. In the OneLake catalog, select **Govern** > **Policies**.
1. Choose an admin scope: **Tenant** or **Capacity**.
 
The Policies center displays the policies available for the selected administrative scope.

## Change the admin scope and view policies

Use the scope explorer to switch between the policies that apply to different administrative scopes. 

1. In the Policies center, open the scope explorer.
1. Select Tenant to view tenant-scoped policies, or select a capacity to view the policies for that capacity. 
1. Review the active policy set and policy configuration for the selected scope. 

The scopes you can view depend on your administrator role:


|Administrator role | Available scopes |
|------------------|-----------------|
|Fabric administrator | Tenant and capacity scopes |
|Capacity administrator | Capacities for which you are an administrator |

> [!NOTE]
> Changing the selected scope changes only the Policies center view. It doesn't change the admin-scope type assigned to a policy set. A policy set created for the Tenant scope can't be changed to the Capacity scope, and a capacity-scoped policy set can't be changed to the Tenant scope. 

## Review active policies

For the selected scope, use the policy list to: 

- Review the active policy set. 
- Search for a policy by its name or description. 
- See whether each policy uses its system default or was configured by an administrator. 
- Review whether an allow policy is set to Allow all, Blocked, or Advanced. 
- Open a policy to review its rules and conditions. 

Only one policy set can be active for an administrative scope at a time. 

## Manage a policy 

1. In the Policies center, select the required administrative scope. 
1. Select the policy that you want to manage. 
1. Review the policy state and its existing rules. 
1. Add, update, or delete rules as required. 

Changes made in the Policies center are synchronized with the active policy set item. Changes made directly in the active policy set item are also reflected in the Policies center.

> [!CAUTION]
> Advanced allow policies use allow list behavior. If at least one rule matches, the operation is allowed. If no rule matches, the operation is denied. Configure every required allow scenario before you save changes. 

## Add a policy rule

1. Open the policy that you want to update. 
1. Select **Add rule** or **Create rule**. 
1. Enter a clear rule name and description. 
1. Add the conditions that define the allow scenario. 
1. Select an operator and one or more values for each condition. 
1. Review the rule, and then select **Save**.

All conditions in one rule use **AND** logic. Separate rules use **OR** logic. 

> [!NOTE]
> A security-group condition narrows which eligible users can match a rule. It doesn't make a user eligible for enforcement if the user isn't in a group configured in the **Policies** tenant setting.  

## Update a policy rule 

1. Open the policy that contains the rule. 
1. Select the rule that you want to update. 
1. Change the rule name, description, conditions, operators, or values. 
1. Review the effect of the changes. 
1. Select **Save**.

Changes to an active policy set can take up to 15 minutes to affect enforcement. 

## Delete a policy rule 

1. Open the policy that contains the rule. 
1. Open the rule's context menu, and then select **Delete**. 
1. Review the effect of removing the allow scenario. 
1. Confirm the deletion.

> [!CAUTION]
> Deleting a rule from an active allow policy can cause previously allowed operations to be denied when no remaining rule matches. 

## Considerations and limitations 

- The Policies center is a management experience and doesn't provide the current policy-set creation flow. 
- You can create policy sets only through **New item** > **Policy set** in a workspace assigned to a Fabric capacity.  
- You can't activate or deactivate policy sets from the Policies center. Open the policy set item in its workspace to perform these actions. 
- Only one policy set can be active for an administrative scope at a time. 
- You can't change a policy set's Tenant or Capacity admin-scope type after creation. 
- Policy changes can take up to 15 minutes to affect enforcement. 
- Policy enforcement is limited to users included through the security groups configured in the Policies (preview) tenant setting. 
- Domain and workspace administrative scopes aren't available in the current preview.

## Related content

- [What are Fabric policies?](fabric-policies-overview.md)
- [Get started with Fabric policy sets](fabric-policies-get-started.md)
- [Fabric policies REST APIs](fabric-policies-rest-api.md)
- [External data sharing policy](fabric-policies-external-data-sharing.md)
- [Item creation policy](fabric-policies-item-creation.md)