---
title: Create and activate a Fabric policy
description: "Create and activate your first Fabric policy set, then start governing your tenant or capacity from the Policies center in the OneLake catalog."
ms.topic: get-started
ms.date: 08/24/2026
ai-usage: ai-assisted
#customer intent: As a Fabric administrator or capacity administrator, I want to create and activate a policy set so that I can start governing my tenant or capacity with Fabric policies.
---

# Get started with Microsoft Fabric policies (preview)

Microsoft Fabric policies (preview) help administrators govern Fabric by automatically enforcing rules that control user actions across Fabric resources and activities. This article explains how to enable Fabric policies, create a policy set, add policy rules, activate the policy, and manage active policies in the **Policies** center. 

To learn more about Fabric policies, see [What are Fabric policies?](fabric-policies-overview.md)

## Prerequisites for creating a Fabric policy

- The **Policies** tenant setting is enabled. See the next section, [Enable the Policies feature in the tenant settings](#enable-the-policies-feature-in-the-tenant-settings).
- A Fabric workspace assigned to a capacity. 
- **Contributor**, **Member**, or **Admin** access to the workspace so that you can create a policy item type.
- The appropriate admin role to activate the policy:
   - **Fabric administrator**: Can create and activate policies for tenant-scope policies.
   - **Capacity administrator**: Can create and activate policies for capacity-scope policies.
- Entra security groups for any user-based rule conditions. 
- **Microsoft Purview Information Protection** enabled if you plan to use sensitivity-label conditions.
- Understand the [best practices](fabric-policies-overview.md#best-practices-for-creating-a-policy) for creating a policy.

> [!NOTE]
> Creating or saving a policy doesn't start enforcement. The policy must be activated by an admin of its assigned scope.

## Enable the Policies feature in the tenant settings

When you enable the **Policies** tenant setting, authorized users can create policies.

1. In the Fabric portal, open the **OneLake catalog**.
1. Select the **Govern** tab.
1. Select **Configurations**.
1. Filter by the keyword **Policies**.
1. Expand the **Policies** section and set the toggle to **Enabled**.
1. Under **Apply to**, select either **The entire organization** or specific security groups. For either option, you can also create exceptions by selecting **Except specific security groups** and choosing the relevant groups.

   :::image type="content" source="media/fabric-policies-get-started/policies-tenant-setting.png" alt-text="Screenshot showing the Policies setting in the Fabric admin portal." lightbox="media/fabric-policies-get-started/policies-tenant-setting.png":::

1. Select **Apply** to save the changes.

## Create a policy item

In Fabric, a dedicated Fabric item called a *policy set* holds a policy and its rules. When you create the item, choose whether the policy applies at the tenant or capacity scope. You can't change the scope later.

1. In the Fabric portal, select **Workspaces** and open a workspace that's assigned to a Fabric capacity.
1. Select **New item**.
1. In the item gallery, search for and select **Policy set**. If there are no results, select **All items** and search again.
1. In **New policy set** dialog, enter a unique, descriptive **Name** for the policy set. You can't use spaces.
1. Under **Policy set scope**, select the appropriate scope:

   - Select **Fabric tenant** for policies that a Fabric administrator activates and apply at the tenant scope. 
   - Select **A capacity** for policies that a capacity administrator activates for a specific capacity. 

   :::image type="content" source="media/fabric-policies-get-started/new-policy-set-dialog.png" alt-text="Screenshot of the New Policy set dialog with Name, Location, and Policy set scope fields and a Create button." lightbox="media/fabric-policies-get-started/new-policy-set-dialog.png":::

1. Select **Create** to create the policy set item in the workspace. 

The new policy set is inactive and initially shows each supported policy in its system-default state.

> [!IMPORTANT]
> You can't change the admin scope after the policy set is created. If you select the wrong scope, create a new policy set with the correct scope.

## Review the policy defaults

Before you add a rule, review the default behavior shown for the policy.

- **Allowed** means the governed action follows the system default and remains available to users who otherwise have permission.
- **Blocked** means the governed action is denied.
- **Advanced** means Fabric evaluates the configured allow rules.

Policies with **Allow** behavior use the rules configured in **Advanced** settings as an allow list:

- If any rule matches, Fabric allows the operation.
- If no rule matches, Fabric denies the operation.
- Conditions in one rule use **AND** logic.
- Separate rules use **OR** logic.

> [!CAUTION]
> Adding a narrowly scoped allow rule blocks any operations that don't match it. Add rules for all required allow scenarios before activating the policy set.

## Add policy rules

You can apply a single **Allowed** or **Blocked** behavior, or choose the **Advanced** option to use the no-code conditions builder for granular rules.

1. Open the workspace, and then open the policy item.
1. Locate the policy that you want to configure.
1. Select **Allowed**, **Blocked**, or **Advanced (Set by user)** to change the policy behavior. If you select **Advanced**, the rules configuration is enabled.
1. To create an advanced rule, select **Add rule** or **Create rule**.
1. Enter a clear rule **Name** and **Description** that explains who the rule applies to, what it allows, and where it applies:

   :::image type="content" source="media/fabric-policies-get-started/new-policy-rule-name-description-fields.png" alt-text="Screenshot showing new rule configuration with Advanced (Set by user) option and Name field entry." lightbox="media/fabric-policies-get-started/new-policy-rule-name-description-fields.png":::

1. Under **Condition type**, choose a condition type supported by the policy.

   | Condition | Purpose |
   |----|----|
   | Recipient email domain | Match an external recipient domain for external data sharing. |
   | Security groups | Match the acting user's Entra security-group membership. |
   | Sensitivity labels | Match the Microsoft Purview sensitivity label applied to an item. |
   | Workspaces | Match the workspace where the governed operation occurs. |
   | Item type | Match the Fabric item type being created. |

   :::image type="content" source="media/fabric-policies-get-started/condition-type-dropdown.png" alt-text="Screenshot showing Condition type, Operator, and Values fields with the type dropdown expanded and Security group checked." lightbox="media/fabric-policies-get-started/condition-type-dropdown.png":::

   > [!NOTE]
   > If you omit a condition, the rule isn't restricted by that condition type. For example, a rule without a workspace condition can match operations in any workspace within the policy's admin scope.

1. Select an operator:

   - **Is any of** matches when at least one configured value matches.
   - **Is none of** matches when none of the configured values match.

1. Select or enter one or more **Values** that match the selected condition type.

1. Repeat the condition steps until the rule describes the complete allow scenario.

1. Review the rule. All conditions in the rule must be true for the rule to match.

1. Select **Apply**.

The rule is added to the policy set. If you need to allow a different combination of users, workspaces, item types, labels, or domains, create another rule.

## Assign and activate the policy set

Only an administrator of the selected scope can activate a policy set. Only one policy set can be active for an admin scope at a time.

> [!CAUTION]
> Activating a policy set can immediately change which operations users are allowed to perform after propagation. Validate the rules and affected user groups before activation.

1. Open the policy set from its workspace. Review each configured policy and rule, and then select **Active**:

   :::image type="content" source="media/fabric-policies-get-started/policy-set-status-active-menu.png" alt-text="Screenshot of policy set Status menu with Active checked in the dropdown." lightbox="media/fabric-policies-get-started/policy-set-status-active-menu.png":::

1. For a capacity-scoped policy set, select the target capacity and review the confirmation message.

1. If another policy set is active for the scope, confirm that you want to replace it and confirm the activation.

   :::image type="content" source="media/fabric-policies-get-started/assign-capacity-scope-policy-activation.png" alt-text="Screenshot of the policy set activation dialog prompting to assign a capacity." lightbox="media/fabric-policies-get-started/assign-capacity-scope-policy-activation.png":::

The policy set becomes active. Policy changes can take up to 15 minutes to take effect.

## Validate policy enforcement

We recommend validating policy enforcement with test accounts after waiting up to 15 minutes for changes to take effect. Confirm that an eligible user who matches a rule is allowed and that an eligible user who doesn't match any rule is denied. You can also test a user outside the configured security groups and review the Fabric audit logs to verify the enforcement results.

## Deactivate or replace a policy set

You can deactivate or replace an active policy set from the workspace where the policy set is stored. Only an administrator of the policy set's admin scope can deactivate or replace it.

### Deactivate a policy set

1. Open the active policy set.
1. Select **Deactivate**.
1. Confirm the deactivation.

Deactivation stops the policy set from being evaluated and returns the scope to the applicable system-default behavior. The policy set remains in the workspace.

### Replace an active policy set

1. Create and configure the replacement policy set in a workspace.
1. Review all allow scenarios in the replacement.
1. Select **Activate**.
1. Confirm that the existing active policy set will be replaced.

The previous policy set becomes inactive, and the replacement takes effect within 15 minutes.

## Monitor enforcement with Fabric audit logs

Fabric records each policy decision so you can verify that enforcement matches your intent. Track these decisions through Fabric audit logs.

1. Open the Fabric audit logs.

1. Review the recorded policy enforcement decisions to confirm that Fabric applies your policies as expected.

## Considerations and limitations

- You can currently create policy sets only from the item creation experience in a workspace.
- Use the Policies Center for centralized policy management, not for policy-set creation.
- Only workspaces assigned to a Fabric capacity can store policy sets.
- You can't change a policy set's admin scope after creation.
- Only one policy set can be active for an admin scope at a time.
- Policy and tenant-setting changes can take time to propagate.
- Conditions support **Any of** and **None of** in the current preview.
- A condition supports up to 50 values.
- Tenant-scoped policies support up to 100 rules per policy.
- Capacity-scoped policies support up to 50 rules per policy.
- Domain and workspace admin scopes aren't currently available.
- You can't activate a policy set through Git.

## Related content

- [What are Fabric policies?](fabric-policies-overview.md)
- [External data sharing policy](fabric-policies-external-data-sharing.md)
- [Item creation policy](fabric-policies-item-creation.md)
- [Automate Fabric policies with the REST APIs](fabric-policies-rest-api.md)
