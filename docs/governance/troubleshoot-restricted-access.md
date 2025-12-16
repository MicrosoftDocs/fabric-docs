---
title: Troubleshoot issues with restricted access
description: Learn how to troubleshoot issues with restricted access.
author: msmimart
ms.author: mimart
ms.reviewer: mimart
ms.date: 12/15/2025
ms.topic: concept-article
---

# Troubleshoot access restrictions

The Microsoft Fabric permission model allows users and workspace admins to grant permissions to other users at the workspace level. These permissions define the default access for all items in the workspace. Users can also be given elevated permissions for specific items at the item level, even if they are only viewers at the workspace level. Learn more about the [Fabric permission model](/fabric/security/permission-model).

Fabric provides additional access controls. For example, OneLake security enables admins to assign roles to items and control which portions of data users can view. More importantly for this troubleshooting article, organization-wide policies can automatically restrict access to items based on their sensitivity or content.

Because there are multiple layers controlling access, you could encounter restrictions from policies you're unaware of. This article helps you identify if a policy is affecting your access and how to restore it if possible.

## User's access to an item is blocked

If you previously had access to an item but can no longer see it in your workspace or access it through a link that worked before, several factors could be responsible. Below are the most common causes and how to address them.

### Access was manually removed

Another user with privileged access to that item may have manually removed your access to it. This could happen due to regulations or processes in the company that enforce compliance. To resolve this issue:

   - **Contact the item owner directly**: If you know who owns or created the item, reach out to them to inquire about the access change.
   - **Reach out to your workspace administrator**: If you don't know the item owner, your workspace admin can help you contact them or reinstate your access if it was removed by mistake.

### Workspace permissions changed

You might have been removed from the workspace or your access level might have been downgraded, which automatically revoked some of your permissions to the items within it.

To understand the reason for the change in permissions, contact your workspace administrator.

### Company policies changed

Your organization may have implemented company-wide policies that restrict access to certain items based on the applied their sensitivity or content. These policies can override individual permissions and workspace settings. There are two main types of policies that can enforce such restrictions:

- **Protection policies**: Microsoft Purview protection policies automatically enforce access restrictions based on the applied *sensitivity label*. For example, the label "Confidential" can automatically limit access to a specific security group, for any Fabric item labeled by it.
- **Data Loss Prevention (DLP) policies with restrict access**: Using the *restrict access* action in Microsoft Purview DLP policies allows for access enforcement on items containing sensitive information.

Protection policies and DLP policies with restrict access can lead to similar user experiences when access is revoked. Below are detailed troubleshooting steps for each scenario.

### How to identify access issues are caused by policies

You can tell if a protection policy is the cause of your restricted access if you experience one of the following:

- You no longer see the item in your workspace list view or the Onelake catalog.

   :::image type="content" source="media/troubleshoot-restricted-access/list-view-no-item.png" alt-text="Screenshot showing the message sorry we coudn't fine that artifact." lightbox="media/troubleshoot-restricted-access/list-view-no-item.png":::

- You see “Permission required” or “Sorry we couldn’t locate that artifact” when trying to open the item using a link.

   :::image type="content" source="media/troubleshoot-restricted-access/permission-required.png" alt-text="Screenshot showing the permission required message." lightbox="media/troubleshoot-restricted-access/permission-required.png":::

- When an item includes data from an underlying data source that is restricted, you see the item in the workspace with an indicator.

   :::image type="content" source="media/troubleshoot-restricted-access/audit-risk-indicator.png" alt-text="Screenshot showing the indicator that appears when an item includes data from a restricted item." lightbox="media/troubleshoot-restricted-access/audit-risk-indicator.png":::

- When viewing a dashboard built on restricted data, for tiles that access the restricted content, you see a "Permission required" message. Other tiles continue to render normally.

### How to resolve a policy-based issue

Issues caused by protection policies and DLP policies with restrict access can be resolved by following these steps.

#### Resolving Microsoft Purview Protection policy issues

1. Contact the workspace admin, who can check the user's status on the **Manage Permissions** page. If the user's permissions appear as **No access**, it indicates that access was revoked by an organizational security policy.

2. If the workspace admin is blocked, the following users can access the **Manage Permissions** page:

   - The *label issuer* (the person who applied the label to the item). They retain access even if not included in the protection policy, preventing lockout scenarios.
   - The *item creator*. When labels are applied automatically (such as through downstream inheritance), the item creator retains access to ensure at least one user can manage the item.

3. **Request policy inclusion**: Once you've confirmed a protection policy is restricting your access, contact your organization's security team to request inclusion in the policy for that label.

#### Resolving Data Loss Prevention (DLP) policy issues

1. Contact the workspace admin. Contacting your workspace admin is the fastest way to ensure if a DLP restrict access policy took place and is the reason you are not seeing your item.

1. The workspace admins checks the item’s **Manage Permissions** page to see if the user's permissions appear as **No access**.

1. Once it's confirmed that a DLP policy is restricting access, the workspace admin can override the policy with appropriate justification. Or, if sensitive information was accidentally included, the workspace admin can edit the item to remove the sensitive data. This action triggers a new evaluation that automatically removes the restriction.

1. Understand how different user types are affected by DLP policies. DLP policies can restrict two types of groups:

   - **All users in the tenant**: DLP policies applied to this group blocks all users except workspace admins, who will be able to troubleshoot and fix the data, where relevant.

   - **Guest users**: DLP policies applied to this group blocks guest users, while retaining access for internal users and workspace admins. Guest users are users who are not defined as **Member** in Microsoft Entra. If an external user is configured as a tenant **Member**, the policy treats them as an internal user.

## How to investigate a restriction scenario

When a workspace admin receives a report from a user who has lost access to an item, the admin can investigate the cause and take action. The user could be an item creator, label issuer, or a user with full permissions in the workspace.

### Possible causes

- The user’s access might have been manually removed by another user.

- A Purview protection policy might have been applied to the item based on its latest sensitivity label assignment

- A DLP policy with restrict access might have been applied to the item since its last update.

### Actions

1. Go to the item’s **Manage Permissions** page and view the user’s current permissions. If the user’s permissions appear as **No access**, it means a company policy took effect and revoked this user’s access.

   :::image type="content" source="media/troubleshoot-restricted-access/manage-permissions-no-access.png" alt-text="Screenshot showing a user with permissions set to No access." lightbox="media/troubleshoot-restricted-access/manage-permissions-no-access.png":::

1. To unblock users, take the following actions depending on whether the issue is related to a protection policy or a DLP policy.

   > [!NOTE]
   > Only take these actions if you have ensured there is no risk to the organization’s compliance or to the data leaking due to your actions! These actions are audited and may be investigated by your security administrator.**

   - If the issue is related to a protection policy:

      - If the protected label is incorrectly applied, you can apply a different label or ask the Protection Owner to do so.

      - If the label is correct and the user should be allowed to access this classified data, contact the company’s security team and suggest adding the user to the protection policy in Purview. Once this is done, sign back in to Fabric, and the permissions should be updated correctly.

   - If the issue is related to a DLP policy:

      - If the DLP policy detected incorrect data and you're certain it's a false positive, you can override the policy and provide justification to your compliance team.

      - If the data was incorrectly added to the data item, edit the item and remove the sensitive data. This action will trigger a new evaluation that will automatically remove the restriction.

## Related articles

- [Microsoft Fabric permission model](/fabric/security/permission-model)
- [Microsoft Purview protection policies](/fabric/governance/protection-policies-overview)
- [Data Loss Prevention (DLP) in Microsoft Purview](/purview/dlp-powerbi-get-started)
