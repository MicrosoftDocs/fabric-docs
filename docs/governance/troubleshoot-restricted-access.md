---
title: Troubleshoot issues with restricted access
description: Learn how to troubleshoot issues with restricted access.
author: msmimart
ms.author: mimart
ms.date: 12/19/2025
ms.topic: concept-article
---

# Troubleshoot access restrictions

The Microsoft Fabric permission model allows users and workspace admins to grant permissions to other users at the workspace level. These permissions define the default access for all items in the workspace. Users can also be given elevated permissions for specific items at the item level, even if they're only viewers at the workspace level. Learn more about the [Fabric permission model](/fabric/security/permission-model).

Fabric provides other access controls. For example, OneLake security enables admins to assign roles to items and control which portions of data users can view. More importantly for this troubleshooting article, organization-wide policies can automatically restrict access to items based on their sensitivity or content.

Because there are multiple layers controlling access, you could encounter restrictions from policies you're unaware of. This article helps you identify if a policy is affecting your access and how to restore it if possible.

## User's access to an item is blocked

If you previously had access to an item but can no longer see it in your workspace or open it, consider the following common causes.

### Access was manually removed

A user with administrative or ownership permissions manually revoked your access to the item. This action is often taken to comply with company regulations or security policies. To resolve this issue:

   - **Contact the item owner directly**: If you know who owns or created the item, reach out to them to inquire about the access change.
   - **Reach out to your workspace administrator**: If you don't know the item owner, your workspace admin can help you contact them or reinstate your access if they removed it by mistake.

### Workspace permissions changed

You were removed from the workspace or your access level was downgraded, which automatically revoked some of your permissions to the items within it.

To understand the reason for the change in permissions, contact your workspace administrator.

### Company policies changed

Your organization implemented company-wide policies that restrict access to certain items based on the applied their sensitivity or content. These policies can override individual permissions and workspace settings. There are two main types of policies that can enforce such restrictions:

- **Protection policies**: Microsoft Purview protection policies automatically enforce access restrictions based on the applied *sensitivity label*. For example, the label "Confidential" can automatically limit access to a specific security group, for any Fabric item labeled by it.
- **Data Loss Prevention (DLP) policies with the "restrict access" action**: Microsoft Purview DLP policies with the *restrict access* action allow for access enforcement on items containing sensitive information.

Both policies produce similar user experiences when access is revoked. The following sections provide troubleshooting steps for these scenarios.

## How to tell if policies are the cause of access issues

You can tell a policy change is the cause of your restricted access if you experience one of the following issues:

- You no longer see the item in your workspace list view or the OneLake catalog.

   :::image type="content" source="media/troubleshoot-restricted-access/list-view-no-item.png" alt-text="Screenshot showing the message sorry we couldn't fine that artifact." lightbox="media/troubleshoot-restricted-access/list-view-no-item.png":::

- You see "Permission required" or "Sorry we couldn’t locate that artifact" when trying to open the item using a link.

   :::image type="content" source="media/troubleshoot-restricted-access/permission-required.png" alt-text="Screenshot showing the permission required message." lightbox="media/troubleshoot-restricted-access/permission-required.png":::

- You see an indicator on the item showing that it contains data from a restricted underlying source.

   :::image type="content" source="media/troubleshoot-restricted-access/audit-risk-indicator.png" alt-text="Screenshot showing the indicator that appears when an item includes data from a restricted item." lightbox="media/troubleshoot-restricted-access/audit-risk-indicator.png":::

- You see tiles on a dashboard that display a "Permission required" message. This message indicates that these tiles contain data from a restricted underlying source. Tiles that don't use restricted data render normally.

These symptoms can indicate that either a protection policy or a DLP policy with the "restrict access" action is blocking your access.

### What should I do if I think a policy is blocking my access?

Contact your workspace admin to investigate and resolve the issue. If the workspace admin is also blocked by a policy, the label issuer (the person who applied the sensitivity label) or the item creator can access the **Manage Permissions** page to determine if a policy is blocking your access.

The next sections provide guidance for workspace admins and others with appropriate permissions on how to troubleshoot and resolve these issues.

## How to investigate a restriction scenario

When a user reports losing access to an item, the workspace admin can investigate the cause along with other users who can assist depending on their permissions:

- **Workspace admins** can access the **Manage Permissions** page to investigate access issues for all users.
- **Label issuers** (users who applied the sensitivity label to the item) retain access even if not included in the protection policy, preventing lockout scenarios.
- **Item creators** also retain access when labels are applied automatically (such as through downstream inheritance), ensuring at least one user can manage the item.

To investigate the issue:

1. Open the item's **Manage Permissions** page and check the user's **Permissions** setting.
1. If the user's setting is **No access**, it indicates that the user's access was revoked by an organizational security policy.

   :::image type="content" source="media/troubleshoot-restricted-access/manage-permissions-no-access.png" alt-text="Screenshot showing a user with permissions set to No access." lightbox="media/troubleshoot-restricted-access/manage-permissions-no-access.png":::

1. Identify the policy type:
   - Recent label changes likely mean an issue with a Microsoft Purview protection policy.
   - Recent item updates or sensitive data likely mean an issue with a Microsoft Purview DLP restriction.

1. If the user's **Permissions** setting doesn't show **No access**, investigate other causes such as manual access removal or workspace permission changes.

## How to resolve policy-related issues

To unblock users, the workspace admin or a user with appropriate permissions, such as the label issuer or item creator, can take action. The steps to resolve the issue vary based on whether a Microsoft Purview protection policy or Microsoft Purview DLP policy is causing the restriction.
  
> [!NOTE]
> Only take these actions after ensuring they don't risk organizational compliance or data security. These actions are audited and might be subject to investigation by your security administrator.

### Resolving protection policy issues

When a protection policy revoked access and the user's permission shows as **No access**, the workspace admin can take the following actions. The label issuer (the person who applied the label to the item) or the item creator can also assist with investigating and resolving the issue.

- If the sensitivity label was applied incorrectly, either apply the correct label yourself or request that the Protection Owner update it.

- If the label is correct but the user needs access to this classified data, contact your organization's security team to request adding the user to the protection policy in Microsoft Purview. After the policy is updated, have the user sign back in to Fabric to receive the updated permissions.

### Resolving DLP "restrict access" policy issues

If a DLP policy caused the restriction, the workspace admin can take the following actions:

- If the DLP policy incorrectly flagged the data as sensitive and you're confident it's a false positive, the workspace admin can override the policy. Be prepared to provide justification to your compliance team for this action.
   
- If the data was mistakenly added to the data item, the workspace admin can edit the item to remove the sensitive data. This action triggers a new evaluation that automatically removes the restriction.

### Understanding how DLP policies affect different user types

If a DLP policy with the "restrict access" action is causing the restriction, it's important to understand how it affects different user types:

- **All users in the tenant**: When applied to this group, DLP policies block all users except workspace admins, who can troubleshoot and fix the data, where relevant.

- **Guest users**: When applied to this group, DLP policies block guest users, while retaining access for internal users and workspace admins. Guest users are users who aren't defined as **Member** in Microsoft Entra. If an external user is configured as a tenant **Member**, the policy treats them as an internal user.

The workspace admin can assess how DLP policies affect different user types to decide how to handle the restriction.

## Related articles

- [Microsoft Fabric permission model](/fabric/security/permission-model)
- [Microsoft Purview protection policies](/fabric/governance/protection-policies-overview)
- [Data Loss Prevention (DLP) in Microsoft Purview](/purview/dlp-powerbi-get-started)


